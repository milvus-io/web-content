---
id: mqtype-overview.md
title: Message Queue Overview
summary: Overview of the message queue (mqType) options Milvus supports, and which one to use for standalone vs. distributed deployments.
---

# Message Queue Overview

Milvus relies on a message queue (write-ahead log, WAL) to manage logs of recent changes, output stream logs, and provide log subscriptions. In Milvus 3.x, **Woodpecker** is the default message queue and requires no separate messaging infrastructure. Pulsar, Kafka, and RocksMQ remain supported for specific scenarios.

## Supported message queues

| Message queue | Milvus Standalone | Milvus Distributed (cluster) | Default in | Notes |
| --- | :---: | :---: | --- | --- |
| [Woodpecker](woodpecker.md) | ✔️ (embedded) | ✔️ (embedded or service) | **Milvus 3.x** (both modes) | Default and recommended. Cloud-native WAL on object storage; no external service required. |
| [Pulsar](mq_pulsar.md) | ✔️ | ✔️ | ≤ 2.5.x (cluster default) | Supported, external or bundled. |
| [Kafka](mq_kafka.md) | ✔️ | ✔️ | — | Supported. Only Kafka 2.x or 3.x. |
| [RocksMQ](mq_rocksmq.md) | ✔️ | ✖️ | ≤ 2.5.x (standalone default) | Supported for **standalone only**. |

<div class="alert note">

- Each Milvus instance uses exactly one message queue.
- **Message Queue limitations**: When upgrading to Milvus v3.0-beta, you must maintain your current message queue choice. Switching between different message queue systems during the upgrade is not supported. Support for changing message queue systems will be available in future versions.

- To change the message queue of a running instance, see [Switch MQ Type](switch-mq-type.md). The Switch MQ feature is available in **Milvus 3.0 and later** — upgrade to Milvus 3.0 or later first.

</div>

## Choosing a message queue

- **New deployments (Milvus 3.x):** use **Woodpecker** (the default). Standalone runs it embedded; for distributed (cluster), the recommended default is a dedicated [service](woodpecker.md#Deployment-modes) deployed with Helm, and embedded is also supported.
- **Existing Pulsar or Kafka users:** Pulsar and Kafka remain fully supported. Keep them, or [switch to Woodpecker](switch-mq-type.md).
- **RocksMQ:** standalone only, and superseded by embedded Woodpecker in Milvus 3.x.
