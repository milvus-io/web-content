# alterCollectionField()

This operation modifies the properties of a specified collection field.

```java
public Void alterCollectionField(AlterCollectionFieldReq request)
```

## Request Syntax

```java
alterCollectionField(AlterCollectionFieldReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .fieldName(String fieldName)
    .properties(Map<String, String> properties)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database that holds the target collection.

- `collectionName(String collectionName)`

    **[REQUIRED]**

    The name of the target collection.

- `fieldName(String fieldName)`

    **[REQUIRED]**

    The name of the target field.

- `properties(Map<String, String> properties)`

    **[REQUIRED]**

    The properties to modify and their expected values. Note that the property values should be strings. Available database properties are as follows:

    - **max_length** -

        The maximum byte length for strings allowed to be inserted. Note that multibyte characters (e.g., Unicode characters) may occupy more than one byte each, so ensure the byte length of inserted strings does not exceed the specified limit. Value range: [1, 65,535].

        This is mandatory for a varchar field.

    - **max_capacity** -

        The number of elements in an Array field value.

        This is mandatory for an array field.

    - **mmap_enabled** -

        Whether Milvus maps the field data into memory instead of fully loading it. For details, refer to MMap-enabled Data Storage.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.AlterCollectionFieldReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Alter the `max_length` property of a VarChar field named `varchar`
Map<String, String> properties = new HashMap<>()
properties.put("max_length", "512")

AlterCollectionFieldReq alterCollectionFieldReq = AlterCollectionFieldReq.builder()
        .collectionName("test")
        .fieldName("varchar")
        .properties(properties)
        .build();
client.alterCollectionField(alterCollectionFieldReq)
```

