# getPersistentSegmentInfo()

This operation notifies Proxy to return segment information from data nodes, including segment ID, collection ID, partition ID, number of rows, and state.

```javascript
await milvusClient.getPersistentSegmentInfo(data: GePersistentSegmentInfoReq)
```

## Request Syntax

```javascript
await milvusClient.getPersistentSegmentInfo({
    collectionName: string,
    dbName?: string,
    timeout?: number,
})
```

**PARAMETERS:**

- **collectionName** (*string*) -

    **[REQUIRED]**

    The name of the collection.

- **dbName** (*string*) -

    The name of the database. Optional.

- **timeout** (*number*) -

    RPC timeout in milliseconds. Optional.

**RETURNS:**

*Promise\<GePersistentSegmentInfoResponse\>*

The response contains an `infos` array with segment details from data nodes.

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
const res = await client.getPersistentSegmentInfo({
    collectionName: 'my_collection',
});
console.log(res.infos);
```
