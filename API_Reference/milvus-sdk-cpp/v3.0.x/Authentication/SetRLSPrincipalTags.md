# SetRLSPrincipalTags()

Incrementally upserts a non-empty mapping of row-level-security principal tags for a collection. Keys omitted from the request retain their existing values.

```cpp
Status SetRLSPrincipalTags(const SetRLSPrincipalTagsRequest& request)
```

## Request Syntax

```cpp
auto request = milvus::SetRLSPrincipalTagsRequest()
    .WithDatabaseName("default")
    .WithCollectionName("messages")
    .WithPrincipalName("tenant-a")
    .WithTags(nlohmann::json{{"tenant_id", "tenant-a"}, {"tier", {"gold"}}}});
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database name. Use the default database when it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Sets the database name. Use the default database when it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection to which the principal tags apply.

- `SetCollectionName(const std::string& collection_name)`

    Sets the collection to which the principal tags apply.

- `WithPrincipalName(const std::string& principal_name)`

    Sets the application-level principal name.

- `SetPrincipalName(const std::string& principal_name)`

    Sets the application-level principal name.

- `WithTags(nlohmann::json tags)`

    Sets the tags to upsert. The object must be non-empty; values may be strings, finite numbers, or one-dimensional arrays of strings or numbers.

- `SetTags(nlohmann::json tags)`

    Sets the tags to upsert. The object must be non-empty; values may be strings, finite numbers, or one-dimensional arrays of strings or numbers.

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
auto request = milvus::SetRLSPrincipalTagsRequest()
    .WithCollectionName("messages")
    .WithPrincipalName("tenant-a")
    .WithTags(nlohmann::json{{"tenant_id", "tenant-a"}});
status = client->SetRLSPrincipalTags(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
