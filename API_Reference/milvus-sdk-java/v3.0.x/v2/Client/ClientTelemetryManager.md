# ClientTelemetryManager

A `ClientTelemetryManager` reports client metrics to the server via periodic heartbeats and handles server-pushed commands. Obtain the manager for a client via `MilvusClientV2.getTelemetry()`.

```java
io.milvus.telemetry.ClientTelemetryManager
```

## Methods

- `void start()`

    Starts the telemetry reporting loop.

- `void close()`

    Stops telemetry reporting and releases resources.

- `boolean isReady()`

    Returns whether the manager is ready to report.

- `boolean isClosed()`

    Returns whether the manager has been closed.

- `boolean isSupported()`

    Returns whether the connected server supports telemetry.

- `Throwable getLastHeartbeatError()`

    Returns the error of the last heartbeat, or `null` when the last heartbeat succeeded.

- `String getClientId()`

    Returns the client identifier.

- `static String newClientRequestId()`

    Generates a new client request identifier used to correlate operations in server logs.

- `String getConfigHash()`

    Returns a hash of the active telemetry configuration.

- `long getLastCommandTimestamp()`

    Returns the timestamp of the last server-pushed command.

- `TelemetryConfig getConfig()`

    Returns the active telemetry configuration. See TelemetryConfig.

- `void registerCommandHandler(String type, CommandHandler handler)`

    Registers a handler for server-pushed commands of the given type. `CommandHandler` is a functional interface invoked with each matching command.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

ConnectConfig config = ConnectConfig.builder()
    .uri("http://localhost:19530")
    .token("root:Milvus")
    .build();

MilvusClientV2 client = new MilvusClientV2(config);

var telemetry = client.getTelemetry();
if (telemetry.isSupported()) {
    System.out.println("Telemetry client id: " + telemetry.getClientId());
}
```
