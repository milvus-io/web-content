# RRFRanker

The **RRFRanker** class extends from the **Function** class and provides extra parameters.

```java
public class RRFRanker extends CreateCollectionReq.Function
```

## Request Syntax

```java
RRFRanker.builder()
    .name(String name)
    .description(String description)
    .params(Map<String, String> params)
    .k(int k)
    .build()
```

**BUILDER METHODS:**

- `name(String name)`

    The name of the function. This identifier is used to reference the function within queries and collections.

- `description(String description)`

    A brief description of the function's purpose. This can be useful for documentation or clarity in larger projects and defaults to an empty string.

- `params(Map<String, String> params)`

    A set of key-value pairs that configures the function properties.

- `k(int k)`

    A smoothing parameter that controls the impact of document ranks; higher `k` reduces sensitivity to top ranks. The value ranges from `1` to `16383` and defaults to `60`. 

**RETURN TYPE:**

*RRFRanker*

**RETURNS:**

 A RRF ranker instance.

## Examples:

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq.Function;
import io.milvus.v2.service.vector.request.ranker.RRFRanker
import java.util.Collections;

// use the RRFRanker class
RRFRanker.builder()
    .k(60)
    .build());
    
// Instead, you can use the Function class as well
CreateCollectionReq.Function rr = CreateCollectionReq.Function.builder()
    .functionType(FunctionType.RERANK)
    .param("strategy", "rrf")
    .param("params", "{\"k\": 60}")
    .build();
```

