# DumpMessages()

Dumps CDC messages from a physical channel, as a stream of `DumpMessageInfo`.

```csharp
public DumpMessagesResp DumpMessages(DumpMessagesReq request)
```

## Request Syntax

```csharp
var request = new DumpMessagesReq
{
    Pchannel = "by-dev-rootcoord-dml_0_450357031542v0",
    StartMessageId = new MessageID("0", WalName.RocksMq),
    IncludeStartMessage = true
};

DumpMessagesResp messages = client.DumpMessages(request);

await foreach (DumpMessageInfo message in messages)
{
    Console.WriteLine(message.MessageId);
}
```

**REQUEST PARAMETERS:**

- `Pchannel` (*string*) -

    The physical channel name to dump from.

- `StartMessageId` (*MessageID*) -

    The start position in the WAL (required). Typically taken from the replication checkpoint's message ID. See [MessageID](MessageID.md).

- `StartTimetick` (*ulong?*) -

    An optional start timetick filter: only messages with a timetick greater than or equal to this value are dumped.

- `EndTimetick` (*ulong*) -

    An optional end timetick filter: only messages with a timetick less than or equal to this value are dumped. `0` means no limit (stream until cancelled).

- `IncludeStartMessage` (*bool*) -

    If `true`, dumping starts from `StartMessageId` inclusively; otherwise it starts after it.

**RETURN TYPE:**

*DumpMessagesResp*

**RETURNS:**

A **DumpMessagesResp** object that streams the dumped messages as an `IAsyncEnumerable<DumpMessageInfo>`, consumed with `await foreach`.

```csharp
DumpMessagesResp  // -> IAsyncEnumerable<DumpMessageInfo>
```

Each **DumpMessageInfo** has the following members:

- **MessageId** (*MessageID?*) -

    The ID of the message, or `null` if the message has no ID. See [MessageID](MessageID.md).

- **Payload** (*ReadOnlyMemory\<byte\>*) -

    The message body.

- **Properties** (*IReadOnlyDictionary\<string, string\>*) -

    The message properties.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

DumpMessagesResp messages = client.DumpMessages(new DumpMessagesReq
{
    Pchannel = "by-dev-rootcoord-dml_0_450357031542v0",
    StartMessageId = new MessageID("0", WalName.RocksMq),
    IncludeStartMessage = true
});

await foreach (DumpMessageInfo message in messages)
{
    Console.WriteLine($"Message {message.MessageId}: {message.Payload.Length} bytes");
}
```
