# append_row()

This operation appends records to the writer.

```java
public void appendRow(JsonObject rowData)
```

## Request Syntax

```java
localBulkWriter.appendRow(
    JsonObject rowData
)
```

**PARAMETERS:**

- **rowData** (*JsonObject*) -

    A dictionary representing an entity to be appended.

    The keys and their values in the dictionary should match the schema referenced in the current **LocalBulkWriter**.

**RETURN TYPE:**

*void*

## Example

```java
JsonObject row = new JsonObject();
row.addProperty("path", "path_" + i);
row.add("vector", GSON_INSTANCE.toJsonTree(GeneratorUtils.genFloatVector(DIM)));
row.addProperty("label", "label_" + i);

localBulkWriter.appendRow(row);
```
