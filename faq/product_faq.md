---
id: product_faq
title: Product FAQ
sidebar_label: Product FAQ
---

# Product FAQ

### What is Milvus?

Milvus is an open source similarity search engine for massive feature vectors. It is built with heterogeneous computing architecture for the best performance and cost efficiency. Searches over billion-scale vectors take only milliseconds with minimum computing resources. It can be easily deployed on both bare metal and cloud platforms with Linux operating systems.

### When is Milvus a good choice?

Milvus is best suited for applications that require reliable and efficient similarity search of large-scale vectors, and millisecond response times, regardless of scale. 

Milvus returns single-row reads in 0.6 ms or less and single-row writes in approximately 0.03 ms, and supports a variety of indexes for optimizing query performance. It can also be used in hybrid search for both structured and unstructured data.

### How to use Milvus?

Milvus provides [Python](https://pypi.org/project/pymilvus/), [Java](https://milvus-io.github.io/milvus-sdk-java/javadoc/io/milvus/client/package-summary.html) and C++ SDKs. It also supports all Thrift communication types. 

### How easy is it to use Milvus?


Milvus can be easily installed through pulling docker images and simple pip install for SDKs. For more details, see [Install Milvus](../userguide/install_milvus.md).


To start your first vector search program, please go to [Milvus example code](../userguide/example_code.md).

### Is Milvus highly available?

Milvus is designed to be used in mission critical systems with high SLAs. Milvus cluster ensures continuous service capability in case of any single point of failure.

### How does Milvus work?

When vectors are imported into Milvus, they will be stored and indexed. Each vector is assigned a unique ID. User-defined vector IDs are also supported. When vector are searched, IDs of the most similar vectors will be returned.

### Which index methods are supported?

Currently, Milvus supports the following index methods:

- `Flat`

  Provides 100% accuracy for recalls. However, performance might be downgraded due to huge computation effort.

- `IVFFlat`

  K-means based similarity search which is balanced between accuracy and performance.

- `IVF_SQ8`

  Adopts a scalar quantization strategy that significantly reduces vector size (by about 3/4). It improves the overall throughput of vector processing.

- `IVF_SQ8H`

  An enhanced indexing algorithm of `IVF_SQ8`. It supports heterogeneous computation on both CPU and GPU, which significantly improves the search performance. 
  
  To use this index, make sure both `cpu` and `gpu` are added as resources in the [Milvus configuration file](../reference/milvus_config.md). 

### Does Milvus support simultaneous inserting and searching?

Absolutely. You can simultaneously insert and search data in Milvus. If you want this function, it is recommended to set the parameter `cache_insert_data` to `true` in section `cache_config` at `home/$USER/milvus/conf/server_config.yaml`.

### Where are the data stored?

Vectors that have been imported into Milvus are stored in your local disk. Metadata can be stored either in MySQL or SQLite 3. For more details about storage, read [Milvus data storage](../reference/data_store.md).

### How does Milvus compare to FAISS and SPTAG?

While all of these supports large-scale vector similarity search, Milvus is the only one that is a high-performance and easy-to-use vector search engine that scales easily.

For more insight, see [Milvus in Comparison](../reference/comparison.md). 

### Have questions that were not answered?
If you still have questions that are not covered in this list, you can take the following steps to find an answer:

- Visit our [Milvus](https://github.com/milvus-io/milvus/issues) on GitHub to ask questions, share ideas, and help other users.
- Check the list of [Operational FAQ](operational_faq.md) to get answers to frequently asked questions about operating Milvus.
- Join our [Slack community](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) to discuss and communicate with other users.

