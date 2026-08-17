---
id: array-of-structs.md
title: StructArray 概述
summary: >-
  當一個實體需要儲存結構化元素的有序清單時，請使用
  StructArray，例如包含多個區塊的單一文件、包含多個視覺區塊的單一頁面，或是包含多個片段的單一影片。StructArray
  會將這些元素保留在父實體內，同時仍允許對每個元素內的欄位進行向量搜尋和標量篩選。
---
<h1 id="StructArray-Overview" class="common-anchor-header">StructArray 概述<button data-href="#StructArray-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>當某個實體需要儲存結構化元素的有序清單時，請使用 StructArray，例如包含多個區塊的單一文件、包含多個視覺區塊的單一頁面，或是包含多個片段的單一影片。StructArray 會將這些元素保留在父實體內，同時仍允許針對每個元素內的欄位進行向量搜尋與標量篩選。</p>
<h2 id="What-is-StructArray" class="common-anchor-header">什麼是 StructArray？<button data-href="#What-is-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>StructArray</strong>（亦稱為結構體陣列）會在每個實體中儲存一組有序的 Struct 元素。陣列中的每個 Struct 元素皆遵循相同的結構。一個 Struct 元素可以包含標量子欄位、向量子欄位，或兩者兼具。</p>
<p>舉例來說，一個集合可以將一篇文章儲存為一個實體，並將其片段儲存於名為 `<code translate="no">chunks</code>` 的 StructArray 欄位中。每個片段可以包含文字、章節元資料、品質分數，以及一個或多個向量嵌入。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;doc_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Vector search tuning guide&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.10</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.40</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Use HNSW efSearch to trade recall for latency.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.11</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.21</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.31</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.41</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.12</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.33</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.39</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Range search returns vectors within a distance boundary.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.86</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.18</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.23</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.29</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.36</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.19</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.37</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>此範例中的兩個向量子欄位，分別從兩種搜尋視角代表同一個片段。<code translate="no">chunks[emb_list_vector]</code> 旨在用於搭配<code translate="no">MAX_SIM*</code> 指標的 EmbeddingList 搜尋，而<code translate="no">chunks[emb]</code> 則旨在用於搭配一般向量指標（例如<code translate="no">COSINE</code> 、<code translate="no">IP</code> 或<code translate="no">L2</code> ）的元素層級搜尋。</p>
</div>
<h2 id="When-to-use-StructArray" class="common-anchor-header">何時使用 StructArray<button data-href="#When-to-use-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>當您希望回傳的自然單位大於您要進行搜尋或篩選的自然單位時，請使用 StructArray。</p>
<table>
<thead>
<tr><th>使用情境</th><th>StructArray 的優勢</th><th>典型的 StructArray 欄位</th></tr>
</thead>
<tbody>
<tr><td>文件檢索</td><td>將單一文件儲存為實體，同時跨其各區塊進行搜尋。</td><td><code translate="no">chunks</code></td></tr>
<tr><td>延遲互動檢索</td><td>將文件或頁面儲存為嵌入向量清單，並透過 `<code translate="no">MAX_SIM*</code>` 進行評分。</td><td><code translate="no">chunks[emb_list_vector]</code> 或<code translate="no">patches[emb]</code></td></tr>
<tr><td>元素層級檢索</td><td>返回最相關的片段、剪輯、區塊或觀察結果，並包含其陣列偏移量。</td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>結構化篩選</td><td>根據 Struct 元素內的標量子欄位（例如 section、score、page 或 flags）進行篩選。</td><td><code translate="no">chunks[section]</code>,<code translate="no">chunks[quality_score]</code></td></tr>
<tr><td>減少重複的父級結果</td><td>將子元素保留在同一父實體之下，而非將每個子元素儲存為獨立的一行。</td><td><code translate="no">chunks</code>,<code translate="no">clips</code>,<code translate="no">patches</code></td></tr>
</tbody>
</table>
<h2 id="Decision-Matrix" class="common-anchor-header">決策矩陣<button data-href="#Decision-Matrix" class="anchor-icon" translate="no">
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
    </button></h2><p>請使用以下矩陣來選擇合適的 StructArray 路徑。</p>
