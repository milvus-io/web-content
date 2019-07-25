---
id: list-tables
title: List tables
sidebar_label: List tables
---

# List tables

## List all the available tables
You can list all table names as follows: 

```python
>>> status, tables = milvus.show_tables()
>>> status
Status(message='Show tables successfully!', code=0)
>>> tables
['test01', 'others', ...]
```

## Check table metadata
Follow this to check the metadata of a particular table:

```python
>>> status, table = milvus.describe_table('test01')
>>> status
Status(message='Describe table successfully!')
>>> table
TableSchema(table_name='test01',dimension=256, index_type=1, store_raw_vector=False)
```

## Verify if a table exists
To check if a table exists in Milvus, simply do this:

```python
>>> milvus.has_table(table_name='test01')
True
```
> Note: If the table you verified is not available, *False* will be returned instead of *True*.


> Note: If you want to learn more detailed operations in Milvus, you may read [Milvus Python SDK](https://pypi.org/project/pymilvus) and [Examples](https://github.com/milvus-io/pymilvus/blob/branch-0.3.0/examples/example.py)。
