# Upsert()

This operation upserts entities into a collection. You can use either column-wise or row-wise data.

```cpp
Status Upsert(const UpsertRequest& request, UpsertResponse& response)
```

## Request Syntax

```cpp
auto request = UpsertRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPartitionName(partition_name)
    .WithColumnsData(columns_data)
    .WithRowsData(rows_data)
    .WithPartialUpdate(partial_update);
```

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

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

// upsert some rows
int64_t old_id_1 = ids[1];
int64_t old_id_2 = ids[ids.size() - 1];
milvus::EntityRows upsert_rows;
std::vector<float> dummy_vector(dimension);
for (auto d = 0; d < dimension; ++d) {
    dummy_vector[d] = 0.88;
}
{
    milvus::EntityRow row;
    row[field_id] = old_id_1;
    row[field_text] = "this row is updated from " + std::to_string(old_id_1);
    row[field_vector] = dummy_vector;
    upsert_rows.emplace_back(std::move(row));
}
{
    milvus::EntityRow row;
    row[field_id] = old_id_2;
    row[field_text] = "this row is updated from " + std::to_string(old_id_2);
    row[field_vector] = dummy_vector;
    upsert_rows.emplace_back(std::move(row));
}

milvus::UpsertResponse resp_upsert;
status = client->Upsert(
    milvus::UpsertRequest().WithCollectionName(collection_name).WithRowsData(std::move(upsert_rows)), resp_upsert);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
