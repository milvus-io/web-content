# appendRow()

This operation appends a row of data to the VolumeBulkWriter buffer. The data will be written to a file when the buffer is full or when `commit()` is called.

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

    This is a checked exception thrown when any data-read or data-write errors occur during this operation.

- **InterruptedException**

    This is a checked exception thrown when a thread that is currently "blocking" (waiting, sleeping, or otherwise occupied) is interrupted by another thread using the `Thread.interrupt()` method.

- **[MilvusClientException](../../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

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

