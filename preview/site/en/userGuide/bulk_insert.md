---
id: bulk_insert.md
related_key: bulk load
summary: Learn how to insert multiple entities in a batch from a JSON file.
---

# Insert Entities from Files

Milvus 2.2 now supports inserting a batch of entities from a file. Compared to the `insert()` method, this feature reduces network transmission across the Milvus client, proxy, Pulsar, and data nodes. You can now import a batch of entities in one file or multiple files into a collection with just a few lines of code.

## Prepare the data file

Organize the data to be inserted into a Milvus collection in a row-based JSON file or multiple NumPy files. 

### Row-based JSON file

You can name the file whatever makes sense, but the root key must be **root**. In the file, each entity corresponds to a dictionary. The key of the dictionary is the primary field, and the value of the dictionary contains the rest fields. The entities in the file must match the collection schema.

For binary vectors, use uint8 array. Each uint8 value represents 8 dimensions, and the value must be between [0, 255]. For example, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1] is a 16-dimensional binary vector and should be written as [128, 7] in a JSON file.

<div class="alert note">
The file size should be no greater than 1 GB.
</div>

The following is an example of a row-based JSON file.

```
{
  "rows":[
    {"book_id": 101, "word_count": 13, "book_intro": [1.1, 1.2]},
    {"book_id": 102, "word_count": 25, "book_intro": [2.1, 2.2]},
    {"book_id": 103, "word_count": 7, "book_intro": [3.1, 3.2]},
    {"book_id": 104, "word_count": 12, "book_intro": [4.1, 4.2]},
    {"book_id": 105, "word_count": 34, "book_intro": [5.1, 5.2]}
  ]
}
```

### Column-based NumPy files

As an alternative to the row-based JSON file mentioned above, you can also use NumPy arrays to organize each column of a dataset in a separate file. In this case, use the field name of each column to name the NumPy file.

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

<div class="alert note">

