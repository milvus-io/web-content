---
id: deploy_s3.md
title: Configure Object Storage with Docker Compose or Helm
related_key: S3, storage
summary: Learn how to set up S3 storage for Milvus with Docker Compose or Helm.
---

# Configure Object Storage with Docker Compose or Helm

Milvus uses MinIO for object storage by default, but it also supports using [Amazon Simple Storage Service (S3)](https://aws.amazon.com/s3/) as persistent object storage for log and index files. This topic describes how to configure S3 for Milvus. You can skip this topic if you are satisfied with MinIO.

You can configure S3 with [Docker Compose](https://docs.docker.com/get-started/overview/) or on K8s. 

## Configure S3 with Docker Compose

### 1. Configure S3
[MinIO](https://min.io/product/overview) is compatible with S3. To configure S3 with Docker Compose, provide your values for the <code>minio</code> section in the <code>milvus.yaml</code> file on the milvus/configs path.

```yaml
minio:
  address: <your_s3_endpoint>
  port: <your_s3_port>
  accessKeyID: <your_s3_access_key_id>
  secretAccessKey: <your_s3_secret_access_key>
  useSSL: <true/false>
  bucketName: "<your_bucket_name>"
```
See [MinIO/S3 Configurations](configure_minio.md) for more information.

### 2. Refine docker-compose.yaml
You'd also remove the `MINIO_ADDRESS` environment variable for milvus service at `docker-compose.yaml`. By default milvus will use local minio instead of external S3.

### 3. Run Milvus
Run the following command to start Milvus that uses the S3 configurations.
```shell
docker compose up
```
<div class="alert note">Configurations only take effect after Milvus starts. See <a href=https://milvus.io/docs/install_standalone-docker.md#Start-Milvus>Start Milvus</a> for more information.</div>

## Configure S3 on K8s

For Milvus clusters on K8s, you can configure S3 in the same command that starts Milvus. Alternatively, you can configure S3 using the <code>values.yml</code> file on the /charts/milvus path in the [milvus-helm](https://github.com/milvus-io/milvus-helm) repository before you start Milvus.

 The following table lists the keys for configuring S3 in the YAML file.
| Key             | Description                          | Value                                 |
| --------------------- | ------------------------------------ | ------------------------------------ |
| <code>minio.enabled</code>         | Enables or disables MinIO.       | <code>true</code>/<code>false</code> |
| <code>externalS3.enabled</code>    | Enables or disables S3.          | <code>true</code>/<code>false</code> |
| <code>externalS3.host</code>       | The endpoint to access S3.       |                                      |
| <code>externalS3.port</code>       | The port to access S3.           |                                      |
| <code>externalS3.rootPath</code>   | The root path of the S3 storage. | An emtpy string by default.          | 
| <code>externalS3.accessKey</code>  | The access key ID for S3.        |                                      |
| <code>externalS3.secretKey</code>  | The secret access key for S3.    |                                      |
| <code>externalS3.bucketName</code> | The name of the S3 bucket.       |                                      |
| <code>externalS3.useSSL</code>     | Whether to use SSL when connecting | The values defaults to <code>false</code> |


### Using the YAML file

1. Configure the <code>minio</code> section in the <code>values.yaml</code> file.

```yaml
minio:
  enabled: false
```

2. Configure the <code>externalS3</code> section using your values in the <code>values.yaml</code> file.

```yaml
externalS3:
  enabled: true
  host: "<your_s3_endpoint>"
  port: "<your_s3_port>"
  accessKey: "<your_s3_access_key_id>"
  secretKey: "<your_s3_secret_key>"
  useSSL: <true/false>
  bucketName: "<your_bucket_name>"
```

3. After configuring the preceding sections and saving the <code>values.yaml</code> file, run the following command to install Milvus that uses the S3 configurations.

```shell
helm install <your_release_name> milvus/milvus -f values.yaml
```
### Using a command

To install Milvus and configure S3, run the following command using your values.

```shell
helm install <your_release_name> milvus/milvus --set cluster.enabled=true  --set minio.enabled=false --set externalS3.enabled=true --set externalS3.host=<your_s3_endpoint> --set externalS3.port=<your_s3_port> --set externalS3.accessKey=<your_s3_access_key_id> --set externalS3.secretKey=<your_s3_secret_key> --set externalS3.bucketName=<your_bucket_name>
```
## What's next

Learn how to configure other Milvus dependencies with Docker Compose or Helm:
- [Configure Meta Storage with Docker Compose or Helm](deploy_etcd.md)
- [Configure Message Storage with Docker Compose or Helm](deploy_pulsar.md)
