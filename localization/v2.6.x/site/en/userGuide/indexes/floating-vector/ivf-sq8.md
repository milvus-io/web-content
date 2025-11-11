---
id: ivf-sq8.md
title: IVF_SQ8
summary: >-
  The IVF_SQ8 index is a quantization-based indexing algorithm designed to
  tackle large-scale similarity search challenges. This index type achieves
  faster searches with a much smaller memory footprint compared to exhaustive
  search methods.
---
<h1 id="IVFSQ8" class="common-anchor-header">IVF_SQ8<button data-href="#IVFSQ8" class="anchor-icon" translate="no">
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
    </button></h1><p>The <strong>IVF_SQ8</strong> index is a <strong>quantization-based</strong> indexing algorithm designed to tackle large-scale similarity search challenges. This index type achieves faster searches with a much smaller memory footprint compared to exhaustive search methods.</p>
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
    </button></h2><p>The IVF_SQ8 index is built on two key components:</p>
<ul>
<li><p><strong>Inverted File (IVF)</strong>: Organizes the data into clusters, enabling the search algorithm to focus only on the most relevant subsets of vectors.</p></li>
<li><p><strong>Scalar Quantization (SQ8)</strong>: Compresses the vectors to a more compact form, drastically reducing memory usage while maintaining enough precision for fast similarity calculations.</p></li>
</ul>
<h3 id="IVF" class="common-anchor-header">IVF<button data-href="#IVF" class="anchor-icon" translate="no">
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
    </button></h3><p>IVF is like creating an index in a book. Instead of scanning every page (or, in our case, every vector), you look up specific keywords (clusters) in the index to quickly find the relevant pages (vectors). In our scenario, vectors are grouped into clusters, and the algorithm will search within a few clusters that are close to the query vector.</p>
<p>Here’s how it works:</p>
<ol>
<li><p><strong>Clustering:</strong> Your vector dataset is divided into a specified number of clusters, using a clustering algorithm like k-means. Each cluster has a centroid (a representative vector for the cluster).</p></li>
<li><p><strong>Assignment:</strong> Each vector is assigned to the cluster whose centroid is closest to it.</p></li>
<li><p><strong>Inverted Index:</strong> An index is created, mapping each cluster centroid to the list of vectors assigned to that cluster.</p></li>
<li><p><strong>Search:</strong> When you search for nearest neighbors, the search algorithm compares your query vector with the cluster centroids and selects the most promising cluster(s). The search is then narrowed down to the vectors within those selected clusters.</p></li>
</ol>
<p>To learn more about its technical details , refer to <a href="/docs/v2.6.x/ivf-flat.md">IVF_FLAT</a>.</p>
<h3 id="SQ8" class="common-anchor-header">SQ8<button data-href="#SQ8" class="anchor-icon" translate="no">
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
    </button></h3><p>Scalar Quantization (SQ) is a technique used to reduce the size of high-dimensional vectors by replacing their values with smaller, more compact representations. The <strong>SQ8</strong> variant uses 8-bit integers instead of the typical 32-bit floating point numbers to store each dimension value of a vector. This greatly reduces the amount of memory required to store the data.</p>
