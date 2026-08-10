---
id: search-aggregation.md
title: 搜索聚合Compatible with Milvus 3.0.x
summary: 将向量搜索结果分组到桶中，计算每个桶的指标，对桶进行排序，并返回具有代表性的搜索结果。
beta: Milvus 3.0.x
---
<h1 id="Search-Aggregation" class="common-anchor-header">搜索聚合<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>当购物者搜索“日常训练用的黑色跑鞋”时，近似最近邻（ANN）搜索会根据向量相似度对产品进行排序，并返回一个扁平化的Top-K列表。搜索结果虽然相关，但可能存在重复：在下面的示例中，前六个结果中有四个是A品牌的产品，而B品牌和C品牌各出现一次。</p>
<p>扁平列表无法直接提供基于分桶的汇总信息。应用程序可能需要根据保留候选项数量或平均价格对品牌进行比较，检查每个品牌的少量代表性产品，或将结果组织为多级分桶结构。</p>
<p>搜索聚合功能会根据选定的标量字段，将保留的ANN候选结果组织到不同的桶中。在此示例中，每个品牌成为一个独立的桶。Milvus可以计算每个桶的统计数据、对桶进行排序，并附上代表性产品。应用程序可通过<code translate="no">result.agg_buckets</code> 接口获取这种“桶优先”的响应结果。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-overview.png" alt="A flat running-shoe search result becomes a set of comparable brand buckets" class="doc-image" id="a-flat-running-shoe-search-result-becomes-a-set-of-comparable-brand-buckets" /> 
   <span>一份平铺的跑鞋搜索结果被转化为一组可比较的品牌分桶</span>
  
 </span></p>
<p>搜索聚合不会对整个Collection进行精确的聚合处理。桶的存在、计数、指标、排序以及代表性命中结果均取决于人工神经网络（ANN）和分组阶段保留的候选结果。</p>
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-bucketing.png" alt="ANN candidates grouped by bucket keys and returned with counts, metrics, and representative hits" class="doc-image" id="ann-candidates-grouped-by-bucket-keys-and-returned-with-counts,-metrics,-and-representative-hits" /> 
   <span>按桶键分组的 ANN 候选结果，并附带计数、指标和代表性命中结果</span>
  
 </span></p>
<ol>
<li><p><strong>检索候选项。</strong>Milvus 运行 ANN 搜索以查找与查询向量最接近的实体。随后，分组阶段为每个完整的复合键保留数量有限的候选项。该“按键候选项配额”即聚合树中任意位置的最大<code translate="no">TopHits.size</code> 值，或者当未配置<code translate="no">top_hits</code> 时，即<code translate="no">1</code> 。</p></li>
<li><p><strong>构建桶。</strong> <code translate="no">SearchAggregation.fields</code> 定义了桶键。每个字段值的唯一组合都会生成一个独立的键。如图所示，<code translate="no">fields=[&quot;brand&quot;]</code> 生成了<code translate="no">(Brand A)</code> 、<code translate="no">(Brand B)</code> 和<code translate="no">(Brand C)</code> 这三个桶键。具有相同键的保留候选项属于同一个桶，并计入该桶的<code translate="no">count</code> 。<code translate="no">SearchAggregation.size</code> 限制了 Milvus 返回的桶数量。</p></li>
<li><p><strong>计算并返回结果。</strong>每个返回的桶都包含其键和保留候选项的数量。Milvus 还可以计算配置的指标、对桶进行排序、返回代表性实体以及构建子桶。<code translate="no">result.agg_buckets</code> 中的每个<code translate="no">AggregationBucket</code> 都会暴露<code translate="no">key</code> 、<code translate="no">count</code> 、<code translate="no">metrics</code> 、<code translate="no">hits</code> 和<code translate="no">sub_groups</code> 。当启用搜索聚合时，普通的搜索命中列表为空。</p></li>
</ol>
<p>在图中，<code translate="no">TopHits.size=4</code> 为每个键提供了4的候选预算，因此保留的4个品牌A候选结果生成<code translate="no">count: 4</code> 。为使图示简洁，生成的品牌A卡片仅显示了返回的4个代表性命中结果中的2个。</p>
<p>当<code translate="no">sub_aggregation</code> 生效时，Milvus会在每个父桶内重复步骤2和步骤3。人工神经网络（ANN）的召回率或每键候选预算的变化，可能会改变桶的数量、指标、排序、命中结果以及嵌套结果。</p>
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
    </button></h2><p>在使用搜索聚合之前，请注意以下限制：</p>
