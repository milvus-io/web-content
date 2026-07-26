# BatchDescribeCollections()

This operation retrieves schema and configuration metadata for a batch of collections. Use it to reduce round trips when inspecting many collections at once.

```cpp
Status BatchDescribeCollections(const BatchDescribeCollectionsRequest& request, BatchDescribeCollectionsResponse& response)
```

## Request Syntax

```cpp
auto request = BatchDescribeCollectionsRequest()
    .WithDatabaseName(db_name)
    .AddCollectionName("collection_a")
    .AddCollectionName("collection_b");
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database containing the target collections.

- `WithCollectionNames(std::vector<std::string>&& collection_names)`

    Sets the full list of collection names to describe.

- `AddCollectionName(const std::string& collection_name)`

    Appends one collection name to the request list.

- `WithCollectionIDs(std::vector<int64_t>&& collection_ids)`

    Sets the full list of collection IDs to describe.

- `AddCollectionID(int64_t collection_id)`

    Appends one collection ID to the request list.

**RETURNS:**

*Status* with *[BatchDescribeCollectionsResponse](BatchDescribeCollectionsResponse.md)*

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for invalid database, missing collections, or permission failures.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::BatchDescribeCollectionsResponse response;
status = client->BatchDescribeCollections(
    milvus::BatchDescribeCollectionsRequest()
        .WithDatabaseName("default")
        .AddCollectionName("books")
        .AddCollectionName("movies"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& desc : response.Descs()) {
    std::cout << desc.CollectionName() << std::endl;
}
```
