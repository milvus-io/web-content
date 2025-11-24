---
id: install_cluster-helm.md
label: Helm
related_key: Kubernetes
summary: Learn how to install Milvus cluster on Kubernetes.
title: Install Milvus Cluster with Helm
---

# Run Milvus in Kubernetes with Helm

This page illustrates how to start a Milvus instance in Kubernetes using [Milvus Helm charts](https://github.com/zilliztech/milvus-helm).

## Overview

Helm uses a packaging format called charts. A chart is a collection of files that describe a related set of Kubernetes resources. Milvus provides a set of charts to help you deploy Milvus dependencies and components.

## Prerequisites

- [Install Helm CLI](https://helm.sh/docs/intro/install/).
- [Create a K8s cluster](prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes).
- Install a [StorageClass](https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/). You can check the installed StorageClass as follows.

    ```bash
    $ kubectl get sc

    NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
    standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             false 
    ```

- Check [the hardware and software requirements](prerequisite-helm.md) before installation.
- Before installing Milvus, it is recommended to use the [Milvus Sizing Tool](https://milvus.io/tools/sizing) to estimate the hardware requirements based on your data size. This helps ensure optimal performance and resource allocation for your Milvus installation.

<div class="alert note">

If you encounter any issues pulling the image, contact us at <a href="mailto:community@zilliz.com">community@zilliz.com</a> with details about the problem, and we'll provide you with the necessary support.

</div>

## Install Milvus Helm Chart

Before installing Milvus Helm Charts, you need to add Milvus Helm repository.

```bash
helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
```

<div class="alert note">

The Milvus Helm Charts repo at `https://github.com/milvus-io/milvus-helm` has been archived. We now use the new repository at `https://github.com/zilliztech/milvus-helm`. The archived repo is still available for charts up to 4.0.31, but use the new repo for later releases.

</div>

Then fetch Milvus charts from the repository as follows:

```
$ helm repo update
```

You can always run this command to fetch the latest Milvus Helm charts.

## Online install

### 1. Deploy a Milvus cluster

Once you have installed the Helm chart, you can start Milvus on Kubernetes. This section guides you through deploying a Milvus cluster.

<div class="alert note" id="standalone-deployment-note">

<strong>Need standalone deployment instead?</strong>

If you prefer to deploy Milvus in standalone mode (single node) for development or testing, use this command:

```bash
helm install my-release zilliztech/milvus \
  --set image.all.tag=v2.6.6 \
  --set cluster.enabled=false \
  --set pulsarv3.enabled=false \
  --set standalone.messageQueue=woodpecker \
  --set woodpecker.enabled=true \
  --set streaming.enabled=true
```

**Note**: Standalone mode uses Woodpecker as the default message queue and enables the Streaming Node component. For details, refer to the [Architecture Overview](architecture_overview.md) and [Use Woodpecker](use-woodpecker.md).

</div>

**Deploy Milvus cluster:**

The following command deploys a Milvus cluster with optimized settings for v2.6.6, using Woodpecker as the recommended message queue:

```bash
helm install my-release zilliztech/milvus \
  --set image.all.tag=v2.6.6 \
  --set pulsarv3.enabled=false \
  --set woodpecker.enabled=true \
  --set streaming.enabled=true \
  --set indexNode.enabled=false
```

**What this command does:**
- Uses **Woodpecker** as the message queue (recommended for reduced maintenance)
- Enables the new **Streaming Node** component for improved performance
- Disables the legacy **Index Node** (functionality is now handled by Data Node)
- Disables Pulsar to use Woodpecker instead

<div class="alert note">

**Architecture Changes in Milvus 2.6.x:**

- **Message Queue**: **Woodpecker** is now recommended (reduces infrastructure maintenance compared to Pulsar)
- **New Component**: **Streaming Node** is introduced and enabled by default  
- **Merged Components**: **Index Node** and **Data Node** are combined into a single **Data Node**

For complete architecture details, refer to the [Architecture Overview](architecture_overview.md).

</div>

**Alternative Message Queue Options:**

If you prefer to use **Pulsar** (traditional choice) instead of Woodpecker:

```bash
helm install my-release zilliztech/milvus \
  --set image.all.tag=v2.6.6 \
  --set streaming.enabled=true \
  --set indexNode.enabled=false
```

**Next steps:**
The command above deploys Milvus with recommended configurations. For production use:
- Use the [Milvus Sizing Tool](https://milvus.io/tools/sizing) to optimize settings based on your data size
- Review [Milvus System Configurations Checklist](https://milvus.io/docs/system_configuration.md) for advanced configuration options

<div class="alert note">

**Important notes:**

- **Release naming**: Use only letters, numbers, and dashes (no dots allowed)
- **Kubernetes v1.25+**: If you encounter PodDisruptionBudget issues, use this workaround:
  ```bash
  helm install my-release zilliztech/milvus \
    --set pulsar.bookkeeper.pdb.usePolicy=false \
    --set pulsar.broker.pdb.usePolicy=false \
    --set pulsar.proxy.pdb.usePolicy=false \
    --set pulsar.zookeeper.pdb.usePolicy=false
  ```

For more information, see [Milvus Helm Chart](https://artifacthub.io/packages/helm/milvus/milvus) and [Helm documentation](https://helm.sh/docs/).

</div>

### 2. Check Milvus cluster status

Verify that your deployment is successful by checking the pod status:

```bash
kubectl get pods
```

**Wait for all pods to show "Running" status.** With the v2.6.6 configuration, you should see pods similar to:

```
NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                1/1    Running   0        3m23s
my-release-etcd-1                                1/1    Running   0        3m23s
my-release-etcd-2                                1/1    Running   0        3m23s
my-release-milvus-datanode-68cb87dcbd-4khpm      1/1    Running   0        3m23s
my-release-milvus-mixcoord-7fb9488465-dmbbj      1/1    Running   0        3m23s
my-release-milvus-proxy-6bd7f5587-ds2xv          1/1    Running   0        3m24s
my-release-milvus-querynode-5cd8fff495-k6gtg     1/1    Running   0        3m24s
my-release-milvus-streaming-node-xxxxxxxxx       1/1    Running   0        3m24s
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

**Key components to verify:**
- **Milvus components**: `mixcoord`, `datanode`, `querynode`, `proxy`, `streaming-node`
- **Dependencies**: `etcd` (metadata), `minio` (object storage), `pulsar` (message queue)

You can also access the **Milvus WebUI** at `http://127.0.0.1:9091/webui/` once port forwarding is set up (see next step). For details, refer to [Milvus WebUI](milvus-webui.md).

### 3. Connect to Milvus

To connect to your Milvus cluster from outside Kubernetes, you need to set up port forwarding.

**Set up port forwarding:**

```bash
kubectl port-forward service/my-release-milvus 27017:19530
```

This command forwards your local port `27017` to Milvus port `19530`. You should see:
```
Forwarding from 127.0.0.1:27017 -> 19530
```

**Connection details:**
- **Local connection**: `localhost:27017` 
- **Milvus default port**: `19530`

<div class="alert note">

**Options for port forwarding:**

- **Auto-assign local port**: Use `:19530` instead of `27017:19530` to let kubectl choose an available port
- **Listen on all interfaces**: Add `--address 0.0.0.0` to allow connections from other machines:
  ```bash
  kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530
  ```
- **Standalone deployment**: If using standalone mode, the service name remains the same

</div>

**Keep this terminal open** while using Milvus. You can now connect to Milvus using any Milvus SDK at `localhost:27017`.


## (Optional) Update Milvus configurations

You can update the configurations of your Milvus cluster by editing the `values.yaml` file and applying it again. 

1. Create a `values.yaml` file with the desired configurations.

    The following assumes that you want to enable `proxy.http`.

    ```yaml
    extraConfigFiles:
      user.yaml: |+
        proxy:
          http:
            enabled: true
    ```

    For applicable configuration items, refer to [System Configuration](system_configuration.md).

1. Apply the `values.yaml` file.

  ```shell
  helm upgrade my-release zilliztech/milvus --namespace my-namespace -f values.yaml
  ```

1. Check the updated configurations.

    ```shell
    helm get values my-release
    ```

    The output should show the updated configurations.

## Access Milvus WebUI

Milvus ships with a built-in GUI tool called Milvus WebUI that you can access through your browser. Milvus Web UI enhances system observability with a simple and intuitive interface. You can use Milvus Web UI to observe the statistics and metrics of the components and dependencies of Milvus, check database and collection details, and list detailed Milvus configurations. For details about Milvus Web UI, see [Milvus WebUI](milvus-webui.md)

To enable the access to the Milvus Web UI, you need to port-forward the proxy pod to a local port.

```shell
$ kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27018:9091
Forwarding from 0.0.0.0:27018 -> 9091
```

Now, you can access Milvus Web UI at `http://localhost:27018`.

## Offline install

If you are in a network-restricted environment, follow the procedure in this section to start a Milvus cluster.

### 1. Get Milvus manifest

Run the following command to get the Milvus manifest.

```shell
$ helm template my-release zilliztech/milvus > milvus_manifest.yaml
```

The above command renders chart templates for a Milvus cluster and saves the output to a manifest file named `milvus_manifest.yaml`. Using this manifest, you can install a Milvus cluster with its components and dependencies in separate pods.

<div class="alert note">

- To install a Milvus instance in the standalone mode where all Milvus components are contained within a single pod, you should run `helm template my-release --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsarv3.enabled=false zilliztech/milvus > milvus_manifest.yaml` instead to render chart templates for a Milvus instance in a standalone mode.
- To change Milvus configurations, download the [`value.yaml`](https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml) template, place your desired settings in it, and use `helm template -f values.yaml my-release zilliztech/milvus > milvus_manifest.yaml` to render the manifest accordingly.

</div>

### 2. Download image-pulling script

The image-pulling script is developed in Python. You should download the script along with its dependencies in the `requirement.txt` file.

```shell
$ wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/requirements.txt
$ wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/save_image.py
```

### 3. Pull and save images

Run the following command to pull and save the required images.

```shell
$ pip3 install -r requirements.txt
$ python3 save_image.py --manifest milvus_manifest.yaml
```

The images are pulled into a sub-folder named `images` in the current directory.

### 4. Load images

You can now load the images to the hosts in the network-restricted environment as follows:

```shell
$ for image in $(find . -type f -name "*.tar.gz") ; do gunzip -c $image | docker load; done
```

### 5. Deploy Milvus

```shell
$ kubectl apply -f milvus_manifest.yaml
```

Till now, you can follow steps [2](#2-Check-Milvus-cluster-status) and [3](#3-Forward-a-local-port-to-Milvus) of the online install to check the cluster status and forward a local port to Milvus.

## Upgrade running Milvus cluster

Run the following command to upgrade your running Milvus cluster to the latest version:

```shell
$ helm repo update
$ helm upgrade my-release zilliztech/milvus --reset-then-reuse-values
```

## Uninstall Milvus

Run the following command to uninstall Milvus.

```bash
$ helm uninstall my-release
```

## What's next

Having installed Milvus in Docker, you can:

- Check [Hello Milvus](quickstart.md) to see what Milvus can do.

- Learn the basic operations of Milvus:
  - [Manage Databases](manage_databases.md)
  - [Manage Collections](manage-collections.md)
  - [Manage Partitions](manage-partitions.md)
  - [Insert, Upsert & Delete](insert-update-delete.md)
  - [Single-Vector Search](single-vector-search.md)
  - [Hybrid Search](multi-vector-search.md)

- [Upgrade Milvus Using Helm Chart](upgrade_milvus_cluster-helm.md).
- [Scale your Milvus cluster](scaleout.md).
- Deploy your Milvus cluster on clouds:
  - [Amazon EKS](eks.md)
  - [Google Cloud](gcp.md)
  - [Microsoft Azure](azure.md)
- Explore [Milvus WebUI](milvus-webui.md), an intuitive web interface for Milvus observability and management.
- Explore [Milvus Backup](milvus_backup_overview.md), an open-source tool for Milvus data backups.
- Explore [Birdwatcher](birdwatcher_overview.md), an open-source tool for debugging Milvus and dynamic configuration updates.
- Explore [Attu](https://github.com/zilliztech/attu), an open-source GUI tool for intuitive Milvus management.
- [Monitor Milvus with Prometheus](monitor.md).
