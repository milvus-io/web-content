# AlterCollectionFunction()

This operation alters a function of an existing collection: the name carried by the request's Function object identifies which existing function to alter, and that function's definition is replaced with the new definition carried by the same Function object. The collection is looked up in the database set on the request; the default database is used when no database name is set.

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

    Sets the target database name; the default database is used if it is empty. Optional.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection whose function is altered.

- `WithFunction(const FunctionPtr& function)`

    Sets the Function object carrying the new definition; its name identifies which existing function of the collection is replaced.

**RETURNS:**

*Status*

Returns a Status indicating whether the function was altered successfully; it also reports locally detected errors such as a null Function object or an empty function name.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details; a null Function or an empty function name is rejected locally with an INVALID_ARGUMENT status.

## Example

Use AlterCollectionFunction() after connecting a MilvusClientV2; the Function's name must match the name of the existing function to alter.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

// The function name identifies the existing function to alter;
// the remaining fields form the new definition.
auto function = std::make_shared<milvus::RRFRerank>();
function->SetName("my_rerank");
function->AddInputFieldName("query_vector");

auto request = milvus::AlterCollectionFunctionRequest()
    .WithDatabaseName("default")
    .WithCollectionName("my_collection")
    .WithFunction(function);

status = client->AlterCollectionFunction(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
