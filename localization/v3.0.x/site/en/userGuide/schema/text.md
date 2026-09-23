---
id: text.md
title: Text Field
summary: >-
  TEXT is a scalar field type for storing document text, passages, and other
  long text content in Milvus.
beta: Milvus 3.0.x
---
<h1 id="Text-Field" class="common-anchor-header">Text Field<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Text-Field" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>In AI search applications, vector search helps you find semantically similar entities, but the application often also needs the original source text behind each match. An LLM or agent can use that text as context to read, cite, summarize, or include the result in a prompt.</p>
<p>Milvus provides the <code translate="no">TEXT</code> scalar field type for storing long source text directly with entities. Typical values include passages, long documents, article bodies, tickets, and logs. Unlike <code translate="no">VARCHAR</code>, which requires a fixed <code translate="no">max_length</code>, <code translate="no">TEXT</code> does not require you to set a maximum byte length in the collection schema.</p>
<p>To define a <code translate="no">TEXT</code> field, set <code translate="no">datatype</code> to <code translate="no">DataType.TEXT</code>.</p>
<div class="alert note">
<p>This feature requires Storage V3. For enablement instructions and compatibility considerations, see <a href="/docs/storage-v3.md">Storage V3</a>.</p>
</div>
<p><a href="/docs/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a> defaults to <code translate="no">false</code>, which means Storage V3 is disabled by default. Before creating a collection that contains a <code translate="no">TEXT</code> field, set this parameter to <code translate="no">true</code>; otherwise, Milvus rejects the collection schema.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;content&quot;</span>,
<span class="highlighted-wrapper-line">    datatype=DataType.TEXT,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;content&quot;</span>)
<span class="highlighted-wrapper-line">        .dataType(DataType.Text)</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;content&quot;</span>).
<span class="highlighted-wrapper-line">    WithDataType(entity.FieldTypeText),</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;content&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Text</span>,</span>
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    &quot;autoId&quot;: false,
    &quot;enableDynamicField&quot;: false,
    &quot;fields&quot;: [
        {
            &quot;fieldName&quot;: &quot;content&quot;,
            &quot;dataType&quot;: &quot;Text&quot;
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="highlighted-wrapper-line">schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;content&quot;</span>, milvus::DataType::TEXT));</span>
<button class="copy-code-btn"></button></code></pre>
<p>After the field is defined, each entity can include a string value in that field. You insert <code translate="no">TEXT</code> values like other scalar fields and return them from query or search results by listing the field in <code translate="no">output_fields</code>.</p>
<div class="alert note">
<p><code translate="no">TEXT</code> fields support null values. To enable this feature, set <code translate="no">nullable</code> to <code translate="no">True</code>. For details, refer to <a href="/docs/nullable-and-default.md">Nullable Field</a>.</p>
</div>
<h2 id="Limits" class="common-anchor-header">Limits<button data-href="#Limits" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><ul>
<li>A <code translate="no">TEXT</code> field cannot be a primary field, partition key, or clustering key.</li>
<li><code translate="no">TEXT</code> cannot be used as the element type of an <code translate="no">ARRAY</code> field, including a scalar subfield in a <code translate="no">StructArray</code>.</li>
<li>In Milvus 3.0.0, <code translate="no">TEXT</code> fields do not support default values.</li>
<li>In Milvus 3.0.0, <code translate="no">TEXT</code> fields are not supported in external collections.</li>
<li>Users cannot create a scalar index on a <code translate="no">TEXT</code> field. When <code translate="no">enable_match=True</code>, Milvus builds a system-managed text index for text matching. This internal index is not a user-created scalar index.</li>
<li>General scalar filter operators cannot be applied directly to a <code translate="no">TEXT</code> field. These include comparison operators such as <code translate="no">==</code> and <code translate="no">!=</code>, range operators such as <code translate="no">&gt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;</code>, and <code translate="no">&lt;=</code>, as well as <code translate="no">IN</code>, <code translate="no">LIKE</code>, regex operators (<code translate="no">=~</code> and <code translate="no">!~</code>), and <code translate="no">IS NULL</code> or <code translate="no">IS NOT NULL</code>. To filter by analyzed terms, define the field with <code translate="no">enable_analyzer=True</code> and <code translate="no">enable_match=True</code>, and use <a href="/docs/keyword-match.md"><code translate="no">TEXT_MATCH</code> or <code translate="no">TEXT_MATCH_FUZZY</code></a>. For relevance-ranked full-text retrieval, use BM25.</li>
<li>In Milvus 3.0.0, a BM25 or MinHash Function that uses a <code translate="no">TEXT</code> field as input must be defined when the collection is created. It cannot be added later through <code translate="no">add_function_field</code> or <code translate="no">AlterCollectionSchema</code>, even if the existing collection is empty, because Milvus cannot backfill the Function output from stored <code translate="no">TEXT</code> values. To add such a Function to an existing collection, use a <code translate="no">VARCHAR</code> input field, or recreate the collection with the Function included in its schema. For details about adding a Function and its generated vector field, refer to <a href="/docs/add-fields-to-an-existing-collection.md#add-a-function-and-its-generated-vector-field--milvus-30x">Alter Collection Schema</a>.</li>
<li>Text Embedding Functions also must be defined when the collection is created. Milvus 3.0.0 does not support adding them at runtime.</li>
</ul>
<h2 id="Choose-TEXT-or-VARCHAR" class="common-anchor-header">Choose TEXT or VARCHAR<button data-href="#Choose-TEXT-or-VARCHAR" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p><code translate="no">TEXT</code> and <code translate="no">VARCHAR</code> both store string values, but they support different application needs. Use <code translate="no">VARCHAR</code> for short, bounded metadata that identifies, categorizes, or filters entities. Use <code translate="no">TEXT</code> for longer source content that gives an LLM or agent enough context to read, cite, summarize, or build a prompt.</p>
<table>
<thead>
<tr><th>Aspect</th><th><code translate="no">VARCHAR</code></th><th><code translate="no">TEXT</code></th></tr>
</thead>
<tbody>
<tr><td>Best for</td><td>Short metadata used to identify, categorize, or filter entities, such as <code translate="no">title</code>, <code translate="no">tag</code>, <code translate="no">category</code>, or <code translate="no">external_id</code>.</td><td>Longer source content used by LLM or agent workflows, such as <code translate="no">content</code>, <code translate="no">passage</code>, <code translate="no">article_body</code>, or <code translate="no">log_message</code>.</td></tr>
<tr><td>Length setting</td><td>Requires <code translate="no">max_length</code>, which defines the maximum number of bytes the field can store. The maximum value is <code translate="no">65,535</code> bytes. If a value may exceed this limit, use <code translate="no">TEXT</code>.</td><td>Does not require <code translate="no">max_length</code>, so the schema does not need a fixed byte limit for the text value.</td></tr>
<tr><td>Storage behavior</td><td>Stores each value within the field’s configured <code translate="no">max_length</code>.</td><td>Uses automatic storage selection for larger text values. For details, see <a href="#how-milvus-stores-large-text-values">How Milvus stores large TEXT values</a>.</td></tr>
<tr><td>Primary field support</td><td>Can be used as a primary field.</td><td>Cannot be used as a primary field.</td></tr>
<tr><td>Filtering</td><td>Use for short string metadata that needs to appear in filter expressions, such as <code translate="no">category == &quot;news&quot;</code> or <code translate="no">tag in [&quot;ai&quot;, &quot;database&quot;]</code>.</td><td>Does not support general scalar filter operators. Use match-enabled text operators for analyzed-term filtering, or BM25 for relevance-ranked full-text retrieval.</td></tr>
</tbody>
</table>
<p>For details about <code translate="no">VARCHAR</code> fields, refer to <a href="/docs/string.md">VarChar Field</a>.</p>
<h2 id="How-Milvus-stores-large-TEXT-values" class="common-anchor-header">How Milvus stores large TEXT values<button data-href="#How-Milvus-stores-large-TEXT-values" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p><details></p>
<p><summary>Expand to see how it works</summary></p>
<p>When you insert an entity, the string you provide for a <code translate="no">TEXT</code> field is the <code translate="no">TEXT</code> value. Milvus compares the size of that value with <a href="/docs/configure_datanode.md#dataNodetextinlineThreshold">dataNode.text.inlineThreshold</a>, which is <code translate="no">65,536</code> bytes by default, and then chooses one of two internal storage paths.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v3.0.x/assets/text-large-storage-flow.png" alt="Large text storage" class="doc-image" id="large-text-storage" />
    <span>Large text storage</span>
  </span>
