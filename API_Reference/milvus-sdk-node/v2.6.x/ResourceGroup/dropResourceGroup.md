# dropResourceGroup()

This operation drops the specified resource group.

```javascript
await milvusClient.dropResourceGroup(data)
```

## Request Syntax

```javascript
await milvusClient.dropResourceGroup({
    resource_group: string,
    timeout?: number
})
```

**PARAMETERS:**

- **resource_group** (*string*) -

    **[REQUIRED]**

    Name of the resource group to drop.

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise |<ResStatus>*

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

<div class="alert note">

Before dropping a resource group, ensure that the number of required nodes and the maximum number of required nodes in its configuration are zeros.

You can use [updateResourceGroups()](https://zilliverse.feishu.cn/docx/JsQqdoEUNoWFCCxAMcUc0mtjncf) to make the change.

</div>

```javascript
const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const configs: ResourceGroupConfig = {
    requests: { node_num: 0 },
    limits: { node_num: 0 },
    transfer_from: [{ resource_group: DEFAULT_RESOURCE_GROUP }],
    transfer_to: [{ resource_group: DEFAULT_RESOURCE_GROUP }]
}

const res = await milvusClient.updateResourceGroups({ 
    my_rg: configs
});

const res = await milvusClient.dropResourceGroup({ 
    resource_group: 'my_rg'
});
```

