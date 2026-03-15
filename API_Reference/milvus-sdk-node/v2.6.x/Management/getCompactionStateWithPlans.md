# getCompactionStateWithPlans()

This operation gets the compaction states of a targeted compaction ID, including merge plans showing which segments will be combined.

```javascript
await milvusClient.getCompactionStateWithPlans(data: GetCompactionPlansReq)
```

## Request Syntax

```javascript
await milvusClient.getCompactionStateWithPlans({
    compactionID: number | string,
    timeout?: number,
})
```

**PARAMETERS:**

- **compactionID** (*number | string*) -

    **[REQUIRED]**

    The ID of the compaction operation returned by `compact()`.

- **timeout** (*number*) -

    RPC timeout in milliseconds. Optional.

**RETURNS:**

*Promise\<GetCompactionPlansResponse\>*

The response contains the compaction `state` and `mergeInfos` array with source and target segment details.

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
const compactRes = await client.compact({ collection_name: 'my_collection' });
const plans = await client.getCompactionStateWithPlans({
    compactionID: compactRes.compactionID,
});
console.log(plans.state, plans.mergeInfos);
```
