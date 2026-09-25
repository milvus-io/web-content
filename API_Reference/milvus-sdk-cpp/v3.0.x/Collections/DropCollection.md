# DropCollection()

This operation drops a collection together with its data and indexes.

```cpp
Status DropCollection(const DropCollectionRequest& request)
```

## Request Syntax

```cpp
auto request = DropCollectionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name; the default database is used if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to drop.

**RETURNS:**

*Status*

Returns a Status indicating whether the collection was dropped successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Call DropCollection() on a connected MilvusClientV2 to drop a collection and its data.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::DropCollectionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name);
status = client->DropCollection(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
