---
id: upgrade_milvus_cluster-helm.md
label: Helm
order: 1
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Learn how to upgrade Milvus cluster with Helm Chart.
---

<div class="tab-wrapper"><a href="upgrade_milvus_cluster-operator.md" class=''>Milvus Operator</a><a href="upgrade_milvus_cluster-helm.md" class='active '>Helm</a><a href="upgrade_milvus_cluster-docker.md" class=''>Docker Compose</a></div>

# Upgrade Milvus Cluster with Helm Chart

This guide describes how to upgrade your Milvus cluster with Milvus Helm charts. 

## Check Milvus Helm Chart

Run the following commands to check new Milvus versions. 

```
$ helm repo update
$ helm search repo milvus --versions
```

```
NAME         	CHART VERSION	APP VERSION       	DESCRIPTION                                       
milvus/milvus	4.0.8        	2.2.3             	Milvus is an open-source vector database built ...
milvus/milvus	4.0.7        	2.2.3             	Milvus is an open-source vector database built ...
milvus/milvus	4.0.6        	2.2.2             	Milvus is an open-source vector database built ...
milvus/milvus	4.0.5        	2.2.2             	Milvus is an open-source vector database built ...
milvus/milvus	4.0.4        	2.2.2             	Milvus is an open-source vector database built ...
milvus/milvus	4.0.3        	2.2.2             	Milvus is an open-source vector database built ...
milvus/milvus	4.0.2        	2.2.2             	Milvus is an open-source vector database built ...
milvus/milvus	4.0.1        	2.2.1             	Milvus is an open-source vector database built ...
milvus/milvus	4.0.0        	2.2.1             	Milvus is an open-source vector database built ...
milvus/milvus	3.3.6        	2.2.0             	Milvus is an open-source vector database built ...
milvus/milvus	3.3.5        	2.2.0             	Milvus is an open-source vector database built ...
milvus/milvus	3.3.4        	2.2.0             	Milvus is an open-source vector database built ...
milvus/milvus	3.3.3        	2.2.0             	Milvus is an open-source vector database built ...
milvus/milvus	3.3.2        	2.2.0             	Milvus is an open-source vector database built ...
milvus/milvus	3.3.1        	2.2.0             	Milvus is an open-source vector database built ...
milvus/milvus	3.3.0        	2.2.0             	Milvus is an open-source vector database built ...
milvus/milvus	3.2.18       	2.1.4             	Milvus is an open-source vector database built ...
```

In normal cases, you can upgrade your Milvus instance using `helm upgrade` except you want to:

