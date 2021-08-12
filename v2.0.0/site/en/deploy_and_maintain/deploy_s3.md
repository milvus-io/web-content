---
id: deploy_s3.md
---

# Set up S3 Storage for Milvus

Milvus supports Amazon Simple Storage Service (S3) for data persistence of insert log files and index files. This page shows you how to set up S3 storage for Milvus. 

## Set Up S3 with Docker Compose

To set up S3 for Milvus with Docker Compose, you need to change the MinIO/S3 configurations in the **milvus.yaml** under **milvus/configs** directory.

Whereas MinIO is the de facto standard for S3 compatibility, you can configure S3 parameters directly under MinIO section.

```yaml
minio:
  address: <your_s3_endpoint>
  port: <your_s3_port>
  accessKeyID: <your_s3_access_key_id>
  secretAccessKey: <your_s3_secret_access_key>
  useSSL: <true/false>
  bucketName: "<your_bucket_name>"
```
> For more details, see [MinIO/S3 Configurations](configuration_standalone-advanced.md#MinIOS3-Configurations).

<div class="alert note">
All parameters take effect only after being configured at the startup of Milvus.
</div>

## Set up S3 on Kubernetes

For Milvus cluster on Kubernetes, you can either configure the parameters in command line while booting up Milvus or in the **values.yml** file under **/charts/milvus** directory of [milvus-helm](https://github.com/milvus-io/milvus-helm) repository before Milvus startup.

Below are S3 configurations for Helm Charts installation:

| Parameter             | Description                          | Note                                 |
| --------------------- | ------------------------------------ | ------------------------------------ |
| externalS3.enabled    | Enable or disable external S3        | <code>true</code>/<code>false</code> |
| externalS3.host       | Endpoint of the external S3          |                                      |
| externalS3.port       | Port of the external S3              |                                      |
| externalS3.accessKey  | S3 key ID for authorized user access |                                      |
| externalS3.secretKey  | S3 encryption string                 |                                      |
| externalS3.bucketName | S3 bucket name                       |                                      |
| minio.enabled         | Enable or disable MinIO              | <code>true</code>/<code>false</code> |

#### Set up S3 using command line at startup

To set up S3 for Milvus at the startup, run:

```shell
helm install <your_release_name> milvus/milvus --set cluster.enabled=true --set externalS3.enabled=true --set externalS3.host='<your_s3_endpoint>' --set externalS3.port=<your_s3_port> --set externalS3.accessKey=<your_s3_access_key_id> --set externalS3.secretKey=<your_s3_secret_key> --set externalS3.bucketName=<your_bucket_name> --set minio.enabled=false
```

#### Set up S3 via configuring **values.yaml**

Configure the `minio` section in the **values.yaml** file as follow:

```yaml
minio:
  enabled: false
```

Configure the `externalS3` section in the **values.yaml** file as follow:

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

Having configured the above section, you can run:

```shell
helm install <your_release_name> milvus/milvus -f values.yaml
```

