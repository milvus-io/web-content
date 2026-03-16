# removePrivilegesFromGroup()

This operation removes privileges from a specific privilege group.

```java
public Void removePrivilegesFromGroup(RemovePrivilegesFromGroupReq request)
```

## Request Syntax

```java
removePrivilegesFromGroup(RemovePrivilegesFromGroupReq.builder()
    .groupName(String groupName)
    .privileges(List<String> privileges)
    .build()
)
```

**BUILDER METHODS:**

- `groupName(String groupName)`

    The name of the target privilege group.

- `privileges(List<String> privileges)`

    The privileges to be deleted from the specified privilege groups. For details on possible privileges, refer to [Grant Privileges or Privilege Group to Roles](https://milvus.io/docs/grant_privileges.md).

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.request.RemovePrivilegesFromGroupReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Remove privileges from a group
List<String> privileges = new ArrayList<>();
privileges.add("Query", "Search")

RemovePrivilegesFromGroupReq removePrivilegesFromGroupReq = RemovePrivilegesFromGroupReq.builder()
        .groupName("read_only")
        .privileges(privileges)
        .build();
        
client.removePrivilegesFromGroup(addPrivilegesToGroupReq);
```

