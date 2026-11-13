---
id: scalar_index.md
related_key: scalar_index
summary: 標量索引可加速對非向量欄位的篩選作業。本參考文件說明 Milvus 如何選取標量索引、您可以指定哪些索引類型，以及各索引所支援的資料類型。
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
    </button></h1><p>標量索引可加速對非向量欄位的篩選，例如類別、價格、時間戳記和位置。當篩選表達式縮小搜尋範圍時，標量索引能讓 Milvus 無需掃描該欄位，即可定位符合條件的實體。</p>
<p>若不確定該選擇哪種索引，請使用 `<code translate="no">AUTOINDEX</code>`。僅當您需要特定行為時，才需手動指定索引類型。</p>
<h2 id="Choosing-a-scalar-index" class="common-anchor-header">選擇標量索引<button data-href="#Choosing-a-scalar-index" class="anchor-icon" translate="no">
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
    </button></h2><p>下表列出了當您使用 `<code translate="no">AUTOINDEX</code>` 時，Milvus 預設選用的索引，以及您可針對每種資料類型手動指定的索引類型。</p>
<table>
<thead>
<tr><th>資料類型</th><th>AUTOINDEX 預設值</th><th>手動索引類型</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>,<code translate="no">INT16</code>,<code translate="no">INT32</code>,<code translate="no">INT64</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code>,<code translate="no">STL_SORT</code>,<code translate="no">TRIE</code>,<code translate="no">NGRAM</code>,<code translate="no">FMINDEX</code></td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">JSON</code> 搭配類型化的標量或陣列轉換</td><td><code translate="no">HYBRID</code></td><td>取決於<code translate="no">json_cast_type</code> ；請參閱<a href="#JSON-field-indexing">JSON 欄位索引</a>。</td></tr>
<tr><td><code translate="no">JSON</code> 搭配<code translate="no">json_cast_type=&quot;JSON&quot;</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>、<code translate="no">BITMAP</code> 、<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code> 透過<code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>、<code translate="no">BITMAP</code> 、<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>,<code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>不支援</td><td>無</td></tr>
</tbody>
</table>
<p><code translate="no">HYBRID</code> 是一種內部策略，並非您可以直接指定的類型。請參閱<a href="#How-AUTOINDEX-selects">「AUTOINDEX 的選取方式」</a>。</p>
<p>適用以下限制：</p>
<ul>
<li><strong>主鍵：</strong> <code translate="no">BITMAP</code> 無法用於主鍵欄位。</li>
<li><strong>陣列：</strong>遞迴陣列及包含可為空元素的陣列不支援標量索引，包括<code translate="no">AUTOINDEX</code> 。一般陣列支援布林值、整數、浮點數及 VARCHAR 元素。</li>
<li><strong>結構體陣列：</strong>需分別對標量子欄位建立索引。其支援方式可能與一般陣列不同；例如，布林型結構體子欄位不支援顯式的<code translate="no">STL_SORT</code> 。</li>
<li><strong>TEXT：</strong>使用者自訂的標量索引（包括 `<code translate="no">AUTOINDEX</code>`）無法使用。文字分析與 BM25 搜尋採用各自獨立的機制。</li>
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
    </button></h2><table>
<thead>
<tr><th>索引類型</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>通用等值、成員關係及範圍篩選。</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>具有少量不同值的欄位；緊湊的位元級篩選。</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>已排序值的查詢與範圍篩選。</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>字串相等性與前綴比對。</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>透過縮小候選範圍，對字串執行 LIKE 及正規表達式比對。</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>精確的前綴、後綴及中綴子字串比對。</td></tr>
<tr><td><code translate="no">RTREE</code></td><td>針對 GEOMETRY 欄位的空間篩選。</td></tr>
</tbody>
</table>
<p>有關建立範例、索引參數及受支援的查詢，請參閱<a href="/docs/zh-hant/bitmap.md">BITMAP</a>、<a href="/docs/zh-hant/inverted.md">INVERTED</a>、<a href="/docs/zh-hant/ngram.md">NGRAM</a>、<a href="/docs/zh-hant/stl-sort.md">STL_SORT</a>、<a href="/docs/zh-hant/trie.md">TRIE</a>、<a href="/docs/zh-hant/fmindex.md">FMINDEX</a> 及<a href="/docs/zh-hant/rtree.md">RTREE</a>。</p>
<h2 id="How-AUTOINDEX-selects" class="common-anchor-header">AUTOINDEX 的選擇方式<button data-href="#How-AUTOINDEX-selects" class="anchor-icon" translate="no">
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
    </button></h2><p>在<code translate="no">AUTOINDEX</code> 下，Milvus會根據欄位類型、伺服器設定，以及某些欄位的不同值數量（基數）來選擇索引。預設選項列於「<a href="#Choosing-a-scalar-index">選擇標量索引</a>」中。</p>
