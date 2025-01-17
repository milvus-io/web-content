---
id: configure_knowhere.md
related_key: configure
group: system_configuration.md
summary: 學習如何為 Milvus 設定 knowhere。
---
<h1 id="knowhere-related-Configurations" class="common-anchor-header">與 knowhere 相關的設定<button data-href="#knowhere-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>任何與 knowhere 向量搜尋引擎相關的設定</p>
<h2 id="knowhereenable" class="common-anchor-header"><code translate="no">knowhere.enable</code><button data-href="#knowhereenable" class="anchor-icon" translate="no">
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
    </button></h2><table id="knowhere.enable">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        當啟用此設定時，以下定義的索引參數會自動填入索引參數，不需要使用者輸入。      </td>
      <td>真</td>
    </tr>
  </tbody>
</table>
<h2 id="knowhereDISKANNbuildmaxdegree" class="common-anchor-header"><code translate="no">knowhere.DISKANN.build.max_degree</code><button data-href="#knowhereDISKANNbuildmaxdegree" class="anchor-icon" translate="no">
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
    </button></h2><table id="knowhere.DISKANN.build.max_degree">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Vamana 圖形的最大度數      </td>
      <td>56</td>
    </tr>
  </tbody>
</table>
<h2 id="knowhereDISKANNbuildpqcodebudgetgbratio" class="common-anchor-header"><code translate="no">knowhere.DISKANN.build.pq_code_budget_gb_ratio</code><button data-href="#knowhereDISKANNbuildpqcodebudgetgbratio" class="anchor-icon" translate="no">
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
    </button></h2><table id="knowhere.DISKANN.build.pq_code_budget_gb_ratio">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        PQ 代碼的大小限制 (與原始資料比較)      </td>
      <td>0.125</td>
    </tr>
  </tbody>
</table>
<h2 id="knowhereDISKANNbuildsearchcachebudgetgbratio" class="common-anchor-header"><code translate="no">knowhere.DISKANN.build.search_cache_budget_gb_ratio</code><button data-href="#knowhereDISKANNbuildsearchcachebudgetgbratio" class="anchor-icon" translate="no">
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
    </button></h2><table id="knowhere.DISKANN.build.search_cache_budget_gb_ratio">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        緩存節點數與原始資料的比率      </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>
<h2 id="knowhereDISKANNbuildsearchlistsize" class="common-anchor-header"><code translate="no">knowhere.DISKANN.build.search_list_size</code><button data-href="#knowhereDISKANNbuildsearchlistsize" class="anchor-icon" translate="no">
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
    </button></h2><table id="knowhere.DISKANN.build.search_list_size">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        建立圖形時候選清單的大小      </td>
      <td>100</td>
    </tr>
  </tbody>
</table>
<h2 id="knowhereDISKANNsearchbeamwidthratio" class="common-anchor-header"><code translate="no">knowhere.DISKANN.search.beam_width_ratio</code><button data-href="#knowhereDISKANNsearchbeamwidthratio" class="anchor-icon" translate="no">
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
    </button></h2><table id="knowhere.DISKANN.search.beam_width_ratio">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        每次搜尋迭代的最大 IO 請求數與 CPU 數之間的比率      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>
