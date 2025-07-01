# listPrivilegeGroups()

This operation lists all privilege groups.

```java
public ListPrivilegeGroupsResp listPrivilegeGroups(ListPrivilegeGroupsReq request)
```

## Request Syntax

```java
listPrivilegeGroups(ListPrivilegeGroupsReq.builder()
    .build()
)
```

**RETURN TYPE:**

*ListPrivilegeGroupsResp*

**RETURNS:**

A **ListPrivilegeGroupsResp** object contains the following fields:

- **privilegeGroups** (*List\<PrivilegeGroup>*) -

    A list of privilege groups, each of which is a **PrivilegeGroup** object.

    - **groupName** (String) -

        The name of the current privilege group.

    - **privileges** (List\<String>) - 

        The privileges added into the current privilege group.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.PrivilegeGroup;
import io.milvus.v2.service.rbac.request.ListPrivilegeGroupsReq;
import io.milvus.v2.service.rbac.response.ListPrivilegeGroupsResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. List privilege groups
ListPrivilegeGroupsReq listPrivilegeGroupsReq = ListPrivilegeGroupsReq.builder()
        .build();
        
ListPrivilegeGroupsResp resp = client.listPrivilegeGroups(listPrivilegeGroupsReq);
List<PrivilegeGroup> groups = resp.getPrivilegeGroups();
for (PrivilegeGroup group : groups) {
    System.out.println(group.getGroupName() + group.getPrivileges());
}
```

