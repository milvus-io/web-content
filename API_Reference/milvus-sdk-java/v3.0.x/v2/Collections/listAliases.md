# listAliases()

This operation lists all existing aliases for a specific collection.

```java
public ListAliasResp listAliases()
```

## Request Syntax

```java
MilvusClientV2.listAliases(ListAliasesReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .build();
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database to which the target collection belongs.

- `collectionName(String collectionName)`

    The name of the target collection of this operation.

**RETURN TYPE:**

*ListAliasResp*

**RETURN TYPE:**

*ListAliasResp*

**RETURNS:**

A **ListAliasResp** object containing a list of aliases for the specified collection. If the collection has no aliases, an empty list will be returned.

- `getAlias()` (*List\<String\>*) -

    A list of strings containing the aliases.

- `getCollectionName()` (*String*) -

    The name of the collection.

- `getDbName()` (*String*) -

    The name of the database.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import java.util.Collections;
import io.milvus.v2.service.utility.request.CreateAliasReq;
import io.milvus.v2.service.utility.request.ListAliasesReq;
import io.milvus.v2.service.utility.response.ListAliasResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection with an "id" field and a "vector" field
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(2).build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("vector")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

// 3. Create an alias "test_alias" for collection "my_collection"
client.createAlias(CreateAliasReq.builder()
        .collectionName("my_collection")
        .alias("test_alias")
        .build());

// 4. List aliases
ListAliasesReq listAliasesReq = ListAliasesReq.builder()
        .collectionName("my_collection")
        .build();
ListAliasResp listAliasResp = client.listAliases(listAliasesReq);
```
