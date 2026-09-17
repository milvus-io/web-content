# FunctionChain

A `FunctionChain` instance is an ordered rerank or refine plan applied to search results. It composes `map`, `sort`, and `limit` operations and serializes to the gRPC `FunctionChain` message.

```java
io.milvus.v2.service.vector.request.FunctionChain
```

## Constructor

This constructor initializes a new `FunctionChain` instance via its fluent builder.

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

    The execution stage where this function chain runs. Must not be `null`.

- `name(String name)`

    The name of this function chain.

- `map(String output, FunctionChainExpr expr)`

    Adds a `map` operation that computes a new output column from an expression.

- `sort(String by, boolean desc, String tieBreakCol)`

    Adds a `sort` operation that sorts the results by the given column. `desc` sorts in descending order when `true`; `tieBreakCol` is the column used to break ties, or `null` to omit it.

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

    Raised when `stage` is `null` or when `map`/`sort` receives invalid arguments.

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

SearchResp resp = client.search(SearchReq.builder()
    .collectionName("books")
    .data(Collections.singletonList(queryVector))
    .annsField("embedding")
    .functionChains(Collections.singletonList(chain))
    .build());
```
