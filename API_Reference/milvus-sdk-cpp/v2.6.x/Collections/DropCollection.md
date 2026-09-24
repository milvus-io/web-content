# DropCollection()

This operation drops a collection and permanently removes its data, including all partitions, indexes and segments. On success, the client also invalidates its cached timestamps and schema entries for the dropped collection.

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

    Sets the name of the database that contains the collection to drop; the default database is used if it is left empty. Optional.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to drop.

**RETURNS:**

*Status*

Returns a Status indicating whether the collection was dropped successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

## Example

Drop a collection by name after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::string db_name = "default";
std::string collection_name = "book";

auto request = milvus::DropCollectionRequest()
                   .WithDatabaseName(db_name)
                   .WithCollectionName(collection_name);
status = client->DropCollection(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
