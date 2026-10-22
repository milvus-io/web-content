# appendRow()

This operation appends a row of data to the RemoteBulkWriter buffer. The data will be uploaded to remote storage when the buffer is full or when `commit()` is called.

```java
public void appendRow(JsonObject rowData) throws IOException, InterruptedException
```

**PARAMETERS:**

- **rowData** (*JsonObject*) -

    A JSON object representing a single row of data.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **IOException**

    Raised when an I/O error occurs while buffering the row.

- **InterruptedException**

    Raised when the operation is interrupted while buffering the row.

- **[MilvusClientException](../../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

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

// 2. Append a row
RemoteBulkWriter writer = new RemoteBulkWriter(config);
Gson gson = new Gson();
JsonObject row = new JsonObject();
row.addProperty("id", 1L);
row.add("vector", gson.toJsonTree(new float[]{0.1f, 0.2f, 0.3f}));
writer.appendRow(row);
```
