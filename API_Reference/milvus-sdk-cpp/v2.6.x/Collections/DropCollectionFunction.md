# DropCollectionFunction()

This operation deletes a function definition from a collection by function name.

```cpp
Status DropCollectionFunction(const DropCollectionFunctionRequest& request)
```

## Request Syntax

```cpp
auto request = DropCollectionFunctionRequest()
    .WithCollectionName(collection_name)
    .WithFunctionName(function_name);
```

**REQUEST METHODS:**

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection from which the function will be removed.

- `WithDatabaseName(const std::string& db_name)`

    Sets the database containing the target collection.

- `WithFunctionName(std::string function_name)`

    Sets the function name to drop.

**RETURNS:**

*Status*

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for missing function names or collection/function lookup failures.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->DropCollectionFunction(
    milvus::DropCollectionFunctionRequest()
        .WithCollectionName("docs")
        .WithFunctionName("bm25_fn"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
