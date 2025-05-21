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

This topic describes how to upgrade your Milvus using Docker Compose. 

In normal cases, you can [upgrade Milvus by changing its image](#Upgrade-Milvus-by-changing-its-image). However, you need to [migrate the metadata](#Migrate-the-metadata) before any upgrade from v2.1.x to v2.5.10.

<div class="alter note">

Due to security concerns, Milvus upgrades its MinIO to RELEASE.2023-03-20T20-16-18Z with the release of v2.2.5. Before any upgrades from previous Milvus Standalone releases installed using Docker Compose, you should create a Single-Node Single-Drive MinIO deployment and migrate existing MinIO settings and content to the new deployment. For details, refer to [this guide](https://min.io/docs/minio/linux/operations/install-deploy-manage/migrate-fs-gateway.html#id2).

</div>

## Upgrade Milvus by changing its image

In normal cases, you can upgrade Milvus as follows:

1. Change the Milvus image tag in `docker-compose.yaml`.

    ```yaml
    ...
    standalone:
      container_name: milvus-standalone
      image: milvusdb/milvus:v2.5.10
    ```

2. Run the following commands to perform the upgrade.

    ```shell
    docker compose down
    docker compose up -d
    ```

## Migrate the metadata

1. Stop all Milvus components.

    ```
    docker stop <milvus-component-docker-container-name>
    ```

2. Prepare the configuration file `migration.yaml` for meta migration.

    ```yaml
    # migration.yaml
    cmd:
      # Option: run/backup/rollback
      type: run
      runWithBackup: true
    config:
      sourceVersion: 2.1.4   # Specify your milvus version
      targetVersion: 2.5.10
      backupFilePath: /tmp/migration.bak
    metastore:
      type: etcd
    etcd:
      endpoints:
        - milvus-etcd:2379  # Use the etcd container name
      rootPath: by-dev # The root path where data is stored in etcd
      metaSubPath: meta
      kvSubPath: kv
    ```

3. Run the migration container.

    ```
    # Suppose your docker-compose run with the default milvus network,
    # and you put migration.yaml in the same directory with docker-compose.yaml.
    docker run --rm -it --network milvus -v $(pwd)/migration.yaml:/milvus/configs/migration.yaml milvusdb/meta-migration:v2.2.0 /milvus/bin/meta-migration -config=/milvus/configs/migration.yaml
    ```

4. Start Milvus components again with the new Milvus image.

    ```shell
    // Run the following only after update the milvus image tag in the docker-compose.yaml
    docker compose down
    docker compose up -d
    ```

## What's next
- You might also want to learn how to:
  - [Scale a Milvus cluster](scaleout.md)
- If you are ready to deploy your cluster on clouds:
  - Learn how to [Deploy Milvus on Amazon EKS with Terraform](eks.md)
  - Learn how to [Deploy Milvus Cluster on GCP with Kubernetes](gcp.md)
  - Learn how to [Deploy Milvus on Microsoft Azure With Kubernetes](azure.md)
