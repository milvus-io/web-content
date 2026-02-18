---
id: switch_milvus_standalone_mq_type-operator.md
summary: Learn how to switch the message queue type for Milvus standalone.
title: Switch MQ Type for Milvus Standalone
---

# Switch MQ Type for Milvus Standalone

This topic describes how to switch the message queue (MQ) type for an existing Milvus standalone deployment. Milvus supports online MQ switching without downtime.

## Prerequisites

- A running Milvus Standalone instance installed via [Docker](install_standalone-docker.md) or [Docker Compose](install_standalone-docker-compose.md).
- The Milvus instance has been upgraded to the latest version that supports this Switch MQ feature.

## General workflow

The general workflow for switching the MQ type is as follows:

1. Ensure the Milvus instance is running properly.
2. Confirm the source MQ type and the target MQ type.
3. Configure the target MQ's access settings into the Milvus configuration without changing the `mqType` value.
4. Trigger the switch by calling the WAL alter API.
5. Monitor the logs to verify the switch has completed successfully.

<div class="alert note">

Before switching, ensure that the target MQ does not contain topics with the same names as those used by the current Milvus instance. This is especially important if the target MQ service has been previously used by another Milvus instance, as conflicting topic names can lead to unexpected behavior.

</div>

## Switch from RocksMQ to Woodpecker (Local Storage)

This procedure applies to **Milvus Standalone Docker** deployments that use RocksMQ by default.

### Step 1: Verify the Milvus instance is running

Ensure your Milvus Standalone Docker instance is running properly. You can verify this by creating a test collection, inserting data, and running a query.

### Step 2: Configure Woodpecker with local storage

Update the Milvus configuration to add Woodpecker settings **without** changing the `mqType` value. Create or update the `user.yaml` file with the following content:

```yaml
woodpecker:
  storage:
    type: local
```

Then restart the Milvus instance to apply the configuration:

```shell
bash standalone_embed.sh restart
```

### Step 3: Execute the MQ switch

Run the following command to trigger the switch to Woodpecker:

```shell
curl -X POST http://<mixcoord_addr>:9091/management/wal/alter \
  -H "Content-Type: application/json" \
  -d '{"target_wal_name": "woodpecker"}'
```

<div class="alert note">

Replace `<mixcoord_addr>` with the actual address of your MixCoord service (by default, `localhost` for standalone deployments).

</div>

### Step 4: Verify the switch is complete

The switch process completes automatically. Monitor the Milvus logs for the following key messages to confirm the switch has finished:

```
WAL switch success: <MQ1> switch to <MQ2> finish, re-opening required
AlterWAL broadcast message acknowledged by all vchannels
successfully updated mq.type configuration in etcd
```

<div class="alert note">

In the log messages above, `<MQ1>` is the source MQ type (`rocksmq`), and `<MQ2>` is the target MQ type (`woodpecker`).

- The first message indicates that the WAL switch from the source to the target has completed.
- The second message indicates that all physical channels have been switched.
- The third message indicates that the `mq.type` configuration has been updated in etcd.

</div>

## Switch from RocksMQ to Woodpecker (MinIO Storage)

This procedure applies to **Milvus Standalone Docker Compose** deployments.

<div class="alert note">

Starting from Milvus v2.6, the default `docker-compose.yaml` already declares `mqType` as Woodpecker. Unless you have modified the default configuration or upgraded from v2.5, this procedure may not be necessary.

</div>

### Step 1: Verify the Milvus instance is running

Ensure your Milvus Standalone Docker Compose instance is running properly.

### Step 2: (Optional) Verify Woodpecker configuration

The default Milvus configuration already sets Woodpecker storage type to MinIO, so no additional configuration is required in most cases.

However, if you have previously customized the Woodpecker configuration, you must ensure that `woodpecker.storage.type` is set to `minio`. Create or update the `user.yaml` file with the following content:

```yaml
woodpecker:
  storage:
    type: minio
```

Then restart the Milvus instance to apply the configuration:

```shell
docker compose down
docker compose up -d
```

### Step 3: Execute the MQ switch

Run the following command to trigger the switch to Woodpecker:

```shell
curl -X POST http://<mixcoord_addr>:9091/management/wal/alter \
  -H "Content-Type: application/json" \
  -d '{"target_wal_name": "woodpecker"}'
```

<div class="alert note">

Replace `<mixcoord_addr>` with the actual address of your MixCoord service (by default, `localhost` for standalone deployments).

</div>

### Step 4: Verify the switch is complete

The switch process completes automatically. Monitor the Milvus logs for the following key messages to confirm the switch has finished:

```
WAL switch success: <MQ1> switch to <MQ2> finish, re-opening required
AlterWAL broadcast message acknowledged by all vchannels
successfully updated mq.type configuration in etcd
```

<div class="alert note">

In the log messages above, `<MQ1>` is the source MQ type (`rocksmq`), and `<MQ2>` is the target MQ type (`woodpecker`).

- The first message indicates that the WAL switch from the source to the target has completed.
- The second message indicates that all physical channels have been switched.
- The third message indicates that the `mq.type` configuration has been updated in etcd.

</div>
