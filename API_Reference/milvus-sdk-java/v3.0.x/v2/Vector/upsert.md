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

**RETURN TYPE:**

*UpsertResp*

**RETURNS:**

A **UpsertResp** object that contains the result of this operation.

- `getUpsertCnt()` (*long*) -

    The number of entities upserted.

- `getPrimaryKeys()` (*List\<Object\>*) -

    The primary keys of the upserted entities.

- `getCost()` (*Long*) -

    The time cost of the upsert operation, in milliseconds.

**EXCEPTIONS