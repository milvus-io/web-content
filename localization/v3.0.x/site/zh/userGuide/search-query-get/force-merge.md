---
id: force-merge.md
title: 强制合并压缩Compatible with Milvus 3.0.x
summary: 使用强制合并压缩来合并较小的分段，从而提高查询性能和存储效率。
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
    </button></h1><p>强制合并旨在将小型和碎片化的分段合并为数量更少、体积更大的分段，从而提升查询性能和存储效率。本指南介绍了如何使用强制合并压缩功能。</p>
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
    </button></h2><p>标准<a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">压缩</a>通过多对一合并，将分段大小维持在配置的<code translate="no">maxSize</code> 附近，但仍可能留下中等大小的碎片，这些碎片若进一步合并将超过限制。 例如，如下图所示，如果一个 Collection 有五个 2 MB 的分段，且 `<code translate="no">maxSize</code> ` 为 3 MB，则合并任意两个分段都会超过该限制，因此标准压缩无法进一步减少分段数量，碎片化布局依然存在。</p>
<p>强制合并添加了<code translate="no">target_size</code> 参数，并在可能的情况下支持在严格的容差范围内将分段重组为所需大小。 如下图所示，如果指定的<code translate="no">target_size</code> 为4 MB，则五个2 MB的小分段可以进一步合并为数量更少、大小更大的分段。这可以减少多余的分段数量，支持大于默认<code translate="no">maxSize</code> 设置的目标，并且当目标非常大时，允许系统根据当前硬件和QueryNode拓扑选择一个切实可行的输出大小和分段数量。</p>
<p>要了解应使用哪种压缩方法，请参阅<a href="#faq">常见问题解答（FAQ</a>）。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" /> 
   <span>R8eow3kaqhktokblcmocnvxmnee</span>
  
 </span></p>
<p>强制合并压缩扩展了现有的 <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> API，新增了<code translate="no">target_size</code> 参数。该方法完全向后兼容：不带<code translate="no">target_size</code> 的现有压缩调用仍可照常工作。</p>
<p>强制合并操作以异步方式进行。虽然它在执行期间会消耗 I/O 和内存资源，但不会阻塞搜索或查询操作。</p>
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
<li><p>Milvus 3.0 或更高版本</p></li>
<li><p>PyMilvus 3.0 或更高版本</p></li>
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
    </button></h3><p>以下配置参数用于控制“强制合并”的行为。可在 Milvus 配置文件中设置这些参数，或通过环境变量进行设置。</p>
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
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.segment.maxSize</code></p></td>
     <td><p>1024</p></td>
     <td><p>默认分段最大大小（单位：MB）。当<code translate="no">target_size</code> 为0或省略时，此值用作目标值。同时也是显式指定<code translate="no">target_size</code> 时的最小允许值。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>用于算法选择的分段数阈值。当分段数超过此值时，Milvus将采用更快的贪婪算法进行合并规划。</p><ul><li><p><strong>标准算法</strong>（当分段数 &lt;=<code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code> 时使用）：可产生更优的合并结果，但计算时间较长。</p></li><li><p><strong>贪婪算法</strong>（当分段数 &gt;<code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code> 时使用）：规划速度更快，但分段分组结果的优化程度会略有降低。</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>系统会将 DataNode 内存除以该系数，以计算系统允许的最大分段大小。</p><ul><li><p>该值越大，分配给合并的内存就越少，但留给其他 DataNode 操作的内存就越多，从而提高了节点的稳定性。</p></li><li><p>较小的值允许进行更大的合并，但会增加内存压力。</p></li><li><p>例如，如果默认系数为 4.0，且 DataNode 具有 16 GB 内存，则合并预算为 4 GB。这意味着单次操作中要合并的段总大小不能超过 4 GB。</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>QueryNode 的最小内存将除以该系数。在自动大小计算（<code translate="no">target_size=max_int64</code> ）期间使用，以确保合并后的分段能够被 QueryNode 加载。</p><ul><li><p>该值越大，生成的分段越小，QueryNode 加载起来就越容易。</p></li><li><p>较小的值允许生成更大的分段，但可能会导致内存受限的 QueryNode 加载失败。</p></li><li><p>例如，当默认因子为 4.0 且内存最小的 QueryNode 拥有 16 GB 内存时，自动计算的目标大小将不超过 4 GB。这可防止“强制合并”生成超出 QueryNode 加载能力的超大分段。</p></li></ul></td>
   </tr>
