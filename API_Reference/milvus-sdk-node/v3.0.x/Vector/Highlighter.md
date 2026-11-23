# Highlighter

Configures post-processing term highlighting for text fields in search results. A `Highlighter` is a TypeScript discriminated union: it is either a `LexicalHighlighter` (lexical, `type: HighlightType.Lexical`) or a `SemanticHighlighter` (semantic, `type: HighlightType.Semantic`).

```typescript
export type Highlighter = LexicalHighlighter | SemanticHighlighter;
```

## LexicalHighlighter

A lexical highlighter that highlights search terms in matching text fields.

```typescript
export interface LexicalHighlighter {
  type: HighlightType.Lexical;
  pre_tags?: string[];
  post_tags?: string[];
  fragment_offset?: number;
  fragment_size?: number;
  num_of_fragments?: number;
  highlight_query?: { type: string; field: string; text: string }[];
  highlight_search_text?: boolean;
}
```

**FIELDS:**

- **type** (*HighlightType.Lexical*) -

    **[REQUIRED]**

    Sets the highlighter type to **Lexical**.

- **pre_tags** (*string[]*) -

    The tags that prepend the highlighted tokens in the output.

- **post_tags** (*string[]*) -

    The tags that follow the highlighted tokens in the output.

- **fragment_offset** (*number*) -

    The offset of the fragments to return.

- **fragment_size** (*number*) -

    The size of each fragment to return.

- **num_of_fragments** (*number*) -

    The number of fragments to return.

- **highlight_query** (*{ type: string; field: string; text: string }[]*) -

    The queries whose terms should also be highlighted.

- **highlight_search_text** (*boolean*) -

    Whether to highlight the search terms in the output.

## SemanticHighlighter

A semantic highlighter that highlights passages semantically relevant to the query.

```typescript
export interface SemanticHighlighter {
  type: HighlightType.Semantic;
  queries: string[];
  input_fields: string[];
  pre_tags?: string[];
  post_tags?: string[];
  threshold?: number;
  highlight_only?: boolean;
  model_deployment_id?: string;
  max_client_batch_size?: number;
}
```

**FIELDS:**

- **type** (*HighlightType.Semantic*) -

    **[REQUIRED]**

    Sets the highlighter type to **Semantic**.

- **queries** (*string[]*) -

    **[REQUIRED]**

    The queries used to find semantically relevant passages.

- **input_fields** (*string[]*) -

    **[REQUIRED]**

    The text fields to run semantic highlighting on.

- **pre_tags** (*string[]*) -

    The tags that prepend the highlighted passages in the output.

- **post_tags** (*string[]*) -

    The tags that follow the highlighted passages in the output.

- **threshold** (*number*) -

    The similarity threshold a passage must reach to be highlighted.

- **highlight_only** (*boolean*) -

    Whether to return only the highlighted passages.

- **model_deployment_id** (*string*) -

    The ID of the deployed embedding model used for semantic highlighting.

- **max_client_batch_size** (*number*) -

    The maximum number of queries sent to the model at once.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

await milvusClient.search({
    collection_name: 'my_collection',
    data: [1, 2, 3, 4, 5, 6, 7, 8],
    limit: 1,
    highlighter: {
        type: 0, // HighlightType.Lexical
        pre_tags: ['**'],
        post_tags: ['**'],
        highlight_search_text: true,
    },
});
```
