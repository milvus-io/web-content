---
id: sparse_vector.md
summary: Learn how to use sparse vectors in Milvus.
title: Sparse Vector
---
<h1 id="Sparse-Vector" class="common-anchor-header">Sparse Vector<button data-href="#Sparse-Vector" class="anchor-icon" translate="no">
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
    </button></h1><p>Sparse vectors represent words or phrases using vector embeddings where most elements are zero, with only one non-zero element indicating the presence of a specific word. Sparse vector models, such as <a href="https://arxiv.org/abs/2109.10086">SPLADEv2</a>, outperform dense models in out-of-domain knowledge search, keyword-awareness, and interpretability. They are particularly useful in information retrieval, natural language processing, and recommendation systems, where combining sparse vectors for recall with a large model for ranking can significantly improve retrieval results.</p>
<p>In Milvus, the use of sparse vectors follows a similar workflow to that of dense vectors. It involves creating a collection with a sparse vector column, inserting data, creating an index, and conducting similarity searches and scalar queries.</p>
<p>In this tutorial, you will learn how to:</p>
<ul>
<li>Prepare sparse vector embeddings;</li>
<li>Create a collection with a sparse vector field;</li>
<li>Insert entities with sparse vector embeddings;</li>
<li>Index the collection and perform ANN search on sparse vectors.</li>
</ul>
<p>To see sparse vectors in action, refer  to <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/milvus_client/sparse.py">hello_sparse.py</a>.</p>
<div class="admonition note">
    <p><b>notes</b></p>
        Currently, the support for sparse vectors is a beta feature in 2.4.0, with plans to make it generally available in 3.0.0.
</div>
<h2 id="Prepare-sparse-vector-embeddings" class="common-anchor-header">Prepare sparse vector embeddings<button data-href="#Prepare-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>To use sparse vectors in Milvus, prepare vector embeddings in one of the supported formats:</p>
<ul>
<li><p><strong>Sparse Matrices</strong>: Utilize the <a href="https://docs.scipy.org/doc/scipy/reference/sparse.html#module-scipy.sparse">scipy.sparse</a> class family to represent your sparse embeddings. This method is efficient for handling large-scale, high-dimensional data.</p></li>
<li><p><strong>List of Dictionaries</strong>: Represent each sparse embedding as a dictionary, structured as <code translate="no">{dimension_index: value, ...}</code>, where each key-value pair represents the dimension index and its corresponding value.</p>
<p>Example:</p>
<pre><code translate="no" class="language-python">{<span class="hljs-number">2</span>: <span class="hljs-number">0.33</span>, <span class="hljs-number">98</span>: <span class="hljs-number">0.72</span>, ...}
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>List of Iterables of Tuples</strong>: Similar to the list of dictionaries, but use an iterable of tuples, <code translate="no">[(dimension_index, value)]</code>, to specify only the non-zero dimensions and their values.</p>
<p>Example:</p>
<pre><code translate="no" class="language-python">[(<span class="hljs-number">2</span>, <span class="hljs-number">0.33</span>), (<span class="hljs-number">98</span>, <span class="hljs-number">0.72</span>), ...]
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>The following example prepares sparse embeddings by generating a random sparse matrix for 10,000 entities, each with 10,000 dimensions and a sparsity density of 0.005.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare entities with sparse vector representation</span>
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> random

rng = np.random.default_rng()

num_entities, dim = <span class="hljs-number">10000</span>, <span class="hljs-number">10000</span>

<span class="hljs-comment"># Generate random sparse rows with an average of 25 non-zero elements per row</span>
entities = [
    {
        <span class="hljs-string">&quot;scalar_field&quot;</span>: rng.random(),
        <span class="hljs-comment"># To represent a single sparse vector row, you can use:</span>
        <span class="hljs-comment"># - Any of the scipy.sparse sparse matrices class family with shape[0] == 1</span>
        <span class="hljs-comment"># - Dict[int, float]</span>
        <span class="hljs-comment"># - Iterable[Tuple[int, float]]</span>
        <span class="hljs-string">&quot;sparse_vector&quot;</span>: {
            d: rng.random() <span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> random.sample(<span class="hljs-built_in">range</span>(dim), random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">30</span>))
        },
    }
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_entities)
]

