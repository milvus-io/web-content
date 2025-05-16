---
id: sparse_vector.md
summary: 了解如何在 Milvus 中使用稀疏向量。
title: 稀疏向量
---
<h1 id="Sparse-Vector" class="common-anchor-header">稀疏向量<button data-href="#Sparse-Vector" class="anchor-icon" translate="no">
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
    </button></h1><p>稀疏向量使用向量嵌入来表示单词或短语，其中大部分元素为零，只有一个非零元素表示特定单词的存在。稀疏向量模型（如<a href="https://arxiv.org/abs/2109.10086">SPLADEv2</a>）在域外知识搜索、关键词感知和可解释性方面优于密集模型。它们在信息检索、自然语言处理和推荐系统中特别有用，将用于召回的稀疏向量与用于排序的大型模型相结合，可以显著改善检索结果。</p>
<p>在 Milvus 中，稀疏向量的使用遵循与密集向量类似的工作流程。它包括创建带有稀疏向量列的集合、插入数据、创建索引以及进行相似性搜索和标量查询。</p>
<p>在本教程中，您将学习如何</p>
<ul>
<li>准备稀疏向量嵌入；</li>
<li>创建具有稀疏向量列的集合；</li>
<li>插入具有稀疏向量嵌入的实体；</li>
<li>索引集合并对稀疏向量执行 ANN 搜索。</li>
</ul>
<p>要查看稀疏向量的实际应用，请参阅<a href="https://github.com/milvus-io/pymilvus/blob/master/examples/milvus_client/sparse.py">hello_sparse.py</a>。</p>
<div class="admonition note">
    <p><b>注释</b></p>
        目前，稀疏向量的支持是 2.4.0 中的测试版功能，计划在 3.0.0 中普及。</div>
