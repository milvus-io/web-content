# createReplicateStream()

This operation opens a duplex stream to send replication messages to the target cluster and receive acknowledgements.

```javascript
await milvusClient.createReplicateStream(data: CreateReplicateStreamReq)
```

## Request Syntax

```javascript
await milvusClient.createReplicateStream({
    cluster_id: string,
    timeout?: number,
})
```

**PARAMETERS:**

- **cluster_id** (*string*) -

    **[REQUIRED]**

    The target cluster ID, which is forwarded in the gRPC metadata.

- **timeout** (*number*) -

    An optional duration of time in milliseconds to allow for the RPC. If it is set to `undefined`, the client keeps waiting until the server responds or an error occurs. Default is `undefined`.

**RETURNS:**

*Promise<ReplicateStream>*

This method returns a promise that resolves to a duplex gRPC stream through which you write **ReplicateStreamRequest** messages and receive **ReplicateStreamResponse** acknowledgements.

**EXCEPTIONS:**

- **Error**

    This exception is raised when any error occurs during this operation.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const stream = await client.createReplicateStream({
    cluster_id: 'target_cluster',
});
```
