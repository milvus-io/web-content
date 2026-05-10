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

**RETURNS** *Promise<ReplicasResponse>*

This method returns a promise that resolves to a **ReplicasResponse** object.

```javascript
{
    replicas: ReplicaInfo[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **replicas** (*ReplicaInfo[]*) -
A list of replicas currently serving the requested collection.

    - **replicaID** (*string*) -

        The replica identifier.

    - **collectionID** (*string*) -

        The collection identifier.

    - **partition_ids** (*string[]*) -

        The partition identifiers covered by this replica.

    - **shard_replicas** (*ShardReplica[]*) -

        Per-shard leader and node assignment information.

        - **leaderID** (*string*) -

        The query node ID acting as the shard leader.

        - **leader_addr** (*string*) -

        The address of the leader query node.

        - **dm_channel_name** (*string*) -

        The DML channel served by this shard.

        - **node_ids** (*string[]*) -

        The query node IDs that hold this shard's data.

        - **leaderID** (*string*) -

            The query node ID acting as the shard leader.

        - **leader_addr** (*string*) -

            The address of the leader query node.

        - **dm_channel_name** (*string*) -

            The DML channel served by this shard.

        - **node_ids** (*string[]*) -

            The query node IDs that hold this shard's data.

    - **node_ids** (*string[]*) -

        The query node IDs that participate in this replica.

    - **resource_group_name** (*string*) -

        The resource group that owns this replica's nodes.

    - **num_outbound_node** (*Record<string, number>*) -

        The count of outbound nodes per resource group, used during rebalancing.

- **ResStatus**
A **ResStatus** object.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

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
