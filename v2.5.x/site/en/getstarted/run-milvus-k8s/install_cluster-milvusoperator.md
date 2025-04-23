---
id: install_cluster-milvusoperator.md
label: Milvus Operator
related_key: Kubernetes
summary: Learn how to install Milvus cluster on Kubernetes using Milvus Operator
title: Install Milvus Cluster with Milvus Operator
---

# Run Milvus in Kubernetes with Milvus Operator

This page illustrates how to start a Milvus instance in Kubernetes using [Milvus Operator](https://github.com/zilliztech/milvus-operator).

## Overview

Milvus Operator is a solution that helps you deploy and manage a full Milvus service stack to target Kubernetes (K8s) clusters. The stack includes all Milvus components and relevant dependencies like etcd, Pulsar, and MinIO. 

## Prerequisites

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

## Install Milvus Operator

Milvus Operator defines a Milvus cluster custom resources on top of [Kubernetes Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/). When custom resources are defined, you can use K8s APIs in a declarative way and manage the Milvus deployment stack to ensure its scalability and high availability.

You can install Milvus Operator in either of the following ways:

- [With Helm](#Install-with-Helm)
- [With kubectl](#Install-with-kubectl)

### Install with Helm

Run the following command to install Milvus Operator with Helm.

```shell
$ helm install milvus-operator \
  -n milvus-operator --create-namespace \
  --wait --wait-for-jobs \
  https://github.com/zilliztech/milvus-operator/releases/download/v1.2.0/milvus-operator-1.2.0.tgz
```

You will see the output similar to the following after the installation process ends.

```shell
NAME: milvus-operator
LAST DEPLOYED: Thu Jul  7 13:18:40 2022
NAMESPACE: milvus-operator
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
Milvus Operator Is Starting, use `kubectl get -n milvus-operator deploy/milvus-operator` to check if its successfully installed
If Operator not started successfully, check the checker's log with `kubectl -n milvus-operator logs job/milvus-operator-checker`
Full Installation doc can be found in https://github.com/zilliztech/milvus-operator/blob/main/docs/installation/installation.md
Quick start with `kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_minimum.yaml`
More samples can be found in https://github.com/zilliztech/milvus-operator/tree/main/config/samples
CRD Documentation can be found in https://github.com/zilliztech/milvus-operator/tree/main/docs/CRD
```

### Install with kubectl

Run the following command to install Milvus Operator with `kubectl`.

```shell
$ kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/deploy/manifests/deployment.yaml
```

You will see the output similar to the following after the installation process ends.

```shell
namespace/milvus-operator created
customresourcedefinition.apiextensions.k8s.io/milvusclusters.milvus.io created
serviceaccount/milvus-operator-controller-manager created
role.rbac.authorization.k8s.io/milvus-operator-leader-election-role created
clusterrole.rbac.authorization.k8s.io/milvus-operator-manager-role created
clusterrole.rbac.authorization.k8s.io/milvus-operator-metrics-reader created
clusterrole.rbac.authorization.k8s.io/milvus-operator-proxy-role created
rolebinding.rbac.authorization.k8s.io/milvus-operator-leader-election-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/milvus-operator-manager-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/milvus-operator-proxy-rolebinding created
configmap/milvus-operator-manager-config created
service/milvus-operator-controller-manager-metrics-service created
service/milvus-operator-webhook-service created
deployment.apps/milvus-operator-controller-manager created
```

You can check if the Milvus Operator pod is running as follows:

```shell
$ kubectl get pods -n milvus-operator

NAME                               READY   STATUS    RESTARTS   AGE
milvus-operator-5fd77b87dc-msrk4   1/1     Running   0          46s
```

## Deploy Milvus

### 1. Deploy a Milvus cluster

Once the Milvus Operator pod is running, you can deploy a Milvus cluster as follows.

```shell
$ kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml
```

The command above deploys a Milvus cluster with its components and dependencies in separate pods using default configurations. To customize these settings, we recommend you use the [Milvus Sizing Tool](https://milvus.io/tools/sizing) to adjust the configurations based on your actual data size and then download the corresponding YAML file. To learn more about configuration parameters, refer to [Milvus System Configurations Checklist](https://milvus.io/docs/system_configuration.md).

<div class="alert note">

- The release name should only contain letters, numbers and dashes. Dots are not allowed in the release name.
- You can also deploy a Milvus instance in standalone mode, where all its components are contained within a single pod. To do so, change the configuration file URL in the above command to `https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_default.yaml`

</div>

#### 2. Check Milvus cluster status

Run the following command to check Milvus cluster status

```shell
$ kubectl get milvus my-release -o yaml
```

Once your Milvus cluster is ready, the output of the above command should be similar to the following. If the `status.status` field stays `Unhealthy`, your Milvus cluster is still under creation.

```yaml
apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
...
status:
  conditions:
  - lastTransitionTime: "2021-11-02T05:59:41Z"
    reason: StorageReady
    status: "True"
    type: StorageReady
  - lastTransitionTime: "2021-11-02T06:06:23Z"
    message: Pulsar is ready
    reason: PulsarReady
    status: "True"
    type: PulsarReady
  - lastTransitionTime: "2021-11-02T05:59:41Z"
    message: Etcd endpoints is healthy
    reason: EtcdReady
    status: "True"
    type: EtcdReady
  - lastTransitionTime: "2021-11-02T06:12:36Z"
    message: All Milvus components are healthy
    reason: MilvusClusterHealthy
    status: "True"
    type: MilvusReady
  endpoint: my-release-milvus.default:19530
  status: Healthy
```

Milvus Operator creates Milvus dependencies, such as etcd, Pulsar, and MinIO, and then Milvus components, such as proxy, coordinators, and nodes.

Once your Milvus cluster is ready, the status of all pods in the Milvus cluster should be similar to the following.

```shell
$ kubectl get pods

NAME                                            READY   STATUS      RESTARTS   AGE
my-release-etcd-0                               1/1     Running     0          14m
my-release-etcd-1                               1/1     Running     0          14m
my-release-etcd-2                               1/1     Running     0          14m
my-release-milvus-datanode-5c686bd65-wxtmf      1/1     Running     0          6m
my-release-milvus-indexnode-5b9787b54-xclbx     1/1     Running     0          6m
my-release-milvus-proxy-84f67cdb7f-pg6wf        1/1     Running     0          6m
my-release-milvus-querynode-5bcb59f6-nhqqw      1/1     Running     0          6m
my-release-milvus-mixcoord-fdcccfc84-9964g      1/1     Running     0          6m
my-release-minio-0                              1/1     Running     0          14m
my-release-minio-1                              1/1     Running     0          14m
my-release-minio-2                              1/1     Running     0          14m
my-release-minio-3                              1/1     Running     0          14m
my-release-pulsar-bookie-0                      1/1     Running     0          14m
my-release-pulsar-bookie-1                      1/1     Running     0          14m
my-release-pulsar-bookie-init-h6tfz             0/1     Completed   0          14m
my-release-pulsar-broker-0                      1/1     Running     0          14m
my-release-pulsar-broker-1                      1/1     Running     0          14m
my-release-pulsar-proxy-0                       1/1     Running     0          14m
my-release-pulsar-proxy-1                       1/1     Running     0          14m
my-release-pulsar-pulsar-init-d2t56             0/1     Completed   0          14m
my-release-pulsar-recovery-0                    1/1     Running     0          14m
my-release-pulsar-toolset-0                     1/1     Running     0          14m
my-release-pulsar-zookeeper-0                   1/1     Running     0          14m
my-release-pulsar-zookeeper-1                   1/1     Running     0          13m
my-release-pulsar-zookeeper-2                   1/1     Running     0          13m
```

### 3. Forward a local port to Milvus

Run the following command to get the port at which your Milvus cluster serves.

```shell
$ kubectl get pod my-release-milvus-proxy-84f67cdb7f-pg6wf --template
='{{(index (index .spec.containers 0).ports 0).containerPort}}{{"\n"}}'
19530
```

The output shows that the Milvus instance serves at the default port **19530**.

<div class="alert note">

If you have deployed Milvus in standalone mode, change the pod name from `my-release-milvus-proxy-xxxxxxxxxx-xxxxx` to `my-release-milvus-xxxxxxxxxx-xxxxx`.

</div>

Then, run the following command to forward a local port to the port at which Milvus serves.

```shell
$ kubectl port-forward service/my-release-milvus 27017:19530
Forwarding from 127.0.0.1:27017 -> 19530
```

Optionally, you can use `:19530` instead of `27017:19530` in the above command to let `kubectl` allocate a local port for you so that you don't have to manage port conflicts.

By default, kubectl's port-forwarding only listens on `localhost`. Use the `address` flag if you want Milvus to listen on the selected or all IP addresses. The following command makes port-forward listen on all IP addresses on the host machine.

```shell
$ kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530
Forwarding from 0.0.0.0:27017 -> 19530
```

Now, you can connect to Milvus using the forwarded port.

## Access Milvus WebUI

Milvus ships with a built-in GUI tool called Milvus WebUI that you can access through your browser. Milvus Web UI enhances system observability with a simple and intuitive interface. You can use Milvus Web UI to observe the statistics and metrics of the components and dependencies of Milvus, check database and collection details, and list detailed Milvus configurations. For details about Milvus Web UI, see [Milvus WebUI](milvus-webui.md)

To enable the access to the Milvus Web UI, you need to port-forward the proxy pod to a local port.

```shell
$ kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27018:9091
Forwarding from 0.0.0.0:27018 -> 9091
```

Now, you can access Milvus Web UI at `http://localhost:27018`.

## Uninstall Milvus

Run the following command to uninstall the Milvus cluster.

```shell
$ kubectl delete milvus my-release
```

<div class="alert note">

- When you delete the Milvus cluster using the default configuration, dependencies like etcd, Pulsar, and MinIO are not deleted. Therefore, next time when you install the same Milvus cluster instance, these dependencies will be used again.
- To delete the dependencies and persistent volume claims (PVCs) along with the Milvus cluster, see [configuration file](https://github.com/zilliztech/milvus-operator/blob/main/config/samples/milvus_deletion.yaml).

</div>

## Uninstall Milvus Operator

There are also two ways to uninstall Milvus Operator.

- [Uninstall with Helm](#Uninstall-with-Helm)
- [Uninstall with kubectl](#Uninstall-with-kubectl)

#### Uninstall with Helm

```shell
$ helm -n milvus-operator uninstall milvus-operator
```

#### Uninstall with kubectl

```shell
$ kubectl delete -f https://raw.githubusercontent.com/zilliztech/milvus-operator/v1.2.0/deploy/manifests/deployment.yaml
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
- Deploy your Milvu cluster on clouds:
  - [Amazon EKS](eks.md)
  - [Google Cloud](gcp.md)
  - [Microsoft Azure](azure.md)
- Explore [Milvus WebUI](milvus-webui.md), an intuitive web interface for Milvus observability and management.
- Explore [Milvus Backup](milvus_backup_overview.md), an open-source tool for Milvus data backups.
- Explore [Birdwatcher](birdwatcher_overview.md), an open-source tool for debugging Milvus and dynamic configuration updates.
- Explore [Attu](https://github.com/zilliztech/attu), an open-source GUI tool for intuitive Milvus management.
- [Monitor Milvus with Prometheus](monitor.md).
