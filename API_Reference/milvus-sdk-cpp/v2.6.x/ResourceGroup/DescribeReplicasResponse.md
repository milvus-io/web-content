# DescribeReplicasResponse

This class represents replica topology returned by `DescribeReplicas()`.

```cpp
const DescribeReplicasResponse& response = resp;
```

**METHODS:**

- `const std::vector<ReplicaInfo>& Replicas() const`

    Returns replica entries, including shard leaders and node placement details.

## Example

```cpp
milvus::DescribeReplicasResponse response;
status = client->DescribeReplicas(request, response);
for (const auto& replica : response.Replicas()) {
    std::cout << replica.ReplicaID() << std::endl;
}
```
