---
id: f2m.md
title: Migrate from Faiss to Milvus
related_key: Faiss, migrate, import
summary: Learn how to migrate Faiss data to Milvus.
---

# Migrate Data from Faiss to Milvus

This topic describes how to import data from Faiss to Milvus using [MilvusDM](migrate_overview.md), an open-source tool specifically designed for Milvus data migration. 

## Prerequisites

You need to [install MilvusDM](milvusdm_install.md) before migrating Milvus data.

## 1. Download YAML file

Download the `F2M.yaml` file.

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/F2M.yaml
```

## 2. Set the parameters

Configuration parameters include:

| Parameter                 | Description                               | Example                      |
| ------------------------- | ----------------------------------------- | ---------------------------- |
| `milvus_version`          |  Version of Milvus.                       | 2.0.0                     |
| `data_path`               | Path to the data in Faiss.                   | '/home/user/data/faiss.index'                   |
| `data_dir`         |  Directory of the HDF5 files. Set either `data_path` or `data_dir`.                      | '/Users/zilliz/Desktop/HDF5_data'                     |
| `dest_host`          |  Milvus server address.                      | '127.0.0.1'     |
| `dest_port`          |  Milvus server port.                       | 19530                      |
| `mode`         |  Mode of migration, including `skip`, `append`, and `overwrite`. This parameter works only when the specified collection name exists in the Milvus library. <br/> <li>`skip` refers to skipping data migration if the specified collection or partition already exists.</li> <li>`append` refers to appending data if the specified collection or partition already exists.</li> <li>`overwrite` refers to deleting existing data before insertion if the specified collection or partition already exists.</li>                    | 'append'                     |
| `dest_collection_name`          | Name of the collection to import data to.                      | 'test'                       |
| `dest_partition_name` (optional)        |  Name of the partition to import data to.                   | 'partition'                 |
| `collection_parameter`         |  Collection-specific information including vector dimension, index file size, and similarity metric.                      | "dimension: 512 <br/> index_file_size: 1024 <br/> metric_type: 'HAMMING'"                     |

### Example 

The following example of configuration is for your reference. 

```
F2M:
  milvus_version: 2.0.0
  data_path: '/home/data/faiss1.index'
  dest_host: '127.0.0.1'
  dest_port: 19530
  mode: 'append'
  dest_collection_name: 'test'
  dest_partition_name: ''
  collection_parameter:
    dimension: 256
    index_file_size: 1024
    metric_type: 'L2'
```


## 3. Migrate data from Faiss to Milvus

Run MilvusDM to import data from Faiss to Milvus with the following command.

```
$ milvusdm --yaml F2M.yaml
```



## What's next
- If you are interested in migrating data in other forms into Milvus,
  - Learn how to [Migrate Data from HDF5 to Milvus](h2m.md).
- If you are looking for information about how to migrate data from Milvus 1.x to Milvus 2.0,
  - Learn [version migration](m2m.md).
- If you are interested in learning more about the data migration tool,
  - Read the overview of [MilvusDM](migrate_overview.md).
