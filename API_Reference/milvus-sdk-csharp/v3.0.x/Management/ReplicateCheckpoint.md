# ReplicateCheckpoint

A checkpoint describing the last confirmed replicated message of a physical channel.

```csharp
public sealed class ReplicateCheckpoint
{
    public string ClusterId { get; }
    public string Pchannel { get; }
    public string MessageId { get; }
    public WalName WalName { get; }
    public ulong TimeTick { get; }
}
```

**PARAMETERS:**

- `ClusterId` (*string*) -

    The ID of the source cluster.

- `Pchannel` (*string*) -

    The physical channel of the source cluster.

- `MessageId` (*string*) -

    The ID of the last confirmed message of the last replicated message.

- `WalName` (*WalName*) -

    The WAL implementation that produced the message, as the typed `WalName` (matching `MessageID.WalName`). An unknown/unset WAL reports `WalName.Unknown`. See [MessageID](MessageID.md).

- `TimeTick` (*ulong*) -

    The time tick of the last replicated message.
