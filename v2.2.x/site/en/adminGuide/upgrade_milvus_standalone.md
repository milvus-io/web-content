---
id: upgrade_milvus_standalone.md
related_key: upgrade Milvus Standalone
summary: Learn how to upgrade Milvus standalone.
---

# Upgrade Milvus Standalone

### Step 1. Check the Milvus version

Run `$ helm list` to check your Milvus app version. You can see the `APP VERSION` is 2.0.2. 

```
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART               APP VERSION
my-release        default          1               2022-07-28 15:28:12.32068 +0800 CST          deployed        milvus-3.0.29        2.0.2
```

### Step 2. Check the running pods

Run `$ kubectl get pods` to check the running pods. You can see the following output.

```
NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          84s
my-release-milvus-standalone-75c599fffc-6rwlj   1/1     Running   0          84s
my-release-minio-744dd9586f-qngzv               1/1     Running   0          84s
```

### Step 3. Check the image tag

Check the image tag for the pod `my-release-milvus-standalone-75c599fffc-6rwlj`. You can see the release of your Milvus standalone is v2.0.2.

```
$ kubectl get pods my-release-milvus-standalone-75c599fffc-6rwlj -o=jsonpath='{$.spec.containers[0].image}'
```

```
milvusdb/milvus:v2.0.2
```


### Step 4. Check new Milvus standalone versions

Run the following commands to check new Milvus versions. You can see there are several new versions after v2.0.2. 

```
$ helm repo update
$ helm search repo milvus --versions
```

```
NAME                 CHART VERSION        APP VERSION               DESCRIPTION
milvus/milvus        3.1.2                2.1.0                     Milvus is an open-source vector database built ...
milvus/milvus        3.1.1                2.1.0                     Milvus is an open-source vector database built ...
milvus/milvus        3.1.0                2.1.0                     Milvus is an open-source vector database built ...
milvus/milvus        3.0.29               2.0.2                     Milvus is an open-source vector database built ...
milvus/milvus        3.0.28               2.0.2                     Milvus is an open-source vector database built ...
milvus/milvus        3.0.27               2.0.2                     Milvus is an open-source vector database built ...
milvus/milvus        3.0.26               2.0.2                     Milvus is an open-source vector database built ...
milvus/milvus        3.0.25               2.0.2                     Milvus is an open-source vector database built ...
milvus/milvus        3.0.24               2.0.2                     Milvus is an open-source vector database built ...
milvus/milvus        3.0.23               2.0.2                     Milvus is an open-source vector database built ...
milvus/milvus        3.0.21               2.0.2                     Milvus is an open-source vector database built ...
milvus/milvus        3.0.20               2.0.2                     Milvus is an open-source vector database built ...
milvus/milvus        3.0.19               2.0.2                     Milvus is an open-source vector database built ...
milvus/milvus        3.0.18               2.0.2                     Milvus is an open-source vector database built ...
```

### Step 5. Migrate meta
A major change in Milvus 2.2 is the meta structure of segment indexes. Therefore, you need to use Helm to migrate the meta while upgrading Milvus from v2.1.x to v2.2.0. We provide you with a script so that you can safely migrate your meta data.

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
| `m`          | The meta migration image tag.                             | `harbor.milvus.io/milvus/meta-migration:20221025-e54b6181b`       | False                   |
| `o`          | The meta migration operation.                             | `migrate`                      | False                   |
| `d`          | Whether to delete migration pod after the migration is completed.          | `false`                        | False                   |

#### 1. Migrate meta

1. Download the migration script.
2. Stop the Milvus components. Any live session in the Milvus etcd can cause the migration to fail.
3. Create a backup for Milvus meta.
4. Migrate the Milvus meta.
5. Start Milvus components with a new image.

#### 2.Upgrade Milvus from v2.1.x to v2.2.0

1. Specify Milvus instance name, source Milvus version, and target Milvus version.

```
./migrate.sh -i my-release -s 2.1.1 -t 2.2.0
```

2. Specify namespace with `-n` if your Milvus is not installed in the default K8s namespace.

```
./migrate.sh -i my-release -n milvus -s 2.1.1 -t 2.2.0
```

3. Specify rootpath with `-r` if your Milvus is installed with the custom `rootpath`.

```
./migrate.sh -i my-release -n milvus -s 2.1.1 -t 2.2.0 -r by-dev
```

4. Specify the image tag with `-w` if your Milvus is installed with custom `image`.

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

