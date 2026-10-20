# getTotalRowCount()

This operation returns the total number of rows written by this RemoteBulkWriter instance.

```java
public Long getTotalRowCount()
```

**RETURN TYPE:**

*Long*

**RETURNS:**

The total number of rows written by this RemoteBulkWriter instance.

**EXCEPTIONS:**

- **MilvusClientException**

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

// 2. Create the writer and append rows
RemoteBulkWriter writer = new RemoteBulkWriter(config);
JsonObject row = new JsonObject();
row.addProperty("id", 1L);
row.add("vector", new Gson().toJsonTree(new float[]{0.1f, 0.2f, 0.3f}));
writer.appendRow(row);

// 3. Get the total row count
Long totalRows = writer.getTotalRowCount();
System.out.println("Total rows written: " + totalRows);
```
