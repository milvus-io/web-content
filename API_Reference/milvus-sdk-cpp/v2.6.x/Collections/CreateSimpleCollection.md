# CreateSimpleCollection()

This operation creates a simple collection with a primary field and a vector field.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

      Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

      Set name of the collection.

- `WithPrimaryFieldName(const std::string& primary_field_name)`

      Set name of the primary field. Default value is "id".

- `WithPrimaryFieldType(DataType primary_field_type)`

      Set data type of the primary field. Default value is INT64.

- `WithVectorFieldName(const std::string& vector_field_name)`

      Set name of the vector field. Default value is "vector".

- `WithDimension(int64_t dimension)`

      Set dimension of the vector field. Default value is 0. User must specify a non-zero value for dimension.

- `WithConsistencyLevel(milvus::[ConsistencyLevel](ConsistencyLevel.md) level)`

      Set consistency level of the collection. Default value is BOUNDED.

- `WithMetricType(milvus::[MetricType](../Management/MetricType.md) metric_type)`

      Set metric type of the collection. Default value is COSINE.

- `WithAutoID(bool auto_id)`

      Set auto ID generation flag. Default value is false.

- `WithEnableDynamicField(bool enable_dynamic_field)`

      Set dynamic field enable flag. Default value is true.

- `WithMaxLength(int64_t max_length)`

      Set maximum length of the primary field if it is a VARCHAR. Default value is 65535.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

