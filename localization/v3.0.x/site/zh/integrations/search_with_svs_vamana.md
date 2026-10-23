---
id: search_with_svs_vamana.md
summary: >-
  通过 FAISS 索引直通功能，在 Milvus 中构建和搜索内存中的 SVS Vamana 图索引，并在英特尔 CPU 上可选地启用 LeanVec 或
  LVQ 压缩。
title: 使用 SVS Vamana 和 Milvus 进行搜索
---
<h1 id="Search-with-SVS-Vamana-and-Milvus" class="common-anchor-header">使用 SVS Vamana 和 Milvus 进行搜索<button data-href="#Search-with-SVS-Vamana-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/intel/ScalableVectorSearch">SVS</a>（可扩展向量搜索）是英特尔实现 Vamana 图算法的高性能向量搜索库。 在 Milvus 中，您可以通过<a href="https://milvus.io/docs/faiss.md">FAISS 索引直通功能</a>访问 SVS Vamana：将 `<code translate="no">index_type</code> ` 设置为 `<code translate="no">FAISS</code> `，并提供一个 `<code translate="no">SVSVamana</code> ` 索引生成器字符串，Milvus 便会通过 FAISS 的 SVS 集成来构建和搜索索引。</p>
<p>Vamana 是<a href="https://milvus.io/docs/diskann.md">DISKANN</a>同样采用的图结构，但 SVS Vamana 将整个图保存在内存中。它还可以使用<strong>LeanVec</strong>或<strong>LVQ</strong> 对向量进行压缩，这既能减少内存占用、加快搜索速度，又能保持极高的召回率。</p>
<h2 id="Prerequisites" class="common-anchor-header">先决条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Milvus 3.0.0 或更高版本，需从源代码编译且启用 SVS</li>
<li>PyMilvus 3.0.0 或更高版本</li>
<li>若使用<code translate="no">LVQ*</code> 或<code translate="no">LeanVec*</code> 存储，需配备英特尔CPU；<code translate="no">FP32</code> 、<code translate="no">FP16</code> 和<code translate="no">SQ8</code> 存储可在任何平台上运行</li>
<li>熟悉<a href="https://milvus.io/docs/faiss.md">FAISS 索引工厂字符串</a></li>
</ul>
<div class="alert note">
<p>SVS 未包含在 Milvus 的默认构建中。若要使用<code translate="no">SVSVamana</code> 工厂，请通过<code translate="no">make USE_SVS=ON</code> 从源代码构建 Milvus。在未包含 SVS 的构建中，索引构建会失败，因为 Faiss 无法识别该工厂字符串。</p>
</div>
<p>LVQ 和 LeanVec 压缩仅在 Intel CPU 上运行，且在支持 AVX-512 的 CPU 上运行速度更快。在其他 CPU 上，使用<code translate="no">LVQ*</code> 和<code translate="no">LeanVec*</code> 工厂字符串时，索引构建将失败。</p>
<h2 id="How-SVS-Vamana-works" class="common-anchor-header">SVS Vamana 的工作原理<button data-href="#How-SVS-Vamana-works" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Vamana-graph" class="common-anchor-header">Vamana 图<button data-href="#Vamana-graph" class="anchor-icon" translate="no">
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
    </button></h3><p>SVS Vamana 构建一个单层邻近图。每个向量是一个节点，边连接可能为近邻的向量。为了构建该图，SVS 对每个节点<strong>x</strong> 执行以下操作：</p>
