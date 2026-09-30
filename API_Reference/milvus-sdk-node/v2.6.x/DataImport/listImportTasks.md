# listImportTasks()

List import tasks for a collection, showing the status and details of bulk import operations.

```javascript
await milvusClient.listImportTasks(data: ListImportTasksReq)
```

## Request Syntax

```javascript
await milvusClient.listImportTasks({
    collection_name: string,
    limit?: number,
    timeout?: number,
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection.

- **limit** (*number*) -

    Maximum number of tasks to return. Set to `0` for all tasks. Optional.

- **timeout** (*number*) -

    RPC timeout in milliseconds. Optional.

**RETURNS** *Promise<ListImportTasksResponse>*

This method returns a promise that resolves to a **ListImportTasksResponse** object.

```javascript
{
    tasks: GetImportStateResponse[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **tasks** (*GetImportStateResponse[]*) -
A list of import-task descriptors. Each entry carries the task's state, row count, segment IDs, and creation timestamp.

    - **state** (*ImportState*) -

        The task state. Possible values are **ImportPending**, **ImportFailed**, **ImportStarted**, **ImportPersisted**, **ImportCompleted**, and **ImportFailedAndCleaned**.

    - **row_count** (*number*) -

        The number of rows imported by the task.

    - **id_list** (*number[]*) -

        The auto-generated primary keys assigned to imported rows, when available.

    - **infos** (*KeyValuePair[]*) -

        Diagnostic key-value pairs (for example, **failed_reason**).

    - **id** (*number*) -

        The task identifier.

    - **collection_id** (*number*) -

        The collection that received the import.

    - **segment_ids** (*number[]*) -

        The segment IDs produced by the task.

    - **create_ts** (*number*) -

        The creation timestamp of the task.

- **ResStatus**
A **ResStatus** object.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});
const res = await client.listImportTasks({
    collection_name: 'my_collection',
});
console.log(res.tasks);
```
