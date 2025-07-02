# LocalBulkWriter

A **LocalBulkWriter** instance rewrites your raw data locally in a format that Milvus understands.

```java
io.milvus.bulkwriter.LocalBulkWriter
```

## Constructor

Constructs a **LocalBulkWriter** instance by schema, output path, segment size, and file type.

<div class="admonition note">

<p><b>notes</b></p>

<p>A <strong>LocalBulkWriter</strong> object intends to rewrite your raw data locally in a format that Milvus understands.</p>

</div>

```java
LocalBulkWriter(LocalBulkWriterParam bulkWriterParam)
```

**PARAMETERS:**

- **bulkWriterParam** (*LocalBulkWriterParam*) -

    A [LocalBulkWriterParam](LocalBulkWriter.md#LocalBulkWriterParam) instance.

## LocalBulkWriterParam

**LocalBulkWriterParam** allows you to configure properties for your **LocalBulkWriter** instances in one place so that you can instantiate the **LocalBulkWriter** class.

```java
LocalBulkWriterParam.newBuilder()
    .withCollectionSchema(CreateCollectionReq.CollectionSchema collectionSchema)
    .withLocalPath(String localPath)
    .withChunkSize(long chunkSize)
    .withFileType(BulkFileType fileType)
    .withConfig(String key, Object val)
    .build()
```

**BUILDER METHODS:**

- `withCollectionSchema(CreateCollectionReq.CollectionSchema collectionSchema)`

    The schema of the target collection that is defined by instantiating **[CreateCollectionReq.CollectionSchema](../../Collections/CollectionSchema/CollectionSchema.md)**.

- `withLocalPath(String localPath)`

    The path to the directory that is to hold the rewritten data.

- `withChunkSize(long chunkSize)`

    The maximum size of a file segment. While rewriting your raw data, Milvus splits it into segments.

    The value defaults to **536,870,912** in bytes, which is **512 MB**.

    <div class="admonition note">

    <p><b>**how does bulkwriter segment my data?**</b></p>

    <p>The way BulkWriter segments your data varies with the target file type.</p>
    <p>If the generated file exceeds the specified segment size, BulkWriter creates multiple files and names them in sequence numbers, each no larger than the segment size.</p>

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
import com.google.gson.JsonObject;
import io.milvus.bulkwriter.LocalBulkWriter;
import io.milvus.bulkwriter.LocalBulkWriterParam;
import io.milvus.bulkwriter.common.clientenum.BulkFileType;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

private static void localWriter(CreateCollectionReq.CollectionSchema collectionSchema) throws Exception {
    LocalBulkWriterParam bulkWriterParam = LocalBulkWriterParam.newBuilder()
            .withCollectionSchema(collectionSchema)
            .withLocalPath("/tmp/bulk_writer")
            .withFileType(BulkFileType.PARQUET)
            .withChunkSize(128 * 1024 * 1024)
            .build();

    try (LocalBulkWriter localBulkWriter = new LocalBulkWriter(bulkWriterParam)) {
        // append rows
        Gson GSON_INSTANCE = new Gson();
        for (int i = 0; i < 10000; i++) {
            JsonObject row = new JsonObject();
            row.addProperty("path", "path_" + i);
            row.add("vector", GSON_INSTANCE.toJsonTree(GeneratorUtils.genFloatVector(DIM)));
            row.addProperty("label", "label_" + i);

            localBulkWriter.appendRow(row);
        }

        localBulkWriter.commit(false);
        List<List<String>> batchFiles = localBulkWriter.getBatchFiles();
        System.out.printf("Local writer done! output local files: %s%n", batchFiles);
    } catch (Exception e) {
        System.out.println("Local writer catch exception: " + e);
        throw e;
    }
}
```

