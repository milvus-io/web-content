---
id: create.md
title: 创建 Collection、Partition
---

# 创建 Collection
连接 Milvus 服务器后，可通过以下步骤创建 collection。

> 创建 collection 必须包含一列主键字段，目前主键字段只支持 int64 类型。

1. 准备 collection 参数，包括 collection 名字、collection 字段参数等。具体参数详见 [API 文档](https://pymilvus-orm.readthedocs.io/en/latest/)。

```
>>> collection_name = "example_collection"
>>> field_name = "example_field"
>>> from pymilvus_orm import Collection, CollectionSchema, FieldSchema, DataType
>>> pk = FieldSchema(name="pk", dtype=DataType.INT64, is_primary=True, auto_id=True)
>>> field = FieldSchema(name=field_name, dtype=DataType.FLOAT_VECTOR, dim=8)
>>> schema = CollectionSchema(fields=[pk,field], description="example collection")
```

2. 调用 Milvus 实例的 create_collection() 方法创建 collection：
```
>>> collection = Collection(name=collection_name, schema=schema)
```
3. 调用 `milvus.has_collection` 查看 collection 是否创建成功：
```
>>> import pymilvus_orm
>>> pymilvus_orm.utility.get_connection().has_collection(collection_name)
True
```

4. 调用 `milvus.list_collections()` 查看所有创建成功的 collection：
```
>>> pymilvus_orm.utility.get_connection().list_collections()
['example_collection']
```

5. 查看 collection 相关数据，例如行数：
```
>>> collection.num_entities
0
```

# 创建 partition（可选）
随着一个 collection 的数据增加，查询性能会逐渐下降。如果只需要查询一部分数据，可以考虑将数据进行分区（partitioning）。给 partition 加上 partition name 后，搜索时就只需要搜索一部分数据，从而能够提升搜索性能。
```
>>> partition_name = "example_partition"
>>> partition = collection.create_partition(partition_name)
```

Milvus 会在创建 collection 时创建一个默认的 partition，name 为 `_default`。在创建新 partition 后，便有两个 partition——一个的 partition name 为 `example_partition`，另一个的为 `_default` 。我们可以调用 `list_partitions()` 的方法查看一个 collection 中的所有 partition。
```
>>> collection.partitions
[{"name": "_default", "description": "", "num_entities": 0}, {"name": "example_partition", "description": "", "num_entities": 0}]
```

调用 `has_partition()`  查看 partition 是否创建成功:

```
>>> collection.has_partition(partition_name)
True
```