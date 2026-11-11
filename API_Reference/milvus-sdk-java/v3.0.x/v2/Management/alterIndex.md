# alterIndex()

This operation alters the properties of a specified index.

**Deprecated.** Replaced by `alterIndexProperties()` since SDK v2.5.3, to keep consistency with other SDKs.

```java
public Void alterIndex(AlterIndexReq request)
```

## Request Syntax

```java
alterIndex(AlterIndexReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .indexName(String indexName)
    .properties(Map<String, String> properties)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database that holds the target collection.

- `collectionName(String collectionName)`

    The name of the target collection.

- `indexName(String indexName)`

    The name of the target index.

- `properties(Map<String, String> properties)`

    The properties to modify and their expected values. Note that the property values should be strings.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.index.request.AlterIndexReq;
import java.util.HashMap;
import java.util.Map;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Alter index properties
Map<String, String> properties = new HashMap<>();
properties.put("mmap.enabled", "true");
client.alterIndex(AlterIndexReq.builder()
        .collectionName("my_collection")
        .indexName("my_index")
        .properties(properties)
        .build());
```
