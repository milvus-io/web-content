---
id: manage-cdc-tasks.md
order: 3
summary: 擷取資料變更 (CDC) 任務可將資料從來源 Milvus 實例同步到目標 Milvus 實例。
title: 管理 CDC 任務
---
<h1 id="Manage-CDC-Tasks" class="common-anchor-header">管理 CDC 任務<button data-href="#Manage-CDC-Tasks" class="anchor-icon" translate="no">
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
    </button></h1><p>捕捉資料變更 (CDC) 任務可將資料從來源 Milvus 實例同步到目標 Milvus 實例。它監控來自來源的操作日誌，並即時複製資料變更，例如插入、刪除和索引操作到目標。這有助於實時災難復原或 Milvus 部署之間的主動負載平衡。</p>
<p>本指南涵蓋如何管理 CDC 任務，包括透過 HTTP 請求建立、暫停、恢復、擷取詳細資料、列出和刪除。</p>
<h2 id="Create-a-task" class="common-anchor-header">建立任務<button data-href="#Create-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>建立 CDC 任務可讓來源 Milvus 的資料變更作業同步到目標 Milvus。</p>
<p>要建立 CDC 任務</p>
<pre><code translate="no" class="language-bash">curl -X POST http:_//localhost:8444/cdc \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;: &quot;create&quot;,
  &quot;request_data&quot;: {
    &quot;milvus_connect_param&quot;: {
      &quot;uri&quot;: &quot;http://localhost:19530&quot;,
      &quot;token&quot;:&quot;root:Milvus&quot;,
      &quot;connect_timeout&quot;: 10
    },
    &quot;collection_infos&quot;: [
      {
        &quot;name&quot;: &quot;*&quot;
      }
    ]
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>用目標 Milvus 伺服器的 IP 位址取代<strong>localhost</strong>。</p>
<p><strong>參數</strong>：</p>
<ul>
<li><p><strong>milvus_connect_param</strong>: 目標 Milvus 的連線參數。</p>
<ul>
<li><p><strong>host</strong>: Milvus 伺服器的主機名稱或 IP 位址。</p></li>
<li><p><strong>port</strong>：Milvus 伺服器所監聽的連接埠號。</p></li>
<li><p><strong>username</strong>: 用於驗證 Milvus 伺服器的使用者名稱。</p></li>
<li><p><strong>password</strong>: 用於驗證 Milvus 伺服器的密碼。</p></li>
<li><p><strong>enable_tls</strong>：是否使用 TLS/SSL 加密連線。</p></li>
<li><p><strong>connect_timeout</strong>：建立連線的逾時時間，以秒為單位。</p></li>
</ul></li>
<li><p><strong>collection_infos</strong>：要同步的集合。目前只支援星號<strong>(*</strong>)，因為 Milvus-CDC 同步處理的是群集層級，而非個別的集合。</p></li>
</ul>
<p>預期回應：</p>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {
    <span class="hljs-string">&quot;task_id&quot;</span>:<span class="hljs-string">&quot;xxxx&quot;</span>
  }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-tasks" class="common-anchor-header">列出任務<button data-href="#List-tasks" class="anchor-icon" translate="no">
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
    </button></h2><p>列出所有已建立的 CDC 任務：</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;: &quot;list&quot;
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>將<strong>localhost</strong>改為目標 Milvus 伺服器的 IP 位址。</p>
<p>預期回應：</p>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {
    <span class="hljs-string">&quot;tasks&quot;</span>: [
      {
        <span class="hljs-string">&quot;task_id&quot;</span>: <span class="hljs-string">&quot;xxxxx&quot;</span>,
        <span class="hljs-string">&quot;milvus_connect_param&quot;</span>: {
          <span class="hljs-string">&quot;uri&quot;</span>:<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
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
<h2 id="Pause-a-task" class="common-anchor-header">暫停任務<button data-href="#Pause-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>要暫停 CDC 任務：</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;pause&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;xxxx&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>用目標 Milvus 伺服器的 IP 位址取代<strong>localhost</strong>。</p>
<p><strong>參數</strong>：</p>
<ul>
<li><strong>task_id</strong>：要暫停的 CDC 任務的 ID。</li>
</ul>
<p>預期回應：</p>
<pre><code translate="no" class="language-bash">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Resume-a-task" class="common-anchor-header">恢復任務<button data-href="#Resume-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>若要恢復暫停的 CDC 任務，請</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;resume&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;xxxx&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>將<strong>localhost</strong>改為目標 Milvus 伺服器的 IP 位址。</p>
<p><strong>參數</strong>：</p>
<ul>
<li><strong>task_id</strong>：要恢復的 CDC 任務的 ID。</li>
</ul>
<p>預期回應：</p>
<pre><code translate="no" class="language-bash">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Retrieve-task-details" class="common-anchor-header">擷取任務詳細資訊<button data-href="#Retrieve-task-details" class="anchor-icon" translate="no">
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
    </button></h2><p>擷取特定 CDC 任務的詳細資訊：</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;get&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;xxxx&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>將<strong>localhost</strong>改為目標 Milvus 伺服器的 IP 位址。</p>
<p><strong>參數</strong>：</p>
<ul>
<li><strong>task_id</strong>：要查詢的 CDC 任務的 ID。</li>
</ul>
<p>預期回應：</p>
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
        <span class="hljs-string">&quot;uri&quot;</span>:<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
      },
      <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Running&quot;</span>,
      <span class="hljs-string">&quot;task_id&quot;</span>: <span class="hljs-string">&quot;xxxx&quot;</span>
    }
  }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-a-task" class="common-anchor-header">刪除任務<button data-href="#Delete-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>刪除 CDC 任務：</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;delete&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;30d1e325df604ebb99e14c2a335a1421&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>用目標 Milvus 伺服器的 IP 位址取代<strong>localhost</strong>。</p>
<p><strong>參數</strong>：</p>
<ul>
<li><strong>task_id</strong>：要刪除的 CDC 任務的 ID。</li>
</ul>
<p>預期回應：</p>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
