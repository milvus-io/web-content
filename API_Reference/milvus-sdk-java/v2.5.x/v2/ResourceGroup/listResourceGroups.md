# listResourceGroups()

This operation lists all resource groups.

```java
public ListResourceGroupsResp listResourceGroups(ListResourceGroupsReq request)
```

## Request Syntax

```java
listResourceGroups(ListResourceGroupsReq.builder()
    .build()
)
```

**RETURN TYPE:**

*ListResourceGroupsResp*

**RETURNS:**

A **ListResourceGroupsResp** object is a list of group names in strings.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.resourcegroup.request.ListResourceGroupsReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. List resource groups    
ListResourceGroupsReq listResourceGroupsReq = ListResourceGroupsReq.builder()
    .build();
List<String> groupNames = client.listResourceGroups(listResourceGroupsReq);
```

