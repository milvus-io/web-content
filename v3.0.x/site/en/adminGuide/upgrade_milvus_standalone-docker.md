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

This guide describes how to upgrade a Milvus 2.6.x standalone deployment to v3.0.5 with Docker Compose.

<div class="alert note">

This procedure was validated with the official Milvus 2.6.20 standalone Docker Compose configuration with an image-only change. Step 2 additionally adds the data directory ownership service from the v3.0.5 Compose configuration, which that validation did not cover.

</div>

## Prerequisites

- Docker Engine and Docker Compose V2
- An existing Milvus 2.6.x standalone deployment managed by Docker Compose
- The Docker Compose file and configuration used for the existing deployment
- A current backup of Milvus metadata and persistent data

**Message Queue limitations**: When upgrading to Milvus v3.0.5, you must maintain your current message queue choice. Switching between different message queue systems during the upgrade is not supported. Support for changing message queue systems will be available in future versions.


<div class="alert warning">

Do not replace your current Compose file or change dependency versions as part of this procedure. Keep the existing etcd, object storage, message queue, volumes, and configuration. Update the Milvus image tag and add the data directory ownership service described in Step 2.

If your Compose file uses `minio/minio:RELEASE.2024-12-18T13-15-44Z` and Docker cannot pull this image, change it to `milvusdb/minio:RELEASE.2024-12-18T13-15-44Z`, which the v3.0.5 Compose configuration uses. Keep the same release tag.

This procedure does not validate a downgrade or rollback by changing the Milvus image back to 2.6.x. After v3.0.5 writes data, an image-only rollback can fail to read the updated state. If the upgrade fails, stop writes and use a recovery plan that restores the pre-upgrade metadata and persistent data backups. Validate the recovery plan in a non-production environment first.

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

In the existing Compose file, update the image of the `standalone` service, replace its `depends_on` entries with the ones below, and add the `milvus-volume-init` service. Use the same image for both services, and mount the same host directory that the `standalone` service mounts at `/var/lib/milvus`. Keep the other settings of the `standalone` service:

```yaml
services:
  milvus-volume-init:
    image: milvusdb/milvus:v3.0.5
    user: "0:0"
    network_mode: none
    read_only: true
    restart: "no"
    entrypoint: ["/bin/sh", "-c"]
    command:
      - |
        set -eu
        uid="$$(id -u milvus)"
        gid="$$(id -g milvus)"
        marker="/var/lib/milvus/.milvus-volume-owner-$${uid}-$${gid}"
        if [ ! -e "$${marker}" ]; then
          echo "Preparing /var/lib/milvus for $${uid}:$${gid}"
          chown -R "$${uid}:$${gid}" /var/lib/milvus
          touch "$${marker}"
          chown "$${uid}:$${gid}" "$${marker}"
        fi
    volumes:
      - ${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus

  standalone:
    image: milvusdb/milvus:v3.0.5
    depends_on:
      milvus-volume-init:
        condition: service_completed_successfully
      etcd:
        condition: service_started
      minio:
        condition: service_started
```

Milvus v3.0.5 images run Milvus as the non-root `milvus` user, while Milvus 2.6.x images do not set a user and run Milvus as `root`. The `milvus-volume-init` service comes from the v3.0.5 Compose configuration. It runs once as `root` before Milvus starts and changes the owner of `/var/lib/milvus` and its contents to the `milvus` user and group, so that Milvus can write to the files that the 2.6.x deployment created. It then writes a `.milvus-volume-owner-<uid>-<gid>` marker file to `/var/lib/milvus` and makes no changes on later runs while the marker file exists. If you later restore files owned by a different user into the data directory, remove the marker file so that the service runs again.

Pull the target image and recreate the Milvus container. Because the `standalone` service depends on `milvus-volume-init`, Docker Compose runs `milvus-volume-init` to completion before it starts the new Milvus container:

```bash
docker compose pull standalone
docker compose up --detach standalone
```

Docker Compose keeps the existing etcd and object-storage containers running and reuses the configured data directories. If you changed the configuration of a dependency, for example the MinIO image, Compose recreates that container and keeps its mounted volumes.

## Verify the upgrade

Check the container status and the image used by the Milvus container:

```bash
docker compose ps

docker compose images standalone

docker compose logs --tail 100 standalone
```

Verify that the `standalone` service is healthy, its image is `milvusdb/milvus:v3.0.5`, and the existing collections remain queryable and searchable. Complete these checks before you enable any v3.0.5-specific feature.

<div class="alert note">

Upgrading to Milvus 3.0 does not enable Storage V3. After you verify the upgrade, review [Storage V3](storage-v3.md) before enabling features that depend on it. Once Milvus writes Storage V3 data, downgrading to an older Milvus version that cannot read Storage V3 is not supported.

</div>

