# getFlushAllState()

This operation checks whether a flush-all operation has completed.

```javascript
await milvusClient.getFlushAllState(data: GetFlushAllStateReq)
```

## Request Syntax

```javascript
await milvusClient.getFlushAllState({
    flush_all_ts?: number,
    flush_all_tss?: Record\<string, number\>,
    db_name?: string,
    timeout?: number,
    client_request_id?: string,
})
```

**PARAMETERS:**

- **flush_all_ts** (*number*) -
The flush-all timestamp. Optional and deprecated.

- **flush_all_tss** (*Record\<string, number\>*) -
A map of database names to flush-all timestamps. Optional.

- **db_name** (*string*) -
The name of the database. Optional and deprecated.

- **timeout** (*number*) -
An optional duration of time in milliseconds to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or an error occurs. Default is undefined.

- **client_request_id** (*string*) -
A trace ID for request tracking. Optional.

**RETURNS:**

*Promise\<GetFlushAllStateResponse\>*

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

const res = await client.getFlushAllState({
    flush_all_tss: { db1: 123456789 },
});
```
