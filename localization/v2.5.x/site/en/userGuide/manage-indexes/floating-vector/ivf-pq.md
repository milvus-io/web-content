---
id: ivf-pq.md
title: IVF_PQ
summary: >-
  The IVF_PQ index is a quantization-based indexing algorithm for approximate
  nearest neighbor search in high-dimensional spaces. While not as fast as some
  graph-based methods, IVF_PQ often requires significantly less memory, making
  it a practical choice for large datasets.
---
<h1 id="IVFPQ" class="common-anchor-header">IVF_PQ<button data-href="#IVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p>The <strong>IVF_PQ</strong> index is a <strong>quantization-based</strong> indexing algorithm for approximate nearest neighbor search in high-dimensional spaces. While not as fast as some graph-based methods, <strong>IVF_PQ</strong> often requires significantly less memory, making it a practical choice for large datasets.</p>
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
    </button></h2><p>The <strong>IVF_PQ</strong> stands for <strong>Inverted File with Product Quantization</strong>, a hybrid approach that combines indexing and compression for efficient vector search and retrieval. It leverages two core components: <strong>Inverted File (IVF)</strong> and <strong>Product Quantization (PQ)</strong>.</p>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p>IVF is like creating an index in a book. Instead of scanning every page (or, in our case, every vector), you look up specific keywords (clusters) in the index to quickly find the relevant pages (vectors). In our scenario, vectors are grouped into clusters, and the algorithm will search within a few clusters that are close to the query vector.</p>
<p>Here’s how it works:</p>
<ol>
<li><p><strong>Clustering:</strong> Your vector dataset is divided into a specified number of clusters, using a clustering algorithm like k-means. Each cluster has a centroid (a representative vector for the cluster).</p></li>
<li><p><strong>Assignment:</strong> Each vector is assigned to the cluster whose centroid is closest to it.</p></li>
<li><p><strong>Inverted Index:</strong> An index is created, mapping each cluster centroid to the list of vectors assigned to that cluster.</p></li>
<li><p><strong>Search:</strong> When you search for nearest neighbors, the search algorithm compares your query vector with the cluster centroids and selects the most promising cluster(s). The search is then narrowed down to the vectors within those selected clusters.</p></li>
</ol>
<p>To learn more about its technical details , refer to <a href="/docs/ivf-flat.md">IVF_FLAT</a>.</p>
<h3 id="PQ" class="common-anchor-header">PQ</h3><p><strong>Product Quantization (PQ)</strong> is a compression method for high-dimensional vectors that significantly reduces storage requirements while enabling fast similarity search operations.</p>
<p>The PQ process involves these key stages:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-1.png" alt="Ivf Pq 1" class="doc-image" id="ivf-pq-1" />
    <span>Ivf Pq 1</span>
  </span>
