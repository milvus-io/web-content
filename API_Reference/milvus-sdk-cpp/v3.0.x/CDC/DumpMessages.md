# DumpMessages()

Dump messages from a Pulsar channel for debugging replication.

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

    Sets the physical channel whose messages are dumped.

- `WithStartMessageID(ReplicateMessageID&& start_message_id)`

    Sets the message ID from which the dump starts.

- `WithStartTimeTick(uint64_t start_timetick)`

    Sets the starting time tick of the dump window.

- `WithEndTimeTick(uint64_t end_timetick)`

    Sets the ending time tick of the dump window.

### DumpedMessage

Each dumped message is passed to the `on_message` callback.

**METHODS:**

- `const ReplicateMessageID& MessageID() const`

    Returns the message ID of the dumped message.

- `const std::string& Payload() const`

    Returns the raw payload of the dumped message.

- `const std::unordered_map<std::string, std::string>& Properties() const`

    Returns the message properties.

**RETURNS:**

*Status*

Returns a status indicating whether the operation succeeded. Returning a non-OK `Status` from the `on_message` callback aborts the dump.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

## Example

Demonstrates DumpMessages() with the C++ SDK.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
util::CheckStatus(client->Connect(connect_param));

auto request = milvus::DumpMessagesRequest();
util::CheckStatus(client->DumpMessages(
    request,
    [](const milvus::DumpedMessage& message) {
        std::cout << message.MessageID().ID() << std::endl;
        return milvus::Status();
    }));
```
