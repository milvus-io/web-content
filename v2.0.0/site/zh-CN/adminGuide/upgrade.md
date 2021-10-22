---
id: upgrade.md
---

# 使用 Helm Chart 升级 Milvus 版本

你可以使用 Helm Chart 轻松升级 Milvus 2.0 版本。本文以升级 Milvus v2.0.0-rc4 至 v2.0.0-rc5-hotfix1 为例。

<div class="alert note">
我们不支持使用 Helm Chart 进行单机版 Milvus 与分布式版 Milvus 之间的升级转换。
Milvus 2.0.0-rc7 之前的版本都不支持升级至 2.0.0-rc7 版本。
</div>

## 升级单机版 Milvus

1. 执行如下命令查看 Milvus 版本：

```
helm list
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART               APP VERSION
my-release        default          1               2021-09-06 14:46:33.920893 +0800 CST        deployed        milvus-2.1.5        2.0.0-rc.4
```

可以看到版本 `APP VERSION` 是 **2.0.0-rc4**。

2. 查看运行中的 pods：

```
kubectl get pods
NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          110s
my-release-milvus-standalone-66f985d5cd-q5qhj   1/1     Running   0          110s
my-release-minio-5564fbbddc-dw77v               1/1     Running   0          110s
```

3. 查看 pod `my-release-milvus-standalone-66f985d5cd-q5qhj` 的 image tag：

```
kubectl get pods my-release-milvus-standalone-66f985d5cd-q5qhj -o=jsonpath='{$.spec.containers[0].image}'
milvusdb/milvus:v2.0.0-rc4-20210811-bdb8396
```

可以看到单机版 Milvus 的版本是 **v2.0.0-rc4**.

4. 执行如下命令查看 Milvus 提供的新版本：

```
helm search repo milvus --versions
NAME                 CHART VERSION        APP VERSION               DESCRIPTION
milvus/milvus        2.1.14               2.0.0-rc.5-hotfix1        Milvus is an open-source vector database built ...
milvus/milvus        2.1.13               2.0.0-rc.5-hotfix1        Milvus is an open-source vector database built ...
milvus/milvus        2.1.12               2.0.0-rc.5-hotfix1        Milvus is an open-source vector database built ...
milvus/milvus        2.1.11               2.0.0-rc.5-hotfix1        Milvus is an open-source vector database built ...
milvus/milvus        2.1.10               2.0.0-rc.5-hotfix1        Milvus is an open-source vector database built ...
milvus/milvus        2.1.9                2.0.0-rc.5                Milvus is an open-source vector database built ...
milvus/milvus        2.1.8                2.0.0-rc.5                Milvus is an open-source vector database built ...
milvus/milvus        2.1.7                2.0.0-rc.5                Milvus is an open-source vector database built ...
milvus/milvus        2.1.6                2.0.0-rc.5                Milvus is an open-source vector database built ...
milvus/milvus        2.1.5                2.0.0-rc.4                Milvus is an open-source vector database built ...
milvus/milvus        2.1.4                2.0.0-rc.4                Milvus is an open-source vector database built ...
milvus/milvus        2.1.3                2.0.0-rc.3                Milvus is an open-source vector database built ...
milvus/milvus        2.1.2                2.0.0-rc.2                Milvus is an open-source vector database built ...
```

可以看到在版本 **v2.0.0-rc4** 后有多个新版本。

5. 升级至 **v2.0.0-rc5-hotfix1** 版本:

```
helm repo update
helm upgrade my-release milvus/milvus
helm list
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART                APP VERSION
my-release        default          2               2021-09-06 15:01:24.570561 +0800 CST        deployed        milvus-2.1.14        2.0.0-rc.5-hotfix1
```

可以看到新的 pods：

```
kubectl get pods
NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          46m
my-release-milvus-standalone-546649bcdf-xqjd5   1/1     Running   0          31m
my-release-minio-744dd9586f-drjnr               1/1     Running   0          31m
```

<div class="alert note">
升级单机版 Milvus 时，旧的 pods 会先被删除。因此服务可能会有一小段时间无法使用。
</div>

6. 查看 image 版本，可以看到它是 **v2.0.0-rc5-hotfix1**。

```
kubectl get pods my-release-milvus-standalone-546649bcdf-xqjd5 -o=jsonpath='{$.spec.containers[0].image}'
milvusdb/milvus:v2.0.0-rc5-hotfix1-20210901-9e0b2cc
```

## 升级分布式版 Milvus

1. 执行如下命令查看 Milvus 版本：

```
helm list
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART               APP VERSION
my-release        default              1               2021-09-06 15:54:26.352545 +0800 CST        deployed        milvus-2.1.5        2.0.0-rc.4
```

可以看到版本 `APP VERSION` 是 **2.0.0-rc4**.

2. 查看运行中的 pods：

