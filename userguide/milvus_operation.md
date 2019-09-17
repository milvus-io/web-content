---
id: milvus_operation
title: Learn Milvus Operations
sidebar_label: Learn Milvus Operations
---

# Learn Milvus Operations

This page walks you through some of the most essential Milvus operations using **Python** SDK.

## Before trying out these operations

Please use pymilvus, the built-in Python client, to try out these operations. If you want, you can also use other languages such as C++, RESTful API, etc.

Just type **python** at your console, hit `Enter`, and you should enter Python’s Interpreter.

1. Import pymilvus.

   ```python
   # Import pymilvus
   >>> from milvus import Milvus, IndexType, MetricType, Status
   ```

2. Connect to Milvus on your local server, following either of the below methods:

   ```python
   # Connect to Milvus server
   >>> milvus = Milvus()
   >>> milvus.connect(host='localhost', port='19530')
   Status(message='connected!', code=0)
   ```

   > Note: In the above code, default values are used for `host` and `port` parameters. Feel free to change them to the IP address and port you set for Milvus server. 
   
   ```python
   >>> milvus.connect(uri='tcp://localhost:19530')
   Status(message='connected!', code=0)
   ```

## Create a table

Assume we would create a table named test01. Read below parameters carefully and set values according to your requirements.

| Parameter         | Description                                                  | Type       | Reference value                                         |
| ----------------- | ------------------------------------------------------------ | ---------- | ------------------------------------------------------- |
| `table_name`      | The name of the table to create, which must be unique within its database. <br/>Begin a table name with a letter or an underscore (_) . Subsequent characters can be letters, underscores, numbers (0-9). The entire length can not exceed 255 characters. | String     | 'table name'                                            |
| `dimension`       | The dimension of the vectors that are to be inserted into the created table. | Integer    | 0 < dimension <= 16384 (Usually set to 128, 256 or 512) |
| `index_file_size` | Maximum data file size beyond which index will be automatically built. | Integer    |                                                         |
| `metric_type`     | The method vector distances are compared in Milvus. You can compare vectors either by Euclidean distance (L2) or inner product (IP). | MetricType | `MetricType.L2` / `MetricType.IP`                       |

To create a table, use `milvus.create_table` followed by parameters that include the table name, vector dimension, and the index type:

1. Prepare table parameters.

   ```python
   # Prepare param
   >>> param = {'table_name':'test01', 'dimension':256, 'index_file_size':1024, 'metric_type':MetricType.L2}
   ```

2. Create Table test01.

   ```python
   # Create a table
   >>> milvus.create_table(param)
   Status(message='Table test01 created!', code=0)
   ```

3. Verify details of the newly created table.

   ```python
   # Verify table info.
   >>> status, table = milvus.describe_table('test01')
   >>> status
   Status(message='Describe table successfully!')
   >>> table
   TableSchema(table_name='test01',dimension=256, index_file_size=1024, metric_type=<MetricType: L2>)
   ```

## List tables

To see all active tables in the database, use `milvus.show_tables`:

```python
>>> status, tables = milvus.show_tables()
>>> status
Status(message='Show tables successfully!', code=0)
>>> tables
['test01', 'others', ...]
```

To show the metadata of a particular table:

```python
>>> status, table = milvus.describe_table('test01')
>>> status
Status(message='Describe table successfully!')
>>> table
TableSchema(table_name='test01',dimension=256, index_file_size=1024, metric_type=<MetricType: L2>)
```

To verity if a table exists in Milvus, use this command:

```python
>>> milvus.has_table(table_name='test01')
True
```

> Note: If the table you verified is not available, `False` will be returned instead of `True`.

