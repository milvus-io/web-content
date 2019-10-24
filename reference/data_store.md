---
id: data_store
title: Data Storage
sidebar_label: Data Storage
---

# Data Storage

## Vector data storage

Whenever new vectors are loaded into Milvus, they are automatically stored in the local disk.

Keeping a copy of the data in the cloud ensures the completeness and accessibility of your data when indexed.

## Metadata storage

In Milvus, metadata refers to data that provides information about vector data. Depending on how Milvus is deployed, metadata can be stored in the following databases.

| Database | Milvus deployment           |
| -------- | --------------------------- |
| SQLite 3 | Single server               |
| MySQL    | Distributed cluster         |

## Related links
[Import Data](../userguide/import_data.md)
