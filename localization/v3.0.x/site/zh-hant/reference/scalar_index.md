---
id: scalar_index.md
related_key: scalar_index
summary: 比較標量索引類型、檢查欄位相容性，並了解自動索引選擇機制。
title: 標量索引
---
<h1 id="Scalar-Index" class="common-anchor-header">標量索引<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>標量索引可加速對非向量欄位的<a href="/docs/zh-hant/boolean.md">篩選作業</a>。請參考此概覽來選擇索引、檢查欄位相容性，並了解自動選取機制。</p>
<p>請考慮為頻繁使用或執行速度較慢的篩選條件中所涉及的欄位建立索引。對於您在建立索引請求中包含的每個欄位，請從以下兩種選項中選擇其一：</p>
<ul>
<li><strong>指定索引類型：</strong>選擇一種與該欄位資料類型及您的篩選條件相容的<strong>索引類型</strong>。</li>
<li><strong>使用<code translate="no">AUTOINDEX</code> ：</strong>將<code translate="no">index_type</code> 設為<code translate="no">AUTOINDEX</code> ，讓 Milvus 自動選擇類型。請參閱<a href="#AUTOINDEX-behavior">AUTOINDEX 的運作方式</a>。</li>
</ul>
<h2 id="Index-types" class="common-anchor-header">索引類型<button data-href="#Index-types" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Supported-predicates"></a>
<a id="Comparisons-and-membership"></a>
<a id="String-patterns"></a></p>
<p>開啟索引指南，查看其支援的篩選條件、參數及建立步驟：</p>
<table>
<thead>
<tr><th>索引類型</th><th>適用於</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/zh-hant/inverted.md">INVERTED</a></td><td>等值、成員資格及範圍篩選器。</td></tr>
<tr><td><a href="/docs/zh-hant/bitmap.md">BITMAP</a></td><td>具有少量不同值的欄位，例如狀態碼。</td></tr>
<tr><td><a href="/docs/zh-hant/stl-sort.md">STL_SORT</a></td><td>值查詢與範圍篩選。</td></tr>
<tr><td><a href="/docs/zh-hant/trie.md">TRIE</a></td><td>針對<code translate="no">VARCHAR</code> 欄位的精確字串查詢與前綴比對。</td></tr>
<tr><td><a href="/docs/zh-hant/ngram.md">NGRAM</a></td><td>LIKE 及符合條件的正規表達式篩選。</td></tr>
<tr><td><a href="/docs/zh-hant/rtree.md">RTREE</a></td><td>針對<code translate="no">GEOMETRY</code> 欄位的空間篩選器。</td></tr>
</tbody>
</table>
<p>在建立索引之前，請先查看下方的欄位相容性表以及所選索引的篩選器支援情況。</p>
<p><details id="Filter-execution">
<summary><strong>篩選器如何使用索引</strong></summary></p>
<p>索引僅用於處理符合條件的表達式；其他篩選器則可掃描資料。字段之間的算術運算與比較操作不會繼承字面值查詢加速功能。關於邏輯組合與 NULL 測試，請參閱《<a href="/docs/zh-hant/basic-operators.md">基本運算子》</a>。</p>
<p></details></p>
<p><a id="Choosing-a-scalar-index"></a></p>
<h2 id="Supported-field-types" class="common-anchor-header">支援的欄位類型<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Array-JSON-and-spatial-predicates"></a>
<a id="JSON-field-indexing"></a></p>
<p>請查閱欄位的資料型別，以了解其支援的顯式索引。在陣列列中，「<code translate="no">ARRAY&lt;T&gt;</code> 」表示「<code translate="no">ARRAY</code> 」且「<code translate="no">element_type=T</code> 」：</p>
<table>
<thead>
<tr><th>欄位類型</th><th>明示索引類型</th><th>條件</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code></td><td>標量布林欄位不支援<code translate="no">STL_SORT</code> 。</td></tr>
<tr><td><code translate="no">INT8</code>,<code translate="no">INT16</code>,<code translate="no">INT32</code>,<code translate="no">INT64</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code>,<code translate="no">STL_SORT</code></td><td><code translate="no">BITMAP</code> 在主鍵欄位上不可用。</td></tr>
<tr><td><code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td><td>無法使用顯式<code translate="no">BITMAP</code> 。</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code>,<code translate="no">STL_SORT</code>,<code translate="no">TRIE</code>,<code translate="no">NGRAM</code></td><td><code translate="no">BITMAP</code> 在主鍵欄位上不可用。請參閱「<a href="#String-pattern-indexes">透過篩選器選擇索引</a>」。</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td>請參閱<a href="/docs/zh-hant/timestamptz-field.md">TIMESTAMPTZ 欄位</a>。</td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td>請參閱<a href="/docs/zh-hant/rtree.md">RTREE</a>。</td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code></td><td>請參閱「<a href="/docs/zh-hant/array_data_type.md#Array-index-support">陣列索引支援</a>」。</td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code>,<code translate="no">ARRAY&lt;INT16&gt;</code>,<code translate="no">ARRAY&lt;INT32&gt;</code>,<code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code></td><td>請參閱「<a href="/docs/zh-hant/array_data_type.md#Array-index-support">陣列索引支援</a>」。</td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>,<code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">INVERTED</code></td><td>請參閱「<a href="/docs/zh-hant/array_data_type.md#Array-index-support">陣列索引支援</a>」。</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code></td><td>請參閱「<a href="/docs/zh-hant/array_data_type.md#Array-index-support">陣列索引支援</a>」。</td></tr>
<tr><td><code translate="no">JSON</code></td><td>取決於索引路徑和轉換類型。</td><td>請檢查<a href="/docs/zh-hant/json-indexing.md#Understand-cast-types">JSON 路徑的相容性與需求</a>。</td></tr>
<tr><td>StructArray 的非向量子欄位</td><td>取決於子欄位的資料型別。</td><td>請分別索引子欄位；<code translate="no">BOOL</code> 的子欄位無法使用顯式的 `<code translate="no">STL_SORT</code>`。請參閱<a href="/docs/zh-hant/index-structarray-fields.md#Create-scalar-indexes">子欄位規則</a>。</td></tr>
<tr><td><code translate="no">TEXT</code></td><td>無</td><td>使用者建立的標量索引（包括 `<code translate="no">AUTOINDEX</code>`）無法使用。</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>標量索引（包括 `<code translate="no">AUTOINDEX</code>`）不支援遞迴的 `ARRAY` 欄位或含有可為空元素的陣列。請參閱<a href="/docs/zh-hant/array_data_type.md#Array-index-support">「陣列索引對一般陣列</a>篩選<a href="/docs/zh-hant/array_data_type.md#Array-index-support">器的支援</a>」及「<a href="/docs/zh-hant/index-structarray-fields.md#Create-scalar-indexes">StructArray 欄位的索引</a>」以了解子欄位規則。</p>
</blockquote>
</div>
<p><details id="String-pattern-indexes">
<summary><strong>為 VARCHAR 篩選條件選擇索引</strong></summary></p>
<p>對於<code translate="no">VARCHAR</code> 欄位，請根據您的篩選條件比較相容的索引：</p>
<table>
<thead>
<tr><th>篩選需求</th><th>索引指南與條件</th></tr>
</thead>
<tbody>
<tr><td>精確字串查詢與前綴</td><td><a href="/docs/zh-hant/trie.md#Queries-accelerated-by-TRIE">TRIE</a>、<a href="/docs/zh-hant/stl-sort.md#Queries-accelerated-by-STLSORT">STL_SORT</a> 或<a href="/docs/zh-hant/inverted.md#Queries-accelerated-by-INVERTED">INVERTED</a>。</td></tr>
<tr><td>少數不同的字串值</td><td><a href="/docs/zh-hant/bitmap.md#Queries-accelerated-by-BITMAP">BITMAP</a>；會根據索引值評估模式。</td></tr>
<tr><td>LIKE 或 正則表達式，搭配適當的固定字面量</td><td>在 `<code translate="no">VARCHAR</code> ` 欄位或 JSON 字串路徑上<a href="/docs/zh-hant/ngram.md#Queries-accelerated-by-NGRAM">使用 NGRAM</a>，須符合語素長度及重新檢查條件。</td></tr>
<tr><td>不含可用固定字面量的正規表達式</td><td>該查詢可能會掃描資料或評估許多索引值；請檢查所選索引的條件。</td></tr>
</tbody>
</table>
<p><code translate="no">VARCHAR</code> 上的範圍查詢會採用字串排序，即使字串中包含數字亦然。索引的使用取決於查詢規劃、可萃取的字面量、基數以及資料分佈。有關規劃規則，請參閱<a href="/docs/zh-hant/pattern-matching.md#Accelerate-pattern-matching-with-indexes">《模式匹配》</a>。對於 JSON 字串路徑，請參閱《<a href="/docs/zh-hant/json-indexing.md">JSON 索引</a>》中的路徑與型別轉換要求。</p>
<p></details></p>
<p><a id="How-AUTOINDEX-selects"></a></p>
<h2 id="AUTOINDEX-behavior" class="common-anchor-header">AUTOINDEX 的行為<button data-href="#AUTOINDEX-behavior" class="anchor-icon" translate="no">
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
    </button></h2><p>請在每個選取欄位的索引定義中，將 `<code translate="no">index_type</code> ` 設定為 `<code translate="no">AUTOINDEX</code> `。Milvus 會根據資料型別，以及在適用情況下，依據每次建立索引時各欄位的獨特值數量來選擇型別：</p>
