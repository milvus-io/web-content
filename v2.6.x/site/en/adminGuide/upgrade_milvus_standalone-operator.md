---
id: upgrade_milvus_standalone-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Learn how to upgrade Milvus standalone with Milvus operator.
title: Upgrade Milvus Standalone with Milvus Operator
---

<div class="tab-wrapper"><a href="upgrade_milvus_standalone-operator.md" class='active '>Milvus Operator</a><a href="upgrade_milvus_standalone-helm.md" class=''>Helm</a><a href="upgrade_milvus_standalone-docker.md" class=''>Docker Compose</a></div>

# Upgrade Milvus Standalone with Milvus Operator

This guide describes how to upgrade your Milvus standalone with Milvus operator. 

## Upgrade your Milvus operator

Run the following command to upgrade the version of your Milvus operator to v1.2.0.

```
helm repo add zilliztech-milvus-operator https://zilliztech.github.io/milvus-operator/
helm repo update zilliztech-milvus-operator
helm -n milvus-operator upgrade milvus-operator zilliztech-milvus-operator/milvus-operator
```

Once you have upgraded your Milvus operator to the latest version, you have the following choices:

- To upgrade Milvus from v2.2.3 or later releases to 2.5.10, you can [conduct a rolling upgrade](#Conduct-a-rolling-upgrade).
- To upgrade Milvus from a minor release before v2.2.3 to 2.5.10, you are advised to [upgrade Milvus by changing its image version](#Upgrade-Milvus-by-changing-its-image).
- To upgrade Milvus from v2.1.x to 2.5.10, you need to [migrate the metadata](#Migrate-the-metadata) before the actual upgrade.

## Conduct a rolling upgrade

Since Milvus 2.2.3, you can configure Milvus coordinators to work in active-standby mode and enable the rolling upgrade feature for them, so that Milvus can respond to incoming requests during the coordinator upgrades. In previous releases, coordinators are to be removed and then created during an upgrade, which may introduce certain downtime of the service.

Based on the rolling update capabilities provided by Kubernetes, the Milvus operator enforces an ordered update of the deployments according to their dependencies. In addition, Milvus implements a mechanism to ensure that its components remain compatible with those depending on them during the upgrade, significantly reducing potential service downtime.

The rolling upgrade feature is disabled by default. You need to explicitly enable it through a configuration file.

```yaml
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: true
    imageUpdateMode: rollingUpgrade # Default value, can be omitted
    image: milvusdb/milvus:v2.5.10
```

In this above configuration file, set `spec.components.enableRollingUpdate` to `true` and set `spec.components.image` to the desired Milvus version. 

By default, Milvus performs a rolling upgrade for coordinators in an ordered way, in which it replaces the coordinator pod images one after another. To reduce the upgrade time, consider setting `spec.components.imageUpdateMode` to `all` so that Milvus replaces all pod images at the same time.

```yaml
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: true
    imageUpdateMode: all
    image: milvusdb/milvus:v2.5.10
```

You can set `spec.components.imageUpdateMode` to `rollingDowngrade` to have Milvus replace coordinator pod images with a lower version.

```yaml
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: true
    imageUpdateMode: rollingDowngrade
    image: milvusdb/milvus:<some-older-version>
```

Then save your configuration as a YAML file (for example, `milvusupgrade.yaml`) and patch this configuration file to your Milvus instance as follows:

```shell
kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --type merge 
```

## Upgrade Milvus by changing its image

In normal cases, you can simply update your Milvus to the latest by changing its image. However, note that there will be a certain downtime when upgrading Milvus in this way.

Compose a configuration file as follows and save it as **milvusupgrade.yaml**:

```yaml
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
    name: my-release
labels:
    app: milvus
spec:
  # Omit other fields ...
  components:
   image: milvusdb/milvus:v2.5.10
```

Then run the following to perform the upgrade:

```shell
kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --type merge
```

## Migrate the metadata

Since Milvus 2.2.0, the metadata is incompatible with that in previous releases. The following example snippets assume an upgrade from Milvus 2.1.4 to Milvus v2.5.10.

### 1. Create a `.yaml` file for metadata migration

Create a metadata migration file. The following is an example. You need to specify the `name`, `sourceVersion`, and `targetVersion` in the configuration file. The following example sets the `name` to `my-release-upgrade`, `sourceVersion` to `v2.1.4`, and `targetVersion` to `v2.5.10`. This means that your Milvus instance will be upgraded from v2.1.4 to v2.5.10.

```
apiVersion: milvus.io/v1beta1
kind: MilvusUpgrade
metadata:
  name: my-release-upgrade
spec:
  milvus:
    namespace: default
    name: my-release
  sourceVersion: "v2.1.4"
  targetVersion: "v2.5.10"
  # below are some omit default values:
  # targetImage: "milvusdb/milvus:v2.5.10"
  # toolImage: "milvusdb/meta-migration:v2.2.0"
  # operation: upgrade
  # rollbackIfFailed: true
  # backupPVC: ""
  # maxRetry: 3
```

### 2. Apply the new configuration

Run the following command to apply the new configuration.

```
$ kubectl create -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvusupgrade.yaml
```



### 3. Check the status of metadata migration

Run the following command to check the status of your metadata migration.

```
kubectl describe milvus release-name
```

The status of `ready` in the output means that the metadata migration is successful.

Or, you can also run `kubectl get pod` to check all the pods. If all the pods are `ready`, the metadata migration is successful.



### 4. Delete `my-release-upgrade`

When the upgrade is successful, delete `my-release-upgrade` in the YAML file.
