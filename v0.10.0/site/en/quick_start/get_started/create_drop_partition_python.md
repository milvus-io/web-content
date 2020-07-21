---
id: create_drop_partition_python.md
---

# Create and Drop a Partition

This article provides Python sample codes for creating or droping partitions.

## Create a partition

To improve search efficiency, you can divide a collection into several partitions by tags. In fact, each partition is a collection.

```python
# Create partition
>>> milvus.create_partition('test01', 'tag01')
```

## Drop a partition

```python
>>> milvus.drop_partition(collection_name='test01', partition_tag='tag01')
```
