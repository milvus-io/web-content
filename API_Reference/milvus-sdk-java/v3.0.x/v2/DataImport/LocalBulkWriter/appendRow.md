# appendRow()

Validates and appends one row to the writer. When buffered data exceeds the configured `chunkSize`, the writer commits the current file automatically.

[`StructFieldSchema`](../../Collections/StructFieldSchema/StructFieldSchema.md) fields can contain binary, float16, bfloat16, and int8 vector values.

```java
public void appendRow(JsonObject rowData)
```

**RETURNS:**

*void*

This operation does not return a value.

**EXCEPTIONS:**

- **Exception**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

```java
JsonObject row = new JsonObject();
row.addProperty("id", 1L);
row.addProperty("title", "Dune");
writer.appendRow(row);
```
