---
id: FAQ
title: FAQ
sidebar_label: FAQ
---

# FAQ

### What is Milvus?

Milvus is a GPU-accelerated feature vector search engine that provides extraordinary performance for similarity search over massive feature vectors. It can be easily deployed on both bare metal and cloud platforms with Linux operating systems. 
### How to use Milvus?

Milvus provides Python and C++ SDK. It also supports all Thrift communication types.

### How easy is it to use Milvus?

Milvus can be easily deployed through pulling docker images and simple pip install for SDKs. It is designed to be "easy to use". To start your first vector search program, please go to https://milvus.io/docs/en/QuickStart/.

### Is Milvus highly available?

Milvus is designed to be used in mission critical systems with high SLAs. Milvus cluster ensures continuous service capability in case of any single point of failure. 

### How does Milvus work?

All vectors will be indexed and stored in Milvus, each of them will be assigned with an ID. When vectors are searched, Milvus will return IDs of vectors that are most similar to the given ones.


### Which index types are supported?

Currently Milvus supports:

- Flat

  Provides 100% accuracy for recalls. However, performance might be downgraded due to huge computation effort. 

- IVFFlat

  K-means based similarity search which is balanced between accuracy and performance.

- IVFSQ

  Adopts a scalar quantization strategy that significantly reduces the size of a vector (by about 3/4). It improves the overall throughput of vector processing.


### Does Milvus support simultaneous inserting and searching?

Absolutely. You can simultaneously insert and search data in Milvus. If you want this function, you are recommended to set the parameter "insert_cache_immediately" to 'True' in section *cache_config* at *home/$USER/milvus/conf/server_config.yaml*.

### Where are the data stored?

Vector data are stored either in your local disk or MinIO cloud. For more details about storage, read [Data storage](userguide/data_storage.md).

