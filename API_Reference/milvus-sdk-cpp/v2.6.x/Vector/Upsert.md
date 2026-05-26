# Upsert()

This operation upserts entities into a collection. You can use either column-wise or row-wise data.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithPartitionName(const std::string& partition_name)`

    Sets the names of the partitions. If it is empty, the default partition applies.

- `WithColumnsData(std::vector<FieldDataPtr>&& columns_data)`

    Sets the column-wise data to insert. This method and `WithRowData()` are mutually exclusive.

- `AddColumnData(const FieldDataPtr& column_data)`

    Adds the data of a field to insert. This method and `AddRowData()` are mutually exclusive.

- `WithRowsData(EntityRows&& rows_data)`

    Sets the row-wise data to insert. This method and `WithColumnsData()` are mutually exclusive.

- `AddRowData(EntityRow&& row_data)`

    Adds the data of an entity to insert. This method and `AddColumnData()` are mutually exclusive.

- `WithPartialUpdate(bool partial_update)`

    Sets whether to enable partial update. If set to **True**, only the specified fields will be updated while others remain unchanged. The default value is **False**.

**RETURNS:**

*Status* with *UpsertResponse*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

