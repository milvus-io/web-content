---
id: grouping-search-with-structarray.md
title: 使用 StructArray 进行分组搜索
summary: >-
  使用此页面可按父实体对 StructArray 的元素级搜索结果进行分组。当多个 Struct
  元素与查询条件匹配时，元素级搜索可能会返回来自同一实体的多个匹配结果。分组操作会将这些元素级匹配结果合并，从而确保每个父实体至多出现一次。
---
<h1 id="Grouping-Search-with-StructArray" class="common-anchor-header">使用 StructArray 进行分组搜索<button data-href="#Grouping-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>使用本页面可按父实体对 StructArray 的元素级搜索结果进行分组。当多个 Struct 元素匹配查询条件时，元素级搜索可能会返回来自同一实体的多个匹配结果。分组功能会将这些元素级匹配结果合并，确保每个父实体最多只出现一次。</p>
<p>本页面<a href="/docs/zh/create-structarray-field.md">使用了“创建 StructArray 字段”</a>中的<code translate="no">tech_articles</code> Collection。该 Collection 包含一个名为<code translate="no">chunks</code> 的 StructArray 字段。其中<code translate="no">chunks[emb]</code> 向量已通过常规向量度量标准进行索引，以支持元素级搜索。</p>
<p>示例中使用默认的分组大小 1。</p>
<p>在运行这些示例之前，请创建Collection、插入示例数据、创建所需的向量索引，并加载Collection。请为此处显示的字段使用四维向量。除非代码块中重新定义，否则每个代码块均假定使用了前文同语言示例中的连接和变量。</p>
<h2 id="How-grouping-applies-to-StructArray" class="common-anchor-header">分组如何应用于 StructArray<button data-href="#How-grouping-applies-to-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>搜索模式</th><th>分组行为</th><th>结果行为</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList 搜索</td><td>不支持。</td><td>不适用。</td></tr>
<tr><td>元素级搜索</td><td>支持按主键分组。</td><td>每个父实体最多返回一个结果。元素级元数据将被保留，因此当通过 API 或 SDK 暴露时，可以返回所选元素的索引或偏移量。</td></tr>
<tr><td>混合搜索</td><td>仅当所有子搜索都针对同一 StructArray 字段下的元素级向量字段时才受支持。</td><td>在最终结果处理之前，元素级子搜索会按主键进行分组。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>当未分组的元素级搜索返回过多重复的父实体时，请使用分组功能。若希望将每个匹配的 Struct 元素作为单独的命中结果，请使用不带 `<code translate="no">group_by_field</code>`<a href="/docs/zh/basic-vector-search-with-structarray.md">的 StructArray 基本向量搜索</a>。</p>
</div>
<h2 id="Before-you-begin" class="common-anchor-header">开始之前<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>在运行分组搜索之前，请准备好Collection、数据和索引。</p>
<table>
<thead>
<tr><th>要求</th><th>详细信息</th></tr>
</thead>
<tbody>
<tr><td>元素级向量子字段</td><td>请使用 StructArray 向量子字段（例如<code translate="no">chunks[emb]</code> ），并使用常规向量度量进行索引。</td></tr>
<tr><td>常规向量查询</td><td>请使用常规查询向量，而非<code translate="no">EmbeddingList</code> 。</td></tr>
<tr><td>主键分组</td><td>将Collection主键用作<code translate="no">group_by_field</code> ，例如<code translate="no">doc_id</code> 。</td></tr>
<tr><td>不使用范围参数</td><td>请勿将分组搜索与范围搜索参数（如<code translate="no">radius</code> 或<code translate="no">range_filter</code> ）结合使用。</td></tr>
</tbody>
</table>
<p>有关索引设置，请参阅<a href="/docs/zh/index-structarray-fields.md">“Index StructArray Fields</a>”。</p>
<h2 id="Run-grouped-element-level-search" class="common-anchor-header">运行分组元素级搜索<button data-href="#Run-grouped-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>以下示例首先搜索单个块，然后根据父实体的主键对元素匹配结果进行分组。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(
            <span class="hljs-string">&quot;doc_id:&quot;</span>, hit[<span class="hljs-string">&quot;doc_id&quot;</span>],
            <span class="hljs-string">&quot;distance:&quot;</span>, hit[<span class="hljs-string">&quot;distance&quot;</span>],
            <span class="hljs-string">&quot;offset:&quot;</span>, hit.get(<span class="hljs-string">&quot;offset&quot;</span>),
            <span class="hljs-string">&quot;entity:&quot;</span>, hit[<span class="hljs-string">&quot;entity&quot;</span>],
        )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>});

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .annsField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">5</span>)
        .groupByFieldName(<span class="hljs-string">&quot;doc_id&quot;</span>)
        .outputFields(Arrays.asList(
                <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>,
                <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
        .build());

<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResp.getSearchResults()) {
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(<span class="hljs-string">&quot;doc_id: &quot;</span> + result.getId()
                + <span class="hljs-string">&quot;, distance: &quot;</span> + result.getScore()
                + <span class="hljs-string">&quot;, offset: &quot;</span> + result.getElementOffset()
                + <span class="hljs-string">&quot;, entity: &quot;</span> + result.getEntity());
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>}

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-number">5</span>,
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>).
    WithGroupByField(<span class="hljs-string">&quot;doc_id&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;doc_id: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;doc_id&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client.<span class="hljs-title function_ invoke__">search</span>(
    SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]]))
        .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>])
        .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
        .<span class="hljs-title function_ invoke__">group_by_field</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">for</span> <span class="hljs-variable">result</span> <span class="hljs-keyword">in</span> response.<span class="hljs-title function_ invoke__">results</span>() {
    <span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> result.<span class="hljs-title function_ invoke__">rows</span>()? {
        <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;doc_id: {:?}, distance: {:?}, offset: {:?}, entity: {:?}&quot;</span>,
            row.<span class="hljs-title function_ invoke__">get</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)?, row.<span class="hljs-title function_ invoke__">get</span>(<span class="hljs-string">&quot;score&quot;</span>)?, row.<span class="hljs-title function_ invoke__">element_offset</span>(), row.<span class="hljs-title function_ invoke__">to_entity_row</span>()?);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>};

