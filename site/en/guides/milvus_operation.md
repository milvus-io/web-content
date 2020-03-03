---
id: milvus_operation.md
title: Learn Milvus Operations
sidebar_label: Learn Milvus Operations
---

# Learn Milvus Operations

This page walks you through some basic Milvus operations using the [Python client](https://github.com/milvus-io/pymilvus). Refer to [Python API documentation](https://github.com/milvus-io/pymilvus) for detailed information.

You can also use other clients, including [Java](https://github.com/milvus-io/milvus-sdk-java), [C++](https://github.com/milvus-io/milvus/tree/master/sdk), [Go](https://github.com/milvus-io/milvus-sdk-go), and [RESTful](https://github.com/milvus-io/milvus/tree/master/core/src/server/web_impl).


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
   ```

   > Note: In the above code, default values are used for `host` and `port` parameters. Feel free to change them to the IP address and port you set for Milvus server.
   
   ```python
   >>> milvus.connect(uri='tcp://localhost:19530')
   ```

## Create/Drop tables

### Create a table

1. Prepare table parameters.

   ```python
   # Prepare table parameters
   >>> param = {'table_name':'test01', 'dimension':256, 'index_file_size':1024, 'metric_type':MetricType.L2}
   ```

2. Create Table `test01` with dimension size as 256, size of the data file for Milvus to automatically create indexes as 1024, and metric type as Euclidean distance (L2).

   ```python
   # Create a table
   >>> milvus.create_table(param)
   ```

### Drop a table

```python
# Drop table
>>> milvus.delete_table(table_name='test01')
```

## Create/Drop partitions in a table

### Create a partition

You can split tables into partitions by partition tags for improved search performance. Each partition is also a table.

```python
# Create partition
>>> milvus.create_partition(table_name='test01', partition_tag='tag01')
```

Use `show_partitions()` to verify whether the partition is created.

```python
# Show partitions
>>> milvus.show_partitions(table_name='test01')
```

### Drop a partition

```python
>>> milvus.drop_partition(table_name='test01', partition_tag='tag01')
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
   ```

### Drop an index

```python
>>> milvus.drop_index('test01')
```

## Insert/Delete vectors in tables/partitions

### Insert vectors in a table

1. Generate 20 vectors of 256 dimension.

   ```python
   >>> import random
   # Generate 20 vectors of 256 dimension
   >>> vectors = [[random.random() for _ in range(dim)] for _ in range(20)]
   ```

2. Insert the list of vectors. If you do not specify vector ids, Milvus automatically generates IDs for the vectors.

   ```python
   # Insert vectors
   >>> milvus.add_vectors(table_name='test01', records=vectors)
   ```

   Alternatively, you can also provide user-defined vector ids:

   ```python
   >>> vector_ids = [id for id in range(20)]
   >>> milvus.add_vectors(table_name='test01', records=vectors, ids=vector_ids)
   ```

### Insert vectors in a partition

```python
>>> milvus.insert('test01', vectors, partition_tag="tag01")
```

### Delete vectors by ID

Assume you have some vectors with the following IDs:

```python
>>> ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
```

You can delete these vectors by:

```python
>>> milvus.delete_by_id(table_name='test01', ids)
```

## Flush data in one or multiple tables to disk

When performing operations related to data changes, you can flush the data from memory to disk to avoid possible data loss. Milvus also supports automatic flushing, which runs at a fixed interval to flush the data in all tables to disk. You can use the [Milvus server configuration file](../reference/milvus_config.md) to set the interval.

```python
>>> milvus.flush(table_name_array=['test01'])
```

## Compact all segments in a table

You can compact all segments in a table. Milvus creates segments by merging inserted vector data. A table may contain multiple segments.

```python
>>> milvus.compact(table_name='test01', timeout='1')
```

## Search vectors in tables/partitions

### Search vectors in a table

```python
# create 5 vectors of 32-dimension
>>> q_records = [[random.random() for _ in range(dim)] for _ in range(5)]
# search vectors
>>> milvus.search_vectors(table_name='test01', query_records=q_records, top_k=2, nprobe=16)
```

### Search vectors in a partition

```python
# create 5 vectors of 32-dimension
>>> q_records = [[random.random() for _ in range(dim)] for _ in range(5)]
>>> milvus.search(table_name='test01', query_records=q_records, top_k=1, nprobe=8, partition_tags=['tag01'])
```

> Note: If you do not specify `partition_tags`, Milvus searches the whole table.

## Disconnect from the Milvus server

```python
>>> milvus.disconnect()
```

## What's next

- [Try Milvus bootcamp](https://github.com/milvus-io/bootcamp) to learn about more solutions
- [Troubleshoot API operations](troubleshoot.md)
