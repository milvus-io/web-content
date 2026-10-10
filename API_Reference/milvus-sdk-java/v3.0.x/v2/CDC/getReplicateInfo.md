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

        The message ID of the checkpoint.

    - `getTimeTick()` (*Long*) -

        The time tick of the checkpoint.

- `getSalvageCheckpoint()` (*ReplicateCheckpoint*) -

    The salvage checkpoint used to recover the replication. Has the same fields as `checkpoint`.

**EXCEPTIONS