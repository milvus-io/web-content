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

**EXCEPTIONS