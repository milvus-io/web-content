---
id: install_cluster-helm-gpu.md
label: Cluster (Helm)
related_key: Kubernetes
summary: Learn how to install Milvus cluster on Kubernetes.
title: Run Milvus with GPU Support Using Helm Chart
---

# Run Milvus with GPU Support Using Helm Chart

This page illustrates how to start a Milvus instance with GPU support using Helm Chart.

## Overview

Helm uses a packaging format called charts. A chart is a collection of files that describe a related set of Kubernetes resources. Milvus provides a set of charts to help you deploy Milvus dependencies and components. [Milvus Helm Chart](https://artifacthub.io/packages/helm/milvus-helm/milvus) is a solution that bootstraps Milvus deployment on a Kubernetes (K8s) cluster using the Helm package manager.

## Prerequisites

- [Install Helm CLI](https://helm.sh/docs/intro/install/).
- [Create a K8s cluster with GPU worker nodes](prerequisite-gpu.md#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes).
- Install a [StorageClass](https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/). You can check the installed StorageClass as follows.

    ```bash
    $ kubectl get sc

    NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
    standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             false 
    ```

- Check [the hardware and software requirements](prerequisite-gpu.md) before installation.

<div class="alert note">

If you encounter any issues pulling the image, contact us at <a href="mailto:community@zilliz.com">community@zilliz.com</a> with details about the problem, and we'll provide you with the necessary support.

</div>

## Install Helm Chart for Milvus

Helm is a K8s package manager that can help you deploy Milvus quickly.

1. Add Milvus Helm repository.

```
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

2. Update charts locally.

```
$ helm repo update
```

## Start Milvus

Once you have installed the Helm chart, you can start Milvus on Kubernetes. In this section, we will guide you through the steps to start Milvus with GPU support.

You should start Milvus with Helm by specifying the release name, the chart, and the parameters you expect to change. In this guide, we use <code>my-release</code> as the release name. To use a different release name, replace <code>my-release</code> in the following commands with the one you are using.

Milvus allows you to assign one or more GPU devices to Milvus.

### 1. Assign a single GPU device

Milvus with GPU support allows you to assign one or more GPU devices.

- Milvus cluster

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

- Milvus standalone

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
  $ helm install my-release milvus/milvus --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsar.enabled=false -f custom-values.yaml
  ```

### 2. Assign multiple GPU devices

In addition to a single GPU device, you can also assign multiple GPU devices to Milvus.

- Milvus cluster

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

- Milvus standalone

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

  In the configuration above, the indexNode and queryNode share two GPUs. To assign different GPUs to the indexNode and the queryNode, you can modify the configuration accordingly by setting extraEnv in the configuration file as follows:

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
  $ helm install my-release milvus/milvus --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsar.enabled=false -f custom-values.yaml
  ```

### 2. Check Milvus status

Run the following command to check Milvus status:

```bash
$ kubectl get pods
```

After Milvus starts, the `READY` column displays `1/1` for all pods.

- Milvus cluster

  ```shell
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

- Milvus standalone

  ```shell
  NAME                                               READY   STATUS      RESTARTS   AGE
  my-release-etcd-0                                  1/1     Running     0          30s
  my-release-milvus-standalone-54c4f88cb9-f84pf      1/1     Running     0          30s
  my-release-minio-5564fbbddc-mz7f5                  1/1     Running     0          30s
  ```

### 3. Forward a local port to Milvus

Verify which local port the Milvus server is listening on. Replace the pod name with your own.

```bash
$ kubectl get pod my-release-milvus-proxy-6bd7f5587-ds2xv --template
='{{(index (index .spec.containers 0).ports 0).containerPort}}{{"\n"}}'
19530
```

Then, run the following command to forward a local port to the port at which Milvus serves.

```bash
$ kubectl port-forward service/my-release-milvus 27017:19530
Forwarding from 127.0.0.1:27017 -> 19530
```

Optionally, you can use `:19530` instead of `27017:19530` in the above command to let `kubectl` allocate a local port for you so that you don't have to manage port conflicts.

By default, kubectl's port-forwarding only listens on `localhost`. Use the `address` flag if you want Milvus to listen on the selected or all IP addresses. The following command makes port-forward listen on all IP addresses on the host machine.

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

- Check [Quickstart](quickstart.md) to see what Milvus can do.

- Learn the basic operations of Milvus:
  - [Manage Databases](manage_databases.md)
  - [Manage Collections](manage-collections.md)
  - [Manage Partitions](manage-partitions.md)
  - [Insert, Upsert & Delete](insert-update-delete.md)
  - [Single-Vector Search](single-vector-search.md)
  - [Hybrid Search](multi-vector-search.md)

- [Upgrade Milvus Using Helm Chart](upgrade_milvus_cluster-helm.md).
- [Scale your Milvus cluster](scaleout.md).
- Deploy your Milvu cluster on clouds:
  - [Amazon EC2](aws.md)
  - [Amazon EKS](eks.md)
  - [Google Cloud](gcp.md)
  - [Google Cloud Storage](gcs.md)
  - [Microsoft Azure](azure.md)
  - [Microsoft Azure Blob Storage](abs.md)
- Explore [Milvus Backup](milvus_backup_overview.md), an open-source tool for Milvus data backups.
- Explore [Birdwatcher](birdwatcher_overview.md), an open-source tool for debugging Milvus and dynamic configuration updates.
- Explore [Attu](https://milvus.io/docs/attu.md), an open-source GUI tool for intuitive Milvus management.
- [Monitor Milvus with Prometheus](monitor.md).
