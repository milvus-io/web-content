---
id: filtered-search-with-structarray.md
title: StructArray를 사용한 필터링 검색
summary: >-
  이 페이지를 사용하여 StructArray 필드에 대한 벡터 검색에 스칼라 필터링을 추가할 수 있습니다. StructArray 필터링에는 두
  가지 수준이 있습니다. 행 수준 필터는 상위 엔티티를 선택하고, 요소 수준 필터는 요소 수준 벡터 검색에 포함될 Struct 요소를
  제한합니다.
---
<h1 id="Filtered-Search-with-StructArray" class="common-anchor-header">StructArray를 사용한 필터링 검색<button data-href="#Filtered-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지를 사용하여 StructArray 필드에 대한 벡터 검색에 스칼라 필터링을 추가할 수 있습니다. StructArray 필터링에는 두 가지 수준이 있습니다. 행 수준 필터는 상위 엔티티를 선택하고, 요소 수준 필터는 요소 수준 벡터 검색에 포함될 Struct 요소를 제한합니다.</p>
<p>이 페이지에서는 <a href="/docs/ko/create-structarray-field.md">‘StructArray 필드 생성’의</a> <code translate="no">tech_articles</code> 컬렉션을 사용합니다. 이 컬렉션에는 <code translate="no">chunks</code> 라는 StructArray 필드가 있으며, <code translate="no">section</code>, <code translate="no">page</code>, <code translate="no">quality_score</code>, <code translate="no">has_code</code> 와 같은 스칼라 하위 필드와 검색용 벡터 하위 필드가 포함되어 있습니다.</p>
<p>이 예제를 실행하기 전에 컬렉션을 생성하고, 예제 데이터를 삽입하며, 필요한 벡터 인덱스를 생성한 후 컬렉션을 로드하십시오. 여기에 표시된 필드에는 4차원 벡터를 사용하십시오. 각 코드 블록은 별도로 정의하지 않는 한, 동일한 언어로 작성된 이전 예제의 연결 및 변수를 사용한다고 가정합니다.</p>
<h2 id="Choose-a-filter-type" class="common-anchor-header">필터 유형 선택<button data-href="#Choose-a-filter-type" class="anchor-icon" translate="no">
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
<tr><th>목표</th><th>사용</th><th>결과 동작</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">category</code> 와 같은 최상위 스칼라 필드로 필터링합니다.</td><td>일반 필터 표현식.</td><td>검색 전이나 검색 중에 상위 엔티티를 선택합니다.</td></tr>
<tr><td>요소 수준 벡터 검색을 스칼라 조건과 일치하는 Struct 요소로 제한합니다.</td><td><code translate="no">element_filter</code>.</td><td>일치하는 Struct 요소만 검색하며, 일치하는 요소의 오프셋을 반환할 수 있습니다.</td></tr>
<tr><td>Struct 요소 중 일부, 전체 또는 특정 개수가 술어와 일치하는지 여부에 따라 엔티티를 선택합니다.</td><td><code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> 또는 <code translate="no">MATCH_EXACT</code>.</td><td>행 수준 필터링. 이 연산자들은 그 자체로는 오프셋을 반환하지 않습니다.</td></tr>
<tr><td><code translate="no">$[...]</code> 를 사용하지 않고 하나의 요소 위치를 테스트하거나, Struct 요소의 개수를 세거나, 여러 요소에 걸쳐 하위 필드 값을 확인합니다.</td><td><code translate="no">chunks[0][section]</code>, <code translate="no">array_length(chunks)</code> 또는 <code translate="no">array_contains(chunks[section], ...)</code> 과 같은 행 수준 StructArray 경로.</td><td>행 수준 필터링. 구문에 대해서는 <a href="/docs/ko/struct-array-operators.md">StructArray 연산자를</a> 참조하십시오.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>이 페이지에서는 검색 워크플로우에서 StructArray 필터를 사용하는 방법을 설명합니다. 전체 구문 규칙, 지원되는 술어 유형 및 지원되지 않는 술어 행렬에 대해서는 <a href="/docs/ko/struct-array-operators.md">StructArray 연산자를</a> 참조하십시오.</p>
</div>
<h2 id="Filter-by-top-level-fields" class="common-anchor-header">최상위 필드별 필터링<button data-href="#Filter-by-top-level-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>조건이 개별 Struct 요소가 아닌 상위 엔티티에 속하는 경우 일반 필터 표현식을 사용하십시오. 이는 EmbeddingList 검색과 요소 수준 검색 모두에서 작동합니다.</p>
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
<span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query = EmbeddingList()
query.add([<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
query.add([<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>])

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddingList;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">EmbeddingList</span> <span class="hljs-variable">query</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddingList</span>();
query.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.12f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.44f</span>)));
query.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span>)));

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .data(Collections.singletonList(query))
        .annsField(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
        .filter(<span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>)
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

    milvusclient <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

query := entity.FloatVectorArray{
    entity.FloatVector{<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>},
    entity.FloatVector{<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>},
}

results, err := cli.Search(ctx, milvusclient.NewSearchOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-number">3</span>, []entity.Vector{query}).
    WithANNSField(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Printf(<span class="hljs-string">&quot;returned %d result sets\n&quot;</span>, <span class="hljs-built_in">len</span>(results))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query</span> = EmbeddingList::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_vector</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.12f32</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
    .<span class="hljs-title function_ invoke__">add_vector</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.18f32</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">EmbeddingLists</span>(<span class="hljs-built_in">vec!</span>[query]))
    .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">3</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>])
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">results</span> = client.<span class="hljs-title function_ invoke__">search</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>

<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/request/dql/SearchRequest.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/types/EmbeddingList.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}

milvus::EmbeddingList query;
query.<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.12f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.44f</span>});
query.<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span>});

