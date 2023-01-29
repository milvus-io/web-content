---
id: bulk_insert.md
related_key: bulk load
summary: Learn how to insert multiple entities in a batch from a JSON file.
---

# Import Data

To add multiple entities in a batch with legacy versions of Milvus, you can use the **insert** API to add these entities one after another in a loop. However, it brings massive network transmission across the client, proxy, Pulsar, and data nodes. 

Milvus 2.2 offers the **bulk-insert** API to facilitate batch data insertion from files. With this new API, you can import a large amount of data into a collection with just one line of code.

## Prepare Data Files

To fully utilize the new API, you have to organize your data either in a row-based JSON file or a bunch of column-based NumPy files.

* **Row-based JSON file**

  To organize your data in a JSON file, you need to observe the following rules:

  - The file content is a single-member anonymous object with **root** as key and an array as value.
  - In the array, you have to organize each row of the data in an object with field names as keys and field values as values.

  ```JSON
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

  <div class="alert note">
    
    - Include all the required fields in the JSON file. However, do not include any fields that are not defined in the target collection.
    - Fill in each field with the data that corresponds to the required data types. Specifically, use an integer for an integer field, use a float number for a float field, use a string for a VarChar field, and a float array for a vector field.
    - Do not include the primary key in the JSON file if the primary key of the target collection is going to be generated automatically.
    - Use uint8 data in binary vector fields. For example, you can represent the 16-dimensional binary vector `[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1]` as `[128, 7]` with every 8-bit converted to an integer in the range from 0 to 255. 

  </div>

* **Column-based NumPy files**

  To organize your data into multiple NumPy files, you need to save the data within each column in a separate NumPy file.

  ```Python
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
  When creating NumPy files, observe the following rules:
  
  - Name the NumPy files using the corresponding field names.
  - Use the right data types. The following examples illustrate how to create NumPy files for the fields of various data types.

    - `DataType.BOOL`
        ```Python
        import numpy as np
        data = [True, False, True, False]
        dt = np.dtype('bool', (len(data)))
        arr = np.array(data, dtype=dt)
        np.save(file_path, arr)
        ```
    - `DataType.INT8`
      ```Python
      import numpy as np
      data = [1, 2, 3, 4]
      dt = np.dtype('int8', (len(data)))
      arr = np.array(data, dtype=dt)
      np.save(file_path, arr)
      ```
    - `DataType.INT16`
      ```Python
      import numpy as np
      data = [1, 2, 3, 4]
      dt = np.dtype('int16', (len(data)))
      arr = np.array(data, dtype=dt)
      np.save(file_path, arr)
      ```
    - `DataType.INT32`
      ```Python
      import numpy as np
      data = [1, 2, 3, 4]
      dt = np.dtype('int32', (len(data)))
      arr = np.array(data, dtype=dt)
      np.save(file_path, arr)
      ```
    - `DataType.INT64`
      ```Python
      import numpy as np
      data = [1, 2, 3, 4]
      dt = np.dtype('int64', (len(data)))
      arr = np.array(data, dtype=dt)
      np.save(file_path, arr)
      ```
    - `DataType.FLOAT`
      ```Python
      import numpy as np
      data = [0.1, 0.2, 0.3, 0.4]
      dt = np.dtype('float32', (len(data)))
      arr = np.array(data, dtype=dt)
      np.save(file_path, arr)
      ```
    - `DataType.DOUBLE`
      ```Python
      import numpy as np
      data = [0.1, 0.2, 0.3, 0.4]
      dt = np.dtype('float64', (len(data)))
      arr = np.array(data, dtype=dt)
      np.save(file_path, arr)
      ```
    - `DataType.VARCHAR`
      ```Python
      import numpy as np
      data = ["a", "b", "c", "d"]
      arr = np.array(data)
      np.save(file_path, arr)
      ```
    - `DataType.BINARY_VECTOR`
       
      You can organize binary vectors into uint8 arrays by converting each 8-dimension in the binary vector to an integer ranging from 0 to 255. For example, you can use a uint8 array of four members to represent a 32-dimensional binary vector.

      ```Python
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

    - `DataType.FLOAT_VECTOR`

      You can organize a vector field using either float32 or float64 numbers. 

      For example, the following snippet illustrates how to create a NumPy file for an 8-dimensional vector field using float32 numbers.

      ```Python
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

## Upload data files

You need to upload files stored in a MinIO instance or the local hard drive so that you can import the data from the files into a Milvus collection.

- To use a MioIO instance, upload the data files to the bucket specified in the `minio.bucketName` field of your Milvus configuration file. 
- To use your local hard drive, copy the data files into a desired local directory.

  <div class="alert note">

  Inserting data from the local hard drive only applies to Milvus Standalone.

  </div>

## Import data into Milvus

After you have prepared the data files and uploaded them to a desired location, use the bulk-insert API to import the data from the files to a target Milvus collection.

