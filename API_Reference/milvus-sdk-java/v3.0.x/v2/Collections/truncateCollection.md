# truncateCollection()

This operation removes all data from a collection while preserving the collection schema, indexes, and aliases.

```java
client.truncateCollection(TruncateCollectionReq request)
```

## Request Syntax

```java
TruncateCollectionReq.builder()
    .collectionName(String collectionName)
    .databaseName(String databaseName)
    .build()
```

**BUILDER METHODS:**

- `collectionName(String collectionName)` -

    **[REQUIRED]**

    The name of the collection to truncate.

- `databaseName(String databaseName)` -

    The name of the database containing the collection. If not specified, the default database is used.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException** - The specified collection does not exist or the server is unreachable.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import java.util.Collections;
import io.milvus.v2.service.collection.request.TruncateCollectionReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection with an "id" field, a "vector" field, and a "varchar" field
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(2).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("varchar").dataType(DataType.VarChar).maxLength(256).build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("vector")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

// 3. Truncate the collection
TruncateCollectionReq req = TruncateCollectionReq.builder()
    .collectionName("my_collection")
    .build();

client.truncateCollection(req);
```
