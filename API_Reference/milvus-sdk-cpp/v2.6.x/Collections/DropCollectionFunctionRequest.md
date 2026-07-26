# DropCollectionFunctionRequest

This class represents the request payload for `DropCollectionFunction()`.

```cpp
const DropCollectionFunctionRequest& request = req;
```

**METHODS:**

- `const std::string& FunctionName() const`

    Returns the function name to drop.

- `DropCollectionFunctionRequest& WithFunctionName(std::string function_name)`

    Sets the function name to remove from the collection.

- `DropCollectionFunctionRequest& WithCollectionName(const std::string& collection_name)`

    Sets target collection name via inherited collection request fields.

## Example

```cpp
auto request = milvus::DropCollectionFunctionRequest()
    .WithCollectionName("docs")
    .WithFunctionName("bm25_fn");
```