The bulk-insert API asks for the target collection name, target partition name, and the data file paths and immediately returns a bulk-insert task ID with the task running in the background. You can use the task ID to get the task's running status. 

  <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
  </div>

  ```python
  from pymilvus import utility

  # To import data from a row-based JSON file, or
  task_id = utility.do_bulk_insert(
        collection_name="book",
        partition_name="2022",
        files=["test.json"]
  )

  # To import data from a set of NumPy files
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

  // To import data from a row-based JSON file, or
  BulkInsertParam param = BulkInsertParam.newBuilder()
          .withCollectionName("book")
          .withPartitionName("2022")
          .addFile("test.json")
          .build()

  // To import data from a set of NumPy files
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

  <table class="language-python">
	<thead>
      <tr>
          <th>Parameter</th>
          <th>Description</th>
      </tr>
	</thead>
    <tbody>
      <tr>
          <td>collection_name</td>
          <td>Specifies the name of the target collection into which the data is to be imported.
      </tr>
      <tr>
          <td>partition_name</td>
          <td>Specifies the name of a partition in the specified collection. This parameter is optional. If not specified, data is going to be imported into the default partition.</td>
      </tr>
      <tr>
          <td>files</td>
          <td>Specifies a list of file paths. <ul><li>To import data from a row-based JSON file, only one file path is allowed in the file array.</li> <li>To import data from a set of column-based NumPy files, place all the file paths in the array.</li></td>
      </tr>
    </tbody>
  </table>

  <table class="language-java">
	<thead>
      <tr>
          <th>Builder Method</th>
          <th>Description</th>
      </tr>
	</thead> 
    <tbody>
      <tr>
        <td>withCollectionName</td>
        <td>Specifies the name of the target collection into which the data is to be imported.</td>
      </tr>
      <tr>
        <td>withPartitionName</td>
        <td>Specifies the name of a partition in the specified collection. This parameter is optional. If not specified, data is to be imported into the default partition.</td>
      </tr>
      <tr>
          <td>addFile</td>
          <td>Specifies the data file paths. <ul><li>To import data from a row-based JSON file, use only one <code>addFile</code> to wrap the file path.</li> <li>To import data from a set of column-based NumPy files, use an <code>addFile</code> for each NumPy file.</li></td>      
      </tr>
      <tr>
        <td>build</td>
        <td>Returns a <code>BulkInsertParam</code> object.</td>
      </tr>
    </tbody> 
  </table>

## Get the task status

Once you get a task ID, you can use the **get-bulk-insert-state** API to get the running status of the task.

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
          <td>task_id</td>
          <td>Specifies the ID of a bulk-insert task.</td>
      </tr>
    </tbody>
  </table>

  <table class="language-java">
	<thead>
      <tr>
          <th>Builder Method</th>
          <th>Description</th>
      </tr>
	</thead> 
    <tbody>
      <tr>
        <td>withTask</td>
        <td>Specifies the ID of a bulk-insert task.</td>
      </tr>
      <tr>
        <td>build</td>
        <td>Returns a <code>GetBulkInsertStateParam</code> object.</td>
      </tr>
    </tbody> 
  </table>

  The returned **BulkInsertState** object holds all the details of a running task. The state of a task can be one of the following:

  | State | Code | Description |
  | ----- | ---- | ----------- |
  | Pending | 0 | The task is in the pending list. |
  | Failed | 1 | The task failed. Use `task.failed_reason` to get the reason. |
  | Started | 2 | The task is dispatched to a data node and going to run. |
  | Persisted | 5 | New segments have been generated and persisted. |
  | Completed | 6 | If the collection already has an index, the task state changes to **Completed** only after new persisted segments are indexed. <br>Otherwise, the task state changes to this state immediately after all newly-generated segments are persisted. |
  | Failed and cleaned | 7 | The task failed, and all temporary data generated has been cleaned. | 

## List bulk-insert tasks

You can use the **list-bulk-insert-tasks** API to view the IDs of all running bulk-insert tasks.

This API asks for a collection name and the maximum number of returned tasks and returns a bunch of bulk-insert task IDs.

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

  <table class="language-python">
	<thead>
      <tr>
          <th>Parameter</th>
          <th>Description</th>
      </tr>
	</thead>
    <tbody>
      <tr>
          <td>collection_name</td>
          <td>Specifies the name of a collection name. This parameter is optional. If not specified, Milvus returns all bulk-insert tasks recorded on the RootCoord.</td>
      </tr>
      <tr>
          <td>limit</td>
          <td>Specifies the maximum number of task IDs to return. If the number of relevant running tasks is greater than the limit, Milvus returns only the IDs of the specified number of tasks.</td>
      </tr>
    </tbody>
  </table>

  <table class="language-java">
	<thead>
      <tr>
          <th>Builder Method</th>
          <th>Description</th>
      </tr>
	</thead> 
    <tbody>
      <tr>
        <td>withCollectionName</td>
        <td>Specifies the name of a collection name. This parameter is optional. If not specified, Milvus returns all bulk-insert tasks recorded on the RootCoord.</td>
      </tr>
      <tr>
        <td>build</td>
        <td>Returns a <code>GetBulkInsertStateParam</code> object.</td>
      </tr>
    </tbody> 
  </table>

## Milvus configurations related to bulk-insert operations

```YAML
rootCoord:
  # (in seconds) Duration after which an import task will expire (be killed). Default 900 seconds (15 minutes).
  # Note: If default value is to be changed, change also the default in: internal/util/paramtable/component_param.go
  importTaskExpiration: 900
  # (in seconds) Milvus will keep the record of import tasks for at least `importTaskRetention` seconds. Default 86400
  # seconds (24 hours).
  # Note: If default value is to be changed, change also the default in: internal/util/paramtable/component_param.go
  importTaskRetention: 86400
```

## Limits

| Item | Upper Limit |
| ---- | ----------- |
| Task pending list size | 65536 |
| Data file size | 16 GB |