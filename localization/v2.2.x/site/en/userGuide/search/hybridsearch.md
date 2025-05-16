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
<p>A hybrid search is essentially a vector search with attribute filtering. By specifying <a href="/docs/v2.2.x/boolean.md">boolean expressions</a> that filter the scalar fields or the primary key field, you can limit your search with certain conditions.</p>
<p>The following example shows how to perform a hybrid search on the basis of a regular <a href="/docs/v2.2.x/search.md">vector search</a>. Suppose you want to search for certain books based on their vectorized introductions, but you only want those within a specific range of word count. You can then specify the boolean expression to filter the <code translate="no">word_count</code> field in the search parameters. Milvus will search for similar vectors only among those entities that match the expression.</p>
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
  <a href="#csharp">C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection
collection = Collection(<span class="hljs-string">&quot;book&quot;</span>)      <span class="hljs-comment"># Get an existing collection.</span>
collection.load()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">loadCollection</span>({
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
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> collection = milvusClient.<span class="hljs-title class_">GetCollection</span>(<span class="hljs-string">&quot;book&quot;</span>).<span class="hljs-title class_">LoadAsync</span>();
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
<p>You can also use dynamic fields in the filter expression and output fields in the search requests. For example, refer to <a href="/docs/v2.2.x/dynamic_schema.md">Dynamic Schema</a>.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#csharp">C#</a>
</div>
<pre><code translate="no" class="language-python">search_param = {
  <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>]],
  <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;book_intro&quot;</span>,
  <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}, <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">0</span>},
  <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">10</span>,
  <span class="hljs-string">&quot;expr&quot;</span>: <span class="hljs-string">&quot;word_count &lt;= 11000&quot;</span>,
}
res = collection.<span class="hljs-title function_">search</span>(**search_param)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> milvusClient.search({
    collection_name: <span class="hljs-string">&quot;book&quot;</span>,
    vector: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>],
    filter: <span class="hljs-literal">null</span>,
    <span class="hljs-comment">// the sum of `limit` and `offset` should be less than 16384.</span>
    limit: <span class="hljs-number">10</span>,
    offset: <span class="hljs-number">2</span>,
    metric_type: MetricType.L2,
    param: {
      <span class="hljs-keyword">params</span>: { nprobe: <span class="hljs-number">1024</span> } 
    },
    consistency_level: ConsistencyLevelEnum.Strong,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">sp, _ := entity.NewIndexFlatSearchParam(   <span class="hljs-comment">// NewIndex*SearchParam func</span>
  <span class="hljs-number">10</span>,                                      <span class="hljs-comment">// searchParam</span>
)

