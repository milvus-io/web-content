# dropDatabaseProperties()

This operation resets the database properties to their default values.

```java
public Void dropDatabaseProperties(DropDatabasePropertiesReq request)
```

## Request Syntax

```java
dropDatabaseProperties(DropDatabasePropertiesReq.builder()
    .databaseName(String databaseName)
    .propertyKeys(List<String> propertyKeys)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database.

- `propertyKeys(List<String propertyKeys>)`

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
import io.milvus.v2.service.database.request.DropDatabasePropertiesReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Drop database properties
List<String> propertyKeys = new ArrayList<>();
propertyKeys.add("database.replica.number");

DropDatabasePropertiesReq dropDatabasePropertiesReq = DropDatabasePropertiesReq.builder()
        .databaseName(databaseName)
        .propertyKeys(propertyKeys)
        .build();
client.dropDatabaseProperties(alterDatabaseReq);
```

