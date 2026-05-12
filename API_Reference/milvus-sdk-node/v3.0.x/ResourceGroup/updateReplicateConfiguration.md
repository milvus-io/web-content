# updateReplicateConfiguration()

This operation updates cross-cluster replication topology and cluster endpoints used by Milvus replication.

```javascript
await milvusClient.updateReplicateConfiguration(data: UpdateReplicateConfigurationReq)
```

## Request Syntax

```javascript
await milvusClient.updateReplicateConfiguration({
    clusters: ReplicateCluster[],
    cross_cluster_topology?: CrossClusterTopology[],
    force_promote?: boolean,
    timeout?: number,
})
```

**PARAMETERS:**

- **clusters** (*ReplicateCluster[]*) -

    **[REQUIRED]**

    Cluster connection and channel configuration used by replication.

- **cross_cluster_topology** (*CrossClusterTopology[]*) -

    Replication links between source and target clusters.

- **force_promote** (*boolean*) -

    Whether to force promote the current cluster as primary.

- **timeout** (*number*) -

    Optional RPC timeout in milliseconds.

**RETURNS:**

*Promise<ResStatus>*

**EXCEPTIONS:**

- **MilvusError**

    Raised when replication configuration validation fails or the RPC fails.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

await client.updateReplicateConfiguration({
    clusters: [
        {
            cluster_id: 'primary',
            connection_param: {
                uri: 'http://primary:19530',
                token: 'root:Milvus',
            },
            pchannels: ['by-dev-rootcoord-dml_0v0'],
        },
    ],
});
```
