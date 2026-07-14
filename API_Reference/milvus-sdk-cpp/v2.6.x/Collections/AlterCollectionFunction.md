# AlterCollectionFunction()

This operation replaces the definition of an existing collection function identified by the function name in the provided Function object.

```cpp
Status AlterCollectionFunction(const AlterCollectionFunctionRequest& request)
```

## Request Syntax

```cpp
auto request = AlterCollectionFunctionRequest()
    .WithCollectionName(collection_name)
    .WithFunction(function_ptr);
```

**REQUEST METHODS:**

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection whose function definition will be changed.

- `WithDatabaseName(const std::string& db_name)`

    Sets the database containing the target collection.

- `WithFunction(const FunctionPtr& function)`

    Supplies the updated function definition. Its name identifies which function to alter.

**RETURNS:**

*Status*

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for missing function names, invalid function definitions, or unavailable collections.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto function = std::make_shared<milvus::Function>();
function->SetName("bm25_fn");

status = client->AlterCollectionFunction(
    milvus::AlterCollectionFunctionRequest()
        .WithCollectionName("docs")
        .WithFunction(function));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
