---
id: configure_access_logs.md
title: 配置訪問日誌
---

<h1 id="Configure-Access-Logs" class="common-anchor-header">配置訪問日誌<button data-href="#Configure-Access-Logs" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 的存取日誌功能允許伺服器管理員記錄和分析使用者的存取行為，協助瞭解查詢成功率和失敗原因等方面。</p>
<p>本指南提供在 Milvus 中配置訪問日誌的詳細說明。</p>
<p>存取日誌的設定取決於 Milvus 的安裝方式：</p>
<ul>
<li><strong>Helm 安裝</strong>：配置在<code translate="no">values.yaml</code> 。如需詳細資訊，請參閱<a href="/docs/zh-hant/v2.5.x/configure-helm.md">使用 Helm Charts 配置 Milvus</a>。</li>
<li><strong>Docker 安裝</strong>：配置在<code translate="no">milvus.yaml</code> 。如需詳細資訊，請參閱<a href="/docs/zh-hant/v2.5.x/configure-docker.md">使用 Docker Compose 配置 Milvus</a>。</li>
<li><strong>操作員安裝</strong>：在設定檔中修改<code translate="no">spec.components</code> 。如需詳細資訊，請參閱<a href="/docs/zh-hant/v2.5.x/configure_operator.md">使用 Milvus Operator 配置 Milvus</a>。</li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">組態選項<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>根據您的需求，從三個組態選項中選擇：</p>
<ul>
<li><strong>基本配置</strong>：用於一般用途。</li>
<li><strong>本機存取記錄檔的組態</strong>：用於在本機儲存記錄。</li>
<li><strong>將本機存取記錄上傳至 MinIO 的組態</strong>：用於雲端儲存與備份。</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">基本設定</h3><p>基本設定包括啟用存取日誌、定義日誌檔名或使用 stdout。</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is emtpy, logs will be printed to stdout.</span>
    filename: <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>:是否啟用存取記錄功能。預設為<strong>false</strong>。</li>
<li><code translate="no">proxy.accessLog.filename</code>:存取日誌檔案名稱。如果將此參數留空，存取日誌會列印到 stdout。</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">配置本機存取日誌檔案</h3><p>設定存取日誌檔案的本機儲存，參數包括本機檔案路徑、檔案大小和輪換時間間隔：</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    enable: true
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span> <span class="hljs-comment"># Name of the access log file</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span> <span class="hljs-comment"># Local file path where the access log file is stored</span>
    maxSize: <span class="hljs-number">500</span> <span class="hljs-comment"># Max size for each single access log file. Unit: MB</span>
    rotatedTime: <span class="hljs-number">24</span> <span class="hljs-comment"># Time interval for log rotation. Unit: seconds</span>
    maxBackups: <span class="hljs-number">7</span> <span class="hljs-comment"># Max number of sealed access log files that can be retained</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>這些參數會在<code translate="no">filename</code> 不為空時指定。</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>:儲存存取記錄檔的本機檔案路徑。</li>