<table>
<thead>
<tr><th>欄位類型</th><th>預設選項</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>,<code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>,<code translate="no">INT16</code>,<code translate="no">INT32</code>,<code translate="no">INT64</code>,<code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code>,<code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> 若獨特值少於 100 個；否則為<code translate="no">STL_SORT</code> 。</td></tr>
<tr><td><code translate="no">ARRAY</code> 其中<code translate="no">element_type</code> 設定為<code translate="no">INT8</code> 、<code translate="no">INT16</code> 、<code translate="no">INT32</code> 、<code translate="no">INT64</code> 、<code translate="no">FLOAT</code> 、<code translate="no">DOUBLE</code> ，或<code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> 若元素數量少於 100 個；否則請使用<code translate="no">INVERTED</code> 。</td></tr>
<tr><td><code translate="no">JSON</code> 路徑預設會轉換為<code translate="no">BOOL</code> 、<code translate="no">DOUBLE</code> 或<code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code> 在 3.0 版本中預設為此。啟用<a href="/docs/zh-hant/json-indexing.md#Index-requirements">JSON 選配設定</a>後，將採用上述的標量位圖／排序策略。</td></tr>
<tr><td><code translate="no">JSON</code> 路徑會被轉換為<code translate="no">ARRAY_BOOL</code> 、<code translate="no">ARRAY_DOUBLE</code> 或<code translate="no">ARRAY_VARCHAR</code></td><td>請使用顯式的<code translate="no">INVERTED</code> ；預設的 3.0.6 映射會拒絕針對這些轉換進行自動選取。</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>不支援。</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>對於受支援的標量欄位，省略 `<code translate="no">index_type</code> ` 的索引定義也會請求自動選取。未包含在請求中的欄位將不會被建立索引。</p>
</blockquote>
</div>
<p><a id="Version-compatibility"></a></p>
<p><details>
<summary><strong>選取詳情</strong></summary></p>
<ul>
<li><strong>內部佈局：</strong> <code translate="no">AUTOINDEX</code> 可選取無法作為顯式選項的佈局，例如<code translate="no">FLOAT</code> 和<code translate="no">DOUBLE</code> 的位圖索引。基於基數的策略在內部稱為<code translate="no">HYBRID</code> ；您無法直接指定它。所選的索引決定哪些篩選器可以使用它。</li>
<li><strong>基數閾值：</strong> <a id="Cardinality-threshold"></a>將<code translate="no">bitmap_cardinality_limit</code> （範圍：1–1000）設為特定值以覆寫預設閾值。低於該閾值的值將使用位圖；等於或高於該閾值的值，則套用該資料型別的高基數佈局。明示的<code translate="no">INVERTED</code> 、<code translate="no">STL_SORT</code> 及<code translate="no">BITMAP</code> 建置會繞過基數為基礎的選取機制，並忽略此閾值。</li>
<li><strong>管理員覆寫設定：</strong>透過<code translate="no">scalarAutoIndex.params.build</code> 變更類型映射。<code translate="no">scalarAutoIndex.enable=false</code> （預設）仍允許顯式使用<code translate="no">AUTOINDEX</code> ；<code translate="no">true</code> 亦會對有效的手動請求套用自動選取機制。</li>
</ul>
<p></details></p>
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
    </button></h2><p><a id="Performance-considerations"></a>
