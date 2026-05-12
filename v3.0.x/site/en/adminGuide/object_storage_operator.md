---
id: object_storage_operator.md
title: Configure Object Storage with Milvus Operator
related_key: minio, s3, storage, etcd, pulsar
summary: Learn how to configure object storage with Milvus Operator.
---

# Configure Object Storage with Milvus Operator

Milvus uses MinIO or S3 as object storage to persist large-scale files, such as index files and binary logs. This topic introduces how to configure object storage dependencies when you install Milvus with Milvus Operator. For more details, refer to [Configure Object Storage with Milvus Operator](https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/object-storage.md) in the Milvus Operator repository.

This topic assumes that you have deployed Milvus Operator.

<div class="alert note">See <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Deploy Milvus Operator</a> for more information. </div>

You need to specify a configuration file for using Milvus Operator to start a Milvus cluster.

```YAML
kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml
```

You only need to edit the code template in `milvus_cluster_default.yaml` to configure third-party dependencies. The following sections introduce how to configure object storage, etcd, and Pulsar respectively.

## Configure object storage

A Milvus cluster uses MinIO or S3 as object storage to persist large-scale files, such as index files and binary logs. Add required fields under `spec.dependencies.storage` to configure object storage, possible options are `external` and `inCluster`.

### Internal object storage

By default, Milvus Operator deploys an in-cluster MinIO for Milvus. The following is an example configuration to demonstrate how to use this MinIO as an internal object storage.

```YAML
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  # Omit other fields ...
  dependencies:
    # Omit other fields ...
    storage:
      inCluster:
        values:
          mode: standalone
          resources:
            requests:
              memory: 100Mi
        deletionPolicy: Delete # Delete | Retain, default: Retain
        pvcDeletion: true # default: false
```

After the above configuration applies, the in-cluster MinIO will run in standalone mode with a memory limit of up to 100Mi. Note that 

- The `deletionPolicy` field specifies the deletion policy of the in-cluster MinIO. It defaults to `Delete` and has `Retain` as the alternative option.

  - `Delete` indicates that the in-cluster object storage is deleted when you stop your Milvus instance. 
  - `Retain` indicates that the in-cluster object storage is retained as the dependency service for later startups of your Milvus instance.

- The `pvcDeletion` field specifies whether to delete the PVC(Persistent Volume Claim) when the in-cluster MinIO is deleted.

