---
id: build_index.md
related_key: create index
summary: Learn how to build an index for vectors in Milvus.
title: Build an Index on Vectors
---
<h1 id="Build-an-Index-on-Vectors" class="common-anchor-header">Build an Index on Vectors<button data-href="#Build-an-Index-on-Vectors" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide describes how to build an index on vectors in Milvus.</p>
<p>Vector indexes are an organizational unit of metadata used to accelerate <a href="/docs/v2.3.x/search.md">vector similarity search</a>. You need to create an index before you can perform ANN searches against your Milvus.</p>
<p>See <a href="/docs/v2.3.x/index.md">Vector Index</a> for more information about the mechanism and varieties of vector indexes.</p>
<div class="alert note">
<p>By default, Milvus does not index a segment with less than 1,024 rows. To change this parameter, configure <a href="/docs/v2.3.x/configure_rootcoord.md#rootCoord.minSegmentSizeToEnableIndex"><code translate="no">rootCoord.minSegmentSizeToEnableIndex</code></a> in <code translate="no">milvus.yaml</code>.</p>
</div>
<p>The following example builds a 1024-cluster IVF_FLAT index with Euclidean distance (L2) as the similarity metric. You can choose the index and metrics that suit your scenario. See <a href="/docs/v2.3.x/metric.md">Similarity Metrics</a> for more information.</p>
<div class="alert note">
<p>When interacting with Milvus using Python code, you have the flexibility to choose between PyMilvus and MilvusClient (new). For more information, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.3.x/About.md">Python SDK</a>.</p>
</div>
<h2 id="Prepare-index-parameter" class="common-anchor-header">Prepare index parameter<button data-href="#Prepare-index-parameter" class="anchor-icon" translate="no">
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
    </button></h2><p>Prepare the index parameters as follows:</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
