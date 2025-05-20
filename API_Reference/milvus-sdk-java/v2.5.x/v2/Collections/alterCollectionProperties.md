# alterCollectionProperties()

This operation modifies the properties of a specified collection.

```java
public Void alterCollectionProperties(AlterCollectionPropertiesReq request)
```

## Request Syntax

```java
alterCollectionProperties(AlterCollectionPropertiesReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .properties(Map<String, String> properties)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database that holds the target collection.

- `collectionName(String collectionName)`

    The name of the target collection.

- `properties(Map<String, String> properties)`

    The properties to modify and their expected values. Note that the property values should be strings. Available database properties are as follows:

    - **collection.ttl.seconds** -

        The time-to-live (TTL) of a collection in seconds.

    - **mmap.enabled** -

        Whether to enable mmap for the raw data and indexes of all fields in the collection.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Alter the `collection.ttl.seconds` property
Map<String, String> properties = new HashMap<>()
properties.put("collection.ttl.seconds", "86400")

AlterCollectionPropertiesReq alterCollectionFieldReq = AlterCollectionPropertiesReq.builder()
        .collectionName("test")
        .properties(properties)
        .build();
client.alterCollectionProperties(alterCollectionFieldReq)
```

