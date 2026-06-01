# dropCollectionFieldProperties()

This operation drops the specified properties of a field.

```java
public void dropCollectionFieldProperties(DropCollectionFieldPropertiesReq request)
```

## Request Syntax

```java
dropCollectionFieldProperties(DropCollectionFieldPropertiesReq.builder()
    .collectionName(String collectionName)
    .databaseName(String databaseName)
    .fieldName(String fieldName)
    .propertyKeys(List<String> propertyKeys)
    .build()
)
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of an existing collection.

- `databaseName(String databaseName)`

    The name of a database that has the collection mentioned above. 

- `fieldName(String fieldName)`

    The name of the target field in the specified collection.

- `propertyKeys(List<String> propertyKeys)`

    The names of the properties to drop from the specified field.

**RETURN TYPE:**

*void*

**RETURNS:** 

None

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.DropCollectionFieldPropertiesReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Drop field's properties
client.dropCollectionFieldProperties(DropCollectionFieldPropertiesReq.builder()
        .collectionName(collectionName)
        .fieldName("fieldName")
        .propertyKeys(Collections.singletonList(Constant.MMAP_ENABLED))
        .build());
```
