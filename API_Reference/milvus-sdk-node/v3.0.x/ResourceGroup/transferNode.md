# transferNode()

This operation transfers nodes from one resource group to another. This operation only works in a Milvus cluster.

```javascript
await milvusClient.transferNode(data: TransferNodeReq)
```

## Request Syntax

```javascript
await milvusClient.transferNode({
    source_resource_group: string,
    target_resource_group: string,
    num_node: number,
    timeout?: number,
})
```

**PARAMETERS:**

- **source_resource_group** (*string*) -

    **[REQUIRED]**

    The name of the source resource group.

- **target_resource_group** (*string*) -

    **[REQUIRED]**

    The name of the target resource group.

- **num_node** (*number*) -

    **[REQUIRED]**

    The number of nodes to transfer.

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
await client.transferNode({
    source_resource_group: 'rg1',
    target_resource_group: 'rg2',
    num_node: 1,
});
```
