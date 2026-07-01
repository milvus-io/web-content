---
id: woodpecker.md
title: Woodpecker
related_key: Woodpecker
summary: Learn how Woodpecker works as the default message queue (WAL) in Milvus, and how to run it in embedded or service mode.
---

# Woodpecker

Woodpecker is the **default message queue (write-ahead log, WAL)** in Milvus 3.x. It is a cloud‑native WAL designed for object storage, offering high throughput, low operational overhead, and seamless scalability. For architecture and benchmark details, see [Woodpecker](woodpecker_architecture.md).

## Overview

- In Milvus 3.x, Woodpecker is the **default** WAL/message queue, providing ordered writes and recovery as the logging service. No external message-queue service (such as Pulsar or Kafka) is required.
- Woodpecker can run **embedded** in the Milvus/streaming node (default), or as a **dedicated service** with its own pods (distributed/cluster only).
- It supports three `storage.type` modes: object storage (`minio`, the default), local file system (`local`), and the dedicated `service`. See [Deployment modes](#Deployment-modes).

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
      maxFlushRetries: 5 # Maximum number of flush retries.
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

Woodpecker supports three `storage.type` modes:

| `storage.type` | How Woodpecker runs | WAL backend | Milvus Standalone | Milvus Distributed (cluster) |
| -------------- | ------------------- | ----------- | ----------------- | ---------------------------- |
| `minio` (default) | Embedded in the Milvus/streaming node | Object storage (MinIO/S3‑compatible) | Supported | Supported |
| `local` | Embedded in the Milvus/streaming node | Local file system | Supported | Limited (all nodes need a shared FS, e.g. NFS) |
| `service` | **Dedicated Woodpecker service** (its own pods) | Object storage (MinIO/S3‑compatible) | **Not supported** | Supported |

Notes:

- With `minio`, Woodpecker shares the same object storage with Milvus (MinIO/S3/GCS/OSS, etc.).
- With `local`, a single‑node local disk is only suitable for Standalone. If all pods can access a shared file system (e.g., NFS), Cluster mode can also use `local`.
- **`service` mode runs Woodpecker as a separate, independently scalable service and is only available for distributed/cluster deployments.** Standalone deployments use the embedded modes (`minio` or `local`).

## Object storage compatibility for `storage.type=minio`

The following matrix summarizes the currently known compatibility of object storage backends when Woodpecker is configured with `storage.type=minio`. This information is based on [GitHub Discussion #150](https://github.com/zilliztech/woodpecker/discussions/150).

| Provider / service | Status | Notes |
| ------------------ | ------ | ----- |
| Azure Blob Storage | Supported | Uses the native Azure SDK. |
| AWS S3 | Supported | Native S3 with full Conditional Write support. |
| MinIO (`>= 2024-12`) | Supported | Full S3 Conditional Write support. |
| Aliyun OSS | Supported | Supported through its S3-compatible interface. |
| Tencent COS | Supported | Supported through its S3-compatible interface. |
| Google Cloud Storage (GCS) | Supported | Supported through S3 interoperability mode. |
| Huawei Cloud OBS | Unsupported | Lacks the required Conditional Write semantics. |
| VAST Data | Supported | Verified by the community; works with non-versioned buckets only. |
| Other S3-compatible storage | Partial | Depends on full support for S3 Conditional Write semantics. |

Notes:

- Compatibility depends on native SDK support or support for S3 Conditional Write semantics.
- If you self-host MinIO for Woodpecker, use `RELEASE.2024-12-18T13-15-44Z` or later.
- This matrix reflects [the current discussion](https://github.com/zilliztech/woodpecker/discussions/150) and may evolve as backend support is validated further.

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

If you need to adjust Woodpecker parameters, follow the settings described in [Configuration](#Configuration).

### Enable Woodpecker for a Milvus Cluster on Kubernetes (Helm Chart, storage=minio)

First add and update the Milvus Helm chart as described in [Run Milvus in Kubernetes with Helm](install_cluster-helm.md).

Then deploy with one of the following examples:

– Cluster deployment (recommended settings with Woodpecker and Streaming Node enabled):

```bash
helm install my-release zilliztech/milvus \
  --set image.all.tag=v3.0-beta \
  --set pulsarv3.enabled=false \
  --set woodpecker.enabled=true \
  --set streaming.enabled=true \
  --set indexNode.enabled=false
```

– Standalone deployment (Woodpecker enabled):

```bash
helm install my-release zilliztech/milvus \
  --set image.all.tag=v3.0-beta \
  --set cluster.enabled=false \
  --set pulsarv3.enabled=false \
  --set standalone.messageQueue=woodpecker \
  --set woodpecker.enabled=true \
  --set streaming.enabled=true
```

After deployment, follow the docs to port‑forward and connect. To adjust Woodpecker parameters, follow the settings described in [Configuration](#Configuration).

### Enable Woodpecker for Milvus Standalone in Docker (storage=local)

In Milvus 3.x, the Docker standalone deployment uses Woodpecker with the **local filesystem** as its WAL backend **by default** — no extra configuration is required. Follow [Run Milvus in Docker](install_standalone-docker.md):

```bash
mkdir milvus-wp && cd milvus-wp
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
```

To tune Woodpecker, edit the generated `user.yaml` after the first start and run `bash standalone_embed.sh restart` to apply the changes (a fresh `start` regenerates `user.yaml`, so apply edits with `restart`):

```yaml
# user.yaml
woodpecker:
  logstore:
    segmentSyncPolicy:
      maxFlushThreads: 16
```

### Enable Woodpecker for Milvus Standalone with Docker Compose (storage=minio)

Follow [Run Milvus with Docker Compose](install_standalone-docker-compose.md). Example:

```bash
mkdir milvus-wp-compose && cd milvus-wp-compose
wget https://github.com/milvus-io/milvus/releases/download/v3.0-beta/milvus-standalone-docker-compose.yml -O docker-compose.yml
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

### Enable Woodpecker service mode for a Milvus Cluster (Helm)

Woodpecker **service mode** is a **Milvus 3.0** feature. For distributed/cluster deployments, you can run Woodpecker as a **dedicated service** (separate pods) instead of embedded in the streaming node by setting `streaming.woodpecker.embedded=false`:

```bash
helm install my-release zilliztech/milvus \
  --set image.all.tag=v3.0-beta \
  --set woodpecker.enabled=true \
  --set woodpecker.image.tag=v0.1.33 \
  --set streaming.enabled=true \
  --set streaming.woodpecker.embedded=false
```

This deploys Woodpecker as a dedicated StatefulSet (`my-release-milvus-woodpecker`, 4 replicas by default) fronted by a headless service, gossip-clustered on ports `18080` (service), `17946` (gossip), and `9091` (metrics), with MinIO as its storage backend. The service needs a quorum of **3** nodes; the default of **4** replicas keeps the quorum while tolerating a single node failure, so do not set `woodpecker.replicaCount` below 3. The cluster then includes a separate `woodpecker` pod set:

```
my-release-milvus-woodpecker-0
my-release-milvus-woodpecker-1
my-release-milvus-woodpecker-2
my-release-milvus-woodpecker-3
```

<div class="alert note">

Woodpecker `service` mode is for **distributed/cluster** deployments only — standalone deployments run Woodpecker embedded (`minio` or `local`). Milvus Operator does not yet support Woodpecker service mode.

</div>

## Throughput tuning tips

Woodpecker's throughput and latency profile differs between **embedded** mode and **service** mode (a Milvus 3.0 feature). The guidance below is organized by mode.

### Embedded mode

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

### Service mode (Milvus 3.0+)

Service mode keeps the high write throughput of an object-storage-backed WAL while adding low latency (see [Latency](#Latency)). The storage-side and client-side tuning above still applies; in addition, because Woodpecker runs as its own service, you scale write capacity horizontally by adding replicas (`woodpecker.replicaCount`, default 4), and writes benefit from one-RTT quorum replication and topology-aware reads that avoid broker forwarding.

**Batch insert demo** — use the following to measure write throughput:

```python
from pymilvus import MilvusClient
import random
import time

# 1. Set up a Milvus client
client = MilvusClient(
    uri="http://<Proxy Pod IP>:19530",
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

### Embedded mode

Woodpecker is a cloud-native WAL designed for object storage with trade-offs between throughput, cost, and latency. The lightweight embedded mode prioritizes cost and throughput optimization, as most scenarios only require data to be written within a certain time rather than demanding low latency for individual write requests. Therefore, Woodpecker employs batched writes, with default intervals of 10ms for local filesystem storage backends and 200ms for MinIO-like storage backends. During slow write operations, the maximum latency equals the interval time plus flush time.

Note that batch insertion is triggered not only by time intervals but also by batch size, which defaults to 2MB.

### Service mode (Milvus 3.0+)

Service mode brings **millisecond-level write latency** — on the same order as a traditional three-replica local-disk WAL — while keeping cost low. In a typical three-replica, cross-AZ deployment, write latency stays in the millisecond range. It achieves this through:

- **One-RTT quorum writes** — client-driven replication completes a quorum write within a single round trip, with cross-AZ traffic fixed at two replicas' worth of data (versus the extra ~1/3 cross-AZ traffic typical of broker/leader-based replication).
- **Topology-aware single-hop reads** — each read goes directly to the nearest replica instead of being forwarded through a broker, avoiding the random cross-AZ reads (≈2/3 cross-AZ read traffic) of broker-based systems.
- **Immediate object-storage upload after segment rolling** — each segment tracks its full lifecycle and uploads to object storage as soon as it rolls, keeping the local-disk footprint and storage cost low without trading away latency.
- **No continuous node-to-node replication** — logs persist to object storage acting as shared storage, so failover only re-uploads surviving replicas (no whole-node copy), scaling is not bound by inter-node replication bandwidth, and large-scale node replacement causes no replication storms.

In cross-AZ deployments, service mode also saves roughly **1/3 of write** and **2/3 of read** cross-AZ network traffic compared with broker-based log systems. For the full design and cost analysis, see [Woodpecker Architecture](woodpecker_architecture.md).

For details on architecture, deployment modes (MemoryBuffer / QuorumBuffer), and performance, see [Woodpecker Architecture](woodpecker_architecture.md).

For more parameter details, refer to the Woodpecker [GitHub repository](https://github.com/zilliztech/woodpecker).
