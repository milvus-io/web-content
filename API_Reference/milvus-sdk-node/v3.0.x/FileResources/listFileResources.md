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

*Promise<ListFileResourcesResponse>*

This method returns a promise that resolves to a **ListFileResourcesResponse** object.

```javascript
{
    resources: FileResourceInfo[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **resources** (*FileResourceInfo[]*) -

    A list of file resources registered in Milvus metadata.

    - **id** (*string*) -

        The internal ID of the file resource.

    - **name** (*string*) -

        The name of the file resource.

    - **path** (*string*) -

        The path of the file resource.

- **status** (*ResStatus*) -

    A **ResStatus** object.

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

const res = await milvusClient.listFileResources();
```
