# DumpMessages()

Consumes dumped WAL messages from a physical channel with an SDK-domain callback.

```rust
pub async fn dump_messages<F>(
    &self,
    request: DumpMessagesRequest,
    mut on_message: F,
) -> Result<()>
where
    F: FnMut(&DumpedMessage) -> Result<()>,
```

This streaming operation is not retried. Reissuing it after an ambiguous transport failure could replay messages that the server already delivered. Returning an error from the callback stops iteration and drops the underlying gRPC stream.

## Request Syntax

```rust
let request = DumpMessagesRequest::builder()
    .physical_channel("by-dev-rootcoord-dml_0")
    .start_message_id(
        ReplicateMessageId::new()
            .id("message-1")
            .wal_name(WalName::Kafka),
    )
    .start_time_tick(10)
    .end_time_tick(20)
    .build()?;
```

**REQUEST FIELDS:**

- `physical_channel: String`

    Physical channel whose messages are dumped. Required.

- `start_message_id: ReplicateMessageId`

    Message ID from which the dump starts. Required; `id` must not be empty and `wal_name` must be specified.

- `start_time_tick: u64`

    Starting time tick of the dump window.

- `end_time_tick: u64`

    Ending time tick of the dump window. Must be zero or greater than or equal to `start_time_tick`.

- `include_start_message: bool`

    Whether the dump includes the start message. Defaults to `false`.

### DumpedMessage

Each dumped message is passed to the `on_message` callback.

**METHODS:**

- `get_message_id(&self) -> &ReplicateMessageId`

    Returns the message ID of the dumped message.

- `get_payload(&self) -> &[u8]`

    Returns the raw payload of the dumped message.

- `get_properties(&self) -> &HashMap<String, String>`

    Returns the message properties.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` when the stream is fully consumed, or `Error` on failure. Returning an error from the callback aborts the dump.

## Example

```rust
let request = DumpMessagesRequest::builder()
    .physical_channel("by-dev-rootcoord-dml_0")
    .start_message_id(
        ReplicateMessageId::new()
            .id("message-1")
            .wal_name(WalName::Kafka),
    )
    .build()?;
client
    .dump_messages(request, |message| {
        println!("message id: {}", message.get_message_id().get_id());
        Ok(())
    })
    .await?;
```
