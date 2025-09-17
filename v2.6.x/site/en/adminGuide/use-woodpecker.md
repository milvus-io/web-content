---
id: use-woodpecker.md
title: Use Woodpecker
related_key: Woodpecker
summary: Learn how to enable woodpecker as the WAL in milvus.
beta: Milvus 2.6.x
---

# Use Woodpecker

This guide explains how to enable and use Woodpecker as the Write-Ahead Log (WAL) in Milvus 2.6.x. Woodpecker is a cloud‑native WAL designed for object storage, offering high throughput, low operational overhead, and seamless scalability. For architecture and benchmark details, see [Woodpecker](woodpecker_architecture.md).

## Overview

- Starting from Milvus 2.6, Woodpecker is an optional WAL that provides ordered writes and recovery as the logging service.
- As a message queue choice, it behaves similarly to Pulsar/Kafka and can be enabled via configuration.
- Two storage backends are supported: local file system (`local`) and object storage (`minio`/S3-compatible).

## Quick start

To enable Woodpecker, set the MQ type to Woodpecker:

```yaml
mq:
  type: woodpecker
```

Note: Switching `mq.type` for a running cluster is an upgrade operation. Follow the upgrade procedure carefully and validate on a fresh cluster before switching production.

## Configuration

Below is the complete Woodpecker configuration block (edit `milvus.yaml` or override in `user.yaml`):

```yaml
# Related configuration of woodpecker, used to manage Milvus logs of recent mutation operations, output streaming log, and provide embedded log sequential read and write.
woodpecker:
  meta:
    type: etcd # The Type of the metadata provider. currently only support etcd.
    prefix: woodpecker # The Prefix of the metadata provider. default is woodpecker.
  client:
    segmentAppend:
      queueSize: 10000 # The size of the queue for pending messages to be sent of each log.
      maxRetries: 3 # Maximum number of retries for segment append operations.
    segmentRollingPolicy:
      maxSize: 256M # Maximum size of a segment.
      maxInterval: 10m # Maximum interval between two segments, default is 10 minutes.
      maxBlocks: 1000 # Maximum number of blocks in a segment
    auditor:
      maxInterval: 10s # Maximum interval between two auditing operations, default is 10 seconds.
  logstore:
    segmentSyncPolicy:
      maxInterval: 200ms # Maximum interval between two sync operations, default is 200 milliseconds.
      maxIntervalForLocalStorage: 10ms # Maximum interval between two sync operations local storage backend, default is 10 milliseconds.
      maxBytes: 256M # Maximum size of write buffer in bytes.
      maxEntries: 10000 # Maximum entries number of write buffer.
      maxFlushRetries: 5 # Maximum size of write buffer in bytes.
      retryInterval: 1000ms # Maximum interval between two retries. default is 1000 milliseconds.
      maxFlushSize: 2M # Maximum size of a fragment in bytes to flush.
      maxFlushThreads: 32 # Maximum number of threads to flush data
    segmentCompactionPolicy:
      maxSize: 2M # The maximum size of the merged files.
      maxParallelUploads: 4 # The maximum number of parallel upload threads for compaction.
      maxParallelReads: 8 # The maximum number of parallel read threads for compaction.
    segmentReadPolicy:
      maxBatchSize: 16M # Maximum size of a batch in bytes.
      maxFetchThreads: 32 # Maximum number of threads to fetch data.
  storage:
    type: minio # The Type of the storage provider. Valid values: [minio, local]
    rootPath: /var/lib/milvus/woodpecker # The root path of the storage provider.
```

Key notes:

- `woodpecker.meta`
  - **type**: Currently only `etcd` is supported. Reuse the same etcd as Milvus to store lightweight metadata.
  - **prefix**: The key prefix for metadata. Default: `woodpecker`.
- `woodpecker.client`
  - Controls segment append/rolling/auditing behavior on the client side to balance throughput and end‑to‑end latency.
- `woodpecker.logstore`
  - Controls sync/flush/compaction/read policies for log segments. These are the primary knobs for throughput/latency tuning.
