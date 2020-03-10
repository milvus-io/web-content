---
id: milvus_operation.md
title: Learn Milvus Operations
sidebar_label: Learn Milvus Operations
---

# Milvus 基本操作

该页面将向您展示如何使用 [Python SDK](https://github.com/milvus-io/pymilvus) 运行 Milvus 基本操作。关于详细的 API 参考信息，请参考 [Python API 文档](https://github.com/milvus-io/pymilvus)。

您也可以使用其它客户端，例如 [Java](https://github.com/milvus-io/milvus-sdk-java), [C++](https://github.com/milvus-io/milvus/tree/master/sdk), [Go](https://github.com/milvus-io/milvus-sdk-go), 或 [RESTful](https://github.com/milvus-io/milvus/tree/master/core/src/server/web_impl).

## 连接 Milvus 服务端

1. 导入 pymilvus。

   ```python
   # Import pymilvus
   >>> from milvus import Milvus, IndexType, MetricType, Status
   ```

2. 使用以下任意一种方法连接 Milvus 服务端：

   ```python
   # Connect to Milvus server
   >>> milvus = Milvus()
   >>> milvus.connect(host='localhost', port='19530')
   ```

   > 注意：在上面的代码中，`host` 和 `port` 都使用了默认值。您可以将其更改为自己设定的 IP 地址和端口。
   
   ```python
   >>> milvus.connect(uri='tcp://localhost:19530')
   ```

## 创建/删除集合

### 创建集合

1. 准备创建集合所需参数。

   ```python
   # Prepare collection parameters
   >>> param = {'collection_name':'test01', 'dimension':256, 'index_file_size':1024, 'metric_type':MetricType.L2}
   ```

2. 创建集合名为 `test01`， 维度为256， 自动创建索引的数据文件大小为 1024 MB，距离度量方式为欧氏距离（L2）的集合。

   ```python
   # Create a collection
   >>> milvus.create_collection(param)
   ```
   
### 获取集合的统计信息

您可以调用如下接口查询集合的统计信息。查询结果的信息包含集合/分区/段的向量数量，存储使用量等信息。

```python
>>> milvus.collection_info('test01')
```


### 删除集合

```python
# Drop collection
>>> milvus.drop_collection(collection_name='test01')
```

## 在集合中创建/删除分区

### 创建分区

您可以通过标签将集合分割为若干个分区，从而提高搜索效率。每个分区实际上也是一个集合。

```python
# Create partition
>>> milvus.create_partition('test01', 'tag01')
```

### 删除分区

```python
>>> milvus.drop_partition(collection_name='test01', partition_tag='tag01')
```

## 在集合中创建/删除索引

### 创建索引

> 注意：在实际生产环境中，建议在插入向量之前先创建索引，以便系统自动增量创建索引。需要注意的是，在向量插入结束后，相同的索引需要手动再创建一次（因为可能存在大小不满足 `index_file_size` 的数据文件，系统不会为该文件自动创建索引）。

> 更多索引的用法请参考 [索引示例程序](https://github.com/milvus-io/pymilvus/tree/master/examples/indexes)。

1. 准备创建索引所需参数(以IVF_FLAT为例)。

   ```python
   # Prepare index param
   >>> ivf_param = {'nlist': 16384}
   ```

2. 为集合创建索引。

   ```python
   # Create index
   >>> milvus.create_index('test01', IndexType.IVF_FLAT, ivf_param)
   ```

### 删除索引

```python
>>> milvus.drop_index('test01')
```

## 在集合/分区中插入/删除向量

### 在集合中插入向量

1. 使用 `random` 函数生成20个256维的向量。

   ```python
   >>> import random
   # Generate 20 vectors of 256 dimension
   >>> vectors = [[random.random() for _ in range(dim)] for _ in range(20)]
   ```

2. 插入向量列表。如果您不指定向量 ID，Milvus 自动为向量分配 ID。

   ```python
   # Insert vectors
   >>> milvus.insert(collection_name='test01', records=vectors)
   ```

   您也可以自己定义向量 ID：

   ```python
   >>> vector_ids = [id for id in range(20)]
   >>> milvus.insert(collection_name='test01', records=vectors, ids=vector_ids)
   ```

### 在分区中插入向量

```python
>>> milvus.insert('test01', vectors, partition_tag="tag01")
```

您可以通过 `get_vector_by_id()` 验证已经插入的向量。此处验证插入的第一条向量。这里假设您的表中存在以下向量 ID：

```python
>>> status, vector = milvus.get_vector_by_id(collection_name='test01', vector_id=0)
```

### 通过 ID 删除向量

假设您的表中存在以下向量 ID：

```python
>>> ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
```

您可以通过以下命令删除向量：

```python
>>> milvus.delete_by_id(collection_name='test01', ids)
```

### 通过 ID 获取向量

您也可以根据向量 ID 获取向量， 目前仅支持一次获取单条向量，暂不支持批量获取：

```python
>>> status, vector = milvus.get_vector_by_id(collection_name='test01', vector_id=ids[0])
```

## 将表中的数据落盘

当您在进行有关数据更改的操作时，您可以将表中的数据从内存落盘以避免数据丢失。Milvus 也支持自动落盘。自动落盘会在固定的时间周期将所有现存表的数据落盘。您可以通过 [Milvus 服务端配置文件](../reference/milvus_config.md)来设置自动落盘的时间间隔。

```python
>>> milvus.flush(collection_name_array=['test01'])
```

## 压缩表中的段

段（segment）是 Milvus 自动将插入的向量数据合并所获得的数据文件。一个表可包含多个段。如果一个段中的向量数据被删除，被删除的向量数据占据的空间并不会自动释放。您可以对表中的段进行压缩操作以释放多余空间。

```python
>>> milvus.compact(collection_name='test01', timeout='1')
```

## 获取段中的向量 ID

您可以获取指定段中向量 ID 信息。您需要提供段的名称，其可以从`collection_info`中获取。

```python
>>> milvus.get_vector_ids('test01', '1583727470444700000')
```

## 在表/分区中搜索向量

### 在表中搜索向量

1. 创建搜索参数

```python
>>> search_param = {'nprobe': 16}
```

2. 进行搜索。

```python
# create 5 vectors of 32-dimension
>>> q_records = [[random.random() for _ in range(dim)] for _ in range(5)]
>>> milvus.search(collection_name='test01', query_records=q_records, top_k=2, params=search_param)
```

### 在分区中搜索向量

```python
# create 5 vectors of 32-dimension
>>> q_records = [[random.random() for _ in range(dim)] for _ in range(5)]
>>> milvus.search(collection_name='test01', query_records=q_records, top_k=1, partition_tags=['tag01'], params=search_param)
```

> 注意：如果您不指定 `partition_tags`， Milvus 会在整个集合中搜索。


## 与 Milvus 服务端断开连接

```python
>>> milvus.disconnect()
```

## 接下来您可以

- [体验 Milvus 在线训练营](https://github.com/milvus-io/bootcamp) 了解更多解决方案
- [故障诊断 API 行为](troubleshoot.md)
