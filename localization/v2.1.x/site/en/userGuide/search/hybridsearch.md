---
id: hybridsearch.md
related_key: filter
summary: Conduct a Hybrid Search with Milvus.
title: ''
---
<h1 id="Conduct-a-Hybrid-Search" class="common-anchor-header">Conduct a Hybrid Search<button data-href="#Conduct-a-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to conduct a hybrid search.</p>
<p>A hybrid search is essentially a vector search with attribute filtering. By specifying <a href="/docs/v2.1.x/boolean.md">boolean expressions</a> that filter the scalar fields or the primary key field, you can limit your search with certain conditions.</p>
<p>The following example shows how to perform a hybrid search on the basis of a regular <a href="/docs/v2.1.x/search.md">vector search</a>. Suppose you want to search for certain books based on their vectorized introductions, but you only want those within a specific range of word count. You can then specify the boolean expression to filter the <code translate="no">word_count</code> field in the search parameters. Milvus will search for similar vectors only among those entities that match the expression.</p>
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
    </button></h2><p>All search and query operations within Milvus are executed in memory. Load the collection to memory before conducting a vector search.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
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
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># See the following step.</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Conduct-a-hybrid-vector-search" class="common-anchor-header">Conduct a hybrid vector search<button data-href="#Conduct-a-hybrid-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>By specifying the boolean expression, you can filter the scalar field of the entities during the vector search. The following example limits the scale of search to the vectors within a specified <code translate="no">word_count</code> value range.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python">search_param = {
  <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>]],
  <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;book_intro&quot;</span>,
  <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
  <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>,
  <span class="hljs-string">&quot;expr&quot;</span>: <span class="hljs-string">&quot;word_count &lt;= 11000&quot;</span>,
}
res = collection.<span class="hljs-title function_">search</span>(**search_param)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">dataManager</span>.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,
  <span class="hljs-attr">expr</span>: <span class="hljs-string">&quot;word_count &lt;= 11000&quot;</span>,
  <span class="hljs-attr">vectors</span>: [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>]],
  <span class="hljs-attr">search_params</span>: {
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;book_intro&quot;</span>,
    <span class="hljs-attr">topk</span>: <span class="hljs-string">&quot;2&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-attr">params</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span> }),
  },
  <span class="hljs-attr">vector_type</span>: <span class="hljs-number">101</span>,    <span class="hljs-comment">// DataType.FloatVector,</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">sp, _ := entity.NewIndexFlatSearchParam(   <span class="hljs-comment">// NewIndex*SearchParam func</span>
  <span class="hljs-number">10</span>,                                      <span class="hljs-comment">// searchParam</span>
)
searchResult, err := milvusClient.Search(
  context.Background(),                    <span class="hljs-comment">// ctx</span>
  <span class="hljs-string">&quot;book&quot;</span>,                                  <span class="hljs-comment">// CollectionName</span>
  []<span class="hljs-type">string</span>{},                              <span class="hljs-comment">// partitionNames</span>
  <span class="hljs-string">&quot;word_count &lt;= 11000&quot;</span>,                   <span class="hljs-comment">// expr</span>
  []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;book_id&quot;</span>},                     <span class="hljs-comment">// outputFields</span>
  []entity.Vector{entity.FloatVector([]<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>})}, <span class="hljs-comment">// vectors</span>
  <span class="hljs-string">&quot;book_intro&quot;</span>,                            <span class="hljs-comment">// vectorField</span>
  entity.L2,                               <span class="hljs-comment">// metricType</span>
  <span class="hljs-number">2</span>,                                       <span class="hljs-comment">// topK</span>
  sp,                                      <span class="hljs-comment">// sp</span>
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
  log.Fatal(<span class="hljs-string">&quot;fail to search collection:&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">final</span> <span class="hljs-type">Integer</span> <span class="hljs-variable">SEARCH_K</span> <span class="hljs-operator">=</span> <span class="hljs-number">2</span>;
<span class="hljs-keyword">final</span> <span class="hljs-type">String</span> <span class="hljs-variable">SEARCH_PARAM</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;{\&quot;nprobe\&quot;:10}&quot;</span>;
List&lt;String&gt; search_output_fields = Arrays.asList(<span class="hljs-string">&quot;book_id&quot;</span>);
List&lt;List&lt;Float&gt;&gt; search_vectors = Arrays.asList(Arrays.asList(<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>));

<span class="hljs-type">SearchParam</span> <span class="hljs-variable">searchParam</span> <span class="hljs-operator">=</span> SearchParam.newBuilder()
  .withCollectionName(<span class="hljs-string">&quot;book&quot;</span>)
  .withMetricType(MetricType.L2)
  .withOutFields(search_output_fields)
  .withTopK(SEARCH_K)
  .withVectors(search_vectors)
  .withVectorFieldName(<span class="hljs-string">&quot;book_intro&quot;</span>)
  .withExpr(<span class="hljs-string">&quot;word_count &lt;= 11000&quot;</span>)
  .withParams(SEARCH_PARAM)
  .build();
R&lt;SearchResults&gt; respSearch = milvusClient.search(searchParam);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-function">search

Collection <span class="hljs-title">name</span> (<span class="hljs-params">book</span>): book

The vectors of search <span class="hljs-title">data</span>(<span class="hljs-params">the length of data <span class="hljs-keyword">is</span> number of query (nq</span>), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also import a csv file without headers): [[0.1, 0.2]]

The vector field used to search of <span class="hljs-title">collection</span> (<span class="hljs-params">book_intro</span>): book_intro

Metric type: L2

Search parameter nprobe&#x27;s <span class="hljs-keyword">value</span>: 10

The max number of returned <span class="hljs-keyword">record</span>, also known <span class="hljs-keyword">as</span> topk: 2

The boolean expression used to filter attribute []: word_count &lt;</span>= <span class="hljs-number">11000</span>

<span class="hljs-function">The names of partitions to <span class="hljs-title">search</span> (<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) [&#x27;_default&#x27;] []: 

timeout []:

Guarantee <span class="hljs-title">Timestamp</span>(<span class="hljs-params">It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search all operations performed to date</span>) [0]: 

Travel <span class="hljs-title">Timestamp</span>(<span class="hljs-params">Specify a timestamp <span class="hljs-keyword">in</span> a search to <span class="hljs-keyword">get</span> results based <span class="hljs-keyword">on</span> a data view</span>) [0]:
</span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;http://localhost:9091/api/v1/search&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collection_name&quot;: &quot;book&quot;,
    &quot;output_fields&quot;: [&quot;book_id&quot;],
    &quot;search_params&quot;: [
      {&quot;key&quot;: &quot;anns_field&quot;, &quot;value&quot;: &quot;book_intro&quot;},
      {&quot;key&quot;: &quot;topk&quot;, &quot;value&quot;: &quot;2&quot;},
      {&quot;key&quot;: &quot;params&quot;, &quot;value&quot;: &quot;{\&quot;nprobe\&quot;: 10}&quot;},
      {&quot;key&quot;: &quot;metric_type&quot;, &quot;value&quot;: &quot;L2&quot;},
      {&quot;key&quot;: &quot;round_decimal&quot;, &quot;value&quot;: &quot;-1&quot;}
    ],
    &quot;vectors&quot;: [ [0.1,0.2] ],
    &quot;dsl&quot;: &quot;word_count &gt;= 11000&quot;,
    &quot;dsl_type&quot;: 1
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-curl">
Output:
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;status&quot;</span>:{},
  <span class="hljs-string">&quot;results&quot;</span>:{
    <span class="hljs-string">&quot;num_queries&quot;</span>:<span class="hljs-number">1</span>,
    <span class="hljs-string">&quot;top_k&quot;</span>:<span class="hljs-number">2</span>,
    <span class="hljs-string">&quot;fields_data&quot;</span>:[
      {
        <span class="hljs-string">&quot;type&quot;</span>:<span class="hljs-number">5</span>,
        <span class="hljs-string">&quot;field_name&quot;</span>:<span class="hljs-string">&quot;book_id&quot;</span>,
        <span class="hljs-string">&quot;Field&quot;</span>:{<span class="hljs-string">&quot;Scalars&quot;</span>:{<span class="hljs-string">&quot;Data&quot;</span>:{<span class="hljs-string">&quot;LongData&quot;</span>:{<span class="hljs-string">&quot;data&quot;</span>:[<span class="hljs-number">11</span>,<span class="hljs-number">12</span>]}}}},
        <span class="hljs-string">&quot;field_id&quot;</span>:<span class="hljs-number">100</span>
      }
    ],
    <span class="hljs-string">&quot;scores&quot;</span>:[<span class="hljs-number">119.44999</span>,<span class="hljs-number">142.24998</span>],
    <span class="hljs-string">&quot;ids&quot;</span>:{<span class="hljs-string">&quot;IdField&quot;</span>:{<span class="hljs-string">&quot;IntId&quot;</span>:{<span class="hljs-string">&quot;data&quot;</span>:[<span class="hljs-number">11</span>,<span class="hljs-number">12</span>]}}},<span class="hljs-string">&quot;topks&quot;</span>:[<span class="hljs-number">2</span>]
  },
  <span class="hljs-string">&quot;collection_name&quot;</span>:<span class="hljs-string">&quot;book&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
</div>
<table class="language-python">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">data</code></td>
        <td>Vectors to search with.</td>
    </tr>
    <tr>
        <td><code translate="no">anns_field</code></td>
        <td>Name of the field to search on.</td>
    </tr>
  <tr>
        <td><code translate="no">params</code></td>
        <td>Search parameter(s) specific to the index. See <a href="/docs/v2.1.x/index.md">Vector Index</a> for more information.</td>
    </tr>
    <tr>
        <td><code translate="no">limit</code></td>
        <td>Number of the most similar results to return.</td>
    </tr>
  <tr>
        <td><code translate="no">expr</code></td>
        <td>Boolean expression used to filter attribute. See <a href="/docs/v2.1.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
    </tr>
  <tr>
        <td><code translate="no">partition_names</code> (optional)</td>
        <td>List of names of the partition to search in.</td>
    </tr>
  <tr>
        <td><code translate="no">output_fields</code> (optional)</td>
        <td>Name of the field to return. Vector field is not supported in current release.</td>
    </tr>
  <tr>
        <td><code translate="no">timeout</code> (optional)</td>
        <td>A duration of time in seconds to allow for RPC. Clients wait until server responds or error occurs when it is set to None.</td>
    </tr>
  <tr>
        <td><code translate="no">round_decimal</code> (optional)</td>
        <td>Number of decimal places of returned distance.</td>
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
        <td>Name of the collection to search in.</td>
    </tr>
    <tr>
    <td><code translate="no">search_params</code></td>
    <td>Parameters (as an object) used for search.</td>
  </tr>
    <tr>
    <td><code translate="no">vectors</code></td>
    <td>Vectors to search with.</td>
  </tr>
  <tr>
        <td><code translate="no">vector_type</code></td>
        <td>Pre-check of binary or float vectors. <code translate="no">100</code> for binary vectors and <code translate="no">101</code> for float vectors.</td>
    </tr>
  <tr>
        <td><code translate="no">partition_names</code> (optional)</td>
        <td>List of names of the partition to search in.</td>
    </tr>
    <tr>
        <td><code translate="no">expr</code> (optional)</td>
        <td>Boolean expression used to filter attribute. See <a href="/docs/v2.1.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
    </tr>
  <tr>
        <td><code translate="no">output_fields</code> (optional)</td>
        <td>Name of the field to return. Vector field not support in current release.</td>
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
        <td><code translate="no">NewIndex*SearchParam func</code></td>
        <td>Function to create entity.SearchParam according to different index types.</td>
        <td>For floating point vectors:
            <ul>
                <li><code translate="no">NewIndexFlatSearchParam</code> (FLAT)</li>
                <li><code translate="no">NewIndexIvfFlatSearchParam</code> (IVF_FLAT)</li>
                <li><code translate="no">NewIndexIvfSQ8SearchParam</code> (IVF_SQ8)</li>
                <li><code translate="no">NewIndexIvfPQSearchParam</code> (RNSG)</li>
                <li><code translate="no">NewIndexRNSGSearchParam</code> (HNSW)</li>
                <li><code translate="no">NewIndexHNSWSearchParam</code> (HNSW)</li>
                <li><code translate="no">NewIndexANNOYSearchParam</code> (ANNOY)</li>
                <li><code translate="no">NewIndexRHNSWFlatSearchParam</code> (RHNSW_FLAT)</li>
                <li><code translate="no">NewIndexRHNSW_PQSearchParam</code> (RHNSW_PQ)</li>
                <li><code translate="no">NewIndexRHNSW_SQSearchParam</code> (RHNSW_SQ)</li>
            </ul>
            For binary vectors:
            <ul>
                <li><code translate="no">NewIndexBinFlatSearchParam</code> (BIN_FLAT)</li>
                <li><code translate="no">NewIndexBinIvfFlatSearchParam</code> (BIN_IVF_FLAT)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><code translate="no">searchParam</code></td>
        <td>Search parameter(s) specific to the index.</td>
    <td>See <a href="/docs/v2.1.x/index.md">Vector Index</a> for more information.</td>
    </tr>
  <tr>
    <td><code translate="no">ctx</code></td>
    <td>Context to control API invocation process.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><code translate="no">CollectionName</code></td>
    <td>Name of the collection to load.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><code translate="no">partitionNames</code></td>
    <td>List of names of the partitions to load. All partitions will be searched if it is left empty.</td>
    <td>N/A</td>
  </tr>
  <tr>
        <td><code translate="no">expr</code></td>
        <td>Boolean expression used to filter attribute.</td>
    <td>See <a href="/docs/v2.1.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
    </tr>
  <tr>
        <td><code translate="no">output_fields</code></td>
        <td>Name of the field to return.</td>
    <td>Vector field is not supported in current release.</td>
    </tr>
  <tr>
    <td><code translate="no">vectors</code></td>
    <td>Vectors to search with.</td>
    <td>N/A</td>
  </tr>
  <tr>
        <td><code translate="no">vectorField</code></td>
        <td>Name of the field to search on.</td>
    <td>N/A</td>
    </tr>
  <tr>
        <td><code translate="no">metricType</code></td>
        <td>Metric type used for search.</td>
    <td>This parameter must be set identical to the metric type used for index building.</td>
    </tr>
  <tr>
        <td><code translate="no">topK</code></td>
        <td>Number of the most similar results to return.</td>
    <td>N/A</td>
    </tr>
  <tr>
        <td><code translate="no">sp</code></td>
        <td>entity.SearchParam specific to the index.</td>
    <td>N/A</td>
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
        <td><code translate="no">MetricType</code></td>
        <td>Metric type used for search.</td>
    <td>This parameter must be set identical to the metric type used for index building.</td>
    </tr>
  <tr>
        <td><code translate="no">OutFields</code></td>
        <td>Name of the field to return.</td>
    <td>Vector field is not supported in current release.</td>
    </tr>
  <tr>
        <td><code translate="no">TopK</code></td>
        <td>Number of the most similar results to return.</td>
    <td>N/A</td>
    </tr>
  <tr>
    <td><code translate="no">Vectors</code></td>
    <td>Vectors to search with.</td>
    <td>N/A</td>
  </tr>
<tr>
        <td><code translate="no">VectorFieldName</code></td>
        <td>Name of the field to search on.</td>
    <td>N/A</td>
    </tr>
  <tr>
        <td><code translate="no">Expr</code></td>
        <td>Boolean expression used to filter attribute.</td>
    <td>See <a href="/docs/v2.1.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
    </tr>
  <tr>
        <td><code translate="no">Params</code></td>
        <td>Search parameter(s) specific to the index.</td>
    <td>See <a href="/docs/v2.1.x/index.md">Vector Index</a> for more information.</td>
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
<table class="language-curl">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">output_fields</code>(optional)</td>
        <td>Name of the field to return. Vector field is not supported in current release.</td>
    </tr>
    <tr>
        <td><code translate="no">anns_field</code></td>
        <td>Name of the field to search on.</td>
    </tr>
    <tr>
        <td><code translate="no">topk</code></td>
        <td>Number of the most similar results to return.</td>
    </tr>
    <tr>
        <td><code translate="no">params</code></td>
        <td>Search parameter(s) specific to the index. See <a href="/docs/v2.1.x/index.md">Vector Index</a> for more information.</td>
    </tr>
    <tr>
        <td><code translate="no">metric_type</code></td>
        <td>Metric type used for search. This parameter must be set identical to the metric type used for index building.</td>
    </tr>
    <tr>
        <td><code translate="no">round_decimal</code> (optional)</td>
        <td>Number of decimal places of returned distance.</td>
    </tr>
    <tr>
        <td><code translate="no">Vectors</code></td>
        <td>Vectors to search with.</td>
    </tr>
    <tr>
        <td><code translate="no">dsl</code></td>
        <td>Boolean expression used to filter attribute. Find more expression details in <a href="/docs/v2.1.x/boolean.md">Boolean Expression Rules</a>.</td>
    </tr>
    <tr>
        <td><code translate="no">dsl_type</code></td>
        <td>Type of <code translate="no">dsl</code> (Data Search Language) field:
        <br>0: "Dsl"
        <br>1: "BoolExprV1"
        </td>
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
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">assert</span> <span class="hljs-built_in">len</span>(res) == <span class="hljs-number">1</span>
hits = res[<span class="hljs-number">0</span>]
<span class="hljs-keyword">assert</span> <span class="hljs-built_in">len</span>(hits) == <span class="hljs-number">2</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;- Total hits: <span class="hljs-subst">{<span class="hljs-built_in">len</span>(hits)}</span>, hits ids: <span class="hljs-subst">{hits.ids}</span> &quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;- Top1 hit id: <span class="hljs-subst">{hits[<span class="hljs-number">0</span>].<span class="hljs-built_in">id</span>}</span>, distance: <span class="hljs-subst">{hits[<span class="hljs-number">0</span>].distance}</span>, score: <span class="hljs-subst">{hits[<span class="hljs-number">0</span>].score}</span> &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(results.<span class="hljs-property">results</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">fmt.Printf(<span class="hljs-string">&quot;%#v\n&quot;</span>, searchResult)
<span class="hljs-keyword">for</span> _, sr := <span class="hljs-keyword">range</span> searchResult {
  fmt.Println(sr.IDs)
  fmt.Println(sr.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">SearchResultsWrapper wrapperSearch = <span class="hljs-built_in">new</span> SearchResultsWrapper(respSearch.getData().getResults());
System.out.<span class="hljs-built_in">println</span>(wrapperSearch.getIDScore(<span class="hljs-number">0</span>));
System.out.<span class="hljs-built_in">println</span>(wrapperSearch.getFieldData(<span class="hljs-string">&quot;book_id&quot;</span>, <span class="hljs-number">0</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Milvus CLI automatically returns the primary key values of the most similar vectors and their distances.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># See the output of the previous step.</span>
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
<li><p>Try <a href="/docs/v2.1.x/timetravel.md">Search with Time Travel</a></p></li>
<li><p>Explore API references for Milvus SDKs:</p>
<ul>
<li><a href="/api-reference/pymilvus/v2.1.x/About.md">PyMilvus API reference</a></li>
<li><a href="/api-reference/node/v2.1.x/About.md">Node.js API reference</a></li>
<li><a href="/api-reference/go/v2.1.x/About.md">Go API reference</a></li>
<li><a href="/api-reference/java/v2.1.x/About.md">Java API reference</a></li>
</ul></li>
</ul>
