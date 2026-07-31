# AlterIndexProperties()

This operation alters the properties of an index.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithIndexName(const std::string& index_name)`

    Sets the name of the index. Use the index name in this operation, but not the field name.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

    Sets the properties to alter of the specified index. You can find available index properties on [this page](https://milvus.io/docs/mmap.md#Index-specific-mmap-settings).

- `AddProperty(const std::string& key, const std::string& property)`

    Adds a property to this index.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

