---
id: m2m_legacy.md
title: Version Migration
related_key: version migration
summary: Use MilvusDM for version migration.
deprecate: true
---

# Version Migration
This topic describes how to migrate data from Milvus 1.x to Milvus 2.0 using [MilvusDM](migrate_overview.md), an open-source tool specifically designed for Milvus data migration. 

<div class="alert note">
MilvusDM does not support migrating data from Milvus 2.0 standalone to Milvus 2.0 cluster.
</div>


## Prerequisites

You need to [install MilvusDM](milvusdm_install.md) before migrating Milvus data.

## 1. Download YAML file

Download the `M2M.yaml` file.

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/M2M.yaml
```

## 2. Set the parameters

Configuration parameters include:

| Parameter                 | Description                               | Example                      |
| ------------------------- | ----------------------------------------- | ---------------------------- |
| `milvus_version`          |  Version of Milvus.                       | 2.0.0                       |
| `data_path`               |  Path to the HDF5 files. Set either `data_path` or `data_dir`.                      | - /Users/zilliz/float_1.h5 <br/> - /Users/zilliz/float_2.h5                   |
| `data_dir`         |  Directory of the HDF5 files. Set either `data_path` or `data_dir`.                      | '/Users/zilliz/Desktop/HDF5_data'                     |
| `dest_host`          |  Milvus server address.                      | '127.0.0.1'     |
| `dest_port`          |  Milvus server port.                       | 19530                      |
| `mode`         |  Mode of migration, including `skip`, `append`, and `overwrite`. This parameter works only when the specified collection name exists in the Milvus library. <br/> <li>`skip` refers to skipping data migration if the specified collection or partition already exists.</li> <li>`append` refers to appending data if the specified collection or partition already exists.</li> <li>`overwrite` refers to deleting existing data before insertion if the specified collection or partition already exists.</li>                    | 'append'                     |
| `dest_collection_name`          | Name of the collection to import data to.                      | 'test_float'                       |
| `dest_partition_name` (optional)         |  Name of the partition to import data to.                  | 'partition_1'                 |
| `collection_parameter`         |  Collection-specific information including vector dimension, index file size, and similarity metric.                      | "dimension: 512 <br/> index_file_size: 1024 <br/> metric_type: 'HAMMING'"                     |


The following two examples of configuration are for your reference. The first example involves setting `mysql_parameter`. If you do not use MySQL for managing vector IDs in Milvus 1.x, refer to the second example.

### Example 1

```
M2M:
  milvus_version: 2.0.0
  source_milvus_path: '/home/user/milvus'
  mysql_parameter:
    host: '127.0.0.1'
    user: 'root'
    port: 3306
    password: '123456'
    database: 'milvus'
  source_collection: # specify the 'partition_1' and 'partition_2' partitions of the 'test' collection.
    test:
      - 'partition_1'
      - 'partition_2'
  dest_host: '127.0.0.1'
  dest_port: 19530
  mode: 'skip' # 'skip/append/overwrite'
```

### Example 2

```
M2M:
  milvus_version: 2.0.0
  source_milvus_path: '/home/user/milvus'
  mysql_parameter:
  source_collection: # specify the collection named 'test'
    test:
  dest_host: '127.0.0.1'
  dest_port: 19530
  mode: 'skip' # 'skip/append/overwrite'
```

## 3. Migrate data from Milvus to Milvus

Run MilvusDM to import data from Milvus 1.x to Milvus 2.0 with the following command.

```
$ milvusdm --yaml M2M.yaml
```



## What's next
- If you are interested in migrating data in other forms into Milvus,
  - Learn how to [Migrate Data from Faiss to Milvus](f2m.md).
  - Learn how to [Migrate from HDF5 to Milvus](h2m.md).
- If you are interested in learning more about the data migration tool,
  - Read the overview of [MilvusDM](migrate_overview.md).
