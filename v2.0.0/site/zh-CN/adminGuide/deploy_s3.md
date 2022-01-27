---
id: deploy_s3.md
---

# 为 Milvus 配置 S3 存储

Milvus 支持 Amazon Simple Storage Service（Amazon S3）作为存储引擎，实现日志数据和索引文件的数据持久化。本篇文档将展示如何为 Milvus 配置 S3 存储。

## 使用 Docker Compose 配置 S3

如需通过 Docker Compose 为 Milvus 配置 S3，你需要更改 **milvus/configs** 目录下的 **milvus.yaml** 文件中的 MinIO/S3 配置。

鉴于 MinIO 兼容 S3，你可以直接在 `minio` 部分下配置 S3 参数。

```yaml
minio:
  address: <your_s3_endpoint>
  port: <your_s3_port>
  accessKeyID: <your_s3_access_key_id>
  secretAccessKey: <your_s3_secret_access_key>
  useSSL: <true/false>
  bucketName: "<your_bucket_name>"
```

更多细节参考 [MinIO 或 S3 配置](configure_minio.md)。

<div class="alert note">
所有参数设置在 Milvus 启动时生效。
</div>


## 使用 Kubernetes 配置 S3

对于 Kubernetes 上的 Milvus 集群，你可以在启动 Milvus 的命令行中配置参数，也可以在启动前通过 [milvus-helm](https://github.com/milvus-io/milvus-helm) 库中 **/charts/milvus** 目录下的 **values.yml** 文件配置参数。

以下是 Helm Charts 安装的 S3 配置项：

| 参数                  | 说明                            | 注释                                 |
| --------------------- | ------------------------------- | ------------------------------------ |
| externalS3.enabled    | 启用或禁用外部 S3               | <code>true</code>/<code>false</code> |
| externalS3.host       | 外部 S3 节点                    |                                      |
| externalS3.port       | 外部 S3 端口                    |                                      |
| externalS3.accessKey  | 外部 S3 给用户授权访问的密钥 ID |                                      |
| externalS3.secretKey  | 外部 S3 加密字符串              |                                      |
| externalS3.bucketName | 外部 S3 存储桶名                |                                      |
| minio.enabled         | 启用或禁用 MinIO                | <code>true</code>/<code>false</code> |

### 使用命令行配置 S3

使用以下命令启动 Milvus 并配置 S3：

```shell
helm install <your_release_name> milvus/milvus --set cluster.enabled=true --set externalS3.enabled=true --set externalS3.host='<your_s3_endpoint>' --set externalS3.port=<your_s3_port> --set externalS3.accessKey=<your_s3_access_key_id> --set externalS3.secretKey=<your_s3_secret_key> --set externalS3.bucketName=<your_bucket_name> --set minio.enabled=false
```

### 使用 **values.yaml** 文件配置 S3

在 **values.yaml** 文件中配置 `minio` 部分：

```yaml
minio:
  enabled: false
```

在 **values.yaml** 文件中配置 `externalS3` 部分：

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

上述部分配置完成后，运行以下命令：

```shell
helm install <your_release_name> milvus/milvus -f values.yaml
```

