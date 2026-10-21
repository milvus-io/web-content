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

    The function to add. Use `CreateCollectionReq.Function.builder()` to construct it with name, description, functionType, inputFieldNames, outputFieldNames, and params. See [Function](Function.md).

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddCollectionFunctionReq;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.common.clientenum.FunctionType;
import java.util.Arrays;
import java.util.Collections;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection with a "text" field and a "sparse_vector" field
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("text").dataType(DataType.VarChar).maxLength(512).enableAnalyzer(Boolean.TRUE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("sparse_vector").dataType(DataType.SparseFloatVector).build());
client.createCollection(CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(collectionSchema)
        .build());

// 3. Add a BM25 function to the collection
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
