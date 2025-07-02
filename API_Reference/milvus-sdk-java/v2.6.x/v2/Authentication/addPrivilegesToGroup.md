# addPrivilegesToGroup()

This operation adds privileges to a specific privilege group.

```java
public Void addPrivilegesToGroup(AddPrivilegesToGroupReq request)
```

## Request Syntax

```java
addPrivilegesToGroup(AddPrivilegesToGroupReq.builder()
    .groupName(String groupName)
    .privileges(List<String> privileges)
    .build()
)
```

**BUILDER METHODS:**

- `groupName(String groupName)`

    The name of the target privilege group.

- `privileges(List<String> privileges)`

    The privileges to be added into the specified privilege groups. For details on possible privileges, refer to [Grant Privileges or Privilege Group to Roles](https://milvus.io/docs/grant_privileges.md).

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.request.AddPrivilegesToGroupReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. add privileges to group
List<String> privileges = new ArrayList<>();
privileges.add("Query", "Search")

AddPrivilegesToGroupReq addPrivilegesToGroupReq = AddPrivilegesToGroupReq.builder()
        .groupName("read_only")
        .privileges(privileges)
        .build();
        
client.addPrivilegesToGroup(addPrivilegesToGroupReq);
```

