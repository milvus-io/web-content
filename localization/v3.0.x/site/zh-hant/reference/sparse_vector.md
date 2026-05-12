---
id: sparse_vector.md
summary: 學習如何在 Milvus 中使用稀疏向量。
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
    </button></h1><p>稀疏向量使用向量嵌入來表示單字或詞組，其中大部分元素為零，只有一個非零元素表示特定單字的存在。稀疏向量模型（例如<a href="https://arxiv.org/abs/2109.10086">SPLADEv2</a>）在域外知識搜尋、關鍵字感知和可解釋性上優於密集模型。它們在資訊檢索、自然語言處理和推薦系統中特別有用，在這些系統中，結合用於召回的稀疏向量和用於排序的大型模型可以顯著改善檢索結果。</p>
<p>在 Milvus 中，稀疏向量的使用遵循與密集向量相似的工作流程。它包括建立具有稀疏向量列的集合、插入資料、建立索引，以及進行相似性檢索和標量查詢。</p>
<p>在本教程中，您將學習如何</p>
<ul>
<li>準備稀疏向量嵌入；</li>
<li>建立具有稀疏向量欄位的集合；</li>
<li>使用稀疏向量嵌入插入實體；</li>
<li>索引集合並在稀疏向量上執行 ANN 搜尋。</li>
</ul>
<p>若要觀看稀疏向量的實作，請參考<a href="https://github.com/milvus-io/pymilvus/blob/master/examples/milvus_client/sparse.py">hello_sparse.py</a>。</p>
<div class="admonition note">
    <p><b>注意事項</b></p>
        目前，稀疏向量的支援是 2.4.0 中的測試版功能，計劃在 3.0.0 中普及。</div>
