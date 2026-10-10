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

**RETURN TYPE:**

*DescribeRoleResp*

**RETURNS:**

A **DescribeRoleResp** object that contains `roleName`, `grantInfos`, and `description`.

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

        The user who granted the privilege.

    - `getPrivilege()` (*String*) -

        The granted privilege.

    - `getDbName()` (*String*) -

        The name of the database.

- `getDescription()` (*String*) -

    The description of the role.

**EXCEPTIONS