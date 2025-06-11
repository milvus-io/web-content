---
id: sparse-inverted-index.md
title: 稀疏反转索引
summary: >-
  SPARSE_INVERTED_INDEX 索引是 Milvus
  用来高效存储和搜索稀疏向量的一种索引类型。这种索引类型利用了倒排索引的原理，为稀疏数据创建了一种高效的搜索结构。更多信息，请参阅 INVERTED。
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">稀疏反转索引<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">SPARSE_INVERTED_INDEX</code> 索引是 Milvus 用来高效存储和搜索稀疏向量的一种索引类型。这种索引类型利用了倒排索引的原理，为稀疏数据创建了一种高效的搜索结构。如需了解更多信息，请参阅<a href="/docs/zh/inverted.md">INVERTED</a>。</p>
<h2 id="Build-index" class="common-anchor-header">建立索引<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>要在 Milvus 中的稀疏向量场上建立<code translate="no">SPARSE_INVERTED_INDEX</code> 索引，请使用<code translate="no">add_index()</code> 方法，指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及索引的附加参数。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_sparse_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>}, <span class="hljs-comment"># Algorithm used for building and querying the index</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引类型。在本例中，将值设为<code translate="no">SPARSE_INVERTED_INDEX</code> 。</p></li>
<li><p><code translate="no">metric_type</code>:用于计算稀疏向量之间相似性的度量。有效值：</p>
<ul>
<li><p><code translate="no">IP</code> (内积）：使用点积衡量相似性。</p></li>
<li><p><code translate="no">BM25</code>:通常用于全文搜索，侧重于文本相似性。</p>
<p>有关详细信息，请参阅 "<a href="/docs/zh/metric.md">度量类型</a>和<a href="/docs/zh/full-text-search.md">全文搜索</a>"。</p></li>
</ul></li>
<li><p><code translate="no">params.inverted_index_algo</code>:用于建立和查询索引的算法。有效值：</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code> (默认）：使用 MaxScore 算法进行优化的 Document-at-a-Time (DAAT) 查询处理。MaxScore 通过跳过可能影响最小的术语和文档，为高<em>k</em>值或包含大量术语的查询提供更好的性能。为此，它根据最大影响分值将术语划分为基本组和非基本组，并将重点放在对前 k 结果有贡献的术语上。</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>:使用 WAND 算法优化 DAAT 查询处理。WAND 算法利用最大影响分数跳过非竞争性文档，从而评估较少的命中文档，但每次命中的开销较高。这使得 WAND 对于<em>k</em>值较小的查询或较短的查询更有效，因为在这些情况下跳过更可行。</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>:基本术语一次查询处理（TAAT）。虽然与<code translate="no">DAAT_MAXSCORE</code> 和<code translate="no">DAAT_WAND</code> 相比速度较慢，但<code translate="no">TAAT_NAIVE</code> 具有独特的优势。DAAT 算法使用的是缓存的最大影响分数，无论全局 Collections 参数（avgdl）如何变化，这些分数都保持静态，而<code translate="no">TAAT_NAIVE</code> 不同，它能动态地适应这种变化。</p></li>
</ul>
<p>要了解<code translate="no">SPARSE_INVERTED_INDEX</code> 索引可用的更多构建<a href="/docs/zh/sparse-inverted-index.md#Index-building-params">参数</a>，请参阅<a href="/docs/zh/sparse-inverted-index.md#Index-building-params">索引构建参数</a>。</p></li>
</ul>
<p>配置好索引参数后，可直接使用<code translate="no">create_index()</code> 方法或在<code translate="no">create_collection</code> 方法中传递索引参数来创建索引。有关详情，请参阅<a href="/docs/zh/create-collection.md">创建 Collections</a>。</p>
<h2 id="Search-on-index" class="common-anchor-header">在索引上搜索<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>建立索引并插入实体后，就可以在索引上执行相似性搜索。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare search parameters</span>
search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>},  <span class="hljs-comment"># Additional optional search parameters</span>
}

<span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=query_vector,  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中</p>
<ul>
<li><p><code translate="no">params</code>:在索引上搜索的其他配置选项。</p>
<ul>
<li><code translate="no">drop_ratio_search</code>:通过指定在搜索过程中忽略多大比例的小向量值来微调搜索性能。例如，使用<code translate="no">{&quot;drop_ratio_search&quot;: 0.2}</code> 时，查询向量中最小的 20% 值将在搜索过程中被忽略。</li>
</ul>
<p>要了解<code translate="no">SPARSE_INVERTED_INDEX</code> 索引可用的更多搜索<a href="/docs/zh/ivf-flat.md#share-KDWodFEx6oCm2yxgEUAcXaUDnwg">参数</a>，请参阅<a href="/docs/zh/ivf-flat.md#share-KDWodFEx6oCm2yxgEUAcXaUDnwg">特定于索引的搜索参数</a>。</p></li>
</ul>
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
    </button></h2><p>本节概述了用于建立索引和在索引上执行搜索的参数。</p>
<h3 id="Index-building-params" class="common-anchor-header">索引建立参数</h3><p>下表列出了<a href="/docs/zh/sparse-inverted-index.md#Build-index">建立索引</a>时可在<code translate="no">params</code> 中配置的参数。</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>说明</p></th>
     <th><p>值范围</p></th>
     <th><p>调整建议</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>用于构建和查询索引的算法。它决定了索引处理查询的方式。</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code> (默认）， 、<code translate="no">"DAAT_WAND"</code> <code translate="no">"TAAT_NAIVE"</code></p></td>
     <td><p>对于 k 值较高的情况或术语较多的查询，请使用<code translate="no">"DAAT_MAXSCORE"</code> ，这样可以从跳过非竞争文档中获益。 
 对于 k 值较小的查询或较短的查询，请选择<code translate="no">"DAAT_WAND"</code> ，以提高跳转效率。</p>
<p>如果需要根据 Collections 的变化（如 avgdl）进行动态调整，请使用<code translate="no">"TAAT_NAIVE"</code> 。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定于索引的搜索参数</h3><p>下表列出了<a href="/docs/zh/sparse-inverted-index.md#Search-on-index">在索引上搜索</a>时可在<code translate="no">search_params.params</code> 中配置的参数。</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>说明</p></th>
     <th><p>值范围</p></th>
     <th><p>调整建议</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>搜索时忽略最小值的比例，有助于减少噪音。</p></td>
     <td><p>介于 0.0 和 1.0 之间的百分比（例如，0.2 会忽略 20% 的最小值）</p></td>
     <td><p>根据查询向量的稀疏程度和噪音水平调整该参数。例如，将其设置为 0.2 可以帮助在搜索过程中关注更重要的值，从而提高准确性。</p></td>
   </tr>
</table>
