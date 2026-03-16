# AlterCollectionProperties()

This operation alters collection properties.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

    Sets the altered properties of this collection. For available properties, refer to [Supported properties](https://milvus.io/docs/modify-collection.md#Supported-properties).

- `AddProperty(const std::string& key, const std::string& property)`

    Sets one of the properties of this collection. For available properties, refer to [Supported properties](https://milvus.io/docs/modify-collection.md#Supported-properties).

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