<li><code translate="no">proxy.accessLog.maxSize</code>:單一存取記錄檔允許的最大大小 (MB)。如果日誌檔案大小達到此限制，就會啟動輪換程序。此程序會封鎖目前的存取記錄檔，建立新的記錄檔，並清除原始記錄檔的內容。</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>:允許輪換單一存取記錄檔的最大時間間隔 (以秒為單位)。當達到指定的時間間隔，就會觸發輪換程序，建立新的存取記錄檔，並封存先前的存取記錄檔。</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>:可保留的最大封存存取記錄檔數量。如果封存的存取日誌檔案數量超過此限制，則會刪除最舊的檔案。</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">將本機存取記錄檔上傳至 MinIO 的設定</h3><p>啟用並設定將本機存取記錄檔上傳至 MinIO 的設定：</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    maxSize: 500
    rotatedTime: 24 
    maxBackups: 7
    minioEnable: <span class="hljs-literal">true</span>
    remotePath: <span class="hljs-string">&quot;/milvus/logs/access_logs&quot;</span>
    remoteMaxTime: 0
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>設定 MinIO 參數時，請確認已設定<code translate="no">maxSize</code> 或<code translate="no">rotatedTime</code> 。否則可能會導致無法成功上傳本機存取記錄檔到 MinIO。</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>:是否將本機存取記錄檔上傳至 MinIO。預設為<strong>false</strong>。</li>
<li><code translate="no">proxy.accessLog.remotePath</code>:上傳存取記錄檔的物件儲存路徑。</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>:允許上傳存取記錄檔的時間間隔。如果日誌檔案的上傳時間超過此時間間隔，檔案會被刪除。將值設為 0 會停用此功能。</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">格式設定<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>所有方法使用的預設記錄格式是<code translate="no">base</code> 格式，不需要特定的方法關聯。但是，如果您希望自訂特定方法的日誌輸出，您可以定義自訂的日誌格式，並應用在關聯的方法上。</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-comment"># Define custom formatters for access logs with format and applicable methods</span>
    formatters:
      <span class="hljs-comment"># The `base` formatter applies to all methods by default</span>
      <span class="hljs-comment"># The `base` formatter does not require specific method association</span>
      base: 
        <span class="hljs-comment"># Format string; an empty string means no log output</span>
        format: <span class="hljs-string">&quot;[<span class="hljs-variable">$time_now</span>] [ACCESS] &lt;<span class="hljs-variable">$user_name</span>: <span class="hljs-variable">$user_addr</span>&gt; <span class="hljs-variable">$method_name</span>-<span class="hljs-variable">$method_status</span>-<span class="hljs-variable">$error_code</span> [traceID: <span class="hljs-variable">$trace_id</span>] [timeCost: <span class="hljs-variable">$time_cost</span>]&quot;</span>
      <span class="hljs-comment"># Custom formatter for specific methods (e.g., Query, Search)</span>
      query: 
        format: <span class="hljs-string">&quot;[<span class="hljs-variable">$time_now</span>] [ACCESS] &lt;<span class="hljs-variable">$user_name</span>: <span class="hljs-variable">$user_addr</span>&gt; <span class="hljs-variable">$method_status</span>-<span class="hljs-variable">$method_name</span> [traceID: <span class="hljs-variable">$trace_id</span>] [timeCost: <span class="hljs-variable">$time_cost</span>] [database: <span class="hljs-variable">$database_name</span>] [collection: <span class="hljs-variable">$collection_name</span>] [partitions: <span class="hljs-variable">$partition_name</span>] [expr: <span class="hljs-variable">$method_expr</span>]&quot;</span>
        <span class="hljs-comment"># Specify the methods to which this custom formatter applies</span>
        methods: [<span class="hljs-string">&quot;Query&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.format</code>:使用動態度量定義日誌格式。如需詳細資訊，請參閱<a href="#reference-supported-metrics">支援的度量</a>。</li>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.methods</code>:列出使用此格式的 Milvus 操作。要取得方法名稱，請參閱<a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">Milvus 方法</a>中的<strong>MilvusService</strong>。</li>
</ul>
<h2 id="Reference-Supported-metrics" class="common-anchor-header">參考：支援的度量<button data-href="#Reference-Supported-metrics" class="anchor-icon" translate="no">
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
<tr><th>公制名稱</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>方法名稱</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>存取狀態：<strong>確定</strong>或<strong>失敗</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>用於查詢、搜尋或刪除操作的表達式</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>與存取相關聯的 TraceID</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>使用者的 IP 位址</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>使用者名稱</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>回應資料的大小</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Milvus 特有的錯誤代碼</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>詳細錯誤資訊</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>目標 Milvus 資料庫名稱</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>目標 Milvus 收集的名稱</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>目標 Milvus 磁碟分割的名稱</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>完成存取所花的時間</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>列印存取記錄的時間 (通常相等於<code translate="no">$time_end</code>)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>開始存取的時間</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>存取結束的時間</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>使用者使用的 Milvus SDK 版本</td></tr>
</tbody>
</table>
