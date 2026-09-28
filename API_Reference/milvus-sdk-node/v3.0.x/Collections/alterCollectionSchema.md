# alterCollectionSchema()

This operation alters a collection schema by adding a function-backed output field. For vector function outputs, provide bound-index metadata with an explicit `index_type`; Milvus creates the bound index atomically with the schema change.

```javascript
await milvusClient.alterCollectionSchema(data)
```

## Request Syntax

```javascript
await milvusClient.alterCollectionSchema({
    collection_name: string,
    field: FieldType,
    function: FunctionObject,
    index_name?: string,
    extra_params?: Record<string, any>,
    db_name?: string,
    timeout?: number
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection to alter.

- **field** (*FieldType*) -

    **[REQUIRED]**

    The schema of the function output field to add.

- **function** (*FunctionObject*) -

    **[REQUIRED]**

    The function schema to add.

- **index_name** (*string*) -

    The name of the bound index for the new field.

- **extra_params** (*Record<string, any>*) -

    Additional field metadata.

- **db_name** (*string*) -

    The name of the database where the collection resides.

- **timeout** (*number*) -

    The timeout duration in milliseconds for this operation.

**RETURNS:**

*Promise\<AlterCollectionSchemaResponse\>*

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

const res = await milvusClient.alterCollectionSchema({
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
});
```
