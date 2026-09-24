# GetReplicateConfiguration()

This operation returns the current replication configuration of the Milvus CDC service, including the clusters and their physical channels.

```cpp
Status GetReplicateConfiguration(const GetReplicateConfigurationRequest& request, GetReplicateConfigurationResponse& response)
```

**RETURNS:**

*Status*

Returns a status indicating whether the operation succeeded; on success, the response carries the retrieved replication configuration.

- **response** (*GetReplicateConfigurationResponse*) -

    - **Configuration** (*const ReplicateConfiguration&*) -

        Get the replication configuration.

        - **Clusters** (*const std::vector<MilvusCluster>&*) -

            Get the clusters of the replication topology.

            - **ClusterID** (*const std::string&*) -

                Get the cluster identifier.

            - **Uri** (*const std::string&*) -

                Get the cluster endpoint URI.

            - **Token** (*const std::string&*) -

                Get the access token of the cluster.

            - **PChannels** (*const std::vector<std::string>&*) -

                Get the Pulsar channels of the cluster.

        - **CrossClusterTopologies** (*const std::vector<CrossClusterTopology>&*) -

            Get the cross-cluster forwarding edges of the topology.

            - **SourceClusterID** (*const std::string&*) -

                Get the source cluster identifier.

            - **TargetClusterID** (*const std::string&*) -

                Get the target cluster identifier.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Call GetReplicateConfiguration() on a connected MilvusClientV2 to retrieve the current replication configuration.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::GetReplicateConfigurationRequest request;
milvus::GetReplicateConfigurationResponse response;
status = client->GetReplicateConfiguration(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
