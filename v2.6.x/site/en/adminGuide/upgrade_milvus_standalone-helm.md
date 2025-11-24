---
id: upgrade_milvus_standalone-helm.md
label: Helm
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Learn how to upgrade Milvus standalone with Helm Chart.
title: Upgrade Milvus Standalone with Helm Chart
---

<div class="tab-wrapper"><a href="upgrade_milvus_standalone-operator.md" class=''>Milvus Operator</a><a href="upgrade_milvus_standalone-helm.md" class='active '>Helm</a><a href="upgrade_milvus_standalone-docker.md" class=''>Docker Compose</a></div>


# Upgrade Milvus Standalone with Helm Chart

This guide describes how to upgrade your Milvus standalone deployment from v2.5.x to v2.6.6 using Helm Chart.

## Before you start

### What's new in v2.6.6

Upgrading from Milvus 2.5.x to 2.6.6 involves significant architectural changes:

- **Coordinator consolidation**: Legacy separate coordinators (`dataCoord`, `queryCoord`, `indexCoord`) have been consolidated into a single `mixCoord`
- **New components**: Introduction of Streaming Node for enhanced data processing
- **Component removal**: `indexNode` removed and consolidated

This upgrade process ensures proper migration to the new architecture. For more information on architecture changes, refer to [Milvus Architecture Overview](architecture_overview.md).

### Requirements

**System requirements:**
- Helm version >= 3.14.0
- Kubernetes version >= 1.20.0
- Milvus standalone deployed via Helm Chart

**Compatibility requirements:**
- Milvus v2.6.0-rc1 is **not compatible** with v2.6.6. Direct upgrades from release candidates are not supported.
- If you are currently running v2.6.0-rc1 and need to preserve your data, please refer to [this community guide](https://github.com/milvus-io/milvus/issues/43538#issuecomment-3112808997) for migration assistance.
- You **must** upgrade to v2.5.16 or later before upgrading to v2.6.6.

**Message Queue limitations**: When upgrading to Milvus v2.6.6, you must maintain your current message queue choice. Switching between different message queue systems during the upgrade is not supported. Support for changing message queue systems will be available in future versions.


<div class="alert note">
Since Milvus Helm chart version 4.2.21, we introduced pulsar-v3.x chart as dependency. For backward compatibility, please upgrade your Helm to v3.14 or later version, and be sure to add the <code>--reset-then-reuse-values</code> option whenever you use <code>helm upgrade</code>.
</div>

## Upgrade process

### Step 1: Upgrade Helm Chart

First, upgrade your Milvus Helm chart to version 5.0.0:

```bash
helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update zilliztech
```

<div class="alert note">
The Milvus Helm Charts repo at <code>https://milvus-io.github.io/milvus-helm/</code> has been archived. Use the new repo <code>https://zilliztech.github.io/milvus-helm/</code> for chart versions 4.0.31 and later.
</div>

To check Helm chart version compatibility with Milvus versions:

```bash
helm search repo zilliztech/milvus --versions
```

This guide assumes you are installing the latest version. If you need to install a specific version, specify the `--version` parameter accordingly.

### Step 2: Upgrade to v2.5.16

<div class="alert-note">

Skip this step if your standalone deployment is already running v2.5.16 or higher.

</div>

Upgrade your Milvus standalone to v2.5.16:

```bash
helm upgrade my-release zilliztech/milvus \
  --set image.all.tag="v2.5.16" \
  --reset-then-reuse-values \
  --version=4.2.58
```

Wait for the upgrade to complete:

```bash
# Verify all pods are ready
kubectl get pods
```

### Step 3: Upgrade to v2.6.6

Once v2.5.16 is running successfully, upgrade to v2.6.6:

```bash
helm upgrade my-release zilliztech/milvus \
  --set image.all.tag="v2.6.6" \
  --reset-then-reuse-values \
  --version=5.0.0
```

## Verify the upgrade

Confirm your standalone deployment is running the new version:

```bash
# Check pod status
kubectl get pods
```

For additional support, consult the [Milvus documentation](https://milvus.io/docs) or [community forum](https://github.com/milvus-io/milvus/discussions).
