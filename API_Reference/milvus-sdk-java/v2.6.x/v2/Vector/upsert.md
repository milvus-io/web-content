# upsert()

Upserts entities and supports partial field updates with per-field update operations.

```java
public UpsertResp upsert(UpsertReq request)
```

## Request Syntax

```java
UpsertReq.builder()
    .data(data)
    .databaseName(databaseName)
    .collectionName(collectionName)
    .partitionName(partitionName)
    .partialUpdate(partialUpdate)
    .fieldOps(fieldOps)
    .build();
```

**BUILDER METHODS:**

- `data(List<JsonObject> data)`

    The entities to upsert, represented as JSON objects.

- `databaseName(String databaseName)`

    The name of the database that contains the target resource.

- `collectionName(String collectionName)`

    The name of the target collection.

- `partitionName(String partitionName)`

    The name of the target partition. Leave it empty to address the entire collection.

- `partialUpdate(boolean partialUpdate)`

    Whether to update only the fields supplied in each entity.

- `fieldOps(List<FieldPartialUpdateOp> fieldOps)`

    The `UpsertReq.FieldPartialUpdateOp` entries that define per-field behavior during a partial update.

    - `fieldName(String fieldName)` -

        The name of the field whose update behavior this entry controls.

    - `opType(UpsertReq.FieldPartialUpdateOp.OpType opType)` -

        The operation applied to the field. Defaults to **REPLACE**.

        - `REPLACE` -

            Overwrites the field with the supplied value. This is the default and applies to all field types.

        - `ARRAY_APPEND` -

            Appends the supplied values to an array field. The resulting length must not exceed the field `max_capacity`.

        - `ARRAY_REMOVE` -

            Removes every occurrence of each supplied value from an array field. It is a no-op when the base array is empty or no value matches.

**RETURNS:**

*UpsertResp*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    Raised when any error occurs during this operation. Inspect the exception message for the exact failure reason.

## Example

Upserts entities and supports partial field updates with per-field update operations.

```java
UpsertResp response = client.upsert(UpsertReq.builder()
    .databaseName("default")
    .collectionName("books")
    .data(rows)
    .partialUpdate(true)
    .fieldOps(Collections.singletonList(
        UpsertReq.FieldPartialUpdateOp.builder()
            .fieldName("tags")
            .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_APPEND)
            .build()))
    .build());
```
