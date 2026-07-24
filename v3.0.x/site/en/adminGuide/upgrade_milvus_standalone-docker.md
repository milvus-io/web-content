---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 2
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Learn how to upgrade Milvus standalone with Docker Compose.
title: Upgrade Milvus Standalone with Docker Compose
---

<div class="tab-wrapper"><a href="upgrade_milvus_standalone-operator.md" class=''>Milvus Operator</a><a href="upgrade_milvus_standalone-helm.md" class=''>Helm</a><a href="upgrade_milvus_standalone-docker.md" class='active '>Docker Compose</a></div>

# Upgrade Milvus Standalone with Docker Compose

This guide describes how to upgrade a Milvus 2.6.x standalone deployment to v3.0-beta with Docker Compose.

<div class="alert note">

This procedure has been validated with the official Milvus 2.6.20 standalone Docker Compose configuration. The upgrade retained etcd, MinIO, Woodpecker, and the existing data directories, and changed only the Milvus image to `milvusdb/milvus:v3.0-beta`.

</div>

## Prerequisites

- Docker Engine and Docker Compose V2
- An existing Milvus 2.6.x standalone deployment managed by Docker Compose
- The Docker Compose file and configuration used for the existing deployment
- A current backup of Milvus metadata and persistent data

**Message Queue limitations**: When upgrading to Milvus v3.0-beta, you must maintain your current message queue choice. Switching between different message queue systems during the upgrade is not supported. Support for changing message queue systems will be available in future versions.


<div class="alert warning">

Do not replace your current Compose file or change dependency versions as part of this procedure. Keep the existing etcd, object storage, message queue, volumes, and configuration. Update only the Milvus image tag.

This procedure does not validate a downgrade or rollback by changing the Milvus image back to 2.6.x. After v3.0-beta writes data, an image-only rollback can fail to read the updated state. If the upgrade fails, stop writes and use a recovery plan that restores the pre-upgrade metadata and persistent data backups. Validate the recovery plan in a non-production environment first.

</div>

## Upgrade process

### Step 1: Back up the current configuration

Save a copy of the current Compose file and any mounted Milvus configuration files:

```bash
cp docker-compose.yml docker-compose-before-upgrade.yml
```

Confirm that the current containers are healthy before starting the upgrade:

```bash
docker compose ps
```

### Step 2: Update the Milvus image

In the existing Compose file, update only the image for the `standalone` service:

```yaml
services:
  standalone:
    image: milvusdb/milvus:v3.0-beta
```

Pull the target image and recreate only the Milvus container:

```bash
docker compose pull standalone
docker compose up --detach standalone
```

Docker Compose keeps the existing etcd and object-storage containers running and reuses the configured data directories.

## Verify the upgrade

Check the container status and the image used by the Milvus container:

```bash
docker compose ps

docker compose images standalone

docker compose logs --tail 100 standalone
```

Verify that the `standalone` service is healthy, its image is `milvusdb/milvus:v3.0-beta`, and the existing collections remain queryable and searchable. Complete these checks before you enable any v3.0-beta-specific feature.
