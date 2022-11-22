---
id: upgrade_milvus_cluster-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Learn how to upgrade Milvus cluster.
---

<div class="tab-wrapper"><a href="upgrade_milvus_cluster-operator.md" class='active '>Milvus Operator</a><a href="upgrade_milvus_cluster-docker.md" class=''>Docker Compose</a><a href="upgrade_milvus_cluster-helm.md" class=''>Helm</a></div>

# Upgrade Milvus Cluster with Milvus Operator

This topic describes how to ugrade your Milvus cluster with Milvus Operator and uses the example of upgrading Milvus 2.1.4 to Milvus 2.2.0.

## 1. Upgrade you Milvus Operator to v0.7.0

Run the following command to upgrade the version of your Milvus Operator to v0.7.0.

```
helm repo add milvus-operator https://milvus-io.github.io/milvus-operator/
helm repo update milvus-operator
helm -n milvus-operator upgrade milvus-operator milvus-operator/milvus-operator
```


## 2. Create a `.yaml` file for metadata migration

Create a metadata migration file. The following is an example. You need to specify the `name`, `sourceVersion`, and `targetVersion` in the configuration file. The following example sets the `name` to `my-release-upgrade`, `sourceVersion` to `v2.1.4`, and `targetVersion` to `v2.2.0`. This means that your Milvus cluster will be upgraded from v2.1.4 to v2.2.0.

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



## 3. Apply the new configuration

Run the following command to apply the new configuration.

```
$ kubectl apply -f https://github.com/milvus-io/milvus-operator/blob/main/config/samples/beta/milvusupgrade.yaml
```



## 4. Check the status of metadata migration

Run the following command to check the status of your metadata migration.

```
kubectl describe milvus release-name
```

The status of `ready` in the output means that the metadata migration is successful.

Or, you can also run `kubectl get pod` to check all the pods. If all the pods are `ready`, the metadata migration is successful.



## 5. Delete `my-release-upgrade`

When the upgrade is successful, delete `my-release-upgrade` in the `,yaml` file.
