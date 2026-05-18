# addCollectionFunction()

This operation adds a function to a collection. Functions allow you to define custom processing logic, such as BM25 scoring or embedding generation.

```java
public void addCollectionFunction(AddCollectionFunctionReq request)
```

## Request Syntax

```java
addCollectionFunction(AddCollectionFunctionReq.builder()
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

    The function to add. Use `CreateCollectionReq.Function.builder()` to construct it with name, description, functionType, inputFieldNames, outputFieldNames, and params.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.service.collection.request.AddCollectionFunctionReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.common.clientenum.FunctionType;

CreateCollectionReq.Function bm25Func = CreateCollectionReq.Function.builder()
    .name("bm25")
    .functionType(FunctionType.BM25)
    .inputFieldNames(Arrays.asList("text"))
    .outputFieldNames(Arrays.asList("sparse_vector"))
    .build();

client.addCollectionFunction(AddCollectionFunctionReq.builder()
    .collectionName("my_collection")
    .function(bm25Func)
    .build());
```
