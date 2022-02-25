---
id: f2m.md
title: Migrate from Faiss to Milvus
related_key: Faiss, migrate, import
summary: 将 Faiss 数据导入 Milvus.
---

# 将 Faiss 数据导入 Milvus

本文将介绍如何使用开源工具 [MilvusDM](migrate_overview.md) 将 Faiss 数据导入 Milvus，实现数据迁移。

## 数据迁移前提

在迁移数据前，你需要先 [安装 MilvusDM](milvusdm_install.md)。

## 1. 下载 YAML 文件

下载 `F2M.yaml` 文件。

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/F2M.yaml
```

## 2. 设置参数

需要设置的参数包括：

| 参数                 | 说明                               | 示例                      |
| ------------------------- | ----------------------------------------- | ---------------------------- |
| `milvus_version`          |  Milvus 版本。                         | 2.0.0                     |
| `data_path`               | HDF5 文件路径。`data_path` 及 `data_dir` 两个参数中只能配置一个。                   | '/home/user/data/faiss.index'                   |
| `data_dir`         |  HDF5 文件目录。`data_path` 及 `data_dir` 两个参数中只能配置一个。                     | '/Users/zilliz/Desktop/HDF5_data'                     |
| `dest_host`          |  目标 Milvus 服务器地址。                        | '127.0.0.1'     |
| `dest_port`          |  目标 Milvus 服务器端口。                     | 19530                      |
| `mode`         |  数据迁移模式，包括 `skip`、`append` 及 `overwrite`。该参数仅在指定 collction 名称存在于 Milvus中时生效。 <br/> <li>`skip`：若指定 collection 或 partition 已存在，跳过数据迁移。 </li> <li>`append`：若指定 collection 或 partition 已存在，添加数据。</li> <li>`overwrite`：若指定 collection 或 partition 已存在，在插入数据前删除已有数据。</li>                           | 'append'                     |
| `dest_collection_name`          | 导入数据的 collection 名称。                     | 'test'                       |
| `dest_partition_name` (optional)        |  导入数据的 partition 名称。                   | 'partition'                 |
| `collection_parameter`         |  collection 相关信息，包括向量维度、索引文件大小、相似度计算方式等。                        | "dimension: 512 <br/> index_file_size: 1024 <br/> metric_type: 'HAMMING'"                     |

### 示例 

如下参数配置示例仅供参考。 

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


## 3. 将 Faiss 数据导入 Milvus

运行 MilvusDM， 通过如下指令将 Faiss 数据导入 Milvus。

```
$ milvusdm --yaml F2M.yaml
```


## 更多内容
- 如果你想要将其他格式的数据导入 Milvus，你可以：
  - 了解如何 [将 HDF5 文件数据导入 Milvus](h2m.md)。
- 如果你想要了解如何将 Milvus 1.x 数据迁移至 Milvus 2.0，
  - 详见 [版本迁移](m2m.md)。
- 如果你想要了解更多有关数据迁移工具详情，
  - 阅读 [MilvusDM](migrate_overview.md) 简介。
