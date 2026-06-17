# AlterCollectionFunctionRequest

This class represents the request payload for `AlterCollectionFunction()`. The function name inside the `Function` object identifies which function will be altered.

**METHODS:**

- `const FunctionPtr& Function() const`

      Returns the updated function definition.

- `AlterCollectionFunctionRequest& WithFunction(const FunctionPtr& function)`

      Sets the new function definition used for alteration.

- `AlterCollectionFunctionRequest& WithCollectionName(const std::string& collection_name)`

      Sets target collection name via inherited collection request fields.

## Example

