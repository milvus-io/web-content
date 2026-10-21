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
    .WithClusteringCompaction(clustering_compaction)
    .WithTargetSize(target_size)
    .WithTargetSizeUnit(unit)
    .WithIsL0(is_l0);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set database name in which the collections are created.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `SetCollectionName(const std::string& collection_name)`

    Set name of the collection to be compacted.

- `WithClusteringCompaction(bool clustering_compaction)`

    Sets the clustering compaction flag. 

    - **True**: Conducts clustering compaction and reports an error if there is no clustering key.

    - **False**: Conducts normal compaction.

- `SetClusteringCompaction(bool clustering_compaction)`

    Set the clustering compaction flag.

- `WithTargetSize(int64_t target_size)`

    Sets the target segment size for compaction planning, expressed in the unit set by `WithTargetSizeUnit()`. Use values greater than 0 to guide output segment sizing.

- `SetTargetSize(int64_t target_size)`

    Set target segment size, expressed in the unit returned by TargetSizeUnit(). Zero means use server default.

- `WithTargetSizeUnit(const std::string& unit)`

    Sets the unit of the target segment size. Supported values: `"b"`, `"kb"`, `"mb"`, `"gb"`, `"tb"`, `"pb"`. Default is `"mb"`.

- `SetTargetSizeUnit(const std::string& unit)`

    Set unit of the target segment size. Supported values: "b", "kb", "mb", "gb", "tb", "pb". Default is "mb".

- `WithIsL0(bool is_l0)`

    Sets the L0 compaction flag. When `true`, compacts L0 segments only; when `false`, performs normal compaction.

- `SetIsL0(bool is_l0)`

    Set L0 compaction flag. True: compact L0 segments only. False: normal compaction.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. The compaction ID and plan count are carried in the response object.

- **response** (*CompactResponse*) -

    - **CompactionID** (*int64_t*) -

        Get ID of the compaction action.

    - **CompactionPlanCount** (*int64_t*) -

        Get number of plans of the compaction.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details. See [StatusCode](../Client/StatusCode.md).

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
