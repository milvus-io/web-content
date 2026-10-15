# AddCollectionFunction()

This operation adds a function to an existing collection.

<div class="alert note">

Deprecated in v3.0.x. Use [AddFunctionField()](AddFunctionField.md) to add the function together with a new output field and bound index.

</div>

```cpp
Status AddCollectionFunction(const AddCollectionFunctionRequest& request)
```

## Request Syntax

```cpp
auto request = AddCollectionFunctionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFunction(function);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name; the default database is used if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to add the function to.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

- `WithFunction(const FunctionPtr& function)`

    Sets the function to add to the collection, as a shared pointer to the function definition.

- `SetFunction(const FunctionPtr& function)`

    Set the function to be added.

**RETURNS:**

*Status*

Returns a Status indicating whether the function was added successfully.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Call AddCollectionFunction() on a connected MilvusClientV2 to add a function to an existing collection.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::AddCollectionFunctionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFunction(function);
status = client->AddCollectionFunction(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
