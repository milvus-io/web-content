---
id: scalar_index.md
related_key: scalar_index
summary: Milvus 中的標量指數。
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
    </button></h1><p>Milvus 支援結合標量值與向量值欄位的篩選搜尋。為了提高涉及標量字段的搜尋效率，Milvus 從版本 2.1.0 開始引入標量字段索引。這篇文章概述 Milvus 的標量欄位索引，幫助您了解其意義和實作。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中執行向量相似性搜尋時，您可以使用邏輯運算符號將標量欄位組織成布林表達式。</p>
<p>當 Milvus 接收到具有這種布林表達式的搜尋請求，它會將布林表達式解析為抽象語法樹 (AST)，以產生屬性篩選的實體計劃。Milvus 接著會在每個區段套用實體規劃，產生一個<a href="/docs/zh-hant/bitset.md">bitset</a>作為篩選結果，並將結果包含在向量搜尋參數中，以縮窄搜尋範圍。在這種情況下，向量搜尋的速度在很大程度上依賴於屬性篩選的速度。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/scalar_index.png" alt="Attribute filtering in a segment" class="doc-image" id="attribute-filtering-in-a-segment" />
   </span> <span class="img-wrapper"> <span>分段中的屬性篩選</span> </span></p>
<p>標量欄位索引是一種確保屬性過濾速度的方法，它以特定的方式將標量欄位值排序，以加快資訊檢索的速度。</p>
<h2 id="Scalar-field-indexing-algorithms" class="common-anchor-header">標量欄位索引演算法<button data-href="#Scalar-field-indexing-algorithms" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 的標量欄位索引演算法旨在達到低記憶體使用率、高篩選效率和短載入時間的目標。這些演算法主要分為兩大類：<a href="#auto-indexing">自動索引</a>和<a href="#inverted-indexing">反向索引</a>。</p>
<h3 id="Auto-indexing" class="common-anchor-header">自動索引</h3><p>Milvus 提供<code translate="no">AUTOINDEX</code> 選項，讓您不必手動選擇索引類型。在呼叫<code translate="no">create_index</code> 方法時，如果沒有指定<code translate="no">index_type</code> ，Milvus 會根據資料類型自動選擇最適合的索引類型。</p>
<p>下表列出了 Milvus 支援的資料類型及其對應的自動索引演算法。</p>
<table>
<thead>
<tr><th>資料類型</th><th>自動索引演算法</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>反向索引</td></tr>
<tr><td>INT8</td><td>反向索引</td></tr>
<tr><td>INT16</td><td>反向索引</td></tr>
<tr><td>INT32</td><td>反轉索引</td></tr>
<tr><td>INT64</td><td>反轉索引</td></tr>
<tr><td>FLOAT</td><td>反轉索引</td></tr>
<tr><td>DOUBLE</td><td>反轉索引</td></tr>
</tbody>
</table>
<h3 id="Inverted-indexing" class="common-anchor-header">反向索引</h3><p>反向索引提供了一種靈活的方式，可透過手動指定索引參數為標量欄位建立索引。這種方法適用於各種情況，包括點查詢、模式匹配查詢、全文檢索、JSON 檢索、布林檢索，甚至前綴匹配查詢。</p>
<p>Milvus 中實作的反向索引是由<a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>（一個全文本搜尋引擎函式庫）支援。Tantivy 可確保 Milvus 中的倒排索引既高效又快速。</p>
<p>倒排索引有兩個主要組成部分：詞彙字典和倒排清單。詞彙字典包含所有按字母順序排序的標記化詞彙，而倒置清單包含每個詞彙出現的文件清單。這種設定使點查詢和範圍查詢比暴力搜尋更快、更有效率。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/scalar_index_inverted.png" alt="Inverted index diagram" class="doc-image" id="inverted-index-diagram" />
   </span> <span class="img-wrapper"> <span>倒置索引圖</span> </span></p>
