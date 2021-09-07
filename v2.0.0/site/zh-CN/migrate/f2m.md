---
id: f2m.md
---

# 数据迁移：Faiss 至 Milvus

你可以使用 [MilvusDM](migrate_overview.md) 将 Faiss 数据件导入 Milvus。

1. 下载 **F2M.yaml**:

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/F2M.yaml
```

2. 配置参数：
- `data_path`：Faiss 中数据路径。
- `dest_host`：目标 Milvus 服务器地址。
- `dest_port`：目标 Milvus 服务器端口。
- `mode`：数据迁移模式
  - `Skip`：若指定 collection 或 partition 已存在，跳过数据迁移。
  - `Append`：若指定 collection 或 partition 已存在，添加数据。
  - `Overwrite`：若指定 collection 或 partition 已存在，在插入数据前删除已有数据。
- `dest_collection_name`：导入数据的 collection 名称。
- `dest_partition_name`：导入数据的 partition 名称。
- `collection_parameter`：collection 相关信息，包括向量维度、索引文件大小、相似度计算方式等。

示例：
```
F2M:
  milvus_version: 2.x
  data_path: '/home/data/faiss.index'
  dest_host: '127.0.0.1'
  dest_port: 19530
  mode: 'append'        # 'skip/append/overwrite'
  dest_collection_name: 'test'
  dest_partition_name: ''
  collection_parameter:
    dimension: 256
    index_file_size: 1024
    metric_type: 'L2'
```

3. 运行 MilvusDM:

```
$ milvusdm --yaml F2M.yaml
```

## 示例代码

读取指定集合或分区的元数据，根据元数据读取本地 **milvus/db** 下的数据文件，返回特征向量和对应的 ID 并存入本地的 HDF5 文件中。

```
ids, vectors = faiss_data.read_faiss_data()
insert_milvus.insert_data(vectors, self.dest_collection_name, self.collection_parameter, self.mode, ids, self.dest_partition_name)
```

