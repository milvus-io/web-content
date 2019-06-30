---
id: importing-vectors
title: Importing Vectors
sidebar_label: Importing Vectors
---

# Importing Vectors

## Inporting vectors
When you have successfully tables in Milvus, you can start inserting data into the table. Of course, one prerequisite of this step is that you already have proper multi-dimensional vectors. Before importing vectors to the table, get familiar with the related parameters:

|Parameter|Description|Type|Reference value|
|---------|-----------|----|-----|
|table_name| Name of the table you want to create (table name is made of numbers, letters and _)| String| 'table name'|
|records| A list of vectors to insert into the table. Vector value should be a float (decimal), with the same dimension as that of the table |2-dimension type|[[0.1, 0.2, ...], ...]

Following the above mentioned example, below content demonstrates how to insert 20 256-dimensional vectors(represented by "records" in the code) into Table test01:

```
# Import vectors
>>> status, ids = milvus.add_vectors(table_name='test01', records=vectors)
>>> status
Status(code=0, message='Success')
>>> ids  # 20 ids returned
23455321135511233
12245748929023489
...
```
