# getTotalRowCount()

This operation returns the total number of rows written by this RemoteBulkWriter instance.

```java
public Long getTotalRowCount()
```

**RETURN TYPE:**

*Long*

**RETURNS:**

The total number of rows written by this RemoteBulkWriter instance.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
RemoteBulkWriter writer = new RemoteBulkWriter(config);
// ... append rows
Long totalRows = writer.getTotalRowCount();
System.out.println("Total rows written: " + totalRows);
```
