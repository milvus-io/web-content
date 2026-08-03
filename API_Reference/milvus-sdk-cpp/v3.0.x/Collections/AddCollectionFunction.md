# AddCollectionFunction()

Add a function to an existing collection.

<div class="alert note">

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

### AddCollectionFunctionRequest

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Set name of the collection.

- `WithFunction(const FunctionPtr& function)`

    Set the function to be added.

**RETURNS:**

*Status*

Returns a status indicating whether the operation succeeded.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

## Example

Demonstrates AddCollectionFunction() with the C++ SDK.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
util::CheckStatus(client->Connect(connect_param));

auto request = milvus::AddCollectionFunctionRequest();
util::CheckStatus(client->AddCollectionFunction(request));
```
