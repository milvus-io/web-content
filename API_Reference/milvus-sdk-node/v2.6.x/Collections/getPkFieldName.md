# getPkFieldName()

This operation gets the primary key field name of a collection. This is a convenient method that describes the collection and extracts the primary key field name.

```javascript
await milvusClient.getPkFieldName(data: DescribeCollectionReq)
```

## Request Syntax

```javascript
getPkFieldName({
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

*Promise\<string\>*

The name of the primary key field.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});
const pkName = await client.getPkFieldName({
    collection_name: 'my_collection',
});
console.log(pkName); // e.g., "id"
```
