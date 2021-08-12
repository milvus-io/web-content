---
id: m2h.md
title: Milvus to HDF5
---
# Milvus to HDF5

1. 下载 **M2H.yaml**:

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/M2H.yaml
```

2. 配置参数：
- `source_milvus_path`：源 Milvus 工作路径。
- `mysql_parameter`：源 Milvus 的 MySQL 配置。如未使用 MySQL，将该参数设置为 ''。
- `source_collection`：源 Milvus 中 collection 与 partition 名称。
- `data_dir`：导出的 HDF5 文件保存目录。

```Yaml
M2H:
  milvus_version: 2.x
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
  data_dir: '/home/user/data'
```

3. 运行 MilvusDM:
```
$ milvusdm --yaml M2H.yaml
```

## 示例代码

读取指定集合或分区的 meta 信息，根据 meta 信息读取本地 **milvus/db** 下的数据文件，返回特征向量和对应的 ids 并存入本地的 HDF5 文件中。

```
collection_parameter, version = milvus_meta.get_collection_info(collection_name)
r_vectors, r_ids, r_rows = milvusdb.read_milvus_file(self.milvus_meta, collection_name, partition_tag)
data_save.save_yaml(collection_name, partition_tag, collection_parameter, version, save_hdf5_name)
```

<br/>


我们十分欢迎大家为开源项目 MilvusDM 贡献代码。你可以通过代码文件结构了解 MilvusDM 工具的设计构思。如有新的数据迁移需求，你还可以通过修改源码，为社区贡献代码。

<div class="alert note">
MilvusDM 项目地址：https://github.com/milvus-io/milvus-tools

欢迎贡献代码👏，也请给本项目点 star 🌟
</div>