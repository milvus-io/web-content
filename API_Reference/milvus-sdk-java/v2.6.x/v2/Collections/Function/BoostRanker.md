# BoostRanker

The BoostRanker extends from the **Function** class and provides extra parameters.

```java
public class BoostRanker extends CreateCollectionReq.Function
```

## Request Syntax

```java
BoostRanker.builder()
    .name(String name)
    .description(String description)
    .inputFieldNames(List<String> inputFieldNames)
    .params(Map<String, String> params)
    .filter(String filter)
    .weight(Float weight)
    .randomScoreSeed(Long randomScoreSeed)
    .randomScoreField(String randomScoreField)
    .build()
```

**BUILDER METHODS:**

- `name(String name)`

    The name of the function. This identifier is used to reference the function within queries and collections.

- `description(String description)`

    A brief description of the function's purpose. This can be useful for documentation or clarity in larger projects and defaults to an empty string.

- `inputFieldNames(List<String> inputFieldNames)`

    The name of the field containing the raw data that requires conversion to vector representation. For functions using `FunctionType.RERANK`, this parameter accepts only one field name.

- `params(Map<String, String> params)`

    A set of key-value pairs that configures the function properties.

- `filter(String filter)`

    The filter expression that will be used to match entities among search result entities. It can be any valid basic filter expression mentioned in [Filtering Explained](https://milvus.io/docs/boolean.md).

    <div class="admonition note">

    <p><b>notes</b></p>

    <p>Only use basic operators, such as <code>==</code>, <code>&gt;</code>, or <code>&lt;</code>. Using advanced operators, such as <code>text_match</code> or <code>phrase_match</code>, will degrade search performance.</p>

    </div>

- `weight(Float weight)`

    The weight that will be multiplied by the scores of any matching entities in the raw search results.

    The value should be a floating-point number.

    - To emphasize the importance of matching entities, set it to a value that boosts the scores.

    - To demote matching entities, assign this parameter a value that lowers their scores.

- `randomScoreSeed(Long randomScoreSeed)`

    The random function that works with `randomScoreField(String randomScoreField)` to generate a value between `0` and `1` randomly. 

    You should specify an initial value to start a pseudorandom number generator (PRNG).

- `randomScoreField(String randomScoreField)`

    The random function that works with `randomScoreSeed(Long randomScoreSeed)` to generate a value between `0` and `1` randomly. 

    You should specify the name of a field whose value will be used as a random factor in generating the random number. A field with unique values will suffice.

**RETURN TYPE:**

*BoostRanker*

**RETURNS:**

 A boost ranker instance.

## Examples:

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq.Function;
import io.milvus.v2.service.vector.request.ranker.BoostRanker
import java.util.Collections;

// use the ModelRanker class
BoostRanker boost = BoostRanker.builder()
    .name("xxx_boost")
    .description("boost on xxx")
    .filter("xxx == 2")
    .weight(0.5)
    .randomScoreSeed(123)
    .randomScoreField("id")
    .build()
    
// Instead, you can use the Function class as well
CreateCollectionReq.Function boost = CreateCollectionReq.Function.builder()
    .functionType(FunctionType.RERANK)
    .name("xxx_boost")
    .description("boost on xxx")
    .param("reranker", "boost")
    .param("filter", "xxx == 2")
    .param("weight", "0.5")
    .param("random_score", "{\"seed\": 123, \"field\": \"id\"}")
    .build();
```

