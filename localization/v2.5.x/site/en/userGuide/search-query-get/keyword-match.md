---
id: keyword-match.md
summary: >-
  Text match in Milvus enables precise document retrieval based on specific
  terms. This feature is primarily used for filtered search to satisfy specific
  conditions and can incorporate scalar filtering to refine query results,
  allowing similarity searches within vectors that meet scalar criteria.​
title: Text Match​
---
<h1 id="Text-Match​" class="common-anchor-header">Text Match​<button data-href="#Text-Match​" class="anchor-icon" translate="no">
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
    </button></h1><p>Text match in Milvus enables precise document retrieval based on specific terms. This feature is primarily used for filtered search to satisfy specific conditions and can incorporate scalar filtering to refine query results, allowing similarity searches within vectors that meet scalar criteria.​</p>
<div class="alert note">
<p>Text match focuses on finding exact occurrences of the query terms, without scoring the relevance of the matched documents. If you want to retrieve the most relevant documents based on the semantic meaning and importance of the query terms, we recommend you use <a href="/docs/full-text-search.md">​Full Text Search</a>.​</p>
</div>
<h2 id="Overview" class="common-anchor-header">Overview<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus integrates <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> to power its underlying inverted index and term-based text search. For each text entry, Milvus indexes it following the procedure:​</p>
<ol>
<li><p><a href="/docs/analyzer-overview.md">Analyzer</a>: The analyzer processes input text by tokenizing it into individual words, or tokens, and then applying filters as needed. This allows Milvus to build an index based on these tokens.​</p></li>
<li><p><a href="/docs/index-scalar-fields.md">Indexing</a>: After text analysis, Milvus creates an inverted index that maps each unique token to the documents containing it.​</p></li>
</ol>
<p>When a user performs a text match, the inverted index is used to quickly retrieve all documents containing the terms. This is much faster than scanning through each document individually.​</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/keyword-match.png" alt="Text Match" class="doc-image" id="text-match" />
    <span>Text Match</span>
  </span>
</p>
<h2 id="Enable-text-match" class="common-anchor-header">Enable text match<button data-href="#Enable-text-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Text match works on the <code translate="no">VARCHAR</code> field type, which is essentially the string data type in Milvus. To enable text match, set both <code translate="no">enable_analyzer</code> and <code translate="no">enable_match</code> to <code translate="no">True</code> and then optionally configure an analyzer for text analysis when defining your collection schema.​</p>
<h3 id="Set-enableanalyzer-and-enablematch​" class="common-anchor-header">Set <code translate="no">enable_analyzer</code> and <code translate="no">enable_match</code>​</h3><p>To enable text match for a specific <code translate="no">VARCHAR</code> field, set both the <code translate="no">enable_analyzer</code> and <code translate="no">enable_match</code> parameters to <code translate="no">True</code> when defining the field schema. This instructs Milvus to tokenize text and create an inverted index for the specified field, allowing fast and efficient text matches.​</p>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
schema = MilvusClient.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to enable text analysis for this field​</span>
    enable_match=<span class="hljs-literal">True</span> <span class="hljs-comment"># Whether to enable text match​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">false</span>)
        .build();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .enableMatch(<span class="hljs-literal">true</span>)
        .build());

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>,
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>,
  },
];

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true,
                    &quot;enable_match&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            }
        ]
    }&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer​" class="common-anchor-header">Optional: Configure an analyzer​</h3><p>The performance and accuracy of text matching depend on the selected analyzer. Different analyzers are tailored to various languages and text structures, so choosing the right one can significantly impact search results for your specific use case.​</p>