milvus::SearchRequest request;
request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
       .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>)
       .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>);
request.<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>});
request.<span class="hljs-built_in">AddEmbeddingList</span>(std::<span class="hljs-built_in">move</span>(query));

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });

<span class="hljs-keyword">const</span> query = [
  [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>],
  [<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>],
];

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: query,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">var</span> query = <span class="hljs-keyword">new</span> EmbeddingList();
query.Add(<span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.12f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.44f</span> }));
query.Add(<span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span> }));

<span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    EmbeddingLists = <span class="hljs-keyword">new</span>[] { query },
    Limit = <span class="hljs-number">3</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = <span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>,
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;data&quot;: [[[0.12, 0.21, 0.32, 0.44], [0.18, 0.23, 0.29, 0.36]]],
    &quot;annsField&quot;: &quot;chunks[emb_list_vector]&quot;,
    &quot;filter&quot;: &quot;category == \&quot;search\&quot;&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [&quot;doc_id&quot;, &quot;title&quot;, &quot;category&quot;, &quot;chunks[text]&quot;, &quot;chunks[section]&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>위의 필터는 최상위 ` <code translate="no">category</code> ` 필드가 ` <code translate="no">&quot;search&quot;</code>`인 엔티티만 선택합니다. 이 필터는 일치하는 단일 Struct 요소를 식별하지 않습니다.</p>
<h2 id="Filter-element-level-vector-search" class="common-anchor-header">요소 수준 벡터 검색 필터링<button data-href="#Filter-element-level-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>스칼라 조건이 요소 수준 벡터 검색에 참여하는 동일한 Struct 요소에 적용되어야 할 때는 <code translate="no">element_filter(structArrayField, predicate)</code> 를 사용하십시오. 술어 내부에서는 <code translate="no">$[subfield]</code> 를 사용하여 현재 Struct 요소의 스칼라 하위 필드를 참조하십시오.</p>
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
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9 &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[has_code] == true)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
        <span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
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

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>));

<span class="hljs-type">String</span> <span class="hljs-variable">filterExpr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9 &amp;&amp; $[has_code] == true)&quot;</span>;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .annsField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .filter(filterExpr)
        .limit(<span class="hljs-number">5</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks[has_code]&quot;</span>))
        .build());

