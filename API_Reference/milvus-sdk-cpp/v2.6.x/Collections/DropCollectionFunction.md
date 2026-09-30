# DropCollectionFunction()

This operation removes a named function from an existing collection's schema on the server. On success, the client also invalidates its locally cached schema for that collection.

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

    Sets the target database name; if left empty, the database of the current connection is used. Optional.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection whose function is to be dropped.

- `WithFunctionName(std::string function_name)`

    Sets the name of the function to remove from the collection's schema; an empty name is rejected locally with INVALID_ARGUMENT.

**RETURNS:**

*Status*

Returns a Status indicating whether the function was dropped from the collection's schema; a Status with code INVALID_ARGUMENT is returned locally, without any RPC, if the function name is empty.

**ERROR HANDLING:**

- **std::exception**

    When request construction, connection setup, transport, or response processing fails. The error details are reported through the returned Status or the exception message; inspect both for the failure cause.

## Example

Drop a named function from an existing collection after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return;
}

auto request = milvus::DropCollectionFunctionRequest()
    .WithDatabaseName("default")
    .WithCollectionName("book")
    .WithFunctionName("extract_book_id");
status = client->DropCollectionFunction(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
