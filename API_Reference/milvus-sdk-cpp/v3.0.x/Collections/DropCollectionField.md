# DropCollectionField()

Drop a field from an existing collection.

```cpp
Status DropCollectionField(const DropCollectionFieldRequest& request)
```

## Request Syntax

```cpp
auto request = DropCollectionFieldRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFieldName(field_name);
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

- `WithFieldName(std::string field_name)`

    Set the name of the field to drop.

- `SetFieldName(std::string field_name)`

    Set the name of the field to drop.

- `WithFieldID(int64_t field_id)`

    Set the ID of the field to drop.

- `SetFieldID(int64_t field_id)`

    Set the ID of the field to drop.

**RETURNS:**

*Status*

Returns a status indicating whether the operation succeeded.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Demonstrates DropCollectionField() with the C++ SDK.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
util::CheckStatus(client->Connect(connect_param));

auto request = milvus::DropCollectionFieldRequest();
util::CheckStatus(client->DropCollectionField(request));
```
