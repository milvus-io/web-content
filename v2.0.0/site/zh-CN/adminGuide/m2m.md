---
id: m2m.md
title: 版本迁移
---



# 版本迁移

<div class="alert note">
MilvusDM 不支持将数据从 Milvus 2.0 单机版迁移至 Milvus 2.0 分布式版。
</div>

1. 下载 **M2M.yaml**:

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/M2M.yaml
```

2. 配置参数：

- `source_milvus_path`：源 Milvus 工作路径。
- `mysql_parameter`：源 Milvus 的 MySQL 配置。如未使用 MySQL，将该参数设置为 ''。
- `source_collection`：源 Milvus 中 collection 与 partition 名称。
- `dest_host`：目标 Milvus 服务器地址。
- `dest_port`：目标 Milvus 服务器端口。
- `mode`：数据迁移模式。
  - `Skip`：若指定 collection 或 partition 已存在，跳过数据迁移。
  - `Append`：若指定 collection 或 partition 已存在，添加数据。
  - `Overwrite`：若指定 collection 或 partition 已存在，在插入数据前删除已有数据。

示例：
```
M2M:
  milvus_version: 2.x
  source_milvus_path: '/home/user/milvus'
  mysql_parameter:
    host: '127.0.0.1'
    user: 'root'
    port: 3306
    password: '123456'
    database: 'milvus'
  source_collection:
    test:
      - 'partition_1'
      - 'partition_2'
  dest_host: '127.0.0.1'
  dest_port: 19530
  mode: 'skip' # 'skip/append/overwrite'
```

3. 运行 MilvusDM:

```
$ milvusdm --yaml M2M.yaml
```

## 示例代码

读取指定集合或分区的元数据，根据元数据读取本地 **milvus/db** 下的数据文件，返回特征向量和对应的 ID 并导入 Milvus：

```
collection_parameter, _ = milvus_meta.get_collection_info(collection_name)
r_vectors, r_ids, r_rows = milvusdb.read_milvus_file(self.milvus_meta, collection_name, partition_tag) 
milvus_insert.insert_data(r_vectors, collection_name, collection_parameter, self.mode, r_ids, partition_tag)
```

