---
id: creating-table
title: Creating a table
sidebar_label: Creating a table
---

# 创建数据库

## 创建数据库
> 注意：以下操作都是在Python交互环境下进行的。对于其他类型的语言，Milvus支持通过RESTful和RPC的访问方法。

### 前提条件
如果你已经完成了Milvus的安装和所有相关设置，你就可以在Milvus上创建属于自己的数据库了。在用Python创建数据库之前，请确保你已经完成了以下操作：

1. 你已经导入了pymilvus。

   ```python
   # Import pymilvus
   >>> from milvus import Milvus, Prepare, IndexType, Status

   ```
2. 你已经将Milvus连接到了本地server。

   ```
   # Connect Milvus to server
   >>> milvus = Milvus()
   >>> milvus.connect(host='SERVER-HOST', port='SERVER-PORT')
   Status(message='connected!', code=0)

   ```
### 创建数据表格结构
我们以创建Table test01为例，向您展示如何创建一张数据表。以下是数据表格相关参数，在创建表格时可以根据实际需求选择：

|  参数  |  描述  |  类型   |  参考值   |
| ------------| --------------| --------| ---------|
| table_name  | 要创建的table名字（由数字、字母和下划线构成）| 字符串 | 'table名字' |
| dimension   | 表格中向量的维度 | 整数 | 0 < dimension <= 10000, 通常设置为128、256或518维 
| index_type  |有3种类型的检索类型: 1. `FLAT` - 精确向量索引类型；2. `INVALID` - 基于K-means的向量索引，精度有损失，但搜索速度更快；|IndexType|FLAT / IVFLAT / INVALID(default)|

> 注意：如果没有GPU，将index_type设置成`IVFLAT`，系统将报错。

1. 准备数据表的参数，比如：
  
   ```
   # Prepare param
   >>> param = {'table_name'='test01', 'dimension'=256, 'index_type'=IndexType.FLAT}
   ```
   
2. 创建表test01。

   ```
   # Create a table
   >>> milvus.create_table(param)
   Status(message='Table test01 created!', code=0)
   ```
   
3. 检查确认已创建表格的信息。
   ```
   # Confirm table info.
   >>> status, table = milvus.describe_table('test01')
   >>> status
   Status(message='Describe table successfully!')
   >>> table
   TableSchema(table_name='test01',dimension=256, index_type=1, store_raw_vector=False)
   
   ```                        
