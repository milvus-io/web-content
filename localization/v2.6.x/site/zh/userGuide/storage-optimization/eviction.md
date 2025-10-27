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
     <td><p>当内存或磁盘使用量超过内部限制时，在查询或搜索过程中发生。</p></td>
     <td><p>当使用量超过高水位线或缓存数据达到其生存时间 (TTL) 时，由后台线程触发。</p></td>
   </tr>
   <tr>
     <td><p>行为</p></td>
     <td><p>查询节点回收缓存空间时，查询或搜索操作会暂时停止。驱逐将继续进行，直到使用率降到低水位线以下或出现超时。如果超时且无法回收足够的数据，查询或搜索可能会失败。</p></td>
     <td><p>定期在后台运行，当使用率超过高水位或数据根据 TTL 过期时，主动驱逐缓存数据。驱逐会一直持续，直到使用量降至低水位线以下。不会阻止查询。</p></td>
   </tr>
   <tr>
     <td><p>最适合</p></td>
     <td><p>能承受高峰使用期间短暂延迟峰值或暂时停顿的工作负载。当异步驱逐不能足够快地回收空间时非常有用。</p></td>
     <td><p>需要流畅、可预测查询性能的延迟敏感型工作负载。是主动资源管理的理想选择。</p></td>
   </tr>
   <tr>
     <td><p>注意事项</p></td>
     <td><p>如果可驱逐数据不足，可能会导致短暂的查询延迟或超时。</p></td>
     <td><p>需要适当调整高/低水印和 TTL 设置。后台线程有轻微开销。</p></td>
   </tr>
   <tr>
     <td><p>配置</p></td>
     <td><p>通过<code translate="no">evictionEnabled: true</code></p></td>
     <td><p>通过<code translate="no">backgroundEvictionEnabled: true</code> 启用（同时需要<code translate="no">evictionEnabled: true</code> ）</p></td>
   </tr>
</table>
<p><strong>建议设置</strong>：</p>
<ul>
<li><p>两种驱逐模式可同时启用，以实现最佳平衡，前提是您的工作负载受益于分层存储，并能承受与驱逐相关的获取延迟。</p></li>
<li><p>对于性能测试或对延迟要求较高的场景，可考虑完全禁用驱逐，以避免驱逐后的网络获取开销。</p></li>
</ul>
<div class="alert note">
<p>对于可驱逐字段和索引，驱逐单元与加载粒度相匹配--标量/向量字段按块驱逐，标量/向量索引按段驱逐。</p>
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
<li><p><strong>高水印</strong>：当使用量超过此值时，开始驱逐。</p></li>
<li><p><strong>低水印</strong>：继续驱逐，直到使用率低于此值。</p></li>
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
     <td><p>从<code translate="no">0.8</code> 开始。与低水位线保持适当差距（例如 0.05-0.10），以防止频繁触发。</p></td>
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