</p>
<ul>
<li><strong>Inline storage</strong>: If a <code translate="no">TEXT</code> value is smaller than <code translate="no">dataNode.text.inlineThreshold</code>, Milvus stores the original text value directly in the <code translate="no">TEXT</code> field data.</li>
<li><strong>LOB storage</strong>: If a <code translate="no">TEXT</code> value is greater than or equal to <code translate="no">dataNode.text.inlineThreshold</code>, Milvus treats the value as a large object and stores the original text separately in object storage, such as MinIO. The <code translate="no">TEXT</code> field data stores an internal reference to the separately stored text. When the <code translate="no">TEXT</code> field is requested in query or search results, Milvus uses the reference to retrieve and return the original text.</li>
</ul>
<p>This storage selection is internal. You insert, query, and search the <code translate="no">TEXT</code> field in the same way regardless of which storage path Milvus uses. To tune the threshold or related storage, compaction, and garbage-collection behavior, refer to <a href="/docs/configure_datanode.md">dataNode-related Configurations</a> and <a href="/docs/configure_datacoord.md">dataCoord-related Configurations</a>.</p>
<p>If your deployment uses object storage, large <code translate="no">TEXT</code> values may appear as Milvus-managed objects under paths such as <code translate="no">lobs/...</code>. These objects are implementation details and should not be moved, copied, or deleted manually. After you delete entities, drop partitions, or compact data, object storage usage may decrease only after Milvus garbage collection removes unreferenced large-object data after its safety window.</p>
<p></details></p>
<p>A common use of <code translate="no">TEXT</code> is Full Text Search with BM25. In this pattern, the <code translate="no">TEXT</code> field stores the original source content, and BM25 analyzes the text and generates sparse vectors for ranking keyword-based matches. Search results can then return the matched <code translate="no">TEXT</code> value as context for LLM or agent workflows. The following example shows how to use a <code translate="no">TEXT</code> field as the input field for BM25. To learn about Full Text Search concepts and query options, refer to <a href="/docs/full-text-search.md">Full Text Search</a>.</p>
<h2 id="Step-1-Create-a-collection-with-a-TEXT-field" class="common-anchor-header">Step 1: Create a collection with a TEXT field<button data-href="#Step-1-Create-a-collection-with-a-TEXT-field" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>The following example creates a collection with a <code translate="no">TEXT</code> field for source content and a sparse vector field for BM25-generated sparse vectors. The BM25 function converts the tokenized text from <code translate="no">content</code> into sparse vectors stored in <code translate="no">sparse</code>.</p>
<p>For BM25 full text search, the input <code translate="no">TEXT</code> field must set <code translate="no">enable_analyzer=True</code>.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;text_bm25_collection&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;content&quot;</span>,</span>
<span class="highlighted-comment-line">    datatype=DataType.TEXT,</span>
<span class="highlighted-comment-line">    enable_analyzer=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)

