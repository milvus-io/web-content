---
id: configure_access_logs.md
title: 設定存取日誌
---
<h1 id="Configure-Access-Logs" class="common-anchor-header">設定存取日誌<button data-href="#Configure-Access-Logs" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 中的存取日誌功能可讓伺服器管理員記錄並分析使用者存取行為，協助了解查詢成功率及失敗原因等相關資訊。</p>
<p>本指南提供有關在 Milvus 中設定存取日誌的詳細說明。</p>
<p>存取日誌的設定方式取決於 Milvus 的安裝方式：</p>
<ul>
<li><strong>Helm 安裝</strong>：請參閱<code translate="no">values.yaml</code> 進行設定。如需更多資訊，請參閱《<a href="/docs/zh-hant/configure-helm.md">使用 Helm Charts 設定 Milvus</a>》。</li>
<li><strong>Docker 安裝</strong>：請在<code translate="no">milvus.yaml</code> 中進行設定。如需更多資訊，請參閱《<a href="/docs/zh-hant/configure-docker.md">使用 Docker Compose 設定 Milvus</a>》。</li>
<li><strong>Operator 安裝</strong>：請在配置檔案中修改<code translate="no">spec.components</code> 。如需更多資訊，請參閱《<a href="/docs/zh-hant/configure_operator.md">使用 Milvus Operator 配置 Milvus</a>》。</li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">設定選項<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>請根據您的需求從以下三種配置選項中選擇：</p>
<ul>
<li><strong>基本設定</strong>：適用於一般用途。</li>
<li><strong>本地存取日誌檔案配置</strong>：用於在本地儲存日誌。</li>
<li><strong>將本地存取日誌上傳至 MinIO 的設定</strong>：適用於雲端儲存與備份。</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">基本設定<button data-href="#Base-config" class="anchor-icon" translate="no">
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
    </button></h3><p>基本設定包含啟用存取日誌，並定義日誌檔名稱或使用標準輸出 (stdout)。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is empty, logs will be printed to stdout.</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: 是否啟用存取日誌功能。預設值為<strong>false</strong>。</li>
<li><code translate="no">proxy.accessLog.filename</code>：存取日誌檔案的名稱。若將此參數留空，存取日誌將輸出至標準輸出（stdout）。</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">本地存取日誌檔案的設定<button data-href="#Config-for-local-access-log-files" class="anchor-icon" translate="no">
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
    </button></h3><p>透過包含本地檔案路徑、檔案大小及輪替間隔等參數，設定存取日誌檔案的本地儲存空間：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span> <span class="hljs-comment"># Name of the access log file</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span> <span class="hljs-comment"># Local file path where the access log file is stored</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span> <span class="hljs-comment"># Max size for each single access log file. Unit: MB</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">86400</span> <span class="hljs-comment"># Time interval for log rotation. Unit: seconds</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span> <span class="hljs-comment"># Max number of sealed access log files that can be retained</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>當 `<code translate="no">filename</code> ` 不為空時，會指定這些參數。</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: 存儲存取日誌檔案的本地檔案路徑。預設值為<code translate="no">/tmp/milvus_access</code> 。</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: 單一存取日誌檔案允許的最大大小（單位為 MB）。若日誌檔案大小達到此限制，將觸發輪替程序。此程序會封存當前存取日誌檔案、建立新日誌檔案，並清除原始日誌檔案的內容。預設值為<strong>64</strong>。</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: 單一存取日誌檔案允許輪替的最大時間間隔（以秒為單位）。達到指定時間間隔時，將觸發輪替程序，進而建立新的存取日誌檔案並封存前一個檔案。預設值為<strong>0</strong>。</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: 可保留的已封存存取日誌檔案最大數量。若已封存的存取日誌檔案數量超過此限制，系統將刪除最舊的檔案。預設值為<strong>8</strong>。</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">將本機存取日誌檔案上傳至 MinIO 的設定<button data-href="#Config-for-uploading-local-access-log-files-to-MinIO" class="anchor-icon" translate="no">
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
    </button></h3><p>啟用並設定將本機存取日誌檔案上傳至 MinIO 的相關設定：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">86400</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span>
    <span class="hljs-attr">minioEnable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">remotePath:</span> <span class="hljs-string">&quot;/milvus/logs/access_logs&quot;</span>
    <span class="hljs-attr">remoteMaxTime:</span> <span class="hljs-number">0</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>配置 MinIO 參數時，請確保已設定<code translate="no">maxSize</code> 或<code translate="no">rotatedTime</code> 其中一項。若未設定，可能會導致無法將本機存取日誌檔案上傳至 MinIO。</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: 是否將本機存取日誌檔案上傳至 MinIO。預設值為<strong>false</strong>。</li>
