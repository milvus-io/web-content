---
id: upgrade_milvus_cluster-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Learn how to upgrade Milvus cluster with Milvus Operator.
title: Upgrade Milvus Cluster with Milvus Operator
---

<div class="tab-wrapper"><a href="upgrade_milvus_cluster-operator.md" class='active '>Milvus Operator</a><a href="upgrade_milvus_cluster-helm.md" class=''>Helm</a></div>

# Upgrade Milvus Cluster with Milvus Operator

This guide describes how to upgrade your Milvus cluster from v2.5.x to v2.6.0 using Milvus Operator.

## Before you start

### What's new in v2.6.0

Upgrading from Milvus 2.5.x to 2.6.0 involves significant architectural changes:

- **Coordinator consolidation**: Legacy separate coordinators (`dataCoord`, `queryCoord`, `indexCoord`) have been consolidated into a single `mixCoord`
- **New components**: Introduction of Streaming Node for enhanced data processing
- **Component removal**: `indexNode` removed and consolidated

This upgrade process ensures proper migration to the new architecture. For more information on architecture changes, refer to [Milvus Architecture Overview](architecture_overview.md).

### Requirements

**System requirements:**
- Kubernetes cluster with Milvus deployed via Milvus Operator
- `kubectl` configured to access your cluster  
- Helm 3.x installed

**Compatibility requirements:**
- Milvus v2.6.0-rc1 is **not compatible** with v2.6.0. Direct upgrades from release candidates are not supported.
- If you are currently running v2.6.0-rc1 and need to preserve your data, please refer to [this community guide](https://github.com/milvus-io/milvus/issues/43538#issuecomment-3112808997) for migration assistance.
- You **must** upgrade to v2.5.16 with `mixCoord` enabled before upgrading to v2.6.0.

## Upgrade process

### Step 1: Upgrade Milvus Operator

First, upgrade your Milvus Operator to v1.3.0:

```bash
helm repo add zilliztech-milvus-operator https://zilliztech.github.io/milvus-operator/
helm repo update zilliztech-milvus-operator
helm -n milvus-operator upgrade milvus-operator zilliztech-milvus-operator/milvus-operator
```

Verify the operator upgrade:

```bash
kubectl -n milvus-operator get pods
```

### Step 2: Upgrade your Milvus cluster

#### 2.1 Check current coordinator configuration

Check if your cluster already uses `mixCoord`:

```bash
kubectl get pods
```

If you see separate coordinator pods (`datacoord`, `querycoord`, `indexcoord`) instead, you need to enable `mixCoord` in the next step.

#### 2.2 Upgrade to v2.5.16 with mixCoord

<div class="alert-note">

Skip this step if your cluster is already running v2.5.16 or higher with `mixCoord` enabled.

</div>

Create a configuration file `milvusupgrade.yaml` to enable `mixCoord` and upgrade to v2.5.16:

```yaml
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release  # Replace with your actual release name
spec:
  components:
    mixCoord:
      replicas: 1
    image: milvusdb/milvus:v2.5.16
```

Apply the configuration:

```bash
kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --type merge
```

Wait for completion:

```bash
# Verify all pods are ready
kubectl get pods
```

#### 2.3 Upgrade to v2.6.0

Once v2.5.16 is running successfully with `mixCoord`, upgrade to v2.6.0:

Update your configuration file (`milvusupgrade.yaml` in this example):

```yaml
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release  # Replace with your actual release name
spec:
  components:
    image: milvusdb/milvus:v2.6.0
```

Apply the final upgrade:

```bash
kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --type merge
```

## Verify the upgrade

Confirm your cluster is running the new version:

```bash
# Check pod status
kubectl get pods
```

For additional support, consult the [Milvus documentation](https://milvus.io/docs) or [community forum](https://github.com/milvus-io/milvus/discussions).