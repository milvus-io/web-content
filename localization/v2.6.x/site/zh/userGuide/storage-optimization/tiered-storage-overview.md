---
id: tiered-storage-overview.md
title: 分层存储概述Compatible with Milvus 2.6.4+
summary: >-
  在 Milvus
  中，传统的满载模式要求每个查询节点在初始化时加载段的所有数据字段和索引，即使是可能永远不会被访问的数据。这虽然确保了数据的即时可用性，但往往会造成资源浪费，包括内存使用率高、磁盘活动频繁以及
  I/O 开销大，尤其是在处理大规模数据集时。
beta: Milvus 2.6.4+
---
<h1 id="Tiered-Storage-Overview" class="common-anchor-header">分层存储概述<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Tiered-Storage-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中，传统的<em>满载</em>模式要求每个查询节点在初始化时加载<a href="/docs/zh/glossary.md#Segment">段</a>的所有数据字段和索引，甚至包括可能永远不会被访问的数据。这可确保数据的即时可用性，但往往会导致资源浪费，包括内存使用率高、磁盘活动频繁和 I/O 开销大，尤其是在处理大规模数据集时。</p>
<p><em>分层存储</em>通过将数据<em>缓存</em>与分段加载解耦来应对这一挑战。Milvus 引入了一个缓存层，区分热数据（本地缓存）和冷数据（远程存储），而不是一次性加载所有数据。现在，QueryNode 最初只加载轻量级<em>元数据</em>，并根据需求动态拉取或驱逐字段数据。这大大缩短了加载时间，优化了本地资源利用率，并使查询节点能够处理远远超出其物理内存或磁盘容量的数据集。</p>
<p>在以下情况下，请考虑启用分层存储：</p>
<ul>
<li><p>超过单个 QueryNode 可用内存或 NVMe 容量的集合</p></li>
<li><p>加载速度比首次查询延迟更重要的分析或批处理工作负载</p></li>
<li><p>对于访问频率较低的数据，可容忍偶尔缓存缺失的混合工作负载</p></li>
</ul>
<div class="alert note">
<ul>
<li><p><em>元数据</em>包括 Schema、索引定义、块映射、行计数和远程对象引用。这类数据较小，始终处于缓存状态，且永不被驱逐。</p></li>
<li><p>有关段和块的更多详情，请参阅<a href="/docs/zh/glossary.md#Segment">段</a>。</p></li>
</ul>
</div>
<h2 id="How-it-works" class="common-anchor-header">如何工作<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>分层存储改变了 QueryNode 管理段数据的方式。QueryNode 现在不再在加载时缓存每个字段和索引，而是只加载元数据，并使用缓存层动态获取和驱逐数据。</p>
<h3 id="Full-load-mode-vs-Tiered-Storage-mode" class="common-anchor-header">满载模式与分层存储模式的比较<button data-href="#Full-load-mode-vs-Tiered-Storage-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>虽然满载模式和分层存储模式处理的数据相同，但它们在 QueryNode 缓存这些组件的<em>时间</em>和<em>方式</em>上有所不同。</p>
<ul>
<li><p><strong>满载模式</strong>：在加载时，QueryNode 从对象存储中缓存完整的 Collections 数据，包括元数据、字段数据和索引。</p></li>
<li><p><strong>分层存储模式</strong>：加载时，QueryNode 只缓存元数据。字段数据以块为粒度按需提取。索引文件保持远程状态，直到第一次查询需要它们；然后获取并缓存整个分段索引。</p></li>
</ul>
<p>下图显示了这些差异。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/full-load-mode-vs-tiered-storage-mode.png" alt="Full Load Mode Vs Tiered Storage Mode" class="doc-image" id="full-load-mode-vs-tiered-storage-mode" />
   </span> <span class="img-wrapper"> <span>全加载模式与分层存储模式</span> </span></p>
<h3 id="QueryNode-loading-workflow" class="common-anchor-header">查询节点加载工作流<button data-href="#QueryNode-loading-workflow" class="anchor-icon" translate="no">
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
    </button></h3><p>在分层存储模式下，工作流程分为以下几个阶段：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/querynode-load-workflow.png" alt="Querynode Load Workflow" class="doc-image" id="querynode-load-workflow" />
   </span> <span class="img-wrapper"> <span>查询节点加载工作流程</span> </span></p>
