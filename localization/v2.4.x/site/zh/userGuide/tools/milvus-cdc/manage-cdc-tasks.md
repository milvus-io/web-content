---
id: manage-cdc-tasks.md
order: 3
summary: 捕获数据更改 (CDC) 任务可将数据从源 Milvus 实例同步到目标 Milvus 实例。
title: 管理疾病预防控制中心任务
---
<h1 id="Manage-CDC-Tasks" class="common-anchor-header">管理 CDC 任务<button data-href="#Manage-CDC-Tasks" class="anchor-icon" translate="no">
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
    </button></h1><p>捕获数据更改（CDC）任务可实现从源 Milvus 实例到目标 Milvus 实例的数据同步。它监控源操作日志，并将插入、删除和索引操作等数据变更实时复制到目标。这有助于 Milvus 部署之间的实时灾难恢复或主动-主动负载平衡。</p>
<p>本指南介绍如何管理 CDC 任务，包括通过 HTTP 请求创建、暂停、恢复、检索详细信息、列表和删除。</p>
<h2 id="Create-a-task" class="common-anchor-header">创建任务<button data-href="#Create-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>创建 CDC 任务可将源 Milvus 中的数据更改操作同步到目标 Milvus。</p>
<p>创建 CDC 任务</p>
<pre><code translate="no" class="language-bash">curl -X POST http:_//localhost:8444/cdc \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;: &quot;create&quot;,
  &quot;request_data&quot;: {
    &quot;milvus_connect_param&quot;: {
      &quot;host&quot;: &quot;localhost&quot;,
      &quot;port&quot;: 19530,
      &quot;username&quot;: &quot;root&quot;,
      &quot;password&quot;: &quot;Milvus&quot;,
      &quot;enable_tls&quot;: false,
      &quot;connect_timeout&quot;: 10
    },
    &quot;collection_infos&quot;: [
      {
        &quot;name&quot;: &quot;*&quot;
      }
    ],
    &quot;rpc_channel_info&quot;: {
      &quot;name&quot;: &quot;by-dev-replicate-msg&quot;
    }
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>用目标 Milvus 服务器的 IP 地址替换<strong>localhost</strong>。</p>
<p><strong>参数</strong>：</p>
<ul>
<li><p><strong>milvus_connect_param</strong>：目标<strong>Milvus</strong> 的连接参数。</p>
<ul>
<li><p><strong>host</strong>：Milvus 服务器的主机名或 IP 地址。</p></li>
<li><p><strong>port：端口号</strong>：Milvus 服务器监听的端口号。</p></li>
<li><p><strong>username</strong>：用于验证 Milvus 服务器的用户名。</p></li>
<li><p><strong>password</strong>：用于验证 Milvus 服务器的密码。</p></li>
<li><p><strong>enable_tls</strong>：是否为连接使用 TLS/SSL 加密。</p></li>
<li><p><strong>connect_timeout（连接超时）</strong>：建立连接的超时时间（秒）。</p></li>
</ul></li>
<li><p><strong>collection_infos</strong>：要同步的集合。目前只支持星号<strong>(*</strong>)，因为 Milvus-CDC 同步的是集群级别，而不是单个集合。</p></li>
<li><p><strong>rpc_channel_info</strong>：用于同步的 RPC 通道名称，由源 Milvus 配置中<strong>common.chanNamePrefix.cluster</strong>和<strong>common.chanNamePrefix.replicateMsg</strong>的值连接而成，以连字符<strong>(-</strong>) 分隔。</p></li>
</ul>
<p>预期响应：</p>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {
    <span class="hljs-string">&quot;task_id&quot;</span>:<span class="hljs-string">&quot;xxxx&quot;</span>
  }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-tasks" class="common-anchor-header">列出任务<button data-href="#List-tasks" class="anchor-icon" translate="no">
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
    </button></h2><p>列出所有已创建的 CDC 任务：</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;: &quot;list&quot;
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>用目标 Milvus 服务器的 IP 地址替换<strong>localhost</strong>。</p>
<p>预期响应</p>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {
    <span class="hljs-string">&quot;tasks&quot;</span>: [
      {
        <span class="hljs-string">&quot;task_id&quot;</span>: <span class="hljs-string">&quot;xxxxx&quot;</span>,
        <span class="hljs-string">&quot;milvus_connect_param&quot;</span>: {
          <span class="hljs-string">&quot;host&quot;</span>: <span class="hljs-string">&quot;localhost&quot;</span>,
          <span class="hljs-string">&quot;port&quot;</span>: <span class="hljs-number">19530</span>,
          <span class="hljs-string">&quot;connect_timeout&quot;</span>: <span class="hljs-number">10</span>
        },
        <span class="hljs-string">&quot;collection_infos&quot;</span>: [
          {
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>
          }
        ],
        <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Running&quot;</span>
      }
    ]
  }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Pause-a-task" class="common-anchor-header">暂停任务<button data-href="#Pause-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>要暂停 CDC 任务：</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;pause&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;xxxx&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>用目标 Milvus 服务器的 IP 地址替换<strong>localhost</strong>。</p>
<p><strong>参数</strong></p>
<ul>
<li><strong>task_id</strong>：要暂停的 CDC 任务的 ID。</li>
</ul>
<p>预期响应：</p>
<pre><code translate="no" class="language-bash">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Resume-a-task" class="common-anchor-header">恢复任务<button data-href="#Resume-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>恢复已暂停的 CDC 任务：</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;resume&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;xxxx&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>用目标 Milvus 服务器的 IP 地址替换<strong>localhost</strong>。</p>
<p><strong>参数</strong></p>
<ul>
<li><strong>task_id</strong>：要恢复的 CDC 任务的 ID。</li>
</ul>
<p>预期响应：</p>
<pre><code translate="no" class="language-bash">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Retrieve-task-details" class="common-anchor-header">检索任务详细信息<button data-href="#Retrieve-task-details" class="anchor-icon" translate="no">
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
    </button></h2><p>检索特定 CDC 任务的详细信息：</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;get&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;xxxx&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>用目标 Milvus 服务器的 IP 地址替换<strong>localhost</strong>。</p>
<p><strong>参数</strong></p>
<ul>
<li><strong>task_id</strong>：要查询的 CDC 任务的 ID。</li>
</ul>
<p>预期响应：</p>
<pre><code translate="no" class="language-bash">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {
    <span class="hljs-string">&quot;Task&quot;</span>: {
      <span class="hljs-string">&quot;collection_infos&quot;</span>: [
        {
          <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>
        }
      ],
      <span class="hljs-string">&quot;milvus_connect_param&quot;</span>: {
        <span class="hljs-string">&quot;connect_timeout&quot;</span>: <span class="hljs-number">10</span>,
        <span class="hljs-string">&quot;enable_tls&quot;</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-string">&quot;host&quot;</span>: <span class="hljs-string">&quot;localhost&quot;</span>,
        <span class="hljs-string">&quot;port&quot;</span>: <span class="hljs-number">19530</span>
      },
      <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Running&quot;</span>,
      <span class="hljs-string">&quot;task_id&quot;</span>: <span class="hljs-string">&quot;xxxx&quot;</span>
    }
  }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-a-task" class="common-anchor-header">删除任务<button data-href="#Delete-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>删除 CDC 任务：</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;delete&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;30d1e325df604ebb99e14c2a335a1421&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>用目标 Milvus 服务器的 IP 地址替换<strong>localhost</strong>。</p>
<p><strong>参数</strong></p>
<ul>
<li><strong>task_id</strong>：要删除的 CDC 任务的 ID。</li>
</ul>
<p>预期响应：</p>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
