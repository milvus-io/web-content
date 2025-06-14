---
id: gpu-index-overview.md
title: GPU 索引概述
summary: 在 Milvus 中建立一个支持 GPU 的索引，可以显著提高高吞吐量和高调用场景下的搜索性能。
---
<h1 id="GPU-Index-Overview" class="common-anchor-header">GPU 索引概述<button data-href="#GPU-Index-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中建立一个支持 GPU 的索引，可以显著提高高吞吐量和高调用情况下的搜索性能。</p>
<p>下图比较了各种索引配置在不同硬件设置、向量数据集（Cohere 和 OpenAI）和搜索批量大小下的查询吞吐量（每秒查询次数），显示<code translate="no">GPU_CAGRA</code> 始终优于其他方法。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/gpu-index-performance.png" alt="Gpu Index Performance" class="doc-image" id="gpu-index-performance" />
   </span> <span class="img-wrapper"> <span>GPU 索引性能</span> </span></p>
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
    </button></h2><ul>
<li><p>对于<code translate="no">GPU_IVF_FLAT</code> ，<code translate="no">limit</code> 的最大值为 1,024。</p></li>
<li><p>对于<code translate="no">GPU_IVF_PQ</code> 和<code translate="no">GPU_CAGRA</code> ，<code translate="no">limit</code> 的最大值为 1,024。</p></li>
<li><p>虽然<code translate="no">GPU_BRUTE_FORCE</code> 没有设定<code translate="no">limit</code> ，但建议不要超过 4,096 以避免潜在的性能问题。</p></li>
<li><p>目前，GPU 索引不支持<code translate="no">COSINE</code> 距离。如果需要使用<code translate="no">COSINE</code> 距离，应首先对数据进行归一化处理，然后使用内积 (IP) 距离作为替代。</p></li>
<li><p>GPU 索引不完全支持加载 OOM 保护，过多的数据可能会导致 QueryNode 崩溃。</p></li>
<li><p>GPU 索引不支持<a href="/docs/zh/range-search.md">范围</a>搜索和<a href="/docs/zh/grouping-search.md">分组搜索</a>等搜索功能。</p></li>
</ul>
<h2 id="Supported-GPU-index-types" class="common-anchor-header">支持的 GPU 索引类型<button data-href="#Supported-GPU-index-types" class="anchor-icon" translate="no">
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
    </button></h2><p>下表列出了 Milvus 支持的 GPU 索引类型。</p>
<table>
   <tr>
     <th><p>索引类型</p></th>
     <th><p>说明</p></th>
     <th><p>内存使用量</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/gpu-cagra.md">GPU_CAGRA</a></p></td>
     <td><p>与使用昂贵的训练级 GPU 相比，使用推理级 GPU 运行 Milvus GPU 版本更具成本效益。</p></td>
     <td><p>内存使用量约为原始向量数据的 1.8 倍。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/gpu-ivf-flat.md">GPU_IVF_FLAT</a></p></td>
     <td><p>GPU_IVF_FLAT 是最基本的 IVF 索引，每个单元中存储的编码数据与原始数据一致。在进行搜索时，请注意针对 GPU_IVF_FLAT 索引 Collections 的任何搜索，都可以将 top-k (<code translate="no">limit</code>) 设置为最多 256。</p></td>
     <td><p>需要与原始数据大小相等的内存。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/gpu-ivf-pq.md">GPU_IVF_PQ</a></p></td>
     <td><p>GPU_IVF_PQ 在量化向量的乘积之前执行 IVF 索引聚类。在进行搜索时，请注意可以将针对 GPU_IVF_FLAT 索引 Collections 的任何搜索的 top-k (<code translate="no">limit</code>) 设置为最高 8,192。</p></td>
     <td><p>利用较小的内存占用，这取决于压缩参数的设置。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/gpu-brute-force.md">GPU_BRUTE_FORCE</a></p></td>
     <td><p>GPU_BRUTE_FORCE 专为对召回率要求极高的情况定制，通过将每个查询与数据集中的所有向量进行比较，保证召回率为 1。它只需要度量类型 (<code translate="no">metric_type</code>) 和 top-k (<code translate="no">limit</code>) 作为索引构建和搜索参数。</p></td>
     <td><p>所需的内存与原始数据的大小相等。</p></td>
   </tr>
</table>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">为 GPU 内存控制配置 Milvus 设置<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 使用全局图形内存池分配 GPU 内存。它支持<a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">Milvus 配置文件</a>中的两个参数<code translate="no">initMemSize</code> 和<code translate="no">maxMemSize</code> 。内存池大小初始设置为<code translate="no">initMemSize</code> ，超过此限制后将自动扩展至<code translate="no">maxMemSize</code> 。</p>
<p>Milvus 启动时，默认<code translate="no">initMemSize</code> 为可用 GPU 内存的 1/2，默认<code translate="no">maxMemSize</code> 等于所有可用 GPU 内存。</p>
<p>在 Milvus 2.4.1 之前，Milvus 使用统一的 GPU 内存池。对于 2.4.1 之前的版本，建议将这两个值都设为 0。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>从 Milvus 2.4.1 起，GPU 内存池仅用于搜索期间的临时 GPU 数据。因此，建议将其设置为 2048 和 4096。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>要了解如何建立 GPU 索引，请参阅每种索引类型的具体指南。</p>
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
    </button></h2><ul>
<li><p><strong>何时适合使用 GPU 索引？</strong></p>
<p>GPU 索引尤其适用于需要高吞吐量或高召回率的情况。例如，在处理大批量数据时，GPU 索引的吞吐量可比 CPU 索引高出 100 倍之多。在批量较小的情况下，GPU 索引在性能上仍明显优于 CPU 索引。此外，如果需要快速插入数据，采用 GPU 可以大大加快索引的建立过程。</p></li>
<li><p><strong>GPU_CAGRA、GPU_IVF_PQ、GPU_IVF_FLAT 和 GPU_BRUTE_FORCE 等 GPU 索引最适合哪些应用场景？</strong></p>
<p><code translate="no">GPU_CAGRA</code> GPU_IVF_FLAT、GPU_BRUTE_FORCE 和 GPU_CAGRA 索引非常适合需要增强性能的应用场景，尽管代价是消耗更多内存。对于优先考虑节省内存的环境， 索引可以帮助最大限度地减少存储需求，不过这也会带来较高的精度损失。 索引是一个平衡的选择，在性能和内存使用之间提供了一个折中方案。最后， 索引专为穷举搜索操作而设计，通过执行遍历搜索来保证召回率为 1。<code translate="no">GPU_IVF_PQ</code> <code translate="no">GPU_IVF_FLAT</code> <code translate="no">GPU_BRUTE_FORCE</code> </p></li>
</ul>
