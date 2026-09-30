# VolumeBulkWriter

Configures a VolumeBulkWriter, including its collection schema, output path, and volume connection.

```java
public class VolumeBulkWriter
```

<div class="alert note">

A **VolumeBulkWriter** object intends to rewrite your raw data to a Zilliz Cloud Volume in a format that Milvus understands.

</div>

**BUILDER METHODS:**

- `withCollectionSchema(CollectionSchemaParam collectionSchema)`

    The schema of the target collection, defined with `CollectionSchemaParam`. The builder converts it to the v2 collection schema internally.

- `withCollectionSchema(CreateCollectionReq.CollectionSchema collectionSchema)`

    The schema of the target collection, defined with [`CreateCollectionReq.CollectionSchema`](https://zilliverse.feishu.cn/docx/FxUxdWGz2oUh1ixyquZcAndBnAf).

- `withRemotePath(String remotePath)`

    The path in the target volume where the rewritten data files are stored.

- `withChunkSize(long chunkSize)`

    The maximum size of each generated file segment, in bytes. The value defaults to **134,217,728** bytes (**128 MB**).

- `withFileType(BulkFileType fileType)`

    The output file format. For available values, refer to [`BulkFileType`](../BulkFileType.md).

- `withConfig(String key, Object value)`

    An optional key-value configuration for output-file processing. For `CSV` output, use `sep` to set the delimiter and `nullkey` to set the string that represents a null value.

- `withCloudEndpoint(String cloudEndpoint)`

    The Zilliz Cloud public API endpoint. Set this value to `https://api.cloud.zilliz.com`.

- `withApiKey(String apiKey)`

    The Zilliz Cloud API key used to authenticate the request.

- `withVolumeName(String volumeName)`

    The name of the target Zilliz Cloud volume.

- `withConnectType(ConnectType connectType)`

    The connection strategy used to access the volume. The value defaults to `ConnectType.AUTO`.

## Example

Configures a VolumeBulkWriter, including its collection schema, output path, and volume connection.

```java
VolumeBulkWriterParam params = VolumeBulkWriterParam.newBuilder()
    .withCollectionSchema(collectionSchema)
    .withRemotePath("imports/books")
    .withCloudEndpoint(CLOUD_ENDPOINT)
    .withApiKey(API_KEY)
    .withVolumeName("bulk-data")
    .build();
VolumeBulkWriter writer = new VolumeBulkWriter(params);
```
