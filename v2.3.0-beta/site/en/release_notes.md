---
id: release_notes.md
summary: Milvus Release Notes
---
# Release Notes

Find out what’s new in Milvus! This page summarizes information about new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.3.0 beta in this section. We suggest that you regularly visit this page to learn about updates.

## 2.3.0 beta
Release date: 20 March, 2023

| Milvus version | Python SDK version | Java SDK version | Go SDK version | Node.js SDK version |
| -------------- | ------------------ | ---------------- | -------------- | ------------------- |
| 2.3.0 beta     | 2.2.3b1            | N/A              | N/A            | N/A                 |

The latest release of Milvus introduced a new feature that will please many users: Nvidia GPU support. This new feature brings the ability to support heterogeneous computing, which can significantly accelerate specialized workloads. With GPU support, users can expect faster and more efficient vector data searches, ultimately improving productivity and performance.

### Features

**GPU support**

Milvus now supports two GPU-based IVF indexes: RAFT and FAISS. According to a benchmark on RAFT's GPU-based IVF-series indexes, GPU indexing achieves a 10x increase in search performance on large NQ cases.

- Benchmark

  We have compared RAFT-IVF-Flat with IVF-Flat and HNSW at a recall rate of 95%, and obtained the following results.

  | Datasets            | SIFT             | GIST             | GLOVE            | Deep              |
  | ------------------- | ---------------- | ---------------- | ---------------- | ----------------- |
  | HNSW (VPS)          | 14,537           | 791              | 1516             | 5761              |
  | IVF-Flat (VPS)      | 3097             | 142              | 791              | 723               |
  | RAFT-IVF-Flat (VPS) | 121,568          | 5737             | 20,163           | 16,557            |

  These benchmarks run against [Knowhere](knowhere.md) on a host with an 8-core CPU, 32 GB of RAM, and an Nvidia A100 GPU with an NQ of 100.

  For details on these benchmarks, refer to [Milvus Performance Evaluation 2023](https://zilliz.com/resources).

  Special thanks go to @wphicks and @cjnolet from Nvidia for their contributions to the RAFT code.

- Memory-mapped (mmap) file I/O

  In scenarios where there is not sufficient memory for large datasets and it is insensitive to query performance, Milvus uses mmap to allow the system to treat parts of a file as if they were in memory. This can reduce memory usage and improve performance if all data is held in the system page cache.
  
- Range search

  The range search method returns all vectors within a certain radius around the query point, as opposed to the k-nearest ones. Range search is a valuable tool for querying vectors within a specific distance, for use cases such as anomaly detection and object distinction.
 
- Upsert

  Milvus now supports record upsert, similar to that in a relational database. This operation atomically deletes the original entity with the primary key (PK) and inserts a new entity. Note that upserts can only be applied to a given primary key.

- Change Data Capture(CDC)
 
  Change Data Capture is a process that identifies and tracks changes to data in a database. Milvus CDC provides real-time subscriptions to data and database events as they occur.
 
In addition to the aforementioned features, later release 2.3 of Milvus will also introduce new features such as accurate count support, Feder visualization support and growing segment indexing. 

- Partition Dynamic Load/Release
 
  Milvus later will offer Dynamic Partitioning, which allows users to conveniently create and load a partition without releasing the collection. In addition, Milvus 2.3.0 will improve memory management, performance, and manageability under multi-partition cases.

Now, you can download [Milvus](https://hub.docker.com/r/milvusdb/milvus) and [get started](https://milvus.io).