<span class="highlighted-comment-line">bm25_function = Function(</span>
<span class="highlighted-comment-line">    name=<span class="hljs-string">&quot;content_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">    input_field_names=[<span class="hljs-string">&quot;content&quot;</span>],</span>
<span class="highlighted-comment-line">    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>],</span>
<span class="highlighted-comment-line">    function_type=FunctionType.BM25,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line">schema.add_function(bm25_function)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.HasCollectionReq;

<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
<span class="hljs-type">String</span> <span class="hljs-variable">COLLECTION_NAME</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;text_bm25_collection&quot;</span>;

<span class="hljs-keyword">if</span> (client.hasCollection(HasCollectionReq.builder()
        .collectionName(COLLECTION_NAME)
        .build())) {
    client.dropCollection(DropCollectionReq.builder()
            .collectionName(COLLECTION_NAME)
            .build());
}

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">false</span>)
        .build();
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());
<span class="highlighted-comment-line">schema.addField(AddFieldReq.builder()</span>
<span class="highlighted-comment-line">        .fieldName(<span class="hljs-string">&quot;content&quot;</span>)</span>
<span class="highlighted-comment-line">        .dataType(DataType.Text)</span>
<span class="highlighted-comment-line">        .enableAnalyzer(<span class="hljs-literal">true</span>)</span>
<span class="highlighted-comment-line">        .build());</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());

