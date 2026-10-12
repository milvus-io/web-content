# useDatabase()

This operation changes the database in use.

```java
public void useDatabase(String dbName) throws InterruptedException
```

## Request Syntax

```java
useDatabase(String dbName)
```

**PARAMETERS:**

- **dbName** (*String*) -

    The name of the target database.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **IllegalArgumentException**

    Raised when `dbName` is null.

- **RuntimeException**

    Raised when the operation is interrupted while re-establishing the connection.

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

// 2. Switch the client to another database
client.useDatabase("my_database");
```
