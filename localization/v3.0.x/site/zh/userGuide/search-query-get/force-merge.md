---
id: force-merge.md
title: 强制合并压缩Compatible with Milvus 3.0.x
summary: 使用强制合并压缩来合并小片段，提高查询性能和存储效率。
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">强制合并压缩<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>强制合并的目的是将小而零散的数据段合并为较少而较大的数据段，以提高查询性能和存储效率。本指南介绍了如何使用强制合并压缩。</p>
<div class="alert note">
<p>此功能处于公开预览阶段。请勿在生产环境中使用。</p>
</div>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>标准<a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">压缩</a>通过多对一合并将分段大小保持在所配置的<code translate="no">maxSize</code> 附近，但仍会留下无法在不超出限制的情况下进一步合并的中等大小的片段。例如，如下图所示，如果 Collections 有 5 个 2 MB 的分段，而<code translate="no">maxSize</code> 为 3 MB，合并任何两个分段都会超出限制，因此标准压缩无法进一步减少分段数量，碎片布局依然存在。</p>
<p>强制合并增加了一个<code translate="no">target_size</code> 参数，并支持在可能的情况下，在严格的容差范围内，按照所需的大小重组段。如下图所示，如果指定的<code translate="no">target_size</code> 为 4 MB，则可将 5 个 2 MB 的小分段进一步合并为更少的大分段。这样可以减少多余的分段数，支持比默认<code translate="no">maxSize</code> 设置更大的目标，而且当目标非常大时，系统可以根据当前硬件和 QueryNode 拓扑选择实用的输出大小和分段数。</p>
<p>要了解使用哪种压缩方法，请参阅<a href="#faq">常见问题</a>。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" />
   </span> <span class="img-wrapper"> <span>R8eow3kaqhktokblcmocnvxmnee</span> </span></p>
<p>强制合并压缩扩展了现有的 <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a>API 扩展了一个<code translate="no">target_size</code> 参数。它完全向后兼容：不含<code translate="no">target_size</code> 的现有编译调用仍可照常工作。</p>
<p>强制合并是异步操作符。虽然在执行过程中会消耗 I/O 和内存资源，但它不会阻塞搜索或查询操作。</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">使用强制合并压缩<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>Milvus 2.6.15 或更高版本</p></li>
<li><p>pymilvus 2.6.13 或更高版本</p></li>
</ul>
<h3 id="Global-Configuration" class="common-anchor-header">全局配置<button data-href="#Global-Configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>以下配置参数控制强制合并行为。请在 Milvus 配置文件中或通过环境变量进行设置。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">segment:</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">512</span>         <span class="hljs-comment"># Default segment max size (MB).</span>
                         <span class="hljs-comment"># Used when target_size is 0 or omitted.</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">maxFullSegmentThreshold:</span> <span class="hljs-number">100</span>
                         <span class="hljs-comment"># When segment count exceeds this threshold,</span>
                         <span class="hljs-comment"># a faster greedy algorithm is used instead</span>
                         <span class="hljs-comment"># of the standard merge algorithm.</span>
    <span class="hljs-attr">forceMerge:</span>
      <span class="hljs-attr">datanodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># DataNode memory divided by this factor</span>
                         <span class="hljs-comment"># determines the the largest segment</span>
                         <span class="hljs-comment"># size the system can allow.</span>
      <span class="hljs-attr">querynodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># Minimum QueryNode memory divided by this</span>
                         <span class="hljs-comment"># factor. Used in automatic size calculation</span>
                         <span class="hljs-comment"># to ensure merged segments can be loaded.</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>默认值</p></th>
     <th><p>说明</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.segment.maxSize</code></p></td>
     <td><p>512</p></td>
     <td><p>默认网段最大大小（MB）。当<code translate="no">target_size</code> 为 0 或省略时用作目标值。也是显式<code translate="no">target_size</code> 的最小允许值。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>用于选择算法的段数阈值。当分段数超过此值时，Milvus 会使用更快的贪婪算法进行合并规划。</p><ul><li><p><strong>标准算法</strong>（段数 &lt;=<code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code> 时使用）：产生更优化的合并结果，但计算时间更长。</p></li><li><p><strong>贪婪算法</strong>（在线段数 &gt;<code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code> 时使用）：以稍差的最优线段分组为代价，更快地完成规划。</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>数据节点内存除以该系数，可计算出系统允许的最大分段大小。</p><ul><li><p>数值越大，分配给合并的内存就越少，但留给其他数据节点操作的内存就越多，从而提高节点的稳定性。</p></li><li><p>较小的值允许较大的合并，但会增加内存压力。</p></li><li><p>例如，默认系数为 4.0，数据节点内存为 16 GB，合并预算为 4 GB。这意味着单次操作中合并的数据段总大小不能超过 4 GB。</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>最小查询节点内存除以该系数。在自动大小计算 (<code translate="no">target_size=max_int64</code>) 过程中使用，以确保合并后的数据段可以被查询节点加载。</p><ul><li><p>数值越大，生成的分段越小，查询节点越容易加载。</p></li><li><p>较小的值允许较大的分段，但可能会导致内存受限的查询节点加载失败。</p></li><li><p>例如，默认系数为 4.0，最小的查询节点有 16 GB 内存，自动计算的目标大小不会超过 4 GB。这样可以防止强行合并产生的数据段过大，以至于查询节点无法加载。</p></li></ul></td>
   </tr>
