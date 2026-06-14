# AddCollectionFunctionRequest

This class represents the request payload for `AddCollectionFunction()`.

**METHODS:**

- `const FunctionPtr& Function() const`

      Returns the function definition configured for creation.

- `AddCollectionFunctionRequest& WithFunction(const FunctionPtr& function)`

      Sets the function definition to add.

- `AddCollectionFunctionRequest& WithCollectionName(const std::string& collection_name)`

      Sets target collection name via inherited collection request fields.

## Example

