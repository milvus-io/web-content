# updateReplicateConfiguration()

This operation updates replication configuration across Milvus clusters. This is used to configure cross-cluster data replication by defining cluster connections and the replication topology.

```java
public UpdateReplicateConfigurationResp updateReplicateConfiguration(UpdateReplicateConfigurationReq request)
```

## Request Syntax

```java
updateReplicateConfiguration(UpdateReplicateConfigurationReq.builder()
    .replicateConfiguration(ReplicateConfiguration config)
    .build()
);
```

**BUILDER METHODS:**

- `replicateConfiguration(ReplicateConfiguration config)` -

    **[REQUIRED]**

    The replication configuration containing cluster definitions and topology.

**RETURNS:**

*UpdateReplicateConfigurationResp*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.service.cdc.request.CrossClusterTopology;
import io.milvus.v2.service.cdc.request.MilvusCluster;
import io.milvus.v2.service.cdc.request.ReplicateConfiguration;
import io.milvus.v2.service.cdc.request.UpdateReplicateConfigurationReq;

import java.util.ArrayList;

// Define source and target Milvus clusters
MilvusCluster sourceCluster = MilvusCluster.builder()
        .clusterId("upstream-cluster")
        .uri("http://192.168.1.1:19530")
        .pchannels(pchannelList)
        .build();
MilvusCluster targetCluster = MilvusCluster.builder()
        .clusterId("downstream-cluster")
        .uri("http://192.168.1.2:19530")
        .pchannels(pchannelList)
        .build();

// Define cross-cluster replication topology
CrossClusterTopology topology = CrossClusterTopology.builder()
        .sourceClusterId("upstream-cluster")
        .targetClusterId("downstream-cluster")
        .build();

// Build and apply replication configuration
ReplicateConfiguration configuration = ReplicateConfiguration.builder()
        .clusters(new ArrayList<MilvusCluster>() {{
            add(sourceCluster);
            add(targetCluster);
        }})
        .crossClusterTopologies(new ArrayList<CrossClusterTopology>() {{
            add(topology);
        }})
        .build();

client.updateReplicateConfiguration(
    UpdateReplicateConfigurationReq.builder()
        .replicateConfiguration(configuration)
        .build()
);
```
