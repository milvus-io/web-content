# describeUser()

This operation describes a specific user.

```java
public DescribeUserResp describeUser(DescribeUserReq request)
```

## Request Syntax

```java
describeUser(DescribeUserReq.builder()
    .userName(String userName)
    .build()
)
```

**BUILDER METHODS:**

- `userName(String userName)`

    The name of the user to describe.

**RETURN TYPE:**

*DescribeUserResp*

**RETURNS:**

A **DescribeUserResp** object containing the details of the user.

**PARAMETERS:**

- **roles** (*List\<String\>*) -

    A list of role names associated with the user.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
DescribeUserReq describeUserReq = DescribeUserReq.builder()
        .userName("test")
        .build();
DescribeUserResp describeUserResp = client.describeUser(describeUserReq);
```

