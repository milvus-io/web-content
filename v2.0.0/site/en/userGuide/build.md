---
id: build.md
title: Build an Index for
---

# Build an Index

Create an index for a specified field in a collection to accelerate vector similarity search. See [Vector Index](index.md) for more information about setting index parameters.

1. Prepare the index parameters:

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
const index_param = [
  {
    key: "index_type",
    value: "IVF_FLAT",
  },
  {
    key: "metric_type",
    value: "L2",
  },
  {
    key: "params",
    value: JSON.stringify({ nlist: 1024 }),
  },
];
```

2. Build an index:

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

3. Call `describe_index()` to view more details of the new index:

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
