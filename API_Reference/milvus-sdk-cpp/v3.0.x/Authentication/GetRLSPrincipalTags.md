# GetRLSPrincipalTags()

Gets the stored row-level-security tags for one principal in a collection.

```cpp
Status GetRLSPrincipalTags(const GetRLSPrincipalTagsRequest& request, GetRLSPrincipalTagsResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::GetRLSPrincipalTagsRequest()
    .WithDatabaseName("default")
    .WithCollectionName("messages")
    .WithPrincipalName("tenant-a");
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database name. Use the default database when it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Sets the database name. Use the default database when it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection whose principal tags are queried.

- `SetCollectionName(const std::string& collection_name)`

    Sets the collection whose principal tags are queried.

- `WithPrincipalName(const std::string& principal_name)`

    Sets the principal whose tags are returned.

- `SetPrincipalName(const std::string& principal_name)`

    Sets the principal whose tags are returned.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded.

- **response** (*GetRLSPrincipalTagsResponse*) -

    - **Tags** (*const nlohmann::json&*) -

        Returns the principal tag object.

    - **PrincipalName** (*const std::string&*) -

        Returns the principal name.

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
milvus::GetRLSPrincipalTagsRequest request;
request.WithCollectionName("messages").WithPrincipalName("tenant-a");
milvus::GetRLSPrincipalTagsResponse response;
status = client->GetRLSPrincipalTags(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << response.Tags().dump() << '\n';
```
