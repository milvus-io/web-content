# dropSnapshot()

This operation deletes a snapshot for a collection.

```javascript
await milvusClient.dropSnapshot(data: DropSnapshotReq)
```

## Request Syntax

```javascript
await milvusClient.dropSnapshot({
    collection_name: string,
    snapshot_name: string,
    db_name?: string,
    timeout?: number,
    client_request_id?: string,
})
```

**PARAMETERS:**

- **collection_name** (*string*) -
**[REQUIRED]**
The name of the collection the snapshot belongs to.

- **snapshot_name** (*string*) -
**[REQUIRED]**
The name of the snapshot to delete.

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

const res = await client.dropSnapshot({
    collection_name: 'my_collection',
    snapshot_name: 'snapshot_2024_01',
});
```