- Use the field name of each column to name the NumPy file. Do not add files named after a non-existing field. There should be one NumPy file for each field.
- Use the correct value type when creating NumPy arrays. For details, refer to [these examples](#Create-NumPy-files).

</div>

## Insert entities from files

### 1. Upload data files

You can use either MinIO or local hard disk for storage in Milvus.

<div class="alert note">
Using local hard disk for storage is only available in Milvus Standalone.
</div>

- To use MinIO for storage, upload data files to the bucket defined by `minio.bucketName` in the `milvus.yml` configuration file .

- For local storage, copy the data files into a directory of local disk.


### 2. Insert entities

To facilitate data import from files, Milvus offers a bulk-insert API in various flavors. In PyMilvus, you can use the [`do_bulk_insert()`](https://milvus.io/api-reference/pymilvus/v2.2.2/Utility/do_bulk_insert().md) method. As to the Java SDK, you can use the [`bulkInsert`](https://milvus.io/api-reference/java/v2.2.3/BulkInsert/bulkInsert().md) method.

In this method, you need to set the name of the target collection (**collection_name**) and the list of files [prepared in the previous step](#Prepare-the-data-file) (**files**). Optionally, you can specify the name of a specific partition (**partition_name**) in the target collection so that Milvus imports the data from the files listed only into this partition.

- For a row-based JSON file, parameter **files** should be a one-member list containing the path to the JSON file.

  <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
  </div>

  ```python
  from pymilvus import utility
  task_id = utility.do_bulk_insert(
      collection_name="book",
      partition_name="2022",
      files=["test.json"]
  )
  ```

  ```java
  import io.milvus.param.bulkinsert.BulkInsertParam;
  import io.milvus.response.BulkInsertResponseWrapper;
  import io.milvus.grpc.ImportResponse;
  import io.milvus.param.R;

  BulkInsertParam param = BulkInsertParam.newBuilder()
          .withCollectionName("book")
          .withPartitionName("2022")
          .addFile("test.json")
          .build()
  R<ImportResponse> response = milvusClient.bulkInsert(param);
  BulkInsertResponseWrapper wrapper = new BulkInsertResponseWrapper(response.getData());
  task_id = wrapper.getTaskID();
  ```

- For a set of column-based NumPy file, parameter **files** should be a multi-member list containing the paths to the NumPy files.

  <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
  </div>

  ```python
  from pymilvus import utility
  task_id = utility.do_bulk_insert(
      collection_name="book",
      partition_name="2022",
      files=["book_id.npy", "word_count.npy", "book_intro.npy"]
  )
  ```

  ```java
  import io.milvus.param.bulkinsert.BulkInsertParam;
  import io.milvus.response.BulkInsertResponseWrapper;
  import io.milvus.grpc.ImportResponse;
  import io.milvus.param.R;

  BulkInsertParam param = BulkInsertParam.newBuilder()
          .withCollectionName("book")
          .withPartitionName("2022")
          .addFile("book_id.npy")
          .addFile("word_count.npy")
          .addFile("book_intro.npy")
          .build()
  R<ImportResponse> response = milvusClient.bulkInsert(param);
  BulkInsertResponseWrapper wrapper = new BulkInsertResponseWrapper(response.getData());
  task_id = wrapper.getTaskID();
  ```

  Each call to the bulk-insert API returns immediately. The return value is the ID of a data-import task running in the background. Milvus maintains a queue of such tasks to be dispatched in parallel to idle data nodes.

  <div class="alert note">

  When setting the file paths, note that

  - If you upload the data file to a MinIO instance, a valid file path should be relative to the root bucket defined in **"milvus.yml"**, such as **"data/book_id.npy"**.
  - If you upload the data file to a local hard drive, a valid file path should be an absolute path such as **"/tmp/data/book_id.npy"**.
  
  If you have a lot of files to process, consider [creating multiple data-import tasks and have them run in parallel](#Import-multiple-NumPy-files-in-parallel).

  </div>



## List tasks

### Check task state

Since the bulk-insert API is asynchronous, you need to check whether a data-import task is complete. Milvus provides a **BulkInsertState** object to hold the details of a data-import task and you can use the get-bulk-insert-state API to retrieve this object using the programming language of your choice. 

In the flavor of PyMilvus, you can use [`get_bulk_insert_state()`](https://milvus.io/api-reference/pymilvus/v2.2.2/Utility/get_bulk_insert_state().md). For Java SDK, use [`getBulkInsertState()`](https://milvus.io/api-reference/java/v2.2.3/BulkInsert/getBulkInsertState().md).

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
</div>

```python
task = utility.get_bulk_insert_state(task_id=task_id)
print("Task state:", task.state_name()) 
print("Imported files:", task.files) 
print("Collection name:", task.collection_name) 
print("Partition name:", task.partition_name)
print("Start time:", task.create_time_str)
print("Imported row count:", task.row_count)
print("Entities ID array generated by this task:", task.ids())

if task.state == BulkInsertState.ImportFailed:
    print("Failed reason:", task.failed_reason)
```

```java
import io.milvus.param.bulkinsert.GetBulkInsertStateParam;
import io.milvus.response.GetBulkInsertStateWrapper;
import io.milvus.grpc.GetImportStateResponse;
import io.milvus.grpc.ImportState;
import io.milvus.param.R;

GetBulkInsertStateParam param = GetBulkInsertStateParam.newBuilder()
        .withTask(task_id)
        .build()
R<GetImportStateResponse> response = milvusClient.getBulkInsertState(param);
GetBulkInsertStateWrapper wrapper = new GetBulkInsertStateWrapper(response.getData());
ImportState state = wrapper.getState();
long row_count = wrapper.getImportedCount();
String create_ts = wrapper.getCreateTimeStr();
String failed_reason = wrapper.getFailedReason();
String files = wrapper.getFiles();
int progress = wrapper.getProgress();
```

The following table lists the state of a data-import task returned.

| State              |   Code   |   Description                                                |
| ------------------ | -------- | ------------------------------------------------------------ |
| Pending            | 0        | The task is pending.                                         |
| Failed             | 1        | The task fails. Use <code>task.failed_reason</code> to understand why the task fails. |
| Started            | 2        | The task has been dispatched to a data node and will be executed soon. |
| Persisted          | 5        | New data segments have been generated and persisted.               |
| Completed          | 6        | The metadata has been updated for the new segments. |
| Failed and cleaned | 7        | The task fails and all temporary data generated by this task are cleared. |


### List all tasks

Milvus also offers a list-bulk-insert-tasks API for you to list all data-import tasks. In this method, you need to specify a collection name so that Milvus lists all tasks that import data into this collection. Optionally, you can specify a limit for the maximum number of tasks to return.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
</div>

```python
tasks = utility.list_bulk_insert_tasks(collection_name="book", limit=10)
for task in tasks:
    print(task)
```

```java
import io.milvus.param.bulkinsert.ListBulkInsertTasksParam;
import io.milvus.grpc. ListImportTasksResponse;
import io.milvus.grpc.GetImportStateResponse;
import io.milvus.grpc.ImportState;
import io.milvus.param.R;

ListBulkInsertTasksParam param = ListBulkInsertTasksParam.newBuilder()
    .withCollectionName("book")
    .build()
R<ListImportTasksResponse> response = milvusClient.listBulkInsertTasks(param);
List<GetImportStateResponse> tasks = response.getTasksList();
for (GetImportStateResponse task : tasks) {
    GetBulkInsertStateWrapper wrapper = new GetBulkInsertStateWrapper(task);
    ImportState state = wrapper.getState();
    long row_count = wrapper.getImportedCount();
    String create_ts = wrapper.getCreateTimeStr();
    String failed_reason = wrapper.getFailedReason();
    String files = wrapper.getFiles();
}
```

|   Parameter                |   Description                                                |
| -------------------------- | ------------------------------------------------------------ |
| collection_name (optional) | Specify the target collection name to list all tasks on this collection. Leave the value empty if you want to list all tasks recorded by Milvus root coords. |
| limit (optional)           | Specify this parameter to limit the number of returned tasks. |


See [System Configurations](configure_rootcoord.md) for more information about import task configurations.

## Limits

| Feature                       | Maximum limit |
| ----------------------------- | ------------- |
| Max size of task pending list | 32            |
| Max size of a data file       | 1GB           |


## Reference

### Configure Milvus for data import

To have Milvus remove failed or old data-import tasks automatically, you can specify a timeout duration and retention period for data-import tasks in the Milvus configuration file. 

```yaml
rootCoord:
  # (in seconds) Duration after which an import task will expire (be killed). Default 900 seconds (15 minutes).
  # Note: If default value is to be changed, change also the default in: internal/util/paramtable/component_param.go
  importTaskExpiration: 900
  # (in seconds) Milvus will keep the record of import tasks for at least `importTaskRetention` seconds. Default 86400
  # seconds (24 hours).
  # Note: If default value is to be changed, change also the default in: internal/util/paramtable/component_param.go
  importTaskRetention: 86400
```

### Create NumPy files

The following examples demonstrate how to create NumPy files for columns of data types that Milvus supports.

- Create a Numpy file from a boolean array

  ```python
  import numpy as np
  data = [True, False, True, False]
  dt = np.dtype('bool', (len(data)))
  arr = np.array(data, dtype=dt)
  np.save(file_path, arr)
  ```

- Create a NumPy file from an int8 array

  ```python
  import numpy as np
  data = [1, 2, 3, 4]
  dt = np.dtype('int8', (len(data)))
  arr = np.array(data, dtype=dt)
  np.save(file_path, arr)
  ```

- Create a NumPy file from an int16 array

  ```python
  import numpy as np
  data = [1, 2, 3, 4]
  dt = np.dtype('int16', (len(data)))
  arr = np.array(data, dtype=dt)
  np.save(file_path, arr)
  ```

- Create a NumPy file from an int32 array

  ```python
  import numpy as np
  data = [1, 2, 3, 4]
  dt = np.dtype('int32', (len(data)))
  arr = np.array(data, dtype=dt)
  np.save(file_path, arr)
  ```

- Create a NumPy file from an int64 array

  ```python
  import numpy as np
  data = [1, 2, 3, 4]
  dt = np.dtype('int64', (len(data)))
  arr = np.array(data, dtype=dt)
  np.save(file_path, arr)
  ```

- Create a NumPy file from a float array

  ```python
  import numpy as np
  data = [0.1, 0.2, 0.3, 0.4]
  dt = np.dtype('float32', (len(data)))
  arr = np.array(data, dtype=dt)
  np.save(file_path, arr)
  ```

- Create a NumPy file from a double float array

  ```python
  import numpy as np
  data = [0.1, 0.2, 0.3, 0.4]
  dt = np.dtype('float64', (len(data)))
  arr = np.array(data, dtype=dt)
  np.save(file_path, arr)
  ```

- Create a NumPy file from a VARCHAR array

  ```python
  data = ["a", "b", "c", "d"]
  arr = np.array(data)
  np.save(file_path, arr)
  ```

- Create a NumPy file from a binary vector array

  For binary vectors, use **uint8** as the NumPy data type. Each uint8 value represents 8 dimensions. For a 32-dimensional binary vector, use four uint8 values.

  ```python
  data = [
      [43, 35, 124, 90],
      [65, 212, 12, 57],
      [6, 126, 232, 78],
      [87, 189, 38, 22],
  ]
  dt = np.dtype('uint8', (len(data), 4))
  arr = np.array(data)
  np.save(file_path, arr)
  ```

- Create a NumPy file from a float vector array

  In Milvus, you can use either float32 or float64 values to form a float vector.

  The following snippet creates a NumPy file from an 8-dimensional vector array formed using float32 values.

  ```python
  data = [
      [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8],
      [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8],
      [3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8],
      [4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8],
  ]
  dt = np.dtype('float32', (len(data), 8))
  arr = np.array(data)
  np.save(file_path, arr)
  ```

### Import multiple NumPy files in parallel

You can upload NumPy files into different subdirectories, create multiple import tasks, and execute them in parallel.

Assume the data structure is as follows:

<pre>
├── task_1
│    └── book_id.npy
│    └── word_count.npy
│    └── book_intro.npy
├── task_2
│    └── book_id.npy
│    └── word_count.npy
│    └── book_intro.npy
</pre>

You can create multiple data-import tasks as follows

```python
task_1 = utility.do_bulk_insert(
    collection_name="book",
    files=["task_1/book_id.npy", "task_1/word_count.npy", "task_1/book_intro.npy"]
)
task_2 = utility.do_bulk_insert(
    collection_name="book",
    files=["task_2/book_id.npy", "task_2/word_count.npy", "task_2/book_intro.npy"]
)
```


### Check data searchability

After a data-import task is complete, Milvus persists the imported data into segments and sends these segments to the index nodes to be indexed. During the index-building process, these segments are not ready for searches. Once such a process is complete, you need to call the load API again to load these segments into the query nodes. These segments will then be ready for searches.

1. Check the index-building progress

  PyMilvus provides a utility method to wait for the index-building process to complete.

  ```python
  utility.wait_for_index_building_complete(collection_name)
  ```

  In other SDKs, you can use the describe-index API to check the index-building progress.

  ```java
  while (true) {
      R<DescribeIndexResponse> response = milvusClient.describeIndex(
          DescribeIndexParam.newBuilder()
              .withCollectionName(collection_name)
              .withIndexName(index_name)
              .build());
      IndexDescription desc = response.getData().getIndexDescriptions(0);
      if (desc.getIndexedRows() == desc.getTotalRows()) {
          break;
      }
  }
  ```

2. Load new segments into query nodes

Newly indexed segments need to be loaded manually as follows:

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
</div>

```python
collection.load(_refresh = True)
```

```java
R<RpcStatus> response = milvusClient.loadCollection(
    LoadCollectionParam.newBuilder()
        .withCollectionName(collection_name)
        .withRefresh(Boolean.TRUE)
        .build());
```

<div class="language-python">
  <div class="alert note">

  The `_refresh` parameter is `false` by default. Do not set it to `true` when you load a collection for the first time.

  </div>
</div>

<div class="language-java">
  <div class="alert note">

  The `withRefresh()` method is optional. Do not call it with a `Boolean.TRUE` when you load a collection for the first time.

  </div>
</div>



## What's next

Learn more basic operations of Milvus:
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
