# insert()

Aligns insert-row validation for auto-ID fields, function output fields, dynamic fields, and Struct values.

```java
public InsertResp insert(InsertReq request)
```

## Request Syntax

```java
InsertReq.builder()
    .data(data)
    .databaseName(databaseName)
    .collectionName(collectionName)
    .partitionName(partitionName)
    .build();
```

**BUILDER METHODS:**

- `data(List<JsonObject> data)`

    The rows to insert. Field names and values must conform to the collection schema.

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database when omitted.

- `collectionName(String collectionName)`

    The name of the target collection.

- `partitionName(String partitionName)`

    The name of the target partition.

**RETURN TYPE:**

*InsertResp*

**RETURNS:**

A **InsertResp** object that contains the result of this operation.

- `getInsertCnt()` (*long*) -

    The number of entities inserted.

- `getPrimaryKeys()` (*List\<Object\>*) -

    The primary keys generated for the inserted entities.

- `getCost()` (*Long*) -

    The time cost of the insert operation, in milliseconds.

**EXCEPTIONS