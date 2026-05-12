# describeResourceGroup()

This operation lists detailed information about the specified resource group.

```javascript
await milvusClient.describeResourceGroup(data)
```

## Request Syntax

```javascript
await milvusClient.describeResourceGroup({
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

**RETURNS** *Promise<DescribeResourceGroupResponse>*

This method returns a promise that resolves to a **DescribeResourceGroupResponse** object.

```javascript
{
    resource_group: ResourceGroup,
    status:  ResStatus
}
```

**PARAMETERS:**

- **resource_group** (*ResourceGroup*) -
The resource group descriptor.

    - **name** (*string*) -

        The resource group name.

    - **capacity** (*number*) -

        The maximum number of nodes the group can hold.

    - **num_available_node** (*number*) -

        The number of nodes currently available in the group.

    - **num_loaded_replica** (*Record<string, number>*) -

        A mapping from collection name to the number of replicas this group serves for that collection.

    - **num_outgoing_node** (*Record<string, number>*) -

        A mapping from resource group name to the number of nodes this group is sending out during rebalancing.

    - **num_incoming_node** (*Record<string, number>*) -

        A mapping from resource group name to the number of nodes this group is receiving during rebalancing.

    - **config** (*ResourceGroupConfig*) -

        The capacity, transfer policy, and node-filter configuration of the group.

        - **requests** (*{ node_num: number }*) -

        The minimum number of nodes the group must have. Missing nodes are pulled from groups listed in **transfer_from**.

        - **limits** (*{ node_num: number }*) -

        The maximum number of nodes the group can hold. Excess nodes are pushed to groups listed in **transfer_to**.

        - **transfer_from** (*{ resource_group: string }[]*) -

        Source groups, in priority order, from which to pull missing nodes.

        - **transfer_to** (*{ resource_group: string }[]*) -

        Target groups, in priority order, to which excess nodes are pushed.

        - **node_filter** (*{ node_labels: KeyValuePair[] }*) -

        Required node labels; only nodes that match all labels are admitted to the group.

        - **requests** (*{ node_num: number }*) -

            The minimum number of nodes the group must have. Missing nodes are pulled from groups listed in **transfer_from**.

        - **limits** (*{ node_num: number }*) -

            The maximum number of nodes the group can hold. Excess nodes are pushed to groups listed in **transfer_to**.

        - **transfer_from** (*{ resource_group: string }[]*) -

            Source groups, in priority order, from which to pull missing nodes.

        - **transfer_to** (*{ resource_group: string }[]*) -

            Target groups, in priority order, to which excess nodes are pushed.

        - **node_filter** (*{ node_labels: KeyValuePair[] }*) -

            Required node labels; only nodes that match all labels are admitted to the group.

    - **nodes** (*NodeInfo[]*) -

        Optional. The current member nodes of the group, with their IDs, addresses, and hostnames.

- **ResStatus**
A **ResStatus** object.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```javascript
const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await milvusClient.describeResourceGroup({ 
    resource_group: 'my_rg'
});
```

