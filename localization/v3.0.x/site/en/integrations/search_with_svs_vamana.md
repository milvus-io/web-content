---
id: search_with_svs_vamana.md
summary: >-
  Build and search in-memory SVS Vamana graph indexes in Milvus through the
  FAISS index passthrough, with optional LeanVec or LVQ compression on Intel
  CPUs.
title: Search with SVS Vamana and Milvus
---
<h1 id="Search-with-SVS-Vamana-and-Milvus" class="common-anchor-header">Search with SVS Vamana and Milvus<button data-href="#Search-with-SVS-Vamana-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/intel/ScalableVectorSearch">SVS</a> (Scalable Vector Search) is Intel’s high-performance vector-search library implementing the Vamana graph algorithm. In Milvus, you reach SVS Vamana through the <a href="https://milvus.io/docs/faiss.md">FAISS index passthrough</a>: set <code translate="no">index_type</code> to <code translate="no">FAISS</code> and supply an <code translate="no">SVSVamana</code> index-factory string, and Milvus builds and searches the index through Faiss’s SVS integration.</p>
<p>Vamana is the graph structure that <a href="https://milvus.io/docs/diskann.md">DISKANN</a> also uses, but SVS Vamana keeps the whole graph in memory. It can also compress vectors with <strong>LeanVec</strong> or <strong>LVQ</strong>, which reduces memory usage and speeds up search while still reaching very high recall.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Milvus 3.0.0 or later, built from source with SVS enabled</li>
<li>PyMilvus 3.0.0 or later</li>
<li>An Intel CPU if you use <code translate="no">LVQ*</code> or <code translate="no">LeanVec*</code> storage; <code translate="no">FP32</code>, <code translate="no">FP16</code>, and <code translate="no">SQ8</code> storage run on any platform</li>
<li>Familiarity with <a href="https://milvus.io/docs/faiss.md">FAISS index-factory strings</a></li>
</ul>
<div class="alert note">
<p>SVS is not included in the default Milvus build. To use the <code translate="no">SVSVamana</code> factories, build Milvus from source with <code translate="no">make USE_SVS=ON</code>. In a build without SVS, index building fails because Faiss does not recognize the factory string.</p>
</div>
<p>LVQ and LeanVec compression run only on Intel CPUs, and run faster on CPUs with AVX-512. On other CPUs, index building fails for <code translate="no">LVQ*</code> and <code translate="no">LeanVec*</code> factory strings.</p>
<h2 id="How-SVS-Vamana-works" class="common-anchor-header">How SVS Vamana works<button data-href="#How-SVS-Vamana-works" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Vamana-graph" class="common-anchor-header">Vamana graph<button data-href="#Vamana-graph" class="anchor-icon" translate="no">
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
    </button></h3><p>SVS Vamana builds a single-layer proximity graph. Each vector is a node, and edges connect vectors that are likely to be close neighbors. To build the graph, SVS does the following for each node <strong>x</strong>:</p>
