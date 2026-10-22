# ListIndexes()

This operation lists the names of all indexes on a collection. A collection with no indexes yields an empty result rather than an error.

```cpp
Status ListIndexes(const ListIndexesRequest& request, ListIndexesResponse& response)
```

## Request Syntax

```cpp
auto request = ListIndexesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name; the default database is used if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to list indexes for.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded, with the collection's index names carried in the ListIndexesResponse on success.

- **response** (*ListIndexesResponse*) -

    - **IndexNames** (*const std::vector<std::string>&*) -

        Get index names.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

Use ListIndexes() after connecting a MilvusClientV2 and read the index names from the response.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::ListIndexesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name);
milvus::ListIndexesResponse response;
status = client->ListIndexes(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
} else {
    for (const auto& index_name : response.IndexNames()) {
        std::cout << index_name << std::endl;
    }
}
```
