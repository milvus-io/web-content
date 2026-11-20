# getExportSnapshotState()

This operation gets the progress and the completed bundle's metadata URI for an export snapshot job. Requires Milvus 3.0.6 or later.

```javascript
await milvusClient.getExportSnapshotState(data: GetExportSnapshotStateReq)
```

## Request Syntax

```javascript
await milvusClient.getExportSnapshotState({
    job_id: number | string,
    timeout?: number,
    client_request_id?: string,
})
```

**PARAMETERS:**

- **job_id** (*number* | *string*) -

    **[REQUIRED]**

    The export job ID returned by `exportSnapshot()`.

- **timeout** (*number*) -

    An optional duration of time in milliseconds to allow for the RPC. If it is set to `undefined`, the client keeps waiting until the server responds or an error occurs. Default is `undefined`.

- **client_request_id** (*string*) -

    A trace ID for request tracking. Optional.

**RETURNS:**

*Promise<GetExportSnapshotStateResponse>*

This method returns a promise that resolves to a **GetExportSnapshotStateResponse** object.

```javascript
{
    info: ExportSnapshotJobInfo,
    status:  ResStatus
}
```

**PARAMETERS:**

- **info** (*ExportSnapshotJobInfo*) -

    The current state of the export job. Each entry has the following members:

    - **job_id** (*string*) -

        The job identifier.

    - **snapshot_name** (*string*) -

        The snapshot being exported.

    - **db_name** (*string*) -

        The database that owns the snapshot.

    - **collection_name** (*string*) -

        The collection that owns the snapshot.

    - **state** (*ExportSnapshotState*) -

        The current job state. Possible values are **ExportSnapshotNone**, **ExportSnapshotPending**, **ExportSnapshotExecuting**, **ExportSnapshotCompleted**, and **ExportSnapshotFailed**.

    - **progress** (*number*) -

        The completion percentage as an integer between **0** and **100**.

    - **reason** (*string*) -

        The failure reason when **state** is **ExportSnapshotFailed**, otherwise an empty string.

    - **start_time** (*string*) -

        The time at which the job started.

    - **time_cost** (*string*) -

        The total elapsed time since the job started.

    - **total_files** (*string*) -

        The total number of files in the export bundle.

    - **copied_files** (*string*) -

        The number of files copied so far.

    - **total_bytes** (*string*) -

        The total size of the export bundle in bytes.

    - **snapshot_metadata_uri** (*string*) -

        The metadata URI of the completed export bundle.

- **ResStatus**

    A **ResStatus** object.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

**EXCEPTIONS:**

- **Error**

    This exception is raised when any error occurs during this operation.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await client.getExportSnapshotState({
    job_id: 'job_12345',
});
console.log(res.info);
```
