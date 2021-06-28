---
id: architecture_overview.md
title: Architecture Overview
---

# Milvus Architecture Overview

Milvus is built on top of popular vector search libraries including Faiss, Annoy, HNSW, and more. It was designed to perform vector similarity search on dense datasets containing millions, billions, or even trillions of vectors. 

Milvus supports data partitions, data persistence, incremental data ingestion, scalar vector hybrid queries, time travel, and other advanced functions. The platform has tunable performance and can be optimized to suit any vector retrieval scenario. It is recommended to deploy Milvus using Kubernetes for optimal availability and resilience. 

## Architecture overview

Milvus operates on a shared-disk architecture that separates storage from computing and supports horizontally scalable computing nodes.

### Overall architecture

Milvus separates data flow from control flow, and is divided into four layers that are independent in terms of scalability and disaster recovery:

![Architecture_diagram](../../../assets/architecture_diagram.png)

#### Access layer

The access layer acts as the system's face, exposing the endpoint of the client connection to the outside world. It is responsible for processing client connections, carrying out static verification, basic dynamic checks for user requests, forwarding requests, and gathering and returning results to the client. The proxy itself is stateless and provides unified access addresses and services to the outside world through load balancing components (Nginx, Kubernetess Ingress, NodePort, and LVS). Milvus uses a massively parallel processing (MPP) architecture, where proxies return results gathered from worker nodes after global aggregation and post-processing.

#### Coordinator service 

The coordinator service is the system's brain, responsible for cluster topology node management, load balancing, timestamp generation, data declaration, and data management. There are four different roles in the coordinator service:

- **Root coordinator (root coord):** Handles data definition language (DDL) and data control language (DCL) requests, such as creating or deleting collections, partitions, indexes, etc. Root coord is also responsible for maintaining the timestamp oracle's (TSO) central timing module and the advancement of the time window.
- **Query coordinator (query coord):** Responsible for managing the topological structure of the query node, load balancing of data segments between query nodes, and the handoff from growing segments to sealed segments.
- **Data coordinator (data coord):** Responsible for managing the topological structure of the data node, maintaining metadata for background operations (e.g., flushing or compacting a segment). 
- **Index coordinator (index coord):** Responsible for managing the topology of the index node, coordinating index building tasks, and maintaining index metadata.

#### Worker nodes

The worker, or execution, node acts as the limbs of the system, executing instructions issued by the coordinator service and the data manipulation language (DML) commands initiated by the proxy. Worker nodes are stateless thanks to separation of storage and computation, and can quickly achieve expansion and failback with Kubernetes. There are three types of worker nodes: 

- **Query node:** Obtains incremental log data by subscribing to the log broker, obtains historical data from Object Storage, and provides hybrid search of vector and scalar data.
- **Data node:** Obtains incremental log data by subscribing to the log broker, processes requests (e.g., write, delete, etc.), and packages log data for storage in the object storage to achieve log snapshot persistence. 
- **Index node:** Performs index building tasks. Index nodes can be implemented in serverless mode and not necessarily resident in memory. 

#### Storage
Storage is the cornerstone of Milvus, responsible for data persistence. The storage layer is divided into three parts:

- **Meta store:** Responsible for storing snapshots of meta data such as collection schema, node status, message consumption checkpoints, etc. Metadata storage requires extremely high availability, strong consistency, and transaction support. Milvus relies on etcd for these functions as its an ideal choice given the platform's metadata storage requirements. Etcd also assumes the responsibility of service registration and health checks. 

- **Log broker:** A publish-subscribe system that supports playback and is responsible for streaming data persistence, reliable asynchronous query execution, event notifications, and returning query results. When nodes are performing downtime recovery, the log broker ensures the integrity of incremental data through log broker playback. Milvus cluster uses Pulsar as its log broker, while the standalone mode uses RocksDB. Streaming storage services such as Kafka and Pravega can also be used as log brokers.

- **Object storage:** Stores snapshot files of logs, scalar/vector index files, and intermediate query processing results. Milvus supports AWS S3 and Azure Blog, two of the most widely used and economical public clouds for their cloud-native elasticity and on-demand billing, as well as MinIO, a lightweight, open-source object storage service. Due to the high access latency and billing per query of object storage services, Milvus will soon support memory/SSD-based cache pools and hot/cold data separation to improve performance and reduce costs.


### Main components

Milvus supports standalone and cluster deployments. Each deployment has identical capabilities; however, users may find a specific one better suits their scenario depending on factors such as dataset size, database traffic, and more. Presently, Milvus deployed using the standalone mode cannot be dynamically upgraded to the cluster mode.

The **standalone** mode of Milvus includes three components:
- **Milvus:** Provides core system functions.
- **etcd:** Metadata engine used for managing metadata access and storage for Milvus' internal components, including proxies nodes, index nodes, and more.
- **MinIO:** A storage engine that maintains data persistence for Milvus' internal components, including proxy nodes, index nodes, and more.

![Standalone_architecture](../../../assets/standalone_architecture.jpeg)

**Milvus cluster** includes eight microservice components and three third-party infrastructure service components. All microservices can be deployed independently on Kubernetes.

**Microservice components:**

- Root coord
- Proxy 
- Query coord 
- Query node 
- Index coord 
- Index node 
- Data coord 
- Data node

**Third-party infrastructure components:**

- etcd: Stores metadata for various cluster components.
- MinIO: Handles data persistence for large cluster files, such as index and full binary log files.
- Pulsar: Manages recent collection update operation logs, and provides streaming log output and log subscription services.

![Distributed_architecture](../../../assets/distributed_architecture.jpeg)

### Log system