<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; hits : results.getSearchResults()) {
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult hit : hits) {
        System.out.println(<span class="hljs-string">&quot;doc_id: &quot;</span> + hit.getId() + <span class="hljs-string">&quot;, distance: &quot;</span> + hit.getScore()
                + <span class="hljs-string">&quot;, offset: &quot;</span> + hit.getElementOffset() + <span class="hljs-string">&quot;, entity: &quot;</span> + hit.getEntity());
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

    milvusclient <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

queryVector := entity.FloatVector{<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>}

filterExpr := <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9 &amp;&amp; $[has_code] == true)&quot;</span>

results, err := cli.Search(ctx, milvusclient.NewSearchOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-number">5</span>, []entity.Vector{queryVector}).
    WithANNSField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>).
    WithFilter(filterExpr).
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks[has_code]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Printf(<span class="hljs-string">&quot;returned %d result sets\n&quot;</span>, <span class="hljs-built_in">len</span>(results))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.19f32</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_expr</span> = <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9 &amp;&amp; $[has_code] == true)&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector]))
    .<span class="hljs-title function_ invoke__">filter</span>(filter_expr)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks[has_code]&quot;</span>])
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">results</span> = client.<span class="hljs-title function_ invoke__">search</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/request/dql/SearchRequest.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>};

milvus::SearchRequest request;
request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
       .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
       .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9 &amp;&amp; $[has_code] == true)&quot;</span>);
request.<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks[has_code]&quot;</span>});
request.<span class="hljs-built_in">AddFloatVector</span>(query_vector);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">const</span> filter_expr = <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9 &amp;&amp; $[has_code] == true)&#x27;</span>;

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: query_vector,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
  <span class="hljs-attr">filter</span>: filter_expr,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks[has_code]&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> queryVector = <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span> });

<span class="hljs-keyword">var</span> filterExpr = <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; &quot;</span> +
    <span class="hljs-string">&quot;element_filter(chunks, &quot;</span> +
    <span class="hljs-string">&quot;$[section] == \&quot;index\&quot; &amp;&amp; &quot;</span> +
    <span class="hljs-string">&quot;$[quality_score] &gt; 0.9 &amp;&amp; &quot;</span> +
    <span class="hljs-string">&quot;$[has_code] == true)&quot;</span>;

