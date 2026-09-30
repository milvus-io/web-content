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

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the target collection.

- `WithFunctionName(std::string function_name)`

    Sets the name of the function to drop. This cannot be empty.

**RETURNS:**

*Status*

Returns a Status indicating whether the function was dropped successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

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
