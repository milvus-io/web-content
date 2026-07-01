# dumpMessages()

This operation streams WAL messages from a physical channel for data salvage and replication diagnostics. Use it with a checkpoint returned by `getReplicateInfo`.

```java
public DumpMessagesResp dumpMessages(DumpMessagesReq request)
```

## Request Syntax

```java
dumpMessages(DumpMessagesReq.builder()
    .pchannel(String pchannel)
    .startMessageID(GetReplicateInfoResp.MessageID startMessageID)
    .startTimetick(Long startTimetick)
    .endTimetick(Long endTimetick)
    .includeStartMessage(Boolean includeStartMessage)
    .build());
```

**BUILDER METHODS:**

- `pchannel(String pchannel)`

    The physical channel to dump messages from.

- `startMessageID(GetReplicateInfoResp.MessageID startMessageID)`

    The WAL start position. `walName` supports `RocksMQ`, `Pulsar`, `Kafka`, and `WoodPecker`.

- `startTimetick(Long startTimetick)`

    The inclusive lower timetick bound. Defaults to `0L`.

- `endTimetick(Long endTimetick)`

    The upper timetick bound. Defaults to `0L`.

- `includeStartMessage(Boolean includeStartMessage)`

    Whether to include the start message itself. Defaults to `Boolean.TRUE`.

**RETURNS:**

*DumpMessagesResp*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when validation fails or the server returns an error for this operation.

## Example

```java
MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
    .uri("http://localhost:19530")
    .token("root:Milvus")
    .build());

GetReplicateInfoResp info = client.getReplicateInfo(GetReplicateInfoReq.builder()
    .sourceClusterId("cluster-a")
    .targetPchannel("by-dev-rootcoord-dml_0_123v0")
    .build());

DumpMessagesResp resp = client.dumpMessages(DumpMessagesReq.builder()
    .pchannel("by-dev-rootcoord-dml_0_123v0")
    .startMessageID(info.getCheckpoint().getMessageID())
    .includeStartMessage(true)
    .build());
for (DumpMessageInfo message : resp) {
    System.out.println(message.getProperties());
}
```

<!-- category: CDC; action: CREATE; addedSince: v3.0.x -->
