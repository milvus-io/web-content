---
id: milvus_operation.md
title: Learn Milvus Operations
sidebar_label: Learn Milvus Operations
---

# Learn Milvus Operations

This page walks you through some basic Milvus operations using the [**Python** client](https://github.com/milvus-io/pymilvus).

You can also use other clients, including [Java](https://github.com/milvus-io/milvus-sdk-java), [C++](https://github.com/milvus-io/milvus/tree/master/sdk), [Go](https://github.com/milvus-io/milvus-sdk-go), and [RESTful](https://github.com/milvus-io/milvus/tree/master/core/src/server/web_impl).

The basic workflow for the Milvus client is described below:

1. Connect to the Milvus server.
2. Create/drop tables.
3. (Optional) Create/drop partitions in tables.
4. Create/drop indexes for tables.
5. Insert/delete vectors in tables/partitions.
6. Search vectors in tables/partitions.
7. Disconnect from the Milvus server.

## Connect to the Milvus server

1. Import pymilvus.

   ```python
   # Import pymilvus
   >>> from milvus import Milvus, IndexType, MetricType, Status
   ```

2. Connect to Milvus server by using one of the following methods:

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

## Create/Drop tables

### Create a table

1. Prepare table parameters.

   ```python
   # Prepare table parameters
   >>> param = {'table_name':'test01', 'dimension':256, 'index_file_size':1024, 'metric_type':MetricType.L2}
   ```

2. Create Table `test01`.

   ```python
   # Create a table
   >>> milvus.create_table(param)
   Status(message='Table test01 created!', code=0)
   ```

3. Verify details of the newly created table.

   ```python
   # Verify table info
   >>> status, table = milvus.describe_table('test01')
   >>> status
   Status(message='Describe table successfully!')
   >>> table
   TableSchema(table_name='test01', dimension=256, index_file_size=1024, metric_type=<MetricType: L2>)
   ```

The following table shows parameters for `create_table()`:

| Parameter               | Description                                                  | Type       | Reference value                  |
| ----------------------- | ------------------------------------------------------------ | ---------- | --------------------------------- | 
| `table_name`            | The name of the table to create, which must be unique within its database. <br/>Begin a table name with a letter or an underscore `_` . Subsequent characters can be letters, underscores, numbers (0-9). The entire length can not exceed 255 characters. This parameter is required. | String | `table_name` |                   
| `dimension`             | The dimension of the vectors that are to be inserted into the created table. This parameter is required. | Integer    | （0, 16384]  |     
| `index_file_size` | Threshold value that triggers index building for raw data files. Index creation is controlled by the size of raw data files specified in this parameter. Data files with smaller sizes will not have indexes built. The default value is 1024 MB. | Integer    | (0, 4096] MB                  |
| `metric_type`           | The method that is used to evaluate vector similarity. The default value is `MetricType.L2`. | MetricType | `MetricType.L2`, `MetricType.IP`, `MetricType.TANIMOTO`,  `MetricType.HAMMING`, or  `MetricType.JACCARD`|


### Drop a table

```python
# Drop table
>>> milvus.delete_table(table_name='test01')
>>> status
Status(message='Delete table successfully!', code=0)
```

## Create/Drop partitions in a table

### Create a partition

You can split tables into partitions by partition tags for improved search performance. Each partition is also a table.

```python
>>> milvus.create_partition('test01', 'tag01')
Status(code=0, message='OK')
```

Use `show_partitions()` to verify whether the partition is created.

```python
milvus.show_partitions(table_name='test01')
```

## Create/Drop indexes in a table

### Create an index

> Note: In production, it is recommended to create indexes before inserting vectors into the table. Index is automatically built when vectors are being imported. However, you need to create the same index again after the vector insertion process is completed because some data files may not meet the `index_file_size` and index will not be automatically built for these data files.

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

3. Verify whether the index is successfully created:

   ```python
   # Show index info
   >>> milvus.describe_index('test01')
   >>> status
   Status(code=0, message='Success'), IndexParam(table_name='test01', index_type=<IndexType: IVFLAT>, nlist=16384)
   ```

The following table shows parameters for `create_index()`:

| Parameter    | Description                                                  | Type      | Reference value                                              |
| ------------ | ------------------------------------------------------------ | --------- | ------------------------------------------------------------ |
| `index_type` | The type of indexing method to query the table. Please refer to [Index Types](../reference/index.md) for detailed introduction of supported indexes. | IndexType | `FLAT`, `IVFLAT`, `IVF_SQ8`, `IVF_SQ8H`, `IVF_PQ`, `RNSG`, or `HNSW` |
| `nlist`      | Number of vector buckets in a file. The default value is 16384.  | Integer   | > 0   |

### Drop an index

```python
>>> milvus.drop_index('test01')
>>> status
Status(code=0, message='Success')
```

## Insert/Delete vectors in tables/partitions

### Insert vectors in a table

1. Generate 20 vectors of 256 dimension.

   ```python
   >>> import random
   # Generate 20 vectors of 256 dimension
   >>> vectors = [[random.random() for _ in range(dim)] for _ in range(20)]
   ```

2. Insert the list of vectors. Milvus returns a list of ids when successful.

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

   Alternatively, you can also provide user-defined vector ids:

   ```python
   >>> vector_ids = [id for id in range(20)]
   >>> status, ids = milvus.add_vectors(table_name='test01', records=vectors, ids=vector_ids)
   >>> print(ids)
   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
   ```

The following table shows parameters for `add_vectors()`:

| Parameter    | Description                                                  | Type                | Reference value        |
| ------------ | ------------------------------------------------------------ | ------------------- | ---------------------- |
| `table_name` | The name of the table to create, which must be unique. <br/>Table name can only contain numbers, letters, and underscores. The first character of a table name must be an underscore or letter. The length of a table name must be less than 255 characters. This parameter is required.  | String              | `table name`           |
| `records`    | The list of vectors to insert into the table. Each vector value must be **float** or **byte** and has the same dimension as the table. This parameter is required. | 2-dimensional list | `[[0.1, 0.2, ...], ...]` |
| `ids` |  The IDs of vectors in insert into a table. If you do not specify this parameter, Milvus automatically generates IDs for vectors. You must either use auto-generated IDs or manually specify vector IDs. |  1-dimensional list    |  `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]` |

### Insert vectors to a partition

```python
>>> status = milvus.insert('demo01', vectors, partition_tag="tag01")
>>> status
(Status(code=0, message='Add vectors successfully!')
```

## Delete vectors by ID



## Search vectors in tables/partitions

### Search vectors in a table by vectors

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

The following table shows parameters for `search_vectors()`:

| Parameter                 | Description                                                  | Type                                  | Reference value                     |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------- | ----------------------------------- |
| `table_name`              | The name of the table to create, which must be unique within its database. <br/>Table name can only contain numbers, letters, and underscores. The first character of a table name must be an underscore or letter. The length of a table name must be less than 255 characters. | String                                | 'table name'                        |
| `query_records`           | The list of query vectors to be searched in the table. Each vector value must be **float** or **byte**, with the same dimension as that defined for the table. | 2-dimensional list                    | [[0.1, 0.2, ...], ...]              |
| `top_k`                   | The top k most similar results of each query vector.         | Integer                               | (0, 2048]                           |
| `nprobe`                  | Number of queried vector buckets. <br/>`nprobe` affects search precision. The greater the value, the more precise the result, yet the slower the search speed. | Integer                               | [1, `nlist`]                          |

### Search vectors in a table by vector IDs




### Search vectors in a partition by vectors

```python
>>> milvus.search(table_name='test01', query_records=q_records, top_k=1, nprobe=8, partition_tags=['tag01'])
```

> Note: If you do not specify `partition_tags`, Milvus searches the whole table.

### Search vectors in a partition by vector IDs



## Disconnect from the Milvus server

```python
>>> milvus.disconnect()
Status(code=0, message='Disconnect successfully')
```

## What's next

- [Try Milvus bootcamp](https://github.com/milvus-io/bootcamp) to learn about more solutions
- [Troubleshoot API operations](troubleshoot.md)
