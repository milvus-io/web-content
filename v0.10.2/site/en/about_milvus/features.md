---
id: features.md
---

# Key features

## Comprehensive Similarity Metrics

Milvus offers frequently used similarity metrics, including Euclidean distance, inner product, Hamming distance, Jaccard distance, etc, allowing you to explore vector similarity in the most effective and efficient way possible.

## Leading-Edge Performance

Milvus is built on top of multiple optimized Approximate Nearest Neighbor Search (ANNS) indexing libraries, such as faiss, annoy, and hnswlib, ensuring that you always get the best performance across various scenarios.

## Dynamic Data Management

No longer troubled by static data, you can operate data with insertion, deletion, search and update whenever needed. 

## Near Real Time Search

Data is available for search almost immediately after being inserted and updated. Milvus does the heavy lifting in your best interests in terms of both result accuracy and data consistency.

## Cost-Efficient

Milvus harnesses the parallelism of modern processors and enables billion-scale similarity searches in milliseconds on a single off-the-shelf server. 

## Rich Data Type and Advanced Search (coming soon)

Milvus supports various data types for fields in a record. You can also use advanced search methods, such as filtering, sorting and aggregation for one or multiple fields.

## Highly Scalable and Robust

You can deploy Milvus in a distributed environment. To increase the capacity and reliability of a Milvus cluster, you can simply add more nodes.

## Cloud Native

We make it easy for you to run Milvus on public cloud, private cloud, or anywhere in between.

## Ease of Use

Milvus provides easy-to-use SDKs in Python, Java, Go and C++, as well as RESTful APIs.

## Write Aheade Log

Milvus implements a Write Ahead Log (WAL) function similar to the one in database system. Any modification to the data are stored into a log file, and then written to Milvus. Once the process of writing to Milvus fails (possible reasons include insufficient disk space or exhausted memory), Milvus recovers the operations that have not been completed from the log file when it restarts, and then re-execute these operations. See [Write Ahead Log](write_ahead_log.md) for details.

## DSL

Milvus provides DSL (Domain-specific language) based on JSON structure. You can use DSL to query data.

## Mishards

Mishards is a Milvus cluster sharding middleware developed in Python. It handles request forwarding, read-write separation, horizontal and dynamic scalability, so it provides users with a Milvus instance that can be expanded by memory and computing power. See [Mishards](mishards.md) for details.

## Heterogeneous Computing

Milvus can schedule multiple GPUs for vector search and index building. Taking advantage of the GPU's powerful parallel computing capabilities, Milvus has excellent performance on time-consuming tasks such as mass query and vector index building.

## Vector Index

Milvus supports multiple indexes based on Faiss, NMSLIB, and Annoy, such as tree-based index, graph index, and quantization index. See [Vector Index](index_overview.md) for details of vector index. See [Performance Tuning](tuning.md) for details about how to select indexes and index parameters.

## Monitoring and Alerting

Milvus uses Prometheus to store and monitor its metrics and Grafana to visualize data. See [Monitor](monitor.md) for details.