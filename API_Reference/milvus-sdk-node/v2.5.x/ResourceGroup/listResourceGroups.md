# listResourceGroups()

This operation lists all available resource groups.

```javascript
listResourceGroups(data): Promise<ListResourceGroupsResponse>
```

## Request Syntax

```javascript
milvusClient.describeResourceGroup({
    timeout?: number
})
```

**PARAMETERS:**

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise |&lt;DescribeResourceGroupResponse&gt;*

This method returns a promise that resolves to a **DescribeResourceGroupResponse** object.

```javascript
{
    code: number
    error_code: string | number,
    reason: string,
    resource_groups: string[]
}
```

**PARAMETERS:**

- **code** (*number*) -

    A code that indicates the operation result. It remains **0** if this operation succeeds.

- **error_code** (*string* | *number*) -

    An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

- **reason** (*string*) - 

    The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

- **resource_groups** (*string&#91;&#93;*) -

    A list of resource group names.

## Example

```javascript
const milvusClient = new milvusClient(MILUVS_ADDRESS);

const res = await milvusClient.listResourceGroups();
```

