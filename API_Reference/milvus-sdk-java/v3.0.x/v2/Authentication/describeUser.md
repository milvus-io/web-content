# describeUser()

This operation returns the roles assigned to a user and the user description.

```java
public DescribeUserResp describeUser(DescribeUserReq request)
```

## Request Syntax

```java
DescribeUserResp resp = client.describeUser(DescribeUserReq.builder()
    .userName(String userName)
    .build()
);
```

**BUILDER METHODS:**

- `userName(String userName)`

    **[REQUIRED]**

    The name of the user to describe.

**RETURN TYPE:**

*DescribeUserResp*

**RETURNS:**

A **DescribeUserResp** object that contains `userName`, `roles`, and `description`.

- `getUserName()` (*String*) -

    The name of the user.

- `getRoles()` (*List\<String\>*) -

    The roles assigned to the user.

- `getDescription()` (*String*) -

    The description of the user.

**EXCEPTIONS