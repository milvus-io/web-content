---
id: glossary.md
title: Glossary
---

# Glossary

## Cluster
In a cluster deployment of Milvus, services are provided by a group of nodes to achieve high availability and easy scalability.

## Collection
A collection in Milvus is equivalent to a table in a relational database management system (RDBMS). In Milvus, collections are used to store and manage entities.

## Entity
An entity consists of a group of fields that represent real world objects. Each entity in Milvus is represented by a unique row ID.

<div class="alert note">
You can customize row IDs. If you do not configure manually, Milvus automatically assigns row IDs to entities. If you choose to configure your own customized row IDs, note that Milvus does not support row ID de-duplication for now. Therefore, there can be duplicate row IDs in the same collection.
</div>

## Field
Fields are the units that make up entities. Fields can be structured data (e.g., numbers, strings) or vectors.

<div class="alert note">
Scalar field filtering is now available in Milvus 2.0!
</div>

## Normalization
Normalization refers to the process of converting an embedding (vector) so that its norm equals one. If inner product (IP) is used to calculate embeddings similarities, all embeddings must be normalized. After normalization, inner product equals cosine similarity.

## Partition
A partition is a division of a collection. Milvus supports dividing collection data into multiple parts on physical storage. This process is called partitioning, and each partition can contain multiple segments.

## Segment
A segment is a data file automatically created by Milvus for holding inserted data. A collection can have multiple segments and a segment can have multiple entities. During vector similarity search, Milvus scans each segment and returns the search results.

## Sharding
Sharding refers to distributing write operations to different nodes to make the most of the parallel computing potential of a Milvus cluster for writing data. By default, a single collection contains two shards. Milvus adopts a sharding method based on primary key hashing. Milvus' development roadmap includes supporting more flexible sharding methods such as random and custom sharding.

<div class="alert note">
Partitioning works to reduce read load by specifying a partition name, while sharding spreads write load among multiple servers.
</div>

## Standalone
In a standalone deployment of Milvus, all operations including data insertion, index building, and vector similarity search are completed in one single process.

## Vector
A vector represents the features of unstructured data. It is usually converted by an AI or ML model. A vector comes in the form of a numeric array of high dimensions. Each vector represents an object.

> Each entity can only contain one vector in the current version of Milvus.

## Vector index
A vector index is a reorganized data structure derived from raw data that can greatly accelerates  the process of vector similarity search. Milvus supports several [vector index types](index.md).

Learn [how to select](https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing) the ideal index for your application scenario.


