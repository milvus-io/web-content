# DropIndex()

This operation drops the index from a field.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithFieldName(const std::string& field_name)`

    Sets the name of the field. 

- `WithIndexName(const std::string& index_name)`

    Sets the name of the index.

    <div class="alert note">
    
    If both the field name and the index name are specified, the index name will be used; otherwise, it falls back to the field name.

    </div>

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

