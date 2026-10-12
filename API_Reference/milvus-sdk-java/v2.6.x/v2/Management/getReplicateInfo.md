# getReplicateInfo()

This operation gets replication checkpoint information for a target physical channel. Use it before dumping messages or diagnosing cross-cluster replication progress.

```java
public GetReplicateInfoResp getReplicateInfo(GetReplicateInfoReq request)
```

## Request Syntax

```java
getReplicateInfo(GetReplicateInfoReq.builder()
    .sourceClusterId(String sourceClusterId)
    .targetPchannel(String targetPchannel)
    .build());
```

**BUILDER METHODS:**

- `sourceClusterId(String sourceClusterId)`

    The source cluster ID to inspect.

- `targetPchannel(String targetPchannel)`

    The target physical channel whose replicate checkpoint should be returned.

**RETURNS:**

*GetReplicateInfoResp*

**PARAMETERS:**

- **checkpoint** (*ReplicateCheckpoint*)

    The replicate checkpoint of the target physical channel.

- **salvageCheckpoint** (*ReplicateCheckpoint*)

    The salvage checkpoint of the target physical channel.

Each **ReplicateCheckpoint** object has the following members:

- **clusterId** (*String*)

    The ID of the source cluster.

- **pchannel** (*String*)

    The physical channel the checkpoint belongs to.

- **messageID** (*MessageID*)

    The WAL message ID. It has the following members:

    - **id** (*String*)

        The ID of the message.

    - **walName** (*String*)

        The name of the WAL. Supports `RocksMQ`, `Pulsar`, `Kafka`, and `WoodPecker`.

- **timeTick** (*Long*)

    The timetick of the checkpoint.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when validation fails or the server returns an error for this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.cdc.request.GetReplicateInfoReq;
import io.milvus.v2.service.cdc.response.GetReplicateInfoResp;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

GetReplicateInfoResp resp = client.getReplicateInfo(GetReplicateInfoReq.builder()
        .sourceClusterId("cluster-a")
        .targetPchannel("by-dev-rootcoord-dml_0_123v0")
        .build());
System.out.println(resp.getCheckpoint());
```

## Related operations

- [getReplicateConfiguration()](getReplicateConfiguration.md)

- [dumpMessages()](dumpMessages.md)

- [updateReplicateConfiguration()](updateReplicateConfiguration.md)
