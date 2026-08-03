# GetReplicateInfo()

Get replicate information for a channel.

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

    Sets the source cluster ID whose replication checkpoint is queried.

- `WithTargetPChannel(const std::string& target_pchannel)`

    Sets the target physical channel whose replication information is queried.

**RETURNS:**

*Status*

Returns a status indicating whether the operation succeeded.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

## Example

Demonstrates GetReplicateInfo() with the C++ SDK.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
util::CheckStatus(client->Connect(connect_param));

auto request = milvus::GetReplicateInfoRequest();
milvus::GetReplicateInfoResponse response;
util::CheckStatus(client->GetReplicateInfo(request, response));
```
