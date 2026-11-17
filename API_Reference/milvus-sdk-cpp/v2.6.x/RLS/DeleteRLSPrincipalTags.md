# DeleteRLSPrincipalTags()

This operation deletes the selected tag keys of a principal, or all of the principal's tags when no tag key is given. Row-level security is supported since v2.6.9 or later.

```cpp
Status DeleteRLSPrincipalTags(const DeleteRLSPrincipalTagsRequest& request)
```

## Request Syntax

```cpp
auto request = DeleteRLSPrincipalTagsRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPrincipalName(principal_name)
    .WithTagKeys(std::move(tag_keys));
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

    Sets the application-level principal name whose tags are deleted.

- `SetPrincipalName(const std::string& principal_name)`

    Set the application-level principal name.

- `WithTagKeys(std::vector<std::string>&& tag_keys)`

    Sets the tag keys to delete; an empty list deletes all tags of the principal. The setter takes an rvalue, so pass std::move(tag_keys). Optional.

- `SetTagKeys(std::vector<std::string>&& tag_keys)`

    Set the tag keys to delete; an empty list deletes all tags of the principal.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

Delete the `region` tag of a principal after connecting a MilvusClientV2; leaving TagKeys empty would delete all of the principal's tags.

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::vector<std::string> tag_keys{"region"};
status = client->DeleteRLSPrincipalTags(
    milvus::DeleteRLSPrincipalTagsRequest()
        .WithCollectionName("my_collection")
        .WithPrincipalName("alice")
        .WithTagKeys(std::move(tag_keys)));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
