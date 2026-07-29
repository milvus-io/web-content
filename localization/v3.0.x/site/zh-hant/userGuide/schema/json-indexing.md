---
id: json-indexing.md
title: JSON 索引
summary: >-
  JSON 欄位提供了一種在 Milvus 中儲存結構化元資料的靈活方式。若未建立索引，針對 JSON
  欄位的查詢將需要掃描整個集合，隨著資料集規模擴大，此過程會變得相當緩慢。JSON 索引會在 JSON
  資料中的特定路徑上建立索引，因此針對這些路徑的相等、範圍及其他篩選查詢都能快速執行。
---
<h1 id="JSON-Indexing" class="common-anchor-header">JSON 索引<button data-href="#JSON-Indexing" class="anchor-icon" translate="no">
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
    </button></h1><p>JSON 欄位提供了一種在 Milvus 中儲存結構化元資料的靈活方式。若未建立索引，針對 JSON 欄位的查詢將需要掃描整個集合，隨著資料集規模擴大，此過程會變得相當緩慢。JSON 索引會在 JSON 資料內的特定路徑上建立索引，使針對該路徑的等值、範圍及其他篩選查詢能夠快速執行。</p>
<p>JSON 索引特別適用於：</p>
<ul>
<li><p>具有一致且已知鍵值的結構化模式</p></li>
<li><p>針對特定 JSON 路徑的等值、<code translate="no">IN</code> 、範圍及文字比對查詢</p></li>
<li><p>需要精確控制哪些鍵被建立索引的情境</p></li>
</ul>
<p>對於具有多種查詢模式的複雜 JSON 文件，請考慮將<a href="/docs/zh-hant/json-shredding.md">JSON 分片</a>作為替代方案。</p>
<h2 id="Index-type-overview" class="common-anchor-header">索引類型概覽<button data-href="#Index-type-overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 針對 JSON 路徑提供四種索引類型，每種皆適用於不同的查詢模式。</p>
<p>在選擇索引類型之前，請先確定 JSON 路徑的<strong>轉換類型</strong>。轉換類型決定了 Milvus 如何解析該路徑下的值，以及可用的索引類型。</p>
<h3 id="Understand-cast-types" class="common-anchor-header">了解轉換類型<button data-href="#Understand-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">json_cast_type</code> 即用於解析並索引<code translate="no">json_path</code> 路徑下值所使用的資料類型。這與欄位架構類型不同：該欄位仍屬於<code translate="no">JSON</code> 欄位，但每個被索引的路徑都會被視為特定的標量、陣列或 JSON 物件類型。</p>
<p>請選擇與該路徑所儲存值相符的轉換類型。若要檢查某種轉換類型是否與特定索引類型相容，請參閱《<a href="/docs/zh-hant/json-indexing.md#compatibility-reference">相容性參考》</a>。</p>
<table>
<thead>
<tr><th>轉換類型</th><th>當路徑值為以下情況時使用…</th><th>範例值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>布林值</td><td><code translate="no">true</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>數值</td><td><code translate="no">99.99</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>字串值</td><td><code translate="no">&quot;electronics&quot;</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>布林值的陣列</td><td><code translate="no">[true, false]</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>數值陣列</td><td><code translate="no">[1.2, 3.14]</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>字串值的陣列</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td>整個 JSON 物件或子物件。自 Milvus 3.0.0 起，對整個 JSON 物件的索引功能已不再推薦使用。</td><td><code translate="no">{&quot;supplier&quot;: {&quot;country&quot;: &quot;USA&quot;}}</code></td></tr>
</tbody>
</table>
<p>若同一路徑下的值類型不一致，僅會將符合轉換後類型的值納入索引。例如，若 `<code translate="no">metadata[&quot;price&quot;]</code> ` 同時包含 `<code translate="no">99.99</code> ` 與 `<code translate="no">&quot;99.99&quot;</code>`，則轉換為 `<code translate="no">DOUBLE</code> ` 類型的索引會包含數值，並跳過字串值。若要在建立索引時轉換字串值，請使用 `<code translate="no">json_cast_function</code>`；請參<a href="/docs/zh-hant/json-indexing.md#example-5-convert-data-type-at-index-time">閱範例 5：在建立索引時轉換資料類型</a>。</p>
<h3 id="Choose-an-index-type" class="common-anchor-header">選擇索引類型<button data-href="#Choose-an-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>選擇轉換類型後，請根據您的查詢模式選擇索引類型。</p>
<table>
<thead>
<tr><th>查詢模式</th><th>建議的索引類型</th><th>轉換類型要求</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td>針對標量值的混合等值與範圍篩選條件</td><td><code translate="no">AUTOINDEX</code></td><td>請使用<code translate="no">BOOL</code> 、<code translate="no">DOUBLE</code> 或<code translate="no">VARCHAR</code> 。</td><td>讓 Milvus 根據值的基數來選擇內部索引佈局。</td></tr>
<tr><td>針對 JSON 陣列內值的篩選條件</td><td><code translate="no">INVERTED</code></td><td>請使用<code translate="no">ARRAY_BOOL</code> 、<code translate="no">ARRAY_DOUBLE</code> 或<code translate="no">ARRAY_VARCHAR</code> 。</td><td>此設定適用於所有陣列轉換類型。</td></tr>
<tr><td>整個物件或子物件索引（已廢棄）</td><td><code translate="no">INVERTED</code> 或<code translate="no">AUTOINDEX</code> （僅為相容性而保留）</td><td>請使用<code translate="no">JSON</code> 。</td><td>此功能僅為相容性而提供。對於新工作負載，請建立路徑特定索引，或考慮使用<a href="/docs/zh-hant/json-shredding.md">JSON 碎片化</a>。</td></tr>
<tr><td>針對數字或可排序字串的範圍篩選器</td><td><code translate="no">STL_SORT</code> 或<code translate="no">AUTOINDEX</code></td><td>請使用<code translate="no">DOUBLE</code> 或<code translate="no">VARCHAR</code> 。</td><td>使用 `<code translate="no">STL_SORT</code> ` 來強制採用排序佈局；若希望系統自動選擇，則使用 `<code translate="no">AUTOINDEX</code> `。</td></tr>
<tr><td>針對低基數值的等值或<code translate="no">IN</code> 篩選條件</td><td><code translate="no">BITMAP</code> 或<code translate="no">AUTOINDEX</code></td><td>請使用<code translate="no">BOOL</code> 或<code translate="no">VARCHAR</code> 。</td><td>使用<code translate="no">BITMAP</code> 來強制採用位圖佈局。對於數值，請使用<code translate="no">AUTOINDEX</code> 或<code translate="no">STL_SORT</code> 。</td></tr>
</tbody>
</table>
<p>如有疑問，請先使用<code translate="no">AUTOINDEX</code> 處理標量路徑。對於陣列轉換類型和文字比對查詢，請明確使用<code translate="no">INVERTED</code> 。使用<code translate="no">INVERTED</code> 或<code translate="no">AUTOINDEX</code> 進行整個物件的 JSON 索引仍受支援，但自 Milvus 3.0.0 起已宣告為過時。</p>
<h3 id="AUTOINDEX" class="common-anchor-header">AUTOINDEX<button data-href="#AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">AUTOINDEX</code> 的行為取決於您指定的<code translate="no">json_cast_type</code> 。在 Milvus 3.0 中，對於 JSON 路徑索引，<code translate="no">AUTOINDEX</code> 不再總是解析為<code translate="no">INVERTED</code> 。</p>
<table>
<thead>
<tr><th>類型轉換</th><th><code translate="no">AUTOINDEX</code> 的行為</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>、<code translate="no">DOUBLE</code> 、<code translate="no">VARCHAR</code></td><td>根據值的基數，在<code translate="no">BITMAP</code> 與<code translate="no">STL_SORT</code> 之間進行選擇。</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code>,<code translate="no">ARRAY_DOUBLE</code>,<code translate="no">ARRAY_VARCHAR</code></td><td>不支援。請明確將 `<code translate="no">INVERTED</code> ` 設為索引類型。</td></tr>
<tr><td><code translate="no">JSON</code></td><td>使用<code translate="no">INVERTED</code> 進行整個物件或子物件的索引。此模式自 Milvus 3.0.0 起已廢棄。</td></tr>
</tbody>
</table>
<p>對於標量轉換類型（<code translate="no">BOOL</code> 、<code translate="no">DOUBLE</code> 及<code translate="no">VARCHAR</code> ），當您希望 Milvus 選擇內部索引佈局時，建議以<code translate="no">AUTOINDEX</code> 作為起點。在建立索引期間，Milvus 會測量 JSON 路徑中<strong>值的基數</strong>。所謂基數，是指該路徑下不同值的數量。</p>
<p>根據基數，Milvus 會從兩種內部佈局中選擇其一：</p>
<ul>
<li><p><strong>低基數</strong>：值經常重複，例如<code translate="no">metadata[&quot;in_stock&quot;]</code> 包含<code translate="no">true</code> 和<code translate="no">false</code> ，或是<code translate="no">metadata[&quot;status&quot;]</code> 僅包含一小組狀態字串。Milvus 會在內部建立<code translate="no">BITMAP</code> 索引，以實現快速的相等性比對與<code translate="no">IN</code> 篩選。</p></li>
<li><p><strong>高基數</strong>：多數值皆為不同值，例如<code translate="no">metadata[&quot;price&quot;]</code> 、<code translate="no">metadata[&quot;created_at&quot;]</code> 或<code translate="no">metadata[&quot;product_id&quot;]</code> 。Milvus 會在內部建立<code translate="no">STL_SORT</code> 索引，以支援快速範圍篩選，例如<code translate="no">&gt;</code> 、<code translate="no">&lt;</code> 、<code translate="no">&gt;=</code> 及<code translate="no">&lt;=</code> 。</p></li>
</ul>
<p>預設的<code translate="no">BITMAP</code> 與<code translate="no">STL_SORT</code> 閾值為<strong>100 個不同值</strong>。您可以透過<code translate="no">bitmap_cardinality_limit</code> 調整此閾值；請參閱<a href="/docs/zh-hant/json-indexing.md#how-do-i-tune-autoindexs-bitmap-vs-stl-sort-threshold">「如何調整 AUTOINDEX 的 BITMAP 與 STL_SORT 閾值？」</a>。</p>
<div class="alert note">
<p><strong>Milvus 3.0 中的行為變更</strong>。在較早版本中，針對 JSON 路徑的<code translate="no">AUTOINDEX</code> 始終會建立<code translate="no">INVERTED</code> 索引。自 Milvus 3.0 起，對於標量轉換類型，<code translate="no">AUTOINDEX</code> 會在<code translate="no">BITMAP</code> 與<code translate="no">STL_SORT</code> 之間進行選擇。對於<code translate="no">JSON</code> ，<code translate="no">AUTOINDEX</code> 仍會使用<code translate="no">INVERTED</code> ，儘管全物件 JSON 索引已遭廢棄。對於陣列轉換類型及文字比對查詢，請明確指定<code translate="no">INVERTED</code> 。</p>
</div>
<h3 id="INVERTED" class="common-anchor-header">INVERTED<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">INVERTED</code> 在需要文字比對查詢或陣列索引時，此選項最適合。它亦仍可用於已廢棄的整物件 JSON 索引。</p>
<p>在以下情況下，請明確指定<code translate="no">INVERTED</code> ：</p>
<ul>
<li><p>您需要對 JSON 陣列內的值建立索引時。</p></li>
<li><p>您維護著針對整個 JSON 物件或子物件的現有索引，並希望明確指定 `<code translate="no">INVERTED</code> ` 的行為。</p></li>
<li><p>您希望使用單一索引類型來處理等值、<code translate="no">IN</code> 、範圍、文字匹配及陣列查詢。為維持相容性，仍支援對整個 JSON 物件的索引，但代價是索引大小會較大。</p></li>
</ul>
<p>對於針對整個 JSON 物件（<code translate="no">json_cast_type=&quot;JSON&quot;</code> ）的現有索引，您可以繼續使用<code translate="no">INVERTED</code> 或<code translate="no">AUTOINDEX</code> 。<code translate="no">AUTOINDEX</code> 會使用<code translate="no">INVERTED</code> 作為此轉換類型。對於新的工作負載，不再建議使用整個物件的 JSON 索引。</p>
<p>有關詳細資訊，請參閱<a href="/docs/zh-hant/inverted.md">INVERTED</a>。</p>
<h3 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">STL_SORT</code> 會將 JSON 路徑中的值以排序順序儲存。此功能針對數值或可排序字串值的範圍篩選器進行了優化。</p>
<p><code translate="no">STL_SORT</code> 僅支援<code translate="no">DOUBLE</code> 和<code translate="no">VARCHAR</code> 這兩種類型轉換。請在以下情況下使用：</p>
<ul>
<li><p>您的篩選條件會將值與<code translate="no">&gt;</code> 、<code translate="no">&lt;</code> 、<code translate="no">&gt;=</code> 或<code translate="no">&lt;=</code> 進行比較。</p></li>
<li><p>索引值具有高基數，例如價格、時間戳記、ID 或可排序代碼。</p></li>
<li><p>您希望強制採用排序佈局，而非讓<code translate="no">AUTOINDEX</code> 自行決定。</p></li>
</ul>
<p><code translate="no">STL_SORT</code> 不支援<code translate="no">BOOL</code> 、<code translate="no">ARRAY_*</code> 或<code translate="no">JSON</code> 轉換類型。請對陣列使用<code translate="no">INVERTED</code> 。現有的整物件索引可繼續使用<code translate="no">INVERTED</code> 或<code translate="no">AUTOINDEX</code> ，但整物件 JSON 索引已遭廢棄。</p>
<p>詳情請參閱<a href="/docs/zh-hant/stl-sort.md">STL_SORT</a>。</p>
<h3 id="BITMAP" class="common-anchor-header">BITMAP<button data-href="#BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BITMAP</code> 會針對 JSON 路徑中的每個不同值建立一個緊湊位圖。此功能針對頻繁重複的值，針對等值比對及<code translate="no">IN</code> 篩選條件進行了優化。</p>
<p><code translate="no">BITMAP</code> 僅支援<code translate="no">BOOL</code> 和<code translate="no">VARCHAR</code> 轉換類型。請在以下情況下使用：</p>
<ul>
<li><p>您的篩選器使用 `<code translate="no">==</code> ` 或 `<code translate="no">IN</code>`。</p></li>
<li><p>索引值的基數較低，例如布林值、狀態值或一小組類別。</p></li>
<li><p>您希望強制採用位圖佈局，而非讓<code translate="no">AUTOINDEX</code> 自行選擇。</p></li>
</ul>
<p><code translate="no">BITMAP</code> 不支援<code translate="no">DOUBLE</code> 、<code translate="no">ARRAY_*</code> 或<code translate="no">JSON</code> 轉換類型。對於數值，請改用<code translate="no">AUTOINDEX</code> 、<code translate="no">STL_SORT</code> 或<code translate="no">INVERTED</code> 。</p>
<p>詳情請參閱<a href="/docs/zh-hant/bitmap.md">BITMAP</a>。</p>
<h3 id="Compatibility-reference" class="common-anchor-header">相容性參考<button data-href="#Compatibility-reference" class="anchor-icon" translate="no">
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
    </button></h3><p>請使用以下矩陣作為支援之<code translate="no">(cast type, index type)</code> 組合的快速參考。</p>
