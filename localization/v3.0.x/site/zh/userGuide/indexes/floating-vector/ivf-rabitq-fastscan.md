---
id: ivf-rabitq-fastscan.md
title: IVF_RABITQ_FASTSCANCompatible with Milvus 3.0.x
summary: IVF_RABITQ_FASTSCAN 结合了 IVF、RaBitQ 二进制量化以及 SIMD 批量扫描技术，可提供内存效率高且吞吐量大的向量搜索。
beta: Milvus 3.0.x
---
<h1 id="IVFRABITQFASTSCAN" class="common-anchor-header">IVF_RABITQ_FASTSCAN<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#IVFRABITQFASTSCAN" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">IVF_RABITQ_FASTSCAN</code> 结合了IVF分区、RaBitQ二进制量化和FastScan批处理技术。它为数据库向量存储一位元的RaBitQ编码，并以32个数据库向量为单位（该单位适合SIMD处理）对这些编码进行处理。这使其成为适用于高吞吐量、内存受限且可接受近似结果的工作负载的理想选择。</p>
<p>当搜索涉及大量候选项且吞吐量是首要目标时，应选择<code translate="no">IVF_RABITQ_FASTSCAN</code> <a href="/docs/zh/ivf-rabitq.md">而非IVF_RABITQ</a>。 FastScan的每次查询初始化开销会分摊到打包的代码块中，因此对于大型数据集或较长的IVF列表通常更为有利。对于小型Collection或仅需检查少量候选项的搜索，请改用<code translate="no">IVF_RABITQ</code> 。它还支持可配置的查询量化、更多细化类型以及迭代器。</p>
<h2 id="How-it-works" class="common-anchor-header">工作原理<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">IVF_RABITQ_FASTSCAN</code> 包含以下阶段：</p>
<ol>
<li><strong>IVF 分区</strong>：IVF 将向量分组为<code translate="no">nlist</code> 个簇，并搜索<code translate="no">nprobe</code> 个最近的簇。</li>
<li><strong>RaBitQ 编码</strong>：每个向量残差都被编码为每维一位的 RaBitQ 代码。</li>
<li><strong>FastScan</strong>：索引将代码打包，以实现适合缓存的SIMD批处理。它每批评估32个数据库向量。</li>
<li><strong>可选精化</strong>：启用后，FP32精化器会在Milvus返回最终结果前对候选项进行重新评分。</li>
</ol>
<p>底层的 Faiss 索引位于<code translate="no">IndexIVFRaBitQFastScan</code> 。Knowhere 对其进行了随机旋转变换封装，并可选地添加了 FP32 精化器。</p>
<p>FastScan 在扫描打包的代码块之前，会执行每条查询的准备工作，例如构建和量化与查询相关的查找表。请使用您的数据和搜索参数对<code translate="no">IVF_RABITQ</code> 和<code translate="no">IVF_RABITQ_FASTSCAN</code> 进行基准测试。</p>
<h2 id="Build-index" class="common-anchor-header">构建索引<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>要在 Milvus 中针对向量字段构建<code translate="no">IVF_RABITQ_FASTSCAN</code> 索引，请使用<code translate="no">add_index()</code> 方法，并指定<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 以及索引的其他参数。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_RABITQ_FASTSCAN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
<span class="highlighted-wrapper-line">    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span></span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>, <span class="hljs-comment"># Number of clusters for the index</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Enable refinement for higher recall</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;FP32&quot;</span> <span class="hljs-comment"># Refinement data format</span></span>
<span class="highlighted-comment-line">    } <span class="hljs-comment"># Index building params</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中：</p>
<ul>
<li><p><code translate="no">index_type</code>: 要构建的索引类型。在此示例中，将值设置为<code translate="no">IVF_RABITQ_FASTSCAN</code> 。</p></li>
<li><p><code translate="no">metric_type</code>: 用于计算向量之间距离的方法。支持的值包括<code translate="no">COSINE</code> 、<code translate="no">L2</code> 和<code translate="no">IP</code> 。有关详细信息，请参阅《<a href="/docs/zh/metric.md">度量类型</a>》。</p></li>
<li><p><code translate="no">params</code>: 用于构建索引的其他配置选项。详情请参阅<a href="/docs/zh/ivf-rabitq-fastscan.md#Index-building-params">“索引构建参数</a>”。</p></li>
</ul>
<p>配置好索引参数后，您可以直接使用<code translate="no">create_index()</code> 方法创建索引，或在<code translate="no">create_collection</code> 方法中传入索引参数。详情请参阅<a href="/docs/zh/create-collection.md">“创建Collection”</a>。</p>
<h2 id="Search-on-index" class="common-anchor-header">在索引上进行搜索<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>索引构建完成且实体插入后，即可对索引执行相似度搜索。</p>
<p>设置 `<code translate="no">nprobe</code> ` 以控制要搜索的 IVF 聚类数量。如果索引是在启用精化功能的情况下构建的，请使用 `<code translate="no">refine_k</code> ` 来控制传递给 FP32 精化器的候选项池。</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your Milvus server address</span>

