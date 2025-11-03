# transferReplica()

This operation reassigns the specified number of replicas from the source resource group to the target resource group.

```javascript
transferReplica(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.transferReplica({
    source_resource_group: string,
    target_resource_group: string,
    collection_name: string,
    num_replica: number
    timeout?: number
})
```

**PARAMETERS:**

- **source_resource_group** (*string*) - 

    Name of the source resource group of this operation.

- **target_resource_group** (*string*) - 

    Name of the target resource group of this operation.

- **collection_name** (*str*) -

    Name of the collection whose replicas will be transferred.

- **num_replica** (*int*) -

    Number of replicas to transfer.

- **timeout** (*float* | *None*) - 

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise |&lt;ResStatus&gt;*

This method returns a promise that resolves to a **ResStatus** object.

```javascript
{
    code: number
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

## Example

```javascript
const milvusClient = new milvusClient(MILUVS_ADDRESS);

const resStatus = await milvusClient.transferReplica({ 
    source_resource_group: DEFAULT_RESOURCE_GROUP,
    target_resource_group: 'my_rg',
    collection_name: 'my_collection',
    num_replica: 1
});
```

