---
id: glossary.md
title: Terminology
---

# Terminology

## AutoID

AutoID is an attribute of the primary field that determines whether to enable AutoIncrement for the primary field. The value of AutoID is defined based on a timestamp. For more information, refer to [create_schema](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md).

## Auto Index

Milvus automatically decides the most appropriate index type and params for a specific field based on empirical data. This is ideal for situations when you do not need to control the specific index params. For more information, refer to [add_index](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md).

## Attu

[Attu](https://github.com/zilliztech/attu) is an all-in-one administration tool for Milvus that significantly reduces the complexity and cost of managing the system.

## Birdwatcher

[Birdwatcher](birdwatcher_overview.md) is a debugging tool for Milvus that connects to etcd, allowing you to monitor the status of the Milvus server and make adjustments in real-time. It also supports etcd file backups, aiding developers in troubleshooting.

## Bulk Writer

[Bulk Writer](https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/LocalBulkWriter/LocalBulkWriter.md) is a data processing tool provided by Milvus SDKs (e.g. PyMilvus, Java SDK) , designed to convert raw datasets into a format compatible with Milvus for efficient importing.

## Bulk Insert

[Bulk Insert](https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md) is an API that enhances writing performance by allowing multiple files to be imported in a single request, optimizing operations with large datasets.

## Cardinal

Cardinal, developed by Zilliz Cloud, is a cutter-edge vector search algorithm that delivers unparalleled search quality and performance. With its innovative design and extensive optimizations, Cardinal outperforms Knowhere by several times to an order of magnitude while adaptively handling diverse production scenarios, such as varying K sizes, high filtering, different data distributions, and so on.

## Channel

Milvus utilizes two types of channels, [PChannel](https://milvus.io/docs/glossary.md#PChannel) and [VChannel](https://milvus.io/docs/glossary.md#VChannel). Each PChannel corresponds to a topic for log storage, while each VChannel corresponds to a shard in a collection.

## Collection

In Milvus, a collection is equivalent to a table in a relational database management system (RDBMS). Collections are major logical objects used to store and manage entities. For more information, refer to [Manage Collections](manage-collections.md).

## Dependency

A dependency is a program that another program relies on to work. Milvus' dependencies include etcd (stores meta data), MinIO or S3 (object storage), and Pulsar (manages snapshot logs). For more information, refer to [Manage Dependencies](https://milvus.io/docs/manage_dependencies.md#Manage-Dependencies).

## Dynamic schema

Dynamic schema allows you to insert entities with new fields into a collection without modifying the existing schema. This means that you can insert data without knowing the full schema of a collection and can include fields that are not yet defined. You can enable this schema-free capability by enableing the dynamic field when creating a collection. For more information, refer to [Enable Dynamic Field](enable-dynamic-field.md).

## Embeddings

Milvus offers built-in embedding functions that work with popular embedding providers. Before creating a collection in Milvus, you can use these functions to generate embeddings for your datasets, streamlining the process of preparing data and vector searches. To create embeddings in action, refer to [Using PyMilvus's Model To Generate Text Embeddings](https://github.com/milvus-io/bootcamp/blob/master/bootcamp/model/embedding_functions.ipynb).

## Entity

An entity consists of a group of fields that represent real-world objects. Each entity in Milvus is represented by a unique primary key.

You can customize primary keys. If you do not configure manually, Milvus automatically assigns the primary key to entities. If you choose to customize the primary key, note that Milvus does not support primary key de-duplication for now. Therefore, there can be duplicate primary keys in the same collection. For more information, refer to [Insert Entities](insert-update-delete.md#Insert-entities).

## Field

A field in a Milvus collection is equivalent to a column of table in a RDBMS. Fields can be either scalar fields for structured data (e.g., numbers, strings), or vector fields for embedding vectors.

## Filter

Milvus supports scalar filtering by searching with predicates, allowing you to define [filter conditions](https://milvus.io/docs/boolean.md) within queries and searches to refine results.

## Filtered search

Filtered search applies scalar filters to vector searches, allowing you to refine the search results based on specific criteria. For more information, refer to [Filtered search](single-vector-search.md#Filtered-search).

## Hybrid search

[Hybrid Search](https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md) is an API for hybrid search since Milvus 2.4.0. You can search multiple vector fields and fusion them. For a vector search combined with scalar field filtering, it is referred to as "filtered search". For more information, refer to [Hybrid Search](multi-vector-search.md).

## Index

A vector index is a reorganized data structure derived from raw data that can greatly accelerate the process of vector similarity search. Milvus supports a wide range of index types for both vector fields and scalar fields. For more information, refer to [Vector index types](https://milvus.io/docs/index.md).

## Kafka-Milvus Connector

[Kafka-Milvus Connector](https://github.com/zilliztech/kafka-connect-milvus) refers to a Kafka sink connector for Milvus. It allows you to stream vector data from Kafka to Milvus.

## Knowhere

[Knowhere](https://milvus.io/docs/knowhere.md#Knowhere) is the core vector execution engine of Milvus which incorporates several vector similarity search libraries including Faiss, Hnswlib, and Annoy. Knowhere is also designed to support heterogeneous computing. It controls on which hardware (CPU or GPU) to execute index building and search requests. This is how Knowhere gets its name - knowing where to execute the operations.

## Log broker

The [log broker](https://milvus.io/docs/four_layers.md#Log-broker) is a publish-subscribe system that supports playback. It is responsible for streaming data persistence, execution of reliable asynchronous queries, event notification, and return of query results. It also ensures integrity of the incremental data when the worker nodes recover from system breakdown.

## Log snapshot

A log snapshot is a binary log, a smaller unit in segment that records and handles the updates and changes made to data in Milvus. Data from a segment is persisted in multiple binlogs. There are three types of binlogs in Milvus: InsertBinlog, DeleteBinlog, and DDLBinlog. For more information, refer to [Meta storage](https://milvus.io/docs/four_layers.md#Meta-storage).

## Log subscriber

Log subscribers subscribe to the log sequence to update the local data and provide services in the form of read-only copies.

## Message storage

Message storage is the log storage engine of Milvus. Milvus supports Kafka or Pulsa as message storage. For more information, refer to [Configure Message Storage](https://milvus.io/docs/message_storage_operator.md#Configure-Message-Storage-with-Milvus-Operator).

## Metric type

Similarity metric types are used to measure similarities between vectors. Currently, Milvus supports Euclidean distance (L2), Inner product (IP), Cosine similarity (COSINE), and binary metric types. You can choose the most appropriate metric type based on your scenario. For more information, refer to [Similarity Metrics](https://milvus.io/docs/metric.md).

## Mmap

Memory-mapped files enable efficient data handling by mapping file contents directly into memory. This is especially useful when memory is limited and loading all data is not possible. This technique can boost data capacity and maintain performance to a point. However, if the data greatly exceeds memory capacity, search and query speeds could significantly decrease. For more information, refer to [MMap-enabled Data Storage](https://milvus.io/docs/mmap.md).

## Milvus Backup

[Milvus Backup](https://milvus.io/docs/milvus_backup_overview.md#Milvus-Backup) is a tool for creating copies of data, which can be used to restore the original after a data loss event.

## Milvus CDC

[Milvus CDC](https://milvus.io/docs/milvus-cdc-overview.md) (Change data capture) is a user-friendly tool that can capture and synchronize incremental data in Milvus instances. It ensures the reliability of business data by seamlessly transferring it between source and target instances, allowing for easy incremental backup and disaster recovery.

## Milvus CLI

[Milvus Command-Line Interface](https://milvus.io/docs/cli_overview.md) (CLI) is a command-line tool that supports database connection, data operations, and import and export of data. Based on [Milvus Python SDK](https://github.com/milvus-io/pymilvus), it allows the execution of commands through a terminal using interactive command-line prompts.

## Milvus Migration

[Milvus Migration](https://github.com/zilliztech/milvus-migration/) is an open-source tool designed to facilitate the easy migration of data from various data sources into Milvus 2.x.

## Milvus cluster

In [cluster deployment](https://milvus.io/docs/install_cluster-milvusoperator.md) of Milvus, services are provided by a group of nodes to achieve high availability and easy scalability.

## Milvus standalone

In [standalone deployment](https://milvus.io/docs/install_standalone-docker.md) of Milvus, all operations including data insertion, index building, and vector similarity search are completed in one single process.

## Multi-Vector

Milvus supports multiple vector fields in one collection since 2.4.0. For more information, refer to [Hybrid Search](multi-vector-search.md).

## Partition

A partition is a division of a collection. Milvus supports dividing collection data into multiple parts on physical storage. This process is called partitioning, and each partition can contain multiple segments. For more information, refer to [Manage Partitions](https://milvus.io/docs/manage-partitions.md#Manage-Partitions).

## Partition key

The partition key attribute of a field enables the segregation of entities into distinct partitions based on their partition key values. This grouping ensures that entities sharing the same key value are stored together, which can speed up search operations by allowing the system to bypass irrelevant partitions during queries filtered by the partition key field. For more information, refer to [Use Partition Key](https://milvus.io/docs/use-partition-key.md#Use-Partition-Key).

## PChannel

PChannel stands for physical channel. Each PChannel corresponds to a topic for log storage. By default, a group of 16 PChannels will be assigned to store logs that record data insertion, deletion, and update when the Milvus cluster is started. For more information, refer to [Message Channel-related Configurations](https://milvus.io/docs/configure_messagechannel.md#Message-Channel-related-Configurations).

## PyMilvus

PyMilvus is a Python SDK of Milvus. Its source code is open-sourced and hosted on [GitHub](https://github.com/milvus-io/pymilvus). You have the flexibility to choose MilvusClient (new version Python SDK) or the original ORM module to talk with Milvus.

## Query

[Query](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md) is an API that conducts scalar filtering with a specified boolean expression as filter. For more information, refer to [Get & Scalar Query](https://milvus.io/docs/get-and-scalar-query.md#Use-Basic-Operators).

## Range search

Range search allows you to find vectors that lie within a specified distance from your search vector. For more information, refer to [Range search](https://milvus.io/docs/single-vector-search.md#Range-search).

## Schema

Schema is the meta information that defines the data type and data property. Each collection has its own collection schema that defines all the fields of a collection, automatic ID (primary key) allocation enablement, and collection description. Field schemas are also included in collection schemas, which defines the name, data type, and other properties of a field. For more information, refer to [Manage Schema](https://milvus.io/docs/schema.md#Manage-Schema).

## Search

[Search](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md) is an API that performs an operation to conduct a vector similarity search, requiring vector data for its execution. For more information, refer to [Single-Vector Search](https://milvus.io/docs/single-vector-search.md).

## Segment

A segment is an automatically created data file that stores inserted data. A collection may contain multiple segments, and each segment can hold numerous entities. During a vector similarity search, Milvus examines each segment to compile search results.

There are two types of segments: growing and sealed. A growing segment continues to collect new data until it hits a specific threshold or time limit, after which it becomes sealed. Once sealed, a segment no longer accepts new data and is transferred to object storage. Meanwhile, incoming data is routed to a new growing segment. The transition from a growing to a sealed segment is triggered either by reaching the predefined entity limit or by exceeding the maximum allowed duration in the growing state. For more information, refer to [Design Details](https://milvus.io/docs/replica.md#Design-Details).

## Spark-Milvus Connector

[Spark-Milvus Connector](https://github.com/zilliztech/spark-milvus) provides seamless integration between Apache Spark and Milvus, combining the data processing and machine learning (ML) features of Apache Spark with the vector data storage and search capabilities of Milvus.

## Shard

Milvus enhances data write performance by distributing write operations across multiple nodes using shards, which are organized based on the hashing of primary keys. This leverages the cluster's parallel computing capabilities.

*Partitioning works to reduce read load by specifying a partition name, while sharding spreads write load among multiple servers.*

## Sparse vector

Sparse vectors represent words or phrases using vector embeddings where most elements are zero, with only one non-zero element indicating the presence of a specific word. Sparse vector models, such as SPLADEv2, outperform dense models in out-of-domain knowledge search, keyword-awareness, and interpretability. For more information, refer to [Sparse Vectors](https://milvus.io/docs/sparse_vector.md#Sparse-Vector).

## Unstructured data

Unstructured data, including images, video, audio, and natural language, is information that does not follow a predefined model or manner of organization. This data type accounts for around 80% of the world's data, and can be converted into vectors using various artificial intelligence (AI) and ML models.

## VChannel

[VChannel](https://milvus.io/docs/data_processing.md#Data-insertion) stands for logical channel. Each VChannel represents a shard in a collection. Each collection will be assigned a group of VChannels for recording data insertion, deletion, and update. VChannels are logically separated but physically share resources.

## Vector

An embedding vector is a feature abstraction of unstructured data, such as emails, IoT sensor data, Instagram photos, protein structures, and more. Mathematically speaking, an embedding vector is an array of floating-point numbers or binaries. Modern embedding techniques are used to convert unstructured data to embedding vectors. Milvus support both dense and sparse vector since 2.4.0.

## Zilliz Cloud

Fully-managed Milvus on [Zilliz Cloud](https://zilliz.com/), with more enterprise features and highly optimized performance.
