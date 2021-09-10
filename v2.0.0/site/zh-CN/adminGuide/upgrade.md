---
id: upgrade.md
---

# Upgrade Milvus Using Helm Chart

You can easily upgrade Milvus 2.0 with Helm Chart. This guide uses the example of upgrading from Milvus v2.0.0-rc4 to v2.0.0-rc5-hotfix1.

<div class="alert note">
Helm Chart does not support upgrading from Milvus 2.0 standalone to Milvus 2.0 cluster or vice versa.
</div>

## Upgrade Milvus standalone

1. Run the following command to check your Milvus version:
```
helm list
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART               APP VERSION
my-release        default          1               2021-09-06 14:46:33.920893 +0800 CST        deployed        milvus-2.1.5        2.0.0-rc.4
```

You can see the `APP VERSION` is **2.0.0-rc4**. 

2. Check the running pods:

```
kubectl get pods
NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          110s
my-release-milvus-standalone-66f985d5cd-q5qhj   1/1     Running   0          110s
my-release-minio-5564fbbddc-dw77v               1/1     Running   0          110s
```

3. Check the image tag for the pod `my-release-milvus-standalone-66f985d5cd-q5qhj`:

```
kubectl get pods my-release-milvus-standalone-66f985d5cd-q5qhj -o=jsonpath='{$.spec.containers[0].image}'
milvusdb/milvus:v2.0.0-rc4-20210811-bdb8396
```

You can see the Milvus standalone version is **v2.0.0-rc4**.

4. Run the following commmand to check new Milvus versions:

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

You can see there are several new versions after **v2.0.0-rc4**. 

5. Upgrade to **v2.0.0-rc5-hotfix1**:

```
helm repo update
helm upgrade my-release milvus/milvus
helm list
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART                APP VERSION
my-release        default          2               2021-09-06 15:01:24.570561 +0800 CST        deployed        milvus-2.1.14        2.0.0-rc.5-hotfix1
```

You can see the new pods:

```
kubectl get pods
NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          46m
my-release-milvus-standalone-546649bcdf-xqjd5   1/1     Running   0          31m
my-release-minio-744dd9586f-drjnr               1/1     Running   0          31m
```

<div class="alert note">
To upgrade Milvus standalone, old pods first will be deleted first. Therefore, the service may be offline for a short period of time.
</div>

6. Check the image version and you can see it is **v2.0.0-rc5-hotfix1**.

```
kubectl get pods my-release-milvus-standalone-546649bcdf-xqjd5 -o=jsonpath='{$.spec.containers[0].image}'
milvusdb/milvus:v2.0.0-rc5-hotfix1-20210901-9e0b2cc
```


## Upgrade Milvus cluster

1. Run the following command to check your Milvus version:

```
helm list
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART               APP VERSION
my-release        default              1               2021-09-06 15:54:26.352545 +0800 CST        deployed        milvus-2.1.5        2.0.0-rc.4
```

You can see the `APP VERSION` is **2.0.0-rc4**. 


2. Check the running pods:

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

3. Check the image tag for the pod `my-release-milvus-proxy-84dcb766c9-l8srs`:

```
kubectl get pods my-release-milvus-proxy-84dcb766c9-l8srs -o=jsonpath='{$.spec.containers[0].image}'
milvusdb/milvus:v2.0.0-rc4-20210811-bdb8396
```

You can see the version of Milvus cluster is **v2.0.0-rc4**.

4. Run the following command to check new Milvus versions:

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

You can see there are several new versions after **2.0.0-rc4**. 

5. Upgrade to **v2.0.0-rc5-hotfix1**:

```
helm repo update
helm upgrade my-release milvus/milvus --set cluster.enabled=true
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART                APP VERSION
my-release        default          2               2021-09-06 16:18:40.021412 +0800 CST        deployed        milvus-2.1.14        2.0.0-rc.5-hotfix1
```

You can see the new pods:

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

6. Check the image version and you can see it is **v2.0.0-rc5**.

```
kubectl get pods my-release-milvus-proxy-99fb7bc58-r4xpf -o=jsonpath='{$.spec.containers[0].image}'
milvusdb/milvus:v2.0.0-rc5-hotfix1-20210901-9e0b2cc
```
