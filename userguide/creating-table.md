---
id: creating-table
title: Creating a table
sidebar_label: Creating a table
---

# Creating a table

> Note：All the following actions are executed in Python. For other languages, Milvus supports RESTful and RPC.

## Prerequisites
When you have finished the installation and basic configuration of Milvus, you may go on and create a table to insert data into. Before that, ensure you have：

1. Imported pymilvus.

   ```python
   # Import pymilvus
   >>> from milvus import Milvus, Prepare, IndexType, Status

   ```
2. Connected Milvus to your local server.

   ```
   # Connect Milvus to server
   >>> milvus = Milvus()
   >>> milvus.connect(host='SERVER-HOST', port='SERVER-PORT')
   Status(message='connected!', code=0)

   ```
## Creating a table
This section shows you how to create a table in Milvus. To make it easier to understand, all task procedures are based on an example of  Table test01 creation. Here are all related parameters. You can set parameter values to your needs.

|  Parameter  |  Description  |  Type   |  Reference value   |
| ------------| --------------| --------| ---------|
| table_name  | Name of the table you want to create (table name is made of numbers, letters and _)| String | 'table name' |
| dimension   | Vector dimensions | Integer | 0 < dimension <= 10000, usually set to 128, 256 or 518
| index_type  |2 types of indexing methods: 1. 'FLAT' - Precise vector indexing; 2. 'IVFLAT' - K-means based vector indexing. Search precision may be lower, but with faster speed；|IndexType|FLAT / IVFLAT|

> Note: You cannot set index_type to 'IVFLAT' when there is no GPU.

1. Prepare table parameters.
  
   ```
   # Prepare param
   >>> param = {'table_name'='test01', 'dimension'=256, 'index_type'=IndexType.FLAT}
   ```
   
2. Create Table test01.

   ```
   # Create a table
   >>> milvus.create_table(param)
   Status(message='Table test01 created!', code=0)
   ```
   
3. Confirm the information of the table just created.
   ```
   # Confirm table info.
   >>> status, table = milvus.describe_table('test01')
   >>> status
   Status(message='Describe table successfully!')
   >>> table
   TableSchema(table_name='test01',dimension=256, index_type=1, store_raw_vector=False)
   
   ```                        