milvus::SearchRequest request;
request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
       .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
       .<span class="hljs-built_in">AddFloatVector</span>(query_vector)
       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
       .<span class="hljs-built_in">WithGroupByField</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;title&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[text]&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[section]&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[page]&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; result : response.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    milvus::EntityRows output_rows;
    status = result.<span class="hljs-built_in">OutputRows</span>(output_rows);
    <span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
        std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    }
    <span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) {
        std::cout &lt;&lt; row &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });

<span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: query_vector,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">group_by_field</span>: <span class="hljs-string">&quot;doc_id&quot;</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>],
});

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> hit <span class="hljs-keyword">of</span> res.<span class="hljs-property">results</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;doc_id:&quot;</span>, hit.<span class="hljs-property">doc_id</span>, <span class="hljs-string">&quot;distance:&quot;</span>, hit.<span class="hljs-property">score</span>, <span class="hljs-string">&quot;offset:&quot;</span>, hit.<span class="hljs-property">offset</span>);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-built_in">float</span>[] queryVector = [<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>];

SearchResp results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    Vectors = [queryVector],
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        GroupByField = <span class="hljs-string">&quot;doc_id&quot;</span>,
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span> }
    }
});

<span class="hljs-keyword">foreach</span> (<span class="hljs-built_in">long</span> id <span class="hljs-keyword">in</span> results.Ids.LongIds ?? [])
{
    Console.WriteLine(<span class="hljs-string">$&quot;doc_id: <span class="hljs-subst">{id}</span>&quot;</span>);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;data&quot;: [
        [0.19, 0.24, 0.30, 0.37]
    ],
    &quot;annsField&quot;: &quot;chunks[emb]&quot;,
    &quot;limit&quot;: 5,
    &quot;groupingField&quot;: &quot;doc_id&quot;,
    &quot;outputFields&quot;: [&quot;doc_id&quot;, &quot;title&quot;, &quot;chunks[text]&quot;, &quot;chunks[section]&quot;, &quot;chunks[page]&quot;, &quot;chunks[quality_score]&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>如果不进行分组，当多个数据块匹配查询时，同一个<code translate="no">doc_id</code> 可能会出现多次。使用<code translate="no">group_by_field=&quot;doc_id&quot;</code> 时，每个父实体最多只出现一次。分组会保留元素级元数据，因此当API或SDK公开相关信息时，分组后的结果仍可包含所选Struct元素的索引或偏移量。</p>
<h2 id="Add-scalar-filters" class="common-anchor-header">添加标量过滤器<button data-href="#Add-scalar-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以将分组搜索与 StructArray 标量过滤相结合。当标量条件需要限制哪些 Struct 元素参与元素级向量搜索时，请使用<code translate="no">element_filter</code> 。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>});

<span class="hljs-type">String</span> <span class="hljs-variable">filterExpr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; &quot;</span>
        + <span class="hljs-string">&quot;element_filter(chunks, &quot;</span>
        + <span class="hljs-string">&quot;$[section] == \&quot;index\&quot; &amp;&amp; &quot;</span>
        + <span class="hljs-string">&quot;$[quality_score] &gt; 0.9)&quot;</span>;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .annsField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .filter(filterExpr)
        .topK(<span class="hljs-number">5</span>)
        .groupByFieldName(<span class="hljs-string">&quot;doc_id&quot;</span>)
        .outputFields(Arrays.asList(
                <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>,
                <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>}

filterExpr := <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; &quot;</span> +
    <span class="hljs-string">&quot;element_filter(chunks, &quot;</span> +
    <span class="hljs-string">&quot;$[section] == \&quot;index\&quot; &amp;&amp; &quot;</span> +
    <span class="hljs-string">&quot;$[quality_score] &gt; 0.9)&quot;</span>

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-number">5</span>,
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>).
    WithFilter(filterExpr).
    WithGroupByField(<span class="hljs-string">&quot;doc_id&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;doc_id: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;doc_id&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_expr</span> = <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client.<span class="hljs-title function_ invoke__">search</span>(
    SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]]))
        .<span class="hljs-title function_ invoke__">filter</span>(filter_expr)
        .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>])
        .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
        .<span class="hljs-title function_ invoke__">group_by_field</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">for</span> <span class="hljs-variable">result</span> <span class="hljs-keyword">in</span> response.<span class="hljs-title function_ invoke__">results</span>() {
    <span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> result.<span class="hljs-title function_ invoke__">rows</span>()? {
        <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;doc_id: {:?}, distance: {:?}, offset: {:?}, entity: {:?}&quot;</span>,
            row.<span class="hljs-title function_ invoke__">get</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)?, row.<span class="hljs-title function_ invoke__">get</span>(<span class="hljs-string">&quot;score&quot;</span>)?, row.<span class="hljs-title function_ invoke__">element_offset</span>(), row.<span class="hljs-title function_ invoke__">to_entity_row</span>()?);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>};

