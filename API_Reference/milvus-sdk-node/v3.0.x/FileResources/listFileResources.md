# listFileResources()

This operation lists the file resources registered in Milvus metadata.

```javascript
await milvusClient.listFileResources(data?)
```

## Request Syntax

```javascript
await milvusClient.listFileResources({
    timeout?: number
})
```

**PARAMETERS:**

- **timeout** (*number*) -

    The timeout duration in milliseconds for this operation.

**RETURNS:**

*Promise\<ListFileResourcesResponse\>*

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

const res = await milvusClient.listFileResources();
```
