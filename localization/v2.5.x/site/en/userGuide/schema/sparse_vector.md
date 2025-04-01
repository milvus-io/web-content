---
id: sparse_vector.md
title: Sparse Vector
summary: >-
  Sparse vectors are an important method of data representation in information
  retrieval and natural language processing. While dense vectors are popular for
  their excellent semantic understanding capabilities, sparse vectors often
  provide more accurate results when it comes to applications that require
  precise matching of keywords or phrases.​
---
<h1 id="Sparse-Vector​" class="common-anchor-header">Sparse Vector​<button data-href="#Sparse-Vector​" class="anchor-icon" translate="no">
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
    </button></h1><p>Sparse vectors are an important method of data representation in information retrieval and natural language processing. While dense vectors are popular for their excellent semantic understanding capabilities, sparse vectors often provide more accurate results when it comes to applications that require precise matching of keywords or phrases.​</p>
<h2 id="Overview​" class="common-anchor-header">Overview​<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>A sparse vector is a special representation of high-dimensional vectors where most elements are zero, and only a few dimensions have non-zero values. This characteristic makes sparse vectors particularly effective in handling large-scale, high-dimensional, but sparse data. Common applications include:​</p>
<ul>
<li><p><strong>Text Analysis:</strong> Representing documents as bag-of-words vectors, where each dimension corresponds to a word, and only words that appear in the document have non-zero values.​</p></li>
<li><p><strong>Recommendation Systems:</strong> User-item interaction matrices, where each dimension represents a user’s rating for a particular item, with most users interacting with only a few items.​</p></li>
<li><p><strong>Image Processing:</strong> Local feature representation, focusing only on key points in the image, resulting in high-dimensional sparse vectors.​</p></li>
</ul>
<p>As shown in the diagram below, dense vectors are typically represented as continuous arrays where each position has a value (e.g., <code translate="no">[0.3, 0.8, 0.2, 0.3, 0.1]</code>). In contrast, sparse vectors store only non-zero elements and their indices, often represented as key-value pairs (e.g., <code translate="no">[{2: 0.2}, ..., {9997: 0.5}, {9999: 0.7}]</code>). This representation significantly reduces storage space and increases computational efficiency, especially when dealing with extremely high-dimensional data (e.g., 10,000 dimensions).​</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/sparse-vector.png" alt="Spare vector representation" class="doc-image" id="spare-vector-representation" />
    <span>Spare vector representation</span>
  </span>
</p>
<p>Sparse vectors can be generated using various methods, such as <a href="https://en.wikipedia.org/wiki/Tf%E2%80%93idf">TF-IDF</a> (Term Frequency-Inverse Document Frequency) and <a href="https://en.wikipedia.org/wiki/Okapi_BM25">BM25</a> in text processing. Additionally, Milvus offers convenient methods to help generate and process sparse vectors. For details, refer to <a href="/docs/embeddings.md">Embeddings</a>.​</p>
<p>For text data, Milvus also provides full-text search capabilities, allowing you to perform vector searches directly on raw text data without using external embedding models to generate sparse vectors. For more information, refer to <a href="/docs/full-text-search.md">​Full Text Search</a>.​</p>
<p>After vectorization, the data can be stored in Milvus for management and vector retrieval. The diagram below illustrates the basic process.​</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/use-sparse-vector.png" alt="Use sparse vector in Milvus" class="doc-image" id="use-sparse-vector-in-milvus" />
    <span>Use sparse vector in Milvus</span>
  </span>
