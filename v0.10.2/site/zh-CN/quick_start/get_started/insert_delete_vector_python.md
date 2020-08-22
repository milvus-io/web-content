---
id: insert_delete_vector_python.md
---


# 插入、删除向量

你可以在集合或集合的分区中进行向量操作，本页提供以下内容：

- [在集合中插入向量](#insert-vector-to-collection)
- [在分区中插入向量](#insert-vector-to-partition)
- [通过 ID 删除向量](#delete-vector)


## 在集合中插入向量
<a name="insert-vector-to-collection"></a>

1. 随机生成 20 个 256 维的向量：

   ```python
   >>> import random
   # Generate 20 vectors of 256 dimensions.
   >>> vectors = [[random.random() for _ in range(256)] for _ in range(20)]
   ```

2. 插入向量列表。如果你不指定向量 ID，Milvus 自动为向量分配 ID。

   ```python
   # Insert vectors.
   >>> milvus.insert(collection_name='test01', records=vectors)
   ```

   你也可以自己定义向量 ID：

   ```python
   >>> vector_ids = [id for id in range(20)]
   >>> milvus.insert(collection_name='test01', records=vectors, ids=vector_ids)
   ```

## 在分区中插入向量
<a name="insert-vector-to-partition"></a>

```python
>>> milvus.insert('test01', vectors, partition_tag="tag01")
```

## 通过 ID 删除向量
<a name="delete-vector"></a>

假设你的集合中存在以下向量 ID：

```python
>>> ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
```

你可以通过以下命令删除向量：

```python
>>> milvus.delete_entity_by_id(collection_name='test01', id_array=ids)
```
<div class="alert note">
在调用 <code>delete</code> 接口后，用户可以选择再调用 <code>flush</code>，保证新增的数据可见，被删除的数据不会再被搜到。
</div>