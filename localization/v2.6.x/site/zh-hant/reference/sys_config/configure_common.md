---
id: configure_common.md
related_key: configure
group: system_configuration.md
summary: 學習如何為 Milvus 設定共用。
---
<h1 id="common-related-Configurations" class="common-anchor-header">共用相關組態<button data-href="#common-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="commondefaultPartitionName" class="common-anchor-header"><code translate="no">common.defaultPartitionName</code><button data-href="#commondefaultPartitionName" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.defaultPartitionName">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        建立集合時的預設分割區名稱      </td>
      <td>_default</td>
    </tr>
  </tbody>
</table>
<h2 id="commondefaultIndexName" class="common-anchor-header"><code translate="no">common.defaultIndexName</code><button data-href="#commondefaultIndexName" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.defaultIndexName">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        索引名稱未指定時的名稱      </td>
      <td>_default_idx</td>
    </tr>
  </tbody>
</table>
<h2 id="commonentityExpiration" class="common-anchor-header"><code translate="no">common.entityExpiration</code><button data-href="#commonentityExpiration" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.entityExpiration">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        實體過期時間，以秒為單位，注意 -1 表示永不過期      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="commonindexSliceSize" class="common-anchor-header"><code translate="no">common.indexSliceSize</code><button data-href="#commonindexSliceSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.indexSliceSize">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        索引分割大小 (MB)    </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="commonthreadCoreCoefficienthighPriority" class="common-anchor-header"><code translate="no">common.threadCoreCoefficient.highPriority</code><button data-href="#commonthreadCoreCoefficienthighPriority" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.threadCoreCoefficient.highPriority">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        此參數指定線程數是高優先級池核心數的幾倍      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="commonthreadCoreCoefficientmiddlePriority" class="common-anchor-header"><code translate="no">common.threadCoreCoefficient.middlePriority</code><button data-href="#commonthreadCoreCoefficientmiddlePriority" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.threadCoreCoefficient.middlePriority">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        此參數指定線程數是中優先級池核心數的幾倍      </td>
      <td>5</td>
    </tr>
  </tbody>
</table>
<h2 id="commonthreadCoreCoefficientlowPriority" class="common-anchor-header"><code translate="no">common.threadCoreCoefficient.lowPriority</code><button data-href="#commonthreadCoreCoefficientlowPriority" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.threadCoreCoefficient.lowPriority">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        此參數指定線程數是低優先級池核心數的幾倍      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<h2 id="commongracefulTime" class="common-anchor-header"><code translate="no">common.gracefulTime</code><button data-href="#commongracefulTime" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.gracefulTime">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        毫秒。它表示在有界一致性的情況下，需要減去請求到達時間的間隔（以毫秒為單位）。      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>
<h2 id="commongracefulStopTimeout" class="common-anchor-header"><code translate="no">common.gracefulStopTimeout</code><button data-href="#commongracefulStopTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.gracefulStopTimeout">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        秒。如果在這段時間內未完成優化停止程序，它會強制退出伺服器。      </td>
      <td>1800</td>
    </tr>
  </tbody>
