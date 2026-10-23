# FunctionScore

Describes a function-score reranking configuration for search.

```typescript
export interface FunctionScore {
  functions: FunctionObject[];
  params: keyValueObj;
}

```

**FIELDS:**

- **functions** (*FunctionObject[]*) -

    The functions applied to the search results. See FunctionObject.

- **params** (*keyValueObj*) -

    Extra parameters for the function-score reranking.
