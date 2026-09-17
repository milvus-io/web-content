# GetTelemetry()

This operation returns the client telemetry manager, used for diagnostics and custom command handlers.

```cpp
ClientTelemetryManagerPtr GetTelemetry() const
```

**RETURNS:**

*ClientTelemetryManagerPtr*

A `std::shared_ptr<ClientTelemetryManager>` for the connected client. The manager is also available on the V1 `MilvusClient` interface.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## ClientTelemetryManager

The telemetry manager reports client metrics to the server via periodic heartbeats and handles server-pushed commands.

```cpp
using ClientTelemetryManagerPtr = std::shared_ptr<ClientTelemetryManager>;
```

**METHODS:**

- `Start()`

    Starts the telemetry reporting loop.

- `Stop()`

    Stops the telemetry reporting loop.

- `bool IsReady() const`

    Returns whether the manager is ready to report.

- `bool IsSupported() const`

    Returns whether the connected server supports telemetry.

- `std::string ClientId() const`

    Returns the client identifier.

- `uint64_t ConfigHash() const`

    Returns a hash of the active telemetry configuration.

- `int64_t LastCommandTimestamp() const`

    Returns the timestamp of the last server-pushed command.

- `const TelemetryConfig& Config() const`

    Returns the active telemetry configuration. See TelemetryConfig.

- `bool MatchesConnection(const TelemetryConfig& config, const std::string& connection_scope) const`

    Returns whether the manager matches the given configuration and connection scope.

- `Status LastHeartbeatError() const`

    Returns the error of the last heartbeat, or OK when the last heartbeat succeeded.

- `Status RegisterCommandHandler(const std::string& command_type, CommandHandler handler)`

    Registers a handler for server-pushed commands of the given type. `CommandHandler` is `std::function<TelemetryCommandReply(const TelemetryCommand&)>`.

- `std::vector<TelemetryError> RecentErrors(size_t max_count = 100) const`

    Returns up to `max_count` recent telemetry errors.

- `MetricsSnapshots() const`

    Returns the current metrics snapshots.

- `PendingCommandReplies() const`

    Returns the command replies that have not yet been delivered to the server.

- `ProcessCommands(const std::vector<TelemetryCommand>& commands)`

    Processes a batch of server-pushed commands.

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
if (telemetry && telemetry->IsReady()) {
    std::cout << "Telemetry client id: " << telemetry->ClientId() << std::endl;
}
```