<li><code translate="no">proxy.accessLog.remotePath</code>：用於上傳存取日誌檔案的物件儲存路徑。預設值為<code translate="no">access_log/</code> 。</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: 上傳存取日誌檔案的允許時間間隔。若日誌檔案的上傳時間超過此間隔，該檔案將會被刪除。將此值設為 0 可停用此功能。預設值為<strong>0</strong>。</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">格式化器設定<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>所有方法預設使用的日誌格式為<code translate="no">base</code> 格式，此格式無需與特定方法進行關聯。然而，若您希望針對特定方法自訂日誌輸出，可定義自訂日誌格式並將其套用至相關方法。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-comment"># Define custom formatters for access logs with format and applicable methods</span>
    <span class="hljs-attr">formatters:</span>
      <span class="hljs-comment"># The `base` formatter applies to all methods by default</span>
      <span class="hljs-comment"># The `base` formatter does not require specific method association</span>
      <span class="hljs-attr">base:</span> 
        <span class="hljs-comment"># Format string; an empty string means no log output</span>
        <span class="hljs-attr">format:</span> <span class="hljs-string">&quot;[$time_now] [ACCESS] &lt;$user_name: $user_addr&gt; $method_name-$method_status-$error_code [traceID: $trace_id] [timeCost: $time_cost]&quot;</span>
      <span class="hljs-comment"># Custom formatter for specific methods (e.g., Query, Search)</span>
      <span class="hljs-attr">query:</span> 
        <span class="hljs-attr">format:</span> <span class="hljs-string">&quot;[$time_now] [ACCESS] &lt;$user_name: $user_addr&gt; $method_status-$method_name [traceID: $trace_id] [timeCost: $time_cost] [database: $database_name] [collection: $collection_name] [partitions: $partition_name] [expr: $method_expr]&quot;</span>
        <span class="hljs-comment"># Specify the methods to which this custom formatter applies</span>
        <span class="hljs-attr">methods:</span> [<span class="hljs-string">&quot;Query&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.format</code>: 定義包含動態指標的日誌格式。如需更多資訊，請參閱「<a href="#reference-supported-metrics">受支援的指標</a>」。</li>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.methods</code>: 列出使用此格式化器的 Milvus 操作。如需取得方法名稱，請參閱<a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">Milvus 方法中的</a> <strong>MilvusService</strong>。</li>
</ul>
<h2 id="Reference-Supported-metrics" class="common-anchor-header">參考：受支援的指標<button data-href="#Reference-Supported-metrics" class="anchor-icon" translate="no">
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
<tr><th>指標名稱</th><th>描述</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>方法名稱</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>存取狀態：<strong>OK</strong>或<strong>Fail</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>用於查詢、搜尋或刪除操作的表達式</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>與該存取相關聯的追蹤 ID</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>使用者的 IP 位址</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>使用者名稱</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>回應資料的大小</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Milvus 專屬的錯誤代碼</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>詳細錯誤訊息</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>目標 Milvus 資料庫名稱</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>目標 Milvus 集合名稱</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>目標 Milvus 分區的名稱（一個或多個）</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>完成存取所耗費的時間</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>輸出存取日誌的時間（通常等同於 `<code translate="no">$time_end</code>`）</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>存取開始的時間</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>存取結束的時間</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>使用者所使用的 Milvus SDK 版本</td></tr>
<tr><td><code translate="no">$error_type</code></td><td>錯誤類型：<strong>system_error</strong>或<strong>input_error</strong></td></tr>
<tr><td><code translate="no">$output_fields</code></td><td>請求的輸出欄位</td></tr>
<tr><td><code translate="no">$cluster_prefix</code></td><td>設定的叢集前綴<code translate="no">msgChannel.chanNamePrefix.cluster</code></td></tr>
<tr><td><code translate="no">$consistency_level</code></td><td>請求的一致性等級</td></tr>
<tr><td><code translate="no">$anns_field</code></td><td>搜尋或混合搜尋請求的向量欄位</td></tr>
<tr><td><code translate="no">$nq</code></td><td>搜尋或混合搜尋請求的查詢向量數量</td></tr>
<tr><td><code translate="no">$search_params</code></td><td>搜尋或混合搜尋請求的搜尋參數</td></tr>
<tr><td><code translate="no">$query_params</code></td><td>查詢請求的查詢參數</td></tr>
<tr><td><code translate="no">$client_request_time</code></td><td>客戶端在 gRPC 元資料中設定的請求時間</td></tr>
<tr><td><code translate="no">$template_value_length</code></td><td>每個表達式範本值的長度</td></tr>
<tr><td><code translate="no">$partial_update</code></td><td>upsert 請求是否為部分更新</td></tr>
</tbody>
</table>