<table>
<thead>
<tr><th>目標</th><th>建議路徑</th><th>結果粒度</th><th>從這裡開始</th></tr>
</thead>
<tbody>
<tr><td>建模一個具有多個結構化子物件的父物件。</td><td>建立一個 StructArray 欄位。</td><td>實體包含有序的 Struct 元素。</td><td><a href="/docs/zh-hant/create-structarray-field.md">建立 StructArray 欄位</a></td></tr>
<tr><td>插入包含嵌套子資料的父記錄。</td><td>插入其 StructArray 欄位為 Struct 物件清單的實體。</td><td>實體層級的插入。</td><td><a href="/docs/zh-hant/insert-data-into-structarray-fields.md">將資料插入 StructArray 欄位</a></td></tr>
<tr><td>執行 ColBERT、ColPali 或文件層級的延遲互動檢索。</td><td>使用 EmbeddingList 搜尋，並搭配<code translate="no">MAX_SIM*</code> 索引。</td><td>實體層級。</td><td><a href="/docs/zh-hant/search-with-embedding-lists.md">使用嵌入式清單進行搜尋</a></td></tr>
<tr><td>搜尋個別片段、剪輯或區塊。</td><td>使用常規向量度量進行元素層級搜尋。</td><td>結構元素層級，若有偏移量則一併納入。</td><td><a href="/docs/zh-hant/basic-vector-search-with-structarray.md">使用 StructArray 進行基本向量搜尋</a></td></tr>
<tr><td>將元素層級向量搜尋限制為符合標量條件的元素。</td><td>使用 `<code translate="no">element_filter</code>`。</td><td>元素級篩選；結果的形狀取決於搜尋類型。</td><td><a href="/docs/zh-hant/filtered-search-with-structarray.md">使用 StructArray 進行篩選搜尋</a></td></tr>
<tr><td>根據滿足某個條件的 Struct 元素數量來選取實體。</td><td>請使用<code translate="no">MATCH_ANY</code> 、<code translate="no">MATCH_ALL</code> 、<code translate="no">MATCH_LEAST</code> 、<code translate="no">MATCH_MOST</code> 或<code translate="no">MATCH_EXACT</code> 。</td><td>實體層級。</td><td><a href="/docs/zh-hant/struct-array-operators.md">StructArray 運算子</a></td></tr>
<tr><td>在 StructArray 向量子欄位上使用分數或距離邊界。</td><td>使用元素層級的範圍搜尋。</td><td>結構體元素層級。</td><td><a href="/docs/zh-hant/range-search-with-structarray.md">使用 StructArray 進行範圍搜尋</a></td></tr>
<tr><td>在執行元素層級搜尋後，針對每個父實體最多返回一個結果。</td><td>使用主鍵進行分組搜尋。</td><td>分組後的實體層級。</td><td><a href="/docs/zh-hant/grouping-search-with-structarray.md">使用 StructArray 進行分組搜尋</a></td></tr>
<tr><td>將 StructArray 元素搜尋與另一個向量欄位結合。</td><td>使用混合搜尋，透過一個 AnnSearchRequest 針對 StructArray 的向量子欄位進行搜尋。</td><td>元素層級的子搜尋，實體層級的重新排序。</td><td><a href="/docs/zh-hant/hybrid-search-with-structarray.md">結合 StructArray 的混合搜尋</a></td></tr>
</tbody>
</table>
<h2 id="Understand-the-two-search-models" class="common-anchor-header">了解兩種搜尋模型<button data-href="#Understand-the-two-search-models" class="anchor-icon" translate="no">
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
    </button></h2><table>
  <thead>
    <tr>
      <th scope="col"><h3>EmbeddingList 搜尋</h3></th>
      <th scope="col"><h3>元素層級搜尋</h3></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p>EmbeddingList 搜尋將 StructArray 向量子欄位內的向量視為父實體的單一嵌入清單。查詢亦為一組嵌入清單。Milvus 會透過<code translate="no">MAX_SIM*</code> 指標，將查詢嵌入清單與儲存的嵌入清單進行比對，並回傳符合條件的實體。</p>
        <ul>
          <li>查詢資料：嵌入式清單。</li>
          <li>度量指標類別：<code translate="no">MAX_SIM*</code> 。</li>
          <li>結果粒度：實體層級。</li>
          <li>最適用於：文件層級或頁面層級的後期互動檢索。</li>
        </ul>
      </td>
      <td>
        <p>元素層級搜尋將每個 Struct 元素視為獨立的向量搜尋候選項。每個搜尋結果代表 StructArray 欄位內的一個匹配元素，且未分組的結果可顯示該元素的偏移量。</p>
        <ul>
          <li>查詢資料：一般向量。</li>
          <li>指標家族：常規向量指標。</li>
          <li>結果粒度：Struct 元素層級。</li>
          <li>最適用於：區塊層級、片段層級或補丁層級的檢索。</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
