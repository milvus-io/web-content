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

## Create/Drop collections

### Create a collection

1. Prepare collection parameters.

   ```python
   # Prepare collection parameters
   >>> param = {'collection_name':'test01', 'dimension':256, 'index_file_size':1024, 'metric_type':MetricType.L2}
   ```

2. Create collection `test01` with dimension size as 256, size of the data file for Milvus to automatically create indexes as 1024, and metric type as Euclidean distance (L2).

   ```python
   # Create a collection
   >>> milvus.create_collection(param)
   ```

### Drop a collection

```python
# Drop collection
>>> milvus.delete_collection(collection_name='test01')
```

## Create/Drop partitions in a collection

### Create a partition

You can split collections into partitions by partition tags for improved search performance. Each partition is also a collection.

```python
# Create partition
>>> milvus.create_partition(collection_name='test01', partition_tag='tag01')
```

Use `show_partitions()` to verify whether the partition is created.

```python
# Show partitions
>>> milvus.show_partitions(collection_name='test01')
```

### Drop a partition

```python
>>> milvus.drop_partition(collection_name='test01', partition_tag='tag01')
```

## Create/Drop indexes in a collection

### Create an index

> Note: In production, it is recommended to create indexes before inserting vectors into the collection. Index is automatically built when vectors are being imported. However, you need to create the same index again after the vector insertion process is completed because some data files may not meet the `index_file_size` and index will not be automatically built for these data files.

1. Prepare index parameters. The following command uses `IVF_FLAT` index type as an example.

   ```python
   # Prepare index param
   >>> ivf_param = {'nlist': 16384}
   ```

2. Create an index for the collection.

   ```python
   # Create index
   >>> milvus.create_index('test01', IndexType.IVF_FLAT, ivf_param)
   ```

### Drop an index

```python
>>> milvus.drop_index('test01')
```

## Insert/Delete vectors in collections/partitions

### Insert vectors in a collection

1. Generate 20 vectors of 256 dimension.

   ```python
   >>> import random
   # Generate 20 vectors of 256 dimension
   >>> vectors = [[random.random() for _ in range(dim)] for _ in range(20)]
   ```

2. Insert the list of vectors. If you do not specify vector ids, Milvus automatically generates IDs for the vectors.

   ```python
   # Insert vectors
   >>> milvus.insert(collection_name='test01', records=vectors)
   ```

   Alternatively, you can also provide user-defined vector ids:

   ```python
   >>> vector_ids = [id for id in range(20)]
   >>> milvus.insert(collection_name='test01', records=vectors, ids=vector_ids)
   ```

### Insert vectors in a partition

```python
>>> milvus.insert('test01', vectors, partition_tag="tag01")
```

To verify the vectors you have inserted, use `get_vector_by_id()`. Assume you have some vectors with the following IDs.

```python
>>> status, vector = milvus.get_vector_by_id(collection_name='test01', vector_id=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
```

### Delete vectors by ID

Assume you have some vectors with the following IDs:

```python
>>> ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
```

You can delete these vectors by:

```python
>>> milvus.delete_by_id(collection_name='test01', ids)
```

## Flush data in one or multiple collections to disk

When performing operations related to data changes, you can flush the data from memory to disk to avoid possible data loss. Milvus also supports automatic flushing, which runs at a fixed interval to flush the data in all collections to disk. You can use the [Milvus server configuration file](../reference/milvus_config.md) to set the interval.

```python
>>> milvus.flush(collection_name_array=['test01'])
```

## Compact all segments in a collection

A segment is a data file that Milvus automatically creates by merging inserted vector data. A collection can contain multiple segments. If some vectors are deleted from a segment, the space taken by the deleted vectors cannot be released automatically. You can compact segments in a collection to release space.

```python
>>> milvus.compact(collection_name='test01', timeout='1')
```

## Search vectors in collections/partitions

### Search vectors in a collection

1. Prepare search parameters.

```python
>>> search_param = {'nprobe': 16}
```

2. Search vectors.

```python
# create 5 vectors of 32-dimension
>>> q_records = [[random.random() for _ in range(dim)] for _ in range(5)]
# search vectors
>>> milvus.search(collection_name='test01', query_records=q_records, top_k=2, params=search_param)
```

### Search vectors in a partition

```python
# create 5 vectors of 32-dimension
>>> q_records = [[random.random() for _ in range(dim)] for _ in range(5)]
>>> milvus.search(collection_name='test01', query_records=q_records, top_k=1, partition_tags=['tag01'], params=search_param)
```

> Note: If you do not specify `partition_tags`, Milvus searches the whole collection.

## Disconnect from the Milvus server

```python
>>> milvus.disconnect()
```

## What's next

- [Try Milvus bootcamp](https://github.com/milvus-io/bootcamp) to learn about more solutions
- [Troubleshoot API operations](troubleshoot.md)
