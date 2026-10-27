# LocalBulkWriter

A **LocalBulkWriter** instance rewrites your raw data locally in a format that Milvus understands.

```java
io.milvus.bulkwriter.LocalBulkWriter
```

## Constructor

Constructs a **LocalBulkWriter** instance by schema, output path, segment size, and file type.

<div class="alert note">

A **LocalBulkWriter** object intends to rewrite your raw data locally in a format that Milvus understands.

</div>

```java
LocalBulkWriter(LocalBulkWriterParam bulkWriterParam) throws IOException
```

**PARAMETERS:**

- **bulkWriterParam** (*LocalBulkWriterParam*) -

    A LocalBulkWriterParam instance.

## LocalBulkWriterParam

**LocalBulkWriterParam** allows you to configure properties for your **LocalBulkWriter** instances in one place so that you can instantiate the **LocalBulkWriter** class.

```java
LocalBulkWriterParam.newBuilder()
    .withCollectionSchema(CreateCollectionReq.CollectionSchema collectionSchema)
    .withCollectionSchema(CollectionSchemaParam collectionSchema)
    .withLocalPath(String localPath)
    .withChunkSize(long chunkSize)
    .withFileType(BulkFileType fileType)
    .withConfig(String key, Object val)
    .build()
```

**BUILDER METHODS:**

- `withCollectionSchema(CreateCollectionReq.CollectionSchema collectionSchema)`

    The schema of the target collection that is defined by instantiating **CreateCollectionReq.CollectionSchema**. See [CollectionSchema](../../Collections/CollectionSchema/CollectionSchema.md).

- `withCollectionSchema(CollectionSchemaParam collectionSchema)`

    The V1 schema of the target collection that is defined by instantiating **CollectionSchemaParam**.

- `withLocalPath(String localPath)`

    The path to the directory that is to hold the rewritten data.

- `withChunkSize(long chunkSize)`

    The maximum size of a file segment. While rewriting your raw data, Milvus splits it into segments.

    The value defaults to **134,217,728** in bytes, which is **128 MB**.

    <div class="alert note">

    The way BulkWriter segments your data varies with the target file type.

    If the generated file exceeds the specified segment size, BulkWriter creates multiple files and names them in sequence numbers, each no larger than the segment size.

    </div>

- `withFileType(BulkFileType fileType)`

    The type of the output file. Possible options are listed in [BulkFileType](../BulkFileType.md).

- `withConfig(String key, Object val)`

    A dictionary specifying optional configurations for processing CSV files. This parameter applies only when you set `fileType` to `CSV` in `withFileType()`. The dictionary contains the following fields:

    - **sep** (*string*) -

        The delimiter of CSV file. The value must be a string of length 1, which defaults to `","`. The following strings are not allowed: `"\0"`, `"\n"`, `"\r"`, `"""`.

    - **nullkey** (*string*) -

        Special string representing null value. The value defaults to empty string: `""`.

## Example

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.bulkwriter.LocalBulkWriter;
import io.milvus.bulkwriter.LocalBulkWriterParam;
import io.milvus.bulkwriter.common.clientenum.BulkFileType;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import java.util.List;

// 1. Define the collection schema
CreateCollectionReq.CollectionSchema collectionSchema = CreateCollectionReq.CollectionSchema.builder().build();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(4).build());

// 2. Configure the LocalBulkWriter
LocalBulkWriterParam bulkWriterParam = LocalBulkWriterParam.newBuilder()
        .withCollectionSchema(collectionSchema)
        .withLocalPath("/tmp/bulk_writer")
        .withFileType(BulkFileType.PARQUET)
        .withChunkSize(128 * 1024 * 1024)
        .build();

try (LocalBulkWriter localBulkWriter = new LocalBulkWriter(bulkWriterParam)) {
    // 3. Append rows
    Gson GSON_INSTANCE = new Gson();
    for (int i = 0; i < 100; i++) {
        JsonObject row = new JsonObject();
        row.addProperty("id", (long) i);
        row.add("vector", GSON_INSTANCE.toJsonTree(new float[]{i * 0.1f, i * 0.2f, i * 0.3f, i * 0.4f}));

        localBulkWriter.appendRow(row);
    }

    // 4. Commit and collect the batch files
    localBulkWriter.commit(false);
    List<List<String>> batchFiles = localBulkWriter.getBatchFiles();
    System.out.printf("Local writer done! output local files: %s%n", batchFiles);
} catch (Exception e) {
    System.out.println("Local writer catch exception: " + e);
    throw e;
}
```
