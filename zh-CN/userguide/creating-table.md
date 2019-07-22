---
id: creating-table
title: Creating a table
sidebar_label: Creating a table
---

# 创建表

> 注意：以下操作都是在Python交互环境下进行的。对于其他类型的语言，Milvus支持通过RESTful和RPC的访问方法。

## 前提条件
如果你已经完成了Milvus的安装和所有相关设置，你就可以在Milvus上创建数据表了。在用Python创建表之前，请确保以下操作已完成：

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
   > 提示：在上述示例代码中，*host*和*port*用的都是默认值。它们应该与您在*设置Milvus*章节中*server_config*文件中的*address*和*port*一致。
   
## 创建表
我们以创建Table test01为例，向您展示如何创建一张数据表。以下是数据表相关参数，在创建表时可以根据实际需求选择：

|  参数  |  描述  |  类型   |  参考值   |
| ------------| --------------| --------| ---------|
| table_name  | 要创建的表名（只能是‘_’，数字和字母组成。首个字符必须是‘_’或者字母，不可以是数字。长度不可以超过255字符）| 字符串 | '表名' |
| dimension   | 表格中向量的维度 | 整数 | 0 < dimension <= 16384, 通常设置为128、256或512维 
| index_type  |目前支持2种索引类型: 1. 'FLAT' - 精确向量索引类型；2. 'IVFLAT' - 基于K-means的向量索引。|IndexType|FLAT / IVFLAT |

1. 准备数据表的参数，比如：
  
   ```
   # Prepare param
   >>> param = {'table_name':'test01', 'dimension':256, 'index_type':IndexType.FLAT}
   ```
   
   > 注意：表名是Milvus里面表的唯一标识符，请确保没有重复的表名存在。
   
2. 创建表test01。

   ```
   # Create a table
   >>> milvus.create_table(param)
   Status(message='Table test01 created!', code=0)
   ```
   
3. 检查确认已创建表的信息。
   ```
   # Verify table info.
   >>> status, table = milvus.describe_table('test01')
   >>> status
   Status(message='Describe table successfully!')
   >>> table
   TableSchema(table_name='test01',dimension=256, index_type=1, store_raw_vector=False)
   
   ```                        
