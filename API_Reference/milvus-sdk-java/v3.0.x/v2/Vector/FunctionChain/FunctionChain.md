# FunctionChain

A `FunctionChain` instance describes a sequence of `map`, `sort`, and `limit` operations that transform search results server-side.

```java
io.milvus.v2.service.vector.request.FunctionChain
```

## Constructor

This constructor initializes a new `FunctionChain` instance used to define the operations applied to search results at a given execution stage.

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

    The execution stage where the chain runs. Defaults to `FunctionChainStage.UNSPECIFIED`.

- `name(String name)`

    The name of the chain. Defaults to `""`.

- `map(String output, FunctionChainExpr expr)`

    Appends a `map` operation that computes a new output column from the given expression.

- `sort(String by, boolean desc, String tieBreakCol)`

    Appends a `sort` operation ordered by the `by` column, with the optional `tieBreakCol` used to break ties. `tieBreakCol` may be `null`.

- `limit(int limit)`

    Appends a `limit` operation that keeps at most `limit` rows.

- `limit(int limit, int offset)`

    Appends a `limit` operation that keeps at most `limit` rows after skipping `offset` rows.

**RETURN TYPE:**

*FunctionChain*

**RETURNS:**

A **FunctionChain** instance.

**GETTERS:**

- `FunctionChainStage getStage()` — Returns the execution stage of the chain.
- `String getName()` — Returns the name of the chain.
- `List<FunctionChainOp> getOps()` — Returns the operations in the chain.

## Example

```java
import io.milvus.v2.service.vector.request.FunctionChain;
import io.milvus.v2.service.vector.request.FunctionChainExpr;
import io.milvus.v2.service.vector.request.FunctionChainStage;

FunctionChain chain = FunctionChain.builder()
    .stage(FunctionChainStage.L2_RERANK)
    .name("fresh_popular_rerank")
    .map("$score", FunctionChainExpr.builder()
        .name("num_combine")
        .build())
    .sort("$score", true, "$id")
    .limit(10)
    .build();
```
