# createSnapshot()

This operation creates a snapshot for a collection. A snapshot captures the current state of a collection and its data.

```javascript
await milvusClient.createSnapshot(data: CreateSnapshotReq)
```

## Request Syntax

```javascript
await milvusClient.createSnapshot({
    collection_name: string,
    snapshot_name: string,
    description?: string,
    compaction_protection_seconds?: number | string,
    db_name?: string,
    timeout?: number,
    client_request_id?: string,
})
```

**PARAMETERS:**

- **collection_name** (*string*) -
**[REQUIRED]**
The name of the collection to snapshot.

- **snapshot_name** (*string*) -
**[REQUIRED]**
The name of the snapshot.

- **description** (*string*) -
Optional snapshot description.

- **compaction_protection_seconds** (*number | string*) -
Duration to protect referenced segments from compaction. Optional.

- **db_name** (*string*) -
The name of the database. Optional.

- **timeout** (*number*) -
An optional duration of time in milliseconds to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or an error occurs. Default is undefined.

- **client_request_id** (*string*) -
An optional, caller-supplied ID for request tracking and log or trace correlation. The SDK sends it as the `client-request-id` gRPC metadata header and never generates one. Use a unique value per request, such as a UUID. A value in OpenTelemetry trace-ID form (32 lowercase hexadecimal characters) is also used by client telemetry as a trace ID.

**RETURNS:**

*Promise<ResStatus>*

This method returns a promise that resolves to a **ResStatus** object.

**EXCEPTIONS:**

- **Error**

    This exception will be raised when any error occurs during this operation.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await client.createSnapshot({
    collection_name: 'my_collection',
    snapshot_name: 'snapshot_2024_01',
    description: 'Monthly backup',
});
```