```
kubectl get pods
NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          45s
my-release-milvus-datacoord-7bb8dff5d4-927mg    1/1     Running   0          45s
my-release-milvus-datanode-6686c99547-29mgt     1/1     Running   0          45s
my-release-milvus-indexcoord-6cdc5f6475-2lrhk   1/1     Running   0          45s
my-release-milvus-indexnode-76f58c956d-6kzl4    1/1     Running   0          45s
my-release-milvus-proxy-84dcb766c9-l8srs        1/1     Running   0          45s
my-release-milvus-pulsar-6b9754c64d-qvsdk       1/1     Running   0          45s
my-release-milvus-querycoord-568595ccbd-pbhbr   1/1     Running   0          45s
my-release-milvus-querynode-5f75d8dbcd-5ns8j    1/1     Running   0          45s
my-release-milvus-rootcoord-746bf864b8-8twzl    1/1     Running   0          45s
my-release-minio-5564fbbddc-l92wt               1/1     Running   0          45s
```

3. 查看 pod `my-release-milvus-proxy-84dcb766c9-l8srs` 的 image tag：

```
kubectl get pods my-release-milvus-proxy-84dcb766c9-l8srs -o=jsonpath='{$.spec.containers[0].image}'
milvusdb/milvus:v2.0.0-rc4-20210811-bdb8396
```

可以看到分布式版 Milvus 的版本是 **v2.0.0-rc4**.

4. 执行如下命令查看 Milvus 提供的新版本：

```
helm search repo milvus --versions
NAME                 CHART VERSION        APP VERSION               DESCRIPTION
milvus/milvus        2.1.14               2.0.0-rc.5-hotfix1        Milvus is an open-source vector database built ...
milvus/milvus        2.1.13               2.0.0-rc.5-hotfix1        Milvus is an open-source vector database built ...
milvus/milvus        2.1.12               2.0.0-rc.5-hotfix1        Milvus is an open-source vector database built ...
milvus/milvus        2.1.11               2.0.0-rc.5-hotfix1        Milvus is an open-source vector database built ...
milvus/milvus        2.1.10               2.0.0-rc.5-hotfix1        Milvus is an open-source vector database built ...
milvus/milvus        2.1.9                2.0.0-rc.5                Milvus is an open-source vector database built ...
milvus/milvus        2.1.8                2.0.0-rc.5                Milvus is an open-source vector database built ...
milvus/milvus        2.1.7                2.0.0-rc.5                Milvus is an open-source vector database built ...
milvus/milvus        2.1.6                2.0.0-rc.5                Milvus is an open-source vector database built ...
milvus/milvus        2.1.5                2.0.0-rc.4                Milvus is an open-source vector database built ...
milvus/milvus        2.1.4                2.0.0-rc.4                Milvus is an open-source vector database built ...
milvus/milvus        2.1.3                2.0.0-rc.3                Milvus is an open-source vector database built ...
milvus/milvus        2.1.2                2.0.0-rc.2                Milvus is an open-source vector database built ...
```

可以看到在版本 **2.0.0-rc4** 后有多个新版本。

5. 升级至 **v2.0.0-rc5-hotfix1** 版本：

```
helm repo update
helm upgrade my-release milvus/milvus --set cluster.enabled=true
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART                APP VERSION
my-release        default          2               2021-09-06 16:18:40.021412 +0800 CST        deployed        milvus-2.1.14        2.0.0-rc.5-hotfix1
```

可以看到新的 pods：

```
kubectl get pods
my-release-etcd-0                               1/1     Running   0          30m
my-release-milvus-datacoord-84cf6cccf5-7r68v    1/1     Running   0          79s
my-release-milvus-datanode-5bcc4978c6-5pjvg     1/1     Running   0          79s
my-release-milvus-indexcoord-5b999ddcd8-mktjz   1/1     Running   0          79s
my-release-milvus-indexnode-689f94657f-gbj8m    1/1     Running   0          79s
my-release-milvus-proxy-99fb7bc58-r4xpf         1/1     Running   0          79s
my-release-milvus-pulsar-769745f67b-t6tcz       1/1     Running   0          78s
my-release-milvus-querycoord-764b6599b7-shlxp   1/1     Running   0          78s
my-release-milvus-querynode-c7f875b57-96qp8     1/1     Running   0          78s
my-release-milvus-rootcoord-79cd9cf4c5-tnxdk    1/1     Running   0          78s
my-release-minio-744dd9586f-gdxwj               1/1     Running   0          6m13s
```

6. 查看 image 版本，可以看到它是 **v2.0.0-rc5**.

```
kubectl get pods my-release-milvus-proxy-99fb7bc58-r4xpf -o=jsonpath='{$.spec.containers[0].image}'
milvusdb/milvus:v2.0.0-rc5-hotfix1-20210901-9e0b2cc
```
