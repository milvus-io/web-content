# upsert()

This operation inserts or updates data in a specific collection.

```javascript
await milvusClient.upsert(data)
```

## Request Syntax

```javascript
await milvusClient.upsert({
    db_name?: string,
    collection_name: string,
    data: RowData[],
    hash_keys?: number[],
    partial_update?: boolean,
    partition_name?: string,
    timeout?: number,
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **data** (*RowData[]*) -

    **[REQUIRED]**

    The data to upsert. Each element is a plain JavaScript object whose keys match the field names of the collection schema. Entities whose primary key matches an existing record are updated; otherwise a new entity is inserted.

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **hash_keys** (*number[]*) -

    Reserved for internal use. Do not set this parameter unless explicitly required.

- **partial_update** (*boolean*) -

    Whether to enable partial update. When set to `true`, you can include only the fields that need updating in `data`; fields not included retain their existing values.

- **partition_name** (*string*) -

    The name of a partition in the current collection. If specified, the data is upserted into that partition.

- **timeout** (*number*) -

    The timeout duration for this operation. Setting this to `None` indicates that this operation times out when any response arrives or any error occurs.

**RETURNS:**

*Promise\<MutationResult\>*

This method returns a promise that resolves to a `MutationResult` object.

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

// Upsert a single entity
const result = await milvusClient.upsert({
    collection_name: 'my_collection',
    data: {
        id: 0,
        vector: [0.62, 0.59, 0.85, 0.93, -0.42],
        color: 'grass-green',
    },
});

// Upsert multiple entities
const result2 = await milvusClient.upsert({
    collection_name: 'my_collection',
    data: [
        { id: 1, vector: [0.37, -0.94, 0.92, 0.50, -0.56], color: 'mud-brown' },
        { id: 2, vector: [0.47, -0.53, -0.83, 0.98, 0.63], color: 'violet-purple' },
    ],
});

console.log(result2.upsert_cnt);
```
