---
id: search-aggregation.md
title: 搜尋聚合Compatible with Milvus 3.0.x
summary: 將向量搜尋結果分組至各桶中，計算各桶的指標，對各桶進行排序，並回傳具代表性的搜尋結果。
beta: Milvus 3.0.x
---
<h1 id="Search-Aggregation" class="common-anchor-header">搜尋聚合<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>當購物者搜尋「適合日常訓練的黑色跑鞋」時，近似最近鄰（ANN）搜尋會根據向量相似度對產品進行排序，並回傳一個平面的 Top-K 清單。搜尋結果雖具相關性，但可能過於重複：以下例中，前六項結果中有四項是 A 品牌產品，而 B 品牌和 C 品牌各出現一次。</p>
<p>平鋪式清單無法直接提供以分桶為導向的摘要。應用程式可能需要根據保留候選項數量或平均價格來比較各品牌，檢視每個品牌中少數具代表性的產品，或將結果組織成多個分桶層級。</p>
<p>搜尋彙總功能會根據選定的標量欄位，將保留的 ANN 候選項目歸類至不同區間。在此範例中，每個品牌即成為一個獨立的區間。Milvus 可針對每個區間計算統計數據、對區間進行排序，並附上代表性產品。應用程式可透過 `<code translate="no">result.agg_buckets</code>` 介面取得此「區間優先」的回應結果。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-overview.png" alt="A flat running-shoe search result becomes a set of comparable brand buckets" class="doc-image" id="a-flat-running-shoe-search-result-becomes-a-set-of-comparable-brand-buckets" /> 
   <span>原本平面的運動鞋搜尋結果，轉變為一組可供比較的品牌分桶</span>
  
 </span></p>
<p>搜尋聚合並不會執行精確的全集合聚合。桶組的存在、計數、指標、排序以及代表性搜尋結果，皆取決於人工神經網路（ANN）與分組階段所保留的候選項目。</p>
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
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-bucketing.png" alt="ANN candidates grouped by bucket keys and returned with counts, metrics, and representative hits" class="doc-image" id="ann-candidates-grouped-by-bucket-keys-and-returned-with-counts,-metrics,-and-representative-hits" /> 
   <span>依桶鍵分組的 ANN 候選項，並隨同計數、指標及代表性搜尋結果一併返回</span>
  
 </span></p>
<ol>
<li><p><strong>檢索候選項。</strong>Milvus 執行 ANN 搜尋以找出最接近查詢向量的實體。隨後，分組階段會針對每個完整的複合鍵保留有限數量的候選項。此「每鍵候選項配額」等於聚合樹中任何位置的最大<code translate="no">TopHits.size</code> 值，或當未設定<code translate="no">top_hits</code> 時，即為<code translate="no">1</code> 。</p></li>
<li><p><strong>建立桶（bucket）。</strong> <code translate="no">SearchAggregation.fields</code> 定義桶鍵。每個字段值的唯一組合都會產生一個獨立的鍵。如圖所示，<code translate="no">fields=[&quot;brand&quot;]</code> 會產生<code translate="no">(Brand A)</code> 、<code translate="no">(Brand B)</code> 以及<code translate="no">(Brand C)</code> 這些桶鍵。具有相同鍵的保留候選項屬於同一個桶，並計入該桶的<code translate="no">count</code> 。<code translate="no">SearchAggregation.size</code> 會限制 Milvus 返回的桶數量。</p></li>
<li><p><strong>計算並返回結果。</strong>每個返回的桶皆包含其鍵及保留候選項的數量。Milvus 亦可計算已設定的指標、對桶進行排序、返回代表性實體，並建立子桶。<code translate="no">result.agg_buckets</code> 中的每個<code translate="no">AggregationBucket</code> 皆會公開<code translate="no">key</code> 、<code translate="no">count</code> 、<code translate="no">metrics</code> 、<code translate="no">hits</code> 及<code translate="no">sub_groups</code> 。當啟用「搜尋聚合」時，一般的搜尋命中清單將為空。</p></li>
</ol>
<p>如圖所示，<code translate="no">TopHits.size=4</code> 提供每個關鍵字四個候選項的預算，因此保留的四個「品牌 A」候選項產生<code translate="no">count: 4</code> 。為使圖表簡潔，完成的「品牌 A」卡片僅顯示四個回傳代表性搜尋結果中的兩個。</p>
<p>當<code translate="no">sub_aggregation</code> 生效時，Milvus 會在每個父桶內重複執行步驟 2 和 3。人工神經網路（ANN）的召回率或每鍵候選預算的變動，都可能影響桶的數量、指標、排序、搜尋結果以及嵌套結果。</p>
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
    </button></h2><p>在使用「搜尋彙總」功能前，請注意以下限制：</p>
