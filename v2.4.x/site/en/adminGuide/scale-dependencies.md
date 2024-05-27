---
id: scale-dependencies.md
title: Scale Dependencies
---

# Scale Milvus Dependencies

Milvus relies on various dependencies such as MinIO, Kafka, Pulsar, and etcd. Scaling these components can enhance Milvus's adaptability to different requirements.

For Milvus Operator users, please also refer to [Manage Dependencies For Milvus Operator](manage_dependencies.md)

## Scale MinIO

### Increase resources per MinIO pod

MinIO, an object storage system used by Milvus, can have its CPU and memory resources increased for each pod.

```yaml
# new-values.yaml
minio:
  resources:
     limits:
       cpu: 2
       memory: 8Gi
```

After saving the file, apply the changes with the following command:

```shell
helm upgrade <milvus-release> --reuse-values -f new-values.yaml milvus/milvus
```

You can also increase the disk capacity for the MioIO cluster by manually changing the value of `spec.resources.requests.storage` for each MioIO Persistent Volume Claim (PVC). Note that your default storage class should allow volume expansion.

### Add an extra MinIO server pool (Recommended)

You are advised to add an extra MioIO server pool for your Milvus instance.

```yaml
# new-values.yam;
minio:
  zones: 2
```

After saving the file, apply the changes with the following command:

```shell
helm upgrade <milvus-release> --reuse-values -f new-values.yaml milvus/milvus
```

This adds an additional server pool to your MinIO cluster, allowing Milvus to write to the MinIO server pool based on the free disk capacity of each server pool. For example, if a group of three pools has a total of 10 TiB free space distributed across the pools as follows:

|        | Free space | Write possibility |
|--------|------------|------------------|
| Pool A | 3 TiB      | 30% (3/10)       |
| Pool B | 2 TiB      | 20% (2/10)       |
| Pool C | 5 TiB      | 50% (5/10)       |

<div class="alert note">

MinIO does not automatically rebalance objects across new server pools. You can manually initiate a rebalance procedure with `mc admin rebalance` if needed.

</div>

## Kafka

### Increase resource per Kafka broker pod

Enhance the Kafka broker capacity by adjusting the CPU and memory resources for each broker pod.

```yaml
# new-values.yaml
kafka:
  resources:
     limits:
        cpu: 2
        memory: 12Gi
```

After saving the file, apply the changes with the following command:

```bash
helm upgrade <milvus-release> --reuse-values -f new-values.yaml milvus/milvus
```

You can also increase the disk capacity for the Kafka cluster by manually changing the value of `spec.resources.requests.storage` for each Kafka Persistent Volume Claim (PVC). Ensure your default storage class allows volume expansion.

## Add an extra Kafka broker pool (Recommended)

You are advised to add an extra Kafka server pool for your Milvus instance.

```yaml
# new-values.yaml
kafka:
  replicaCount: 4
```

After saving the file, apply the changes with the following command:

```shell
helm upgrade <milvus-release> --reuse-values -f new-values.yaml milvus/milvus
```

This will add an extra broker to your Kafka cluster. 

<div class="alert note">

Kafka does not automatically rebalance topics across all brokers. Manually rebalance topics/partitions across all Kafka brokers using `bin/kafka-reassign-partitions.sh` after logging into each Kafka broker pod if needed.

</div>

## Pulsar

Pulsar separates computation and storage. You can independently increase the capacity of Pulsar brokers (computation) and Pulsar bookies (storage).

## Increase resources per Pulsar broker pod

```yaml
# new-values.yaml
pulsar:
  broker:
    resources:
       limits:
         cpu: 4
         memory: 16Gi
```

After saving the file, apply the changes with the following command:

```shell
helm upgrade <milvus-release> --reuse-values -f new-values.yaml milvus/milvus
```

## Increase resources per Pulsar bookie pod

```yaml
# new-values.yaml
pulsar:
  bookkeeper:
    resources:
       limits:
         cpu: 4
         memory: 16Gi
```

After saving the file, apply the changes with the following command:

```shell
helm upgrade <milvus-release> --reuse-values -f new-values.yaml milvus/milvus
```

You can also increase the disk capacity for the Pulsar cluster by manually changing the value of `spec.resources.requests.storage` for each Pulsar bookie's Persistent Volume Claim (PVC). Note that your default storage class should allow volume expansion.

A Pulsar bookie pod has two types of storage: `journal` and `legers`. For the `journal` type of storage, consider using `ssd` or `gp3` as the storage class.

### Add an extra Pulsar broker pod

```yaml
# new-values.yaml
pulsar:
  broker:
    replicaCount: 3
```

After saving the file, apply the changes with the following command:

```shell
helm upgrade <milvus-release> --reuse-values -f new-values.yaml milvus/milvus
```


### Add an extra Pulsar bookie pod (Recommended)

```yaml
# new-values.yaml
pulsar:
  bookkeeper:
    replicaCount: 3
```

After saving the file, apply the changes with the following command:

```shell
helm upgrade <milvus-release> --reuse-values -f new-values.yaml milvus/milvus
```

## etcd

### Increase resources per etcd pod (recommended)

```yaml
# new-values.yaml
etcd:
  resources:
     limits:
       cpu: 2
       memory: 8Gi
```

After saving the file, apply the changes with the following command:

```shell
helm upgrade <milvus-release> --reuse-values -f new-values.yaml milvus/milvus
```

### Add extra etcd pods

The total number of etcd pods should be in odd numbers.

```yaml
# new-values.yaml
etcd:
  replicaCount: 5
```

After saving the file, apply the changes with the following command:

```shell
helm upgrade <milvus-release> --reuse-values -f new-values.yaml milvus/milvus
```
