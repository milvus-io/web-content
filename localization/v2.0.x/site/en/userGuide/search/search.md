---
id: search.md
related_key: search
summary: Conduct a vector similarity search with Milvus.
title: ''
---
<h1 id="Conduct-a-Vector-Similarity-Search" class="common-anchor-header">Conduct a Vector Similarity Search<button data-href="#Conduct-a-Vector-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to search entities with Milvus.</p>
<p>A vector similarity search in Milvus calculates the distance between query vector(s) and vectors in the collection with specified similarity metrics, and returns the most similar results. By specifying a <a href="/docs/v2.0.x/boolean.md">boolean expression</a> that filters the scalar field or the primary key field, you can perform a <a href="/docs/v2.0.x/hybridsearch.md">hybrid search</a> or even a search with <a href="/docs/v2.0.x/timetravel.md">Time Travel</a>.</p>
<p>The following example shows how to perform a vector similarity search on a 2000-row dataset of book ID (primary key), word count (scalar field), and book introduction (vector field), simulating the situation that you search for certain books based on their vectorized introductions. Milvus will return the most similar results according to the query vector and search parameters you have defined.</p>
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
    </button></h2><p>All search and query operations within Milvus are executed in memory. Load the collection to memory before conducting a vector similarity search.</p>
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
<h2 id="Prepare-search-parameters" class="common-anchor-header">Prepare search parameters<button data-href="#Prepare-search-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Prepare the parameters that suit your search scenario. The following example defines that the search will calculate the distance with Euclidean distance, and retrieve vectors from ten closest clusters built by the IVF_FLAT index.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>
<pre><code translate="no" class="language-python">search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> searchParams = {
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;book_intro&quot;</span>,
  <span class="hljs-attr">topk</span>: <span class="hljs-string">&quot;2&quot;</span>,
  <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;L2&quot;</span>,
  <span class="hljs-attr">params</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span> }),
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">sp, _ := entity.NewIndexFlatSearchParam( <span class="hljs-comment">// NewIndex*SearchParam func</span>
    <span class="hljs-number">10</span>,                                  <span class="hljs-comment">// searchParam</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">final</span> <span class="hljs-type">Integer</span> <span class="hljs-variable">SEARCH_K</span> <span class="hljs-operator">=</span> <span class="hljs-number">2</span>;                       <span class="hljs-comment">// TopK</span>
<span class="hljs-keyword">final</span> <span class="hljs-type">String</span> <span class="hljs-variable">SEARCH_PARAM</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;{\&quot;nprobe\&quot;:10}&quot;</span>;    <span class="hljs-comment">// Params</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-function">search

Collection <span class="hljs-title">name</span> (<span class="hljs-params">book</span>): book

The vectors of search <span class="hljs-title">data</span>(<span class="hljs-params">the length of data <span class="hljs-keyword">is</span> number of query (nq</span>), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also import a csv file without headers): [[0.1, 0.2]]

The vector field used to search of <span class="hljs-title">collection</span> (<span class="hljs-params">book_intro</span>): book_intro

Metric type: L2

Search parameter nprobe&#x27;s <span class="hljs-keyword">value</span>: 10

The max number of returned <span class="hljs-keyword">record</span>, also known <span class="hljs-keyword">as</span> topk: 10

The boolean expression used to filter attribute []: 

