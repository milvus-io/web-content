# loadCollectionAsync()

This operation loads collection data into query nodes, then you can do vector search on this collection. This is an async function — use `getLoadState()` or `getLoadingProgress()` to check loading status.

```javascript
await milvusClient.loadCollectionAsync(data: LoadCollectionReq)
```

## Request Syntax

```javascript
await milvusClient.loadCollectionAsync({
    collection_name: string,
    db_name?: string,
    replica_number?: number,
    resource_groups?: string[],
    refresh?: boolean,
    load_fields?: string[],
    skip_load_dynamic_field?: boolean,
    timeout?: number,
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection to load.

- **db_name** (*string*) -

    The name of the database. Optional.

- **replica_number** (*number*) -

    The number of replicas to load. Optional.

- **resource_groups** (*string[]*) -

    Resource group names for load balancing. Optional.

- **refresh** (*boolean*) -

    Whether to refresh loading to include new fields. Optional.

- **load_fields** (*string[]*) -

    Specific field names to load. Optional.

- **skip_load_dynamic_field** (*boolean*) -

    Whether to skip loading the dynamic field. Optional.

- **timeout** (*number*) -

    RPC timeout in milliseconds. Optional.

**RETURNS:**

*Promise\<ResStatus\>*

**EXCEPTIONS:**

- **MilvusError**

    This exception will be raised when any error occurs during this operation.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});
await client.loadCollectionAsync({
    collection_name: 'my_collection',
});

// Check loading progress
const state = await client.getLoadState({
    collection_name: 'my_collection',
});
```
