# RerankerObj

Describes a reranker configuration for search.

```typescript
export type RerankerObj = {
  strategy: RANKER_TYPE | string; // rerank strategy
  params: keyValueObj; // rerank parameters
};

```

**FIELDS:**

- **strategy** (*RANKER_TYPE | string*) -

    The rerank strategy.

- **params** (*keyValueObj*) -

    The rerank parameters.
