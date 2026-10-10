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

A **ListPrivilegeGroupsResp** object contains the following getters:.

- `getPrivilegeGroups()` (*List<PrivilegeGroup>*) -

    A list of privilege groups, each of which is a **PrivilegeGroup** object.

    - `getGroupName()` (String) -

        The name of the current privilege group.

    - `getPrivileges()` (List<String>) -

        The privileges added into the current privilege group.

**EXCEPTIONS