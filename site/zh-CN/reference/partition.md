---
id: partition.md
title: Table Partitioning
sidebar_label: Table Partitioning
---

# 分区表

熟悉数据库的人都知道，随着表的增大，查询性能会下降。这时需要将表划分为多个分区以更快地查询数据。该页面简要介绍 Milvus 中分区表的实现。

## Milvus 中的分区表的工作原理

不同于“范围分区”和“列表分区”之类的常用方法，Milvus 提供了一种更灵活的分区选择，称为“标签分区”。

一张表基于 `partition_tag` 进行分区，该分区定义了表中某一列的键值。基于标签创建的分区表，具有与其母表相同的架构定义。

下面以 Python SDK 为例，向您展示如何在 Milvus 中创建使用分区表。

假设您要创建标签 ”2019-12-12“。要基于标签创建分区表，请使用`create_partition`，后跟表名，分区表名和标签。

```python
create_partition(table_name="my_table", partition_name="partition_1", partition_tag="2019-11-11")
```

`partition_name`是分区表的名称，分区表的名称必须遵循 Milvus 中的表名的命名约定，而 `partition_tag` 则完全是用户自定义的。当查询分区时，它们可以互换使用。

创建分区表后，可以通过以下命令将向量插入到指定分区：

```python
insert(table_name="my_table", records=vectors, ids=vector_ids, partition_tag ="2019-12-12")
```

若要删除某个分区，请使用 `drop_partition`，后跟表名和标签。

```python
drop_partition(table_name="my_table", partition_tag="2019-12-12")
```

若要查询指定分区，请添加 `partition_tags` 参数。

```python
search(table_name="my_table", query_records=q_records, top_k=2, nprobe=16, partition_tags=["2019-12-12"])
```

## 相关链接

[了解 Milvus 操作](../guides/milvus_operation.md)
