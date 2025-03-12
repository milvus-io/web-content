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

**RETURNS:**

A **ListResourceGroupsResp** object is a list of group names in strings.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
// prepare requests    
ListResourceGroupsReq listResourceGroupsReq = ListResourceGroupsReq.builder()
    .build();

// list resource groups
List<String> groupNames = client.listResourceGroups(listResourceGroupsReq);
```

