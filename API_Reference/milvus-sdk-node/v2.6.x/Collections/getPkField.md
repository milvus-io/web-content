# getPkField()

This operation gets the complete primary field schema of a collection. This is a convenient method that describes the collection and extracts the primary key field.

```javascript
await milvusClient.getPkField(data: DescribeCollectionReq)
```

## Request Syntax

```javascript
getPkField({
    collection_name: string,
    db_name?: string,
    cache?: boolean,
    timeout: number
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection.

- **db_name** (*string*) -

    The name of the database that holds the collection.

- **cache** (*boolean*) -

    Whether to use the collection cache. When `true`, the cached schema is returned.

- **timeout** (*number*) -

    RPC timeout in milliseconds. Optional.

**RETURNS:**

*Promise<FieldSchema>*

The complete field schema object for the primary key, including name, data type, field ID, and other properties.

**PARAMETERS:**

- **fieldID** (*string* | *number*) -

    The ID of the field.

- **name** (*string*) -

    The name of the field.

- **data_type** (*keyof typeof DataType*) -

    The data type of the field, expressed as the key of the **DataType** enum.

- **dataType** (*DataType*) -

    The data type of the field, expressed as a **DataType** enum value.

- **is_primary_key** (*boolean*) -

    Whether the field serves as the primary key.

- **autoID** (*boolean*) -

    Whether the primary field automatically increments upon data insertions.

- **description** (*string*) -

    The description of the field.

- **state** (*string*) -

    The state of the field.

- **nullable** (*boolean*) -

    Whether the field allows NULL values.

- **is_partition_key** (*boolean*) -

    Whether the field serves as the partition key.

- **is_clustering_key** (*boolean*) -

    Whether the field serves as the clustering key.

- **is_function_output** (*boolean*) -

    Whether the field is the output of a function.

- **type_params** (*KeyValuePair[]*) -

    The type parameters of the field.

- **index_params** (*KeyValuePair[]*) -

    The index parameters of the field.

**EXCEPTIONS:**

- **Error**

    This exception is raised when any error occurs during this operation.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});
const pkField = await client.getPkField({
    collection_name: 'my_collection',
});
console.log(pkField.name, pkField.data_type);
```
