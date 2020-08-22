---
id: insert_delete_vector_python.md
---


# Insert and Delete Vectors

You can perform vector operations on collections or partitions. This article talks about the following topics:

- [Insert vectors to a collection](#insert-vector-to-collection)
- [Insert vectors to a partition](#insert-vector-to-partition)
- [Delete vectors by IDs](#delete-vector)

## Insert vectors to a collection
<a name="insert-vector-to-collection"></a>

1. Randomly generate 20 256-dimensional vectors:

   ```python
   >>> import random
   # Generate 20 vectors of 256 dimensions.
   >>> vectors = [[random.random() for _ in range(256)] for _ in range(20)]
   ```

2. Insert a list of vectors. If you do not specify vector IDs, Milvus automatically assigns IDs to the vectors.

   ```python
   # Insert vectors.
   >>> milvus.insert(collection_name='test01', records=vectors)
   ```

   You can also specify the vector IDs:

   ```python
   >>> vector_ids = [id for id in range(20)]
   >>> milvus.insert(collection_name='test01', records=vectors, ids=vector_ids)
   ```

## Insert vectors to a partition
<a name="insert-vector-to-partition"></a>

```python
>>> milvus.insert('test01', vectors, partition_tag="tag01")
```

## Delete vectors by ID
<a name="delete-vector"></a>

Suppose your collection contains the following vector IDs:

```python
>>> ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
```

You can delete the vectors with the following command:

```python
>>> milvus.delete_entity_by_id(collection_name='test01', id_array=ids)
```
<div class="alert note">
After calling <code>delete</code>, you can call <code>flush</code> again to ensure that the newly inserted data is visible and the deleted data is no longer recoverable.
</div>