<h4 id="Phase-1-Lazy-load" class="common-anchor-header">阶段 1：懒加载</h4><p>初始化时，Milvus 执行懒加载，只缓存段级元数据，如 Schema 定义、索引信息和块映射。</p>
<p>在此阶段不会缓存实际字段数据或索引文件。这样，Collections 几乎可以在启动后立即开始查询，同时将内存和磁盘消耗降到最低。</p>
<p>由于字段数据和索引文件在首次访问前一直保存在远程存储中，因此<em>首次查询</em>可能会出现额外的延迟，因为必须按需获取所需数据。为减轻关键字段或索引的这种影响，可以使用<a href="/docs/zh/tiered-storage-overview.md#Phase-2-Warm-up">预热</a>策略，在段可查询前主动预加载它们。</p>
<p><strong>配置</strong></p>
<p>启用分层存储时自动应用。无需手动设置。</p>
<h4 id="Phase-2-Warm-up" class="common-anchor-header">第 2 阶段：预热</h4><p>为减少<a href="/docs/zh/tiered-storage-overview.md#Phase-1-Lazy-load">懒加载</a>带来的首次命中延迟，Milvus 提供了<em>预热</em>机制。</p>
<p>在段可查询之前，Milvus 可以主动从对象存储中获取并缓存特定字段或索引，确保首次查询直接命中缓存数据，而不是触发按需加载。</p>
<p>预热期间，字段将在块级别预加载，而索引将在段级别预加载。</p>
<p><strong>配置</strong></p>
<p>预热设置在<code translate="no">milvus.yaml</code> 的 "分层存储 "部分中定义。可以为每个字段或索引类型启用或禁用预加载，并指定首选策略。有关详细配置，请参阅<a href="/docs/zh/warm-up.md">预热</a>。</p>
<h4 id="Phase-3-Partial-load" class="common-anchor-header">第 3 阶段：部分加载</h4><p>查询或搜索开始后，查询节点会执行<em>部分加载</em>，仅从对象存储中获取所需的数据块或索引文件。</p>
<ul>
<li><p><strong>字段</strong>：按需加载数据<strong>块</strong>。只获取符合当前查询条件的数据块，从而最大限度地减少 I/O 和内存使用。</p></li>
<li><p><strong>索引</strong>：在<strong>段级别</strong>按需加载。索引文件必须作为完整单元获取，不能分割成块。</p></li>
</ul>
<p><strong>配置</strong></p>
<p>启用分层存储时，会自动应用部分加载。无需手动设置。要尽量减少关键数据的首次命中延迟，请与<a href="/docs/zh/warm-up.md">预热</a>结合使用。</p>
<h4 id="Phase-4-Eviction" class="common-anchor-header">第 4 阶段：驱逐</h4><p>为保持健康的资源使用，当达到特定阈值时，Milvus 会自动释放未使用的缓存数据。</p>
<p>驱逐遵循 "<a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">最近最少使用"（LRU）</a>策略，确保不常访问的数据首先被删除，而活动数据仍保留在缓存中。</p>
<p>驱逐受以下可配置项的制约：</p>
<ul>
<li><p><strong>水印</strong>：定义触发和停止驱逐的内存或磁盘阈值。</p></li>
<li><p><strong>缓存 TTL</strong>：在规定的不活动时间后删除过时的缓存数据。</p></li>
</ul>
<p><strong>配置</strong></p>
<p>在<strong>Milvus.yaml</strong> 中启用和调整驱逐参数。有关详细配置，请参阅 "<a href="/docs/zh/eviction.md">驱逐</a>"。</p>
<h2 id="Getting-started" class="common-anchor-header">开始使用<button data-href="#Getting-started" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">先决条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>Milvus 2.6.4 及以上版本</p></li>
<li><p>具有专用内存和磁盘资源的查询节点</p></li>
<li><p>对象存储后端（S3、MinIO 等）</p></li>
</ul>
<div class="alert warning">
<p>QueryNode 资源不应与其他工作负载共享。共享资源会导致 Tiered Storage 错误判断可用容量，从而导致崩溃。</p>
</div>
<h3 id="Basic-configuration-template" class="common-anchor-header">基本配置模板<button data-href="#Basic-configuration-template" class="anchor-icon" translate="no">
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
    </button></h3><p>编辑 Milvus 配置文件 (<code translate="no">milvus.yaml</code>) 以配置 Tiered Storage 设置：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Warm Up Configuration</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar field data</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar indexes</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>   <span class="hljs-comment"># Don&#x27;t preload vector field data (large)</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload vector indexes</span>
      
      <span class="hljs-comment"># Eviction Configuration</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      
      <span class="hljs-comment"># Memory Watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>   <span class="hljs-comment"># Stop evicting at 75%</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>  <span class="hljs-comment"># Start evicting at 80%</span>
      
      <span class="hljs-comment"># Disk Watermarks  </span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>
      
      <span class="hljs-comment"># Cache TTL (7 days)</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Next-steps" class="common-anchor-header">下一步<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>配置预热</strong>- 针对访问模式优化预加载。请参阅 "<a href="/docs/zh/warm-up.md">预热</a>"。</p></li>
