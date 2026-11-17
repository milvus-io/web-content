# UpdateRowPolicy()

This operation replaces the definition of the named row policy, preserving its server-side identity. The policy must already exist. Row policies are supported since v2.6.9 or later.

```cpp
Status UpdateRowPolicy(const UpdateRowPolicyRequest& request)
```

## Request Syntax

```cpp
auto request = UpdateRowPolicyRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPolicyName(policy_name)
    .WithPolicyType(policy_type)
    .WithActions(std::move(actions))
    .WithUsingExpr(using_expr)
    .WithCheckExpr(check_expr)
    .WithDescription(description);
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

    Sets the name of the row policy to replace.

- `SetPolicyName(const std::string& policy_name)`

    Set the policy name.

- `WithPolicyType(RowPolicyType policy_type)`

    Sets the type of the row policy, such as [RowPolicyType](RowPolicyType.md)::PERMISSIVE or [RowPolicyType](RowPolicyType.md)::RESTRICTIVE.

- `SetPolicyType(RowPolicyType policy_type)`

    Set the policy type.

- `WithActions(std::vector<RowPolicyAction>&& actions)`

    Sets the row-bearing actions the policy applies to, such as [RowPolicyAction](RowPolicyAction.md)::QUERY or [RowPolicyAction](RowPolicyAction.md)::SEARCH. The setter takes an rvalue, so pass std::move(actions).

- `SetActions(std::vector<RowPolicyAction>&& actions)`

    Set the actions the policy applies to.

- `WithUsingExpr(const std::string& expr)`

    Sets the filter expression that restricts which rows are visible to the action. Optional.

- `SetUsingExpr(const std::string& expr)`

    Set the using expression.

- `WithCheckExpr(const std::string& expr)`

    Sets the expression that restricts which rows may be written by the action. Optional.

- `SetCheckExpr(const std::string& expr)`

    Set the check expression.

- `WithDescription(const std::string& description)`

    Sets the description of the policy. Optional.

- `SetDescription(const std::string& description)`

    Set the description.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

Replace the definition of an existing row policy, after connecting a MilvusClientV2.

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->UpdateRowPolicy(
    milvus::UpdateRowPolicyRequest()
        .WithCollectionName("my_collection")
        .WithPolicyName("east_region_policy")
        .WithPolicyType(milvus::RowPolicyType::PERMISSIVE)
        .WithActions(std::vector<milvus::RowPolicyAction>{milvus::RowPolicyAction::QUERY})
        .WithUsingExpr("region == \"east\" and channel == 1"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
