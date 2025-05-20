---
id: disk_index.md
related_key: disk_index
summary: Milvus 中用于磁盘优化向量搜索的磁盘索引机制。
title: 盘上索引
---
<h1 id="On-disk-Index" class="common-anchor-header">盘上索引<button data-href="#On-disk-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>本文介绍了用于磁盘优化向量搜索的磁盘索引算法 DiskANN。DiskANN 基于 Vamana 图，可在大型数据集中进行高效的磁盘上向量搜索。</p>
<p>为了提高查询性能，可以为每个向量字段<a href="/docs/zh/index-vector-fields.md">指定一种索引类型</a>。</p>
<div class="alert note"> 
目前，一个向量字段只支持一种索引类型。切换索引类型时，Milvus 会自动删除旧索引。</div>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>要在 Milvus 中使用 DiskANN，请注意</p>
<ul>
<li>Milvus 实例运行在 Ubuntu 18.04.6 或更高版本上。</li>
<li>Milvus 数据路径应挂载到 NVMe SSD 上，以充分发挥性能：<ul>
<li>对于 Milvus Standalone 实例，数据路径应为实例运行容器中的<strong>/var/lib/milvus/data</strong>。</li>
<li>对于 Milvus 群集实例，数据路径应为查询节点和索引节点所在容器中的<strong>/var/lib/milvus/data</strong>。</li>
</ul></li>
</ul>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>要使用 DiskANN，请确保</p>
<ul>
<li>数据中只使用至少 1 维的浮点矢量。</li>
<li>仅使用欧氏距离 (L2)、内积 (IP) 或 COSINE 来测量向量之间的距离。</li>
</ul>
<h2 id="Index-and-search-settings" class="common-anchor-header">索引和搜索设置<button data-href="#Index-and-search-settings" class="anchor-icon" translate="no">
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
<li><p>索引构建参数</p>
<p>建立 DiskANN 索引时，请使用<code translate="no">DISKANN</code> 作为索引类型。无需索引参数。</p></li>
<li><p>搜索参数</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_list</code></td><td>候选列表的大小，越大召回率越高，但性能越差。</td><td>[topk,int32_max]（最大值</td><td>16</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="DiskANN-related-Milvus-configurations" class="common-anchor-header">与 DiskANN 相关的 Milvus 配置<button data-href="#DiskANN-related-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>DiskANN 是可调的。您可以在<code translate="no">${MILVUS_ROOT_PATH}/configs/milvus.yaml</code> 中修改与 DiskANN 相关的参数，以提高其性能。</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-string">...</span>
<span class="hljs-attr">DiskIndex:</span>
  <span class="hljs-attr">MaxDegree:</span> <span class="hljs-number">56</span>
  <span class="hljs-attr">SearchListSize:</span> <span class="hljs-number">100</span>
  <span class="hljs-attr">PQCodeBugetGBRatio:</span> <span class="hljs-number">0.125</span>
  <span class="hljs-attr">SearchCacheBudgetGBRatio:</span> <span class="hljs-number">0.125</span>
  <span class="hljs-attr">BeamWidthRatio:</span> <span class="hljs-number">4.0</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>值范围</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MaxDegree</code></td><td>Vamana 图形的最大阶数。 <br/> 数值越大，召回率越高，但会增加索引的大小和建立索引的时间。</td><td>[1, 512]</td><td>56</td></tr>
<tr><td><code translate="no">SearchListSize</code></td><td>候选列表的大小。 <br/> 该值越大，建立索引的时间越长，但召回率越高。 <br/> 除非需要缩短建立索引的时间，否则请将其设置为小于<code translate="no">MaxDegree</code> 的值。</td><td>[1，int32_max］</td><td>100</td></tr>
<tr><td><code translate="no">PQCodeBugetGBRatio</code></td><td>PQ 代码的大小限制。 <br/> 该值越大，调用率越高，但会增加内存使用量。</td><td>(0.0, 0.25]</td><td>0.125</td></tr>
<tr><td><code translate="no">SearchCacheBudgetGBRatio</code></td><td>缓存节点数与原始数据之比。 <br/> 数值越大，建立索引的性能越好，但内存使用量也会增加。</td><td>[0.0, 0.3)</td><td>0.10</td></tr>
<tr><td><code translate="no">BeamWidthRatio</code></td><td>每次搜索迭代的最大 IO 请求数与 CPU 数量之比。</td><td>[1，max(128 / CPU 数量，16)</td><td>4.0</td></tr>
</tbody>
</table>
<h2 id="Troubleshooting" class="common-anchor-header">故障排除<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
<li><p>如何处理<code translate="no">io_setup() failed; returned -11, errno=11:Resource temporarily unavailable</code> 错误？</p>
<p>Linux 内核提供了异步非阻塞 I/O（AIO）功能，允许一个进程同时启动多个 I/O 操作，而无需等待任何一个操作完成。这有助于提高处理和 I/O 重叠的应用程序的性能。</p>
<p>可以使用 proc 文件系统中的<code translate="no">/proc/sys/fs/aio-max-nr</code> 虚拟文件来调整性能。<code translate="no">aio-max-nr</code> 参数决定允许的最大并发请求数。</p>
<p><code translate="no">aio-max-nr</code> 默认为<code translate="no">65535</code> ，也可设置为<code translate="no">10485760</code> 。</p></li>
</ul>
