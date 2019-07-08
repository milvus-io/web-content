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

In Milvus, metadata refers to data that provides information about vector data. Depending on how your database is deployed, metadata is stored in the following 

Sqlite3: Single mode only.
MySQL: Single/Cluster mode