<ol>
<li><p><strong>贪婪搜索</strong>：SVS 搜索当前已构建的图，并维护一个大小为<code translate="no">construction_window_size</code> 的候选列表。</p></li>
<li><p><strong>邻居剪枝</strong>：已访问的节点成为<strong>x</strong> 的候选邻居。SVS 按它们与<strong>x</strong> 距离由小到大的顺序进行考虑。 如果存在一个距离更近且已被保留的邻居<code translate="no">n</code> ，且满足<code translate="no">alpha * distance(n, c) &lt;= distance(x, c)</code> ，则跳过候选邻居<code translate="no">c</code> 。这保留了长距离边并剔除了冗余的短距离边，因此搜索可以在图中跳跃，而不是一次只移动一个最近邻。当图的度数达到上限时，剪枝过程停止。</p></li>
<li><p><strong>反向边</strong>：对于<strong>x</strong> 的每个新邻居，SVS 会添加一条指向<strong>x</strong>的反向边，并剪枝该邻居的边列表（若其长度超过图的度数）。</p></li>
</ol>
<p>剪枝过程分两轮进行：首先使用<code translate="no">alpha = 1</code> ，然后使用配置的<code translate="no">alpha</code> 。更大的图度和<code translate="no">construction_window_size</code> 会生成更密集、质量更高的图，但会消耗更多内存且构建时间更长。</p>
<p>在搜索阶段，SVS会贪婪地遍历图，并保留迄今为止观察到的距离查询最近的候选节点（<code translate="no">search_window_size</code> ）。它总是优先探索距离最近且尚未访问的候选节点。当当前节点的所有邻居与查询的距离均大于窗口内最差候选节点的距离时，搜索即告结束。更大的<code translate="no">search_window_size</code> 值会探索更广范围的图，这虽能提高召回率，但也会增加延迟。</p>
<h3 id="LeanVec-compression" class="common-anchor-header">LeanVec 压缩<button data-href="#LeanVec-compression" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://openreview.net/forum?id=wczqrpOrIc">LeanVec</a>同时减少了每个向量的维度数和每维度的位数。LeanVec 索引为每个向量保存两种表示形式：</p>
<ul>
<li><p><strong>主表示（降维）</strong>：将向量线性投影至较少维度的结果。图搜索在该主数据集上进行，因此大部分距离计算都在低维空间中完成。这既降低了计算需求，也减少了内存带宽需求。默认情况下，降维后的维度为原始维度的二分之一（<code translate="no">dim / 2</code> ）。</p></li>
<li><p><strong>次要表示（全维度）</strong>：向量在原始维度的表示形式。SVS 会针对该次要数据集，对主要图搜索返回的候选项进行重新排序，以弥补因降维而损失的准确率。</p></li>
</ul>
<p>这两种表示形式均采用<a href="https://vldb.org/pvldb/volumes/16/paper/Similarity%20search%20in%20the%20blink%20of%20an%20eye%20with%20compressed%20indices">LVQ</a>（局部自适应向量量化）进行量化。工厂字符串中的存储组件负责选择编码方式。例如，<code translate="no">LeanVec4x8</code> 针对主数据集采用每维 4 位，针对次级数据集采用每维 8 位。即使在重新排序步骤中，也绝不会读取全精度向量。</p>
<p>默认情况下，LeanVec 会分别针对索引向量和查询学习独立的投影，以支持来自与索引向量不同分布的查询（即分布外查询，OOD）。 这在跨模态工作负载（如文本到图像检索）中效果尤为显著，当查询与索引向量来自同一分布时同样表现良好。Milvus 目前尚不支持将查询作为投影计算的输入，因此当前仅使用基础向量。OOD 训练会增加构建时间。 若需以牺牲部分查询性能为代价来加快构建速度，请将 `<code translate="no">ood_training</code> ` 设置为 `<code translate="no">False</code>`。</p>
<h3 id="LVQ-compression" class="common-anchor-header">LVQ 压缩<button data-href="#LVQ-compression" class="anchor-icon" translate="no">
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
    </button></h3><p>对于维度少于约 512 的数据集，跳过降维并仅使用 LVQ 量化进行压缩可能效果更好。 与 LeanVec 类似，LVQ 索引会保留用于快速搜索的主表示，以及用于重新排序的残差表示。例如，<code translate="no">LVQ4x4</code> 为主表示分配 4 位，为残差分配 4 位。<code translate="no">LVQ4x0</code> 和<code translate="no">LVQ8x0</code> 会跳过重新排序步骤，如果其召回率足以满足您的工作负载需求，则可加快查询速度。</p>
<h2 id="Choose-a-factory-string" class="common-anchor-header">选择工厂字符串<button data-href="#Choose-a-factory-string" class="anchor-icon" translate="no">
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
    </button></h2><p>SVS Vamana 的工厂字符串形式为<code translate="no">SVSVamana&lt;degree&gt;[,&lt;storage&gt;]</code> ，其中<code translate="no">&lt;degree&gt;</code> 表示图中每个节点的最大边数。</p>
