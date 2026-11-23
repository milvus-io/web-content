# listSnapshots()

This operation lists all snapshots for a collection.

```javascript
await milvusClient.listSnapshots(data: ListSnapshotsReq)
```

## Request Syntax

```javascript
await milvusClient.listSnapshots({
    collection_name: string,
    db_name?: string,
    timeout?: number,
    client_request_id?: string,
})
```

**PARAMETERS:**

- **collection_name** (*string*) -
**[REQUIRED]**
The name of the collection.

- **db_name** (*string*) -
The name of the database. Optional.

- **timeout** (*number*) -
An optional duration of time in milliseconds to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or an error occurs. Default is undefined.

- **client_request_id** (*string*) -
An optional, caller-supplied ID for request tracking and log or trace correlation. The SDK sends it as the `client-request-id` gRPC metadata header and never generates one. Use a unique value per request, such as a UUID. A value in OpenTelemetry trace-ID form (32 lowercase hexadecimal characters) is also used by client telemetry as a trace ID.

**RETURNS:**

*Promise<ListSnapshotsResponse>*

This method returns a promise that resolves to a **ListSnapshotsResponse** object.

```javascript
{
    snapshots: string[],
    snapshot_summaries?: SnapshotSummary[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **snapshots** (*string[]*) -
A list of snapshot names that currently exist for the requested collection.

- **snapshot_summaries** (*SnapshotSummary[]*) -
Optional. Summaries of the snapshots. Each entry has the following members:

    - **name** (*string*) -

        The snapshot name.

    - **create_ts** (*string*) -

        The creation timestamp of the snapshot.

    - **description** (*string*) -

        The snapshot description.

    - **create_utc_ts** (*string*) -

        The creation time of the snapshot as Unix milliseconds.

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

const res = await client.listSnapshots({
    collection_name: 'my_collection',
});
```