<table>
<thead>
<tr><th>型別轉換</th><th>說明</th><th>範例值</th><th>AUTOINDEX</th><th>INVERTED</th><th>STL_SORT</th><th>BITMAP</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>布林值（<code translate="no">true</code> ／<code translate="no">false</code> ）。</td><td><code translate="no">true</code></td><td>是</td><td>是</td><td>否</td><td>是</td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>數值（整數或浮點數）。</td><td><code translate="no">99.99</code></td><td>是</td><td>是</td><td>是</td><td>否</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>字串值。</td><td><code translate="no">&quot;electronics&quot;</code></td><td>是</td><td>是</td><td>是</td><td>是</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>布林值陣列。</td><td><code translate="no">[true, false]</code></td><td>否</td><td>是</td><td>否</td><td>否</td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>數字陣列。</td><td><code translate="no">[1.2, 3.14]</code></td><td>否</td><td>是</td><td>否</td><td>否</td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>字串陣列。</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td><td>否</td><td>是</td><td>否</td><td>否</td></tr>
<tr><td><code translate="no">JSON</code></td><td>具有自動類型推斷與扁平化功能的完整 JSON 物件或子物件。自 Milvus 3.0.0 起已廢棄。</td><td>任何嵌套物件</td><td>是（已廢棄）</td><td>是（已廢棄）</td><td>否</td><td>否</td></tr>
</tbody>
</table>
<p><code translate="no">AUTOINDEX</code> 對於標記為<code translate="no">No</code> 的儲存格，Milvus 會在建立索引時拒絕該請求。對於陣列轉換類型，請明確使用<code translate="no">INVERTED</code> （ 無法涵蓋陣列）。</p>
<h2 id="Create-a-JSON-index" class="common-anchor-header">建立 JSON 索引<button data-href="#Create-a-JSON-index" class="anchor-icon" translate="no">
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
    </button></h2><p>本節將逐步說明如何為不同結構的 JSON 資料建立索引。所有範例均採用以下範例結構，並假設您已擁有一個包含名為<code translate="no">metadata</code> 的<code translate="no">JSON</code> 欄位的集合。</p>