<p>對於大多數欄位，<code translate="no">AUTOINDEX</code> 會採用內建的「<code translate="no">HYBRID</code> 」策略，根據獨特值數量（基數）來選擇索引：</p>
<ul>
<li><strong><code translate="no">BITMAP</code></strong> 當建構包含少於 100 個不同值時。</li>
<li><strong><code translate="no">STL_SORT</code></strong> 當建構包含 100 個或更多不同值時。</li>
</ul>
<p>陣列索引採用獨立的相容性政策：其高基數分支在叢集支援時使用「<code translate="no">STL_SORT</code> 」，否則使用「<code translate="no">INVERTED</code> 」。請參閱<a href="#Version-compatibility">「版本相容性</a>」。</p>
<p><code translate="no">HYBRID</code> 此選項僅供內部使用 — 您無法直接指定。內部選項亦可使用該欄位無法作為顯式選項的索引，例如針對浮點數的位圖索引。</p>
<blockquote>
<p>這些選取條件為預設值。管理員可透過<code translate="no">scalarAutoIndex.params.build</code> 進行變更。<code translate="no">scalarAutoIndex.enable</code> 的預設值為<code translate="no">false</code> ，此設定在未指定索引類型時，仍允許明確指定<code translate="no">AUTOINDEX</code> 及選取條件；若將其設定為<code translate="no">true</code> ，則會將自動選取功能套用至原本有效的手動請求。</p>
</blockquote>
<h2 id="JSON-field-indexing" class="common-anchor-header">JSON 欄位索引<button data-href="#JSON-field-indexing" class="anchor-icon" translate="no">
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
    </button></h2><p>若要對 JSON 值建立索引，請指定 `<code translate="no">json_cast_type</code> ` 以標示要建立索引的值類型。此參數無論是自動或手動建立索引皆為必填。請使用 `<code translate="no">json_path</code> ` 來識別路徑；若省略，Milvus 將使用請求中提供的欄位名稱。</p>
<table>
<thead>
<tr><th>json_cast_type</th><th>AUTOINDEX 預設值</th><th>手動索引類型</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code>,<code translate="no">STL_SORT</code>,<code translate="no">NGRAM</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
</tbody>
</table>
<p><code translate="no">JSON</code> 轉換會選擇完整的 JSON 索引，而非類型化的標量路徑索引，並將<code translate="no">AUTOINDEX</code> 的預設值從<code translate="no">HYBRID</code> 變更為<code translate="no">INVERTED</code> 。</p>
<p>可選的 `<code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> ` 會針對 `<code translate="no">DOUBLE</code> ` 轉換進行字串值轉換。此轉換無法與其他轉換類型併用。無論是 `<code translate="no">TRIE</code> ` 還是 `<code translate="no">FMINDEX</code> `，均不支援 JSON 欄位。</p>
<h2 id="Supported-predicates" class="common-anchor-header">受支援的謂詞<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>以下表格列出各索引可協助評估的謂詞。<strong>索引支援並不保證 Milvus 會針對每個查詢都使用該索引。</strong>當索引不適用於特定表達式或模式時，Milvus 仍可掃描欄位資料。</p>
<h3 id="Comparisons-and-membership" class="common-anchor-header">比較與成員關係<button data-href="#Comparisons-and-membership" class="anchor-icon" translate="no">
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
    </button></h3><p>相等與成員關係運算子包括<code translate="no">==</code> 、<code translate="no">!=</code> 、<code translate="no">in</code> 以及<code translate="no">not in</code> 。範圍比較運算子包括<code translate="no">&lt;</code> 、<code translate="no">&lt;=</code> 、<code translate="no">&gt;</code> 、<code translate="no">&gt;=</code> ，以及諸如<code translate="no">10 &lt;= price &lt; 50</code> 之類的表達式。</p>
