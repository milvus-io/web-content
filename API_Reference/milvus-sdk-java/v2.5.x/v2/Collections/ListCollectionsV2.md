# ListCollectionsV2()

This operation lists all existing collections in a specified database.

```java
public ListCollectionsResp listCollectionsV2(ListCollectionsReq request)
```

## Request Syntax

```java
listCollectionsV2(ListCollectionsReq.builder()
    .databaseName(String databaseName)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the target database. Once specified, this operation returns all collections in the specified database.

**RETURN TYPE:**

*ListCollectionsResp*

**RETURNS:**

A **ListCollectionsResp** object containing a list of collection names. If there is not any collection, an empty list will be returned.

**PARAMETERS:**

- **collectionNames** (*List&lt;String&gt;*)

- **collectionInfos** (*List&lt;CollectionInfo&gt;*)

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.ListCollectionsReq;
import io.milvus.v2.service.collection.response.ListCollectionsResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. List collections
ListCollectionReq listCollectionReq = ListCollectionReq.builder()
    .databaseName("my_database")
    .build();

ListCollectionsResp listAliasResp = client.listCollectionsV2(listCollectionReq);
```

