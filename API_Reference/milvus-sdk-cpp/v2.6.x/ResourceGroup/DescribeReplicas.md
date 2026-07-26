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

**REQUEST METHODS:**

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection whose replicas you want to inspect.

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database. If omitted, the default database is used.

**RETURNS:**

*Status* with *[DescribeReplicasResponse](DescribeReplicasResponse.md)*

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
