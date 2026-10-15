# DropFunctionField()

Drop a function of an existing collection together with its output field and bound index.

```cpp
Status DropFunctionField(const DropFunctionFieldRequest& request)
```

## Request Syntax

```cpp
auto request = DropFunctionFieldRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFunctionName(function_name);
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

- `WithFunctionName(std::string function_name)`

    Set the name of the function to drop.

- `SetFunctionName(std::string function_name)`

    Set the name of the function to drop together with its output fields.

**RETURNS:**

*Status*

Returns a status indicating whether the operation succeeded.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Demonstrates DropFunctionField() with the C++ SDK.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
util::CheckStatus(client->Connect(connect_param));

auto request = milvus::DropFunctionFieldRequest();
util::CheckStatus(client->DropFunctionField(request));
```
