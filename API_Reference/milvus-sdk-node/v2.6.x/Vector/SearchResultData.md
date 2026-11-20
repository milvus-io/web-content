# SearchResultData

One search hit returned by a vector or hybrid search. In addition to the members below, it carries the requested output fields of the matched entity.

```typescript
export interface SearchResultData {
  [x: string]: any;
  score: number;
  id: string;
  highlight?: HighlightResult;
}
```

**FIELDS:**

- **score** (*number*) -

    The similarity score of the search result.

- **id** (*string*) -

    The primary key of the matched row.

- **highlight** (*[HighlightResult](HighlightResult.md)*) -

    Set when a [Highlighter](Highlighter.md) was supplied on the request; carries the highlighted fragments for matching fields.

- **&lt;output-field&gt;** (*any*) -

    The value of any output field requested through `output_fields`.

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
    limit: 5,
    output_fields: ['title'],
});

// Each entry of res.results is a SearchResultData object.
console.log(res.results[0].id, res.results[0].score, res.results[0].title);
```
