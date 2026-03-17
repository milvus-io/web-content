# Compact()

This operation manually triggers a compaction action. In normal cases, users do not need to run this operation because Milvus automatically triggers compactions internally. It is mainly used for maintenance or debugging purposes.

```cpp
Status Compact(const CompactRequest& request, CompactResponse& response)
```

## Request Syntax

```cpp
auto request = CompactRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithClusteringCompaction(clustering_compaction);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithClusteringCompaction(bool clustering_compaction)`

    Sets the cluserting compaction flag. 

    - **True**: Conducts clustering compaction and reports an error if there is no clustering key.

    - **False**: Conducts normal compaction.

**RETURNS:**

*Status* with *CompactResponse*

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

milvus::CompactResponse response;
status = client->Compact(
    milvus::CompactRequest()
        .WithCollectionName("my_collection"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "Compaction ID: " << response.CompactionID() << std::endl;
```