</table>
<p>若要将上述更改应用到您的 Milvus 集群，请按照《<a href="/docs/zh/configure-helm.md#Configure-Milvus-via-configuration-file">使用 Helm 配置 Milvus</a>》和《<a href="/docs/zh/configure_operator.md">使用 Milvus Operator 配置 Milvus</a>》中的步骤操作。</p>
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
    </button></h3><p>您可通过调用<code translate="no">compact()</code> 并传入<code translate="no">target_size</code> 参数来触发强制合并压缩。有关参数的详细信息，请参阅下文的<a href="#parameter-reference">“参数参考”</a>。</p>
<p>提供三种强制合并压缩模式：</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 1024 MB)
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
<p>以下示例演示了如何使用每种强制合并压缩模式。</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">默认（标准压缩）</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 1024 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">显式目标大小</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=<span class="hljs-string">&quot;2048&quot;</span>  <span class="hljs-comment"># The unit is MB</span>
)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Automatic-size-calculation" class="common-anchor-header">自动计算大小</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Let Milvus determine the optimal segment size</span>
max_int64 = (<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">63</span>) - <span class="hljs-number">1</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=max_int64
)
<button class="copy-code-btn"></button></code></pre>
<p><a id="parameter-reference"></a></p>
<h4 id="Parameter-reference" class="common-anchor-header">参数参考</h4><p>下表对各项参数进行了说明。</p>
<table>
   <tr>
     <th><p><strong>参数</strong></p></th>
     <th><p><strong>类型</strong></p></th>
     <th><p><strong>描述</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>必填。要进行压缩的Collection的名称。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>可选。目标分段大小（单位：MB）。该参数值有 3 种选项：</p><ul><li><p><strong>0 或省略</strong>：使用配置的<code translate="no">dataCoord.segment.maxSize</code> （默认：1024 MB）。等同于标准压缩。</p></li><li><p><strong>显式值</strong>：将分段合并至大约指定大小（以 MB 为单位，例如 2048）。该值必须大于或等于配置的<code translate="no">dataCoord.segment.maxSize</code> 。</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)</strong>：根据当前分段分布和可用节点资源自动计算最佳大小。</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>如果指定的<code translate="no">target_size</code> 小于配置的<code translate="no">dataCoord.segment.maxSize</code> ，则请求将被拒绝并返回错误。</p>
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
    </button></h3><p>强制合并压缩以异步方式运行。请使用返回的作业 ID 检查进度：</p>
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
<li><p><strong>请勿在生产环境中使用强制合并压缩。</strong></p></li>
<li><p><strong>在大多数情况下，请使用自动大小计算模式。</strong>将<code translate="no">target_size</code> 设置为<code translate="no">max_int64</code> 可让Milvus分析您的分段分布和节点资源，从而确定最佳大小。除非您有特定的尺寸要求，否则这是推荐的做法。</p></li>
<li><p><strong>请权衡性能取舍。</strong>强制合并压缩是一项资源密集型操作。它会读取、合并并重写分段数据。请在流量较低的时段安排该操作，以最大限度地减少对查询延迟的影响。</p></li>
<li><p><strong>监控操作前后的分段数量。</strong>使用<code translate="no">get_compaction_state()</code> 和<code translate="no">list_persistent_segments</code> 验证压缩操作是否如预期般生成了数量更少、体积更大的分段。</p></li>
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
    </button></h2><p><strong>强制合并与标准压缩有何区别？</strong></p>
