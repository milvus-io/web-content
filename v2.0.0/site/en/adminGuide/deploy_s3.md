---
id: deploy_s3.md
title: Set up S3 Storage for Milvus
related_key: S3 storage for Milvus
summary: Learn how to set up S3 storage for Milvus.
---

# Set up S3

Milvus supports using Amazon Simple Storage Service (S3) as persistent storage for log and index files. This topic describes how to set up S3 for Milvus. 

## Set up S3 with Docker Compose

To set up S3 with Docker Compose, change the configurations of MinIO or S3 in the **milvus.yaml** file on the **milvus/configs** path.

MinIO is compatible with S3. To configure S3, modify the minio dictionary. 

```yaml
minio:
  address: <your_s3_endpoint>
  port: <your_s3_port>
  accessKeyID: <your_s3_access_key_id>
  secretAccessKey: <your_s3_secret_access_key>
  useSSL: <true/false>
  bucketName: "<your_bucket_name>"
```
> See [MinIO/S3 Configurations](configuration_standalone-advanced.md#MinIOS3-Configurations) for more information.

<div class="alert note">
All parameters take effect after Milvus starts.
</div>

## Set up S3 on K8s

For K8s clusters, you can configure parameters by using the same command to start Milvus. Or you can configure parameters with the **values.yml** file on the **/charts/milvus** path in the [milvus-helm](https://github.com/milvus-io/milvus-helm) repository before you start Milvus.


 The following table lists the keys to configure S3.
| Key             | Description                          | Value                                 |
| --------------------- | ------------------------------------ | ------------------------------------ |
| externalS3.enabled    | Enable or disable external S3        | <code>true</code>/<code>false</code> |
| externalS3.host       | Endpoint of the external S3          |                                      |
| externalS3.port       | Port of the external S3              |                                      |
| externalS3.accessKey  | S3 key ID for authorized user access |                                      |
| externalS3.secretKey  | S3 encryption string                 |                                      |
| externalS3.bucketName | S3 bucket name                       |                                      |
| minio.enabled         | Enable or disable MinIO              | <code>true</code>/<code>false</code> |

### Using commands

To start Milvus and set up S3, run the following command.

```shell
helm install <your_release_name> milvus/milvus --set cluster.enabled=true --set externalS3.enabled=true --set externalS3.host='<your_s3_endpoint>' --set externalS3.port=<your_s3_port> --set externalS3.accessKey=<your_s3_access_key_id> --set externalS3.secretKey=<your_s3_secret_key> --set externalS3.bucketName=<your_bucket_name> --set minio.enabled=false
```

### Using **values.yaml**

Configure the `minio` dictionary in the **values.yaml** file as follows.

```yaml
minio:
  enabled: false
```

Configure the `externalS3` dictionary in the **values.yaml** file as follows.

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

After configuring the preceding dictionaries, run the following command.

```shell
helm install <your_release_name> milvus/milvus -f values.yaml
```

