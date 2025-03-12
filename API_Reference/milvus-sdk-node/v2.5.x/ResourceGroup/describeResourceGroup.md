# describeResourceGroup()

This operation lists detailed information about the specified resource group.

```javascript
describeResourceGroup(data): Promise<DescribeResourceGroupResponse>
```

## Request Syntax

```javascript
milvusClient.describeResourceGroup({
    resource_group: string,
    timeout?: number
})
```

**PARAMETERS:**

- **resource_group** (*string*) -

    **[REQUIRED]**

    Name of the resource group to describe.

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise |\<DescribeResourceGroupResponse>*

This method returns a promise that resolves to a **DescribeResourceGroupResponse** object.

```javascript
{
    code: number
    error_code: string | number,
    reason: string,
    resource_group: {
        capacity: number,
        num_available_node: number,
        num_loaded_replica: { [key: string]: number },
        num_outgoing_node: { [key: string]: number },
        num_incoming_node: { [key: string]: number }
    }
}
```

**PARAMETERS:**

- **code** (*number*) -

    A code that indicates the operation result. It remains **0** if this operation succeeds.

- **error_code** (*string* | *number*) -

    An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

- **reason** (*string*) - 

    The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

- **resource_group** (*Object*) -

    An object that provides detailed information about the specified resource group.

    - **capacity** (*number*) -

        The number of query nodes that have been transferred to this resource group.

    - **num_available_replica** (*Object*) -

        An object that contains collection-specific statistics on the number of available replicas, with the collection names as the keys and their numbers of replicas as the values.

    - **num_outgoing_node**: (*Object*) -

        An object that contains collection-specific statistics on the number of outgoing nodes accessed by the replicas loaded in this resource group, with the collection names as the keys and their numbers of outgoing nodes as the values.

    - **num_incoming_node**: (*Object*) -

        An object that contains collection-specific statistics on the number of incoming nodes accessed by the replicas loaded in this resource group, with the collection names as the keys and their numbers of incoming nodes as the values.

    - **config** (*ResourceGroupConfig*) -

        The configurations of the specified resource group in a [ResourceGroupConfig](ResourceGroupConfig.md) instance.

## Example

```javascript
const milvusClient = new milvusClient(MILUVS_ADDRESS);

const res = await milvusClient.describeResourceGroup({ 
    resource_group: 'my_rg'
});
```

