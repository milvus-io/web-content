# dumpMessages()

This operation streams immutable WAL messages in the specified physical channel and time range.

```javascript
await milvusClient.dumpMessages(data: DumpMessagesReq)
```

## Request Syntax

```javascript
await milvusClient.dumpMessages({
    pchannel: string,
    start_message_id: ReplicateMessageId,
    start_timetick?: string | number,
    end_timetick?: string | number,
    include_start_message?: boolean,
    timeout?: number,
})
```

**PARAMETERS:**

- **pchannel** (*string*) -

    **[REQUIRED]**

    The physical channel (pChannel) to dump.

- **start_message_id** (*ReplicateMessageId*) -

    **[REQUIRED]**

    The WAL message ID to start from. A **ReplicateMessageId** has **id** (*string*) and **WAL_name** members, where **WAL_name** is one of **Unknown**, **RocksMQ**, **Pulsar**, **Kafka**, **WoodPecker**, or **Test**.

- **start_timetick** (*string* | *number*) -

    The starting time tick. Optional.

- **end_timetick** (*string* | *number*) -

    The ending time tick. Optional.

- **include_start_message** (*boolean*) -

    Whether to include the start message in the stream. Optional.

- **timeout** (*number*) -

    An optional duration of time in milliseconds to allow for the RPC. If it is set to `undefined`, the client keeps waiting until the server responds or an error occurs. Default is `undefined`.

**RETURNS:**

*Promise<DumpStream>*

This method returns a promise that resolves to a readable gRPC stream of **DumpMessagesResponse** messages. Each message is either a `{ response: 'message', message: ImmutableReplicateMessage }` carrying a WAL message, or a `{ response: 'status', status: ResStatus }` carrying the stream status.

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

const stream = await client.dumpMessages({
    pchannel: 'by-dev-rootcoord-dml_0_0',
    start_message_id: { id: '0', WAL_name: 'RocksMQ' },
});
```
