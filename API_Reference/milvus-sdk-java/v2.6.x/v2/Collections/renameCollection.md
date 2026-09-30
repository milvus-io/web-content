# renameCollection()

Renames a collection and can move it to another database.

```java
public void renameCollection(RenameCollectionReq request)
```

## Request Syntax

```java
RenameCollectionReq.builder()
    .databaseName(databaseName)
    .collectionName(collectionName)
    .newCollectionName(newCollectionName)
    .targetDbName(targetDbName)
    .build();
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database that contains the target resource.

- `collectionName(String collectionName)`

    The name of the target collection.

- `newCollectionName(String newCollectionName)`

    The new name to assign to the collection.

- `targetDbName(String targetDbName)`

    The name of the database to which the collection is moved.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    Raised when any error occurs during this operation. Inspect the exception message for the exact failure reason.

## Example

Renames a collection and can move it to another database.

```java
client.renameCollection(RenameCollectionReq.builder()
    .databaseName("default")
    .collectionName("books")
    .newCollectionName("archive_books")
    .targetDbName("archive")
    .build());
```
