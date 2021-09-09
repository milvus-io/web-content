---
id: insert.md
summary: Learn how to insert data to Milvus.
---

# Insert vectors

You can insert vectors to a specified partition within a specific collection.

1. Generate random vectors:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> import random
>>> vectors = [[random.random() for _ in range(8)] for _ in range(10)]
>>> entities = [vectors]
```

```javascript
const entities = Array.from({ length: 10 }, () => ({
  [FIELD_NAME]: Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)),
}));
```

2. Insert the random vectors to the newly created collection. Milvus automatically assigns IDs to the inserted vectors, similar to AutoID in a relational database.

_Milvus returns the value of MutationResult, which contains the corresponding primary_keys of the inserted vectors._

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> mr = collection.insert(entities)
# Get the primary keys of the `MutationResult`
>>> mr.primary_keys
[425790736918318406, 425790736918318407, 425790736918318408, ...]
```

```javascript
await milvusClient.dataManager.insert({{
  collection_name: COLLECTION_NAME,
  fields_data: entities,
});
```

3. By specifying `partition_name` when calling `insert()`, you can insert vectors to a specified partition:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.insert(data=entities, partition_name=partition_name)
```

```javascript
await milvusClient.dataManager.insert({{
  collection_name: COLLECTION_NAME,
  partition_name: partition_name
  fields_data: entities,
});
```

4. Milvus temporarily stores the inserted vectors in the memory. Call `flush()` to flush them to the disk.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> pymilvus.utility.get_connection().flush([collection_name])
```

```javascript
await milvusClient.dataManager.flush({ collection_names: [COLLECTION_NAME] });
```