<h3 id="Sample-JSON-structure" class="common-anchor-header">JSON 範例結構<button data-href="#Sample-JSON-structure" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Basic-setup" class="common-anchor-header">基本設定<button data-href="#Basic-setup" class="anchor-icon" translate="no">
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
    </button></h3><p>以下範例假設您已將名為<code translate="no">client</code> 的<code translate="no">MilvusClient</code> 連接到您的 Milvus 部署，且某個集合中已包含名為<code translate="no">metadata</code> 的<code translate="no">JSON</code> 欄位。若需從頭設定這些項目，請展開下方區塊。</p>
<p><details></p>
<p><summary>連線並建立範例集合</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Define a schema with a JSON field</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;pk&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)
schema.add_field(<span class="hljs-string">&quot;metadata&quot;</span>, DataType.JSON, nullable=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Minimal vector index so the collection can be loaded</span>
vec_index = client.prepare_index_params()
vec_index.add_index(field_name=<span class="hljs-string">&quot;vec&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    schema=schema,
    index_params=vec_index,
)

<span class="hljs-comment"># Insert one row that matches the sample JSON structure above</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[{
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }],
)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>準備一個 index-params 物件，用以收集下方範例中新增的索引定義：</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<p>以下每個範例皆展示一個<code translate="no">index_params.add_index(...)</code> 呼叫。請選擇符合您資料的範例，並在同一個<code translate="no">index_params</code> 物件上呼叫它們。最後，透過單一的<code translate="no">client.create_index(...)</code> 呼叫套用所有設定。詳細資訊請參閱「<a href="/docs/zh-hant/json-indexing.md#apply-the-index">套用索引」</a>。</p>
<h3 id="Example-1-Index-a-top-level-key-with-AUTOINDEX" class="common-anchor-header">範例 1：使用 AUTOINDEX 為頂層鍵建立索引<button data-href="#Example-1-Index-a-top-level-key-with-AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p>為<code translate="no">category</code> 欄位建立索引，以便快速依產品類別進行篩選。透過<code translate="no">AUTOINDEX</code> ，Milvus 會根據資料中存在的不同類別數量，自動選擇<code translate="no">BITMAP</code> 或<code translate="no">STL_SORT</code> 。</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Index-a-nested-key" class="common-anchor-header">範例 2：為嵌套鍵建立索引<button data-href="#Example-2-Index-a-nested-key" class="anchor-icon" translate="no">
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
    </button></h3><p>為供應商聯絡人查詢，對深度嵌套的<code translate="no">email</code> 欄位建立索引。<code translate="no">json_path</code> 參數可接受任何深度的括號表示法。</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;email_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Range-queries-with-STLSORT" class="common-anchor-header">範例 3：使用 STL_SORT 進行範圍查詢<button data-href="#Example-3-Range-queries-with-STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p>當您確定針對某條路徑的查詢主要由範圍比較組成（<code translate="no">&gt;</code> 、<code translate="no">&lt;</code> 、<code translate="no">&gt;=</code> 、<code translate="no">&lt;=</code> ）時，請直接選擇<code translate="no">STL_SORT</code> 。此舉可繞過基數測量，並立即建立已排序的佈局。</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;price_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>建立索引後，類似<code translate="no">metadata[&quot;price&quot;] &gt; 50 AND metadata[&quot;price&quot;] &lt; 100</code> 的範圍查詢將採用二進位搜尋，而非全表掃描。</p>
