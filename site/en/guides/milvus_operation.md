---
id: milvus_operation.md
title: Learn Milvus Operations
sidebar_label: Learn Milvus Operations
---

# Learn Milvus Operations

This page walks you through some basic Milvus operations using the [Python client](https://github.com/milvus-io/pymilvus). Refer to [Python API documentation](https://github.com/milvus-io/pymilvus) for detailed information.

You can also use other clients, including [Java](https://github.com/milvus-io/milvus-sdk-java), [C++](https://github.com/milvus-io/milvus/tree/master/sdk), [Go](https://github.com/milvus-io/milvus-sdk-go), and [RESTful](https://github.com/milvus-io/milvus/tree/master/core/src/server/web_impl).

> Note: It is recommended that you use the [sizing tool](https://milvus.io/tools/sizing) to estimate required hardware resources for your data.

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

#### Create a collection

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

#### Acquire statistical information of a collection

You can use the following command to acquire the statistical information of a collection, including the number of vectors in a collection/partition/segment and storage usage.

```python
>>> milvus.collection_info('test01')
```

> Note：Refer to [this link](https://github.com/milvus-io/pymilvus/blob/master/examples/example_vectors.py) for more information.

#### Drop a collection

```python
# Drop collection
>>> milvus.delete_collection(collection_name='test01')
```

## Create/Drop partitions in a collection

#### Create a partition

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

#### Drop a partition

```python
>>> milvus.drop_partition(collection_name='test01', partition_tag='tag01')
```

## Create/Drop indexes in a collection

#### Create an index
Currently, a collection only supports one index type, and switching the index type will automatically delete the old index files. Before creating another index, FLAT is used as the default index type.
> Note: `create_index` will specify the index type of the collection, and synchronously create an index for the previously inserted data. When the size of the subsequently inserted data reaches `index_file_size`, the index will be automatically created in the background. In the production environment, if it is streaming data, it is recommended to call `create_index` before inserting the vector so that the systems can automatically build it later; if it is static data, it is recommended to call `create_index` once after importing all the data. Refer to [example programs](https://github.com/milvus-io/pymilvus/tree/master/examples/indexes) to learn more about how to create indexes.

1. Prepare index parameters. The following command uses `IVF_FLAT` index type as an example. The index parameters is a JSON string and represented by dict in Python.

   ```python
   # Prepare index param
   >>> ivf_param = {'nlist': 16384}
   ```

   > Note: For different index types, the required parameters for index building also differ. You **must** specify values for all index parameters.

      | Index type    | Index parameters | Example                                                                | Value range               |
      | --------------------- | ------------ | ----------------------------------------------------------------------- | -------------------- |
      | `IVFLAT` / `SQ8` / `SQ8H`| `nlist`：Number of clusters from the vector data file when Milvus performs clustering operation for index creation. The index file records the results of the clustering operation, including index type, central vector of each cluster, and the vectors in each cluster, for later search operations.      | `{nlist: 16384}`                                                        | `nlist`：[1, 999999] |
      | `IVFPQ`               | `nlist`：Number of clusters from the vector data file when Milvus performs clustering operation for index creation. The index file records the results of the clustering operation, including index type, central vector of each cluster, and the vectors in each cluster, for later search operations. </br></br> `m`：Compression ratio during index creation. The smaller `m` is, the higher the compression ratio. | `{nlist: 16384, m: 12}`                                                 | `nlist`：[1, 999999] </br></br> `m`: one of {96, 64, 56, 48, 40, 32, 28, 24, 20, 16, 12, 8, 4, 3, 2, 1} |
      | `NSG`                 | `search_length`：The higher the value, the more nodes are searched in the graph, the higher the recall rate, but the slower the search speed. It is recommended that `search_length` is smaller than `candidate_pool` and in range [40, 80]。</br></br> `out_degree`：The higher the value, the higher the memory usage, and the better search performance.</br></br> `candidate_pool`：Affects index quality and is suggested to be in range [200, 500]. </br></br> `knng`：Affects index quality and is suggested to be `out_degree` + 20.             | `{search_length: 45, out_degree:50, candidate_pool_size:300, knng:100}` |  `search_length range`: [10, 300]</br></br>`out_degree`: [5, 300]</br></br>`candidate_pool_size`: [50, 1000]</br></br>`knng`: [5, 300]                |
      | `HNSW`                |   `M`：Affects index build time and index quality. The higher the value, the longer it costs to build an index, the higher the index quality, and the higher the memory usage.  </br></br> `efConstruction`：Affects index build time and index quality. The higher the value, the longer it costs to build and index, the higher the index quality, and the higher the memory usage.  | `{M: 16, efConstruction:500}`   |    `M` :[5, 48]</br></br>`efConstruction` :[100, 500]                |

   Refer to [Milvus Indexes](index.md) for more information。

2. Create an index for the collection.
   After deleting the index, the collection uses the default index type FLAT again.
   ```python
   # Create index
   >>> milvus.create_index('test01', IndexType.IVF_FLAT, ivf_param)
   ```

#### Drop an index

```python
>>> milvus.drop_index('test01')
```

## Insert/Delete vectors in collections/partitions

#### Insert vectors in a collection

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

#### Insert vectors in a partition

```python
>>> milvus.insert('test01', vectors, partition_tag="tag01")
```

To verify the vectors you have inserted, use `get_vector_by_id()`. Assume you have some vectors with the following IDs.

```python
>>> status, vector = milvus.get_vector_by_id(collection_name='test01', vector_id=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
```

#### Delete vectors by ID

Assume you have some vectors with the following IDs:

```python
>>> ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
```

You can delete these vectors by:

```python
>>> milvus.delete_by_id(collection_name='test01', id_array=ids)
```

> Note: Vector deletion is only supported by index types that run in CPU, including `FLAT`, `IVFLAT`, and `IVFSQ8`. For other index types, even if you have performed vector deletion, the deleted vectors can still be searched.

## Flush data in one or multiple collections to disk

When performing operations related to data changes, you can flush the data from memory to disk to avoid possible data loss. Milvus also performs automatic flushing, which runs at a fixed interval (1 second) to flush the data in all collections to disk.

```python
>>> milvus.flush(collection_name_array=['test01'])
```

## Compact all segments in a collection

A segment is a data file that Milvus automatically creates by merging inserted vector data. A collection can contain multiple segments. If some vectors are deleted from a segment, the space taken by the deleted vectors cannot be released automatically. You can compact segments in a collection to release space.

```python
>>> milvus.compact(collection_name='test01', timeout='1')
```

## Search vectors in collections/partitions

#### Search vectors in a collection

1. Prepare search parameters.

   ```python
   >>> search_param = {'nprobe': 16}
   ```

   > Note: For different index types, search parameters also differ. You **must** assign values to all search parameters.

      | Index type          | Search parameters     | Example                                                | Value range              |
      | --------------------- | ------------ | ----------------------------------------------------------------------- | -------------------- |
      |  `FLAT` | - | | - |
      |  `IVFLAT`/`SQ8`/`SQ8H`/`IVFPQ` | `nprobe`：Number of classes of vectors to search. `nprobe` affects search precision. The higher the value, the higher the precision, but the lower the search speed. | `{nprobe: 32}`|  [1, `nlist`]   |
      |  `NSG` | `search_length`：The higher the value, the more number of nodes are searched in the graph and the higher the recall rate, but the lower the search speed. | `{search_length:100}`|  [10, 300]   |
      |  `HNSW` | `ef`：The higher the value, the more data is searched in the index and the higher the recall rate, but the lower the search speed.| `{ef: 64}`|  [`topk`, 4096]   |

   > Note: `top_k` stands for the number of vectors that are the most similar to the target vector. `top_k` is defined during search. The value range of `top_k` is `(0, 2048]`.

2. Search vectors.

   ```python
   # create 5 vectors of 32-dimension
   >>> q_records = [[random.random() for _ in range(dim)] for _ in range(5)]
   # search vectors
   >>> milvus.search(collection_name='test01', query_records=q_records, top_k=2, params=search_param)
   ```

#### Search vectors in a partition

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