<span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { queryVector },
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = filterExpr,
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks[has_code]&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;data&quot;: [[0.19, 0.24, 0.30, 0.37]],
    &quot;annsField&quot;: &quot;chunks[emb]&quot;,
    &quot;filter&quot;: &quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9 &amp;&amp; $[has_code] == true)&quot;,
    &quot;limit&quot;: 5,
    &quot;outputFields&quot;: [&quot;doc_id&quot;, &quot;title&quot;, &quot;chunks[text]&quot;, &quot;chunks[section]&quot;, &quot;chunks[page]&quot;, &quot;chunks[quality_score]&quot;, &quot;chunks[has_code]&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 예제에서 최상위 술어 ` <code translate="no">category == &quot;search&quot;</code> `는 후보 엔티티를 선택하며, ` <code translate="no">element_filter</code> `는 ` <code translate="no">section</code>`, ` <code translate="no">quality_score</code>`, ` <code translate="no">has_code</code> `가 모두 동일한 Struct 요소 내에서 일치하는 청크로 요소 수준 벡터 검색을 제한합니다.</p>
<div class="alert note">
<p>경고</p>
<p>최상위 술어와 <code translate="no">element_filter</code> 를 결합할 때는 <code translate="no">element_filter</code> 를 식의 맨 끝에 배치해야 합니다. 필터 식에는 <code translate="no">element_filter</code> 가 하나만 포함될 수 있으며, <code translate="no">element_filter</code> 나 <code translate="no">MATCH_*</code> 를 다른 StructArray 연산자 안에 중첩할 수 없습니다.</p>
</div>
<h2 id="Filter-entities-with-MATCH-operators" class="common-anchor-header">MATCH 연산자를 사용한 엔티티 필터링<button data-href="#Filter-entities-with-MATCH-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>필터가 부모 엔티티가 Struct 요소를 기준으로 자격 요건을 충족하는지 여부를 결정해야 할 때는 <code translate="no">MATCH_*</code> 연산자를 사용합니다. 이 연산자들은 행 수준 필터로, 엔티티를 선택하지만 자체적으로는 요소 오프셋을 반환하지 않습니다.</p>
<table>
<thead>
<tr><th>연산자</th><th>다음과 같은 경우에 사용합니다</th><th>예시</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY</code></td><td>적어도 하나의 Struct 요소가 술어를 만족해야 합니다.</td><td><code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code></td></tr>
<tr><td><code translate="no">MATCH_ALL</code></td><td>모든 Struct 요소가 술어를 만족해야 합니다.</td><td><code translate="no">MATCH_ALL(chunks, $[quality_score] &gt; 0.5)</code></td></tr>
<tr><td><code translate="no">MATCH_LEAST</code></td><td><code translate="no">N</code> 개 이상의 Struct 요소가 술어를 만족해야 합니다.</td><td><code translate="no">MATCH_LEAST(chunks, $[has_code] == true, threshold=2)</code></td></tr>
<tr><td><code translate="no">MATCH_MOST</code></td><td><code translate="no">N</code> 개 이하의 Struct 요소가 술어를 만족해야 합니다.</td><td><code translate="no">MATCH_MOST(chunks, $[section] == &quot;appendix&quot;, threshold=1)</code></td></tr>
<tr><td><code translate="no">MATCH_EXACT</code></td><td>정확히 <code translate="no">N</code> 개의 Struct 요소가 술어를 만족해야 합니다.</td><td><code translate="no">MATCH_EXACT(chunks, $[section] == &quot;summary&quot;, threshold=1)</code></td></tr>
</tbody>
</table>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

query = EmbeddingList()
query.add([<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
query.add([<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>])

filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;MATCH_ANY(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">3</span>,
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddingList;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">EmbeddingList</span> <span class="hljs-variable">query</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddingList</span>();
query.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.12f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.44f</span>)));
query.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span>)));

<span class="hljs-type">String</span> <span class="hljs-variable">filterExpr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; MATCH_ANY(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .data(Collections.singletonList(query))
        .annsField(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
        .filter(filterExpr)
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

    milvusclient <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

query := entity.FloatVectorArray{
    entity.FloatVector{<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>},
    entity.FloatVector{<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>},
}

filterExpr := <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; MATCH_ANY(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>

results, err := cli.Search(ctx, milvusclient.NewSearchOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-number">3</span>, []entity.Vector{query}).
    WithANNSField(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>).
    WithFilter(filterExpr).
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Printf(<span class="hljs-string">&quot;returned %d result sets\n&quot;</span>, <span class="hljs-built_in">len</span>(results))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query</span> = EmbeddingList::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_vector</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.12f32</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
    .<span class="hljs-title function_ invoke__">add_vector</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.18f32</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_expr</span> = <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; MATCH_ANY(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">EmbeddingLists</span>(<span class="hljs-built_in">vec!</span>[query]))
    .<span class="hljs-title function_ invoke__">filter</span>(filter_expr)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">3</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>])
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">results</span> = client.<span class="hljs-title function_ invoke__">search</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>

<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/request/dql/SearchRequest.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/types/EmbeddingList.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}

milvus::EmbeddingList query;
query.<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.12f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.44f</span>});
query.<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span>});

milvus::SearchRequest request;
request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
       .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>)
       .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; MATCH_ANY(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>);
request.<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>});
request.<span class="hljs-built_in">AddEmbeddingList</span>(std::<span class="hljs-built_in">move</span>(query));

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> query = [
  [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>],
  [<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>],
];

<span class="hljs-keyword">const</span> filter_expr = <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; MATCH_ANY(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>;

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: query,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
  <span class="hljs-attr">filter</span>: filter_expr,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> query = <span class="hljs-keyword">new</span> EmbeddingList();
query.Add(<span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.12f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.44f</span> }));
query.Add(<span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span> }));

