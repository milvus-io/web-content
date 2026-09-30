# DescribeReplicas()

This operation returns replica topology details, including shard leaders and node placement. Use it to inspect resource-group balancing and serving layout.

```cpp
Status DescribeReplicas(const DescribeReplicasRequest& request, DescribeReplicasResponse& response)
```

## Request Syntax

```cpp
auto request = DescribeReplicasRequest()
    .WithCollectionName(collection_name)
    .WithDatabaseName(db_name);
```

### DescribeReplicasRequest

**REQUEST METHODS:**

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection whose replicas you want to inspect.

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database. If omitted, the default database is used.

**RETURNS:**

*Status* with *DescribeReplicasResponse*

### DescribeReplicasResponse

This class represents replica topology returned by `DescribeReplicas()`.

```cpp
const DescribeReplicasResponse& response = resp;
```

**METHODS:**

- `const std::vector<ReplicaInfo>& Replicas() const`

    Returns replica entries, including shard leaders and node placement details.

### ReplicaInfo

This class represents one collection replica entry returned by `DescribeReplicasResponse`.

```cpp
const ReplicaInfo& replica = response.Replicas()[0];
```

**METHODS:**

- `int64_t ReplicaID() const`

    Returns replica ID.

- `int64_t CollectionID() const`

    Returns collection ID.

- `const std::vector<int64_t>& PartitionIDs() const`

    Returns partition IDs served by this replica.

- `const std::vector<ShardReplica>& ShardReplicas() const`

    Returns shard-level routing and leader information.

- `const std::vector<int64_t>& NodeIDs() const`

    Returns node IDs participating in this replica.

- `const std::string& ResourceGroupName() const`

    Returns assigned resource group name.

- `const std::unordered_map<std::string, int32_t>& NumOutboundNode() const`

    Returns outbound node counts grouped by resource group.

### ShardReplica

This class represents one shard replica entry inside a `ReplicaInfo` object.

```cpp
const ShardReplica& shard = replica.ShardReplicas()[0];
```

**METHODS:**

- `int64_t LeaderID() const`

    Returns leader node ID for the shard.

- `const std::string& LeaderAddress() const`

    Returns network address of the shard leader.

- `const std::string& ChannelName() const`

    Returns DML channel name associated with the shard.

- `const std::vector<int64_t>& NodeIDs() const`

    Returns all nodes serving this shard replica.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for invalid collection names or unavailable replica metadata.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::DescribeReplicasResponse response;
status = client->DescribeReplicas(
    milvus::DescribeReplicasRequest()
        .WithCollectionName("my_collection"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& replica : response.Replicas()) {
    std::cout << replica.ReplicaID() << std::endl;
}
```
