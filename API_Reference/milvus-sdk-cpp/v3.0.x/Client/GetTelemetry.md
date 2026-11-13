# GetTelemetry()

This operation returns the telemetry manager for diagnostics and custom command handlers.

```cpp
ClientTelemetryManagerPtr GetTelemetry() const
```

## Request Syntax

```cpp
auto telemetry = client->GetTelemetry();
```

**REQUEST METHODS:**

Not applicable; this operation has no request object.

**RETURNS:**

*ClientTelemetryManagerPtr*

Returns a `std::shared_ptr<ClientTelemetryManager>` for the connected client, or `nullptr` when telemetry is not available.

### ClientTelemetryManager

The telemetry manager reports client metrics and heartbeats and handles server-pushed commands.

**METHODS:**

- `void AttachChannel(const std::shared_ptr<grpc::Channel>& channel, const std::string& username, const std::string& database, const std::string& uri, const std::string& sdk_version, const std::string& connection_scope = "")`

    Attaches the manager to a connection. The connection-scoped identity lets the manager be reused across reconnects.

- `void Start()`

    Starts the heartbeat/metrics worker thread.

- `void Stop()`

    Stops the heartbeat/metrics worker thread.

- `bool IsReady() const`

    Whether the manager is attached to a channel and started.

- `bool IsSupported() const`

    Whether the connected server reports telemetry support.

- `const std::string& ClientId() const`

    Returns the client identity used in heartbeats and diagnostics.

- `std::string ConfigHash() const`

    Returns the hash of the effective telemetry configuration, stable across failover.

- `int64_t LastCommandTimestamp() const`

    Returns the timestamp of the last processed command, or 0 if no command has been processed.

- `TelemetryConfig Config() const`

    Returns the current effective telemetry configuration.

- `bool MatchesConnection(const TelemetryConfig& config, const std::string& connection_scope) const`

    Whether a reconnect can reuse this manager without changing user-supplied telemetry settings.

- `std::string LastHeartbeatError() const`

    Returns the error message of the last heartbeat RPC, empty when none has failed.

- `void RegisterCommandHandler(const std::string& command_type, CommandHandler handler)`

    Registers a handler for a custom server-pushed command type. The handler is invoked with a `TelemetryCommand` and returns a `TelemetryCommandReply`.

- `void RecordOperation(const std::string& operation, const google::protobuf::Message& request, std::chrono::steady_clock::time_point started, bool success, const std::string& error_message, const std::string& request_id = "")`

    Records one operation for the current metrics window, deriving the target collection from the request message.

- `void RecordOperation(const std::string& operation, const std::string& collection, std::chrono::steady_clock::time_point started, bool success, const std::string& error_message, const std::string& request_id = "")`

    Records one operation for the current metrics window on an explicit collection.

- `std::vector<TelemetryError> RecentErrors(size_t max_count = 100) const`

    Returns the most recent recorded errors, oldest first. Each entry is a `TelemetryError` with the following members.

    - **timestamp** (*int64_t*) -

        Timestamp when the error occurred.

    - **operation** (*std::string*) -

        Operation name that produced the error.

    - **error_message** (*std::string*) -

        Error message.

    - **collection** (*std::string*) -

        Target collection, empty when not applicable.

    - **request_id** (*std::string*) -

        Client request ID of the failing call, empty when not available.

- `std::vector<TelemetrySnapshot> MetricsSnapshots() const`

    Returns the telemetry windows available for the current configuration window. Each entry is a `TelemetrySnapshot` with the following members.

    - **timestamp** (*int64_t*) -

        Start timestamp of the window.

    - **end_time** (*int64_t*) -

        End timestamp of the window.

    - **metrics** (*std::vector<TelemetryOperationMetrics>*) -

        Per-operation metrics within this window. Each entry is a `TelemetryOperationMetrics` with the following members.

        - **operation** (*std::string*) -

            Operation name, for example `Insert` or `Search`.

        - **global** (*TelemetryMetric*) -

            Metrics aggregated across all collections. A `TelemetryMetric` has the following members.

            - **request_count** (*int64_t*) -

                Number of RPC attempts issued.

            - **success_count** (*int64_t*) -

                Number of RPC attempts that succeeded.

            - **error_count** (*int64_t*) -

                Number of RPC attempts that failed.

            - **avg_latency_ms** (*double*) -

                Average latency in milliseconds.

            - **p99_latency_ms** (*double*) -

                P99 latency in milliseconds.

            - **max_latency_ms** (*double*) -

                Maximum latency in milliseconds.

        - **collection_metrics** (*std::unordered_map<std::string, TelemetryMetric>*) -

            Metrics aggregated per collection name, each value a `TelemetryMetric` with the members listed above.

- `std::vector<TelemetryCommandReply> PendingCommandReplies() const`

    Returns command replies not yet delivered back to the server. Each entry is a `TelemetryCommandReply` with the following members.

    - **command_id** (*std::string*) -

        Identifier of the command being replied to.

    - **success** (*bool*) -

        Whether the command was handled successfully.

    - **error_message** (*std::string*) -

        Error message when the command failed.

    - **payload** (*std::string*) -

        Reply payload as a JSON string.

- `void ProcessCommands(const std::vector<TelemetryCommand>& commands)`

    Processes server-pushed commands and generates replies. Each `TelemetryCommand` has the following members.

    - **command_id** (*std::string*) -

        Unique command identifier.

    - **command_type** (*std::string*) -

        Command type, for example `push_config` or `get_config`.

    - **payload** (*std::string*) -

        Command payload as a JSON string.

    - **create_time** (*int64_t*) -

        Creation timestamp of the command.

    - **persistent** (*bool*) -

        Whether the command must survive a client reconnect.

    - **target_scope** (*std::string*) -

        Scope the command targets, for example `config` or `collections`.

- `static std::string CalculateConfigHash(const std::vector<TelemetryCommand>& commands)`

    Computes the configuration hash a server would derive from the given commands.

**ERROR HANDLING:**

Returns `nullptr` when telemetry is not available for the connected client.

## Example

```cpp
#include "milvus/MilvusClientV2.h"

milvus::TelemetryCommandReply HandlePing(const milvus::TelemetryCommand&) {
    return milvus::TelemetryCommandReply{};
}

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto telemetry = client->GetTelemetry();
if (telemetry) {
    telemetry->RegisterCommandHandler("ping", HandlePing);
}
```
