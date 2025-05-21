---
id: operator.md
title: Configure Dependencies with Milvus Operator
related_key: minio, s3, storage, etcd, pulsar
summary: Learn how to configure dependencies with Milvus Operator.
deprecate: true
---

# Configure Dependencies with Milvus Operator

Milvus cluster depends on components including object storage, etcd, and Pulsar. This topic introduces how to configure these dependencies when you install Milvus with Milvus Operator.

This topic assumes that you have deployed Milvus Operator.

<div class="alert note">See <a href="https://milvus.io/docs/v2.5.10/install_cluster-milvusoperator.md">Deploy Milvus Operator</a> for more information. </div>

You need to specify a configuration file for using Milvus Operator to start a Milvus cluster.

```YAML
kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvuscluster_default.yaml
```

You only need to edit the code template in `milvuscluster_default.yaml` to configure third-party dependencies. The following sections introduce how to configure object storage, etcd, and Pulsar respectively.

## Configure object storage

A Milvus cluster uses MinIO or S3 as object storage to persist large-scale files, such as index files and binary logs. Add required fields under `spec.dependencies.storage` to configure object storage.

`storage` supports  `external` and `inCluster`.

### External object storage

`external` indicates using an external object storage service. 

Fields used to configure an external object storage service include:

- `external`: A `true` value indicates that Milvus uses an external storage service.
- `type`: Specifies whether Milvus uses S3 or MinIO as object storage.
- `secretRef`: The secret reference that the object storage service uses.
- `endpoint`: The endpoint of the object storage service.

#### Example

The following example configures an external object storage service.

```YAML
kind: Milvus

metadata:

  name: my-release

  labels:

    app: milvus

spec:

  dependencies: # Optional

    storage: # Optional

      # Whether (=true) to use an existed external storage as specified in the field endpoints or 

      # (=false) create a new storage inside the same kubernetes cluster for milvus.

      external: true # Optional default=false

      type: "MinIO" # Optional ("MinIO", "S3") default:="MinIO"

      # Secret reference of the storage if it has

      secretRef: mySecret # Optional

      # The external storage endpoint if external=true

      endpoint: "storageEndpoint"

  components: {}

  config: {}
```

### Internal object storage

`inCluster` indicates when a Milvus cluster starts, a MinIO service starts automatically in the cluster.

<div class="alert note">A Milvus cluster only supports using MinIO as the internal object storage service.</div>

#### Example

The following example configures an internal MinIO service.

```YAML
apiVersion: milvus.io/v1alpha1

kind: Milvus

metadata:

  name: my-release

  labels:

    app: milvus

spec:

  dependencies:

    storage: #

      external: false 

      type: "MinIO" # Optional ("MinIO", "S3") default:="MinIO"

      inCluster: 

        # deletionPolicy of storage when the milvus cluster is deleted

        deletionPolicy: Retain # Optional ("Delete", "Retain") default="Retain"

        # When deletionPolicy="Delete" whether the PersistantVolumeClaim shoud be deleted when the storage is deleted

        pvcDeletion: false

        values:

          resources:

             limits: 

              cpu: '2'

              memory: 6Gi

            requests:

              cpu: 100m

              memory: 512Mi

          statefulset:

            replicaCount: 6

  components: {}

  config: {}    
```

<div class="alert note">In this example, <code>inCluster.deletionPolicy</code> defines a deletion policy for data. <code>inCluster.values.resources</code> defines the compute resources that MinIO uses. <code>inCluster.values.statefulset.replicaCount</code> defines the number of replicas of MinIO on each drive.</div>

<div class="alert note">Find the complete configuration items to configure an internal MinIO service in <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/minio/values.yaml">values.yaml</a>. Add configuration items as needed under <code>storage.inCluster.values</code> as shown in the preceding example.</div>

Assuming that the configuration file is named `milvuscluster.yaml`, run the following command to apply the configuration.

```Shell
kubectl apply -f milvuscluster.yaml
```

<div class="alert note">If <code>my-release</code> is an existing Milvus cluster, <code>milvuscluster.yaml</code> overwrites its configuration. Otherwise, a new Milvus cluster is created.</div>

## Configure etcd

etcd stores metadata of components in a Milvus cluster. Add required fields under `spec.dependencies.etcd` to configure etcd.

`etcd` supports `external` and `inCluster`.

Fields used to configure an external etcd service include:

- `external`: A `true` value indicates that Milvus uses an external etcd service.
- `endpoints`: The endpoints of etcd.

### External etcd

#### Example

The following example configures an external etcd service.

