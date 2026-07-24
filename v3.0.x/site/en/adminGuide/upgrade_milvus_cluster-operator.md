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

This guide describes how to upgrade a Milvus 2.6.x cluster to v3.0-beta with Milvus Operator.

<div class="alert note">

This procedure has been validated from Milvus 2.6.20 to Milvus v3.0-beta with Milvus Operator 1.3.0, MixCoord, StreamingNode, Woodpecker, in-cluster etcd, and in-cluster MinIO. If you use another Milvus 2.6.x patch release, Operator version, component topology, message queue, or dependency configuration, validate the upgrade in a non-production environment first.

</div>

## Prerequisites

- A Kubernetes cluster with a Milvus 2.6.x cluster managed by Milvus Operator
- `kubectl` access to the cluster
- The complete Milvus custom resource (CR) manifest used for the existing deployment
- The installation method and manifests used for the existing Milvus Operator
- A current backup of Milvus metadata and persistent data

**Message Queue limitations**: When upgrading to Milvus v3.0-beta, you must maintain your current message queue choice. Switching between different message queue systems during the upgrade is not supported. Support for changing message queue systems will be available in future versions.


<div class="alert warning">

Apply the complete Milvus CR for this upgrade. Do not use an image-only merge patch. The Operator can default omitted zero-replica component fields, which can re-enable a component that the existing 2.6.x deployment disabled.

This procedure does not validate a downgrade or rollback by changing the Milvus image back to 2.6.x. After v3.0-beta writes data, an image-only rollback can fail to read the updated state. If the upgrade fails, stop writes and use a recovery plan that restores the pre-upgrade metadata and persistent data backups. Validate the recovery plan in a non-production environment first.

</div>

## Upgrade process

### Step 1: Back up the current Milvus CR

Save the current CR before changing the deployment:

```bash
kubectl get milvus <instance-name> \
  --namespace <namespace> \
  --output yaml > milvus-before-upgrade.yaml
```

Use the source manifest for your existing deployment as the upgrade manifest. Do not apply the exported backup file directly without first removing server-managed metadata and status fields.

### Step 2: Confirm the Milvus Operator version

Check the image used by the installed Milvus Operator:

```bash
kubectl get deployments --all-namespaces \
  -o jsonpath='{range .items[*]}{.metadata.namespace}{"\t"}{.metadata.name}{"\t"}{range .spec.template.spec.containers[*]}{.image}{" "}{end}{"\n"}{end}' \
  | grep milvus-operator
```

The validated upgrade kept Milvus Operator at version 1.3.0. Keep the Operator version that currently manages your Milvus 2.6.x deployment unless your support policy requires a separate Operator upgrade. Do not downgrade a newer Operator to the tested version. If you need to change the Operator version, use the same Helm or `kubectl` installation method and the same release name and namespace as the existing installation, then validate the Operator change before updating the Milvus CR.

### Step 3: Update the Milvus image

In the complete Milvus CR manifest, change `spec.components.image` to the target version. Preserve the current mode, component topology, message queue, etcd, storage, and other dependency settings. The following excerpt shows the fields to confirm; do not replace your complete CR with this excerpt.

Before applying the target CR, confirm that `indexNode.replicas` is `0`. The validated Milvus 2.6.20 configuration already used this setting. Keep the explicit zero-replica setting in the target CR.

```yaml
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: <instance-name>
  namespace: <namespace>
spec:
  components:
    image: milvusdb/milvus:v3.0-beta
    indexNode:
      replicas: 0
```

Apply the complete CR manifest:

```bash
kubectl apply --filename milvus.yaml
```

## Verify the upgrade

Check the CR status, Pod status, and container images:

```bash
kubectl get milvus <instance-name> \
  --namespace <namespace> \
  --output jsonpath='{.status.status}{"\t"}{.status.currentImage}{"\n"}'

kubectl get pods --namespace <namespace>

kubectl get pods --namespace <namespace> \
  -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{range .spec.containers[*]}{.image}{" "}{end}{"\n"}{end}'
```

Verify that the Milvus CR reports `Healthy`, all Milvus components use `milvusdb/milvus:v3.0-beta`, no IndexNode Pod is running, and the existing collections remain queryable and searchable. Complete these checks before you enable any v3.0-beta-specific feature.