<table>
<thead>
<tr><th>工厂字符串</th><th>存储</th><th>注释</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">SVSVamana64</code></td><td><code translate="no">FP32</code></td><td>未压缩向量。</td></tr>
<tr><td><code translate="no">SVSVamana64,FP16</code></td><td>16 位浮点数</td><td>仅需<code translate="no">FP32</code> 一半的向量内存，且精度损失极小。</td></tr>
<tr><td><code translate="no">SVSVamana64,SQ8</code></td><td>8 位标量量化</td><td>仅需<code translate="no">FP32</code> 四分之一的向量内存。</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x0</code>,<code translate="no">LVQ8x0</code></td><td>LVQ为主，无残差</td><td>仅限英特尔CPU。不进行重新排序。</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x4</code>,<code translate="no">LVQ4x8</code></td><td>LVQ为主，带残差</td><td>仅限英特尔CPU。</td></tr>
<tr><td><code translate="no">SVSVamana64,LeanVec4x4</code>,<code translate="no">LeanVec4x8</code>,<code translate="no">LeanVec8x8</code></td><td>LeanVec 主分级和次分级</td><td>仅限英特尔 CPU。添加后缀<code translate="no">_&lt;dim&gt;</code> 可设置降维维度。例如，<code translate="no">LeanVec4x8_128</code> 将主数据集降维至 128 维。若不添加后缀，降维维度默认为<code translate="no">dim / 2</code> 。</td></tr>
</tbody>
</table>
<p><code translate="no">SVSVamana64,LeanVec4x8</code> 是一个不错的起点。在此基础上：</p>
<ul>
<li><p>若需在一定内存开销下<strong>提高召回率</strong>，请使用<code translate="no">_&lt;dim&gt;</code> 后缀增加LeanVec的维度。</p></li>
<li><p>若需在牺牲部分召回率的前提下<strong>减小内存占用</strong>，请降低 LeanVec 的维度。</p></li>
<li><p>对于低维向量，请尝试使用<code translate="no">LVQ8</code> 。</p></li>
<li><p><strong>在非英特尔 CPU 上</strong>，请使用<code translate="no">FP16</code> 或<code translate="no">SQ8</code> 。</p></li>
</ul>
<h2 id="Build-the-index" class="common-anchor-header">构建索引<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p>以下示例构建了一个图度为 64 且采用 LeanVec 压缩的 SVS Vamana 索引。在构建索引之前，请展开“设置”代码块并运行它。</p>
<p><details></p>
<p><summary>准备 Collection</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;svs_vamana_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">256</span>)

client.create_collection(collection_name=collection_name, schema=schema)

client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>将<code translate="no">index_type</code> 设置为<code translate="no">FAISS</code> ，并使用<code translate="no">faiss_index_name</code> 选择SVS Vamana配方。</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;svs_vamana_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># SVSVamana64 -&gt; Vamana graph degree 64</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># LeanVec4x8  -&gt; 4-bit primary, 8-bit secondary</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># _128        -&gt; LeanVec dim 128 (omit the suffix for dim / 2)</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;SVSVamana64,LeanVec4x8_128&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;construction_window_size&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># build-time search width</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;ood_training&quot;</span>: <span class="hljs-literal">True</span>,             <span class="hljs-comment"># OOD on (default)</span></span>
<span class="highlighted-comment-line">    },</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search-the-index" class="common-anchor-header">搜索索引<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">search_window_size</code> 控制召回率与延迟之间的权衡，就像<code translate="no">ef</code> 对<a href="https://milvus.io/docs/hnsw.md">HNSW</a>的作用一样。请将<code translate="no">search_buffer_capacity</code> 设置为至少与该值相同。这两个参数的默认值均为10，且当<code translate="no">search_window_size</code> 大于<code translate="no">search_buffer_capacity</code> 时，SVS将拒绝该搜索请求。</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_window_size&quot;</span>: <span class="hljs-number">100</span>,      <span class="hljs-comment"># wider = higher recall, lower QPS</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_buffer_capacity&quot;</span>: <span class="hljs-number">100</span>,  <span class="hljs-comment"># must be &gt;= search_window_size</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

res = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>如果<code translate="no">limit</code> 大于<code translate="no">search_window_size</code> ，SVS 会将该搜索的窗口值提高到<code translate="no">limit</code> 。</p>
<h2 id="SVS-Vamana-parameters" class="common-anchor-header">SVS Vamana 参数<button data-href="#SVS-Vamana-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>以下构建参数应放置在<code translate="no">params</code> 文件中（位于<code translate="no">add_index()</code> 目录下），紧邻<code translate="no">faiss_index_name</code> 文件。索引构建完成后，您将无法更改这些参数。</p>
<table>
<thead>
<tr><th>参数</th><th>默认值</th><th>描述</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">construction_window_size</code></td><td><code translate="no">40</code></td><td>在图构建过程中，用于查找每个节点邻居的候选项列表大小。较大的值可提高图质量和召回率，但构建时间会更长。请将其设置为至少等于图的度数。200 是常见的选择。</td></tr>
<tr><td><code translate="no">alpha</code></td><td><code translate="no">1.2</code> 对于<code translate="no">L2</code> ，请参见<code translate="no">0.95</code> ；对于<code translate="no">IP</code> ，请参见<code translate="no">COSINE</code></td><td>修剪强度。数值越远离1，修剪越激进，更倾向于保留长距离边而非冗余的短距离边。对于<code translate="no">L2</code> ，请使用大于1的数值；对于<code translate="no">IP</code> 和<code translate="no">COSINE</code> ，请使用小于1的数值。除非您在数据上测得更优的数值，否则请保留默认值。</td></tr>
<tr><td><code translate="no">graph_max_degree</code></td><td>工厂字符串中的度数，或<code translate="no">32</code></td><td>每个节点的最大边数。该设置将覆盖工厂字符串中的度数。值在 [32, 128] 范围内的设置适用于大多数工作负载。较高的值可以提高召回率，但会消耗更多内存且构建时间更长。</td></tr>
<tr><td><code translate="no">prune_to</code></td><td>图的度减去 4</td><td>节点超过图度数后，在修剪后保留的边数。</td></tr>
<tr><td><code translate="no">max_candidate_pool_size</code></td><td><code translate="no">200</code></td><td>修剪节点邻居时考虑的候选节点最大数量。该值应大于<code translate="no">construction_window_size</code> 。</td></tr>
<tr><td><code translate="no">use_full_search_history</code></td><td><code translate="no">True</code></td><td>修剪时是否考虑构建搜索过程中访问过的每个节点，而不仅仅是最终候选节点。</td></tr>
<tr><td><code translate="no">leanvec_d</code></td><td><code translate="no">_&lt;dim&gt;</code> 工厂字符串后缀或<code translate="no">dim / 2</code></td><td>仅限LeanVec。主数据集的降维因子。该参数将覆盖工厂字符串后缀。较小的数值可减少内存占用并加快图搜索速度，但会降低召回率。</td></tr>
<tr><td><code translate="no">ood_training</code></td><td><code translate="no">True</code> 适用于 LeanVec</td><td>仅限 LeanVec。是否为索引向量和查询分别学习投影。设置<code translate="no">False</code> 可加快构建速度。若将<code translate="no">True</code> 设置为 LeanVec 以外的其他工厂，将导致设置失败。</td></tr>
</tbody>
</table>
<p>以下搜索参数应设置在<code translate="no">search_params.params</code> 中。您也可以将其设为构建参数，这将更改索引在未设置这些参数的搜索中使用的默认值。</p>
<table>
<thead>
<tr><th>参数</th><th>默认值</th><th>描述</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_window_size</code></td><td><code translate="no">10</code></td><td>遍历图时保留的最近候选项数量。数值越大，召回率和延迟越高。</td></tr>
<tr><td><code translate="no">search_buffer_capacity</code></td><td><code translate="no">10</code></td><td>搜索缓冲区的容量。必须大于或等于<code translate="no">search_window_size</code> 。在大多数情况下，将其设置为<code translate="no">search_window_size</code> 。对于 LeanVec，请尝试设置为<code translate="no">search_window_size</code> 的 1.5 倍。</td></tr>
</tbody>
</table>
<h2 id="Learn-more" class="common-anchor-header">了解更多<button data-href="#Learn-more" class="anchor-icon" translate="no">
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
<li>请阅读<a href="https://milvus.io/docs/faiss.md">FAISS 索引直通</a>参考文档，了解通用工厂字符串契约、限制及错误处理。</li>
<li>与<a href="https://milvus.io/docs/diskann.md">DISKANN</a> 中的磁盘端 Vamana 实现进行比较。</li>
<li>请参阅<a href="https://github.com/intel/ScalableVectorSearch">SVS 代码库，</a>了解构建细节、性能调优以及底层 C++ API。</li>
</ul>
