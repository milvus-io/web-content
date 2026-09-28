# alterRole()

This operation updates the description of an existing role.

```javascript
await milvusClient.alterRole(data)
```

## Request Syntax

```javascript
await milvusClient.alterRole({
    roleName: string,
    description: string,
    timeout?: number
})
```

**PARAMETERS:**

- **roleName** (*string*) -

    **[REQUIRED]**

    The name of the role to alter.

- **description** (*string*) -

    **[REQUIRED]**

    The new description of the role.

- **timeout** (*number*) -

    The timeout duration in milliseconds for this operation.

**RETURNS:**

*Promise\<ResStatus\>*

**EXCEPTIONS:**

- **MilvusError**

    This exception will be raised when any error occurs during this operation.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const resStatus = await milvusClient.alterRole({
    roleName: 'my_role',
    description: 'Role updated description',
});
```
