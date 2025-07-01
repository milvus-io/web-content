# alterDatabaseProperties()

This operation alters a database's properties. 

```java
public Void alterDatabaseProperties(AlterDatabasePropertiesReq request)
```

## Request Syntax

```java
alterDatabaseProperties(AlterDatabasePropertiesReq.builder()
    .databaseName(String databaseName)
    .properties(Map<String, String> properties)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database.

- `properties(Map<String, String> properties)`

    The properties of the database, such as replica number, resource groups. Possible database properties are as follows:

    - **database.replica.number** -

        Number of replicas for the database.

    - **database.resource_groups**  -

        Resource groups dedicated to the database.

    - **database.diskQuota.mb** -

        Disk quota allocated to the database in megabytes (**MB**).

    - **database.max.collections** -

        Maximum number of collections allowed in the database.

    - **database.force.deny.writing** -

        Whether to deny all write operations in the database.

    - **database.force.deny.reading** -

        Whether to deny all read operations in the database.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.database.request.AlterDatabasePropertiesReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Alter database properties
Map<String, String> properties = new HashMap<>();
properties.put("database.replica.number", "1");
AlterDatabasePropertiesReq alterDatabasePropertiesReq = AlterDatabasePropertiesReq.builder()
        .databaseName(databaseName)
        .properties(properties)
        .build();
client.alterDatabaseProperties(alterDatabaseReq);
```

