# getReplicateConfiguration()

This operation gets the current replicate configuration. Use it to inspect configured clusters and cross-cluster topology before updating replication settings.

```java
public GetReplicateConfigurationResp getReplicateConfiguration()
```

**RETURNS:**

*GetReplicateConfigurationResp*

**PARAMETERS:**

- **replicateConfiguration** (*ReplicateConfiguration*)

    The current replication configuration. It has the following members:

    - **clusters** (*List\<MilvusCluster\>*)

        The Milvus clusters in the replication topology. Each **MilvusCluster** object has the following members:

        - **clusterId** (*String*)

            The ID of the cluster.

        - **uri** (*String*)

            The URI of the cluster.

        - **token** (*String*)

            The access token of the cluster.

        - **pchannels** (*List\<String\>*)

            The physical channels of the cluster.

    - **crossClusterTopologies** (*List\<CrossClusterTopology\>*)

        The cross-cluster topologies. Each **CrossClusterTopology** object has the following members:

        - **sourceClusterId** (*String*)

            The ID of the source cluster.

        - **targetClusterId** (*String*)

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
