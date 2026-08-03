# UpdateReplicateConfiguration()

This operation updates the replicate configuration. Use it to change cluster definitions or cross-cluster topology.

```cpp
Status UpdateReplicateConfiguration(const UpdateReplicateConfigurationRequest& request)
```

## Request Syntax

```cpp
auto request = milvus::UpdateReplicateConfigurationRequest()
    .WithConfiguration(std::move(configuration))
    .WithForcePromote(false);
```

**REQUEST METHODS:**

- `WithConfiguration(ReplicateConfiguration&& configuration)`

    Sets the desired replication configuration.

- `WithForcePromote(bool force_promote)`

    Controls whether the update should force promotion during replication configuration changes.

**RETURNS:**

*Status*

**EXCEPTIONS:**

- **std::exception**

    This exception can be raised if the request cannot be sent or the response cannot be parsed.

## Example

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::UpdateReplicateConfigurationRequest()
    .WithConfiguration(std::move(configuration))
    .WithForcePromote(false);
status = client->UpdateReplicateConfiguration(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: CDC; action: CREATE; addedSince: v3.0.x -->