</div>
<pre><code translate="no" class="language-python">index_params = {
  <span class="hljs-string">&quot;metric_type&quot;</span>:<span class="hljs-string">&quot;L2&quot;</span>,
  <span class="hljs-string">&quot;index_type&quot;</span>:<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
  <span class="hljs-string">&quot;params&quot;</span>:{<span class="hljs-string">&quot;nlist&quot;</span>:<span class="hljs-number">1024</span>}
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = {
  <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;L2&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
  <span class="hljs-attr">params</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">nlist</span>: <span class="hljs-number">1024</span> }),
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">idx, err := entity.NewIndexIvfFlat(   <span class="hljs-comment">// NewIndex func</span>
    entity.L2,                        <span class="hljs-comment">// metricType</span>
    <span class="hljs-number">1024</span>,                             <span class="hljs-comment">// ConstructParams</span>
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
  log.Fatal(<span class="hljs-string">&quot;fail to create ivf flat index parameter:&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">final</span> <span class="hljs-type">IndexType</span> <span class="hljs-variable">INDEX_TYPE</span> <span class="hljs-operator">=</span> IndexType.IVF_FLAT;   <span class="hljs-comment">// IndexType</span>
<span class="hljs-keyword">final</span> <span class="hljs-type">String</span> <span class="hljs-variable">INDEX_PARAM</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;{\&quot;nlist\&quot;:1024}&quot;</span>;     <span class="hljs-comment">// ExtraParam</span>
<button class="copy-code-btn"></button></code></pre>
<div style="display: none">
<pre><code translate="no" class="language-shell">create index

Collection <span class="hljs-title function_">name</span> <span class="hljs-params">(book)</span>: book

The name of the field to create an index <span class="hljs-title function_">for</span> <span class="hljs-params">(book_intro)</span>: book_intro

Index <span class="hljs-title function_">type</span> <span class="hljs-params">(FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, RNSG, HNSW)</span>: IVF_FLAT

Index metric <span class="hljs-title function_">type</span> <span class="hljs-params">(L2, IP, HAMMING)</span>: L2

Index params nlist: <span class="hljs-number">1024</span>

Timeout []:
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;http://localhost:9091/api/v1/index&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collection_name&quot;: &quot;book&quot;,
    &quot;field_name&quot;: &quot;book_intro&quot;,
    &quot;extra_params&quot;:[
      {&quot;key&quot;: &quot;metric_type&quot;, &quot;value&quot;: &quot;L2&quot;},
      {&quot;key&quot;: &quot;index_type&quot;, &quot;value&quot;: &quot;IVF_FLAT&quot;},
      {&quot;key&quot;: &quot;params&quot;, &quot;value&quot;: &quot;{\&quot;nlist\&quot;:1024}&quot;}
    ]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
</div>
<table class="language-python">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
        <th>Options</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">metric_type</code></td>
        <td>Type of metrics used to measure the similarity of vectors.</td>
        <td>For floating point vectors:
            <ul>
                <li><code translate="no">L2</code> (Euclidean distance)</li>
                <li><code translate="no">IP</code> (Inner product)</li>
                <li><code translate="no">COSINE</code> (Cosine similarity)</li>
            </ul>
            For binary vectors:
            <ul>
                <li><code translate="no">JACCARD</code> (Jaccard distance)</li>
                <li><code translate="no">HAMMING</code> (Hamming distance)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><code translate="no">index_type</code></td>
        <td>Type of index used to accelerate the vector search.</td>
        <td>For floating point vectors:
            <ul>
                <li><code translate="no">FLAT</code> (FLAT)</li>
                <li><code translate="no">IVF_FLAT</code> (IVF_FLAT)</li>
                <li><code translate="no">IVF_SQ8</code> (IVF_SQ8)</li>
                <li><code translate="no">IVF_PQ</code> (IVF_PQ)</li>
                <li><code translate="no">GPU_IVF_FLAT<sup>*<sup></code> (GPU_IVF_FLAT)</li>
                <li><code translate="no">GPU_IVF_PQ<sup>*<sup>></code> (GPU_IVF_PQ)</li>
                <li><code translate="no">HNSW</code> (HNSW)</li>
                <li><code translate="no">DISKANN<sup>*<sup></code> (DISK_ANN)</li>
            </ul>
            For binary vectors:
            <ul>
                <li><code translate="no">BIN_FLAT</code> (BIN_FLAT)</li>
                <li><code translate="no">BIN_IVF_FLAT</code> (BIN_IVF_FLAT)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><code translate="no">params</code></td>
        <td>Building parameter(s) specific to the index.</td>
        <td>See <a href="/docs/v2.3.x/index.md">In-memory Index</a> and <a href="/docs/v2.3.x/disk_index.md">On-disk Index</a> for more information.</td>
    </tr>
    <tr>
        <td colspan=3><ul><li>* <b>DISKANN</b> has certain prerequisites to meet. For details, see <a href="/docs/v2.3.x/disk_index.md">On-disk Index</a>.</li><li>* <b>GPU_IVF_FLAT</b> and <b>GPU_IVF_PQ</b> are available only when you install Milvus with the GPU feature enabled. For details, see <a href="/docs/v2.3.x/install_standalone-gpu-docker.md"></td>
    </tr>
    </tbody>
</table>
<table class="language-javascript">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
        <th>Option</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">metric_type</code></td>
        <td>Type of metrics used to measure the similarity of vectors.</td>
        <td>For floating point vectors:
            <ul>
                <li><code translate="no">L2</code> (Euclidean distance)</li>
                <li><code translate="no">IP</code> (Inner product)</li>
                <li><code translate="no">COSINE</code> (Cosine similarity)</li>
            </ul>
            For binary vectors:
            <ul>
                <li><code translate="no">JACCARD</code> (Jaccard distance)</li>
                <li><code translate="no">HAMMING</code> (Hamming distance)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><code translate="no">index_type</code></td>
        <td>Type of index used to accelerate the vector search.</td>
        <td>For floating point vectors:
            <ul>
                <li><code translate="no">FLAT</code> (FLAT)</li>
                <li><code translate="no">IVF_FLAT</code> (IVF_FLAT)</li>
                <li><code translate="no">IVF_SQ8</code> (IVF_SQ8)</li>
                <li><code translate="no">IVF_PQ</code> (IVF_PQ)</li>
                <li><code translate="no">GPU_IVF_FLAT<sup>*<sup></code> (GPU_IVF_FLAT)</li>
                <li><code translate="no">GPU_IVF_PQ<sup>*<sup>></code> (GPU_IVF_PQ)</li>
                <li><code translate="no">HNSW</code> (HNSW)</li>
                <li><code translate="no">DISKANN<sup>*<sup></code> (DISK_ANN)</li>
            </ul>
            For binary vectors:
            <ul>
                <li><code translate="no">BIN_FLAT</code> (BIN_FLAT)</li>
                <li><code translate="no">BIN_IVF_FLAT</code> (BIN_IVF_FLAT)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><code translate="no">params</code></td>
        <td>Building parameter(s) specific to the index.</td>
        <td>See <a href="/docs/v2.3.x/index.md">In-memory Index</a> and <a href="/docs/v2.3.x/disk_index.md">On-disk Index</a> for more information.</td>
    </tr>
    <tr>
        <td colspan=3><ul><li>* <b>DISKANN</b> has certain prerequisites to meet. For details, see <a href="/docs/v2.3.x/disk_index.md">On-disk Index</a>.</li><li>* <b>GPU_IVF_FLAT</b> and <b>GPU_IVF_PQ</b> are available only when you install Milvus with the GPU feature enabled. For details, see <a href="/docs/v2.3.x/install_standalone-gpu-docker.md"></td>
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
        <td><code translate="no">NewIndex func</code></td>
        <td>Function to create entity. Index according to different index types.</td>
        <td>For floating point vectors:
            <ul>
                <li><code translate="no">NewIndexFlat</code> (FLAT)</li>
                <li><code translate="no">NewIndexIvfFlat</code> (IVF_FLAT)</li>
                <li><code translate="no">NewIndexIvfSQ8</code> (IVF_SQ8)</li>
                <li><code translate="no">NewIndexIvfPQ</code> (IVF_PQ)</li>
                <li><code translate="no">NewIndexGPUIvfFlat</code> (GPU_IVF_FLAT)</li>
                <li><code translate="no">NewIndexGPUIvfPQ</code> (GPU_IVF_PQ)</li>
                <li><code translate="no">NewIndexHNSW</code> (HNSW)</li>
                <li><code translate="no">NewIndexDISKANN<sup>*<sup></code> (DISK_ANN)</li>
            </ul>
            For binary vectors:
            <ul>
                <li><code translate="no">NewIndexBinFlat</code> (BIN_FLAT)</li>
                <li><code translate="no">NewIndexBinIvfFlat</code> (BIN_IVF_FLAT)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><code translate="no">metricType</code></td>
        <td>Type of metrics used to measure the similarity of vectors.</td>
        <td>For floating point vectors:
            <ul>
                <li><code translate="no">L2</code> (Euclidean distance)</li>
                <li><code translate="no">IP</code> (Inner product)</li>
                <li><code translate="no">COSINE</code> (Cosine similarity)</li>
            </ul>
            For binary vectors:
            <ul>
                <li><code translate="no">JACCARD</code> (Jaccard distance)</li>
                <li><code translate="no">HAMMING</code> (Hamming distance)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><code translate="no">ConstructParams</code></td>
        <td>Building parameter(s) specific to the index.</td>
        <td>See <a href="/docs/v2.3.x/index.md">In-memory Index</a> and <a href="/docs/v2.3.x/disk_index.md">On-disk Index</a> for more information.</td>
    </tr>
    <tr>
        <td colspan=3><ul><li>* <b>DISKANN</b> has certain prerequisites to meet. For details, see <a href="/docs/v2.3.x/disk_index.md">On-disk Index</a>.</li><li>* <b>GPU_IVF_FLAT</b> and <b>GPU_IVF_PQ</b> are available only when you install Milvus with the GPU feature enabled. For details, see <a href="/docs/v2.3.x/install_standalone-gpu-docker.md"></td>
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
        <td><code translate="no">IndexType</code></td>
        <td>Type of index used to accelerate the vector search.</td>
        <td>For floating point vectors:
            <ul>
                <li><code translate="no">FLAT</code> (FLAT)</li>
                <li><code translate="no">IVF_FLAT</code> (IVF_FLAT)</li>
                <li><code translate="no">IVF_SQ8</code> (IVF_SQ8)</li>
                <li><code translate="no">IVF_PQ</code> (IVF_PQ)</li>
                <li><code translate="no">GPU_IVF_FLAT<sup>*<sup></code> (GPU_IVF_FLAT)</li>
                <li><code translate="no">GPU_IVF_PQ<sup>*<sup>></code> (GPU_IVF_PQ)</li>
                <li><code translate="no">HNSW</code> (HNSW)</li>
                <li><code translate="no">DISKANN<sup>*<sup></code> (DISK_ANN)</li>
            </ul>
            For binary vectors:
            <ul>
                <li><code translate="no">BIN_FLAT</code> (BIN_FLAT)</li>
                <li><code translate="no">BIN_IVF_FLAT</code> (BIN_IVF_FLAT)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><code translate="no">ExtraParam</code></td>
        <td>Building parameter(s) specific to the index.</td>
        <td>See <a href="/docs/v2.3.x/index.md">In-memory Index</a> and <a href="/docs/v2.3.x/disk_index.md">On-disk Index</a> for more information.</td>
    </tr>
    <tr>
        <td colspan=3><ul><li>* <b>DISKANN</b> has certain prerequisites to meet. For details, see <a href="/docs/v2.3.x/disk_index.md">On-disk Index</a>.</li><li>* <b>GPU_IVF_FLAT</b> and <b>GPU_IVF_PQ</b> are available only when you install Milvus with the GPU feature enabled. For details, see <a href="/docs/v2.3.x/install_standalone-gpu-docker.md"></td>
    </tr>
    </tbody>
</table>
<table class="language-shell" style="display: none">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>--help</td>
            <td>Displays help for using the command.</td>
        </tr>
    </tbody>
</table>
<table class="language-curl" style="display: none">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
        <th>Options</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">collection_name</code></td>
        <td>Name of the collection to build the index on.</td>
    </tr>
    <tr>
        <td><code translate="no">field_name</code></td>
        <td>Name of the vector field to build the index on.</td>
    </tr>   
    <tr>
        <td><code translate="no">metric_type</code></td>
        <td>Type of metrics used to measure the similarity of vectors.</td>
        <td>For floating point vectors:
            <ul>
                <li><code translate="no">L2</code> (Euclidean distance)</li>
                <li><code translate="no">IP</code> (Inner product)</li>
            </ul>
            For binary vectors:
            <ul>
                <li><code translate="no">JACCARD</code> (Jaccard distance)</li>
                <li><code translate="no">HAMMING</code> (Hamming distance)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><code translate="no">index_type</code></td>
        <td>Type of index used to accelerate the vector search.</td>
        <td>For floating point vectors:
            <ul>
                <li><code translate="no">FLAT</code> (FLAT)</li>
                <li><code translate="no">IVF_FLAT</code> (IVF_FLAT)</li>
                <li><code translate="no">IVF_SQ8</code> (IVF_SQ8)</li>
                <li><code translate="no">IVF_PQ</code> (IVF_PQ)</li>
                <li><code translate="no">HNSW</code> (HNSW)</li>
            </ul>
            For binary vectors:
            <ul>
                <li><code translate="no">BIN_FLAT</code> (BIN_FLAT)</li>
                <li><code translate="no">BIN_IVF_FLAT</code> (BIN_IVF_FLAT)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><code translate="no">params</code></td>
        <td>Building parameter(s) specific to the index.</td>
        <td>See <a href="/docs/v2.3.x/index.md">In-memory Index</a> for more information.</td>
    </tr>
    </tbody>
</table>
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
    </button></h2><p>Build the index by specifying the vector field name and index parameters.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection, utility
<span class="hljs-comment"># Get an existing collection.</span>
collection = Collection(<span class="hljs-string">&quot;book&quot;</span>)      
collection.create_index(
  field_name=<span class="hljs-string">&quot;book_intro&quot;</span>, 
  index_params=index_params
)

utility.index_building_progress(<span class="hljs-string">&quot;book&quot;</span>)
<span class="hljs-comment"># Output: {&#x27;total_rows&#x27;: 0, &#x27;indexed_rows&#x27;: 0}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;book_intro&quot;</span>,
  <span class="hljs-attr">extra_params</span>: index_params,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err := milvusClient.CreateIndex(
  context.Background(),        <span class="hljs-comment">// ctx</span>
  <span class="hljs-string">&quot;book&quot;</span>,                      <span class="hljs-comment">// CollectionName</span>
  <span class="hljs-string">&quot;book_intro&quot;</span>,                <span class="hljs-comment">// fieldName</span>
  idx,                         <span class="hljs-comment">// entity.Index</span>
  <span class="hljs-literal">false</span>,                       <span class="hljs-comment">// async</span>
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
  log.Fatal(<span class="hljs-string">&quot;fail to create index:&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">milvusClient.<span class="hljs-title function_">createIndex</span>(
  <span class="hljs-title class_">CreateIndexParam</span>.<span class="hljs-title function_">newBuilder</span>()
    .<span class="hljs-title function_">withCollectionName</span>(<span class="hljs-string">&quot;book&quot;</span>)
    .<span class="hljs-title function_">withFieldName</span>(<span class="hljs-string">&quot;book_intro&quot;</span>)
    .<span class="hljs-title function_">withIndexType</span>(<span class="hljs-variable constant_">INDEX_TYPE</span>)
    .<span class="hljs-title function_">withMetricType</span>(<span class="hljs-title class_">MetricType</span>.<span class="hljs-property">L2</span>)
    .<span class="hljs-title function_">withExtraParam</span>(<span class="hljs-variable constant_">INDEX_PARAM</span>)
    .<span class="hljs-title function_">withSyncMode</span>(<span class="hljs-title class_">Boolean</span>.<span class="hljs-property">FALSE</span>)
    .<span class="hljs-title function_">build</span>()
);
<button class="copy-code-btn"></button></code></pre>
<div style="display: none">
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Follow the previous step.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># Follow the previous step.</span>
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
            <td><code translate="no">field_name</code></td>
            <td>Name of the vector field to build index on.</td>
        </tr>
        <tr>
            <td><code translate="no">index_params</code></td>
            <td>Parameters of the index to build.</td>
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
            <td>Name of the collection to build index in.</td>
        </tr>
        <tr>
            <td><code translate="no">field_name</code></td>
            <td>Name of the vector field to build index on.</td>
        </tr>
        <tr>
            <td><code translate="no">extra_params</code></td>
            <td>Parameters of the index to build.</td>
        </tr>
    </tbody>
</table>
<table class="language-go">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">ctx</code></td>
            <td>Context to control API invocation process.</td>
        </tr>
        <tr>
            <td><code translate="no">CollectionName</code></td>
            <td>Name of the collection to build index on.</td>
        </tr>
        <tr>
            <td><code translate="no">fieldName</code></td>
            <td>Name of the vector field to build index on.</td>
        </tr>
        <tr>
            <td><code translate="no">entity.Index</code></td>
            <td>Parameters of the index to build.</td>
        </tr>
        <tr>
            <td><code translate="no">async</code></td>
            <td>Switch to control sync/async behavior. The deadline of context is not applied in sync building process.</td>
        </tr>
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
<li>Learn more basic operations of Milvus:
<ul>
<li><a href="/docs/v2.3.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.3.x/hybridsearch.md">Conduct a hybrid search</a></li>
</ul></li>
</ul>
