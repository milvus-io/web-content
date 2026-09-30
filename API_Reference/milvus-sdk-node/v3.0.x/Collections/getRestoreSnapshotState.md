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

**RETURNS:**

*Promise<GetRestoreSnapshotStateResponse>*

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

const res = await client.getRestoreSnapshotState({
    job_id: 'job_12345',
});
```
