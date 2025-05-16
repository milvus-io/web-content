---
id: configure_access_logs.md
title: Configure Access Logs
summary: ''
---
<h1 id="Configure-Access-Logs" class="common-anchor-header">Configure Access Logs<button data-href="#Configure-Access-Logs" class="anchor-icon" translate="no">
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
    </button></h1><p>The access log feature in Milvus allows server managers to record and analyze user access behavior, assisting in understanding aspects like query success rates and failure reasons.</p>
<p>This guide provides detailed instructions on configuring access logs in Milvus.</p>
<p>Configuration of access logs depends on the installation method of Milvus:</p>
<ul>
<li><strong>Helm Installation</strong>: Configure in <code translate="no">values.yaml</code>. For more information, see <a href="/docs/v2.3.x/configure-helm.md">Configure Milvus with Helm Charts</a>.</li>
<li><strong>Docker Installation</strong>: Configure in <code translate="no">milvus.yaml</code>. For more information, see <a href="/docs/v2.3.x/configure-docker.md">Configure Milvus with Docker Compose</a>.</li>
<li><strong>Operator Installation</strong>: Modify <code translate="no">spec.components</code> in the configuration file. For more information, see <a href="/docs/v2.3.x/configure_operator.md">Configure Milvus with Milvus Operator</a>.</li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">Configuration options<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>Choose among three configuration options based on your needs:</p>
<ul>
<li><strong>Base config</strong>: For general purposes.</li>
<li><strong>Config for local access log files</strong>: For storing logs locally.</li>
<li><strong>Config for uploading local access logs to MinIO</strong>: For cloud storage and backup.</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">Base config</h3><p>Basic configuration involves enabling access logs and defining the log filename or using stdout.</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is emtpy, logs will be printed to stdout.</span>
    filename: <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: Whether to enable the access log feature. Defaults to <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.filename</code>: The name of the access log file. If you leave this parameter empty, access logs will be printed to stdout.</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">Config for local access log files</h3><p>Configure local storage for access log files with parameters including the local file path, file size, and rotation interval:</p>
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
<p>These parameters are specified when <code translate="no">filename</code> is not empty.</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: The local file path where the access log file is stored.</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: The maximum size in MB allowed for a single access log file. If the log file size reaches this limit, a rotation process will be triggered. This process seals the current access log file, creates a new log file, and clears the contents of the original log file.</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: The maximum time interval in seconds allowed for rotating a single access log file. Upon reaching the specified time interval, a rotation process is triggered, resulting in the creation of a new access log file and sealing of the previous one.</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: The maximum number of sealed access log files that can be retained. If the number of sealed access log files exceeds this limit, the oldest one will be deleted.</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">Config for uploading local access log files to MinIO</h3><p>Enable and configure settings to upload local access log files to MinIO:</p>
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
<p>When configuring MinIO parameters, ensure that you have set either <code translate="no">maxSize</code> or <code translate="no">rotatedTime</code>. Failure to do so may result in unsuccessful uploads of local access log files to MinIO.</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: Whether to upload local access log files to MinIO. Defaults to <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: The path of the object storage for uploading access log files.</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: The time interval allowed for uploading access log files. If the upload time of a log file exceeds this interval, the file will be deleted. Setting the value to 0 disables this feature.</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">Formatter config<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>The default log format used for all methods is the <code translate="no">base</code> format, which does not require specific method associations. However, if you wish to customize the log output for specific methods, you can define a custom log format and apply it to the associated methods.</p>
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
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.format</code>: Defines the log format with dynamic metrics. For more information, see <a href="#reference-supported-metrics">Supported metrics</a>.</li>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.methods</code>: Lists Milvus operations using this formatter. To obtain method names, see <strong>MilvusService</strong> in <a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">Milvus methods</a>.</li>
</ul>
<h2 id="Reference-Supported-metrics" class="common-anchor-header">Reference: Supported metrics<button data-href="#Reference-Supported-metrics" class="anchor-icon" translate="no">
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
<tr><th>Metric Name</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>Name of the method</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>Status of access: <strong>OK</strong> or <strong>Fail</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>Expression used for query, search, or delete operations</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>TraceID associated with the access</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>IP address of the user</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>Name of the user</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>Size of the response data</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Error code specific to Milvus</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>Detailed error message</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>Name of the target Milvus database</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>Name of the target Milvus collection</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>Name or names of the target Milvus partition(s)</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>Time taken for completing the access</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>Time at which the access log is printed (usually equivalent to <code translate="no">$time_end</code>)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>Time at which the access starts</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>Time at which the access ends</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>Version of the Milvus SDK used by the user</td></tr>
</tbody>
</table>
