# getRefreshExternalCollectionProgress()

This operation checks the progress of a refresh job for an external collection. Use the job_id returned by refreshExternalCollection().

```javascript
await milvusClient.getRefreshExternalCollectionProgress(data: GetRefreshExternalCollectionProgressReq)
```

## Request Syntax

```javascript
await milvusClient.getRefreshExternalCollectionProgress({
    job_id: number | string,
    timeout?: number,
    client_request_id?: string,
})
```

**PARAMETERS:**

- **job_id** (*number | string*) -
**[REQUIRED]**
The job ID returned by refreshExternalCollection().

- **timeout** (*number*) -
An optional duration of time in milliseconds to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or an error occurs. Default is undefined.

- **client_request_id** (*string*) -
A trace ID for request tracking. Optional.

**RETURNS** *Promise<GetRefreshExternalCollectionProgressResponse>*

This method returns a promise that resolves to a **GetRefreshExternalCollectionProgressResponse** object.

```javascript
{
    job_info: RefreshExternalCollectionJobInfo,
    status:  ResStatus
}
```

**PARAMETERS:**

- **job_info** (*RefreshExternalCollectionJobInfo*) -
The current state of the refresh job.

    - **job_id** (*string*) -

        The job identifier.

    - **collection_name** (*string*) -

        The external collection being refreshed.

    - **state** (*RefreshExternalCollectionState*) -

        The current job state. Possible values are **RefreshPending**, **RefreshInProgress**, **RefreshCompleted**, and **RefreshFailed**.

    - **progress** (*string*) -

        The completion percentage as an integer between **"0"** and **"100"**.

    - **reason** (*string*) -

        The failure reason when **state** is **RefreshFailed**, otherwise an empty string.

    - **external_source** (*string*) -

        The external source path captured by the job.

    - **start_time** (*string*) -

        The time at which the job started.

    - **end_time** (*string*) -

        The time at which the job ended, or an empty string when the job is still running.

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

const progress = await client.getRefreshExternalCollectionProgress({
    job_id: 'job_12345',
});
```
