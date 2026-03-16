# AlterCollectionFieldProperties()

This operation alters a field's properties.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Set the name of the collection.

- `WithFieldName(const std::string& field_name)`

    Sets the name of the target field.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

    Sets the properties to alter for the specified field. For details, refer to [this page](https://milvus.io/docs/alter-collection-field.md).

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

