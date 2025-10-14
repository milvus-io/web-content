---
id: eviction.md
title: 驱逐Compatible with Milvus 2.6.4+
summary: 驱逐管理 Milvus 中每个查询节点的缓存资源。启用后，一旦达到资源阈值，它就会自动删除缓存数据，确保性能稳定，防止内存或磁盘耗尽。
beta: Milvus 2.6.4+
---
<h1 id="Eviction" class="common-anchor-header">驱逐<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Eviction" class="anchor-icon" translate="no">
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
    </button></h1><p>Eviction 管理 Milvus 中每个查询节点的缓存资源。启用后，一旦达到资源阈值，它就会自动删除缓存数据，确保性能稳定，防止内存或磁盘耗尽。</p>
<p>驱逐使用<a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">最近最少使用（LRU）</a>策略来回收缓存空间。元数据始终处于缓存状态，从不驱逐，因为元数据对查询规划至关重要，而且通常很小。</p>
<div class="alert note">
<p>必须显式启用驱逐。如果没有配置，缓存数据将继续累积，直到资源耗尽。</p>
</div>
<h2 id="Eviction-types" class="common-anchor-header">驱逐类型<button data-href="#Eviction-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支持两种互补的驱逐模式<strong>（</strong> <strong>sync</strong> 和<strong>async</strong>），这两种模式可共同实现最佳资源管理：</p>
<table>
   <tr>
     <th><p>方面</p></th>
     <th><p>同步驱逐</p></th>
     <th><p>异步驱逐</p></th>
   </tr>
   <tr>
     <td><p>触发</p></td>
     <td><p>在查询或搜索过程中，当内存/磁盘使用量超过内部限制时。</p></td>
     <td><p>后台线程会定期检查使用情况，并在超过高水位时触发驱逐。</p></td>
   </tr>
   <tr>
     <td><p>行为</p></td>
     <td><p>缓存回收时暂停查询执行。继续驱逐，直到使用率降至低水位线以下。</p></td>
     <td><p>在后台持续运行；当使用量超过高水位线时删除数据，直到使用量降至低水位线以下。不会阻止查询。</p></td>
   </tr>
   <tr>
     <td><p>最适合</p></td>
     <td><p>可承受短暂延迟峰值的工作负载，或异步驱逐无法快速回收空间的工作负载。</p></td>
     <td><p>对延迟敏感、需要平稳性能的工作负载。主动资源管理的理想选择。</p></td>
   </tr>
   <tr>
     <td><p>注意事项</p></td>
     <td><p>会增加正在进行的查询的延迟。如果可回收数据不足，可能会导致超时。</p></td>
     <td><p>需要适当调整水印。轻微的后台资源开销。</p></td>
   </tr>
   <tr>
     <td><p>配置</p></td>
     <td><p>通过<code translate="no">evictionEnabled: true</code></p></td>
     <td><p>通过<code translate="no">backgroundEvictionEnabled: true</code> 启用（需要<code translate="no">evictionEnabled: true</code>)</p></td>
   </tr>
</table>
<p><strong>建议设置</strong>：</p>
<p>同时启用两种模式，以实现最佳平衡。异步驱逐会主动管理缓存的使用情况，而同步驱逐则在资源接近耗尽时作为安全后备。</p>
<div class="alert note">
<p>对于可驱逐的字段和索引，驱逐单元与加载粒度相匹配--标量/向量字段按块驱逐，标量/向量索引按段驱逐。</p>
</div>
<h2 id="Enable-eviction" class="common-anchor-header">启用驱逐<button data-href="#Enable-eviction" class="anchor-icon" translate="no">
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
    </button></h2><p>在<code translate="no">milvus.yaml</code> 的<code translate="no">queryNode.segcore.tieredStorage</code> 下配置驱逐：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>             <span class="hljs-comment"># Enables synchronous eviction</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>   <span class="hljs-comment"># Enables background (asynchronous) eviction</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>类型</p></th>
     <th><p>值</p></th>
     <th><p>说明</p></th>
     <th><p>建议用例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictionEnabled</code></p></td>
     <td><p>二进制</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>驱逐策略的主开关。默认为<code translate="no">false</code> 。启用同步驱逐模式。</p></td>
     <td><p>在分层存储中始终设置为<code translate="no">true</code> 。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">backgroundEvictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>在后台异步运行驱逐。需要<code translate="no">evictionEnabled: true</code> 。默认为<code translate="no">false</code> 。</p></td>
     <td><p>使用<code translate="no">true</code> 可提高查询性能，减少同步驱逐频率。</p></td>
   </tr>
</table>
<h2 id="Configure-watermarks" class="common-anchor-header">配置水印<button data-href="#Configure-watermarks" class="anchor-icon" translate="no">
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
    </button></h2><p>水印定义内存和磁盘的缓存驱逐开始和结束时间。每种资源类型有两个阈值：</p>
