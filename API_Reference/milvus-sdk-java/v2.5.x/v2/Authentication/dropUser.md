# dropUser()

This operation drops a user.

```java
public void dropUser(DropUserReq request)
```

## Request Syntax

```java
dropUser(DropUserReq.builder()
    .userName(String userName)
    .build()
)
```

**BUILDER METHODS:**

- `userName(String userName)`

    The name of the user to drop.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
DropUserReq dropUserReq = DropUserReq.builder()
        .userName("test")
        .build();
client.dropUser(dropUserReq);
```
