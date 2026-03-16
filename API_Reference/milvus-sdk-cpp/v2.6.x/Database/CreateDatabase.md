# CreateDatabase()

This operation creates a new database.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

     Sets the target database name. The default database applies if it is empty.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

     Sets properties of this database.

- `AddProperty(const std::string& key, const std::string& property)`

     Adds a property to this database.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

