---
id: switch-mq-type.md
title: Switch MQ Type
summary: Switch the message queue of an existing Milvus deployment between Woodpecker and another message queue without downtime.
---

# Switch MQ Type

This guide describes how to switch the message queue (MQ) of an existing Milvus deployment **between Woodpecker and another message queue**, online and without downtime.

<div class="alert warning">

This feature is pending release and is subject to change. Please reach out to Milvus support if you want to try it out or have any questions.

</div>

## Prerequisites

- **The Switch MQ feature is available in Milvus 3.0 and later.** Upgrade your Milvus instance to Milvus 3.0 or later before using it — the feature is not available on earlier versions.
- The instance is running properly.

## Scope

This guide covers switching **between Woodpecker and another message queue** only. Switching directly between Pulsar and Kafka is out of scope.

- [Switch between RocksMQ and Woodpecker](switch-rocksmq-woodpecker.md) — Milvus Standalone (Docker Compose)
- [Switch between Pulsar and Woodpecker](switch-pulsar-woodpecker.md) — Milvus cluster (Helm / Milvus Operator)
- [Switch between Kafka and Woodpecker](switch-kafka-woodpecker.md) — Milvus cluster (Helm / Milvus Operator)

## General workflow

1. Ensure the Milvus instance is running properly.
2. Confirm the source MQ type and the target MQ type.
3. Render the target MQ's access settings into the Milvus configuration **without** changing the `mqType` value.
4. Trigger the switch by calling the WAL alter API on MixCoord.
5. Monitor the logs to confirm the switch has completed.

<div class="alert note">

Before switching, ensure that the target MQ does not contain topics with the same names as those used by the current Milvus instance. This is especially important if the target MQ has been used by another Milvus instance, as conflicting topic names can lead to unexpected behavior.

</div>

## Support matrix

| Source MQ | Target MQ | Deployment | Status |
|-----------|-----------|------------|--------|
| RocksMQ | Woodpecker (local/MinIO) | Standalone (Docker Compose) | **Supported** |
| Woodpecker (local/MinIO) | RocksMQ | Standalone (Docker Compose) | **Supported** |
| Pulsar (builtin/external) | Woodpecker (MinIO) | Cluster (Helm / Operator) | **Supported** |
| Woodpecker (MinIO) | Pulsar (external) | Cluster (Helm / Operator) | **Supported** |
| Kafka (builtin/external) | Woodpecker (MinIO) | Cluster (Helm / Operator) | **Supported** |
| Woodpecker (MinIO) | Kafka (external) | Cluster (Helm / Operator) | **Supported** |
| Woodpecker MinIO | Woodpecker local (or vice versa) | any | **Not supported** |

<div class="alert note">

Avoid switching MQ types back and forth repeatedly. If you do need to switch, make sure to clean up the related data before each switch — residual data may cause unexpected behavior.

</div>
