# getReplicas()

This operation gets replicas of a collection, returning information about each replica including its ID, node assignments, and shard details.

```javascript
await milvusClient.getReplicas(data: GetReplicaReq)
```

## Request Syntax

```javascript
await milvusClient.getReplicas({
    collectionID: number | string,
    with_shard_nodes?: boolean,
    timeout?: number,
})
```

**PARAMETERS:**

- **collectionID** (*number | string*) -

    **[REQUIRED]**

    The ID of the collection.

- **with_shard_nodes** (*boolean*) -

    Whether to include shard node information in the response. Optional.

- **timeout** (*number*) -

    RPC timeout in milliseconds. Optional.

**RETURNS:**

*Promise\<ReplicasResponse\>*

The response contains a `replicas` array with replica details including ID, partition IDs, shard replicas, and node IDs.

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
const desc = await client.describeCollection({ collection_name: 'my_collection' });
const replicas = await client.getReplicas({
    collectionID: desc.collectionID,
});
console.log(replicas.replicas);
```
