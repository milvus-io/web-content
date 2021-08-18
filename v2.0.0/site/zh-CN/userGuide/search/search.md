---
id: search.md
title: 查询向量
---

# 查询向量
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