---
id: milvus_lite.md
summary: Get started with Milvus Lite.
title: Run Milvus Lite Locally
---

# Run Milvus Lite Locally

This page illustrates how to run Milvus locally with Milvus Lite. Milvus Lite is the lightweight version of [Milvus](https://github.com/milvus-io/milvus), an open-source vector database that powers AI applications with vector embeddings and similarity search.


## Overview

Milvus Lite can be imported into your Python application, providing the core vector search functionality of Milvus. Milvus Lite is already included in the [Python SDK of Milvus](https://github.com/milvus-io/pymilvus). It can be simply deployed with `pip install pymilvus`. 

With Milvus Lite, you can start building an AI application with vector similarity search within minutes! Milvus Lite is good for running in the following environment:
- Jupyter Notebook / Google Colab
- Laptops
- Edge Devices

Milvus Lite shares the same API with Milvus Standalone and Distributed, and covers most of the features such as vector data persistence and management, vector CRUD operations, sparse and dense vector search, metadata filtering, multi-vector and hybrid_search. Together, they provide a consistent experience across different types of environments, from edge devices to clusters in cloud, fitting use cases of different size. With the same client-side code, you can run GenAI apps with Milvus Lite on a laptop or Jupyter Notebook, or Milvus Standalone on Docker container, or Milvus Distributed on massive scale Kubernetes cluster serving billions of vectors in production.

## Prerequisites

Milvus Lite currently supports the following environmnets:
- Ubuntu >= 20.04 (x86_64 and arm64)
- MacOS >= 11.0 (Apple Silicon M1/M2 and x86_64)

Please note that Milvus Lite is only suitable for small scale vector search use cases. For a large scale use case, we recommend using [Milvus Standalone](https://milvus.io/docs/install-overview.md#Milvus-Standalone) or [Milvus Distributed](https://milvus.io/docs/install-overview.md#Milvus-Distributed). You can also consider the fully-managed Milvus on [Zilliz Cloud](https://zilliz.com/cloud).


## Set up Milvus Lite

```shell
pip install -U pymilvus
```

We recommend using `pymilvus`. Since `milvus-lite` is included in `pymilvus` version 2.4.2 or above, you can `pip install` with `-U` to force update to the latest version and `milvus-lite` is automatically installed.

If you want to explicitly install `milvus-lite` package, or you have installed an older version of `milvus-lite` and would like to update it, you can do `pip install -U milvus-lite`.

## Connect to Milvus Lite

In `pymilvus`, specify a local file name as uri parameter of MilvusClient will use Milvus Lite.
```python
from pymilvus import MilvusClient
client = MilvusClient("./milvus_demo.db")
```

After running the above code snippet, a database file named **milvus_demo.db** will be generated in the current folder.

> **_NOTE:_**  Note that the same API also applies to Milvus Standalone, Milvus Distributed and Zilliz Cloud, the only difference is to replace local file name to remote server endpoint and credentials, e.g. 
`client = MilvusClient(uri="http://localhost:19530", token="username:password")`.

## Examples

Following is a simple demo showing how to use Milvus Lite for text search. There are more comprehensive [examples](https://github.com/milvus-io/bootcamp/tree/master/bootcamp/tutorials) for using Milvus Lite to build applications
such as [RAG](https://github.com/milvus-io/bootcamp/blob/master/tutorials/quickstart/build_RAG_with_milvus.ipynb), [image search](https://github.com/milvus-io/bootcamp/blob/master/tutorials/quickstart/image_search_with_milvus.ipynb), and using Milvus Lite in popular RAG framework such as [LangChain](https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_langchain.ipynb) and [LlamaIndex](https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_llamaindex.ipynb)!

```python
from pymilvus import MilvusClient
import numpy as np

client = MilvusClient("./milvus_demo.db")
client.create_collection(
    collection_name="demo_collection",
    dimension=384  # The vectors we will use in this demo has 384 dimensions
)

# Text strings to search from.
docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]
# For illustration, here we use fake vectors with random numbers (384 dimension).

vectors = [[ np.random.uniform(-1, 1) for _ in range(384) ] for _ in range(len(docs)) ]
data = [ {"id": i, "vector": vectors[i], "text": docs[i], "subject": "history"} for i in range(len(vectors)) ]
res = client.insert(
    collection_name="demo_collection",
    data=data
)

# This will exclude any text in "history" subject despite close to the query vector.
res = client.search(
    collection_name="demo_collection",
    data=[vectors[0]],
    filter="subject == 'history'",
    limit=2,
    output_fields=["text", "subject"],
)
print(res)

# a query that retrieves all entities matching filter expressions.
res = client.query(
    collection_name="demo_collection",
    filter="subject == 'history'",
    output_fields=["text", "subject"],
)
print(res)

# delete
res = client.delete(
    collection_name="demo_collection",
    filter="subject == 'history'",
)
print(res)
```

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
| [create_index()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md)      | Only supports `FLAT` index type.                                                                      |
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

### Vector Index Types

Milvus Lite only supports [FLAT](https://milvus.io/docs/index.md?tab=floating#FLAT) index type. It uses FLAT type regardless of the specified index type in collection.

### Search Features

Milvus Lite supports Sparse Vector, Multi-vector, Hybrid Search.

### Partition

Milvus Lite does not support partitions and partition-related methods.

### Users & Roles

Milvus Lite does not support users and roles and related methods.

### Alias

Milvus Lite does not support aliases and alias-related methods.

## Migrating data from Milvus Lite

All data stored in Milvus Lite can be easily exported and loaded into other types of Milvus deployment, such as Milvus Standalone on Docker, Milvus Distributed on K8s, or fully-managed Milvus on [Zilliz Cloud](https://zilliz.com/cloud).

Milvus Lite provides a command line tool that can dump data into a json file, which can be imported into [milvus](https://github.com/milvus-io/milvus) and [Zilliz Cloud](https://zilliz.com/cloud)(the fully managed cloud service for Milvus). The milvus-lite command will be installed together with milvus-lite python package 

```shell
# Install
pip install -U "pymilvus[bulk_writer]"

milvus-lite dump -h

usage: milvus-lite dump [-h] [-d DB_FILE] [-c COLLECTION] [-p PATH]

optional arguments:
  -h, --help            show this help message and exit
  -d DB_FILE, --db-file DB_FILE
                        milvus lite db file
  -c COLLECTION, --collection COLLECTION
                        collection that need to be dumped
  -p PATH, --path PATH  dump file storage dir
```
The following example dumps all data from `demo_collection` collection that's stored in `./milvus_demo.db` (Milvus Lite database file)

To export data:

```shell
milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
# ./milvus_demo.db: milvus lite db file
# demo_collection: collection that need to be dumped
#./data_dir : dump file storage dir
```

With the dump file, you can upload data to Zilliz Cloud via [Data Import](https://docs.zilliz.com/docs/data-import), or upload data to Milvus servers via [Bulk Insert](https://milvus.io/docs/import-data.md).


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
  - [Amazon EKS](eks.md)
  - [Google Cloud](gcp.md)
  - [Microsoft Azure](azure.md)
- Explore [Milvus Backup](milvus_backup_overview.md), an open-source tool for Milvus data backups.
- Explore [Birdwatcher](birdwatcher_overview.md), an open-source tool for debugging Milvus and dynamic configuration updates.
- Explore [Attu](https://github.com/zilliztech/attu), an open-source GUI tool for intuitive Milvus management.
- [Monitor Milvus with Prometheus](monitor.md).
