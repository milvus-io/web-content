---
id: install_cluster-helm.md
label: Install on Kubernetes
order: 1
group: cluster
summary: Installation instructions for the cluster version of Milvus.
---

# Install Milvus Cluster

This topic describes how to install Milvus cluster with Docker Compose or on Kubernetes. We recommend reading [Before you Begin](prerequisite-docker.md) prior to your installation. 

You can also build Milvus from source code at [GitHub](https://github.com/milvus-io/milvus#to-start-developing-milvus).


<div class="tab-wrapper"><a href="install_cluster-docker.md" class=''>Install with Docker Compose</a><a href="install_cluster-helm.md" class='active '>Install on Kubernetes</a></div>

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

#### Install Milvus cluster:
```
$ helm install my-release milvus/milvus
```

<div class="alert note">
The default command line installs cluster version of Milvus while installing with Helm. No further setting is needed.
For more details, see <a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm charts</a>.

See <a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm Chart</a> for more information.

</div>

*After Milvus starts, the `READY` column displays `1/1` for all pods.*
```
$ kubectl get pods
NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                1/1    Running   0        3m23s
my-release-etcd-1                                1/1    Running   0        3m23s
my-release-etcd-2                                1/1    Running   0        3m23s
my-release-milvus-datacoord-6fd4bd885c-gkzwx     1/1    Running   0        3m23s
my-release-milvus-datanode-68cb87dcbd-4khpm      1/1    Running   0        3m23s
my-release-milvus-indexcoord-5bfcf6bdd8-nmh5l    1/1    Running   0        3m23s
my-release-milvus-indexnode-5c5f7b5bd9-l8hjg     1/1    Running   0        3m24s
my-release-milvus-proxy-6bd7f5587-ds2xv          1/1    Running   0        3m24s
my-release-milvus-querycoord-579cd79455-xht5n    1/1    Running   0        3m24s
my-release-milvus-querynode-5cd8fff495-k6gtg     1/1    Running   0        3m24s
my-release-milvus-rootcoord-7fb9488465-dmbbj     1/1    Running   0        3m23s
my-release-minio-0                               1/1    Running   0        3m23s
my-release-minio-1                               1/1    Running   0        3m23s
my-release-minio-2                               1/1    Running   0        3m23s
my-release-minio-3                               1/1    Running   0        3m23s
my-release-pulsar-autorecovery-86f5dbdf77-lchpc  1/1    Running   0        3m24s
my-release-pulsar-bookkeeper-0                   1/1    Running   0        3m23s
my-release-pulsar-bookkeeper-1                   1/1    Running   0        98s
my-release-pulsar-broker-556ff89d4c-2m29m        1/1    Running   0        3m23s
my-release-pulsar-proxy-6fbd75db75-nhg4v         1/1    Running   0        3m23s
my-release-pulsar-zookeeper-0                    1/1    Running   0        3m23s
my-release-pulsar-zookeeper-metadata-98zbr       0/1   Completed  0        3m24s
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
Run <code>minikube start</code> to restart the cluster:
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