<span class="hljs-comment"># print the first entity to check the representation</span>
<span class="hljs-built_in">print</span>(entities[<span class="hljs-number">0</span>])

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &#x27;scalar_field&#x27;: 0.520821523849214,</span>
<span class="hljs-comment">#     &#x27;sparse_vector&#x27;: {</span>
<span class="hljs-comment">#         5263: 0.2639375518635271,</span>
<span class="hljs-comment">#         3573: 0.34701499565746674,</span>
<span class="hljs-comment">#         9637: 0.30856525997853057,</span>
<span class="hljs-comment">#         4399: 0.19771651149001523,</span>
<span class="hljs-comment">#         6959: 0.31025067641541815,</span>
<span class="hljs-comment">#         1729: 0.8265339135915016,</span>
<span class="hljs-comment">#         1220: 0.15303302147479103,</span>
<span class="hljs-comment">#         7335: 0.9436728846033107,</span>
<span class="hljs-comment">#         6167: 0.19929870545596562,</span>
<span class="hljs-comment">#         5891: 0.8214617920371853,</span>
<span class="hljs-comment">#         2245: 0.7852255053773395,</span>
<span class="hljs-comment">#         2886: 0.8787982039149889,</span>
<span class="hljs-comment">#         8966: 0.9000606703940665,</span>
<span class="hljs-comment">#         4910: 0.3001170013981104,</span>
<span class="hljs-comment">#         17: 0.00875671667413136,</span>
<span class="hljs-comment">#         3279: 0.7003425473001098,</span>
<span class="hljs-comment">#         2622: 0.7571360018373428,</span>
<span class="hljs-comment">#         4962: 0.3901879090102064,</span>
<span class="hljs-comment">#         4698: 0.22589525720196246,</span>
<span class="hljs-comment">#         3290: 0.5510228492587324,</span>
<span class="hljs-comment">#         6185: 0.4508413201390492</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>notes</b></p>
<p>The vector dimensions must be of Python <code translate="no">int</code> or <code translate="no">numpy.integer</code> type, and the values must be of Python <code translate="no">float</code> or <code translate="no">numpy.floating</code> type.</p>
</div>
<p>To generate embeddings, you can also use the <code translate="no">model</code> package built in the PyMilvus library, which offers a range of embedding functions. For details, refer to <a href="/docs/v2.4.x/embeddings.md">Embeddings</a>.</p>
<h2 id="Create-a-collection-with-a-sparse-vector-field" class="common-anchor-header">Create a collection with a sparse vector field<button data-href="#Create-a-collection-with-a-sparse-vector-field" class="anchor-icon" translate="no">
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
    </button></h2><p>To create a collection with a sparse vector field, set the <strong>datatype</strong> of the sparse vector field to <strong>DataType.SPARSE_FLOAT_VECTOR</strong>. Unlike dense vectors, there is no need to specify a dimension for sparse vectors.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a MilvusClient instance</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a collection with a sparse vector field</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;scalar_field&quot;</span>, datatype=DataType.DOUBLE)
<span class="hljs-comment"># For sparse vector, no need to specify dimension</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR) <span class="hljs-comment"># set `datatype` to `SPARSE_FLOAT_VECTOR`</span>

