# getReplicateConfiguration()

This operation returns the current cross-cluster replication configuration.

```javascript
await milvusClient.getReplicateConfiguration(data?: GetReplicateConfigurationReq)
```

## Request Syntax

```javascript
await milvusClient.getReplicateConfiguration({
    timeout?: number,
})
```

**PARAMETERS:**

- **timeout** (*number*) -

    Optional RPC timeout in milliseconds.

**RETURNS:**

*Promise<GetReplicateConfigurationResponse>*

This method returns a promise that resolves to a **GetReplicateConfigurationResponse** object.

```javascript
{
    configuration: ReplicateConfiguration,
    status:  ResStatus
}
```

**PARAMETERS:**

- **configuration** (*ReplicateConfiguration*) -

    The current cross-cluster replication configuration.

    - **clusters** (*ReplicateCluster[]*) -

        The clusters participating in replication.

    - **cross_cluster_topology** (*CrossClusterTopology[]*) -

        The cross-cluster topology, when configured.

- **status** (*ResStatus*) -

    A **ResStatus** object.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

**EXCEPTIONS:**

- **Error**

    Raised when Milvus cannot load replication configuration.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await client.getReplicateConfiguration();
console.log(res.configuration);
```
