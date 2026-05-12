# getRestoreSnapshotState()

This operation checks the state of a snapshot restore job. Use the job_id returned by restoreSnapshot().

```javascript
await milvusClient.getRestoreSnapshotState(data: GetRestoreSnapshotStateReq)
```

## Request Syntax

```javascript
await milvusClient.getRestoreSnapshotState({
    job_id: number | string,
    timeout?: number,
    client_request_id?: string,
})
```

**PARAMETERS:**

- **job_id** (*number | string*) -
**[REQUIRED]**
The restore job ID returned by restoreSnapshot().

- **timeout** (*number*) -
An optional duration of time in milliseconds to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or an error occurs. Default is undefined.

- **client_request_id** (*string*) -
A trace ID for request tracking. Optional.

**RETURNS** *Promise<GetRestoreSnapshotStateResponse>*

This method returns a promise that resolves to a **GetRestoreSnapshotStateResponse** object.

```javascript
{
    info: RestoreSnapshotJobInfo,
    status:  ResStatus
}
```

**PARAMETERS:**

- **info** (*RestoreSnapshotJobInfo*) -
The current state of the restore job.

    - **job_id** (*string*) -

        The job identifier.

    - **snapshot_name** (*string*) -

        The snapshot being restored.

    - **db_name** (*string*) -

        The target database.

    - **collection_name** (*string*) -

        The target collection name.

    - **state** (*RestoreSnapshotState*) -

        The current job state. Possible values are **RestoreSnapshotNone**, **RestoreSnapshotPending**, **RestoreSnapshotExecuting**, **RestoreSnapshotCompleted**, and **RestoreSnapshotFailed**.

    - **progress** (*number*) -

        The completion percentage as an integer between **0** and **100**.

    - **reason** (*string*) -

        The failure reason when **state** is **RestoreSnapshotFailed**, otherwise an empty string.

    - **start_time** (*string*) -

        The time at which the job started.

    - **time_cost** (*string*) -

        The total elapsed time since the job started.

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

const res = await client.getRestoreSnapshotState({
    job_id: 'job_12345',
});
```
