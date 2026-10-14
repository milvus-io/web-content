# commit()

This operation commits the appended data.

```java
 public void commit(boolean async)
```

## Request Syntax

```java
localBulkWriter.commit(
    boolean async
)
```

**PARAMETERS:**

- **async** (*boolean*) -

    Whether the commit operation returns immediately after being called.

**RETURN TYPE:**

*void*

**RETURNS:**

This operation returns no value.

## Examples

```java
localBulkWriter.commit(false);
```
