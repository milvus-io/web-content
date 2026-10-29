# MessageID

The ID of a message in a Milvus write-ahead log.

```csharp
public sealed class MessageID
{
    public MessageID(string id, WalName walName) { ... }
    public string Id { get; }
    public WalName WalName { get; }
}
```

**PARAMETERS:**

- `Id` (*string*) -

    The message ID string.

- `WalName` (*WalName*) -

    The name of the WAL implementation that produced the message.

**METHODS:**

- `MessageID(string id, WalName walName)` (*constructor*) -

    Creates a new message ID.

The name of the write-ahead log (WAL) implementation backing a physical channel.

```csharp
public enum WalName
{
    Unknown = 0,
    RocksMq = 1,
    Pulsar = 2,
    Kafka = 3,
    WoodPecker = 4,
    Test = 999
}
```

**Constants:**

- **Unknown** (0)

    Unknown or unset WAL.

- **RocksMq** (1)

    The RocksMQ WAL.

- **Pulsar** (2)

    The Pulsar WAL.

- **Kafka** (3)

    The Kafka WAL.

- **WoodPecker** (4)

    The WoodPecker WAL.

- **Test** (999)

    A test WAL.
