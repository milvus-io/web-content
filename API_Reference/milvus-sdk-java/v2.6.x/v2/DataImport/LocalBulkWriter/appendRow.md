# appendRow()

This operation appends a row of data to the LocalBulkWriter buffer. The data will be written to a file when the buffer is full or when `commit()` is called.

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

    This is a checked exception thrown when any data-read or data-write errors occur during this operation.

- **InterruptedException**

    This is a checked exception thrown when a thread that is currently "blocking" (waiting, sleeping, or otherwise occupied) is interrupted by another thread using the `Thread.interrupt()` method.

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
LocalBulkWriter writer = new LocalBulkWriter(config);
JsonObject row = new JsonObject();
row.addProperty("id", 1L);
row.add("vector", gson.toJsonTree(new float[]{0.1f, 0.2f, 0.3f}));
writer.appendRow(row);
```
