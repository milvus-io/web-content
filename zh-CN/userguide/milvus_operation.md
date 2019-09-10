---
id: milvus_operation
title: Learn Milvus Operations
sidebar_label: Learn Milvus Operations
---

# 了解 Milvus 操作

该页面将向你展示如何使用 Python 接口运行 Milvus 基本操作。

## 运行操作前的准备

请使用 Milvus 自带的 Python 客户端 - pymilvus 运行下列操作。您也可以使用其它语言如C++，RESTful API等来进行这些操作。

1. 导入 pymilvus.

   ```python
   # Import pymilvus
   >>> from milvus import Milvus, Prepare, IndexType, Status
   ```

2. 将 Milvus 连接到您本地服务器。

   ```
   # Connect to Milvus server
   >>> milvus = Milvus()
   >>> milvus.connect(host='0.0.0.0', port='19530')
   Status(message='connected!', code=0)
   ```

   > 注意：在以上代码中，参数 *host* 和 *port* 用的都是默认值。请根据需要将其更换成 Milvus server 的IP地址和端口。

## 创建表

我们以创建表 test01为例，向您展示如何创建一张数据表。以下是数据表相关参数，在创建表时可以根据实际需求选择：

| 参数         | 描述                                                         | 类型      | 参考值                                                  |
| ------------ | ------------------------------------------------------------ | --------- | ------------------------------------------------------- |
| `table_name` | 要创建的表的名字，由于是表的唯一标识符，在数据库中必须唯一、不重复。<br/>表名由字母，下划线（_）和数字（0-9）组成。首个字符必须是字母或下划线（_），不能为数字。总长度不可以超过255个字符。 | String    | 'table name'                                            |
| `dimension`  | 要插入表中的向量的维度。                                     | Integer   | 0 < dimension <= 16384 (Usually set to 128, 256 or 512) |
| `index_type` | 用于查询表的索引方式。请在下列类型中选择一种： <br/>1. 'FLAT' - 提供100%的精确检索。但由于计算量巨大，搜索速度可能受影响；<br/>2. 'IVFLAT' - 基于 K-means 的检索方式，搜索精度和速度都不错；<br/>3. ‘IVFSQ' - 运用scalar quantization的向量索引，能大幅缩小向量体积（大概缩减到原来的1/4），从而能有效提高向量吞吐量。 | IndexType | FLAT / IVFLAT / IVFSQ                                   |

请使用 `milvus.create_table` 来创建表，后面跟表名、向量维度和索引方式：

1. 准备表参数。

   ```
   # Prepare param
   >>> param = {'table_name':'test01', 'dimension':256, 'index_type':IndexType.FLAT}
   ```

2. 创建表 test01。

   ```
   # Create a table
   >>> milvus.create_table(param)
   Status(message='Table test01 created!', code=0)
   ```

3. 确认新创建表的信息。

   ```
   # Verify table info.
   >>> status, table = milvus.describe_table('test01')
   >>> status
   Status(message='Describe table successfully!')
   >>> table
   TableSchema(table_name='test01',dimension=256, index_type=1, store_raw_vector=False)
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
TableSchema(table_name='test01',dimension=256, index_type=1, store_raw_vector=False)
```

请用下列命令确认某张表是否存在：

```python
>>> milvus.has_table(table_name='test01')
True
```

> 注意：如果查询的表不存在，则以上代码中返回值为False。

