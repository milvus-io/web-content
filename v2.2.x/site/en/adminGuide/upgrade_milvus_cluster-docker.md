---
id: upgrade_milvus_cluster-docker.md
label: Docker Compose
order: 1
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Learn how to upgrade Milvus cluster.
---

<div class="tab-wrapper"><a href="upgrade_milvus_cluster-operator.md" class=''>Milvus Operator</a><a href="upgrade_milvus_cluster-docker.md" class='active '>Docker Compose</a><a href="upgrade_milvus_cluster-helm.md" class=''>Helm</a></div>

# Upgrade Milvus Cluster with Docker Compose

A major change in Milvus 2.2 is the meta structure of segment indexes. This topic describes how to use Docker Compose to migrate the meta and upgrade Milvus from v2.1.x to v2.2.0.

## Upgrade Milvus from v2.1.x to v2.2.0

1. Stop all Milvus components.

```
docker stop <milvus-component-docker-container-name>
```

2. Prepare the configuration file `migrate.yaml` for meta migration.

```
# migration.yaml
cmd:
  # Option: run/backup/rollback
  type: run
  runWithBackup: true
config:
  sourceVersion: 2.1.4   # Specify your milvus version
  targetVersion: 2.2.0
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
docker run --rm -it --network milvus -v $(pwd)/migration.yaml:/milvus/configs/migration.yaml harbor.milvus.io/milvus/meta-migration:20221020-02a8a0732 /milvus/bin/meta-migration -config=/milvus/configs/migration.yaml
```

4. Start Milvus components again with the new Milvus image.

```
Update the milvus image tag in the docker-compose.yaml
docker-compose down
docker-compose up -d
```





## What's next
- You might also want to learn how to:
  - [Scale a Milvus cluster](scaleout.md)
- If you are ready to deploy your cluster on clouds:
  - Learn how to [Deploy Milvus on AWS with Terraform and Ansible](aws.md)
  - Learn how to [Deploy Milvus on Amazon EKS with Terraform](eks.md)
  - Learn how to [Deploy Milvus Cluster on GCP with Kubernetes](gcp.md)
  - Learn how to [Deploy Milvus on Microsoft Azure With Kubernetes](azure.md)