<h2 id="Prepare-sparse-vector-embeddings" class="common-anchor-header">准备稀疏向量嵌入<button data-href="#Prepare-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>要在 Milvus 中使用稀疏向量，请准备支持格式之一的向量嵌入：</p>
<ul>
<li><p><strong>稀疏矩阵</strong>利用<a href="https://docs.scipy.org/doc/scipy/reference/sparse.html#module-scipy.sparse">scipy.sparse</a>类族表示稀疏嵌入。这种方法对于处理大规模、高维数据非常有效。</p></li>
<li><p><strong>字典列表</strong>：将每个稀疏嵌入表示为字典，结构为<code translate="no">{dimension_index: value, ...}</code> ，其中每个键值对表示维度索引及其对应的值。</p>
<p>例如</p>
<pre><code translate="no" class="language-python">{2: 0.33, 98: 0.72, ...}
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>元组迭代列表</strong>：与字典列表类似，但使用元组可迭代器<code translate="no">[(dimension_index, value)]</code> ，仅指定非零维及其值。</p>
<p>示例</p>
<pre><code translate="no" class="language-python">[(2, 0.33), (98, 0.72), ...]
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>下面的示例通过随机生成 10,000 个实体的稀疏矩阵来准备稀疏嵌入，每个实体有 10,000 个维度，稀疏密度为 0.005。</p>
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
<p><b>注释</b></p>
<p>向量维数必须是 Python<code translate="no">int</code> 或<code translate="no">numpy.integer</code> 类型，值必须是 Python<code translate="no">float</code> 或<code translate="no">numpy.floating</code> 类型。</p>
</div>
<p>要生成嵌入，也可以使用 PyMilvus 库中内置的<code translate="no">model</code> 包，它提供了一系列嵌入函数。详情请参阅<a href="/docs/zh/v2.4.x/embeddings.md">嵌入</a>。</p>
<h2 id="Create-a-collection-with-a-sparse-vector-field" class="common-anchor-header">用稀疏向量场创建集合<button data-href="#Create-a-collection-with-a-sparse-vector-field" class="anchor-icon" translate="no">
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
    </button></h2><p>要创建具有稀疏向量场的集合，请将稀疏向量场的<strong>数据类型</strong>设置为<strong>DataType.SPARSE_FLOAT_VECTOR</strong>。与密集向量不同，稀疏向量无需指定维数。</p>
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
<p>有关常用集合参数的详细信息，请参阅<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection()。</a></p>
<h2 id="Insert-entities-with-sparse-vector-embeddings" class="common-anchor-header">插入具有稀疏向量嵌入的实体<button data-href="#Insert-entities-with-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>要插入具有稀疏向量嵌入的实体，只需将实体列表传递给 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code translate="no">insert()</code></a>方法。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert entities</span>
client.insert(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-the-collection" class="common-anchor-header">为集合建立索引<button data-href="#Index-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>在执行相似性搜索之前，请为集合创建索引。有关索引类型和参数的更多信息，请参阅<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md">add_index()</a>和<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">create_index</a> <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md">()</a>。</p>
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
<p>在稀疏向量上建立索引时，请注意以下几点：</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引类型。稀疏向量的可能选项：</p>
<ul>
<li><p><code translate="no">SPARSE_INVERTED_INDEX</code>:反转索引，将每个维度映射到其非零向量上，便于在搜索过程中直接访问相关数据。适用于数据稀疏但维度较高的数据集。</p></li>
<li><p><code translate="no">SPARSE_WAND</code>:利用弱-和（WAND）算法，快速绕过不可能的候选项，将评估重点放在排名潜力较高的候选项上。将维度视为术语，将向量视为文档，从而加快大型稀疏数据集的搜索速度。</p></li>
</ul></li>
<li><p><code translate="no">metric_type</code>:稀疏向量仅支持<code translate="no">IP</code> （Inner Product）距离度量。</p></li>
<li><p><code translate="no">params.drop_ratio_build</code>:专门用于稀疏向量的索引参数。它控制在索引过程中排除的小向量值的比例。通过该参数，可以在构建索引时忽略小值，从而对效率和准确性之间的权衡进行微调。例如，如果<code translate="no">drop_ratio_build = 0.3</code> ，在索引构建过程中，所有稀疏向量的所有值都会被收集并排序。这些值中最小的 30% 不会包含在索引中，从而减少了搜索过程中的计算工作量。</p></li>
</ul>
<p>更多信息，请参阅<a href="/docs/zh/v2.4.x/index.md">内存索引</a>。</p>
<h2 id="Perform-ANN-search" class="common-anchor-header">执行 ANN 搜索<button data-href="#Perform-ANN-search" class="anchor-icon" translate="no">
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
    </button></h2><p>索引收集完成并加载到内存后，使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a>方法根据查询检索相关文档。</p>
<pre><code translate="no" class="language-python"># Load the collection into memory
client.load_collection(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>)

# Perform ANN search on sparse vectors

# <span class="hljs-keyword">for</span> demo purpose we search <span class="hljs-keyword">for</span> the last inserted vector
query_vector = entities[<span class="hljs-number">-1</span>][<span class="hljs-string">&quot;sparse_vector&quot;</span>]

search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}, # the ratio of small vector values to be dropped during search.
}

search_res = client.search(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;scalar_field&quot;</span>],
    search_params=search_params,
)

<span class="hljs-keyword">for</span> hits in search_res:
    <span class="hljs-keyword">for</span> hit in hits:
        <span class="hljs-built_in">print</span>(f<span class="hljs-string">&quot;hit: {hit}&quot;</span>)
        
# Output:
# hit: {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-string">&#x27;448458373272710786&#x27;</span>, <span class="hljs-string">&#x27;distance&#x27;</span>: <span class="hljs-number">7.220192909240723</span>, <span class="hljs-string">&#x27;entity&#x27;</span>: {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272710786&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.46767865218233806</span>}}
# hit: {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-string">&#x27;448458373272708317&#x27;</span>, <span class="hljs-string">&#x27;distance&#x27;</span>: <span class="hljs-number">1.2287548780441284</span>, <span class="hljs-string">&#x27;entity&#x27;</span>: {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272708317&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.7315987515699472</span>}}
# hit: {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-string">&#x27;448458373272702005&#x27;</span>, <span class="hljs-string">&#x27;distance&#x27;</span>: <span class="hljs-number">0.9848432540893555</span>, <span class="hljs-string">&#x27;entity&#x27;</span>: {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272702005&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.9871869181562156</span>}}
<button class="copy-code-btn"></button></code></pre>
<p>配置搜索参数时，请注意以下几点：</p>
<ul>
<li><code translate="no">params.drop_ratio_search</code>:专门用于稀疏向量的搜索参数。该选项可通过指定查询向量中最小值的忽略比例，对搜索过程进行微调。它有助于平衡搜索精度和性能。<code translate="no">drop_ratio_search</code> 的值越小，这些小值对最终得分的贡献就越小。通过忽略一些小值，可以在对精确度影响最小的情况下提高搜索性能。</li>
</ul>
<h2 id="Perform-scalar-queries" class="common-anchor-header">执行标量查询<button data-href="#Perform-scalar-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>除 ANN 搜索外，Milvus 还支持对稀疏向量进行标量查询。这些查询允许你根据与稀疏向量相关联的标量值检索文档。有关参数的更多信息，请参阅<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md">query()</a>。</p>
<p>过滤<strong>标量字段</strong>大于 3 的实体：</p>
<pre><code translate="no" class="language-python"># Perform a query by specifying filter expr
filter_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    filter=<span class="hljs-string">&quot;scalar_field &gt; 0.999&quot;</span>,
)

