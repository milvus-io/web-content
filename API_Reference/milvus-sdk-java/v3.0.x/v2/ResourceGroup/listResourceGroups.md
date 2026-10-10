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

**RETURN TYPE:**

*ListResourceGroupsResp*

**RETURNS:**

A **ListResourceGroupsResp** object that contains a list of group names.

- `getGroupNames()` (*List\<String\>*) -

    The names of all resource groups.

**EXCEPTIONS