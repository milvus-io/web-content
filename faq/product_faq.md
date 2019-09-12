---
id: product_faq
title: Product FAQ
sidebar_label: Product FAQ
---

# Product FAQ

### What is Milvus?

Milvus is a GPU-accelerated feature vector search engine that provides extraordinary performance for similarity search over massive feature vectors. It can be easily deployed on both bare metal and cloud platforms with Linux operating systems.

### When is Milvus a good choice?

Milvus is best suited for applications that require reliable vector similarity search, and millisecond response times, regardless of scale. It is built to automatically replicate, rebalance, and recover with minimal configuration and operational overhead. 

Milvus returns single-row reads in 0.6ms or less and single-row writes in 0.03ms or less, and supports a variety of machine learning models for optimizing query performance. It is also suitable for hybrid search for structured and unstructured data.

### How to use Milvus?

Milvus provides Python and C++ SDK. It also supports all Thrift communication types.

### How easy is it to use Milvus?

Milvus can be easily installed through pulling docker images and simple pip install for SDKs. It is designed to be "easy to use". For more details, see [Install Milvus](userguide/install_milvus.md).

To start your first vector search program, please go to [Milvus example code](userguide/example_code.md).

### Is Milvus highly available?

Milvus is designed to be used in mission critical systems with high SLAs. Milvus cluster ensures continuous service capability in case of any single point of failure.

### How does Milvus work?

All vectors will be indexed and stored in Milvus, each of them will be assigned with an ID. When vectors are searched, Milvus will return IDs of vectors that are most similar to the given ones.

### Which index types are supported?

Currently Milvus supports:

- `Flat`

  Provides 100% accuracy for recalls. However, performance might be downgraded due to huge computation effort.

- `IVFFlat`

  K-means based similarity search which is balanced between accuracy and performance.

- `IVF_SQ8`

  Adopts a scalar quantization strategy that significantly reduces the size of a vector (by about 3/4). It improves the overall throughput of vector processing.

### Does Milvus support simultaneous inserting and searching?

Absolutely. You can simultaneously insert and search data in Milvus. If you want this function, you are recommended to set the parameter `insert_cache_immediately` to `true` in section `cache_config` at `home/$USER/milvus/conf/server_config.yaml`.

### Where are the data stored?

Vector data are stored either in your local disk or MinIO cloud. For more details about storage, read [Milvus data storage](reference/data_store.md).

### How does Milvus compare to FAISS and SPTAG?

While all of these supports large-scale vector similarity search, Milvus is the only one that is a mature and easy-to-use vector indexing database system that scales easily, rebalances and repairs itself automatically.

For more insight, see [Milvus in Comparison](reference/comparison.md). 

### Have questions that were not answered?
If you still have questions that are not covered in this list, you can take the following steps to find an answer:

- Visit our [Milvus-io](https://github.com/milvus-io) on GitHub to ask questions, find answers, and help other users.
- Check the list of [Operational FAQ](operational_faq.md) to get answers to frequently asked questions about operating Milvus.