<h3 id="Example-4-Equality-queries-with-BITMAP" class="common-anchor-header">範例 4：使用 BITMAP 的等值查詢<button data-href="#Example-4-Equality-queries-with-BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p>對於低基數的鍵值（例如狀態碼、布林值或類似枚舉的字串），請直接選擇<code translate="no">BITMAP</code> 。等值查詢與<code translate="no">IN</code> 查詢將轉為位圖運算。</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;in_stock_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;in_stock&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;BOOL&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">BITMAP</code> 對於僅包含少量不同字串值的<code translate="no">status</code> 欄位，此方法同樣非常適用。</p>
<h3 id="Example-5-Convert-data-type-at-index-time" class="common-anchor-header">範例 5：在建立索引時轉換資料類型<button data-href="#Example-5-Convert-data-type-at-index-time" class="anchor-icon" translate="no">
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
    </button></h3><p>當數值資料被錯誤地儲存為字串時，請在建立索引期間使用 `<code translate="no">STRING_TO_DOUBLE</code> ` 將值轉換為數字。</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>如果某一行轉換失敗（例如，<code translate="no">&quot;invalid&quot;</code> 這樣的非數值字串），則在建立索引時會跳過該行。</p>
<h3 id="Example-6-Index-entire-JSON-objects" class="common-anchor-header">範例 6：索引整個 JSON 物件<button data-href="#Example-6-Index-entire-JSON-objects" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert warning">
<p>自 Milvus 3.0.0 起，整個 JSON 物件的索引功能（<code translate="no">json_cast_type=&quot;JSON&quot;</code> ），亦稱為 JSON 平面索引，已宣告為過時功能。為維持相容性，現有索引及新的索引建立請求仍受支援，但此模式不再建議用於新的工作負載。請針對已知的查詢路徑建立 JSON 路徑索引。 對於具有廣泛查詢模式的複雜或不斷演變的 JSON 文件，請考慮使用<a href="/docs/zh-hant/json-shredding.md">JSON 拆分</a>。JSON 拆分不會加速陣列內的值；針對此類查詢，請使用帶有陣列轉換類型的 JSON 路徑索引。</p>
</div>
<p>對於相容的現有工作負載，設定 `<code translate="no">json_cast_type=&quot;JSON&quot;</code> ` 會針對指定路徑的完整結構建立索引。Milvus 會將嵌套物件扁平化為路徑，並自動推斷每個值的類型。該路徑下的所有鍵皆可被搜尋。</p>
<p><code translate="no">AUTOINDEX</code> 會透明地將 `<code translate="no">INVERTED</code> ` 用於 `<code translate="no">JSON</code> ` 轉換類型，因為扁平化與類型推斷均屬於反向索引的功能。</p>
<p>為整個 `<code translate="no">metadata</code> ` 物件建立索引：</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_full_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>或為子物件建立索引，例如所有<code translate="no">supplier</code> 資訊：</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;supplier_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>索引整個物件會增加索引大小。對於具有深度嵌套文件和多樣化查詢模式的新工作負載，請使用路徑特定索引，或考慮使用<a href="/docs/zh-hant/json-shredding.md">JSON 拆分</a>。</p>
<h3 id="Apply-the-index" class="common-anchor-header">套用索引<button data-href="#Apply-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>在新增所有索引參數後，將其套用至您的集合：</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>索引建置會以非同步方式執行。請使用 `<code translate="no">client.describe_index(...)</code> ` 來檢查特定索引的建置狀態。當建置完成後，`<code translate="no">state</code> ` 欄位會顯示 `<code translate="no">Finished</code> `；而 `<code translate="no">total_rows</code>`、`<code translate="no">indexed_rows</code>` 及 `<code translate="no">pending_index_rows</code> ` 則會顯示建置過程中的進度。</p>
<pre><code translate="no" class="language-python">client.describe_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>回應範例：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;json_path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;json_cast_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;VARCHAR&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AUTOINDEX&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category_index&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;total_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;indexed_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;pending_index_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;state&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Finished&quot;</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>一旦<code translate="no">state</code> 回報<code translate="no">Finished</code> ，針對已建立索引的路徑所發出的查詢將自動使用新的索引。</p>
<p>針對<code translate="no">AUTOINDEX</code> 條目，此回應中的<code translate="no">index_type</code> 欄位會顯示為<code translate="no">AUTOINDEX</code> 。Milvus 目前不會公開建置時所選用的底層佈局（<code translate="no">BITMAP</code> 或<code translate="no">STL_SORT</code> ）。請將此選擇視為內部優化：無論選用哪種佈局，針對該路徑的等值查詢、<code translate="no">IN</code> 及範圍查詢皆能正常運作。</p>
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
    </button></h2><h3 id="How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="common-anchor-header">該如何在 AUTOINDEX 與顯式索引類型之間進行選擇？<button data-href="#How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>建議從<code translate="no">AUTOINDEX</code> 開始。它會根據資料的基數選擇合適的佈局，並涵蓋 JSON 路徑上大多數的等值查詢、<code translate="no">IN</code> 以及範圍查詢。在以下情況下請選擇顯式類型：</p>
