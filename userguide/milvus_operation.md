---

id: milvus_operation
title: Learn Milvus Operations
sidebar_label: Learn Milvus Operations
---

# Learn Milvus Operations

This page walks you through some basic Milvus operations using the [**Python** SDK](https://pypi.org/project/pymilvus).

You can also use other languages such as [Java](https://milvus-io.github.io/milvus-sdk-java/javadoc/index.html), C++, etc.

## Before trying out these operations

Please use pymilvus, the built-in Python client, to try out these operations.

1. Import pymilvus.

   ```python
   # Import pymilvus
   >>> from milvus import Milvus, IndexType, MetricType, Status
   ```

2. Connect to Milvus on your local server by using one of the following methods:

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

To show all the rows of a table, use `milvus.get_table_row_count` followed by the table name:


```python
# Show table rows
>>> status, num = milvus.get_table_row_count('test01')
>>> status
Status(code=0, message='Success')
>>> num
20
```

To verity if a table exists in Milvus, use this command:

```python
>>> milvus.has_table(table_name='test01')
True
```

> Note: If the table you verified is not available, the terminal returns `False`.


## Insert vectors into a table


> Note: In the production scenario, it is recommended to use the `milvus.create_index` before inserting vectors into the table. Index will be automatically built when vectors are being imported.  However, you need to create the same index again after the vector insertion process is completed because some data files may not meet the `index_file_size` and index will not be automatically built for these data files.

Below is the list of parameters for inserting vectors into a table:

| Parameter    | Description                                                  | Type                | Reference value        |
| ------------ | ------------------------------------------------------------ | ------------------- | ---------------------- |
| `table_name` | The name of the table to create, which must be unique within its database. <br/>Table name can only contain numbers, letters, and underscores. The first character of a table name must be an underscore or letter. The length of a table name must be less than 255 characters.  | String              | 'table name'           |
| `records`    | The list of vectors to insert into the table. Each vector value must be **Float** data type and has the same dimension as the table. | 2-dimensional list | [[0.1, 0.2, ...], ...] |

To insert a batch of vectors (represented by `records` in the code) into a table, use `milvus.add_vectors` followed by the table name and a comma-separated list of vectors. 

If you don't have vectors available at hand, you can also use the randomly-generated vectors by below command. Assume we would generate 20 vectors of 256 dimension.

```python
>>> import random
# Generate 20 vectors of 256 dimension
>>> vectors = [[random.random() for _ in range(dim)] for _ in range(20)]
```

Then insert the list of vectors. When succeeded, a group of vector ids will be returned.

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

To show the number of vectors inserted into a table (all of the rows from a table), use `milvus.get_table_row_count` followed by the table name.

```python
# Show number of vectors
>>> status, num = milvus.get_table_row_count('test01')
>>> status
Status(code=0, message='Success')
>>> num
20
```

## Create an index

Below is the list of parameters for creating index for a table:

| Parameter    | Description                                                  | Type      | Reference value                                    |
| ------------ | ------------------------------------------------------------ | --------- | -------------------------------------------------- |
| `index_type` | The type of indexing method to query the table. Select one out of these types: <ul><li>`FLAT` - Provides 100% accuracy for recalls. However, performance might be downgraded due to huge computation effort</li><li>`IVFLAT` - K-means based similarity search which is balanced between accuracy and performance</li><li>`IVF_SQ8` - Vector indexing that adopts a scalar quantization strategy that significantly reduces the size of a vector (by about 3/4), thus improving the overall throughput of vector processing</li><li>`IVF_SQ8H` - An enhanced index algorithm of `IVF_SQ8`. It supports hybrid computation on both CPU and GPU, which significantly improves the search performance.<br/>To use this index type, make sure both `cpu` and `gpu` are added as resources for search usage in the [Milvus configuration file](../reference/milvus_config.md).</li></ul> | IndexType | `FLAT` / `IVFLAT` / `IVF_SQ8` / `IVF_SQ8H` |
| `nlist`      | Number of vector buckets in a file. Default value is 16384.  | Integer   | 1 - 16384|                                     

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
| `table_name`              | The name of the table to create, which must be unique within its database. <br/>Table name can only contain numbers, letters, and underscores. The first character of a table name must be an underscore or letter. The length of a table name must be less than 255 characters. | String                                | 'table name'                        |
| `query_records`           | The list of query vectors to be searched in the table. Each vector value must be float data type, with the same dimension as that defined for the table. | 2-dimensional list                    | [[0.1, 0.2, ...], ...]              |
| `top_k`                   | The top k most similar results of each query vector.        | Integer                               | 0 < top_k <= 1000                   |
| `nprobe`                  | Number of queried vector buckets. <br/>`nprobe` affects search precision. The greater the value, the more precise the result, yet the slower the search speed. | Integer                               | 1 - 16384                           |
| `query_ranges` (optional) | An optional, comma-separated list that defines the condition by which the search is filtered. <br/>For example, you can search within a specific date range. The default value `None` (no range, meaning to search the entire database) is used if you leave this parameter out. | List (Suggest to use tuple data type) | [('2019-01-01', '2019-01-02'), ...] |

> Note: Currently, only date range is supported in `query_ranges`. The date format is 'yyyy-mm-dd'. The date range [2019.1.1, 2019.1.5] contains 2019.1.1 and 2019.1.5.

To search a batch of vectors, use `milvus.search_vectors` followed by the table from which to retrieve the data, the query vectors, and the number of vectors that will be returned for each query vector.

Suppose you want to search the top 2 most similar vectors of three 256-dimensional vectors (represented by `query_records` in below codes), you may:

```python
# Search 3 vectors
>>> status, results = milvus.search_vectors(table_name='test01', query_records=q_records, top_k=2, nprobe=16)
>>> status
Status(message='Search vectors successfully!', code=0)
>>> results # Searched top_k vectors
>>> print(results) # Searched top_k vectors
[
[(id:15, distance:2.855304718017578),
 (id:16, distance:3.040700674057007)],
[(id:11, distance:3.673950433731079),
 (id:15, distance:4.183730602264404)],
      ........
[(id:6, distance:4.065953254699707),
 (id:1, distance:4.149323463439941)]
]
```

To filter the results, add a `query_ranges` clause identifying the date range to filter by. 

```python
# Search 3 vectors
>>> status, results = milvus.search_vectors(table_name='test01', query_records=q_records, top_k=2, query_ranges=[('2019-06-01', '2019-06-05')] )
>>> status
Status(message='Search vectors successfully!', code=0)
>>> results # Searched top_k vectors
[
[(id:15, distance:2.855304718017578),
 (id:16, distance:3.040700674057007)],
[(id:11, distance:3.673950433731079),
 (id:15, distance:4.183730602264404)],
...
]
```

## Drop a table

When you no longer need a table, use `milvus.delete_table` followed by the table name to remove the table and all its data:

```python
# Drop table
>>> milvus.delete_table(table_name='test01')
>>> status
Status(message='Delete table successfully!', code=0)
```

## What's next

- [Try Milvus bootcamp](https://github.com/milvus-io/bootcamp) to learn about more solutions
- [Troubleshoot API operations](troubleshoot.md)
