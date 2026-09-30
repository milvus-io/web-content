# startTelemetry()

Starts a telemetry manager whose worker was intentionally deferred during connection setup.

```java
public void startTelemetry()
```

This method is useful when the client was created with a deferred telemetry start. Call it after connection setup to begin reporting metrics and heartbeats.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build());

client.startTelemetry();
```

<!-- category: Client; action: CREATE; addedSince: v3.0.x -->
