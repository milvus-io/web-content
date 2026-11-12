# loadBalance()

This operation performs a load balancing operation from a source query node to destination query nodes. This function only works in a Milvus cluster.

```javascript
await milvusClient.loadBalance(data: LoadBalanceReq)
```

## Request Syntax

```javascript
await milvusClient.loadBalance({
    collectionName?: string,
    db_name?: string,
    src_nodeID: number,
    dst_nodeIDs?: number[],
    sealed_segmentIDs?: number[],
    timeout?: number,
})
```

**PARAMETERS:**

- **collectionName** (*string*) -

    The name of the collection to balance. Optional.

- **db_name** (*string*) -

    The name of the database that holds the target collection. Optional.

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

*Promise<ResStatus>*

**PARAMETERS:**

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
await client.loadBalance({
    src_nodeID: 1,
    dst_nodeIDs: [2, 3],
});
```
