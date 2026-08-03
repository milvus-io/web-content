# DescribeIndex()

This operation gets descriptions and parameters of the specified index.

```cpp
Status DescribeIndex(const DescribeIndexRequest& request, DescribeIndexResponse& response)
```

## Request Syntax

```cpp
auto request = DescribeIndexRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFieldName(field_name)
    .WithIndexName(index_name)
    .WithTimestamp(ts);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithFieldName(const std::string& field_name)`

    Sets the name of the field.

- `WithIndexName(const std::string& index_name)`

    Set the name of the index. 

    <div class="alert note">
    
    If both the field name and the index name are specified, the index name will be used; otherwise, it falls back to the field name.

    </div>

- `WithTimestamp(int64_t ts)`

    Sets a timestamp. If set, this operation only checks the segments generated before this timestamp; otherwise, all segments will be checked.

**RETURNS:**

*Status* with *DescribeIndexResponse*

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

milvus::DescribeIndexResponse desc_response;
status = client->DescribeIndex(milvus::DescribeIndexRequest()
                                        .WithDatabaseName(db_name)
                                        .WithCollectionName(collection_name)
                                        .WithIndexName(index_name),
                                    desc_response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

for (const auto& desc : desc_response.Descs()) {
    std::cout << "\tIndexName: " << desc.IndexName() << std::endl;
    std::cout << "\tIndexType: " << std::to_string(desc.IndexType()) << std::endl;
    std::cout << "\tMetricType: " << std::to_string(desc.MetricType()) << std::endl;
    std::cout << "\tTotalRows: " << std::to_string(desc.TotalRows()) << std::endl;
    std::cout << "\tIndexedRows: " << std::to_string(desc.IndexedRows()) << std::endl;
    std::cout << "\tPendingRows: " << std::to_string(desc.PendingRows()) << std::endl;
}
```
