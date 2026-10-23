# SearchData

A search target entry: one of the supported search input forms.

```typescript
export type SearchData = SearchVector | SearchText | SearchEmbList;

```

**FIELDS:**

- **SearchVector**

    Vector inputs.

- **SearchText**

    Text inputs for full-text / embedding search.

- **SearchEmbList**

    Embedding-list inputs.
