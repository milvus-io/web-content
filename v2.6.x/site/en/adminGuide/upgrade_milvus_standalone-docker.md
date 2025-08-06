---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Learn how to upgrade Milvus standalone with Docker Compose.
title: Upgrade Milvus Standalone with Docker Compose
---

<div class="tab-wrapper"><a href="upgrade_milvus_standalone-operator.md" class=''>Milvus Operator</a><a href="upgrade_milvus_standalone-helm.md" class=''>Helm</a><a href="upgrade_milvus_standalone-docker.md" class='active '>Docker Compose</a></div>

# Upgrade Milvus Standalone with Docker Compose

This guide describes how to upgrade your Milvus standalone deployment from v2.5.x to v2.6.0 using Docker Compose.

## Before you start

### What's new in v2.6.0

Upgrading from Milvus 2.5.x to 2.6.0 involves significant architectural changes:

- **Coordinator consolidation**: Legacy separate coordinators (`dataCoord`, `queryCoord`, `indexCoord`) have been consolidated into a single `mixCoord`
- **New components**: Introduction of Streaming Node for enhanced data processing
- **Component removal**: `dataNode` and `indexNode` have been removed and consolidated

This upgrade process ensures proper migration to the new architecture. For more information on architecture changes, refer to [Milvus Architecture Overview](architecture_overview.md).

### Requirements

**System requirements:**
- Docker and Docker Compose installed
- Milvus standalone deployed via Docker Compose

**Compatibility requirements:**
- Milvus v2.6.0-rc1 is **not compatible** with v2.6.0. Direct upgrades from release candidates are not supported.
- If you are currently running v2.6.0-rc1 and need to preserve your data, please refer to [this community guide](https://github.com/milvus-io/milvus/issues/43538#issuecomment-3112808997) for migration assistance.
- You **must** upgrade to v2.5.16 before upgrading to v2.6.0.

<div class="alter note">

Due to security concerns, Milvus upgrades its MinIO to RELEASE.2024-12-18T13-15-44Z with the release of v2.6.0. Before any upgrades from previous Milvus Standalone releases installed using Docker Compose, you should create a Single-Node Single-Drive MinIO deployment and migrate existing MinIO settings and content to the new deployment. For details, refer to [this guide](https://min.io/docs/minio/linux/operations/install-deploy-manage/migrate-fs-gateway.html#id2).

</div>

## Upgrade process

### Step 1: Upgrade to v2.5.16

<div class="alert note">

Skip this step if your standalone deployment is already running v2.5.16 or higher.

</div>

1. Edit your existing `docker-compose.yaml` file and update the Milvus image tag to v2.5.16:

    ```yaml
    ...
    standalone:
      container_name: milvus-standalone
      image: milvusdb/milvus:v2.5.16
    ...
    ```

2. Apply the upgrade to v2.5.16:

    ```bash
    docker compose down
    docker compose up -d
    ```

3. Verify the v2.5.16 upgrade:

    ```bash
    docker compose ps
    ```

### Step 2: Upgrade to v2.6.0

Once v2.5.16 is running successfully, upgrade to v2.6.0:

1. Edit your existing `docker-compose.yaml` file and update both the Milvus and MinIO image tags:

    ```yaml
    ...
    minio:
      container_name: milvus-minio
      image: minio/minio:RELEASE.2024-12-18T13-15-44Z

    ...
    standalone:
      container_name: milvus-standalone
      image: milvusdb/milvus:v2.6.0
    ```

2. Apply the final upgrade:

    ```bash
    docker compose down
    docker compose up -d
    ```

## Verify the upgrade

Confirm your standalone deployment is running the new version:

```bash
# Check container status
docker compose ps

# Check Milvus version
docker compose logs standalone | grep "version"
```

## What's next
- You might also want to learn how to:
  - [Scale a Milvus cluster](scaleout.md)
- If you are ready to deploy your cluster on clouds:
  - Learn how to [Deploy Milvus on Amazon EKS with Terraform](eks.md)
  - Learn how to [Deploy Milvus Cluster on GCP with Kubernetes](gcp.md)
  - Learn how to [Deploy Milvus on Microsoft Azure With Kubernetes](azure.md)
