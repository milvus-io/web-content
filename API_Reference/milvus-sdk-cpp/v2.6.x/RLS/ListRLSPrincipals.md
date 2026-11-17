# ListRLSPrincipals()

This operation lists the principal names that have stored tags in the collection. Row-level security is supported since v2.6.9 or later.

```cpp
Status ListRLSPrincipals(const ListRLSPrincipalsRequest& request, ListRLSPrincipalsResponse& response)
```

## Request Syntax

```cpp
auto request = ListRLSPrincipalsRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name; the default database is used when it is empty. Optional.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to list the principals of.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded. On success, the ListRLSPrincipalsResponse carries the names of the principals that have stored tags in the collection.

- **response** (*ListRLSPrincipalsResponse*) -

    - **PrincipalNames** (*const std::vector<std::string>&*) -

        Get names of the principals that have stored tags in the collection.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

List the principals with stored tags in a collection after connecting a MilvusClientV2.

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::ListRLSPrincipalsResponse response;
status = client->ListRLSPrincipals(
    milvus::ListRLSPrincipalsRequest().WithCollectionName("my_collection"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& name : response.PrincipalNames()) {
    std::cout << "Principal: " << name << std::endl;
}
```
