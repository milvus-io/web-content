---
id: configure_access_logs.md
title: 配置访问日志
summary: ''
---
<h1 id="Configure-Access-Logs" class="common-anchor-header">配置访问日志<button data-href="#Configure-Access-Logs" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 的访问日志功能允许服务器管理人员记录和分析用户访问行为，帮助了解查询成功率和失败原因等方面。</p>
<p>本指南提供在 Milvus 中配置访问日志的详细说明。</p>
<p>访问日志的配置取决于 Milvus 的安装方法：</p>
<ul>
<li><strong>Helm 安装</strong>：在<code translate="no">values.yaml</code> 中配置。有关详细信息，请参阅<a href="/docs/zh/v2.4.x/configure-helm.md">使用 Helm 图表配置 Milvus</a>。</li>
<li><strong>Docker 安装</strong>：在<code translate="no">milvus.yaml</code> 中配置。更多信息，请参阅<a href="/docs/zh/v2.4.x/configure-docker.md">使用 Docker Compose 配置 Milvus</a>。</li>
<li><strong>操作员安装</strong>：修改配置文件中的<code translate="no">spec.components</code> 。更多信息，请参阅<a href="/docs/zh/v2.4.x/configure_operator.md">使用 Milvus Operator 配置 Milvus</a>。</li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">配置选项<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>根据您的需要从三种配置选项中进行选择：</p>
<ul>
<li><strong>基本配置</strong>：用于一般用途。</li>
<li><strong>本地访问日志文件配置</strong>：用于在本地存储日志。</li>
<li><strong>将本地访问日志上传到 MinIO 的配置</strong>：用于云存储和备份。</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">基本配置</h3><p>基本配置包括启用访问日志、定义日志文件名或使用 stdout。</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is emtpy, logs will be printed to stdout.</span>
    filename: <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>:是否启用访问日志功能。默认为<strong>false</strong>。</li>
<li><code translate="no">proxy.accessLog.filename</code>:访问日志文件的名称。如果此参数为空，访问日志将打印到 stdout。</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">配置本地访问日志文件</h3><p>配置访问日志文件的本地存储，参数包括本地文件路径、文件大小和旋转间隔：</p>
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
<p>这些参数在<code translate="no">filename</code> 不为空时指定。</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>:存储访问日志文件的本地文件路径。</li>
<li><code translate="no">proxy.accessLog.maxSize</code>:单个访问日志文件允许的最大大小（MB）。如果日志文件大小达到此限制，将触发一个轮换进程。该过程会封存当前的访问日志文件，创建新的日志文件，并清除原始日志文件的内容。</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>:旋转单个访问日志文件的最大时间间隔（秒）。达到指定的时间间隔后，将触发轮换进程，创建新的访问日志文件并封存前一个文件。</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>:可保留的密封访问日志文件的最大数量。如果封存的访问日志文件数量超过此限制，则会删除最旧的文件。</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">将本地访问日志文件上传到 MinIO 的配置</h3><p>启用并配置将本地访问日志文件上传到 MinIO 的设置：</p>
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
<p>配置 MinIO 参数时，请确保已设置<code translate="no">maxSize</code> 或<code translate="no">rotatedTime</code> 。否则可能导致无法成功将本地访问日志文件上传到 MinIO。</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>:是否将本地访问日志文件上传到 MinIO。默认为<strong>false</strong>。</li>
<li><code translate="no">proxy.accessLog.remotePath</code>:用于上传访问日志文件的对象存储路径。</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>:允许上传访问日志文件的时间间隔。如果日志文件的上传时间超过此时间间隔，文件将被删除。将值设为 0 则禁用此功能。</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">格式配置<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>所有方法使用的默认日志格式是<code translate="no">base</code> 格式，它不需要特定的方法关联。不过，如果希望自定义特定方法的日志输出，可以定义自定义日志格式并将其应用于相关方法。</p>
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
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.format</code>:使用动态指标定义日志格式。更多信息，请参阅<a href="#reference-supported-metrics">支持的指标</a>。</li>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.methods</code>:列出使用此格式的 Milvus 操作。要获取方法名称，请参阅<a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">Milvus 方法</a>中的<strong>MilvusService</strong>。</li>
</ul>
<h2 id="Reference-Supported-metrics" class="common-anchor-header">参考：支持的度量<button data-href="#Reference-Supported-metrics" class="anchor-icon" translate="no">
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
<tr><th>指标名称</th><th>描述</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>方法名称</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>访问状态：<strong>确定</strong>或<strong>失败</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>用于查询、搜索或删除操作的表达式</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>与访问相关的跟踪 ID</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>用户的 IP 地址</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>用户名</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>响应数据的大小</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Milvus 特有的错误代码</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>详细错误信息</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>目标 Milvus 数据库名称</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>目标 Milvus 集合名称</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>目标 Milvus 分区的名称或名称</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>完成访问所需的时间</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>打印访问日志的时间（通常相当于<code translate="no">$time_end</code>)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>开始访问的时间</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>访问结束时间</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>用户使用的 Milvus SDK 版本</td></tr>
</tbody>
</table>
