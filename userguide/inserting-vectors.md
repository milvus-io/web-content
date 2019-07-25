---
id: inserting-vectors
title: Inserting vectors
sidebar_label: Inserting vectors
---

# Inserting vectors

After you have successfully created tables in Milvus, you can insert data into the table. Below is the list of necessary parameters for inserting vectors:

|Parameter|Description|Type|Reference value|
|---------|-----------|----|-----|
|table_name| Name of the table you want to create (table name is made of numbers, letters and _)| String| 'table name'|
|records| A list of vectors to insert into the table. Vector value should be a float (decimal), with the same dimension as that of the table |2-dimension list|[[0.1, 0.2, ...], ...]

Following the previous example, below content demonstrates how to insert 20 256-dimensional vectors (represented by "records" in the code) into Table test01:

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