<span class="hljs-keyword">var</span> filterExpr = <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; &quot;</span> +
    <span class="hljs-string">&quot;MATCH_ANY(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>;

<span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    EmbeddingLists = <span class="hljs-keyword">new</span>[] { query },
    Limit = <span class="hljs-number">3</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = filterExpr,
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;data&quot;: [[[0.12, 0.21, 0.32, 0.44], [0.18, 0.23, 0.29, 0.36]]],
    &quot;annsField&quot;: &quot;chunks[emb_list_vector]&quot;,
    &quot;filter&quot;: &quot;category == \&quot;search\&quot; &amp;&amp; MATCH_ANY(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [&quot;doc_id&quot;, &quot;title&quot;, &quot;category&quot;, &quot;chunks[text]&quot;, &quot;chunks[section]&quot;, &quot;chunks[quality_score]&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>EmbeddingList 검색 결과가 엔티티 수준이므로 여기서는 ` <code translate="no">MATCH_ANY</code> `를 사용해야 합니다. 이 필터는 엔티티 내의 청크 중 적어도 하나가 고품질의 ` <code translate="no">&quot;index&quot;</code> ` 청크여야 하지만, 검색 결과 자체는 여전히 상위 엔티티를 나타냅니다.</p>
<h2 id="Use-filters-in-hybrid-search" class="common-anchor-header">하이브리드 검색에서 필터 사용<button data-href="#Use-filters-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>하이브리드 검색에서는 조건이 적용되어야 하는 위치에 StructArray 필터를 적용하십시오. 부모 엔티티 조건을 충족해야 하는 각 하위 요청에 해당 조건을 적용하십시오. <code translate="no">element_filter</code> 는 부모 엔티티 조건 적용 후, 요소 수준 제약 조건이 필요한 StructArray 요소 수준 요청에만 첨부하십시오.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>));

<span class="hljs-type">AnnSearchReq</span> <span class="hljs-variable">titleReq</span> <span class="hljs-operator">=</span> AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;title_vector&quot;</span>)
        .vectors(Collections.singletonList(queryVector))
        .limit(<span class="hljs-number">10</span>)
        .filter(<span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>)
        .build();

<span class="hljs-type">AnnSearchReq</span> <span class="hljs-variable">chunkReq</span> <span class="hljs-operator">=</span> AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .vectors(Collections.singletonList(queryVector))
        .limit(<span class="hljs-number">10</span>)
        .filter(<span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.hybridSearch(HybridSearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .searchRequests(Arrays.asList(titleReq, chunkReq))
        .ranker(RRFRanker.builder().k(<span class="hljs-number">60</span>).build())
        .limit(<span class="hljs-number">5</span>)
        .outFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

    milvusclient <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

queryVector := entity.FloatVector{<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>}

titleReq := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;title_vector&quot;</span>, <span class="hljs-number">10</span>, queryVector).
    WithFilter(<span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>)
chunkReq := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;chunks[emb]&quot;</span>, <span class="hljs-number">10</span>, queryVector).
    WithFilter(<span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>)

results, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-number">5</span>,
    titleReq, chunkReq).
    WithReranker(milvusclient.NewRRFReranker()).
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Printf(<span class="hljs-string">&quot;returned %d result sets\n&quot;</span>, <span class="hljs-built_in">len</span>(results))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.19f32</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">title_req</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;title_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector.<span class="hljs-title function_ invoke__">clone</span>()]))
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">chunk_req</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector]))
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = HybridSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
    .<span class="hljs-title function_ invoke__">sub_requests</span>(<span class="hljs-built_in">vec!</span>[title_req, chunk_req])
    .<span class="hljs-title function_ invoke__">rerank</span>(RRFRerank::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">k</span>(<span class="hljs-number">60</span>))
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>])
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">results</span> = client.<span class="hljs-title function_ invoke__">hybrid_search</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/request/dql/HybridSearchRequest.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/types/SubSearchRequest.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>};

