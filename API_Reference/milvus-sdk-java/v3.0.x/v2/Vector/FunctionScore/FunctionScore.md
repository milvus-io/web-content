# FunctionScore

A `FunctionScore` instance is a list of `Function` instances used as rerankers.

```java
io.milvus.v2.service.vector.request.FunctionScore
```

## Constructor

This constructor initializes a new `FunctionScore` instance that comprises one or more rankers.

```java
FunctionScore.builder()
    .functions(List<CreateCollectionReq.Function> functions)
    .params(Map<String, String> params)
    .build()
```

**BUILDER METHODS:**

- `functions(List<CreateCollectionReq.Function> functions)`

    A list of `Function` instances. See [Function](../../Collections/Function/Function.md). A boost-style reranker can be supplied as a [BoostRanker](../../Collections/Function/BoostRanker.md).

- `params(Map<String, String> params)`

    Extra parameters for how the specified functions work together. For a Boost ranker, you can set the following parameters:

    - `boost_mode` (String)

        Specifies how the specified weights influence the scores of any matching entities. Possible values are:

        - `Multiple`

            Indicates that the weighted value is equal to the original score of a matching entity multiplied by the specified weight.

            This is the default value.

        - `Sum`

            Indicates that the weighted value is equal to the sum of the original score of a matching entity and the specified weight

    - `function_mode` (String)

        Specifies how the weighted values from various Boost Rankers are processed. Possible values are:

        - `Multiplify`

            Indicates that the final score of a matching entity is equal to the product of the weighted values from all Boost Rankers.

            This is the default value.

        - `Sum`

            Indicates that the final score of a matching entity is equal to the sum of the weighted values from all Boost Rankers.

**RETURN TYPE:**

*FunctionScore*

**RETURNS:**

A **FunctionScore** instance.
