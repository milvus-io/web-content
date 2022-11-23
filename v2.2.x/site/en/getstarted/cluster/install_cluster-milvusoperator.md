---
id: install_cluster-milvusoperator.md
label: Milvus Operator
related_key: Kubernetes
order: 0
group: install_cluster-milvusoperator.md
summary: Learn how to install Milvus cluster on Kubernetes using Milvus Operator
---

<div class="tab-wrapper"><a href="install_cluster-milvusoperator.md" class='active '>Milvus Operator</a><a href="install_cluster-helm.md" class=''>Helm</a><a href="install_cluster-docker.md" class=''>Docker Compose</a><a href="install_cluster-ansible.md" class=''>Ansible</a></div>

# Install Milvus Cluster with Milvus Operator

Milvus Operator is a solution that helps you deploy and manage a full Milvus service stack to target Kubernetes (K8s) clusters. The stack includes all Milvus components and relevant dependencies like etcd, Pulsar and MinIO. This topic introduces how to deploy a Milvus cluster with Milvus Operator on K8s.

## Prerequisites
[Check the requirements for hardware and software](prerequisite-helm.md) prior to your installation.

## Create a K8s Cluster

If you have already deployed a K8s cluster for production, you can skip this step and proceed directly to [deploy Milvus Operator](install_cluster-milvusoperator.md#Deploy-Milvus-Operator). If not, you can follow the steps below to quickly create a K8s for testing, and then use it to deploy a Milvus cluster with Milvus Operator. 

### Create a K8s cluster using minikube

We recommend installing Milvus on K8s with [minikube](https://minikube.sigs.k8s.io/docs/), a tool that allows you to run K8s locally.

<div class="alert note">
minikube can only be used in test environments. It is not recommended that you deploy Milvus distributed clusters in this way in production environments.
</div>

#### 1. Install minikube

See [install minikube](https://minikube.sigs.k8s.io/docs/start/) for more information.

#### 2. Start a K8s cluster using minikube

After installing minikube, run the following command to start a K8s cluster.

```
$ minikube start
```

#### 3. Check the K8s cluster status

Run `$ kubectl cluster-info` to check the status of the K8s cluster you just created. Ensure that you can access the K8s cluster via `kubectl`. If you have not installed `kubectl` locally, see [Use kubectl inside minikube](https://minikube.sigs.k8s.io/docs/handbook/kubectl/).


## Deploy Milvus Operator

Milvus Operator defines a Milvus cluster custom resources on top of [Kubernetes Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/). When the custom resources are defined, you can use K8s APIs in a declarative way and manage Milvus deployment stack to ensure its scalability and high-availability.

### Prerequisites

- Ensure that you can access the K8s cluster via `kubectl` or `helm`. 
- Ensure the StorageClass dependency is installed as Milvus clusters depend on default StorageClass for data persistence. minikube has a dependency on default StorageClass when installed. Check the dependency by running the command `kubectl get sc`. If StorageClass is installed, you will see the following output. If not, see [Change the Default StorageClass](https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/) for more information.

```
NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             false                    3m36s
```

### 1. Install cert-manager

<div class="alert note">
You can install Milvus Operator with Helm or `kubectl` command. If you choose to use Helm, you can skip this step and proceed directly to <a href=install_cluster-milvusoperator.md#Install-by-Helm-command>Install by Helm command</a>.
</div>

Milvus Operator uses [cert-manager](https://cert-manager.io/docs/installation/supported-releases/) to provide certificate for webhook server. Run the following command to install cert-manager.

```
$ kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.5.3/cert-manager.yaml
```

If cert-manager is installed, you can see the following output.

```
customresourcedefinition.apiextensions.k8s.io/certificaterequests.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/certificates.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/challenges.acme.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/clusterissuers.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/issuers.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/orders.acme.cert-manager.io created
namespace/cert-manager created
serviceaccount/cert-manager-cainjector created
serviceaccount/cert-manager created
serviceaccount/cert-manager-webhook created
clusterrole.rbac.authorization.k8s.io/cert-manager-cainjector created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-issuers created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-clusterissuers created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-certificates created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-orders created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-challenges created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-ingress-shim created
clusterrole.rbac.authorization.k8s.io/cert-manager-view created
clusterrole.rbac.authorization.k8s.io/cert-manager-edit created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-approve:cert-manager-io created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-certificatesigningrequests created
clusterrole.rbac.authorization.k8s.io/cert-manager-webhook:subjectaccessreviews created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-cainjector created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-issuers created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-clusterissuers created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-certificates created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-orders created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-challenges created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-ingress-shim created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-approve:cert-manager-io created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-certificatesigningrequests created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-webhook:subjectaccessreviews created
role.rbac.authorization.k8s.io/cert-manager-cainjector:leaderelection created
role.rbac.authorization.k8s.io/cert-manager:leaderelection created
role.rbac.authorization.k8s.io/cert-manager-webhook:dynamic-serving created
rolebinding.rbac.authorization.k8s.io/cert-manager-cainjector:leaderelection created
rolebinding.rbac.authorization.k8s.io/cert-manager:leaderelection created
rolebinding.rbac.authorization.k8s.io/cert-manager-webhook:dynamic-serving created
service/cert-manager created
service/cert-manager-webhook created
deployment.apps/cert-manager-cainjector created
deployment.apps/cert-manager created
deployment.apps/cert-manager-webhook created
mutatingwebhookconfiguration.admissionregistration.k8s.io/cert-manager-webhook created
validatingwebhookconfiguration.admissionregistration.k8s.io/cert-manager-webhook created
```

<div class="alert note">
cert-manager version 1.13 or later is required.
</div>

Run `$ kubectl get pods -n cert-manager` to check if cert-manager is running. You can see the following output if all the pods are running.

```
NAME                                      READY   STATUS    RESTARTS   AGE
cert-manager-848f547974-gccz8             1/1     Running   0          70s
cert-manager-cainjector-54f4cc6b5-dpj84   1/1     Running   0          70s
cert-manager-webhook-7c9588c76-tqncn      1/1     Running   0          70s
```

### 2. Install Milvus Operator

There are two ways to install Milvus Operator on K8s: 

- with helm chart
- with `kubectl` command directly with raw manifests

#### Install by Helm command

```
helm install milvus-operator \
  -n milvus-operator --create-namespace \
  --wait --wait-for-jobs \
  https://github.com/milvus-io/milvus-operator/releases/download/v0.7.0/milvus-operator-0.7.0.tgz
```

If Milvus Operator is installed, you can see the following output.
```
NAME: milvus-operator
LAST DEPLOYED: Thu Jul  7 13:18:40 2022
NAMESPACE: milvus-operator
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
Milvus Operator Is Starting, use `kubectl get -n milvus-operator deploy/milvus-operator` to check if its successfully installed
If Operator not started successfully, check the checker's log with `kubectl -n milvus-operator logs job/milvus-operator-checker`
Full Installation doc can be found in https://github.com/milvus-io/milvus-operator/blob/main/docs/installation/installation.md
Quick start with `kubectl apply -f https://raw.githubusercontent.com/milvus-io/milvus-operator/main/config/samples/milvus_minimum.yaml`
More samples can be found in https://github.com/milvus-io/milvus-operator/tree/main/config/samples
CRD Documentation can be found in https://github.com/milvus-io/milvus-operator/tree/main/docs/CRD
```

#### Install by `kubectl` command

```
$ kubectl apply -f https://raw.githubusercontent.com/milvus-io/milvus-operator/main/deploy/manifests/deployment.yaml
```

If Milvus Operator is installed, you can see the following output.

```
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
certificate.cert-manager.io/milvus-operator-serving-cert created
issuer.cert-manager.io/milvus-operator-selfsigned-issuer created
mutatingwebhookconfiguration.admissionregistration.k8s.io/milvus-operator-mutating-webhook-configuration created
validatingwebhookconfiguration.admissionregistration.k8s.io/milvus-operator-validating-webhook-configuration created
```

Run `$ kubectl get pods -n milvus-operator` to check if Milvus Operator is running. You can see the following output if Milvus Operator is running.

```
NAME                               READY   STATUS    RESTARTS   AGE
milvus-operator-5fd77b87dc-msrk4   1/1     Running   0          46s
```

## Install a Milvus cluster

This tutorial uses the default configuration to install a Milvus cluster. All Milvus cluster components are enabled with multiple replicas, which consumes many resources. 

<div class="alert note">
If you have very limited local resources, you can install a Milvus cluster [using the minimum configuration](https://github.com/milvus-io/milvus-operator/blob/main/config/samples/milvus_cluster_minimum.yaml).
</div>

### 1. Deploy a Milvus cluster

When Milvus Operator starts, run the following command to deploy a Milvus cluster.

```
$ kubectl apply -f https://raw.githubusercontent.com/milvus-io/milvus-operator/main/config/samples/milvus_cluster_default.yaml
```

When the cluster is deployed, you can see the following output.

```
milvuscluster.milvus.io/my-release created
```

### 2. Check the Milvus cluster status

Run the following command to check the status of the Milvus cluster you just deployed.

```
$ kubectl get milvus my-release -o yaml
```

You can confirm the current status of Milvus cluster from the `status` field in the output. When the Milvus cluster is still under creation, the `status` shows `Unhealthy`.

```
apiVersion: milvus.io/v1alpha1
kind: MilvusCluster
metadata:
...
status:
  conditions:
  - lastTransitionTime: "2021-11-02T02:52:04Z"
    message: 'Get "http://my-release-minio.default:9000/minio/admin/v3/info": dial
      tcp 10.96.78.153:9000: connect: connection refused'
    reason: ClientError
    status: "False"
    type: StorageReady
  - lastTransitionTime: "2021-11-02T02:52:04Z"
    message: connection error
    reason: PulsarNotReady
    status: "False"
    type: PulsarReady
  - lastTransitionTime: "2021-11-02T02:52:04Z"
    message: All etcd endpoints are unhealthy
    reason: EtcdNotReady
    status: "False"
    type: EtcdReady
  - lastTransitionTime: "2021-11-02T02:52:04Z"
    message: Milvus Dependencies is not ready
    reason: DependencyNotReady
    status: "False"
    type: MilvusReady
  endpoint: my-release-milvus.default:19530
  status: Unhealthy
```
  
Run the following command to check the current status of Milvus pods.

```
$ kubectl get pods
```

```
NAME                                  READY   STATUS              RESTARTS   AGE
my-release-etcd-0                     0/1     Running             0          16s
my-release-etcd-1                     0/1     ContainerCreating   0          16s
my-release-etcd-2                     0/1     ContainerCreating   0          16s
my-release-minio-0                    1/1     Running             0          16s
my-release-minio-1                    1/1     Running             0          16s
my-release-minio-2                    0/1     Running             0          16s
my-release-minio-3                    0/1     ContainerCreating   0          16s
my-release-pulsar-bookie-0            0/1     Pending             0          15s
my-release-pulsar-bookie-1            0/1     Pending             0          15s
my-release-pulsar-bookie-init-h6tfz   0/1     Init:0/1            0          15s
my-release-pulsar-broker-0            0/1     Init:0/2            0          15s
my-release-pulsar-broker-1            0/1     Init:0/2            0          15s
my-release-pulsar-proxy-0             0/1     Init:0/2            0          16s
my-release-pulsar-proxy-1             0/1     Init:0/2            0          15s
my-release-pulsar-pulsar-init-d2t56   0/1     Init:0/2            0          15s
my-release-pulsar-recovery-0          0/1     Init:0/1            0          16s
my-release-pulsar-toolset-0           1/1     Running             0          16s
my-release-pulsar-zookeeper-0         0/1     Pending             0          16s
```


### 3. Enable Milvus components

Milvus Operator first creates all dependencies like etcd, Pulsar, and MinIO, and then continues to create Milvus components. Therefore, you can only see the pods of etcd, Pulsar, and MinIO now.  Once all denependencies are enabled, Milvus Operator will start all Milvus components. The status of the Milvus cluster is shown as in the following output.

```
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
  - lastTransitionTime: "2021-11-02T06:06:24Z"
    message: '[datacoord datanode indexcoord indexnode proxy querycoord querynode
      rootcoord] not ready'
    reason: MilvusComponentNotHealthy
    status: "False"
    type: MilvusReady
  endpoint: my-release-milvus.default:19530
  status: Unhealthy
```

Check the status of the Milvus pods again.

```
$ kubectl get pods
```

```
NAME                                            READY   STATUS              RESTARTS   AGE
my-release-etcd-0                               1/1     Running             0          6m49s
my-release-etcd-1                               1/1     Running             0          6m49s
my-release-etcd-2                               1/1     Running             0          6m49s
my-release-milvus-datacoord-6c7bb4b488-k9htl    0/1     ContainerCreating   0          16s
my-release-milvus-datanode-5c686bd65-wxtmf      0/1     ContainerCreating   0          16s
my-release-milvus-indexcoord-586b9f4987-vb7m4   0/1     Running             0          16s
my-release-milvus-indexnode-5b9787b54-xclbx     0/1     ContainerCreating   0          16s
my-release-milvus-proxy-84f67cdb7f-pg6wf        0/1     ContainerCreating   0          16s
my-release-milvus-querycoord-865cc56fb4-w2jmn   0/1     Running             0          16s
my-release-milvus-querynode-5bcb59f6-nhqqw      0/1     ContainerCreating   0          16s
my-release-milvus-rootcoord-fdcccfc84-9964g     0/1     Running             0          16s
my-release-minio-0                              1/1     Running             0          6m49s
my-release-minio-1                              1/1     Running             0          6m49s
my-release-minio-2                              1/1     Running             0          6m49s
my-release-minio-3                              1/1     Running             0          6m49s
my-release-pulsar-bookie-0                      1/1     Running             0          6m48s
my-release-pulsar-bookie-1                      1/1     Running             0          6m48s
my-release-pulsar-bookie-init-h6tfz             0/1     Completed           0          6m48s
my-release-pulsar-broker-0                      1/1     Running             0          6m48s
my-release-pulsar-broker-1                      1/1     Running             0          6m48s
my-release-pulsar-proxy-0                       1/1     Running             0          6m49s
my-release-pulsar-proxy-1                       1/1     Running             0          6m48s
my-release-pulsar-pulsar-init-d2t56             0/1     Completed           0          6m48s
my-release-pulsar-recovery-0                    1/1     Running             0          6m49s
my-release-pulsar-toolset-0                     1/1     Running             0          6m49s
my-release-pulsar-zookeeper-0                   1/1     Running             0          6m49s
my-release-pulsar-zookeeper-1                   1/1     Running             0          6m
my-release-pulsar-zookeeper-2                   1/1     Running             0          6m26s
```

When all components are enabled, the `status` of the Milvus cluster is shown as `Healthy`.

```
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

Check the status of the Milvus pods again. You can see all the pods are running now.

```
$ kubectl get pods
NAME                                            READY   STATUS      RESTARTS   AGE
my-release-etcd-0                               1/1     Running     0          14m
my-release-etcd-1                               1/1     Running     0          14m
my-release-etcd-2                               1/1     Running     0          14m
my-release-milvus-datacoord-6c7bb4b488-k9htl    1/1     Running     0          6m
my-release-milvus-datanode-5c686bd65-wxtmf      1/1     Running     0          6m
my-release-milvus-indexcoord-586b9f4987-vb7m4   1/1     Running     0          6m
my-release-milvus-indexnode-5b9787b54-xclbx     1/1     Running     0          6m
my-release-milvus-proxy-84f67cdb7f-pg6wf        1/1     Running     0          6m
my-release-milvus-querycoord-865cc56fb4-w2jmn   1/1     Running     0          6m
my-release-milvus-querynode-5bcb59f6-nhqqw      1/1     Running     0          6m
my-release-milvus-rootcoord-fdcccfc84-9964g     1/1     Running     0          6m
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

When the Milvus cluster is installed, you can learn how to [Connect to Milvus server](manage_connection.md).

## Uninstall the Milvus cluster

Run the following command to uninstall the Milvus cluster.

```
$ kubectl delete milvus my-release
```

<div class="alert note">
<li>When you delete the Milvus cluster using the default configuration, dependencies like etcd, Pulsar, and MinIO are not deleted. Therefore, next time when you install the same Milvus cluster instance, these dependencies will be used again. </li>
<li>To delete the dependencies and private virtual clouds (PVCs) along with the Milvus cluster, see <a href="https://github.com/milvus-io/milvus-operator/blob/main/config/samples/milvus_deletion.yaml">configuration file</a>.</li>

</div>

## Uninstall Milvus Operator

There are also two ways to uninstall Milvus Operator on K8s:

### Uninstall Milvus Operator by Helm command

```
$ helm -n milvus-operator uninstall milvus-operator
```

### Uninstall Milvus Operator by `kubectl` command

```
$ kubectl delete -f https://raw.githubusercontent.com/milvus-io/milvus-operator/v0.7.0/deploy/manifests/deployment.yaml
```

## Delete the K8s cluster

When you no longer need the K8s cluster in the test environment, you can run `$ minikube delete` to delete it.

## What's next

Having installed Milvus, you can:
- Check [Hello Milvus](example_code.md) to run an example code with different SDKs to see what Milvus can do.
- Learn the basic operations of Milvus:
  - [Connect to Milvus server](manage_connection.md)
  - [Create a collection](create_collection.md)
  - [Create a partition](create_partition.md)
  - [Insert data](insert_data.md)
  - [Conduct a vector search](search.md)
- [Upgrade Milvus Using Helm Chart](upgrade.md)
- [Scale your Milvus cluster](scaleout.md)
- Deploy your Milvu cluster on clouds:
  - [Amazon EC2](aws.md)
  - [Amazon EKS](eks.md)
- Explore [MilvusDM](migrate_overview.md), an open-source tool designed for importing and exporting data in Milvus.
- [Monitor Milvus with Prometheus](monitor.md)


  
  
  











