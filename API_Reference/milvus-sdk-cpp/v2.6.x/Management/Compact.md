# Compact()

This operation manually triggers a compaction on a collection. It is normally unnecessary because Milvus triggers compactions internally, so it is mainly used for maintenance or debugging purposes.

```cpp
Status Compact(const CompactRequest& request, CompactResponse& response)
```

## Request Syntax

```cpp
auto request = CompactRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithTargetSize(target_size)
    .WithClusteringCompaction(clustering_compaction)
    .WithL0Compaction(l0_compaction);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the database that contains the collection to compact.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to be compacted.

- `WithTargetSize(int64_t target_size)`

    Sets the target segment size in MB; zero means the server default is used.

- `WithClusteringCompaction(bool clustering_compaction)`

    Sets the clustering compaction flag. When true, clustering compaction is performed and an error is reported if the collection has no clustering key; when false, normal compaction is performed.

- `WithL0Compaction(bool l0_compaction)`

    Sets the L0 compaction flag. When true, L0 compaction is performed, which merges L0 segments into other segments; when false, normal compaction is performed.

**RETURNS:**

*Status*

Returns a Status indicating whether the compaction was triggered successfully. On success, the response object carries the compaction ID assigned by the server for tracking the operation.

- **response** (*CompactResponse*) -

    - **CompactionID** (*int64_t*) -

        Get ID of the compaction action.

    - **CompactionPlanCount** (*int64_t*) -

        Get number of plans of the compaction.

**ERROR HANDLING:**

- **std::exception**

    Request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Manually trigger compaction on a collection after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::CompactRequest()
    .WithDatabaseName("default")
    .WithCollectionName("book")
    .WithTargetSize(1024);
milvus::CompactResponse response;
status = client->Compact(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
