# AddCollectionFunction()

This operation attaches a function definition to an existing collection, such as a BM25 function over text fields.

## Request Syntax

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