<table>
<thead>
<tr><th>索引類型</th><th>欄位資料類型</th><th>索引支援的謂詞</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td><code translate="no">BOOL</code></td><td>相等與成員關係</td></tr>
<tr><td><code translate="no">INVERTED</code></td><td>整數、<code translate="no">FLOAT</code> 、<code translate="no">DOUBLE</code> 、<code translate="no">VARCHAR</code></td><td>相等、成員關係與範圍</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td><code translate="no">BOOL</code></td><td>相等與成員關係</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>整數、<code translate="no">VARCHAR</code></td><td>等價性、成員關係與區間</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>整數、<code translate="no">FLOAT</code> 、<code translate="no">DOUBLE</code> 、<code translate="no">TIMESTAMPTZ</code> 、<code translate="no">VARCHAR</code></td><td>相等性、成員關係與範圍</td></tr>
<tr><td><code translate="no">TRIE</code></td><td><code translate="no">VARCHAR</code></td><td>相等性、成員關係與範圍；範圍評估可能會遍歷多個索引字串</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td><code translate="no">VARCHAR</code></td><td>僅限字串模式；不支援直接相等、成員關係或範圍查詢</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">VARCHAR</code></td><td>僅限字串模式；不支援直接的相等性、成員關係或範圍查詢</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td>空間謂詞，如下所列</td></tr>
<tr><td><code translate="no">AUTOINDEX</code></td><td>支援的標量類型</td><td>取決於所選的索引。內部<code translate="no">HYBRID</code> 篩選會利用其位圖、排序或反轉索引的功能。</td></tr>
</tbody>
</table>
<p>VARCHAR 範圍會比較字串值，而非將其解讀為數字。此表僅描述與字面值的比較；這並不意味著算術表達式或兩個欄位之間的比較也能獲得相同的索引加速效果。</p>
<h3 id="String-patterns" class="common-anchor-header">字串模式<button data-href="#String-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>此表格適用於 VARCHAR 欄位。對於 JSON 字串路徑，請使用 JSON 索引表格所支援的索引及<code translate="no">VARCHAR</code> 轉換；將適用相應的字串行為。</p>
<ul>
<li><strong>是：</strong>索引會返回完全匹配的結果。</li>
<li><strong>檢查索引值：</strong>Milvus 會將模式與儲存於索引中的字串進行比對，此過程可能需要遍歷許多不同的字串。</li>
<li><strong>候選項：</strong>索引會縮小可能的匹配範圍，然後由 Milvus 檢查原始值。</li>
<li><strong>掃描：</strong>索引無法滿足該謂詞；Milvus 會使用另一條合資格的路徑，或掃描該欄位。</li>
</ul>
<table>
<thead>
<tr><th>索引類型</th><th>前綴<code translate="no">like &quot;abc%&quot;</code></th><th>後綴<code translate="no">like &quot;%abc&quot;</code></th><th>子字串<code translate="no">like &quot;%abc%&quot;</code></th><th>一般 LIKE<code translate="no">like &quot;a%b_c&quot;</code></th><th>正規表達式<code translate="no">=~ &quot;a.*b&quot;</code></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>是</td><td>掃描</td><td>掃描</td><td>是</td><td>掃描</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>檢查索引值</td><td>檢查索引值</td><td>檢查索引值</td><td>檢查索引值</td><td>檢查索引值</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>是</td><td>檢查索引值</td><td>檢查索引值</td><td>檢查索引值</td><td>檢查索引值</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>是</td><td>檢查索引值</td><td>檢查索引值</td><td>檢查索引值</td><td>檢查索引值</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>候選人</td><td>候選詞</td><td>候選詞；在已設定的詞形長度範圍內與字面值完全匹配</td><td>候選詞</td><td>候選詞</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>是</td><td>是</td><td>是</td><td>候選人</td><td>候選項</td></tr>
</tbody>
</table>
<p>這些條目描述了查詢規劃後的運算子。Milvus 可以將字面值 LIKE 模式簡化為等值比對，並將簡單的錨點正規表達式簡化為等值、前綴或後綴比對；例如，<code translate="no">name =~ &quot;^abc$&quot;</code> 會轉為等值比對，並遵循等值比對表。</p>
<p><code translate="no">INVERTED</code> 即使較複雜的 LIKE 模式可以使用索引，Milvus 仍會將簡單的後綴和子字串形式視為掃描。<code translate="no">NGRAM</code> 要求字面文字長度至少為<code translate="no">min_gram</code> 個字元；一般的 LIKE 則要求每個非空的字面片段都必須達到該最低長度，而正規表達式的加速效果則取決於能否提取合適的字面值。 否則，Milvus 會掃描資料。當模式提供的有用篩選條件甚少，或透過索引解析的成本過高時，<code translate="no">FMINDEX</code> 亦可能選擇進行掃描。</p>
<p>這些屬於字串值謂詞。基於標記的函數（例如<code translate="no">TEXT_MATCH</code> 和<code translate="no">PHRASE_MATCH</code> ）會使用透過欄位屬性配置的文字比對索引；若選擇標量型<code translate="no">INVERTED</code> 索引，則無法啟用這些函數。</p>
<h3 id="Array-JSON-and-spatial-predicates" class="common-anchor-header">陣列、JSON 和空間謂詞<button data-href="#Array-JSON-and-spatial-predicates" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>索引類型</th><th>資料型別或轉換</th><th>可使用該索引的謂詞</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code>、<code translate="no">BITMAP</code> 、<code translate="no">STL_SORT</code> ，或符合資格的<code translate="no">AUTOINDEX</code> 選項</td><td>元素類型受支援的普通陣列</td><td><code translate="no">ARRAY_CONTAINS</code>、<code translate="no">ARRAY_CONTAINS_ANY</code> 、<code translate="no">ARRAY_CONTAINS_ALL</code></td><td>不依元素位置進行比對。但仍受索引／類型限制。</td></tr>
<tr><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td><td>由布林值、整數或 VARCHAR 值組成的普通陣列</td><td>全陣列<code translate="no">==</code> 以及<code translate="no">!=</code></td><td>可使用索引候選項，隨後對原始陣列進行檢查。浮點數陣列將回退至掃描；位圖索引不支援此候選路徑。</td></tr>
<tr><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code> 、<code translate="no">STL_SORT</code> ，或符合資格的<code translate="no">AUTOINDEX</code> 選取項</td><td>轉換為<code translate="no">BOOL</code> 、<code translate="no">DOUBLE</code> 或<code translate="no">VARCHAR</code></td><td>與轉換類型相符的比較與成員關係</td><td>索引路徑與轉換結果必須與查詢相符。字串模式遵循前表規定。</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>轉換為<code translate="no">VARCHAR</code></td><td>LIKE 及正規表達式模式</td><td>採用與 VARCHAR NGRAM 索引相同的模式適用性規則。</td></tr>
<tr><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code> ，或符合資格的<code translate="no">AUTOINDEX</code> 選項</td><td>轉換為<code translate="no">ARRAY_BOOL</code> 、<code translate="no">ARRAY_DOUBLE</code> 或<code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">JSON_CONTAINS</code>、<code translate="no">JSON_CONTAINS_ANY</code> 、<code translate="no">JSON_CONTAINS_ALL</code></td><td>需元素類型相容。混合類型或嵌套陣列的運算元可能會回退至掃描模式。</td></tr>
<tr><td><code translate="no">INVERTED</code> 帶有轉換<code translate="no">JSON</code></td><td>完整的 JSON 索引</td><td>對受支援的標量路徑進行比較與成員關係檢查；支援字串模式；對受支援的陣列路徑進行 JSON 包含檢查</td><td>字串路徑遵循「反轉」行為。陣列包含運算需元素類型相容。</td></tr>
<tr><td>JSON 路徑索引與完整 JSON 索引</td><td>索引 JSON 路徑</td><td><code translate="no">exists</code></td><td>用以測試路徑是否存在，這與測試其值或整個欄位是否為 null 有所不同。</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td><code translate="no">ST_EQUALS</code>,<code translate="no">ST_INTERSECTS</code>,<code translate="no">ST_CONTAINS</code>,<code translate="no">ST_WITHIN</code>,<code translate="no">ST_TOUCHES</code>,<code translate="no">ST_OVERLAPS</code>,<code translate="no">ST_CROSSES</code>,<code translate="no">ST_DWITHIN</code></td><td>使用邊界框尋找候選元素，然後檢查確切的空間關係。<code translate="no">ST_ISVALID</code> 並未使用 RTREE。</td></tr>
</tbody>
</table>
<p>陣列包含性的支援並不意味著會針對特定位置的元素（例如<code translate="no">values[0]</code> ）或陣列長度進行索引查詢。整個陣列的相等性檢查還必須驗證順序與長度，而這僅憑元素是否屬於陣列本身是無法確定的。</p>
<p><code translate="no">IS NULL</code> 以及<code translate="no">IS NOT NULL</code> 會使用有效性資訊，且不要求特定的標量索引類型。您可以將謂詞與<code translate="no">and</code> 、<code translate="no">or</code> 及<code translate="no">not</code> 結合使用；每個部分皆可採用其適用的執行路徑。</p>
<h2 id="Version-compatibility" class="common-anchor-header">版本相容性<button data-href="#Version-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>大多數標量索引 —<code translate="no">BITMAP</code> 、<code translate="no">INVERTED</code> 、<code translate="no">STL_SORT</code> 、<code translate="no">TRIE</code> 以及建立於一般標量欄位上的<code translate="no">NGRAM</code> — 均無版本要求。以下要求僅適用於較新的組合：建立於陣列欄位上的索引、JSON-path 索引，以及<code translate="no">FMINDEX</code> 。</p>
<p>這些要求採用標量索引引擎的版本號，這是一個內部功能計數器，與 Milvus 軟體的發行版本號不同。</p>
<table>
<thead>
<tr><th>功能</th><th>要求</th></tr>
</thead>
<tbody>
<tr><td>明確<code translate="no">FMINDEX</code></td><td>標量索引引擎版本 5 或更新</td></tr>
<tr><td>明確<code translate="no">STL_SORT</code> 適用於一般陣列</td><td>標量索引引擎版本 3 或更新，且已啟用陣列排序支援</td></tr>
<tr><td><code translate="no">HYBRID</code> 針對一般陣列選用 `<code translate="no">STL_SORT</code> `</td><td>標量索引引擎版本 5 或更新，且已啟用陣列排序支援</td></tr>
<tr><td><code translate="no">BITMAP</code>，或對 JSON 標量路徑使用 `<code translate="no">STL_SORT</code>` 或 `<code translate="no">HYBRID</code> `</td><td>標量索引引擎版本 4 或更新</td></tr>
<tr><td><code translate="no">STL_SORT</code> 或在具類型標示的 JSON 陣列路徑上使用<code translate="no">HYBRID</code> </td><td>標量索引引擎版本 3 或更新，且已啟用陣列排序支援</td></tr>
</tbody>
</table>
<p>若未滿足陣列或 JSON 相容性要求，受影響的自動請求可回退至<code translate="no">INVERTED</code> ；而針對不支援組合的顯式請求則會失敗。對於普通陣列的<code translate="no">HYBRID</code> ，高基數分支將繼續使用<code translate="no">INVERTED</code> ，直到可使用排序索引為止。</p>
<h2 id="Performance-considerations" class="common-anchor-header">效能考量<button data-href="#Performance-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>索引效能取決於資料分佈以及應用程式所使用的篩選條件。基數、字串長度、陣列長度以及匹配實體的數量，皆會影響記憶體使用量與查詢延遲。請使用具代表性的資料和篩選表達式來比較索引，並一併測量記憶體使用量、建立時間及查詢延遲。</p>
<h3 id="Estimating-memory-requirements" class="common-anchor-header">估算記憶體需求<button data-href="#Estimating-memory-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>以下公式可提供標量索引在載入後（且已停用記憶體映射）所需記憶體的粗略估算。<code translate="no">STL_SORT</code> 公式假設為不含空值的普通標量欄位。</p>
<ul>
<li><code translate="no">N</code>: 實體數量。</li>
<li><code translate="no">D</code>: 不同值的數量。</li>
<li><code translate="no">l</code>: 不同字串的平均長度（以<strong>位元組</strong>為單位）。</li>
<li><code translate="no">S</code>: 儲存壓縮前的建置索引大小，單位為<strong>位元組</strong>。</li>
</ul>
<table>
<thead>
<tr><th>索引類型</th><th>粗略記憶體估算值（以位元組為單位）</th><th>直觀理解</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">STL_SORT</code> 關於<code translate="no">INT8</code> 、<code translate="no">INT16</code> 、<code translate="no">INT32</code> ，或<code translate="no">FLOAT</code></td><td><code translate="no">12 * N</code></td><td>每個實體約 12 位元組。</td></tr>
<tr><td><code translate="no">STL_SORT</code> 在<code translate="no">INT64</code> 、<code translate="no">DOUBLE</code> 或<code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">20 * N</code></td><td>若為較大的數值，每個實體約佔 20 位元組。</td></tr>
<tr><td><code translate="no">STL_SORT</code> 在<code translate="no">VARCHAR</code></td><td><code translate="no">8 * N + (l + 16) * D</code></td><td>重複的字串會共用儲存空間，因此獨特的字串越少，通常代表佔用的記憶體越少。</td></tr>
<tr><td><code translate="no">BITMAP</code>，使用密集位圖</td><td><code translate="no">(D + 1) * N / 8</code></td><td>每個不同值大約需要一個位元，外加一個位圖來追蹤有效的實體。</td></tr>
<tr><td><code translate="no">INVERTED</code> 或<code translate="no">NGRAM</code></td><td><code translate="no">S</code></td><td>以已建立索引的大小為起點。</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">2 * S</code></td><td>預留約為已建立索引大小兩倍的空間。</td></tr>
</tbody>
</table>
<p>將結果除以<code translate="no">1024 * 1024</code> ，以將位元組轉換為<strong>MiB</strong>。例如，一個包含一百萬個非空<code translate="no">INT64</code> 值的<code translate="no">STL_SORT</code> 索引，其主要資料結構約需<strong>19 MiB</strong>。對於每個字串皆為唯一的 VARCHAR 欄位，估算可簡化為<code translate="no">(l + 24) * N</code> ；一百萬個唯一字串，平均每個 32 位元組，約需<strong>53 MiB</strong>。</p>
<p>BITMAP 公式描述的是密集位圖儲存方式；在 64 位元系統上啟用可選的偏移量快取，會增加約<code translate="no">8 * N</code> 位元組的空間。對於<code translate="no">INVERTED</code> 、<code translate="no">NGRAM</code> 以及<code translate="no">FMINDEX</code> ，請針對代表性資料建立索引以獲得<code translate="no">S</code> —— 原始資料大小不能替代已建立索引的大小。 對於<code translate="no">AUTOINDEX</code> ，請使用實際選取的索引公式，並針對每個區段進行估算，然後將所有已載入區段及複本的估算值相加。</p>
<p>這些是近似的規劃數值，並非記憶體上限。它們未包含建置、載入及查詢過程中使用的臨時記憶體，且對於字串和位圖索引而言，其數值對唯一值及資料分佈的敏感度，高於數值型索引<code translate="no">STL_SORT</code> 。不保證任何固定的準確度百分比。 記憶體映射、舊版索引格式、陣列及 JSON 欄位需另行進行量測。在為部署配置資源前，請使用具代表性的資料和查詢檢查實際記憶體使用量，並為尖峰使用量預留餘裕。</p>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>有關索引建立與配置的範例，請參閱<a href="/docs/zh-hant/bitmap.md">BITMAP</a>、<a href="/docs/zh-hant/inverted.md">INVERTED</a>、<a href="/docs/zh-hant/ngram.md">NGRAM</a>、<a href="/docs/zh-hant/stl-sort.md">STL_SORT</a>、<a href="/docs/zh-hant/trie.md">TRIE</a>、<a href="/docs/zh-hant/fmindex.md">FMINDEX</a> 及<a href="/docs/zh-hant/rtree.md">RTREE</a>。</li>
<li>有關欄位定義和集合資料結構，請參閱《<a href="/docs/zh-hant/schema.md">資料結構說明</a>》。</li>
</ul>