Milvus is designed around logs as the core, following the log-as-data guidelines. In Milvus 2.0, physical tables are not maintained, but data reliability is guaranteed through log persistence and log snapshots. 

![Log_mechanism](../../../assets/log_mechanism.png)

The log system acts as Milvus' backbone, taking responsibility for data persistence and decoupling. Milvus decouples the read and write components of the system using the publish-subscribe log mechanism. The system is comprised of two roles, log sequence and log subscriber. The log sequence records all operations that change the state of the dataset, while the log subscriber updates local data through subscription log sequences to provide services as read-only copies. The publish-subscribe mechanism leaves a lot of room for system expansion, which is useful for change data capture (CDC), global deployment, and other functions. 



## Data processing

### Data insertion

Multiple shards can be specified in a collection, with each corresponding to a virtual channel (vchannel). In Milvus 2.0, data is divided into multiple shards, and each shard further divided into segments. Each vchannel is assigned a specific physical channel (pchannel), which is used to process the publishing and subscription of various log sequences. In Milvus 2.0, there is one-to-one relationship between vchannel and pchannel. Proxies determine which shard the insert/delete request enters based on the primary key hash. 

Checking and confirming the status of insert and delete requests is advanced to the proxies because there are no complicated transactions. Each proxy has a metadata cache that is used for local dynamic checking. For all insert and delete requests, proxies first obtain a timestamp by requesting the TSO central timing modulate located in the root coord. This timestamp determines what data is visible and the order in which data is overwritten. Proxies obtain the segment where the data is located and the RowID from the data coord in batches, which increases throughput and releases pressure on the central nodes.

![Log_broker](../../../assets/log_broker.png)

In addition to insert and delete operations, data definition operations are also written in log sequences. Milvus only allocates one channel for data definition operations because they occur so infrequently. 

![Channels](../../../assets/channels.png)

Multiple vchannles are served on top of the underlying log broker nodes. Each channel is not physically split further, so a single vchannel will not span multiple physical nodes and different vchannels can be can be deployed in different physical nodes. If a data insertion bottleneck occurs, consider whether the log broker load is too high and needs to be expanded or whether there are enough shards to ensure each log broker load is sufficiently balanced.

![Insertion_process](../../../assets/insertion_process.png)

The load is primarily handled by proxy, log broker, data node, and object storage. The work can be broken down into four parts, request checking/sending, log sequence publish-subscribe, conversion from streaming logs to log snapshots, and persistent storage of log snapshots. Milvus 2.0 decouples the four elements to achieve equivalence between nodes of the same type. When facing different data insertion loads, particularly large-scale and highly fluctuating streaming loads, components in each part can be elastically scaled independently. 

### Index building

Index building is performed by the index node. To avoid frequent and repeated index building when updating data, Milvus divides collections into segments that correspond to their own unique index.

![Index_building](../../../assets/index_building.png)

Milvus can build indexes for each vector field, scalar field and primary key field. Both the input and output of index building are in object storage. The index node loads log snapshots that need to be indexed into a segment, deserializes the data and metadata in memory, and then builds an index. After indexing is complete, the index node serializes the index structure and writes it back to object storage.

Indexing is a computation- and memory- intensive process, and it primarily runs vector and matrix operations. Due to the high dimensionality of the indexed data, it is difficult to perform efficient indexing using a traditional tree structure. Representing the neighbor relationships of high-dimensional dense vectors based on clustering or graphs is a relatively mature technology. Regardless of the index type, indexing involves multiple iterative calculations of large-scale vector data, such as finding clusters and the convergence state of graph traversal. 

Compared with traditional indexing operations, vector calculations can take full advantage of single instruction, multiple data (SIMD) acceleration. Milvus' built-in engine supports SIMD instructions sets, such as SSE, AVX2, AVX512, and GPU acceleration. Vector indexing often requires sudden, high-volume consumption of resources. This means the elasticity of the indexing engine is critical for controlling costs. The Milvus development roadmap includes continued exploration of heterogeneous computing and a severless vector database architecture. Milvus is committed to perpetually optimizing the costs associated with index building.

Milvus also supports scalar filtering and primary key query functions. To efficiently support scalar queries, Milvus has built Bloom filter indexes, hash indexes, tree indexes, and inverted indexes. Future versions of Milvus will include support for even more index types, including bitmap indexes, rough indexes, and more external indexes. 

### Data query

Vector indexes are essentially inverted file (IVF) indexes. They can be used to find the k nearest vectors, or all vectors in a distance range, to vector Q in target collection A when Q and A are specified in the query request. 

![Data_query](../../../assets/data_query.png)

The data in collection A is divided into multiple segments. The query node loads indexes from segments, the smallest unit in terms of granularity. Search requests are published to all query nodes, which execute queries concurrently. Each query node prunes the local segments in turn and searches the vectors that meet the conditions. The results from each segment are aggregated and returned locally.

In the process described above, each query node is unaware of the other query nodes. Individual query nodes only need to  respond to the scheduling from query coord to load/unload segments, and to respond to query requests based on local segments. Proxy is responsible for global aggregation of the results returned by each query node and returning those results to the client.

![Handoff_operation](../../../assets/handoff_operation.png)

Segments have two states, growing and sealed, which are called incremental data and historical data respectively. For growing segments, the query node obtains recent updates of data by subscribing to vchannel. When the size of a growing segment data increases to a fixed threshold, the data coord initiates the seal operation. Sealed segments are built with an index, and then trigger the query coord handoff operation to convert incremental data into historical data. Query coord then distributes the sealed segments as evenly as possible to all query nodes. To achieve even segment placement, factors such as memory usage, CPU occupation, and the number of segments are taken into consideration.

![Architecture_01](../../../assets/architecture_01.jpg)