<ol>
<li><p><strong>Greedy search</strong>: SVS searches the graph built so far, keeping a candidate list of size <code translate="no">construction_window_size</code>.</p></li>
<li><p><strong>Neighbor pruning</strong>: The visited nodes become candidate neighbors for <strong>x</strong>. SVS considers them in order of increasing distance from <strong>x</strong>. A candidate <code translate="no">c</code> is skipped if a closer neighbor <code translate="no">n</code> that has already been kept satisfies <code translate="no">alpha * distance(n, c) &lt;= distance(x, c)</code>. This keeps long-range edges and drops redundant short-range ones, so a search can jump across the graph instead of moving through it one nearest neighbor at a time. Pruning stops once the graph degree is reached.</p></li>
<li><p><strong>Backward edges</strong>: For each new neighbor of <strong>x</strong>, SVS adds a reverse edge back to <strong>x</strong> and prunes that neighbor’s edge list if it exceeds the graph degree.</p></li>
</ol>
<p>Pruning runs in two passes: first with <code translate="no">alpha = 1</code>, then with the configured <code translate="no">alpha</code>. A larger graph degree and <code translate="no">construction_window_size</code> produce a denser, higher-quality graph but use more memory and take longer to build.</p>
<p>At search time, SVS walks the graph greedily, keeping the <code translate="no">search_window_size</code> closest candidates seen so far. It always explores the closest unvisited candidate next. The search ends once every neighbor of the current node is farther from the query than the worst candidate in the window. A larger <code translate="no">search_window_size</code> explores more of the graph, which raises recall but also latency.</p>
<h3 id="LeanVec-compression" class="common-anchor-header">LeanVec compression<button data-href="#LeanVec-compression" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://openreview.net/forum?id=wczqrpOrIc">LeanVec</a> reduces both the number of dimensions per vector and the number of bits per dimension. A LeanVec index keeps two representations of each vector:</p>
<ul>
<li><p><strong>Primary (reduced dimensionality)</strong>: A linear projection of the vector down to a smaller number of dimensions. The graph search runs over this primary dataset, so most distance computations happen in the lower-dimensional space. This reduces both compute and memory-bandwidth requirements. By default, the reduced dimensionality is half the original dimensionality (<code translate="no">dim / 2</code>).</p></li>
<li><p><strong>Secondary (full dimensionality)</strong>: The vector at its original dimensionality. SVS re-ranks the candidates returned by the primary graph search against this secondary dataset to recover the accuracy lost to dimensionality reduction.</p></li>
</ul>
<p>Both representations are quantized with <a href="https://vldb.org/pvldb/volumes/16/paper/Similarity%20search%20in%20the%20blink%20of%20an%20eye%20with%20compressed%20indices">LVQ</a> (Locally-adaptive Vector Quantization). The storage component of the factory string selects the encoding. For example, <code translate="no">LeanVec4x8</code> uses 4 bits per dimension for the primary dataset and 8 bits per dimension for the secondary dataset. Even the re-ranking step never reads a full-precision vector.</p>
<p>By default, LeanVec learns separate projections for the indexed vectors and for the queries, to support queries that come from a different distribution than the indexed vectors (out-of-distribution, or OOD). This works especially well for cross-modal workloads such as text-to-image retrieval, and it also works well when queries come from the same distribution as the indexed vectors. Milvus does not yet support a way to pass queries for computing projections, so only the base vectors are currently used. OOD training adds build time. To build faster at some cost in query performance, set <code translate="no">ood_training</code> to <code translate="no">False</code>.</p>
<h3 id="LVQ-compression" class="common-anchor-header">LVQ compression<button data-href="#LVQ-compression" class="anchor-icon" translate="no">
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
    </button></h3><p>For datasets with fewer than about 512 dimensions, skipping dimensionality reduction and compressing only with LVQ quantization can work better. Like LeanVec, an LVQ index keeps a primary representation for fast search and a residual representation for re-ranking. For example, <code translate="no">LVQ4x4</code> uses 4 bits for the primary representation and 4 bits for the residual. <code translate="no">LVQ4x0</code> and <code translate="no">LVQ8x0</code> skip re-ranking, which speeds up queries if their recall is good enough for your workload.</p>
<h2 id="Choose-a-factory-string" class="common-anchor-header">Choose a factory string<button data-href="#Choose-a-factory-string" class="anchor-icon" translate="no">
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
    </button></h2><p>SVS Vamana factory strings have the form <code translate="no">SVSVamana&lt;degree&gt;[,&lt;storage&gt;]</code>, where <code translate="no">&lt;degree&gt;</code> is the maximum number of edges per node in the graph.</p>
