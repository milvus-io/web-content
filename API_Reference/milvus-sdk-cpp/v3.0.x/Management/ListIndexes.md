# ListIndexes()

This operation gets the index names of a collection.

```cpp
Status ListIndexes(const ListIndexesRequest& request, ListIndexesResponse& response)
```

## Request Syntax

```cpp
auto request = ListIndexesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFieldName(field_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

- `WithFieldName(const std::string& field_name)`

    Sets the field name. If it is empty, indexes of all fields are returned.

- `SetFieldName(const std::string& field_name)`

    Set the field name. If empty, indexes of all fields are returned.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. The index names are carried in the response object.

- **response** (*ListIndexesResponse*) -

    - **IndexNames** (*const std::vector<std::string>&*) -

        Get index names.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details. See [StatusCode](../Client/StatusCode.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::ListIndexesResponse response;
status = client->ListIndexes(
    milvus::ListIndexesRequest()
        .WithCollectionName("my_collection"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& index_name : response.IndexNames()) {
    std::cout << "Index: " << index_name << std::endl;
}
```
