---
id: upgrade_milvus_standalone-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Learn how to upgrade Milvus standalone with Milvus operator.
title: Upgrade Milvus Standalone with Milvus Operator
---

<div class="tab-wrapper"><a href="upgrade_milvus_standalone-operator.md" class='active '>Milvus Operator</a><a href="upgrade_milvus_standalone-helm.md" class=''>Helm</a><a href="upgrade_milvus_standalone-docker.md" class=''>Docker Compose</a></div>

# Upgrade Milvus Standalone with Milvus Operator

This guide describes how to upgrade your Milvus standalone deployment from v2.5.x to v2.6.8 using Milvus Operator.

## Before you start

### What's new in v2.6.8

Upgrading from Milvus 2.5.x to 2.6.8 involves significant architectural changes:

- **Coordinator consolidation**: Legacy separate coordinators (`dataCoord`, `queryCoord`, `indexCoord`) have been consolidated into a single `mixCoord`
- **New components**: Introduction of Streaming Node for enhanced data processing
- **Component removal**: `indexNode` removed and consolidated

This upgrade process ensures proper migration to the new architecture. For more information on architecture changes, refer to [Milvus Architecture Overview](architecture_overview.md).

### Requirements

**System requirements:**
- Kubernetes cluster with Milvus standalone deployed via Milvus Operator
- `kubectl` configured to access your cluster  
- Helm 3.x installed

**Compatibility requirements:**
- Milvus v2.6.0-rc1 is **not compatible** with v2.6.8. Direct upgrades from release candidates are not supported.
- If you are currently running v2.6.0-rc1 and need to preserve your data, please refer to [this community guide](https://github.com/milvus-io/milvus/issues/43538#issuecomment-3112808997) for migration assistance.
- You **must** upgrade to v2.5.16 or later before upgrading to v2.6.8.

**Message Queue limitations**: When upgrading to Milvus v2.6.8, you must maintain your current message queue choice. Switching between different message queue systems during the upgrade is not supported. Support for changing message queue systems will be available in future versions.


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

### Step 2: Upgrade your Milvus standalone

#### 2.1 Upgrade to v2.5.16

<div class="alert-note">

Skip this step if your standalone deployment is already running v2.5.16 or higher.

</div>

Create a configuration file `milvusupgrade.yaml` to upgrade to v2.5.16:

```yaml
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release  # Replace with your actual release name
spec:
  components:
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

#### 2.2 Upgrade to v2.6.8

Once v2.5.16 is running successfully, upgrade to v2.6.8:

Update your configuration file (`milvusupgrade.yaml` in this example):

```yaml
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release  # Replace with your actual release name
spec:
  components:
    image: milvusdb/milvus:v2.6.8
```

Apply the final upgrade:

```bash
kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --type merge
```

## Verify the upgrade

Confirm your standalone deployment is running the new version:

```bash
# Check pod status
kubectl get pods
```

For additional support, consult the <a href="https://milvus.io/docs">Milvus documentation</a> or <a href="https://github.com/milvus-io/milvus/discussions">community forum</a>.
