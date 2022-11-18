---
id: import_data.md
related_key: bulk load
summary: Learn how to bulk load data in Milvus.
---

# Import Data

This topic describes how to import data in Milvus via bulk load.

Regular method to insert a large batch of entities to Milvus usually leads to a massive network transmission across client, proxy, Pulsar and data nodes. To avoid such situation, Milvus 2.1 supports loading data from files via bulk load. You can import large amounts of data into a collection by just a few lines of code, and endow atomicity to a whole batch of entities.

You can also migrate data to Milvus with [MilvusDM](migrate_overview.md), an open-source tool designed specifically for importing and exporting data with Milvus.

## Prepare data file

You can prepare the data file on row base or column base.

- Row-based data file

A row-based data file is a JSON file containing multiple rows. The root key must be "rows". The file name can be specified arbitrarily.

```json
{
  "rows":[
    {"book_id": 101, "word_count": 13, "book_intro": [1.1, 1.2]},
    {"book_id": 102, "word_count": 25, "book_intro": [2.1, 2.2]},
    {"book_id": 103, "word_count": 7, "book_intro": [3.1, 3.2]},
    {"book_id": 104, "word_count": 12, "book_intro": [4.1, 4.2]},
    {"book_id": 105, "word_count": 34, "book_intro": [5.1, 5.2]},
  ]
}
```

- Column-based data file

A column-based data file can be a JSON file containing multiple columns, several Numpy files, each contains a single column, or a JSON file contains multiple columns and some Numpy files.

   - JSON file containing multiple columns
    ```json
    {
            "book_id": [101, 102, 103, 104, 105],
            "word_count": [13, 25, 7, 12, 34],
            "book_intro": [
                    [1.1, 1.2],
                    [2.1, 2.2],
                    [3.1, 3.2],
                    [4.1, 4.2],
                    [5.1, 5.2]
            ]
    }
    ```

  - Numpy files

    ```python
    import numpy
    numpy.save('book_id.npy', numpy.array([101, 102, 103, 104, 105]))
    numpy.save('word_count.npy', numpy.array([13, 25, 7, 12, 34]))
    arr = numpy.array([[1.1, 1.2],
                [2.1, 2.2],
                [3.1, 3.2],
                [4.1, 4.2],
                [5.1, 5.2]])
    numpy.save('book_intro.npy', arr)
    ```

  - A JSON file contains multiple columns and some Numpy files.

    ```json
    {
            "book_id": [101, 102, 103, 104, 105],
            "word_count": [13, 25, 7, 12, 34]
    }
    ```

    ```python
    {
        "book_id": [101, 102, 103, 104, 105],
        "word_count": [13, 25, 7, 12, 34]
    }
    ```

## Upload data file

Upload data files to object storage.

You can upload data file to MinIO or local storage (available only in Milvus Standalone).

- Upload to MinIO

upload the data files to the bucket which is defined by [`minio.bucketName`](configure_minio.md#miniobucketName) in the configuration file `milvus.yml`.

- Upload to local storage

copy the data files into the directory which is defined by [`localStorage.path`](configure_localstorage.md#localStoragepath) in the configuration file `milvus.yml`.


## Insert data to Milvus

Import the data to the collection.

- For row-based files

```python
from pymilvus import utility
tasks = utility.bulk_load(
    collection_name="book",
    is_row_based=True,
    files=["row_based_1.json", "row_based_2.json"]
)
```

- For column-based files

```python
from pymilvus import utility
tasks = utility.bulk_load(
    collection_name="book",
    is_row_based=False,
    files=["columns.json", "book_intro.npy"]
)
```

<table class="language-python">
	<thead>
	<tr>
		<th>Parameter</th>
		<th>Description</th>
	</tr>
	</thead>
	<tbody>
    <tr>
		<td><code>collection_name</code></td>
		<td>Name of the collection to load data into.</td>
	</tr>
    <tr>
		<td><code>is_row_based</code></td>
		<td>Boolean value to indicate if the file is row-based.</td>
	</tr>
    <tr>
		<td><code>files</code></td>
		<td>List of file names to load into Milvus.</td>
	</tr>
	<tr>
		<td><code>partition_name</code> (optional)</td>
		<td>Name of the partition to insert data into.</td>
	</tr>
	</tbody>
</table>

## Check the import task state

Check the state of the import task.

```python
state = utility.get_bulk_load_state(tasks[0])
print(state.state_name())
print(state.ids())
print(state.infos())
```
The state codes and their corresponding descriptions.

| State code | State                   | Description                                                    |
| ---------- | ----------------------- | -------------------------------------------------------------- |
| 0          | BulkLoadPending         | Task is in pending list                                        |
| 1          | BulkLoadFailed          | Task failed, get the failed reason with `state.infos["failed_reason"]` |
| 2          | BulkLoadStarted         | Task is dispatched to data node, gonna to be executed          |
| 3          | BulkLoadDownloaded      | Data file has been downloaded from MinIO to local              |
| 4          | BulkLoadParsed          | Data file has been validated  and parsed                       |
| 5          | BulkLoadPersisted       | New segments have been generated and persisted                 |
| 6          | BulkLoadCompleted       | Task completed                                                 |


## Limits

|Feature|Maximum limit|
|---|---|
|Max size of task pending list|32|
|Max size of a data file|4GB|

## What's next

- Learn more basic operations of Milvus:
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
- Explore API references for Milvus SDKs:
  - [PyMilvus API reference](/api-reference/pymilvus/v2.2.0/tutorial.html)
  - [Node.js API reference](/api-reference/node/v2.2.0/tutorial.html)