<span class="highlighted-comment-line">schema.addFunction(Function.builder()</span>
<span class="highlighted-comment-line">        .name(<span class="hljs-string">&quot;content_bm25&quot;</span>)</span>
<span class="highlighted-comment-line">        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;content&quot;</span>))</span>
<span class="highlighted-comment-line">        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;sparse&quot;</span>))</span>
<span class="highlighted-comment-line">        .functionType(FunctionType.BM25)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

collectionName := <span class="hljs-string">&quot;text_bm25_collection&quot;</span>

has, err := client.HasCollection(ctx, milvusclient.NewHasCollectionOption(collectionName))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">if</span> has {
    err = client.DropCollection(ctx, milvusclient.NewDropCollectionOption(collectionName))
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        fmt.Println(err.Error())
        <span class="hljs-comment">// handle error</span>
    }
}

schema := entity.NewSchema().
    WithAutoID(<span class="hljs-literal">false</span>).
    WithDynamicFieldEnabled(<span class="hljs-literal">false</span>)
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;content&quot;</span>).
    WithDataType(entity.FieldTypeText).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector),
)

<span class="highlighted-comment-line">bm25Function := entity.NewFunction().</span>
<span class="highlighted-comment-line">    WithName(<span class="hljs-string">&quot;content_bm25&quot;</span>).</span>
<span class="highlighted-comment-line">    WithInputFields(<span class="hljs-string">&quot;content&quot;</span>).</span>
<span class="highlighted-comment-line">    WithOutputFields(<span class="hljs-string">&quot;sparse&quot;</span>).</span>
<span class="highlighted-comment-line">    WithType(entity.FunctionTypeBM25)</span>
<span class="highlighted-comment-line">schema.WithFunction(bm25Function)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">COLLECTION_NAME</span> = <span class="hljs-string">&quot;text_bm25_collection&quot;</span>;

<span class="hljs-keyword">const</span> has = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">hasCollection</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span> });
<span class="hljs-keyword">if</span> (has.<span class="hljs-property">value</span>) {
  <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollection</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span> });
}

<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
  },
<span class="highlighted-comment-line">  {</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;content&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Text</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,</span>
<span class="highlighted-comment-line">  },</span>
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>,
  },
];

