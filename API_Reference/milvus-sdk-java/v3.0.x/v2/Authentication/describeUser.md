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

**RETURNS:**

*DescribeUserResp*

A **DescribeUserResp** object that contains `userName`, `roles`, and `description`. The object has the following fields:

- **userName** (*String*) -

    The name of the user.

- **roles** (*List\<String\>*) -

    The roles assigned to the user.

- **description** (*String*) -

    The description of the user.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.service.rbac.request.DescribeUserReq;
import io.milvus.v2.service.rbac.response.DescribeUserResp;

DescribeUserResp resp = client.describeUser(DescribeUserReq.builder()
    .userName("analyst_user")
    .build());
System.out.println(resp.getDescription());
```
