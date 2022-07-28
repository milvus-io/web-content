---
id: upgrade.md
related_key: upgrade Milvus
summary: Learn how to upgrade Milvus.
---

# Upgrade Milvus Using Helm Chart

This topic describes how to upgrade Milvus 2.0 with Helm Chart using the example of upgrading from Milvus 2.0.0-RC7 to 2.0.0-RC8.

<div class="alert note">
Helm Chart does not support upgrading from Milvus 2.0 standalone to Milvus 2.0 cluster or vice versa. Milvus 2.0.0-RC7 is not compatible with earlier RC versions. Therefore, you cannot upgrade from prior versions to 2.0.0-RC7.
</div>

## Upgrade Milvus standalone

### Step 1. Check the Milvus version

Run `$ helm list` to check your Milvus app version. You can see the `APP VERSION` is 2.0.0-rc7. 

```
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART               APP VERSION
my-release        default          1               2021-11-08 17:12:44.678247 +0800 CST        deployed        milvus-2.2.4        2.0.0-rc.7
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

Check the image tag for the pod `my-release-milvus-standalone-75c599fffc-6rwlj`. You can see the release of your Milvus standalone is 2.0.0-RC7.

```
$ kubectl get pods my-release-milvus-standalone-75c599fffc-6rwlj -o=jsonpath='{$.spec.containers[0].image}'
```

```
milvusdb/milvus:v2.0.0-rc7-20211011-d567b21
```


### Step 4. Check available app versions

Run the following commands to see all available app versions.

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

### Step 5. Upgrade

1. Run the following commands to upgrade your Milvus standalone from 2.0.0-RC7 to 2.0.0-RC8.

```
$ helm repo update
$ helm upgrade my-release milvus/milvus --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsar.enabled=false 
```

2. Run `$ helm list` again to check your Milvus app version. You can see your Milvus standalone has been upgraded to 2.0.0-RC8.

```
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART               APP VERSION
my-release        default          2               2021-11-08 17:15:46.530627 +0800 CST        deployed        milvus-2.3.3        2.0.0-rc.8
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
milvusdb/milvus:v2.0.0-rc8-20211104-d1f4106
```

## Upgrade Milvus cluster

### Step 1. Check the Milvus version

Run `$ helm list` to check your Milvus app version. You can see the `APP VERSION` is 2.0.0-rc7. 

```
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART               APP VERSION
my-release        default          1               2021-11-08 17:21:13.511069 +0800 CST        deployed        milvus-2.2.4        2.0.0-rc.7
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

Check the image tag for the pod `my-release-milvus-proxy-6664d564f9-pwqn9`. You can see the release of your Milvus cluster is 2.0.0-RC7.

```
$ kubectl get pods my-release-milvus-proxy-6664d564f9-pwqn9 -o=jsonpath='{$.spec.containers[0].image}'
```

```
milvusdb/milvus:v2.0.0-rc7-20211011-d567b21
```

### Step 4. Check available app versions

Run the following commands to see all available app versions. 

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

### Step 5. Upgrade

1. Run the following commands to upgrade your Milvus cluster from 2.0.0-RC7 to 2.0.0-RC8.

```
$ helm repo update
$ helm upgrade my-release milvus/milvus
```

2. Run `$ helm list` again to check your Milvus version. You can see your Milvus cluster has been upgraded to 2.0.0-RC8.

```
NAME              NAMESPACE        REVISION        UPDATED                                     STATUS          CHART               APP VERSION
my-release        default          2               2021-11-08 17:29:07.815765 +0800 CST        deployed        milvus-2.3.3        2.0.0-rc.8
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

4. Run the following command to check the new image version. You can see it is v2.0.0-rc8 now.

```
$ kubectl get pods my-release-milvus-proxy-5685bbc546-v6scq -o=jsonpath='{$.spec.containers[0].image}'
```

```
milvusdb/milvus:v2.0.0-rc8-20211104-d1f4106
```


## What's next
- You might also want to learn how to:
  - [Scale a Milvus cluster](scaleout.md)
- If you are ready to deploy your cluster on clouds:
  - Learn how to [Deploy Milvus on AWS with Terraform and Ansible](aws.md)
  - Learn how to [Deploy Milvus on Amazon EKS with Terraform](eks.md)
  - Learn how to [Deploy Milvus Cluster on GCP with Kubernetes](gcp.md)
  - Learn how to [Deploy Milvus on Microsoft Azure With Kubernetes](azure.md)
