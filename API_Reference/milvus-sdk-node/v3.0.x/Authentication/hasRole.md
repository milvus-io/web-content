# hasRole()

This operation checks if a role exists in the Milvus cluster.

```javascript
await milvusClient.hasRole(data: HasRoleReq)
```

## Request Syntax

```javascript
await milvusClient.hasRole({
    roleName: string,
    timeout?: number,
})
```

**PARAMETERS:**

- **roleName** (*string*) -

    **[REQUIRED]**

    The name of the role to check.

- **timeout** (*number*) -

    RPC timeout in milliseconds. Optional.

**RETURNS** *Promise<HasRoleResponse>*

This method returns a promise that resolves to a **HasRoleResponse** object.

```javascript
{
    hasRole: boolean,
    status:  ResStatus
}
```

**PARAMETERS:**

- **hasRole** (*boolean*) -
A boolean that indicates whether the requested role exists. It is **true** when the role exists and **false** when it does not.

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
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});
const res = await client.hasRole({ roleName: 'my_role' });
console.log(res.hasRole); // true or false
```
