# getVersion()

This operation returns version information for the Milvus server.

```javascript
await milvusClient.getVersion()
```

**RETURNS** *Promise<GetVersionResponse>*

This method returns a promise that resolves to a **GetVersionResponse** object.

```javascript
{
    version: string
}
```

**PARAMETERS:**

- **version** (*string*) -

    The semantic version of the Milvus server (for example, **"v3.0.0"**).

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
