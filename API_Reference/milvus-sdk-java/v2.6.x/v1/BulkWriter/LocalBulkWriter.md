# LocalBulkWriter

A LocalBulkWriter instance rewrites your raw data locally in a format that Milvus understands.

```java
LocalBulkWriter(LocalBulkWriterParam bulkWriterParam)
```

Methods of `LocalBulkWriter`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>appendRow(JsonObject rowData)</p></td>
        <td><p>Append a row into buffer. Once the buffer size exceeds a threshold, the writer will persist the buffer to data file.</p></td>
        <td><p>rowData: A gson.JsonObject to store the data of a row.<br/>For each field:<br/>- If dataType is Bool/Int8/Int16/Int32/Int64/Float/Double/Varchar, use JsonObject.addProperty(key, value) to input;<br/>- If dataType is FloatVector, use JsonObject.add(key, gson.toJsonTree(List[Float]) to input;<br/>- If dataType is BinaryVector/Float16Vector/BFloat16Vector, use JsonObject.add(key, gson.toJsonTree(byte[])) to input;<br/>- If dataType is SparseFloatVector, use JsonObject.add(key, gson.toJsonTree(SortedMap[Long, Float])) to input;<br/>- If dataType is Array, use JsonObject.add(key, gson.toJsonTree(List of Boolean/Integer/Short/Long/Float/Double/String)) to input;<br/>- If dataType is JSON, use JsonObject.add(key, JsonElement) to input;</p></td>
    </tr>
    <tr>
        <td><p>commit(boolean async)</p></td>
        <td><p>Force persist data files and complete the writer.</p></td>
        <td><p>async: Set to true to wait until all data files are persisted.</p></td>
    </tr>
    <tr>
        <td><p>getBatchFiles()</p></td>
        <td><p>Returns a List&lt;List&lt;String>gt; of the persisted data files. Each List&lt;String> is a batch files that can be input as a job for the bulkinsert interface.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

#### LocalBulkWriterParam

Use the `LocalBulkWriterParam.Builder` to construct a `LocalBulkWriterParam` object.

```java
import io.milvus.bulkwriter.LocalBulkWriterParam;
LocalBulkWriterParam.Builder builder = LocalBulkWriterParam.newBuilder();
```

Methods of `LocalBulkWriterParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionSchema(CollectionSchemaParam collectionSchema)</p></td>
        <td><p>Sets the collection schema. See the CollectionSchemaParam description in the Collection.createCollection() section.</p></td>
        <td><p>collectionSchema: collection schema</p></td>
    </tr>
    <tr>
        <td><p>withLocalPath(tring localPath)</p></td>
        <td><p>Sets the local path to output the data files.</p></td>
        <td><p>localPath: A local path.</p></td>
    </tr>
    <tr>
        <td><p>withChunkSize(int chunkSize)</p></td>
        <td><p>Sets the maximum size of a data chunk.<br/>While rewriting your raw data, This tool splits your raw data into chunks.<br/>The value defaults to 128 MB.</p></td>
        <td><p>chunkSize: the maximum size of a data chunk.</p></td>
    </tr>
    <tr>
        <td><p>withFileType(BulkFileType fileType)</p></td>
        <td><p>The type of the output file. Currently, only PARQUET is available.</p></td>
        <td><p>fileType: The output file type.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a LocalBulkWriterParam object</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

#### Example

```java
import io.milvus.bulkwriter.*;
import io.milvus.bulkwriter.common.clientenum.BulkFileType;
import io.milvus.param.collection.CollectionSchemaParam;

CollectionSchemaParam collectionSchema = CollectionSchemaParam.newBuilder()
        .addFieldType(FieldType.newBuilder()
                .withName("id")
                .withDataType(DataType.Int64)
                .withPrimaryKey(true)
                .withAutoID(false)
                .build())
        .addFieldType(FieldType.newBuilder()
                .withName("vector")
                .withDataType(DataType.FloatVector)
                .withDimension(DIM)
                .build())
        .build();
        
LocalBulkWriterParam bulkWriterParam = LocalBulkWriterParam.newBuilder()
        .withCollectionSchema(collectionSchema)
        .withLocalPath("/tmp/bulk_writer")
        .withFileType(fileType)
        .withChunkSize(512 * 1024 * 1024)
        .build();

try (LocalBulkWriter localBulkWriter = new LocalBulkWriter(bulkWriterParam)) {
    Gson gson = new Gson();
    for (int i = 0; i < 100000; i++) {
        JsonObject row = new JsonObject();
        row.addProperty("id", i);
        row.add("vector", gson.toJsonTree(GeneratorUtils.genFloatVector(DIM)));

        localBulkWriter.appendRow(row);
    }

    localBulkWriter.commit(false);
    List<List<String>> batchFiles = localBulkWriter.getBatchFiles();
    System.out.printf("Local writer done! output local files: %s%n", batchFiles);
} catch (Exception e) {
    System.out.println("Local writer catch exception: " + e);
    throw e;
}
```
