# getBatchFiles()

This operation returns a list of files passed to the current VolumeBulkWriter instance.

```java
public List<List<String>> getBatchFiles()
```

## Request Syntax

```java
volumeBulkWriter.getBatchFiles()
```

**PARAMETERS:**

*None*

**RETURN TYPE:**

*List\<List\<String>>*

**RETURNS:**

A list of file paths. Each inner list holds the column-based file paths for one batch of data.

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

// 3. Append a row and commit
JsonObject row = new JsonObject();
row.addProperty("id", 1L);
row.add("vector", new com.google.gson.Gson().toJsonTree(new float[]{0.1f, 0.2f, 0.3f, 0.4f}));
writer.appendRow(row);
writer.commit(false);

// 4. Get the batch files
java.util.List<java.util.List<String>> batchFiles = writer.getBatchFiles();
```
