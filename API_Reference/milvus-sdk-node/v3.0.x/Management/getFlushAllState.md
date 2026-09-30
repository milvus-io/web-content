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

**RETURNS** *Promise<GetFlushAllStateResponse>*

This method returns a promise that resolves to a **GetFlushAllStateResponse** object.

```javascript
{
    flushed: boolean,
    status:  ResStatus
}
```

**PARAMETERS:**

- **flushed** (*boolean*) -
Whether the flush-all operation identified by the supplied timestamps has fully completed. It is **true** when every channel reaches the requested flush timestamp, otherwise **false**.

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

const res = await client.getFlushAllState({
    flush_all_tss: { db1: 123456789 },
});
```
