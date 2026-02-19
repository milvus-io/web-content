---
id: switch_milvus_cluster_mq_type-operator.md
summary: Learn how to switch the message queue type for a Milvus cluster.
title: Switch MQ Type for Milvus Cluster
---

# Switch MQ Type for Milvus Cluster

This topic describes how to switch the message queue (MQ) type for an existing Milvus cluster deployment. Milvus supports online MQ switching between Pulsar, Kafka, and Woodpecker without downtime.

## Prerequisites

- A running Milvus cluster instance installed via [Milvus Operator](install_cluster-milvusoperator.md) or [Helm](install_cluster-helm.md).
- The Milvus instance has been upgraded to the latest version that supports this Switch MQ feature.

## Switch from Pulsar/Kafka to Woodpecker (MinIO)

Follow these steps to switch the MQ type from Pulsar or Kafka to Woodpecker with MinIO storage.

### Step 1: Verify the Milvus instance is running

Before switching, ensure that your Milvus cluster instance is running properly. You can verify this by creating a test collection, inserting data, and running a query.

### Step 2: (Optional) Verify Woodpecker configuration

The default Milvus configuration already sets Woodpecker storage type to MinIO, so no additional configuration is required in most cases.

However, if you have previously customized the Woodpecker configuration, you must ensure that `woodpecker.storage.type` is set to `minio`. Update the Milvus configuration **without** changing the `mqType` value:

```yaml
woodpecker:
  storage:
    type: minio
```

- For **Helm**, refer to [Configure Milvus with Helm Charts](configure-helm.md) for instructions on updating configuration.
- For **Milvus Operator**, refer to [Configure Milvus with Milvus Operator](configure_operator.md) for instructions on updating configuration.

### Step 3: Execute the MQ switch

Run the following command to trigger the switch to Woodpecker:

```shell
curl -X POST http://<mixcoord_addr>:9091/management/wal/alter \
  -H "Content-Type: application/json" \
  -d '{"target_wal_name": "woodpecker"}'
```

<div class="alert note">

Replace `<mixcoord_addr>` with the actual address of your MixCoord service.

</div>

### Step 4: Verify the switch is complete

The switch process completes automatically. Monitor the Milvus logs for the following key messages to confirm the switch has finished:

```
WAL switch success: <MQ1> switch to <MQ2> finish, re-opening required
AlterWAL broadcast message acknowledged by all vchannels
successfully updated mq.type configuration in etcd
```

<div class="alert note">

In the log messages above, `<MQ1>` is the source MQ type (e.g., `pulsar` or `kafka`), and `<MQ2>` is the target MQ type (`woodpecker`).

- The first message indicates that the WAL switch from the source to the target has completed.
- The second message indicates that all physical channels have been switched.
- The third message indicates that the `mq.type` configuration has been updated in etcd.

</div>

## Switch from Woodpecker (MinIO) to Pulsar or Kafka

Follow these steps to switch the MQ type from Woodpecker back to Pulsar or Kafka.

### Step 1: Verify the Milvus instance is running

Before switching, ensure that your Milvus cluster instance is running properly.

### Step 2: Configure the target MQ

Before triggering the switch, you need to ensure the target MQ service (Pulsar or Kafka) is available and its access configuration is rendered into the Milvus configuration.

<div class="alert note">

The exact steps in this section depend on whether you are using an internal (bundled) or external MQ service.

</div>

#### Option A: Internal Pulsar/Kafka (bundled with Helm)

If you are using the bundled Pulsar or Kafka deployed by Helm, update your Helm release to enable the target MQ service and disable Woodpecker. The `streaming.enabled=true` flag is required to enable the Streaming Node, which is a prerequisite for the Switch MQ feature. For example, to switch to Pulsar:

```shell
helm upgrade -i my-release milvus/milvus \
  --set pulsarv3.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  -f values.yaml
```

After the upgrade, verify that the target MQ access configuration has been rendered into the Milvus configuration. For example, for Pulsar:

```yaml
pulsar:
  address: <pulsar-proxy-address>
  port: 6650
```

#### Option B: Internal Pulsar/Kafka (managed by Milvus Operator)

If you are using Milvus Operator, update the Milvus custom resource to include the target MQ access configuration. Refer to [Configure Milvus with Milvus Operator](configure_operator.md) for details on updating Milvus configuration.

#### Option C: External Pulsar/Kafka

If you are using an external Pulsar or Kafka service, you do not need to change the `mqType`. Simply add the external MQ access configuration to your `values.yaml` and restart the Milvus instance to render the configuration.

### Step 3: Execute the MQ switch

Run the following command to trigger the switch to Pulsar (replace `pulsar` with `kafka` if switching to Kafka):

```shell
curl -X POST http://<mixcoord_addr>:9091/management/wal/alter \
  -H "Content-Type: application/json" \
  -d '{"target_wal_name": "pulsar"}'
```

<div class="alert note">

Replace `<mixcoord_addr>` with the actual address of your MixCoord service.

</div>

### Step 4: Verify the switch is complete

The switch process completes automatically. Monitor the Milvus logs for the following key messages to confirm the switch has finished:

```
WAL switch success: <MQ1> switch to <MQ2> finish, re-opening required
AlterWAL broadcast message acknowledged by all vchannels
successfully updated mq.type configuration in etcd
```

<div class="alert note">

In the log messages above, `<MQ1>` is the source MQ type (`woodpecker`), and `<MQ2>` is the target MQ type (e.g., `pulsar` or `kafka`).

- The first message indicates that the WAL switch from the source to the target has completed.
- The second message indicates that all physical channels have been switched.
- The third message indicates that the `mq.type` configuration has been updated in etcd.

</div>
