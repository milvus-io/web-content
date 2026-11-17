# ListRowPolicies()

This operation lists the row policies of the specified collection. Row policies are supported since v2.6.9 or later.

```cpp
Status ListRowPolicies(const ListRowPoliciesRequest& request, ListRowPoliciesResponse& response)
```

## Request Syntax

```cpp
auto request = ListRowPoliciesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name; the default database is used when it is empty. Optional.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to list the row policies of.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded. On success, the ListRowPoliciesResponse carries the row policy definitions of the collection.

- **response** (*ListRowPoliciesResponse*) -

    - **Policies** (*const std::vector<RowPolicy>&*) -

        Get the row policies. Each `RowPolicy` has the following members.

        - **PolicyName** (*const std::string&*) -

            The name of the policy.

        - **PolicyType** (*RowPolicyType*) -

            The type of the policy, such as [RowPolicyType](RowPolicyType.md)::PERMISSIVE or [RowPolicyType](RowPolicyType.md)::RESTRICTIVE.

        - **Actions** (*const std::vector<RowPolicyAction>&*) -

            The row-bearing actions the policy applies to. See [RowPolicyAction](RowPolicyAction.md).

        - **UsingExpr** (*const std::string&*) -

            The filter expression that restricts which rows are visible to the action.

        - **CheckExpr** (*const std::string&*) -

            The expression that restricts which rows may be written by the action.

        - **Description** (*const std::string&*) -

            The description of the policy.

        - **CreatedAt** (*int64_t*) -

            The creation time of the policy in milliseconds; zero means unavailable.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

List the row policies of a collection after connecting a MilvusClientV2, and print each policy name.

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::ListRowPoliciesResponse response;
status = client->ListRowPolicies(
    milvus::ListRowPoliciesRequest().WithCollectionName("my_collection"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& policy : response.Policies()) {
    std::cout << "Policy: " << policy.PolicyName() << std::endl;
}
```
