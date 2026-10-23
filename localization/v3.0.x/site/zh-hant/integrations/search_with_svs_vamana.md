---
id: search_with_svs_vamana.md
summary: >-
  透過 FAISS 索引直通功能，在 Milvus 中建立並搜尋 SVS Vamana 記憶體內圖形索引，並可在 Intel CPU 上選用 LeanVec
  或 LVQ 壓縮技術。
title: 使用 SVS Vamana 和 Milvus 進行搜尋
---
<h1 id="Search-with-SVS-Vamana-and-Milvus" class="common-anchor-header">使用 SVS Vamana 和 Milvus 進行搜尋<button data-href="#Search-with-SVS-Vamana-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/intel/ScalableVectorSearch">SVS</a>（可擴展向量搜尋）是英特爾（Intel）的一套高效能向量搜尋函式庫，實作 Vamana 圖演算法。 在 Milvus 中，您可以透過<a href="https://milvus.io/docs/faiss.md">FAISS 索引穿透機制</a>存取 SVS Vamana：將 `<code translate="no">index_type</code> ` 設定為 `<code translate="no">FAISS</code> `，並提供 `<code translate="no">SVSVamana</code> ` 索引建構字串，Milvus 便會透過 FAISS 的 SVS 整合功能來建立並搜尋索引。</p>
<p>Vamana 是<a href="https://milvus.io/docs/diskann.md">DISKANN</a>亦採用的圖結構，但 SVS Vamana 會將整個圖結構保存在記憶體中。它還能透過<strong>LeanVec</strong>或<strong>LVQ</strong> 壓縮向量，藉此減少記憶體使用量並加速搜尋，同時仍能達到極高的召回率。</p>
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
<li>Milvus 3.0.0 或更新版本，需從原始碼編譯且已啟用 SVS</li>
<li>PyMilvus 3.0.0 或更新版本</li>
<li>若使用<code translate="no">LVQ*</code> 或<code translate="no">LeanVec*</code> 儲存方案，則需 Intel CPU；<code translate="no">FP32</code> 、<code translate="no">FP16</code> 及<code translate="no">SQ8</code> 儲存方案可在任何平台上運行</li>
<li>熟悉<a href="https://milvus.io/docs/faiss.md">FAISS 索引工廠字串</a></li>
</ul>
<div class="alert note">
<p>SVS 未包含在 Milvus 的預設建置中。若要使用<code translate="no">SVSVamana</code> 工廠，請透過<code translate="no">make USE_SVS=ON</code> 從原始碼建置 Milvus。在未包含 SVS 的建置中，索引建置會失敗，因為 Faiss 無法識別該工廠字串。</p>
</div>
<p>LVQ 和 LeanVec 壓縮僅能在 Intel CPU 上執行，且在具備 AVX-512 的 CPU 上執行速度更快。在其他 CPU 上，使用<code translate="no">LVQ*</code> 和<code translate="no">LeanVec*</code> 工廠字串時，索引建置會失敗。</p>
<h2 id="How-SVS-Vamana-works" class="common-anchor-header">SVS Vamana 的運作原理<button data-href="#How-SVS-Vamana-works" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Vamana-graph" class="common-anchor-header">Vamana 圖<button data-href="#Vamana-graph" class="anchor-icon" translate="no">
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
    </button></h3><p>SVS Vamana 會建構一個單層鄰近圖。每個向量皆為一個節點，而邊則連接可能為近鄰的向量。為了建構此圖，SVS 會針對每個節點<strong>x</strong> 執行以下步驟：</p>
