# addCollectionFunction()

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

- **function** (*FunctionObject*) -

    **[REQUIRED]**

    The function to add to the collection. For the full field reference, see the FunctionObject section below.

- **db_name** (*string*) -

    The name of the database where the collection resides.

- **timeout** (*number*) -

    The timeout duration in milliseconds for this operation.

**RETURNS:**

*Promise\<ResStatus\>*

**EXCEPTIONS:**

- **MilvusError**

    This exception will be raised when any error occurs during this operation.

## FunctionObject

A **FunctionObject** defines a server-side function that automatically transforms data into vector embeddings during insert and search.

**PARAMETERS:**

- **name** (*string*) -

    **[REQUIRED]**

    The name of the function. Used to reference the function within queries and collections.

- **type** (*FunctionType*) -

    **[REQUIRED]**

    The function type. Possible values: `FunctionType.BM25` (sparse embeddings from text using BM25), `FunctionType.TEXTEMBEDDING` (dense embeddings from text), `FunctionType.RERANK` (reranking function).

- **input_field_names** (*string[]*) -

    **[REQUIRED]**

    The names of the fields containing the raw data to transform. For `FunctionType.BM25`, exactly one field name is expected.

- **output_field_names** (*string[]*) -

    The names of the fields where the generated embeddings will be stored. For `FunctionType.BM25`, exactly one field name is expected.

- **params** (*object*) -

    Additional function parameters in key-value pairs.

- **description** (*string*) -

    A brief description of the function's purpose. Defaults to an empty string.

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

