# DropDatabaseProperties()

This operation drops a database's properties.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithPropertyKeys(std::set<std::string>&& keys)`

    Sets the key of the database property to delete.

- `AddPropertyKey(const std::string& key)`

    Adds a key to be deleted.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

