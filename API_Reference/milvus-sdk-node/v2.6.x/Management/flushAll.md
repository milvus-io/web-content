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
})
```

**PARAMETERS:**

- **db_name** (*string*) -
The name of the database. Optional and deprecated.

- **timeout** (*number*) -
An optional duration of time in milliseconds to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or an error occurs. Default is undefined.

**RETURNS:**

*Promise<FlushAllResponse>*

This method returns a promise that resolves to a **FlushAllResponse** object.

**PARAMETERS:**

- **flush_all_ts** (*number*) -
The flush-all timestamp. Deprecated.

- **flush_all_tss** (*Record<string, number>*) -
A record of flush-all timestamps, keyed by cluster.

- **flush_all_msgs** (*Record<string, any>*) -
A record of flush-all messages, keyed by cluster.

- **cluster_info** (*FlushClusterInfo*) -
The cluster information. Each entry is a **FlushClusterInfo** with the following members.

    - **cluster_id** (*string*) -

        The ID of the cluster.

    - **cchannel** (*string*) -

        The channel through which the flush-all request was delivered.

    - **pchannels** (*string[]*) -

        The physical channels flushed for the cluster.

- **status** (*ResStatus*) -
A **ResStatus** object with the following members.

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