<ul>
<li><p><strong>嵌套聚合：</strong>一个请求可包含一个根级<code translate="no">SearchAggregation</code> ，以及最多三个嵌套的<code translate="no">sub_aggregation</code> 级别，总计最多四级。在所有级别中，最多可使用10个字段来创建桶键。</p></li>
<li><p><strong>用于创建桶键的字段：</strong> <code translate="no">SearchAggregation.fields</code> 支持布尔型、整数型、<code translate="no">VARCHAR</code> 以及<code translate="no">TIMESTAMPTZ</code> 字段。它不支持<code translate="no">FLOAT</code> 、<code translate="no">DOUBLE</code> 、<code translate="no">ARRAY</code> 、<code translate="no">JSON</code> 、<code translate="no">GEOMETRY</code> 、<code translate="no">TEXT</code> 、向量型或 Dynamic Field 字段。</p></li>
<li><p><strong>度量字段：</strong> <code translate="no">count</code> 接受<code translate="no">&quot;*&quot;</code> 或任何非<code translate="no">JSON</code> 且非 Dynamic Field，并在指定字段时跳过<code translate="no">NULL</code> 的值。<code translate="no">sum</code> 和<code translate="no">avg</code> 接受整数和浮点数字段。<code translate="no">min</code> 和<code translate="no">max</code> 还额外接受字符串和<code translate="no">TIMESTAMPTZ</code> 字段。</p></li>
<li><p><strong>“Top Hits”排序字段：</strong> <code translate="no">TopHits.sort</code> 支持可比较的布尔型、整数型、浮点型、字符串型和<code translate="no">TIMESTAMPTZ</code> 字段，以及<code translate="no">_score</code> 。它不支持<code translate="no">ARRAY</code> 、<code translate="no">JSON</code> 、<code translate="no">GEOMETRY</code> 、向量型或 Dynamic Field。</p></li>
<li><p><strong>候选集预算：</strong>聚合树中任何位置的最大<code translate="no">TopHits.size</code> 值，即为每个完整复合键保留的候选集数量。如果没有任何级别配置<code translate="no">top_hits</code> ，Milvus 将为每个键保留一个候选集。桶<code translate="no">count</code> 和指标是根据这些保留的候选集计算得出的，因此更改<code translate="no">TopHits.size</code> 可能会影响它们。</p></li>
<li><p><strong>可为空的桶字段：</strong> <code translate="no">NULL</code> 的值会形成其自身的桶键。若要排除空桶，请在搜索请求中添加诸如<code translate="no">brand is not null</code> 之类的过滤器。</p></li>
<li><p><strong>重复字段：</strong>同一字段不能出现在多个<code translate="no">SearchAggregation.fields</code> 列表中。例如，如果根聚合使用<code translate="no">fields=[&quot;category&quot;]</code> ，则嵌套的<code translate="no">sub_aggregation</code> 不能同时使用<code translate="no">fields=[&quot;category&quot;]</code> 。</p></li>
<li><p><strong>不支持的组合：</strong>搜索聚合不能与非零的<code translate="no">offset</code> 、搜索迭代器、混合搜索、高亮器或分组搜索结合使用。顶级<code translate="no">offset</code> 的值为<code translate="no">0</code> 等同于省略该参数。在REST v2搜索请求中，<code translate="no">searchAggregation</code> 和<code translate="no">ids</code> 不能同时指定。</p></li>
<li><p><strong>返回的条目：</strong>默认情况下，当请求计算出的结果条目最大数量超过 10,000 时，Milvus 会拒绝该搜索聚合请求。此阈值由<code translate="no">proxy.maxSearchAggregationResultEntries</code> 控制。将配置值设置为<code translate="no">0</code> 或负数可禁用此检查。</p>
<p>Milvus 按以下方式计算该最大值：</p>
<p><code translate="no">number of query vectors × product of the effective search_size at every aggregation level × largest TopHits.size at any level</code></p>
<p>对于此服务器端计算，某层级的有效<code translate="no">search_size</code> 是显式配置的<code translate="no">search_size</code> ，或者当<code translate="no">search_size</code> 被省略时，该层级的<code translate="no">size</code> 。本指南中使用的PyMilvus API目前未公开<code translate="no">search_size</code> ，因此PyMilvus请求会使用各层级的<code translate="no">size</code> 进行此计算。 当没有任何级别配置<code translate="no">TopHits</code> 时，请使用<code translate="no">1</code> 作为最后一个因子。例如，一个查询向量、10 个根桶、每个根桶 5 个子桶以及每个子桶 2 个命中，其计算出的最大值为：</p>
<p><code translate="no">1 × 10 × 5 × 2 = 100</code></p></li>
</ul>
<h2 id="Use-Search-Aggregation" class="common-anchor-header">使用搜索聚合<button data-href="#Use-Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h2><p>根据您的目标选择一个示例：</p>
<table>
<thead>
<tr><th>转到</th><th>描述</th><th>关键设置</th></tr>
</thead>
<tbody>
<tr><td><a href="#Compare-and-sort-buckets">比较和排序存储桶</a></td><td>计算每个存储桶的统计数据以进行比较，然后根据指标、计数或键对返回的存储桶进行排序。</td><td><code translate="no">fields</code>,<code translate="no">size</code>,<code translate="no">metrics</code>,<code translate="no">order</code></td></tr>
<tr><td><a href="#Show-representative-results-from-each-bucket">显示每个桶的代表性结果</a></td><td>从每个桶中返回数量有限的实体，并根据标量字段或向量得分独立对这些实体进行排序。</td><td><code translate="no">top_hits</code>,<code translate="no">TopHits.size</code>,<code translate="no">TopHits.sort</code></td></tr>
<tr><td><a href="#Group-results-at-multiple-levels">多级分组结果</a></td><td>将结果组织为父级和子级桶，以便依次分析多个维度。</td><td><code translate="no">sub_aggregation</code></td></tr>
</tbody>
</table>
<p>下面的示例使用了一个包含品牌、类别、颜色、价格和评分字段的Collection。所有品牌名称、产品名称、价格、评分和搜索结果均为合成示例数据。展开以下部分以创建该Collection并定义共享搜索变量。</p>
<p><details></p>
<p><summary>设置示例Collection</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient, SearchAggregation, TopHits

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

