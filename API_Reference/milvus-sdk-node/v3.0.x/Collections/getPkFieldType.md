# getPkFieldType()

This operation returns the primary key field's data type for a collection. This is a convenient method that describes the collection and extracts the primary key field type.

```javascript
await milvusClient.getPkFieldType(data: DescribeCollectionReq)
```

## Request Syntax

```javascript
getPkFieldType({
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

*Promise\<keyof typeof DataType\>*

The data type of the primary key field (e.g., `"Int64"`, `"VarChar"`).

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});
const pkType = await client.getPkFieldType({
    collection_name: 'my_collection',
});
console.log(pkType); // e.g., "Int64"
```

