# DescribeSnapshot()

This operation describes a snapshot. Use it to inspect snapshot metadata before restore or cleanup.

```cpp
Status DescribeSnapshot(const DescribeSnapshotRequest& request, DescribeSnapshotResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::DescribeSnapshotRequest()
    .WithDatabaseName("default")
    .WithCollectionName("book")
    .WithSnapshotName("snapshot_20260617");
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database name.

- `SetDatabaseName(const std::string& db_name)`

    Set the target database name.

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection name.

- `SetCollectionName(const std::string& collection_name)`

    Set the target collection name.

- `WithSnapshotName(const std::string& snapshot_name)`

    Sets the snapshot name.

- `SetSnapshotName(const std::string& snapshot_name)`

    Set the target snapshot name.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. The snapshot metadata is carried in the response object.

- **response** (*DescribeSnapshotResponse*) -

    - **CollectionName** (*const std::string&*) -

        Get the collection the snapshot belongs to.

    - **CreateTs** (*int64_t*) -

        Get the creation timestamp of the snapshot.

    - **Description** (*const std::string&*) -

        Get the snapshot description.

    - **Name** (*const std::string&*) -

        Get the snapshot name.

    - **PartitionNames** (*const std::vector<std::string>&*) -

        Get the partition names covered by the snapshot.

    - **S3Location** (*const std::string&*) -

        Get the S3 storage location of the snapshot.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::DescribeSnapshotRequest()
    .WithDatabaseName("default")
    .WithCollectionName("book")
    .WithSnapshotName("snapshot_20260617");
milvus::DescribeSnapshotResponse response;
status = client->DescribeSnapshot(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: Snapshots; action: CREATE; addedSince: v3.0.x -->
