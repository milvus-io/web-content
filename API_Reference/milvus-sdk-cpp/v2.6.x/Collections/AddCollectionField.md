# AddCollectionField()

This operation adds a field to an existing collection.

```cpp
Status AddCollectionField(const AddCollectionFieldRequest& request)
```

## Request Syntax

```cpp
auto request = AddCollectionFieldRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithField(field_schema);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithField([FieldSchema](FieldSchema.md)&& field_schema)`

    Sets the field schema.

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

milvus::FieldSchema new_field_1 = milvus::FieldSchema()
                                      .WithName("new_1")
                                      .WithDataType(milvus::DataType::VARCHAR)
                                      .WithMaxLength(64)
                                      .WithNullable(true)
                                      .WithDefaultValue("default text");
status = client->AddCollectionField(
    milvus::AddCollectionFieldRequest().WithCollectionName(collection_name).WithField(std::move(new_field_1)));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::FieldSchema new_field_2 = milvus::FieldSchema()
                                      .WithName("new_2")
                                      .WithDataType(milvus::DataType::ARRAY)
                                      .WithElementType(milvus::DataType::INT16)
                                      .WithMaxCapacity(10)
                                      .WithNullable(true);
status = client->AddCollectionField(
    milvus::AddCollectionFieldRequest().WithCollectionName(collection_name).WithField(std::move(new_field_2)));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
