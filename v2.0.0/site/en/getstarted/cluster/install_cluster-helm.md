---
id: install_cluster-helm.md
label: Install with Helm
order: 1
group: cluster
---

# Install Milvus Cluster

You can install Milvus cluster with Docker Compose or Helm.

You can also [build Milvus from source code](https://github.com/milvus-io/milvus/blob/master/INSTALL.md).

<div class="alert note">
Installing Milvus with Docker Compose can only be used for testing and cannot be used in production.
</div>

<div class="tab-wrapper"><a href="install_cluster-docker.md" class=''>Install with Docker Compose</a><a href="configuration_cluster_basic.md" class=''>Basic Configurations</a><a href="install_cluster-helm.md" class='active '>Install with Helm</a><a href="configuration_cluster_advanced.md" class=''>Advanced Configurations</a></div>

## Prerequisites
- Kubernetes version 1.14.0 or higher is required.
- [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/) is required.
> Installing minikube will also install hypervisor and kubectl. Kubectl is a command-line tool for managing Kubernetes from your local workstation.
- Helm version 3.0.0 or higher is required. See [Helm docs](https://helm.sh/docs/).

## 1. Start a local Kubernetes cluster:
```
$ minikube start
```

## 2. Start Milvus
Helm package manager for Kubernetes can be used to simplify this process.

#### Add the Milvus chart repository:
```
$ helm repo add milvus https://milvus-io.github.io/milvus-helm/
```

#### Update your Milvus chart to the latest version: 
```
$ helm repo update
```

#### Install Milvus Helm chart:
Provide a release name for identifying your Milvus deployment.

<div class="alert note">
This tutorial uses <code> my-release</code> as the release name. To use a different release name, adjust the release name in subsequent commands.
</div>

#### Install Milvus cluster:
```
$ helm install my-release milvus/milvus --set cluster.enabled=true
```
<div class="alert note"> 
For more details, see [Milvus Helm charts](https://artifacthub.io/packages/helm/milvus/milvus).
</div>

*If Milvus boots successfully, each Milvus’ pod shows `1/1` under `READY`:*
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
In a new terminal, port-forward your Milvus service to your local machine:
```
$ kubectl port-forward service/my-release-milvus 19530
Forwarding from 127.0.0.1:19530 -> 19530
```

## 4. Uninstall Milvus
```
$ helm uninstall my-release
```

## 5. Stop the cluster
To shut down the minikube virtual machine but preserve all the resources you’ve created, run the following command to stop the cluster:
```
$ minikube stop
```
<div class="alert note">
Run <code>minikube start</code>to restart the cluster:
</div>

## 6. Delete the cluster
If you will not need to restart the cluster, run the following command to delete the minikube virtual machine as well as the persistent volume and all the created resources:
```
minikube delete
```

<div class="alert note">
To retain logs,  copy them from each pod's <code>stderr</code> before deleting the cluster and all its resources. To access a pod's standard error stream, run <code>kubectl logs (podname)</code>.
