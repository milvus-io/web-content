---
id: best-practices-for-tiered-storage.md
title: 分层存储的最佳实践Compatible with Milvus 2.6.4+
summary: Milvus 提供分层存储，帮助您有效处理大规模数据，同时平衡查询延迟、容量和资源使用。本指南总结了典型工作负载的推荐配置，并解释了每种调整策略背后的原因。
beta: Milvus 2.6.4+
---
<h1 id="Best-Practices-for-Tiered-Storage" class="common-anchor-header">分层存储的最佳实践<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Best-Practices-for-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 提供分层存储，帮助您有效处理大规模数据，同时平衡查询延迟、容量和资源使用。本指南总结了典型工作负载的推荐配置，并解释了每种调整策略背后的原因。</p>
<h2 id="Before-you-start" class="common-anchor-header">开始之前<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>Milvus v2.6.4 或更高版本</p></li>
<li><p>查询节点必须有专用的本地资源（内存和磁盘）。共享环境可能会扭曲缓存估算并导致驱逐判断错误。</p></li>
</ul>
<h2 id="Choose-the-right-strategy" class="common-anchor-header">选择正确的策略<button data-href="#Choose-the-right-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>分层存储提供灵活的加载和缓存策略，可根据工作负载进行组合。</p>
<table>
   <tr>
     <th><p>目标</p></th>
     <th><p>建议重点</p></th>
     <th><p>关键机制</p></th>
   </tr>
   <tr>
     <td><p>最大限度地减少首次查询延迟</p></td>
     <td><p>预加载关键字段</p></td>
     <td><p>预热</p></td>
   </tr>
   <tr>
     <td><p>高效处理大规模数据</p></td>
     <td><p>按需加载</p></td>
     <td><p>懒加载 + 部分加载</p></td>
   </tr>
   <tr>
     <td><p>保持长期稳定性</p></td>
     <td><p>防止缓存溢出</p></td>
     <td><p>驱逐</p></td>
   </tr>
   <tr>
     <td><p>平衡性能和容量</p></td>
     <td><p>结合预加载和动态缓存</p></td>
     <td><p>混合配置</p></td>
   </tr>
</table>
<h2 id="Scenario-1-real-time-low-latency-retrieval" class="common-anchor-header">方案 1：实时、低延迟检索<button data-href="#Scenario-1-real-time-low-latency-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>何时使用</strong></p>
<ul>
<li><p>查询延迟至关重要（例如，实时推荐或搜索排名）</p></li>
<li><p>频繁访问核心向量索引和标量过滤器</p></li>
<li><p>稳定的性能比启动速度更重要</p></li>
</ul>
<p><strong>推荐配置</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># scalar field/index warm-up to eliminate first-time latency</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-comment"># warm-up of vector fields is disabled (if the original vector is not required)</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># vector indexes warm-up to elminate first-time latenct</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-comment"># no expiration time, which avoids frequent reloading</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>理由</strong></p>
<ul>
<li><p>预热可消除高频标量和向量索引的首次访问延迟。</p></li>
<li><p>后台驱逐可在不阻塞查询的情况下保持稳定的缓存压力。</p></li>
<li><p>禁用缓存 TTL 可避免对热数据进行不必要的重新加载。</p></li>
</ul>
<h2 id="Scenario-2-offline-batch-analysis" class="common-anchor-header">场景 2：离线批量分析<button data-href="#Scenario-2-offline-batch-analysis" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>何时使用</strong></p>
<ul>
<li><p>查询延迟容忍度高</p></li>
<li><p>工作负载涉及海量数据集或许多数据段</p></li>
<li><p>容量和吞吐量优先于响应速度</p></li>
</ul>
<p><strong>建议配置</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># disable scalar field/index warm-up to speed up loading</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># disable vector field/index warm-up to speed up loading</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">disable</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-comment"># use 1 day expiration to clean unused cache</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">86400</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>理由</strong></p>
<ul>
<li><p>在初始化许多分段时，禁用预热可加快启动速度。</p></li>
<li><p>更高的水印允许更密集地使用缓存，从而提高总负载能力。</p></li>
<li><p>缓存 TTL 会自动清除未使用的数据，以释放本地空间。</p></li>
</ul>
<h2 id="Scenario-3-hybrid-deployment-mixed-online-+-offline" class="common-anchor-header">方案 3：混合部署（混合在线 + 离线）<button data-href="#Scenario-3-hybrid-deployment-mixed-online-+-offline" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>何时使用</strong></p>
<ul>
<li><p>单个集群同时为在线和分析工作负载提供服务</p></li>
<li><p>某些集合要求低延迟，其他集合优先考虑容量</p></li>
</ul>
<p><strong>建议策略</strong></p>
<ul>
<li><p>将<strong>实时配置</strong>应用于对延迟敏感的集合</p></li>
<li><p>将<strong>离线配置</strong>应用于分析或存档收集</p></li>
<li><p>针对每种工作负载类型独立调整 evictableMemoryCacheRatio、cacheTtl 和水印比率</p></li>
</ul>
<p><strong>理由</strong></p>
<p>结合配置可对资源分配进行细粒度控制。</p>
<p>关键收集可保持低延迟保证，而辅助收集则可处理更多网段和数据量。</p>
<h2 id="Additional-tuning-tips" class="common-anchor-header">其他调整技巧<button data-href="#Additional-tuning-tips" class="anchor-icon" translate="no">
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
   <tr>
     <th><p>方面</p></th>
     <th><p>建议</p></th>
     <th><p>说明</p></th>
   </tr>
   <tr>
     <td><p><strong>预热范围</strong></p></td>
     <td><p>只预载查询频率高的字段或索引。</p></td>
     <td><p>不必要的预加载会增加加载时间和资源使用。</p></td>
   </tr>
   <tr>
     <td><p><strong>驱逐调整</strong></p></td>
     <td><p>从默认水印（75-80%）开始，逐步调整。</p></td>
     <td><p>间隙过小会导致频繁驱逐；间隙过大则会延迟资源释放。</p></td>
   </tr>
   <tr>
     <td><p><strong>缓存 TTL</strong></p></td>
     <td><p>对稳定的热数据集禁用；对动态数据启用（如 1-3 天）。</p></td>
     <td><p>防止陈旧缓存堆积，同时平衡清理开销。</p></td>
   </tr>
   <tr>
     <td><p><strong>超量提交比率</strong></p></td>
     <td><p>除非资源余量很大，否则避免使用 &gt; 0.7 的值。</p></td>
     <td><p>过多的超量提交可能会导致缓存中断和不稳定的延迟。</p></td>
   </tr>
   <tr>
     <td><p><strong>监控</strong></p></td>
     <td><p>跟踪缓存命中率、资源利用率和驱逐频率。</p></td>
     <td><p>频繁的冷负载可能表明需要调整预热或水印。</p></td>
   </tr>
</table>
