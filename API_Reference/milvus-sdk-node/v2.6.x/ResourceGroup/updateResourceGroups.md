# updateResourceGroups()

This operation updates the configurations of the specified resource group.

```javascript
await milvusClient.createResourceGroup(data)
```

## Request Syntax

```javascript
await milvusClient.updateResourceGroup({
    resource_groups: {{ [key: string]: ResourceGroupConfig }},
    timeout?: number
})
```

**PARAMETERS:**

- **resource_groups** (*{{ [key: string]: ResourceGroupConfig }}*) -

    **[REQUIRED]**

    An object that contains the resource groups to update, with the resource group names as the keys and their updated configurations as the values, each of which is an [ResourceGroupConfig](https://zilliverse.feishu.cn/docx/Q0aNdOtyYoQHFhxCdEacj2kdnah) object.

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

```javascript
const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});
const configs: ResourceGroupConfig = {
    requests: { node_num: 1 },
    limits: { node_num: 10000 },
    transfer_from: [{ resource_group: DEFAULT_RESOURCE_GROUP }],
    transfer_to: [{ resource_group: DEFAULT_RESOURCE_GROUP }]
}

const resStatus = await milvusClient.updateResourceGroup({ 
    my_rg: configs
});
```

