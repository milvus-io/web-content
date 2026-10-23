# DescribeReplicasAsync()

Describes the replicas of a loaded collection.

```csharp
public async Task<DescribeReplicasResp> DescribeReplicasAsync(DescribeReplicasReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DescribeReplicasReq
{
    CollectionName = "my_collection",
    WithShardNodes = true
};

DescribeReplicasResp result = await client.DescribeReplicasAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection.

- `WithShardNodes` (*bool*) -

    Whether to also return the query node IDs of each shard replica. Defaults to `true`.

**RETURN TYPE:**

*Task\<DescribeReplicasResp\>*

**RETURNS:**

A **DescribeReplicasResp** object that contains the replicas of the collection.

```csharp
DescribeReplicasResp
    Replicas   // -> IReadOnlyList<ReplicaInfo>
```

**PARAMETERS:**

- **Replicas** (*IReadOnlyList\<ReplicaInfo\>*) -

    The replicas of the collection. Each **ReplicaInfo** contains the following members:

    - `ReplicaId` (*long*) -

        The ID of the replica.

    - `CollectionId` (*long*) -

        The ID of the collection to which the replica belongs.

    - `PartitionIds` (*IReadOnlyList\<long\>*) -

        The IDs of the partitions loaded on the replica. An empty list indicates the whole collection is loaded.

    - `ShardReplicas` (*IReadOnlyList\<ShardReplica\>*) -

        The shard replicas that serve the shard channels of the collection. Each **ShardReplica** contains the following members:

        - `LeaderId` (*long*) -

            The ID of the query node that leads this shard replica.

        - `LeaderAddress` (*string*) -

            The address (`IP:port`) of the leader query node.

        - `DmChannelName` (*string*) -

            The DM channel name served by this shard replica.

        - `NodeIds` (*IReadOnlyList\<long\>*) -

            The IDs of the query nodes that host this shard replica, including the leader. Only populated when the request asks for shard nodes.

    - `NodeIds` (*IReadOnlyList\<long\>*) -

        The IDs of the query nodes that host the replica, including the leaders.

    - `ResourceGroupName` (*string*) -

        The name of the resource group to which the replica belongs.

    - `NumOutboundNode` (*IReadOnlyDictionary\<string, int\>*) -

        The number of outbound query nodes contributed by each resource group.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Responses.Collection;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

DescribeReplicasResp result = await client.DescribeReplicasAsync(new DescribeReplicasReq
{
    CollectionName = "my_collection",
    WithShardNodes = true
});
```
