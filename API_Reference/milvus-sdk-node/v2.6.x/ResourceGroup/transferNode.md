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

*Promise<ResStatus>*

This method returns a promise that resolves to a **ResStatus** object.

```javascript
{
    code: number,
    error_code: string | number,
    reason: string
}
```

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
await client.transferNode({
    source_resource_group: 'rg1',
    target_resource_group: 'rg2',
    num_node: 1,
});
```
