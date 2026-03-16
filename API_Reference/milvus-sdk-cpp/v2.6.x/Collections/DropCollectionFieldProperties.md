# DropCollectionFieldProperties()

Drop a field's properties.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithFieldName(const std::string& field_name)`

    Sets the name of the field.

- `WithPropertyKeys(std::set<std::string>&& keys)`

    Sets the properties to drop from this field.

- `AddPropertyKey(const std::string& key)`

    Sets a property to drop from this field.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

