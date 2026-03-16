# ListPersistentSegments()

This operation retrieves information about persisted segments from data nodes.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& name)`

    Sets the name of the collection.

**RETURNS:**

*Status* with *ListPersistentSegmentsResponse*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

