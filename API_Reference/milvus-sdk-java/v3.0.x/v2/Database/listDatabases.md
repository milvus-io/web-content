# listDatabases()

This operation lists all the database names. 

```java
public ListDatabasesResp listDatabases()
```

**RETURN TYPE:**

*ListDatabasesResp*

**RETURNS:**

A ListDatabasesResp object contains a list of all database names.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.database.response.ListDatabasesResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. List databases
ListDatabasesResp listDatabasesResp = client.listDatabases();
List<String> dbNames = listDatabasesResp.getDatabaseNames();
```

