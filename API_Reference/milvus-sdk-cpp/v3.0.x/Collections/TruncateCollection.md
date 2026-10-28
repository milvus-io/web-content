# TruncateCollection()

Truncate a collection, removing all data while keeping the collection structure.

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

    Set target db name, use default database if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Set name of the collection.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a status indicating whether the operation succeeded.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Demonstrates TruncateCollection() with the C++ SDK.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
util::CheckStatus(client->Connect(connect_param));

auto request = milvus::TruncateCollectionRequest();
util::CheckStatus(client->TruncateCollection(request));
```