search_params = {
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">128</span>, <span class="hljs-comment"># Number of clusters to search</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Refinement magnification factor</span></span>
<span class="highlighted-comment-line">    }</span>
}

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># TopK results to return</span>
<span class="highlighted-wrapper-line">    search_params=search_params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中：</p>
<ul>
<li><code translate="no">params</code>：针对索引搜索的附加配置选项。详情请参阅《<a href="/docs/zh/ivf-rabitq-fastscan.md#Index-specific-search-params">索引特定搜索参数</a>》。</li>
</ul>
<div class="alert note">
<p>与<code translate="no">IVF_RABITQ</code> 不同，<code translate="no">IVF_RABITQ_FASTSCAN</code> 不支持<code translate="no">rbq_bits_query</code> 搜索参数。FastScan内部始终使用8位查询量化，因此请省略<code translate="no">rbq_bits_query</code> 或将其设置为<code translate="no">0</code> ；更大的数值将被拒绝。</p>
</div>
<h2 id="Index-params" class="common-anchor-header">索引参数<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>本节概述了用于构建索引以及在索引上执行搜索的参数。</p>
<h3 id="Index-building-params" class="common-anchor-header">索引构建参数<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>下表列出了在<code translate="no">params</code> 中<a href="/docs/zh/ivf-rabitq-fastscan.md#Build-index">构建索引</a>时可配置的参数。</p>
<table>
   <tr>
     <th></th>
     <th><p>参数</p></th>
     <th><p>描述</p></th>
     <th><p>值范围</p></th>
     <th><p>调优建议</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>在构建索引时，使用 k-means 算法创建的聚类数量。每个聚类由一个质心表示，并存储一个向量列表。增加此参数值会减少每个聚类中的向量数量，从而生成更小、更集中的分区。</p></td>
     <td><p><strong>类型</strong>：整数<br><strong>范围</strong>：[1, 65536]<br><strong>默认值</strong>：<code translate="no">128</code></p></td>
     <td><p>较大的<code translate="no">nlist</code> 值可通过创建更精细的聚类来提高召回率，但会增加索引构建时间。请根据数据集大小和可用资源进行优化。在大多数情况下，建议将该值设置在[32, 4096]范围内。</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>启用精化过程并存储精化后的数据。<code translate="no">IVF_RABITQ_FASTSCAN</code> 仅支持FP32精化。</p></td>
     <td><p><strong>类型</strong>：布尔型<br><strong>范围</strong>：[<code translate="no">true</code>,<code translate="no">false</code>]<br><strong>默认值</strong>：<code translate="no">false</code></p></td>
     <td><p>若需要 0.9 以上的召回率，请设置为<code translate="no">true</code> 。启用精化可提高准确率，但会增加存储需求并延长索引构建时间。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>定义在启用<code translate="no">refine</code> 时用于细化的数据表示形式。仅当<code translate="no">refine</code> 为<code translate="no">true</code> 时才为必填项。</p></td>
     <td><p><strong>类型</strong>：字符串<br><strong>取值范围</strong>：[<code translate="no">FP32</code>,<code translate="no">FLAT</code>]<br><strong>默认值</strong>：无</p></td>
     <td><p><code translate="no">IVF_RABITQ_FASTSCAN</code> 仅支持 FP32 细化，且<code translate="no">FLAT</code> 与<code translate="no">FP32</code> 完全相同。值匹配不区分大小写。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">索引特定搜索参数<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>下表列出了<a href="/docs/zh/ivf-rabitq-fastscan.md#Search-on-index">在索引上进行搜索</a>时，可在<code translate="no">search_params.params</code> 中配置的参数。</p>
