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

**EXCEPTIONS:**

- **MilvusError**

    Raised when Milvus cannot load replication configuration.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await client.getReplicateConfiguration();
console.log(res.replicate_configuration);
```
