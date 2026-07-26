# ShardReplica

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

## Example

```cpp
for (const auto& shard : replica.ShardReplicas()) {
    std::cout << shard.ChannelName() << " -> " << shard.LeaderID() << std::endl;
}
```
