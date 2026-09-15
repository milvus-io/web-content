# FunctionChain

A `FunctionChain` instance represents an ordered rerank/refine plan applied to search results, composing `map`, `sort`, and `limit` operations.

```java
io.milvus.v2.service.vector.request.FunctionChain
```

## Constructor

This constructor initializes a new `FunctionChain` instance that composes `map`, `sort`, and `limit` operations applied to ordinary search results.

```java
FunctionChain.builder()
    .stage(FunctionChainStage stage)
    .name(String name)
    .map(String output, FunctionChainExpr expr)
    .sort(String by, boolean desc, String tieBreakCol)
    .limit(int limit)
    .limit(int limit, int offset)
    .build()
```

**BUILDER METHODS:**

- `stage(FunctionChainStage stage)`

    The execution stage where this function chain runs. Cannot be `null`.

- `name(String name)`

    The name of this function chain.

- `map(String output, FunctionChainExpr expr)`

    Adds a `map` operation that computes a new output column from an expression.

- `sort(String by, boolean desc, String tieBreakCol)`

    Adds a `sort` operation that sorts the results by the given column. Set `desc` to `true` for descending order; pass a column name in `tieBreakCol` to break ties, or `null` to omit it.

- `limit(int limit)`

    Adds a `limit` operation that keeps only the given number of results, starting from the beginning.

- `limit(int limit, int offset)`

    Adds a `limit` operation that keeps only the given number of results, skipping the given number of leading results.

**RETURN TYPE:**

*FunctionChain*

**RETURNS:**

A **FunctionChain** instance.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when the stage is `null` or request validation fails.

## Example

```java
FunctionChain chain = FunctionChain.builder()
        .stage(FunctionChainStage.L2_RERANK)
        .name("fresh_popular_rerank")
        .map("$score", FunctionChainExpr.builder()
                .name("num_combine")
                .arg(FunctionChainArg.col("$score"))
                .arg(FunctionChainArg.col("freshness"))
                .param("mode", "weighted")
                .param("weights", Arrays.asList(0.7, 0.2, 0.1))
                .build())
        .sort("$score", true, "$id")
        .limit(10)
        .build();

SearchResp response = client.search(SearchReq.builder()
        .collectionName("books")
        .data(Collections.singletonList(queryVector))
        .annsField("embedding")
        .functionChains(Collections.singletonList(chain))
        .limit(10)
        .build());
```
