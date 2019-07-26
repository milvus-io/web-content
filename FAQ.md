---
id: FAQ
title: FAQ
sidebar_label: FAQ
---

# FAQ

### What is Milvus?

Milvus is a GPU-accelerated feature vector search engine, provides extraordinary performance for similiarity serach over massive feature vectors. It can be easily deployed on both bare metal and cloud plantforms with Linux operating systems. 
    
### How to use Milvus?

Milvus provides Python and C++ SDK, also supports all Thrift communication types.

### How easy to use Milvus?

Milvus can be easily deployed throught pulling docker images and simple pip install for SDKs. It is designed to be "easy to use". To start your first vector search program, please go to https://milvus.io/docs/en/QuickStart/.

### Is Milvus high available?

Milvus is designed to be used in mission critical systems with high SLAs. Milvus cluster ensures continuous service capability in case of any single ponit of failurs. 

### How does Milvus work?

All vectors will be indexed and stored in Milvus, each of them will be assigned with an ID. When vectors are searched, Milvus will return IDs of vectors that are most similar to the given vectors.


### Which index types are supported?

Currently Milvus supports:

- Flat

  Provides 100% accuracy for recalls. However, performance might be downgraded due to large computation. 
  
- IVFFlat

  K-means based similarity search which is banlanced between accuracy and performance. 


### Does Milvus support simultaneous searching and importing?

Absolutely. 

