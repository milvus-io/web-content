# AddCollectionFunctionRequest

This class represents the request payload for `AddCollectionFunction()`.

```cpp
const AddCollectionFunctionRequest& request = req;
```

**METHODS:**

- `const FunctionPtr& Function() const`

    Returns the function definition configured for creation.

- `AddCollectionFunctionRequest& WithFunction(const FunctionPtr& function)`

    Sets the function definition to add.

- `AddCollectionFunctionRequest& WithCollectionName(const std::string& collection_name)`

    Sets target collection name via inherited collection request fields.

## Example

```cpp
auto function = std::make_shared<milvus::Function>();
function->SetName("bm25_fn");
auto request = milvus::AddCollectionFunctionRequest()
    .WithCollectionName("docs")
    .WithFunction(function);
```
