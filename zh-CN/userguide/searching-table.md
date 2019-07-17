---
id: searching-table
title: Searching a table
sidebar_label: Searching a table
---

# 查询表

## 查询表名
通过以下操作，你可以查询Milvus数据库中所有表的名字：

```python
>>> status, tables = milvus.show_tables()
>>> status
Status(message='Show tables successfully!', code=0)
>>> tables
['test01', 'others', ...]
```

## 查询表的信息
你可以按此方式查询数据库中某张表的信息：

```python
>>> status, table = milvus.describe_table('test01')
>>> status
Status(message='Describe table successfully!')
>>> table
TableSchema(table_name='test01',dimension=256, index_type=1, store_raw_vector=False)
```

## 查询表是否存在
请按照以下方式查询某张表是否存在：

```python
>>> milvus.has_table(table_name='test01')
True
```
> 注意：如果查询的表已经不存在，则以上代码中返回值为False。


> 注意：若要了解更多Milvus操作，你可以参照[Milvus Python SDK](https://pypi.org/project/pymilvus)和[使用示例](https://github.com/milvus-io/pymilvus/blob/branch-0.3.0/examples/example.py)。