> Note: If you want to learn more detailed operations in Milvus, you may read [Milvus Python SDK](https://pypi.org/project/pymilvus) and [Examples](https://github.com/milvus-io/pymilvus/blob/branch-0.4.0/examples/example.py)。

## Insert vectors into a table

Below is the list of parameters for inserting vectors into a table:

| Parameter    | Description                                                  | Type                | Reference value        |
| ------------ | ------------------------------------------------------------ | ------------------- | ---------------------- |
| `table_name` | The name of the table to create, which must be unique within its database. <br/>Begin a table name with a letter or an underscore (_) . Subsequent characters can be letters, underscores, numbers (0-9). The entire length can not exceed 255 characters. | String              | 'table name'           |
| `records`    | The list of vectors to insert into the table. Each vector value must be a **Float** data type, with the same dimension as that defined for the table. | 2-dimensional  list | [[0.1, 0.2, ...], ...] |

To insert a batch of vectors (represented by `records` in the code) into a table, use `milvus.add_vectors` followed by the table name and a comma-separated list of vectors. 

When succeeded, a group of vector ids will be returned. 

```python
# Insert vectors
>>> status, ids = milvus.add_vectors(table_name='test01', records=vectors)
>>> status
Status(code=0, message='Success')
>>> ids  # 20 ids returned
23455321135511233
12245748929023489
...
```

You can also provide user-defined vector ids:

```python
>>> vector_ids = [id for id in range(20)]
>>> status, ids = milvus.add_vectors(table_name='test01', records=vectors, ids=vector_ids)
>>> print(ids)
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
```


##### Create index

## Create index

Below is the list of parameters for creating index for a table:

| Parameter    | Description                                                  | Type      | Reference value               |
| ------------ | ------------------------------------------------------------ | --------- | ----------------------------- |
| `index_type` | The type of indexing method to query the table. Select one out of these types: <br/>1. `FLAT` - Provides 100% accuracy for recalls. However, performance might be downgraded due to huge computation effort; <br/>2. `IVFLAT` - K-means based similarity search which is balanced between accuracy and performance; <br/>3. `IVF_SQ8` - Vector indexing that adopts a scalar quantization strategy that significantly reduces the size of a vector (by about 3/4), thus improving the overall throughput of vector processing. | IndexType | `FLAT` / `IVFLAT` / `IVF_SQ8` |
| `nlist`      | Number of vector buckets in a file. Default value is 16384.  | Integer   | 1 - 16384                     |

To create an index for the table, use `milvus.create_index` followed by parameters that include the table name, index type, and nlist.

1. Prepare index parameters.

   ```python
   # Prepare index param
   >>> index_param = {'index_type': IndexType.IVFLAT, 'nlist': 16384}
   ```

2. Create an index for the table.

   ```python
   # Create index
   >>> milvus.create_index('test01', index_param)
   Status(code=0, message='Build index successfully!')
   ```

To show index information of a table, use `milvus.describe_index` followed by the table name:

```python
# Show index info
>>> milvus.describe_index('test01')
>>> status
Status(code=0, message='Success'), IndexParam(table_name='test01', index_type=<IndexType: IVFLAT>, nlist=16384)
```

To drop an index, use below command:

```python
>>> milvus.drop_index('test01')
>>> status
Status(code=0, message='Success')
```

## Search vectors in a table

Below is the list of parameters for searching vectors in a table:

| Parameter                 | Description                                                  | Type                                  | Reference value                     |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------- | ----------------------------------- |
| `table_name`              | The name of the table to create, which must be unique within its database. <br/>Begin a table name with a letter or an underscore (_) . Subsequent characters can be letters, underscores, numbers (0-9). The entire length can not exceed 255 characters. | String                                | 'table name'                        |
| `query_records`           | The list of query vectors to be searched in the table. Each vector value must be a float data type, with the same dimension as that defined for the table. | 2-dimensional list                    | [[0.1, 0.2, ...], ...]              |
| `top_k`                   | The top k most similar results of each target vector.        | Integer                               | 0 < top_k <= 1000                   |
| `nprobe`                  | Number of queried vector buckets. <br/>`nprobe` affects search precision. The greater the value, the more precise the result, yet the slower the search speed. | Integer                               | 1 - 16384                           |
| `query_ranges` (optional) | An optional, comma-separated list that defines the condition by which the search is filtered. <br/>For example you can search within a specific date range. The default value `None` (no range, meaning to search the entire database) is used if you leave this parameter out. | List (Suggest to use Tuple data type) | [('2019-01-01', '2019-01-02'), ...] |

> Note: Currently, only date range is supported in `query_ranges`. The date format is 'yyyy-mm-dd'. The date range [2019.1.1, 2019.1.5] contains 2019.1.1 and 2019.1.5.

To search a batch of vectors, use `milvus.search_vectors` followed by the table from which to retrieve the data, the target vectors to be searched, and the number of mapping vectors that will be returned for each target vector.

> Note: A target vector refers to the vector that is the target of the search. A mapping vector is a search result that is proven to be similar to the target vector. 

Suppose you want to search the top 5 most similar vectors of three 256-dimensional vectors (represented by `query_records` in below codes), you may:

```python
# Search 3 vectors
>>> status, results = milvus.search_vectors(table_name='test01', query_records=q_records, top_k=5, nprobe=16)
>>> status
Status(message='Search vectors successfully!', code=0)
>>> results # Searched top_k vectors
>>> print(results) # Searched top_k vectors
[
[QueryResult(id=0, distance=34.85963439941406)],
[QueryResult(id=0, distance=36.73900604248047)],
[QueryResult(id=0, distance=34.35655975341797)],
[QueryResult(id=18, distance=36.19701385498047)],
[QueryResult(id=5, distance=39.11549758911133)]
]
```

To filter the results, add a `query_ranges` clause identifying the date range to filter by. 

```python
# Search 3 vectors
>>> status, results = milvus.search_vectors(table_name='test01', query_records=q_records, top_k=5, query_ranges=[('2019-06-01', '2019-06-05')] )
>>> status
Status(message='Search vectors successfully!', code=0)
>>> results # Searched top_k vectors
[[QueryResult(id=0, distance=34.85963439941406)],
[QueryResult(id=0, distance=36.73900604248047)],
[QueryResult(id=0, distance=34.35655975341797)],
...
]
```

## Delete vectors by range

To delete vectors you no longer need, use `milvus.delete_vectors_by_range` followed by the table name and the date range:

```python
# Delete vectors
>>> milvus.delete_vectors_by_range('test01', '2019-06-01', '2020-01-01')
>>> status
Status(message='Delete vectors successfully!', code=0)
```

## Drop a table

When you no longer need a table, use `milvus.delete_table` followed by the table name to remove the table and all its data:

```python
# Drop table
>>> milvus.delete_table(table_name='test01')
>>> status
Status(message='Delete table successfully!', code=0)
```

## What's next?

- [Try Milvus Bootcamp](https://github.com/milvus-io/bootcamp) to learn more about solutions
- [Troubleshoot API Operations](troubleshoot.md)
