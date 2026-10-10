# getReplicateConfiguration()

This operation gets the current replicate configuration. Use it to inspect configured clusters and cross-cluster topology before updating replication settings.

```java
public GetReplicateConfigurationResp getReplicateConfiguration()
```

**RETURNS:**

*GetReplicateConfigurationResp*

A **GetReplicateConfigurationResp** object that contains the replication configuration. The object has the following fields:

- **replicateConfiguration** (*ReplicateConfiguration*) -

    The replication configuration, which contains the following fields:

    - **clusters** (*List\<MilvusCluster\>*) -

        The clusters involved in the replication. Each **MilvusCluster** has the following fields:

        - **clusterId** (*String*) -

            The ID of the cluster.

        - **uri** (*String*) -

            The URI of the cluster.

        - **token** (*String*) -

            The token used to connect to the cluster.

        - **pchannels** (*List\<String\>*) -

            The physical channels of the cluster.

    - **crossClusterTopologies** (*List\<CrossClusterTopology\>*) -

        The cross-cluster topologies. Each **CrossClusterTopology** has the following fields:

        - **sourceClusterId** (*String*) -

            The ID of the source cluster.

        - **targetClusterId** (*String*) -

            The ID of the target cluster.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when validation fails or the server returns an error for this operation.

## Example

```java
MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
    .uri("http://localhost:19530")
    .token("root:Milvus")
    .build());

GetReplicateConfigurationResp resp = client.getReplicateConfiguration();
ReplicateConfiguration config = resp.getReplicateConfiguration();
System.out.println(config.getClusters());
```

<!-- category: CDC; action: CREATE; addedSince: v3.0.x -->
