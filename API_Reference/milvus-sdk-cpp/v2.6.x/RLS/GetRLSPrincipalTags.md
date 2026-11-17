# GetRLSPrincipalTags()

This operation gets the stored tags of one principal for a collection. Row-level security is supported since v2.6.9 or later.

```cpp
Status GetRLSPrincipalTags(const GetRLSPrincipalTagsRequest& request, GetRLSPrincipalTagsResponse& response)
```

## Request Syntax

```cpp
auto request = GetRLSPrincipalTagsRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPrincipalName(principal_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name; the default database is used when it is empty. Optional.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection that holds the principal tags.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

- `WithPrincipalName(const std::string& principal_name)`

    Sets the application-level principal name whose tags are fetched.

- `SetPrincipalName(const std::string& principal_name)`

    Set the application-level principal name.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded. On success, the GetRLSPrincipalTagsResponse carries the decoded tags of the principal.

- **response** (*GetRLSPrincipalTagsResponse*) -

    - **Tags** (*const nlohmann::json&*) -

        Get the decoded principal tags. Values preserve integer, float, and array types.

    - **PrincipalName** (*const std::string&*) -

        Get the application-level principal name.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

Get the stored tags of a principal after connecting a MilvusClientV2.

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::GetRLSPrincipalTagsResponse response;
status = client->GetRLSPrincipalTags(
    milvus::GetRLSPrincipalTagsRequest()
        .WithCollectionName("my_collection")
        .WithPrincipalName("alice"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << response.Tags().dump() << std::endl;
```
