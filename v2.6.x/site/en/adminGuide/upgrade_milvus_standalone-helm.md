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

This guide describes how to upgrade your Milvus standalone deployment from v2.5.x to v2.6.0 using Helm Chart.

## Before you start

### What's new in v2.6.0

Upgrading from Milvus 2.5.x to 2.6.0 involves significant architectural changes:

- **New components**: Introduction of Streaming Node and other new components
- **Component optimizations**: Enhanced performance and streamlined architecture

<div class="alert note">
This upgrade is <strong>irreversible</strong>. You cannot roll back to a previous version once the upgrade is completed. For details on architectural changes, refer to <a href="architecture_overview.md">Milvus Architecture Overview</a>.
</div>

### Requirements

**System requirements:**
- Helm version >= 3.14.0
- Kubernetes version >= 1.20.0
- Milvus standalone deployed via Helm Chart

**Compatibility requirements:**
- Milvus v2.6.0-rc1 is **not compatible** with v2.6.0. Direct upgrades from release candidates are not supported.
- You **must** upgrade to v2.5.16 before upgrading to v2.6.0.

<div class="alert note">
Since Milvus Helm chart version 4.2.21, we introduced pulsar-v3.x chart as dependency. For backward compatibility, please upgrade your Helm to v3.14 or later version, and be sure to add the <code>--reset-then-reuse-values</code> option whenever you use <code>helm upgrade</code>.
</div>

## Upgrade process

### Step 1: Upgrade Helm Chart

First, upgrade your Milvus Helm chart to version 5.0.0:

```bash
helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update zilliztech
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values
```

<div class="alert note">
The Milvus Helm Charts repo at <code>https://milvus-io.github.io/milvus-helm/</code> has been archived. Use the new repo <code>https://zilliztech.github.io/milvus-helm/</code> for chart versions 4.0.31 and later.
</div>

### Step 2: Upgrade to v2.5.16

Upgrade your Milvus standalone to v2.5.16:

```bash
helm upgrade my-release milvus/milvus \
  --set image.all.tag="v2.5.16" \
  --reset-then-reuse-values \
  --version=5.0.0
```

Wait for the upgrade to complete:

```bash
# Monitor the upgrade progress
kubectl get pods -w

# Verify all pods are ready
kubectl get pods
```

### Step 3: Upgrade to v2.6.0

Once v2.5.16 is running successfully, upgrade to v2.6.0:

```bash
helm upgrade my-release milvus/milvus \
  --set image.all.tag="v2.6.0" \
  --reset-then-reuse-values \
  --version=5.0.0
```

## Verify the upgrade

Confirm your standalone deployment is running the new version:

```bash
# Check pod status
kubectl get pods -l app.kubernetes.io/name=milvus

# Verify Helm release
helm list
```

For additional support, consult the [Milvus documentation](https://milvus.io/docs) or [community forum](https://github.com/milvus-io/milvus/discussions).
