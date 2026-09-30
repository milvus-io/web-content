---
id: configure_common.md
related_key: configure
group: system_configuration.md
summary: 瞭解如何為 Milvus 進行常見設定。
---
<h1 id="common-related-Configurations" class="common-anchor-header">常見相關設定<button data-href="#common-related-Configurations" class="anchor-icon" translate="no">
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
      <td>        建立集合時預設區段的名稱      </td>
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
      <td>        未指定名稱時，索引建立時的名稱      </td>
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
      <td>        實體過期時間（以秒為單位），注意：-1 表示永不過期      </td>
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
      <td>        索引區段大小（以 MB 為單位）      </td>
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
      <td>        此參數指定高優先級池中的執行緒數應為核心數的多少倍      </td>
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
      <td>        此參數指定中優先級池中的執行緒數應為核心數的多少倍      </td>
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
      <td>        此參數指定低優先級池中的執行緒數應為核心數的多少倍      </td>
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
      <td>        毫秒。此參數代表在「有限一致性」情境下，需從請求到達時間中減去的間隔（單位為毫秒）。      </td>
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
      <td>        秒。若在此時間內未能完成平穩停止程序，系統將強制關閉伺服器。      </td>
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
      <td>        請在嵌入式 Milvus 中進行調整：local，可用值為 [local、remote、opendal]，值 minio 已廢棄，請改用 remote      </td>
      <td>remote</td>
    </tr>
  </tbody>
