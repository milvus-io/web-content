# AddCollectionFunction()

This operation attaches a function, such as a BM25 full-text-search function, to the schema of an existing collection. The client validates that the function is set and named, sends the schema change to the server, and refreshes the locally cached schema for the collection.

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

    Sets the target database name; the default database is used when it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to attach the function to.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

- `WithFunction(const FunctionPtr& function)`

    Sets the function to be added; the pointer must be non-null and the function name must not be empty.

- `SetFunction(const FunctionPtr& function)`

    Set the function to be added.

**RETURNS:**

*Status*

Returns a Status indicating whether the function was successfully added to the collection schema.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status; a null function pointer or an empty function name is also rejected locally with an invalid-argument Status before any request is sent. Inspect `status.IsOk()` and `status.Message()` for details. See [Status](../Client/Status.md).

## Example

Attach a BM25 function to an existing collection after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

// define a BM25 function that generates sparse vectors from a VARCHAR field
auto function = std::make_shared<milvus::Function>("function_bm25", milvus::FunctionType::BM25);
function->AddInputFieldName("text");
function->AddOutputFieldName("sparse_vector");

auto request = milvus::AddCollectionFunctionRequest()
    .WithDatabaseName("default")
    .WithCollectionName("my_collection")
    .WithFunction(function);
status = client->AddCollectionFunction(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
