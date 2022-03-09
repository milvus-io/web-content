---
id: m2m.md
title: Version Migration
related_key: version migration
summary: Milvus 版本迁移
---

# Milvus 版本迁移

本文将介绍如何使用开源工具 [MilvusDM](migrate_overview.md) 将 Milvus 1.x 数据导入 Milvus 2.0，实现版本迁移。

<div class="alert note">
MilvusDM 不支持将数据从单机版 Milvus 迁移至分布式版 Milvus。
</div>


## 数据迁移前提

在迁移 Milvus 版本前，你需要先 [安装 MilvusDM](milvusdm_install.md)。

## 1. 下载 YAML 文件

下载 `M2M.yaml` 文件。

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/M2M.yaml
```

## 2. 设置参数

需要设置的参数包括：

| 参数                 | 说明                               | 示例                      |
| ------------------------- | ----------------------------------------- | ---------------------------- |
| `milvus_version`          |  Milvus 版本。                        | 2.0.0                       |
| `data_path`               |  HDF5 文件路径。`data_path` 及 `data_dir` 两个参数中只能配置一个。                    | - /Users/zilliz/float_1.h5 <br/> - /Users/zilliz/float_2.h5                   |
| `data_dir`         |  HDF5 文件目录。`data_path` 及 `data_dir` 两个参数中只能配置一个。                      | '/Users/zilliz/Desktop/HDF5_data'                     |
| `dest_host`          |  目标 Milvus 服务器地址。                      | '127.0.0.1'     |
| `dest_port`          | 目标 Milvus 服务器端口。                   | 19530                      |
| `mode`         |  数据迁移模式，包括 `skip`、`append` 及 `overwrite`。该参数仅在指定 collction 名称存在于 Milvus中时生效。 <br/> <li>`skip`：若指定 collection 或 partition 已存在，跳过数据迁移。 </li> <li>`append`：若指定 collection 或 partition 已存在，添加数据。</li> <li>`overwrite`：若指定 collection 或 partition 已存在，在插入数据前删除已有数据。</li>                           | 'append'                     |
| `dest_collection_name`          | 导入数据的 collection 名称。                        | 'test_float'                       |
| `dest_partition_name` (optional)         |  导入数据的 partition 名称。               | 'partition_1'                 |
| `collection_parameter`         |  collection 相关信息，包括向量维度、索引文件大小、相似度计算方式等。                                | "dimension: 512 <br/> index_file_size: 1024 <br/> metric_type: 'HAMMING'"                     |


如下两个参数配置示例仅供参考。示例 1 中设置了 `mysql_parameter` 参数。如未在 Milvus 1.x 版本中使用 MySQL 管理向量 ID，参考示例 2。


### 示例 1

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

### 示例 2

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

## 3. 将 Milvus 1.x 数据导入 Milvus 2.0

运行 MilvusDM， 通过如下指令将 Milvus 1.x 数据导入 Milvus 2.0。

```
$ milvusdm --yaml M2M.yaml
```


## 更多内容
- 如果你想要将其他格式的数据导入 Milvus，你可以：
  - 了解如何 [将 Faiss 数据导入 Milvus](f2m.md)。
  - 了解如何 [将 HDF5 文件数据导入 Milvus](h2m.md)。
- 如果你想要了解更多有关数据迁移工具详情，
  - 阅读 [MilvusDM](migrate_overview.md) 简介。
