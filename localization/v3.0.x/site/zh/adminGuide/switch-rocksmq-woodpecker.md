---
id: switch-rocksmq-woodpecker.md
title: 在 RocksMQ 和 Woodpecker 之间切换
summary: 将 Milvus Standalone 部署（Docker Compose）的消息队列在 RocksMQ 和 Woodpecker 之间切换。
---
<h1 id="Switch-between-RocksMQ-and-Woodpecker" class="common-anchor-header">在 RocksMQ 和 Woodpecker 之间切换<button data-href="#Switch-between-RocksMQ-and-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>本页面介绍如何将<strong>Milvus Standalone（Docker Compose）</strong>的消息队列（MQ）在<strong>RocksMQ</strong>和<strong>Woodpecker</strong>（本地或 MinIO 后端）之间双向切换。有关一般工作流和先决条件，请参阅《<a href="/docs/zh/switch-mq-type.md">切换 MQ 类型</a>》。</p>
<div class="alert note">
<ul>
<li><strong>先决条件：</strong>MQ 切换功能仅在<strong>Milvus 3.0 及更高版本中</strong>提供。开始操作前，请将您的 Milvus 实例升级至 Milvus 3.0 或更高版本——此功能在更早版本中不可用。</li>
<li>MQ 切换需要 Docker<strong>Compose</strong>部署（该部署启用了 etcd 配置源）。单容器 Docker 部署不支持切换。</li>
</ul>
</div>
<h2 id="Switch-from-RocksMQ-to-Woodpecker" class="common-anchor-header">从 RocksMQ 切换至 Woodpecker<button data-href="#Switch-from-RocksMQ-to-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">步骤 1：验证 Milvus 实例是否正在运行<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>请确认您的 Milvus Standalone Docker Compose 实例运行正常——例如，通过创建测试 Collection、插入数据并执行查询来验证。</p>
<h3 id="Step-2-Configure-Woodpecker-storage" class="common-anchor-header">步骤 2：配置 Woodpecker 存储<button data-href="#Step-2-Configure-Woodpecker-storage" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>在不</strong>更改<code translate="no">mqType</code> 值<strong>的情况下，</strong>将 Woodpecker 设置添加到 Milvus 配置中。运行 `<code translate="no">docker exec -it milvus-standalone bash</code> ` 进入容器，然后编辑 `<code translate="no">/milvus/configs/user.yaml</code>`：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span>   <span class="hljs-comment"># minio or local</span>
<button class="copy-code-btn"></button></code></pre>
<p>重启 Milvus 实例以应用配置：</p>
<pre><code translate="no" class="language-shell">docker compose restart
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">步骤 3：执行 MQ 切换<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>如果这是您首次切换到 Woodpecker，请跳过此说明。否则，在再次切换之前，请清理残留的 Woodpecker 元数据和数据——残留数据可能会导致意外行为。</p>
</div>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:&lt;mixcoord_port&gt;/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>MixCoord 端口通常为<code translate="no">9091</code> 。</p>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">步骤 4：验证切换是否完成<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">docker logs milvus-standalone | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>切换成功时会记录<code translate="no">[mqTypeValue=woodpecker]</code> 。</p>
<h3 id="Step-5-Optional-Clean-up-RocksMQ-data" class="common-anchor-header">步骤 5：（可选）清理 RocksMQ 数据<button data-href="#Step-5-Optional-Clean-up-RocksMQ-data" class="anchor-icon" translate="no">
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
    </button></h3><p>RocksMQ 数据位于<code translate="no">docker-compose.yaml</code> 中定义的<code translate="no">volumes/milvus/rdb_data</code> 和<code translate="no">volumes/milvus/rdb_data_meta_kv</code> 目录下。如果您计划稍后切换回 RocksMQ，请先清理这些文件以避免冲突。</p>
<h2 id="Switch-from-Woodpecker-to-RocksMQ" class="common-anchor-header">从 Woodpecker 切换到 RocksMQ<button data-href="#Switch-from-Woodpecker-to-RocksMQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">步骤 1：验证 Milvus 实例是否正在运行<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>确保您的 Milvus Standalone Docker Compose 实例正在正常运行。</p>
<h3 id="Step-2-Execute-the-MQ-switch" class="common-anchor-header">步骤 2：执行 MQ 切换<button data-href="#Step-2-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>确保实例中没有之前运行留下的 RocksMQ 残留数据。如果您是首次切换到 RocksMQ，请跳过此说明；否则，请先清理相关的 RocksMQ 元数据和数据。</p>
</div>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:&lt;mixcoord_port&gt;/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;rocksmq&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Verify-the-switch-is-complete" class="common-anchor-header">步骤 3：验证切换是否完成<button data-href="#Step-3-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">docker logs milvus-standalone | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>切换成功时会记录日志：<code translate="no">[mqTypeValue=rocksmq]</code> 。</p>
<h3 id="Step-4-Optional-Clean-up-Woodpecker-data" class="common-anchor-header">步骤 4：（可选）清理 Woodpecker 数据<button data-href="#Step-4-Optional-Clean-up-Woodpecker-data" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>元数据（etcd）：</strong>Woodpecker 键的前缀通常为<code translate="no">woodpecker/...</code> 。通过<code translate="no">etcdctl get woodpecker --prefix</code> 查看该键，然后将其删除。</li>
<li><strong>存储数据：</strong>在<strong>MinIO 模式下</strong>，删除存储桶中<code translate="no">&lt;rootPath&gt;/wp/...</code> 下的日志数据（通常位于<code translate="no">files/wp/...</code> ）；在<strong>本地模式下</strong>，数据位于本地磁盘的<code translate="no">volumes/milvus/data/wp/...</code> 路径下。</li>
</ul>
<p>如果您计划稍后切换回 Woodpecker，请先清理这些文件以避免冲突。</p>
<h2 id="Supported-scenarios" class="common-anchor-header">支持的场景<button data-href="#Supported-scenarios" class="anchor-icon" translate="no">
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
<tr><th>源 MQ</th><th>目标 MQ</th><th>状态</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td>RocksMQ</td><td>Woodpecker (MinIO/本地)</td><td><strong>已支持</strong></td><td></td></tr>
<tr><td>Woodpecker (MinIO/本地)</td><td>RocksMQ</td><td><strong>已支持</strong></td><td></td></tr>
<tr><td>Woodpecker MinIO</td><td>Woodpecker 本地</td><td><strong>不支持</strong></td><td>在 Woodpecker 存储模式之间切换需要额外的元数据处理，目前尚不支持。</td></tr>
<tr><td>Woodpecker 本地</td><td>Woodpecker MinIO</td><td><strong>不支持</strong></td><td>同上。</td></tr>
<tr><td>RocksMQ / Woodpecker</td><td>外部 Pulsar / Kafka</td><td><strong>受支持但不推荐</strong></td><td>请尽可能简化独立实例的配置。</td></tr>
</tbody>
</table>
