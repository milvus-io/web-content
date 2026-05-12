---
id: install_standalone-helm-gpu.md
label: Standalone (Helm)
order: 0
group: install_standalone-helm-gpu.md
related_key: Docker
summary: Learn the necessary preparations before installing Milvus with Docker.
title: Install Milvus Standalone with GPU Support
deprecate: true
---

<div class="tab-wrapper"><a href="install_standalone-helm-gpu.md" class='active '>Standalone (Helm)</a></div>

# Install Milvus Standalone with GPU Support

Milvus now can use GPU devices to build indexes and perform ANN searches thanks to the contribution from NVIDIA. This guide will show you how to install Milvus with GPU support on your machine.

## Prerequisites

Before installing Milvus with GPU support, make sure you have the following prerequisites:

- The compute capability of your GPU device is 6.0、7.0、7.5、8.0、8.6、9.0. To check whether your GPU device suffices the requirement, check [Your GPU Compute Capability](https://developer.nvidia.com/cuda-gpus) on the NVIDIA developer website.

- You have installed the NVIDIA driver for your GPU device on one of [the supported Linux distributions](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions) and then the NVIDIA Container Toolkit following [this guide](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html).

  For Ubuntu 22.04 users, you can install the driver and the container toolkit with the following commands:

  ```shell
  $ sudo apt install --no-install-recommends nvidia-headless-545 nvidia-utils-545
  ```

  For other OS users, please refer to the [official installation guide](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#installing-on-ubuntu-and-debian).

  You can check whether the driver has been installed correctly by running the following command:

  ```shell
  $ modinfo nvidia | grep "^version"
  version:        545.29.06
  ```

  You are recommended to use the drivers of version 545 and above.

- You have installed a Kubernetes cluster, and the `kubectl` command-line tool has been configured to communicate with your cluster. It is recommended to run this tutorial on a cluster with at least two nodes that are not acting as control plane hosts.

## Create a K8s cluster using minikube

We recommend installing Milvus on K8s with [minikube](https://minikube.sigs.k8s.io/docs/), a tool that allows you to run K8s locally.

### 1. Install minikube

See [install minikube](https://minikube.sigs.k8s.io/docs/start/) for more information.

### 2. Start a K8s cluster using minikube

After installing minikube, run the following command to start a K8s cluster.

```
$ minikube start --gpus all
```

### 3. Check the K8s cluster status

Run `$ kubectl cluster-info` to check the status of the K8s cluster you just created. Ensure that you can access the K8s cluster via `kubectl`. If you have not installed `kubectl` locally, see [Use kubectl inside minikube](https://minikube.sigs.k8s.io/docs/handbook/kubectl/).

Minikube has a dependency on default StorageClass when installed. Check the dependency by running the following command. Other installation methods require manual configuration of the StorageClass. See [Change the Default StorageClass](https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/) for more information.

```
$ kubectl get sc
```

```
NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             false                    3m36s
```

## Start a Kubernetes cluster with GPU worker nodes

If you prefer to use GPU-enabled worker nodes, you can follow the steps below to create a K8s cluster with GPU worker nodes. We recommend installing Milvus on a Kubernetes cluster with GPU worker nodes and using the default storage class provisioned.

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

Helm is a K8s package manager that can help you deploy Milvus quickly.

1. Add Milvus to Helm's repository.

```bash
$ helm repo add milvus https://zilliztech.github.io/milvus-helm/
```

<div class="alert note">

The Milvus Helm Charts repo at `https://milvus-io.github.io/milvus-helm/` has been archived and you can get further updates from `https://zilliztech.github.io/milvus-helm/` as follows:

```shell
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

Once you have installed the Helm chart, you can start Milvus on Kubernetes. In this section, we will guide you through the steps to start Milvus with GPU support.

You should start Milvus with Helm by specifying the release name, the chart, and the parameters you expect to change. In this guide, we use <code>my-release</code> as the release name. To use a different release name, replace <code>my-release</code> in the following commands with the one you are using.

Milvus allows you to assign one or more GPU devices to Milvus. 

- Assign a single GPU device (recommended)

  Run the following commands to assign a single GPU device to Milvus:

  ```bash
  cat <<EOF > custom-values.yaml
  standalone:
    resources:
      requests:
        nvidia.com/gpu: "1"
      limits:
        nvidia.com/gpu: "1"
  EOF
  ```

  ```bash
  $ helm install my-release milvus/milvus --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsarv3.enabled=false -f custom-values.yaml
  ```

- Assign multiple GPU devices

  Run the following commands to assign multiple GPU devices to Milvus:

  Run the following commands to assign multiple GPU devices to Milvus:

  ```bash
  cat <<EOF > custom-values.yaml
  indexNode:
    resources:
      requests:
        nvidia.com/gpu: "2"
      limits:
        nvidia.com/gpu: "2"
  queryNode:
    resources:
      requests:
        nvidia.com/gpu: "2"
      limits:
        nvidia.com/gpu: "2"
  EOF
  ```

  In the configuration above, the indexNode and queryNode share two GPUs. To assign different GPUs to the indexNode and the queryNode, you can modify the configuration accordingly by setting `extraEnv` in the configuration file as follows:

  ```bash
  cat <<EOF > custom-values.yaml
  indexNode:
    resources:
      requests:
        nvidia.com/gpu: "1"
      limits:
        nvidia.com/gpu: "1"
    extraEnv:
      - name: CUDA_VISIBLE_DEVICES
        value: "0"
  queryNode:
    resources:
      requests:
        nvidia.com/gpu: "1"
      limits:
        nvidia.com/gpu: "1"
    extraEnv:
      - name: CUDA_VISIBLE_DEVICES
        value: "1"
  EOF
  ```

  ```bash
  $ helm install my-release milvus/milvus --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsarv3.enabled=false -f custom-values.yaml
  ```

  <div class="alert note">
  See <a href="https://artifacthub.io/packages/helm/milvus-helm/milvus">Milvus Helm Chart</a> and <a href="https://helm.sh/docs/">Helm</a> for more information.
  </div>

  Check the status of the running pods:

  ```bash
  $ kubectl get pods
  ```

After Milvus starts, the `READY` column displays `1/1` for all pods.

```text
NAME                                               READY   STATUS      RESTARTS   AGE
my-release-etcd-0                                  1/1     Running     0          30s
my-release-milvus-standalone-54c4f88cb9-f84pf      1/1     Running     0          30s
my-release-minio-5564fbbddc-mz7f5                  1/1     Running     0          30s
```

## Connect to Milvus

Verify which local port the Milvus server is listening on. Replace the pod name with your own.

```bash
$ kubectl get pod my-release-milvus-standalone-54c4f88cb9-f84pf --template='{{(index (index .spec.containers 0).ports 0).containerPort}}{{"\n"}}'
```

```
19530
```

Open a new terminal and run the following command to forward a local port to the port that Milvus uses. Optionally, omit the designated port and use `:19530` to let `kubectl` allocate a local port for you so that you don't have to manage port conflicts.

```bash
$ kubectl port-forward service/my-release-milvus 27017:19530
```

```
Forwarding from 127.0.0.1:27017 -> 19530
```

By default, ports forwarded by kubectl only listen on localhost. Use flag `address` if you want Milvus server to listen on selected IP or all addresses.

```bash
$ kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530
Forwarding from 0.0.0.0:27017 -> 19530
```

## Uninstall Milvus

Run the following command to uninstall Milvus.

```bash
$ helm uninstall my-release
```

## Stop the K8s cluster

Stop the cluster and the minikube VM without deleting the resources you created.

```bash
$ minikube stop
```

Run `minikube start` to restart the cluster.

## Delete the K8s cluster

<div class="alert note">
Run <code>$ kubectl logs `pod_name`</code> to get the <code>stderr</code> log of the pod before deleting the cluster and all resources.
</div>

Delete the cluster, the minikube VM, and all resources you created including persistent volumes.

```bash
$ minikube delete
```

## What's next

Having installed Milvus, you can:

- Check [Hello Milvus](quickstart.md) to run an example code with different SDKs to see what Milvus can do.

- Learn the basic operations of Milvus:
  - [Manage Databases](manage_databases.md)
  - [Manage Collections](manage-collections.md)
  - [Manage Partitions](manage-partitions.md)
  - [Insert, Upsert & Delete](insert-update-delete.md)
  - [Single-Vector Search](single-vector-search.md)
  - [Hybrid Search](multi-vector-search.md)

- [Upgrade Milvus Using Helm Chart](upgrade_milvus_standalone-helm.md).
- Explore [Milvus Backup](milvus_backup_overview.md), an open-source tool for Milvus data backups.
- Explore [Birdwatcher](birdwatcher_overview.md), an open-source tool for debugging Milvus and dynamic configuration updates.
- Explore [Attu](https://github.com/zilliztech/attu), an open-source GUI tool for intuitive Milvus management.
- [Monitor Milvus with Prometheus](monitor.md).


