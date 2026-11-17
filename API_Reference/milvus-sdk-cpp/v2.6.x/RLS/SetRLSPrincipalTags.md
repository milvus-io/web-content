# SetRLSPrincipalTags()

This operation incrementally upserts a non-empty mapping of principal tags for one collection. Keys omitted from this call retain their values. Row-level security is supported since v2.6.9 or later.

```cpp
Status SetRLSPrincipalTags(const SetRLSPrincipalTagsRequest& request)
```

## Request Syntax

```cpp
auto request = SetRLSPrincipalTagsRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPrincipalName(principal_name)
    .WithTags(tags);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name; the default database is used when it is empty. Optional.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to set the principal tags on.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

- `WithPrincipalName(const std::string& principal_name)`

    Sets the application-level principal name whose tags are upserted.

- `SetPrincipalName(const std::string& principal_name)`

    Set the application-level principal name.

- `WithTags(nlohmann::json tags)`

    Sets the tags to upsert. The JSON object must be non-empty; values may be strings, finite numbers, or one-dimensional arrays of strings or numbers.

- `SetTags(nlohmann::json tags)`

    Set the tags to upsert. The JSON object must be non-empty; values may be strings, finite numbers, or one-dimensional arrays of strings or numbers.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

Upsert the tags of a principal after connecting a MilvusClientV2; keys omitted from this call retain their values.

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->SetRLSPrincipalTags(
    milvus::SetRLSPrincipalTagsRequest()
        .WithCollectionName("my_collection")
        .WithPrincipalName("alice")
        .WithTags(nlohmann::json{{"region", "east"}}));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
