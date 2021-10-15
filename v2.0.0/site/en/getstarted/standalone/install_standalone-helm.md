---
id: install_standalone-helm.md
label: Install on Kubernetes 
order: 1
group: standalone
summary: Installation instructions for the standalone version of Milvus.
---

# Install Milvus Standalone

This topic describes how to install Milvus standalone with Docker Compose or on Kubernetes. We recommend reading [Before you Begin](prerequisite-docker.md) prior to your installation. 

You can also build Milvus from source code at [GitHub](https://github.com/milvus-io/milvus#to-start-developing-milvus).



<div class="tab-wrapper"><a href="install_standalone-docker.md" class=''>Install with Docker Compose</a><a href="install_standalone-helm.md" class='active '>Install on Kubernetes</a></div>

We recommend using minikube to install Milvus on Kubernetes. Minikube has a dependency on default storageclass when installed (see screenshot below). Installation in other methods requires manual configuration of the storageclass. See [Change the Default Storageclass](https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/) for more information.

![Storageclass](../../../../assets/storageclass.png)

## 1. Start a K8s cluster
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

#### Install Milvus standalone:
```
$ helm install my-release milvus/milvus --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsar.enabled=false
```

<div class="alert note">

The default command line installs cluster version of Milvus while installing with Helm. Further setting is needed while installing Milvus standalone.
For more details, see <a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm chart</a>.

See <a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm Chart</a> for more information.

</div>


*After Milvus starts, the `READY` column displays `1/1` for all pods.*
```
$ kubectl get pods
NAME                                               READY   STATUS      RESTARTS   AGE
my-release-etcd-0                                  1/1     Running     0          30s
my-release-milvus-standalone-54c4f88cb9-f84pf      1/1     Running     0          30s
my-release-minio-5564fbbddc-mz7f5                  1/1     Running     0          30s
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

## 5. Stop the K8s cluster

Run the following command to stop the cluster and the minikube VM without deleting created resources.
```
$ minikube stop
```

<div class="alert note">
Run <code>minikube start</code> to restart the cluster.
</div>

## 6. Delete the K8s cluster

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

