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

*Promise<FlushAllResponse>*

**PARAMETERS:**

- **flush_all_ts** (*number*) -
The flush-all timestamp.

- **flush_all_tss** (*number[]*) -
A list of flush-all timestamps.

- **flush_all_msgs** (*number[]*) -
A list of flush-all messages.

- **cluster_info** (*FlushClusterInfo[]*) -
A list of cluster information.

- **status** (*ResStatus*) -
A **ResStatus** object.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

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

const res = await client.flushAll();
```
