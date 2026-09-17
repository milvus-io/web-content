# getTelemetry()

This operation returns the telemetry manager for the connected client.

```java
public ClientTelemetryManager getTelemetry()
```

**RETURNS:**

*ClientTelemetryManager*

The telemetry manager for the connected client, or `null` when telemetry is not available.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build());

ClientTelemetryManager telemetry = client.getTelemetry();
if (telemetry != null && telemetry.isSupported()) {
    telemetry.registerCommandHandler("custom_command", command -> {
        // Handle a server-pushed telemetry command.
        return TelemetryCommandReply.of(command);
    });
}
```

<!-- category: Client; action: CREATE; addedSince: v3.0.x -->