```YAML
kind: Milvus

metadata:

  name: my-release

  labels:

    app: milvus


spec:

  dependencies: # Optional

    etcd: # Optional

      # Whether (=true) to use an existed external etcd as specified in the field endpoints or 

      # (=false) create a new etcd inside the same kubernetes cluster for milvus.

      external: true # Optional default=false

      # The external etcd endpoints if external=true

      endpoints:

      - 192.168.1.1:2379

  components: {}

  config: {}
```
### Internal etcd

`inCluster` indicates when a Milvus cluster starts, an etcd service starts automatically in the cluster.

#### Example

The following example configures an internal etcd service.

```YAML
apiVersion: milvus.io/v1alpha1

kind: Milvus

metadata:

  name: my-release

  labels:

    app: milvus

spec:

  dependencies:

    etcd:

      inCluster:

        values:

          replicaCount: 5

          resources:

            limits: 

              cpu: '4'

              memory: 8Gi

            requests:

              cpu: 200m

              memory: 512Mi

  components: {}

  config: {}              
```

<div class="alert note">The preceding example specifies the number of replicas as <code>5</code> and limits the compute resources for etcd.</div>

<div class="alert note">Find the complete configuration items to configure an internal etcd service in <a href="https://github.com/zilliztech/milvus-operator/blob/main/config/assets/charts/etcd/values.yaml">values.yaml</a>. Add configuration items as needed under <code>etcd.inCluster.values</code> as shown in the preceding example.</div>

Assuming that the configuration file is named `milvuscluster.yaml`, run the following command to apply the configuration.

```Shell
kubectl apply -f milvuscluster.yaml
```

## Configure Pulsar

Pulsar manages logs of recent changes, outputs stream logs, and provides log subscriptions. Add required fields under `spec.dependencies.pulsar` to configure Pulsar.
`pulsar` supports `external` and `inCluster`.

### External Pulsar

`external` indicates using an external Pulsar service. 
Fields used to configure an external Pulsar service include:

- `external`:  A `true` value indicates that Milvus uses an external Pulsar service.
- `endpoints`: The endpoints of Pulsar.

####  Example

The following example configures an external Pulsar service.

```YAML
apiVersion: milvus.io/v1alpha1

kind: Milvus

metadata:

  name: my-release

  labels:

    app: milvus

spec:

  dependencies: # Optional

    pulsar: # Optional

      # Whether (=true) to use an existed external pulsar as specified in the field endpoints or 

      # (=false) create a new pulsar inside the same kubernetes cluster for milvus.

      external: true # Optional default=false

      # The external pulsar endpoints if external=true

      endpoints:

      - 192.168.1.1:6650

  components: {}

  config: {}           
```

### Internal Pulsar

`inCluster` indicates when a Milvus cluster starts, a Pulsar service starts automatically in the cluster.

#### Example 

The following example configures an internal Pulsar service.

```YAML
apiVersion: milvus.io/v1alpha1

kind: Milvus

metadata:

  name: my-release

  labels:

    app: milvus

spec:

  dependencies:

    pulsar:

      inCluster:

        values:

          components:

            autorecovery: false

          zookeeper:

            replicaCount: 1

          bookkeeper:

            replicaCount: 1

            resoureces:

              limit:

                cpu: '4'

              memory: 8Gi

            requests:

              cpu: 200m

              memory: 512Mi

          broker:

            replicaCount: 1

            configData:

              ## Enable `autoSkipNonRecoverableData` since bookkeeper is running

              ## without persistence

              autoSkipNonRecoverableData: "true"

              managedLedgerDefaultEnsembleSize: "1"

              managedLedgerDefaultWriteQuorum: "1"

              managedLedgerDefaultAckQuorum: "1"

          proxy:

            replicaCount: 1

  components: {}

  config: {}            
```

<div class="alert note">This example specifies the numbers of replicas of each component of Pulsar, the compute resources of Pulsar BookKeeper, and other configurations.</div>

<div class="alert note">Find the complete configuration items to configure an internal Pulsar service in <a href="https://github.com/zilliztech/milvus-operator/blob/main/config/assets/charts/pulsar/values.yaml">values.yaml</a>. Add configuration items as needed under <code>pulsar.inCluster.values</code> as shown in the preceding example.</div>

Assuming that the configuration file is named `milvuscluster.yaml`, run the following command to apply the configuration.

```Shell
kubectl apply -f milvuscluster.yaml
```

## What's next

If you want to learn how to configure dependencies with `milvus.yaml`, see [System Configuration](system_configuration.md).
