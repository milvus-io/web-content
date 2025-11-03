# DecayRanker

The **DecayRanker** class extends from the **Function** class and provides extra parameters.

```java
public class DecayRanker extends CreateCollectionReq.Function
```

## Constructor

This constructor initializes a new `DecayRanker` instance designed to create a decay ranker instance.

```java
DecayRanker.builder()
    .name(String name)
    .description(String description)
    .functionType(FunctionType functionType)
    .inputFieldNames(List<String> inputFieldNames)
    .params(Map<String, String> params)
    .function(String function)
    .origin(Number origin)
    .scale(Number scale)
    .offset(Number offset)
    .decay(Number decay)
    .build();
```

**BUILDER METHODS:**

- `name(String name)`

    The name of the function. This identifier is used to reference the function within queries and collections.

- `description(String description)`

    A brief description of the function's purpose. This can be useful for documentation or clarity in larger projects and defaults to an empty string.

- `functionType(FunctionType functionType)`

    The type of function for processing raw data. For **DecayRanker**, set this to `FunctionType.RERANK`.

- `inputFieldNames(List<String> inputFieldNames)`

    The name of the field containing the raw data that requires conversion to vector representation. For functions using `FunctionType.RERANK`, this parameter accepts only one field name.

- `params(Map<String, String> params)`

    A set of key-value pairs that configures the function properties.

- `function(String function)`

    The type of decay ranker to create. Possible values are: `gauss`, `exp`, and `linear`.

- `origin(Number origin)`

    The reference point from which decay score is calculated. Items at this value receive maximum relevance scores. For time-based decay, the time unit must match your collection data.

- `scale(Number scale)`

    The distance or time at which relevance drops to the `decay` value. Controls how quickly relevance declines. For time-based decay, the time unit must match your collection data. Larger values create a more gradual decline in relevance; smaller values create a steeper decline.

- `offset(Number offset)`

    A "no-decay zone" around the `origin` where items maintain full scores (decay score = 1.0).

    For time-based decay, the time unit must match your collection data.

    Items within this range of the `origin` maintain maximum relevance.

- `decay(Number decay)`

    A score value at the `scale` distance, controls curve steepness. Lower values create steeper decline curves; higher values create more gradual decline curves.

    Must be between 0 and 1.

**RETURN TYPE:**

*DecayRanker*

**RETURNS:**

 A decay ranker instance.

## Examples:

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq.Function;
import io.milvus.v2.service.vector.request.ranker.DecayRanker
import java.util.Collections;

// use the DecayRanker class
DecayRanker.builder()
    .function("gauss")
    .name("time decay")
    .inputFieldNames(Collections.singletonList("timestamp"))
    .origin(1000)
    .scale(10000)
    .offset(24)
    .decay(0.5)
    .build());
    
// Instead, you can use the Function class as well
CreateCollectionReq.Function rr = CreateCollectionReq.Function.builder()
    .functionType(FunctionType.RERANK)
    .name("time_decay")
    .description("time decay")
    .inputFieldNames(Collections.singletonList("timestamp"))
    .param("reranker", "decay")
    .param("function", "gauss")
    .param("origin", "1000")
    .param("scale", "10000")
    .param("offset", "24")
    .param("decay", "0.5")
    .build();
```
