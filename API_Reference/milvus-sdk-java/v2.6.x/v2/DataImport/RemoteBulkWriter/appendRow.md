# appendRow()

This operation appends a row of data to the RemoteBulkWriter buffer. The data will be uploaded to remote storage when the buffer is full or when `commit()` is called.

```java
public void appendRow(JsonObject rowData) throws IOException, InterruptedException
```

**PARAMETERS:**

- **rowData** (*JsonObject*) -

    A JSON object representing a single row of data.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **IOException**

    Raised when an I/O error occurs while buffering the row.

- **InterruptedException**

    Raised when the operation is interrupted while buffering the row.

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
RemoteBulkWriter writer = new RemoteBulkWriter(config);
JsonObject row = new JsonObject();
row.addProperty("id", 1L);
row.add("vector", gson.toJsonTree(new float[]{0.1f, 0.2f, 0.3f}));
writer.appendRow(row);
```
