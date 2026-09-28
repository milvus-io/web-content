# dropCollectionField()

This operation drops a field from an existing collection by name or ID.

```javascript
await milvusClient.dropCollectionField(data)
```

## Request Syntax

```javascript
await milvusClient.dropCollectionField({
    collection_name: string,
    field_name?: string,
    field_id?: number | string,
    db_name?: string,
    timeout?: number
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection that holds the field.

- **field_name** (*string*) -

    The name of the field to drop. Provide either `field_name` or `field_id`, not both.

- **field_id** (*number* | *string*) -

    The ID of the field to drop. Provide either `field_name` or `field_id`, not both.

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

const resStatus = await milvusClient.dropCollectionField({
    collection_name: 'my_collection',
    field_name: 'sparse_vector',
});
```
