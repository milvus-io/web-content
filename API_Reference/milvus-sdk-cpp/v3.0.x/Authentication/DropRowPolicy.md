# DropRowPolicy()

Drops a row policy by name. Dropping a policy that does not exist succeeds.

```cpp
Status DropRowPolicy(const DropRowPolicyRequest& request)
```

## Request Syntax

```cpp
auto request = milvus::DropRowPolicyRequest()
    .WithDatabaseName("default")
    .WithCollectionName("messages")
    .WithPolicyName("tenant_read_only");
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database name. Use the default database when it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Sets the database name. Use the default database when it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection that owns the policy.

- `SetCollectionName(const std::string& collection_name)`

    Sets the collection that owns the policy.

- `WithPolicyName(const std::string& policy_name)`

    Sets the policy to drop.

- `SetPolicyName(const std::string& policy_name)`

    Sets the policy to drop.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>

auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
auto request = milvus::DropRowPolicyRequest()
    .WithDatabaseName("default")
    .WithCollectionName("messages")
    .WithPolicyName("tenant_read_only");
status = client->DropRowPolicy(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