</table>
<h2 id="commonstorageType" class="common-anchor-header"><code translate="no">common.storageType</code><button data-href="#commonstorageType" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.storageType">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        請在內嵌的 Milvus 中調整：local，可用值為 [local、remote、opendal]，值 minio 已經被淘汰，請使用 remote 代替      </td>
      <td>遠端</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsimdType" class="common-anchor-header"><code translate="no">common.simdType</code><button data-href="#commonsimdType" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.simdType">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>預設值：自動</li>      
        <li>有效值：[自動、avx512、avx2、avx、sse4_2]</li>      
        <li>此設定僅供 querynode 和 indexnode 使用，它選擇搜尋和建立索引的 CPU 指令集。</li>      </td>
      <td>自動</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecuritysuperUsers" class="common-anchor-header"><code translate="no">common.security.superUsers</code><button data-href="#commonsecuritysuperUsers" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.superUsers">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>超級使用者會忽略某些系統檢查程序、</li>      
        <li>如更新認證時的舊密碼驗證。</li>      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecuritydefaultRootPassword" class="common-anchor-header"><code translate="no">common.security.defaultRootPassword</code><button data-href="#commonsecuritydefaultRootPassword" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.defaultRootPassword">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        root 使用者的預設密碼。最大長度為 72 個字元，且必須使用雙引號。      </td>
      <td>密碼</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrootShouldBindRole" class="common-anchor-header"><code translate="no">common.security.rootShouldBindRole</code><button data-href="#commonsecurityrootShouldBindRole" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rootShouldBindRole">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        啟用授權時，root 使用者是否應該綁定角色。      </td>
      <td>假</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbacoverrideBuiltInPrivilegeGroupsenabled" class="common-anchor-header"><code translate="no">common.security.rbac.overrideBuiltInPrivilegeGroups.enabled</code><button data-href="#commonsecurityrbacoverrideBuiltInPrivilegeGroupsenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.overrideBuiltInPrivilegeGroups.enabled">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        是否覆寫內建的權限群組      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbacclusterreadonlyprivileges" class="common-anchor-header"><code translate="no">common.security.rbac.cluster.readonly.privileges</code><button data-href="#commonsecurityrbacclusterreadonlyprivileges" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.cluster.readonly.privileges">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        群集層級唯讀權限      </td>
      <td>ListDatabases,SelectOwnership,SelectUser,DescribeResourceGroup,ListResourceGroups,ListPrivilegeGroups</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbacclusterreadwriteprivileges" class="common-anchor-header"><code translate="no">common.security.rbac.cluster.readwrite.privileges</code><button data-href="#commonsecurityrbacclusterreadwriteprivileges" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.cluster.readwrite.privileges">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        群集層級讀寫權限      </td>
      <td>資料庫清單,選擇所有權,選擇使用者,描述資源群組,資源群組清單,權限群組清單,FlushAll,TransferNode,TransferReplica,UpdateResourceGroups...</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbacclusteradminprivileges" class="common-anchor-header"><code translate="no">common.security.rbac.cluster.admin.privileges</code><button data-href="#commonsecurityrbacclusteradminprivileges" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.cluster.admin.privileges">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        群集層級管理權限      </td>
      <td>ListDatabases,SelectOwnership,SelectUser,DescribeResourceGroup,ListResourceGroups,ListPrivilegeGroups,FlushAll,TransferNode,TransferReplica,UpdateResourceGroups,BackupRBAC,RestoreRBAC,CreateDatabase、DropDatabase,CreateOwnership,DropOwnership,ManageOwnership,CreateResourceGroup,DropResourceGroup,UpdateUser,RenameCollection,CreatePrivilegeGroup,DropPrivilegeGroup,OperatePrivilegeGroup</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbacdatabasereadonlyprivileges" class="common-anchor-header"><code translate="no">common.security.rbac.database.readonly.privileges</code><button data-href="#commonsecurityrbacdatabasereadonlyprivileges" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.database.readonly.privileges">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        資料庫層級的唯讀權限      </td>
      <td>顯示資料集、描述資料庫</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbacdatabasereadwriteprivileges" class="common-anchor-header"><code translate="no">common.security.rbac.database.readwrite.privileges</code><button data-href="#commonsecurityrbacdatabasereadwriteprivileges" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.database.readwrite.privileges">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        資料庫層級讀寫權限      </td>
      <td>顯示收藏集,描述資料庫,變更資料庫</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbacdatabaseadminprivileges" class="common-anchor-header"><code translate="no">common.security.rbac.database.admin.privileges</code><button data-href="#commonsecurityrbacdatabaseadminprivileges" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.database.admin.privileges">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        資料庫層級管理權限      </td>
      <td>ShowCollections,DescribeDatabase,AlterDatabase,CreateCollection,DropCollection</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbaccollectionreadonlyprivileges" class="common-anchor-header"><code translate="no">common.security.rbac.collection.readonly.privileges</code><button data-href="#commonsecurityrbaccollectionreadonlyprivileges" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.collection.readonly.privileges">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        資料庫層級唯讀權限      </td>
      <td>查詢,搜尋,索引詳細資料,GetFlushState,GetLoadState,GetLoadingProgress,HasPartition,ShowPartitions,DescribeCollection,DescribeAlias,GetStatistics,ListAliases。</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbaccollectionreadwriteprivileges" class="common-anchor-header"><code translate="no">common.security.rbac.collection.readwrite.privileges</code><button data-href="#commonsecurityrbaccollectionreadwriteprivileges" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.collection.readwrite.privileges">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        集合層級讀寫權限      </td>
      <td>查詢,搜尋,IndexDetail,GetFlushState,GetLoadState,GetLoadingProgress,HasPartition,ShowPartitions,DescribeCollection,DescribeAlias,GetStatistics,ListAliases,Load,Release,Insert,Delete,Upsert,Import,Flush,Compaction,LoadBalance,CreateIndex,DropIndex,CreatePartition,DropPartition。</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsecurityrbaccollectionadminprivileges" class="common-anchor-header"><code translate="no">common.security.rbac.collection.admin.privileges</code><button data-href="#commonsecurityrbaccollectionadminprivileges" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.security.rbac.collection.admin.privileges">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        集合層級管理權限      </td>
      <td>Query,Search,IndexDetail,GetFlushState,GetLoadState,GetLoadingProgress,HasPartition,ShowPartitions,DescribeCollection,DescribeAlias,GetStatistics,ListAliases,Load,Release,Insert,Delete,Upsert,Import,Flush,Compaction,LoadBalance,CreateIndex,DropIndex,CreatePartition,DropPartition,CreateAlias,DropAlias</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsessionttl" class="common-anchor-header"><code translate="no">common.session.ttl</code><button data-href="#commonsessionttl" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.session.ttl">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        會話授予註冊服務租約時的 ttl 值   </td>
      <td>30</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsessionretryTimes" class="common-anchor-header"><code translate="no">common.session.retryTimes</code><button data-href="#commonsessionretryTimes" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.session.retryTimes">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        會話發送 etcd 請求時的重試次數      </td>
      <td>30</td>
    </tr>
  </tbody>
