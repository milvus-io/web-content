# ModelRanker

The **ModelRanker** class extends from the **Function** class and provides extra parameters.

```java
public class ModelRanker extends CreateCollectionReq.Function
```

## Request Syntax

```java
ModelRanker.builder()
    .name(String name)
    .description(String description)
    .inputFieldNames(List<String> inputFieldNames)
    .params(Map<String, String> params)
    .provider(String provider)
    .queries(List<String> queries)
    .endpoint(String endpoint)
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

    - `max_client_batch_size`(int) -

        The maximum number of documents to process in a single batch. Larger values increase throughput but require more memory. The value defaults to `32`.

- `provider(String provider)`

    The name of the reranking model provider. For possible values, refer to [Choose a model provider for your needs](https://milvus.io/docs/model-ranker-overview.md#Choose-a-model-provider-for-your-needs).

- `queries(List<String> queries)`

    A list of query strings used by the reranking model to calculate relevance scores. The number of query strings must match exactly the number of queries in your search operation (even when using query vectors instead of text). Otherwise, an error will be reported.

- `endpoint(String endpoint)`

    The URL of the model service.

**RETURN TYPE:**

*ModelRanker*

**RETURNS:**

 A model ranker instance.

## Examples:

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq.Function;
import io.milvus.v2.service.vector.request.ranker.ModelRanker
import java.util.Collections;

// use the ModelRanker class
ModelRanker.builder()
    .function("tei")
    .name("TEI ranker")
    .inputFieldNames(Collections.singletonList("document"))
    .provider("tei")
    .queries("[\"machine learning for time series\"]")
    .endpoint("http://model-service:8080")
    .build());
    
// Instead, you can use the Function class as well
CreateCollectionReq.Function rr = CreateCollectionReq.Function.builder()
    .functionType(FunctionType.RERANK)
    .name("semantic_ranker")
    .description("semantic ranker")
    .inputFieldNames(Collections.singletonList("document"))
    .param("reranker", "model")
    .param("provider", "tei")
    .param("queries", "[\"machine learning for time series\"]")
    .param("endpoint", "http://model-service:8080")
    .build();
```

