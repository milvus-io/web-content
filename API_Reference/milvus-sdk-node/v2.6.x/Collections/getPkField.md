# getPkField()

This operation gets the complete primary field schema of a collection. This is a convenient method that describes the collection and extracts the primary key field.

```javascript
await milvusClient.getPkField(data: DescribeCollectionReq)
```

## Request Syntax

```javascript
getPkField({
    collection_name: string,
    timeout: number
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection.

- **timeout** (*number*) -

    RPC timeout in milliseconds. Optional.

**RETURNS:**

*Promise\<FieldSchema\>*

The complete field schema object for the primary key, including name, data type, field ID, and other properties.

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