<span class="hljs-keyword">auto</span> title_req = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;();
title_req-&gt;<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;title_vector&quot;</span>).<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>);
title_req-&gt;<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>);
title_req-&gt;<span class="hljs-built_in">AddFloatVector</span>(query_vector);

<span class="hljs-keyword">auto</span> chunk_req = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;();
chunk_req-&gt;<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>).<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>);
chunk_req-&gt;<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>);
chunk_req-&gt;<span class="hljs-built_in">AddFloatVector</span>(query_vector);

milvus::HybridSearchRequest request;
request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
       .<span class="hljs-built_in">AddSubRequest</span>(title_req)
       .<span class="hljs-built_in">AddSubRequest</span>(chunk_req)
       .<span class="hljs-built_in">WithRerank</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::RRFRerank&gt;(<span class="hljs-number">60</span>));
request.<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>});

milvus::HybridSearchResponse response;
status = client-&gt;<span class="hljs-built_in">HybridSearch</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: [
    { <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;title_vector&quot;</span>, <span class="hljs-attr">data</span>: [query_vector], <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">expr</span>: <span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span> },
    {
      <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
      <span class="hljs-attr">data</span>: query_vector,
      <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
      <span class="hljs-attr">expr</span>: <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>,
    },
  ],
  <span class="hljs-attr">rerank</span>: { <span class="hljs-attr">strategy</span>: <span class="hljs-string">&quot;rrf&quot;</span>, <span class="hljs-attr">params</span>: { <span class="hljs-attr">k</span>: <span class="hljs-number">60</span> } },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> queryVector = <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span> });

<span class="hljs-keyword">var</span> titleReq = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;title_vector&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { queryVector },
    Limit = <span class="hljs-number">10</span>,
    Expression = <span class="hljs-string">&quot;category == \&quot;search\&quot;&quot;</span>
};

<span class="hljs-keyword">var</span> chunkReq = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { queryVector },
    Limit = <span class="hljs-number">10</span>,
    Expression = <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>
};

