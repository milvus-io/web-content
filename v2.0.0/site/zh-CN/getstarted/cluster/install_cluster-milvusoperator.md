---
id: install_cluster-milvusoperator.md
label: Milvus Operator
related_key: Kubernetes
order: 2
group: cluster
summary: Learn how to install Milvus cluster on Kubernetes using Milvus Operator
---

# Install Milvus Cluster

你可以使用 Docker Compose 或 Kubernetes 安装 Milvus 分布式版。安装前，请先阅读[安装前提](prerequisite-docker.md)。

你也可以[从源代码编译 Milvus](https://github.com/milvus-io/milvus#to-start-developing-milvus)。


<div class="tab-wrapper"><a href="install_cluster-docker.md" class=''>Docker Compose</a><a href="install_cluster-helm.md" class=''>Helm</a><a href="install_cluster-milvusoperator.md" class='active '>Milvus Operator</a></div>

## Create a Kubernetes Cluster

If you have already deployed a K8s cluster for production, you can skip this step and proceed directly to [deploy Milvus Operator](install_cluster-milvusoperator.md#Deploy-Milvus-Operator). If not, you can follow the following steps to quickly create a K8s for testing, and then use it to install a Milvus cluster with Milvus Operator. This tutorial introduces two ways to create a Kubernetes cluster:

- Use minikube to create a Kubernetes cluster in a virtual machine (VM).
- Use kind to create a Kubernetes cluster in docker.

<div class="alert note">
The K8s cluster created by minikube and kind are for testing only.  Do <b>not</b> use it in production.
</div>

### Create a K8s cluster with minikube

[minikube](https://minikube.sigs.k8s.io/docs/) is a tool that allows you to run Kubernetes locally.

#### 1. Install minikube

See [Prerequisites](prerequisite-helm.md#Software-requirements) for more information.

#### 2. Start a K8s cluster using minukube

After installing minikube, run the following command to start a K8s cluster.


```
$ minikube start
```

After the K8s cluster starts, you can see the following output. But it may vary according to your operating system and your hypervisor.

```
😄  minikube v1.21.0 on Darwin 11.4
🎉  minikube 1.23.2 is available! Download it: https://github.com/kubernetes/minikube/releases/tag/v1.23.2
💡  To disable this notice, run: 'minikube config set WantUpdateNotification false'
✨  Automatically selected the docker driver. Other choices：hyperkit, ssh
👍  Starting control plane node minikube in cluster minikube
🚜  Pulling base image ...
❗  minikube was unable to download gcr.io/k8s-minikube/kicbase:v0.0.23, but successfully downloaded kicbase/stable:v0.0.23 as a fallback image
🔥  Creating docker container (CPUs=2, Memory=8100MB) ...
❗  This container is having trouble accessing https://k8s.gcr.io
💡  To pull new external images, you may need to configure a proxy: https://minikube.sigs.k8s.io/docs/reference/networking/proxy/
🐳  Preparing Kubernetes v1.20.7 on Docker 20.10.7…
    ▪ Generating certificates and keys ...
    ▪ Booting up control plane ...
    ▪ Configuring RBAC rules ...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: storage-provisioner, default-storageclass
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```

#### 3. Check the K8s cluster status

Run `$ kubectl cluster-info` to check the status of the K8s cluster you just created. Ensure that you can access the K8s cluster via `kubectl`. You should see the following expected output.

```
Kubernetes control plane is running at https://127.0.0.1:63754
KubeDNS is running at https://127.0.0.1:63754/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

### Create a K8s cluster with kind

[kind](https://kind.sigs.k8s.io/) is a tool for running local Kubernetes clusters using Docker container “nodes”.

#### 1. Create a configuration file 

Create the `kind.yaml` configuration file as follows.

```
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
- role: worker
```

#### 2. Create a K8s cluster

Create a K8s cluster using the `kind.yaml` configuration file.

```
$ kind create cluster --name myk8s --config kind.yaml
```

After the K8s cluster starts, you can see the following output. 

```
Creating cluster "myk8s" ...
 ✓ Ensuring node image (kindest/node:v1.21.1) 🖼
 ✓ Preparing nodes 📦 📦 📦 📦
 ✓ Writing configuration 📜
 ✓ Starting control-plane 🕹️
 ✓ Installing CNI 🔌
 ✓ Installing StorageClass 💾
 ✓ Joining worker nodes 🚜
Set kubectl context to "kind-myk8s"
You can now use your cluster with:
kubectl cluster-info --context kind-myk8s
Not sure what to do next? 😅  Check out https://kind.sigs.k8s.io/docs/user/quick-start/
```

#### 3. Check the K8s cluster status

Run `$ kubectl cluster-info` to check the status of the K8s cluster you just created. Ensure that you can access the K8s cluster via `kubectl`. You should see the following expected output.

```
Kubernetes control plane is running at https://127.0.0.1:55668
CoreDNS is running at https://127.0.0.1:55668/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

## Deploy Milvus Operator

Milvus Operator is a solution that helps you deploy and manage a full Milvus service stack to target K8s clusters. The stack includes all Milvus components and relevant dependencies like etcd, Pulsar and MinIO. Milvus Operator defines a Milvus cluster custom resources on top of [Kubernetes Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/). When the custom resources are defined, you can use Kubernetes APIs in a declarative way and manage Milvus deployment stack to ensure its scalability and high-availability.

### Prerequisites

- Ensure that you can access the K8s cluster via `kubectl`. 
- Ensure the StorageClass dependency is installed as Milvus clusters depend on Default StorageClass for data persistence. Both minikube and kind have a dependency on Default storageclass when installed. Check the dependency by running the command `kubectl get sc`. If StorageClass is installed, you will see the following output. If not, see [Change the Default Storageclass](https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/) for more information.

```
NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             false                    3m36s
```

### 1. Install cert-manager

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

Run `$ kubectl get pods -n cert-manager` to check if cert-manager is running. If so, you can see all the pods are running, as shown in the following output.

```
NAME                                      READY   STATUS    RESTARTS   AGE
cert-manager-848f547974-gccz8             1/1     Running   0          70s
cert-manager-cainjector-54f4cc6b5-dpj84   1/1     Running   0          70s
cert-manager-webhook-7c9588c76-tqncn      1/1     Running   0          70s
```

### 2. Install Milvus Operator

Run the following command to install Milvus Operator.

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

Run `$ kubectl get pods -n milvus-operator` to check if Milvus Operator is running. If so, you can see the Milvus Operator pod running as shown in the following output.

```
NAME                                                  READY   STATUS    RESTARTS   AGE
milvus-operator-controller-manager-698fc7dc8d-rlmtk   1/1     Running   0          46s
```

## Install a Milvus cluster

This tutorial uses the default configuration to install a Milvus cluster. All Milvus cluster components are enabled with multiple replicas, which consumes many resources. If you have very limited local resources, you can install a Milvus cluster [using the minimum configuration](https://github.com/milvus-io/milvus-operator/blob/main/config/samples/milvuscluster_minimum.yaml).

### 1. Deploy a Milvus cluster

When Milvus Operator starts, run the following command to deploy a Milvus cluster.

```
$ kubectl apply -f https://raw.githubusercontent.com/milvus-io/milvus-operator/main/config/samples/milvuscluster_default.yaml
```

When the cluster is deployed, you can see the following output.

```
milvuscluster.milvus.io/my-release created
```

### 2. Check the Milvus cluster status

Run the following command to check the status of the Milvus cluster you just deployed.

```
$ kubectl get mc my-release -o yaml
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

Check the status of the Milvus Pods again.

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

When the Milvus cluster is installed, you can learn how to [Connect to Milvus server](connect.md)

## Uninstall the Milvus cluster

Run the following command to uninstall the Milvus cluster.

```
$ kubectl delete mc my-release
```

<div class="alert note">
<li>When you delete the Milvus cluster using the default configuration, dependencies like etcd, Pulsar, and MinIO are not deleted. Therefore, next time when you install the same Milvus cluster instance, these dependencies will be used again. </li>
<li>To delete the dependencies and private virtual clouds (PVCs) along with the Milvus cluster, see [configuration file](https://github.com/milvus-io/milvus-operator/blob/main/config/samples/milvuscluster_deletion.yaml).</li>

</div>


## Delete the K8s cluster

When you no longer need the K8s cluster in the testing environment, you can delete it.

If you use minikube to install the K8s cluster, run $ minikube delete.

If you use kind to install the K8s cluster, run $ kind delete cluster --name myk8s


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