<p>Here’s how SQ8 works:</p>
<ol>
<li><p><strong>Range Identification:</strong> First, identify the minimum and maximum values within the vector. This range defines the bounds for quantization.</p></li>
<li><p><strong>Normalization:</strong> Normalize the vector values to a range between 0 and 1 using the formula:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mtext>normalized_value</mtext><mo>=</mo><mfrac><mrow><mtext>value</mtext><mo>−</mo><mtext>min</mtext></mrow><mrow><mtext>max</mtext><mo>−</mo><mtext>min</mtext></mrow></mfrac></mrow><annotation encoding="application/x-tex">\text{normalized\_value} = \frac{\text{value} - \text{min}}{\text{max} - \text{min}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0044em;vertical-align:-0.31em;"></span><span class="mord text"><span class="mord">normalized_value</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1408em;vertical-align:-0.7693em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">max</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">value</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.7693em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>This ensures all values are mapped proportionally within a standardized range, preparing them for compression.</p></li>
<li><p><strong>8-Bit Compression:</strong> Multiply the normalized value by 255 (the maximum value for an 8-bit integer) and round the result to the nearest integer. This effectively compresses each value into an 8-bit representation.</p></li>
</ol>
<p>Suppose you have a dimension value of 1.2, with a minimum value of -1.7 and a maximum value of 2.3. The following figure shows how SQ8 is applied to convert a float32 value to an int8 integer.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/ivf-sq8.png" alt="Ivf Sq8" class="doc-image" id="ivf-sq8" />
    <span>Ivf Sq8</span>
  </span>
</p>
<h3 id="IVF-+-SQ8" class="common-anchor-header">IVF + SQ8<button data-href="#IVF-+-SQ8" class="anchor-icon" translate="no">
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
    </button></h3><p>The IVF_SQ8 index combines IVF and SQ8 to efficiently perform similarity searches:</p>
<ol>
<li><p><strong>IVF narrows the search scope</strong>: The dataset is divided into clusters, and when a query is issued, IVF first compares the query to the cluster centroids, selecting the most relevant clusters.</p></li>
<li><p><strong>SQ8 speeds up distance calculations</strong>: Within the selected clusters, SQ8 compresses the vectors into 8-bit integers, reducing memory usage and accelerating distance computations.</p></li>
</ol>
<p>By using IVF to focus the search and SQ8 to speed up computations, IVF_SQ8 achieves both fast search times and memory efficiency.</p>
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
    </button></h2><p>To build an <code translate="no">IVF_SQ8</code> index on a vector field in Milvus, use the <code translate="no">add_index()</code> method, specifying the <code translate="no">index_type</code>, <code translate="no">metric_type</code>, and additional parameters for the index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_SQ8&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters to create using the k-means algorithm during index building</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In this configuration:</p>
<ul>
<li><p><code translate="no">index_type</code>: The type of index to be built. In this example, set the value to <code translate="no">IVF_SQ8</code>.</p></li>
<li><p><code translate="no">metric_type</code>: The method used to calculate the distance between vectors. Supported values include <code translate="no">COSINE</code>, <code translate="no">L2</code>, and <code translate="no">IP</code>. For details, refer to <a href="/docs/v2.6.x/metric.md">Metric Types</a>.</p></li>
<li><p><code translate="no">params</code>: Additional configuration options for building the index.</p>
<ul>
<li><code translate="no">nlist</code>: Number of clusters to create using the k-means algorithm during index building.</li>
</ul>
<p>To learn more building parameters available for the <code translate="no">IVF_SQ8</code> index, refer to <a href="/docs/v2.6.x/ivf-sq8.md#share-BwprdWFCjoMBtMxorO0cWrUPnjb">Index building params</a>.</p></li>
</ul>
<p>Once the index parameters are configured, you can create the index by using the <code translate="no">create_index()</code> method directly or passing the index params in the <code translate="no">create_collection</code> method. For details, refer to <a href="/docs/v2.6.x/create-collection.md">Create Collection</a>.</p>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Number of clusters to search for candidates</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In this configuration:</p>
<ul>
<li><p><code translate="no">params</code>: Additional configuration options for searching on the index.</p>
<ul>
<li><code translate="no">nprobe</code>: Number of clusters to search for candidates.</li>
</ul>
<p>To learn more search parameters available for the <code translate="no">IVF_SQ8</code> index, refer to <a href="/docs/v2.6.x/ivf-sq8.md#share-PJhqdqNaNodKiexm6F1cD2IInbe">Index-specific search params</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Index building params<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>The following table lists the parameters that can be configured in <code translate="no">params</code> when <a href="/docs/v2.6.x/ivf-sq8.md#share-X9Y9dTuhDohRRBxSvzBcXmIEnu4">building an index</a>.</p>
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
     <td><p><strong>Type</strong>: Integer
 <strong>Range</strong>: [1, 65536]</p>
<p><strong>Default value</strong>: <code translate="no">128</code></p></td>
     <td><p>Larger <code translate="no">nlist</code> values improve recall by creating more refined clusters but increase index building time. Optimize based on dataset size and available resources.
 In most cases, we recommend you set a value within this range: [32, 4096].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Index-specific search params<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>The following table lists the parameters that can be configured in <code translate="no">search_params.params</code> when <a href="/docs/v2.6.x/ivf-sq8.md#share-TI73dmWBOoEnocxQ8H7clSYUnLg">searching on the index</a>.</p>
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
     <td><p><strong>Type</strong>: Integer
 <strong>Range</strong>: [1, <em>nlist</em>]</p>
<p><strong>Default value</strong>: <code translate="no">8</code></p></td>
     <td><p>Higher values allow more clusters to be searched, improving recall by expanding the search scope but at the cost of increased query latency.
 Set <code translate="no">nprobe</code> proportionally to <code translate="no">nlist</code> to balance speed and accuracy.</p>
<p>In most cases, we recommend you set a value within this range: [1, nlist].</p></td>
   </tr>
</table>
