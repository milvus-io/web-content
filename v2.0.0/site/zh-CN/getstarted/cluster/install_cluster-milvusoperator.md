---
id: install_cluster-milvusoperator.md
label: Milvus Operator
related_key: Kubernetes
order: 2
group: cluster
summary: 了解如何使用 Milvus Operator 在 Kubernetes 上安装 Milvus 集群
---

# 安装分布式版 Milvus

你可以使用 Docker Compose 或 Kubernetes 安装 Milvus 分布式版。安装前，请先阅读[安装前提](prerequisite-docker.md)。

你也可以[从源代码编译 Milvus](https://github.com/milvus-io/milvus#to-start-developing-milvus)。


<div class="tab-wrapper"><a href="install_cluster-docker.md" class=''>Docker Compose</a><a href="install_cluster-helm.md" class=''>Helm</a><a href="install_cluster-milvusoperator.md" class='active '>Milvus Operator</a></div>

## 创建 Kubernetes 集群

如果已经在生产环境中创建了 K8s 集群，你可以跳过此步骤，直接开始[部署 Milvus Operator](install_cluster-milvusoperator.md#部署-Milvus-Operator)。如未创建 K8s 集群，你可以根据以下步骤快速创建一个用于测试的 K8s 集群，并使用其安装分布式版 Milvus。本文将介绍两种创建 K8s 集群的方法：

- 使用 minikube 在虚拟机中创建 Kubernetes 集群
- 使用 kind 在 docker 中创建 Kubernetes 集群

<div class="alert note">
使用 minikube 及 kind 创建的集群只可用于测试，<b>不可以</b>用在生产环境中。
</div>

### 使用 minikube 在虚拟机中创建 K8s 集群

[minikube](https://minikube.sigs.k8s.io/docs/) 是一种可以让你在本地轻松运行 Kubernetes 的工具。


#### 1. 安装 minikube


更多细节参考 [安装前提](prerequisite-helm.md#Software-requirements)。

#### 2. 使用 minikube 启用 K8s 集群

安装 minikube 后，运行如下指令，启用 K8s 集群。


```
$ minikube start
```

成功启用 K8s 集群后，你可以看到如下结果。输出结果可能根据你的操作系统和虚拟机监控器会有所不同。

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

#### 3. 检查 K8s 集群状态

运行命令 `$ kubectl cluster-info` ，检查你所创建的 K8s 集群状态。确保你可以使用 `kubectl` 访问 K8s 集群。输出结果如下：

```
Kubernetes control plane is running at https://127.0.0.1:63754
KubeDNS is running at https://127.0.0.1:63754/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

### 使用 kind 创建 K8s 集群

[kind](https://kind.sigs.k8s.io/) 是一种使用 Docker 容器作为 node 节点，运行本地Kubernetes 集群的工具。

#### 1. 创建配置文件

创建 `kind.yaml` 配置文件。

```
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
- role: worker
```

#### 2. 创建 K8s 集群

使用 `kind.yaml` 配置文件创建 K8s 集群。

```
$ kind create cluster --name myk8s --config kind.yaml
```

成功启动 K8s 集群后，可以看到如下结果： 

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

#### 3. 检查 K8s 集群状态

运行指令 `$ kubectl cluster-info`，检查你所创建的 K8s 集群状态。确保你可以使用 `kubectl` 访问 K8s 集群。输出结果如下：

```
Kubernetes control plane is running at https://127.0.0.1:55668
CoreDNS is running at https://127.0.0.1:55668/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

## 部署 Milvus Operator

Milvus Operator 解决方案能够帮助你在目标 K8s 集群上部署 Milvus 服务栈，包含所有 Milvus 组件及 etcd、Pulsar、MinIO 等相关第三方组件。Milvus Operator 会在 [Kubernetes 自定义资源](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) 基础上定义 Milvus 集群的自定义资源。定义资源后，你可以声明式使用 K8s API 并管理 Milvus 部署栈以确保服务可扩展和高可用。


### 部署前提

- 确保你可以使用 `kubectl` 访问 K8s 集群。
- 确保已经安装 StorageClass 组件。minikube 及 kind 默认安装 Storageclass 组件。 运行指令 `kubectl get sc`，检查是否已安装 Storageclass 组件。如已安装，你可以看到如下结果。如未安装，请手动配置 sStorageclass。 详见[改变默认 StorageClass](https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/)。

```
NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             false                    3m36s
```

### 1. 安装 cert-manager

Milvus Operator 使用 [cert-manager](https://cert-manager.io/docs/installation/supported-releases/) 为 webhook 服务生成证书。运行如下指令，安装 cert-manager。

```
$ kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.5.3/cert-manager.yaml
```

安装成功后，你可以看到如下结果： 

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
需要安装 cert-manager 1.13 或以上版本。
</div>

运行指令 `$ kubectl get pods -n cert-manager`，检查 cert-manager 是否正在运行。如果正在运行，你可以看到所有 pods 都在运行中，如下所示：

```
NAME                                      READY   STATUS    RESTARTS   AGE
cert-manager-848f547974-gccz8             1/1     Running   0          70s
cert-manager-cainjector-54f4cc6b5-dpj84   1/1     Running   0          70s
cert-manager-webhook-7c9588c76-tqncn      1/1     Running   0          70s
```

### 2. 安装 Milvus Operator

运行如下指令，安装 Milvus Operator。

```
$ kubectl apply -f https://raw.githubusercontent.com/milvus-io/milvus-operator/main/deploy/manifests/deployment.yaml
```

安装成功后，你可以看到如下结果： 

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

运行指令 `$ kubectl get pods -n milvus-operator`，检查 Milvus Operator 是否正在运行。如果正在运行中，你可以看到 Milvus Operator 的 pod 正在运行中，如下所示：

```
NAME                                                  READY   STATUS    RESTARTS   AGE
milvus-operator-controller-manager-698fc7dc8d-rlmtk   1/1     Running   0          46s
```

## 安装分布式版 Milvus 

本文在安装分布式版 Milvus 时使用了默认配置。所有 Milvus 组件均启用了多个副本，这会消耗大量资源。本地资源有限时，你可以 [使用最低配置](https://github.com/milvus-io/milvus-operator/blob/main/config/samples/milvuscluster_minimum.yaml) 安装分布式版 Milvus。 

### 1. 部署 Milvus 集群

启用 Milvus Operator 后，运行如下指令，部署 Milvus 集群。

```
$ kubectl apply -f https://raw.githubusercontent.com/milvus-io/milvus-operator/main/config/samples/milvuscluster_default.yaml
```

部署完毕后，你可以看到如下结果： 

```
milvuscluster.milvus.io/my-release created
```

### 2. 检查 Milvus 集群状态

运行如下指令，检查 Milvus 集群状态。

```
$ kubectl get mc my-release -o yaml
```

你可以通过输出结果中 `status` 一栏确认 Milvus 集群的当前状态。如果 Milvus 集群还在创建中，`status` 一栏会显示 `Unhealthy`。

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
  
运行如下指令，检查 Milvus pod 当前状态。

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


### 3. 启用 Milvus 组件

Milvus Operator 会先创建 etcd、Pulsar、MinIO 等第三方组件，随后再创建 Milvus 组件。因此，目前你仅能看到 etcd、Pulsar 及 MinIO 的 pod。Milvus Operator 会在所有第三方组件启用后启动 Milvus 组件。Milvus 集群状态如下所示： 
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

再次检查 Milvus Pods 状态。

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

所有组建启用后，Milvus 集群的 `status` 显示为 `Healthy`。

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

再次检查 Milvus pod 状态。你可以看到所有 pod 都在运行中。 

```
$ kubectl get pods
```

```
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

安装分布式版 Milvus 后，你可以学习如何 [管理 Milvus 连接](manage_connection.md)

## 卸载分布式版 Milvus

运行如下指令，卸载分布式版 Milvus。

```
$ kubectl delete mc my-release
```

<div class="alert note">
<li>使用默认配置删除 Milvus 实例时，不会一同删除 etcd、Pulsar、MinIO 等其他第三方组件。因此，下次安装 Milvus 实例时，可再次使用上述第三方组件。. </li>
<li>如需同时在虚拟私有云（PVC）中删除第三方组件，详见 [配置文件](https://github.com/milvus-io/milvus-operator/blob/main/config/samples/milvuscluster_deletion.yaml).</li>

</div>


## 删除 K8s 集群

无需再使用测试环境中的 K8s 集群时，你可以删除集群。

如果你使用 minikube 安装 K8s 集群，运行指令 `$ minikube delete`。

如果你使用 kind 安装 K8s 集群，运行指令 `$ kind delete cluster --name myk8s`。


## 更多内容

安装 Milvus 后，你可以：
- 阅读 [Hello Milvus](example_code.md)，使用不同语言的 SDK 运行示例代码，探索 Milvus 功能。
- 学习 Milvus 基本操作:
  - [管理 Milvus 连接](manage_connection.md)
  - [向量搜索](search.md)
  - [混合搜索](hybridsearch.md)
- [使用 Helm Chart 升级 Milvus2.0 版本](upgrade.md).
- [对 Milvus 集群进行扩所容](scaleout.md).
- 在云端部署 Milvus 集群：
  - [Amazon EC2](aws.md)
  - [Amazon EKS](eks.md)
- 了解如何使用开源工具 [MilvusDM](migrate_overview.md)将数据导入或导出 Milvus。
- [部署监控](monitor.md).
