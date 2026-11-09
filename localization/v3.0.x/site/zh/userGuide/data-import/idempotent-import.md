---
id: idempotent-import.md
order: 2
title: 幂等批量导入
summary: 发送一个幂等键，以便重试批量导入时能恢复到原始任务，而不是创建第二个任务。
---
<h1 id="Idempotent-Bulk-Import" class="common-anchor-header">幂等批量导入<button data-href="#Idempotent-Bulk-Import" class="anchor-icon" translate="no">
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
    </button></h1><p>批量导入请求可能成功，但其响应却丢失了：可能是调用超时、连接中断，或者您的编排器在保存返回的<code translate="no">jobId</code> 之前已崩溃。您无法区分“未完成”和“已完成但响应丢失”这两种情况。重试会启动第二个任务，导致每行数据被导入两次；而不重试则可能导致导入失败。</p>
<p>幂等键消除了这种两难选择。为请求标记一个幂等键后，携带相同键的重试请求将返回原始的<code translate="no">jobId</code> ，而非创建第二个任务。</p>
<p>支持幂等批量导入需使用 Milvus 3.0.2 或更高版本，或 2.6 系列中的 2.6.24 或更高版本。较旧的服务器会忽略该标头，无论是否重试，每个请求都会启动一个新任务。</p>
<h2 id="Sending-the-key" class="common-anchor-header">发送键<button data-href="#Sending-the-key" class="anchor-icon" translate="no">
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
    </button></h2><p>该键作为<code translate="no">Idempotency-Key</code> HTTP 头传递，而非包含在请求正文中。</p>
<pre><code translate="no" class="language-bash">curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/jobs/import/create&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Idempotency-Key: nightly-2026-09-07-batch-3&quot;</span> \
  -d <span class="hljs-string">&#x27;{&quot;collectionName&quot;: &quot;events&quot;, &quot;files&quot;: [[&quot;events/2026-09-07/part-0.parquet&quot;]]}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<!-- TODO: the `headers` parameter and `IDEMPOTENCY_KEY_HEADER` are merged but not released: milvus-io/pymilvus#3784 (master), milvus-io/pymilvus#3807 (3.0), milvus-io/pymilvus#3808 (2.6). They are expected in pymilvus v3.0.3 and v2.6.18. After those tags exist, verify this example against the released API. -->
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> IDEMPOTENCY_KEY_HEADER, bulk_import

resp = bulk_import(
    url=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    collection_name=<span class="hljs-string">&quot;events&quot;</span>,
    files=[[<span class="hljs-string">&quot;events/2026-09-07/part-0.parquet&quot;</span>]],
    headers={IDEMPOTENCY_KEY_HEADER: <span class="hljs-string">&quot;nightly-2026-09-07-batch-3&quot;</span>},
)
resp.json()[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;jobId&quot;</span>]   <span class="hljs-comment"># the same id on every retry</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">IDEMPOTENCY_KEY_HEADER</code> 格式为<code translate="no">&quot;Idempotency-Key&quot;</code> ；原始字符串同样有效。<code translate="no">headers</code> 参数和<code translate="no">IDEMPOTENCY_KEY_HEADER</code> 需要 3.x 系列中 pymilvus v3.0.3 或更高版本，或 2.6 系列中 v2.6.18 或更高版本。 在较旧版本的 pymilvus 中，上述<code translate="no">import</code> 这一行会在<code translate="no">IDEMPOTENCY_KEY_HEADER</code> 查找时因“<code translate="no">ImportError</code> ”报错，且将<code translate="no">headers</code> 传递给<code translate="no">bulk_import</code> 会导致未定义的行为——该调用可能会报错，或者导入时可能缺少该键。</p>
<p>照常使用返回的<code translate="no">jobId</code> 轮询<code translate="no">/v2/vectordb/jobs/import/describe</code> 。当重试请求到达时，如果原始任务仍在注册中，则会等待其完成，因此重试请求永远不会遇到半注册状态的任务。</p>
<h2 id="Choosing-a-key" class="common-anchor-header">选择键<button data-href="#Choosing-a-key" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><strong>每个逻辑请求对应一个键。</strong>为工作单元命名（例如<code translate="no">orders-2026-09-07-batch-3</code> ），或在发送请求前生成一个 UUID 并将其与工作项一同存储。如果可能需要重跑同一项工作，请包含尝试编号。</li>
<li><strong>重试时请使用相同的键。</strong>重试时生成新键会导致数据重复。例外情况请参见<a href="#when-to-send-a-new-key">“何时发送新键</a>”部分。</li>
<li><strong>切勿将同一密钥用于不同的文件。</strong>Milvus 不会比较这两个请求。您将收到原始的<code translate="no">jobId</code> ，而新文件将不会被导入。</li>
<li><strong>请保持密钥简短且可打印。</strong>默认情况下，<strong>密钥</strong>必须为可打印的 ASCII 字符，且长度不超过 256 字节（<code translate="no">streaming.idempotency.maxKeyLength</code> ）。否则将因错误<code translate="no">1100</code> 被拒绝。</li>
<li><strong>请勿在其中包含机密信息。</strong>密钥将与您的数据一同存储。</li>
</ul>
<h2 id="How-long-a-key-is-remembered" class="common-anchor-header">密钥的保留时长<button data-href="#How-long-a-key-is-remembered" class="anchor-icon" translate="no">
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
    </button></h2><p>密钥通过其内部 ID 与 Collection 绑定，因此只要重试任务使用 Collection 新名称，重命名 Collection 不会导致重试失败。但删除并以相同名称重建 Collection 会导致重试失败，此时应启动新的任务。</p>
