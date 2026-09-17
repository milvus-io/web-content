# FunctionChain

An ordered rerank/refine plan applied to search results. A `FunctionChain` composes `map`, `sort`, and `limit` operations that post-process the result columns of a `search()` call.

```java
io.milvus.v2.service.vector.request.FunctionChain
```

## Constructor

This builder composes a function chain from map, sort, and limit operations.

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

    The execution stage where this function chain runs. Throws `MilvusClientException` if the stage is `null`.

- `name(String name)`

    The name of this function chain. An empty string is used when `null` is passed.

- `map(String output, FunctionChainExpr expr)`

    Adds a `map` operation that computes a new output column from an expression.

- `sort(String by, boolean desc, String tieBreakCol)`

    Adds a `sort` operation that sorts the results by the given column. Pass `null` for `tieBreakCol` to omit the tie-break column.

- `limit(int limit)`

    Adds a `limit` operation that keeps only the given number of results, starting from the beginning.

- `limit(int limit, int offset)`

    Adds a `limit` operation that keeps only the given number of results, skipping the given number of leading results.

**RETURN TYPE:**

*FunctionChain*

**RETURNS:**

A **FunctionChain** instance.

**METHODS:**

- `FunctionChainStage getStage()`

    Returns the execution stage where this function chain runs.

- `String getName()`

    Returns the name of this function chain.

- `List<FunctionChainOp> getOps()`

    Returns the ordered list of operations of this function chain.

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
        .collectionName("my_collection")
        .data(Collections.singletonList(queryVector))
        .annsField("vector")
        .functionChains(Collections.singletonList(chain))
        .build());
```

<!-- category: Vector; action: CREATE; addedSince: v3.0.x -->
