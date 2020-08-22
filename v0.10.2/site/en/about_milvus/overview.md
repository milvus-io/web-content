---
id: overview.md
---

# What is Milvus 

Milvus was released under the Apache 2.0 License and officially open sourced in October 2019. It is an incubation project under [LF AI Foundation](https://lfai.foundation/). The source code of Milvus is hosted on [GitHub](https://github.com/milvus-io/milvus).

Milvus is an embeddings similarity search engine that is highly reliable, scalable, and blazing fast. It encapsulates index libraries, such as Faiss, NMSLIB, and Annoy, providing a set of unified, easy-to-use APIs, and allowing you to choose index types based on your scenario.

Milvus offers efficient means of managing vector data, including adding, deleting, and modifying vector and non-vector data. Aside from near real-time search for vectors, Milvus also supports filtering scalar data. With the increase of data and query scale, Milvus also provides a solution for cluster sharding, which supports functions such as read/write separation, horizontal scalability, and dynamic scalability, to cope with large data volume. Currently, Milvus is a single-node server based on the client-server model. It provides storage and search services for TB-level feature data. 

- On the server side, Milvus consists of two parts: Milvus Server and Meta Store.

    * Milvus Server provides the main functions of Milvus, including the data storage, data management, and data search.
    * Meta Store stores Milvus metadata. Currently, Milvus supports MySQL and SQLite as the database for metadata.

- On the client side, Milvus provides easy-to-use SDKs in Python, Java, Go, and C++, as well as RESTful APIs.

For scenarios with large data size or high concurrency requirements, you can use Mishards, an experimental cluster sharding middleware, for deployment.

## Overall architecture

![Milvus architecture](../../../assets/milvus_arch.png)


## Scenarios

The above-mentioned capabilities facilitate the extensive use of Milvus in hundreds of organizations and institutions worldwide in the following scenarios:

- Image, video, and audio search.
- Text search, recommender system, interactive question answering system, and other text search fields.
- Drug discovery, genetic screening, and other biomedical fields.

See [Scenarios](https://www.milvus.io/scenarios/) for more information. 

## Key features

### Comprehensive similarity metrics

Milvus offers frequently used similarity metrics, including Euclidean distance, inner product, Hamming distance, Jaccard distance, etc, allowing you to explore vector similarity in the most effective and efficient way possible.

### Leading-edge performance

Milvus is built on top of multiple optimized Approximate Nearest Neighbor Search (ANNS) indexing libraries, such as Faiss, Annoy, and hnswlib, ensuring that you always get the best performance irrespective of your scenario.

### Dynamic data management

No longer troubled by static data, you can operate data with insertion, deletion, search and update whenever needed. 

### Near real time search

Data is available for search almost immediately after being inserted and updated. Milvus does the heavy lifting in your best interests in terms of both result accuracy and data consistency.

### Cost-efficient

Milvus harnesses the parallelism of modern processors and enables billion-scale similarity searches in milliseconds on a single off-the-shelf server. 

### Rich data type and advanced search (coming soon)

Milvus supports various data types for fields in a record. You can also use advanced search methods, such as filtering, sorting and aggregation for one or multiple fields.

### Highly scalable and robust

You can deploy Milvus in a distributed environment. To increase the capacity and reliability of a Milvus cluster, you can simply add more nodes.

### Cloud native

We make it easy for you to run Milvus on public cloud, private cloud, or anywhere in between.

### Write ahead log

Milvus implements a Write Ahead Log (WAL) function similar to the one in database system. Any modification to the data are stored into a log file, and then written to Milvus. Once the process of writing to Milvus fails (possible reasons include insufficient disk space or exhausted memory), Milvus recovers the operations that have not been completed from the log file when it restarts, and then re-execute these operations. See [Write Ahead Log](write_ahead_log.md) for details.

### DSL

Milvus provides DSL (Domain-specific language) based on JSON structure. You can use DSL to query data.

### Mishards

Mishards is a Milvus cluster sharding middleware developed in Python. It handles request forwarding, read-write separation, horizontal and dynamic scalability, so it provides users with a Milvus instance that can be expanded by memory and computing power. See [Mishards](mishards.md) for details.

### Heterogeneous computing

Milvus can schedule multiple GPUs for vector search and index building. Taking advantage of the GPU's powerful parallel computing capabilities, Milvus has excellent performance on time-consuming tasks such as mass query and vector index building.

### Vector index

Milvus supports multiple indexes based on Faiss, NMSLIB, and Annoy, such as tree-based index, graph index, and quantization index. See [Vector Index](index.md) for details of vector index. See [Performance Tuning](tuning.md) for details about how to select indexes and index parameters.

### Monitoring and alerting

Milvus uses Prometheus to store and monitor its metrics and Grafana to visualize data. See [Monitor](monitor.md) for details.

## Join our community

If you want to join our developer community, welcome to visit [Contribute to Milvus](https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md#contributing-to-milvus).

If you have any questions about the functions or SDK of Milvus, you are welcomed to join [Slack](https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ) and talk with us.