<span class="highlighted-comment-line"><span class="hljs-keyword">const</span> functions = [</span>
<span class="highlighted-comment-line">  {</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;content_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;content&quot;</span>],</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&quot;sparse&quot;</span>],</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">params</span>: {},</span>
<span class="highlighted-comment-line">  },</span>
<span class="highlighted-comment-line">];</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;text_bm25_collection&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    &quot;autoId&quot;: false,
    &quot;enableDynamicField&quot;: false,
    &quot;fields&quot;: [
        {
            &quot;fieldName&quot;: &quot;id&quot;,
            &quot;dataType&quot;: &quot;Int64&quot;,
            &quot;isPrimary&quot;: true
        },
        {
            &quot;fieldName&quot;: &quot;content&quot;,
            &quot;dataType&quot;: &quot;Text&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;enable_analyzer&quot;: true
            }
        },
        {
            &quot;fieldName&quot;: &quot;sparse&quot;,
            &quot;dataType&quot;: &quot;SparseFloatVector&quot;
        }
    ],
    &quot;functions&quot;: [
        {
            &quot;name&quot;: &quot;content_bm25&quot;,
            &quot;type&quot;: &quot;BM25&quot;,
            &quot;inputFieldNames&quot;: [&quot;content&quot;],
            &quot;outputFieldNames&quot;: [&quot;sparse&quot;],
            &quot;params&quot;: {}
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-type">const</span> std::string collection_name = <span class="hljs-string">&quot;text_bm25_collection&quot;</span>;

milvus::HasCollectionResponse has_response;
status = client-&gt;<span class="hljs-built_in">HasCollection</span>(
    milvus::<span class="hljs-built_in">HasCollectionRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(collection_name),
    has_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<span class="hljs-keyword">if</span> (has_response.<span class="hljs-built_in">Has</span>()) {
    status = client-&gt;<span class="hljs-built_in">DropCollection</span>(
        milvus::<span class="hljs-built_in">DropCollectionRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(collection_name));
    <span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
        std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    }
}

milvus::CollectionSchemaPtr schema = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;();
schema-&gt;<span class="hljs-built_in">AddField</span>({<span class="hljs-string">&quot;id&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>});
<span class="highlighted-comment-line">schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;content&quot;</span>, milvus::DataType::TEXT).<span class="hljs-built_in">EnableAnalyzer</span>(<span class="hljs-literal">true</span>));</span>
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;sparse&quot;</span>, milvus::DataType::SPARSE_FLOAT_VECTOR));

<span class="highlighted-comment-line">milvus::FunctionPtr function =</span>
<span class="highlighted-comment-line">    std::<span class="hljs-built_in">make_shared</span>&lt;milvus::Function&gt;(<span class="hljs-string">&quot;content_bm25&quot;</span>, milvus::FunctionType::BM25);</span>
<span class="highlighted-comment-line">function-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;content&quot;</span>);</span>
<span class="highlighted-comment-line">function-&gt;<span class="hljs-built_in">AddOutputFieldName</span>(<span class="hljs-string">&quot;sparse&quot;</span>);</span>
<span class="highlighted-comment-line">schema-&gt;<span class="hljs-built_in">AddFunction</span>(function);</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Create-a-sparse-vector-index" class="common-anchor-header">Step 2: Create a sparse vector index<button data-href="#Step-2-Create-a-sparse-vector-index" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Create an index on the sparse vector field generated by the BM25 function. The metric type must be set to <code translate="no">BM25</code>.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">)</span>

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
<span class="highlighted-comment-line">extraParams.put(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);</span>
<span class="highlighted-comment-line">extraParams.put(<span class="hljs-string">&quot;bm25_k1&quot;</span>, <span class="hljs-number">1.2</span>);</span>
<span class="highlighted-comment-line">extraParams.put(<span class="hljs-string">&quot;bm25_b&quot;</span>, <span class="hljs-number">0.75</span>);</span>
<span class="highlighted-comment-line">indexParams.add(IndexParam.builder()</span>
<span class="highlighted-comment-line">        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)</span>
<span class="highlighted-comment-line">        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)</span>
<span class="highlighted-comment-line">        .metricType(IndexParam.MetricType.BM25)</span>
<span class="highlighted-comment-line">        .extraParams(extraParams)</span>
<span class="highlighted-comment-line">        .build());</span>

