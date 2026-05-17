# DropCollectionProperties()

This operation drops a collection's properties.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithPropertyKeys(std::set<std::string>&& keys)`

    Sets the properties to drop from this collection.

- `AddPropertyKey(const std::string& key)`

    Sets a property to drop from this collection.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