<div class="alert note">
<p>警告</p>
<p>若您的集合同時需要 EmbeddingList 搜尋和元素層級搜尋，請使用兩個獨立的向量子欄位。一個向量欄位或向量子欄位僅接受一個索引，且這兩種搜尋模式需要不同的度量族。</p>
</div>
<h2 id="Documentation-map" class="common-anchor-header">文件導覽圖<button data-href="#Documentation-map" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 的文件分為「建模」頁面與「搜尋」頁面。請使用建模頁面來定義和準備資料，並使用搜尋頁面來選擇合適的檢索與篩選行為。</p>
<table>
<thead>
<tr><th>範圍</th><th>頁面</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td>建模</td><td><a href="/docs/zh-hant/create-structarray-field.md">建立 StructArray 欄位</a></td><td>定義結構體（Struct）模式並新增一個 StructArray 欄位。</td></tr>
<tr><td>建模</td><td><a href="/docs/zh-hant/insert-data-into-structarray-fields.md">將資料插入 StructArray 欄位</a></td><td>準備並插入嵌套的 StructArray 資料。</td></tr>
<tr><td>建模</td><td><a href="/docs/zh-hant/index-structarray-fields.md">為 StructArray 欄位建立索引</a></td><td>在 StructArray 子欄位上建立向量和標量索引。</td></tr>
<tr><td>參考</td><td><a href="/docs/zh-hant/structarray-limits.md">StructArray 限制</a></td><td>檢查架構、資料型別、索引、搜尋、篩選及版本限制。</td></tr>
<tr><td>搜尋</td><td><a href="/docs/zh-hant/basic-vector-search-with-structarray.md">使用 StructArray 進行基本向量搜尋</a></td><td>比較 EmbeddingList 搜尋與元素層級向量搜尋。</td></tr>
<tr><td>搜尋</td><td><a href="/docs/zh-hant/range-search-with-structarray.md">使用 StructArray 進行範圍搜尋</a></td><td>在 StructArray 向量子欄位中使用範圍限制。</td></tr>
<tr><td>搜尋</td><td><a href="/docs/zh-hant/grouping-search-with-structarray.md">使用 StructArray 進行分組搜尋</a></td><td>根據主鍵對元素層級的搜尋結果進行分組。</td></tr>
<tr><td>搜尋</td><td><a href="/docs/zh-hant/hybrid-search-with-structarray.md">結合 StructArray 的混合搜尋</a></td><td>將 StructArray 元素層級搜尋與其他向量搜尋結合。</td></tr>
<tr><td>搜尋</td><td><a href="/docs/zh-hant/filtered-search-with-structarray.md">使用 StructArray 進行篩選搜尋</a></td><td>在搜尋、查詢及混合搜尋中使用 StructArray 篩選器。</td></tr>
<tr><td>搜尋</td><td><a href="/docs/zh-hant/search-with-embedding-lists.md">使用嵌入式清單進行搜尋</a></td><td>利用 StructArray 建構 ColBERT 和 ColPali 風格的檢索系統。</td></tr>
<tr><td>篩選</td><td><a href="/docs/zh-hant/struct-array-operators.md">StructArray 運算子</a></td><td><code translate="no">element_filter</code> 和<code translate="no">MATCH_*</code> 運算子的參考語法。</td></tr>
</tbody>
</table>
<h2 id="Key-limits-to-check-first" class="common-anchor-header">首先應檢查的關鍵限制<button data-href="#Key-limits-to-check-first" class="anchor-icon" translate="no">
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
<li><p>Struct 可用作 Array 欄位的元素類型，但不能用作頂層集合欄位。</p></li>
<li><p>同一 StructArray 字段中的所有 Struct 元素共用一個預定義的架構。</p></li>
<li><p>向量子欄位需要索引。EmbeddingList 搜尋使用<code translate="no">MAX_SIM*</code> 指標，而元素層級搜尋則使用一般向量指標。</p></li>
<li><p><code translate="no">element_filter</code> 以及<code translate="no">MATCH_*</code> 適用於 StructArray 字段內的標量子字段。請僅在這些運算子內部使用<code translate="no">$[subfield]</code> 。</p></li>
<li><p>某些搜尋組合受版本限制或僅適用於特定模式。在依賴範圍搜尋、分組搜尋、混合搜尋、可為空欄位或動態新增欄位之前，請先查閱<a href="/docs/zh-hant/structarray-limits.md">StructArray 限制</a>。</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">下一步<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>若要設計資料結構，請參閱《<a href="/docs/zh-hant/create-structarray-field.md">建立 StructArray 欄位》</a>。</p></li>
<li><p>若要準備資料，請參閱《<a href="/docs/zh-hant/insert-data-into-structarray-fields.md">將資料插入 StructArray 欄位</a>》。</p></li>
<li><p>若要選擇索引，請參閱《為<a href="/docs/zh-hant/index-structarray-fields.md">StructArray 欄位建立索引》</a>。</p></li>
<li><p>若要搜尋 StructArray 向量子欄位，請先參閱<a href="/docs/zh-hant/basic-vector-search-with-structarray.md">《StructArray 的基本向量搜尋》</a>。</p></li>
<li><p>若要篩選 StructArray 標量子欄位，請參閱《<a href="/docs/zh-hant/struct-array-operators.md">StructArray 運算子</a>》及《<a href="/docs/zh-hant/filtered-search-with-structarray.md">使用 StructArray 進行篩選搜尋</a>》。</p></li>
</ol>
