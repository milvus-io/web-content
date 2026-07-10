# ReplicaInfo

This class represents one collection replica entry returned by `DescribeReplicasResponse`.

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

## Example

