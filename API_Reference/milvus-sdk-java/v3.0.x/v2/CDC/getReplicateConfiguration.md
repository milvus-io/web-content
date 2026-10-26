# getReplicateConfiguration()

This operation gets the current replicate configuration. Use it to inspect configured clusters and cross-cluster topology before updating replication settings.

```java
public GetReplicateConfigurationResp getReplicateConfiguration()
```

**RETURN TYPE:**

*GetReplicateConfigurationResp*

**RETURNS:**

A **GetReplicateConfigurationResp** object that contains the replication configuration.

- `getReplicateConfiguration()` (*ReplicateConfiguration*) -

    The replication configuration, which contains the following getters:

    - `getClusters()` (*List\<MilvusCluster\>*) -

        The clusters involved in the replication. Each **MilvusCluster** has the following getters:

        - `getClusterId()` (*String*) -

            The ID of the cluster.

        - `getUri()` (*String*) -

            The URI of the cluster.

        - `getToken()` (*String*) -

            The token used to connect to the cluster.

        - `getPchannels()` (*List\<String\>*) -

            The physical channels of the cluster.

    - `getCrossClusterTopologies()` (*List\<CrossClusterTopology\>*) -

        The cross-cluster topologies. Each **CrossClusterTopology** has the following getters:

        - `getSourceClusterId()` (*String*) -

            The ID of the source cluster.

        - `getTargetClusterId()` (*String*) -

            The ID of the target cluster.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when validation fails or the server returns an error for this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.cdc.request.ReplicateConfiguration;
import io.milvus.v2.service.cdc.response.GetReplicateConfigurationResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
    .uri("http://localhost:19530")
    .token("root:Milvus")
    .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Get the current replication configuration
GetReplicateConfigurationResp resp = client.getReplicateConfiguration();
ReplicateConfiguration config = resp.getReplicateConfiguration();
System.out.println(config.getClusters());
```

<!-- category: CDC; action: CREATE; addedSince: v3.0.x -->