opt := client.SearchQueryOptionFunc(<span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(option *client.SearchQueryOption)</span></span> {
    option.Limit = <span class="hljs-number">3</span>
    option.Offset = <span class="hljs-number">0</span>
    option.ConsistencyLevel = entity.ClStrong
    option.IgnoreGrowing = <span class="hljs-literal">false</span>
})

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
  opt,                                     <span class="hljs-comment">// search options</span>
)

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
  log.Fatal(<span class="hljs-string">&quot;fail to search collection:&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">final</span> <span class="hljs-type">Integer</span> <span class="hljs-variable">SEARCH_K</span> <span class="hljs-operator">=</span> <span class="hljs-number">2</span>;
<span class="hljs-keyword">final</span> <span class="hljs-type">String</span> <span class="hljs-variable">SEARCH_PARAM</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;{\&quot;nprobe\&quot;:10, \”offset\”:5}&quot;</span>;
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
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> milvusClient.GetCollection(<span class="hljs-string">&quot;book&quot;</span>).SearchAsync(
    vectorFieldName: <span class="hljs-string">&quot;book_intro&quot;</span>,
    vectors: <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;[] { <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span> } },
    SimilarityMetricType.L2,
    limit: <span class="hljs-number">10</span>,
    <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;title&quot;</span> },
        ConsistencyLevel = ConsistencyLevel.Strong,
        Offset = <span class="hljs-number">5</span>,
        Expression = <span class="hljs-string">&quot;word_count &lt;= 11000&quot;</span>,
        ExtraParameters = { [<span class="hljs-string">&quot;nprobe&quot;</span>] = <span class="hljs-string">&quot;1024&quot;</span> }
    });
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
        <td><code translate="no">data</code></td>
        <td>Vectors to search with.</td>
    </tr>
    <tr>
        <td><code translate="no">anns_field</code></td>
        <td>Name of the field to search on.</td>
    </tr>
  <tr>
        <td><code translate="no">param</code></td>
        <td>Search parameters. Possible options are as follows: <ul>
      <li><code translate="no">metric_type</code> Method used to measure the distance between vectors during search. It should be the same as the one specified for the index-building process. See <a href="/docs/v2.2.x/metric.md">Simlarity Metrics</a> for more information.</li>
      <li><code translate="no">offset</code> Number of entities to skip during the search. The sum of this parameter and <code translate="no">limit</code> of the <code translate="no">search</code> method should be less than <code translate="no">16384</code>.</li>
      <li><code translate="no">ignore_growing</code> Whether to ignore growing segments during similarity searches. The value defaults to <code translate="no">False</code>, indicating that searches involve growing segments.</li>
      <li><code translate="no">params</code> Search parameter(s) specific to the specified index type. See <a href="/docs/v2.2.x/index.md">Vector Index</a> for more information. Possible options are as follows: <ul><li><code translate="no">nprobe</code> Indicates the number of cluster units to search. This parameter is available only when <code translate="no">index_type</code> is set to <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_SQ8</code>, or <code translate="no">IVF_PQ</code>. The value should be less than <code translate="no">nlist</code> specified for the index-building process.</li>
            <li><code translate="no">ef</code> Indicates the search scope. This parameter is available only when <code translate="no">index_type</code> is set to <code translate="no">HNSW</code>. The value should be within the range from <code translate="no">top_k</code> to <code translate="no">32768</code>.</li>
            <li><code translate="no">search_k</code> Indicates the search scope. This parameter is available only when <code translate="no">index_type</code> is set to <code translate="no">ANNOY</code>. The value should be greater than or equal to the top K. </li>
        </ul></li>
    </tr>
    <tr>
        <td><code translate="no">limit</code></td>
        <td>Number of the most similar results to return. The sum of this value and <code translate="no">offset</code> should be less than 16384.</td>
    </tr>
  <tr>
        <td><code translate="no">expr</code></td>
        <td>Boolean expression used to filter attribute. See <a href="/docs/v2.2.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
    </tr>
  <tr>
        <td><code translate="no">output_fields</code> (optional)</td>
        <td>Name of the field to return. Vector field is not supported in current release.</td>
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
        <td><code translate="no">expr</code> (optional)</td>
        <td>Boolean expression used to filter attribute. See <a href="/docs/v2.2.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
    </tr>
  <tr>
        <td><code translate="no">output_fields</code> (optional)</td>
        <td>Name of the field to return. The vector field does not support in the current release.</td>
    </tr>
  <tr>
    <td><code translate="no">limit</code> (optional)</td>
    <td>Number of entities to return. The sum of this parameter and <code translate="no">offset</code> should be less than 16384.</td>
  </tr>
  <tr>
    <td><code translate="no">offset</code> (optional)</td>
    <td>Number of entities to skip. This parameter applies only when <code translate="no">limit</code> is specified, and the sum of this parameter and <code translate="no">limit</code> should be less than 16384.</td>
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
    <td>See <a href="/docs/v2.2.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
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
        <td>Search parameter(s) specific to the index.</td>
    <td>See <a href="/docs/v2.2.x/index.md">Vector Index</a> for more information. Possible options are as follows: 
        <ul><li>For floating point vectors:
            <ul>
                <li><code translate="no">NewIndexFlatSearchParam()</code> (FLAT)</li>
                <li><code translate="no">NewIndexIvfFlatSearchParam(nprobe int)</code> (IVF_FLAT)</li>
                <li><code translate="no">NewIndexIvfSQ8SearchParam(nprobe int)</code> (IVF_SQ8)</li>
                <li><code translate="no">NewIndexIvfPQSearchParam(nprobe int)</code> (RNSG)</li>
                <li><code translate="no">NewIndexHNSWSearchParam(ef int)</code> (HNSW)</li>
                <li><code translate="no">NewIndexANNOYSearchParam(search_k int)</code> (ANNOY)</li>
            </ul></li>
            <li>For binary vectors:
            <ul>
                <li><code translate="no">NewIndexBinFlatSearchParam(nprobe int)</code> (BIN_FLAT)</li>
                <li><code translate="no">NewIndexBinIvfFlatSearchParam(nprobe int)</code> (BIN_IVF_FLAT)</li>
            </ul></li>
        </ul>
    </tr>
    <tr>
        <td><code translate="no">opts</code></td>
        <td>Search options in the form of <code translate="no">entity.SearchQueryOptionFunc</code>.</td>
        <td><ul>
            <li><code translate="no">Limit</code> Indicates the number of entities to return.</li>
            <li><code translate="no">Offset</code> Indicates the number of entities to skip during the search. The sum of this parameter and <code translate="no">Limit</code> should be less than <code translate="no">16384</code>.</li>
            <li><code translate="no">ConsistencyLevel</code> Indicates the consistency level applied during the search.</li>
            <li><code translate="no">Ignore Growing</code> Indicates whether to ignore growing segments during similarity searches. The value defaults to <code translate="no">False</code>, indicating that searches involve growing segments. </li>
        </ul></td>
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
    <td>See <a href="/docs/v2.2.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
    </tr>
  <tr>
        <td><code translate="no">Params</code></td>
        <td>Search parameter(s) specific to the index.</td>
    <td>See <a href="/docs/v2.2.x/index.md">Vector Index</a> for more information. Possible options are as follows:<ul>
        <li><code translate="no">nprobe</code> Indicates the number of cluster units to search. This parameter is available only when <code translate="no">index_type</code> is set to <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_SQ8</code>, or <code translate="no">IVF_PQ</code>. The value should be less than <code translate="no">nlist</code> specified for the index-building process.</li>
        <li><code translate="no">ef</code> Indicates the search scope. This parameter is available only when <code translate="no">index_type</code> is set to <code translate="no">HNSW</code>. The value should be within the range from <code translate="no">top_k</code> to <code translate="no">32768</code>.</li>
        <li><code translate="no">search_k</code> Indicates the search scope. This parameter is available only when <code translate="no">index_type</code> is set to <code translate="no">ANNOY</code>. The value should be greater than or equal to the top K.</li>
        <li><code translate="no">metric_type</code> Indicates the metric type used in the search. It should be the same as the one specified when you index the collection.</li>
        <li><code translate="no">limit</code> Indicates the number of entities to return starting from the last skippped entity.</li>
        <li><code translate="no">offset</code> Indicates the number of entities to skip during the search. The sum of this parameter and <code translate="no">topK</code> of the <code translate="no">withTopK()</code> method should be less than <code translate="no">16384</code>.</li>
    </ul></td>
    </tr>
    </tbody>
