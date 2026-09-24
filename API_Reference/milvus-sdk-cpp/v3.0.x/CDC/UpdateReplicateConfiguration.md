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

- `WithForcePromote(bool force_promote)`

    Sets whether to force-promote the configuration, allowing the update to proceed even when existing replication state would otherwise hold it back.

**RETURNS:**

*Status*

Returns a status indicating whether the update succeeded.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

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
    .WithConfiguration(configuration)
    .WithForcePromote(force_promote);
status = client->UpdateReplicateConfiguration(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
