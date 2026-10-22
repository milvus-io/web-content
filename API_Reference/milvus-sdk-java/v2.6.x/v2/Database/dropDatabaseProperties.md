# dropDatabaseProperties()

This operation resets the database properties to their default values.

```java
public void dropDatabaseProperties(DropDatabasePropertiesReq request)
```

## Request Syntax

```java
dropDatabaseProperties(DropDatabasePropertiesReq.builder()
    .databaseName(String databaseName)
    .propertyKeys(List<String> propertyKeys)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `propertyKeys(List<String> propertyKeys)` -

    A list of property key names to drop.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.database.request.AlterDatabasePropertiesReq;
import io.milvus.v2.service.database.request.CreateDatabaseReq;
import io.milvus.v2.service.database.request.DropDatabasePropertiesReq;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);



// 2. Create a database and set a property
String databaseName = "my_database";
client.createDatabase(CreateDatabaseReq.builder().databaseName(databaseName).build());
Map<String, String> props = new HashMap<>();
props.put("database.replica.number", "1");
client.alterDatabaseProperties(AlterDatabasePropertiesReq.builder()
        .databaseName(databaseName)
        .properties(props)
        .build());

// 3. Drop database properties
List<String> propertyKeys = new ArrayList<>();
propertyKeys.add("database.replica.number");

DropDatabasePropertiesReq dropDatabasePropertiesReq = DropDatabasePropertiesReq.builder()
        .databaseName(databaseName)
        .propertyKeys(propertyKeys)
        .build();
client.dropDatabaseProperties(dropDatabasePropertiesReq);
```
