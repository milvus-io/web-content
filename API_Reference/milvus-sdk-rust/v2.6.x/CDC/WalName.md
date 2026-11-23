# WalName

Write-ahead-log implementation used by a replication cluster.

```rust
pub enum WalName {
    Unknown,
    RocksMq,
    Pulsar,
    Kafka,
    WoodPecker,
    Test,
}
```

**Constants:**

- **Unknown**

    The WAL implementation is unknown. This is the default.

- **RocksMq**

    RocksMQ-based WAL.

- **Pulsar**

    Pulsar-backed WAL.

- **Kafka**

    Kafka-backed WAL.

- **WoodPecker**

    Woodpecker cloud-native object-storage WAL (zero local-disk dependency).

- **Test**

    Test WAL implementation used by unit and integration tests.

## Example

```rust
let message_id = ReplicateMessageId::new()
    .id("message-1")
    .wal_name(WalName::Kafka);
```
