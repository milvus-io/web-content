# grantPrivilege()

This operation assigns a privilege to a role.

```java
public void grantPrivilege(GrantPrivilegeReq request)
```

## Request Syntax

```java
grantPrivilege(GrantPrivilegeReq.builder()
    .roleName(String roleName)
    .objectType(String objectType)
    .privilege(String privilege)
    .objectName(String objectName)
    .build()
)
```

**BUILDER METHODS:**

- `roleName(String roleName)`

    The name of the role to assign privileges to.

- `objectType(String objectType)`

    The type of the privilege object to assign. 

    Possible values are **Global**, **Collection**, and **User**.

- `privilege(String privilege)`

    The name of the privilege to assign. 

    For details, refer to the **Privilege name** column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- `objectName(String objectName)`

    The name of the API to assign. 

    You can either use the wildcard (*) to include all applicable APIs in the specified privilege or fill in a specific API. For details, refer to the Relevant API column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
GrantPrivilegeReq grantPrivilegeReq = GrantPrivilegeReq.builder()
        .roleName("db_rw")
        .objectName("")
        .objectType("")
        .privilege("")
        .build();
client.grantPrivilege(grantPrivilegeReq);
```
