---
id: warm-up.md
title: 预热Compatible with Milvus 2.6.4+
summary: >-
  在 Milvus 中，"预热
  "功能与分层存储功能相辅相成，可减轻首次访问冷数据时出现的首次访问延迟。配置完成后，预热功能会在段可查询前将选定字段或索引预加载到缓存中，确保加载后可立即使用频繁访问的数据。
beta: Milvus 2.6.4+
---
<h1 id="Warm-Up" class="common-anchor-header">预热<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Warm-Up" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中，"<strong>预热</strong>"是对分层存储的补充，它可减轻首次访问冷数据时出现的首次访问延迟。配置完成后，预热功能会在段可查询前将选定字段或索引预加载到缓存中，确保加载后可立即使用频繁访问的数据。</p>
<h2 id="Why-warm-up" class="common-anchor-header">为什么要预热<button data-href="#Why-warm-up" class="anchor-icon" translate="no">
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
    </button></h2><p>分层存储中的 "<a href="/docs/zh/tiered-storage-overview.md#Phase-1-Lazy-load">懒加载</a>"通过最初只加载元数据来提高效率。但是，这可能会导致首次查询冷数据时出现延迟，因为必须从对象存储中获取所需的块或索引。</p>
<p><strong>预热</strong>可在段初始化过程中主动缓存关键数据，从而解决这一问题。</p>
<p>它在以下情况下尤其有用</p>
<ul>
<li><p>某些标量索引经常用于过滤条件。</p></li>
<li><p>向量索引对搜索性能至关重要，必须立即准备就绪。</p></li>
<li><p>查询节点重启或新网段加载后的冷启动延迟是不可接受的。</p></li>
</ul>
<p>相反，对于不经常查询的字段或索引，<strong>不建议</strong>使用预热功能。禁用 "预热 "功能可缩短数据段加载时间并节省缓存空间，非常适合大型向量字段或非关键标量字段。</p>
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
    </button></h2><p>预热由<code translate="no">milvus.yaml</code> 中的<code translate="no">queryNode.segcore.tieredStorage.warmup</code> 控制。您可以分别为标量字段、标量索引、向量字段和向量索引配置预热。每个目标都支持两种模式：</p>
<table>
   <tr>
     <th><p>模式</p></th>
     <th><p>描述</p></th>
     <th><p>典型情况</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code> 默认</p></td>
     <td><p>在网段可查询前进行预加载。加载时间略有增加，但首次查询不会产生延迟。</p></td>
     <td><p>用于必须立即可用的性能关键型数据，如搜索中使用的高频标量索引或关键向量索引。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>跳过预加载。数据段可查询的速度更快，但首次查询可能会触发按需加载。</p></td>
     <td><p>适用于不常访问的数据或大型数据，如原始向量字段或非关键标量字段。</p></td>
   </tr>
</table>
<p><strong>YAML 示例</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># options: sync, disable.</span>
        <span class="hljs-comment"># Specifies the timing for warming up the Tiered Storage cache.</span>
        <span class="hljs-comment"># - &quot;sync&quot;: data will be loaded into the cache before a segment is considered loaded.</span>
        <span class="hljs-comment"># - &quot;disable&quot;: data will not be proactively loaded into the cache, and loaded only if needed by search/query tasks.</span>
        <span class="hljs-comment"># Defaults to &quot;sync&quot;, except for vector field which defaults to &quot;disable&quot;.</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span> <span class="hljs-comment"># cache warmup for vector field raw data is by default disabled.</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>值</p></th>
     <th><p>说明</p></th>
     <th><p>推荐用例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">scalarField</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>控制是否预加载标量字段数据。</p></td>
     <td><p>只有当标量字段较小并且在过滤器中被频繁访问时，才使用<code translate="no">sync</code> 。否则，<code translate="no">disable</code> ，以减少加载时间。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>控制是否预加载标量索引。</p></td>
     <td><p>对于涉及频繁筛选条件或范围查询的标量索引，请使用<code translate="no">sync</code> 。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorField</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>控制是否预加载向量字段数据。</p></td>
     <td><p>一般情况下，<code translate="no">disable</code> ，以避免大量使用缓存。只有在搜索后必须立即检索原始向量时（例如，具有向量召回功能的相似性结果），才启用<code translate="no">sync</code> 。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>控制是否预加载向量索引。</p></td>
     <td><p>对于对搜索延迟至关重要的向量索引，请使用<code translate="no">sync</code> 。在批处理或低频率工作负载中，<code translate="no">disable</code> ，以加快分段准备速度。</p></td>
   </tr>
</table>
<h2 id="Best-practices" class="common-anchor-header">最佳实践<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
    </button></h2><p>预热只影响初始加载。如果缓存数据随后被驱逐，下一次查询将按需重新加载。</p>
<ul>
<li><p>避免过度使用<code translate="no">sync</code> 。预加载太多字段会增加加载时间和缓存压力。</p></li>
<li><p>保守起步--仅对频繁访问的字段和索引启用预热。</p></li>
<li><p>监控查询延迟和缓存指标，然后根据需要扩大预加载。</p></li>
<li><p>对于混合工作负载，将<code translate="no">sync</code> 应用于对性能敏感的 Collections，将<code translate="no">disable</code> 应用于面向容量的 Collections。</p></li>
</ul>