<ul>
<li><p>您已知查詢模式（例如，若始終執行範圍查詢則使用<code translate="no">STL_SORT</code> ，若始終針對低基數值執行等值查詢則使用<code translate="no">BITMAP</code> ），且希望跳過基數測量。</p></li>
<li><p>您需要文字比對或子字串查詢。請使用<code translate="no">INVERTED</code> 。</p></li>
<li><p>您正在為陣列轉換類型建立索引。請明確使用 `<code translate="no">INVERTED</code> `。</p></li>
<li><p>您正在維護現有的全物件 JSON 索引。出於相容性考量，<code translate="no">INVERTED</code> 與<code translate="no">AUTOINDEX</code> 仍持續受支援，但全物件 JSON 索引功能自 Milvus 3.0.0 起已宣告過時。</p></li>
</ul>
<h3 id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">若查詢的篩選表達式使用的類型與索引的轉換類型不同，會發生什麼情況？<button data-href="#What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>若您的篩選表達式使用的類型與索引的<code translate="no">json_cast_type</code> 不同，Milvus 將不會使用該索引，並可能在資料允許的情況下回退至較慢的暴力掃描。 為獲得最佳效能，請務必讓篩選表達式與索引的轉換類型保持一致。例如，若建立的數值索引使用<code translate="no">json_cast_type=&quot;DOUBLE&quot;</code> ，則僅數值篩選條件才會利用該索引。</p>
<h3 id="What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="common-anchor-header">若 JSON 鍵在不同實體間的資料類型不一致，該如何處理？<button data-href="#What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="anchor-icon" translate="no">
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
    </button></h3><p>資料類型不一致可能會導致<strong>部分索引</strong>。例如，若<code translate="no">metadata[&quot;price&quot;]</code> 同時以數字（<code translate="no">99.99</code> ）和字串（<code translate="no">&quot;99.99&quot;</code> ）形式儲存，且您使用<code translate="no">json_cast_type=&quot;DOUBLE&quot;</code> 建立索引，則僅會對數值進行索引。字串形式的條目將被跳過，且不會出現在篩選結果中。 請在建立索引時使用 `<code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> ` 將字串轉換為數字，或修正原始資料，使所有條目皆採用同一資料類型。</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-key" class="common-anchor-header">我可以在同一個 JSON 鍵上建立多個索引嗎？<button data-href="#Can-I-create-multiple-indexes-on-the-same-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>不可以。Milvus 允許每個<code translate="no">(field, json_path)</code> 對最多建立一個索引，無論轉換類型或索引類型為何。 您無法在同一路徑上同時建立<code translate="no">INVERTED</code> 和<code translate="no">BITMAP</code> 索引，亦無法在同一路徑上建立兩個具有不同轉換類型的索引。不過，您可以針對整個 JSON 物件建立一個索引，並針對該物件內的嵌套鍵建立另一個獨立索引，因為這些屬於不同的路徑。</p>
<h3 id="How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="common-anchor-header">如何調整 AUTOINDEX 的 BITMAP 與 STL_SORT 閾值？<button data-href="#How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="anchor-icon" translate="no">
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
    </button></h3><p>預設情況下，當索引值的<strong>獨特值不超過 100</strong>個時，<code translate="no">AUTOINDEX</code> 會選擇<code translate="no">BITMAP</code> ；否則則選擇<code translate="no">STL_SORT</code> 。您可以透過在索引參數中加入<code translate="no">&quot;bitmap_cardinality_limit&quot;</code> 來覆寫此閾值（範圍：1-1000）：</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># use BITMAP up to 200 distinct values</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>大多數使用者無需調整此設定。若您有中等基數的欄位且希望採用位圖索引，請提高此數值；若希望盡早將<code translate="no">AUTOINDEX</code> 轉為<code translate="no">STL_SORT</code> ，則請降低此數值。當您明確指定<code translate="no">INVERTED</code> 、<code translate="no">STL_SORT</code> 或<code translate="no">BITMAP</code> 時，此設定將被忽略。</p>
