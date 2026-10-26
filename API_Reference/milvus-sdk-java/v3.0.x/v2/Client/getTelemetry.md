# getTelemetry()

This operation returns the telemetry manager for the connected client.

```java
public ClientTelemetryManager getTelemetry()
```

**RETURN TYPE:**

*ClientTelemetryManager*

**RETURNS:**


The telemetry manager for the connected client, or `null` when telemetry is not available. The manager exposes:

- `isSupported()` (*boolean*) -

    Whether the connected server supports client telemetry.

- `isReady()` (*boolean*) -

    Whether the telemetry heartbeat is ready.

- `isClosed()` (*boolean*) -

    Whether the manager has been closed.

- `getLastHeartbeatError()` (*Throwable*) -

    The most recent heartbeat error, or `null` when the last heartbeat succeeded.

- `getClientId()` (*String*) -

    The stable telemetry client identifier.

- `getConfigHash()` (*String*) -

    The hash of the active server telemetry configuration.

- `getLastCommandTimestamp()` (*long*) -

    The timestamp of the most recently processed server command.

- `registerCommandHandler(String type, CommandHandler handler)` (*void*) -

    Registers a handler for a server-pushed telemetry command type. The handler receives a `ClientCommand` and returns a `CommandReply`.

- `close()` (*void*) -

    Stops telemetry and releases its resources.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.grpc.CommandReply;
import io.milvus.telemetry.ClientTelemetryManager;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build());

ClientTelemetryManager telemetry = client.getTelemetry();
if (telemetry != null && telemetry.isSupported()) {
    telemetry.registerCommandHandler("custom_command", command -> {
        // Handle a server-pushed telemetry command.
        return CommandReply.newBuilder().setSuccess(true).build();
    });
}
```

<!-- category: Client; action: CREATE; addedSince: v3.0.x -->
