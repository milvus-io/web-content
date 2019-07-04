---
id: searching-with-milvus
title: Searching with Milvus
sidebar_label: Searching with Milvus
---

# Searching with Milvus

Now, you have inserted vectors into Table test01, you can start searching with Milvus. In addition, you are allowed not only to search multiple data sets, and also to search within a specific range. Before the search, familiarize yourself with these parameters:

|Parameter|Description|Type|Reference value|
|---------|-----------|----|-----|
|table_name|Name of the table you want to create (table name is made of numbers, letters and _)|String|'table name'|
|top_k| Top k most similar results of target vector| Integer | 0 < top_k <= 10000|
|query_records| A list of vectors to insert into the table. Vector value should be a float (decimal), with the same dimension as that of the table |2-dimension type | [[0.1, 0.2, ...], ...] |
|query_ranges (optional)| Search range, for example you can search within a specific date range. The default value is 'None' (no range), meaning to search the entire database|list[tuple]|[('2019-01-01', '2019-01-02'), ...]|

> Note: Currently, only date range is supported in query_ranges. The date format is 'yyyy-mm-dd'. The date range [2019.1.1, 2019.1.3) contains 2019.1.1 and 2019.1.3.

Suppose you want to search the top 10 most similar vectors of 5 256-dimensional vectors (represented by "query_records" in below codes), you may: 

   ```
   # Search 5 vectors
   >>> status, results = milvus.search_vectors(table_name='test01', query_records=q_records, top_k=10)
   >>> status
   Status(message='Search vectors successfully!', code=0)
   >>> results # Searched top_k vectors
   [[QueryResult(id=1561709418638204004, score=62.554189514479866), ..., ],
   [QueryResult(id=1561709418638204018, score=59.801433231755965), ..., ],
   ...
   ]
   ```
 
