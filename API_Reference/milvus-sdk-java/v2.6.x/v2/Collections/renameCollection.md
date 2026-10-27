# renameCollection()

Renames a collection and can move it to another database.

```java
public void renameCollection(RenameCollectionReq request)
```

## Request Syntax

```java
RenameCollectionReq.builder()
    .databaseName(databaseName)
    .collectionName(collectionName)
    .newCollectionName(newCollectionName)
    .targetDbName(targetDbName)
    .build();
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database that contains the target resource.

- `collectionName(String collectionName)`

    The name of the target collection.

- `newCollectionName(String newCollectionName)`

    The new name to assign to the collection.

- `targetDbName(String targetDbName)`

    The name of the database to which the collection is moved.

**RETURN TYPE:**

*void*

**RETURNS:**

This operation returns no value.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    Raised when any error occurs during this operation. Inspect the exception message for the exact failure reason.

## Example

Renames a collection and can move it to another database.

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.RenameCollectionReq;
import java.util.Collections;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection named "books"
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(2).build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("vector")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("books")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

// 3. Rename collection "books" to "archive_books"
client.renameCollection(RenameCollectionReq.builder()
    .databaseName("default")
    .collectionName("books")
    .newCollectionName("archive_books")
    .build());
```
