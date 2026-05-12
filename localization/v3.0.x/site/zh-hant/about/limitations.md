---
id: limitations.md
title: Milvus 限制
related_key: Limitations
summary: 了解使用 Milvus 時的限制。
---
<h1 id="Milvus-Limits" class="common-anchor-header">Milvus 限制<button data-href="#Milvus-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 致力於提供最好的向量資料庫，以支援人工智慧應用程式和向量相似性搜尋。然而，Milvus 團隊仍在不斷努力，以帶來更多的功能和最好的工具來增強用戶體驗。本頁列出使用者在使用 Milvus 時可能會遇到的一些已知限制。</p>
<h2 id="Length-of-a-resource-name" class="common-anchor-header">資源名稱的長度<button data-href="#Length-of-a-resource-name" class="anchor-icon" translate="no">
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
<tr><th>資源</th><th>限制</th></tr>
</thead>
<tbody>
<tr><td>收集</td><td>255 個字元</td></tr>
<tr><td>欄位</td><td>255 個字元</td></tr>
<tr><td>索引</td><td>255 個字元</td></tr>
<tr><td>分區</td><td>255 個字元</td></tr>
</tbody>
</table>
<h2 id="Naming-rules" class="common-anchor-header">命名規則<button data-href="#Naming-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>資源名稱（例如集合名稱、磁碟分割名稱或索引名稱）可以包含數字、字母和底線 (_)。資源名稱必須以字母或下劃線 (_) 開頭。</p>
<h2 id="Number-of-resources" class="common-anchor-header">資源數量<button data-href="#Number-of-resources" class="anchor-icon" translate="no">
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
<tr><th>資源</th><th>限制</th></tr>
</thead>
<tbody>
<tr><td>集合</td><td>65,536</td></tr>
</tbody>
</table>
<h2 id="Number-of-resources-in-a-collection" class="common-anchor-header">合集中的資源數量<button data-href="#Number-of-resources-in-a-collection" class="anchor-icon" translate="no">
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
<tr><th>資源</th><th>限制</th></tr>
</thead>
<tbody>
<tr><td>分區</td><td>1,024</td></tr>
<tr><td>分片</td><td>16</td></tr>
<tr><td>欄位</td><td>64</td></tr>
<tr><td>索引</td><td>1</td></tr>
<tr><td>實體</td><td>無限制</td></tr>
</tbody>
</table>
<h2 id="Length-of-a-string" class="common-anchor-header">字串長度<button data-href="#Length-of-a-string" class="anchor-icon" translate="no">
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
<tr><th>資料類型</th><th>限制</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>65,535</td></tr>
</tbody>
</table>
<h2 id="Dimensions-of-a-vector" class="common-anchor-header">向量的尺寸<button data-href="#Dimensions-of-a-vector" class="anchor-icon" translate="no">
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
<tr><th>屬性</th><th>極限</th></tr>
</thead>
<tbody>
<tr><td>尺寸</td><td>32,768</td></tr>
</tbody>
</table>
<h2 id="Input-and-Output-per-RPC" class="common-anchor-header">每個 RPC 的輸入和輸出<button data-href="#Input-and-Output-per-RPC" class="anchor-icon" translate="no">
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
<tr><th>操作</th><th>極限</th></tr>
</thead>
<tbody>
<tr><td>插入</td><td>64 MB</td></tr>
<tr><td>搜尋</td><td>64 MB</td></tr>
<tr><td>查詢</td><td>64 MB</td></tr>
</tbody>
</table>
<h2 id="Load-limits" class="common-anchor-header">載入限制<button data-href="#Load-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>在目前的版本中，要載入的資料必須低於所有查詢節點總記憶體資源的 90%，以便為執行引擎保留記憶體資源。</p>
<h2 id="Search-limits" class="common-anchor-header">搜尋限制<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
<tr><th>向量</th><th>限制</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">topk</code> (返回最相似結果的數量)</td><td>16,384</td></tr>
<tr><td><code translate="no">nq</code> （搜尋請求的數量）</td><td>16,384</td></tr>
</tbody>
</table>
<h2 id="Index-limits-on-different-search-types" class="common-anchor-header">不同搜尋類型的索引限制<button data-href="#Index-limits-on-different-search-types" class="anchor-icon" translate="no">
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
    </button></h2><p>下表概述了不同索引類型對各種搜尋行為的支援。</p>
<table>
<thead>
<tr><th></th><th>HNSW</th><th>DISKANN</th><th>平面</th><th>IVF_FLAT</th><th>IVF_SQ8</th><th>IVF_PQ</th><th>SCANN</th><th>GPU_IFV_FLAT</th><th>GPU_IVF_PQ</th><th>GPU_CAGRA</th><th>Gpu_brute_force</th><th>稀疏反轉索引</th><th>BIN_FLAT</th><th>BIN_IVF_FLAT</th></tr>
</thead>
<tbody>
<tr><td>基本搜尋</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td></tr>
<tr><td>分區搜尋</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td></tr>
<tr><td>基本搜尋與原始資料擷取</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td></tr>
<tr><td>基本搜尋與分頁</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td></tr>
<tr><td>篩選搜尋</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td></tr>
<tr><td>範圍搜尋</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td></tr>
<tr><td>群組搜尋</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>無</td><td>無</td><td>是</td><td>是</td><td>無</td><td>無</td></tr>
<tr><td>使用迭代器搜尋</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td></tr>
<tr><td>混合搜尋</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是(僅 RRFRanker)</td><td>是</td><td>是</td></tr>
<tr><td>查詢/獲取</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td></tr>
<tr><td>使用迭代器查詢</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td><td>是</td></tr>
</tbody>
</table>
