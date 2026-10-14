# describeRole()

This operation returns the privileges granted to a role and the role description.

```java
public DescribeRoleResp describeRole(DescribeRoleReq request)
```

## Request Syntax

```java
DescribeRoleResp resp = client.describeRole(DescribeRoleReq.builder()
    .roleName(String roleName)
    .dbName(String dbName)
    .build()
);
```

**BUILDER METHODS:**

- `roleName(String roleName)`

    **[REQUIRED]**

    The name of the role to describe.

- `dbName(String dbName)`

    The name of the database that holds the target role.

**RETURN TYPE:**

*DescribeRoleResp*

**RETURNS:**

A **DescribeRoleResp** object that contains `roleName`, `grantInfos`, and `description`. The object exposes the following getters:

- `getRoleName()` (*String*) -

    The name of the role.

- `getGrantInfos()` (*List\<GrantInfo\>*) -

    The privilege grants of the role. Each **GrantInfo** has the following getters:

    - `getObjectType()` (*String*) -

        The type of the object to which the privilege applies.

    - `getObjectName()` (*String*) -

        The name of the object to which the privilege applies.

    - `getRoleName()` (*String*) -

        The name of the role.

    - `getGrantor()` (*String*) -

        The name of the user who granted the privilege.

    - `getPrivilege()` (*String*) -

        The name of the privilege.

    - `getDbName()` (*String*) -

        The name of the database in which the privilege applies.

- `getDescription()` (*String*) -

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
