---
id: replica.md
summary: Learn about in-memory replica in Milvus.
---

# In-Memory Replica

This topic introduces the basic idea of in-memory replica in Milvus 2.1.

Milvus 2.1 supports loading collection or partitions as multiple replicas so that you can leverage extra CPU and memory resources of query nodes to increase the overall QPS (query per second) and throughput.


With in-memory replica, you can scale out the Milvus service with extra hardware.

## Relevant concepts

The following concepts can help you better understand the in-memory replica feature.

### Replica group

A replica group consists of multiple query nodes and is responsible for handling historical replicas, namely replicas of sealed segments.

### Shard replica

A shard replica consists of a streaming replica and a historical replica. One shard replica corresponds to one shard or DML (data manipulation language) channel.  Multiple shard replicas altogether form a replica group. The number of shard replicas in a replica group is determined by the number of shards in a specified collection.

### Streaming replica

A streaming replica consists of all the growing segments from one single DML channel. Generally, a streaming replica is handled by one single query node in a replica.

### Historical replica

A historical replica consists of all the sealed segments from one single DML channel. Segments of a historical replica can be distributed on multiple query nodes that belong to the same replica group.

### Shard leader

A shard leader is a query node that handles the streaming replica of the shard.

## Enable in-memory replica

<div class="alert note">

Currently, you can specify the number of replica groups into which the online query nodes are divided. All replica groups should have the memory to load at least one replica of the provided collection. Otherwise, an error occurs.

</div>

1. Call `collection.load()` to load a collection and specify the value of `replica_number`. The example below load a collection as two replicas.

```
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
collection.load(replica_number=2) # load collection as 2 replicas
```

2. Call `collection.get_replicas()` to get replica information.

```
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
collection.load(replica_number=2) # load collection as 2 replicas
result = collection.get_replicas()
print(result)
```

The replica groups and the information of the corresponding query nodes and shard are returned. The following is an example of the returned results.

```
Replica groups:
- Group: <group_id:432993548983599112>, <group_nodes:(4, 4)>, <shards:[Shard: <channel_name:by-dev-rootcoord-dml_1_432996419335618561v0>, <shard_leader:4>, <shard_nodes:[4]>, Shard: <channel_name:by-dev-rootcoord-dml_2_432996419335618561v1>, <shard_leader:4>, <shard_nodes:[4]>]>
```

<div class="alert note">
Enabling in-memory replica does not affect search or query operations.
</div>