<table>
   <tr>
     <th></th>
     <th><p>参数</p></th>
     <th><p>描述</p></th>
     <th><p>值范围</p></th>
     <th><p>调优建议</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>用于搜索候选对象的簇数。数值越大，可搜索的簇数越多，通过扩大搜索范围来提高召回率，但会增加查询延迟。</p></td>
     <td><p><strong>类型</strong>：整数<br><strong>范围</strong>：[1,<em>nlist</em>]<br><strong>默认值</strong>：<code translate="no">8</code></p></td>
     <td><p>增加此值可提高召回率，但可能会减慢搜索速度。请将<code translate="no">nprobe</code> 与<code translate="no">nlist</code> 成比例设置，以平衡速度与准确性。在大多数情况下，建议您将该值设置在此范围内：[1,<em>nlist</em>]。</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>精化过程采用更高质量的量化，从通过 IVF_RABITQ_FASTSCAN 选出的、规模为<code translate="no">refine_k</code> 倍的候选集合中，筛选出所需数量的最近邻。若禁用精化功能，则此参数无效。</p></td>
     <td><p><strong>类型</strong>：浮点数<br><strong>范围</strong>：[1,<em>float_max</em>)<br><strong>默认值</strong>：<code translate="no">1</code></p></td>
     <td><p>更大的<code translate="no">refine_k</code> 值会降低每秒查询数（QPS），但会提高召回率。建议从<code translate="no">1</code> 开始，并测试<code translate="no">2</code> 、<code translate="no">3</code> 、<code translate="no">4</code> 和<code translate="no">5</code> 等值，以针对您的数据集找到QPS与召回率之间的最佳平衡点。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rbq_bits_query</code></p></td>
     <td><p>用于设置是否对查询向量应用额外的标量量化。<strong> <code translate="no">IVF_RABITQ_FASTSCAN</code> 不支持此功能</strong>：该索引在内部始终使用8位查询量化。请省略此参数或将其设置为<code translate="no">0</code> ；大于<code translate="no">0</code> 的值将被拒绝。</p></td>
     <td><p><strong>类型</strong>：整数<br><strong>范围</strong>：[0, 0]<br><strong>默认值</strong>：<code translate="no">0</code></p></td>
     <td><p>请勿设置此参数。若需配置查询量化，请改用<a href="/docs/zh/ivf-rabitq.md">IVF_RABITQ</a>。</p></td>
   </tr>
</table>
<h2 id="Limitations" class="common-anchor-header">限制<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li>FastScan 使用固定的 1 位 RaBitQ 数据库编码和 8 位查询量化。<code translate="no">rbq_bits_query</code> 必须省略或设置为<code translate="no">0</code> 。</li>
<li>仅支持 FP32（等同于<code translate="no">FLAT</code> ）的细化。</li>
<li>不支持迭代器。</li>
<li>这是一个 CPU 索引。它无法在 GPU 上运行。</li>
<li>实际性能取决于 CPU 的 SIMD 支持情况、向量维度、<code translate="no">nlist</code> 、<code translate="no">nprobe</code> 以及数据分布。在将其部署到生产环境之前，请使用您的工作负载进行基准测试。</li>
</ul>
<p>有关非 FastScan 版本的 RaBitQ 及其额外的细化选项，请参阅<a href="/docs/zh/ivf-rabitq.md">IVF_RABITQ</a>。</p>
