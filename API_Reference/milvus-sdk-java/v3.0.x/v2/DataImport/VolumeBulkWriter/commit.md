# commit()

This operation commits the appended data.

```java
 public void commit(boolean async)
```

## Request Syntax

```java
volumeBulkWriter.commit(
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
volumeBulkWriter.commit(false);
```
