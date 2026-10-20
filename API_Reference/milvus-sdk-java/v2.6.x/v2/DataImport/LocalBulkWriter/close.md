# close()

This operation closes the current LocalBulkWriter instance.

```java
public void close() throws Exception
```

## Request Syntax

```java
localBulkWriter.close()
```

**PARAMETERS:**

*None*

**RETURN TYPE:**

*void*

**RETURNS:**

This operation returns no value.

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

// 1. Define the collection schema and configure the writer
CreateCollectionReq.CollectionSchema schema = CreateCollectionReq.CollectionSchema.builder().build();
schema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
schema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(3).build());
LocalBulkWriterParam config = LocalBulkWriterParam.newBuilder()
        .withCollectionSchema(schema)
        .withLocalPath("/tmp/bulk_writer")
        .withFileType(BulkFileType.PARQUET)
        .build();

// 2. Create the writer and append a row
LocalBulkWriter localBulkWriter = new LocalBulkWriter(config);
JsonObject row = new JsonObject();
row.addProperty("id", 1L);
row.add("vector", new Gson().toJsonTree(new float[]{0.1f, 0.2f, 0.3f}));
localBulkWriter.appendRow(row);

// 3. Close the writer
localBulkWriter.close();
```
