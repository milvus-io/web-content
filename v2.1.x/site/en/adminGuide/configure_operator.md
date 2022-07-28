---
id: configure_operator.md
title: Configure Milvus with Milvus Operator
related_key: Milvus Operator
summary: Learn how to configure Milvus with Milvus Operator.
---

# Configure Milvus with Milvus Operator

In production environment, you need to allocate resources to the Milvus cluster based on machine type and workload. You can configure during deployment or update the configurations while the cluster is running.

This topic introduces how to configure a Milvus cluster when you install it with Milvus Operator.

This topic assumes that you have deployed Milvus Operator. See [Deploy Milvus Operator](https://milvus.io/docs/v2.0.x/install_cluster-milvusoperator.md) for more information.

Configuring a Milvus cluster with Milvus Operator includes:
- Global resource configurations
- Private resource configurations

<div class="alert note">
Private resource configurations will overwrite global resource configurations. If you configure the resources globally and specify the private resource of a certain component at the same time, the component will prioritize and respond to the private configurations first.
</div>

## Configure global resources

When using Milvus Operator to start a Milvus cluster, you need to specify a configuration file. The example here uses the default configuration file.

```yaml
kubectl apply -f https://raw.githubusercontent.com/milvus-io/milvus-operator/main/config/samples/milvuscluster_default.yaml
```

The details of the configuration file is as follows:

```yaml
apiVersion: milvus.io/v1alpha1
kind: MilvusCluster
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies: {}
  components: {}
  config: {}
```

The field `spec.components` includes both the global and private resource configuration of all Milvus components. Fields used to configure global resource include:
- `image`: The Milvus docker image used.
- `resources`: The compute resources allocated to each component.
- `tolerations` and `nodeSelector`: The scheduling rules of each Milvus component in the K8s cluster. See [tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) and [nodeSelector](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/) for more information.
- `env`: The environment variables. 

To configure global resource for Milvus cluster, create a `milvuscluster_resource.yaml` file. 

### Example

The following example configures global resource for a Milvus cluster.

```
apiVersion: milvus.io/v1alpha1
kind: MilvusCluster
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  components:
    image: milvusdb/milvus:v2.0.0-rc8-20211104-d1f4106
    nodeSelector: {}
    tolerations: {}
    env: {}
    resources:
      limits:
        cpu: '4'
        memory: 8Gi
      requests:
        cpu: 200m
        memory: 512Mi
```

Run the following command to apply new configurations:

```
kubectl apply -f milvuscluster_resource.yaml
```

<div class="alert note">
Cluster resources will be updated according to the configuration file if there is a Milvus cluster named <code>my-release</code> in the K8s cluster. Otherwise, a new Milvus cluster will be created.
</div>

## Configure private resources

A Milvus cluster includes eight components: proxy, root coord, index coord, data coord, query coord, index node, data node, and query node.

Common fields used to configure each component include:
- `replica`: The number of replicas of each component.
- `port`: The listen port number of each component.
- Fields used in global resource configuration: `image`, `env`, `nodeSelector`, `tolerations`, `resources` (see above).

<div class="alert note">
In addition, when configuring proxy, there is an extra field serviceType. This field defines the type of service Milvus provides in the K8s cluster.
</div>

To configure resources for a specific component, add the component name in the field under `spec.componets` first and then configure its private resources.

### Example

The example below configures the replicas and compute resources of proxy and datanode in the `milvuscluster.yaml` file.

```
apiVersion: milvus.io/v1alpha1
kind: MilvusCluster
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  components:
    image: milvusdb/milvus:v2.0.0-rc8-20211104-d1f4106
    resources:
      limits:
        cpu: '4'
        memory: 8Gi
      requests:
        cpu: 200m
        memory: 512Mi
    rootCoord: 
      replicas: 1
      port: 8080
      resources:
        limits:
          cpu: '6'
          memory: '10Gi'
    dataCoord: {}
    queryCoord: {}
    indexCoord: {}
    dataNode: {}
    indexNode: {}
    queryNode: {}
    proxy:
      replicas: 1
      serviceType: ClusterIP
      resources:
        limits:
          cpu: '2'
          memory: 4Gi
        requests:
          cpu: 100m
          memory: 128Mi
  config: {}
  dependencies: {}
```

<div class="alert note">
This example configures not only global resources but also private compute resources for root coord and proxy. When using this configuration file to start a Milvus cluster, the private resources configurations will be applied to root coord and proxy, while the rest of the components will follow the global resource configuration.
</div>

Run the following command to apply new configurations:

```
kubectl apply -f milvuscluster.yaml
```





