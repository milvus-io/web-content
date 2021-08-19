---
id: hybridsearch.md
title: 混合查询
---

# 混合查询

除了向量以外，Milvus还支持布尔值、整型、浮点等数据类型。在 Milvus 中，一个 collection 可以包含多个字段来代表数据特征或属性。Milvus 是一款灵活的向量数据库，还支持在向量相似度检索过程中进行标量字段过滤。

混合查询是一种向量相似度检索。在混合查询时，你可以通过使用[布尔表达式（boolean expression）](boolean.md)进行标量字段过滤。

1. 连接至 Milvus 服务器：

```python
from pymilvus_orm import connections
connections.connect("default", host='localhost', port='19530')
```

2. 准备 collection 参数并创建 collection：

```python
>>> from pymilvus_orm import Collection, FieldSchema, CollectionSchema, DataType
>>> collection_name = "test_collection_search"
>>> schema = CollectionSchema([
...     FieldSchema("film_id", DataType.INT64, is_primary=True),
...     FieldSchema("films", dtype=DataType.FLOAT_VECTOR, dim=2)
... ])
>>> collection = Collection(collection_name, schema)
```

3. 随机生成向量数据并插入新建 collection 中：

```python
>>> import random
>>> data = [
...     [i for i in range(10)],
...     [[random.random() for _ in range(2)] for _ in range(10)],
... ]
>>> collection.insert(data)
>>> collection.num_entities
10
```

4. 将集合加载到内存中并进行向量相似度检索：

```python
>>> collection.load()
>>> search_param = {
...     "data": [[1.0, 1.0]],
...     "anns_field": "films",
...     "param": {"metric_type": "L2"},
...     "limit": 2,
...     "expr": "film_id in [2,4,6,8]",
... }
>>> res = collection.search(**search_param)
```

5. 检查返回结果：

```python
>>> assert len(res) == 1
>>> hits = res[0]
>>> assert len(hits) == 2
>>> print(f"- Total hits: {len(hits)}, hits ids: {hits.ids} ")
- Total hits: 2, hits ids: [2, 4]
>>> print(f"- Top1 hit id: {hits[0].id}, distance: {hits[0].distance}, score: {hits[0].score} ")
- Top1 hit id: 2, distance: 0.10143111646175385, score: 0.101431116461
```