</table>
<h2 id="commonlocksmetricsenable" class="common-anchor-header"><code translate="no">common.locks.metrics.enable</code><button data-href="#commonlocksmetricsenable" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.locks.metrics.enable">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        是否收集度量鎖的統計資料      </td>
      <td>假</td>
    </tr>
  </tbody>
</table>
<h2 id="commonlocksthresholdinfo" class="common-anchor-header"><code translate="no">common.locks.threshold.info</code><button data-href="#commonlocksthresholdinfo" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.locks.threshold.info">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        在資訊層級中列印持續時間的最小毫秒數      </td>
      <td>500</td>
    </tr>
  </tbody>
</table>
<h2 id="commonlocksthresholdwarn" class="common-anchor-header"><code translate="no">common.locks.threshold.warn</code><button data-href="#commonlocksthresholdwarn" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.locks.threshold.warn">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        警告層級中列印時間的最小毫秒數      </td>
      <td>1000</td>
    </tr>
  </tbody>
</table>
<h2 id="commonlocksmaxWLockConditionalWaitTime" class="common-anchor-header"><code translate="no">common.locks.maxWLockConditionalWaitTime</code><button data-href="#commonlocksmaxWLockConditionalWaitTime" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.locks.maxWLockConditionalWaitTime">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        等待 wlock 條件的最長秒數      </td>
      <td>600</td>
    </tr>
  </tbody>
</table>
<h2 id="commonttMsgEnabled" class="common-anchor-header"><code translate="no">common.ttMsgEnabled</code><button data-href="#commonttMsgEnabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.ttMsgEnabled">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>是否停用系統的內部時間訊息機制。 </li>      
        <li>如果停用 (設定為 false)，系統將不允許 DML 操作，包括插入、刪除、查詢和搜尋。 </li>      
        <li>這有助於 Milvus-CDC 同步增量資料</li>      </td>
      <td>真</td>
    </tr>
  </tbody>
</table>
<h2 id="commontraceLogMode" class="common-anchor-header"><code translate="no">common.traceLogMode</code><button data-href="#commontraceLogMode" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.traceLogMode">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        追蹤請求資訊      </td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<h2 id="commonbloomFilterSize" class="common-anchor-header"><code translate="no">common.bloomFilterSize</code><button data-href="#commonbloomFilterSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.bloomFilterSize">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        bloom filter 初始大小      </td>
      <td>100000</td>
    </tr>
  </tbody>
