---
id: mq_rocksmq.md
title: RocksMQ
---

# Use RocksMQ as the Milvus Message Queue

RocksMQ is an embedded message queue (WAL) bundled with Milvus, available for **Milvus Standalone only**. It was the default standalone message queue in earlier Milvus versions; in Milvus 3.x, Milvus Standalone uses embedded [Woodpecker](woodpecker.md) by default.

## Version compatibility

- **Standalone only** — RocksMQ is **not** supported in Milvus Distributed (cluster). See the [message queue support matrix](mqtype-overview.md#Supported-message-queues).
- RocksMQ ships with Milvus, so there is no separate version to install.
- It was the default standalone message queue in earlier Milvus versions, and is superseded by embedded Woodpecker in Milvus 3.x.

## Deploy Milvus Standalone with RocksMQ using Docker

### Install

Follow [Run Milvus in Docker](install_standalone-docker.md). In Milvus 3.x the standalone default is Woodpecker, so switch the message-queue type to RocksMQ explicitly. The bootstrap script writes a fresh `user.yaml` on the **first** `start`, so set the type **after** that first start and then `restart` to apply (a `restart` preserves `user.yaml`):

```bash
mkdir milvus-rocksmq && cd milvus-rocksmq
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh

# 1. First start — boots the container and writes a default user.yaml
bash standalone_embed.sh start

# 2. Set the message queue to RocksMQ
cat > user.yaml <<'EOF'
mq:
  type: rocksmq
EOF

# 3. Restart to apply the change
bash standalone_embed.sh restart
```

<div class="alert note">
Switching <code>mq.type</code> this way is meant for a <b>brand-new</b> instance (no collections yet). To change the message queue of an instance that already holds data, follow the switch procedure instead.
</div>

### Configure

To tune RocksMQ, add a `rocksmq` section to `user.yaml` and restart the service:

```yaml
mq:
  type: rocksmq
rocksmq:
  path: /var/lib/milvus/rdb_data   # where messages are stored
  lrucacheratio: 0.06              # rocksdb cache memory ratio
  rocksmqPageSize: 67108864        # 64 MB, size of each message page
  retentionTimeInMinutes: 4320     # 3 days
  retentionSizeInMB: 8192          # 8 GB
  compactionInterval: 86400        # 1 day, trigger rocksdb compaction
  compressionTypes: [0, 0, 7, 7, 7]
```

```bash
bash standalone_embed.sh restart
```

### Uninstall

```bash
bash standalone_embed.sh stop
bash standalone_embed.sh delete
```

## Notes

- **Upgrading from 2.5.x to 2.6.x:** **Message Queue limitations**: When upgrading to Milvus v3.0-beta, you must maintain your current message queue choice. Switching between different message queue systems during the upgrade is not supported. Support for changing message queue systems will be available in future versions.
 Because 2.6.x changes the standalone default to Woodpecker, pin `mq.type: rocksmq` in your `user.yaml` **before** upgrading if you want to keep RocksMQ.
- To change the message queue of a running instance, see Switch from RocksMQ to Woodpecker.

## What's next

- [Woodpecker (default message queue)](woodpecker.md)
