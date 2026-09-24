# GetReplicateInfo()

This operation reports the replication progress for a channel, returning the current replication checkpoint between a source cluster and a target physical channel.

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

    Sets the identifier of the source cluster to report replication progress for.

- `WithTargetPChannel(const std::string& target_pchannel)`

    Sets the name of the target physical channel to report replication progress for.

**RETURNS:**

*Status*

Returns a status indicating whether the operation succeeded, with the replication checkpoints carried in the response.

- **response** (*GetReplicateInfoResponse*) -

    - **Checkpoint** (*const ReplicateCheckpoint&*) -

        Get the replication checkpoint.

        - **ClusterID** (*const std::string&*) -

            Get the cluster identifier.

        - **PChannel** (*const std::string&*) -

            Get the Pulsar channel name.

        - **MessageID** (*const ReplicateMessageID&*) -

            Get the message identifier of the checkpoint.

            - **ID** (*const std::string&*) -

                Get the message identifier.

            - **WalName** (*const std::string&*) -

                Get the WAL (write-ahead log) backend name of the message.

        - **TimeTick** (*uint64_t*) -

            Get the time tick of the checkpoint.

    - **SalvageCheckpoint** (*const ReplicateCheckpoint&*) -

        Get the salvage checkpoint.

        - **ClusterID** (*const std::string&*) -

            Get the cluster identifier.

        - **PChannel** (*const std::string&*) -

            Get the Pulsar channel name.

        - **MessageID** (*const ReplicateMessageID&*) -

            Get the message identifier of the checkpoint.

            - **ID** (*const std::string&*) -

                Get the message identifier.

            - **WalName** (*const std::string&*) -

                Get the WAL (write-ahead log) backend name of the message.

        - **TimeTick** (*uint64_t*) -

            Get the time tick of the checkpoint.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Call GetReplicateInfo() on a connected MilvusClientV2 to retrieve the replication checkpoints for a channel.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::GetReplicateInfoRequest()
    .WithSourceClusterID(source_cluster_id)
    .WithTargetPChannel(target_pchannel);
milvus::GetReplicateInfoResponse response;
status = client->GetReplicateInfo(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
