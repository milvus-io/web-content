# DescribeCollection()

This operation fetches the full description of a collection, including its schema and properties. The description is populated into the response object supplied by the caller.

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

    Sets the target database name; the default database is used if it is left empty. Optional.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to describe.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating success or failure, and fills the supplied DescribeCollectionResponse with the collection's description, which is accessible through its Desc() accessor.

- **response** (*DescribeCollectionResponse*) -

    - **Desc** (*const CollectionDesc&*) -

        Get collection description.
        See [CollectionDesc](CollectionDesc.md).

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md) when the RPC transport fails or the server returns an error for the describe request; inspect `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

Fetch and consume a collection description after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::DescribeCollectionResponse response;
status = client->DescribeCollection(
    milvus::DescribeCollectionRequest()
        .WithDatabaseName("default")
        .WithCollectionName("book"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "Collection ID: " << response.Desc().ID() << std::endl;
```
