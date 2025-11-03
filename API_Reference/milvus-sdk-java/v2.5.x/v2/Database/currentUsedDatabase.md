# currentUsedDatabase()

This operation checks the database that is currently in use and returns the name of the database.

```java
public String currentUsedDatabase()
```

## Request Syntax

```java
currentUsedDatabase()
```

RETURN TYPE

String

RETURNS

The name of the database currently in use.

## Examples

```java
import io.milvus.param.Constant;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Get the database currently in use
String currentUsedDatabase = client.currentUsedDatabase();
```
