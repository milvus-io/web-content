# flushAll()

This operation flushes all collections, sealing all segments and persisting data on disk.

```javascript
await milvusClient.flushAll(data?: FlushAllReq)
```

## Request Syntax

```javascript
await milvusClient.flushAll({
    db_name?: string,
    timeout?: number,
    client_request_id?: string,
})
```

**PARAMETERS:**

- **db_name** (*string*) -
The name of the database. Optional.

- **timeout** (*number*) -
An optional duration of time in milliseconds to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or an error occurs. Default is undefined.

- **client_request_id** (*string*) -
A trace ID for request tracking. Optional.

**RETURNS:**

*Promise\<FlushAllResponse\>*

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

const res = await client.flushAll();
```
