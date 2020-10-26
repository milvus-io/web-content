---
id: insert_delete_entity_python.md
---


# Insert and Delete Vectors

You can perform vector operations on collections or partitions. This article talks about the following topics:

- [Insert vectors to a collection](#insert-entity-to-collection)
- [Insert vectors to a partition](#insert-entity-to-partition)
- [Delete vectors by ID](#delete-entity)

## Insert entities to a collection
<a name="insert-entity-to-collection"></a>

1. Generate 1,000 random vectors.

   ```python
   >>> list_of_int = [random.randint(0, 255) for _ in range(10000)]
   >>> vectors = [[random.random() for _ in range(128)] for _ in range(10000)]
   ```

2. Insert a list of vectors. If you set `auto_id` to `True`, Milvus automatically assigns IDs to the vectors.

   ```python
   >>> hybrid_entities = [
           {"name": "A", "values": list_of_int, "type": DataType.INT32},
           {"name": "B", "values": list_of_int, "type": DataType.INT32},
           {"name": "C", "values": list_of_int, "type": DataType.INT64},
           {"name": "Vec", "values": vectors, "type":DataType.FLOAT_VECTOR}
       ]
   >>> client.insert('test01', hybrid_entities)
   ```

   You can also specify the vector IDs:

   ```python
   >>> vector_ids = [id for id in range(20)]
   >>> milvus.insert(collection_name='test01', records=vectors, ids=vector_ids)
   ```

## Insert entities to a partition
<a name="insert-entity-to-partition"></a>

```python
>>> client.insert('test01', vectors, partition_tag="tag01")
```

## Delete entities by ID
<a name="delete-entity"></a>

Suppose your collection contains the following vector IDs:

```python
>>> ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
```

Run these following command to delete specified embedding vectors:

```python
>>> client.delete_entity_by_id('test01', ids)
```
<div class="alert note">
After calling <code>delete</code>, you can call <code>flush</code> again to ensure that the newly inserted data is visible and the deleted data is no longer recoverable.
</div>


## FAQ

<details>
<summary><font color="#4fc4f9">Is there a length limit on the self-defined entity IDs?</font></summary>
Entity IDs must be non-negative 64-bit integers.
</details>
<details>
<summary><font color="#4fc4f9">Can I insert vectors with existing IDs?</font></summary>
Yes, you can. If you insert vectors with an existing ID, you would end up having duplicate IDs.
</details>
<details>
<summary><font color="#4fc4f9">Does Milvus support inserting while searching?</font></summary>
Yes.
</details>
<details>
<summary><font color="#4fc4f9">Is there a volume limit on the vectors inserted each time?</font></summary>
Vectors inserted each time must not exceed 256 MB.
</details>