</p>
<div class="alert note">
<p>In addition to sparse vectors, Milvus also supports dense vectors and binary vectors. Dense vectors are ideal for capturing deep semantic relationships, while binary vectors excel in scenarios like quick similarity comparisons and content deduplication. For more information, refer to <a href="/docs/dense-vector.md">​Dense Vector</a> and <a href="/docs/binary-vector.md">​Binary Vector</a>.​</p>
</div>
<h2 id="Use-sparse-vectors-in-Milvus​" class="common-anchor-header">Use sparse vectors in Milvus​<button data-href="#Use-sparse-vectors-in-Milvus​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supports representing sparse vectors in any of the following formats:​</p>
<ul>
<li><p>Sparse Matrix (using the <code translate="no">scipy.sparse</code> class)</p>
<p><div class="multipleCode">
<a href="#python">Python </a>
<a href="#java">Java</a>
<a href="#javascript">Node.js</a>
<a href="#curl">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> scipy.sparse <span class="hljs-keyword">import</span> csr_matrix​
​
<span class="hljs-comment"># Create a sparse matrix​</span>
row = [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>]​
col = [<span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>]​
data = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>]​
sparse_matrix = csr_matrix((data, (row, col)), shape=(<span class="hljs-number">3</span>, <span class="hljs-number">3</span>))​
​
<span class="hljs-comment"># Represent sparse vector using the sparse matrix​</span>
sparse_vector = sparse_matrix.getrow(<span class="hljs-number">0</span>)​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>List of Dictionaries (formatted as <code translate="no">{dimension_index: value, ...}</code>)</p>
<p><div class="multipleCode">
<a href="#python">Python </a>
<a href="#java">Java</a>
<a href="#javascript">Node.js</a>
<a href="#curl">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Represent sparse vector using a dictionary​</span>
sparse_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.5</span>, <span class="hljs-number">100</span>: <span class="hljs-number">0.3</span>, <span class="hljs-number">500</span>: <span class="hljs-number">0.8</span>, <span class="hljs-number">1024</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">5000</span>: <span class="hljs-number">0.6</span>}]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">SortedMap&lt;Long, Float&gt; sparseVector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;&gt;();​
sparseVector.put(<span class="hljs-number">1L</span>, <span class="hljs-number">0.5f</span>);​
sparseVector.put(<span class="hljs-number">100L</span>, <span class="hljs-number">0.3f</span>);​
sparseVector.put(<span class="hljs-number">500L</span>, <span class="hljs-number">0.8f</span>);​
sparseVector.put(<span class="hljs-number">1024L</span>, <span class="hljs-number">0.2f</span>);​
sparseVector.put(<span class="hljs-number">5000L</span>, <span class="hljs-number">0.6f</span>);​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>List of Tuple Iterators (formatted as <code translate="no">[(dimension_index, value)]</code>)</p>
<p><div class="multipleCode">
<a href="#python">Python </a>
<a href="#java">Java</a>
<a href="#javascript">Node.js</a>
<a href="#curl">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Represent sparse vector using a list of tuples​</span>
sparse_vector = [[(<span class="hljs-number">1</span>, <span class="hljs-number">0.5</span>), (<span class="hljs-number">100</span>, <span class="hljs-number">0.3</span>), (<span class="hljs-number">500</span>, <span class="hljs-number">0.8</span>), (<span class="hljs-number">1024</span>, <span class="hljs-number">0.2</span>), (<span class="hljs-number">5000</span>, <span class="hljs-number">0.6</span>)]]​

<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Add-vector-field​" class="common-anchor-header">Add vector field​</h3><p>To use sparse vectors in Milvus, define a field for storing sparse vectors when creating a collection. This process includes:​</p>
<ol>
<li><p>Setting <code translate="no">datatype</code> to the supported sparse vector data type, <code translate="no">SPARSE_FLOAT_VECTOR</code>.​</p></li>
<li><p>No need to specify the dimension.​</p></li>
</ol>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
​
client.drop_collection(collection_name=<span class="hljs-string">&quot;my_sparse_collection&quot;</span>)​
​
schema = client.create_schema(​
    auto_id=<span class="hljs-literal">True</span>,​
    enable_dynamic_fields=<span class="hljs-literal">True</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .build());​
        ​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)​
        .dataType(DataType.VarChar)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .autoID(<span class="hljs-literal">true</span>)​
        .maxLength(<span class="hljs-number">100</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;sparse_vector&quot;</span>)​
        .dataType(DataType.SparseFloatVector)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> schema = [​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse_vector&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>,​
  }​
];​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export primaryField='{​
    &quot;fieldName&quot;: &quot;pk&quot;,​
    &quot;dataType&quot;: &quot;VarChar&quot;,​
    &quot;isPrimary&quot;: true,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 100​
    }​
}'​
​
export vectorField='{​
    &quot;fieldName&quot;: &quot;sparse_vector&quot;,​
    &quot;dataType&quot;: &quot;SparseFloatVector&quot;​
}'​
​
export schema=&quot;{​
    \&quot;autoID\&quot;: true,​
    \&quot;fields\&quot;: [​
        $primaryField,​
        $vectorField​
    ]​
}&quot;​

