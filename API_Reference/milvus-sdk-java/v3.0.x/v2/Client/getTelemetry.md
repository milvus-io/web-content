# getTelemetry()

This operation returns the telemetry manager for the connected client.

```java
public ClientTelemetryManager getTelemetry()
```

**RETURNS:**

*ClientTelemetryManager*

The telemetry manager for the connected client, or `null` when telemetry is not available.

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
