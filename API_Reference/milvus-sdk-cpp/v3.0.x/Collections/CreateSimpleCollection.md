# CreateSimpleCollection()

This operation creates a simple collection with a primary field and a vector field.

```cpp
Status CreateSimpleCollection(const CreateSimpleCollectionRequest& request)
```

## Request Syntax

```cpp
auto request = CreateSimpleCollectionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPrimaryFieldName(primary_field_name)
    .WithPrimaryFieldType(primary_field_type)
    .WithVectorFieldName(vector_field_name)
    .WithDimension(dimension)
    .WithConsistencyLevel(level)
    .WithMetricType(metric_type)
    .WithAutoID(auto_id)
    .WithEnableDynamicField(enable_dynamic_field)
    .WithMaxLength(max_length);
```

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

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->CreateCollection(milvus::CreateSimpleCollectionRequest()
                                      .WithCollectionName(collection_name)
                                      .WithPrimaryFieldName(field_id)
                                      .WithVectorFieldName(field_vector)
                                      .WithDimension(dimension));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
