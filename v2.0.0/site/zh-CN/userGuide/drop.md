---
id: drop.md
---
# 删除操作
删除操作会影响已经插入 Milvus 系统的数据，请谨慎操作。

> 通过ID删除指定向量的功能还未开放。

## 删除索引
调用 `drop_index()` 函数删除指定 collection 指定列的索引：
<div class="alert note">
  当前版本 Milvus 仅支持于向量 field 上创建或删除索引。未来版本 Milvus 将支持于标量 field 上创建或删除索引。
</div>

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>



```python
>>> collection.drop_index()
```

```javascript
await milvusClient.indexManager.dropIndex({
  collection_name: COLLECTION_NAME,
});
```

## 删除 partition
调用 `drop_partition()` 删除指定 partition 及其中的数据：


<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>



```python
>>> collection.drop_partition(partition_name=partition_name)
```

```javascript
await milvusClient.partitionManager.dropPartition({
  collection_name: COLLECTION_NAME,
  partition_name: PARTITION_NAME,
});
```


## 删除 collection
调用 `drop_collection()` 删除指定 collection：


<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>



```python
>>> collection.drop()
```

```javascript
await milvusClient.collectionManager.dropCollection({
  collection_name: COLLECTION_NAME,
});
```

