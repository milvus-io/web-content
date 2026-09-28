# dropFunctionField()

This operation drops a function and its output fields and indexes from a collection.

```javascript
await milvusClient.dropFunctionField(data)
```

## Request Syntax

```javascript
await milvusClient.dropFunctionField({
    collection_name: string,
    function_name: string,
    db_name?: string,
    timeout?: number
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection that holds the function.

- **function_name** (*string*) -

    **[REQUIRED]**

    The name of the function to drop.

- **db_name** (*string*) -

    The name of the database where the collection resides.

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

const resStatus = await milvusClient.dropFunctionField({
    collection_name: 'my_collection',
    function_name: 'my_bm25_function',
});
```
