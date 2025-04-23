---
id: install_standalone-operator.md
label: Milvus Operator
order: 1
group: install_standalone-docker.md
summary: Learn how to install Milvus stanalone with Milvus Operator.
title: Install Milvus Standalone with Milvus Operator
deprecate: true
---

<div class="tab-wrapper"><a href="install_standalone-operator.md" class='active '>Milvus Operator</a><a href="install_standalone-helm.md" class=''>Helm</a><a href="install_standalone-aptyum.md" class=''>DEB/RPM</a></div>

# Install Milvus Standalone with Milvus Operator

Milvus Operator is a solution that helps you deploy and manage a full Milvus service stack to target Kubernetes (K8s) clusters. The stack includes all Milvus components and relevant dependencies like etcd, Pulsar and MinIO. This topic describes how to install Milvus standalone using Milvus Operator.

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
  https://github.com/zilliztech/milvus-operator/releases/download/v1.2.0/milvus-operator-1.2.0.tgz
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
Full Installation doc can be found in https://github.com/zilliztech/milvus-operator/blob/main/docs/installation/installation.md
Quick start with `kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_minimum.yaml`
More samples can be found in https://github.com/zilliztech/milvus-operator/tree/main/config/samples
CRD Documentation can be found in https://github.com/zilliztech/milvus-operator/tree/main/docs/CRD
```

#### Install by `kubectl` command

```
$ kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/deploy/manifests/deployment.yaml
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

## Install Milvus standalone

### 1. Install Milvus

When Milvus Operator starts, run the following command to install Milvus.

```
$ kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_default.yaml
```


### 2. Check the status of Milvus standalone

Run the following command to check the status of Milvus you just installed.

```
$ kubectl get milvus my-release -o yaml
```

When the Milvus is successfully installed, you can learn how to [manage collections](manage-collections.md).

## Connect to Milvus

Verify which local port the Milvus server is listening on. Replace the pod name with your own.

```bash
$ kubectl get pod my-release-milvus-proxy-84f67cdb7f-pg6wf --template
='{{(index (index .spec.containers 0).ports 0).containerPort}}{{"\n"}}'
19530
```

Open a new terminal and run the following command to forward a local port to the port that Milvus uses. Optionally, omit the designated port and use `:19530` to let `kubectl` allocate a local port for you so that you don't have to manage port conflicts.

```bash
$ kubectl port-forward service/my-release-milvus 27017:19530
Forwarding from 127.0.0.1:27017 -> 19530
```

By default, kubectl's port-forwarding only listens on localhost. Use flag `address` if you want Milvus server to listen on selected IP or all addresses.

```bash
$ kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530
Forwarding from 0.0.0.0:27017 -> 19530
```

## Uninstall Milvus standalone

Run the following command to uninstall Milvus.

```
$ kubectl delete milvus my-release
```

## Uninstall Milvus Operator

There are also two ways to uninstall Milvus Operator on K8s:

### Uninstall Milvus Operator by Helm command

```
$ helm -n milvus-operator uninstall milvus-operator
```

### Uninstall Milvus Operator by `kubectl` command

```
$ kubectl delete -f https://raw.githubusercontent.com/zilliztech/milvus-operator/v1.2.0/deploy/manifests/deployment.yaml
```

## Delete the K8s cluster

When you no longer need the K8s cluster in the test environment, you can run `$ minikube delete` to delete it.

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
- [Upgrade Milvus Using Milvus Operator](upgrade_milvus_standalone-operator.md)
- Explore [Milvus Backup](milvus_backup_overview.md), an open-source tool for Milvus data backups.
- Explore [Birdwatcher](birdwatcher_overview.md), an open-source tool for debugging Milvus and dynamic configuration updates.
- Explore [Attu](https://github.com/zilliztech/attu), an open-source GUI tool for intuitive Milvus management.
- [Monitor Milvus with Prometheus](monitor.md)


  
  
  


