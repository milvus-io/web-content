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

This guide describes how to upgrade your Milvus standalone with Milvus Helm charts. 

## Prerequisites
- Helm version >= 3.14.0
- Kubernetes version >= 1.20.0

<div class="alert note">

Since Milvus-Helm chart version 4.2.21, we introduced pulsar-v3.x chart as dependency. For backward compatibility, please upgrade your helm to v3.14 or later version, and be sure to add the `--reset-then-reuse-values` option whenever you use `helm upgrade`.

</div>

## Check the Milvus version

Run the following commands to check new Milvus versions. 

```
$ helm repo update
$ helm search repo zilliztech/milvus --versions
```

<div class="alert note">

The Milvus Helm Charts repo at `https://milvus-io.github.io/milvus-helm/` has been archived and you can get further updates from `https://zilliztech.github.io/milvus-helm/` as follows:

```shell
helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update zilliztech
# upgrade existing helm release
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values
```

The archived repo is still available for the charts up to 4.0.31. For later releases, use the new repo instead.

</div>

```                                       
NAME                    CHART VERSION   APP VERSION             DESCRIPTION                                       
zilliztech/milvus       4.1.34          2.4.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.33          2.4.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.32          2.4.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.31          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.30          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.29          2.4.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.24          2.3.11                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.23          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.22          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.21          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.20          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.18          2.3.10                  Milvus is an open-source vector database built ... 
zilliztech/milvus       4.1.18          2.3.9                   Milvus is an open-source vector database built ...                                       
zilliztech/milvus       4.1.17          2.3.8                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.16          2.3.7                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.15          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.14          2.3.6                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.13          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.12          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.11          2.3.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.10          2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.9           2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.8           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.7           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.6           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.5           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.4           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.3           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.2           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.1           2.3.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.0           2.3.0                   Milvus is an open-source vector database built ...
```

You can choose the upgrade path for your Milvus as follows:

<div style="display: none;">- [Conduct a rolling upgrade](#conduct-a-rolling-upgrade) from Milvus v2.2.3 and later releases to v2.5.10.</div>

- [Upgrade Milvus using Helm](#Upgrade-Milvus-using-Helm) for an upgrade from a minor release before v2.2.3 to v2.5.10.

- [Migrate the metadata](#Migrate-the-metadata) before the upgrade from Milvus v2.1.x to v2.5.10.

<div style="display:none;">

## Conduct a rolling upgrade

Since Milvus 2.2.3, you can configure Milvus coordinators to work in active-standby mode and enable the rolling upgrade feature for them, so that Milvus can respond to incoming requests during the coordinator upgrades. In previous releases, coordinators are to be removed and then created during an upgrade, which may introduce certain downtime of the service.

Rolling upgrades requires coordinators to work in active-standby mode. You can use [the script](https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/upgrade/rollingUpdate.sh) we provide to configure the coordinators to work in active-standby mode and start the rolling upgrade.

Based on the rolling update capabilities provided by Kubernetes, the above script enforces an ordered update of the deployments according to their dependencies. In addition, Milvus implements a mechanism to ensure that its components remain compatible with those depending on them during the upgrade, significantly reducing potential service downtime.

The script applies only to the upgrade of Milvus installed with Helm. The following table lists the command flags available in the scripts.

| Parameters   | Description                                               | Default value                    | Required                |
| ------------ | ----------------------------------------------------------| -------------------------------- | ----------------------- |
| `i`          | Milvus instance name                                      | `None`                           | True                    |
| `n`          | Namespace that Milvus is installed in                     | `default`                        | False                   |
| `t`          | Target Milvus version                                     | `None`                           | True                    |
| `w`          | New Milvus image tag                                      | `milvusdb/milvus:v2.2.3`         | True                    |
| `o`          | Operation                                                 | `update`                         | False                   |

Once you have ensured that all deployments in your Milvus instance are in their normal status. You can run the following command to upgrade the Milvus instance to 2.5.10.

```shell
sh rollingUpdate.sh -n default -i my-release -o update -t 2.5.10 -w 'milvusdb/milvus:v2.5.10'
```

<div class="alert note">

1. The script **does not apply** to the Milvus instance installed with **RocksMQ**.
1. The script hard-codes the upgrade order of the deployments and cannot be changed.
2. The script uses `kubectl patch` to update the deployments and `kubectl rollout status` to watch their status.
3. The script uses `kubectl patch` to update the `app.kubernetes.io/version` label of the deployments to the one specified after the `-t` flag in the command.

</div>
    
</div>

## Upgrade Milvus using Helm

To upgrade Milvus from a minor release before v2.2.3 to the latest, run the following commands:

```shell
helm repo update
helm upgrade my-release milvus/milvus --reset-then-reuse-values --version=4.1.24 # use the helm chart version here
```

Use the Helm chart version in the preceding command. For details on how to obtain the Helm chart version, refer to [Check the Milvus version](#Check-the-Milvus-version).

## Migrate the metadata

Since Milvus 2.2.0, the metadata is incompatible with that in previous releases. The following example snippets assume an upgrade from Milvus 2.1.4 to Milvus 2.2.0.

### 1. Check the Milvus version

Run `$ helm list` to check your Milvus app version. You can see the `APP VERSION` is 2.1.4. 

```
NAME             	NAMESPACE	REVISION	UPDATED                                	STATUS  	CHART        	APP VERSION     
my-release      	default  	1       	2022-11-21 15:41:25.51539 +0800 CST    	deployed	milvus-3.2.18	2.1.4
```

### 2. Check the running pods

Run `$ kubectl get pods` to check the running pods. You can see the following output.

```
NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          84s
my-release-milvus-standalone-75c599fffc-6rwlj   1/1     Running   0          84s
my-release-minio-744dd9586f-qngzv               1/1     Running   0          84s
```

### 3. Check the image tag

Check the image tag for the pod `my-release-milvus-proxy-6c548f787f-scspp`. You can see the release of your Milvus cluster is v2.1.4.

```shell
$ kubectl get pods my-release-milvus-proxy-6c548f787f-scspp -o=jsonpath='{$.spec.containers[0].image}'
# milvusdb/milvus:v2.1.4
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

#### 2. Upgrade Milvus from v2.1.x to 2.5.10

The following commands assume that you upgrade Milvus from v2.1.4 to 2.5.10. Change them to the versions that fit your needs.

1. Specify Milvus instance name, source Milvus version, and target Milvus version.

    ```
    ./migrate.sh -i my-release -s 2.1.4 -t 2.5.10
    ```

2. Specify the namespace with `-n` if your Milvus is not installed in the default K8s namespace.

    ```
    ./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.5.10
    ```

3. Specify the root path with `-r` if your Milvus is installed with the custom `rootpath`.

    ```
    ./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.5.10 -r by-dev
    ```

4. Specify the image tag with `-w` if your Milvus is installed with a custom `image`.

    ```
    ./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.5.10 -r by-dev -w milvusdb/milvus:v2.5.10
    ```

5. Set `-d true` if you want to automatically remove the migration pod after the migration is completed.

    ```
    ./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.5.10 -w milvusdb/milvus:v2.5.10 -d true
    ```

6. Rollback and migrate again if the migration fails.

    ```
    ./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.5.10 -r by-dev -o rollback -w milvusdb/milvus:v2.1.1
    ./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.5.10 -r by-dev -o migrate -w milvusdb/milvus:v2.5.10
