# getVersion()

This operation returns version information for the Milvus server.

```javascript
await milvusClient.getVersion()
```

**RETURNS:**

*Promise\<GetVersionResponse\>*

The response contains the version string of the connected server.

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
const res = await client.getVersion();
console.log(res.version); // "2.6.9"
```
