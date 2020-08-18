---
id: overview.md
---

# What is Milvus 

As an open source vector similarity search engine, Milvus is easy-to-use, highly reliable, scalable, robust, and blazing fast. It integrates vector index libraries such as Faiss, NMSLIB, and Annoy, hides their complexity, and provides simple and consistent APIs. Milvus offers efficient means of managing vector data, including adding, deleting, and modifying vector and non-vector data. Aside from near real-time search for vectors, Milvus also supports filtering scalar data. With the increase of data and query scale, Milvus also provides a solution for cluster sharding, which supports functions such as read/write separation, horizontal scalability, and dynamic scalability, to cope with large data volume. Currently, Milvus is a single-node server based on the client-server model. It provides storage and search services for TB-level feature data. For scenarios with large data size or high concurrency requirements, you can use Mishards, an experimental cluster sharding middleware, for deployment.

## Overall architecture

![Milvus architecture](../../../assets/milvus_arch.png)

On the server side, Milvus consists of two parts: Milvus server and Meta store.

* Milvus server provides the main functions of Milvus, including the data storage, data management, and data search.
* Meta store stores Milvus metadata. Currently, Milvus supports MySQL and SQLite as the database for metadata.

These capabilities facilitate the extensive use of Milvus in hundreds of organizations and institutions worldwide in the following scenarios:

- Image, video, and audio search
- Text search, recommender system, interactive question answering system, and other text search fields
- Drug discovery, genetic screening, and other biomedical fields

In addition to core functions such as data management and vector search, Milvus also provides

- JSON-based DSL that contains flexible and convenient search methods,
- SDK and RESTful APIs based on Python / Java / Go / C++,
- monitoring and alarm system based on Prometheus,
- deployment methods based on Docker and Kubernetes.

The above features have greatly enhanced the ease of use of Milvus.

Milvus is a user-friendly product out of the box because all configuration parameters have default values. With the growing understanding of Milvus, you will find that Milvus is flexible and configurable in its entirety. You can explore the advanced features of Milvus to optimize the storage and search of vectors to better serve your business.

Milvus was released under the Apache 2.0 License and officially open sourced in October 2019. It is an incubation project of the [LF AI](https://lfai.foundation/) Foundation. The source code of Milvus is hosted on GitHub: [Milvus · An Open Source Vector Similarity Search Engine](https://github.com/milvus-io/milvus). If you want to join our developer community, welcome to visit: [Contribute to Milvus](https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md#contributing-to-milvus).

If you have any questions about the functions or SDK of Milvus, you are welcomed to join [Slack](https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ) and talk with us.