---
id: upgrade.md
related_key: upgrade Milvus
summary: 了解如何升级 Milvus 2.0 版本
---

# 使用 Helm Chart 升级 Milvus 2.0 版本

本文将介绍如何使用 Helm Chart 升级 Milvus 2.0 版本。本文以 Milvus 2.0.0-RC7 升级至 2.0.0-RC8 为例。

<div class="alert note">
目前，暂不暂不支持使用 Helm Chart 实现单机版 Milvus 与分布式版 Milvus 之间的升级转换。Milvus 2.0.0-RC7 与此前版本不兼容，因此不支持从此前版本升级至 2.0.0-RC7 版本。
</div>

## 升级单机版 Milvus

### 步骤 1. 查看 Milvus 版本

运行指令 `$ helm list`，查看 Milvus app 版本. 你可以看到返回结果中显示 Milvus `APP VERSION` 为 2.0.0-rc7。

```
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART               APP VERSION
my-release        default          1               2021-11-08 17:12:44.678247 +0800 CST        deployed        milvus-2.2.4        2.0.0-rc.7
```

### 步骤 2. 查看运行中的 pod

运行指令 `$ kubectl get pods`，查看运行中的 pod。 你可以看到如下结果：

```
NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          84s
my-release-milvus-standalone-75c599fffc-6rwlj   1/1     Running   0          84s
my-release-minio-744dd9586f-qngzv               1/1     Running   0          84s
```

### 步骤 3. 查看 image tag

查看 `my-release-milvus-standalone-75c599fffc-6rwlj` pod 的 image tag。可以看到你所使用的单机版 Milvus 版本为 2.0.0-RC7。

```
$ kubectl get pods my-release-milvus-standalone-75c599fffc-6rwlj -o=jsonpath='{$.spec.containers[0].image}'
```

```
milvusdb/milvus:v2.0.0-rc7-20211011-d567b21
```


### 步骤 4. 检查所有可用 app 版本

运行如下指令，检查所有可用 app 版本。

```
$ helm repo update
$ helm search repo milvus --versions
```

```
NAME                 CHART VERSION        APP VERSION               DESCRIPTION
milvus/milvus        2.3.3                2.0.0-rc.8                Milvus is an open-source vector database built ...
milvus/milvus        2.3.2                2.0.0-rc.8                Milvus is an open-source vector database built ...
milvus/milvus        2.3.1                2.0.0-rc.8                Milvus is an open-source vector database built ...
milvus/milvus        2.3.0                2.0.0-rc.8                Milvus is an open-source vector database built ...
milvus/milvus        2.2.6                2.0.0-rc.7                Milvus is an open-source vector database built ...
milvus/milvus        2.2.5                2.0.0-rc.7                Milvus is an open-source vector database built ...
milvus/milvus        2.2.4                2.0.0-rc.7                Milvus is an open-source vector database built ...
milvus/milvus        2.2.3                2.0.0-rc.7                Milvus is an open-source vector database built ...
milvus/milvus        2.2.2                2.0.0-rc.7                Milvus is an open-source vector database built ...
milvus/milvus        2.2.1                2.0.0-rc.6                Milvus is an open-source vector database built ...
milvus/milvus        2.2.0                2.0.0-rc.6                Milvus is an open-source vector database built ...
```

### 步骤 5. 升级单机版 Milvus

1. 运行如下指令，将单机版 Milvus 2.0.0-RC7 升级至 2.0.0-RC8。

```
$ helm repo update
$ helm upgrade my-release milvus/milvus --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsar.enabled=false 
```

2. 再次运行指令 `$ helm list`，查看当前 Milvus app 版本。可以看到当前单机版 Milvus 已升级至 2.0.0-RC8。

```
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART               APP VERSION
my-release        default          2               2021-11-08 17:15:46.530627 +0800 CST        deployed        milvus-2.3.3        2.0.0-rc.8
```

3. 运行指令 `$ kubectl get pods`，查看当前运行中的 pod。你可以看到如下结果：

```
NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          3m32s
my-release-milvus-standalone-6967454987-72r55   1/1     Running   0          22s
my-release-minio-744dd9586f-qngzv               1/1     Running   0          3m32s
```

<div class="alert note">
升级单机版 Milvus 时，原有的 pod 将被删除。因此，Milvus 服务可能会暂时中断。
</div>

