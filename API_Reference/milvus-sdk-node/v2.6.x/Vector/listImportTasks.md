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

**RETURNS:**

*Promise\<ListImportTasksResponse\>*

The response contains a `tasks` array with import task details including state, row count, and IDs.

**EXCEPTIONS:**

- **MilvusError**

    This exception will be raised when any error occurs during this operation.

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
