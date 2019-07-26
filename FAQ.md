---
id: FAQ
title: FAQ
sidebar_label: FAQ
---

# FAQ

### What is Milvus?

Milvus is a feature vector indexing database. It can be easily employed in x86 architecture server and virtual environment. It currently supports Linux operation system. 
    
### Are there any SDKs for Milvus?

 Yes, Milvus provides Python and C++ SDK. It also supports all Thrift communication type.

### Is Milvus easy to use?

Yes, Milvus is design for easy understanding and usage. You can treat Milvus as an ordinary database system. For detailed example programs, please read https://pypi.org/project/pymilvus/.

### Does Milvus has high availability?

Yes, Milvus is designed to be highly available. Milvus cluster especially ensures an agreed level of performance even if some of the storage or computing components fail. 

### How does the search works in Milvus?

All vectors stored in Milvus will be given an ID. When you search a vector, Milvus will return several IDs of vectors most similar to the target vector.


### How to choose vector indexing type?

In Milvus, you can choose from the following index types:

- Flat

  Provides 100% precise matching of vectors. However, as the computation is huge, search speed might be affected. 
  
- IVFFlat

  K-means based search which supports large scale vector matching.


### Does Milvus support searching while inserting?

Absolutely. 

### Where is the data stored?

Vector data is stored either in your local disk or MinIO cloud. For more details about storage, read [Data storage](userguide/data_storage.md).

