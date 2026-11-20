# HighlightResult

The highlighted passages attached to a search hit when a [Highlighter](Highlighter.md) was supplied on the request. It maps field names to the [highlight data](#highlightdata) for that field.

```typescript
export type HighlightResult = Record<string, HighlightData>;
```

**FIELDS:**

- **&lt;field&gt;** (*[HighlightData](#highlightdata)*) -

    The highlight data for the named field.

## HighlightData

The highlight fragments and scores for one field of a highlighted search result.

```typescript
export interface HighlightData {
  fragments: string[];
  scores: number[];
}
```

**FIELDS:**

- **fragments** (*string[]*) -

    The matched fragments for the field.

- **scores** (*number[]*) -

    The scores of the matched fragments.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await milvusClient.search({
    collection_name: 'my_collection',
    data: [1, 2, 3, 4, 5, 6, 7, 8],
    limit: 1,
    highlighter: {
        type: 0, // HighlightType.Lexical
        pre_tags: ['**'],
        post_tags: ['**'],
    },
});

// res.results[0].highlight maps field names to HighlightData
console.log(res.results[0].highlight);
```