<span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> client.HybridSearchAsync(<span class="hljs-keyword">new</span> HybridSearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    SearchRequests = <span class="hljs-keyword">new</span>[] { titleReq, chunkReq },
    Reranker = <span class="hljs-keyword">new</span> RrfReranker(<span class="hljs-number">60</span>),
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/hybrid_search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;search&quot;: [
        {
            &quot;data&quot;: [[0.19, 0.24, 0.30, 0.37]],
            &quot;annsField&quot;: &quot;title_vector&quot;,
            &quot;limit&quot;: 10,
            &quot;filter&quot;: &quot;category == \&quot;search\&quot;&quot;
        },
        {
            &quot;data&quot;: [[0.19, 0.24, 0.30, 0.37]],
            &quot;annsField&quot;: &quot;chunks[emb]&quot;,
            &quot;limit&quot;: 10,
            &quot;filter&quot;: &quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;
        }
    ],
    &quot;rerank&quot;: { &quot;strategy&quot;: &quot;rrf&quot;, &quot;params&quot;: { &quot;k&quot;: 60 } },
    &quot;limit&quot;: 5,
    &quot;outputFields&quot;: [&quot;doc_id&quot;, &quot;title&quot;, &quot;category&quot;, &quot;chunks[text]&quot;, &quot;chunks[section]&quot;, &quot;chunks[quality_score]&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>두 하위 요청 모두 ` <code translate="no">category == &quot;search&quot;</code>`를 적용합니다. ` <code translate="no">chunk_req</code> ` 표현식은 벡터 검색에 참여하는 Struct 요소에도 제약 조건을 적용합니다. 지원되는 하이브리드 검색 조합 및 버전별 제한 사항에 대해서는 <a href="/docs/ko/hybrid-search-with-structarray.md">‘StructArray를 사용한 하이브리드 검색’</a> 및 <a href="/docs/ko/structarray-limits.md">‘StructArray 제한</a> <a href="/docs/ko/hybrid-search-with-structarray.md">사항’을</a> 참조하십시오.</p>
<h2 id="Predicate-support-summary" class="common-anchor-header">술어 지원 요약<button data-href="#Predicate-support-summary" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 술어에서는 스칼라 하위 필드를 사용하십시오. 벡터 하위 필드는 스칼라 술어 입력으로 사용할 수 없습니다.</p>
<table>
<thead>
<tr><th>서브필드 유형</th><th>일반적인 술어 예시</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">$[has_code] == true</code>, <code translate="no">!($[has_code] == true)</code></td></tr>
<tr><td>정수형</td><td><code translate="no">$[page] &gt;= 2</code>, <code translate="no">$[page] in [1, 2, 3]</code></td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">$[quality_score] &gt; 0.9</code>, <code translate="no">0.7 &lt; $[quality_score] &lt; 0.95</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">$[section] == &quot;index&quot;</code>, <code translate="no">$[text] like &quot;range%&quot;</code></td></tr>
<tr><td>벡터 하위 필드</td><td><code translate="no">$[...]</code> 의 스칼라 술어 입력으로는 지원되지 않습니다. 대신 벡터 검색을 통해 벡터 하위 필드를 사용하십시오.</td></tr>
</tbody>
</table>
<p>JSON 경로, 배열 컨테이너 함수, 텍스트 일치 함수, ` <code translate="no">$[...]</code>`에 대한 null 술어, 기하학 함수, `Timestamptz` 표현식 및 제네릭 함수 호출과 같이 지원되지 않는 사례에 대해서는 <a href="/docs/ko/struct-array-operators.md">StructArray 연산자를</a> 참조하십시오.</p>
<h2 id="Common-mistakes" class="common-anchor-header">흔히 저지르는 실수<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p><code translate="no">element_filter</code> 이나 <code translate="no">MATCH_*</code> 외부에서 <code translate="no">$[subfield]</code> 를 사용하는 경우.</p></li>
<li><p><code translate="no">element_filter(chunks, $[section] == &quot;index&quot;)</code> 와 같은 StructArray 연산자 구문 대신 <code translate="no">chunks.section</code> 를 사용하는 경우.</p></li>
<li><p>행 수준 필터링만 필요한 경우 <code translate="no">element_filter</code> 를 사용하는 경우. 엔티티를 선택하기만 하면 되는 경우에는 대신 <code translate="no">MATCH_ANY</code> 를 사용하십시오.</p></li>
<li><p><code translate="no">MATCH_*</code> 가 요소 오프셋을 반환할 것이라고 기대하지 마십시오. 이 연산자들은 엔티티를 선택할 뿐, 그 자체로는 일치하는 단일 요소를 식별하지 않습니다.</p></li>
<li><p><code translate="no">$[has_code]</code> 와 같은 단순한 부울 술어를 작성하는 경우. <code translate="no">$[has_code] == true</code> 와 같은 명시적인 비교 연산자를 사용하십시오.</p></li>
<li><p>동일한 필터 표현식 내에서 최상위 술어 앞에 <code translate="no">element_filter</code> 를 배치하는 경우.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">다음 단계<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><p>StructArray 필터 구문의 전체 내용을 확인하려면 <a href="/docs/ko/struct-array-operators.md">StructArray 연산자를</a> 참조하십시오.</p></li>
<li><p>먼저 필터링되지 않은 벡터 검색을 실행하려면 <a href="/docs/ko/basic-vector-search-with-structarray.md">‘StructArray를 사용한 기본 벡터 검색’을</a> 참조하십시오.</p></li>
<li><p>자주 사용하는 StructArray 필터에 대한 스칼라 인덱스를 생성하려면 <a href="/docs/ko/index-structarray-fields.md">StructArray 필드 인덱싱을</a> 참조하십시오.</p></li>
<li><p>버전별 필터 및 검색 제한 사항을 확인하려면 <a href="/docs/ko/structarray-limits.md">‘StructArray 제한 사항’을</a> 참조하십시오.</p></li>
</ol>
