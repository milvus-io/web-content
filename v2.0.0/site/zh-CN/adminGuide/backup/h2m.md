---
id: h2m.md
---
# 数据迁移：HDF5 至 Milvus

你可以使用 [MilvusDM](migrate_overview.md) 将 HDF5 文件导入 Milvus。

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
- `dest_collection_name`：导入数据的 collection 名称。
- `dest_partition_name`：导入数据的 partition 名称。
- `collection_parameter`：collection 相关信息，包括向量维度、索引文件大小、相似度计算方式等。

<div class="alert warning">
  <code>data_path</code> 参数可指定多个文件路径，<code>data_dir</code> 参数指定文件目录。两个参数只能配置一个。
</div>

示例：
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

1. 读取 HDF5 文件，返回特征向量和对应的 ID：

```
vectors, ids = self.file.read_hdf5_data()
```
2. 将返回的数据导入 Milvus：

```
ids = insert_milvus.insert_data(vectors, self.c_name, self.c_param, self.mode, ids,self.p_name)
```


