---
id: object_storage_operator.md
title: Configure Object Storage with Milvus Operator
related_key: minio, s3, storage, etcd, pulsar
summary: Learn how to configure object storage with Milvus Operator.
---

# Configure Object Storage with Milvus Operator

Milvus uses MinIO or S3 as object storage to persist large-scale files, such as index files and binary logs. This topic introduces how to configure object storage dependencies when you install Milvus with Milvus Operator.

This topic assumes that you have deployed Milvus Operator.

<div class="alert note">See <a href="https://milvus.io/docs/v2.0.x/install_cluster-milvusoperator.md">Deploy Milvus Operator</a> for more information. </div>

You need to specify a configuration file for using Milvus Operator to start a Milvus cluster.

```YAML
kubectl apply -f https://raw.githubusercontent.com/milvus-io/milvus-operator/main/config/samples/milvuscluster_default.yaml
```

You only need to edit the code template in `milvuscluster_default.yaml` to configure third-party dependencies. The following sections introduce how to configure object storage, etcd, and Pulsar respectively.

## Configure object storage

A Milvus cluster uses MinIO or S3 as object storage to persist large-scale files, such as index files and binary logs. Add required fields under `spec.dependencies.storage` to configure object storage.

`storage` supports  `external` and `inCluster`.

### External object storage

`external` indicates using an external object storage service. 

Fields used to configure an external object storage service include:

- `external`: A `true` value indicates that Milvus uses an external storage service.
- `type`: Specifies Milvus uses whether S3 or MinIO as object storage.
- `secretRef`: The secret reference that the object storage service uses.
- `endpoint`: The endpoint of the object storage service.

#### Example

The following example configures an external object storage service.

```YAML
kind: MilvusCluster

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

kind: MilvusCluster

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

<div class="alert note">In this example, <code>inCluster.deletionPolicy</code> defines a deleletion policy for data. <code>inCluster.values.resources</code> defines the compute resources that MinIO uses. <code>inCluster.values.statefulset.replicaCount</code> defines the number of replicas of MinIO on each drive.</div>

<div class="alert note">Find the complete configuration items to configure an internal MinIO service in <a href="https://github.com/milvus-io/milvus-operator/blob/main/config/assets/charts/minio/values.yaml">values.yaml</a>. Add configuration items as needed under <code>storage.inCluster.values</code> as shown in the preceding example.</div>

Assuming that the configuration file is named `milvuscluster.yaml`, run the following command to apply the configuration.

```Shell
kubectl apply -f milvuscluster.yaml
```

<div class="alert note">If <code>my-release</code> is an existing Milvus cluster, <code>milvuscluster.yaml</code> overwrites its configuration. Otherwise, a new Milvus cluster is created.</div>
