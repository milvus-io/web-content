# HasCollection()

This operation checks whether the specified collection exists.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the target database. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the target collection.

**RETURNS:**

*Status* with *HasCollectionResponse*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

