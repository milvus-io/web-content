---
id: create-table
title: Create table
sidebar_label: Create table
---

# Create table

> Note: All the following actions are executed in Python. For other languages, Milvus supports RESTful and RPC.

## Prerequisites
After you have completed the installation and basic configuration of Milvus, you can create a table and insert data into it. Before that, you need to connect to Milvus server：

1. Import pymilvus.

   ```python
   # Import pymilvus
   >>> from milvus import Milvus, Prepare, IndexType, Status

   ```
2. Connect to Milvus on your local server.

   ```
   # Connect to Milvus server
   >>> milvus = Milvus()
   >>> milvus.connect(host='0.0.0.0', port='19530')
   Status(message='connected!', code=0)

   ```
   > Note: In the above code, default values are used for *host* and *port* parameters. They shoud be the value of the *address* and *port* you set in *server_config* file in *Configuring Milvus*.

## Create a table
This section describes how to create a table in Milvus. Assume we would create a table named test01. Below is a list of table parameters. You should choose parameter values according to your requirements.

|  Parameter  |  Description  |  Type   |  Reference value   |
| ------------| --------------| --------| ---------|
| table_name  | Name of the table you want to create (Table name can only be '_', number and letter. The first character must be '_' or a letter, not a number. The entire length can not exceed 255 characters)| String | 'table name' |
| dimension   | Vector dimensions | Integer | 0 < dimension <= 16384 (Usually set to 128, 256 or 512)
| index_type  |2 types of indexing methods: 1. 'FLAT' - Precise vector indexing; 2. 'IVFLAT' - K-means based vector indexing. Search precision may be lower, but with faster speed.  |IndexType|FLAT / IVFLAT |


1. Prepare table parameters.

   ```
   # Prepare param
   >>> param = {'table_name':'test01', 'dimension':256, 'index_type':IndexType.FLAT}
   ```

   > Caution: Table name is the unique identifier of a table in Milvus. So make sure there are no duplicated names.

2. Create Table test01.

   ```
   # Create a table
   >>> milvus.create_table(param)
   Status(message='Table test01 created!', code=0)
   ```

3. Verify details of the newly created table.
   ```
   # Verify table info.
   >>> status, table = milvus.describe_table('test01')
   >>> status
   Status(message='Describe table successfully!')
   >>> table
   TableSchema(table_name='test01',dimension=256, index_type=1, store_raw_vector=False)

   ```                        
