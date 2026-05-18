# alterCollectionFunction()

This operation alters an existing function in a collection by replacing it with a new function definition.

```java
public void alterCollectionFunction(AlterCollectionFunctionReq request)
```

## Request Syntax

```java
alterCollectionFunction(AlterCollectionFunctionReq.builder()
    .collectionName(String collectionName)
    .databaseName(String databaseName)
    .function(CreateCollectionReq.Function function)
    .build()
);
```

**BUILDER METHODS:**

- `collectionName(String collectionName)` -

    **[REQUIRED]**

    The name of the collection.

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `function(CreateCollectionReq.Function function)` -

    **[REQUIRED]**

    The new function definition to replace the existing one.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.service.collection.request.AlterCollectionFunctionReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.common.clientenum.FunctionType;

CreateCollectionReq.Function updatedFunc = CreateCollectionReq.Function.builder()
    .name("bm25")
    .functionType(FunctionType.BM25)
    .inputFieldNames(Arrays.asList("text"))
    .outputFieldNames(Arrays.asList("sparse_vector"))
    .param("bm25_k1", "1.5")
    .param("bm25_b", "0.75")
    .build();

client.alterCollectionFunction(AlterCollectionFunctionReq.builder()
    .collectionName("my_collection")
    .function(updatedFunc)
    .build());
```
