---
id: install_cluster-gpu-helm.md
label: Helm (GPU)
related_key: Kubernetes
order: 2
group: install_cluster-milvusoperator.md
summary: Learn how to install Milvus cluster on Kubernetes (GPU).
---

<div class="tab-wrapper"><a href="install_cluster-milvusoperator.md" class=''>Milvus Operator</a><a href="install_cluster-helm.md" class=''>Helm (CPU)</a><a href="install_cluster-gpu-helm.md" class='active '>Helm (GPU)</a></div>

# Install Milvus Cluster with Helm (GPU)

This topic introduces how to deploy a Milvus cluster with GPU support using Helm on Kubernetes.

## Prerequisites

- The compute capability of your GPU device is 6.1, 7.0, 7.5, or 8.0. To check whether your GPU device suffices the requirement, check [Your GPU Compute Capability](https://developer.nvidia.com/cuda-gpus) on the NVIDIA developer website.

- You have installed the NVIDIA driver for your GPU device on one of [the supported Linux distributions](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions) and then the NVIDIA Container Toolkit following [this guide](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html).

- You have installed a Kubernetes cluster, and the `kubectl` command-line tool has been configured to communicate with your cluster. It is recommended to run this tutorial on a cluster with at least two nodes that are not acting as control plane hosts.

- Check [the requirements](prerequisite-helm.md) for hardware and software prior to your installation.

## Start a Kubernetes cluster with GPU worker nodes

We recommend installing Milvus on a Kubernetes cluster with GPU worker nodes and using the default storage class provisioned.

### 1. Prepare GPU worker nodes

See [Prepare GPU worker nodes](https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#preparing-your-gpu-nodes) for more information.

### 2. Enable GPU support on Kubernetes

See [install nvidia-device-plugin with helm](https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#deployment-via-helm) for more information.

After setting up, run `kubectl describe node <gpu-worker-node>` to view the GPU resources. The command output should be similar to the following:

```bash
Capacity:
  ...
  nvidia.com/gpu:     4
  ...
Allocatable:
  ...
  nvidia.com/gpu:     4
  ...
```

Note: In this example, we have set up a GPU worker node with 4 GPU cards.

### 3. Check the default storage class

Milvus relies on the default storage class to automatically provision volumes for data persistence. Run the following command to check storage classes:

```bash
$ kubectl get sc
```

The command output should be similar to the following:

```bash
NAME                   PROVISIONER                                     RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
local-path (default)   rancher.io/local-path                           Delete          WaitForFirstConsumer   false                  461d
```

## Install Helm Chart for Milvus

Helm is a Kubernetes package manager that can help you deploy Milvus quickly.

1. Add Milvus to Helm's repository.

```bash
$ helm repo add milvus https://zilliztech.github.io/milvus-helm/
```

<div class="alert note">

The Milvus Helm Charts repo at `https://milvus-io.github.io/milvus-helm/` has been archived and you can get further updates from `https://zilliztech.github.io/milvus-helm/` as follows:

```bash
helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update
# upgrade existing helm release
helm upgrade my-release zilliztech/milvus
```

The archived repo is still available for the charts up to 4.0.31. For later releases, use the new repo instead.

</div>

2. Update your local chart repository.

```bash
$ helm repo update
```

## Start Milvus

Start Milvus with Helm by specifying the release name, the chart, and parameters you expect to change. This topic uses <code>my-release</code> as the release name. To use a different release name, replace <code>my-release</code> in the command.

Milvus allows you to assign one or more GPU devices to Milvus.

### Assign a single GPU device

Run the following commands to assign a single GPU device to Milvus:

```bash
cat <<EOF > custom-values.yaml
indexNode:
  resources:
    requests:
      nvidia.com/gpu: "1"
    limits:
      nvidia.com/gpu: "1"
queryNode:
  resources:
    requests:
      nvidia.com/gpu: "1"
    limits:
      nvidia.com/gpu: "1"
EOF
```

```bash
$ helm install my-release milvus/milvus -f custom-values.yaml
```

### Assign multiple GPU devices

Run the following commands to assign multiple GPU devices to Milvus:

```bash
cat <<EOF > custom-values.yaml
indexNode:
  resources:
    requests:
      nvidia.com/gpu: "2"
    limits:
      nvidia.com/gpu: "2"
  extraEnv:
  - name: CUDA_VISIBLE_DEVICES
    value: "0, 1"
queryNode:
  resources:
    requests:
      nvidia.com/gpu: "2"
    limits:
      nvidia.com/gpu: "2"
  extraEnv:
  - name: CUDA_VISIBLE_DEVICES
    value: "0, 1"
EOF
```
In the configuration above, a total of four GPU cards are assigned, with two cards designated for the index node and the other two for the query node.

```bash
$ helm install my-release milvus/milvus -f custom-values.yaml
```

<div class="alert note">
  <ul>
    <li>The release name should only contain letters, numbers and dashes. Dots are not allowed in the release name.</li>
    <li>The default command line installs cluster version of Milvus while installing Milvus with Helm. Further setting is needed while installing Milvus standalone.</li>
    <li>According to the <a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">deprecated API migration guide of Kuberenetes</a>, the <b>policy/v1beta1</b> API version of PodDisruptionBudget is not longer served as of v1.25. You are suggested to migrate manifests and API clients to use the <b>policy/v1</b> API version instead. <br>As a workaround for users who still use the <b>policy/v1beta1</b> API version of PodDisruptionBudget on Kuberenetes v1.25 and later, you can instead run the following command to install Milvus:<br>
    <code>helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
    <li>See <a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm Chart</a> and <a href="https://helm.sh/docs/">Helm</a> for more information.</li>
  </ul>
</div>

Check the status of the running pods.

```bash
$ kubectl get pods
```

After Milvus starts, the `READY` column displays `1/1` for all pods.

```text
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

Verify which local port the Milvus server is listening on. Replace the pod name with your own.

```bash
$ kubectl get pod my-release-milvus-proxy-6bd7f5587-ds2xv --template
='{{(index (index .spec.containers 0).ports 0).containerPort}}{{"\n"}}'
19530
```

Open a new terminal and run the following command to forward a local port to the port that Milvus uses. Optionally, omit the designated port and use `:19530` to let `kubectl` allocate a local port for you so that you don't have to manage port conflicts.

```bash
$ kubectl port-forward service/my-release-milvus 27017:19530
Forwarding from 127.0.0.1:27017 -> 19530
```

By default, ports forward by kubectl only listen on localhost. Use flag `address` if you want Milvus server to listen on selected IP or all addresses.

```bash
$ kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530
Forwarding from 0.0.0.0:27017 -> 19530
```

## Uninstall Milvus

Run the following command to uninstall Milvus.

```bash
$ helm uninstall my-release
```

## What's next

Having installed Milvus, you can:

- Check [Hello Milvus](example_code.md) to run an example code with different SDKs to see what Milvus can do.

- Learn the basic operations of Milvus:
  - [Connect to Milvus server](manage_connection.md)
  - [Manage Databases](manage_databases.md)
  - [Create a collection](create_collection.md)
  - [Create a partition](create_partition.md)
  - [Insert data](insert_data.md)
  - [Conduct a vector search](search.md)

- [Upgrade Milvus Using Helm Chart](upgrade_milvus_cluster-helm.md).
- [Scale your Milvus cluster](scaleout.md).
- Deploy your Milvu cluster on clouds:
  - [Amazon EC2](aws.md)
  - [Amazon EKS](eks.md)
- Explore [Milvus Backup](milvus_backup_overview.md), an open-source tool for Milvus data backups.
- Explore [Birdwatcher](birdwatcher_overview.md), an open-source tool for debugging Milvus and dynamic configuration updates.
- Explore [Attu](https://milvus.io/docs/attu.md), an open-source GUI tool for intuitive Milvus management.
- [Monitor Milvus with Prometheus](monitor.md).