</code></pre>
<p>In this example, a vector field named <code translate="no">sparse_vector</code> is added for storing sparse vectors. The data type of this field is <code translate="no">SPARSE_FLOAT_VECTOR</code>.​</p>
<h3 id="Set-index-params-for-vector-field​" class="common-anchor-header">Set index params for vector field​</h3><p>The process of creating an index for sparse vectors is similar to that for <a href="/docs/dense-vector.md">dense vectors</a>, but with differences in the specified index type (<code translate="no">index_type</code>), distance metric (<code translate="no">metric_type</code>), and index parameters (<code translate="no">params</code>).​</p>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>}, <span class="hljs-comment"># Algorithm used for building and querying the index</span>
)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
Map&lt;String,Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>); <span class="hljs-comment">// Algorithm used for building and querying the index</span>
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .indexName(<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>)
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.IP)
        .extraParams(extraParams)
        .build());

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;sparse_inverted_index&#x27;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;sparse_vector&#x27;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">SPARSE_INVERTED_INDEX</span>,
    <span class="hljs-attr">params</span>: {
      <span class="hljs-attr">inverted_index_algo</span>: <span class="hljs-string">&#x27;DAAT_MAXSCORE&#x27;</span>, <span class="hljs-comment">// Algorithm used for building and querying the index</span>
    },
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export indexParams='[
        {
            &quot;fieldName&quot;: &quot;sparse_vector&quot;,
            &quot;metricType&quot;: &quot;IP&quot;,
            &quot;indexName&quot;: &quot;sparse_inverted_index&quot;,
            &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;,
            &quot;params&quot;:{&quot;inverted_index_algo&quot;: &quot;DAAT_MAXSCORE&quot;} # Algorithm used for building and querying the index
        }
    ]'

</code></pre>
<p>In the example above:</p>
<ul>
<li><p><code translate="no">index_type</code>: The type of index to create for the sparse vector field. Valid Values:</p>
<ul>
<li><code translate="no">SPARSE_INVERTED_INDEX</code>: A general-purpose inverted index for sparse vectors.</li>
</ul>
  <div class="alert note">
<p>From Milvus 2.5.4 onward, <code translate="no">SPARSE_WAND</code> is being deprecated. Instead, it is recommended to use <code translate="no">&quot;inverted_index_algo&quot;: &quot;DAAT_WAND&quot;</code> for equivalency while maintaining compatibility.</p>
  </div>
