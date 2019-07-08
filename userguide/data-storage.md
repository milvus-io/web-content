---
id: data-storage
title: Data storage
sidebar_label: Data storage
---

# Data storage

## Vector data storage
Whenever new vector data is loaded into Milvus, they are automatically stored in 2 places: local hard drive and [MinIO private cloud](https://min.io/product/multi-cloud-gateway#multi-cloud-gateway). 

Keeping a copy of the data in the cloud ensures the completeness and accessibility of your data when indexed.

## Metadata storage

In Milvus, metadata refers to data that provides information about vector data. Depending on how your database is deployed, metadata can be stored in the following databases.

| Database  |  Milvus deployment  |
|-----------|---------------------|
| SQLite 3  | Single server       |
| MySQL     | Distributed cluster servers|