<li><p><strong>调整驱逐</strong>- 针对资源限制设置适当的水印和 TTL。请参阅 "<a href="/docs/zh/eviction.md">驱逐</a>"。</p></li>
<li><p><strong>监控性能</strong>- 跟踪缓存命中率、驱逐频率和查询延迟模式。</p></li>
<li><p><strong>迭代配置</strong>- 根据观察到的工作负载特征调整设置。</p></li>
</ol>
<h2 id="FAQ" class="common-anchor-header">常见问题<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Can-I-change-Tiered-Storage-parameters-at-runtime" class="common-anchor-header">能否在运行时更改分层存储参数？<button data-href="#Can-I-change-Tiered-Storage-parameters-at-runtime" class="anchor-icon" translate="no">
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
    </button></h3><p>所有参数都必须在启动 Milvus 之前在<code translate="no">milvus.yaml</code> 中设置。更改需要重新启动才能生效。</p>
<h3 id="Does-Tiered-Storage-affect-data-durability" class="common-anchor-header">分层存储会影响数据持久性吗？<button data-href="#Does-Tiered-Storage-affect-data-durability" class="anchor-icon" translate="no">
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
    </button></h3><p>不会。数据持久性仍由远程对象存储处理。分层存储只管理查询节点上的缓存。</p>
<h3 id="Will-queries-always-be-faster-with-Tiered-Storage" class="common-anchor-header">使用分层存储后，查询速度是否总是更快？<button data-href="#Will-queries-always-be-faster-with-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>不一定。分层存储减少了加载时间和资源使用量，但接触未缓存（冷）数据的查询可能会出现更高的延迟。对于对延迟敏感的工作负载，建议使用满载模式。</p>
<h3 id="Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="common-anchor-header">为什么即使启用了分层存储，查询节点仍然会耗尽资源？<button data-href="#Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="anchor-icon" translate="no">
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
    </button></h3><p>两种常见原因：</p>
<ul>
<li><p>查询节点配置的资源太少。水印是相对于可用资源而言的，因此配置不足会扩大误判。</p></li>
<li><p>QueryNode 资源与其他工作负载共享，因此分层存储无法正确评估实际可用容量。</p></li>
</ul>
<p>要解决这个问题，我们建议您为查询节点分配专用资源。</p>
<h3 id="Why-do-some-queries-fail-under-high-concurrency" class="common-anchor-header">为什么有些查询在高并发情况下会失败？<button data-href="#Why-do-some-queries-fail-under-high-concurrency" class="anchor-icon" translate="no">
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
    </button></h3><p>如果有太多查询同时访问热数据，查询节点资源限制仍可能会被超出。一些线程可能会因资源预留超时而失败。在负载减少后重试或分配更多资源可以解决这个问题。</p>
<h3 id="Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="common-anchor-header">启用分层存储后，为什么搜索/查询延迟会增加？<button data-href="#Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>可能的原因包括</p>
<ul>
<li><p>频繁查询冷数据，而冷数据必须从存储中获取。</p></li>
<li><p>水印设置得太近，导致频繁同步驱逐。</p></li>
</ul>
