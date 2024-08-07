# getBulkInsertState()

A MilvusClient interface. This method gets the state of a bulkinsert task.

```java
R<GetImportStateResponse> getBulkInsertState(GetBulkInsertStateParam requestParam);
```

#### GetBulkInsertStateParam

Use the `GetBulkInsertStateParam.Builder` to construct a `GetBulkInsertStateParam` object.

```java
import io.milvus.param.GetBulkInsertStateParam;
GetBulkInsertStateParam.Builder builder = GetBulkInsertStateParam.newBuilder();
```

Methods of `GetBulkInsertStateParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withTask(Long task)</p></td>
        <td><p>Set the bulk insert task id returned by bulkInsert() to query.</p></td>
        <td><p>task: A task id.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a GetBulkInsertStateParam object</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `GetBulkInsertStateParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<GetImportStateResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `GetImportStateResponse` held by the `R` template which you can use the task state.

#### GetBulkInsertStateWrapper

A tool class to encapsulate the GetImportStateResponse. 

```java
import io.milvus.response.GetBulkInsertStateWrapper;
GetBulkInsertStateWrapper wrapper = new GetBulkInsertStateWrapper(response);
```

Methods of `GetBulkInsertStateWrapper`:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Parameters</strong></p></th>
     <th><p><strong>Returns</strong></p></th>
   </tr>
   <tr>
     <td><p>getTaskID()</p></td>
     <td><p>Gets ID of the bulk import task.</p></td>
     <td><p>N/A</p></td>
     <td><p>long</p></td>
   </tr>
   <tr>
     <td><p>getAutoGeneratedIDs()</p></td>
     <td><p>Gets the long ID array for auto-id primary key, generated by bulk insert task.</p></td>
     <td><p>N/A</p></td>
     <td><p>List&lt;Long></p></td>
   </tr>
   <tr>
     <td><p>getState()</p></td>
     <td><p>Gets the state of the bulk insert task.</p></td>
     <td><p>N/A</p></td>
     <td><p>ImportState</p></td>
   </tr>
   <tr>
     <td><p>getImportedCount()</p></td>
     <td><p>Gets how many rows were imported by the bulk insert task.</p></td>
     <td><p>N/A</p></td>
     <td><p>long</p></td>
   </tr>
   <tr>
     <td><p>getCreateTimestamp()</p></td>
     <td><p>Gets the integer timestamp when this task is created.</p></td>
     <td><p>N/A</p></td>
     <td><p>long</p></td>
   </tr>
   <tr>
     <td><p>getCreateTimeStr()</p></td>
     <td><p>Gets the timestamp in string format when this task is created.</p></td>
     <td><p>N/A</p></td>
     <td><p>String</p></td>
   </tr>
   <tr>
     <td><p>getFailedReason()</p></td>
     <td><p>Gets fail reason of the bulk insert task if it failed.</p></td>
     <td><p>N/A</p></td>
     <td><p>String</p></td>
   </tr>
   <tr>
     <td><p>getFiles()</p></td>
     <td><p>Gets target files of the bulk insert task.</p></td>
     <td><p>N/A</p></td>
     <td><p>String</p></td>
   </tr>
   <tr>
     <td><p>getCollectionName()</p></td>
     <td><p>Gets target collection name of the bulk insert task.</p></td>
     <td><p>N/A</p></td>
     <td><p>String</p></td>
   </tr>
   <tr>
     <td><p>getPartitionName()</p></td>
     <td><p>Gets the target partition name of the bulk insert task.</p></td>
     <td><p>N/A</p></td>
     <td><p>String</p></td>
   </tr>
   <tr>
     <td><p>getProgress()</p></td>
     <td><p>Gets working progress percent value for a bulk insert task</p></td>
     <td><p>N/A</p></td>
     <td><p>int</p></td>
   </tr>
</table>

#### ImportState

```java
package io.milvus.grpc;
public enum ImportState
```

<table>
   <tr>
     <th><p><strong>State</strong></p></th>
     <th><p><strong>Code</strong></p></th>
     <th><p><strong>Description</strong></p></th>
   </tr>
   <tr>
     <td><p>Pending</p></td>
     <td><p>0</p></td>
     <td><p>The task is in the pending list</p></td>
   </tr>
   <tr>
     <td><p>Failed</p></td>
     <td><p>1</p></td>
     <td><p>Task failed, use <code>getFailedReason()</code> to get the failed reason</p></td>
   </tr>
   <tr>
     <td><p>Started</p></td>
     <td><p>2</p></td>
     <td><p>The task is dispatched to the data node, going to be executed.</p></td>
   </tr>
   <tr>
     <td><p>Persisted</p></td>
     <td><p>5</p></td>
     <td><p>New segments have been generated and persisted.</p></td>
   </tr>
   <tr>
     <td><p>Completed</p></td>
     <td><p>6</p></td>
     <td><p>The new segments have been accepted by the target collection. Datanode's work is done.</p></td>
   </tr>
   <tr>
     <td><p>Failed and cleaned</p></td>
     <td><p>7</p></td>
     <td><p>The task failed, and the temporary data generated by this task has been cleaned.</p></td>
   </tr>
</table>

#### Example

```java
import io.milvus.param.bulkinsert.*;

R<GetImportStateResponse> response = milvusClient.getBulkInsertState(GetBulkInsertStateParam.newBuilder()
        .withTask(taskId)
        .build());
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
