# dropAllResourceGroups()

This operation drops all resource groups and transfers all nodes back to the default resource group.

```javascript
await milvusClient.dropAllResourceGroups()
```

**RETURNS:**

*Promise<ResStatus[]>*

An array of response statuses, one for each dropped resource group. Each entry is a **ResStatus** with the following members.

```javascript
{
    code: number,
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

**EXCEPTIONS:**

- **Error**

    This exception will be raised when any error occurs during this operation.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});
const results = await client.dropAllResourceGroups();
```