The fields under `inCluster.values` are the same as those in Milvus Helm Chart, and you can find them [here](https://github.com/milvus-io/milvus-helm/blob/master/charts/minio/values.yaml).

### External object storage

Using `external` in the template YAML file indicates using an external object storage service. To use an external object storage, you need to properly set fields under `spec.dependencies.storage` and `spec.config.minio` in the Milvus CRD.

#### Use Amazon Web Service (AWS) S3 as external object storage

- Configure AWS S3 Access by AK/SK

  An S3 bucket can usually be accessed by a pair of an access key and an access secret key. You can create a `Secret` object to store them in your Kubernetes as follows:

  ```YAML
  # # change the <parameters> to match your environment
  apiVersion: v1
  kind: Secret
  metadata:
    name: my-release-s3-secret
  type: Opaque
  stringData:
    accesskey: <my-access-key>
    secretkey: <my-secret-key>
  ```

  Then you can configure an AWS S3 bucket as the external object storage:

  ```YAML
  # # change the <parameters> to match your environment
  apiVersion: milvus.io/v1beta1
  kind: Milvus
  metadata:
    name: my-release
    labels:
      app: milvus
  spec:
    # Omit other fields ...
    config:
      minio:
        # your bucket name
        bucketName: <my-bucket>
        # Optional, config the prefix of the bucket milvus will use
        rootPath: milvus/my-release
        useSSL: true
    dependencies:
      storage:
        # enable external object storage
        external: true
        type: S3 # MinIO | S3
        # the endpoint of AWS S3
        endpoint: s3.amazonaws.com:443
        # the secret storing the access key and secret key
        secretRef: "my-release-s3-secret"
  ```

- Configure AWS S3 Access by AssumeRole

  Alternatively, you can make Milvus access your AWS S3 bucket using [AssumeRole](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html), so that only temporary credentials are involved instead of your actual AK/SK. 

  If this is what you prefer, you need to prepare a role on your AWS console and get its ARN, which is usually in the form of `arn:aws:iam::<your account id>:role/<role-name>`.

  Then create a `ServiceAccount` object to store it in your Kubernetes as follows:

  ```YAML
  apiVersion: v1
  kind: ServiceAccount
  metadata:
    name: my-release-sa
    annotations:
      eks.amazonaws.com/role-arn: <my-role-arn>
  ```

  Once all set, reference the above `ServiceAccount` in the template YAML file, and set `spec.config.minio.useIAM` to `true` to enable AssumeRole. 

  ```YAML
  apiVersion: milvus.io/v1beta1
  kind: Milvus
  metadata:
    name: my-release
    labels:
      app: milvus
  spec:
    # Omit other fields ...
    components:
      # use the above ServiceAccount
      serviceAccountName: my-release-sa
    config:
      minio:
        # enable AssumeRole
        useIAM: true
        # Omit other fields ...
    dependencies:
      storage:
        # Omit other fields ...
        # Note: you must use regional endpoint here, otherwise the minio client that milvus uses will fail to connect
        endpoint: s3.<my-bucket-region>.amazonaws.com:443
        secretRef: "" # we don't need to specify the secret here
  ```

#### Use Google Cloud Storage (GCS) as external object storage

AWS S3 object storage is not the only choice. You can also use the object storage service from other public cloud providers, such as Google Cloud. 

- Configure GCS Access by AK/SK

  The configuration is mostly similar to that of using AWS S3. You still need to create a `Secret` object to store your credentials in your Kubernetes. 
  
  ```YAML
  # # change the <parameters> to match your environment
  apiVersion: v1
  kind: Secret
  metadata:
    name: my-release-gcp-secret
  type: Opaque
  stringData:
    accesskey: <my-access-key>
    secretkey: <my-secret-key>
  ```

  Then, you only need to change `endpoint` to `storage.googleapis.com:443` and set `spec.config.minio.cloudProvider` to `gcp` as follows:

  ```YAML
  # # change the <parameters> to match your environment
  apiVersion: milvus.io/v1beta1
  kind: Milvus
  metadata:
    name: my-release
    labels:
      app: milvus
  spec:
    # Omit other fields ...
    config:
      minio:
        cloudProvider: gcp
    dependencies:
      storage:
        # Omit other fields ...
        endpoint: storage.googleapis.com:443
  ```

- Configure GCS Access by AssumeRole

  Similar to AWS S3, you can also use [Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity) to access GCS with temporary credentials if you are using GKE as your Kubernetes cluster.

  The annotation of the `ServiceAccount` is different from that of AWS EKS. You need to specify the GCP service account name instead of the role ARN.

  ```YAML
  apiVersion: v1
  kind: ServiceAccount
  metadata:
    name: my-release-sa
    annotations:
      iam.gke.io/gcp-service-account: <my-gcp-service-account-name>
  ```

  Then, you can configure your Milvus instance to use the above `ServiceAccount` and enable AssumeRole by setting `spec.config.minio.useIAM` to `true` as follows:

  ```YAML
  labels:
      app: milvus
  spec:
    # Omit other fields ...
    components:
      # use the above ServiceAccount
      serviceAccountName: my-release-sa
    config:
      minio:
        cloudProvider: gcp
        # enable AssumeRole
        useIAM: true
        # Omit other fields ...  
  ```

## What's next

Learn how to configure other Milvus dependencies with Milvus Operator:
- [Configure Meta Storage with Milvus Operator](meta_storage_operator.md)
- [Configure Message Storage with Milvus Operator](message_storage_operator.md)