client.createCollection(CreateCollectionReq.builder()
        .collectionName(COLLECTION_NAME)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="highlighted-comment-line">indexOption := milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    index.NewSparseInvertedIndex(entity.MetricType(entity.BM25), <span class="hljs-number">0</span>))</span>
<span class="highlighted-comment-line">indexOption.WithExtraParam(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>)</span>
<span class="highlighted-comment-line">indexOption.WithExtraParam(<span class="hljs-string">&quot;bm25_k1&quot;</span>, <span class="hljs-number">1.2</span>)</span>
<span class="highlighted-comment-line">indexOption.WithExtraParam(<span class="hljs-string">&quot;bm25_b&quot;</span>, <span class="hljs-number">0.75</span>)</span>

err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(collectionName, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="highlighted-comment-line"><span class="hljs-keyword">const</span> index_params = [</span>
<span class="highlighted-comment-line">  {</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">params</span>: {</span>
<span class="highlighted-comment-line">      <span class="hljs-attr">inverted_index_algo</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,</span>
<span class="highlighted-comment-line">      <span class="hljs-attr">bm25_k1</span>: <span class="hljs-number">1.2</span>,</span>
<span class="highlighted-comment-line">      <span class="hljs-attr">bm25_b</span>: <span class="hljs-number">0.75</span>,</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">  },</span>
<span class="highlighted-comment-line">];</span>

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">schema</span>: schema,
  <span class="hljs-attr">functions</span>: functions,
  <span class="hljs-attr">index_params</span>: index_params,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="highlighted-comment-line"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[</span>
<span class="highlighted-comment-line">    {</span>
<span class="highlighted-comment-line">        &quot;fieldName&quot;: &quot;sparse&quot;,</span>
<span class="highlighted-comment-line">        &quot;metricType&quot;: &quot;BM25&quot;,</span>
<span class="highlighted-comment-line">        &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;,</span>
<span class="highlighted-comment-line">        &quot;params&quot;: {</span>
<span class="highlighted-comment-line">            &quot;inverted_index_algo&quot;: &quot;DAAT_MAXSCORE&quot;,</span>
<span class="highlighted-comment-line">            &quot;bm25_k1&quot;: 1.2,</span>
<span class="highlighted-comment-line">            &quot;bm25_b&quot;: 0.75</span>
<span class="highlighted-comment-line">        }</span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">]&#x27;</span></span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;text_bm25_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="highlighted-comment-line"><span class="hljs-function">milvus::IndexDesc <span class="hljs-title">index_params</span><span class="hljs-params">(<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-string">&quot;&quot;</span>, milvus::IndexType::SPARSE_INVERTED_INDEX,</span>
<span class="highlighted-comment-line">                               milvus::MetricType::BM25)</span></span>;</span>
<span class="highlighted-comment-line">index_params.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);</span>
<span class="highlighted-comment-line">index_params.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;bm25_k1&quot;</span>, <span class="hljs-string">&quot;1.2&quot;</span>);</span>
<span class="highlighted-comment-line">index_params.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;bm25_b&quot;</span>, <span class="hljs-string">&quot;0.75&quot;</span>);</span>

status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                      .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                                      .<span class="hljs-built_in">WithCollectionSchema</span>(schema)
                                      .<span class="hljs-built_in">AddIndex</span>(std::<span class="hljs-built_in">move</span>(index_params)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Insert-TEXT-data" class="common-anchor-header">Step 3: Insert TEXT data<button data-href="#Step-3-Insert-TEXT-data" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Insert text directly into the <code translate="no">TEXT</code> field. Do not provide values for the <code translate="no">sparse</code> field. Milvus generates the sparse vectors internally by applying the BM25 function to <code translate="no">content</code>.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>
<pre><code translate="no" class="language-python">data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.&quot;</span>,
    },
]

