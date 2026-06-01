# createAlias()

This operation creates an alias for an existing collection.

```java
public void createAlias(CreateAliasReq request)
```

## Request Syntax

```java
createAlias(CreateAliasReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .alias(String alias)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    The name of the target collection.

- `alias(String alias)` -

    The alias name.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.request.CreateAliasReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create an alias "test_alias" for collection "test"
CreateAliasReq createAliasReq = CreateAliasReq.builder()
        .databaseName("my_database")
        .collectionName("my_collection")
        .alias("test_alias")
        .build();
client.createAlias(createAliasReq);
```
