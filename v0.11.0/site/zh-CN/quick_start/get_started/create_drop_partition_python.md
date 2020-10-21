---
id: create_drop_partition_python.md
---

# 创建、删除分区

本页提供创建或删除分区的 Python 示例代码。

## 创建分区

你可以通过标签将集合分割为若干个分区，从而提高搜索效率。每个分区实际上也是一个集合。

```python
# Create a partition.
>>> client.create_partition('test01', 'tag01')
```

## 删除分区

```python
>>> client.drop_partition(collection_name='test01', partition_tag='tag01')
```
