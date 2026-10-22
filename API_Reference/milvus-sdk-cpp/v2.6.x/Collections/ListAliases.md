# ListAliases()

This operation returns a list of all aliases associated with a collection.

```cpp
Status ListAliases(const ListAliasesRequest& request, ListAliasesResponse& response)
```

## Request Syntax

```cpp
auto request = ListAliasesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set database name in which the collection is created.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `SetCollectionName(const std::string& collection_name)`

    Set name of the collection.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. On success, the ListAliasesResponse carries the aliases associated with the collection.

- **response** (*ListAliasesResponse*) -

    - **DatabaseName** (*const std::string&*) -

        Get the database name where the aliases exist.

    - **CollectionName** (*const std::string&*) -

        Get the collection name with which the aliases are associated.

    - **Aliases** (*const std::vector<std::string>&*) -

        Get aliases.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::ListAliasesResponse response;
status = client->ListAliases(
    milvus::ListAliasesRequest()
        .WithCollectionName("my_collection"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& alias : response.Aliases()) {
    std::cout << "Alias: " << alias << std::endl;
}
```
