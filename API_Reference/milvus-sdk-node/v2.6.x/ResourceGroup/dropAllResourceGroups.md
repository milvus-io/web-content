# dropAllResourceGroups()

This operation drops all resource groups and transfers all nodes back to the default resource group.

```javascript
await milvusClient.dropAllResourceGroups()
```

**RETURNS:**

*Promise\<ResStatus[]\>*

An array of response statuses, one for each dropped resource group.

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
const results = await client.dropAllResourceGroups();
```