std::string filter_expr = <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; &quot;</span>
                          <span class="hljs-string">&quot;element_filter(chunks, &quot;</span>
                          <span class="hljs-string">&quot;$[section] == \&quot;index\&quot; &amp;&amp; &quot;</span>
                          <span class="hljs-string">&quot;$[quality_score] &gt; 0.9)&quot;</span>;

milvus::SearchRequest request;
request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
       .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
       .<span class="hljs-built_in">AddFloatVector</span>(query_vector)
       .<span class="hljs-built_in">WithFilter</span>(filter_expr)
       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
       .<span class="hljs-built_in">WithGroupByField</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;title&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;category&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[text]&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[section]&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">const</span> filter_expr = <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: query_vector,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
  <span class="hljs-attr">filter</span>: filter_expr,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">group_by_field</span>: <span class="hljs-string">&quot;doc_id&quot;</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-built_in">float</span>[] queryVector = [<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>];

<span class="hljs-built_in">string</span> filterExpr = <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>;

SearchResp results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    Vectors = [queryVector],
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = filterExpr,
        GroupByField = <span class="hljs-string">&quot;doc_id&quot;</span>,
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;data&quot;: [
        [0.19, 0.24, 0.30, 0.37]
    ],
    &quot;annsField&quot;: &quot;chunks[emb]&quot;,
    &quot;filter&quot;: &quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;,
    &quot;limit&quot;: 5,
    &quot;groupingField&quot;: &quot;doc_id&quot;,
    &quot;outputFields&quot;: [&quot;doc_id&quot;, &quot;title&quot;, &quot;category&quot;, &quot;chunks[text]&quot;, &quot;chunks[section]&quot;, &quot;chunks[quality_score]&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>顶级谓词用于筛选候选实体。<code translate="no">element_filter</code> 谓词将元素级向量搜索限制为匹配的Struct元素。随后，分组操作会根据主键合并匹配的元素命中结果。</p>
<h2 id="Use-grouping-in-hybrid-search" class="common-anchor-header">在混合搜索中使用分组<button data-href="#Use-grouping-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>与 StructArray 结合使用的混合分组是一项元素级功能。仅当所有子搜索都针对同一 StructArray 字段下的元素级向量字段时，才支持此功能。请勿在分组的 StructArray 混合搜索中使用 EmbeddingList 级别的请求。</p>
<p>以下示例假设<code translate="no">chunks</code> 的StructArray字段包含两个元素级向量子字段：<code translate="no">chunks[emb]</code> 和<code translate="no">chunks[code_emb]</code> ，且两者均使用<code translate="no">COSINE</code> 进行索引。在创建Collection时，需定义并填充额外的4维<code translate="no">code_emb</code> 子字段；该子字段未包含在上述链接的基础Schema中。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]
code_query_vector = [<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>]