<h2 id="Prepare-sparse-vector-embeddings" class="common-anchor-header">準備稀疏向量嵌入<button data-href="#Prepare-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>要在 Milvus 中使用稀疏向量，請準備其中一種支援格式的向量嵌入：</p>
<ul>
<li><p><strong>稀疏矩陣</strong>：利用<a href="https://docs.scipy.org/doc/scipy/reference/sparse.html#module-scipy.sparse">scipy.sparse</a>類族來表示您的稀疏嵌入。這種方法對於處理大規模、高維數據非常有效。</p></li>
<li><p><strong>辭典清單</strong>：將每個稀疏嵌入表示為字典，結構為<code translate="no">{dimension_index: value, ...}</code> ，其中每個 key-value 對表示維度索引及其對應值。</p>
<p>範例：</p>
<pre><code translate="no" class="language-python">{<span class="hljs-number">2</span>: <span class="hljs-number">0.33</span>, <span class="hljs-number">98</span>: <span class="hljs-number">0.72</span>, ...}
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Tuples 的迭代清單</strong>：類似於字典清單，但使用元組迭代，<code translate="no">[(dimension_index, value)]</code> ，僅指定非零維度及其值。</p>
<p>範例：</p>
<pre><code translate="no" class="language-python">[(<span class="hljs-number">2</span>, <span class="hljs-number">0.33</span>), (<span class="hljs-number">98</span>, <span class="hljs-number">0.72</span>), ...]
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>以下範例準備稀疏嵌入，方法是為 10,000 個實體產生隨機稀疏矩陣，每個實體有 10,000 個維度，稀疏密度為 0.005。</p>
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
<p><b>注意</b></p>
<p>向量維度必須是 Python<code translate="no">int</code> 或<code translate="no">numpy.integer</code> 類型，而值必須是 Python<code translate="no">float</code> 或<code translate="no">numpy.floating</code> 類型。</p>
</div>
<p>要產生 embeddings，您也可以使用內建在 PyMilvus 函式庫中的<code translate="no">model</code> 套件，它提供了一系列的 embedding 函式。詳情請參閱<a href="/docs/zh-hant/embeddings.md">嵌入</a>。</p>
<h2 id="Create-a-collection-with-a-sparse-vector-field" class="common-anchor-header">使用稀疏向量場建立集合<button data-href="#Create-a-collection-with-a-sparse-vector-field" class="anchor-icon" translate="no">
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
    </button></h2><p>要使用稀疏向量場建立集合，請將稀疏向量<strong>場的資料類型</strong>設定為<strong>DataType.SPARSE_FLOAT_VECTOR</strong>。與密集向量不同，稀疏向量不需要指定維度。</p>
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
<p>關於常見集合參數的詳細資訊，請參閱<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection()</a>。</p>
<h2 id="Insert-entities-with-sparse-vector-embeddings" class="common-anchor-header">插入具有稀疏向量嵌入的實體<button data-href="#Insert-entities-with-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>要插入具有稀疏向量內嵌的實體，只要將實體清單傳給 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code translate="no">insert()</code></a>方法。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert entities</span>
client.insert(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-the-collection" class="common-anchor-header">為集合建立索引<button data-href="#Index-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>在執行相似性搜尋之前，請先為集合建立索引。有關索引類型和參數的詳細資訊，請參閱<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md">add_index()</a>和<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">create_index</a> <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md">()</a>。</p>
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
<p>對於在稀疏向量上建立索引，請注意下列事項：</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引類型。稀疏向量的可能選項：</p>
<ul>
<li><p><code translate="no">SPARSE_INVERTED_INDEX</code>:倒轉索引，將每個維度映射到其非零向量，方便在搜尋時直接存取相關資料。適用於稀疏但高維數據的資料集。</p></li>
<li><p><code translate="no">SPARSE_WAND</code>:利用 Weak-AND (WAND) 演算法快速繞過不可能的候選項目，並將評估重點放在具有較高排名潛力的候選項目上。將維度視為詞彙，將向量視為文件，加快大型稀疏資料集的搜尋速度。</p></li>
</ul></li>
<li><p><code translate="no">metric_type</code>:稀疏向量只支援<code translate="no">IP</code> (Inner Product) 距離公制。</p></li>
<li><p><code translate="no">params.drop_ratio_build</code>:專門用於稀疏向量的索引參數。它控制在索引過程中排除小向量值的比例。此參數可透過在建立索引時忽略小值來微調效率與精確度之間的權衡。舉例來說，如果<code translate="no">drop_ratio_build = 0.3</code> ，在索引建構過程中，所有稀疏向量的所有值都會被收集和排序。這些值中最小的 30% 不會包含在索引中，因此可以減少搜尋時的計算工作量。</p></li>
</ul>
<p>如需詳細資訊，請參閱「<a href="/docs/zh-hant/index.md">記憶體內索引</a>」。</p>
<h2 id="Perform-ANN-search" class="common-anchor-header">執行 ANN 搜尋<button data-href="#Perform-ANN-search" class="anchor-icon" translate="no">
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
    </button></h2><p>在文集建立索引並載入記憶體後，使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a>方法根據查詢擷取相關文件。</p>
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
<p>配置搜尋參數時，請注意下列事項：</p>
<ul>
<li><code translate="no">params.drop_ratio_search</code>:專門用於稀疏向量的搜尋參數。此選項允許透過指定查詢向量中最小值的忽略比例來微調搜尋過程。它有助於平衡搜尋精確度與效能。<code translate="no">drop_ratio_search</code> 設定的值越小，這些小值對最終得分的貢獻就越少。透過忽略一些小值，可以在對精確度影響最小的情況下提高搜尋效能。</li>
</ul>
<h2 id="Perform-scalar-queries" class="common-anchor-header">執行標量查詢<button data-href="#Perform-scalar-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>除了 ANN 搜尋外，Milvus 也支援稀疏向量的標量查詢。這些查詢允許您根據與稀疏向量相關的標量值來檢索文件。有關參數的詳細資訊，請參閱<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md">query()</a>。</p>
<p>過濾<strong>scalar_field</strong>大於 3 的實體：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform a query by specifying filter expr</span>
filter_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;scalar_field &gt; 0.999&quot;</span>,
)

