# AlterDatabaseProperties()

This operation alters a database property.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

    Sets altered properties of this database. You can find the available database properties on [this page](https://milvus.io/docs/manage_databases.md#Manage-database-properties). 

- `AddProperty(const std::string& key, const std::string& property)`

    Adds a property to this database.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

