---
id: upgrade_milvus_cluster.md
related_key: upgrade Milvus Cluster
summary: Learn how to upgrade Milvus cluster.
---

# Upgrade Milvus Cluster

### Step 1. Check the Milvus version

Run `$ helm list` to check your Milvus app version. You can see the `APP VERSION` is 2.0.2. 

```
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART               APP VERSION
my-release        default          1               2022-07-28 15:50:43.21188 +0800 CST          deployed        milvus-3.0.29        2.0.2
```

### Step 2. Check the running pods

Run `$ kubectl get pods` to check the running pods. You can see the following output.

```
NAME                                              READY   STATUS      RESTARTS   AGE
my-release-etcd-0                                 1/1     Running     0          5m40s
my-release-etcd-1                                 1/1     Running     0          5m40s
my-release-etcd-2                                 1/1     Running     0          5m40s
my-release-milvus-datacoord-c99d7dfdf-mjghl       1/1     Running     0          5m40s
my-release-milvus-datanode-69cccf85d8-9r8ph       1/1     Running     0          5m40s
my-release-milvus-indexcoord-64f7d548fb-46hn8     1/1     Running     0          5m40s
my-release-milvus-indexnode-57b96d9cc7-gvmvl      1/1     Running     0          5m40s
my-release-milvus-proxy-6664d564f9-pwqn9          1/1     Running     0          5m40s
my-release-milvus-querycoord-59767cb88c-n54l6     1/1     Running     0          5m40s
my-release-milvus-querynode-847ccdf855-78mnz      1/1     Running     0          5m40s
my-release-milvus-rootcoord-597bd9f565-2jgzq      1/1     Running     0          5m40s
my-release-minio-0                                1/1     Running     0          5m40s
my-release-minio-1                                1/1     Running     0          5m40s
my-release-minio-2                                1/1     Running     0          5m40s
my-release-minio-3                                1/1     Running     0          5m40s
my-release-pulsar-autorecovery-869bffb7b8-g4cbh   1/1     Running     0          5m40s
my-release-pulsar-bastion-7c659df966-86b5s        1/1     Running     0          5m40s
my-release-pulsar-bookkeeper-0                    1/1     Running     0          5m40s
my-release-pulsar-bookkeeper-1                    1/1     Running     0          3m54s
my-release-pulsar-broker-864775f5ff-zlnfx         1/1     Running     0          5m40s
my-release-pulsar-proxy-86bcdbbb4c-24kcj          2/2     Running     0          5m40s
my-release-pulsar-zookeeper-0                     1/1     Running     0          5m40s
my-release-pulsar-zookeeper-1                     1/1     Running     0          5m20s
my-release-pulsar-zookeeper-2                     1/1     Running     0          5m5s
my-release-pulsar-zookeeper-metadata-hw5xt        0/1     Completed   0          5m40s
```

### Step 3. Check the image tag

Check the image tag for the pod `my-release-milvus-proxy-6664d564f9-pwqn9`. You can see the release of your Milvus cluster is v2.0.2.

```
$ kubectl get pods my-release-milvus-proxy-6664d564f9-pwqn9 -o=jsonpath='{$.spec.containers[0].image}'
```

```
milvusdb/milvus:v2.0.2
```

### Step 4. Check new Milvus cluster versions

Run the following commands to check new Milvus versions. You can see there are several new versions after 2.0.2. 

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

### Step 5. Upgrade

1. Run the following commands to upgrade your Milvus cluster from v2.0.2 to v2.1.0.

```
$ helm repo update
$ helm upgrade my-release milvus/milvus
```

2. Run `$ helm list` again to check your Milvus version. You can see your Milvus cluster has been upgraded to v2.1.0.

```
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART               APP VERSION
my-release        default          2               2022-07-28 16:05:20.11326 +0800 CST        deployed        milvus-3.1.2        2.1.0
```

3. Run `$ kubectl get pods` to check the new pods. You can see the following output.

```
NAME                                              READY   STATUS    RESTARTS   AGE
my-release-etcd-0                                 1/1     Running   0          71s
my-release-etcd-1                                 1/1     Running   0          2m34s
my-release-etcd-2                                 1/1     Running   0          3m41s
my-release-milvus-datacoord-76d55548b6-zl4kj      1/1     Running   0          3m45s
my-release-milvus-datanode-5b9774cc75-dhn7j       1/1     Running   0          3m45s
my-release-milvus-indexcoord-96549bfff-r9m99      1/1     Running   0          3m45s
my-release-milvus-indexnode-f7c9b444b-vjqnm       1/1     Running   0          3m44s
my-release-milvus-proxy-5685bbc546-v6scq          1/1     Running   0          3m44s
my-release-milvus-querycoord-5fcd65544-8m6lb      1/1     Running   0          3m44s
my-release-milvus-querynode-5b76d575f6-2szfj      1/1     Running   0          3m44s
my-release-milvus-rootcoord-8668f8c46b-9nss2      1/1     Running   0          3m44s
my-release-minio-0                                1/1     Running   0          11m
my-release-minio-1                                1/1     Running   0          11m
my-release-minio-2                                1/1     Running   0          11m
my-release-minio-3                                1/1     Running   0          11m
my-release-pulsar-autorecovery-869bffb7b8-g4cbh   1/1     Running   0          11m
my-release-pulsar-bastion-7c659df966-86b5s        1/1     Running   0          11m
my-release-pulsar-bookkeeper-0                    1/1     Running   0          11m
my-release-pulsar-bookkeeper-1                    1/1     Running   0          9m55s
my-release-pulsar-broker-864775f5ff-zlnfx         1/1     Running   0          11m
my-release-pulsar-proxy-86bcdbbb4c-24kcj          2/2     Running   0          11m
my-release-pulsar-zookeeper-0                     1/1     Running   0          11m
my-release-pulsar-zookeeper-1                     1/1     Running   0          11m
my-release-pulsar-zookeeper-2                     1/1     Running   0          11m
```

4. Run the following command to check the new image version. You can see it is v2.1.0 now.

```
$ kubectl get pods my-release-milvus-proxy-5685bbc546-v6scq -o=jsonpath='{$.spec.containers[0].image}'
```

```
milvusdb/milvus:v2.1.0
```