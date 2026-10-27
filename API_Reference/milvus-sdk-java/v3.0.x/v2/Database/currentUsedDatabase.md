# currentUsedDatabase()

This operation returns the name of the database currently being used by this client.

```java
public String currentUsedDatabase()
```

**RETURN TYPE:**

*String*

**RETURNS:**

The name of the currently active database.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Get the current database in use
String dbName = client.currentUsedDatabase();
System.out.println("Current database: " + dbName);
```
