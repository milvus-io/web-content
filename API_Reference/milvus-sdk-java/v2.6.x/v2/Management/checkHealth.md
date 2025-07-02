# checkHealth()

This operation checks the health condition of the current Milvus instance.

```java
public CheckHealthResp checkHealth()
```

## Request syntax

```java
CheckHealthResp()
```

**BUILDER METHODS:**

None

**RETURN TYPE:**

*CheckHealthResp*

**RETURNS**

A **CheckHealthResp** object that contains detailed information about the current Milvus instance. The object has the following fields:

- **isHealthy** (*Boolean*) -

    Whether the current Milvus instance is in a healthy state.

- **reasons** (*List\<String>*) -

    Return the unhealthy reasons if the server is in an unhealthy state.

- **quotaStates** (*List\<String>*) - 

    The names of unhealthy states. The following names could be in the list: "*ReadLimited*", "*WriteLimited*", "*DenyToRead*", "*DenyToWrite*", "*DenyToDDL*".

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.response.CheckHealthResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Check healthy
CheckHealthResp healthyResp = client.checkHealth();
```

