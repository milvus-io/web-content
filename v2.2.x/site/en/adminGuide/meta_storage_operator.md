---
id: meta_storage_operator.md
title: Configure Meta Storage with Milvus Operator
related_key: minio, s3, storage, etcd, pulsar
summary: Learn how to configure meta storage with Milvus Operator.
---

# Configure Meta Storage with Milvus Operator

Milvus uses etcd for storing metadata. This topic introduces how to configure meta storage dependency when you install Milvus with Milvus Operator. For more details, refer to [Configure Meta Storage with Milvus Operator](https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/meta-storage.md) in the Milvus Operator repository.

This topic assumes that you have deployed Milvus Operator.

<div class="alert note">See <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Deploy Milvus Operator</a> for more information. </div>

You need to specify a configuration file for using Milvus Operator to start a Milvus cluster.

```YAML
kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml
```

You only need to edit the code template in `milvus_cluster_default.yaml` to configure third-party dependencies. The following sections introduce how to configure object storage, etcd, and Pulsar respectively.


## Configure etcd

Add required fields under `spec.dependencies.etcd` to configure etcd.

`etcd` supports `external` and `inCluster`.

Fields used to configure an external etcd service include:

- `external`: A `true` value indicates that Milvus uses an external etcd service.
- `endpoints`: The endpoints of etcd.

### External etcd

#### Example

The following example configures an external etcd service.

```YAML
kind: MilvusCluster
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
kind: MilvusCluster
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

<div class="alert note">Find the complete configuration items to configure an internal etcd service in <a href="https://github.com/bitnami/charts/blob/ba6f8356e725a8342fe738a3b73ae40d5488b2ad/bitnami/etcd/values.yaml">values.yaml</a>. Add configuration items as needed under <code>etcd.inCluster.values</code> as shown in the preceding example.</div>

Assuming that the configuration file is named `milvuscluster.yaml`, run the following command to apply the configuration.

```Shell
kubectl apply -f milvuscluster.yaml
```

## What's next

Learn how to configure other Milvus dependencies with Milvus Operator:
- [Configure Object Storage with Milvus Operator](object_storage_operator.md)
- [Configure Message Storage with Milvus Operator](message_storage_operator.md)