4. 运行如下指令，查看当前 image tag 版本。可以看到，当前版本为 v2.0.0-rc8。

```
$ kubectl get pods my-release-milvus-standalone-6967454987-72r55 -o=jsonpath='{$.spec.containers[0].image}'
```

```
milvusdb/milvus:v2.0.0-rc8-20211104-d1f4106
```

## 升级分布式版 Milvus 

### 步骤 1. 查看 Milvus 版本

运行指令 `$ helm list`，查看 Milvus app 版本. 你可以看到返回结果中显示 Milvus `APP VERSION` 为 2.0.0-rc7。

```
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART               APP VERSION
my-release        default          1               2021-11-08 17:21:13.511069 +0800 CST        deployed        milvus-2.2.4        2.0.0-rc.7
```

### 步骤 2. 查看运行中的 pod

运行指令 `$ kubectl get pods`，查看运行中的 pod。 你可以看到如下结果：

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

### 步骤 3. 查看 image tag

查看 `my-release-milvus-proxy-6664d564f9-pwqn9` pod 的 image tag。可以看到你所使用的分布式版 Milvus 版本为 2.0.0-RC7。

```
$ kubectl get pods my-release-milvus-proxy-6664d564f9-pwqn9 -o=jsonpath='{$.spec.containers[0].image}'
```

```
milvusdb/milvus:v2.0.0-rc7-20211011-d567b21
```

### 步骤 4. 检查所有可用 app 版本

运行如下指令，检查所有可用 app 版本。

```
$ helm repo update
$ helm search repo milvus --versions
```

```
NAME                 CHART VERSION        APP VERSION               DESCRIPTION
milvus/milvus        2.3.3                2.0.0-rc.8                Milvus is an open-source vector database built ...
milvus/milvus        2.3.2                2.0.0-rc.8                Milvus is an open-source vector database built ...
milvus/milvus        2.3.1                2.0.0-rc.8                Milvus is an open-source vector database built ...
milvus/milvus        2.3.0                2.0.0-rc.8                Milvus is an open-source vector database built ...
milvus/milvus        2.2.6                2.0.0-rc.7                Milvus is an open-source vector database built ...
milvus/milvus        2.2.5                2.0.0-rc.7                Milvus is an open-source vector database built ...
milvus/milvus        2.2.4                2.0.0-rc.7                Milvus is an open-source vector database built ...
milvus/milvus        2.2.3                2.0.0-rc.7                Milvus is an open-source vector database built ...
milvus/milvus        2.2.2                2.0.0-rc.7                Milvus is an open-source vector database built ...
milvus/milvus        2.2.1                2.0.0-rc.6                Milvus is an open-source vector database built ...
milvus/milvus        2.2.0                2.0.0-rc.6                Milvus is an open-source vector database built ...
```

### 步骤 5. 升级分布式版 Milvus

1. 运行如下指令，将分布式版 Milvus 2.0.0-RC7 升级至 2.0.0-RC8。

```
$ helm repo update
$ helm upgrade my-release milvus/milvus
```

2. 再次运行指令 `$ helm list`，查看当前 Milvus app 版本。可以看到当前单机版 Milvus 已升级至 2.0.0-RC8。

```
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART               APP VERSION
my-release        default          2               2021-11-08 17:29:07.815765 +0800 CST        deployed        milvus-2.3.3        2.0.0-rc.8
```

3. 行指令 `$ kubectl get pods`，查看当前运行中的 pod。你可以看到如下结果：

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

4. 运行如下指令，查看当前 image tag 版本。可以看到，当前版本为 v2.0.0-rc8。

```
$ kubectl get pods my-release-milvus-proxy-5685bbc546-v6scq -o=jsonpath='{$.spec.containers[0].image}'
```

```
milvusdb/milvus:v2.0.0-rc8-20211104-d1f4106
```


## 更多内容
- 你可能还想了解：
  - [对 Milvus 集群进行扩缩容](scaleout.md)
- 如果你想要在云端部署分布式版 Milvus：
  - [使用 Terraform 及 Ansible 在 AWS 上部署 Milvus](aws.md)
  - [使用 Terraform 在 Amazon EKS 上部署 Milvus](eks.md)
  - [使用 Kubernetes 在 GCP 上部署 Milvus](gcp.md)
  - [使用 Kubernentes 在 Microsoft Azure 上部署 Milvus](azure.md)
