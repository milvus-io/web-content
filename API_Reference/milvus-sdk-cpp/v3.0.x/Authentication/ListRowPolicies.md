# ListRowPolicies()

Lists the row policies defined for a collection.

```cpp
Status ListRowPolicies(const ListRowPoliciesRequest& request, ListRowPoliciesResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::ListRowPoliciesRequest()
    .WithDatabaseName("default")
    .WithCollectionName("messages");
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database name. Use the default database when it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Sets the database name. Use the default database when it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection whose policies are listed.

- `SetCollectionName(const std::string& collection_name)`

    Sets the collection whose policies are listed.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded.

- **response** (*ListRowPoliciesResponse*) -

    - **Policies** (*const std::vector<RowPolicy>&*) -

        Returns the policies. Each [RowPolicy](RowPolicy.md) carries its name, type, actions, expressions, description, and creation time.
        See [RowPolicy](RowPolicy.md).

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
milvus::ListRowPoliciesRequest request;
request.WithDatabaseName("default").WithCollectionName("messages");
milvus::ListRowPoliciesResponse response;
status = client->ListRowPolicies(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& policy : response.Policies()) {
    std::cout << policy.PolicyName() << '\n';
}
```
