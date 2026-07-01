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
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;content&quot;</span>,
<span class="highlighted-wrapper-line">    datatype=DataType.TEXT,</span>
)
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
<li>A <code translate="no">TEXT</code> field cannot be a primary field. Primary fields support <code translate="no">INT64</code> and <code translate="no">VARCHAR</code>.</li>
<li>In Milvus 3.0.0, <code translate="no">TEXT</code> fields do not support <code translate="no">PHRASE_MATCH</code>.</li>
<li>In Milvus 3.0.0, <code translate="no">TEXT</code> fields do not support default values.</li>
<li>In Milvus 3.0.0, <code translate="no">TEXT</code> fields are not supported in external collections.</li>
<li>In Milvus 3.0.0, <code translate="no">TEXT</code> fields do not support scalar indexes.</li>
<li><code translate="no">TEXT</code> is not intended for regular metadata filtering. If you need to filter on short string metadata and the field value fits within the <code translate="no">VARCHAR</code> length limit, use <code translate="no">VARCHAR</code>.</li>
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
<tr><td>Filtering</td><td>Use for short string metadata that needs to appear in filter expressions, such as <code translate="no">category == &quot;news&quot;</code> or <code translate="no">tag in [&quot;ai&quot;, &quot;database&quot;]</code>.</td><td>Not intended for regular metadata filtering.</td></tr>
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
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=COLLECTION_NAME,
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&quot;how does Milvus store source text for retrieval&quot;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    limit=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;content&quot;</span>],</span>
)
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;id: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, score: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>For more information about BM25 functions, sparse vector indexes, and query syntax for full text search, refer to <a href="/docs/full-text-search.md">Full Text Search</a>.</p>
