# addFunctionField()

This operation adds a function-backed vector field and its bound index to an existing collection.

```javascript
await milvusClient.addFunctionField(data)
```

## Request Syntax

```javascript
await milvusClient.addFunctionField({
    collection_name: string,
    field: FieldType,
    function: FunctionObject,
    index_name?: string,
    extra_params: FunctionFieldIndexParams,
    db_name?: string,
    timeout?: number
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection to add the function-backed field to.

- **field** (*FieldType*) -

    **[REQUIRED]**

    The schema of the function output field. For the full field reference, see the FieldType section in [createCollection](createCollection.md).

- **function** (*FunctionObject*) -

    **[REQUIRED]**

    The function schema. For the full function reference, see the FunctionObject section in [addCollectionFunction](addCollectionFunction.md).

- **index_name** (*string*) -

    The name of the bound index for the new field.

- **extra_params** (*FunctionFieldIndexParams*) -

    **[REQUIRED]**

    The bound-index metadata, which must provide an explicit `index_type`. `AUTOINDEX` is not supported.

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
import { MilvusClient, DataType, FunctionType } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const resStatus = await milvusClient.addFunctionField({
    collection_name: 'my_collection',
    field: {
        name: 'sparse_vector',
        data_type: DataType.SparseFloatVector,
        is_function_output: true,
    },
    function: {
        name: 'my_bm25_function',
        type: FunctionType.BM25,
        input_field_names: ['text'],
        output_field_names: ['sparse_vector'],
        params: {},
    },
    index_name: 'sparse_vector_index',
    extra_params: {
        index_type: 'SPARSE_INVERTED_INDEX',
        params: { metric_type: 'BM25' },
    },
});
```
