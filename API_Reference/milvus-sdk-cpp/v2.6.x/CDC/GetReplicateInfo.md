# GetReplicateInfo()

This operation fetches the current replication progress for a target physical channel (pchannel) that is replicated from the specified source Milvus cluster.

```cpp
Status GetReplicateInfo(const GetReplicateInfoRequest& request, GetReplicateInfoResponse& response)
```

## Request Syntax

```cpp
auto request = GetReplicateInfoRequest()
    .WithSourceClusterID(source_cluster_id)
    .WithTargetPChannel(target_pchannel);
```

**REQUEST METHODS:**

- `WithSourceClusterID(const std::string& source_cluster_id)`

    Sets the ID of the source Milvus cluster whose replication information is queried.

- `SetSourceClusterID(const std::string& source_cluster_id)`

    Sets the ID of the source Milvus cluster whose replication information is queried.

- `WithTargetPChannel(const std::string& target_pchannel)`

    Sets the name of the target physical channel (pchannel) to fetch replication information for.

- `SetTargetPChannel(const std::string& target_pchannel)`

    Sets the name of the target physical channel (pchannel) to fetch replication information for.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a status indicating whether the operation succeeded; on success, the response object is filled with the replication progress for the requested channel, including the current replication checkpoint and the salvage checkpoint.

- **response** (*GetReplicateInfoResponse*) -

    - **Checkpoint** (*const ReplicateCheckpoint&*) -

        - **ClusterID** (*const std::string&*) -

        - **PChannel** (*const std::string&*) -

        - **MessageID** (*const ReplicateMessageID&*) -

            - **ID** (*const std::string&*) -

            - **WalName** (*const std::string&*) -

        - **TimeTick** (*uint64_t*) -

    - **SalvageCheckpoint** (*const ReplicateCheckpoint&*) -

        - **ClusterID** (*const std::string&*) -

        - **PChannel** (*const std::string&*) -

        - **MessageID** (*const ReplicateMessageID&*) -

            - **ID** (*const std::string&*) -

            - **WalName** (*const std::string&*) -

        - **TimeTick** (*uint64_t*) -

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

Fetch the replication information for a pchannel after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::GetReplicateInfoRequest()
    .WithSourceClusterID("source-cluster-id")
    .WithTargetPChannel("by-dev-rootcoord-dml_0_449944950935099393v0");
milvus::GetReplicateInfoResponse response;
status = client->GetReplicateInfo(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
