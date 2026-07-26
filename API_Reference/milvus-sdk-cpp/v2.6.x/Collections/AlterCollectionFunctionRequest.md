# AlterCollectionFunctionRequest

This class represents the request payload for `AlterCollectionFunction()`. The function name inside the `Function` object identifies which function will be altered.

```cpp
const AlterCollectionFunctionRequest& request = req;
```

**METHODS:**

- `const FunctionPtr& Function() const`

    Returns the updated function definition.

- `AlterCollectionFunctionRequest& WithFunction(const FunctionPtr& function)`

    Sets the new function definition used for alteration.

- `AlterCollectionFunctionRequest& WithCollectionName(const std::string& collection_name)`

    Sets target collection name via inherited collection request fields.

## Example

```cpp
auto function = std::make_shared<milvus::Function>();
function->SetName("bm25_fn");
auto request = milvus::AlterCollectionFunctionRequest()
    .WithCollectionName("docs")
    .WithFunction(function);
```
