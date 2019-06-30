---
id: searching-table
title: Search A Table
sidebar_label: Search A Table
---

# Search A Table

## Searching table name
You can search all table names by this: 

```python
>>> status, tables = milvus.show_tables()
>>> status
Status(message='Show tables successfully!', code=0)
>>> tables
['test01', 'others', ...]
```

## Searching table information
Follow this to search the information of a particular table:

```python
>>> status, table = milvus.describe_table('test01')
>>> status
Status(message='Describe table successfully!')
>>> table
TableSchema(table_name='test01',dimension=256, index_type=1, store_raw_vector=False)
```

## Checking if a table exists
To check if a table exists in Milvus, simply do this:

```python
>>> milvus.has_table(table_name='test01')
True
```
> Note: If the table you searched is no longer available, *False* will be returned instead of *True*.


> Note: If you want to learn more detailed operations in Milvus, you may read [Milvus Python SDK](https://pypi.org/project/pymilvus) and [Examples](https://github.com/milvus-io/pymilvus/blob/master/examples/example.py)。
