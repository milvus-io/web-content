# BatchDescribeCollections()

This operation fetches the full descriptions of multiple collections in a single call.

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

    Sets the name of the database that contains the collections to describe.

- `SetDatabaseName(const std::string& db_name)`

    Set target database name.

- `WithCollectionNames(std::vector<std::string>&& collection_names)`

    Sets the names of the collections to describe.

- `SetCollectionNames(std::vector<std::string>&& collection_names)`

    Set collection names.

- `AddCollectionName(const std::string& collection_name)`

    Adds the name of one collection to describe.

- `WithCollectionIDs(std::vector<int64_t>&& collection_ids)`

    Sets the IDs of the collections to describe.

- `SetCollectionIDs(std::vector<int64_t>&& collection_ids)`

    Set collection ids.

- `AddCollectionID(int64_t collection_id)`

    Adds the ID of one collection to describe.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a status indicating whether the operation succeeded. The response carries the full descriptions of the requested collections.

- **response** (*BatchDescribeCollectionsResponse*) -

    - **Descs** (*const std::vector<CollectionDesc>&*) -

        Get collection descriptions. Each entry is a `CollectionDesc` with the members documented on its own page.
        See [CollectionDesc](CollectionDesc.md).

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Call BatchDescribeCollections() on a connected MilvusClientV2 to fetch the full descriptions of several collections by name in a single request.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::BatchDescribeCollectionsRequest()
    .WithDatabaseName(db_name)
    .WithCollectionNames(std::move(collection_names))
    .AddCollectionName(collection_name);
milvus::BatchDescribeCollectionsResponse response;
status = client->BatchDescribeCollections(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto descs = response.Descs();
std::cout << "Described " << descs.size() << " collections" << std::endl;
```