<p>这两种压缩操作的目的不同。</p>
<ul>
<li><p>标准压缩（targetSize=0 或省略）是一种尽最大努力的增量清理路径。</p></li>
<li><p>强制合并（targetSize&gt;0）是一种Collection级别重新打包路径，旨在生成数量更少、大小更大且接近目标大小的分段。</p></li>
</ul>
<p>关键区别在于合并形式：标准压缩实际上是每个任务 m → 1，而强制合并则是跨分组输入的 m → n。这就是为什么强制合并能够解决标准压缩无法解决的段布局问题。下表对比了这两种操作类型。</p>
<table>
   <tr>
     <th><p><strong>维度</strong></p></th>
     <th><p><strong>标准压缩（默认）</strong></p></th>
     <th><p><strong>强制合并</strong></p></th>
   </tr>
   <tr>
     <td><p>API 触发条件</p></td>
     <td><p>targetSize=0（或未设置），无 Major/L0 标志</p></td>
     <td><p>targetSize&gt;0 (MB)</p></td>
   </tr>
   <tr>
     <td><p>主要目标</p></td>
     <td><p>对明显碎片进行增量清理；例行维护</p></td>
     <td><p>针对整个Collection进行整合，以优化搜索和平衡</p></td>
   </tr>
   <tr>
     <td><p>段大小的来源</p></td>
     <td><p>固定值 dataCoord.segment.maxSize（服务器配置）</p></td>
     <td><p>用户指定的 targetSize，随后受 maxSafeSize 的安全限制</p></td>
   </tr>
   <tr>
     <td><p>参数有效性</p></td>
     <td><p>不支持用户调整大小</p></td>
     <td><p>用户指定的 targetSize 必须 ≥ dataCoord.segment.maxSize；否则将被拒绝</p></td>
   </tr>
   <tr>
     <td><p>安全上限</p></td>
     <td><p>仅由配置上限决定</p></td>
     <td><p>maxSafeSize = min(QueryNode mem, DataNode mem) / memory_factor（独立模式且不进行池化：进一步减半）</p></td>
   </tr>
   <tr>
     <td><p>合并形状</p></td>
     <td><p>m → 每任务 1 个，输出 &lt;= configMaxSize</p></td>
     <td><p>m → n，输出接近 targetSize</p></td>
   </tr>
   <tr>
     <td><p>中等分段行为</p></td>
     <td><p>可能永久卡住（例如，两个 60% 的分段无法合法地合并为一个 120% 的分段）</p></td>
     <td><p>重新打包 + 拆分有效；不存在“卡在 60%”的模式</p></td>
   </tr>
   <tr>
     <td><p>Collection扁平化能力</p></td>
     <td><p>有限；重复运行仍可能留下许多中等大小的分段</p></td>
     <td><p>很强；旨在减少分段数量并提高填充率</p></td>
   </tr>
   <tr>
     <td><p>拓扑感知能力</p></td>
     <td><p>无</p></td>
     <td><p>有；利用 QueryNode/副本/分片布局</p></td>
   </tr>
   <tr>
     <td><p>读取路径并行度调优</p></td>
     <td><p>无</p></td>
     <td><p>在有效时，使用 queryNodeCount / (副本数 × 分片数) 调整输出条目数</p></td>
   </tr>
   <tr>
     <td><p>典型用例</p></td>
     <td><p>写入/删除操作后的高流失率日常清理</p></td>
     <td><p>基准测试准备、搜索优化、负载与并行度的对齐</p></td>
   </tr>
   <tr>
     <td><p>作用范围预期</p></td>
     <td><p>不应期望进行全Collection重新打包</p></td>
     <td><p>旨在实现集合级重新打包结果</p></td>
   </tr>
</table>
<p><strong>选择指南：</strong></p>
<ul>
<li><p>选择标准压缩以实现低风险的增量清理。</p></li>
<li><p>当您明确希望将Collection重塑为数量更少、体积更大的分段，且这些分段与搜索和加载行为相匹配时，请选择强制合并。</p></li>
</ul>
<p><strong>“强制合并”与“聚类压缩”有何区别？</strong></p>
<p>聚类压缩（<code translate="no">is_clustering=True</code> ）基于聚类键对分段内的数据进行重组，以改善搜索剪枝效果。强制合并（<code translate="no">target_size=N</code> ）在不改变数据分布的情况下优化分段大小。它们服务于不同的目的，且可以结合使用——先运行聚类压缩来组织数据，然后运行强制合并来整合生成的分段。</p>
<p><strong>可以在正在被查询的Collection上运行强制合并吗？</strong></p>
<p>可以。强制合并以异步方式运行，不会阻塞查询。但是，它会消耗 DataNode 和磁盘 I/O 资源，因此在压缩期间查询延迟可能会增加。为获得最佳效果，请在流量较低的时段安排强制合并。</p>
<p><strong>如果将 target_size 设置为小于 maxSize 会怎样？</strong></p>
<p>系统将返回错误并拒绝该请求。目标大小必须大于或等于配置的<code translate="no">dataCoord.segment.maxSize</code> 。</p>
