# DescribeCollection()

This operation fetches the description of a collection, including its schema and properties.

```cpp
Status DescribeCollection(const DescribeCollectionRequest& request, DescribeCollectionResponse& response)
```

## Request Syntax

```cpp
auto request = DescribeCollectionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name);
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

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded. On success, the full collection description, including its schema and properties, is carried in the response.

- **response** (*DescribeCollectionResponse*) -

    - **Desc** (*const CollectionDesc&*) -

        Get collection description. The following members belong to `CollectionDesc`.
        See [CollectionDesc](CollectionDesc.md).

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Call DescribeCollection() on a connected MilvusClientV2 to fetch a collection's description, including its schema and properties, into a DescribeCollectionResponse.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::DescribeCollectionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name);
milvus::DescribeCollectionResponse response;
status = client->DescribeCollection(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

const milvus::CollectionDesc& desc = response.Desc();
std::cout << "collection: " << desc.CollectionName() << std::endl;
```
