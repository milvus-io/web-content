---
id: FAQ
title: FAQ
sidebar_label: FAQ
---

# FAQ

### What is Milvus?

Milvus is a feature vector database. It can be easily employed in x86 architecture server and virtual environment. It currently supports Linux operation system. 
    
### Are there any SDKs for Milvus?

 Yes, Milvus provides Python and C++ SDK. It also supports all Thrift communication type.

### Is Milvus easy to use?

Yes, Milvus is design for easy understanding and usage. You can treat Milvus as an ordinary database system. For detailed example programs, please read https://pypi.org/project/pymilvus/.

### Does Milvus has high availability?

Yes, Milvus high availability characteristic ensures an agreed level of performance even if some of the sotrage or computing components failed. 

### How does the search works in Milvus, after the vecters are imported?

All vectors stored in Milvus will be given an ID. Users need to import vector ID and other features into another database system. When users search a vector, Milvus will return several IDs of vectors most similar to the target vector.


### How to choose vector indexing type?

依据用户的需求，如果用户需求精确匹配，那么请选择L2Flat类型索引。精确匹配，可以为用户提供100%精确匹配的向量，但是由于计算量巨大，性能影响也很大。如果用户不追求100%精确匹配，可以选择IVFFlat类型索引，支持大数据量的高精度匹配。

### Does Milvus support searching while inserting?

Absolutely. 