<a id="Estimating-memory-requirements"></a></p>
<p>為您的下一項任務選擇指南：</p>
<ul>
<li><strong>建立索引：</strong>請參閱<a href="#Index-types">索引指南</a>以了解參數及建立範例。</li>
<li><strong>規劃資源：</strong>請參閱<a href="/docs/zh-hant/stl-sort.md#Memory-considerations">STL_SORT</a>、<a href="/docs/zh-hant/bitmap.md#Memory-considerations">BITMAP</a>、<a href="/docs/zh-hant/inverted.md#Memory-considerations">INVERTED</a> 或<a href="/docs/zh-hant/ngram.md#Memory-considerations">NGRAM</a> 的記憶體指南。透過代表性資料與篩選條件，比較記憶體使用量、建置時間及查詢延遲。</li>
<li><strong>配置文字搜尋：</strong> <a href="/docs/zh-hant/keyword-match.md">文字比對（Text Match</a>）與<a href="/docs/zh-hant/full-text-search.md">全文搜尋（Full Text Search</a>）涵蓋文字分析、BM25、<code translate="no">TEXT_MATCH</code> 以及<code translate="no">PHRASE_MATCH</code> 。標量<code translate="no">INVERTED</code> 索引不支援這些機制。</li>
</ul>
<p><details id="Drop-index-compatibility">
<summary><strong>在較舊版本的 Milvus 上刪除標量索引</strong></summary></p>
<p>在 Milvus v2.6.3 或更早版本中，請先釋放集合，再刪除標量索引。自 v2.6.4 起，您無需釋放集合即可刪除標量索引。</p>
<p></details></p>