- [Migrate the metadata](#Migrate-the-metadata)
- [Conduct a rolling upgrade](#Conduct-a-rolling-upgrade)

## Migrate the metadata

Since Milvus 2.2.0, the metadata is incompatible with that in previous releases. The following example snippets assume an upgrade from Milvus 2.1.4 to Milvus 2.2.0.

### 1. Check the Milvus version

Run `$ helm list` to check your Milvus app version. You can see the `APP VERSION` is 2.1.4. 

```
NAME             	NAMESPACE	REVISION	UPDATED                                	STATUS  	CHART        	APP VERSION    
new-release      	default  	1       	2022-11-21 15:41:25.51539 +0800 CST    	deployed	milvus-3.2.18	2.1.4 
```

### 2. Check the running pods

Run `$ kubectl get pods` to check the running pods. You can see the following output.

```
NAME                                             READY   STATUS      RESTARTS   AGE
my-release-etcd-0                               1/1     Running     0          21m
my-release-etcd-1                               1/1     Running     0          21m
my-release-etcd-2                               1/1     Running     0          21m
my-release-milvus-datacoord-664c58798d-fl75s    1/1     Running     0          21m
my-release-milvus-datanode-5f75686c55-xfg2r     1/1     Running     0          21m
my-release-milvus-indexcoord-5f98b97589-2l48r   1/1     Running     0          21m
my-release-milvus-indexnode-857b4ddf98-vmd75    1/1     Running     0          21m
my-release-milvus-proxy-6c548f787f-scspp        1/1     Running     0          21m
my-release-milvus-querycoord-c454f44cd-dwmwq    1/1     Running     0          21m
my-release-milvus-querynode-76bb4946d-lbrz6     1/1     Running     0          21m
my-release-milvus-rootcoord-7764c5b686-62msm    1/1     Running     0          21m
my-release-minio-0                              1/1     Running     0          21m
my-release-minio-1                              1/1     Running     0          21m
my-release-minio-2                              1/1     Running     0          21m
my-release-minio-3                              1/1     Running     0          21m
my-release-pulsar-bookie-0                      1/1     Running     0          21m
my-release-pulsar-bookie-1                      1/1     Running     0          21m
my-release-pulsar-bookie-2                      1/1     Running     0          21m
my-release-pulsar-bookie-init-tjxpj             0/1     Completed   0          21m
my-release-pulsar-broker-0                      1/1     Running     0          21m
my-release-pulsar-proxy-0                       1/1     Running     0          21m
my-release-pulsar-pulsar-init-c8vvc             0/1     Completed   0          21m
my-release-pulsar-recovery-0                    1/1     Running     0          21m
my-release-pulsar-zookeeper-0                   1/1     Running     0          21m
my-release-pulsar-zookeeper-1                   1/1     Running     0          20m
my-release-pulsar-zookeeper-2                   1/1     Running     0          20m
```

### 3. Check the image tag

Check the image tag for the pod `my-release-milvus-proxy-6c548f787f-scspp`. You can see the release of your Milvus cluster is v2.1.4.

```
$ kubectl get pods my-release-milvus-proxy-6c548f787f-scspp -o=jsonpath='{$.spec.containers[0].image}'
```

```
milvusdb/milvus:v2.1.4
```

### 4. Migrate the metadata
A major change in Milvus 2.2 is the metadata structure of segment indexes. Therefore, you need to use Helm to migrate the metadata while upgrading Milvus from v2.1.x to v2.2.0. Here is [a script](https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh) for you to safely migrate your metadata.

This script only applies to Milvus installed on a K8s cluster. Roll back to the previous version with the rollback operation first if an error occurs during the process.

The following table lists the operations you can do for meta migration.

| Parameters   | Description                                                      | Default value                    | Required                |
| ------------ | ---------------------------------------------------------------- | ---------------------------- | ----------------------- |
| `i`          | The Milvus instance name.                                 | `None`                         | True                    |
| `n`          | The namespace that Milvus is installed in.                | `default`                      | False                   |
| `s`          | The source Milvus version.                                | `None`                         | True                    |
| `t`          | The target Milvus version.                               | `None`                         | True                    |
| `r`          | The root path of Milvus meta.                             | `by-dev`                       | False                   |
| `w`          | The new Milvus image tag.                                 | `milvusdb/milvus:v2.2.0`       | False                   |
| `m`          | The meta migration image tag.                             | `milvusdb/meta-migration:v2.2.0`       | False                   |
| `o`          | The meta migration operation.                             | `migrate`                      | False                   |
| `d`          | Whether to delete migration pod after the migration is completed.          | `false`                        | False                   |
| `c`          | The storage class for meta migration pvc.                 | `default storage class`          | False                   |
| `e`          | The etcd enpoint used by milvus.              | `etcd svc installed with milvus` | False                   |

#### 1. Migrate the metadata

1. Download the [migration script](https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh).
2. Stop the Milvus components. Any live session in the Milvus etcd can cause a migration failure.
3. Create a backup for the Milvus metadata.
4. Migrate the Milvus metadata.
5. Start Milvus components with a new image.

#### 2. Upgrade Milvus from v2.1.x to v2.2.0

1. Specify Milvus instance name, source Milvus version, and target Milvus version.

    ```
    ./migrate.sh -i my-release -s 2.1.1 -t 2.2.0
    ```

2. Specify the namespace with `-n` if your Milvus is not installed in the default K8s namespace.

    ```
    ./migrate.sh -i my-release -n milvus -s 2.1.1 -t 2.2.0
    ```

3. Specify the root path with `-r` if your Milvus is installed with the custom `rootpath`.

    ```
    ./migrate.sh -i my-release -n milvus -s 2.1.1 -t 2.2.0 -r by-dev
    ```

4. Specify the image tag with `-w` if your Milvus is installed with a custom `image`.

    ```
    ./migrate.sh -i my-release -n milvus -s 2.1.1 -t 2.2.0 -r by-dev -w milvusdb/milvus:master-20221016-15878781
    ```

5. Set `-d true` if you want to automatically remove the migration pod after the migration is completed.

    ```
    ./migrate.sh -i my-release -n milvus -s 2.1.1 -t 2.2.0 -w milvusdb/milvus:master-20221016-15878781 -d true
    ```

6. Rollback and migrate again if the migration fails.

    ```
    ./migrate.sh -i my-release -n milvus -s 2.1.1 -t 2.2.0 -r by-dev -o rollback -w <milvus-2-1-1-image>
    ./migrate.sh -i my-release -n milvus -s 2.1.1 -t 2.2.0 -r by-dev -o migrate -w <milvus-2-2-0-image>
    ```


## Conduct a rolling upgrade

Since Milvus 2.2.3, you can configure Milvus coordinators to work in active-standby mode and enable rolling upgrade for them, so that Milvus can respond to incoming requests during the coordinator upgrades.

In previous releases, coordinators are to be removed and then created during an upgrade, which may introduce certain downtime of the service.

Rolling upgrades requires coordinators to work in active-standby mode. You can use [the script](https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/upgrade/rollingUpdate.sh) we provide to configure the coordinators to work in active-standby mode and start the rolling upgrade.

The script applies only to the upgrade of Milvus installed with Helm. The following table lists the command flags available in the scripts.

| Parameters   | Description                                               | Default value                    | Required                |
| ------------ | ----------------------------------------------------------| -------------------------------- | ----------------------- |
| `i`          | Milvus instance name                                      | `None`                           | True                    |
| `n`          | Namespace that Milvus is installed in                     | `default`                        | False                   |
| `t`          | Target Milvus version                                     | `None`                           | True                    |
| `w`          | New Milvus image tag                                      | `milvusdb/milvus:v2.2.3`         | True                    |
| `o`          | Operation                                                 | `update`                         | False                   |

Once you have ensured that all deployments in your Milvus instance are in their normal status. You can run the following command to upgrade the Milvus instance to 2.2.3.

```shell
sh rollingUpdate.sh -n default -i my-release -o update -t 2.2.3 -w 'milvusdb/milvus:v2.2.3'
```

<div class="alert note">

1. The script hard-codes the upgrade order of the deployments and cannot be changed.
2. The script uses `kubectl patch` to update the deployments and `kubectl rollout status` to watch their status.
3. The script uses `kubectl patch` to update the `app.kubernetes.io/version` label of the deployments to the one specified after the `-t` flag in the command.

</div>