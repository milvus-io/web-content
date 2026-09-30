# removeFileResource()

This operation removes a file resource from Milvus metadata.

```javascript
await milvusClient.removeFileResource(data)
```

## Request Syntax

```javascript
await milvusClient.removeFileResource({
    name: string,
    timeout?: number
})
```

**PARAMETERS:**

- **name** (*string*) -

    **[REQUIRED]**

    The name of the file resource to remove.

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

const resStatus = await milvusClient.removeFileResource({
    name: 'embedding_model',
});
```
