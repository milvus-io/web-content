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

A **GetReplicateInfoResp** object that contains the checkpoint and salvage checkpoint information. The object has the following fields:

- **checkpoint** (*ReplicateCheckpoint*) -

    The current replication checkpoint. Each **ReplicateCheckpoint** has the following fields:

    - **clusterId** (*String*) -

        The ID of the cluster.

    - **pchannel** (*String*) -

        The physical channel.

    - **messageID** (*MessageID*) -

        The message ID of the checkpoint.

    - **timeTick** (*Long*) -

        The time tick of the checkpoint.

- **salvageCheckpoint** (*ReplicateCheckpoint*) -

    The salvage checkpoint used to recover the replication. Has the same fields as `checkpoint`.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when validation fails or the server returns an error for this operation.

## Example

```java
MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
    .uri("http://localhost:19530")
    .token("root:Milvus")
    .build());

GetReplicateInfoResp resp = client.getReplicateInfo(GetReplicateInfoReq.builder()
    .sourceClusterId("cluster-a")
    .targetPchannel("by-dev-rootcoord-dml_0_123v0")
    .build());
System.out.println(resp.getCheckpoint());
```

<!-- category: CDC; action: CREATE; addedSince: v3.0.x -->
