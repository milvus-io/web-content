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

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to add the function to.

- `WithFunction(const FunctionPtr& function)`

    Sets the function to add to the collection, as a shared pointer to the function definition.

**RETURNS:**

*Status*

Returns a Status indicating whether the function was added successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

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