</p>
<ol>
<li><p><strong>Dimension decomposition</strong>: The algorithm begins by decomposing each high-dimensional vector into <code translate="no">m</code> equal-sized sub-vectors. This decomposition transforms the original D-dimensional space into <code translate="no">m</code> disjoint subspaces, where each subspace contains <em>D/m</em> dimensions. The parameter <code translate="no">m</code> controls the granularity of the decomposition and directly influences the compression ratio.</p></li>
<li><p><strong>Subspace codebook generation</strong>: Within each subspace, the algorithm applies <a href="https://en.wikipedia.org/wiki/K-means_clustering">k-means clustering</a> to learn a set of representative vectors (centroids). These centroids collectively form a codebook for that subspace. The number of centroids in each codebook is determined by the parameter <code translate="no">nbits</code>, where each codebook contains <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mtext mathvariant="italic">nbits</mtext></msup></mrow><annotation encoding="application/x-tex">2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord textit mtight">nbits</span></span></span></span></span></span></span></span></span></span></span></span></span> centroids. For example, if <code translate="no">nbits = 8</code>, each codebook will contain 256 centroids. Each centroid is assigned a unique index with <code translate="no">nbits</code> bits.</p></li>
<li><p><strong>Vector</strong> <strong>quantization</strong>: For each sub-vector in the original vector, PQ identifies its nearest centroid within the corresponding subspace using a specific metric type. This process effectively maps each sub-vector to its closest representative vector in the codebook. Instead of storing the full sub-vector coordinates, only the index of the matched centroid is retained.</p></li>
<li><p><strong>Compressed representation</strong>: The final compressed representation consists of <code translate="no">m</code> indices, one from each subspace, collectively referred to as <strong>PQ codes</strong>. This encoding reduces the storage requirement from <em>D × 32</em> bits (assuming 32-bit floating-point numbers) to <em>m</em> × <em>nbits</em> bits, achieving substantial compression while preserving the ability to approximate vector distances.</p></li>
</ol>
<p>For more details on parameter tuning and optimization, refer to <a href="/docs/ivf-pq.md#Index-params">Index params</a>.</p>
<div class="alert note">
<p>Consider a vector with <em>D = 128</em> dimensions using 32-bit floating-point numbers. With PQ parameters <em>m = 64</em> (sub-vectors) and <em>nbits = 8</em> (thus <em>k =</em> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mn>8</mn></msup></mrow><annotation encoding="application/x-tex">2^8</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">8</span></span></span></span></span></span></span></span></span></span></span> <em>= 256</em> centroids per subspace), we can compare the storage requirements:</p>
<ul>
<li><p>Original vector: 128 dimensions × 32 bits = 4,096 bits</p></li>
<li><p>PQ-compressed vector: 64 sub-vectors × 8 bits = 512 bits</p></li>
</ul>
<p>This represents an 8x reduction in storage requirements.</p>
</div>
<p><strong>Distance computation with PQ</strong></p>
<p>When performing similarity search with a query vector, PQ enables efficient distance computation through the following steps:</p>
<ol>
<li><p><strong>Query preprocessing</strong></p>
<ul>
<li><p>The query vector is decomposed into <code translate="no">m</code> sub-vectors, matching the original PQ decomposition structure.</p></li>
<li><p>For each query sub-vector and its corresponding codebook (containing <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mtext mathvariant="italic">nbits</mtext></msup></mrow><annotation encoding="application/x-tex">2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord textit mtight">nbits</span></span></span></span></span></span></span></span></span></span></span></span></span> centroids), compute and store distances to all centroids.</p></li>
<li><p>This generates <code translate="no">m</code> lookup tables, where each table contains <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mtext mathvariant="italic">nbits</mtext></msup></mrow><annotation encoding="application/x-tex">2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord textit mtight">nbits</span></span></span></span></span></span></span></span></span></span></span></span></span> distances.</p></li>
</ul></li>
<li><p><strong>Distance approximation</strong></p>
<p>For any database vector represented by PQ codes, its approximate distance to the query vector is computed as follows:</p>
<ul>
<li><p>For each of the <code translate="no">m</code> sub-vectors, retrieve the pre-computed distance from the corresponding lookup table using the stored centroid index.</p></li>
<li><p>Sum these <code translate="no">m</code> distances to obtain the approximate distance based on a specific metric type (e.g. Euclidean distance).</p></li>
</ul></li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-2.png" alt="Ivf Pq 2" class="doc-image" id="ivf-pq-2" />
    <span>Ivf Pq 2</span>
  </span>
</p>
<h3 id="IVF-+-PQ" class="common-anchor-header">IVF + PQ</h3><p>The <strong>IVF_PQ</strong> index combines the strengths of <strong>IVF</strong> and <strong>PQ</strong> to accelerate searches. The process works in two steps:</p>
<ol>
<li><p><strong>Coarse filtering with IVF</strong>: IVF partitions the vector space into clusters, reducing the search scope. Instead of evaluating the entire dataset, the algorithm focuses only on the clusters closest to the query vector.</p></li>
<li><p><strong>Fine-grained comparison with PQ</strong>: Within the selected clusters, PQ uses compressed and quantized vector representations to compute approximate distances quickly.</p></li>
</ol>
<p>The performance of the <strong>IVF_PQ</strong> index is significantly impacted by the parameters that control both the IVF and PQ algorithms. Tuning these parameters is crucial to achieve the optimal results for a given dataset and application. More detailed information about these parameters and how to tune them can be found in <a href="/docs/ivf-pq.md#Index-params">Index params</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Build index<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>To build an <code translate="no">IVF_PQ</code> index on a vector field in Milvus, use the <code translate="no">add_index()</code> method, specifying the <code translate="no">index_type</code>, <code translate="no">metric_type</code>, and additional parameters for the index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In this configuration:</p>
<ul>
<li><p><code translate="no">index_type</code>: The type of index to be built. In this example, set the value to <code translate="no">IVF_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: The method used to calculate the distance between vectors. Supported values include <code translate="no">COSINE</code>, <code translate="no">L2</code>, and <code translate="no">IP</code>. For details, refer to <a href="/docs/metric.md">Metric Types</a>.</p></li>
<li><p><code translate="no">params</code>: Additional configuration options for building the index.</p>
<ul>
<li><code translate="no">m</code>: Number of sub-vectors to split the vector into.</li>
</ul>
<p>To learn more building parameters available for the <code translate="no">IVF_PQ</code> index, refer to <a href="/docs/ivf-pq.md#Index-building-params">Index building params</a>.</p></li>
</ul>
<p>Once the index parameters are configured, you can create the index by using the <code translate="no">create_index()</code> method directly or passing the index params in the <code translate="no">create_collection</code> method. For details, refer to <a href="/docs/create-collection.md">Create Collection</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Search on index<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Once the index is built and entities are inserted, you can perform similarity searches on the index.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In this configuration:</p>
<ul>
<li><p><code translate="no">params</code>: Additional configuration options for searching on the index.</p>
<ul>
<li><code translate="no">nprobe</code>: Number of clusters to search for.</li>
</ul>
<p>To learn more search parameters available for the <code translate="no">IVF_PQ</code> index, refer to <a href="/docs/ivf-pq.md#Index-specific-search-params">Index-specific search params</a>.</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Index params<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>This section provides an overview of the parameters used for building an index and performing searches on the index.</p>
<h3 id="Index-building-params" class="common-anchor-header">Index building params</h3><p>The following table lists the parameters that can be configured in <code translate="no">params</code> when <a href="/docs/ivf-pq.md#Build-index">building an index</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>The number of clusters to create using the k-means algorithm during index building.</p></td>
     <td><p><strong>Type</strong>: Integer <strong>Range</strong>: [1, 65536]</p><p><strong>Default value</strong>: <code translate="no">128</code></p></td>
     <td><p>Larger <code translate="no">nlist</code> values improve recall by creating more refined clusters but increase index building time. Optimize based on dataset size and available resources. In most cases, we recommend you set a value within this range: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>The number of sub-vectors (used for quantization) to divide each high-dimensional vector into during the quantization process.</p></td>
     <td><p><strong>Type</strong>: Integer <strong>Range</strong>: [1, 65536]</p><p><strong>Default value</strong>: None</p></td>
     <td><p>A higher <code translate="no">m</code> value can improve accuracy, but it also increases the computational complexity and memory usage. <code translate="no">m</code> must be a divisor of the vector dimension (<em>D</em>) to ensure proper decomposition. A commonly recommended value is <em>m = D/2</em>.</p><p>In most cases, we recommend you set a value within this range: [D/8, D].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>The number of bits used to represent each sub-vector's centroid index in the compressed form. It directly determines the size of each codebook. Each codebook will contain $2^{\textit{nbits}}$ centroids. For example, if <code translate="no">nbits</code> is set to 8, each sub-vector will be represented by an 8-bit centroid's index. This allows for $2^8$ (256) possible centroids in the codebook for that sub-vector.</p></td>
     <td><p><strong>Type</strong>: Integer <strong>Range</strong>: [1, 64]</p><p><strong>Default value</strong>: <code translate="no">8</code></p></td>
     <td><p>A higher <code translate="no">nbits</code> value allows for larger codebooks, potentially leading to more accurate representations of the original vectors. However, it also means using more bits to store each index, resulting in less compression. In most cases, we recommend you set a value within this range: [1, 16].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Index-specific search params</h3><p>The following table lists the parameters that can be configured in <code translate="no">search_params.params</code> when <a href="/docs/ivf-pq.md#Search-on-index">searching on the index</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>The number of clusters to search for candidates.</p></td>
     <td><p><strong>Type</strong>: Integer <strong>Range</strong>: [1, <em>nlist</em>]</p><p><strong>Default value</strong>: <code translate="no">8</code></p></td>
     <td><p>Higher values allow more clusters to be searched, improving recall by expanding the search scope but at the cost of increased query latency. Set <code translate="no">nprobe</code> proportionally to <code translate="no">nlist</code> to balance speed and accuracy.</p><p>In most cases, we recommend you set a value within this range: [1, nlist].</p></td>
   </tr>
</table>
