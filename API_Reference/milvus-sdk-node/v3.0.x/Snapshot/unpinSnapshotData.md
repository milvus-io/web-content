# unpinSnapshotData()

This operation unpins snapshot data, allowing it to be garbage collected when no longer needed.

```javascript
await milvusClient.unpinSnapshotData(data: UnpinSnapshotDataReq)
```

## Request Syntax

```javascript
await milvusClient.unpinSnapshotData({
    pin_id: number | string,
    timeout?: number,
    client_request_id?: string,
})
```

**PARAMETERS:**

- **pin_id** (*number | string*) -
**[REQUIRED]**
The pin ID returned by pinSnapshotData().

- **timeout** (*number*) -
An optional duration of time in milliseconds to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or an error occurs. Default is undefined.

- **client_request_id** (*string*) -
A trace ID for request tracking. Optional.

**RETURNS:**

*Promise<ResStatus>*

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

const res = await client.unpinSnapshotData({
    pin_id: 'pin_12345',
});
```
