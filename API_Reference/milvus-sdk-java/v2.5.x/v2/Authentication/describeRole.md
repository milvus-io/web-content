# describeRole()

This operation describes a specific role.

```java
public DescribeRoleResp describeRole(DescribeRoleReq request)
```

## Request Syntax

```java
describeRole(DescribeRoleReq.builder()
    .roleName(String roleName)
    .build()
)
```

**BUILDER METHODS:**

- `roleName(String roleName)`

    The name of the role to describe.

**RETURN Type:**

*DescribeRoleResp.GrantInfo*

**RETURNS:**

A **DescribeRoleResp.GrantInfo** object representing the permissions assigned to the role.

**PARAMETERS:**

- **objectType** (*String*):
The type of the object being granted a privilege.

- **privilege** (*String*):
The specific privilege granted to the object.

- **objectName** (*String*):
The name of the object to which the privilege is granted.

- **dbName** (*String*):
The name of the database associated with the granted privilege.

- **grantor** (*String*):
The name of the entity (user or role) that granted the privilege.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.request.DescribeUserReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Describe a role
DescribeRoleReq describeRoleReq = DescribeRoleReq.builder()
        .roleName("test")
        .build();
client.describeRole(describeRoleReq);
```