<p>Milvus 会记住导入密钥约一天时间。请将此视为参考值而非保证：高强度的 DDL 或导入流量会缩短该时长，而协调器重启则会延长该时长。在密钥被遗忘后进行重试将启动一个新的任务。</p>
<h2 id="When-to-send-a-new-key" class="common-anchor-header">何时发送新键<button data-href="#When-to-send-a-new-key" class="anchor-icon" translate="no">
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
    </button></h2><p>只有两种情况，且仅此两种：</p>
<ul>
<li><strong>原始任务失败或被中止。</strong>Describe 方法会返回包含原因的 `<code translate="no">state: Failed</code> `。在密钥被记住期间，重试该密钥将返回相同的 `<code translate="no">jobId</code> `。修复原因后，再发送新密钥。</li>
<li><strong>原始任务已被清理。</strong>Milvus 会保留已完成的任务<code translate="no">dataCoord.import.taskRetention</code> （默认 48 小时）。如果该<strong>任务</strong>在密钥仍被记住时过期，重试将返回旧的<code translate="no">jobId</code> ，而 describe 命令将返回错误<code translate="no">import job does not exist</code> 而不是任务状态。该任务可能已经成功。在发送新密钥之前，请确认数据确实丢失。</li>
</ul>
<p>因导入任务配额已满等原因导致的重试被拒绝，不属于上述情况。请稍后使用相同的密钥再次重试。</p>
<h2 id="Configuration" class="common-anchor-header">配置<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>本页面的行为由四个参数决定。这些参数均无需更改，密钥即可正常工作。</p>
<table>
<thead>
<tr><th>参数</th><th>默认值</th><th>作用</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxLifetime</code></td><td><code translate="no">24h</code></td><td>导入密钥的保留时长。默认的<code translate="no">milvus.yaml</code> 中不包含此参数；如需修改，请显式添加。同一存储库也会拒绝重复的DDL提交，因此请勿仅为缩短导入窗口而降低该值。</td></tr>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxCount</code></td><td><code translate="no">8192</code></td><td>同一存储在保留多少个键和 DDL 记录后，会删除最旧的记录（无论其存放时间长短）。正是这一机制使得在高强度 DDL 或导入流量下，键会在<code translate="no">maxLifetime</code> 之前被遗忘。该参数在默认的<code translate="no">milvus.yaml</code> 中不存在。</td></tr>
<tr><td><code translate="no">dataCoord.import.taskRetention</code></td><td><code translate="no">172800</code> （48 小时）自 2.6.24 和 3.0.2 起；此前为<code translate="no">10800</code> </td><td>已完成的导入任务在多长时间内仍可被查询。请将其设置为至少<code translate="no">maxLifetime</code> 的两倍。</td></tr>
<tr><td><code translate="no">streaming.idempotency.maxKeyLength</code></td><td><code translate="no">256</code></td><td>键的最大长度（以字节为单位）。较长的键将被拒绝并返回错误<code translate="no">1100</code> 。<code translate="no">0</code> 会禁用此限制。默认值<code translate="no">milvus.yaml</code> 中不存在此选项。</td></tr>
</tbody>
</table>
<p>2.6.24 和 3.0.2 之前发布的<code translate="no">milvus.yaml</code> 会显式设置<code translate="no">taskRetention: 10800</code> ，且升级操作不会覆盖您文件中的该值。如果您使用该文件进行了升级，请将<code translate="no">taskRetention</code> 值提高至至少 的两倍<code translate="no">maxLifetime</code> 。新值仅适用于在更改后完成的作业。</p>