client.create_collection(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<p>For details on common collection parameters, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection()
</a>.</p>
<h2 id="Insert-entities-with-sparse-vector-embeddings" class="common-anchor-header">Insert entities with sparse vector embeddings<button data-href="#Insert-entities-with-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>To insert entities with sparse vector embeddings, simply pass the list of entities to the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code translate="no">insert()</code></a> method.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert entities</span>
client.insert(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-the-collection" class="common-anchor-header">Index the collection<button data-href="#Index-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Before performing similarity searches, create an index for the collection. For more information on index types and parameters, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md">add_index()</a> and <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">create_index()</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the collection</span>

<span class="hljs-comment"># Prepare index params</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># the type of index to be created. set to `SPARSE_INVERTED_INDEX` or `SPARSE_WAND`.</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># the metric type to be used for the index. Currently, only `IP` (Inner Product) is supported.</span>
    params={<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>}, <span class="hljs-comment"># the ratio of small vector values to be dropped during indexing.</span>
)

<span class="hljs-comment"># Create index</span>
client.create_index(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<p>For index building on sparse vectors, take note of the following:</p>
<ul>
<li><p><code translate="no">index_type</code>: The type of index to be built. Possible options for sparse vectors:</p>
<ul>
<li><p><code translate="no">SPARSE_INVERTED_INDEX</code>: An inverted index that maps each dimension to its non-zero vectors, facilitating direct access to relevant data during searches. Ideal for datasets with sparse but high-dimensional data.</p></li>
<li><p><code translate="no">SPARSE_WAND</code>: Utilizes the Weak-AND (WAND) algorithm to quickly bypass unlikely candidates, focusing evaluation on those with higher ranking potential. Treats dimensions as terms and vectors as documents, speeding up searches in large, sparse datasets.</p></li>
</ul></li>
<li><p><code translate="no">metric_type</code>: Only <code translate="no">IP</code> (Inner Product) distance metric is supported for sparse vectors.</p></li>
<li><p><code translate="no">params.drop_ratio_build</code>: The index parameter used specifically for sparse vectors. It controls the proportion of small vector values that are excluded during the indexing process. This parameter enables fine-tuning of the trade-off between efficiency and accuracy by disregarding small values when constructing the index. For instance, if <code translate="no">drop_ratio_build = 0.3</code>, during the index construction, all values from all sparse vectors are gathered and sorted. The smallest 30% of these values are not included in the index, thereby reducing the computational workload during search.</p></li>
</ul>
<p>For more information, refer to <a href="/docs/v2.4.x/index.md">In-memory Index</a>.</p>
<h2 id="Perform-ANN-search" class="common-anchor-header">Perform ANN search<button data-href="#Perform-ANN-search" class="anchor-icon" translate="no">
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
    </button></h2><p>After the collection is indexed and loaded into memory, use the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a> method to retrieve the relevant documents based on the query.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Load the collection into memory</span>
client.load_collection(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>)

<span class="hljs-comment"># Perform ANN search on sparse vectors</span>

<span class="hljs-comment"># for demo purpose we search for the last inserted vector</span>
query_vector = entities[-<span class="hljs-number">1</span>][<span class="hljs-string">&quot;sparse_vector&quot;</span>]

search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}, <span class="hljs-comment"># the ratio of small vector values to be dropped during search.</span>
}

search_res = client.search(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;scalar_field&quot;</span>],
    search_params=search_params,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> search_res:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;hit: <span class="hljs-subst">{hit}</span>&quot;</span>)
        
