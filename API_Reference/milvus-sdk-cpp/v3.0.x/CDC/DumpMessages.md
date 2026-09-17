# DumpMessages()

Dump messages from a Pulsar channel for debugging or inspection.

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

    Sets the Pulsar channel name.

- `WithStartMessageID(ReplicateMessageID&& start_message_id)`

    Sets the start message identifier.

- `WithStartTimeTick(uint64_t start_timetick)`

    Sets the start time tick.

- `WithEndTimeTick(uint64_t end_timetick)`

    Sets the end time tick.

**RETURNS:**

*Status*

Returns a status indicating whether the operation succeeded.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

## Example

Demonstrates DumpMessages() with the C++ SDK.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
util::CheckStatus(client->Connect(connect_param));

auto request = milvus::DumpMessagesRequest().WithPChannel("by-dev-rootcoord-dml_0");
auto status = client->DumpMessages(request, [](const milvus::DumpedMessage& message) {
    return Status::OK();
});
```