<ul>
<li><p><strong>嵌套聚合：</strong>單一請求可包含一個根層級的<code translate="no">SearchAggregation</code> ，以及最多三個嵌套的<code translate="no">sub_aggregation</code> 層級，總計最多四個層級。跨所有層級，最多可使用 10 個欄位來建立區間金鑰。</p></li>
<li><p><strong>用於建立儲存桶金鑰的欄位：</strong> <code translate="no">SearchAggregation.fields</code> 支援布林值、整數、<code translate="no">VARCHAR</code> 及<code translate="no">TIMESTAMPTZ</code> 欄位。不支援<code translate="no">FLOAT</code> 、<code translate="no">DOUBLE</code> 、<code translate="no">ARRAY</code> 、<code translate="no">JSON</code> 、<code translate="no">GEOMETRY</code> 、<code translate="no">TEXT</code> 、向量或動態欄位。</p></li>
<li><p><strong>度量欄位：</strong> <code translate="no">count</code> 接受<code translate="no">&quot;*&quot;</code> 或任何非<code translate="no">JSON</code> 且非動態的欄位，並在指定欄位時跳過<code translate="no">NULL</code> 的值。<code translate="no">sum</code> 和<code translate="no">avg</code> 接受整數與浮點數欄位。<code translate="no">min</code> 和<code translate="no">max</code> 此外還接受字串與<code translate="no">TIMESTAMPTZ</code> 欄位。</p></li>
<li><p><strong>「Top Hits」排序欄位：</strong> <code translate="no">TopHits.sort</code> 接受可比的布林值、整數、浮點數、字串及<code translate="no">TIMESTAMPTZ</code> 欄位，以及<code translate="no">_score</code> 。它不支援<code translate="no">ARRAY</code> 、<code translate="no">JSON</code> 、<code translate="no">GEOMETRY</code> 、向量或動態欄位。</p></li>
<li><p><strong>候選預算：</strong>聚合樹中任何位置的最大<code translate="no">TopHits.size</code> 值，即為每個完整複合鍵所保留的候選項數量。若無任何層級設定<code translate="no">top_hits</code> ，Milvus 將為每個鍵保留一個候選項。分桶<code translate="no">count</code> 及指標皆根據這些保留的候選項計算得出，因此變更<code translate="no">TopHits.size</code> 可能會影響這些數值。</p></li>
<li><p><strong>可為空的桶位欄位：</strong> <code translate="no">NULL</code> 的值會形成其自身的桶位鍵。若要排除空桶位，請在搜尋請求中加入如<code translate="no">brand is not null</code> 之類的篩選條件。</p></li>
<li><p><strong>重複欄位：</strong>同一欄位不得出現在多個<code translate="no">SearchAggregation.fields</code> 清單中。例如，若根聚合使用<code translate="no">fields=[&quot;category&quot;]</code> ，則嵌套的<code translate="no">sub_aggregation</code> 便不能同時使用<code translate="no">fields=[&quot;category&quot;]</code> 。</p></li>
<li><p><strong>不支援的組合：</strong>搜尋聚合無法與非零的<code translate="no">offset</code> 、搜尋迭代器、混合搜尋、高亮顯示器或分組搜尋結合使用。頂層<code translate="no">offset</code> 的值若為<code translate="no">0</code> ，則等同於省略該參數。在 REST v2 搜尋請求中，<code translate="no">searchAggregation</code> 與<code translate="no">ids</code> 無法同時指定。</p></li>
<li><p><strong>回傳的條目：</strong>預設情況下，當搜尋聚合請求中計算出的結果條目最大數量超過 10,000 時，Milvus 會拒絕該請求。此閾值由<code translate="no">proxy.maxSearchAggregationResultEntries</code> 控制。若要停用此檢查，請將配置值設定為<code translate="no">0</code> 或負數。</p>
<p>Milvus 計算此最大值的公式如下：</p>
<p><code translate="no">number of query vectors × product of the effective search_size at every aggregation level × largest TopHits.size at any level</code></p>
<p>針對此伺服器端計算，各層級的有效<code translate="no">search_size</code> 為明確設定的<code translate="no">search_size</code> ，或在省略<code translate="no">search_size</code> 時，採用該層級的<code translate="no">size</code> 。本指南中使用的 PyMilvus API 目前未公開<code translate="no">search_size</code> ，因此 PyMilvus 請求會使用各層級的<code translate="no">size</code> 進行此計算。 若無任何層級設定<code translate="no">TopHits</code> ，請使用<code translate="no">1</code> 作為最後一個因子。例如，一個查詢向量、10 個根桶、每個根桶有 5 個子桶，以及每個子桶有 2 次命中，其計算出的最大值為：</p>
<p><code translate="no">1 × 10 × 5 × 2 = 100</code></p></li>
</ul>
<h2 id="Use-Search-Aggregation" class="common-anchor-header">使用搜尋聚合<button data-href="#Use-Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h2><p>根據您的目標選擇一個範例：</p>
<table>
<thead>
<tr><th>前往</th><th>說明</th><th>關鍵設定</th></tr>
</thead>
<tbody>
<tr><td><a href="#Compare-and-sort-buckets">比較並排序儲存桶</a></td><td>計算各儲存桶的統計資料以進行比較，然後根據指標、計數或金鑰對回傳的儲存桶進行排序。</td><td><code translate="no">fields</code>,<code translate="no">size</code>,<code translate="no">metrics</code>,<code translate="no">order</code></td></tr>
<tr><td><a href="#Show-representative-results-from-each-bucket">顯示各桶的代表性結果</a></td><td>從每個桶中返回有限數量的實體，並分別依據標量欄位或向量分數對這些實體進行排序。</td><td><code translate="no">top_hits</code>,<code translate="no">TopHits.size</code>,<code translate="no">TopHits.sort</code></td></tr>
<tr><td><a href="#Group-results-at-multiple-levels">在多個層級對結果進行分組</a></td><td>將結果組織為父級與子級桶層級，以依序分析多個維度。</td><td><code translate="no">sub_aggregation</code></td></tr>
</tbody>
</table>
<p>以下範例使用一個包含品牌、類別、顏色、價格和評分欄位的產品集合。所有品牌名稱、產品名稱、價格、評分及搜尋結果均為合成範例資料。請展開以下區段以建立該集合並定義共用搜尋變數。</p>
<p><details></p>
<p><summary>設定範例商品集合</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient, SearchAggregation, TopHits

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

