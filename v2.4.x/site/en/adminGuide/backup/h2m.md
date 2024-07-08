---
id: h2m.md
title: HDF5 to Milvus
related_key: HDF5, migrate, import
summary: Import HDF5 files to Milvus.
deprecate: true
---

# Migrate Data from HDF5 to Milvus

This topic describes how to import data in HDF5 files into Milvus using [MilvusDM](migrate_overview.md), an open-source tool specifically designed for Milvus data migration. 

## Prerequisites

You need to [install MilvusDM](milvusdm_install.md) before migrating Milvus data.

## 1. Download YAML file

Download the `M2H.yaml` file.

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/M2H.yaml
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
| `dest_partition_name` (optional)        |  Name of the partition to import data to.                   | 'partition_1'                 |
| `collection_parameter`         |  Collection-specific information including vector dimension, index file size, and similarity metric.                      | "dimension: 512 <br/> index_file_size: 1024 <br/> metric_type: 'HAMMING'"                     |


The following two examples of configuration are for your reference. The first example sets the parameter `data_path` while the second sets `data_dir`. You can set either `data_path` or `data_dir` according to your need.

### Example 1

```
H2M:
  milvus-version: 2.0.0
  data_path:
    - /Users/zilliz/float_1.h5
    - /Users/zilliz/float_2.h5
  data_dir:
  dest_host: '127.0.0.1'
  dest_port: 19530
  mode: 'overwrite'        # 'skip/append/overwrite'
  dest_collection_name: 'test_float'
  dest_partition_name: 'partition_1'
  collection_parameter:
    dimension: 128
    index_file_size: 1024
    metric_type: 'L2'
```

### Example 2

```
H2M:
  milvus_version: 2.0.0
  data_path:
  data_dir: '/Users/zilliz/HDF5_data'
  dest_host: '127.0.0.1'
  dest_port: 19530
  mode: 'append'        # 'skip/append/overwrite'
  dest_collection_name: 'test_binary'
  dest_partition_name: 
  collection_parameter:
    dimension: 512
    index_file_size: 1024
    metric_type: 'HAMMING'
```

## 3. Migrate data from HDF5 to Milvus

Run MilvusDM to import data in HDF5 files into Milvus with the following command.

```
$ milvusdm --yaml H2M.yaml
```



## What's next
- If you are interested in migrating data in other forms into Milvus,
  - Learn how to [Migrate Data from Faiss to Milvus](f2m.md).
- If you are looking for information about how to migrate data from Milvus 1.x to Milvus 2.0,
  - Learn [version migration](m2m.md).
- If you are interested in learning more about the data migration tool,
  - Read the overview of [MilvusDM](migrate_overview.md).
