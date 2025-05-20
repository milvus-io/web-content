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
<p>A vector similarity search in Milvus calculates the distance between query vector(s) and vectors in the collection with specified similarity metrics, and returns the most similar results. By specifying a <a href="/docs/v2.2.x/boolean.md">boolean expression</a> that filters the scalar field or the primary key field, you can perform a <a href="/docs/v2.2.x/hybridsearch.md">hybrid search</a> or even a search with <a href="/docs/v2.2.x/timetravel.md">Time Travel</a>.</p>
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
  <a href="#csharp">C#</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, 
    <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">5</span>, 
    <span class="hljs-string">&quot;ignore_growing&quot;</span>: <span class="hljs-literal">False</span>, 
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> searchParams = {
    <span class="hljs-keyword">params</span>: { nprobe: <span class="hljs-number">1024</span> }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">sp, _ := entity.NewIndexIvfFlatSearchParam( <span class="hljs-comment">// NewIndex*SearchParam func</span>
    <span class="hljs-number">10</span>,                                  <span class="hljs-comment">// searchParam</span>
)

opt := client.SearchQueryOptionFunc(<span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(option *client.SearchQueryOption)</span></span> {
    option.Limit = <span class="hljs-number">3</span>
    option.Offset = <span class="hljs-number">0</span>
    option.ConsistencyLevel = entity.ClStrong
    option.IgnoreGrowing = <span class="hljs-literal">false</span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">final</span> <span class="hljs-type">Integer</span> <span class="hljs-variable">SEARCH_K</span> <span class="hljs-operator">=</span> <span class="hljs-number">2</span>;                       <span class="hljs-comment">// TopK</span>
<span class="hljs-keyword">final</span> <span class="hljs-type">String</span> <span class="hljs-variable">SEARCH_PARAM</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;{\&quot;nprobe\&quot;:10, \&quot;offset\&quot;:5}&quot;</span>;    <span class="hljs-comment">// Params</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> parameters = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SearchParameters</span>
{
    <span class="hljs-title class_">OutputFields</span> = { <span class="hljs-string">&quot;title&quot;</span> },
    <span class="hljs-title class_">ConsistencyLevel</span> = <span class="hljs-title class_">ConsistencyLevel</span>.<span class="hljs-property">Strong</span>,
    <span class="hljs-title class_">Offset</span> = <span class="hljs-number">5</span>,
    <span class="hljs-title class_">ExtraParameters</span> = { [<span class="hljs-string">&quot;nprobe&quot;</span>] = <span class="hljs-string">&quot;1024&quot;</span> }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># Search entities based on a given vector.</span>
curl --request POST \
     --url <span class="hljs-string">&#x27;${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/search&#x27;</span> \
     --header <span class="hljs-string">&#x27;Authorization: Bearer &lt;TOKEN&gt;&#x27;</span> \
     --header <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
     --header <span class="hljs-string">&#x27;content-type: application/json&#x27;</span>
     -d <span class="hljs-string">&#x27;{
        &quot;collectionName&quot;: &quot;collection1&quot;,
        &quot;vector&quot;: [0.0128121, 0.029119, .... , 0.09121]
      }&#x27;</span>

<span class="hljs-comment"># Search entities and return specific fields.</span>
curl --request POST \
     --url <span class="hljs-string">&#x27;${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/search&#x27;</span> \
     --header <span class="hljs-string">&#x27;Authorization: Bearer &lt;TOKEN&gt;&#x27;</span> \
     --header <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
     --header <span class="hljs-string">&#x27;content-type: application/json&#x27;</span>
     -d <span class="hljs-string">&#x27;{
       &quot;collectionName&quot;: &quot;collection1&quot;,
       &quot;outputFields&quot;: [&quot;id&quot;, &quot;name&quot;, &quot;feature&quot;, &quot;distance&quot;],
       &quot;vector&quot;: [0.0128121, 0.029119, .... , 0.09121],
       &quot;filter&quot;: &quot;id in (1, 2, 3)&quot;,
       &quot;limit&quot;: 100,
       &quot;offset&quot;: 0
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-curl">
<p>Output:</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-string">&quot;data&quot;</span>: {}
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
        <td><code translate="no">metric_type</code></td>
        <td>Method used to measure the distance between vectors during search. It should be the same as the one specified for the index-building process. See <a href="/docs/v2.2.x/metric.md">Simlarity Metrics</a> for more information.</td>
    </tr>
    <tr>
        <td><code translate="no">offset</code></td>
        <td>Number of entities to skip during the search. The sum of this parameter and <code translate="no">limit</code> of the <code translate="no">search</code> method should be less than <code translate="no">16384</code>.</td>
    </tr>
    <tr>
        <td><code translate="no">ignore_growing</code></td>
        <td>Whether to ignore growing segments during similarity searches. The value defaults to <code translate="no">False</code>, indicating that searches involve growing segments.</td>
    </tr>    
    <tr>
        <td><code translate="no">params</code></td>
        <td>Search parameter(s) specific to the specified index type. See <a href="/docs/v2.2.x/index.md">Vector Index</a> for more information. Possible options are as follows: <ul><li><code translate="no">nprobe</code> Indicates the number of cluster units to search. This parameter is available only when <code translate="no">index_type</code> is set to <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_SQ8</code>, or <code translate="no">IVF_PQ</code>. The value should be less than <code translate="no">nlist</code> specified for the index-building process.</li>
            <li><code translate="no">ef</code> Indicates the search scope. This parameter is available only when <code translate="no">index_type</code> is set to <code translate="no">HNSW</code>. The value should be within the range from <code translate="no">top_k</code> to <code translate="no">32768</code>.</li>
            <li><code translate="no">search_k</code> Indicates the search scope. This parameter is available only when <code translate="no">index_type</code> is set to <code translate="no">ANNOY</code>. The value should be greater than or equal to the top K. </li>
        </ul></td>
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
        <td><code translate="no">params</code></td>
        <td>Search parameter(s) specific to the index. See <a href="/docs/v2.2.x/index.md">Vector Index</a> for more information. Possible options are as follows:<ul>
            <li><code translate="no">nprobe</code> Indicates the number of cluster units to search. This parameter is available only when <code translate="no">index_type</code> is set to <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_SQ8</code>, or <code translate="no">IVF_PQ</code>. The value should be less than <code translate="no">nlist</code> specified for the index-building process.</li>
            <li><code translate="no">ef</code> Indicates the search scope. This parameter is available only when <code translate="no">index_type</code> is set to <code translate="no">HNSW</code>. The value should be within the range from <code translate="no">top_k</code> to <code translate="no">32768</code>.</li>
            <li><code translate="no">search_k</code> Indicates the search scope. This parameter is available only when <code translate="no">index_type</code> is set to <code translate="no">ANNOY</code>. The value should be greater than or equal to the top K. </li>
        </ul></td>
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
        <td>Function to create <code translate="no">entity.SearchParam</code> according to different index types.</td>
        <td>For floating point vectors:
            <ul>
                <li><code translate="no">NewIndexFlatSearchParam()</code> (FLAT)</li>
                <li><code translate="no">NewIndexIvfFlatSearchParam(nprobe int)</code> (IVF_FLAT)</li>
                <li><code translate="no">NewIndexIvfSQ8SearchParam(nprobe int)</code> (IVF_SQ8)</li>
                <li><code translate="no">NewIndexIvfPQSearchParam(nprobe int)</code> (RNSG)</li>
                <li><code translate="no">NewIndexHNSWSearchParam(ef int)</code> (HNSW)</li>
                <li><code translate="no">NewIndexANNOYSearchParam(search_k int)</code> (ANNOY)</li>
            </ul>
            For binary vectors:
            <ul>
                <li><code translate="no">NewIndexBinFlatSearchParam(nprobe int)</code> (BIN_FLAT)</li>
                <li><code translate="no">NewIndexBinIvfFlatSearchParam(nprobe int)</code> (BIN_IVF_FLAT)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><code translate="no">sp</code></td>
        <td>Search parameter(s) specific to the index returned by the preceding functions.</td>
        <td>See <a href="/docs/v2.2.x/index.md">Vector Index</a> for more information. </td>
    </tr>
    <tr>
        <td><code translate="no">opt<code translate="no"></td>
        <td>Options for ANN searches.</td>
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
        <td><code translate="no">SEARCH_K</code></td>
        <td>Number of the most similar results to return.</td>
    <td>N/A</td>
    </tr>
  <tr>
        <td><code translate="no">SEARCH_PARAM</code></td>
        <td>Search parameter(s) specific to the index.</td>
    <td>See <a href="/docs/v2.2.x/index.md">Vector Index</a> for more information. Possible options are as follows:<ul>
        <li><code translate="no">nprobe</code> Indicates the number of cluster units to search. This parameter is available only when <code translate="no">index_type</code> is set to <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_SQ8</code>, or <code translate="no">IVF_PQ</code>. The value should be less than <code translate="no">nlist</code> specified for the index-building process.</li>
        <li><code translate="no">ef</code> Indicates the search scope. This parameter is available only when <code translate="no">index_type</code> is set to <code translate="no">HNSW</code>. The value should be within the range from <code translate="no">top_k</code> to <code translate="no">32768</code>.</li>
        <li><code translate="no">search_k</code> Indicates the search scope. This parameter is available only when <code translate="no">index_type</code> is set to <code translate="no">ANNOY</code>. The value should be greater than or equal to the top K.</li>
        <li><code translate="no">metric_type</code> Indicates the metric type used in the search. It should be the same as the one specified when you index the collection.</li>
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
<table class="language-curl">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">collectionName</code></td>
        <td>(Required) The name of the collection to which this operation applies.</td>
    </tr>
    <tr>
        <td><code translate="no">filter</code></td>
        <td>The filter used to find matches for the search</td>
    </tr>
    <tr>
        <td><code translate="no">limit</code></td>
        <td>The maximum number of entities to return.<br>The sum of this value of that of `offset` should be less than **1024**.<br>The value defaults to <code translate="no">100</code>.<br>The value ranges from <code translate="no">1</code> to <code translate="no">100</code></td>
    </tr>
    <tr>
        <td><code translate="no">offset</code></td>
        <td>The number of entities to skip in the search results.<br>The sum of this value and that of `limit` should not be greater than <code translate="no">1024</code>.<br>The maximum value is <code translate="no">1024</code>.</td>
    </tr>
    <tr>
        <td><code translate="no">outputFields</code></td>
        <td>An array of fields to return along with the search results.</td>
    </tr>
    <tr>
        <td><code translate="no">vector</code></td>
        <td>The query vector in the form of a list of floating numbers.</td>
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
    </button></h2><p>Search vectors with Milvus. To search in a specific <a href="/docs/v2.2.x/glossary.md#Partition">partition</a>, specify the list of partition names.</p>
<p>Milvus supports setting consistency level specifically for a search. The example in this topic sets the consistency level as <code translate="no">Strong</code>. You can also set the consistency level as <code translate="no">Bounded</code>, <code translate="no">Session</code> or <code translate="no">Eventually</code>. See <a href="/docs/v2.2.x/consistency.md">Consistency</a> for more information about the four consistency levels in Milvus.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#csharp">C#</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python">results = collection.search(
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>]], 
    anns_field=<span class="hljs-string">&quot;book_intro&quot;</span>, 
    <span class="hljs-comment"># the sum of `offset` in `param` and `limit` </span>
    <span class="hljs-comment"># should be less than 16384.</span>
    param=search_params,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-literal">None</span>,
    <span class="hljs-comment"># set the names of the fields you want to </span>
    <span class="hljs-comment"># retrieve from the search result.</span>
    output_fields=[<span class="hljs-string">&#x27;title&#x27;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)

<span class="hljs-comment"># get the IDs of all returned hits</span>
results[<span class="hljs-number">0</span>].ids

<span class="hljs-comment"># get the distances to the query vector from all returned hits</span>
results[<span class="hljs-number">0</span>].distances

<span class="hljs-comment"># get the value of an output field specified in the search request.</span>
hit = results[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>]
hit.entity.get(<span class="hljs-string">&#x27;title&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,
    <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>],
    <span class="hljs-attr">filter</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-comment">// the sum of `limit` and `offset` should be less than 16384.</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">offset</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">L2</span>,
    <span class="hljs-attr">param</span>: searchParams,
    <span class="hljs-attr">consistency_level</span>: <span class="hljs-title class_">ConsistencyLevelEnum</span>.<span class="hljs-property">Strong</span>,
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
    <span class="hljs-number">10</span>,                                      <span class="hljs-comment">// topK</span>
    sp,                                      <span class="hljs-comment">// sp</span>
    opt,
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;fail to search collection:&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">String</span>&gt; search_output_fields = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;book_id&quot;</span>);
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">Float</span>&gt;&gt; search_vectors = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>1f, <span class="hljs-number">0.</span>2f));

<span class="hljs-title class_">SearchParam</span> searchParam = <span class="hljs-title class_">SearchParam</span>.<span class="hljs-title function_">newBuilder</span>()
        .<span class="hljs-title function_">withCollectionName</span>(<span class="hljs-string">&quot;book&quot;</span>)
        .<span class="hljs-title function_">withConsistencyLevel</span>(<span class="hljs-title class_">ConsistencyLevelEnum</span>.<span class="hljs-property">STRONG</span>)
        .<span class="hljs-title function_">withMetricType</span>(<span class="hljs-title class_">MetricType</span>.<span class="hljs-property">L2</span>)
        .<span class="hljs-title function_">withOutFields</span>(search_output_fields)
        .<span class="hljs-title function_">withTopK</span>(<span class="hljs-variable constant_">SEARCH_K</span>)
        .<span class="hljs-title function_">withVectors</span>(search_vectors)
        .<span class="hljs-title function_">withVectorFieldName</span>(<span class="hljs-string">&quot;book_intro&quot;</span>)
        .<span class="hljs-title function_">withParams</span>(<span class="hljs-variable constant_">SEARCH_PARAM</span>)
        .<span class="hljs-title function_">build</span>();
R&lt;<span class="hljs-title class_">SearchResults</span>&gt; respSearch = milvusClient.<span class="hljs-title function_">search</span>(searchParam);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> milvusClient.GetCollection(<span class="hljs-string">&quot;book&quot;</span>).SearchAsync(
    vectorFieldName: <span class="hljs-string">&quot;book_intro&quot;</span>,
    vectors: <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;[] { <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span> } },
    SimilarityMetricType.L2,
    <span class="hljs-comment">// the sum of `offset` in `parameters` and `limit` should be less than 16384.</span>
    limit: <span class="hljs-number">10</span>,
    parameters);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># Follow the previous step.</span>
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
        <td>Search parameter(s) specific to the index. See <a href="/docs/v2.2.x/index.md">Vector Index</a> for more information.</td>
    </tr>
    <tr>
        <td><code translate="no">limit</code></td>
        <td>Number of the most similar results to return.  The sum of this value and <code translate="no">offset</code> in <code translate="no">param</code> should be less than 16384.</td>
    </tr>
  <tr>
        <td><code translate="no">expr</code></td>
        <td>Boolean expression used to filter attribute. See <a href="/docs/v2.2.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
    </tr>
  <tr>
        <td><code translate="no">output_fields</code> (optional)</td>
        <td>Name of the field to return. Vector field is not supported in current release.</td>
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
    <td><code translate="no">vector</code> / <code translate="no">vectors</code></td>
    <td>Vectors to search with. Note that you should provide a list of floats if you choose to use <code translate="no">vector</code>. Otherwise, you should provide a list of float lists.</td>
  </tr>
  <tr>
        <td><code translate="no">vector_type</code></td>
        <td>Pre-check of binary or float vectors. <code translate="no">100</code> for binary vectors and <code translate="no">101</code> for float vectors.</td>
    </tr>
    <tr>
        <td><code translate="no">limit</code> (optional)</td>
        <td>Number of the most similar results to return. The sum of this value and <code translate="no">offset</code> should be less than 16384.</td>
    </tr>
    <tr>
        <td><code translate="no">offset</code> (optional)</td>
        <td>Number of entities to skip. The sum of this value of <code translate="no">limit</code> should be less than 16384.</td>
    </tr>
    <tr>
        <td><code translate="no">filter</code> (optional)</td>
        <td>Boolean expression used to filter attribute. See <a href="/docs/v2.2.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
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
        <td>Number of the most similar results to return. The sum of this value and that of <code translate="no">offset</code> in <code translate="no">WithOffset</code> of <code translate="no">opts</code> should be less than 16384.</td>
    <td>N/A</td>
    </tr>
  <tr>
        <td><code translate="no">sp</code></td>
        <td><code translate="no">entity.SearchParam<code translate="no"> specific to the index.</td>
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
    <td>See <a href="/docs/v2.2.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
    </tr>
  <tr>
        <td><code translate="no">ConsistencyLevel</code></td>
        <td>The consistency level used in the query.</td>
      <td><code translate="no">STRONG</code>, <code translate="no">BOUNDED</code>, and<code translate="no">EVENTUALLY</code>.</td>
    </tr>
    </tbody>
