# describeReplicas()

This operation returns information about the replicas of a specific collection.

```java
public DescribeReplicasResp describeReplicas(DescribeReplicasReq request)
```

## Request Syntax

```java
describeReplicas(DescribeReplicasReq.builder()
    .databaseName(String alias)
    .collectionName(String collectionName)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String alias)`

    The name of the database that holds the target collection.

- `collectionName(String collectionName)`

    The name of the target collection.

**RETURN TYPE:**

*DescribeReplicasResp*

**RETURN TYPE:**

*DescribeReplicasResp*

**RETURNS:**

A DescribeReplicasResp that contains detailed information about the replicas in the specified collection.

- `getReplicas()` (*List<ReplicaInfo>*) -

    A list of replicas, each of which contains the following getters:

    - `getReplicaID()` (*Long*) -

        The ID of a replica.

    - `getCollectionID()` (*Long*) -

        The ID of the specified collection.

    - `getPartitionIDs()` (*List<Long>*) -

        The IDs of partitions associated with the current replica.

    - `getShardReplicas()` (*List\<ShardReplica\>*) -

        The shards associated with the current replica. Each of the shards contains the following information:

        - `getLeaderID()` (*Long*) -

            The ID of the leader shard

        - `getLeaderAddress()` (*String*) -

            The address of the leader shard in the form of `IP:PORT`.

        - `getChannelName()` (*String*) -

            The name of the channel associated with the current shard.

        - `getNodeIDs()` (*List<Long>*) -

            The IDs of the query nodes associated with the current shard.

    - `getNodeIDs()` (*List<Long>*) -

        The IDs of the query nodes associated with the current replica.

    - `getResourceGroupName()` (*String*) -

        The name of the resource group associated with the current replica.

    - `getNumOutboundNode()` (*Map<String, Integer>*) -

        The number of outbound query nodes.

**EXCEPTIONS