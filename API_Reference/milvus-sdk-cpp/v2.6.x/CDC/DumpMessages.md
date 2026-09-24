# DumpMessages()

This operation streams the messages of a physical channel (pchannel) whose timeticks fall within the range bounded by the start and end timeticks, beginning at the given replicate message ID, and invokes the provided callback once for each dumped message. Each DumpedMessage delivered to the callback carries the message ID, payload, and properties; returning a non-OK status from the callback stops the dump and that status is returned to the caller.

```cpp
Status DumpMessages(const DumpMessagesRequest& request, const std::function<Status(const DumpedMessage&)>& on_message)
```

## Request Syntax

```cpp
auto request = DumpMessagesRequest()
    .WithPChannel(pchannel)
    .WithStartMessageID(start_message_id)
    .WithStartTimeTick(start_timetick)
    .WithEndTimeTick(end_timetick);
```

**REQUEST METHODS:**

- `WithPChannel(const std::string& pchannel)`

    Sets the name of the physical channel (pchannel) whose messages are to be dumped.

- `WithStartMessageID(ReplicateMessageID&& start_message_id)`

    Sets the replicate message ID (message ID plus WAL name) from which dumping begins; an empty WAL name leaves the WAL unspecified on the request. Moves the given ReplicateMessageID.

- `WithStartTimeTick(uint64_t start_timetick)`

    Sets the start timetick of the range of messages to dump.

- `WithEndTimeTick(uint64_t end_timetick)`

    Sets the end timetick of the range of messages to dump.

**RETURNS:**

*Status*

Returns a Status indicating whether the requested messages were all dumped and accepted by the callback.

**ERROR HANDLING:**

- **std::exception**

    Thrown when an unexpected error occurs while building the request or streaming the dumped messages from the server. The SDK reports these failures through the returned Status (for example an empty callback, an unknown WAL name in the start message ID, or a lost connection) rather than by throwing; inspect the exception message or returned Status for failure details.

## Example

Stream the messages of a pchannel between two timeticks and print each dumped message ID.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::ReplicateMessageID start_message_id;
start_message_id.WithID("459478412713465929");

auto request = milvus::DumpMessagesRequest()
    .WithPChannel("by-dev-rootcoord-dml_0_449018815614558500v0")
    .WithStartMessageID(std::move(start_message_id))
    .WithStartTimeTick(0)
    .WithEndTimeTick(452482803673319400);

status = client->DumpMessages(request, [](const milvus::DumpedMessage& message) {
    std::cout << "dumped message: " << message.MessageID().ID() << std::endl;
    return milvus::Status::OK();
});
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
