---
id: switch-rocksmq-woodpecker.md
title: Switch between RocksMQ and Woodpecker
summary: Switch the message queue of a Milvus Standalone (Docker Compose) deployment between RocksMQ and Woodpecker.
---

# Switch between RocksMQ and Woodpecker

This page describes how to switch the message queue (MQ) of a **Milvus Standalone (Docker Compose)** deployment between **RocksMQ** and **Woodpecker** (local or MinIO backend), in both directions. For the general workflow and prerequisites, see [Switch MQ Type](switch-mq-type.md).

<div class="alert note">

- **Prerequisite:** The Switch MQ feature is available in **Milvus 3.0 and later**. Upgrade your Milvus instance to Milvus 3.0 or later before you begin — the feature is not available on earlier versions.
- MQ switching requires the Docker **Compose** deployment (which enables an etcd config source). The single-container Docker deployment does not support switching.

</div>

## Switch from RocksMQ to Woodpecker

### Step 1: Verify the Milvus instance is running

Verify your Milvus Standalone Docker Compose instance is running properly — for example, by creating a test collection, inserting data, and running a query.

### Step 2: Configure Woodpecker storage

Add the Woodpecker settings to the Milvus configuration **without** changing the `mqType` value. Run `docker exec -it milvus-standalone bash` to enter the container, then edit `/milvus/configs/user.yaml`:

```yaml
woodpecker:
  storage:
    type: minio   # minio or local
```

Restart the Milvus instance to apply the configuration:

```shell
docker compose restart
```

### Step 3: Execute the MQ switch

<div class="alert note">

If this is your first time switching to Woodpecker, skip this note. Otherwise, clean up residual Woodpecker meta and data before switching again — residual data may cause unexpected behavior.

</div>

```shell
curl -X POST http://<mixcoord_addr>:<mixcoord_port>/management/wal/alter \
  -H "Content-Type: application/json" \
  -d '{"target_wal_name": "woodpecker"}'
```

The MixCoord port is typically `9091`.

### Step 4: Verify the switch is complete

```shell
docker logs milvus-standalone | grep "successfully updated mq.type configuration in etcd"
```

A successful switch logs `[mqTypeValue=woodpecker]`.

### Step 5: (Optional) Clean up RocksMQ data

RocksMQ data is in the `volumes/milvus/rdb_data` and `volumes/milvus/rdb_data_meta_kv` directories defined in `docker-compose.yaml`. If you plan to switch back to RocksMQ later, clean up these files first to avoid conflicts.

## Switch from Woodpecker to RocksMQ

### Step 1: Verify the Milvus instance is running

Ensure your Milvus Standalone Docker Compose instance is running properly.

### Step 2: Execute the MQ switch

<div class="alert note">

Ensure the instance has no residual RocksMQ data from a previous run. If this is your first time switching to RocksMQ, skip this note; otherwise clean up the related RocksMQ meta and data first.

</div>

```shell
curl -X POST http://<mixcoord_addr>:<mixcoord_port>/management/wal/alter \
  -H "Content-Type: application/json" \
  -d '{"target_wal_name": "rocksmq"}'
```

### Step 3: Verify the switch is complete

```shell
docker logs milvus-standalone | grep "successfully updated mq.type configuration in etcd"
```

A successful switch logs `[mqTypeValue=rocksmq]`.

### Step 4: (Optional) Clean up Woodpecker data

- **Metadata (etcd):** the Woodpecker key prefix is typically `woodpecker/...`. View it with `etcdctl get woodpecker --prefix`, then delete it.
- **Storage data:** in **MinIO mode**, delete the log data under `<rootPath>/wp/...` (typically `files/wp/...`) in the bucket; in **local mode**, the data is on local disk at `volumes/milvus/data/wp/...`.

If you plan to switch back to Woodpecker later, clean up these files first to avoid conflicts.

## Supported scenarios

| Source MQ | Target MQ | Status | Notes |
|-----------|-----------|--------|-------|
| RocksMQ | Woodpecker (MinIO/local) | **Supported** | |
| Woodpecker (MinIO/local) | RocksMQ | **Supported** | |
| Woodpecker MinIO | Woodpecker local | **Not supported** | Switching between Woodpecker storage modes requires additional metadata handling, which is not yet supported. |
| Woodpecker local | Woodpecker MinIO | **Not supported** | Same as above. |
| RocksMQ / Woodpecker | External Pulsar / Kafka | **Supported but not recommended** | Keep standalone instances as simple as possible. |
