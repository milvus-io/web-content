---
id: faiss.md
title: FAISSCompatible with Milvus 3.0.0+
summary: 在 Milvus 3.0 中，使用 FAISS 索引傳遞功能來提供 Faiss 索引建立函式串及特定於建立函式的搜尋參數。
beta: Milvus 3.0.0+
---
<h1 id="FAISS" class="common-anchor-header">FAISS<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#FAISS" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">FAISS</code> 索引類型是 Milvus 3.0.0 及後續版本中提供的一種專家級直通功能。它允許您提供<a href="https://github.com/facebookresearch/faiss/wiki/The-index-factory">Faiss 索引建立函式字串，</a>而非選擇固定的 Milvus 索引類型。</p>
<p>當您已擁有經過測試的 Faiss 配方，且需要直接控制其組成時，請使用<code translate="no">FAISS</code> 。對於具有專用 Milvus 索引類型的常見配方，建議優先選用專用類型，因為它具有穩定且有文件記載的參數規範。</p>
<div class="alert note">
<p>上游 Faiss 所接受的生成器字串，並不代表 Milvus 會自動支援。相容性取決於向量欄位類型、度量、維度、編譯進 Milvus 映像中的 Faiss 模組，以及生成的索引是否支援 Milvus 所需的操作。</p>
</div>
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
    </button></h2><ul>
<li><p><code translate="no">FAISS</code> 支援<code translate="no">FLOAT_VECTOR</code> 和<code translate="no">BINARY_VECTOR</code> 字段。不支援<code translate="no">FLOAT16_VECTOR</code> 、<code translate="no">BFLOAT16_VECTOR</code> 、<code translate="no">INT8_VECTOR</code> 或<code translate="no">SPARSE_FLOAT_VECTOR</code> 字段。</p></li>
<li><p>通用型<code translate="no">FAISS</code> 適配器在 CPU 上運行。它並非 Faiss GPU 索引類型。</p></li>
<li><p>必須指定<code translate="no">faiss_index_name</code> 建置參數。Milvus 會將其值傳遞給 Faiss，而不會將配方轉換為專用的 Milvus 索引類型。</p></li>
<li><p>建置與搜尋參數因工廠而異。某個工廠支援的參數，可能被另一個工廠拒絕。</p></li>
<li><p>標量篩選需要底層的 Faiss 索引支援 ID 選擇器。Milvus 3.0.0 的測試涵蓋了使用浮點數工廠<code translate="no">Flat</code> 、<code translate="no">IVF64,Flat</code> 及<code translate="no">HNSW16,Flat</code> 進行的篩選搜尋。請勿假設每個工廠都支援篩選功能，亦請勿假設二進位<code translate="no">FAISS</code> 索引支援標量篩選。</p></li>
<li><p>不支援搜尋迭代器。</p></li>
<li><p>此適配器不提供原始向量檢索功能。</p></li>
<li><p>範圍搜尋（Range-search）的支援程度取決於工廠。浮點數<code translate="no">Flat</code> 已包含在發行版中。請勿在二進位<code translate="no">FAISS</code> 索引上使用範圍搜尋。</p></li>
<li><p>工廠即使能成功建置，仍可能拒絕某些 Milvus 搜尋操作。例如，獨立模式的<code translate="no">PQ8x4</code> 會拒絕標量篩選搜尋所使用的選擇器。請另行驗證未經篩選的使用情況。</p></li>
<li><p>在 Milvus 3.0.0 中，請於索引重新載入後驗證<code translate="no">COSINE</code> 的分數及範圍搜尋閾值。Knowhere v3.0.6 在反序列化過程中，無法還原<code translate="no">FAISS</code> 適配器的餘弦正規化狀態。</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">運作原理<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/faiss-index-flow.png" alt="FAISS index passthrough workflow" class="doc-image" id="faiss-index-passthrough-workflow" /> 
   <span>FAISS 索引直通工作流程</span>
  
 </span></p>
<p>在建立索引時，Milvus 會將 `<code translate="no">faiss_index_name</code>`、向量欄位類型、度量標準及其他建置參數轉發至 Knowhere FAISS 適配器。該適配器會針對 `<code translate="no">FLOAT_VECTOR</code> ` 欄位呼叫 `<code translate="no">faiss::index_factory()</code> `，或針對 `<code translate="no">BINARY_VECTOR</code> ` 欄位呼叫 `<code translate="no">faiss::index_binary_factory()</code> `。產生的物件為原生 Faiss 索引，並透過標準的 Milvus 索引生命週期進行管理。</p>
<p>在搜尋時，此轉接器會將提供的工廠特定參數轉換為對應的 Faiss<code translate="no">SearchParameters</code> 物件。對於受支援的浮點數工廠，它還會將 Milvus 篩選器位元集作為 Faiss 選擇器傳遞。 選擇器的支援程度因工廠而異，且已發布的測試並未針對二進位<code translate="no">FAISS</code> 索引建立標量過濾機制。這正是為何某個配方在獨立運作的 Faiss 中可能有效，卻會因不符合 Milvus 搜尋路徑所需的操作而遭拒絕。</p>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Milvus 3.0.0 或更新版本</li>
<li>PyMilvus 3.0.0 或更新版本</li>
<li>熟悉 Faiss 索引工廠的語法，以及所選工廠的訓練要求</li>
</ul>
<p>有關安裝說明，請參閱《<a href="/docs/zh-hant/install-pymilvus.md">安裝 PyMilvus</a>》。</p>
<h2 id="Choose-a-factory-string" class="common-anchor-header">選擇工廠字串<button data-href="#Choose-a-factory-string" class="anchor-icon" translate="no">
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
    </button></h2><p>工廠字串將 Faiss 索引描述為一組元件的序列。以下範例已通過 Milvus 3.0.0 發行測試。此清單並非詳盡無遺。</p>