<p>By default, Milvus uses the <code translate="no">standard</code> analyzer, which tokenizes text based on whitespace and punctuation, removes tokens longer than 40 characters, and converts text to lowercase. No additional parameters are needed to apply this default setting. For more information, refer to <a href="/docs/standard-analyzer.md">​Standard</a>.​</p>
<p>In cases where a different analyzer is required, you can configure one using the <code translate="no">analyzer_params</code> parameter. For example, to apply the <code translate="no">english</code> analyzer for processing English text:​</p>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params={​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
}​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">200</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;text&quot;</span>)
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">200</span>)
        .<span class="hljs-title function_">enableAnalyzer</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">analyzerParams</span>(analyzerParams)
        .<span class="hljs-title function_">enableMatch</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">build</span>());

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> schema = [
  {
    name: <span class="hljs-string">&quot;id&quot;</span>,
    data_type: DataType.Int64,
    is_primary_key: <span class="hljs-literal">true</span>,
  },
  {
    name: <span class="hljs-string">&quot;text&quot;</span>,
    data_type: <span class="hljs-string">&quot;VarChar&quot;</span>,
    enable_analyzer: <span class="hljs-literal">true</span>,
    enable_match: <span class="hljs-literal">true</span>,
    max_length: <span class="hljs-number">1000</span>,
    analyzer_params: { <span class="hljs-keyword">type</span>: <span class="hljs-string">&#x27;english&#x27;</span> },
  },
  {
    name: <span class="hljs-string">&quot;sparse&quot;</span>,
    data_type: DataType.SparseFloatVector,
  },
];

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 200,
                    &quot;enable_analyzer&quot;: true,
                    &quot;enable_match&quot;: true,
                    &quot;analyzer_params&quot;: {&quot;type&quot;: &quot;english&quot;}
                }
            },
            {
                &quot;fieldName&quot;: &quot;my_vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            }
        ]
    }&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Milvus also provides various other analyzers suited to different languages and scenarios. For more details, refer to <a href="/docs/analyzer-overview.md">​Overview</a>.​</p>
<h2 id="Use-text-match" class="common-anchor-header">Use text match<button data-href="#Use-text-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Once you have enabled text match for a VARCHAR field in your collection schema, you can perform text matches using the <code translate="no">TEXT_MATCH</code> expression.​</p>
<h3 id="TEXTMATCH-expression-syntax​" class="common-anchor-header">TEXT_MATCH expression syntax​</h3><p>The <code translate="no">TEXT_MATCH</code> expression is used to specify the field and the terms to search for. Its syntax is as follows:​</p>
<pre><code translate="no">TEXT_MATCH(field_name, text)​

