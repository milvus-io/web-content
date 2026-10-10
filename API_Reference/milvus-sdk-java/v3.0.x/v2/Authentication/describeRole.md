# describeRole()

This operation returns the privileges granted to a role and the role description.

```java
public DescribeRoleResp describeRole(DescribeRoleReq request)
```

## Request Syntax

```java
DescribeRoleResp resp = client.describeRole(DescribeRoleReq.builder()
    .roleName(String roleName)
    .build()
);
```

**BUILDER METHODS:**

- `roleName(String roleName)`

    **[REQUIRED]**

    The name of the role to describe.

- `dbName(String dbName)`

    The name of the database that the role applies to. Defaults to the current database when omitted.

**RETURNS:**

*DescribeRoleResp*

A **DescribeRoleResp** object that contains `roleName`, `grantInfos`, and `description`. The object has the following fields:

- **roleName** (*String*) -

    The name of the role.

- **grantInfos** (*List\<GrantInfo\>*) -

    The privilege grants of the role. Each **GrantInfo** has the following fields:

    - **objectType** (*String*) -

        The type of the object to which the privilege applies.

    - **objectName** (*String*) -

        The name of the object to which the privilege applies.

    - **roleName** (*String*) -

        The name of the role.

    - **grantor** (*String*) -

        The user who granted the privilege.

    - **privilege** (*String*) -

        The granted privilege.

    - **dbName** (*String*) -

        The name of the database.

- **description** (*String*) -

    The description of the role.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.service.rbac.request.DescribeRoleReq;
import io.milvus.v2.service.rbac.response.DescribeRoleResp;

DescribeRoleResp resp = client.describeRole(DescribeRoleReq.builder()
    .roleName("analytics_reader")
    .build());
System.out.println(resp.getDescription());
```
