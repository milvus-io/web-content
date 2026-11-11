# alterDatabase()

This operation alters the properties of a specified database.

**Deprecated.** Replaced by `alterDatabaseProperties()` since SDK v2.5.3, to keep consistency with other SDKs.

```java
public Void alterDatabase(AlterDatabaseReq request)
```

## Request Syntax

```java
alterDatabase(AlterDatabaseReq.builder()
    .databaseName(String databaseName)
    .properties(Map<String, String> properties)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the target database.

- `properties(Map<String, String> properties)`

    The properties to modify and their expected values. Note that the property values should be strings. Available database properties are as follows:

    - **database.replica.number** -

        Number of replicas for the database.

    - **database.resource_groups** -

        Resource groups dedicated to the database.

    - **database.diskQuota.mb** -

        The disk quota of the database in MB.

    - **database.max.collections** -

        Maximum number of collections allowed in the database.

    - **database.force.deny.writing** -

        Whether to deny all write operations in the database.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.database.request.AlterDatabaseReq;
import java.util.HashMap;
import java.util.Map;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Alter database properties
Map<String, String> properties = new HashMap<>();
properties.put("database.replica.number", "3");
client.alterDatabase(AlterDatabaseReq.builder()
        .databaseName("my_database")
        .properties(properties)
        .build());
```