</li>
<li><p><code translate="no">metric_type</code>: The metric used to calculate similarity between sparse vectors. Valid Values:</p>
<ul>
<li><p><code translate="no">IP</code> (Inner Product): Measures similarity using dot product.</p></li>
<li><p><code translate="no">BM25</code>: Typically used for full-text search, focusing on textual similarity.</p>
<p>For further details, refer to <a href="/docs/metric.md">Metric Types</a> and <a href="/docs/full-text-search.md">Full Text Search</a>.</p></li>
</ul></li>
<li><p><code translate="no">params.inverted_index_algo</code>: The algorithm used for building and querying the index. Valid values:</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code> (default): Optimized Document-at-a-Time (DAAT) query processing using the MaxScore algorithm. MaxScore provides better performance for high k values or queries with many terms by skipping terms and documents likely to have minimal impact. It achieves this by partitioning terms into essential and non-essential groups based on their maximum impact scores, focusing on terms that can contribute to the top-k results.</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: Optimized DAAT query processing using the WAND algorithm. WAND evaluates fewer hit documents by leveraging maximum impact scores to skip non-competitive documents, but it has a higher per-hit overhead. This makes WAND more efficient for queries with small k values or short queries, where skipping is more feasible.</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: Basic Term-at-a-Time (TAAT) query processing. While it is slower compared to <code translate="no">DAAT_MAXSCORE</code> and <code translate="no">DAAT_WAND</code>, <code translate="no">TAAT_NAIVE</code> offers a unique advantage. Unlike DAAT algorithms, which use cached maximum impact scores that remain static regardless of changes to the global collection parameter (avgdl), <code translate="no">TAAT_NAIVE</code> dynamically adapts to such changes.</p></li>
</ul></li>
</ul>
<h3 id="Create-collection​" class="common-anchor-header">Create collection​</h3><p>Once the sparse vector and index settings are complete, you can create a collection that contains sparse vectors. The example below uses the <ins><code translate="no">create_collection</code></ins> method to create a collection named <code translate="no">my_sparse_collection</code>.​</p>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=<span class="hljs-string">&quot;my_sparse_collection&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .build());​
        ​
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_sparse_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexes)​
        .build();​
client.createCollection(requestCreate);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({​
    <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>​
});​
​
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_sparse_collection&#x27;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-attr">index_params</span>: indexParams​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/create&quot; \​
--header &quot;Authorization: Bearer ${TOKEN}&quot; \​
--header &quot;Content-Type: application/json&quot; \​
-d &quot;{​
    \&quot;collectionName\&quot;: \&quot;my_sparse_collection\&quot;,​
    \&quot;schema\&quot;: $schema,​
    \&quot;indexParams\&quot;: $indexParams​
}&quot;​

</code></pre>
<h3 id="Insert-data​" class="common-anchor-header">Insert data​</h3><p>After creating the collection, insert data containing sparse vectors.​</p>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">sparse_vectors = [​
    {<span class="hljs-string">&quot;sparse_vector&quot;</span>: {<span class="hljs-number">1</span>: <span class="hljs-number">0.5</span>, <span class="hljs-number">100</span>: <span class="hljs-number">0.3</span>, <span class="hljs-number">500</span>: <span class="hljs-number">0.8</span>}},​
    {<span class="hljs-string">&quot;sparse_vector&quot;</span>: {<span class="hljs-number">10</span>: <span class="hljs-number">0.1</span>, <span class="hljs-number">200</span>: <span class="hljs-number">0.7</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.9</span>}},​
]​
​
client.insert(​
    collection_name=<span class="hljs-string">&quot;my_sparse_collection&quot;</span>,​
    data=sparse_vectors​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;​
​
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
{​
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
    SortedMap&lt;Long, Float&gt; sparse = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;&gt;();​
    sparse.put(<span class="hljs-number">1L</span>, <span class="hljs-number">0.5f</span>);​
    sparse.put(<span class="hljs-number">100L</span>, <span class="hljs-number">0.3f</span>);​
    sparse.put(<span class="hljs-number">500L</span>, <span class="hljs-number">0.8f</span>);​
    row.add(<span class="hljs-string">&quot;sparse_vector&quot;</span>, gson.toJsonTree(sparse));​
    rows.add(row);​
}​
{​
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
    SortedMap&lt;Long, Float&gt; sparse = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;&gt;();​
    sparse.put(<span class="hljs-number">10L</span>, <span class="hljs-number">0.1f</span>);​
    sparse.put(<span class="hljs-number">200L</span>, <span class="hljs-number">0.7f</span>);​
    sparse.put(<span class="hljs-number">1000L</span>, <span class="hljs-number">0.9f</span>);​
    row.add(<span class="hljs-string">&quot;sparse_vector&quot;</span>, gson.toJsonTree(sparse));​
    rows.add(row);​
}​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_sparse_collection&quot;</span>)​
        .data(rows)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [​
  { <span class="hljs-attr">sparse_vector</span>: { <span class="hljs-string">&quot;1&quot;</span>: <span class="hljs-number">0.5</span>, <span class="hljs-string">&quot;100&quot;</span>: <span class="hljs-number">0.3</span>, <span class="hljs-string">&quot;500&quot;</span>: <span class="hljs-number">0.8</span> } },​
  { <span class="hljs-attr">sparse_vector</span>: { <span class="hljs-string">&quot;10&quot;</span>: <span class="hljs-number">0.1</span>, <span class="hljs-string">&quot;200&quot;</span>: <span class="hljs-number">0.7</span>, <span class="hljs-string">&quot;1000&quot;</span>: <span class="hljs-number">0.9</span> } },​
];​
client.<span class="hljs-title function_">insert</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_sparse_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: data,​
});​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert&quot; \​
--header &quot;Authorization: Bearer ${TOKEN}&quot; \​
--header &quot;Content-Type: application/json&quot; \​
-d '{​
    &quot;data&quot;: [​
        {&quot;sparse_vector&quot;: {&quot;1&quot;: 0.5, &quot;100&quot;: 0.3, &quot;500&quot;: 0.8}},​
        {&quot;sparse_vector&quot;: {&quot;10&quot;: 0.1, &quot;200&quot;: 0.7, &quot;1000&quot;: 0.9}}        ​
    ],​
    &quot;collectionName&quot;: &quot;my_sparse_collection&quot;​
}'​
​
## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:{&quot;insertCount&quot;:2,&quot;insertIds&quot;:[&quot;453577185629572534&quot;,&quot;453577185629572535&quot;]}}​

