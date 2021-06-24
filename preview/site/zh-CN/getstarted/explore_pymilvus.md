---
id: explore_pymilvus.md
title: PyMilvus 上手
---
# Milvus 基础操作
通过本文档，你将在 Python 交互式编程环境下学习Milvus 使用中的各种基本操作。

命令行输入 `python3` 进入Python 交互式模式。本文以 Python3.9.1 为例：
```
➜  ~ python3
Python 3.9.1 (default, Feb  3 2021, 07:38:02)
[Clang 12.0.0 (clang-1200.0.32.29)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

## 连接 Milvus 服务器
```
>>> from pymilvus_orm import connections
>>> connections.connect("default", host='localhost', port='19530')
```

## 创建 Collection
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

## 创建 partition（可选）
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

## 在集合中插入数据
你可以通过以下步骤在指定 collection 的指定 partition 中插入数据。

1.随机生成待插入的数据:
```
>>> import random
>>> vectors = [[random.random() for _ in range(8)] for _ in range(10)]
>>> entities = [vectors]
```

2. 调用以上函数将随机生成的数据插入新创建的 collection 中。Milvus 会为每条插入的数据自动生成 ID，类似于关系型数据库中的 AutoID。

*Milvus 将返回 `MutationResult`，其中包含插入数据对应的主键列 `primary_keys`。*
```
>>> mr = collection.insert(entities)
<pymilvus_orm.search.MutationResult object at 0x7fcfe8255550>
>>> mr.primary_keys
[425790736918318406, 425790736918318407, 425790736918318408, ...]
```

3. 调用 insert() 函数时指定 `partitiont_name` 可以将向量插入到指定的 Partition 中：
```
>>> collection.insert(data=entities, partition_name=partition_name)
```

4. 插入的数据将存储在 Milvus 内存中。调用 `flush()` 函数将数据落盘：
```
>>> pymilvus_orm.utility.get_connection().flush([collection_name])
```

## 创建索引
为提高向量搜索的效率，你可以为 collection 中的某一列 Field 创建索引。具体索引参数设置详见[向量索引](index.md)。

1. 准备相关参数：
```
>>> index_param = {
        "metric_type":"L2",
        "index_type":"IVF_FLAT",
        "params":{"nlist":1024}
    }
```

2. 创建索引：
```
>>> collection.create_index(field_name=field_name, index_params=index_param)
Status(code=0, message='')
```

3. 调用 `describe_index()` 查看创建的索引相关信息：
```
>>> collection.index().params
{'metric_type': 'L2', 'index_type': 'IVF_FLAT', 'params': {'nlist': 1024}}
```

## 查询向量
1. 创建搜索参数：
```
>>> search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
```

2. 在查询向量前，将集合加载到内存中：
```
>>> collection.load()
```

3. 创建随机向量作为 `query_records` 并调用 `search()` 进行搜索。
*Milvus 将返回搜索结果的 ID 和距离：*
```
>>> results = collection.search(vectors[:5], field_name, param=search_params, limit=10, expr=None)
>>> results[0].ids
[424363819726212428, 424363819726212436, ...]
>>> results[0].distances
[0.0, 1.0862197875976562, 1.1029295921325684, ...]
```

如果要在指定分区或者指定列查询，则可以在调用 `search()` 时设置`partition_names` 和 `fields` 参数
```
>>> collection.search(vectors[:5], field_name, param=search_params, limit=10, expr=None, partition_names=[partition_name])
```

4. 查询完成后，可以调用 `release_collection()` 将 Milvus 中加载的 collection 从内存中释放，以减少内存消耗。查询其他 collection：

```
>>> collection.release()
```

## 删除操作
删除操作会影响已经插入 Milvus 系统的数据，请谨慎操作。

> 通过ID删除指定向量的功能还未开放。

### 删除索引
调用 `drop_index()` 函数删除指定 collection 指定列的索引：
```
>>> collection.drop_index()
```

### 删除 partition
调用 `drop_partition()` 删除指定 partition 及其中的数据：
```
>>> collection.drop_partition(partition_name=partition_name)
```

### 删除 collection
调用 `drop_collection()` 删除指定 collection：
```
>>> collection.drop()
```

## 断开与服务器的连接
使用完 Milvus 的服务之后，可以断开与 Milvus 服务器的连接以释放资源：
```
>>> connections.disconnect("default")
```







