# GetTelemetry()

This operation returns the telemetry manager for diagnostics and custom command handlers.

```cpp
ClientTelemetryManagerPtr GetTelemetry() const
```

**RETURNS:**

*ClientTelemetryManagerPtr*

Returns a `std::shared_ptr<ClientTelemetryManager>` for the connected client, or `nullptr` when telemetry is not available.

### ClientTelemetryManager

The telemetry manager reports client metrics and heartbeats and handles server-pushed commands.

**METHODS:**

- `void RegisterCommandHandler(const std::string& command_type, CommandHandler handler)`

    Registers a handler for a custom server-pushed command type. The handler is invoked with a `TelemetryCommand` and returns a `TelemetryCommandReply`.

- `void RecordOperation(const std::string& operation, const std::string& collection, std::chrono::steady_clock::time_point started, bool success, const std::string& error_message, const std::string& request_id = "")`

    Records one operation for the current metrics window.

- `int64_t LastCommandTimestamp() const`

    Returns the timestamp of the last processed command, or 0 if no command has been processed.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto telemetry = client->GetTelemetry();
if (telemetry) {
    telemetry->RegisterCommandHandler(
        "ping",
        [](const milvus::TelemetryCommand&) {
            return milvus::TelemetryCommandReply{};
        });
}
```
