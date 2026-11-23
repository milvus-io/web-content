---
id: configure_access_logs.md
title: 配置访问日志
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
    </button></h1><p>Milvus 中的访问日志功能允许服务器管理员记录和分析用户访问行为，从而帮助了解查询成功率及失败原因等方面的情况。</p>
<p>本指南提供了关于在 Milvus 中配置访问日志的详细说明。</p>
<p>访问日志的配置取决于 Milvus 的安装方式：</p>
<ul>
<li><strong>Helm 安装</strong>：请参阅<code translate="no">values.yaml</code> 进行配置。如需更多信息，请参阅《<a href="/docs/zh/configure-helm.md">使用 Helm Charts 配置 Milvus</a>》。</li>
<li><strong>Docker 安装</strong>：在<code translate="no">milvus.yaml</code> 中进行配置。有关更多信息，请参阅《<a href="/docs/zh/configure-docker.md">使用 Docker Compose 配置 Milvus</a>》。</li>
<li><strong>Operator 安装</strong>：在配置文件中修改<code translate="no">spec.components</code> 。有关更多信息，请参阅《<a href="/docs/zh/configure_operator.md">使用 Milvus Operator 配置 Milvus</a>》。</li>
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
    </button></h2><p>根据您的需求，从以下三种配置选项中进行选择：</p>
<ul>
<li><strong>基础配置</strong>：适用于一般用途。</li>
<li><strong>本地访问日志文件配置</strong>：用于在本地存储日志。</li>
<li><strong>将本地访问日志上传至 MinIO 的配置</strong>：用于云存储和备份。</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">基本配置<button data-href="#Base-config" class="anchor-icon" translate="no">
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
    </button></h3><p>基本配置包括启用访问日志并定义日志文件名，或使用标准输出（stdout）。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is empty, logs will be printed to stdout.</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: 是否启用访问日志功能。默认值为<strong>false</strong>。</li>
<li><code translate="no">proxy.accessLog.filename</code>：访问日志文件的名称。如果此参数留空，访问日志将输出到标准输出（stdout）。</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">本地访问日志文件的配置<button data-href="#Config-for-local-access-log-files" class="anchor-icon" translate="no">
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
    </button></h3><p>通过包括本地文件路径、文件大小和轮换间隔在内的参数，配置访问日志文件的本地存储：</p>
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
<p>当 `<code translate="no">filename</code> ` 不为空时，需指定这些参数。</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: 访问日志文件的本地存储路径。默认值为<code translate="no">/tmp/milvus_access</code> 。</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: 单个访问日志文件允许的最大大小（单位为 MB）。如果日志文件大小达到此限制，将触发轮换过程。该过程会封存当前访问日志文件，创建新日志文件，并清空原始日志文件的内容。默认值为<strong>64</strong>。</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: 允许对单个访问日志文件进行轮换的最大时间间隔（以秒为单位）。达到指定时间间隔后，将触发轮换过程，从而创建新的访问日志文件并封存前一个日志文件。默认值为<strong>0</strong>。</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: 可保留的已封存访问日志文件的最大数量。如果已封存的访问日志文件数量超过此限制，则会删除最旧的一个。默认值为<strong>8</strong>。</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">将本地访问日志文件上传至 MinIO 的配置<button data-href="#Config-for-uploading-local-access-log-files-to-MinIO" class="anchor-icon" translate="no">
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
    </button></h3><p>启用并配置将本地访问日志文件上传至 MinIO 的设置：</p>
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
<p>配置 MinIO 参数时，请确保已设置 `<code translate="no">maxSize</code> ` 或 `<code translate="no">rotatedTime</code>` 之一。否则可能会导致本地访问日志文件无法成功上传至 MinIO。</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: 是否将本地访问日志文件上传至 MinIO。默认值为<strong>false</strong>。</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: 上传访问日志文件的对象存储路径。默认值为<code translate="no">access_log/</code> 。</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: 上传访问日志文件的允许时间间隔。如果日志文件的上传时间超过此间隔，该文件将被删除。将该值设置为 0 可禁用此功能。默认值为<strong>0</strong>。</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">格式化器配置<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>所有方法默认使用的日志格式为<code translate="no">base</code> 格式，该格式无需与特定方法关联。但若需为特定方法自定义日志输出，可定义自定义日志格式并将其应用于相关方法。</p>
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
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.format</code>: 定义包含动态指标的日志格式。有关详细信息，请参阅<a href="#reference-supported-metrics">“支持的指标”</a>。</li>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.methods</code>: 列出使用此格式器的 Milvus 操作。要获取方法名称，请参阅<a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">Milvus 方法中的</a> <strong>MilvusService</strong>。</li>
</ul>
<h2 id="Reference-Supported-metrics" class="common-anchor-header">参考：支持的指标<button data-href="#Reference-Supported-metrics" class="anchor-icon" translate="no">
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
<tr><td><code translate="no">$method_status</code></td><td>访问状态：<strong>OK</strong>或<strong>Fail</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>用于查询、搜索或删除操作的表达式</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>与该访问关联的 TraceID</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>用户的 IP 地址</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>用户名称</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>响应数据的大小</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Milvus 特有的错误代码</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>详细错误信息</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>目标 Milvus 数据库的名称</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>目标 Milvus Collection 的名称</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>目标 Milvus 分区的名称（一个或多个）</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>完成访问所耗时间</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>打印访问日志的时间（通常等同于<code translate="no">$time_end</code> ）</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>访问开始的时间</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>访问结束的时间</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>用户使用的 Milvus SDK 版本</td></tr>
<tr><td><code translate="no">$error_type</code></td><td>错误类型：<strong>system_error</strong>或<strong>input_error</strong></td></tr>
<tr><td><code translate="no">$output_fields</code></td><td>请求的输出字段</td></tr>
<tr><td><code translate="no">$cluster_prefix</code></td><td>设置的集群前缀<code translate="no">msgChannel.chanNamePrefix.cluster</code></td></tr>
<tr><td><code translate="no">$consistency_level</code></td><td>请求的一致性级别</td></tr>
<tr><td><code translate="no">$anns_field</code></td><td>搜索或混合搜索请求的向量字段</td></tr>
<tr><td><code translate="no">$nq</code></td><td>搜索或混合搜索请求的查询向量数量</td></tr>
<tr><td><code translate="no">$search_params</code></td><td>搜索或混合搜索请求的搜索参数</td></tr>
<tr><td><code translate="no">$query_params</code></td><td>查询请求的查询参数</td></tr>
<tr><td><code translate="no">$client_request_time</code></td><td>客户端在 gRPC 元数据中设置的请求时间</td></tr>
<tr><td><code translate="no">$template_value_length</code></td><td>每个表达式模板值的长度</td></tr>
<tr><td><code translate="no">$partial_update</code></td><td>upsert请求是否为部分更新</td></tr>
</tbody>
</table>
