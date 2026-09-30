# listRestoreSnapshotJobs()

This operation lists all snapshot restore jobs. You can filter by target collection name and database name.

```javascript
await milvusClient.listRestoreSnapshotJobs(data?: ListRestoreSnapshotJobsReq)
```

## Request Syntax

```javascript
await milvusClient.listRestoreSnapshotJobs({
    collection_name?: string,
    db_name?: string,
    timeout?: number,
    client_request_id?: string,
})
```

**PARAMETERS:**

- **collection_name** (*string*) -
Optional filter by target collection name.

- **db_name** (*string*) -
Optional filter by database name.

- **timeout** (*number*) -
An optional duration of time in milliseconds to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or an error occurs. Default is undefined.

- **client_request_id** (*string*) -
A trace ID for request tracking. Optional.

**RETURNS** *Promise<ListRestoreSnapshotJobsResponse>*

This method returns a promise that resolves to a **ListRestoreSnapshotJobsResponse** object.

```javascript
{
    jobs: RestoreSnapshotJobInfo[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **jobs** (*RestoreSnapshotJobInfo[]*) -
A list of restore jobs that match the requested database and collection filters. For the full **RestoreSnapshotJobInfo** field reference, refer to the `getRestoreSnapshotState()` doc.

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

const res = await client.listRestoreSnapshotJobs({
    collection_name: 'restored_collection',
});
```
