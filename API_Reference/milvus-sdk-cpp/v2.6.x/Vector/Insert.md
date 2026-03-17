# Insert()

This operation inserts data into a collection. You can use either column-wise or row-wise data.

```cpp
Status Insert(const InsertRequest& request, InsertResponse& response)
```

## Request Syntax

```cpp
auto request = InsertRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPartitionName(partition_name)
    .WithColumnsData(columns_data)
    .WithRowsData(rows_data);
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

**RETURNS:**

*Status* with *InsertResponse*

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

// insert some rows
const int64_t row_count = 100;
milvus::EntityRows rows;
std::mt19937 rng(std::random_device{}());
std::uniform_real_distribution<float> dist(0.0f, 1.0f);
for (auto i = 0; i < row_count; ++i) {
    milvus::EntityRow row;
    row[field_id] = i;
    std::vector<float> vec(dimension);
    std::generate(vec.begin(), vec.end(), [&]() { return dist(rng); });
    row[field_vector] = std::move(vec);
    rows.emplace_back(std::move(row));
}

milvus::InsertResponse resp_insert;
status = client->Insert(
    milvus::InsertRequest()
        .WithCollectionName(collection_name)
        .WithRowsData(std::move(rows)),
    resp_insert);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << resp_insert.Results().InsertCount() << " rows inserted by row-based." << std::endl;
```
