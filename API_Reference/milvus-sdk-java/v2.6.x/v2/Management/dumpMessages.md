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

**RETURNS:**

*DumpMessagesResp*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when validation fails or the server returns an error for this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.cdc.request.DumpMessagesReq;
import io.milvus.v2.service.cdc.request.GetReplicateInfoReq;
import io.milvus.v2.service.cdc.response.DumpMessageInfo;
import io.milvus.v2.service.cdc.response.DumpMessagesResp;
import io.milvus.v2.service.cdc.response.GetReplicateInfoResp;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

GetReplicateInfoResp info = client.getReplicateInfo(GetReplicateInfoReq.builder()
        .sourceClusterId("cluster-a")
        .targetPchannel("by-dev-rootcoord-dml_0_123v0")
        .build());

DumpMessagesResp resp = client.dumpMessages(DumpMessagesReq.builder()
        .pchannel("by-dev-rootcoord-dml_0_123v0")
        .startMessageID(info.getCheckpoint().getMessageID())
        .build());
for (DumpMessageInfo message : resp) {
    System.out.println(message.getProperties());
}
```

## Related operations

- [getReplicateInfo()](getReplicateInfo.md)

- [getReplicateConfiguration()](getReplicateConfiguration.md)
