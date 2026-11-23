# BatchDescribeCollections()

This operation fetches the full descriptions of multiple collections in a single call, selecting them by collection names, collection IDs, or both. Descriptions are returned through the response parameter, while the returned [Status](../Client/Status.md) reports whether the call succeeded.

```cpp
Status BatchDescribeCollections(const BatchDescribeCollectionsRequest& request, BatchDescribeCollectionsResponse& response)
```

## Request Syntax

```cpp
auto request = BatchDescribeCollectionsRequest()
    .WithDatabaseName(db_name)
    .WithCollectionNames(collection_names)
    .AddCollectionName(collection_name)
    .WithCollectionIDs(collection_ids)
    .AddCollectionID(collection_id);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the database that the target collections belong to.

- `SetDatabaseName(const std::string& db_name)`

    Set target database name.

- `WithCollectionNames(std::vector<std::string>&& collection_names)`

    Sets the collection names to describe.

- `SetCollectionNames(std::vector<std::string>&& collection_names)`

    Set collection names.

- `AddCollectionName(const std::string& collection_name)`

    Adds one collection name to the list of names to describe.

- `WithCollectionIDs(std::vector<int64_t>&& collection_ids)`

    Sets the collection IDs to describe.

- `SetCollectionIDs(std::vector<int64_t>&& collection_ids)`

    Set collection ids.

- `AddCollectionID(int64_t collection_id)`

    Adds one collection ID to the list of IDs to describe.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns one collection description ([CollectionDesc](CollectionDesc.md)) per requested collection name or ID in the response, each carrying that collection's schema and runtime details.

- **response** (*BatchDescribeCollectionsResponse*) -

    - **Descs** (*const std::vector<CollectionDesc>&*) -

        Get collection descriptions.
        See [CollectionDesc](CollectionDesc.md).

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

Build the request with a database name and collection names, pass both the request and a response object to BatchDescribeCollections(), then read the per-collection descriptions from Descs().

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::BatchDescribeCollectionsRequest()
    .WithDatabaseName("default")
    .WithCollectionNames(std::vector<std::string>{"book", "articles"})
    .AddCollectionName("films");
milvus::BatchDescribeCollectionsResponse response;
status = client->BatchDescribeCollections(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& desc : response.Descs()) {
    std::cout << desc.CollectionName() << ", shards: " << desc.NumShards() << std::endl;
}
```