<table>
<thead>
<tr><th>生成器字串</th><th>欄位類型</th><th>在發行版測試中驗證的指標</th><th>搜尋參數</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>,<code translate="no">IP</code>,<code translate="no">COSINE</code></td><td>無</td><td>精確搜尋。</td></tr>
<tr><td><code translate="no">IVF64,Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>,<code translate="no">IP</code>,<code translate="no">COSINE</code></td><td><code translate="no">nprobe</code></td><td>採用 64 個反轉清單與未壓縮向量的 IVF。</td></tr>
<tr><td><code translate="no">HNSW16,Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>,<code translate="no">IP</code>,<code translate="no">COSINE</code></td><td><code translate="no">efSearch</code></td><td>採用扁平向量儲存的 HNSW 圖。</td></tr>
<tr><td><code translate="no">OPQ16,IVF64,PQ16x4</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td>針對特定工廠</td><td>結合 OPQ、IVF 及 PQ。請使用您的資料驗證訓練規模與召回率。</td></tr>
<tr><td><code translate="no">IVF64,PQ8x4,RFlat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td><code translate="no">nprobe</code>,<code translate="no">k_factor</code></td><td>在 PQ 候選結果檢索後使用扁平化精煉器。</td></tr>
<tr><td><code translate="no">PQ8x4</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td>無</td><td>內建釋出測試。由於索引拒絕選取器，標量過濾搜尋會失敗；請另行驗證未過濾的使用情況。</td></tr>
<tr><td><code translate="no">BFlat</code></td><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HAMMING</code></td><td>無</td><td>二進位向量的精確搜尋。</td></tr>
</tbody>
</table>
<p><code translate="no">COSINE</code> 條目顯示建置與搜尋的煙霧測試覆蓋率。對於 Milvus 3.0.0，這些測試無法在索引重新載入後驗證分數或範圍搜尋的正確性。請參閱「<a href="#limits">限制</a>」。</p>
<h2 id="Build-and-search-a-float-index" class="common-anchor-header">建置與搜尋浮點數索引<button data-href="#Build-and-search-a-float-index" class="anchor-icon" translate="no">
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
    </button></h2><p>以下範例建立 3,000 個 128 維向量。這為範例中使用的<code translate="no">IVF64,Flat</code> 配方提供了足夠的訓練資料。請在建置和搜尋索引之前，展開設定區塊並執行它。</p>
<p><details></p>
<p><summary>準備浮點數向量集合</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;faiss_float_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">32</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

client.create_collection(collection_name=collection_name, schema=schema)

rows = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;reference&quot;</span> <span class="hljs-keyword">if</span> i % <span class="hljs-number">2</span> == <span class="hljs-number">0</span> <span class="hljs-keyword">else</span> <span class="hljs-string">&quot;query&quot;</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: vector,
    }
    <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)
]

client.insert(collection_name=collection_name, data=rows)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Build-the-index" class="common-anchor-header">建立索引<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>將 `<code translate="no">index_type</code> ` 設定為 `<code translate="no">FAISS</code>`，並使用 `<code translate="no">faiss_index_name</code> ` 選取原生 Faiss 工廠配方。</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;faiss_ivf_flat&quot;</span>,
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,</span>
<span class="highlighted-comment-line">    params={<span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;IVF64,Flat&quot;</span>},</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>工廠字串<code translate="no">IVF64,Flat</code> 會建立一個包含 64 個反轉清單的 IVF 索引，並在每個清單中儲存未壓縮的向量。</p>
<h3 id="Search-the-index" class="common-anchor-header">搜尋索引<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>請在<code translate="no">search_params.params</code> 內設定工廠專屬的搜尋參數。對於 IVF 工廠，<code translate="no">nprobe</code> 會控制 Faiss 搜尋的倒排列表數量。</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>},</span>
<span class="highlighted-comment-line">}</span>

results = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;reference&quot;&#x27;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;category&quot;</span>],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<p>由於查詢使用了 `<code translate="no">nprobe=8</code>`，因此 Faiss 會從 64 個反轉清單中搜尋其中的 8 個。此篩選條件將結果限制為 `<code translate="no">category</code> ` 值為 `<code translate="no">reference</code>` 的實體。</p>
<h2 id="Build-and-search-a-binary-index" class="common-anchor-header">建立並搜尋二進位索引<button data-href="#Build-and-search-a-binary-index" class="anchor-icon" translate="no">
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
    </button></h2><p>對於<code translate="no">BINARY_VECTOR</code> 欄位，請使用如<code translate="no">BFlat</code> 般的二進位建構字串，並搭配相容的二進位度量。請展開設定區塊並執行該區塊，然後再建立及搜尋索引。</p>
<p><details></p>
<p><summary>準備二進位向量集合</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;faiss_binary_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">7</span>)
vectors = [<span class="hljs-built_in">bytes</span>(rng.getrandbits(<span class="hljs-number">8</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">16</span>)) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">300</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;binary_vector&quot;</span>, DataType.BINARY_VECTOR, dim=<span class="hljs-number">128</span>)

client.create_collection(collection_name=collection_name, schema=schema)
client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;binary_vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Build-the-index" class="common-anchor-header">建立索引<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>在此二進位向量範例中，請使用<code translate="no">BFlat</code> 作為生成字串，並使用<code translate="no">HAMMING</code> 作為度量。</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;faiss_binary_flat&quot;</span>,
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;HAMMING&quot;</span>,</span>
<span class="highlighted-comment-line">    params={<span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;BFlat&quot;</span>},</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-the-index" class="common-anchor-header">搜尋索引<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BFlat</code> 沒有特定於家族的搜尋參數。在建構搜尋請求時，請傳入一個空的<code translate="no">params</code> 映射。</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {<span class="hljs-string">&quot;params&quot;</span>: {}}</span>

results = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">5</span>,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<p>每個 128 維的二進位向量由 16 位元組表示。如需更多資訊，請參閱《<a href="/docs/zh-hant/binary-vector.md">二進位向量</a>》。</p>
<h2 id="Configure-build-and-search-parameters" class="common-anchor-header">設定建置與搜尋參數<button data-href="#Configure-build-and-search-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">FAISS</code> 索引類型有一個必填的直通建置參數。</p>
<table>
<thead>
<tr><th>參數</th><th>位置</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">faiss_index_name</code></td><td><code translate="no">params</code> in<code translate="no">add_index()</code></td><td>Faiss 索引工廠字串。例如：<code translate="no">IVF64,Flat</code> 。</td></tr>
</tbody>
</table>
<p>請在<code translate="no">search_params.params</code> 內設定工廠專屬的搜尋參數。下表列出常見範例，但並非詳盡無遺。</p>
<table>
<thead>
<tr><th>參數</th><th>工廠範例</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td><code translate="no">IVF64,Flat</code></td><td>要搜尋的倒排列表數量。</td></tr>
<tr><td><code translate="no">efSearch</code></td><td><code translate="no">HNSW16,Flat</code></td><td>HNSW 搜尋候選清單的大小。</td></tr>
<tr><td><code translate="no">k_factor</code></td><td><code translate="no">IVF64,PQ8x4,RFlat</code></td><td>提供給精細化器（refiner）的候選項數量，相對於所請求的前 K 項。</td></tr>
</tbody>
</table>
<p>Milvus 僅會轉發適配器所識別的附加參數。未知建置金鑰以及具體工廠家族不支援的搜尋金鑰將被拒絕。Milvus 並未針對所有可能的工廠維護通用的參數架構。 請查閱所選工廠的 Faiss 文件，然後根據您計劃部署的 Milvus 確切版本和映像，驗證完整的建置與搜尋流程。</p>
<h2 id="Handle-errors-and-unsupported-operations" class="common-anchor-header">處理錯誤與不支援的操作<button data-href="#Handle-errors-and-unsupported-operations" class="anchor-icon" translate="no">
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
<li><p>若工廠字串無效，或在 Milvus 建置中不可用，索引建置將失敗。在載入資料集之前，請檢查索引狀態與失敗原因。</p></li>
<li><p>若參數類型錯誤，搜尋將失敗。例如，<code translate="no">nprobe=&quot;invalid&quot;</code> 會被拒絕，因為<code translate="no">nprobe</code> 必須為數值型別。</p></li>
<li><p>若某個參數不適用於已建置的工廠，適配器會以「不支援」為由拒絕該參數。</p></li>
<li><p>若某個工廠不支援 Milvus 選擇器，即使該工廠在獨立運作的 Faiss 中可進行搜尋，篩選搜尋仍可能失敗。</p></li>
<li><p>請勿在<code translate="no">FAISS</code> 索引中使用<code translate="no">search_iterator()</code> 。</p></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">接下來該做什麼<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>請參閱《<a href="/docs/zh-hant/index-explained.md">索引說明</a>》了解 Milvus 索引的組織方式。</li>
<li>比較專用的<a href="/docs/zh-hant/ivf-flat.md">IVF_FLAT</a>與<a href="/docs/zh-hant/hnsw.md">HNSW</a>索引類型。</li>
<li>在為工廠選擇指標之前，請先參閱《<a href="/docs/zh-hant/metric.md">指標類型</a>》。</li>
</ul>
