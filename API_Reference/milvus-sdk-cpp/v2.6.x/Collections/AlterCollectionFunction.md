# AlterCollectionFunction()

This operation replaces the definition of an existing collection function identified by the function name in the provided Function object.

## Request Syntax

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