collection_name = <span class="hljs-string">&quot;product_search_aggregation&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;embedding&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(<span class="hljs-string">&quot;name&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">200</span>)
schema.add_field(<span class="hljs-string">&quot;brand&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;color&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">50</span>)
schema.add_field(<span class="hljs-string">&quot;price&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;rating&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;in_stock&quot;</span>, DataType.BOOL)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
    <span class="hljs-comment"># Make preceding writes visible to searches from this client.</span>
    consistency_level=<span class="hljs-string">&quot;Session&quot;</span>,
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.42</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.66</span>, <span class="hljs-number">0.31</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">129.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.7</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.39</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.61</span>, <span class="hljs-number">0.29</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Trail A2&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">139.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.6</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.14</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.68</span>, <span class="hljs-number">0.33</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.41</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.62</span>, <span class="hljs-number">0.30</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner C1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand C&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">119.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.4</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">False</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.48</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.59</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.71</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.5</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.45</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.55</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.69</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">89.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.3</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.09</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.60</span>, <span class="hljs-number">0.27</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A3&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.13</span>, <span class="hljs-number">0.43</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.65</span>, <span class="hljs-number">0.32</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A4&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.9</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
    ],
)

client.load_collection(collection_name)

query_vector = [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.40</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.64</span>, <span class="hljs-number">0.30</span>]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
}
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>上述設定同時為向量索引和搜尋參數配置了<code translate="no">COSINE</code> 。因此，後續範例將使用<code translate="no">{&quot;_score&quot;: &quot;desc&quot;}</code> 來優先顯示較高的餘弦相似度。若使用距離度量（例如<code translate="no">L2</code> ），請使用<code translate="no">{&quot;_score&quot;: &quot;asc&quot;}</code> 。</p>
<h3 id="Compare-and-sort-buckets" class="common-anchor-header">比較與排序桶<button data-href="#Compare-and-sort-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>當您需要使用計算出的統計值來比較一組檢索到的實體，並控制桶的回傳順序時，請使用此模式。在此範例中，Milvus 會根據<code translate="no">brand</code> 將檢索到的產品分組，為每個品牌桶計算價格指標，並按平均價格對桶進行排序。</p>
<p>若您的目標僅是透過針對每個欄位值返回一個或多個實體來提升結果的多樣性，請改用「<a href="/docs/zh-hant/grouping-search.md">分組搜尋</a>」。</p>
<p>以下設定會建立最多三個品牌區間，為每個區間計算指標，並根據平均價格對區間進行排序：</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Form one bucket for each distinct brand value.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return up to three buckets at this aggregation level.</span></span>
<span class="highlighted-comment-line">    size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Calculate named metrics for every selected bucket.</span></span>
<span class="highlighted-comment-line">    metrics={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;min_price&quot;</span>: {<span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Sort buckets by average price, highest first.</span></span>
<span class="highlighted-comment-line">    order=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;avg_price&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># If average prices are equal, sort by bucket key in ascending order.</span></span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;_key&quot;</span>: <span class="hljs-string">&quot;asc&quot;</span>},</span>
<span class="highlighted-comment-line">    ],</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>將物件傳遞至 `<code translate="no">MilvusClient.search()</code>` 的 `<code translate="no">search_aggregation</code> ` 參數：</p>
<pre><code translate="no" class="language-python">result = client.search(
    collection_name=collection_name,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    search_params=search_params,
    output_fields=[
        <span class="hljs-string">&quot;name&quot;</span>,
        <span class="hljs-string">&quot;brand&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;color&quot;</span>,
        <span class="hljs-string">&quot;price&quot;</span>,
        <span class="hljs-string">&quot;rating&quot;</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>,
    ],
<span class="highlighted-wrapper-line">    search_aggregation=aggregation,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>當設定<code translate="no">search_aggregation</code> 時，PyMilvus 不會在<code translate="no">result[0]</code> 中傳回任何一般實體命中結果。請改為從<code translate="no">result.agg_buckets[0]</code> 讀取桶區回應。<code translate="no">output_fields</code> 參數控制哪些標量欄位會出現在每個回傳的<code translate="no">AggregationHit.fields</code> 映射中；Milvus 仍可使用未列於<code translate="no">output_fields</code> 中的指標來源欄位和排序欄位。</p>
<p><details></p>
<p><summary>檢視桶子輸出範例</summary></p>
<p>以下輸出是從上述請求擷取並為便於閱讀而序列化為 JSON 的結果。PyMilvus 實際上會傳回<code translate="no">AggregationBucket</code> 物件，而非 JSON。<code translate="no">key</code> 的值始終是鍵組件的有序清單，即使<code translate="no">fields</code> 僅包含一個欄位亦然。此設計可保留複合鍵的欄位順序。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand C&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>針對本指南中的單一查詢向量，請從 `<code translate="no">result.agg_buckets[0]</code>` 讀取回傳的頂層桶位。每個桶位會公開其有序的鍵組件、保留候選項 `<code translate="no">count</code>`、計算結果 `<code translate="no">metrics</code>`、代表性向量 `<code translate="no">hits</code>`，以及 `<code translate="no">sub_groups</code>` 中的嵌套桶位。</p>
<p>請參閱以下設定：</p>
<table>
<thead>
<tr><th>設定</th><th>控制項目</th><th>在此範例中</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fields</code></td><td>Milvus 如何建立桶鍵</td><td>針對每個不同的 `<code translate="no">brand</code> ` 值，建立一個儲存桶。</td></tr>
<tr><td><code translate="no">size</code></td><td>回傳的儲存桶最大數量</td><td>最多會返回三個品牌儲存桶。</td></tr>
<tr><td><code translate="no">metrics</code></td><td>針對每個儲存桶計算的統計資料</td><td>計算產品數量、平均價格及最低價格。</td></tr>
<tr><td><code translate="no">order</code></td><td>Milvus 如何對回傳的分組進行排序</td><td>依平均價格排序，並使用區間鍵來打破平局。</td></tr>
</tbody>
</table>
<p>當設定 `<code translate="no">search_aggregation</code> ` 時，Milvus 會忽略 `<code translate="no">limit</code> `。請使用根 `<code translate="no">SearchAggregation.size</code> ` 值來控制頂層區間的數量。</p>
<p>根據這些設定，Milvus 會依<code translate="no">avg_price</code> 由高至低的順序，返回品牌 B、品牌 A 及品牌 C 的桶。<code translate="no">_key</code> 準則僅在各桶的平均價格相同時才適用。由於此配置未定義<code translate="no">top_hits</code> ，每個桶的<code translate="no">hits</code> 清單皆為空，且每個鍵的候選預算為<code translate="no">1</code> 。因此，顯示的計數和指標描述的是每個品牌保留的一位候選者。若彙總需要更寬的每個鍵指標視窗，請將<code translate="no">top_hits</code> 設定為較大的<code translate="no">TopHits.size</code> 。</p>
<p><details></p>
<p><summary>指標與排序規則</summary></p>
<p>每個<code translate="no">SearchAggregation.metrics</code> 條目會將使用者自訂的別名映射至<code translate="no">{operation: source}</code> ：</p>
<table>
<thead>
<tr><th>來源</th><th>支援的操作</th><th>行為</th></tr>
</thead>
<tbody>
<tr><td>任何非<code translate="no">JSON</code> 且非動態的欄位</td><td><code translate="no">count</code></td><td>會統計來源欄位非<code translate="no">NULL</code> 的保留候選項。</td></tr>
<tr><td>整數或浮點數欄位</td><td><code translate="no">sum</code>、<code translate="no">avg</code> 、<code translate="no">min</code> 、<code translate="no">max</code></td><td>針對非空的保留值進行計算。</td></tr>
<tr><td>字串或<code translate="no">TIMESTAMPTZ</code> 欄位</td><td><code translate="no">min</code>，<code translate="no">max</code></td><td>選取非空保留值的最小值或最大值。</td></tr>
<tr><td><code translate="no">&quot;*&quot;</code></td><td><code translate="no">count</code></td><td>統計桶中每個保留候選項的數量。結果與<code translate="no">bucket.count</code> 相符。</td></tr>
<tr><td><code translate="no">_score</code></td><td><code translate="no">sum</code>,<code translate="no">avg</code>,<code translate="no">min</code>,<code translate="no">max</code></td><td>彙總保留候選項的 ANN 相似度或距離值。</td></tr>
</tbody>
</table>
<p><code translate="no">SearchAggregation.order</code> 接受以下鍵：</p>
<table>
<thead>
<tr><th>排序鍵</th><th>含義</th></tr>
</thead>
<tbody>
<tr><td>度量別名</td><td>依據在<code translate="no">metrics</code> 中於相同彙總層級計算出的值進行排序，例如<code translate="no">avg_price</code> 。</td></tr>
<tr><td><code translate="no">_count</code></td><td>依每個桶位中保留的候選項數量進行排序。</td></tr>
<tr><td><code translate="no">_key</code></td><td>根據桶鍵進行排序，而非名為<code translate="no">_key</code> 的集合欄位。</td></tr>
</tbody>
</table>
<p>每個<code translate="no">order</code> 條目會將一個鍵映射至<code translate="no">&quot;asc&quot;</code> 或<code translate="no">&quot;desc&quot;</code> 。Milvus 會依序從第一項到最後一項評估多個條目。若省略<code translate="no">order</code> ，Milvus 將保留來自保留候選集的桶位發現順序。</p>
<p>若要依據向量匹配品質對桶進行排序，請先從 `<code translate="no">_score</code>` 計算出桶層級的指標，然後在 `<code translate="no">order</code>` 中使用該指標別名。您無法直接將 `<code translate="no">_score</code> ` 用作桶排序鍵，因為每個桶可能包含多個實體分數。例如，使用 `<code translate="no">COSINE</code> ` 或 `<code translate="no">IP</code>` 時：</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
    metrics={<span class="hljs-string">&quot;max_score&quot;</span>: {<span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-string">&quot;_score&quot;</span>}},
    order=[{<span class="hljs-string">&quot;max_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
)
<button class="copy-code-btn"></button></code></pre>
<p>使用<code translate="no">L2</code> 時，請計算<code translate="no">_score</code> 的最小值，並將指標別名依升序排序，使距離最小的區間優先顯示。</p>
<p></details></p>
<p><details></p>
<p><summary>建立複合桶鍵</summary></p>
<p>要建立複合式桶位金鑰，請在同一個清單中傳入多個欄位名稱：</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Combine brand and color to form a composite bucket key.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],</span>
    size=<span class="hljs-number">6</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>此配置可產生如<code translate="no">(Brand A, black)</code> 、<code translate="no">(Brand A, blue)</code> 及<code translate="no">(Brand B, white)</code> 等金鑰。僅當兩個實體的兩項值皆相同時，才會共用同一個桶位。Milvus 會保留清單順序，因此<code translate="no">brand</code> 為第一個金鑰組件，而<code translate="no">color</code> 為第二個。當在<code translate="no">order</code> 中使用<code translate="no">_key</code> 時，Milvus 會依照相同順序比較複合金鑰的各組件。請將多個字串傳入單一平坦清單中；不支援嵌套清單。</p>
<p><code translate="no">size=6</code> 是此聚合層級下返回的複合桶最大數量。範例資料包含五種不同的品牌-顏色組合，因此可返回全部五種。在<a href="#Limits">返回條目限制中</a>，此請求貢獻了<code translate="no">1 query vector × 6 buckets × 1 = 6</code> 所設定的結果條目。</p>
<p>在單一<code translate="no">SearchAggregation.fields</code> 清單中包含多個欄位，將在該彙總層級建立一個複合桶鍵。若要建立父子桶層級結構，請使用<a href="#Group-results-at-multiple-levels">嵌套彙總</a>。</p>
<p></details></p>
<p>以下範例重新定義了<code translate="no">aggregation</code> 。將更新後的物件傳遞給相同的<code translate="no">search_aggregation</code> 參數，並重新執行搜尋呼叫。</p>
<h3 id="Show-representative-results-from-each-bucket" class="common-anchor-header">顯示每個桶位的代表性結果<button data-href="#Show-representative-results-from-each-bucket" class="anchor-icon" translate="no">
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
    </button></h3><p>當應用程式需要顯示每個桶中的實際產品時，請包含具代表性的實體。在此範例中，Milvus 會從每個品牌桶中返回最多兩項產品，並依評分排序，接著依向量分數排序。</p>
<p>請依下列方式設定 `<code translate="no">TopHits</code> `：</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return and sort representative entities for each selected bucket.</span></span>
<span class="highlighted-comment-line">    top_hits=TopHits(</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Return up to two entities per bucket.</span></span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Apply sort criteria in list order.</span></span>
<span class="highlighted-comment-line">        sort=[</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        ],</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>檢視包含代表性搜尋結果的桶</summary></p>
<p>以下品牌 A 桶的資料取自上述請求，並為便於閱讀而序列化為 JSON 格式。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.99976646900177</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;black&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner A1&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997048377990723</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;blue&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Trail A2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">139.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.6</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<table>
<thead>
<tr><th>參數</th><th>目的</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">top_hits</code></td><td>可選。用於為此聚合層級設定代表性實體。若省略此參數，<code translate="no">bucket.hits</code> 將為空，且每個金鑰的候選預算預設值為一。</td></tr>
<tr><td><code translate="no">TopHits.size</code></td><td>從每個選定的區間中最多返回兩個代表性實體，並將整個彙總樹中每個金鑰的候選預算設定為二。</td></tr>
<tr><td><code translate="no">TopHits.sort</code></td><td>根據列出的標準對每個區塊內的實體進行排序。</td></tr>
</tbody>
</table>
<p>當應用程式需要代表性實體，或計數與指標需要更寬廣的「每鍵候選視窗」時，請設定 `<code translate="no">top_hits</code> `。較大的 `<code translate="no">TopHits.size</code> ` 值會同時增加候選預算，並提高<a href="#Limits">`Limits</a>` 中「最大回傳條目數」的計算上限。</p>
<p><code translate="no">SearchAggregation.order</code> 會對桶進行排序，而「<code translate="no">TopHits.sort</code> 」則會對每個桶內的保留實體進行排序。此排序順序不會改變為「<code translate="no">count</code> 」和指標所保留的候選項。<code translate="no">TopHits.sort</code> 接受受支援的可比較標量欄位名稱，以及代表人工智慧（ANN）相似度或距離的內建「<code translate="no">_score</code> 」欄位。Milvus 會從頭到尾評估「<code translate="no">sort</code> 」中的條目。 在此範例中，系統會依據<code translate="no">rating</code> 將產品從高到低排序，並僅在兩項評分相同時才使用<code translate="no">_score</code> 。由於設定中使用了<code translate="no">COSINE</code> ，因此降序的<code translate="no">_score</code> 會將相似度較高的產品排在首位。</p>
<p><code translate="no">metrics</code> 或<code translate="no">TopHits.sort</code> 所使用的欄位無需出現在<code translate="no">output_fields</code> 中。Milvus 會在內部擷取這些欄位，但僅有<code translate="no">output_fields</code> 中明確列出的欄位才會被納入每個回傳結果的<code translate="no">fields</code> 映射中。主鍵和向量分數仍可透過<code translate="no">AggregationHit.pk</code> 和<code translate="no">AggregationHit.score</code> 取得。</p>
<p>每個回傳的<code translate="no">AggregationHit</code> 皆會於<code translate="no">pk</code> 公開其主鍵、於<code translate="no">score</code> 公開向量分數，並於<code translate="no">fields</code> 公開所請求的輸出欄位。</p>
<h3 id="Group-results-at-multiple-levels" class="common-anchor-header">多層級結果分組<button data-href="#Group-results-at-multiple-levels" class="anchor-icon" translate="no">
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
    </button></h3><p>當您需要在某個層級內建立另一個層級的桶時，請使用嵌套聚合。在此範例中，Milvus 會先建立類別桶，然後在每個類別內建立品牌桶。</p>
<p>子聚合僅接收指派給其父桶的實體。<code translate="no">fields</code> 控制各聚合層級的桶鍵，而<code translate="no">sub_aggregation</code> 則建立父子層級結構。</p>
<p>以下配置會建立一個鍵值為<code translate="no">(running_shoes)</code> 的類別儲存桶。在該父儲存桶內，子聚合會建立各自獨立的品牌儲存桶，其鍵值例如<code translate="no">(Brand A)</code> 、<code translate="no">(Brand B)</code> 及<code translate="no">(Brand C)</code> 。</p>
<pre><code translate="no" class="language-text">Parent bucket key:
(running_shoes)

Child bucket keys:
├── (Brand A)
├── (Brand B)
└── (Brand C)
<button class="copy-code-btn"></button></code></pre>
<p>每個層級均可獨立使用多個欄位。例如，在子聚合中使用<code translate="no">fields=[&quot;brand&quot;, &quot;color&quot;]</code> ，將產生如<code translate="no">(Brand A, black)</code> 這樣的複合子鍵。</p>
<p>以下配置實現了此層級結構：</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;category&quot;</span>],
    size=<span class="hljs-number">2</span>,
    metrics={
        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},
        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},
    },
    order=[{<span class="hljs-string">&quot;product_count&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
<span class="highlighted-comment-line">    <span class="hljs-comment"># For each category bucket, group only its entities by brand.</span></span>
<span class="highlighted-comment-line">    sub_aggregation=SearchAggregation(</span>
<span class="highlighted-comment-line">        fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">        metrics={</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;brand_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;avg_rating&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;rating&quot;</span>},</span>
<span class="highlighted-comment-line">        },</span>
<span class="highlighted-comment-line">        order=[{<span class="hljs-string">&quot;avg_rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        top_hits=TopHits(</span>
<span class="highlighted-comment-line">            size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">            sort=[{<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        ),</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>檢視嵌套儲存桶的結果</summary></p>
<p>以下序列化片段顯示了父桶<code translate="no">running_shoes</code> 及其子桶「品牌 B」。為簡潔起見，已省略「品牌 A」和「品牌 C」的子桶。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">137.49</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;avg_rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;brand_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9994542598724365</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner B1&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>顯示的結果代表儲存桶路徑<code translate="no">(running_shoes) → (Brand B)</code> ，而非單一的複合儲存桶金鑰<code translate="no">(running_shoes, Brand B)</code> 。</p>
<p>Milvus 首先根據<code translate="no">product_count</code> 的順序，選取最多兩個類別儲存桶。接著，它在每個選定的類別中獨立執行<code translate="no">sub_aggregation</code> ，並根據<code translate="no">avg_rating</code> 的順序，返回最多三個品牌儲存桶。</p>
<p>在上述輸出中：</p>
<ul>
<li>根級別的<code translate="no">running_shoes</code> 桶在其子複合鍵中包含四個保留候選項。其<code translate="no">metrics</code> 包含根級別的<code translate="no">avg_price</code> 和<code translate="no">product_count</code> 值。</li>
<li>根桶的「<code translate="no">sub_groups</code> 」清單包含子品牌桶。顯示中的「Brand B」桶包含一個保留候選值，以及其自身的「<code translate="no">avg_rating</code> 」和「<code translate="no">brand_count</code> 」值。</li>
<li>由於根匣的<code translate="no">hits</code> 清單未設定<code translate="no">top_hits</code> ，因此該清單為空。品牌 B 子匣包含一個代表性命中，因為在<code translate="no">sub_aggregation</code> 中已設定<code translate="no">top_hits</code> 。</li>
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
    </button></h2><h3 id="How-accurate-are-bucket-counts-and-metrics" class="common-anchor-header">桶計數和指標的準確性如何？<button data-href="#How-accurate-are-bucket-counts-and-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>搜尋彙總會彙總保留的 ANN 候選項，並不會執行全集合彙總。</p>
<p>候選項保留包含兩個近似階段。ANN 搜尋可能會遺漏相關的集合實體，而分組階段針對每個完整的複合鍵，最多僅保留<code translate="no">TopHits.size</code> 候選項。若無任何層級設定<code translate="no">top_hits</code> ，則此每鍵限制為一。</p>
<p>舉例來說，假設某集合包含 5,000 項「品牌 A」產品，其中許多與向量查詢相關。若彙總操作使用<code translate="no">TopHits(size=4)</code> ，則「品牌 A」桶位針對每個完整複合鍵最多可保留四個候選項。其<code translate="no">count</code> 和指標所描述的是這些被保留的候選項，而非所有相關的「品牌 A」產品，亦非集合中的全部 5,000 個實體。</p>
<p>當「<code translate="no">order</code> 」使用指標別名時，近似值的影響最為顯著。搜尋召回率的變化會改變指標值，進而改變哪些桶能符合「<code translate="no">SearchAggregation.size</code> 」的條件。嵌套聚合會放大此效應，因為每個子層級皆針對其父桶中可用的實體進行運算。</p>
<p>若您需要針對每個匹配實體取得精確統計資料，請使用「精確查詢彙總」工作流程，而非「搜尋彙總」。</p>
<h3 id="How-does-Search-Aggregation-differ-from-Grouping-Search" class="common-anchor-header">「搜尋聚合」與「分組搜尋」有何不同？<button data-href="#How-does-Search-Aggregation-differ-from-Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>請根據應用程式的首要結果格式進行選擇：</p>
<table>
<thead>
<tr><th>主要需求</th><th>建議選項</th><th>應使用的回傳格式</th></tr>
</thead>
<tbody>
<tr><td>回傳標準的排序實體清單，且分組欄位中的重複值較少</td><td><a href="/docs/zh-hant/grouping-search.md">分組搜尋</a></td><td>針對每個查詢向量進行扁平化搜尋結果</td></tr>
<tr><td>將群組視為桶子進行檢視或比較，包含鍵值、計數、指標、排序、代表性搜尋結果或子桶子</td><td>搜尋彙總</td><td><code translate="no">AggregationBucket</code> 物件位於<code translate="no">result.agg_buckets</code></td></tr>
</tbody>
</table>
<p>即使搜尋聚合設定了<code translate="no">top_hits</code> ，其主要回應仍為桶狀樹。當應用程式已能處理一般搜尋結果，且主要目標在於提升結果多樣性時，分組搜尋仍具實用價值。</p>
<p>這些 API 彼此互斥。當在同一請求中將 `<code translate="no">search_aggregation</code> ` 與 `<code translate="no">group_by_field</code> ` 或 `<code translate="no">group_by_fields</code> ` 結合使用時，PyMilvus 會拋出 `<code translate="no">ParamError</code> ` 錯誤。</p>