client.insert(collection_name=COLLECTION_NAME, data=data)
client.load_collection(collection_name=COLLECTION_NAME)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; data = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 1, \&quot;content\&quot;: \&quot;Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 2, \&quot;content\&quot;: \&quot;Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 3, \&quot;content\&quot;: \&quot;Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.\&quot;}&quot;</span>, JsonObject.class)
);

client.insert(InsertReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(data)
        .build());
client.loadCollection(LoadCollectionReq.builder()
        .collectionName(COLLECTION_NAME)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(collectionName).
    WithInt64Column(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>}).
    WithTextColumn(<span class="hljs-string">&quot;content&quot;</span>, []<span class="hljs-type">string</span>{
        <span class="hljs-string">&quot;Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.&quot;</span>,
        <span class="hljs-string">&quot;Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.&quot;</span>,
        <span class="hljs-string">&quot;Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.&quot;</span>,
    }),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(collectionName))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
err = loadTask.Await(ctx)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
  {
    <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">content</span>:
      <span class="hljs-string">&quot;Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.&quot;</span>,
  },
  {
    <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">content</span>:
      <span class="hljs-string">&quot;Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.&quot;</span>,
  },
  {
    <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">content</span>:
      <span class="hljs-string">&quot;Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.&quot;</span>,
  },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">data</span>: data,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;text_bm25_collection&quot;,
    &quot;data&quot;: [
        {&quot;id&quot;: 1, &quot;content&quot;: &quot;Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.&quot;},
        {&quot;id&quot;: 2, &quot;content&quot;: &quot;Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.&quot;},
        {&quot;id&quot;: 3, &quot;content&quot;: &quot;Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.&quot;}
    ]
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;text_bm25_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::EntityRows data = {
    {{<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>},
     {<span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.&quot;</span>}},
    {{<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>},
     {<span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.&quot;</span>}},
    {{<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">3</span>},
     {<span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.&quot;</span>}},
};

milvus::InsertResponse insert_response;
status = client-&gt;<span class="hljs-built_in">Insert</span>(milvus::<span class="hljs-built_in">InsertRequest</span>()
                            .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                            .<span class="hljs-built_in">WithRowsData</span>(std::<span class="hljs-built_in">move</span>(data)),
                        insert_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">LoadCollection</span>(
    milvus::<span class="hljs-built_in">LoadCollectionRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(collection_name));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Perform-BM25-full-text-search" class="common-anchor-header">Step 4: Perform BM25 full text search<button data-href="#Step-4-Perform-BM25-full-text-search" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Use raw query text as the search data and search against the sparse vector field. Milvus converts the query text into a sparse vector, ranks matches with BM25, and returns the requested <code translate="no">TEXT</code> field in <code translate="no">output_fields</code>.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=COLLECTION_NAME,
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&quot;how does Milvus store source text for retrieval&quot;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    limit=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;content&quot;</span>],</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(COLLECTION_NAME)
<span class="highlighted-comment-line">        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;how does Milvus store source text for retrieval&quot;</span>)))</span>
<span class="highlighted-comment-line">        .annsField(<span class="hljs-string">&quot;sparse&quot;</span>)</span>
<span class="highlighted-comment-line">        .topK(<span class="hljs-number">2</span>)</span>
<span class="highlighted-comment-line">        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;content&quot;</span>))</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    collectionName, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">2</span>,              <span class="hljs-comment">// limit</span>
<span class="highlighted-comment-line">    []entity.Vector{entity.Text(<span class="hljs-string">&quot;how does Milvus store source text for retrieval&quot;</span>)},</span>
<span class="highlighted-comment-line">).WithANNSField(<span class="hljs-string">&quot;sparse&quot;</span>).</span>
<span class="highlighted-comment-line">    WithOutputFields(<span class="hljs-string">&quot;content&quot;</span>))</span>
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
<span class="highlighted-comment-line">  <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;how does Milvus store source text for retrieval&quot;</span>],</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">limit</span>: <span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;content&quot;</span>],</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;text_bm25_collection&quot;,
    &quot;data&quot;: [
        &quot;how does Milvus store source text for retrieval&quot;
    ],
    &quot;annsField&quot;: &quot;sparse&quot;,
    &quot;limit&quot;: 2,
    &quot;outputFields&quot;: [
        &quot;content&quot;
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::SearchResponse search_response;
status = client-&gt;<span class="hljs-built_in">Search</span>(milvus::<span class="hljs-built_in">SearchRequest</span>()
                            .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
<span class="highlighted-comment-line">                            .<span class="hljs-built_in">AddEmbeddedText</span>(<span class="hljs-string">&quot;how does Milvus store source text for retrieval&quot;</span>)</span>
<span class="highlighted-comment-line">                            .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;sparse&quot;</span>)</span>
<span class="highlighted-comment-line">                            .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">2</span>)</span>
<span class="highlighted-comment-line">                            .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;content&quot;</span>),</span>
                        search_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-5-Read-the-returned-TEXT-values" class="common-anchor-header">Step 5: Read the returned TEXT values<button data-href="#Step-5-Read-the-returned-TEXT-values" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Each search hit includes the BM25 score and the original <code translate="no">TEXT</code> value.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;id: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, score: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (SearchResp.SearchResult hit : searchResults.get(<span class="hljs-number">0</span>)) {
    System.out.printf(<span class="hljs-string">&quot;id: %s, score: %f%n&quot;</span>, hit.getId(), hit.getScore());
    System.out.println(hit.getEntity().get(<span class="hljs-string">&quot;content&quot;</span>));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    contentColumn := resultSet.GetColumn(<span class="hljs-string">&quot;content&quot;</span>)
    <span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; resultSet.ResultCount; i++ {
        id, _ := resultSet.IDs.Get(i)
        content, _ := contentColumn.Get(i)
        fmt.Printf(<span class="hljs-string">&quot;id: %v, score: %f\n&quot;</span>, id, resultSet.Scores[i])
        fmt.Println(content)
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> hit <span class="hljs-keyword">of</span> results.<span class="hljs-property">results</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`id: <span class="hljs-subst">${hit.id}</span>, score: <span class="hljs-subst">${hit.score}</span>`</span>);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(hit.<span class="hljs-property">content</span>);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;text_bm25_collection&quot;,
    &quot;data&quot;: [
        &quot;how does Milvus store source text for retrieval&quot;
    ],
    &quot;annsField&quot;: &quot;sparse&quot;,
    &quot;limit&quot;: 2,
    &quot;outputFields&quot;: [
        &quot;content&quot;
    ]
}&#x27;</span>