</table>
<table class="language-csharp">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>OutputFields</td>
            <td>A dictionary of the fields in the search results.</td>
        </tr>
        <tr>
            <td>ConsistencyLevel</td>
            <td>Consistency level for the search. Possible values are: <ul>
                <li>ConsistencyLevel.Strong</li>
                <li>ConsistencyLevel.Session</li>
                <li>ConsistencyLevel.BoundedStaleness</li>
                <li>ConsistencyLevel.Eventually</li>
                <li>ConsistencyLevel.Customized</li>
            </ul></td>
        </tr>
        <tr>
            <td>Offset</td>
            <td>Number of records to skip before return. The sum of this value and <code translate="no">limit</code> in the search request should be less than <code translate="no">16384</code>.</td>
        </tr>
        <tr>
            <td>Expression</td>
            <td>Boolean expression used to filter attribute. See <a href="/docs/v2.2.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
        </tr>
        <tr>
            <td>ExtraParameters</td>
            <td>Other applicable parameters. See <a href="/docs/v2.2.x/index.md">Vector Index</a> for more information. Possible options are as follows:<ul>
        <li><code translate="no">nprobe</code> Indicates the number of cluster units to search. This parameter is available only when <code translate="no">index_type</code> is set to <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_SQ8</code>, or <code translate="no">IVF_PQ</code>. The value should be less than <code translate="no">nlist</code> specified for the index-building process.</li>
        <li><code translate="no">ef</code> Indicates the search scope. This parameter is available only when <code translate="no">index_type</code> is set to <code translate="no">HNSW</code>. The value should be within the range from <code translate="no">top_k</code> to <code translate="no">32768</code>.</li>
        <li><code translate="no">search_k</code> Indicates the search scope. This parameter is available only when <code translate="no">index_type</code> is set to <code translate="no">ANNOY</code>. The value should be greater than or equal to the top K.</li>
    </ul></td>
        </tr>
    </tbody>
</table>
<p>Check the returned results.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#csharp">C#</a>
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
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// # get the IDs of all returned hits</span>
Console.WriteLine(results.Ids.LongIds)
<span class="hljs-comment">// alternative Console.WriteLine(results.Ids.StringIds)</span>

<span class="hljs-comment">// get the scores to the query vector from all returned hits</span>
<span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">var</span> score <span class="hljs-keyword">in</span> results.Scores.ToList()) {
    Console.WriteLine(score);
};
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
<li><p>Try <a href="/docs/v2.2.x/timetravel.md">Search with Time Travel</a></p></li>
<li><p>Explore API references for Milvus SDKs:</p>
<ul>
<li><a href="/api-reference/pymilvus/v2.2.x/About.md">PyMilvus API reference</a></li>
<li><a href="/api-reference/node/v2.2.x/About.md">Node.js API reference</a></li>
<li><a href="/api-reference/go/v2.2.x/About.md">Go API reference</a></li>
<li><a href="/api-reference/java/v2.2.x/About.md">Java API reference</a></li>
</ul></li>
</ul>
