# addFunction()

This operation adds a function to convert raw data into vector representations.

```java
public CollectionSchema addFunction(Function function)
```

## Request Syntax

```java
addFunction(Function.builder()
        .functionType(FunctionType functionType)
        .name(String name)
        .inputFieldNames(List<String> inputFieldNames)
        .outputFieldNames(List<String> outputFieldNames)
        .description(String description)
        .build());
```

**BUILDER METHODS:**

- `functionType(FunctionType functionType)`

    The type of function for processing raw data. Possible values:

    - `FunctionType.BM25`: Uses the BM25 algorithm for generating sparse embeddings from a `VARCHAR` field.

- `name(String name)`

    The name of the function. This identifier is used to reference the function within queries and collections.

- `inputFieldNames(List<String> inputFieldNames)`

    The name of the field containing the raw data that requires conversion to vector representation. For functions using `FunctionType.BM25`, this parameter accepts only one field name.

- `outputFieldNames(List<String> outputFieldNames)`

    The name of the field where the generated embeddings will be stored. This should correspond to a vector field defined in the collection schema. For functions using `FunctionType.BM25`, this parameter accepts only one field name.

- `description(String description)`

    A brief description of the function’s purpose. This can be useful for documentation or clarity in larger projects and defaults to an empty string.

**RETURN TYPE:**

*Function*

**RETURNS:**

A `Function` object

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.common.clientenum.FunctionType;
import io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

import java.util.Collections;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name("text_bm25_emb")
        .inputFieldNames(Collections.singletonList("text"))
        .outputFieldNames(Collections.singletonList("vector"))
        .build());
```