<span class="hljs-built_in">print</span>(filter_query_res[:<span class="hljs-number">2</span>])

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [{&#x27;pk&#x27;: &#x27;448458373272701862&#x27;, &#x27;scalar_field&#x27;: 0.9994093623822689, &#x27;sparse_vector&#x27;: {173: 0.35266244411468506, 400: 0.49995484948158264, 480: 0.8757831454277039, 661: 0.9931875467300415, 1040: 0.0965644046664238, 1728: 0.7478245496749878, 2365: 0.4351981580257416, 2923: 0.5505295395851135, 3181: 0.7396837472915649, 3848: 0.4428485333919525, 4701: 0.39119353890419006, 5199: 0.790219783782959, 5798: 0.9623121619224548, 6213: 0.453134149312973, 6341: 0.745091438293457, 6775: 0.27766478061676025, 6875: 0.017947908490896225, 8093: 0.11834774166345596, 8617: 0.2289179265499115, 8991: 0.36600416898727417, 9346: 0.5502803921699524}}, {&#x27;pk&#x27;: &#x27;448458373272702421&#x27;, &#x27;scalar_field&#x27;: 0.9990218525410719, &#x27;sparse_vector&#x27;: {448: 0.587817907333374, 1866: 0.0994109958410263, 2438: 0.8672442436218262, 2533: 0.8063794374465942, 2595: 0.02122959867119789, 2828: 0.33827054500579834, 2871: 0.1984412521123886, 2938: 0.09674275666475296, 3154: 0.21552987396717072, 3662: 0.5236313343048096, 3711: 0.6463911533355713, 4029: 0.4041993021965027, 7143: 0.7370485663414001, 7589: 0.37588241696357727, 7776: 0.436136394739151, 7962: 0.06377989053726196, 8385: 0.5808192491531372, 8592: 0.8865005970001221, 8648: 0.05727503448724747, 9071: 0.9450633525848389, 9161: 0.146037295460701, 9358: 0.1903032660484314, 9679: 0.3146636486053467, 9974: 0.8561339378356934, 9991: 0.15841573476791382}}]</span>
<button class="copy-code-btn"></button></code></pre>
<p>依據主鍵過濾實體：</p>
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
    </button></h2><p>在 Milvus 中使用稀疏向量時，請考慮下列限制：</p>
<ul>
<li><p>目前，稀疏向量只支援<strong>IP</strong>距離度量。</p></li>
<li><p>對於稀疏向量欄位，只支援<strong>SPARSE_INVERTED_INDEX</strong>和<strong>SPARSE_WAND</strong>索引類型。</p></li>
<li><p>目前稀疏向量不支援<a href="https://milvus.io/docs/single-vector-search.md#Range-search">範圍搜尋</a>、<a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">群組搜尋</a>及<a href="https://milvus.io/docs/with-iterators.md#Search-with-iterator">搜尋迭代器</a>。</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">常見問題<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>稀疏向量支援什麼距離指標？</strong></p>
<p>由於稀疏向量的高維度，使得 L2 距離和余弦距離不切實際，因此稀疏向量只支援 Inner Product (IP) 距離公制。</p></li>
<li><p><strong>您能解釋 SPARSE_INVERTED_INDEX 和 SPARSE_WAND 之間的差異，以及該如何選擇嗎？</strong></p>
<p><strong>SPARSE_INVERTED_INDEX</strong>是一種傳統的倒轉索引，而<strong>SPARSE_WAND</strong>則使用<a href="https://dl.acm.org/doi/10.1145/956863.956944">Weak-AND</a>演算法來減少搜尋過程中完整 IP 距離評估的次數。<strong>SPARSE_WAND</strong>通常較快，但其效能會隨著向量密度的增加而下降。要在兩者之間做出選擇，請根據您的特定資料集和使用個案進行實驗和基準測試。</p></li>
<li><p><strong>我應該如何選擇 drop_ratio_build 和 drop_ratio_search 參數？</strong></p>
<p><strong>drop_ratio_build</strong>和<strong>drop_ratio_search</strong>的選擇取決於您資料的特性，以及您對搜尋延遲/吞吐量和精確度的要求。</p></li>
<li><p><strong>稀疏嵌入支援哪些資料類型？</strong></p>
<p>維度部分必須是無符號 32 位元整數，而值部分可以是非負 32 位元浮點數。</p></li>
<li><p><strong>稀疏嵌入的維度可以是 uint32 空間內的任何離散值嗎？</strong></p>
<p>可以，但有一個例外。稀疏嵌入的維度可以是<code translate="no">[0, maximum of uint32)</code> 範圍內的任何值。這表示您不能使用 uint32 的最大值。</p></li>
<li><p><strong>對成長中的區段進行搜尋時，是透過索引還是暴力搜尋？</strong></p>
<p>對成長中區段的搜尋是透過與封存區段索引相同類型的索引進行。對於索引建立前的新成長區段，會使用暴力搜尋。</p></li>
<li><p><strong>是否可以在單一集合中同時擁有稀疏向量和密集向量？</strong></p>
<p>可以，透過多重向量類型支援，您可以建立同時具有稀疏和密集向量列的集合，並對它們執行混合搜尋。</p></li>
<li><p><strong>插入或搜尋稀疏內嵌向量有什麼要求？</strong></p>
<p>稀疏內嵌必須至少有一個非零值，向量索引必須是非負數。</p></li>
</ul>
