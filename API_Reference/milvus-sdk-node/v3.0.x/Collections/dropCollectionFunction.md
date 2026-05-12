# dropCollectionFunction()

This operation removes a custom function from an existing collection.

```javascript
await milvusClient.dropCollectionFunction(data: DropCollectionFunctionReq)
```

## Request Syntax

```javascript
dropCollectionFunction({
    collection_name: string,
    function_name: string,
    db_name: string,
    timeout: number
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection containing the function to remove.

- **function_name** (*string*) -

    **[REQUIRED]**

    The name of the function to drop.

- **db_name** (*string*) -

    The name of the database where the collection resides. Optional.

- **timeout** (*number*) -

    The timeout duration in milliseconds for this operation. Optional.

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
const resStatus = await milvusClient.dropCollectionFunction({
    collection_name: 'my_collection',
    function_name: 'my_function'
});
```
