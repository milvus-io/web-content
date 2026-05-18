# getTotalRowCount()

This operation returns the total number of rows written by this LocalBulkWriter instance.

```java
public Long getTotalRowCount()
```

**RETURNS:**

*Long*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
LocalBulkWriter writer = new LocalBulkWriter(config);
// ... append rows
Long totalRows = writer.getTotalRowCount();
System.out.println("Total rows written: " + totalRows);
```
