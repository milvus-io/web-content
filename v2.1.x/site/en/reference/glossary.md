---
id: glossary.md
title: Glossary
---

# Glossary

## Channel

There are two different channels in Milvus. They are [PChannel](#PChannel) and [VChannel](#VChannel). Each PChannel corresponds to a topic for log storage. While each VChannel corresponds a shard in a collection. 

## Collection
A collection in Milvus is equivalent to a table in a relational database management system (RDBMS). In Milvus, collections are used to store and manage entities.

## Dependency
A dependency is a program that another program relies on to work. Milvus' dependencies include etcd (stores meta data), MinIO or S3 (object storage), and Pulsar (manages snapshot logs).

## Entity
An entity consists of a group of fields that represent real world objects. Each entity in Milvus is represented by a unique primary key.

<div class="alert note">
You can customize primary keys. If you do not configure manually, Milvus automatically assigns primary keys to entities. If you choose to configure your own customized primary keys, note that Milvus does not support primary key de-duplication for now. Therefore, there can be duplicate primary keys in the same collection.
</div>

## Field
Fields are the units that make up entities. Fields can be structured data (e.g., numbers, strings) or vectors.

<div class="alert note">
Starting from Milvus 2.0, scalar field filtering is available!
</div>

## Log broker
The log broker is a publish-subscribe system that supports playback. It is responsible for streaming data persistence, execution of reliable asynchronous queries, event notification, and return of query results. It also ensures integrity of the incremental data when the worker nodes recover from system breakdown.

## Log sequence
The log sequence records all operations that change collection states in Milvus.

## Log snapshot

A log snapshot is a binary log, a smaller unit in segment that records and handles the updates and changes made to data in the Milvus vector database. Data from a segment is persisted in multiple binlogs. There are three types of binlogs in Milvus: InsertBinlog, DeleteBinlog, and DDLBinlog.

## Log subscriber
Log subscribers subscribe to the log sequence to update the local data and provides services in the form of read-only copies.

## Message storage

Message storage is the log storage engine of Milvus. 

## Milvus cluster
In a cluster deployment of Milvus, services are provided by a group of nodes to achieve high availability and easy scalability.

## Milvus standalone
In a standalone deployment of Milvus, all operations including data insertion, index building, and vector similarity search are completed in one single process.

## Normalization
Normalization refers to the process of converting an embedding (vector) so that its norm equals one. If inner product (IP) is used to calculate embeddings similarities, all embeddings must be normalized. After normalization, inner product equals cosine similarity.

## Partition
A partition is a division of a collection. Milvus supports dividing collection data into multiple parts on physical storage. This process is called partitioning, and each partition can contain multiple segments.

## PChannel
PChannel stands for physical channel. Each PChannel corresponds to a topic for log storage. A group of 256 PChannels by default will be assigned to store logs that record data insertion, deletion, and update when the Milvus cluster is started.

## Schema
Schema is the meta information that defines data type and data property. Each collection has its own collection schema that defines all the fields of a collection, automatic ID (primary key) allocation enablement, and collection description. Also included in collection schemas are field schemas that defines the name, data type, and other properties of a field. 

## Segment
A segment is a data file automatically created by Milvus for holding inserted data. A collection can have multiple segments and a segment can have multiple entities. During vector similarity search, Milvus scans each segment and returns the search results. A segment can be either growing or sealed. A growing segment keeps receiving the newly inserted data till it is sealed. A sealed segment no longer receives any new data, and will be flushed to the object storage, leaving new data to be inserted into a freshly created growing segment. A growing segment will be sealed either because the number of entities it holds reaches the pre-defined threshold, or because the span of "growing" status exceeds the specified limit.

## Sharding
Sharding refers to distributing write operations to different nodes to make the most of the parallel computing potential of a Milvus cluster for writing data. By default, a single collection contains two shards. Milvus adopts a sharding method based on primary key hashing. Milvus' development roadmap includes supporting more flexible sharding methods such as random and custom sharding.

<div class="alert note">
Partitioning works to reduce read load by specifying a partition name, while sharding spreads write load among multiple servers.
</div>

## Unstructured data
Unstructured data, including images, video, audio, and natural language, is information that doesn't follow a predefined model or manner of organization. This data type accounts for around 80% of the world's data, and can be converted into vectors using various artificial intelligence (AI) and machine learning (ML) models.

## VChannel
VChannel stands for logical channel. Each VChannel represents a shard in a collection. Each collection will be assigned a group of VChannels for recording data insertion, deletion, and update. VChannels are logically separated but physically share resources.


## Embedding Vector
An embedding vector is a feature abstraction of unstructured data, such as emails, IoT sensor data, Instagram photos, protein structures, and much more. Mathematically speaking, an embedding vector is an array of floating-point numbers or binaries. Modern embedding techniques are used to convert unstructured data to embedding vectors.

## Vector index
A vector index is a reorganized data structure derived from raw data that can greatly accelerate the process of vector similarity search. Milvus supports several [vector index types](index.md).

## Vector similarity search
Vector similarity search is the process of comparing a vector to a database to find vectors that are most similar to the target search vector. Approximate nearest neighbor (ANN) search algorithms are used to calculate [similarity](metric.md) between vectors. 