</table>
<table class="language-csharp">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Options</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">collectionName</code></td>
            <td>Name of the collection to load.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">metricType</code></td>
            <td>Metric type used for search.</td>
            <td>This parameter must be set identical to the metric type used for index building.</td>
        </tr>
        <tr>
            <td><code translate="no">vectors</code></td>
            <td>Vectors to search with.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">vectorFieldName</code></td>
            <td>Name of the field to search on.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">limit</code></td>
            <td>Number of records to return.</td>
            <td>N/A</td>
        </tr>
    </tbody>
</table>
<p>Check the primary key values of the most similar vectors and their distances.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#csharp">C#</a>
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
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// # get the IDs of all returned hits</span>
Console.WriteLine(results.Ids.LongIds)
<span class="hljs-comment">// alternative Console.WriteLine(results.Ids.StringIds)</span>

<span class="hljs-comment">// get the scores to the query vector from all returned hits</span>
<span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">var</span> score <span class="hljs-keyword">in</span> results.Scores.ToList()) {
    Console.WriteLine(score);
};
<button class="copy-code-btn"></button></code></pre>
<p>Release the collection loaded in Milvus to reduce memory consumption when the search is completed.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#csharp">C#</a>
</div>
<pre><code translate="no" class="language-python">collection.release()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">releaseCollection</span>({  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,});
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
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> collection = milvusClient.<span class="hljs-title class_">GetCollection</span>(<span class="hljs-string">&quot;book&quot;</span>).<span class="hljs-title class_">ReleaseAsync</span>();
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
<li><a href="/docs/v2.2.x/query.md">Query vectors</a></li>
<li><a href="/docs/v2.2.x/hybridsearch.md">Conduct a hybrid search</a></li>
<li><a href="/docs/v2.2.x/timetravel.md">Search with Time Travel</a></li>
</ul></li>
<li><p>Explore API references for Milvus SDKs:</p>
<ul>
<li><a href="/api-reference/pymilvus/v2.2.x/About.md">PyMilvus API reference</a></li>
<li><a href="/api-reference/node/v2.2.x/About.md">Node.js API reference</a></li>
<li><a href="/api-reference/go/v2.2.x/About.md">Go API reference</a></li>
<li><a href="/api-reference/java/v2.2.x/About.md">Java API reference</a></li>
</ul></li>
</ul>
