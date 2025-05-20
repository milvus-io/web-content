# alterIndexProperties()

This operation modifies the properties of a specified index.

```java
public Void alterIndexProperties(AlterIndexPropertiesReq request)
```

## Request Syntax

```java
alterIndexProperties(AlterIndexPropertiesReq.builder()
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

    The properties to modify and their expected values. Note that the property values should be strings. Available database properties are as follows:

    - **mmap.enabled** -

        Whether to enable mmap for the current index.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.index.request.AlterIndexPropertiesReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Alter the `mmap.enabled` property
Map<String, String> properties = new HashMap<>()
properties.put("mmap.enabled", "true")

AlterIndexPropertiesReq alterIndexPropertiesReq = AlterIndexPropertiesReq.builder()
        .collectionName("test")
        .indexName("vector")
        .properties(properties)
        .build();
client.alterIndexProperties(alterCollectionFieldReq)
```