index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>},
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    param={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>},
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>});
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">codeQueryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span>});

<span class="hljs-type">AnnSearchReq</span> <span class="hljs-variable">indexChunkReq</span> <span class="hljs-operator">=</span> AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .vectors(Collections.singletonList(queryVector))
        .metricType(IndexParam.MetricType.COSINE)
        .limit(<span class="hljs-number">10</span>)
        .filter(<span class="hljs-string">&quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;</span>)
        .build();

<span class="hljs-type">AnnSearchReq</span> <span class="hljs-variable">codeChunkReq</span> <span class="hljs-operator">=</span> AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>)
        .vectors(Collections.singletonList(codeQueryVector))
        .metricType(IndexParam.MetricType.COSINE)
        .limit(<span class="hljs-number">10</span>)
        .filter(<span class="hljs-string">&quot;element_filter(chunks, $[has_code] == true)&quot;</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(HybridSearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .searchRequests(Arrays.asList(indexChunkReq, codeChunkReq))
        .ranker(RRFRanker.builder().build())
        .limit(<span class="hljs-number">5</span>)
        .groupByFieldName(<span class="hljs-string">&quot;doc_id&quot;</span>)
        .outFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">index_chunk_req</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]]))
    .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;</span>)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">code_chunk_req</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>]]))
    .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;element_filter(chunks, $[has_code] == true)&quot;</span>)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client.<span class="hljs-title function_ invoke__">hybrid_search</span>(
    HybridSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .<span class="hljs-title function_ invoke__">sub_requests</span>(<span class="hljs-built_in">vec!</span>[index_chunk_req, code_chunk_req])
        .<span class="hljs-title function_ invoke__">rerank</span>(RRFRerank::<span class="hljs-title function_ invoke__">new</span>())
        .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
        .<span class="hljs-title function_ invoke__">group_by_field</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
        .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>])
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">for</span> <span class="hljs-variable">result</span> <span class="hljs-keyword">in</span> response.<span class="hljs-title function_ invoke__">results</span>() {
    <span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> result.<span class="hljs-title function_ invoke__">rows</span>()? {
        <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;doc_id: {:?}, distance: {:?}, offset: {:?}, entity: {:?}&quot;</span>,
            row.<span class="hljs-title function_ invoke__">get</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)?, row.<span class="hljs-title function_ invoke__">get</span>(<span class="hljs-string">&quot;score&quot;</span>)?, row.<span class="hljs-title function_ invoke__">element_offset</span>(), row.<span class="hljs-title function_ invoke__">to_entity_row</span>()?);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>};
