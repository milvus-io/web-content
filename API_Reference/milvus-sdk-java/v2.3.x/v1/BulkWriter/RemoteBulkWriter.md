# RemoteBulkWriter

A RemoteBulkWriter instance writes your raw data in a format that Milvus understands into an AWS-S3-compatible bucket.

```java
RemoteBulkWriter(RemoteBulkWriterParam bulkWriterParam)
```

Methods of `RemoteBulkWriter`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>appendRow(JsonObject rowData)</p></td>
        <td><p>Append a row into buffer. Once the buffer size exceeds a threshold, the writer will persist the buffer to data file.</p></td>
        <td><p>rowData: A gson.JsonObject to store the data of a row.<br/>For each field:<br/>- If dataType is Bool/Int8/Int16/Int32/Int64/Float/Double/Varchar, use JsonObject.addProperty(key, value) to input;<br/>- If dataType is FloatVector, use JsonObject.add(key, gson.toJsonTree(List[Float]) to input;<br/>- If dataType is BinaryVector/Float16Vector/BFloat16Vector, use JsonObject.add(key, gson.toJsonTree(byte[])) to input;<br/>- If dataType is SparseFloatVector, use JsonObject.add(key, gson.toJsonTree(SortedMap[Long, Float])) to input;<br/>- If dataType is Array, use JsonObject.add(key, gson.toJsonTree(List of Boolean/Integer/Short/Long/Float/Double/String)) to input;<br/>- If dataType is JSON, use JsonObject.add(key, JsonElement) to input;</p></td>
    </tr>
    <tr>
        <td><p>commit(boolean async)</p></td>
        <td><p>Force persist data files and complete the writer.</p></td>
        <td><p>async: Set to true to wait until all data files are persisted.</p></td>
    </tr>
    <tr>
        <td><p>getBatchFiles()</p></td>
        <td><p>Returns a List&lt;List&lt;String>gt; of the persisted data files. Each List&lt;String> is a batch files that can be input as a job for the bulkinsert interface.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

#### RemoteBulkWriterParam

Use the `RemoteBulkWriterParam.Builder` to construct a `RemoteBulkWriterParam` object.

```java
import io.milvus.bulkwriter.RemoteBulkWriterParam;
RemoteBulkWriterParam.Builder builder = RemoteBulkWriterParam.newBuilder();
```

Methods of `RemoteBulkWriterParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionSchema(CollectionSchemaParam collectionSchema)</p></td>
        <td><p>Sets the collection schema. See the CollectionSchemaParam description in the Collection.createCollection() section.</p></td>
        <td><p>collectionSchema: collection schema</p></td>
    </tr>
    <tr>
        <td><p>withConnectParam(StorageConnectParam connectParam)</p></td>
        <td><p>Sets the connect parameters for different storage remote services. Currently, two options are available: S3ConnectParam and AzureConnectParam.</p></td>
        <td><p>connectParam: Connect parameters for remote storage service.</p></td>
    </tr>
    <tr>
        <td><p>withRemotePath(String remotePath)</p></td>
        <td><p>Sets the path on the remote storage service where to upload the data files.</p></td>
        <td><p>remotePath: A path on the remote storage service.</p></td>
    </tr>
    <tr>
        <td><p>withChunkSize(int chunkSize)</p></td>
        <td><p>Sets the maximum size of a data chunk.<br/>While rewriting your raw data, This tool splits your raw data into chunks.<br/>The value defaults to 128 MB.</p></td>
        <td><p>chunkSize: the maximum size of a data chunk.</p></td>
    </tr>
    <tr>
        <td><p>withFileType(BulkFileType fileType)</p></td>
        <td><p>The type of the output file. Currently, only PARQUET is available.</p></td>
        <td><p>fileType: The output file type.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a LocalBulkWriterParam object</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

#### AzureConnectParam

Use the `AzureConnectParam.Builder` to construct an `AzureConnectParam` object.

```java
import io.milvus.bulkwriter.connect.AzureConnectParam;
AzureConnectParam.Builder builder = AzureConnectParam.newBuilder();
```

Methods of `AzureConnectParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withContainerName(String containerName)</p></td>
        <td><p>Sets the Azure container name.</p></td>
        <td><p>containerName: The target container name.</p></td>
    </tr>
    <tr>
        <td><p>withConnStr(String connStr)</p></td>
        <td><p>Sets the connect string.</p></td>
        <td><p>connStr: A connection string to an Azure Storage account, which can be parsed to an account_url and a credential.To generate a connection string, read this link: <a href="https://learn.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string">https://learn.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string</a></p></td>
    </tr>
    <tr>
        <td><p>withAccountUrl(String accountUrl)</p></td>
        <td><p>Sets the account url.</p></td>
        <td><p>accountUrl: A string in format like https://&lt;storage-account>.<a href="http://blob.core.windows.net">blob.core.windows.net</a>Read this link for more info:<a href="https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview">https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview</a></p></td>
    </tr>
    <tr>
        <td><p>withCredential(TokenCredential credential)</p></td>
        <td><p>Set the credential.</p></td>
        <td><p>credential: Account access key for the account, read this link for more info:<a href="https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal#view-account-access-keys">https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal#view-account-access-keys</a></p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs an AzureConnectParam object</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

#### S3ConnectParam

Use the `S3ConnectParam.Builder` to construct a `S3ConnectParam` object.

```java
import io.milvus.bulkwriter.connect.S3ConnectParam;
S3ConnectParam.Builder builder = S3ConnectParam.newBuilder();
```

Methods of `S3ConnectParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCloudName(String cloudName)</p></td>
        <td><p>Sets the cloud name of the S3.</p></td>
        <td><p>cloudName: The cloud name.</p></td>
    </tr>
    <tr>
        <td><p>withBucketName(String bucketName)</p></td>
        <td><p>Sets the bucket name.</p></td>
        <td><p>bucketName: The bucket name.</p></td>
    </tr>
    <tr>
        <td><p>withEndpoint(String endpoint)</p></td>
        <td><p>Sets the endpoint.</p></td>
        <td><p>endpoint: The endpoint.</p></td>
    </tr>
    <tr>
        <td><p>withAccessKey(String accessKey)</p></td>
        <td><p>Set the access key.</p></td>
        <td><p>accessKey: The access key.</p></td>
    </tr>
    <tr>
        <td><p>withSecretKey(String secretKey)</p></td>
        <td><p>Set the secret key.</p></td>
        <td><p>secretKey: The secret key.</p></td>
    </tr>
    <tr>
        <td><p>withSessionToken(String sessionToken)</p></td>
        <td><p>Set the session token.</p></td>
        <td><p>sessionToken: The session token.</p></td>
    </tr>
    <tr>
        <td><p>withRegion(String region)</p></td>
        <td><p>Set the region name.</p></td>
        <td><p>region: The region name.</p></td>
    </tr>
    <tr>
        <td><p>withHttpClient(OkHttpClient httpClient)</p></td>
        <td><p>Set the http client in necessary.</p></td>
        <td><p>httpClient: http client.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a S3ConnectParam object</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

#### Example

```java
import io.milvus.bulkwriter.*;
import io.milvus.bulkwriter.connect.StorageConnectParam;
import io.milvus.bulkwriter.common.clientenum.BulkFileType;
import io.milvus.param.collection.CollectionSchemaParam;

CollectionSchemaParam collectionSchema = CollectionSchemaParam.newBuilder()
        .addFieldType(FieldType.newBuilder()
                .withName("id")
                .withDataType(DataType.Int64)
                .withPrimaryKey(true)
                .withAutoID(false)
                .build())
        .addFieldType(FieldType.newBuilder()
                .withName("vector")
                .withDataType(DataType.FloatVector)
                .withDimension(DIM)
                .build())
        .build();

StorageConnectParam connectParam = S3ConnectParam.newBuilder()
        .withEndpoint(STORAGE_ENDPOINT)
        .withCloudName(CLOUD_NAME)
        .withBucketName(STORAGE_BUCKET)
        .withAccessKey(STORAGE_ACCESS_KEY)
        .withSecretKey(STORAGE_SECRET_KEY)
        .withRegion(STORAGE_REGION)
        .build();
        
RemoteBulkWriterParam bulkWriterParam = RemoteBulkWriterParam.newBuilder()
        .withCollectionSchema(collectionSchema)
        .withRemotePath("bulk_data")
        .withFileType(BulkFileType.PARQUET)
        .withChunkSize(512 * 1024 * 1024)
        .withConnectParam(connectParam)
        .build();
        
try (RemoteBulkWriter remoteBulkWriter = RemoteBulkWriter(bulkWriterParam)) {
    Gson gson = new Gson();
    for (int i = 0; i < 10000; ++i) {
        JsonObject row = new JsonObject();
        row.addProperty("id", i);
        row.add("vector", gson.toJsonTree(CommonUtils.generateFloatVector(DIM)));

        remoteBulkWriter.appendRow(row);
    }
    System.out.printf("%s rows appends%n", remoteBulkWriter.getTotalRowCount());
    System.out.printf("%s rows in buffer not flushed%n", remoteBulkWriter.getBufferRowCount());
    System.out.println("Generate data files...");
    remoteBulkWriter.commit(false);

    List<List<String>> batchFiles = remoteBulkWriter.getBatchFiles();
    System.out.printf("Data files have been uploaded: %s%n", batchFiles);
    
    for (List<String> files : batchFiles) {
        R<ImportResponse> response = milvusClient.bulkInsert(BulkInsertParam.newBuilder()
            .withCollectionName(COLLECTION_NAME)
            .withFiles(files)
            .build());
    }
} catch (Exception e) {
    System.out.println("allTypesRemoteWriter catch exception: " + e);
    throw e;
}
```