<span class="hljs-built_in">print</span>(filter_query_res[:<span class="hljs-number">2</span>])

# Output:
# [{<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272701862&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.9994093623822689</span>, <span class="hljs-string">&#x27;sparse_vector&#x27;</span>: {<span class="hljs-number">173</span>: <span class="hljs-number">0.35266244411468506</span>, <span class="hljs-number">400</span>: <span class="hljs-number">0.49995484948158264</span>, <span class="hljs-number">480</span>: <span class="hljs-number">0.8757831454277039</span>, <span class="hljs-number">661</span>: <span class="hljs-number">0.9931875467300415</span>, <span class="hljs-number">1040</span>: <span class="hljs-number">0.0965644046664238</span>, <span class="hljs-number">1728</span>: <span class="hljs-number">0.7478245496749878</span>, <span class="hljs-number">2365</span>: <span class="hljs-number">0.4351981580257416</span>, <span class="hljs-number">2923</span>: <span class="hljs-number">0.5505295395851135</span>, <span class="hljs-number">3181</span>: <span class="hljs-number">0.7396837472915649</span>, <span class="hljs-number">3848</span>: <span class="hljs-number">0.4428485333919525</span>, <span class="hljs-number">4701</span>: <span class="hljs-number">0.39119353890419006</span>, <span class="hljs-number">5199</span>: <span class="hljs-number">0.790219783782959</span>, <span class="hljs-number">5798</span>: <span class="hljs-number">0.9623121619224548</span>, <span class="hljs-number">6213</span>: <span class="hljs-number">0.453134149312973</span>, <span class="hljs-number">6341</span>: <span class="hljs-number">0.745091438293457</span>, <span class="hljs-number">6775</span>: <span class="hljs-number">0.27766478061676025</span>, <span class="hljs-number">6875</span>: <span class="hljs-number">0.017947908490896225</span>, <span class="hljs-number">8093</span>: <span class="hljs-number">0.11834774166345596</span>, <span class="hljs-number">8617</span>: <span class="hljs-number">0.2289179265499115</span>, <span class="hljs-number">8991</span>: <span class="hljs-number">0.36600416898727417</span>, <span class="hljs-number">9346</span>: <span class="hljs-number">0.5502803921699524</span>}}, {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272702421&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.9990218525410719</span>, <span class="hljs-string">&#x27;sparse_vector&#x27;</span>: {<span class="hljs-number">448</span>: <span class="hljs-number">0.587817907333374</span>, <span class="hljs-number">1866</span>: <span class="hljs-number">0.0994109958410263</span>, <span class="hljs-number">2438</span>: <span class="hljs-number">0.8672442436218262</span>, <span class="hljs-number">2533</span>: <span class="hljs-number">0.8063794374465942</span>, <span class="hljs-number">2595</span>: <span class="hljs-number">0.02122959867119789</span>, <span class="hljs-number">2828</span>: <span class="hljs-number">0.33827054500579834</span>, <span class="hljs-number">2871</span>: <span class="hljs-number">0.1984412521123886</span>, <span class="hljs-number">2938</span>: <span class="hljs-number">0.09674275666475296</span>, <span class="hljs-number">3154</span>: <span class="hljs-number">0.21552987396717072</span>, <span class="hljs-number">3662</span>: <span class="hljs-number">0.5236313343048096</span>, <span class="hljs-number">3711</span>: <span class="hljs-number">0.6463911533355713</span>, <span class="hljs-number">4029</span>: <span class="hljs-number">0.4041993021965027</span>, <span class="hljs-number">7143</span>: <span class="hljs-number">0.7370485663414001</span>, <span class="hljs-number">7589</span>: <span class="hljs-number">0.37588241696357727</span>, <span class="hljs-number">7776</span>: <span class="hljs-number">0.436136394739151</span>, <span class="hljs-number">7962</span>: <span class="hljs-number">0.06377989053726196</span>, <span class="hljs-number">8385</span>: <span class="hljs-number">0.5808192491531372</span>, <span class="hljs-number">8592</span>: <span class="hljs-number">0.8865005970001221</span>, <span class="hljs-number">8648</span>: <span class="hljs-number">0.05727503448724747</span>, <span class="hljs-number">9071</span>: <span class="hljs-number">0.9450633525848389</span>, <span class="hljs-number">9161</span>: <span class="hljs-number">0.146037295460701</span>, <span class="hljs-number">9358</span>: <span class="hljs-number">0.1903032660484314</span>, <span class="hljs-number">9679</span>: <span class="hljs-number">0.3146636486053467</span>, <span class="hljs-number">9974</span>: <span class="hljs-number">0.8561339378356934</span>, <span class="hljs-number">9991</span>: <span class="hljs-number">0.15841573476791382</span>}}]
<button class="copy-code-btn"></button></code></pre>
<p>通过主键过滤实体：</p>
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
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中使用稀疏向量时，请考虑以下限制：</p>
<ul>
<li><p>目前，稀疏向量只支持<strong>IP</strong>距离度量。</p></li>
<li><p>对于稀疏向量字段，只支持<strong>SPARSE_INVERTED_INDEX</strong>和<strong>SPARSE_WAND</strong>索引类型。</p></li>
<li><p>目前，稀疏向量不支持<a href="https://milvus.io/docs/single-vector-search.md#Range-search">范围搜索</a>、<a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">分组搜索</a>和<a href="https://milvus.io/docs/with-iterators.md#Search-with-iterator">搜索迭代器</a>。</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">常见问题<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>稀疏向量支持什么距离度量？</strong></p>
<p>稀疏向量只支持内积（IP）距离度量，这是因为稀疏向量的维度较高，L2 距离和余弦距离不切实际。</p></li>
<li><p><strong>能否解释一下 SPARSE_INVERTED_INDEX 和 SPARSE_WAND 之间的区别，以及如何在它们之间做出选择？</strong></p>
<p><strong>SPARSE_INVERTED_INDEX</strong>是一种传统的倒排索引，而<strong>SPARSE_WAND</strong>使用<a href="https://dl.acm.org/doi/10.1145/956863.956944">弱-AND</a>算法来减少搜索过程中全 IP 距离评估的次数。<strong>SPARSE_WAND</strong>通常速度更快，但其性能会随着向量密度的增加而下降。要在它们之间做出选择，请根据您的特定数据集和使用案例进行实验和基准测试。</p></li>
<li><p><strong>如何选择 drop_ratio_build 和 drop_ratio_search 参数？</strong></p>
<p><strong>drop_ratio_build</strong>和<strong>drop_ratio_search</strong>的选择取决于数据的特性以及对搜索延迟/吞吐量和准确性的要求。</p></li>
<li><p><strong>稀疏嵌入支持哪些数据类型？</strong></p>
<p>维度部分必须是无符号 32 位整数，值部分可以是非负 32 位浮点数。</p></li>
<li><p><strong>稀疏嵌入的维度可以是 uint32 空间内的任何离散值吗？</strong></p>
<p>可以，但有一个例外。稀疏嵌入的维数可以是<code translate="no">[0, maximum of uint32)</code> 范围内的任意值。这意味着不能使用 uint32 的最大值。</p></li>
<li><p><strong>是通过索引还是蛮力对增长的线段进行搜索？</strong></p>
<p>对增长的数据段的搜索是通过与密封数据段索引相同类型的索引进行的。对于索引建立前的新增长区段，则使用蛮力搜索。</p></li>
<li><p><strong>是否可以在一个集合中同时包含稀疏向量和密集向量？</strong></p>
<p>可以，通过多向量类型支持，您可以创建同时包含稀疏和密集向量列的集合，并对其执行混合搜索。</p></li>
<li><p><strong>插入或搜索稀疏嵌入式有哪些要求？</strong></p>
<p>稀疏嵌入必须至少有一个非零值，向量索引必须是非负的。</p></li>
</ul>
