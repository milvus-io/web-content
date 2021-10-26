---
id: deploy_s3.md
title: Set up S3 Storage for Milvus
related_key: S3 storage for Milvus
summary: Learn how to set up S3 storage for Milvus.
---

# Set Up Storage

Milvus supports using [Amazon Simple Storage Service (S3)](https://aws.amazon.com/s3/) as persistent storage for log and index files. This topic describes how to set up S3 for Milvus. 

You can set up S3 with [Docker Compose](https://docs.docker.com/get-started/overview/) or on K8s. 

## Set up with Docker Compose

### 1. Configure S3
[MinIO](https://min.io/product/overview) is compatible with S3. To set up S3 with Docker Compose, provide appropriate values for the **minio** service in the **milvus.yaml** file on the **milvus/configs** path.

```yaml
minio:
  address: <your_s3_endpoint>
  port: <your_s3_port>
  accessKeyID: <your_s3_access_key_id>
  secretAccessKey: <your_s3_secret_access_key>
  useSSL: <true/false>
  bucketName: "<your_bucket_name>"
```
See [MinIO/S3 Configurations](configuration_standalone-advanced.md#MinIOS3-Configurations) for more information.


### 2. Run Milvus
Run the following command to start Milvus that uses the S3 configurations.
```shell
docker-compose up
```
<div class="alert note">Configurations only take effect after Milvus starts. See <a herf=https://milvus.io/docs/v2.0.0/install_cluster-docker.md#2-Start-Milvus>Start Milvus</a> for more information.</div>

## Set up on K8s

For Milvus clusters on K8s, you can configure S3 in the same command that starts Milvus. Alternatively, you can configure S3 using the **values.yml** file on the **/charts/milvus** path in the [milvus-helm](https://github.com/milvus-io/milvus-helm) repository before you start Milvus.

 The following table lists the keys for configuring S3 in the YAML file.
| Key             | Description                          | Value                                 |
| --------------------- | ------------------------------------ | ------------------------------------ |
| externalS3.enabled    | Enables or disables S3.     | true/false |
| externalS3.host       | The endpoint to access S3.    |                                      |
| externalS3.port       | The port to access S3.     |                                      |
| externalS3.accessKey  | The access key ID for S3. |                                      |
| externalS3.secretKey  | The secret access key for S3.            |                                      |
| externalS3.bucketName | The name of the S3 bucket.                  |                                      |
| minio.enabled         | Enables or disables MinIO.       |  true/false |


### Using the YAML file

1. Configure the **minio** service in the **values.yaml** file.

```yaml
minio:
  enabled: false
```

2. Configure the **externalS3** service using appropriate values in the **values.yaml** file.

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

3. After configuring the preceding services and saving the **values.yaml** file, run the following command to install Milvus that uses the S3 configurations.

```shell
helm install <your_release_name> milvus/milvus -f values.yaml
```
### Using a command

To install Milvus and configure S3, run the following command using appropriate values.

```shell
helm install <your_release_name> milvus/milvus --set cluster.enabled=true --set externalS3.enabled=true --set externalS3.host='<your_s3_endpoint>' --set externalS3.port=<your_s3_port> --set externalS3.accessKey=<your_s3_access_key_id> --set externalS3.secretKey=<your_s3_secret_key> --set externalS3.bucketName=<your_bucket_name> --set minio.enabled=false
```
