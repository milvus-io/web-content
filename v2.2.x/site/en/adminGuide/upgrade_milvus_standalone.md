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

### Step 5. Upgrade

1. Run the following commands to upgrade your Milvus standalone from  v2.0.2 to v2.1.0.

```
$ helm repo update
$ helm upgrade my-release milvus/milvus --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsar.enabled=false 
```

2. Run `$ helm list` again to check your Milvus app version. You can see your Milvus standalone has been upgraded to v2.1.0.

```
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART               APP VERSION
my-release        default          2               2022-07-28 15:40:18.22437 +0800 CST        deployed        milvus-3.1.2        2.1.0
```

3. Run `$ kubectl get pods` to check the new pods. You can see the following output.

```
NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          3m32s
my-release-milvus-standalone-6967454987-72r55   1/1     Running   0          22s
my-release-minio-744dd9586f-qngzv               1/1     Running   0          3m32s
```

<div class="alert note">
When upgrading your Milvus standalone, old pods will be deleted. Therefore, the service may be offline for a short period of time.
</div>

4. Run the following command to check the new image version. You can see it is v2.0.0-rc8 now.

```
$ kubectl get pods my-release-milvus-standalone-6967454987-72r55 -o=jsonpath='{$.spec.containers[0].image}'
```

```
milvusdb/milvus:v2.1.0
```