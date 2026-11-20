# FunctionChain

Builds an ordered chain of operations for a Milvus execution stage. Function chains are passed to `search()`, `query()`, and `hybridSearch()` through the `function_chains` parameter to process candidates server-side (for example, sorting, merging, or scoring with a rerank model).

```typescript
export class FunctionChain {
  constructor(
    stage: FunctionChainStage,
    options?: { name?: string; outputColumns?: readonly string[] }
  )
}
```

**PARAMETERS:**

- **stage** (*[FunctionChainStage](#functionchainstage)*) -

    **[REQUIRED]**

    The stage in which Milvus executes the chain.

- **options** (*{ name?: string, outputColumns?: readonly string[] }*) -

    An optional chain name and, for a named **QUERY_SCAN** chain, the output columns to return.

**METHODS:**

- `map(output: string, expr: FunctionChainExpr): this` -

    Write the result of an expression to a temporary or system column.

- `sort(by: string | ColumnRef, options?: { desc?: boolean, tieBreakCol?: string | ColumnRef }): this` -

    Sort by a column, optionally using a second column to break ties. Defaults to descending order.

- `limit(limit: number, offset?: number): this` -

    Keep a page of results. `limit` must be a positive safe integer and `offset` a non-negative safe integer.

- `merge(strategy: 'rrf' | 'weighted' | 'max' | 'sum' | 'avg', options?: { weights?: number[], normScore?: boolean, k?: number }): this` -

    Merge the candidate lists in a hybrid search using the given fusion strategy.

- `toProto(): FunctionChainSpec` -

    Returns the function chain's protobuf-shaped object.

## col()

References a collection field, temporary column, or system column for use in function chain expressions.

```typescript
col(name: string): ColumnRef
```

## fn

Expression helpers for use with `FunctionChain.map()`.

- `numCombine(columns, options?): FunctionChainExpr` -

    Combine two or more numeric columns. Options accept `mode` (`multiply`, `sum`, `max`, `min`, `avg`, or `weighted`) and `weights`.

- `decay(column, options): FunctionChainExpr` -

    Compute a score based on the distance from an origin using a `gauss`, `exp`, or `linear` decay function.

- `roundDecimal(column, { decimal }): FunctionChainExpr` -

    Round a numeric column to a fixed precision. `decimal` must be an integer in `[0, 6]`.

- `rerankModel(column, options): FunctionChainExpr` -

    Score a text column with the configured rerank provider.

- `xgboost(features, { modelResource, output? }): FunctionChainExpr` -

    Score numeric features with a registered UBJ XGBoost model. `output` is `default` or `raw`.

## FunctionChainStage

Defines the execution stage of a function chain.

```typescript
export enum FunctionChainStage {
  UNSPECIFIED = 0,
  INGESTION = 1,
  PRE_PROCESS = 2,
  L0_RERANK = 3,
  L1_RERANK = 4,
  L2_RERANK = 5,
  POST_PROCESS = 6,
  QUERY_SCAN = 7,
}
```

**Constants:**

- **UNSPECIFIED** (0) -

    An unspecified stage.

- **INGESTION** (1) -

    The ingestion stage.

- **PRE_PROCESS** (2) -

    The pre-process stage.

- **L0_RERANK** (3) -

    The L0 rerank stage.

- **L1_RERANK** (4) -

    The L1 rerank stage.

- **L2_RERANK** (5) -

    The L2 rerank stage.

- **POST_PROCESS** (6) -

    The post-process stage.

- **QUERY_SCAN** (7) -

    The query-scan stage, used by `query()`.

## FunctionChains

A single function chain builder or spec, or an ordered array of either.

```typescript
export type FunctionChains =
  | FunctionChain
  | FunctionChainSpec
  | readonly (FunctionChain | FunctionChainSpec)[];
```

## Example

```javascript
import {
    MilvusClient,
    FunctionChain,
    FunctionChainStage,
    col,
    fn,
} from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const chain = new FunctionChain(FunctionChainStage.QUERY_SCAN, {
    name: 'sort_by_price',
})
    .map('price_rounded', fn.roundDecimal(col('price'), { decimal: 2 }))
    .sort('price_rounded', { desc: false });

const res = await client.search({
    collection_name: 'my_collection',
    vector: [1, 2, 3, 4],
    limit: 5,
    function_chains: chain,
});
```
