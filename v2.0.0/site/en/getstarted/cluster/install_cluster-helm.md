---
id: install_cluster-helm.md
label: Helm 
related_key: Kubernetes
order: 1
group: cluster
summary: Learn how to install Milvus cluster on Kubernetes.
---

# Install Milvus Cluster

This topic describes how to install Milvus cluster with Docker Compose or on Kubernetes. 

[Check the requirements for hardware and software](prerequisite-docker.md) prior to your installation. 

If you run into image loading errors while installing, you can [Install Milvus Offline](install_offline-docker.md).

You can also build Milvus from source code at [GitHub](https://github.com/milvus-io/milvus#to-start-developing-milvus).


<div class="tab-wrapper"><a href="install_cluster-docker.md" class=''>Docker Compose</a><a href="install_cluster-helm.md" class='active '>Helm</a><a href="install_cluster-milvusoperator.md" class=''>Milvus Operator</a></div>

We recommend installing Milvus on Kubernetes with minikube. minikube has a dependency on default storageclass when installed. Check the dependency by running the following command. Other installation methods requires manual configuration of the storageclass. See [Change the Default Storageclass](https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/) for more information.

```
$ kubectl get sc
```

```
NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             false                    3m36s
```

## Start a K8s cluster

<div class="alert note">
This topic uses a local Kubernetes cluster based on minikube. You can deploy a Milvus cluster on your own Kubernetes cluster.
</div>

```
$ minikube start
```

## Install Helm Chart for Milvus

Helm is a Kubernetes package manager that can help you deploy Milvus quickly.

1. Add Milvus Helm repository.

```
$ helm repo add milvus https://milvus-io.github.io/milvus-helm/
```

2. Update charts locally.

```
$ helm repo update
```

## Configure and start Milvus

Start Milvus with Helm by specifying the release name, the chart, and parameters you expect to change. This topic uses <code>my-release</code> as the release name. To use a different release name, replace <code>my-release</code> in the command.

By running `helm show values milvus/milvus`, you can check the parameters that can be modified directly with Chart. You can configure these parameters by adding `--values` or `--set` in the command for installation. For more information, see [Milvus Cluster System Configurations](configuration_cluster-basic.md).

```
$ helm install my-release milvus/milvus
```

<div class="alert note">
	<ul>
    <li>The default command line installs cluster version of Milvus while installing Milvus with Helm. Further setting is needed while installing Milvus standalone.</li>
    <li>See <a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm Chart</a> and <a href="https://helm.sh/docs/">Helm</a> for more information.</li>
  </ul>
</div>

Check the status of the running pods.

```
$ kubectl get pods
```

After Milvus starts, the `READY` column displays `1/1` for all pods.

```
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

## Connect to Milvus

Open a new terminal and run the following command to forward the local port to the port that Milvus uses.

```
$ kubectl port-forward service/my-release-milvus 19530
```

```
Forwarding from 127.0.0.1:19530 -> 19530
```

## Uninstall Milvus

Run the following command to uninstall Milvus.

```
$ helm uninstall my-release
```

## Stop the K8s cluster

Stop the cluster and the minikube VM without deleting the resources you created.

```
$ minikube stop
```

Run `minikube start` to restart the cluster.


## Delete the K8s cluster

Delete the cluster, the minikube VM, and all resources you created including persistent volumes.

```
$ minikube delete
```

<div class="alert note">
Run <code>$ kubectl logs `pod_name`</code> to get the <code>stderr</code> log of the pod before deleting the cluster and all resources.
</div>

## What's next

Having installed Milvus, you can:

- Check [Hello Milvus](example_code.md) to run an example code with different SDKs to see what Milvus can do.

- Learn the basic operations of Milvus:
  - [Connect to Milvus server](connect.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)

- [Upgrade Milvus Using Helm Chart](upgrade.md).
- [Scale your Milvus cluster](scaleout.md).
- Deploy your Milvu cluster on clouds:
  - [Amazon EC2](aws.md)
  - [Amazon EKS](eks.md)
- Explore [MilvusDM](migrate_overview.md), an open-source tool designed for importing and exporting data in Milvus.
- [Monitor Milvus with Prometheus](monitor.md).
