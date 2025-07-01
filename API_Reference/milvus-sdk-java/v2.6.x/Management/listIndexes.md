# listIndexes()

This operation lists the indexes of a field in a specific collection.

```java
public List<String> listIndexes(ListIndexesReq request)
```

## Request Syntax

```java
listIndexes(ListIndexesReq.builder()
    .collectionName(String collectionName)
    .fieldName(String fieldName)
    .build()
)
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of a collection.

- `fieldName(String fieldName)`

    The name of the target field.

**RETURNS:**

*List\<String>*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.index.request.ListIndexesReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. List the indexes on the `varchar` field in the `test` collection
ListIndexesReq listIndexesReq = ListIndexesReq.builder()
        .collectionName("test")
        .fieldName("varchar")
        .build();
        
List<String> indexes = client.listIndexes(ListIndexesReq);
```

