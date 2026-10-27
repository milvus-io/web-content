# SemanticHighlighter

A `SemanticHighlighter` instance configures post-processing semantic highlighting for text fields in search results. Unlike lexical highlighting which matches exact terms, semantic highlighting identifies and marks relevant text segments based on semantic similarity to the query. Highlighting annotates matched spans using customizable tags. It does not impact retrieval, filtering, ranking, or scoring.

```java
io.milvus.v2.service.vector.request.highlighter.SemanticHighlighter
```

## Constructor

This constructor initializes a new `SemanticHighlighter` instance.

```java
SemanticHighlighter.builder()
    .queries(List<String>)
    .inputFields(List<String>)
    .preTags(List<String>)
    .postTags(List<String>)
    .threshold(Float)
    .highlightOnly(Boolean)
    .modelDeploymentID(String)
    .maxClientBatchSize(Integer)
    .build();
```

**BUILDER METHODS:**

- `queries(List<String>)`

    A list of search queries to match against the document. The highlighter uses these queries to identify semantically relevant text segments in the results.

- `inputFields(List<String>)`

    The schema fields to highlight. Specifies which text fields in the search results should be processed for semantic highlighting.

- `preTags(List<String>)`

    Tags inserted before each matched segment in the returned highlight. Supports plain strings (e.g., `{`) or HTML-safe markers (e.g., `<em>`, `<mark>`). If multiple tags are provided, tags rotate by match sequence.

- `postTags(List<String>)`

    Tags inserted after each matched segment, paired with `pre_tags`. Rotation follows the same order as `pre_tags` when multiple tags are provided.

- `threshold(Float)`

    The minimum confidence score (0.0 to 1.0) that defines "sufficient match" for highlighting. Semantic highlighting is applied per item after top-k retrieval—only segments that semantically match the query above this threshold will return highlighted fragments with `pre_tags`/`post_tags`. If unset, segments below the threshold return empty results (`fragments=[], scores=[]`)

- `highlightOnly(Boolean)`

    If `True` (default), only the sentence-level fragments that are semantically related to the query are returned, which helps focus on the most relevant context. If set to `False`, the full paragraph containing those fragments is returned instead, as long as its length does not exceed the model’s context limit. However, when full paragraphs are returned, the `scores` field is no longer meaningful.

- `modelDeploymentID(String)`

    The ID of the deployed highlight model used for semantic inference. This model determines how semantic similarity is computed between queries and document segments.

- `maxClientBatchSize(Integer)`

    Limits the number of items processed in a single batch. Useful for controlling memory usage and processing throughput.

**RETURN TYPE:**

*SemanticHighlighter*

**RETURNS:**

A **SemanticHighlighter** instance.

## Examples

Highlight semantically relevant text in dense vector search:

```java
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
import io.milvus.v2.service.vector.request.highlighter.SemanticHighlighter;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import com.google.gson.Gson;
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

// 2. Create a collection with a "dense" vector field and a "document" text field
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("dense").dataType(DataType.FloatVector).dimension(4).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("document").dataType(DataType.VarChar).maxLength(512).build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("dense")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("your_collection")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

// 3. Insert a row and load the collection
JsonObject row = new JsonObject();
row.addProperty("id", 1L);
row.add("dense", new Gson().toJsonTree(new float[]{0.1f, 0.2f, 0.3f, 0.4f}));
row.addProperty("document", "Artificial intelligence was founded as an academic discipline in 1956.");
client.insert(InsertReq.builder()
        .collectionName("your_collection")
        .data(Collections.singletonList(row))
        .build());
client.loadCollection(LoadCollectionReq.builder().collectionName("your_collection").build());

// 4. Configure a SemanticHighlighter (requires a Zilliz Cloud model deployment) and run a search
List<String> queries = new ArrayList<>();
queries.add("When was artificial intelligence founded");
queries.add("Where was Alan Turing born?");

List<String> inputFields = new ArrayList<>();
inputFields.add("document");

List<String> preTags = new ArrayList<>();
preTags.add("<mark>");

List<String> postTags = new ArrayList<>();
postTags.add("</mark>");

SemanticHighlighter highlighter = SemanticHighlighter.builder()
    .queries(queries)
    .inputFields(inputFields)
    .preTags(preTags)
    .postTags(postTags)
    .modelDeploymentID("your-model-deployment-id")
    .build();

SearchResp searchR = client.search(SearchReq.builder()
    .collectionName("your_collection")
    .data(Collections.singletonList(new EmbeddedText("test")))
    .annsField("dense")
    .topK(3)
    .outputFields(Collections.singletonList("document"))
    .highlighter(highlighter)
    .build());
```

The search results include a `highlight` field containing the highlighted fragments and their confidence scores:

```text
# Example output:
# hit: {
#     'id': 1,
#     'distance': 0.766,
#     'entity': {'document': 'Artificial intelligence was founded as an academic discipline in 1956.'},
#     'highlight': {
#         'document': {
#             'fragments': ['<mark>Artificial intelligence was founded as an academic discipline in 1956.</mark>'],
#             'scores': [1.0]
#         }
#     }
# }
```

Use `threshold` to filter low-confidence highlights:

```java
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
import io.milvus.v2.service.vector.request.highlighter.SemanticHighlighter;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import com.google.gson.Gson;
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

// 2. Create a collection with a "dense" vector field and a "document" text field
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("dense").dataType(DataType.FloatVector).dimension(4).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("document").dataType(DataType.VarChar).maxLength(512).build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("dense")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("your_collection")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

// 3. Insert a row and load the collection
JsonObject row = new JsonObject();
row.addProperty("id", 1L);
row.add("dense", new Gson().toJsonTree(new float[]{0.1f, 0.2f, 0.3f, 0.4f}));
row.addProperty("document", "Artificial intelligence was founded as an academic discipline in 1956.");
client.insert(InsertReq.builder()
        .collectionName("your_collection")
        .data(Collections.singletonList(row))
        .build());
client.loadCollection(LoadCollectionReq.builder().collectionName("your_collection").build());

// 4. Configure a SemanticHighlighter with a confidence threshold (requires a Zilliz Cloud model deployment)
List<String> queries = new ArrayList<>();
queries.add("When was artificial intelligence founded");
queries.add("Where was Alan Turing born?");

List<String> inputFields = new ArrayList<>();
inputFields.add("document");

List<String> preTags = new ArrayList<>();
preTags.add("<mark>");

List<String> postTags = new ArrayList<>();
postTags.add("</mark>");

SemanticHighlighter highlighter = SemanticHighlighter.builder()
    .queries(queries)
    .inputFields(inputFields)
    .preTags(preTags)
    .postTags(postTags)
    .threshold(0.8f)
    .modelDeploymentID("your-model-deployment-id")
    .build();

SearchResp searchR = client.search(SearchReq.builder()
    .collectionName("your_collection")
    .data(Collections.singletonList(new EmbeddedText("machine learning applications")))
    .annsField("dense")
    .topK(10)
    .outputFields(Collections.singletonList("document"))
    .highlighter(highlighter)
    .build());
```
