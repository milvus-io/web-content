---
id: milvus_operation
title: Learn Milvus Operations
sidebar_label: Learn Milvus Operations
---

# 了解 Milvus 操作

该页面将向您展示如何使用 [Python SDK](https://pypi.org/project/pymilvus) 运行 Milvus 基本操作。您也可以使用其它语言如 [Java](https://milvus-io.github.io/milvus-sdk-java/javadoc/index.html), C++ 等来进行这些操作。

## 运行操作前的准备

请使用 Milvus 自带的 Python 客户端 - pymilvus 运行下列操作。

1. 导入 pymilvus。

   ```python
   # Import pymilvus
   >>> from milvus import Milvus, IndexType, MetricType, Status
   ```

2. 请用下列任一方式，将 Milvus 连接到您本地服务器。

   ```python
   # Connect to Milvus server
   >>> milvus = Milvus()
   >>> milvus.connect(host='localhost', port='19530')
   Status(message='connected!', code=0)
   ```

   > 注意：在以上代码中，参数 `host` 和 `port` 用的都是默认值。请根据需要将其更换成 Milvus server 的 IP 地址和端口。

   ```python
   >>> milvus.connect(uri='tcp://localhost:19530')
   Status(message='connected!', code=0)
   ```


## 创建表

我们以创建表 test01 为例，向您展示如何创建一张数据表。以下是数据表相关参数，在创建表时可以根据实际需求选择：

| 参数              | 描述                                                         | 类型       | 参考值                                                  |
| ----------------- | ------------------------------------------------------------ | ---------- | ------------------------------------------------------- |
| `table_name`      | 要创建的表的名字，由于是表的唯一标识符，在数据库中必须唯一、不重复。<br/>表名由字母、下划线、和数字组成。首个字符必须是字母或下划线。总长度必须小于255个字符。 | String     | 'table name'                                            |
| `dimension`       | 要插入表中的向量的维度。                                     | Integer    | 大于 0 且小于等于 16384 (通常设置为 128, 256 或 512) |
| `index_file_size` | 触发索引创建的文件的最大阈值。                            | Integer    | 大于 0 且小于 4096 (MB)                                           |
| `metric_type`     | 计算向量距离的方式。你可以选择用欧氏距离（L2）或是内积（IP）的方法来计算。 | MetricType | `MetricType.L2` 或 `MetricType.IP`                       |

请使用 `milvus.create_table` 来创建表，后面跟表名、向量维度和索引方式：

1. 准备表参数。

   ```python
   # Prepare param
   >>> param = {'table_name':'test01', 'dimension':256, 'index_file_size':1024, 'metric_type':MetricType.L2}
   ```

2. 创建表 test01。

   ```python
   # Create a table
   >>> milvus.create_table(param)
   Status(message='Table test01 created!', code=0)
   ```

3. 确认新创建表的信息。

   ```python
   # Verify table info.
   >>> status, table = milvus.describe_table('test01')
   >>> status
   Status(message='Describe table successfully!')
   >>> table
   TableSchema(table_name='test01',dimension=256, index_file_size=1024, metric_type=<MetricType: L2>)
   ```

## 显示表

若要显示数据库中所有的表，请使用 `milvus.show_tables`：

```python
>>> status, tables = milvus.show_tables()
>>> status
Status(message='Show tables successfully!', code=0)
>>> tables
['test01', 'others', ...]
```

若要显示某张表的元数据：

```python
>>> status, table = milvus.describe_table('test01')
>>> status
Status(message='Describe table successfully!')
>>> table
TableSchema(table_name='test01',dimension=256, index_file_size=1024, metric_type=<MetricType: L2>)
```

若要显示表的行数， 使用 `milvus.get_table_row_count`，后面跟表名：

```python
# Show table rows
>>> status, num = milvus.get_table_row_count('test01')
>>> status
Status(code=0, message='Success')
>>> num
20
```

请用下列命令确认某张表是否存在：

```python
>>> milvus.has_table(table_name='test01')
True
```

> 注意：如果查询的表不存在，则以上代码中返回值为 `False`。

## 将向量插入表

> 注意：在实际生产环境中，在插入向量之前，建议先使用 `milvus.create_index` 以便系统自动增量创建索引。需要注意的是，在向量插入结束后，相同的索引需要手动再创建一次（因为可能存在大小不满足 `index_file_size` 的数据文件，系统不会为该文件自动创建索引）。

以下是向量插入的参数列表：

| 参数         | 描述                                                         | 类型                | 参考值                 |
| ------------ | ------------------------------------------------------------ | ------------------- | ---------------------- |
| `table_name` | 要创建的表的名字，由于是表的唯一标识符，在数据库中必须唯一、不重复。<br/>表名由字母，下划线 `_` 和数字（0-9）组成。首个字符必须是字母或下划线 `_`，不能为数字。总长度不可以超过255个字符。 | String              | 'table name'           |
| `records`    | 要插入表的一组向量。每条向量必须为**浮点**数据类型，其维度必须和表中定义的维度一致。 | 2-dimensional  list | [[0.1, 0.2, ...], ...] |

若要批量插入一组向量（在下面代码中以`records`表示），请使用 `milvus.add_vectors` ，后面跟表名和一组以逗号隔开的向量。如果没有可用的待插入向量，您也可以通过以下命令随机生成一组向量。此处假设需要自动生成20条256维的向量。

```python
>>> import random

# Generate 20 vectors of 256 dimension
>>> vectors = [[random.random() for _ in range(dim)] for _ in range(20)]
```

然后插入这组向量，成功后，将返回一组向量id。

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

您也可以为插入的向量提供用户自定义的向量 id：

```python
>>> vector_ids = [id for id in range(20)]
>>> status, ids = milvus.add_vectors(table_name='test01', records=vectors, ids=vector_ids)
>>> print(ids)
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
```

若要查询某张表中一共插入了几条向量（表的总行数），请使用 `milvus.get_table_row_count`，后面跟要查询的表名。

```python
# Show number of vectors
>>> status, num = milvus.get_table_row_count('test01')
>>> status
Status(code=0, message='Success')
>>> num
20
```

## 创建索引

以下是创建索引的参数列表：

| 参数         | 说明                                                         | 类型      | 参考值                                             |
| ------------ | ------------------------------------------------------------ | --------- | -------------------------------------------------- |
| `index_type` | 用于查询表的索引方式。请在下列类型中选择一种： <ul><li> `FLAT` - 提供100%的精确检索。但由于计算量巨大，搜索速度可能受影响；</li><li>`IVFLAT` - 基于 K-means 的检索方式，搜索精度和速度都不错；</li><li>`IVFSQ8` - 运用scalar quantization的向量索引，能大幅缩小向量体积（大概缩减到原来的1/4），从而能有效提高向量吞吐量。</li><li>`IVF_SQ8H` -  `IVF_SQ8` 的增强版。支持 CPU 和 GPU 的混合查询，能极大提高搜索性能。<br/>若要使用该索引方式，请确保已同时选择了 `cpu` 和 `gpu` 用于 Milvus 搜索。具体配置请参考 [Milvus 配置](../reference/milvus_config.md) 里的 `resource_config` 区域。</li></ul> | IndexType | `FLAT` / `IVFLAT` / `IVF_SQ8` / `IVF_SQ8H` |
| `nlist`      | 每个文件中的向量类的个数，默认值为 `16384`。                 | Integer   | 大于 1 且小于 16384                                          |


请使用 `milvus.create_index` 来创建索引，后面跟表名、索引方式和 nlist。

1. 准备索引参数。

   ```python
   # Prepare index param
   >>> index_param = {'index_type': IndexType.IVFLAT, 'nlist': 16384}
   ```

2. 创建索引。

   ```python
   # Create index
   >>> milvus.create_index('test01', index_param)
   >>> status
   Status(code=0, message='Build index successfully!')
   ```

请使用 `milvus.describe_index` 来显示索引信息，后面跟表名：

```python
# Show index info
>>> milvus.describe_index('test01')
>>> status
Status(code=0, message='Success'), IndexParam(table_name='test01', index_type=<IndexType: IVFLAT>, nlist=16384)
```

若要删除索引，请使用下列命令：

```python
>>> milvus.drop_index('test01')
>>> status
Status(code=0, message='Success')
```

## 查询向量

以下是查询向量的参数列表：

| 参数                      | 描述                                                         | 类型                                  | 参考值                              |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------- | ----------------------------------- |
| `table_name`              | 要创建的表的名字，由于是表的唯一标识符，在数据库中必须唯一、不重复。<br/>表名由字母，下划线 `_` 和数字（0-9）组成。首个字符必须是字母或下划线 `_`，不能为数字。总长度不可以超过255个字符。 | String                                | 'table name'                        |
| `query_records`           | 要搜索的一组目标向量。每条向量必须为**浮点**数据类型，其维度必须和表中定义的维度一致。 | 2-dimensional list                    | [[0.1, 0.2, ...], ...]              |
| `top_k`                   | 与要搜索的目标向量相似度最高的k个向量。                      | Integer                               | 0 < top_k <= 1000                   |
| `nprobe`                  | 查询所涉及的向量类的个数。`nprobe` 影响查询精度。数值越大，精度越高，但查询速度更慢。 | Integer                               | 大于 1 且小于 16384                           |
| `query_ranges` (optional) | 可选择设置的，以逗号隔开的一列值，定义搜索结果的过滤条件。 <br/>比如你可以搜索某一段日期内的向量。如果不设置，则用默认值 `None`（即'无范围'，表示全局搜索）。 | List (建议使用元组数据类型) | [('2019-01-01', '2019-01-02'), ...] |

> 注意：目前搜索范围仅支持日期范围，格式为'yyyy-mm-dd'，为左闭右闭模式。比如您将范围定为 [2019.1.1, 2019.1.5]，则搜索范围为 2019.1.1 到2019.1.5，并且包含2019.1.1和2019.1.5。

请使用 `milvus.search_vectors` 来搜索向量，后面跟要搜索的表的名字，要搜索的目标向量，以及您期望返回的与每个目标向量最相似的匹配向量个数。

假设您要针对3条256维的目标向量（在下面代码中用q_records表示），搜索与每条目标向量相似度最高的前2条匹配向量，您可以：

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

若要过滤搜索结果，请使用 `query_ranges` 定义过滤条件。

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

## 删除表

若您不再需要某张表，请使用 `milvus.delete_table` 将该表及其数据删除：

```python
# Drop table
>>> milvus.delete_table(table_name='test01')
>>> status
Status(message='Delete table successfully!', code=0)
```

## 接下来您可以

- [体验 Milvus 在线训练营](https://github.com/milvus-io/bootcamp) 了解更多解决方案
- [故障诊断 API 行为](troubleshoot.md)

