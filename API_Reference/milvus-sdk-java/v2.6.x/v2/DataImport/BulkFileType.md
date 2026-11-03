# BulkFileType

This is an enumeration that provides the following constants.
```java
public enum BulkFileType
```


**Constants:**

- **PARQUET**

    Sets the file type to [Parquet](https://parquet.apache.org/) (*.parquet*).

- **JSON**

    Sets the file type to JSON (*.json*).

- **CSV**

    Sets the file type to CSV (*.csv*)

## Example

```java
import io.milvus.bulkwriter.LocalBulkWriterParam;
import io.milvus.bulkwriter.common.clientenum.BulkFileType;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.CollectionSchema collectionSchema = CreateCollectionReq.CollectionSchema.builder().build();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());

LocalBulkWriterParam bulkWriterParam = LocalBulkWriterParam.newBuilder()
        .withCollectionSchema(collectionSchema)
        .withLocalPath("/tmp/bulk_writer")
        .withFileType(BulkFileType.PARQUET)
        .build();
```