<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code>: The name of the VARCHAR field to search for.​</p></li>
<li><p><code translate="no">text</code>: The terms to search for. Multiple terms can be separated by spaces or other appropriate delimiters based on the language and configured analyzer.​</p></li>
</ul>
<p>By default, <code translate="no">TEXT_MATCH</code> uses the <strong>OR</strong> matching logic, meaning it will return documents that contain any of the specified terms. For example, to search for documents containing the term <code translate="no">machine</code> or <code translate="no">deep</code> in the <code translate="no">text</code> field, use the following expression:​</p>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">String</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-keyword">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>You can also combine multiple <code translate="no">TEXT_MATCH</code> expressions using logical operators to perform <strong>AND</strong> matching.</p>
<ul>
<li><p>To search for documents containing both <code translate="no">machine</code> and <code translate="no">deep</code> in the <code translate="no">text</code> field, use the following expression:​</p>
<p><div class="multipleCode">
<a href="#python">Python </a>
<a href="#java">Java</a>
<a href="#javascript">Node.js</a>
<a href="#curl">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">String</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-keyword">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>To search for documents containing both <code translate="no">machine</code> and <code translate="no">learning</code> but without <code translate="no">deep</code> in the <code translate="no">text</code> field, use the following expressions:</p>
<p><div class="multipleCode">
<a href="#python">Python </a>
<a href="#java">Java</a>
<a href="#javascript">Node.js</a>
<a href="#curl">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;not TEXT_MATCH(text, &#x27;deep&#x27;) and TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;learning&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">String</span> filter = <span class="hljs-string">&quot;not TEXT_MATCH(text, &#x27;deep&#x27;) and TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;learning&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;not TEXT_MATCH(text, &#x27;deep&#x27;) and TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;learning&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-keyword">export</span> filter=<span class="hljs-string">&quot;\&quot;not TEXT_MATCH(text, &#x27;deep&#x27;) and TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;learning&#x27;)\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Search-with-text-match​" class="common-anchor-header">Search with text match​</h3><p>Text match can be used in combination with vector similarity search to narrow the search scope and improve search performance. By filtering the collection using text match before vector similarity search, you can reduce the number of documents that need to be searched, resulting in faster query times.​</p>
<p>In this example, the <code translate="no">filter</code> expression filters the search results to only include documents that match the specified term <code translate="no">keyword1</code> or <code translate="no">keyword2</code>. The vector similarity search is then performed on this filtered subset of documents.​</p>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with `keyword1` or `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>​
​
<span class="hljs-comment"># Assuming &#x27;embeddings&#x27; is the vector field and &#x27;text&#x27; is the VARCHAR field​</span>
result = MilvusClient.search(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>, <span class="hljs-comment"># Your collection name​</span>
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment"># Vector field name​</span>
    data=[query_vector], <span class="hljs-comment"># Query vector​</span>
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},​
    limit=<span class="hljs-number">10</span>, <span class="hljs-comment"># Max. number of results to return​</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-comment"># Fields to return​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>;

SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embeddings&quot;</span>)
        .data(Collections.singletonList(queryVector)))
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)
        .topK(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match entities with `keyword1` or `keyword2`</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>;

<span class="hljs-comment">// Assuming &#x27;embeddings&#x27; is the vector field and &#x27;text&#x27; is the VARCHAR field</span>
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.search(
    collection_name: <span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>, <span class="hljs-comment">// Your collection name</span>
    anns_field: <span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment">// Vector field name</span>
    data: [query_vector], <span class="hljs-comment">// Query vector</span>
    filter: filter,
    <span class="hljs-keyword">params</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    limit: <span class="hljs-number">10</span>, <span class="hljs-comment">// Max. number of results to return</span>
    output_fields: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-comment">//Fields to return</span>
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo2&quot;,
    &quot;annsField&quot;: &quot;my_vector&quot;,
    &quot;data&quot;: [[0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]],
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;searchParams&quot;: {
        &quot;params&quot;: {
            &quot;nprobe&quot;: 10
        }
    },
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [&quot;text&quot;,&quot;id&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Query-with-text-match​" class="common-anchor-header">Query with text match​</h3><p>Text match can also be used for scalar filtering in query operations. By specifying a <code translate="no">TEXT_MATCH</code> expression in the <code translate="no">expr</code> parameter of the <code translate="no">query()</code> method, you can retrieve documents that match the given terms.​</p>
<p>The example below retrieves documents where the <code translate="no">text</code> field contains both terms <code translate="no">keyword1</code> and <code translate="no">keyword2</code>.​</p>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with both `keyword1` and `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>​
​
result = MilvusClient.query(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, ​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>;

QueryResp queryResp = client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build()
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match entities with both `keyword1` and `keyword2`</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>(
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,
    <span class="hljs-attr">filter</span>: filter, 
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo2&quot;,
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;text&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Considerations" class="common-anchor-header">Considerations<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>Enabling text matching for a field triggers the creation of an inverted index, which consumes storage resources. Consider storage impact when deciding to enable this feature, as it varies based on text size, unique tokens, and the analyzer used.​</p></li>
<li><p>Once you’ve defined an analyzer in your schema, its settings become permanent for that collection. If you decide that a different analyzer would better suit your needs, you may consider dropping the existing collection and creating a new one with the desired analyzer configuration.​</p></li>
<li><p>Escape rules in <code translate="no">filter</code> expressions:</p>
<ul>
<li>Characters enclosed in double quotes or single quotes within expressions are interpreted as string constants. If the string constant includes escape characters, the escape characters must be represented with escape sequence. For example, use <code translate="no">\\</code> to represent <code translate="no">\</code>, <code translate="no">\\t</code> to represent a tab <code translate="no">\t</code>, and <code translate="no">\\n</code> to represent a newline.</li>
<li>If a string constant is enclosed by single quotes, a single quote within the constant should be represented as <code translate="no">\\'</code> while a double quote can be represented as either <code translate="no">&quot;</code> or <code translate="no">\\&quot;</code>. Example: <code translate="no">'It\\'s milvus'</code>.</li>
<li>If a string constant is enclosed by double quotes, a double quote within the constant should be represented as <code translate="no">\\&quot;</code> while a single quote can be represented as either <code translate="no">'</code> or <code translate="no">\\'</code>. Example: <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</li>
</ul></li>
</ul>