<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># hit: {&#x27;id&#x27;: &#x27;448458373272710786&#x27;, &#x27;distance&#x27;: 7.220192909240723, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;448458373272710786&#x27;, &#x27;scalar_field&#x27;: 0.46767865218233806}}</span>
<span class="hljs-comment"># hit: {&#x27;id&#x27;: &#x27;448458373272708317&#x27;, &#x27;distance&#x27;: 1.2287548780441284, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;448458373272708317&#x27;, &#x27;scalar_field&#x27;: 0.7315987515699472}}</span>
<span class="hljs-comment"># hit: {&#x27;id&#x27;: &#x27;448458373272702005&#x27;, &#x27;distance&#x27;: 0.9848432540893555, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;448458373272702005&#x27;, &#x27;scalar_field&#x27;: 0.9871869181562156}}</span>
<button class="copy-code-btn"></button></code></pre>
<p>When configuring search parameters, take note of the following:</p>
<ul>
<li><code translate="no">params.drop_ratio_search</code>: The search parameter used specifically for sparse vectors. This option allows fine-tuning of the search process by specifying the ratio of the smallest values in the query vector to ignore. It helps balance search precision and performance. The smaller the value set for <code translate="no">drop_ratio_search</code>, the less these small values contribute to the final score. By ignoring some small values, search performance can be improved with minimal impact on accuracy.</li>
</ul>
<h2 id="Perform-scalar-queries" class="common-anchor-header">Perform scalar queries<button data-href="#Perform-scalar-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>In addition to ANN search, Milvus also supports scalar queries on sparse vectors. These queries allow you to retrieve documents based on a scalar value associated with the sparse vector. For more information on parameters, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md">query()</a>.</p>
<p>Filter entities with <strong>scalar_field</strong> greater than 3:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform a query by specifying filter expr</span>
filter_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;scalar_field &gt; 0.999&quot;</span>,
)

