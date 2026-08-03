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

**RETURNS:**

*InsertResp*

Contains the number of inserted entities and generated primary keys when applicable.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

Demonstrates insert() with the reviewed v3.0.x API.

```java
InsertResp response = client.insert(InsertReq.builder()
    .collectionName("books")
    .data(rows)
    .build());
```
