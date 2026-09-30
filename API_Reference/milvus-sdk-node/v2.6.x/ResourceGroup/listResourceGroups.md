# listResourceGroups()

This operation lists all available resource groups.

```javascript
await milvusClient.listResourceGroups(data)
```

## Request Syntax

```javascript
await milvusClient.describeResourceGroup({
    timeout?: number
})
```

**PARAMETERS:**

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise<ListResourceGroupsResponse>*

This method returns a promise that resolves to a **ListResourceGroupsResponse** object.

```javascript
{
    resource_groups: string[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **resource_groups** (*string[]*) -
A list of resource group names defined in the current Milvus instance. The default resource group is named **__default_resource_group**.

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

const res = await milvusClient.listResourceGroups();
```