std::vector&lt;<span class="hljs-type">float</span>&gt; code_query_vector = {<span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span>};

<span class="hljs-keyword">auto</span> index_chunk_req = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;();
index_chunk_req-&gt;<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
                .<span class="hljs-built_in">AddFloatVector</span>(query_vector)
                .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;</span>)
                .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>);

<span class="hljs-keyword">auto</span> code_chunk_req = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;();
code_chunk_req-&gt;<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>)
               .<span class="hljs-built_in">AddFloatVector</span>(code_query_vector)
               .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;element_filter(chunks, $[has_code] == true)&quot;</span>)
               .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>);

milvus::HybridSearchRequest request;
request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
       .<span class="hljs-built_in">AddSubRequest</span>(index_chunk_req)
       .<span class="hljs-built_in">AddSubRequest</span>(code_chunk_req)
       .<span class="hljs-built_in">WithRerank</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::RRFRerank&gt;(<span class="hljs-number">60</span>))
       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
       .<span class="hljs-built_in">WithGroupByField</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;title&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[text]&quot;</span>)
       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[section]&quot;</span>);

milvus::HybridSearchResponse response;
status = client-&gt;<span class="hljs-built_in">HybridSearch</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-built_in">float</span>[] queryVector = [<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>];
<span class="hljs-built_in">float</span>[] codeQueryVector = [<span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span>];

AnnSearchReq indexChunkReq = <span class="hljs-keyword">new</span>()
{
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    Vectors = [queryVector],
    MetricType = MetricType.Cosine,
    Limit = <span class="hljs-number">10</span>,
    Expression = <span class="hljs-string">&quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;</span>
};

AnnSearchReq codeChunkReq = <span class="hljs-keyword">new</span>()
{
    VectorFieldName = <span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    Vectors = [codeQueryVector],
    MetricType = MetricType.Cosine,
    Limit = <span class="hljs-number">10</span>,
    Expression = <span class="hljs-string">&quot;element_filter(chunks, $[has_code] == true)&quot;</span>
};

