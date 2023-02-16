---
id: upgrade_milvus_standalone-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Learn how to upgrade Milvus standalone with Milvus operator.
---

<div class="tab-wrapper"><a href="upgrade_milvus_standalone-operator.md" class='active '>Milvus Operator</a><a href="upgrade_milvus_standalone-helm.md" class=''>Helm</a></div>

# Upgrade Milvus Standalone with Milvus Operator

This guide describes how to ugrade your Milvus standalone with Milvus operator. 

## Upgrade your Milvus operator

Run the following command to upgrade the version of your Milvus operator to v0.7.5.

```
helm repo add milvus-operator https://milvus-io.github.io/milvus-operator/
helm repo update milvus-operator
helm -n milvus-operator upgrade milvus-operator milvus-operator/milvus-operator
```

Once you have upgraded your Milvus operator to the latest version, you have the following choices:

- [Migrate the metadata](#Migrate-the-metadata)
- [Conduct a rolling upgrade](#Conduct-a-rolling-upgrade)

## Migrate the metadata

Since Milvus 2.2.0, the metadata is incompatible with that in previous releases. The following example snippets assume an upgrade from Milvus 2.1.4 to Milvus 2.2.0.

### 1. Create a `.yaml` file for metadata migration

Create a metadata migration file. The following is an example. You need to specify the `name`, `sourceVersion`, and `targetVersion` in the configuration file. The following example sets the `name` to `my-release-upgrade`, `sourceVersion` to `v2.1.4`, and `targetVersion` to `v2.2.0`. This means that your Milvus instance will be upgraded from v2.1.4 to v2.2.0.

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
  targetVersion: "v2.2.0"
  # below are some omit default values:
  # targetImage: "milvusdb/milvus:v2.2.0"
  # toolImage: "milvusdb/meta-migration:v2.2.0"
  # operation: upgrade
  # rollbackIfFailed: true
  # backupPVC: ""
  # maxRetry: 3
```



### 2. Apply the new configuration

Run the following command to apply the new configuration.

```
$ kubectl apply -f https://github.com/milvus-io/milvus-operator/blob/main/config/samples/beta/milvusupgrade.yaml
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



## Conduct a rolling upgrade

Since Milvus 2.2.3, you can configure Milvus coordinators to work in active-standby mode and enable rolling upgrade for them, so that Milvus can respond to incoming requests during the coordinator upgrades.

In previous releases, coordinators are to be removed and then created during an upgrade, which may introduce certain downtime of the service.

### 1. Configure coordinators to work in active-standby mode

Before conducting a rolling upgrade for coordiantors, you need to configure them to work in active-standby mode.

```yaml
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  components:
    rootCoord: 
      replicas: 2
      activeStandby:
        enable: true
    queryCoord:
      replicas: 2
      activeStandby:
        enable: true    
```

<div class="alert note">

Currently, dataCoords cannot work in active-standby mode.

</div>

Save the configuration in a YAML file (for example, `milvuscoordha.yml`) and apply it to your Milvus instance.

```shell
kubectl apply -f milvucoordsha.yml
```

### 2. Conduct a rolling upgrade for the coordinators

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
    image: milvusdb/milvus:<some-new-version>
```

In this above configuration file, set `spec.components.enableRollingUpdate` to `true` and set `spec.components.image` to the desired Milvus version.

By default, Milvus performs rolling upgrade for coordinators in an ordered way, in which it replaces the coordinator pod images one after another. To reduce the upgrade time, consider setting `spec.components.imageUpdateMode` to `all` so that Milvus replaces all coordinator pod images at the same time.

```yaml
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: true
    imageUpdateMode: all
    image: milvusdb/milvus:<some-new-version>
```

You can set `spec.components.imageUpdateMode` to `rollingDowngrade` to have Milvus replaces coordinator pod images with a lower version.

```yaml
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: true
    imageUpdateMode: rollingDowngrade
    image: milvusdb/milvus:<some-new-version>
```

Then save your configuration as a YAML file (for example, `milvusupgrade.yml`) and apply this configuration file to your Milvus instance as follows:

```shell
kubectl apply -f milvusupgrade.yml
```