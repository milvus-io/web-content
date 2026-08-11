---
id: sparse-inverted-index.md
title: SPARSE_INVERTED_INDEX
summary: >-
  SPARSE_INVERTED_INDEX 索引是 Milvus
  用于高效存储和搜索稀疏向量的索引类型。该索引类型利用了反向索引原理，为稀疏数据构建了高效的搜索结构。
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">SPARSE_INVERTED_INDEX<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">SPARSE_INVERTED_INDEX</code> 索引是Milvus用于高效存储和搜索稀疏向量的一种索引类型。它根据稀疏向量中的非零维度构建倒排结构。您可以使用此索引进行BM25全文搜索，以及基于内积的稀疏嵌入搜索。</p>
<p>有关稀疏向量字段、度量类型和全文搜索的更多信息，请参阅《<a href="/docs/zh/sparse_vector.md">稀疏向量</a>》、《<a href="/docs/zh/metric.md">度量类型</a>》和《<a href="/docs/zh/full-text-search.md">全文搜索</a>》。</p>
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
    </button></h2><p>要在 Milvus 中针对稀疏向量字段构建<code translate="no">SPARSE_INVERTED_INDEX</code> 索引，请使用<code translate="no">add_index()</code> 方法，并指定<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 以及索引参数。</p>
<p>对于 BM25 全文搜索，请在由 BM25 函数生成的稀疏向量字段上构建索引。将 `<code translate="no">metric_type</code> ` 设置为 `<code translate="no">BM25</code>`。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_bm25_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>, <span class="hljs-comment"># Metric type used for full text search</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>对于稀疏嵌入搜索，需在存储外部生成的稀疏向量的稀疏向量场之上构建索引。将 `<code translate="no">metric_type</code> ` 设置为 `<code translate="no">IP</code>`。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_ip_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;SINDI&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>在上述配置中：</p>
<ul>
<li><p><code translate="no">index_type</code>: 要构建的索引类型。将此值设置为<code translate="no">SPARSE_INVERTED_INDEX</code> 。</p></li>
<li><p><code translate="no">metric_type</code>: 用于计算稀疏向量之间相似度的度量。有效值：</p>
<ul>
<li><p><code translate="no">BM25</code>: 针对全文检索使用 BM25 相关性评分。</p></li>
<li><p><code translate="no">IP</code> （内积）：使用点积衡量稀疏向量的相似度。</p></li>
</ul>
<p>详情请参阅《<a href="/docs/zh/metric.md">度量类型</a>》和《<a href="/docs/zh/full-text-search.md">全文搜索</a>》。</p></li>
<li><p><code translate="no">params.inverted_index_algo</code>: 用于构建和查询索引的算法。有效值：</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code>: 逐文档MaxScore查询处理。这是<code translate="no">BM25</code> 的默认设置。有关背景信息，请参阅《<a href="https://dl.acm.org/doi/10.1016/0306-4573%2895%2900020-H">查询评估：策略与优化</a>》。</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>：逐文档 WAND 查询处理。该算法适用于较小的 topK 值或较短的查询。有关背景信息，请参阅《<a href="https://dl.acm.org/doi/10.1145/956863.956944">使用两级检索过程进行高效查询评估</a>》。</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: 基本“逐词”查询处理。将此选项用作基准，或在需要评分动态适应全局 Collection 统计信息（如平均文档长度）时使用。</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_MAXSCORE&quot;</code>: 采用块级最大得分元数据的 MaxScore 查询处理。有关背景信息，请参阅《<a href="https://dl.acm.org/doi/10.1145/2009916.2010048">使用块最大索引加快 Top-k 文档检索</a>》。</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_WAND&quot;</code>: 采用块级最大得分元数据的 WAND 查询处理。有关背景信息，请参阅《<a href="https://dl.acm.org/doi/10.1145/2009916.2010048">使用块最大索引实现更快的 Top-k 文档检索</a>》。</p></li>
<li><p><code translate="no">&quot;SINDI&quot;</code>: 基于固定文档 ID 窗口的稀疏倒排索引，搜索过程采用 SIMD 加速。这是 `<code translate="no">IP</code>` 的默认设置。详情请参阅<a href="https://arxiv.org/abs/2509.08395">SINDI 论文</a>。</p></li>
</ul>
<p>如果您未指定<code translate="no">inverted_index_algo</code> ，Milvus将根据<code translate="no">metric_type</code> 选择默认算法：对于<code translate="no">BM25</code> ，使用<code translate="no">DAAT_MAXSCORE</code> ；对于<code translate="no">IP</code> ，使用<code translate="no">SINDI</code> 。</p>
<p>要了解有关<code translate="no">SPARSE_INVERTED_INDEX</code> 索引的更多构建参数，请参阅“<a href="/docs/zh/sparse-inverted-index.md#Index-building-params">索引构建参数</a>”。</p></li>
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
<p>对于 BM25 全文搜索，请使用原始文本作为查询。Milvus 会通过 BM25 函数将查询文本转换为稀疏向量。</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[<span class="hljs-string">&quot;what is information retrieval?&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    limit=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>对于稀疏嵌入搜索，请使用稀疏向量字典作为查询向量。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    data=query_vector,
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},
)
<button class="copy-code-btn"></button></code></pre>
<p>默认情况下，Milvus 会使用为该索引配置的搜索算法。</p>
<p>要了解<code translate="no">SPARSE_INVERTED_INDEX</code> 索引可用的更多搜索参数，请参阅<a href="/docs/zh/sparse-inverted-index.md#Index-specific-search-params">“索引特定搜索参数</a>”。</p>
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
    </button></h3><p>下表列出了在<code translate="no">params</code> 中<a href="/docs/zh/sparse-inverted-index.md#Build-index">构建索引</a>时可配置的参数。</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>描述</p></th>
     <th><p>值范围</p></th>
     <th><p>调优建议</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>用于构建和查询索引的算法。它决定了索引如何处理查询。</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code>,<code translate="no">"DAAT_WAND"</code>,<code translate="no">"TAAT_NAIVE"</code>,<code translate="no">"BLOCK_MAX_MAXSCORE"</code>,<code translate="no">"BLOCK_MAX_WAND"</code>,<code translate="no">"SINDI"</code></p><p>默认值：对于<code translate="no">BM25</code> ，为<code translate="no">"DAAT_MAXSCORE"</code> ；对于<code translate="no">IP</code> ，为<code translate="no">"SINDI"</code> 。</p></td>
     <td><p>对于具有较高 k 值的 BM25 全文搜索工作负载或包含大量术语的查询，请使用<code translate="no">"DAAT_MAXSCORE"</code> 。</p><p>对于 k 值较小或查询词较少的 BM25 工作负载，请使用<code translate="no">"DAAT_WAND"</code> 。</p><p>将<code translate="no">"TAAT_NAIVE"</code> 用作基准，或者当您需要评分动态适应全局 Collection 统计信息（例如平均文档长度）时，请使用 。</p><p>使用<code translate="no">"BLOCK_MAX_MAXSCORE"</code> 或<code translate="no">"BLOCK_MAX_WAND"</code> ，以利用块级最高得分元数据进行查询剪枝。</p><p>在与<code translate="no">IP</code> 配合使用时，使用<code translate="no">"SINDI"</code> 进行稀疏嵌入搜索。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_k1</code></p></td>
     <td><p>控制 BM25 评分中的词频饱和度。此参数仅在<code translate="no">metric_type</code> 设置为<code translate="no">BM25</code> 时生效。</p></td>
     <td><p>推荐范围：[1.2, 2.0]</p><p>默认值：1.2</p></td>
     <td><p>增加此值可使词频在文档排序中占据更大权重。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_b</code></p></td>
     <td><p>控制 BM25 评分中文档长度归一化的强度。此参数仅在<code translate="no">metric_type</code> 为<code translate="no">BM25</code> 时适用。</p></td>
     <td><p>范围：[0, 1]</p><p>默认值：0.75</p></td>
     <td><p>使用较高的值可进行更强的长度归一化。使用较低的值可降低文档长度对排名的影响。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">索引特定的搜索参数<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>下表列出了<a href="/docs/zh/sparse-inverted-index.md#Search-on-index">在索引上进行搜索</a>时，可在<code translate="no">search_params.params</code> 中配置的参数。</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>描述</p></th>
     <th><p>值范围</p></th>
     <th><p>调优建议</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>搜索过程中要忽略的最小值所占的比例，有助于减少噪声。</p></td>
     <td><p>范围：[0.0, 1.0)（例如，0.2 将忽略最小值的 20%）</p></td>
     <td><p>请根据查询向量的稀疏性和噪声水平调整此参数。</p><p>该参数控制搜索过程中被剔除的低幅度值的比例。增加此值（例如，设置为<code translate="no">0.2</code> ）可以减少噪声，并将搜索重点放在更重要的成分上，从而可能提高精度和效率。但是，剔除更多值也会因排除潜在的相关信号而降低召回率。请根据您的工作负载，选择一个能在召回率和准确率之间取得平衡的值。</p></td>
   </tr>
</table>
