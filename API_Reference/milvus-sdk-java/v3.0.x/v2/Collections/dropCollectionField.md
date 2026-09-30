# dropCollectionField()

Drops an existing collection field by field name or field ID.

```java
public void dropCollectionField(DropCollectionFieldReq request)
```

## Request Syntax

```java
DropCollectionFieldReq.builder()
    .collectionName(collectionName)
    .databaseName(databaseName)
    .fieldName(fieldName)
    .fieldId(fieldId)
    .build();
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of the target collection.

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database when omitted.

- `fieldName(String fieldName)`

    The name of the field to drop.

- `fieldId(Long fieldId)`

    The numeric ID of the field to drop when identifying it by ID.

**RETURNS:**

*void*

This operation does not return a value.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

```java
client.dropCollectionField(DropCollectionFieldReq.builder()
    .collectionName("books")
    .fieldName("obsolete_field")
    .build());
```
