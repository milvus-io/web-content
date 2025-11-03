# createResourceGroup()

This operation creates a resource group. This operation always succeeds no matter whether the resource group exists.

```javascript
createResourceGroup(data): Promise<ResStatus>
```

<div class="admonition note">

<p><b>notes</b></p>

<p>A Milvus instance begins with a default resource group that includes all available query nodes. </p>
<p>To optimize resource utilization, you can create additional resource groups, reassign specific query nodes from the default group, and load collections into these newly configured groups. </p>
<p>This approach ensures that collections are allocated dedicated query nodes, enabling efficient and isolated search services.</p>
<p>For details about resource groups, refer to <a href="https://milvus.io/docs/resource_group.md#Manage-Resource-Groups">Manage Resource Group</a>.</p>

</div>

## Request Syntax

```javascript
milvusClient.createResourceGroup({
    resource_group: string,
    config?: ResourceGroupConfig,
    timeout?: number
})
```

**PARAMETERS:**

- **resource_group** (*string*) -

    **&#91;REQUIRED&#93;**

    Name of the resource group to create.

- **configs** (*ResourceGroupConfig*) -

    A **[ResourceGroupConfig](ResourceGroupConfig.md)** object.

- **timeout** (*number*) -

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
const configs = ResourceGroupConfig = {
    requests: { node_num: 1 },
    limits: { node_num: 10000 },
    transfer_from: [{ resource_group: DEFAULT_RESOURCE_GROUP }],
    transfer_to: [{ resource_group: DEFAULT_RESOURCE_GROUP }]
}

const resStatus = await milvusClient.createResourceGroup({ 
    resource_group: 'my_rg',
    configs: configs
});
```
