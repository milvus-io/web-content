---
id: hybridsearch.md
title: Conduct a Hybrid Search
---

# Conduct a Hybrid Search


In addition to vectors, Milvus supports data types such as boolean, integers, floating-point numbers, and more. A collection in Milvus can hold multiple fields for accommodating different data features or properties. Milvus is a flexible vector database that pairs scalar filtering with powerful vector similarity search.


A hybrid search is a vector similarity search, during which you can filter the scalar data by specifying a [boolean expression](boolean.md).

1. Connect to the Milvus server:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
from pymilvus_orm import connections
connections.connect("default", host='localhost', port='19530')
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";
const milvusClient = new MilvusClient("localhost:19530");
```

2. Prepare collection parameters and create a collection:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> from pymilvus_orm import Collection, FieldSchema, CollectionSchema, DataType
>>> collection_name = "test_collection_search"
>>> schema = CollectionSchema([
...     FieldSchema("film_id", DataType.INT64, is_primary=True),
...     FieldSchema("films", dtype=DataType.FLOAT_VECTOR, dim=2)
... ])
>>> collection = Collection(collection_name, schema)
```

```javascript
const COLLECTION_NAME = "test_collection_search";
milvusClient.collectionManager.createCollection({
  collection_name: COLLECTION_NAME,
  fields: [
    {
      name: "films",
      description: "vector field",
      data_type: DataType.FloatVector,
      type_params: [
        {
          key: "dim",
          value: "2",
        },
      ],
    },
    {
      name: "film_id",
      data_type: DataType.Int64,
      autoID: false,
      is_primary_key: true,
      description: "",
    },
  ],
});
```

3. Insert the random vectors to the newly created collection:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


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

```javascript
let id = 1;
const entities = Array.from({ length: 10 }, () => ({
  films: Array.from({ length: 2 }, () => Math.random() * 10),
  film_id: id++,
}));

await milvusClient.collectionManager.insert({
  collection_name: COLLECTION_NAME,
  fields_data: entities,
});
```

4. Load the collection to memory and conduct a vector similarity search:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


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

```javascript
await milvusClient.collectionManager.loadCollection({
  collection_name: COLLECTION_NAME,
});
await milvusClient.dataManager.search({
  collection_name: COLLECTION_NAME,
  // partition_names: [],
  expr: "film_id in [1,4,6,8]",
  vectors: [entities[0].films],
  search_params: [
    { key: "anns_field", value: "films" },
    { key: "topk", value: "2" },
    { key: "metric_type", value: "L2" },
    { key: "params", value: JSON.stringify({ nprobe: 10 }) },
  ],
  vector_type: 100, // float vector -> 100
});
```

5. Check the returned results:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> assert len(res) == 1
>>> hits = res[0]
>>> assert len(hits) == 2
>>> print(f"- Total hits: {len(hits)}, hits ids: {hits.ids} ")
- Total hits: 2, hits ids: [2, 4]
>>> print(f"- Top1 hit id: {hits[0].id}, distance: {hits[0].distance}, score: {hits[0].score} ")
- Top1 hit id: 2, distance: 0.10143111646175385, score: 0.101431116461
```

```javascript
// search result will be like:
{
  status: { error_code: 'Success', reason: '' },
  results: [
    { score: 0, id: '1' },
    { score: 9.266796112060547, id: '4' },
    { score: 28.263811111450195, id: '8' },
    { score: 41.055686950683594, id: '6' }
  ]
}
```
