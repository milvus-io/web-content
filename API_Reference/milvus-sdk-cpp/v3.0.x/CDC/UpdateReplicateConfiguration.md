# UpdateReplicateConfiguration()

This operation updates the replication configuration of the Milvus CDC service, replacing the cluster topology that replication follows.

```cpp
Status UpdateReplicateConfiguration(const UpdateReplicateConfigurationRequest& request)
```

## Request Syntax

```cpp
auto request = UpdateReplicateConfigurationRequest()
    .WithConfiguration(configuration)
    .WithForcePromote(force_promote);
```

**REQUEST METHODS:**

- `WithConfiguration(ReplicateConfiguration&& configuration)`

    Sets the new replication configuration, including the Milvus cluster entries and the cross-cluster topologies that replication should follow.

- `SetConfiguration(ReplicateConfiguration&& configuration)`

    Set the replication configuration.

- `WithForcePromote(bool force_promote)`

    Sets whether to force-promote the configuration, allowing the update to proceed even when existing replication state would otherwise hold it back.

- `SetForcePromote(bool force_promote)`

    Set whether to force-promote the configuration.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a status indicating whether the update succeeded.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Call UpdateReplicateConfiguration() on a connected MilvusClientV2 to apply a new replication configuration.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::UpdateReplicateConfigurationRequest()
    .WithConfiguration(std::move(configuration))
    .WithForcePromote(force_promote);
status = client->UpdateReplicateConfiguration(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