<span class="hljs-comment"># Each hit in the search response contains the primary key, the BM25 score, and the requested TEXT value:</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 2,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 2.533,</span>
<span class="hljs-comment">#             &quot;content&quot;: &quot;Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.&quot;</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         ...</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; nq_results = search_response.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>();
<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; single : nq_results) {
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; scores = single.<span class="hljs-built_in">Scores</span>();
    milvus::EntityRows rows;
    single.<span class="hljs-built_in">OutputRows</span>(rows);
    <span class="hljs-keyword">for</span> (<span class="hljs-type">size_t</span> i = <span class="hljs-number">0</span>; i &lt; rows.<span class="hljs-built_in">size</span>(); ++i) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;id: &quot;</span> &lt;&lt; rows[i][<span class="hljs-string">&quot;id&quot;</span>] &lt;&lt; <span class="hljs-string">&quot;, score: &quot;</span> &lt;&lt; scores[i] &lt;&lt; std::endl;
        std::cout &lt;&lt; rows[i][<span class="hljs-string">&quot;content&quot;</span>].<span class="hljs-built_in">get</span>&lt;std::string&gt;() &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>For more information about BM25 functions, sparse vector indexes, and query syntax for full text search, refer to <a href="/docs/full-text-search.md">Full Text Search</a>.</p>
