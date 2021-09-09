---
id: install_standalone-helm.md
label: Install on Kubernetes 
order: 1
group: standalone
summary: Installation instructions for the standalone version of Milvus.
---

# Install Milvus Standalone

You can install Milvus standalone with Docker Compose or on Kubernetes.

You can also [build Milvus from source code](https://github.com/milvus-io/milvus#to-start-developing-milvus).

<div class="alert note">
Installing Milvus with Docker Compose can only be used for testing and cannot be used in production.
</div>

<div class="tab-wrapper"><a href="install_standalone-docker.md" class=''>Install with Docker Compose</a><a href="install_standalone-helm.md" class='active '>Install on Kubernetes</a></div>


## 1. Start a local Kubernetes cluster:
```
$ minikube start
```

## 2. Start Milvus
<div class="alert note">
Helm package manager for Kubernetes can be used to simplify this process.
</div>

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

<div class="alert note">
For more details, see <a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm chart</a>.
</div>


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

<div class="alert note">
Run <code>minikube start</code> to restart the cluster.
</div>

## 6. Delete the cluster
If you will not need to restart the cluster, run the following command to delete the minikube virtual machine as well as the persistent volume and all the created resources:
```
minikube delete
```

<div class="alert note">
To retain logs,  copy them from each pod's <code>stderr</code> before deleting the cluster and all its resources. To access a pod's standard error stream, run <code>kubectl logs (podname)</code>.
</div>

<br/>

<div class="alert note">
If you want to upgrade your Milvus 2.0 version, please refer to <a href="upgrade.md">Upgrade Milvus 2.0</a>.
</div>
