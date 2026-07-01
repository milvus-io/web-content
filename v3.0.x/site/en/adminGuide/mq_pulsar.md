---
id: mq_pulsar.md
title: Pulsar
---

# Use Pulsar as the Milvus Message Queue

Apache Pulsar is one of the message-queue (WAL) backends Milvus supports. In Milvus 3.x, [Woodpecker](woodpecker.md) is the default message queue; Pulsar remains fully supported for users who prefer it. Pulsar is primarily used with Milvus Distributed (cluster); standalone deployments typically use embedded Woodpecker or [RocksMQ](mq_rocksmq.md).

## Version compatibility

| Milvus version | Supported Pulsar version | Default |
| --- | --- | --- |
| 2.5.x and later | Pulsar v3 (recommended) or Pulsar v2 | Pulsar v3 (via Helm / Milvus Operator) |
| 2.4.x and earlier | Pulsar v2 | Pulsar v2 |

Since Milvus 2.5, the Milvus Helm chart and Milvus Operator deploy **Pulsar v3** by default; Pulsar v2 remains compatible. See [Upgrade Pulsar from v2 to v3](upgrade-pulsar-v3.md) and [Continue Using Pulsar v2](use-pulsar-v2.md).

## Deploy a Milvus cluster with Pulsar using Helm

### Install

To deploy a Milvus cluster that uses the bundled Pulsar (instead of Woodpecker), install the Helm chart with the Streaming Node enabled:

```bash
helm install my-release zilliztech/milvus \
  --set image.all.tag=v3.0-beta \
  --set pulsarv3.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  --set indexNode.enabled=false
```

On Kubernetes v1.25 and later, if you hit PodDisruptionBudget API issues from the bundled Pulsar sub-chart, disable the Pulsar PDB policies:

```bash
helm install my-release zilliztech/milvus \
  --set pulsar.bookkeeper.pdb.usePolicy=false \
  --set pulsar.broker.pdb.usePolicy=false \
  --set pulsar.proxy.pdb.usePolicy=false \
  --set pulsar.zookeeper.pdb.usePolicy=false
```

### Configure

To connect Milvus to an **external** Pulsar service, disable the bundled Pulsar and enable `externalPulsar` in a `values.yaml` override:

```yaml
pulsarv3:
  enabled: false
externalPulsar:
  enabled: true
  host: <your_pulsar_host>
  port: 6650
  maxMessageSize: "5242880"  # 5 MB, maximum size of each message
  tenant: public
  namespace: default
```

```bash
helm install my-release zilliztech/milvus -f values.yaml
```

### Uninstall

```bash
helm uninstall my-release
```

If you used the bundled Pulsar and want to remove its persisted data, delete the Pulsar PVCs (named `my-release-pulsarv3-*`):

```bash
kubectl get pvc | grep my-release-pulsarv3
kubectl delete pvc <pulsar-pvc-name> ...
```

## Deploy a Milvus cluster with Pulsar using Milvus Operator

With Milvus Operator, configure Pulsar under `spec.dependencies.pulsar` (supported for Milvus cluster only). `pulsar` supports `external` and `inCluster`.

### External Pulsar

```yaml
apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies:
    pulsar:
      external: true
      endpoints:
      - 192.168.1.1:6650
  components: {}
  config: {}
```

### Internal (in-cluster) Pulsar

```yaml
apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies:
    pulsar:
      inCluster:
        values:
          components:
            autorecovery: false
          zookeeper:
            replicaCount: 1
          bookkeeper:
            replicaCount: 1
          broker:
            replicaCount: 1
            configData:
              autoSkipNonRecoverableData: "true"
              managedLedgerDefaultEnsembleSize: "1"
              managedLedgerDefaultWriteQuorum: "1"
              managedLedgerDefaultAckQuorum: "1"
          proxy:
            replicaCount: 1
  components: {}
  config: {}
```

Apply the configuration (assuming the file is `milvuscluster.yaml`):

```bash
kubectl apply -f milvuscluster.yaml
```

### Uninstall

```bash
kubectl delete milvus my-release
```

## Notes

- **Upgrading from 2.5.x to 2.6.x:** **Message Queue limitations**: When upgrading to Milvus v3.0-beta, you must maintain your current message queue choice. Switching between different message queue systems during the upgrade is not supported. Support for changing message queue systems will be available in future versions.
 If you run Pulsar and want to keep it, do not change the message queue during the upgrade.
- **Pulsar v2 → v3:** see [Upgrade Pulsar from v2 to v3](upgrade-pulsar-v3.md); to stay on v2, see [Continue Using Pulsar v2](use-pulsar-v2.md).

## What's next

- [Woodpecker (default message queue)](woodpecker.md)
