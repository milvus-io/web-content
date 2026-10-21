# appendRow()

Validates and appends one row to the writer. When buffered data exceeds the configured `chunkSize`, the writer commits the current file automatically.

[`StructFieldSchema`](../../Collections/StructFieldSchema/StructFieldSchema.md) fields can contain binary, float16, bfloat16, and int8 vector values.

```java
public void appendRow(JsonObject rowData)
```

**RETURNS:**

*void*

This operation does not return a value.

**EXCEPTIONS:**

- **Exception**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

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