SearchResp results = <span class="hljs-keyword">await</span> client.HybridSearchAsync(<span class="hljs-keyword">new</span> HybridSearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    SearchRequests = [indexChunkReq, codeChunkReq],
    Reranker = <span class="hljs-keyword">new</span> RrfReranker(),
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        GroupByField = <span class="hljs-string">&quot;doc_id&quot;</span>,
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/hybrid_search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;search&quot;: [
        {
            &quot;annsField&quot;: &quot;chunks[emb]&quot;,
            &quot;data&quot;: [[0.19, 0.24, 0.30, 0.37]],
            &quot;limit&quot;: 10,
            &quot;filter&quot;: &quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;
        },
        {
            &quot;annsField&quot;: &quot;chunks[code_emb]&quot;,
            &quot;data&quot;: [[0.18, 0.23, 0.29, 0.36]],
            &quot;limit&quot;: 10,
            &quot;filter&quot;: &quot;element_filter(chunks, $[has_code] == true)&quot;
        }
    ],
    &quot;rerank&quot;: { &quot;strategy&quot;: &quot;rrf&quot;, &quot;params&quot;: {} },
    &quot;limit&quot;: 5,
    &quot;groupingField&quot;: &quot;doc_id&quot;,
    &quot;outputFields&quot;: [&quot;doc_id&quot;, &quot;title&quot;, &quot;chunks[text]&quot;, &quot;chunks[section]&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 3.0.2 随附的 Go 客户端源代码未通过<code translate="no">NewHybridSearchOption</code> 提供最终混合分组功能。在每个子请求中设置<code translate="no">WithGroupByField</code> 并不能配置最终混合分组。NodeJS 3.0.6 同样省略了混合排名参数中的顶级<code translate="no">group_by_field</code> 。请使用上述示例中的任一 API 进行操作。</p>
<p>在此示例中，两个子请求均针对同一 StructArray 字段（<code translate="no">chunks</code> ）下的元素级向量场。如果混合搜索同时包含普通向量场、不同的 StructArray 字段或 EmbeddingList 级别的请求，则不支持元素级分组。</p>
<h2 id="Interpret-grouped-results" class="common-anchor-header">解析分组结果<button data-href="#Interpret-grouped-results" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>结果项</th><th>含义</th></tr>
</thead>
<tbody>
<tr><td>主键（在本示例中为<code translate="no">doc_id</code> ）</td><td>分组父实体的主键。</td></tr>
<tr><td><code translate="no">distance</code> 或分数</td><td>该父实体的所选 Struct 元素的分数或距离。</td></tr>
<tr><td><code translate="no">offset</code></td><td>所选 Struct 元素在返回时的零基索引位置。</td></tr>
<tr><td>重复的主键</td><td>按主键分组时不应出现此情况。</td></tr>
<tr><td><code translate="no">limit</code></td><td>适用于按父实体分组的结果。</td></tr>
</tbody>
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
<li><p>分组搜索仅适用于元素级 StructArray 向量搜索。EmbeddingList 搜索和 EmbeddingList 级混合搜索不支持按组分组。</p></li>
<li><p>请将主键用作<code translate="no">group_by_field</code> 。StructArray 元素级分组并非针对任意标量字段的通用分组操作。</p></li>
<li><p>请勿将分组搜索与范围搜索结合使用。</p></li>
<li><p>请勿在分组搜索中使用<code translate="no">EmbeddingList</code> 查询或<code translate="no">MAX_SIM*</code> 度量。</p></li>
<li><p>仅当所有子搜索都针对同一 StructArray 字段下的元素级向量字段时，才支持混合分组。</p></li>
<li><p>当混合搜索混合了普通向量字段、不同的 StructArray 字段或 EmbeddingList 级请求时，不支持混合分组。</p></li>
</ul>
<h2 id="Common-mistakes" class="common-anchor-header">常见错误<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>将分组与<code translate="no">chunks[emb_list_vector]</code> 结合使用，而该字段专用于EmbeddingList搜索。</p></li>
<li><p>按非主键标量字段进行分组。</p></li>
<li><p>按多个字段进行分组。元素级 StructArray 分组仅支持主键分组。</p></li>
<li><p>期望分组结果能代表每个匹配的 Struct 元素。分组每个父实体最多返回一个结果。</p></li>
<li><p>假设按元素级别分组的搜索会重新计算 EmbeddingList 风格的<code translate="no">MAX_SIM*</code> 得分。分组会合并元素级别的匹配结果，但不会改变评分模型。</p></li>
<li><p>将<code translate="no">group_by_field</code> 与<code translate="no">radius</code> 或<code translate="no">range_filter</code> 结合使用。</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">下一步<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>若要先了解未分组的元素级搜索，请阅读《<a href="/docs/zh/basic-vector-search-with-structarray.md">使用 StructArray 进行基本向量搜索</a>》。</p></li>
<li><p>若要为分组搜索添加标量过滤器，请阅读《<a href="/docs/zh/filtered-search-with-structarray.md">使用 StructArray 进行过滤搜索</a>》。</p></li>
<li><p>若要使用得分或距离边界代替分组，请阅读《<a href="/docs/zh/range-search-with-structarray.md">使用 StructArray 进行范围搜索</a>》。</p></li>
<li><p>要查看 StructArray 的搜索限制，请阅读《<a href="/docs/zh/structarray-limits.md">StructArray 限制</a>》。</p></li>
</ol>