</table>
<p>要将上述更改应用到 Milvus 群集，请按照 "<a href="/docs/zh/configure-helm.md#Configure-Milvus-via-configuration-file">使用 Helm 配置 Milvus</a>"和 "<a href="/docs/zh/configure_operator.md">使用 Milvus 操作符配置 Milvus</a>"中的步骤<a href="/docs/zh/configure_operator.md">操作</a>。</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">触发强制合并压缩<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>通过使用<code translate="no">target_size</code> 参数调用<code translate="no">compact()</code> ，可以触发强制合并压缩。有关参数详情，请参阅下面的<a href="#parameter-reference">参数参考</a>。</p>
<p>有三种强制合并压实模式可供选择：</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 512 MB)
│  Equivalent to standard compaction
│
├─ Mode 2: target_size = 2048
│  Merges segments to ~2 GB each
│  Must be &gt;= config maxSize
│
└─ Mode 3: target_size = max_int64
   Auto-calculates optimal size based on
   segment distribution and node memory
<button class="copy-code-btn"></button></code></pre>
<p>下面举例说明如何使用每种强制合并压实模式。</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">默认（标准压缩）</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 512 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">明确目标尺寸</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=<span class="hljs-string">&quot;2048&quot;</span>  <span class="hljs-comment"># The unit is MB</span>
)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Automatic-size-calculation" class="common-anchor-header">自动尺寸计算</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Let Milvus determine the optimal segment size</span>
max_int64 = (<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">63</span>) - <span class="hljs-number">1</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=max_int64
)
<button class="copy-code-btn"></button></code></pre>
<p><a id="parameter-reference"></a></p>
<h4 id="Parameter-reference" class="common-anchor-header">参数参考</h4><p>下表解释了参数。</p>
<table>
   <tr>
     <th><p><strong>参数</strong></p></th>
     <th><p><strong>类型</strong></p></th>
     <th><p><strong>说明</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>字符串</p></td>
     <td><p>必填。要压缩的 Collection 的名称。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>可选。目标数据段大小（以 MB 为单位）。参数值有 3 个选项：</p><ul><li><p><strong>0 或省略</strong>：使用配置的<code translate="no">dataCoord.segment.maxSize</code> （默认：512 MB）。相当于标准压缩。</p></li><li><p><strong>显式值</strong>：以 MB 为单位将数据段合并为指定大小（例如 2048）。必须大于或等于配置的<code translate="no">dataCoord.segment.maxSize</code> 。</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)：</strong>根据当前网段分布和可用节点资源自动计算最佳大小。</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>如果指定的<code translate="no">target_size</code> 小于配置的<code translate="no">dataCoord.segment.maxSize</code> ，请求将被拒绝并显示错误。</p>
</div>
<h3 id="Check-Compaction-Progress" class="common-anchor-header">检查压缩进度<button data-href="#Check-Compaction-Progress" class="anchor-icon" translate="no">
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
    </button></h3><p>强制合并压缩以异步方式运行。使用返回的作业 ID 检查进度：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><ul>
<li><p><strong>不要在生产环境中使用强制合并压缩。</strong></p></li>
<li><p><strong>大多数情况下使用自动大小计算模式。</strong>将<code translate="no">target_size</code> 设置为<code translate="no">max_int64</code> ，让 Milvus 分析你的网段分布和节点资源，以确定最佳大小。除非您有特定的大小要求，否则建议使用这种方法。</p></li>
<li><p><strong>考虑性能权衡。</strong>强制合并压缩是一种资源密集型操作。它会读取、合并和重写段数据。将其安排在流量较低的时段，以尽量减少对查询延迟的影响。</p></li>
<li><p><strong>监控之前和之后的段计数。</strong>使用<code translate="no">get_compaction_state()</code> 和<code translate="no">list_persistent_segments</code> 验证压缩是否如预期产生了更少、更大的数据段。</p></li>
</ul>
<p><a id="faq"></a></p>
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
    </button></h2><p><strong>强制合并与标准压缩有何不同？</strong></p>
