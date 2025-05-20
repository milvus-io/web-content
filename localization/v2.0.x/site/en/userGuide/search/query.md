---
id: query.md
related_key: query vectors
summary: Learn how to query vectors in Milvus.
title: ''
---
<h1 id="Conduct-a-Vector-Query" class="common-anchor-header">Conduct a Vector Query<button data-href="#Conduct-a-Vector-Query" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to conduct a vector query.</p>
<p>Unlike a vector similarity search, a vector query retrieves vectors via scalar filtering based on <a href="/docs/v2.0.x/boolean.md">boolean expression</a>. Milvus supports many data types in the scalar fields and a variety of boolean expressions. The boolean expression filters on scalar fields or the primary key field, and it retrieves all results that match the filters.</p>
<p>The following example shows how to perform a vector query on a 2000-row dataset of book ID (primary key), word count (scalar field), and book introduction (vector field), simulating the situation where you query for certain books based on their IDs.</p>
<h2 id="Load-collection" class="common-anchor-header">Load collection<button data-href="#Load-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>All search and query operations within Milvus are executed in memory. Load the collection to memory before conducting a vector query.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection
collection = Collection(<span class="hljs-string">&quot;book&quot;</span>)      <span class="hljs-comment"># Get an existing collection.</span>
collection.load()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">collectionManager</span>.<span class="hljs-title function_">loadCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err := milvusClient.LoadCollection(
  context.Background(),   <span class="hljs-comment">// ctx</span>
  <span class="hljs-string">&quot;book&quot;</span>,                 <span class="hljs-comment">// CollectionName</span>
  <span class="hljs-literal">false</span>                   <span class="hljs-comment">// async</span>
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
  log.Fatal(<span class="hljs-string">&quot;failed to load collection:&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">milvusClient.<span class="hljs-title function_">loadCollection</span>(
  <span class="hljs-title class_">LoadCollectionParam</span>.<span class="hljs-title function_">newBuilder</span>()
    .<span class="hljs-title function_">withCollectionName</span>(<span class="hljs-string">&quot;book&quot;</span>)
    .<span class="hljs-title function_">build</span>()
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">load -c book
<button class="copy-code-btn"></button></code></pre>
<h2 id="Conduct-a-vector-query" class="common-anchor-header">Conduct a vector query<button data-href="#Conduct-a-vector-query" class="anchor-icon" translate="no">
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
    </button></h2><p>The following example filters the vectors with certain <code translate="no">book_id</code> values, and returns the <code translate="no">book_id</code> field and <code translate="no">book_intro</code> of the results.</p>
<p>Milvus supports setting consistency level specifically for a search or query  (only on PyMilvus currently). The consistency level set in the search or query requests overwrites the one set while creating the collection. In this example, the consistency level of the search request is set as <code translate="no">Strong</code>, meaning Milvus will read the most updated data view at the exact time point when a search or query request comes. Without specifying the consistency level during a search or query, Milvus adopts the original consistency level of the collection.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>
<pre><code translate="no" class="language-python">res = collection.query(
  <span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;book_id in [2,4,6,8]&quot;</span>, 
  output_fields = [<span class="hljs-string">&quot;book_id&quot;</span>, <span class="hljs-string">&quot;book_intro&quot;</span>],
  consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">dataManager</span>.<span class="hljs-title function_">query</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,
  <span class="hljs-attr">expr</span>: <span class="hljs-string">&quot;book_id in [2,4,6,8]&quot;</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;book_id&quot;</span>, <span class="hljs-string">&quot;book_intro&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryResult, err := milvusClient.Query(
    context.Background(),                                   <span class="hljs-comment">// ctx</span>
    <span class="hljs-string">&quot;book&quot;</span>,                                                 <span class="hljs-comment">// CollectionName</span>
    <span class="hljs-string">&quot;&quot;</span>,                                                     <span class="hljs-comment">// PartitionName</span>
    entity.NewColumnInt64(<span class="hljs-string">&quot;book_id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">6</span>,<span class="hljs-number">8</span>}),     <span class="hljs-comment">// expr</span>
    []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;book_id&quot;</span>, <span class="hljs-string">&quot;book_intro&quot;</span>}                       <span class="hljs-comment">// OutputFields</span>
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;fail to query collection:&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">String</span>&gt; query_output_fields = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;book_id&quot;</span>, <span class="hljs-string">&quot;word_count&quot;</span>);
<span class="hljs-title class_">QueryParam</span> queryParam = <span class="hljs-title class_">QueryParam</span>.<span class="hljs-title function_">newBuilder</span>()
  .<span class="hljs-title function_">withCollectionName</span>(<span class="hljs-string">&quot;book&quot;</span>)
  .<span class="hljs-title function_">withExpr</span>(<span class="hljs-string">&quot;book_id in [2,4,6,8]&quot;</span>)
  .<span class="hljs-title function_">withOutFields</span>(query_output_fields)
  .<span class="hljs-title function_">build</span>();
R&lt;<span class="hljs-title class_">QueryResults</span>&gt; respQuery = milvusClient.<span class="hljs-title function_">query</span>(queryParam);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">query

collection_name: book

The query expression: book_id <span class="hljs-keyword">in</span> [2,4,6,8]

Name of partitions that contain entities(<span class="hljs-built_in">split</span> by <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple) []:

A list of fields to <span class="hljs-built_in">return</span>(<span class="hljs-built_in">split</span> by <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple) []: book_id, book_intro

<span class="hljs-built_in">timeout</span> []:
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">expr</code></td>
        <td>Boolean expression used to filter attribute. Find more expression details in <a href="/docs/v2.0.x/boolean.md">Boolean Expression Rules</a>.</td>
    </tr>
    <tr>
        <td><code translate="no">output_fields</code> (optional)</td>
        <td>List of names of the field to return.</td>
    </tr>
    <tr>
        <td><code translate="no">partition_names</code> (optional)</td>
        <td>List of names of the partitions to query on.</td>
    </tr>
    <tr>
        <td><code translate="no">consistency_level</code> (optional)</td>
        <td>Consistency level of the query.</td>
    </tr>
    </tbody>
</table>
<table class="language-javascript">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">collection_name</code></td>
        <td>Name of the collection to query.</td>
    </tr>
    <tr>
        <td><code translate="no">expr</code></td>
        <td>Boolean expression used to filter attribute. Find more expression details in <a href="/docs/v2.0.x/boolean.md">Boolean Expression Rules</a>.</td>
    </tr>
    <tr>
        <td><code translate="no">output_fields</code> (optional)</td>
        <td>List of names of the field to return.</td>
    </tr>
    <tr>
        <td><code translate="no">partition_names</code> (optional)</td>
        <td>List of names of the partitions to query on.</td>
    </tr>
    </tbody>
</table>
<table class="language-go">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    <th>Options</th>
    </tr>
    </thead>
    <tbody>
  <tr>
    <td><code translate="no">ctx</code></td>
    <td>Context to control API invocation process.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><code translate="no">CollectionName</code></td>
    <td>Name of the collection to query.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><code translate="no">partitionName</code></td>
    <td>List of names of the partitions to load. All partitions will be queried if it is left empty.</td>
    <td>N/A</td>
  </tr>
  <tr>
        <td><code translate="no">expr</code></td>
        <td>Boolean expression used to filter attribute.</td>
    <td>See <a href="/docs/v2.0.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
    </tr>
    <tr>
        <td><code translate="no">OutputFields</code></td>
        <td>Name of the field to return.</td>
        <td>Vector field is not supported in current release.</td>
    </tr>
    </tbody>
</table>
<table class="language-java">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    <th>Options</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td><code translate="no">CollectionName</code></td>
    <td>Name of the collection to load.</td>
    <td>N/A</td>
  </tr>
  <tr>
        <td><code translate="no">OutFields</code></td>
        <td>Name of the field to return.</td>
    <td>Vector field is not supported in current release.</td>
    </tr>
  <tr>
        <td><code translate="no">Expr</code></td>
        <td>Boolean expression used to filter attribute.</td>
    <td>See <a href="/docs/v2.0.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
    </tr>
    </tbody>
</table>
<table class="language-shell">
    <thead>
        <tr>
            <th>Option</th>
            <th>Full name</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>--help</td>
            <td>n/a</td>
            <td>Displays help for using the command.</td>
        </tr>
    </tbody>
</table>
<p>Check the returned results.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>
<pre><code translate="no" class="language-python">sorted_res = <span class="hljs-built_in">sorted</span>(res, key=<span class="hljs-keyword">lambda</span> k: k[<span class="hljs-string">&#x27;book_id&#x27;</span>])
sorted_res
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(results.<span class="hljs-property">data</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">fmt.Printf(<span class="hljs-string">&quot;%#v\n&quot;</span>, queryResult)
<span class="hljs-keyword">for</span> _, qr := <span class="hljs-keyword">range</span> queryResult {
    fmt.Println(qr.IDs)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">QueryResultsWrapper wrapperQuery = <span class="hljs-built_in">new</span> QueryResultsWrapper(respQuery.getData());
System.out.<span class="hljs-built_in">println</span>(wrapperQuery.getFieldWrapper(<span class="hljs-string">&quot;book_id&quot;</span>).getFieldData());
System.out.<span class="hljs-built_in">println</span>(wrapperQuery.getFieldWrapper(<span class="hljs-string">&quot;word_count&quot;</span>).getFieldData());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Milvus CLI automatically returns the entities with the pre-defined output fields.</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Learn more basic operations of Milvus:</p>
<ul>
<li><a href="/docs/v2.0.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.0.x/hybridsearch.md">Conduct a hybrid search</a></li>
<li><a href="/docs/v2.0.x/timetravel.md">Search with Time Travel</a></li>
</ul></li>
<li><p>Explore API references for Milvus SDKs:</p>
<ul>
<li><a href="/api-reference/pymilvus/v2.0.x/About.md">PyMilvus API reference</a></li>
<li><a href="/api-reference/node/v2.0.x/About.md">Node.js API reference</a></li>
<li><a href="/api-reference/go/v2.0.x/About.md">Go API reference</a></li>
<li><a href="/api-reference/java/v2.0.x/About.md">Java API reference</a></li>
</ul></li>
</ul>
