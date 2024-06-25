---
id: milvus_lite.md
summary: Get started with Milvus Lite.
title: Run Milvus Lite Locally
---

# Run Milvus Lite Locally

This page illustrates how to run Milvus Lite locally for development and testing purposes.

## Overview

Milvus Lite is the lightweight version of [Milvus](https://github.com/milvus-io/milvus), an open-source vector database that powers AI applications with vector embeddings and similarity search.

Milvus Lite can be imported into your Python application, providing the core vector search functionality of Milvus. Milvus Lite is included in the [Python SDK of Milvus](https://github.com/milvus-io/pymilvus), thus it can be simply deployed with `pip install pymilvus`. This repo contains the core components of Milvus Lite.

Milvus Lite shares the same API and covers most of the features of Milvus. Together, they provide a consistent user experience across different types of environments, fitting use cases of different size. With the same client-side code, you can run a quick demo of less than a million vectors with Milvus Lite, or a small scale app with Milvus Docker container hosted on a single machine, and eventually to a large scale production deployment on Kubenetes serving billions of vectors at thousands of QPS.

## Prerequisites

Milvus Lite supports the following OS distributions and sillicon types:

- Ubuntu >= 20.04 (x86_64)
- MacOS >= 11.0 (Apple Silicon and x86_64)

Please note that Milvus Lite is good for getting started with vector search or building demos and prototypes. For a production use case, we recommend using Milvus on [Docker](install_standalone-docker.md) and [Kubenetes](install_cluster-milvusoperator.md), or considering the fully-managed Milvus on [Zilliz Cloud](https://zilliz.com/cloud).

## Set up Milvus Lite

Milvus Lite has been packed along with pymilvus, the Python SDK library of Milvus. To set up Milvus Lite, run the following command in the terminal.

```
pip install "pymilvus>=2.4.2"
```

## Connect to Milvus Lite

You can connect to Milvus Lite as follows.

```python
from pymilvus import MilvusClient

client = MilvusClient("milvus_demo.db")
```

After running the above code snippet, a database file named **milvus_demo.db** will be generated in the current folder.

## Limits

When running Milvus Lite, note that some features are not supported. The following tables summarize the usage limits on Milvus Lite.

### Collection

| Method / Parameter                                                                                                                   | Supported in Milvus Lite                                      |
|----------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------|
| [create_collection()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md)       | Support with limited parameters                               |
| `collection_name`                                                                                                          | Y                                                             |
| `dimension`                                                                                                                | Y                                                             |
| `primary_field_name`                                                                                                       | Y                                                             |
| `id_type`                                                                                                                  | Y                                                             |
| `vector_field_name`                                                                                                        | Y                                                             |
| `metric_type`                                                                                                              | Y                                                             |
| `auto_id`                                                                                                                  | Y                                                             |
| `schema`                                                                                                                   | Y                                                             |
| `index_params`                                                                                                             | Y                                                             |
| `enable_dynamic_field`                                                                                                     | Y                                                             |
| `num_shards`                                                                                                               | N                                                             |
| `partition_key_field`                                                                                                      | N                                                             |
| `num_partitions`                                                                                                           | N                                                             |
| `consistency_level`                                                                                                        | N (Only supports `Strong`; Any configuration will be treated as `Strong`.)          |
| [get_collection_stats()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md) | Supports getting collection statistics.                       |
| `collection_name`                                                                                                          | Y                                                             |
| `timeout`                                                                                                                  | Y                                                             |
| [describe_collection()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/describe_collection.md)   | `num_shards`, `consistency_level`, and `collection_id` in response are invalid. |
| `timeout`                                                                                                                  | Y                                                             |
| [has_collection()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/has_collection.md)             | Supports checking if a collection exists.                     |
| `collection_name`                                                                                                          | Y                                                             |
| `timeout`                                                                                                                  | Y                                                             |
| [list_collections()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_collections.md)         | Supports listing all collections.                             |
| [drop_collection()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/drop_collection.md)           | Supports dropping a collection.                               |
| `collection_name`                                                                                                          | Y                                                             |
| `timeout`                                                                                                                  | Y                                                             |
| [rename_collection()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/rename_collection.md)       | Renaming a collection is not supported.                             |

### Field & Schema

| Method / Parameter                                                                                                     | Supported in Milvus Lite        |
|--------------------------------------------------------------------------------------------------------------|---------------------------------|
| [create_schema()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md) | Support with limited parameters |
| `auto_id`                                                                                                    | Y                               |
| `enable_dynamic_field`                                                                                       | Y                               |
| `primary_field`                                                                                              | Y                               |
| `partition_key_field`                                                                                        | N                               |
| [add_field()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md)    | Support with limited parameters |
| `field_name`                                                                                                 | Y                               |
| `datatype`                                                                                                   | Y                               |
| `is_primary`                                                                                                 | Y                               |
| `max_length`                                                                                                 | Y                               |
| `element_type`                                                                                               | Y                               |
| `max_capacity`                                                                                               | Y                               |
| `dim`                                                                                                        | Y                               |
| `is_partition_key`                                                                                           | N                               |

### Insert & Search

| Method / Parameter                                                                                  | Supported in Milvus Lite        |
|-------------------------------------------------------------------------------------------|---------------------------------|
| [search()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md) | Support with limited parameters |
| `collection_name`                                                                         | Y                               |
| `data`                                                                                    | Y                               |
| `filter`                                                                                  | Y                               |
| `limit`                                                                                   | Y                               |
| `output_fields`                                                                           | Y                               |
| `search_params`                                                                           | Y                               |
| `timeout`                                                                                 | Y                               |
| `partition_names`                                                                         | N                               |
| `anns_field`                                                                              | Y                               |
| [query()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md)   | Support with limited parameters |
| `collection_name`                                                                         | Y                               |
| `filter`                                                                                  | Y                               |
| `output_fields`                                                                           | Y                               |
| `timeout`                                                                                 | Y                               |
| `ids`                                                                                     | Y                               |
| `partition_names`                                                                         | N                               |
| [get()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/get.md)                                                                                   | Support with limited parameters |
| `collection_name`                                                                         | Y                               |
| `ids`                                                                                     | Y                               |
| `output_fields`                                                                           | Y                               |
| `timeout`                                                                                 | Y                               |
| `partition_names`                                                                         | N                               |
| [delete()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/delete.md) | Support with limited parameters |
| `collection_name`                                                                         | Y                               |
| `ids`                                                                                     | Y                               |
| `timeout`                                                                                 | Y                               |
| `filter`                                                                                  | Y                               |
| `partition_name`                                                                          | N                               |
| [insert()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md) | Support with limited parameters |
| `collection_name`                                                                         | Y                               |
| `data`                                                                                    | Y                               |
| `timeout`                                                                                 | Y                               |
| `partition_name`                                                                          | N                               |
| [upsert()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/upsert.md) | Support with limited parameters |
| `collection_name`                                                                         | Y                               |
| `data`                                                                                    | Y                               |
| `timeout`                                                                                 | Y                               |
| `partition_name`                                                                          | N                               |

### Load & Release

| Method / Parameter                                                                                                              | Supported in Milvus Lite |
|-----------------------------------------------------------------------------------------------------------------------|--------------------------|
| [load_collection()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/load_collection.md)       | Y                        |
| `collection_name`                                                                                                     | Y                        |
| `timeout`                                                                                                             | Y                        |
| [release_collection()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/release_collection.md) | Y                        |
| `collection_name`                                                                                                     | Y                        |
| `timeout`                                                                                                             | Y                        |
| [get_load_state()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md)         | Getting load status is not supported.            |
| [refresh_load()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/refresh_load.md)             | Loading the unloaded data of a loaded collection is not supported.            |
| [close()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/close.md)                               | Y                        |

### Index

| Method / Parameter                                                                                                       | Supported in Milvus Lite                                                                               |
|----------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| [list_indexes()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_collections.md) | Listing indexes is supported.                                                                          |
| `collection_name`                                                                                              | Y                                                                                                      |
| `field_name`                                                                                                   | Y                                                                                                      |
| [create_index()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md)      | Only supports partial index types: `FLAT`, `HNSW`, `BIN_FLAT`, `SPARSE_INVERTED_INDEX`, `SPARSE_WAND`. |
| `index_params`                                                                                                 | Y                                                                                                      |
| `timeout`                                                                                                      | Y                                                                                                      |
| [drop_index()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/drop_index.md)          | Dropping indexes is supported.                                                                         |
| `collection_name`                                                                                              | Y                                                                                                      |
| `index_name`                                                                                                   | Y                                                                                                      |
| `timeout`                                                                                                      | Y                                                                                                      |
| [describe_index()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md)  | Describing indexes is supported.                                                                       |
| `collection_name`                                                                                              | Y                                                                                                      |
| `index_name`                                                                                                   | Y                                                                                                      |
| `timeout`                                                                                                      | Y                                                                                                      |

### Partition

Milvus Lite does not support partitions and partition-related methods.

### Users & Roles

Milvus Lite does not support users and roles and related methods.

### Alias

Milvus Lite does not support aliases and alias-related methods.

### Others

For other methods not listed in the above tables, Milvus Lite does not support them.

## What's next

Having connected to Milvus Lite, you can:

- Check [Quickstart](quickstart.md) to see what Milvus can do.

- Learn the basic operations of Milvus:
  - [Manage Databases](manage_databases.md)
  - [Manage Collections](manage-collections.md)
  - [Manage Partitions](manage-partitions.md)
  - [Insert, Upsert & Delete](insert-update-delete.md)
  - [Single-Vector Search](single-vector-search.md)
  - [Hybrid Search](multi-vector-search.md)

- [Upgrade Milvus Using Helm Chart](upgrade_milvus_cluster-helm.md).
- [Scale your Milvus cluster](scaleout.md).
- Deploy your Milvus cluster on clouds:
  - [Amazon EC2](aws.md)
  - [Amazon EKS](eks.md)
  - [Google Cloud](gcp.md)
  - [Google Cloud Storage](gcs.md)
  - [Microsoft Azure](azure.md)
  - [Microsoft Azure Blob Storage](abs.md)
- Explore [Milvus Backup](milvus_backup_overview.md), an open-source tool for Milvus data backups.
- Explore [Birdwatcher](birdwatcher_overview.md), an open-source tool for debugging Milvus and dynamic configuration updates.
- Explore [Attu](https://milvus.io/docs/attu.md), an open-source GUI tool for intuitive Milvus management.
- [Monitor Milvus with Prometheus](monitor.md).
