# VolumeBulkWriter

A **VolumeBulkWriter** instance rewrites your raw data to a Zilliz Cloud Volume in a format that Milvus understands.

```java
io.milvus.bulkwriter.VolumeBulkWriter
```

## Constructor

Constructs a **VolumeBulkWriter** instance by schema, output path, segment size, and file type.

<div class="alert note">

A **VolumeBulkWriter** object intends to rewrite your raw data to a Zilliz Cloud Volume in a format that Milvus understands.

</div>

```java
VolumeBulkWriter(VolumeBulkWriterParam bulkWriterParam)
```

**PARAMETERS:**

- **bulkWriterParam** (*VolumeBulkWriterParam*) -

    A [VolumeBulkWriterParam](VolumeBulkWriter.md) instance.

## VolumeBulkWriterParam

**VolumeBulkWriterParam** allows you to configure properties for your **VolumeBulkWriter** instances in one place so that you can instantiate the **VolumeBulkWriter** class.

```java
VolumeBulkWriterParam.newBuilder()
    .withCollectionSchema(CreateCollectionReq.CollectionSchema collectionSchema)
    .withLocalPath(String localPath)
    .withChunkSize(long chunkSize)
    .withFileType(BulkFileType fileType)
    .withConfig(String key, Object val)
    .withCloudEndpoint(string cloudEndpoint)
    .withApiKey(string apiKey)
    .withVolumeName(string volumeName)
    .build()
```

**BUILDER METHODS:**

- `withCollectionSchema(CreateCollectionReq.CollectionSchema collectionSchema)`

    The schema of the target collection that is defined by instantiating **CreateCollectionReq.CollectionSchema**.

- `withLocalPath(String localPath)`

    The path to the directory that is to hold the rewritten data.

- `withChunkSize(long chunkSize)`

    The maximum size of a file segment. While rewriting your raw data, Milvus splits it into segments.

    The value defaults to **536,870,912** in bytes, which is **512 MB**.

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

- `withCloudEndpoint(string cloudEndpoint)`

    The Zilliz Cloud public endpoint is always `https:*//*api.cloud.zilliz.com`.

- `withApiKey(string apiKey)`

    A valid Zilliz Cloud API key with sufficient permissions to operate resources related to this operation.

- `withVolumeName(string volumeName)`

    A valid volume name. Ensure that the volume by the specified name exists.

## Example

```java
import com.google.gson.JsonObject;
import io.milvus.bulkwriter.VolumeBulkWriter;
import io.milvus.bulkwriter.VolumeBulkWriterParam;
import io.milvus.bulkwriter.common.clientenum.BulkFileType;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

private static void volumeWriter(CreateCollectionReq.CollectionSchema collectionSchema) throws Exception {
    VolumeBulkWriterParam bulkWriterParam = VolumeBulkWriterParam.newBuilder()
            .withCollectionSchema(collectionSchema)
            .withLocalPath("/tmp/bulk_writer")
            .withFileType(BulkFileType.PARQUET)
            .withChunkSize(128 * 1024 * 1024)
            .withCloudEndpoint("https://api.cloud.zilliz.com")
            .withApiKey("YOUR_API_KEY")
            .withVolumeName("my_volume")
            .build();

    try (VolumeBulkWriter volumeBulkWriter = new VolumeBulkWriter(bulkWriterParam)) {
        // append rows
        Gson GSON_INSTANCE = new Gson();
        for (int i = 0; i < 10000; i++) {
            JsonObject row = new JsonObject();
            row.addProperty("path", "path_" + i);
            row.add("vector", GSON_INSTANCE.toJsonTree(GeneratorUtils.genFloatVector(DIM)));
            row.addProperty("label", "label_" + i);

            volumeBulkWriter.appendRow(row);
        }

        volumeBulkWriter.commit(false);
        List<List<String>> batchFiles = volumeBulkWriter.getBatchFiles();
        System.out.printf("Volume writer done! output local files: %s%n", batchFiles);
    } catch (Exception e) {
        System.out.println("Local writer catch exception: " + e);
        throw e;
    }
}
```

