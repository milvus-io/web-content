---
id: install_cluster-helm.md
label: Install on Kubernetes
order: 1
group: cluster
summary: Installation instructions for the cluster version of Milvus.
---

# Install Milvus Cluster

You can install Milvus cluster with Docker Compose or on Kubernetes.

You can also build Milvus from source code at [Github](https://github.com/milvus-io/milvus#to-start-developing-milvus).

<div class="alert note">
Installing Milvus with Docker Compose is for testing purposes only.
</div>

<div class="tab-wrapper"><a href="install_cluster-docker.md" class=''>Install with Docker Compose</a><a href="install_cluster-helm.md" class='active '>Install on Kubernetes</a></div>


## 1. Start a cluster
```
$ minikube start
```

## 2. Start Milvus
<div class="alert note">
Helm, the package manager for K8s, helps you to quickly start Milvus.
</div>

#### Add a chart repository:
```
$ helm repo add milvus https://milvus-io.github.io/milvus-helm/
```

#### Update charts locally: 
```
$ helm repo update
```

#### Install the chart:
Choose a release name for the chart instance.

<div class="alert note">
This tutorial uses <code> my-release</code> as the release name. To use a different release name, replace <code> my-release</code> in the following command.
</div>

#### Install Milvus cluster:
```
$ helm install my-release milvus/milvus --set cluster.enabled=true
```
<div class="alert note"> 
See <a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm Chart</a> for more information.
</div>

*After Milvus starts, the `READY` column displays `1/1` for all pods.*
```
$ kubectl get pods
NAME                                              READY   STATUS    RESTARTS   AGE
my-release-etcd-0                                 1/1     Running   0          33s
my-release-milvus-datacoord-574b99bbb7-t898f      1/1     Running   0          33s
my-release-milvus-datanode-54568fc948-9rwbk       1/1     Running   0          33s
my-release-milvus-indexcoord-576b44d56-wh6vk      1/1     Running   0          33s
my-release-milvus-indexnode-67ff57745f-7lml8      1/1     Running   0          33s
my-release-milvus-proxy-55f98ffbbb-r68qt          1/1     Running   0          33s
my-release-milvus-pulsar-6475b86778-68r4l         1/1     Running   0          33s
my-release-milvus-querycoord-74d8895985-m5sdr     1/1     Running   0          33s
my-release-milvus-querynode-68486d847c-q5fg7      1/1     Running   0          33s
my-release-milvus-rootcoord-746d8b5b99-2strx      1/1     Running   0          33s
my-release-minio-68bbbf8459-2qxwv                 1/1     Running   0          33s
```

## 3. Connect to Milvus
Open a new terminal and run the following command to forward the local port to the port that Milvus uses.
```
$ kubectl port-forward service/my-release-milvus 19530
Forwarding from 127.0.0.1:19530 -> 19530
```

## 4. Uninstall Milvus
```
$ helm uninstall my-release
```

## 5. Stop the cluster
Run the following command to stop the cluster and the minikube VM without deleting created resources.
```
$ minikube stop
```
<div class="alert note">
Run <code>minikube start</code> to restart the cluster:
</div>

## 6. Delete the cluster
Run the following command to delete the cluster, the minikube VM, and all created resources including persistent volumes.
```
minikube delete
```

<div class="alert note">
<ul>
<li>
Save required logs from the <code>stderr</code> before deleting the cluster and all resources. Run <code>kubectl logs (podname)</code> to get the <code>stderr</code> of the pods.</li>
<li>See <a href="upgrade.md">Upgrade Milvus Using Helm Chart</a> for more information about upgrading Milvus.</li></ul>
</div>
