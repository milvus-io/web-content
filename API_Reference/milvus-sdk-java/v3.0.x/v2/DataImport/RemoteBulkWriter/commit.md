# commit()

This operation commits the appended data.

```java
 public void commit(boolean async)
```

## Request Syntax

```java
remoteBulkWriter.commit(
    boolean async
)
```

**PARAMETERS:**

- **async** (*boolean*) -

    Whether the commit operation returns immediately after being called.

**RETURN TYPE:**

*void*

## Examples

```java
remoteBulkWriter.commit(false);
```