- `woodpecker.storage`
  - **type**: `minio` for MinIO/S3‑compatible object storage (MinIO/S3/GCS/OSS, etc.); `local` for local/shared file systems.
  - **rootPath**: Root path for the storage backend (effective for `local`; with `minio`, paths are dictated by bucket/prefix).

## Deployment modes

Milvus supports both Standalone and Cluster modes. Woodpecker storage backend support matrix:

|                   | `storage.type=local`     | `storage.type=minio`     |
| ----------------- | ------------------------ | ------------------------ |
| Milvus Standalone | Supported                 | Supported                 |
| Milvus Cluster    | Limited (needs shared FS) | Supported                 |

Notes:

- With `minio`, Woodpecker shares the same object storage with Milvus (MinIO/S3/GCS/OSS, etc.).
- With `local`, a single‑node local disk is only suitable for Standalone. If all pods can access a shared file system (e.g., NFS), Cluster mode can also use `local`.

## Deployment guides

### Enable Woodpecker for a Milvus Cluster on Kubernetes (Milvus Operator, storage=minio)

After installing the [Milvus Operator](install_cluster-milvusoperator.md), start a Milvus cluster with Woodpecker enabled using the official sample:

```bash
kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_woodpecker.yaml

```

This sample configures Woodpecker as the message queue and enables the Streaming Node. The first startup may take time to pull images; wait until all pods are ready:

```bash
kubectl get pods
kubectl get milvus my-release -o yaml | grep -A2 status
```
When ready, you should see pods similar to:
```
NAME                                               READY   STATUS    RESTARTS   AGE
my-release-etcd-0                                  1/1     Running   0          17m
my-release-etcd-1                                  1/1     Running   0          17m
my-release-etcd-2                                  1/1     Running   0          17m
my-release-milvus-datanode-7f8f88499d-kc66r        1/1     Running   0          16m
my-release-milvus-mixcoord-7cd7998d-x59kg          1/1     Running   0          16m
my-release-milvus-proxy-5b56cf8446-pbnjm           1/1     Running   0          16m
my-release-milvus-querynode-0-558d9cdd57-sgbfx     1/1     Running   0          16m
my-release-milvus-streamingnode-58fbfdfdd8-vtxfd   1/1     Running   0          16m
my-release-minio-0                                 1/1     Running   0          17m
my-release-minio-1                                 1/1     Running   0          17m
my-release-minio-2                                 1/1     Running   0          17m
my-release-minio-3                                 1/1     Running   0          17m
```
Run the following command to uninstall the Milvus cluster.
```bash
kubectl delete milvus my-release
```

If you need to adjust Woodpecker parameters, follow the settings described in [message storage config](deploy_pulsar.md).

### Enable Woodpecker for a Milvus Cluster on Kubernetes (Helm Chart, storage=minio)

First add and update the Milvus Helm chart as described in [Run Milvus in Kubernetes with Helm](install_cluster-helm.md).

Then deploy with one of the following examples:

– Cluster deployment (recommended settings with Woodpecker and Streaming Node enabled):

```bash
helm install my-release zilliztech/milvus \
  --set image.all.tag=v2.6.0 \
  --set pulsarv3.enabled=false \
  --set woodpecker.enabled=true \
  --set streaming.enabled=true \
  --set indexNode.enabled=false
```

– Standalone deployment (Woodpecker enabled):

```bash
helm install my-release zilliztech/milvus \
  --set image.all.tag=v2.6.0 \
  --set cluster.enabled=false \
  --set pulsarv3.enabled=false \
  --set standalone.messageQueue=woodpecker \
  --set woodpecker.enabled=true \
  --set streaming.enabled=true
```

After deployment, follow the docs to port‑forward and connect. To adjust Woodpecker parameters, follow the settings described in [message storage config](deploy_pulsar.md).

### Enable Woodpecker for Milvus Standalone in Docker (storage=local)

Follow [Run Milvus in Docker](install_standalone-docker.md). Example:

```bash
mkdir milvus-wp && cd milvus-wp
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh

# Create user.yaml to enable Woodpecker with local filesystem
cat > user.yaml <<'EOF'
mq:
  type: woodpecker
woodpecker:
  storage:
    type: local
    rootPath: /var/lib/milvus/woodpecker
EOF

bash standalone_embed.sh start
```

