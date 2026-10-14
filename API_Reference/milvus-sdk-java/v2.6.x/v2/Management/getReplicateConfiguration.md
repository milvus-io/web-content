# getReplicateConfiguration()

This operation gets the current replicate configuration. Use it to inspect configured clusters and cross-cluster topology before updating replication settings.

```java
public GetReplicateConfigurationResp getReplicateConfiguration()
```

**RETURN TYPE:**

*GetReplicateConfigurationResp*

**RETURNS:**

A **GetReplicateConfigurationResp** object that contains the current replication configuration.

- `getReplicateConfiguration()` (*ReplicateConfiguration*) -

    The current replication configuration. It has the following getters:

    - `getClusters()` (*List\<MilvusCluster\>*) -

        The Milvus clusters in the replication topology. Each **MilvusCluster** object has the following getters:

        - `getClusterId()` (*String*) -

            The ID of the cluster.

        - `getUri()` (*String*) -

            The URI of the cluster.

        - `getToken()` (*String*) -

            The access token of the cluster.

        - `getPchannels()` (*List\<String\>*) -

            The physical channels of the cluster.

    - `getCrossClusterTopologies()` (*List\<CrossClusterTopology\>*) -

        The cross-cluster topologies. Each **CrossClusterTopology** object has the following getters:

        - `getSourceClusterId()` (*String*) -

            The ID of the source cluster.

        - `getTargetClusterId()` (*String*) -

            The ID of the target cluster.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when validation fails or the server returns an error for this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.cdc.response.GetReplicateConfigurationResp;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

GetReplicateConfigurationResp resp = client.getReplicateConfiguration();
ReplicateConfiguration config = resp.getReplicateConfiguration();
System.out.println(config.getClusters());
```

## Related operations

- [getReplicateInfo()](getReplicateInfo.md)

- [updateReplicateConfiguration()](updateReplicateConfiguration.md)
