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

**RETURN TYPE:**

*GetReplicateInfoResp*

**RETURNS:**

A **GetReplicateInfoResp** object that contains the checkpoint and salvage checkpoint information.

- `getCheckpoint()` (*ReplicateCheckpoint*) -

    The current replication checkpoint. Each **ReplicateCheckpoint** has the following getters:

    - `getClusterId()` (*String*) -

        The ID of the cluster.

    - `getPchannel()` (*String*) -

        The physical channel.

    - `getMessageID()` (*MessageID*) -

        The message ID of the checkpoint. Each **MessageID** has the following getters:

        - `getId()` (*String*) -

            The message ID value.

        - `getWalName()` (*String*) -

            The WAL implementation name. Supported values are `RocksMQ`, `Pulsar`, `Kafka`, and `WoodPecker`.

    - `getTimeTick()` (*Long*) -

        The time tick of the checkpoint.

- `getSalvageCheckpoint()` (*ReplicateCheckpoint*) -

    The salvage checkpoint used to recover the replication. Has the same fields as `checkpoint`.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when validation fails or the server returns an error for this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.cdc.request.GetReplicateInfoReq;
import io.milvus.v2.service.cdc.response.GetReplicateInfoResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
    .uri("http://localhost:19530")
    .token("root:Milvus")
    .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);


// 2. Get replication info for a cluster and channel
GetReplicateInfoResp resp = client.getReplicateInfo(GetReplicateInfoReq.builder()
    .sourceClusterId("cluster-a")
    .targetPchannel("by-dev-rootcoord-dml_0_123v0")
    .build());
System.out.println(resp.getCheckpoint());
```

<!-- category: CDC; action: CREATE; addedSince: v3.0.x -->