To further change Woodpecker settings, update `user.yaml` and run `bash standalone_embed.sh restart`.

### Enable Woodpecker for Milvus Standalone with Docker Compose (storage=minio)

Follow [Run Milvus with Docker Compose](install_standalone-docker-compose.md). Example:

```bash
mkdir milvus-wp-compose && cd milvus-wp-compose
wget https://github.com/milvus-io/milvus/releases/download/v2.6.0/milvus-standalone-docker-compose.yml -O docker-compose.yml
# By default, the Docker Compose standalone uses Woodpecker
sudo docker compose up -d
# If you need to change Woodpecker parameters further, write an override:
docker exec -it milvus-standalone bash -lc 'cat > /milvus/configs/user.yaml <<EOF
mq:
  type: woodpecker
woodpecker:
  logstore:
    segmentSyncPolicy: 
      maxFlushThreads: 16
  storage:
    type: minio
EOF'

# Restart the container to apply the changes
docker restart milvus-standalone
```

## Throughput tuning tips

Based on the benchmarks and backend limits in [Woodpecker](woodpecker_architecture.md), optimize end‑to‑end write throughput from the following aspects:

- Storage‑side
  - **Object storage (minio/S3‑compatible)**: Increase concurrency and object size (avoid tiny objects). Watch network and bucket bandwidth limits. A single MinIO node on SSD often caps around 100 MB/s locally; a single EC2 to S3 can reach GB/s.
  - **Local/shared file systems (local)**: Prefer NVMe/fast disks. Ensure the FS handles small writes and fsync latency well.
- Woodpecker knobs
  - Increase `logstore.segmentSyncPolicy.maxFlushSize` and `maxFlushThreads` for larger flushes and higher parallelism.
  - Tune `maxInterval` according to media characteristics (trade latency for throughput with longer aggregation).
  - For object storage, consider increasing `segmentRollingPolicy.maxSize` to reduce segment switches.
- Client/application side
  - Use larger batch sizes and more concurrent writers/clients.
  - Control refresh/index build timing (batch up before triggering) to avoid frequent small writes.

Batch Insert Demo
```python
from pymilvus import MilvusClient
import random

# 1. Set up a Milvus client
client = MilvusClient(
    uri="http://<Proxy Pod IP>:27017",
)

# 2. Create a collection
res = client.create_collection(
    collection_name="test_milvus_wp",
    dimension=512,
    metric_type="IP",
    shards_num=2,
)
print(res)

# 3. Insert randomly generated vectors
colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
data = []

batch_size = 1000
batch_count = 2000
for j in range(batch_count):
    start_time = time.time()
    print(f"Inserting {j}th vectors {j * batch_size} startTime{start_time}")
    for i in range(batch_size):
        current_color = random.choice(colors)
        data.append({
            "id": (j*batch_size + i),
            "vector": [ random.uniform(-1, 1) for _ in range(512) ],
            "color": current_color,
            "color_tag": f"{current_color}_{str(random.randint(1000, 9999))}"
        })
    res = client.insert(
        collection_name="test_milvus_wp",
        data=data
    )
    data = []
    print(f"Inserted {j}th vectors endTime:{time.time()} costTime:{time.time() - start_time}")
```

## Latency 

Woodpecker is a cloud-native WAL designed for object storage with trade-offs between throughput, cost, and latency. The currently supported lightweight embedded mode prioritizes cost and throughput optimization, as most scenarios only require data to be written within a certain time rather than demanding low latency for individual write requests. Therefore, Woodpecker employs batched writes, with default intervals of 10ms for local filesystem storage backends and 200ms for MinIO-like storage backends. During slow write operations, the maximum latency equals the interval time plus flush time.

Note that batch insertion is triggered not only by time intervals but also by batch size, which defaults to 2MB.

For details on architecture, deployment modes (MemoryBuffer / QuorumBuffer), and performance, see [Woodpecker Architecture](woodpecker_architecture.md).

For more parameter details, refer to the Woodpecker [GitHub repository](https://github.com/zilliztech/woodpecker).
