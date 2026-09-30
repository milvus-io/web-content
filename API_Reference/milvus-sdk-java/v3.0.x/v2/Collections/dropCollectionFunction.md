# dropCollectionFunction()

Removes a function definition from an existing collection without removing its output field. Use [`dropFunctionField()`](dropFunctionField.md) to remove both.

```java
public void dropCollectionFunction(DropCollectionFunctionReq request)
```

## Request Syntax

```java
DropCollectionFunctionReq.builder()
    .collectionName(collectionName)
    .databaseName(databaseName)
    .functionName(functionName)
    .build();
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of the target collection.

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database when omitted.

- `functionName(String functionName)`

    The name of the function definition to remove.

**RETURNS:**

*void*

This operation does not return a value.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

```java
client.dropCollectionFunction(DropCollectionFunctionReq.builder()
    .collectionName("books")
    .functionName("bm25")
    .build());
```