<ul>
<li><p><strong>高水印：</strong>当使用量超过此值时，开始驱逐。</p></li>
<li><p><strong>低水印：</strong>继续驱逐，直到使用率低于此值。</p></li>
</ul>
<div class="alert note">
<p>此配置仅在<a href="/docs/zh/eviction.md#Enable-eviction">启用驱逐</a>时生效。</p>
</div>
<p><strong>示例 YAML</strong>：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Memory watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>    <span class="hljs-comment"># Eviction stops below 75% memory usage</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>    <span class="hljs-comment"># Eviction starts above 80% memory usage</span>

      <span class="hljs-comment"># Disk watermarks</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>      <span class="hljs-comment"># Eviction stops below 75% disk usage</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>      <span class="hljs-comment"># Eviction starts above 80% disk usage</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>类型</p></th>
     <th><p>范围</p></th>
     <th><p>说明</p></th>
     <th><p>推荐用例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">memoryLowWatermarkRatio</code></p></td>
     <td><p>浮点数</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>停止驱逐的内存使用水平。</p></td>
     <td><p>从<code translate="no">0.75</code> 开始。如果查询节点内存有限，可略微降低。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryHighWatermarkRatio</code></p></td>
     <td><p>浮点数</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>异步驱逐开始时的内存使用水平。</p></td>
     <td><p>从<code translate="no">0.8</code> 开始。与低水位线保持合理的差距（例如 0.05-0.10），以防止频繁触发。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskLowWatermarkRatio</code></p></td>
     <td><p>浮动</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>停止驱逐的磁盘使用水平。</p></td>
     <td><p>从<code translate="no">0.75</code> 开始。如果磁盘 I/O 受限，可将其调低。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskHighWatermarkRatio</code></p></td>
     <td><p>浮动</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>开始异步驱逐的磁盘使用级别。</p></td>
     <td><p>从<code translate="no">0.8</code> 开始。与低水位线保持合理的差距（如 0.05-0.10），以防止频繁触发。</p></td>
   </tr>
</table>
<p><strong>最佳实践</strong>：</p>
<ul>
<li><p>不要将高水印或低水印设置在 ~0.80 以上，以便为 QueryNode 的静态使用和查询时间突发留出余地。</p></li>
<li><p>避免在高水印和低水印之间出现大的间隙；大的间隙会延长每个驱逐周期并增加延迟。</p></li>
</ul>
<h2 id="Configure-cache-TTL" class="common-anchor-header">配置缓存 TTL<button data-href="#Configure-cache-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p>即使未达到资源阈值，<strong>缓存生存时间（TTL）</strong>也会在设定的持续时间后自动删除缓存数据。它与 LRU 驱逐一起防止陈旧数据无限期占用缓存。</p>
<div class="alert note">
<p>缓存 TTL 需要<code translate="no">backgroundEvictionEnabled: true</code> ，因为它在同一个后台线程上运行。</p>
</div>
<p><strong>YAML 示例</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Set the cache expiration time to 604,800 seconds (7 days),</span>
      <span class="hljs-comment"># and expired caches will be cleaned up by a background thread.</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>类型</p></th>
     <th><p>单位</p></th>
     <th><p>说明</p></th>
     <th><p>推荐用例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">cacheTtl</code></p></td>
     <td><p>整数</p></td>
     <td><p>秒</p></td>
     <td><p>缓存数据过期前的持续时间。过期项目会在后台删除。</p></td>
     <td><p>对于高度动态的数据，使用较短的 TTL（小时）；对于稳定的数据集，使用较长的 TTL（天）。设置 0 则禁用基于时间的过期。</p></td>
   </tr>
</table>
<h2 id="Configure-overcommit-ratio" class="common-anchor-header">配置超量提交比率<button data-href="#Configure-overcommit-ratio" class="anchor-icon" translate="no">
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
    </button></h2><p>超量提交比率定义了保留多少缓存作为可驱逐缓存，允许查询节点在驱逐加剧之前暂时超出正常容量。</p>
<div class="alert note">
<p>此配置仅在<a href="/docs/zh/eviction.md#Enable-eviction">启用驱逐</a>时生效。</p>
</div>
<p><strong>示例 YAML</strong>：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Evictable Memory Cache Ratio: 30%</span>
      <span class="hljs-comment"># (30% of physical memory is reserved for storing evictable data)</span>
      <span class="hljs-attr">evictableMemoryCacheRatio:</span> <span class="hljs-number">0.3</span>
      <span class="hljs-comment"># Evictable Disk Cache Ratio: 30%</span>
      <span class="hljs-comment"># (30% of disk capacity is reserved for storing evictable data)</span>
      <span class="hljs-attr">evictableDiskCacheRatio:</span> <span class="hljs-number">0.3</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>类型</p></th>
     <th><p>范围</p></th>
     <th><p>说明</p></th>
     <th><p>推荐用例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictableMemoryCacheRatio</code></p></td>
     <td><p>浮点数</p></td>
     <td><p>[0.0, 1.0]</p></td>
     <td><p>为可驱逐数据分配的内存缓存部分。</p></td>
     <td><p>从<code translate="no">0.3</code> 开始。增加 (0.5-0.7) 表示驱逐频率较低；减少 (0.1-0.2) 表示段容量较大。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">evictableDiskCacheRatio</code></p></td>
     <td><p>浮动</p></td>
     <td><p>[0.0, 1.0]</p></td>
     <td><p>磁盘缓存中分配给可驱逐数据的部分。</p></td>
     <td><p>使用与内存类似的比率，除非磁盘 I/O 成为瓶颈。</p></td>
   </tr>
</table>
<p><strong>边界行为</strong>：</p>
<ul>
<li><p><code translate="no">1.0</code>:所有缓存都是可驱逐的--很少触发驱逐，但每个查询节点适合的段较少。</p></li>
<li><p><code translate="no">0.0</code>:没有可驱逐缓存--经常发生驱逐；适合的数据段更多，但延迟可能会增加。</p></li>
</ul>
