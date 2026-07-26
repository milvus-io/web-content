# AddCollectionFunction()

This operation attaches a function definition to an existing collection, such as a BM25 function over text fields.

```cpp
Status AddCollectionFunction(const AddCollectionFunctionRequest& request)
```

## Request Syntax

```cpp
auto request = AddCollectionFunctionRequest()
    .WithCollectionName(collection_name)
    .WithFunction(function_ptr);
```

**REQUEST METHODS:**

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection that will receive the new function.

- `WithDatabaseName(const std::string& db_name)`

    Sets the database containing the target collection.

- `WithFunction(const FunctionPtr& function)`

    Supplies the function definition to add.

**RETURNS:**

*Status*

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for duplicate function names, invalid function definitions, or collection state errors.

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

status = client->AddCollectionFunction(
    milvus::AddCollectionFunctionRequest()
        .WithCollectionName("docs")
        .WithFunction(function));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