The names of partitions to <span class="hljs-title">search</span> (<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) [&#x27;_default&#x27;] []: 

timeout []:

Guarantee <span class="hljs-title">Timestamp</span>(<span class="hljs-params">It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search all operations performed to date</span>) [0]: 

Travel <span class="hljs-title">Timestamp</span>(<span class="hljs-params">Specify a timestamp <span class="hljs-keyword">in</span> a search to <span class="hljs-keyword">get</span> results based <span class="hljs-keyword">on</span> a data view</span>) [0]:
</span><button class="copy-code-btn"></button></code></pre>
<table class="language-python">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">metric_type</code></td>
        <td>Metrics used to measure similarity of vectors. See <a href="/docs/v2.0.x/metric.md">Simlarity Metrics</a> for more information.</td>
    </tr>
    <tr>
        <td><code translate="no">params</code></td>
        <td>Search parameter(s) specific to the index. See <a href="/docs/v2.0.x/index.md">Vector Index</a> for more information.</td>
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
        <td><code translate="no">anns_field</code></td>
        <td>Name of the field to search on.</td>
    </tr>
    <tr>
        <td><code translate="no">topk</code></td>
        <td>Number of the most similar results to return.</td>
    </tr>
    <tr>
        <td><code translate="no">metric_type</code></td>
        <td>Metrics used to measure similarity of vectors. See <a href="/docs/v2.0.x/metric.md">Simlarity Metrics</a> for more information.</td>
    </tr>
    <tr>
        <td><code translate="no">params</code></td>
        <td>Search parameter(s) specific to the index. See <a href="/docs/v2.0.x/index.md">Vector Index</a> for more information.</td>
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
    <td>See <a href="/docs/v2.0.x/index.md">Vector Index</a> for more information.</td>
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
        <td><code translate="no">TopK</code></td>
        <td>Number of the most similar results to return.</td>
    <td>N/A</td>
    </tr>
  <tr>
        <td><code translate="no">Params</code></td>
        <td>Search parameter(s) specific to the index.</td>
    <td>See <a href="/docs/v2.0.x/index.md">Vector Index</a> for more information.</td>
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
<h2 id="Conduct-a-vector-search" class="common-anchor-header">Conduct a vector search<button data-href="#Conduct-a-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Search vectors with Milvus. To search in a specific <a href="/docs/v2.0.x/glossary.md#Partition">partition</a>, specify the list of partition names.</p>
<p>Milvus supports setting consistency level specifically for a search or query  (only on PyMilvus currently). The consistency level set in the search or query requests overwrites the one set while creating the collection. In this example, the consistency level of the search request is set as <code translate="no">Strong</code>, meaning Milvus will read the most updated data view at the exact time point when a search or query request comes. Without specifying the consistency level during a search or query, Milvus adopts the original consistency level of the collection.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>
<pre><code translate="no" class="language-python">results = collection.search(
    data=[[0.1, 0.2]], 
    anns_field=<span class="hljs-string">&quot;book_intro&quot;</span>, 
    param=search_params, 
    <span class="hljs-built_in">limit</span>=10, 
    <span class="hljs-built_in">expr</span>=None,
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">dataManager</span>.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,
  <span class="hljs-attr">expr</span>: <span class="hljs-string">&quot;&quot;</span>,
  <span class="hljs-attr">vectors</span>: [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>]],
  <span class="hljs-attr">search_params</span>: searchParams,
  <span class="hljs-attr">vector_type</span>: <span class="hljs-number">101</span>,    <span class="hljs-comment">// DataType.FloatVector</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">searchResult, err := milvusClient.Search(
    context.Background(),                    <span class="hljs-comment">// ctx</span>
    <span class="hljs-string">&quot;book&quot;</span>,                                  <span class="hljs-comment">// CollectionName</span>
    []<span class="hljs-type">string</span>{},                              <span class="hljs-comment">// partitionNames</span>
    <span class="hljs-string">&quot;&quot;</span>,                                      <span class="hljs-comment">// expr</span>
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
<pre><code translate="no" class="language-java"><span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">String</span>&gt; search_output_fields = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;book_id&quot;</span>);
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">Float</span>&gt;&gt; search_vectors = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>1f, <span class="hljs-number">0.</span>2f));

<span class="hljs-title class_">SearchParam</span> searchParam = <span class="hljs-title class_">SearchParam</span>.<span class="hljs-title function_">newBuilder</span>()
        .<span class="hljs-title function_">withCollectionName</span>(<span class="hljs-string">&quot;book&quot;</span>)
        .<span class="hljs-title function_">withMetricType</span>(<span class="hljs-title class_">MetricType</span>.<span class="hljs-property">L2</span>)
        .<span class="hljs-title function_">withOutFields</span>(search_output_fields)
        .<span class="hljs-title function_">withTopK</span>(<span class="hljs-variable constant_">SEARCH_K</span>)
        .<span class="hljs-title function_">withVectors</span>(search_vectors)
        .<span class="hljs-title function_">withVectorFieldName</span>(<span class="hljs-string">&quot;book_intro&quot;</span>)
        .<span class="hljs-title function_">withParams</span>(<span class="hljs-variable constant_">SEARCH_PARAM</span>)
        .<span class="hljs-title function_">build</span>();
R&lt;<span class="hljs-title class_">SearchResults</span>&gt; respSearch = milvusClient.<span class="hljs-title function_">search</span>(searchParam);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Follow the previous step.</span>
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
        <td>Search parameter(s) specific to the index. See <a href="/docs/v2.0.x/index.md">Vector Index</a> for more information.</td>
    </tr>
    <tr>
        <td><code translate="no">limit</code></td>
        <td>Number of the most similar results to return.</td>
    </tr>
  <tr>
        <td><code translate="no">expr</code></td>
        <td>Boolean expression used to filter attribute. See <a href="/docs/v2.0.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
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
    <tr>
        <td><code translate="no">consistency_level</code> (optional)</td>
        <td>Consistency level of the search.</td>
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
        <td>Boolean expression used to filter attribute. See <a href="/docs/v2.0.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
    </tr>
  <tr>
        <td><code translate="no">output_fields</code> (optional)</td>
        <td>Name of the field to return. Vector field is not supported in current release.</td>
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
    <td>See <a href="/docs/v2.0.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
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
    <td>See <a href="/docs/v2.0.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
    </tr>
    </tbody>
</table>
<p>Check the primary key values of the most similar vectors and their distances.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>
<pre><code translate="no" class="language-python">results[0].ids
results[0].distances
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
<p>Release the collection loaded in Milvus to reduce memory consumption when the search is completed.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>
<pre><code translate="no" class="language-python">collection.release()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">collectionManager</span>.<span class="hljs-title function_">releaseCollection</span>({  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err := milvusClient.ReleaseCollection(
    context.Background(),                            <span class="hljs-comment">// ctx</span>
    <span class="hljs-string">&quot;book&quot;</span>,                                          <span class="hljs-comment">// CollectionName</span>
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to release collection:&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">milvusClient.<span class="hljs-title function_">releaseCollection</span>(
        <span class="hljs-title class_">ReleaseCollectionParam</span>.<span class="hljs-title function_">newBuilder</span>()
                .<span class="hljs-title function_">withCollectionName</span>(<span class="hljs-string">&quot;book&quot;</span>)
                .<span class="hljs-title function_">build</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">release -c book
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><table>
<thead>
<tr><th>Feature</th><th>Maximum limit</th></tr>
</thead>
<tbody>
<tr><td>Length of a collection name</td><td>255 characters</td></tr>
<tr><td>Number of partitions in a collection</td><td>4,096</td></tr>
<tr><td>Number of fields in a collection</td><td>256</td></tr>
<tr><td>Number of shards in a collection</td><td>256</td></tr>
<tr><td>Dimensions of a vector</td><td>32,768</td></tr>
<tr><td>Top K</td><td>16,384</td></tr>
<tr><td>Target input vectors</td><td>16,384</td></tr>
</tbody>
</table>
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
<li><a href="/docs/v2.0.x/query.md">Query vectors</a></li>
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
