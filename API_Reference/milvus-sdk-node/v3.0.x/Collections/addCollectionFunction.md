# addCollectionFunction()

<div class="alert warning">

**Deprecated.**

This method is deprecated. Use [addFunctionField()](addFunctionField.md) instead.

</div>

This operation adds a custom function to an existing collection.

```javascript
await milvusClient.addCollectionFunction(data: AddCollectionFunctionReq)
```

## Request Syntax

```javascript
await milvusClient.addCollectionFunction({
    collection_name: string,
    function: FunctionObject,
    db_name?: string,
    timeout?: number,
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection to add the function to.

- **function** (*[FunctionObject](FunctionObject.md)*) -

    **[REQUIRED]**

    The function to add to the collection. See [FunctionObject](FunctionObject.md).

- **db_name** (*string*) -

    The name of the database where the collection resides.

- **timeout** (*number*) -

    The timeout duration in milliseconds for this operation.

**RETURNS:**

*Promise<ResStatus>*

This method returns a promise that resolves to a **ResStatus** object.

**EXCEPTIONS:**

- **Error**

    This exception will be raised when any error occurs during this operation.

## Example

```javascript
import { MilvusClient, FunctionType } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const resStatus = await milvusClient.addCollectionFunction({
    collection_name: 'my_collection',
    function: {
        name: 'my_bm25_function',
        description: 'BM25 sparse embedding function',
        type: FunctionType.BM25,
        input_field_names: ['text'],
        output_field_names: ['sparse_vector'],
        params: {},
    },
});
```

