# describeDatabase()

This operation gets detailed information about a specific database.

```java
public DescribeDatabaseResp describeDatabase(DescribeDatabaseReq request)
```

## Request Syntax

```java
describeDatabase(DescribeDatabaseReq.builder()
    .databaseName(String databaseName)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database.

**RETURN TYPE**:

*DescribeDatabaseResp*

**RETURNS:**

A **DescribeDatabaseResp** object that contains detailed information about the specified database.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.param.Constant;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.database.request.DescribeDatabaseReq;
import io.milvus.v2.service.database.response.DescribeDatabaseResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Describe database
DescribeDatabaseResp descResp = client.describeDatabase(DescribeDatabaseReq.builder()
        .databaseName(databaseName)
        .build());
Map<String,String> propertiesResp = descResp.getProperties();
System.out.println(propertiesResp.get(Constant.DATABASE_REPLICA_NUMBER));
```

