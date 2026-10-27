# getVolumeUploadResult()

This operation retrieves the result of the update to the specified volume.

```java
public UploadFilesResult getVolumeUploadResult()
```

**PARAMETERS:**

*None*

**RETURN TYPE:**

*UploadFilesResult*

**RETURNS:**

An UploadFilesResult instance that has the following methods:

- `getVolumeName()`

    Returns the name of the target volume.

- `setVolumeName()`

    Sets the name of the target volume.

- `getPath()`

    Returns the path of the uploaded file to the target volume.

- `setPath()`

    Sets the path of the uploaded file to the target volume.

- `toString()`

    Strigifies the UploadFilesResult instance.

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

// 3. Append rows and commit
JsonObject row = new JsonObject();
row.addProperty("id", 1L);
row.add("vector", new com.google.gson.Gson().toJsonTree(new float[]{0.1f, 0.2f, 0.3f, 0.4f}));
writer.appendRow(row);
writer.commit(false);

// 4. Get the volume upload result
io.milvus.bulkwriter.model.UploadFilesResult result = writer.getVolumeUploadResult();
System.out.println("Target volume: " + result.getVolumeName());
System.out.println("Target paths: " + result.getPath());
```
