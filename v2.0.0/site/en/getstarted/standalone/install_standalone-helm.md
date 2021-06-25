---
id: install_standalone-helm.md
label: Install with Helm 
order: 1
group: standalone
---

# Install Milvus Standalone

You can install Milvus standalone with Docker Compose or Helm.

You can also [build Milvus from source code](https://github.com/milvus-io/milvus/blob/master/INSTALL.md).

<div class="tab-wrapper"><a href="install_standalone-docker.md" class=''>Install with Docker Compose</a><a href="install_standalone-helm.md" class='active '>Install with Helm</a></div>

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

#### Install Milvus standalone:
```
$ helm install my-release milvus/milvus
```

> For more details, see [Milvus Helm charts](https://artifacthub.io/packages/helm/milvus/milvus).

*If Milvus boots successfully, each Milvus’ pod shows `1/1` under `READY`:*
```
$ kubectl get pods
NAME                                               READY   STATUS      RESTARTS   AGE
my-release-etcd-0                                  1/1     Running     0          30s
my-release-milvus-standalone-54c4f88cb9-f84pf      1/1     Running     0          30s
my-release-minio-5564fbbddc-mz7f5                  1/1     Running     0          30s
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

> To restart the cluster:
```
minikube start
```

## 6. Delete the cluster
If you will not need to restart the cluster, run the following command to delete the minikube virtual machine as well as the persistent volume and all the created resources:
```
minikube delete
```

> To retain logs,  copy them from each pod's `stderr` before deleting the cluster and all its resources. To access a pod's standard error stream, run `kubectl logs <podname>`.