<ol>
<li><p><strong>貪婪搜尋</strong>：SVS 會搜尋目前已建構的圖，並維持一個大小為<code translate="no">construction_window_size</code> 的候選清單。</p></li>
<li><p><strong>鄰居修剪</strong>：已造訪的節點將成為<strong>x</strong> 的候選鄰居。SVS 會依照這些節點與<strong>x</strong> 之間距離由小到大的順序進行考量。 若已保留的更近鄰節點<code translate="no">n</code> 滿足<code translate="no">alpha * distance(n, c) &lt;= distance(x, c)</code> ，則跳過候選節點<code translate="no">c</code> 。此機制可保留長程邊並刪除冗餘的短程邊，使搜尋能跨越圖結構，而非逐個最近鄰節點地移動。當圖的度數達到上限時，修剪過程即告終止。</p></li>
<li><p><strong>反向邊</strong>：對於<strong>x</strong> 的每個新鄰居，SVS 會新增一條指向<strong>x</strong>的反向邊，並在該鄰居的邊清單超過圖的度數時進行修剪。</p></li>
</ol>
<p>修剪過程分為兩輪：首先使用<code translate="no">alpha = 1</code> ，接著使用設定的<code translate="no">alpha</code> 。較大的圖度與<code translate="no">construction_window_size</code> 會產生更密集、品質更高的圖，但會消耗更多記憶體且建構時間較長。</p>
<p>在搜尋階段，SVS 會貪婪地遍歷圖，並保留迄今為止觀察到的、距離查詢最近的候選節點（<code translate="no">search_window_size</code> ）。它總是先探索距離最近且尚未造訪的候選節點。當當前節點的所有鄰居與查詢節點的距離，均比視窗內最差候選節點與查詢節點的距離更遠時，搜尋即告結束。較大的<code translate="no">search_window_size</code> 會探索更多圖的區域，這雖能提高召回率，但也會增加延遲。</p>
<h3 id="LeanVec-compression" class="common-anchor-header">LeanVec 壓縮<button data-href="#LeanVec-compression" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://openreview.net/forum?id=wczqrpOrIc">LeanVec</a>同時減少了每個向量的維數以及每維的位元數。LeanVec 索引會為每個向量保存兩種表示形式：</p>
<ul>
<li><p><strong>主要表示（降維）</strong>：將向量線性投影至較低維度的表示。圖搜尋在這個主要資料集上執行，因此大部分的距離計算都在低維空間中進行。這同時降低了運算和記憶體頻寬的需求。預設情況下，降維後的維度為原始維度的一半（<code translate="no">dim / 2</code> ）。</p></li>
<li><p><strong>次要表示（全維度）</strong>：向量在原始維度下的表示。SVS 會根據此次要資料集，對主要圖搜尋所返回的候選項進行重新排序，以彌補因維度縮減而損失的準確度。</p></li>
</ul>
<p>這兩種表示形式均採用<a href="https://vldb.org/pvldb/volumes/16/paper/Similarity%20search%20in%20the%20blink%20of%20an%20eye%20with%20compressed%20indices">LVQ</a>（局部自適應向量量化）進行量化。工廠字串中的儲存組件負責選取編碼方式。例如，<code translate="no">LeanVec4x8</code> 對主要資料集採用每維度 4 位元，對次要資料集則採用每維度 8 位元。即使是重新排序步驟，也絕不會讀取全精度向量。</p>
<p>預設情況下，LeanVec 會分別為索引向量和查詢學習獨立的投影，以支援來自與索引向量不同分佈的查詢（即「分佈外」或 OOD）。 此機制對於跨模態工作負載（例如文字到影像檢索）特別有效，且當查詢來自與索引向量相同的分佈時，同樣表現良好。Milvus 目前尚不支援將查詢傳遞以計算投影，因此現階段僅使用基礎向量。OOD 訓練會增加建置時間。 若希望以犧牲部分查詢效能為代價來加快建置速度，請將 `<code translate="no">ood_training</code> ` 設定為 `<code translate="no">False</code>`。</p>
<h3 id="LVQ-compression" class="common-anchor-header">LVQ 壓縮<button data-href="#LVQ-compression" class="anchor-icon" translate="no">
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
    </button></h3><p>對於維度少於約 512 維的資料集，跳過維度縮減並僅使用 LVQ 量化進行壓縮，效果可能更佳。 與 LeanVec 類似，LVQ 索引會保留一個用於快速搜尋的主表示，以及一個用於重新排序的殘差表示。例如，<code translate="no">LVQ4x4</code> 會使用 4 位元作為主表示，並使用 4 位元作為殘差表示。<code translate="no">LVQ4x0</code> 和<code translate="no">LVQ8x0</code> 會跳過重新排序步驟，若其召回率足以滿足您的工作負載需求，此舉可加快查詢速度。</p>
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
    </button></h2><p>SVS Vamana 的工廠字串格式為<code translate="no">SVSVamana&lt;degree&gt;[,&lt;storage&gt;]</code> ，其中<code translate="no">&lt;degree&gt;</code> 代表圖中每個節點的最大邊數。</p>
