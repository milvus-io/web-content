# DropIndexProperties()

This operation drops the property from the specified index.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithIndexName(const std::string& index_name)`

    Sets the name of the index. Use the index name in this operation, but not the field name.

- `WithPropertyKeys(std::set<std::string>&& keys)`

    Sets the name of the properties to drop from this index.

- `AddPropertyKey(const std::string& key)`

    Sets the name of a property to delete.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