<p>这两种类型的压缩操作有不同的目的。</p>
<ul>
<li><p>标准压缩（targetSize=0 或省略）是一种尽力而为的增量清理路径。</p></li>
<li><p>强制合并（targetSize&gt;0）是一种 Collections 级的重新打包路径，可以产生更少、更大、接近目标的数据段。</p></li>
</ul>
<p>关键区别在于合并形状：标准压缩每个任务的合并形状为 m → 1，而强制合并每个分组输入的合并形状为 m → n。这就是为什么强制合并可以解决标准压缩无法解决的分段布局问题。下表比较了这 2 种操作符。</p>
<table>
   <tr>
     <th><p><strong>尺寸</strong></p></th>
     <th><p><strong>标准压实（默认）</strong></p></th>
     <th><p><strong>强制合并</strong></p></th>
   </tr>
   <tr>
     <td><p>API 触发器</p></td>
     <td><p>targetSize=0 （或未设置），无 Major/L0 标志</p></td>
     <td><p>targetSize&gt;0 (MB)</p></td>
   </tr>
   <tr>
     <td><p>主要目标</p></td>
     <td><p>增量清理明显的碎片；日常维护</p></td>
     <td><p>为搜索和平衡进行全 Collection 合并</p></td>
   </tr>
   <tr>
     <td><p>数据段大小来源</p></td>
     <td><p>固定的 dataCoord.segment.maxSize（服务器配置）</p></td>
     <td><p>用户 targetSize，然后通过 maxSafeSize 进行安全限制</p></td>
   </tr>
   <tr>
     <td><p>参数有效性</p></td>
     <td><p>不调整用户大小</p></td>
     <td><p>用户 targetSize 必须 &gt;= dataCoord.segment.maxSize；否则会被拒绝</p></td>
   </tr>
   <tr>
     <td><p>安全上限</p></td>
     <td><p>仅配置上限</p></td>
     <td><p>maxSafeSize = min(QueryNode mem, DataNode mem) / memory_factor（独立非池化：进一步减半）</p></td>
   </tr>
   <tr>
     <td><p>合并形状</p></td>
     <td><p>m → 每个任务 1，输出 &lt;= configMaxSize</p></td>
     <td><p>m → n，输出接近目标大小</p></td>
   </tr>
   <tr>
     <td><p>中段行为</p></td>
     <td><p>可能会永久卡住（例如，两个 60% 的分段不能合法地变成一个 120% 的分段）</p></td>
     <td><p>重新打包 + 分割有效；没有 "卡在 60% 处 "的模式</p></td>
   </tr>
   <tr>
     <td><p>Collections 扁平化能力</p></td>
     <td><p>有限；重复运行仍可能留下许多中段</p></td>
     <td><p>强大；旨在减少分段数，提高饱和度</p></td>
   </tr>
   <tr>
     <td><p>拓扑意识</p></td>
     <td><p>无</p></td>
     <td><p>有；使用 QueryNode/复制/分散布局</p></td>
   </tr>
   <tr>
     <td><p>读取路径并行性调整</p></td>
     <td><p>无</p></td>
     <td><p>有效时使用查询节点数/（副本×分片）调整输出数</p></td>
   </tr>
   <tr>
     <td><p>典型用例</p></td>
     <td><p>写入/删除后的高消耗日常清理</p></td>
     <td><p>基准准备、搜索优化、负载并行性调整</p></td>
   </tr>
   <tr>
     <td><p>预期范围</p></td>
     <td><p>不期望重新打包整个 Collections</p></td>
     <td><p>旨在实现 Collection 级别的重新打包结果</p></td>
   </tr>
</table>
<p><strong>选择指导：</strong></p>
<ul>
<li><p>选择标准压缩进行低风险增量清理。</p></li>
<li><p>当您明确希望将 Collections 重塑为更少、更大的片段，并与搜索和加载行为保持一致时，请选择强制合并。</p></li>
</ul>
<p><strong>强制合并与聚类压缩有何不同？</strong></p>
<p><a href="/docs/zh/clustering-compaction.md">聚类压缩</a>(<code translate="no">is_clustering=True</code>) 基于聚类键在段内重组数据，以改进搜索剪枝。强制合并 (<code translate="no">target_size=N</code>) 在不改变数据分布的情况下优化数据段大小。它们的作用不同，但可以一起使用--先运行聚类压缩来组织数据，然后再运行强制合并来合并生成的数据段。</p>
<p><strong>能否在正在查询的 Collections 上运行强制合并？</strong></p>
<p>可以。强制合并以异步方式运行，不会阻塞查询。不过，它会消耗数据节点和磁盘 I/O 资源，因此在压缩期间查询延迟可能会增加。请将强制合并安排在流量较低的时段，以获得最佳效果。</p>
<p><strong>如果我设置的 target_size 小于 maxSize 会发生什么情况？</strong></p>
<p>请求将被拒绝，并显示错误。目标大小必须大于或等于配置的<code translate="no">dataCoord.segment.maxSize</code> 。</p>
