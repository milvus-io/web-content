# SearchData

A search target entry: one of the supported search input forms.

```typescript
export type SearchData = SearchVector | SearchText | SearchEmbList;

```

**FIELDS:**

- **SearchVector** (SearchData)

    Vector inputs.

- **SearchText** (SearchData)

    Text inputs for full-text / embedding search.

- **SearchEmbList** (SearchData)

    Embedding-list inputs.