</table>
<h2 id="commonbloomFilterType" class="common-anchor-header"><code translate="no">common.bloomFilterType</code><button data-href="#commonbloomFilterType" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.bloomFilterType">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        bloom filter 類型，支援 BasicBloomFilter 和 BlockedBloomFilter      </td>
      <td>封鎖 BloomFilter</td>
    </tr>
  </tbody>
</table>
<h2 id="commonmaxBloomFalsePositive" class="common-anchor-header"><code translate="no">common.maxBloomFalsePositive</code><button data-href="#commonmaxBloomFalsePositive" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.maxBloomFalsePositive">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        bloom 過濾器的最大誤判率      </td>
      <td>0.001</td>
    </tr>
  </tbody>
</table>
<h2 id="commonbloomFilterApplyBatchSize" class="common-anchor-header"><code translate="no">common.bloomFilterApplyBatchSize</code><button data-href="#commonbloomFilterApplyBatchSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.bloomFilterApplyBatchSize">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        將 pk 應用於 bloom filter 時的批次大小      </td>
      <td>1000</td>
    </tr>
  </tbody>
</table>
<h2 id="commoncollectionReplicateEnable" class="common-anchor-header"><code translate="no">common.collectionReplicateEnable</code><button data-href="#commoncollectionReplicateEnable" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.collectionReplicateEnable">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        是否啟用收集複製。      </td>
      <td>假</td>
    </tr>
  </tbody>
</table>
<h2 id="commonusePartitionKeyAsClusteringKey" class="common-anchor-header"><code translate="no">common.usePartitionKeyAsClusteringKey</code><button data-href="#commonusePartitionKeyAsClusteringKey" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.usePartitionKeyAsClusteringKey">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        若為 true，則在分割區鍵欄位上執行群集壓縮和分割修剪      </td>
      <td>假</td>
    </tr>
  </tbody>
</table>
<h2 id="commonuseVectorAsClusteringKey" class="common-anchor-header"><code translate="no">common.useVectorAsClusteringKey</code><button data-href="#commonuseVectorAsClusteringKey" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.useVectorAsClusteringKey">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        如果為 true，會對向量欄位進行聚類壓縮和分割修剪      </td>
      <td>假</td>
    </tr>
  </tbody>
</table>
<h2 id="commonenableVectorClusteringKey" class="common-anchor-header"><code translate="no">common.enableVectorClusteringKey</code><button data-href="#commonenableVectorClusteringKey" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.enableVectorClusteringKey">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        如果為 true，啟用向量聚類關鍵和向量聚類壓縮      </td>
      <td>假</td>
    </tr>
  </tbody>
</table>
<h2 id="commonlocalRPCEnabled" class="common-anchor-header"><code translate="no">common.localRPCEnabled</code><button data-href="#commonlocalRPCEnabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.localRPCEnabled">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        當混合或獨立模式時，啟用本機 rpc 進行內部通訊。      </td>
      <td>假</td>
    </tr>
  </tbody>
</table>
<h2 id="commonsynctaskPoolReleaseTimeoutSeconds" class="common-anchor-header"><code translate="no">common.sync.taskPoolReleaseTimeoutSeconds</code><button data-href="#commonsynctaskPoolReleaseTimeoutSeconds" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.sync.taskPoolReleaseTimeoutSeconds">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        等待任務完成並釋放池中資源的最長時間      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>
<h2 id="commonclusterID" class="common-anchor-header"><code translate="no">common.clusterID</code><button data-href="#commonclusterID" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.clusterID">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>群集的唯一識別碼，用於自動識別碼的產生，以確保在多個 Milvus 群集中的全局唯一性。</li>      
        <li>有效值：[0、1、2、3、4、5、6、7] (最多支援 8 個群集)</li>      
        <li>每個群集必須有唯一的 clusterID，以防止執行多個群集時 AutoID 重疊。</li>      
        <li>此 ID 嵌入在 64 位 AutoID 結構中，作為 cluster_id 段的一部分。</li>      
        <li>如需詳細資訊，請參閱<a href="/docs/zh-hant/primary-field.md#Ensure-global-AutoID-uniqueness-across-clusters">Primary Field &amp; AutoID</a>。</li>      </td>
      <td>0</td>
    </tr>
  </tbody>
</table>