<table>
<thead>
<tr><th>預設字串</th><th>儲存</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">SVSVamana64</code></td><td><code translate="no">FP32</code></td><td>未壓縮向量。</td></tr>
<tr><td><code translate="no">SVSVamana64,FP16</code></td><td>16 位元浮點數</td><td>僅需<code translate="no">FP32</code> 一半的向量記憶體，且精度損失極小。</td></tr>
<tr><td><code translate="no">SVSVamana64,SQ8</code></td><td>8 位元標量量化</td><td>僅需<code translate="no">FP32</code> 四分之一的向量記憶體。</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x0</code>,<code translate="no">LVQ8x0</code></td><td>LVQ 為主，無殘差</td><td>僅限 Intel CPU。不進行重新排序。</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x4</code>,<code translate="no">LVQ4x8</code></td><td>LVQ 主要演算法與殘差</td><td>僅限 Intel CPU。</td></tr>
<tr><td><code translate="no">SVSVamana64,LeanVec4x4</code>,<code translate="no">LeanVec4x8</code>,<code translate="no">LeanVec8x8</code></td><td>LeanVec 主要與次要</td><td>僅限 Intel CPU。請添加<code translate="no">_&lt;dim&gt;</code> 後綴以設定降維維度。例如，<code translate="no">LeanVec4x8_128</code> 會將主要資料集降維至 128 維。若未添加後綴，降維維度將為<code translate="no">dim / 2</code> 。</td></tr>
</tbody>
</table>
<p><code translate="no">SVSVamana64,LeanVec4x8</code> 這是一個不錯的起點。在此基礎上：</p>
<ul>
<li><p>若要在犧牲部分記憶體空間的前提下<strong>提升召回率</strong>，請使用<code translate="no">_&lt;dim&gt;</code> 後綴來增加 LeanVec 的維度。</p></li>
<li><p>若需在犧牲部分召回率的前提下<strong>縮小記憶體佔用</strong>，請降低 LeanVec 的維度。</p></li>
<li><p>對於低維向量，請嘗試使用<code translate="no">LVQ8</code> 。</p></li>
<li><p><strong>在非 Intel CPU 上</strong>，請使用<code translate="no">FP16</code> 或<code translate="no">SQ8</code> 。</p></li>
</ul>
<h2 id="Build-the-index" class="common-anchor-header">建立索引<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p>以下範例建立一個圖度為 64 且採用 LeanVec 壓縮的 SVS Vamana 索引。請展開設定區塊並在建立索引前執行該區塊。</p>
<p><details></p>
<p><summary>準備資料集</summary></p>
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
<p>將 `<code translate="no">index_type</code> ` 設定為 `<code translate="no">FAISS</code>`，並使用 `<code translate="no">faiss_index_name</code> ` 選取 SVS Vamana 配方。</p>
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
<h2 id="Search-the-index" class="common-anchor-header">搜尋索引<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">search_window_size</code> 此參數控制召回率與延遲之間的權衡，如同<a href="https://milvus.io/docs/hnsw.md">HNSW</a> 中的 `<code translate="no">ef</code> ` 所做的那樣。請將 `<code translate="no">search_buffer_capacity</code> ` 設定為至少與該值相同。兩者的預設值皆為 10，且若 `<code translate="no">search_window_size</code> ` 大於其 `<code translate="no">search_buffer_capacity</code>`，SVS 將拒絕該搜尋請求。</p>
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
<p>若<code translate="no">limit</code> 大於<code translate="no">search_window_size</code> ，SVS 會將該次搜尋的視窗大小調高至<code translate="no">limit</code> 。</p>
<h2 id="SVS-Vamana-parameters" class="common-anchor-header">SVS Vamana 參數<button data-href="#SVS-Vamana-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>以下建置參數應置於<code translate="no">params</code> 中的<code translate="no">add_index()</code> 內，位於<code translate="no">faiss_index_name</code> 旁邊。索引建置完成後，您將無法變更這些參數。</p>
<table>
<thead>
<tr><th>參數</th><th>預設值</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">construction_window_size</code></td><td><code translate="no">40</code></td><td>在圖構造過程中，用於查找各節點鄰居的候選清單大小。較大的數值可提升圖的品質與召回率，但建構時間會較長。請將其設定為至少等於圖的度數。200 是常見的選擇。</td></tr>
<tr><td><code translate="no">alpha</code></td><td><code translate="no">1.2</code> 針對<code translate="no">L2</code> ，請參閱<code translate="no">0.95</code> ；針對<code translate="no">IP</code> ，請參閱<code translate="no">COSINE</code></td><td>修剪強度。數值越遠離 1，修剪越激進，傾向保留長程邊而非冗餘的短程邊。針對<code translate="no">L2</code> ，請使用大於 1 的數值；針對<code translate="no">IP</code> 和<code translate="no">COSINE</code> ，則使用小於 1 的數值。除非您已針對自身資料測量出更佳的數值，否則請維持預設值。</td></tr>
<tr><td><code translate="no">graph_max_degree</code></td><td>工廠字串中的度數，或<code translate="no">32</code></td><td>每個節點的最大邊數。此設定會覆寫工廠字串中的度數。數值範圍 [32, 128] 適用於大多數工作負載。較高的數值可提高召回率，但會消耗更多記憶體且建構時間較長。</td></tr>
<tr><td><code translate="no">prune_to</code></td><td>圖的度數減去 4</td><td>當節點超過圖的度數時，經過一次修剪後保留的邊數。</td></tr>
<tr><td><code translate="no">max_candidate_pool_size</code></td><td><code translate="no">200</code></td><td>修剪節點鄰居時所考慮的候選節點最大數量。此數值應大於<code translate="no">construction_window_size</code> 。</td></tr>
<tr><td><code translate="no">use_full_search_history</code></td><td><code translate="no">True</code></td><td>修剪時是否會考慮建構搜尋過程中造訪過的每個節點，而不僅限於最終候選節點。</td></tr>
<tr><td><code translate="no">leanvec_d</code></td><td><code translate="no">_&lt;dim&gt;</code> 預設字串後綴或<code translate="no">dim / 2</code></td><td>僅限 LeanVec。主要資料集的降維係數。此參數會覆寫預設字串後綴。較小的數值可減少記憶體使用量並加快圖搜尋速度，但會降低召回率。</td></tr>
<tr><td><code translate="no">ood_training</code></td><td><code translate="no">True</code> 適用於 LeanVec</td><td>僅限 LeanVec。是否為索引向量與查詢分別學習投影。若要加快建構速度，請將 `<code translate="no">False</code> ` 設為 `true`。若將 `<code translate="no">True</code> ` 設定為 LeanVec 以外的任何預設值，設定將失敗。</td></tr>
</tbody>
</table>
<p>以下搜尋參數應設定於 `<code translate="no">search_params.params</code>` 中。您亦可將其設為建置參數，此舉將變更索引在未設定這些參數的搜尋中使用的預設值。</p>
<table>
<thead>
<tr><th>參數</th><th>預設值</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_window_size</code></td><td><code translate="no">10</code></td><td>遍歷圖時保留的最接近候選項數量。較大的數值會提高召回率並增加延遲。</td></tr>
<tr><td><code translate="no">search_buffer_capacity</code></td><td><code translate="no">10</code></td><td>搜尋緩衝區的容量。必須大於或等於<code translate="no">search_window_size</code> 。在大多數情況下，請將其設定為<code translate="no">search_window_size</code> 。對於 LeanVec，請嘗試設定為<code translate="no">search_window_size</code> 的 1.5 倍。</td></tr>
</tbody>
</table>
<h2 id="Learn-more" class="common-anchor-header">進一步了解<button data-href="#Learn-more" class="anchor-icon" translate="no">
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
<li>請參閱<a href="https://milvus.io/docs/faiss.md">FAISS 索引直通</a>參考文件，了解一般工廠字串合約、限制及錯誤處理。</li>
<li>與<a href="https://milvus.io/docs/diskann.md">DISKANN</a> 中的磁碟上 Vamana 實作進行比較。</li>
<li>請參閱<a href="https://github.com/intel/ScalableVectorSearch">SVS 儲存庫，</a>了解建置細節、效能調校以及底層的 C++ API。</li>
</ul>