<p>使用倒置索引的優點在下列作業中特別明顯：</p>
<ul>
<li><strong>點查詢</strong>：例如，在搜尋包含<strong>Milvus</strong> 這個詞的文件時，首先會檢查<strong>Milvus</strong>是否出現在詞彙字典中。如果沒有找到，就表示沒有文件包含這個詞。但是，如果找到了，則會擷取與<strong>Milvus</strong>相關的反向清單，指出包含該詞的文件。這個方法遠比在一百萬個文件中強行搜尋有效率，因為排序的詞彙字典大幅降低了尋找<strong>Milvus</strong> 這個詞的時間複雜度。</li>
<li><strong>範圍查詢</strong>：範圍查詢的效率，例如尋找字首字母大於<strong>very 的</strong>文件，也會因為排序的詞彙字典而提升。這種方法比暴力搜尋更有效率，能提供更快速、更精準的結果。</li>
</ul>
<h3 id="Test-results" class="common-anchor-header">測試結果</h3><p>為了證明 Milvus 中標量索引所提供的效能改善，我們進行了一項實驗，比較在原始資料上使用倒轉索引和暴力搜尋的幾種表達方式的效能。</p>
<p>該實驗涉及在兩種條件下測試各種表達式：使用倒置索引和使用暴力搜尋。為了確保公平性，每次測試都使用相同的資料集，並維持相同的資料分佈。每次測試前，都會釋放資料集，並丟棄和重建索引。此外，每次測試前都會執行暖查詢，以盡量減少冷資料和熱資料的影響，而且每次查詢都會執行多次，以確保準確性。</p>
<p>對於<strong>100 萬筆</strong>記錄的資料集而言，使用<strong>反轉索引</strong>可為點查詢提供高達<strong>30 倍的</strong>效能提升。對於較大的資料集，效能提升可能更為顯著。</p>
<h2 id="Performance-recommandations" class="common-anchor-header">效能建議<button data-href="#Performance-recommandations" class="anchor-icon" translate="no">
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
    </button></h2><p>為了充分利用 Milvus 在標量字段索引方面的能力，以及發揮其在向量相似性搜尋方面的威力，您可能需要一個模型來根據您的資料估計所需的記憶體大小。</p>
<p>以下表格列出 Milvus 支援的所有資料類型的估算功能。</p>
<ul>
<li><p>數值欄位</p>
<table>
<thead>
<tr><th>資料類型</th><th>記憶體估算函數 (MB)</th></tr>
</thead>
<tbody>
<tr><td>INT8</td><td>numOfRows *<strong>12</strong>/ 1024 / 1024</td></tr>
<tr><td>INT16</td><td>numOfRows *<strong>12</strong>/ 1024 / 1024</td></tr>
<tr><td>INT32</td><td>行數 *<strong>12</strong>/ 1024 / 1024</td></tr>
<tr><td>INT64</td><td>numOfRows *<strong>24</strong>/ 1024 / 1024</td></tr>
<tr><td>FLOAT32</td><td>numOfRows *<strong>12</strong>/ 1024 / 1024</td></tr>
<tr><td>DOUBLE</td><td>numOfRows *<strong>24</strong>/ 1024 / 1024</td></tr>
</tbody>
</table>
</li>
<li><p>字串欄位</p>
<table>
<thead>
<tr><th>字串長度</th><th>記憶體估算功能 (MB)</th></tr>
</thead>
<tbody>
<tr><td>(0, 8]</td><td>行數 *<strong>128</strong>/ 1024 / 1024</td></tr>
<tr><td>(8, 16]</td><td>行數 *<strong>144</strong>/ 1024 / 1024</td></tr>
<tr><td>(16, 32]</td><td>行數 *<strong>160</strong>/ 1024 / 1024</td></tr>
<tr><td>(32, 64]</td><td>行數 *<strong>192</strong>/ 1024 / 1024</td></tr>
<tr><td>(64, 128]</td><td>行數 *<strong>256</strong>/ 1024 / 1024</td></tr>
<tr><td>(128, 65535]</td><td>numOfRows *<strong>strLen * 1.5</strong>/ 1024 / 1024</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">接下來<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>若要為標量欄位<a href="/docs/zh-hant/index-scalar-fields.md">建立</a>索引，請閱讀<a href="/docs/zh-hant/index-scalar-fields.md">建立標量索引</a>。</p></li>
<li><p>若要瞭解上述相關詞彙和規則的更多資訊，請閱讀</p>
<ul>
<li><a href="/docs/zh-hant/bitset.md">位元集</a></li>
<li><a href="/docs/zh-hant/multi-vector-search.md">混合搜尋</a></li>
<li><a href="/docs/zh-hant/boolean.md">布林表達規則</a></li>
<li><a href="/docs/zh-hant/schema.md#Supported-data-type">支援的資料類型</a></li>
</ul></li>
</ul>
