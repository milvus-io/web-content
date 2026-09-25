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

- `const std::string& LastCommandTimestamp() const`

    Returns the timestamp of the last processed command.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

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
