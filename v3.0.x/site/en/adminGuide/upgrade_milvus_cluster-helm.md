---
id: upgrade_milvus_cluster-helm.md
label: Helm
order: 1
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Learn how to upgrade Milvus cluster with Helm Chart.
title: Upgrade Milvus Cluster with Helm Chart
---

<div class="tab-wrapper"><a href="upgrade_milvus_cluster-operator.md" class=''>Milvus Operator</a><a href="upgrade_milvus_cluster-helm.md" class='active '>Helm</a></div>

# Upgrade Milvus Cluster with Helm Chart

This guide describes how to upgrade your Milvus 2.6.x cluster to v3.0-beta using Helm.

<div class="alert note">

This procedure has been validated from Milvus 2.6.20 to Milvus v3.0-beta with Milvus Helm Chart 5.0.22. If you use another Milvus 2.6.x patch release or Helm Chart version, validate the upgrade in a non-production environment first.

</div>

## Prerequisites

- Helm 3.14.0 or later
- An existing Milvus 2.6.x deployment managed by Helm
- The Helm values used for the existing deployment
- A current backup of Milvus metadata and persistent data

**Message Queue limitations**: When upgrading to Milvus v3.0-beta, you must maintain your current message queue choice. Switching between different message queue systems during the upgrade is not supported. Support for changing message queue systems will be available in future versions.


<div class="alert warning">

Do not change or downgrade the Helm Chart as part of this procedure. Keep the Chart version already installed for your Helm release. The tested baseline retained Helm Chart 5.0.22 and changed only the Milvus image tag to `v3.0-beta`.

This procedure does not validate a downgrade or rollback by changing the Milvus image back to 2.6.x. After v3.0-beta writes data, an image-only rollback can fail to read the updated state. If the upgrade fails, stop writes and use a recovery plan that restores the pre-upgrade metadata and persistent data backups. Validate the recovery plan in a non-production environment first.

</div>

## Upgrade process

The validated Milvus 2.6.20 deployment created with Helm Chart 5.0.22 used MixCoord and StreamingNode and did not run IndexNode. You do not need a separate coordinator-migration step when your deployment uses the same topology.

### Step 1: Confirm the current topology

Save the complete values of the current release and check the running Pods:

```bash
helm get values <release-name> \
  --namespace <namespace> \
  --all > milvus-values-before-upgrade.yaml

kubectl get pods --namespace <namespace>
```

Confirm that the cluster uses MixCoord and StreamingNode and that no IndexNode Pod is running. The upgrade command later in this guide preserves the existing Helm values. If your current values enable IndexNode or use another component topology, do not run this image-only upgrade. Reproduce the topology in a non-production environment and obtain an engineering-approved migration plan first.

### Step 2: Update the Helm repository

Add or update the Milvus Helm repository:

```bash
helm repo add zilliztech https://zilliztech.github.io/milvus-helm --force-update
helm repo update zilliztech
```

<div class="alert note">
The Milvus Helm Charts repo at <code>https://milvus-io.github.io/milvus-helm/</code> has been archived. Use the new repo <code>https://zilliztech.github.io/milvus-helm/</code> for chart versions 4.0.31 and later.
</div>

### Step 3: Upgrade Milvus

Check the Chart version installed for your Helm release:

```bash
helm list --namespace <namespace>
```

In the `CHART` column, remove the `milvus-` prefix from the value and use the remaining version as `<current-chart-version>`. Then run the upgrade command:

```bash
helm upgrade <release-name> zilliztech/milvus \
  --namespace <namespace> \
  --version <current-chart-version> \
  --set image.all.tag="v3.0-beta" \
  --reset-then-reuse-values \
  --wait \
  --timeout 30m
```

The `--reset-then-reuse-values` option retains the values from the previous release while applying the explicit image override against the selected Chart defaults.

## Verify the upgrade

Check the Helm revision, Pod status, and container images:

```bash
helm history <release-name> --namespace <namespace>

kubectl get pods --namespace <namespace>

kubectl get pods --namespace <namespace> \
  -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{range .spec.containers[*]}{.image}{" "}{end}{"\n"}{end}'
```

Verify that all required workloads are ready, all Milvus components use `v3.0-beta`, and your existing collections remain queryable and searchable. Complete these checks before you enable any v3.0-beta-specific feature.