</table>
<h2 id="commonstorageuseLoonFFI" class="common-anchor-header"><code translate="no">common.storage.useLoonFFI</code><button data-href="#commonstorageuseLoonFFI" class="anchor-icon" translate="no">
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
    </button></h2><table id="common.storage.useLoonFFI">
  <thead>
    <tr>
      <th class="width80">說明</th>
      <th class="width20">預設值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        是否對新寫入資料及壓縮輸出使用 Storage V3。此參數可重新載入。      </td>
      <td>false</td>
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
        <li>預設值：auto</li>      
        <li>有效值：[auto, avx512, avx2, avx, sse4_2]</li>      
        <li>此設定僅由 querynode 和 indexnode 使用，用於為搜尋和建立索引選擇 CPU 指令集。</li>      </td>
      <td>auto</td>
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
        <li>超級使用者將忽略某些系統檢查程序，</li>      
        <li>例如在更新憑證時對舊密碼的驗證</li>      </td>
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
      <td>Milvus</td>
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
      <td>        當啟用授權時，root 使用者是否應綁定某個角色。      </td>
      <td>false</td>
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
      <td>        是否覆寫內建權限群組      </td>
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
      <td>        叢集層級唯讀權限      </td>
      <td>ListDatabases、SelectOwnership、SelectUser、DescribeResourceGroup、ListResourceGroups、ListPrivilegeGroups</td>
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
      <td>        叢集層級讀寫權限      </td>
      <td>ListDatabases、SelectOwnership、SelectUser、DescribeResourceGroup、ListResourceGroups、ListPrivilegeGroups、FlushAll、TransferNode、TransferReplica、UpdateResourceGroups</td>
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
      <td>        叢集層級管理員權限      </td>
      <td>ListDatabases、SelectOwnership、SelectUser、DescribeResourceGroup、ListResourceGroups、ListPrivilegeGroups、FlushAll、TransferNode、TransferReplica、更新資源群組、備份 RBAC、還原 RBAC、建立資料庫、刪除資料庫、建立所有權、刪除所有權、管理所有權、建立資源群組、刪除資源群組、更新使用者、重新命名集合、建立權限群組、刪除權限群組、操作權限群組</td>
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
      <td>        資料庫層級唯讀權限      </td>
      <td>顯示集合、描述資料庫</td>
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
      <td>        資料庫層級的讀寫權限      </td>
      <td>ShowCollections、DescribeDatabase、AlterDatabase</td>
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
      <td>        資料庫層級的管理權限      </td>
      <td>ShowCollections、DescribeDatabase、AlterDatabase、CreateCollection、DropCollection</td>
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
      <td>        集合層級唯讀權限      </td>
      <td>Query、Search、IndexDetail、GetFlushState、GetLoadState、GetLoadingProgress、HasPartition、ShowPartitions、DescribeCollection、DescribeAlias、GetStatistics、ListAliases</td>
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
      <td>        集合層級的讀寫權限      </td>
      <td>查詢、搜尋、索引詳細資訊、取得刷新狀態、取得載入狀態、取得載入進度、是否具有分區、顯示分區、描述集合、描述別名、取得統計資料、列出別名、載入、釋放、插入、刪除、Upsert、匯入、刷新、壓縮、負載平衡、建立索引、刪除索引、建立分區、刪除分區</td>
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
      <td>        集合層級管理員權限      </td>
      <td>查詢、搜尋、索引詳細資訊、取得刷新狀態、取得載入狀態、取得載入進度、是否具有分區、顯示分區、描述集合、描述別名、取得統計資料、列出別名、載入、釋放、插入、刪除、更新或插入、匯入、刷新、壓縮、負載平衡、建立索引、刪除索引、建立分區、刪除分區、建立別名、刪除別名</td>
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
      <td>        當工作階段向註冊服務授予租約時的 TTL 值      </td>
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
      <td>        是否針對指標鎖進行統計資料彙整      </td>
      <td>false</td>
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
      <td>        在資訊級別中輸出持續時間所需的最小毫秒數      </td>
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
      <td>        在「警告」級別中，輸出持續時間所需的最低毫秒數      </td>
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
      <td>        等待 wlock 條件的最大秒數      </td>
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
        <li>是否要停用系統的內部時間訊息傳遞機制。 </li>      
        <li>若停用（設定為 false），系統將不允許執行 DML 操作，包括插入、刪除、查詢及搜尋。 </li>      
        <li>這有助於 Milvus-CDC 同步增量資料</li>      </td>
      <td>true</td>
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
      <td>        布隆濾波器初始大小      </td>
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
      <td>        布魯姆篩選器的類型，支援 BasicBloomFilter 和 BlockedBloomFilter      </td>
      <td>BlockedBloomFilter</td>
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
      <td>        布隆篩選器的最大假陽性率      </td>
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
      <td>        將 PK 套用至布隆篩選器時的批次大小      </td>
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
      <td>        是否啟用集合複製。      </td>
      <td>false</td>
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
      <td>        若為 true，則針對分區鍵欄位執行叢集緊湊化與區段修剪      </td>
      <td>false</td>
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
      <td>        若為 true，則對向量欄位執行叢集壓縮與區段修剪      </td>
      <td>false</td>
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
      <td>        若為 true，則啟用向量叢集鍵及向量叢集壓縮      </td>
      <td>false</td>
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
      <td>        在混合模式或獨立模式下，啟用用於內部通訊的本地 RPC。      </td>
      <td>false</td>
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
      <td>        等待任務完成並釋放資源池中資源的最大時間      </td>
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
        <li>用於自動產生識別碼 (AutoID) 的叢集唯一識別碼，以確保在多個 Milvus 叢集間具有全域唯一性。</li>      
        <li>有效值：[0, 1, 2, 3, 4, 5, 6, 7]（最多支援 8 個叢集）</li>      
        <li>每個叢集必須擁有唯一的 clusterID，以避免在運行多個叢集時發生 AutoID 重疊的情況。</li>      
        <li>此識別碼會作為 cluster_id 區段的一部分，嵌入 64 位元的 AutoID 結構中。</li>      
        <li>如需更多資訊，請參閱「<a href="/docs/zh-hant/primary-field.md#Ensure-global-AutoID-uniqueness-across-clusters">主要欄位與 AutoID</a>」。</li>      </td>
      <td>0</td>
    </tr>
  </tbody>
</table>
