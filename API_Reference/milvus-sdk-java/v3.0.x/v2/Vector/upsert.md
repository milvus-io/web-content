# upsert()

Upserts rows into a collection. Partial updates can apply field operations, and each row is validated against the collection schema.

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

    The rows to insert or update. Every partial-update row must include its primary key.

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database when omitted.

- `collectionName(String collectionName)`

    The name of the target collection.

- `partitionName(String partitionName)`

    The name of the target partition.

- `partialUpdate(boolean partialUpdate)`

    Whether omitted non-primary fields should remain unchanged.

- `fieldOps(List<FieldPartialUpdateOp> fieldOps)`

    Field-level operations. `ARRAY_APPEND` and `ARRAY_REMOVE` imply partial-update semantics.

**RETURNS:**

*UpsertResp*

Contains the number of inserted or updated entities.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

```java
UpsertResp response = client.upsert(UpsertReq.builder()
    .collectionName("books")
    .data(rows)
    .fieldOps(fieldOps)
    .build());
```
