# getReplicateInfo()

This operation gets a secondary's live or post-failover salvage checkpoint for a physical channel.

```javascript
await milvusClient.getReplicateInfo(data: GetReplicateInfoReq)
```

## Request Syntax

```javascript
await milvusClient.getReplicateInfo({
    target_pchannel: string,
    source_cluster_id?: string,
    timeout?: number,
})
```

**PARAMETERS:**

- **target_pchannel** (*string*) -

    **[REQUIRED]**

    The physical channel (pChannel) to query.

- **source_cluster_id** (*string*) -

    The ID of the source cluster. Optional.

- **timeout** (*number*) -

    An optional duration of time in milliseconds to allow for the RPC. If it is set to `undefined`, the client keeps waiting until the server responds or an error occurs. Default is `undefined`.

**RETURNS:**

*Promise<GetReplicateInfoResponse>*

This method returns a promise that resolves to a **GetReplicateInfoResponse** object.

```javascript
{
    checkpoint: ReplicateCheckpoint | null,
    salvage_checkpoint: ReplicateCheckpoint | null
}
```

**PARAMETERS:**

- **checkpoint** (*ReplicateCheckpoint* | *null*) -

    The secondary's live replication checkpoint for the channel. Each **ReplicateCheckpoint** has the following members:

    - **cluster_id** (*string*) -

        The ID of the cluster that produced the checkpoint.

    - **pchannel** (*string*) -

        The physical channel the checkpoint belongs to.

    - **message_id** (*ReplicateMessageId* | *null*) -

        The WAL message ID of the checkpoint. Each **ReplicateMessageId** has **id** (*string*) and **WAL_name** members, where **WAL_name** is one of **Unknown**, **RocksMQ**, **Pulsar**, **Kafka**, **WoodPecker**, or **Test**.

    - **time_tick** (*string*) -

        The source time tick, returned as a decimal string by default.

- **salvage_checkpoint** (*ReplicateCheckpoint* | *null*) -

    The salvage checkpoint used for post-failover recovery, when one exists.

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

const res = await client.getReplicateInfo({
    target_pchannel: 'by-dev-rootcoord-dml_0_0',
});
console.log(res.checkpoint);
```
