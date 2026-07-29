---
id: switch-kafka-woodpecker.md
title: Switch between Kafka and Woodpecker
summary: Switch the message queue of a Milvus cluster between Kafka and Woodpecker, with Helm or Milvus Operator.
---

# Switch between Kafka and Woodpecker

This page describes how to switch the message queue (MQ) of a **Milvus cluster** between **Kafka** (builtin or external) and **Woodpecker** (MinIO backend), in both directions. For the general workflow and prerequisites, see [Switch MQ Type](switch-mq-type.md).

<div class="alert note">

**Prerequisite:** The Switch MQ feature is available in **Milvus 3.0 and later**. Upgrade your Milvus instance to Milvus 3.0 or later before you begin — the feature is not available on earlier versions.

</div>

<div class="alert warning">

Switching the message queue is a **high-risk operation**. Pick the section that matches **your** deployment method — **With Helm** or **With Milvus Operator** — and follow it top to bottom. Do not mix Helm and Operator commands.

</div>

## With Helm

### Switch from Kafka to Woodpecker (Helm)

**Step 1: Verify the Milvus instance is running.** Ensure your Milvus cluster is running properly — for example, by creating a test collection, inserting data, and running a query.

**Step 2: Execute the MQ switch.** Expose the MixCoord management interface, then call the switch API:

```shell
kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
```

In another terminal:

```shell
curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H "Content-Type: application/json" \
  -d '{"target_wal_name": "woodpecker"}'
```

**Step 3: Verify the switch is complete.**

```shell
kubectl logs <mixcoord-pod> | grep "successfully updated mq.type configuration in etcd"
```

A successful switch logs `[mqTypeValue=woodpecker]`.

**Step 4: (Optional) Stop Kafka and clean up.** For **builtin** Kafka, remove the Kafka pods and their PVCs. For **external** Kafka, clean up the Milvus topics in the external Kafka instance — they follow the format `<cluster_prefix>-dml_<seqNo>_<TimeTick><Version>`.

<div class="alert note">

If you plan to switch back to Kafka later, clean up the data/topics first to avoid conflicts.

</div>

### Switch from Woodpecker to Kafka (Helm)

**Step 1: Verify the Milvus instance is running.**

**Step 2: Configure the target Kafka connection and restart Milvus.** The switch needs Milvus to already know the Kafka connection, so write it into `user.yaml` via `extraConfigFiles` and apply with `helm upgrade` (which rolls the pods). `streaming.enabled=true` is required for the Switch MQ feature. For SASL/SSL details, see [Connect to Kafka with SASL/SSL](connect_kafka_ssl.md).

```yaml
# values.yaml
extraConfigFiles:
  user.yaml: |+
    kafka:
      brokerList:
        - <your_kafka_address>:<your_kafka_port>
      saslUsername:
      saslPassword:
      saslMechanisms: PLAIN
      securityProtocol: SASL_SSL
```

```shell
helm upgrade -i my-release zilliztech/milvus \
  --set kafka.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  -f values.yaml
```

Wait for all pods to be ready, then confirm the Kafka access configuration has been rendered into the Milvus configuration.

**Step 3: Execute the MQ switch.**

<div class="alert note">

Ensure the target Kafka does not contain Milvus topics from a previous configuration. If this is your first switch to Kafka, skip this note; otherwise clean up residual Milvus topics with the same names first.

</div>

```shell
kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
```

In another terminal:

```shell
curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H "Content-Type: application/json" \
  -d '{"target_wal_name": "kafka"}'
```

**Step 4: Verify the switch is complete.**

```shell
kubectl logs <mixcoord-pod> | grep "successfully updated mq.type configuration in etcd"
```

A successful switch logs `[mqTypeValue=kafka]`.

**Step 5: (Optional) Clean up Woodpecker data.** Delete the Woodpecker data on MinIO/S3 (under `<rootPath>/wp/...`, typically `files/wp/...`) and the Woodpecker metadata in etcd (`etcdctl get woodpecker --prefix`). If you plan to switch back to Woodpecker later, clean up these files first.

## With Milvus Operator

### Switch from Kafka to Woodpecker (Milvus Operator)

**Step 1: Verify the Milvus instance is running.**

**Step 2: Execute the MQ switch.** The MixCoord service is not exposed, so run the switch API from inside the MixCoord pod:

```shell
kubectl exec -it <mixcoord-pod> -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H "Content-Type: application/json" \
  -d '{"target_wal_name": "woodpecker"}'
```

**Step 3: Verify the switch is complete.**

```shell
kubectl logs <mixcoord-pod> | grep "successfully updated mq.type configuration in etcd"
```

A successful switch logs `[mqTypeValue=woodpecker]`.

**Step 4: Update the MQ type in the Operator.** Update the Operator-managed configuration so the Operator does not revert the switch. Create `change_configmap.yaml`:

```yaml
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies:
    msgStreamType: woodpecker
```

```shell
kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
```

**Step 5: (Optional) Stop Kafka and clean up.** For **builtin** Kafka, remove the Kafka pods and their PVCs. For **external** Kafka, clean up the Milvus topics (format `<cluster_prefix>-dml_<seqNo>_<TimeTick><Version>`).

### Switch from Woodpecker to Kafka (Milvus Operator)

**Step 1: Verify the Milvus instance is running.**

**Step 2: Configure the target Kafka connection and restart Milvus.** Put the Kafka connection under `spec.config` (the Operator renders `spec.config` into `user.yaml`) and set the MQ type; applying the CR rolls the pods with the new configuration. For SASL/SSL details, see [Connect to Kafka with SASL/SSL](connect_kafka_ssl.md).

```yaml
# change_configmap.yaml
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  config:
    kafka:
      brokerList:
        - <your_kafka_address>:<your_kafka_port>
      saslUsername:
      saslPassword:
      saslMechanisms: PLAIN
      securityProtocol: SASL_SSL
  dependencies:
    msgStreamType: kafka
```

```shell
kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
```

Wait for all pods to be ready, then confirm the Kafka access configuration has been rendered into the Milvus configuration.

**Step 3: Execute the MQ switch.**

<div class="alert note">

Ensure the target Kafka does not contain Milvus topics from a previous configuration. If this is your first switch to Kafka, skip this note; otherwise clean up residual Milvus topics with the same names first.

</div>

```shell
kubectl exec -it <mixcoord-pod> -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H "Content-Type: application/json" \
  -d '{"target_wal_name": "kafka"}'
```

**Step 4: Verify the switch is complete.**

```shell
kubectl logs <mixcoord-pod> | grep "successfully updated mq.type configuration in etcd"
```

A successful switch logs `[mqTypeValue=kafka]`.

**Step 5: (Optional) Clean up Woodpecker data.** Delete the Woodpecker data on MinIO/S3 (under `<rootPath>/wp/...`, typically `files/wp/...`) and the Woodpecker metadata in etcd (`etcdctl get woodpecker --prefix`). If you plan to switch back to Woodpecker later, clean up these files first.

## Supported scenarios

| Source MQ | Target MQ | Helm | Milvus Operator |
|-----------|-----------|------|-----------------|
| Builtin Kafka | Woodpecker (MinIO) | **Supported** | **Supported** |
| External Kafka | Woodpecker (MinIO) | **Supported** | **Supported** |
| Woodpecker (MinIO) | External Kafka | **Supported** | **Supported** |
| Kafka | Woodpecker (local) | **Supported but not recommended** (all pods need a shared FS) | **Not supported** |
