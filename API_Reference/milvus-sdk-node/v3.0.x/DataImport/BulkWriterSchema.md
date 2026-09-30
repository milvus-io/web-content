# BulkWriterSchema

This interface describes the collection schema used by `BulkWriter` to validate rows and generate JSON or Parquet files that Milvus can import.

```javascript
interface BulkWriterSchema
```

**FIELDS:**

- **fields** (*FieldType[]*) -

    **[REQUIRED]**

    Specifies collection fields. Fields marked as `autoID` or `is_function_output` are excluded from generated import files.

- **enable_dynamic_field** (*boolean*) -

    Specifies whether dynamic fields are collected into the `$meta` column.

## Example

```javascript
const schema = {
    enable_dynamic_field: true,
    fields: [
        { name: 'id', data_type: DataType.Int64, is_primary_key: true },
        { name: 'vector', data_type: DataType.FloatVector, dim: 3 },
    ],
};
```
