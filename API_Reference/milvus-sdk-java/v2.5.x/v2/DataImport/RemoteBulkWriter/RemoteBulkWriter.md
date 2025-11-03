# RemoteBulkWriter

A **RemoteBulkWriter** instance writes your raw data in a format that Milvus understands into an AWS-S3-compatible bucket.

```java
io.milvus.bulkwriter.RemoteBulkWriter
```

## Constructor

Constructs a **RemoteBulkWriter** instance with a set of parameters, such as **schema**, **remote_path**, **connect_param,** etc.

<div class="admonition note">

<p><b>notes</b></p>

<p>A <strong>RemoteBulkWriter</strong> object intends to rewrite your raw data in a format that Milvus understands into an AWS-S3-compatible or a Microsoft Azure Blob Storage bucket.</p>

</div>

```java
public RemoteBulkWriter(RemoteBulkWriterParam bulkWriterParam)
```

**PARAMETERS:**

- **bulkWriterParam** (*RemoteBulkWriterParam*) -

    A [RemoteBulkWriterParam](RemoteBulkWriter.md#RemoteBulkWriterParam) instance.

## RemoteBulkWriterParam

**RemoteBulkWriterParam** allows you to configure properties for your **RemoteBulkWriter** instances in one place so that you can instantiate the **RemoteBulkWriter** class.

```java
RemoteBulkWriterParam.newBuilder()
    .withCollectionSchema(CreateCollectionReq.CollectionSchema collectionSchema)
    .withConnectParam(StorageConnectParam connectParam)
    .withRemotePath(String remotePath)
    .withChunkSize(long chunkSize)
    .withFileType(BulkFileType fileType)
    .withConfig(String key, Object val)
    .build()
```

**BUILDER METHODS:**

- `withCollectionSchema(CreateCollectionReq.CollectionSchema collectionSchema)`

    The schema of the target collection that is defined by instantiating [CreateCollectionReq.CollectionSchema](../../Collections/CollectionSchema/CollectionSchema.md).

- `withConnectParam(StorageConnectParam connectParam)`

    The parameters used to connect to a remote bucket, which is defined by instantiating [StorageConnectParam](RemoteBulkWriter.md#StorageConnectParam).

- `withRemotePath(String remotePath)`

    The path to the directory that is to hold the rewritten data.

- `withChunkSize(long chunkSize)`

    The maximum size of a file segment. While rewriting your raw data, Milvus splits it into segments.

    The value defaults to **536,870,912** in bytes, which is **512 MB**.

    <div class="admonition note">

    <p><b>**how does bulkwriter segment my data?**</b></p>

    <p>The way BulkWriter segments your data varies with the target file type.</p>
    <p>If the generated file exceeds the specified segment size, BulkWriter creates multiple files and names them in sequence numbers, each no larger than the segment size.</p>

    </div>

- `withFileType(BulkFileType fileType)`

    The type of the output file. Possible options are listed in [BulkFileType](../BulkFileType.md).

- `withConfig(String key, Object val)`

    A dictionary specifying optional configurations for processing CSV files. This parameter applies only when you set `fileType` to `CSV` in `withFileType()`. The dictionary contains the following fields:

    - **sep** (*string*) -

        The delimiter of CSV file. The value must be a string of length 1, which defaults to `","`. The following strings are not allowed: `"\0"`, `"\n"`, `"\r"`, `"""`.

    - **nullkey** (*string*) -

        Special string representing null value. The value defaults to empty string: `""`.

## StorageConnectParam

**StorageConnectParam** is implemented in **AzureConnectParam** and **S3ConnectParam**.

### AzureConnectParam

**AzureConnectParam** prepares the parameters to connect to a Microsoft Azure Blob Storage container.

```java
AzureConnectParam.newBuilder()
    .withContainerName(String containerName)
    .withConnStr(String connStr)
    .withAccountUrl(String accountUrl)
    .withCredential(TokenCrendtial credential)
    .build()
```

**BUILDER METHODS:**

- `withContainerName(String containerName)`

    The name of the remote Azure blob storage container to connect to.

- `withConnStr(String connStr)`

    A connection string to an Azure Storage account, which can be parsed to an account_url and a credential. To generate a connection string, read [this link](https://learn.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string).

- `withAccountUrl(String accountUrl)`

    A string in format like `<i>http</i>s://<storage-account>.blob.core.windows.net`. Read [this link](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview) for more info.

- `withCredential(TokenCrendtial credential)`

    Account access key for the account. Read [this link](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal#view-account-access-keys) for more info.

### S3ConnectParam

S3ConnectParam prepares the parameters to connect to an S3-compatible object storage bucket

```java
S3ConnectParam.newBuilder()
    .withCloudName(String cloudName)
    .withBucketName(String bucketName)
    .withEndpoint(String endpoint)
    .withAccessKey(String accessKey)
    .withSecretKey(String secretKey)
    .withSessionToken(String sessionToken)
    .withRegion(String region)
    .withHttpClient(OkHttpClient httpClient)
    .build()
```

**BUILDER METHODS:**

- `withCloudName(String cloudName)`

    A cloud provider that provides S3-compatible object storage services. Possible options are as follows:

    - **MINIO** (MinIO)

    - **AWS** (AWS S3)

    - **GCP** (GCP Cloud Storage)

    - **ALI** (Alibaba Cloud OSS)

    - **TC** (Tencent Cloud COS)

- `withBucketName(String bucketName)`

    The name of the remote bucket to connect to.

- `withEndpoint(String endpoint)`

    The URL of the AWS-S3-compatible service.

    The value can be the URL of a MinIO service or that of any AWS S3-compatible public service.

- `withAccessKey(String accessKey)`

    The access key (user ID) used to authenticate access to the specified bucket.

- `withSecretKey(String secretKey)`

    The secret_key (password) used to authenticate access to the specified bucket.

- `withSessionToken(String sessionToken)`

    A session token of your account in the AWS S3 compatible service.

- `withRegion(String region)`

    The name or ID of the region where the bucket resides.

- `withHttpClient(OkHttpClient httpClient)`

    Whether to use an OkHttp client to set up a secure (TLS) connection to the AWS S3 compatible service.

## Example

```java
import com.google.gson.JsonObject;

import io.milvus.bulkwriter.RemoteBulkWriter;
import io.milvus.bulkwriter.RemoteBulkWriterParam;
import io.milvus.bulkwriter.common.clientenum.BulkFileType;
import io.milvus.bulkwriter.common.clientenum.CloudStorage;
import io.milvus.bulkwriter.connect.S3ConnectParam;
import io.milvus.bulkwriter.connect.StorageConnectParam;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

private static List<List<String>> callRemoteWriter(CreateCollectionReq.CollectionSchema collectionSchema,
                                                   List<JsonObject> data) throws Exception {
    StorageConnectParam connectParam = S3ConnectParam.newBuilder()
                .withEndpoint(STORAGE_ENDPOINT)
                .withCloudName(CloudStorage.MINIO.getCloudName())
                .withBucketName(STORAGE_BUCKET)
                .withAccessKey(STORAGE_ACCESS_KEY)
                .withSecretKey(STORAGE_SECRET_KEY)
                .withRegion(STORAGE_REGION)
                .build();
    
    RemoteBulkWriterParam bulkWriterParam = RemoteBulkWriterParam.newBuilder()
            .withCollectionSchema(collectionSchema)
            .withRemotePath("bulk_data")
            .withFileType(BulkFileType.CSV)
            .withChunkSize(512 * 1024 * 1024)
            .withConnectParam(connectParam)
            .withConfig("sep", "|") // only take effect for CSV file
            .build();
    
    try (RemoteBulkWriter remoteBulkWriter = new RemoteBulkWriter(bulkWriterParam)) {
        for (JsonObject rowObject : data) {
            remoteBulkWriter.appendRow(rowObject);
        }
        remoteBulkWriter.commit(false);

        return remoteBulkWriter.getBatchFiles();
    } catch (Exception e) {
        throw e;
    }
}
```
