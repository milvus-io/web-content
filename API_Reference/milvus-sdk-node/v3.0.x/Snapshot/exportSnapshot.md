# exportSnapshot()

This operation exports a snapshot as a self-contained bundle and returns its job ID. Requires Milvus 3.0.6 or later.

```javascript
await milvusClient.exportSnapshot(data: ExportSnapshotReq)
```

## Request Syntax

```javascript
await milvusClient.exportSnapshot({
    collection_name: string,
    snapshot_name: string,
    target_s3_path: string,
    external_spec?: string,
    db_name?: string,
    timeout?: number,
    client_request_id?: string,
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection that owns the snapshot.

- **snapshot_name** (*string*) -

    **[REQUIRED]**

    The name of the snapshot to export.

- **target_s3_path** (*string*) -

    **[REQUIRED]**

    The destination root for the self-contained export bundle.

- **external_spec** (*string*) -

    An optional JSON external storage configuration.

- **db_name** (*string*) -

    The name of the database. Optional.

- **timeout** (*number*) -

    An optional duration of time in milliseconds to allow for the RPC. If it is set to `undefined`, the client keeps waiting until the server responds or an error occurs. Default is `undefined`.

- **client_request_id** (*string*) -

    A trace ID for request tracking. Optional.

**RETURNS:**

*Promise<ExportSnapshotResponse>*

This method returns a promise that resolves to an **ExportSnapshotResponse** object.

```javascript
{
    job_id: string,
    status:  ResStatus
}
```

**PARAMETERS:**

- **job_id** (*string*) -

    The identifier of the asynchronous export job. Pass this value to `getExportSnapshotState()` to poll for completion.

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

const res = await client.exportSnapshot({
    collection_name: 'my_collection',
    snapshot_name: 'snapshot_2024_01',
    target_s3_path: 's3://bucket/exports',
});
console.log(res.job_id);
```
