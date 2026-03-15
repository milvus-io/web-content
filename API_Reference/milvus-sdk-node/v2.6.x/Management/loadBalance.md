# loadBalance()

This operation performs a load balancing operation from a source query node to destination query nodes. This function only works in a Milvus cluster.

```javascript
await milvusClient.loadBalance(data: LoadBalanceReq)
```

## Request Syntax

```javascript
await milvusClient.loadBalance({
    src_nodeID: number,
    dst_nodeIDs?: number[],
    sealed_segmentIDs?: number[],
    timeout?: number,
})
```

**PARAMETERS:**

- **src_nodeID** (*number*) -

    **[REQUIRED]**

    The ID of the source query node to balance.

- **dst_nodeIDs** (*number[]*) -

    The IDs of the destination query nodes. Optional.

- **sealed_segmentIDs** (*number[]*) -

    The IDs of sealed segments to balance. Optional.

- **timeout** (*number*) -

    RPC timeout in milliseconds. Optional.

**RETURNS:**

*Promise\<ResStatus\>*

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
await client.loadBalance({
    src_nodeID: 1,
    dst_nodeIDs: [2, 3],
});
```
