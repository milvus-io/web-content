# DropCollectionFunction()

This operation drops a function of an existing collection.

<div class="alert note">

Deprecated in v3.0.x. Use [DropFunctionField()](DropFunctionField.md) to drop the function together with its output field and bound index.

</div>

```cpp
Status DropCollectionFunction(const DropCollectionFunctionRequest& request)
```

## Request Syntax

```cpp
auto request = DropCollectionFunctionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFunctionName(function_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the target database. If it is empty, the default database is used.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the target collection.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

- `WithFunctionName(std::string function_name)`

    Sets the name of the function to drop. This cannot be empty.

- `SetFunctionName(std::string function_name)`

    Set the name of the function to drop.

**RETURNS:**

*Status*

Returns a Status indicating whether the function was dropped successfully.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Call DropCollectionFunction() on a connected MilvusClientV2 to drop a function of an existing collection.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::DropCollectionFunctionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFunctionName(function_name);
status = client->DropCollectionFunction(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
