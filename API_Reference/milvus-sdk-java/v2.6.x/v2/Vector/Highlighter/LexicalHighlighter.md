# LexicalHighlighter

A `LexicalHighlighter` instance configures post-processing term highlighting for text fields in search results. Highlighting annotates matched spans using customizable tags, and can return fragment-based snippets for improved readability and UI rendering. It does not impact retrieval, filtering, ranking, or scoring.

```java
io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter
```

## Constructor

This constructor initializes a new `LexicalHighlighter` instance.

```java
LexicalHighlighter.builder()
    .highlightQueries(List<HighlightQuery>)
    .addHighlightQuery(HighlightQuery)
    .highlightSearchText(Boolean)
    .preTags(List<String>)
    .addPreTag(String)
    .postTags(List<String>)
    .addPostTag(String)
    .fragmentOffset(Integer)
    .fragmentSize(Integer)
    .numOfFragments(Integer)
    .build();
```

**BUILDER METHODS:**

- `highlightQueries(List<HighlightQuery>)`

    Defines which query terms from text-based filters are highlighted. Each entry must be a `HighlightQuery` instance.

    ```java
    import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
    import java.util.ArrayList;
    import java.util.List;

    LexicalHighlighter.HighlightQuery q = new LexicalHighlighter.HighlightQuery(
        "TextMatch",
        "text",
        "my doc"
    );

    List<LexicalHighlighter.HighlightQuery> queries = new ArrayList<>();
    queries.add(q);
    ```

    If unset, no filtering terms are highlighted.

    For details, refer to [Text Highlighter](https://milvus.io/docs/text-highlighter.md).

- `addHighlightQuery(HighlightQuery)`

    Adds a single `HighlightQuery` instance to the highlight queries.

- `highlightSearchText(Boolean)`

    Whether to highlight search terms used in BM25 full text search. If True, the BM25 query terms are used as the source of highlighted terms. If unset, BM25 search terms are not highlighted.

- `preTags(List<String>)`

    Tags inserted before each matched term in the returned highlight. Supports plain strings (e.g., `{`) or HTML-safe markers (e.g., `<em>`, `<mark>`). If multiple tags are provided, tags rotate by match sequence.

- `addPreTag(String)`

    Adds a single tag to the pre-tags list.

- `postTags(List<String>)`

    Tags inserted after each matched term, paired with `pre_tags`. Rotation follows the same order as pre_tags when multiple tags are provided.

- `addPostTag(String)`

    Adds a single tag to the post-tags list.

- `fragmentOffset(Integer)`

    Number of characters of leading context to keep before the first highlighted match when returning fragment-based output. Default behavior keeps no extra leading context.

- `fragmentSize(Integer)`

    Maximum length of each returned fragment (in characters). The highlighter will cap fragment length approximately to this size.

- `numOfFragments(Integer)`

    Maximum number of fragments to return per text value. If unset, the default is multiple fragments (implementation default; see Examples for typical values).

**RETURN TYPE:**

*LexicalHighlighter*

**RETURNS:**

A **LexicalHighlighter** instance.

## Examples

Highlight search terms in BM25 full text search:

```java
import io.milvus.common.clientenum.FunctionType;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.LoadCollectionReq;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import com.google.gson.JsonObject;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection with a "text" field and a BM25 output field "sparse_vector"
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("text").dataType(DataType.VarChar).maxLength(512).enableAnalyzer(Boolean.TRUE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("sparse_vector").dataType(DataType.SparseFloatVector).build());
collectionSchema.addFunction(CreateCollectionReq.Function.builder()
        .functionType(FunctionType.BM25)
        .name("text_bm25")
        .inputFieldNames(Collections.singletonList("text"))
        .outputFieldNames(Collections.singletonList("sparse_vector"))
        .build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("sparse_vector")
        .metricType(IndexParam.MetricType.BM25)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("your_collection")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

// 3. Insert rows and load the collection
List<JsonObject> rows = new ArrayList<>();
JsonObject row1 = new JsonObject();
row1.addProperty("id", 1L);
row1.addProperty("text", "this is a test document about the test keyword");
rows.add(row1);
JsonObject row2 = new JsonObject();
row2.addProperty("id", 2L);
row2.addProperty("text", "my doc about the test");
rows.add(row2);
client.insert(InsertReq.builder()
        .collectionName("your_collection")
        .data(rows)
        .build());
client.loadCollection(LoadCollectionReq.builder().collectionName("your_collection").build());

// 4. Configure a LexicalHighlighter and run a BM25 search
List<String> preTags = new ArrayList<>();
preTags.add("{");

List<String> postTags = new ArrayList<>();
postTags.add("}");

LexicalHighlighter highlighter = LexicalHighlighter.builder()
    .highlightSearchText(true)
    .preTags(preTags)
    .postTags(postTags)
    .build();

SearchResp searchR = client.search(SearchReq.builder()
    .collectionName("your_collection")
    .data(Collections.singletonList(new EmbeddedText("test")))
    .annsField("sparse_vector")
    .metricType(IndexParam.MetricType.BM25)
    .topK(10)
    .outputFields(Collections.singletonList("text"))
    .highlighter(highlighter)
    .build());
```

Highlight query terms in Text Match:

```java
import io.milvus.common.clientenum.FunctionType;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.LoadCollectionReq;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import com.google.gson.JsonObject;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection with a "text" field and a BM25 output field "sparse_vector"
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("text").dataType(DataType.VarChar).maxLength(512).enableAnalyzer(Boolean.TRUE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("sparse_vector").dataType(DataType.SparseFloatVector).build());
collectionSchema.addFunction(CreateCollectionReq.Function.builder()
        .functionType(FunctionType.BM25)
        .name("text_bm25")
        .inputFieldNames(Collections.singletonList("text"))
        .outputFieldNames(Collections.singletonList("sparse_vector"))
        .build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("sparse_vector")
        .metricType(IndexParam.MetricType.BM25)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("your_collection")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

// 3. Insert rows and load the collection
List<JsonObject> rows = new ArrayList<>();
JsonObject row1 = new JsonObject();
row1.addProperty("id", 1L);
row1.addProperty("text", "this is a my doc about test");
rows.add(row1);
JsonObject row2 = new JsonObject();
row2.addProperty("id", 2L);
row2.addProperty("text", "another my doc here");
rows.add(row2);
client.insert(InsertReq.builder()
        .collectionName("your_collection")
        .data(rows)
        .build());
client.loadCollection(LoadCollectionReq.builder().collectionName("your_collection").build());

// 4. Configure a LexicalHighlighter with a TextMatch query and run a BM25 search
LexicalHighlighter.HighlightQuery q = new LexicalHighlighter.HighlightQuery(
    "TextMatch",
    "text",
    "my doc"
);

List<LexicalHighlighter.HighlightQuery> queries = new ArrayList<>();
queries.add(q);

List<String> preTags = new ArrayList<>();
preTags.add("<mark>");

List<String> postTags = new ArrayList<>();
postTags.add("</mark>");

LexicalHighlighter highlighter = LexicalHighlighter.builder()
    .highlightQueries(queries)
    .preTags(preTags)
    .postTags(postTags)
    .build();

SearchResp searchR = client.search(SearchReq.builder()
    .collectionName("your_collection")
    .data(Collections.singletonList(new EmbeddedText("my doc")))
    .annsField("sparse_vector")
    .metricType(IndexParam.MetricType.BM25)
    .topK(10)
    .outputFields(Collections.singletonList("text"))
    .highlighter(highlighter)
    .build());
```