</code></pre>
<h3 id="Perform-similarity-search​" class="common-anchor-header">Perform similarity search​</h3><p>To perform similarity search using sparse vectors, prepare the query vector and search parameters.​</p>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare search parameters​</span>
search_params = {​
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>},  <span class="hljs-comment"># Proportion of small vector values to ignore during the search</span>
}​
​
<span class="hljs-comment"># Prepare the query vector​</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]​

<button class="copy-code-btn"></button></code></pre>
<p>In this example, <code translate="no">drop_ratio_search</code> is an optional parameter specifically for sparse vectors, allowing fine-tuning of small values in the query vector during the search. For example, with <code translate="no">{&quot;drop_ratio_search&quot;: 0.2}</code>, the smallest 20% of values in the query vector will be ignored during the search.​</p>
<p>Then, execute the similarity search using the <code translate="no">search</code> method:​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_sparse_collection&quot;</span>,​
    data=query_vector,​
    limit=<span class="hljs-number">3</span>,​
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>],​
    search_params=search_params,​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: &#x27;453718927992172266&#x27;, &#x27;distance&#x27;: 0.6299999952316284, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172266&#x27;}}, {&#x27;id&#x27;: &#x27;453718927992172265&#x27;, &#x27;distance&#x27;: 0.10000000149011612, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172265&#x27;}}]&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.SparseFloatVec;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;​
​
Map&lt;String,Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
searchParams.put(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0.2</span>);​ <span class="hljs-comment">// Proportion of small vector values to ignore during the search</span>
​
SortedMap&lt;Long, Float&gt; sparse = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;&gt;();​
sparse.put(<span class="hljs-number">10L</span>, <span class="hljs-number">0.1f</span>);​
sparse.put(<span class="hljs-number">200L</span>, <span class="hljs-number">0.7f</span>);​
sparse.put(<span class="hljs-number">1000L</span>, <span class="hljs-number">0.9f</span>);​
​
<span class="hljs-type">SparseFloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SparseFloatVec</span>(sparse);​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchR</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_sparse_collection&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .annsField(<span class="hljs-string">&quot;sparse_vector&quot;</span>)​
        .searchParams(searchParams)​
        .topK(<span class="hljs-number">3</span>)​
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;pk&quot;</span>))​
        .build());​
        ​
