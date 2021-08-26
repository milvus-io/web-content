---
id: build.md
---

# 创建索引

为提高向量搜索的效率，你可以为 collection 中的某一列 Field 创建索引。具体索引参数设置详见[向量索引](index.md)。

1. 准备相关参数：

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> index_param = {
        "metric_type":"L2",
        "index_type":"IVF_FLAT",
        "params":{"nlist":1024}
    }
```

```javascript
const index_param = {
  metric_type: "L2",
  index_type: "IVF_FLAT",
  params: JSON.stringify({ nlist: 1024 }),
};
```

2. 创建索引：

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.create_index(field_name=field_name, index_params=index_param)
Status(code=0, message='')
```

```javascript
await milvusClient.indexManager.createIndex({
  collection_name: COLLECTION_NAME,
  field_name: FIELD_NAME,
  extra_params: index_param,
});
```

3. 查看创建的索引相关信息：

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.index().params
{'metric_type': 'L2', 'index_type': 'IVF_FLAT', 'params': {'nlist': 1024}}
```

```javascript
await milvusClient.indexManager.describeIndex({
  collection_name: COLLECTION_NAME,
});
```
