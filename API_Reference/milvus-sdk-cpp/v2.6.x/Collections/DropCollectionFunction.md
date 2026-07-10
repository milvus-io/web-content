# DropCollectionFunction()

This operation deletes a function definition from a collection by function name.

## Request Syntax

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

