# TruncateCollection()

This operation truncates a collection, removing all of its data while keeping the collection and its schema intact. After the server confirms the truncation, the client invalidates its cached latest-timestamp entry for the collection so subsequent operations pick up fresh timestamp information.

```cpp
Status TruncateCollection(const TruncateCollectionRequest& request)
```

## Request Syntax

```cpp
auto request = TruncateCollectionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name that contains the collection to truncate; the default database is used if the name is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to truncate.

**RETURNS:**

*Status*

Returns a Status indicating whether the collection was truncated successfully.

**ERROR HANDLING:**

- **std::exception**

    When request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Truncate a collection after connecting a MilvusClientV2, then check the returned Status.

```cpp
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::TruncateCollectionRequest()
                   .WithDatabaseName("default")
                   .WithCollectionName("books");
status = client->TruncateCollection(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
