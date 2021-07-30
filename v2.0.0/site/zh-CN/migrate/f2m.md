---
id: f2m.md
title: Faiss to Milvus
---

# Faiss to Milvus

1. 下载 **F2M.yaml**:

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/F2M.yaml
```

2. 配置参数：
- `data_path`：Faiss 中数据文件路径。
- `dest_host`：目标 Milvus 服务器地址。
- `dest_port`：目标 Milvus 服务器端口。
- `mode`：数据迁移模式。
  - `Skip`：若指定 collection 或 partition 已存在，跳过数据迁移。
  - `Append`：若指定 collection 或 partition 已存在，添加数据。
  - `Overwrite`：若指定 collection 或 partition 已存在，在插入数据前删除已有数据。
- `dest_collection_name`：数据导入的 collection 名称。
- `dest_partition_name`：数据导入的 partition 名称。
- `collection_parameter`：collection 相关信息，包括向量维度、索引文件大小、相似度计算方式等。
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

读取指定集合或分区的 meta 信息，根据 meta 信息读取本地 milvus/db 下的数据文件，返回特征向量和对应的 ids 并存入本地的 HDF5 文件中。

```
ids, vectors = faiss_data.read_faiss_data()
insert_milvus.insert_data(vectors, self.dest_collection_name, self.collection_parameter, self.mode, ids, self.dest_partition_name)
```



<br/>


我们十分欢迎大家为开源项目 MilvusDM 贡献代码。你可以通过代码文件结构了解 MilvusDM 工具的设计构思。如有新的数据迁移需求，你还可以通过修改源码，为社区贡献代码。

<div class="alert note">
MilvusDM 项目地址：https://github.com/milvus-io/milvus-tools

欢迎贡献代码👏，也请给本项目点 star 🌟
</div>

