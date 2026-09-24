# AlterCollectionFunction()

This operation alters a function of an existing collection. The function name carried by the Function object identifies which function is altered.

```cpp
Status AlterCollectionFunction(const AlterCollectionFunctionRequest& request)
```

## Request Syntax

```cpp
auto request = AlterCollectionFunctionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFunction(function);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name; the default database is used if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithFunction(const FunctionPtr& function)`

    Sets the function with the new definition, as a shared pointer to the function definition; its name identifies which function to alter.

**RETURNS:**

*Status*

Returns a Status indicating whether the function was altered successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Call AlterCollectionFunction() on a connected MilvusClientV2 to alter a function of an existing collection.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::AlterCollectionFunctionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFunction(function);
status = client->AlterCollectionFunction(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
