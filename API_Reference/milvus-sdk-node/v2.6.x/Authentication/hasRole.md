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

**RETURNS:**

*Promise\<HasRoleResponse\>*

The response contains a `hasRole` boolean indicating whether the role exists.

**EXCEPTIONS:**

- **MilvusError**

    This exception will be raised when any error occurs during this operation.

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
