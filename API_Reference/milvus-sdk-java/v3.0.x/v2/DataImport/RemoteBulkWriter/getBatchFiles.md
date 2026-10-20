# getBatchFiles()

This operation returns a list of files passed to the current LocalBulkWriter instance.

```java
public List<List<String>> getBatchFiles()
```

## Request Syntax

```java
remoteBulkWriter.getBatchFiles()
```

**PARAMETERS:**

*None*

**RETURN TYPE:**

*List\<List\<String>>*

**RETURNS:**

A list of file paths. Each inner list holds the column-based file paths for one batch of data.

## Example

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.bulkwriter.RemoteBulkWriter;
import io.milvus.bulkwriter.RemoteBulkWriterParam;
import io.milvus.bulkwriter.common.clientenum.BulkFileType;
import io.milvus.bulkwriter.common.clientenum.CloudStorage;
import io.milvus.bulkwriter.connect.S3ConnectParam;
import io.milvus.bulkwriter.connect.StorageConnectParam;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import java.util.List;

// 1. Define the collection schema and configure the writer
CreateCollectionReq.CollectionSchema schema = CreateCollectionReq.CollectionSchema.builder().build();
schema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
schema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(3).build());
StorageConnectParam connectParam = S3ConnectParam.newBuilder()
        .withEndpoint("http://localhost:9000")
        .withCloudName(CloudStorage.MINIO.getCloudName())
        .withBucketName("a-bucket")
        .withAccessKey("minioadmin")
        .withSecretKey("minioadmin")
        .withRegion("us-east-1")
        .build();
RemoteBulkWriterParam config = RemoteBulkWriterParam.newBuilder()
        .withCollectionSchema(schema)
        .withRemotePath("bulk_data")
        .withFileType(BulkFileType.PARQUET)
        .withConnectParam(connectParam)
        .build();

// 2. Create the writer, append a row, and commit
RemoteBulkWriter remoteBulkWriter = new RemoteBulkWriter(config);
JsonObject row = new JsonObject();
row.addProperty("id", 1L);
row.add("vector", new Gson().toJsonTree(new float[]{0.1f, 0.2f, 0.3f}));
remoteBulkWriter.appendRow(row);
remoteBulkWriter.commit(false);

// 3. Get the batch files
List<List<String>> batchFiles = remoteBulkWriter.getBatchFiles();
```
