Please provide the params of these tasks，using the table format below:

## 1. Creating database

create_table(param) 

`param` is a `dictionary`.
```python
param={"table_name": "some_table_name", "dimension": 256, "index_type": IndexType.FLAT, "store_raw_vector": False}
```

meaning of the keys:

|  Parameter  |  Description  |  Type   |  Value   |
| ------------| --------------| --------| ---------|
| table_name  | name of the table to create| string | 'some_table_name' |
| dimension | dimension of the vectors stored in the table| integer | 0 < dimension <= 10000, typically =128, 256 or 518 
| index_type |There are 3 types: `FLAT`,`IVFLAT` and `INVALID`. IndexType is default to `INVALID`, which means user should self-set other types rather than using default one. `FLAT` means vectors are processed in CPU and searching operation is flat. `IVFLAT` means vectors are processed in GPU and index will be built, and searching operation will be faster. But if there's no GPU and index_type is set to `IVFLAT`, an error will occur. |IndexType|IndexType.FLAT, IndexType.IVFLAT, IndexType.INVALIDE(default)|
|store_raw_vector(Optional)| Store original vectors or not.(Not effective now) | bool | False(default)

## 2. Importing data

add_vectors(table_name, records)

|Parameter|Description|Type|Value|
|---------|-----------|----|-----|
|table_name| Name of the table to importing vectors| string| 'some_table_name'|
|records| A list of vectors being added into the table, each vector's `dimension` should be identical to table's `dimension`. Each vector should be a list of float. |2-dimension list|[[0.1, 0.2, ...], ...]


## 3. Searching with Milvus

search_vectors(table_name, top_k, query_records, query_ranges)

|Parameter|Description|Type|Value|
|---------|-----------|----|-----|
|table_name|Name of the table to search vectors|string|'some_table_name'|
|top_k| How many similar vectors will be searched back| integer | 0 < top_k <= 10000|
|query_records| A list of vectors to search for similarity, each vector's `dimension` should be identical to table's `dimension`. Each vectors should be a list of float.| 2-dimension list | [[0.1, 0.2, ...], ...] |
|query_ranges(Optional)|A group of date ranges, default as `None`. if set, only vectors added between specified date ranges will be searched. If not set, will search the entire table. Date should be 'yyyy-mm-dd' format. [('2019-01-01', '2019-01-03')] will search vectors added between [2019.1.1, 2019.1.3),  |list[tuple]|[('2019-01-01', '2019-01-02'), ...]|

## 4. Deleting a database

delete_table(table_name)

|Parameter|Description|Type|Value|
|---------|-----------|----|-----|
|table_name| Name of the table to delete|string|'some_table_name'|
