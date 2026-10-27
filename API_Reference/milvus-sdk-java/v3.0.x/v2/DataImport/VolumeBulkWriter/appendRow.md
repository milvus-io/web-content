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
import com.google.gson.JsonObject;
import io.milvus.bulkwriter.VolumeBulkWriter;
import io.milvus.bulkwriter.VolumeBulkWriterParam;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

// 1. Define the collection schema
CreateCollectionReq.CollectionSchema collectionSchema = CreateCollectionReq.CollectionSchema.builder().build();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(4).build());

// 2. Configure the VolumeBulkWriter (requires a Zilliz Cloud volume)
VolumeBulkWriterParam config = VolumeBulkWriterParam.newBuilder()
    .withCollectionSchema(collectionSchema)
    .withRemotePath("imports/books")
    .withCloudEndpoint("https://api.cloud.zilliz.com")
    .withApiKey("your-api-key")
    .withVolumeName("bulk-data")
    .build();

VolumeBulkWriter writer = new VolumeBulkWriter(config);

// 3. Append a row
JsonObject row = new JsonObject();
row.addProperty("id", 1L);
row.add("vector", new com.google.gson.Gson().toJsonTree(new float[]{0.1f, 0.2f, 0.3f, 0.4f}));
writer.appendRow(row);
```
