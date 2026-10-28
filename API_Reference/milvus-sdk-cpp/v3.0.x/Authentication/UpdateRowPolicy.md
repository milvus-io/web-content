# UpdateRowPolicy()

Replaces the definition of a named row policy while preserving its server-side identity.

```cpp
Status UpdateRowPolicy(const UpdateRowPolicyRequest& request)
```

## Request Syntax

```cpp
auto request = milvus::RowPolicyRequest()
    .WithDatabaseName("default")
    .WithCollectionName("messages")
    .WithPolicyName("tenant_read_only")
    .WithPolicyType(milvus::RowPolicyType::PERMISSIVE)
    .WithActions({milvus::RowPolicyAction::QUERY,
                  milvus::RowPolicyAction::SEARCH})
    .WithUsingExpr("tenant_id == \"tenant-a\"")
    .WithDescription("Allow tenant-a to read its rows");
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database name. Use the default database when it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Sets the database name. Use the default database when it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection to which the policy applies.

- `SetCollectionName(const std::string& collection_name)`

    Sets the collection to which the policy applies.

- `WithPolicyName(const std::string& policy_name)`

    Sets the unique policy name within the collection.

- `SetPolicyName(const std::string& policy_name)`

    Sets the unique policy name within the collection.

- `WithPolicyType(RowPolicyType policy_type)`

    Sets the policy type. See [RowPolicyType](RowPolicyType.md).

- `SetPolicyType(RowPolicyType policy_type)`

    Sets the policy type. See [RowPolicyType](RowPolicyType.md).

- `WithActions(std::vector<RowPolicyAction>&& actions)`

    Sets the row-bearing operations to which the policy applies. See [RowPolicyAction](RowPolicyAction.md).

- `SetActions(std::vector<RowPolicyAction>&& actions)`

    Sets the row-bearing operations to which the policy applies. See [RowPolicyAction](RowPolicyAction.md).

- `WithUsingExpr(const std::string& expr)`

    Sets the filter expression that controls which existing rows are visible.

- `SetUsingExpr(const std::string& expr)`

    Sets the filter expression that controls which existing rows are visible.

- `WithCheckExpr(const std::string& expr)`

    Sets the expression that controls which new or changed rows may be written.

- `SetCheckExpr(const std::string& expr)`

    Sets the expression that controls which new or changed rows may be written.

- `WithDescription(const std::string& description)`

    Sets an optional human-readable description.

- `SetDescription(const std::string& description)`

    Sets an optional human-readable description.

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
auto request = milvus::RowPolicyRequest()
    .WithDatabaseName("default")
    .WithCollectionName("messages")
    .WithPolicyName("tenant_read_only")
    .WithPolicyType(milvus::RowPolicyType::PERMISSIVE)
    .WithActions({milvus::RowPolicyAction::QUERY, milvus::RowPolicyAction::SEARCH})
    .WithUsingExpr("tenant_id == \"tenant-b\"");
status = client->UpdateRowPolicy(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
