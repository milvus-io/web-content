---
id: gpu_index.md
related_key: gpu_index
summary: Milvus 的 GPU 索引机制。
title: GPU 索引
---
<h1 id="GPU-Index" class="common-anchor-header">GPU 索引<button data-href="#GPU-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 支持各种 GPU 索引类型，以加快搜索性能和效率，尤其是在高吞吐量和高调用场景中。本主题概述了 Milvus 支持的 GPU 索引类型、适合的使用案例和性能特点。有关使用 GPU 建立索引的信息，请参阅《<a href="/docs/zh/v2.4.x/index-with-gpu.md">使用 GPU 建立索引</a>》。</p>
<p>值得注意的是，与使用 CPU 索引相比，使用 GPU 索引并不一定能减少延迟。如果想完全最大化吞吐量，则需要极高的请求压力或大量的查询向量。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/gpu_index.png" alt="performance" class="doc-image" id="performance" />
   </span> <span class="img-wrapper"> <span>性能</span> </span></p>
<p>Milvus 的 GPU 支持由 Nvidia<a href="https://rapids.ai/">RAPIDS</a>团队贡献。以下是 Milvus 目前支持的 GPU 索引类型。</p>
<h2 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_CAGRA 是为 GPU 优化的基于图的索引，与使用昂贵的训练级 GPU 相比，使用推理级 GPU 运行 Milvus GPU 版本可以获得更高的成本效益。</p>
<ul>
<li><p>索引构建参数</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">intermediate_graph_degree</code></td><td>通过在剪枝之前确定图的度数来影响召回率和构建时间。推荐值为<code translate="no">32</code> 或<code translate="no">64</code> 。</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">graph_degree</code></td><td>通过设置剪枝后图形的度数来影响搜索性能和召回率。这两个度数之间的差值越大，构建时间就越长。其值必须小于<strong>intermediate_graph_degree</strong> 的值。</td><td><code translate="no">64</code></td></tr>
<tr><td><code translate="no">build_algo</code></td><td>选择剪枝前的图形生成算法。可能的值：</br><code translate="no">IVF_PQ</code>:提供更高的质量，但构建时间较慢。</br><code translate="no">NN_DESCENT</code>提供更快的生成速度，但召回率可能较低。</td><td><code translate="no">IVF_PQ</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>决定是否在 GPU 内存中缓存原始数据集。可能的值</br><code translate="no">“true”</code>:缓存原始数据集，通过细化搜索结果提高召回率。</br><code translate="no">“false”</code>不缓存原始数据集，以节省 GPU 内存。</td><td><code translate="no">“false”</code></td></tr>
</tbody>
</table>
</li>
<li><p>搜索参数</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">itopk_size</code></td><td>决定搜索过程中保留的中间结果的大小。较大的值可能会提高召回率，但会降低搜索性能。它至少应等于最终的 top-k（极限）值，通常是 2 的幂次（例如 16、32、64、128）。</td><td>空</td></tr>
<tr><td><code translate="no">search_width</code></td><td>指定搜索过程中进入 CAGRA 图的入口点数量。增加该值可以提高召回率，但可能会影响搜索性能（如 1、2、4、8、16、32）。</td><td>空</td></tr>
<tr><td><code translate="no">min_iterations</code> /<code translate="no">max_iterations</code></td><td>控制搜索迭代过程。默认设置为<code translate="no">0</code> ，CAGRA 会根据<code translate="no">itopk_size</code> 和<code translate="no">search_width</code> 自动确定迭代次数。手动调整这些值有助于平衡性能和准确性。</td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">team_size</code></td><td>指定用于在 GPU 上计算度量距离的 CUDA 线程数。常用值是 2 的幂次，最高可达 32（例如 2、4、8、16、32）。它对搜索性能影响不大。默认值为<code translate="no">0</code> ，Milvus 会根据向量维度自动选择<code translate="no">team_size</code> 。</td><td><code translate="no">0</code></td></tr>
</tbody>
</table>
</li>
</ul>
<ul>
<li><p>搜索限制</p>
<table>
<thead>
<tr><th>参数</th><th>范围</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (顶-K)</td><td>&lt;= 1024</td></tr>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;=max((<code translate="no">itopk_size</code> + 31)// 32,<code translate="no">search_width</code>)* 32</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFFLAT" class="common-anchor-header">GPU_IVF_FLAT<button data-href="#GPUIVFFLAT" class="anchor-icon" translate="no">
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
    </button></h2><p>与<a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a> 类似，GPU_IVF_<a href="https://milvus.io/docs/index.md#IVF_FLAT">FLAT</a> 也是将向量数据划分为<code translate="no">nlist</code> 聚类单元，然后比较目标输入向量与每个聚类中心之间的距离。根据系统设置查询的簇数（<code translate="no">nprobe</code> ），相似性搜索结果仅根据目标输入与最相似簇中向量的比较结果返回--大大缩短了查询时间。</p>
<p>通过调整<code translate="no">nprobe</code> ，可以在特定情况下找到准确性和速度之间的理想平衡。<a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">IVF_FLAT 性能测试</a>结果表明，随着目标输入向量数 (<code translate="no">nq</code>) 和要搜索的簇数 (<code translate="no">nprobe</code>) 的增加，查询时间也会急剧增加。</p>
<p>GPU_IVF_FLAT 是最基本的 IVF 索引，每个单元中存储的编码数据与原始数据一致。</p>
<p>在进行搜索时要注意，针对 GPU_IVF_FLAT 索引的 Collections 进行任何搜索时，都可以将 top-K 设置为最多 256。</p>
<ul>
<li><p>索引建立参数</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>群组单位数</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>决定是否在 GPU 内存中缓存原始数据集。可能的值</br><code translate="no">“true”</code>:缓存原始数据集，通过细化搜索结果提高召回率。</br><code translate="no">“false”</code>不缓存原始数据集，以节省 GPU 内存。</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;flase&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>搜索参数</p>
<ul>
<li><p>普通搜索</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>要查询的单位数</td><td>[1，nlist］</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>搜索限制</p>
<table>
<thead>
<tr><th>参数</th><th>范围</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;=<code translate="no">2048</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">PQ</code> (乘积量化）将原始高维向量空间均匀分解为 低维向量空间的笛卡尔乘积，然后对分解后的低维向量空间进行量化。乘积量化不需要计算目标向量与所有单元中心的距离，而是能够计算目标向量与每个低维空间聚类中心的距离，大大降低了算法的时间复杂度和空间复杂度。<code translate="no">m</code> </p>
<p>IVF_PQ 先进行 IVF 索引聚类，然后再对向量的乘积进行量化。其索引文件比 IVF_SQ8 更小，但在搜索向量时也会造成精度损失。</p>
<div class="alert note">
<p>索引建立参数和搜索参数随 Milvus Distributed 分布而异。请先选择您的 Milvus Distributed。</p>
<p>在进行搜索时，请注意针对 GPU_IVF_FLAT 索引 Collections 的任何搜索都可以将 top-K 设置为 8192。</p>
</div>
<ul>
<li><p>索引建立参数</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>群组单位数</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">m</code></td><td>乘积量化因子数、</td><td><code translate="no">dim mod m or = 0</code></td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[可选项] 每个低维向量的存储位数。</td><td>[1, 16]</td><td><code translate="no">8</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>决定是否在 GPU 内存中缓存原始数据集。可能的值：</br><code translate="no">“true”</code>:缓存原始数据集，通过细化搜索结果提高召回率。</br><code translate="no">“false”</code>不缓存原始数据集，以节省 GPU 内存。</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;false&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>搜索参数</p>
<ul>
<li><p>普通搜索</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>要查询的单位数</td><td>[1，nlist］</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>搜索限制</p>
<table>
<thead>
<tr><th>参数</th><th>范围</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;=<code translate="no">1024</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUBRUTEFORCE" class="common-anchor-header">GPU_BRUTE_FORCE<button data-href="#GPUBRUTEFORCE" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_BRUTE_FORCE 专为对召回率要求极高的情况定制，通过将每个查询与数据集中的所有向量进行比较，保证召回率为 1。它只需要度量类型 (<code translate="no">metric_type</code>) 和 top-k (<code translate="no">limit</code>) 作为索引构建和搜索参数。</p>
<p>对于 GPU_BRUTE_FORCE，不需要额外的索引建立参数或搜索参数。</p>
<h2 id="Conclusion" class="common-anchor-header">结论<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>目前，Milvus 会将所有索引加载到 GPU 内存中，以便进行高效的搜索操作。可加载的数据量取决于 GPU 内存的大小：</p>
<ul>
<li><strong>GPU_CAGRA</strong>：内存使用量约为原始向量数据的 1.8 倍。</li>
<li><strong>GPU_IVF_FLAT</strong>和<strong>GPU_BRUTE_FORCE</strong>：需要与原始数据大小相等的内存。</li>
<li><strong>GPU_IVF_PQ</strong>：占用内存较少，具体取决于压缩参数设置。</li>
</ul>