System.out.println(searchR.getSearchResults());​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">//​</span>
<span class="hljs-comment">// [[SearchResp.SearchResult(entity={pk=453444327741536759}, score=1.31, id=453444327741536759), SearchResp.SearchResult(entity={pk=453444327741536756}, score=1.31, id=453444327741536756), SearchResp.SearchResult(entity={pk=453444327741536753}, score=1.31, id=453444327741536753)]]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">search</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_sparse_collection&#x27;</span>,​
    <span class="hljs-attr">data</span>: {<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>},​
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,​
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;pk&#x27;</span>],​
    <span class="hljs-attr">params</span>: {​
        <span class="hljs-attr">drop_ratio_search</span>: <span class="hljs-number">0.2</span>​
    }​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/search&quot; \​
--header &quot;Authorization: Bearer ${TOKEN}&quot; \​
--header &quot;Content-Type: application/json&quot; \​
-d '{​
    &quot;collectionName&quot;: &quot;my_sparse_collection&quot;,​
    &quot;data&quot;: [​
        {&quot;1&quot;: 0.2, &quot;50&quot;: 0.4, &quot;1000&quot;: 0.7}​
    ],​
    &quot;annsField&quot;: &quot;sparse_vector&quot;,​
    &quot;limit&quot;: 3,​
    &quot;searchParams&quot;:{​
        &quot;params&quot;:{&quot;drop_ratio_search&quot;: 0.2}​ # Proportion of small vector values to ignore during the search
    },​
    &quot;outputFields&quot;: [&quot;pk&quot;]​
}'​
​
## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;distance&quot;:0.63,&quot;id&quot;:&quot;453577185629572535&quot;,&quot;pk&quot;:&quot;453577185629572535&quot;},{&quot;distance&quot;:0.1,&quot;id&quot;:&quot;453577185629572534&quot;,&quot;pk&quot;:&quot;453577185629572534&quot;}]}​

</code></pre>
<p>For more information on similarity search parameters, refer to <a href="/docs/single-vector-search.md">​Basic ANN Search</a>.​</p>
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
    </button></h2><p>When using sparse vectors in Milvus, consider the following limits:</p>
<ul>
<li><p>Currently, only the <strong>IP</strong> and <strong>BM25</strong> (for full-text search) distance metrics are supported for sparse vectors. The high dimensionality of sparse vectors makes L2 and cosine distance impractical.</p></li>
<li><p>For sparse vector fields, only the <strong>SPARSE_INVERTED_INDEX</strong> index type is supported.</p></li>
<li><p>The data types supported for sparse vectors:</p>
<ul>
<li>The dimension part must be an unsigned 32-bit integer;</li>
<li>The value part can be a non-negative 32-bit floating-point number.</li>
</ul></li>
<li><p>Sparse vectors must meet the following requirements for insertion and search:</p>
<ul>
<li>At least one value in the vector is non-zero;</li>
<li>Vector indices are non-negative.</li>
</ul></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>Can the dimension of a sparse embedding be any discrete value within the uint32 space?</strong></p>
<p>Yes, with one exception. The dimension of a sparse embedding can be any value in the range of <code translate="no">[0, maximum of uint32)</code>. This means you cannot use the maximum value of uint32.</p></li>
<li><p><strong>Are searches on growing segments conducted through an index or by brute force?</strong></p>
<p>Searches on growing segments are conducted through an index of the same type as the sealed segment index. For new growing segments before the index is built, a brute force search is used.</p></li>
<li><p><strong>Is it possible to have both sparse and dense vectors in a single collection?</strong></p>
<p>Yes, with multiple vector type support, you can create collections with both sparse and dense vector columns and perform hybrid searches on them.</p></li>
</ul>