> 注意：若要了解更多Milvus操作，你可以参照[Milvus Python SDK](https://pypi.org/project/pymilvus)和[使用示例](https://github.com/milvus-io/pymilvus/blob/branch-0.3.0/examples/example.py)。

## 将向量插入表

以下是向量插入的参数列表：

| 参数         | 描述                                                         | 类型                | 参考值                 |
| ------------ | ------------------------------------------------------------ | ------------------- | ---------------------- |
| `table_name` | 要创建的表的名字，由于是表的唯一标识符，在数据库中必须唯一、不重复。<br/>表名由字母，下划线（_）和数字（0-9）组成。首个字符必须是字母或下划线（_），不能为数字。总长度不可以超过255个字符。 | String              | 'table name'           |
| `records`    | 要插入表的一组向量。每条向量必须为**浮点**数据类型，其维度必须和表中定义的维度一致。 | 2-dimensional  list | [[0.1, 0.2, ...], ...] |

若要批量插入一组向量（在下面代码中以`records`表示），请使用 `milvus.add_vectors` ，后面跟表名和一组以逗号隔开的向量。

成功后，将返回一组向量id。

```
# Insert vectors
>>> status, ids = milvus.add_vectors(table_name='test01', records=vectors)
>>> status
Status(code=0, message='Success')
>>> ids  # 20 ids returned
23455321135511233
12245748929023489
...
```

## 创建索引

请使用 `milvus.build_index` 来创建表索引：

```
# Build index
>>> milvus.build_index(table_name='test01')
Status(code='0', message='OK!')
```

## 查询向量

以下是查询向量的参数列表：

| 参数                      | 描述                                                         | 类型                                  | 参考值                              |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------- | ----------------------------------- |
| `table_name`              | 要创建的表的名字，由于是表的唯一标识符，在数据库中必须唯一、不重复。<br/>表名由字母，下划线（_）和数字（0-9）组成。首个字符必须是字母或下划线（_），不能为数字。总长度不可以超过255个字符。 | String                                | 'table name'                        |
| `top_k`                   | 与要搜索的目标向量相似度最高的k个向量。                      | Integer                               | 0 < top_k <= 1000                   |
| `query_records`           | 要搜索的一组目标向量。每条向量必须为**浮点**数据类型，其维度必须和表中定义的维度一致。 | 2-dimensional list                    | [[0.1, 0.2, ...], ...]              |
| `query_ranges` (optional) | 可选择设置的，以逗号隔开的一列值，定义搜索结果的过滤条件。 <br/>比如你可以搜索某一段日期内的向量。如果不设置，则用默认值 'None'（即'无范围'，表示全局搜索）。 | List (Suggest to use Tuple data type) | [('2019-01-01', '2019-01-02'), ...] |

> 注意：目前搜索范围仅支持日期范围，格式为'yyyy-mm-dd'，为左闭右闭模式。比如您将范围定为[2019.1.1, 2019.1.5]，则搜索范围为2019.1.1到2019.1.5，并且包含2019.1.1和2019.1.5。

请使用 `milvus.search_vectors` 来搜索向量，后面跟要搜索的表的名字，要搜索的目标向量，以及您期望返回的与每个目标向量最相似的匹配向量个数。

> 注意：一个目标向量是指要在数据库中搜索的向量。一个匹配向量代表搜索出的与目标向量相似的向量。

Suppose you want to search the top 5 most similar vectors of three 256-dimensional vectors (represented by "query_records" in below codes), you may:

假设您要针对3条256维的目标向量（在下面代码中用q_records表示），搜索与每条目标向量相似度最高的前5条匹配向量，您可以：

```
# Search 3 vectors
>>> status, results = milvus.search_vectors(table_name='test01', query_records=q_records, top_k=5)
>>> status
Status(message='Search vectors successfully!', code=0)
>>> results # Searched top_k vectors
[[QueryResult(id=1561709418638204004, score=62.554189514479866), ..., ],
[QueryResult(id=1561709418638204018, score=59.801433231755965), ..., ],
...
]
```

若要过滤搜索结果，请使用 `query_ranges` 定义过滤条件。

```
# Search 3 vectors
>>> status, results = milvus.search_vectors(table_name='test01', query_records=q_records, top_k=5, query_ranges=[('2019-01-01', '2019-01-05')] )
>>> status
Status(message='Search vectors successfully!', code=0)
>>> results # Searched top_k vectors
[[QueryResult(id=1561709418638204004, score=62.554189514479866), ..., ],
[QueryResult(id=1561709418638204018, score=59.801433231755965), ..., ],
...
]
```

## 删除表

若When you no longer need a table, use `milvus.delete_table` followed by the table name to remove the table and all its data:

若您不再需要某张表，请使用 `milvus.delete_table` 将该表及其数据删除：

```
# Drop table
>>> milvus.delete_table(table_name='test01')
Status(message='Delete table successfully!', code=0)
```

## 接下来您可以

- [体验 Milvus Boot Camp](https://github.com/milvus-io/bootcamp) 了解更多解决方案