<span class="hljs-built_in">print</span>(filter_query_res[:<span class="hljs-number">2</span>])

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [{&#x27;pk&#x27;: &#x27;448458373272701862&#x27;, &#x27;scalar_field&#x27;: 0.9994093623822689, &#x27;sparse_vector&#x27;: {173: 0.35266244411468506, 400: 0.49995484948158264, 480: 0.8757831454277039, 661: 0.9931875467300415, 1040: 0.0965644046664238, 1728: 0.7478245496749878, 2365: 0.4351981580257416, 2923: 0.5505295395851135, 3181: 0.7396837472915649, 3848: 0.4428485333919525, 4701: 0.39119353890419006, 5199: 0.790219783782959, 5798: 0.9623121619224548, 6213: 0.453134149312973, 6341: 0.745091438293457, 6775: 0.27766478061676025, 6875: 0.017947908490896225, 8093: 0.11834774166345596, 8617: 0.2289179265499115, 8991: 0.36600416898727417, 9346: 0.5502803921699524}}, {&#x27;pk&#x27;: &#x27;448458373272702421&#x27;, &#x27;scalar_field&#x27;: 0.9990218525410719, &#x27;sparse_vector&#x27;: {448: 0.587817907333374, 1866: 0.0994109958410263, 2438: 0.8672442436218262, 2533: 0.8063794374465942, 2595: 0.02122959867119789, 2828: 0.33827054500579834, 2871: 0.1984412521123886, 2938: 0.09674275666475296, 3154: 0.21552987396717072, 3662: 0.5236313343048096, 3711: 0.6463911533355713, 4029: 0.4041993021965027, 7143: 0.7370485663414001, 7589: 0.37588241696357727, 7776: 0.436136394739151, 7962: 0.06377989053726196, 8385: 0.5808192491531372, 8592: 0.8865005970001221, 8648: 0.05727503448724747, 9071: 0.9450633525848389, 9161: 0.146037295460701, 9358: 0.1903032660484314, 9679: 0.3146636486053467, 9974: 0.8561339378356934, 9991: 0.15841573476791382}}]</span>
<button class="copy-code-btn"></button></code></pre>
<p>Filter entities by primary key:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># primary keys of entities that satisfy the filter</span>
pks = [ret[<span class="hljs-string">&quot;pk&quot;</span>] <span class="hljs-keyword">for</span> ret <span class="hljs-keyword">in</span> filter_query_res]

<span class="hljs-comment"># Perform a query by primary key</span>
pk_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;pk == &#x27;<span class="hljs-subst">{pks[<span class="hljs-number">0</span>]}</span>&#x27;&quot;</span>
)

<span class="hljs-built_in">print</span>(pk_query_res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [{&#x27;scalar_field&#x27;: 0.9994093623822689, &#x27;sparse_vector&#x27;: {173: 0.35266244411468506, 400: 0.49995484948158264, 480: 0.8757831454277039, 661: 0.9931875467300415, 1040: 0.0965644046664238, 1728: 0.7478245496749878, 2365: 0.4351981580257416, 2923: 0.5505295395851135, 3181: 0.7396837472915649, 3848: 0.4428485333919525, 4701: 0.39119353890419006, 5199: 0.790219783782959, 5798: 0.9623121619224548, 6213: 0.453134149312973, 6341: 0.745091438293457, 6775: 0.27766478061676025, 6875: 0.017947908490896225, 8093: 0.11834774166345596, 8617: 0.2289179265499115, 8991: 0.36600416898727417, 9346: 0.5502803921699524}, &#x27;pk&#x27;: &#x27;448458373272701862&#x27;}]</span>
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
    </button></h2><p>When using sparse vectors in Milvus, consider the following limits:</p>
<ul>
<li><p>Currently, only the <strong>IP</strong> distance metric is supported for sparse vectors.</p></li>
<li><p>For sparse vector fields, only the <strong>SPARSE_INVERTED_INDEX</strong> and <strong>SPARSE_WAND</strong> index types are supported.</p></li>
<li><p>Currently, <a href="https://milvus.io/docs/single-vector-search.md#Range-search">range search</a>, <a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">grouping search</a>, and <a href="https://milvus.io/docs/with-iterators.md#Search-with-iterator">search iterator</a> are not supported for sparse vectors.</p></li>
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
<li><p><strong>What distance metric is supported for sparse vectors?</strong></p>
<p>Sparse vectors only support the Inner Product (IP) distance metric due to the high dimensionality of sparse vectors, which makes L2 distance and cosine distance impractical.</p></li>
<li><p><strong>Can you explain the difference between SPARSE_INVERTED_INDEX and SPARSE_WAND, and how do I choose between them?</strong></p>
<p><strong>SPARSE_INVERTED_INDEX</strong> is a traditional inverted index, while <strong>SPARSE_WAND</strong> uses the <a href="https://dl.acm.org/doi/10.1145/956863.956944">Weak-AND</a> algorithm to reduce the number of full IP distance evaluations during search. <strong>SPARSE_WAND</strong> is typically faster, but its performance can decline with increasing vector density. To choose between them, conduct experiments and benchmarks based on your specific dataset and use case.</p></li>
<li><p><strong>How should I choose the drop_ratio_build and drop_ratio_search parameters?</strong></p>
<p>The choice of <strong>drop_ratio_build</strong> and <strong>drop_ratio_search</strong> depends on the characteristics of your data and your requirements for search latency/throughput and accuracy.</p></li>
<li><p><strong>What data types are supported for sparse embeddings?</strong></p>
<p>The dimension part must be an unsigned 32-bit integer, and the value part can be a non-negative 32-bit floating-point number.</p></li>
<li><p><strong>Can the dimension of a sparse embedding be any discrete value within the uint32 space?</strong></p>
<p>Yes, with one exception. The dimension of a sparse embedding can be any value in the range of <code translate="no">[0, maximum of uint32)</code>. This means you cannot use the maximum value of uint32.</p></li>
<li><p><strong>Are searches on growing segments conducted through an index or by brute force?</strong></p>
<p>Searches on growing segments are conducted through an index of the same type as the sealed segment index. For new growing segments before the index is built, a brute force search is used.</p></li>
<li><p><strong>Is it possible to have both sparse and dense vectors in a single collection?</strong></p>
<p>Yes, with multiple vector type support, you can create collections with both sparse and dense vector columns and perform hybrid searches on them.</p></li>
<li><p><strong>What are the requirements for sparse embeddings to be inserted or searched?</strong></p>
<p>Sparse embeddings must have at least one non-zero value, and vector indices must be non-negative.</p></li>
</ul>
