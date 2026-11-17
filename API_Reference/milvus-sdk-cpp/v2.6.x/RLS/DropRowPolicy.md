# DropRowPolicy()

This operation drops a row policy by name from a collection. Dropping a missing policy succeeds. Row policies are supported since v2.6.9 or later.

```cpp
Status DropRowPolicy(const DropRowPolicyRequest& request)
```

## Request Syntax

```cpp
auto request = DropRowPolicyRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPolicyName(policy_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name; the default database is used when it is empty. Optional.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection that owns the row policy.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

- `WithPolicyName(const std::string& policy_name)`

    Sets the name of the row policy to drop.

- `SetPolicyName(const std::string& policy_name)`

    Set the policy name.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

Drop a row policy after connecting a MilvusClientV2; dropping a missing policy succeeds.

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->DropRowPolicy(milvus::DropRowPolicyRequest()
    .WithCollectionName("my_collection")
    .WithPolicyName("east_region_policy"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