<table>
<thead>
<tr><th>Factory string</th><th>Storage</th><th>Notes</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">SVSVamana64</code></td><td><code translate="no">FP32</code></td><td>Uncompressed vectors.</td></tr>
<tr><td><code translate="no">SVSVamana64,FP16</code></td><td>16-bit floats</td><td>Half the vector memory of <code translate="no">FP32</code>, with minimal accuracy loss.</td></tr>
<tr><td><code translate="no">SVSVamana64,SQ8</code></td><td>8-bit scalar quantization</td><td>A quarter of the vector memory of <code translate="no">FP32</code>.</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x0</code>, <code translate="no">LVQ8x0</code></td><td>LVQ primary, no residual</td><td>Intel CPUs only. No re-ranking.</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x4</code>, <code translate="no">LVQ4x8</code></td><td>LVQ primary and residual</td><td>Intel CPUs only.</td></tr>
<tr><td><code translate="no">SVSVamana64,LeanVec4x4</code>, <code translate="no">LeanVec4x8</code>, <code translate="no">LeanVec8x8</code></td><td>LeanVec primary and secondary</td><td>Intel CPUs only. Add the <code translate="no">_&lt;dim&gt;</code> suffix to set the reduced dimensionality. For example, <code translate="no">LeanVec4x8_128</code> reduces the primary dataset to 128 dimensions. Without the suffix, the reduced dimensionality is <code translate="no">dim / 2</code>.</td></tr>
</tbody>
</table>
<p><code translate="no">SVSVamana64,LeanVec4x8</code> is a good starting point. From there:</p>
<ul>
<li><p>For <strong>higher recall</strong> at some memory cost, increase the LeanVec dimensionality with the <code translate="no">_&lt;dim&gt;</code> suffix.</p></li>
<li><p>For a <strong>smaller footprint</strong> at some recall cost, lower the LeanVec dimensionality.</p></li>
<li><p>For low-dimensionality vectors, try <code translate="no">LVQ8</code>.</p></li>
<li><p><strong>On non-Intel CPUs</strong>, use <code translate="no">FP16</code> or <code translate="no">SQ8</code>.</p></li>
</ul>
<h2 id="Build-the-index" class="common-anchor-header">Build the index<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p>The following example builds an SVS Vamana index with graph degree 64 and LeanVec compression. Expand the setup block and run it before building the index.</p>
<p><details></p>
<p><summary>Prepare the collection</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;svs_vamana_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">256</span>)

client.create_collection(collection_name=collection_name, schema=schema)

client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Set <code translate="no">index_type</code> to <code translate="no">FAISS</code>, and use <code translate="no">faiss_index_name</code> to select the SVS Vamana recipe.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;svs_vamana_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># SVSVamana64 -&gt; Vamana graph degree 64</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># LeanVec4x8  -&gt; 4-bit primary, 8-bit secondary</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># _128        -&gt; LeanVec dim 128 (omit the suffix for dim / 2)</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;SVSVamana64,LeanVec4x8_128&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;construction_window_size&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># build-time search width</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;ood_training&quot;</span>: <span class="hljs-literal">True</span>,             <span class="hljs-comment"># OOD on (default)</span></span>
<span class="highlighted-comment-line">    },</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search-the-index" class="common-anchor-header">Search the index<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">search_window_size</code> controls the trade-off between recall and latency, as <code translate="no">ef</code> does for <a href="https://milvus.io/docs/hnsw.md">HNSW</a>. Set <code translate="no">search_buffer_capacity</code> to at least the same value. The index defaults for both are 10, and SVS rejects a search whose <code translate="no">search_window_size</code> is larger than its <code translate="no">search_buffer_capacity</code>.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_window_size&quot;</span>: <span class="hljs-number">100</span>,      <span class="hljs-comment"># wider = higher recall, lower QPS</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_buffer_capacity&quot;</span>: <span class="hljs-number">100</span>,  <span class="hljs-comment"># must be &gt;= search_window_size</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

res = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>If <code translate="no">limit</code> is larger than <code translate="no">search_window_size</code>, SVS raises the window to <code translate="no">limit</code> for that search.</p>
<h2 id="SVS-Vamana-parameters" class="common-anchor-header">SVS Vamana parameters<button data-href="#SVS-Vamana-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>The following build parameters go in <code translate="no">params</code> in <code translate="no">add_index()</code>, next to <code translate="no">faiss_index_name</code>. You cannot change them after the index is built.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Default</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">construction_window_size</code></td><td><code translate="no">40</code></td><td>Size of the candidate list used to find each node’s neighbors during graph construction. Larger values improve graph quality and recall but take longer to build. Set it to at least the graph degree. 200 is a common choice.</td></tr>
<tr><td><code translate="no">alpha</code></td><td><code translate="no">1.2</code> for <code translate="no">L2</code>, <code translate="no">0.95</code> for <code translate="no">IP</code> and <code translate="no">COSINE</code></td><td>Pruning strength. Values farther from 1 prune more aggressively, favoring long-range edges over redundant short-range ones. Use values above 1 for <code translate="no">L2</code> and below 1 for <code translate="no">IP</code> and <code translate="no">COSINE</code>. Keep the default unless you have measured a better value on your data.</td></tr>
<tr><td><code translate="no">graph_max_degree</code></td><td>Degree in the factory string or <code translate="no">32</code></td><td>Maximum number of edges per node. Overrides the degree in the factory string. Values in the range [32, 128] suit most workloads. Higher values can raise recall but use more memory and take longer to build.</td></tr>
<tr><td><code translate="no">prune_to</code></td><td>Graph degree minus 4</td><td>Number of edges a node keeps after pruning once it exceeds the graph degree.</td></tr>
<tr><td><code translate="no">max_candidate_pool_size</code></td><td><code translate="no">200</code></td><td>Maximum number of candidates considered when pruning a node’s neighbors. Should be larger than <code translate="no">construction_window_size</code>.</td></tr>
<tr><td><code translate="no">use_full_search_history</code></td><td><code translate="no">True</code></td><td>Whether pruning considers every node visited during the construction search, not just the final candidates.</td></tr>
<tr><td><code translate="no">leanvec_d</code></td><td><code translate="no">_&lt;dim&gt;</code> factory string suffix or <code translate="no">dim / 2</code></td><td>LeanVec only. Reduced dimensionality of the primary dataset. Overrides the factory-string suffix. Smaller values reduce memory usage and speed up graph search, but lower recall.</td></tr>
<tr><td><code translate="no">ood_training</code></td><td><code translate="no">True</code> for LeanVec</td><td>LeanVec only. Whether to learn separate projections for the indexed vectors and queries. Set <code translate="no">False</code> for faster builds. Setting <code translate="no">True</code> for any factory other than LeanVec fails.</td></tr>
</tbody>
</table>
<p>The following search parameters go in <code translate="no">search_params.params</code>. You can also set them as build parameters, which changes the defaults the index uses for searches that do not set them.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Default</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_window_size</code></td><td><code translate="no">10</code></td><td>Number of closest candidates kept while traversing the graph. Larger values raise recall and latency.</td></tr>
<tr><td><code translate="no">search_buffer_capacity</code></td><td><code translate="no">10</code></td><td>Capacity of the search buffer. Must be greater than or equal to <code translate="no">search_window_size</code>. In most cases, set it equal to <code translate="no">search_window_size</code>. For LeanVec, try 1.5 times <code translate="no">search_window_size</code>.</td></tr>
</tbody>
</table>
<h2 id="Learn-more" class="common-anchor-header">Learn more<button data-href="#Learn-more" class="anchor-icon" translate="no">
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
<li>Read the <a href="https://milvus.io/docs/faiss.md">FAISS index passthrough</a> reference for the general factory-string contract, limits, and error handling.</li>
<li>Compare with the on-disk Vamana implementation in <a href="https://milvus.io/docs/diskann.md">DISKANN</a>.</li>
<li>See the <a href="https://github.com/intel/ScalableVectorSearch">SVS repository</a> for build details, performance tuning, and the underlying C++ API.</li>
</ul>
