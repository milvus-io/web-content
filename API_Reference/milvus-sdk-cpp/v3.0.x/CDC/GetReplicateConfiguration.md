# GetReplicateConfiguration()

This operation gets the current replicate configuration. Use it to inspect configured clusters and replication topology.

```cpp
Status GetReplicateConfiguration(const GetReplicateConfigurationRequest& request, GetReplicateConfigurationResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::GetReplicateConfigurationRequest();
```

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

auto request = milvus::GetReplicateConfigurationRequest();
milvus::GetReplicateConfigurationResponse response;
status = client->GetReplicateConfiguration(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: CDC; action: CREATE; addedSince: v3.0.x -->
