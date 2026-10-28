# DeleteRLSPrincipalTags()

Deletes selected row-level-security tag keys for a principal, or deletes all tags when no key is specified.

```cpp
Status DeleteRLSPrincipalTags(const DeleteRLSPrincipalTagsRequest& request)
```

## Request Syntax

```cpp
auto request = milvus::DeleteRLSPrincipalTagsRequest()
    .WithDatabaseName("default")
    .WithCollectionName("messages")
    .WithPrincipalName("tenant-a")
    .WithTagKeys({"tier"});
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

    Sets the principal whose tags are deleted.

- `SetPrincipalName(const std::string& principal_name)`

    Sets the principal whose tags are deleted.

- `WithTagKeys(std::vector<std::string>&& tag_keys)`

    Sets the tag keys to delete. Leave the vector empty to delete every tag for the principal.

- `SetTagKeys(std::vector<std::string>&& tag_keys)`

    Sets the tag keys to delete. Leave the vector empty to delete every tag for the principal.

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
auto request = milvus::DeleteRLSPrincipalTagsRequest()
    .WithCollectionName("messages")
    .WithPrincipalName("tenant-a")
    .WithTagKeys({"tier"});
status = client->DeleteRLSPrincipalTags(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
