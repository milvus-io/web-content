# addCollectionField()

This operation adds a new scalar field to an existing collection without recreating it. The field becomes available almost immediately with minimal delay due to internal schema synchronization.

```java
public void addCollectionField(AddCollectionFieldReq request)
```

## Request Syntax

```java
addCollectionField(AddCollectionFieldReq.builder()
    .collectionName(String collectionName)
    .databaseName(String databaseName)
    .build()
);
```

**BUILDER METHODS:**

- `collectionName(String collectionName)` -

The name of the target collection.

- `databaseName(String databaseName)` -

The name of the database. Defaults to the current database if not specified.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException**

This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.service.collection.request.AddCollectionFieldReq;
import io.milvus.v2.common.DataType;

// Add a nullable VarChar field to an existing collection.
// The new field must be nullable so that existing rows get null values.
client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName("my_collection")
        .fieldName("text")
        .dataType(DataType.VarChar)
        .maxLength(100)
        .isNullable(true)
        .build());
```