collection_name = <span class="hljs-string">&quot;product_search_aggregation&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;embedding&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(<span class="hljs-string">&quot;name&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">200</span>)
schema.add_field(<span class="hljs-string">&quot;brand&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;color&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">50</span>)
schema.add_field(<span class="hljs-string">&quot;price&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;rating&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;in_stock&quot;</span>, DataType.BOOL)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
    <span class="hljs-comment"># Make preceding writes visible to searches from this client.</span>
    consistency_level=<span class="hljs-string">&quot;Session&quot;</span>,
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.42</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.66</span>, <span class="hljs-number">0.31</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">129.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.7</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.39</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.61</span>, <span class="hljs-number">0.29</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Trail A2&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">139.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.6</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.14</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.68</span>, <span class="hljs-number">0.33</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.41</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.62</span>, <span class="hljs-number">0.30</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner C1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand C&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">119.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.4</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">False</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.48</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.59</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.71</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.5</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.45</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.55</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.69</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">89.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.3</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.09</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.60</span>, <span class="hljs-number">0.27</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A3&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.13</span>, <span class="hljs-number">0.43</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.65</span>, <span class="hljs-number">0.32</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A4&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.9</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
    ],
)

client.load_collection(collection_name)

query_vector = [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.40</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.64</span>, <span class="hljs-number">0.30</span>]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
}
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>上述设置同时配置了<code translate="no">COSINE</code> 的向量索引和搜索参数。因此，后续示例将使用<code translate="no">{&quot;_score&quot;: &quot;desc&quot;}</code> 来优先显示余弦相似度较高的结果。若使用<code translate="no">L2</code> 等距离度量，请使用<code translate="no">{&quot;_score&quot;: &quot;asc&quot;}</code> 。</p>
<h3 id="Compare-and-sort-buckets" class="common-anchor-header">比较和排序桶<button data-href="#Compare-and-sort-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>当您需要使用计算得出的统计数据比较检索到的实体组，并控制桶的返回顺序时，请使用此模式。在此示例中，Milvus 根据<code translate="no">brand</code> 对检索到的产品进行分组，为每个品牌桶计算价格指标，并按平均价格对桶进行排序。</p>
<p>若您的目标仅是通过为每个字段值返回一个或多个实体来提高结果多样性，请改用<a href="/docs/zh/grouping-search.md">“分组搜索”</a>。</p>
<p>以下配置将创建最多三个品牌桶，为每个桶计算指标，并按平均价格对桶进行排序：</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Form one bucket for each distinct brand value.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return up to three buckets at this aggregation level.</span></span>
<span class="highlighted-comment-line">    size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Calculate named metrics for every selected bucket.</span></span>
<span class="highlighted-comment-line">    metrics={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;min_price&quot;</span>: {<span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Sort buckets by average price, highest first.</span></span>
<span class="highlighted-comment-line">    order=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;avg_price&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># If average prices are equal, sort by bucket key in ascending order.</span></span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;_key&quot;</span>: <span class="hljs-string">&quot;asc&quot;</span>},</span>
<span class="highlighted-comment-line">    ],</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>将该对象传递给 `<code translate="no">MilvusClient.search()</code>` 的 `<code translate="no">search_aggregation</code> ` 参数：</p>
<pre><code translate="no" class="language-python">result = client.search(
    collection_name=collection_name,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    search_params=search_params,
    output_fields=[
        <span class="hljs-string">&quot;name&quot;</span>,
        <span class="hljs-string">&quot;brand&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;color&quot;</span>,
        <span class="hljs-string">&quot;price&quot;</span>,
        <span class="hljs-string">&quot;rating&quot;</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>,
    ],
<span class="highlighted-wrapper-line">    search_aggregation=aggregation,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>当设置<code translate="no">search_aggregation</code> 时，PyMilvus在<code translate="no">result[0]</code> 中不会返回普通实体命中结果。请改从<code translate="no">result.agg_buckets[0]</code> 中读取桶响应。<code translate="no">output_fields</code> 参数控制哪些标量字段会出现在每个返回的<code translate="no">AggregationHit.fields</code> 映射中；Milvus仍可使用未列在<code translate="no">output_fields</code> 中的指标源和排序字段。</p>
<p><details></p>
<p><summary>查看桶输出示例</summary></p>
<p>以下输出截取自上述请求，并为便于阅读而序列化为 JSON 格式。PyMilvus 返回的是<code translate="no">AggregationBucket</code> 对象，而非 JSON。<code translate="no">key</code> 的值始终是键组件的有序列表，即使<code translate="no">fields</code> 中仅包含一个字段也是如此。这可保持复合键的字段顺序。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand C&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>对于本指南中的单个查询向量，请从 `<code translate="no">result.agg_buckets[0]</code>` 中读取返回的顶级桶。每个桶都会暴露其有序键组件、保留候选项 `<code translate="no">count</code>`、计算结果 `<code translate="no">metrics</code>`、代表样本 `<code translate="no">hits</code>` 以及嵌套在 `<code translate="no">sub_groups</code>` 中的子桶。</p>
<p>请按以下方式读取配置：</p>
<table>
<thead>
<tr><th>设置</th><th>控制内容</th><th>在此示例中</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fields</code></td><td>Milvus 如何生成桶键</td><td>针对每个不同的<code translate="no">brand</code> 值创建一个存储桶。</td></tr>
<tr><td><code translate="no">size</code></td><td>返回的存储桶最大数量</td><td>最多返回三个品牌存储桶。</td></tr>
<tr><td><code translate="no">metrics</code></td><td>为每个存储桶计算的统计数据</td><td>计算商品数量、平均价格和最低价格。</td></tr>
<tr><td><code translate="no">order</code></td><td>Milvus 对返回的桶进行排序的方式</td><td>按平均价格排序，然后使用桶键来打破平局。</td></tr>
</tbody>
</table>
<p>当设置了 `<code translate="no">search_aggregation</code> ` 时，Milvus 会忽略 `<code translate="no">limit</code> `。使用根 `<code translate="no">SearchAggregation.size</code> ` 值来控制顶级分桶的数量。</p>
<p>采用这些设置时，Milvus将按<code translate="no">avg_price</code> 从高到低的顺序返回品牌B、品牌A和品牌C的桶。<code translate="no">_key</code> 条件仅在桶的平均价格相同时生效。由于此配置未定义<code translate="no">top_hits</code> ，每个桶的<code translate="no">hits</code> 列表均为空，且每个键的候选预算为<code translate="no">1</code> 。因此，显示的计数和指标描述的是每个品牌保留的一个候选项。当聚合需要更宽的按键指标窗口时，请将<code translate="no">top_hits</code> 配置为更大的<code translate="no">TopHits.size</code> 。</p>
<p><details></p>
<p><summary>指标和排序规则</summary></p>
<p>每个<code translate="no">SearchAggregation.metrics</code> 条目将一个用户定义的别名映射到<code translate="no">{operation: source}</code> ：</p>
<table>
<thead>
<tr><th>源</th><th>支持的操作</th><th>行为</th></tr>
</thead>
<tbody>
<tr><td>任何非<code translate="no">JSON</code> 且非Dynamic Field</td><td><code translate="no">count</code></td><td>统计源字段非<code translate="no">NULL</code> 的保留候选项。</td></tr>
<tr><td>整数或浮点字段</td><td><code translate="no">sum</code>、<code translate="no">avg</code> 、<code translate="no">min</code> 、<code translate="no">max</code></td><td>基于非空的保留值进行计算。</td></tr>
<tr><td>字符串或<code translate="no">TIMESTAMPTZ</code> 字段</td><td><code translate="no">min</code>，<code translate="no">max</code></td><td>选择非空保留值的最小值或最大值。</td></tr>
<tr><td><code translate="no">&quot;*&quot;</code></td><td><code translate="no">count</code></td><td>统计桶中每个保留候选项的数量。结果与<code translate="no">bucket.count</code> 一致。</td></tr>
<tr><td><code translate="no">_score</code></td><td><code translate="no">sum</code>,<code translate="no">avg</code>,<code translate="no">min</code>,<code translate="no">max</code></td><td>对保留候选项的ANN相似度或距离值进行聚合。</td></tr>
</tbody>
</table>
<p><code translate="no">SearchAggregation.order</code> 支持以下键：</p>
<table>
<thead>
<tr><th>排序键</th><th>含义</th></tr>
</thead>
<tbody>
<tr><td>度量别名</td><td>按在<code translate="no">metrics</code> 中同一聚合级别计算的值进行排序，例如<code translate="no">avg_price</code> 。</td></tr>
<tr><td><code translate="no">_count</code></td><td>按每个桶中保留的候选项数量进行排序。</td></tr>
<tr><td><code translate="no">_key</code></td><td>按桶键排序，而非按名为<code translate="no">_key</code> 的 Collection 排序。</td></tr>
</tbody>
</table>
<p>每个<code translate="no">order</code> 条目都会将一个键映射到<code translate="no">&quot;asc&quot;</code> 或<code translate="no">&quot;desc&quot;</code> 。Milvus会按从首到尾的顺序评估多个条目。若省略<code translate="no">order</code> ，Milvus将保留来自保留候选集的桶发现顺序。</p>
<p>若要按向量匹配质量对桶进行排序，请先根据<code translate="no">_score</code> 计算桶级指标，然后在<code translate="no">order</code> 中使用该指标别名。您不能直接将<code translate="no">_score</code> 用作桶排序键，因为每个桶可能包含多个实体得分。例如，对于<code translate="no">COSINE</code> 或<code translate="no">IP</code> ：</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
    metrics={<span class="hljs-string">&quot;max_score&quot;</span>: {<span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-string">&quot;_score&quot;</span>}},
    order=[{<span class="hljs-string">&quot;max_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
)
<button class="copy-code-btn"></button></code></pre>
<p>对于<code translate="no">L2</code> ，计算<code translate="no">_score</code> 的最小值，并按升序对指标别名进行排序，以便距离最小的桶排在最前面。</p>
<p></details></p>
<p><details></p>
<p><summary>创建复合桶键</summary></p>
<p>要创建复合桶键，请在同一个列表中传入多个字段名称：</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Combine brand and color to form a composite bucket key.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],</span>
    size=<span class="hljs-number">6</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>此配置可生成诸如<code translate="no">(Brand A, black)</code> 、<code translate="no">(Brand A, blue)</code> 和<code translate="no">(Brand B, white)</code> 之类的键。只有当两个值的值完全匹配时，两个实体才会共享同一个桶。Milvus 会保留列表顺序，因此<code translate="no">brand</code> 是第一个键组件，<code translate="no">color</code> 是第二个。当在<code translate="no">order</code> 中使用<code translate="no">_key</code> 时，Milvus 会按相同顺序比较复合键的各个组件。请将多个字符串作为单个扁平列表传递；不支持嵌套列表。</p>
<p><code translate="no">size=6</code> 是该聚合级别返回的复合桶的最大数量。示例数据包含五种不同的品牌-颜色组合，因此可以返回全部五种。在<a href="#Limits">返回条目限制中</a>，此请求贡献了<code translate="no">1 query vector × 6 buckets × 1 = 6</code> 配置的结果条目。</p>
<p>在单个<code translate="no">SearchAggregation.fields</code> 列表中包含多个字段，将在该聚合级别创建一个复合桶键。若要创建父子桶层次结构，请使用<a href="#Group-results-at-multiple-levels">嵌套聚合</a>。</p>
<p></details></p>
<p>以下示例重新定义了<code translate="no">aggregation</code> 。将更新后的对象传递给相同的<code translate="no">search_aggregation</code> 参数，并重新执行搜索调用。</p>
<h3 id="Show-representative-results-from-each-bucket" class="common-anchor-header">显示每个桶中的代表性结果<button data-href="#Show-representative-results-from-each-bucket" class="anchor-icon" translate="no">
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
    </button></h3><p>当应用程序需要显示每个桶中的实际产品时，请包含具有代表性的实体。在此示例中，Milvus 从每个品牌桶中返回最多两个产品，按评分排序，然后按向量得分排序。</p>
<p>请按以下方式配置 `<code translate="no">TopHits</code> `：</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return and sort representative entities for each selected bucket.</span></span>
<span class="highlighted-comment-line">    top_hits=TopHits(</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Return up to two entities per bucket.</span></span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Apply sort criteria in list order.</span></span>
<span class="highlighted-comment-line">        sort=[</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        ],</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>查看包含代表性命中结果的桶</summary></p>
<p>以下品牌 A 桶的数据摘自上述请求，并为便于阅读而序列化为 JSON 格式。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.99976646900177</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;black&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner A1&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997048377990723</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;blue&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Trail A2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">139.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.6</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<table>
<thead>
<tr><th>参数</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">top_hits</code></td><td>可选。用于配置此聚合层级的代表性实体。若省略，<code translate="no">bucket.hits</code> 将为空，且每个键的候选预算默认为 1。</td></tr>
<tr><td><code translate="no">TopHits.size</code></td><td>从每个选定的桶中返回最多两个代表性实体，并将整个聚合树中每个键的候选预算设置为两个。</td></tr>
<tr><td><code translate="no">TopHits.sort</code></td><td>根据列出的标准对每个桶内的实体进行排序。</td></tr>
</tbody>
</table>
<p>当应用程序需要代表性实体，或者计数和指标需要更宽的按键候选窗口时，请配置 `<code translate="no">top_hits</code> `。较大的 `<code translate="no">TopHits.size</code> ` 值会同时增加候选预算，并<a href="#Limits">提高“限制</a>”中返回条目的最大计算量。</p>
<p><code translate="no">SearchAggregation.order</code> 对桶进行排序，而“<code translate="no">TopHits.sort</code> ”则对每个桶内的保留实体进行排序。该排序顺序不会改变为“<code translate="no">count</code> ”和指标所保留的候选项。<code translate="no">TopHits.sort</code> 接受受支持的可比较标量字段名称以及内置的<code translate="no">_score</code> 字段，该字段表示ANN相似度或距离。Milvus会从头到尾评估<code translate="no">sort</code> 条目。 在此示例中，它按<code translate="no">rating</code> 从高到低对产品进行排序，仅当两个评分相同时才使用<code translate="no">_score</code> 。由于配置中使用了<code translate="no">COSINE</code> ，因此降序的<code translate="no">_score</code> 会将相似度更高的产品排在首位。</p>
<p><code translate="no">metrics</code> 或<code translate="no">TopHits.sort</code> 所使用的字段不必出现在<code translate="no">output_fields</code> 中。Milvus 会在内部获取这些字段，但只有<code translate="no">output_fields</code> 中显式列出的字段才会被包含在每个返回命中结果的<code translate="no">fields</code> 映射中。主键和向量得分仍可通过<code translate="no">AggregationHit.pk</code> 和<code translate="no">AggregationHit.score</code> 获取。</p>
<p>每个返回的<code translate="no">AggregationHit</code> 都会在<code translate="no">pk</code> 中暴露其主键，在<code translate="no">score</code> 中暴露向量得分，并在<code translate="no">fields</code> 中暴露请求的输出字段。</p>
<h3 id="Group-results-at-multiple-levels" class="common-anchor-header">多级分组结果<button data-href="#Group-results-at-multiple-levels" class="anchor-icon" translate="no">
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
    </button></h3><p>当需要在某一层级内嵌套另一层级桶时，请使用嵌套聚合。在此示例中，Milvus 首先创建类别桶，然后在每个类别内创建品牌桶。</p>
<p>子聚合仅接收分配给其父桶的实体。<code translate="no">fields</code> 控制每个聚合层级的桶键，而<code translate="no">sub_aggregation</code> 则创建父子层级结构。</p>
<p>以下配置将创建一个键为<code translate="no">(running_shoes)</code> 的类别桶。在此父桶内，子聚合会创建多个独立的品牌桶，其键分别为<code translate="no">(Brand A)</code> 、<code translate="no">(Brand B)</code> 和<code translate="no">(Brand C)</code> 等。</p>
<pre><code translate="no" class="language-text">Parent bucket key:
(running_shoes)

Child bucket keys:
├── (Brand A)
├── (Brand B)
└── (Brand C)
<button class="copy-code-btn"></button></code></pre>
<p>每个级别均可独立使用多个字段。例如，在子聚合中使用<code translate="no">fields=[&quot;brand&quot;, &quot;color&quot;]</code> 将生成诸如<code translate="no">(Brand A, black)</code> 之类的复合子键。</p>
<p>以下配置实现了此层次结构：</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;category&quot;</span>],
    size=<span class="hljs-number">2</span>,
    metrics={
        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},
        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},
    },
    order=[{<span class="hljs-string">&quot;product_count&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
<span class="highlighted-comment-line">    <span class="hljs-comment"># For each category bucket, group only its entities by brand.</span></span>
<span class="highlighted-comment-line">    sub_aggregation=SearchAggregation(</span>
<span class="highlighted-comment-line">        fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">        metrics={</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;brand_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;avg_rating&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;rating&quot;</span>},</span>
<span class="highlighted-comment-line">        },</span>
<span class="highlighted-comment-line">        order=[{<span class="hljs-string">&quot;avg_rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        top_hits=TopHits(</span>
<span class="highlighted-comment-line">            size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">            sort=[{<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        ),</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>查看嵌套存储桶的结果</summary></p>
<p>以下序列化片段展示了父桶<code translate="no">running_shoes</code> 及其子桶 Brand B。为简洁起见，省略了子桶 Brand A 和 Brand C。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">137.49</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;avg_rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;brand_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9994542598724365</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner B1&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>显示的结果代表桶路径<code translate="no">(running_shoes) → (Brand B)</code> ，而非单个复合桶键<code translate="no">(running_shoes, Brand B)</code> 。</p>
<p>Milvus 首先根据<code translate="no">product_count</code> 排序，最多选出两个类别存储桶。然后，它在每个选定的类别中独立运行<code translate="no">sub_aggregation</code> ，并返回最多三个品牌存储桶，按<code translate="no">avg_rating</code> 排序。</p>
<p>在上述输出中：</p>
<ul>
<li>根<code translate="no">running_shoes</code> 桶在其子复合键中包含四个保留候选项。其<code translate="no">metrics</code> 包含根级别的<code translate="no">avg_price</code> 和<code translate="no">product_count</code> 值。</li>
<li>根桶的<code translate="no">sub_groups</code> 列表包含子品牌桶。显示的品牌B桶包含一个保留候选项及其自身的<code translate="no">avg_rating</code> 和<code translate="no">brand_count</code> 值。</li>
<li>根桶的<code translate="no">hits</code> 列表为空，因为根聚合未配置<code translate="no">top_hits</code> 。品牌 B 子桶包含一个代表性命中，因为<code translate="no">top_hits</code> 已在<code translate="no">sub_aggregation</code> 中配置。</li>
</ul>
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
    </button></h2><h3 id="How-accurate-are-bucket-counts-and-metrics" class="common-anchor-header">桶计数和指标的准确性如何？<button data-href="#How-accurate-are-bucket-counts-and-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>搜索聚合对保留的 ANN 候选项进行汇总，不会执行全 Collection 聚合。</p>
<p>候选项保留包含两个近似阶段。ANN 搜索可能会遗漏相关 Collection 实体，而分组阶段对于每个完整的复合键，最多仅保留<code translate="no">TopHits.size</code> 个候选项。如果没有任何级别配置了<code translate="no">top_hits</code> ，则每个键的限制为 1。</p>
<p>例如，假设一个 Collection 包含 5,000 件 A 品牌产品，其中许多与向量查询相关。如果聚合使用了<code translate="no">TopHits(size=4)</code> ，则 A 品牌桶对于每个完整复合键最多可保留四个候选项。其<code translate="no">count</code> 和指标描述的是这些保留的候选项，而不是所有相关的 A 品牌产品，也不是 Collection 中的全部 5,000 个实体。</p>
<p>当<code translate="no">order</code> 使用指标别名时，近似性尤为重要。搜索召回率的变动会改变指标值，从而改变哪些桶符合<code translate="no">SearchAggregation.size</code> 的条件。嵌套聚合会放大这一影响，因为每个子级别都是基于其父桶中可用的实体进行操作的。</p>
<p>如果您需要针对每个匹配实体的精确统计数据，请使用精确查询聚合工作流，而不是搜索聚合。</p>
<h3 id="How-does-Search-Aggregation-differ-from-Grouping-Search" class="common-anchor-header">搜索聚合与分组搜索有何区别？<button data-href="#How-does-Search-Aggregation-differ-from-Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>请根据应用程序的主要结果结构进行选择：</p>
<table>
<thead>
<tr><th>主要需求</th><th>推荐方案</th><th>需处理的响应</th></tr>
</thead>
<tbody>
<tr><td>返回一个标准的、按排名排序的实体列表，其中分组字段中的重复值较少</td><td><a href="/docs/zh/grouping-search.md">分组搜索</a></td><td>针对每个查询向量返回扁平化的搜索命中结果</td></tr>
<tr><td>将分组视为桶进行检查或比较，包括键、计数、指标、排序、代表性命中结果或子桶</td><td>搜索聚合</td><td><code translate="no">AggregationBucket</code> 对象位于<code translate="no">result.agg_buckets</code></td></tr>
</tbody>
</table>
<p>即使搜索聚合配置了<code translate="no">top_hits</code> ，其主要响应仍为桶树。当应用程序已处理常规搜索命中结果，且主要追求结果多样性时，分组搜索依然有用。</p>
<p>这些API互斥。当在同一请求中将<code translate="no">search_aggregation</code> 与<code translate="no">group_by_field</code> 或<code translate="no">group_by_fields</code> 结合使用时，PyMilvus会抛出<code translate="no">ParamError</code> 异常。</p>
