# addFileResource()

This operation registers a file resource with Milvus. Use it when server-side features need a named file resource.

```javascript
await milvusClient.addFileResource(data)
```

## Request Syntax

```javascript
await milvusClient.addFileResource({
    name: string,
    path: string,
    timeout?: number
})
```

**PARAMETERS:**

- **name** (*string*) -

    **[REQUIRED]**

    The unique name of the file resource.

- **path** (*string*) -

    **[REQUIRED]**

    The server-visible file path of the resource.

- **timeout** (*number*) -

    The timeout duration in milliseconds for this operation.

**RETURNS:**

*Promise<ResStatus>*

This method returns a promise that resolves to a **ResStatus** object.

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

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const resStatus = await milvusClient.addFileResource({
    name: 'embedding_model',
    path: '/models/embedding.bin',
});
```
