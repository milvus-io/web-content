---
id: install_cluster-milvusoperator.md
label: Milvus Operator
related_key: Kubernetes
order: 2
group: install_cluster-docker.md
summary: Learn how to install Milvus cluster on Kubernetes using Milvus Operator
---

<div class="tab-wrapper"><a href="install_cluster-docker.md" class=''>Docker Compose</a><a href="install_cluster-helm.md" class=''>Helm</a><a href="install_cluster-milvusoperator.md" class='active '>Milvus Operator</a><a href="install_cluster-ansible.md" class=''>Ansible</a></div>

# Install Milvus Cluster with Milvus Operator

This topic introduces how to deploy a Milvus cluster with Milvus Operator on Kubernetes.

Milvus Operator allows you to deploy and manage a full Milvus service stack to a target K8s cluster. The stack includes all Milvus components and relevant dependencies like etcd, Pulsar, and MinIO. 

Milvus Operator defines a Milvus cluster custom resources on top of [Kubernetes Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/). When the custom resources are defined, you can use Kubernetes APIs in a declarative way and manage the Milvus deployment stack to ensure its scalability and high availability.

## Prerequisites
- [Check the requirements for hardware and software](prerequisite-helm.md) prior to your installation.
- Ensure that you can access the K8s cluster via `kubectl` or `helm`. 
- Ensure the StorageClass dependency is installed as Milvus clusters depend on Default StorageClass for data persistence. minikube has a dependency on default StorageClass when installed. Check the dependency by running the following command. If StorageClass is installed, you will see the following output. If not, see [Change the default StorageClass](https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/) for more information.

```
$ kubectl get sc
```

```
NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             false                    3m36s
``` 

## Start a K8s cluster

<div class="alert note">
This topic uses a local Kubernetes cluster based on minikube. minikube can only be used in test environments. You can deploy a Milvus cluster on your own Kubernetes cluster.
</div>

```
$ minikube start
```

## Install Milvus Operator

There are two ways to install Milvus Operator on Kubernetes: 

- with helm chart
- with `kubectl` command directly with raw manifests

### 1. Install by helm command

```
helm install milvus-operator \
  -n milvus-operator --create-namespace \
  --wait --wait-for-jobs \
  https://github.com/milvus-io/milvus-operator/releases/download/v0.5.0/milvus-operator-0.5.0.tgz
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

### 2. Install by `kubectl` command

```
$ kubectl apply -f https://raw.githubusercontent.com/milvus-io/milvus-operator/v0.5.0/deploy/manifests/deployment.yaml
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

## Check Milvus Operator status

Run `$ kubectl get -n milvus-operator deploy/milvus-operator` to check if Milvus Operator is running. You can see the following output if Milvus Operator is running.

```
NAME              READY   UP-TO-DATE   AVAILABLE   AGE
milvus-operator   1/1     1            1           32s
```

## Install a Milvus cluster

This tutorial uses the default configuration to install a Milvus cluster. All Milvus cluster components are enabled with multiple replicas, which consumes many resources. If you have very limited local resources, you can install a Milvus cluster [using the minimum configuration](https://github.com/milvus-io/milvus-operator/blob/main/config/samples/milvus_cluster_minimum.yaml).

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

Run the following command to check the status of the Milvus cluster you have just deployed.

```
$ kubectl get mc my-release -o yaml
```

You can confirm the current status of Milvus cluster from the `status` field in the output. When the Milvus cluster is still under creation, the `status` shows `Unhealthy`.

```
apiVersion: milvus.io/v1beta1
kind: Milvus
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
    reason: MsgStreamNotReady
    status: "False"
    type: MsgStreamReady
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

Milvus Operator first creates all dependencies like etcd, Pulsar, and MinIO, and then continues to create Milvus components. Therefore, you can only see the pods of etcd, Pulsar, and MinIO now. Once all dependencies are enabled, Milvus Operator will start all Milvus components. The status of the Milvus cluster is shown in the following output.

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

When all components are enabled, the `status` of the Milvus cluster shows `Healthy`.

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

Run the following command to uninstall Milvus Operator.

### Uninstall Milvus Operator by helm command

```
$ helm -n milvus-operator uninstall milvus-operator
```

### Uninstall Milvus Operator by `kubectl` command

```
$ kubectl delete -f https://raw.githubusercontent.com/milvus-io/milvus-operator/v0.5.0/deploy/manifests/deployment.yaml
```


## Delete the K8s cluster

When you no longer need the K8s cluster in the test environment, you can delete it, run `$ minikube delete` to delete it.


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


  
  
  











