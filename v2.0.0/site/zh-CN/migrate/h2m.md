---
id: h2m.md
title: HDF5 to Milvus
---
# HDF5 to Milvus

1. 下载 **H2M.yaml**:

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/H2M.yaml
```

2. 配置参数：
- `data_path`：HDF5 文件路径
- `data_dir`：HDF5 文件目录。
- `dest_host`：目标 Milvus 服务器地址。
- `dest_port`：目标 Milvus 服务器端口。
- `mode`：数据迁移模式
  - `Skip`：若指定 collection 或 partition 已存在，跳过数据迁移。
  - `Append`：若指定 collection 或 partition 已存在，添加数据。
  - `Overwrite`：若指定 collection 或 partition 已存在，在插入数据前删除已有数据。
- `dest_collection_name`：数据导入的 collection 名称。
- `dest_partition_name`：数据导入的 partition 名称。
- `collection_parameter`：collection 相关信息，包括向量维度、索引文件大小、相似度计算方式等。

<div class="alert note">
`data_path` 参数可指定多个文件路径，`data_dir` 参数指定文件目录。两个参数只能配置一个。
</div>

```
H2M:
  milvus-version: 2.x
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

3. 运行 MilvusDM:
```
$ milvusdm --yaml H2M.yaml
```

## 示例代码

读取 HDF5 格式的文件，返回特征向量和对应的 ids 并导入 Milvus。

```
vectors, ids = self.file.read_hdf5_data()
ids = insert_milvus.insert_data(vectors, self.c_name, self.c_param, self.mode, ids,self.p_name)
```




<br/>



我们十分欢迎大家为开源项目 MilvusDM 贡献代码。你可以通过代码文件结构了解 MilvusDM 工具的设计构思。如有新的数据迁移需求，你还可以通过修改源码，为社区贡献代码。

<div class="alert note">
MilvusDM 项目地址：https://github.com/milvus-io/milvus-tools

欢迎贡献代码👏，也请给本项目点 star 🌟
</div>

