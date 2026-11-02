---
id: range-search-with-structarray.md
title: StructArray를 사용한 범위 검색
summary: >-
  이 페이지를 사용하여 StructArray 벡터 하위 필드에 대해 범위 검색을 실행할 수 있습니다. 범위 검색은 점수나 거리가 지정된 범위
  내에 속하는 벡터 일치 결과를 반환합니다. StructArray 필드의 경우, 각 Struct 요소를 독립적으로 검색하는 요소 수준 벡터
  검색과 함께 범위 검색을 사용하십시오.
---
<h1 id="Range-Search-with-StructArray" class="common-anchor-header">StructArray를 사용한 범위 검색<button data-href="#Range-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지를 사용하여 StructArray 벡터 하위 필드에 대해 범위 검색을 실행할 수 있습니다. 범위 검색은 점수나 거리가 지정된 경계 내에 속하는 벡터 일치 결과를 반환합니다. StructArray 필드의 경우, 각 Struct 요소를 독립적으로 검색하는 요소 수준 벡터 검색과 함께 범위 검색을 사용하십시오.</p>
<p>이 페이지에서는 <a href="/docs/ko/create-structarray-field.md">‘StructArray 필드 생성’의</a> <code translate="no">tech_articles</code> 컬렉션을 사용합니다. 이 컬렉션에는 <code translate="no">chunks</code> 라는 StructArray 필드가 있습니다. <code translate="no">chunks[emb]</code> 벡터 하위 필드는 <code translate="no">COSINE</code>, <code translate="no">IP</code> 또는 <code translate="no">L2</code> 와 같은 일반 벡터 메트릭을 사용하여 요소 수준 검색이 가능하도록 인덱싱되어 있습니다.</p>
<p>이 예제를 실행하기 전에 컬렉션을 생성하고, 예제 데이터를 삽입하며, 필요한 벡터 인덱스를 생성한 후 컬렉션을 로드하십시오. 여기에 표시된 필드에는 4차원 벡터를 사용하십시오. 각 코드 블록은 별도로 정의하지 않는 한, 동일한 언어의 이전 예제에서 사용된 연결 및 변수를 전제로 합니다.</p>
<h2 id="How-range-search-applies-to-StructArray" class="common-anchor-header">StructArray에 범위 검색이 적용되는 방식<button data-href="#How-range-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>검색 모드</th><th>범위 검색 동작</th><th>결과 세분화 수준</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList 검색</td><td>지원되지 않습니다.</td><td>해당 사항 없음.</td></tr>
<tr><td>요소 수준 검색</td><td><code translate="no">radius</code> 및 선택적으로 <code translate="no">range_filter</code> 을 사용하여 일반 벡터 쿼리를 사용하십시오.</td><td>구조체 요소 수준.</td></tr>
<tr><td>하이브리드 검색</td><td>StructArray 요청이 요소 수준 벡터 필드를 대상으로 할 때 지원됩니다. EmbeddingList 수준 요청은 범위 검색을 지원하지 않습니다.</td><td>요소 수준 하위 검색 후 하이브리드 재순위 지정.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>가장 가까운 Struct 요소만 필요한 경우, <a href="/docs/ko/basic-vector-search-with-structarray.md">StructArray를 사용한 기본 벡터 검색으로</a> 시작하십시오. 결과가 상위 K개 순위뿐만 아니라 점수 또는 거리 기준을 충족해야 하는 경우 범위 검색을 사용하십시오.</p>
</div>
<h2 id="Before-you-begin" class="common-anchor-header">시작하기 전에<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>범위 검색을 실행하기 전에 컬렉션, 데이터 및 인덱스를 준비하십시오.</p>
<table>
<thead>
<tr><th>요구 사항</th><th>세부 정보</th></tr>
</thead>
<tbody>
<tr><td>StructArray 필드</td><td>컬렉션에는 <code translate="no">chunks</code> 와 같은 StructArray 필드가 포함되어 있습니다.</td></tr>
<tr><td>요소 수준 벡터 하위 필드</td><td>대상 벡터 하위 필드는 <code translate="no">chunks[emb_list_vector]</code> 가 아니라 <code translate="no">chunks[emb]</code> 입니다.</td></tr>
<tr><td>인덱스 메트릭</td><td>벡터 하위 필드는 <code translate="no">COSINE</code>, <code translate="no">IP</code> 또는 <code translate="no">L2</code> 와 같은 일반 벡터 메트릭으로 인덱싱됩니다.</td></tr>
<tr><td>쿼리 데이터</td><td>쿼리는 <code translate="no">EmbeddingList</code> 가 아닌 일반 벡터입니다.</td></tr>
</tbody>
</table>
<p>인덱스 설정에 대해서는 <a href="/docs/ko/index-structarray-fields.md">StructArray 필드 인덱싱을</a> 참조하십시오.</p>
<h2 id="Use-radius-and-rangefilter" class="common-anchor-header">radius 및 range_filter 사용<button data-href="#Use-radius-and-rangefilter" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">radius</code> 를 설정하여 검색 경계를 정의합니다. 내부 경계도 필요한 경우 <code translate="no">range_filter</code> 를 설정하십시오. 방향은 더 짧은 거리가 더 좋은지, 아니면 더 높은 유사도 점수가 더 좋은지에 따라 달라집니다.</p>
<table>
<thead>
<tr><th>메트릭 유형</th><th>점수가 높을수록 좋은가요?</th><th><code translate="no">range_filter</code> 를 사용할 때의 범위 조건</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">L2</code></td><td>아니요. 거리가 더 짧을수록 좋습니다.</td><td><code translate="no">range_filter &lt;= distance &lt; radius</code></td></tr>
<tr><td><code translate="no">IP</code>, <code translate="no">COSINE</code></td><td>네. 점수가 클수록 좋습니다.</td><td><code translate="no">radius &lt; distance &lt;= range_filter</code></td></tr>
</tbody>
</table>
<p><code translate="no">radius</code> 만 설정된 경우, 범위 검색은 해당 메트릭의 외부 경계를 충족하는 히트를 반환합니다. 임베딩의 점수 또는 거리 척도에 따라 값을 선택하십시오.</p>
<h2 id="Run-element-level-range-search" class="common-anchor-header">요소 수준 범위 검색 실행<button data-href="#Run-element-level-range-search" class="anchor-icon" translate="no">
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
    </button></h2><p>이 예제에서는 <code translate="no">chunks[emb]</code> 에 대한 <code translate="no">COSINE</code> 인덱스와 4차원 쿼리 벡터를 사용합니다. 다음 예제는 <code translate="no">chunks[emb]</code> 벡터가 쿼리 벡터와 충분히 유사한 개별 청크를 검색합니다. 각 검색 결과는 일치하는 Struct 요소를 나타냅니다.</p>
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
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
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
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>});
Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;radius&quot;</span>, <span class="hljs-number">0.80</span>);
extraParams.put(<span class="hljs-string">&quot;range_filter&quot;</span>, <span class="hljs-number">0.95</span>);

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .annsField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .searchParams(extraParams)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
    <span class="hljs-keyword">return</span>
}

queryVector := entity.FloatVector{<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>}

annParam := index.NewCustomAnnParam()
annParam.WithRadius(<span class="hljs-number">0.80</span>)
annParam.WithRangeFilter(<span class="hljs-number">0.95</span>)

results, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-number">10</span>,
    []entity.Vector{queryVector},
).WithANNSField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>).
    WithAnnParam(annParam).
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector]))
            .<span class="hljs-title function_ invoke__">radius</span>(<span class="hljs-number">0.80</span>)
            .<span class="hljs-title function_ invoke__">range_filter</span>(<span class="hljs-number">0.95</span>)
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">for</span> <span class="hljs-variable">result</span> <span class="hljs-keyword">in</span> response.<span class="hljs-title function_ invoke__">results</span>() {
    <span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> result.<span class="hljs-title function_ invoke__">rows</span>()? {
        <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, row.<span class="hljs-title function_ invoke__">to_entity_row</span>()?);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
                   .<span class="hljs-built_in">WithFloatVectors</span>({{<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>}})
                   .<span class="hljs-built_in">WithRadius</span>(<span class="hljs-number">0.80</span>)
                   .<span class="hljs-built_in">WithRangeFilter</span>(<span class="hljs-number">0.95</span>)
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
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> queryVector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: queryVector,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">radius</span>: <span class="hljs-number">0.80</span>,
    <span class="hljs-attr">range_filter</span>: <span class="hljs-number">0.95</span>,
  },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [
    <span class="hljs-string">&quot;doc_id&quot;</span>,
    <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-string">&quot;chunks[text]&quot;</span>,
    <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    <span class="hljs-string">&quot;chunks[page]&quot;</span>,
    <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
  ],
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

SearchResp results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    Vectors = [queryVector],
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Radius = <span class="hljs-string">&quot;0.80&quot;</span>,
        RangeFilter = <span class="hljs-string">&quot;0.95&quot;</span>,
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;data&quot;: [
      [0.19, 0.24, 0.30, 0.37]
    ],
    &quot;annsField&quot;: &quot;chunks[emb]&quot;,
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [
      &quot;doc_id&quot;,
      &quot;title&quot;,
      &quot;chunks[text]&quot;,
      &quot;chunks[section]&quot;,
      &quot;chunks[page]&quot;,
      &quot;chunks[quality_score]&quot;
    ],
    &quot;searchParams&quot;: {
      &quot;params&quot;: {
        &quot;radius&quot;: 0.80,
        &quot;range_filter&quot;: 0.95
      }
    }
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 예제에서 <code translate="no">COSINE</code> 는 유사도 기반 메트릭이므로, 결과 범위는 <code translate="no">radius</code> 보다 크고 <code translate="no">range_filter</code> 이하입니다. 반환된 <code translate="no">offset</code> 값은 <code translate="no">chunks</code> 배열 내에서 일치하는 Struct 요소를 식별합니다.</p>
<h2 id="Add-scalar-filters" class="common-anchor-header">스칼라 필터 추가<button data-href="#Add-scalar-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>요소 수준 범위 검색을 StructArray 스칼라 필터링과 결합할 수 있습니다. 상위 엔티티 필드에는 최상위 술어를 사용하고, <code translate="no">element_filter</code> 를 사용하여 벡터 범위 검색에 포함될 Struct 요소를 제한하십시오.</p>
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
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">10</span>,
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
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>});
Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;radius&quot;</span>, <span class="hljs-number">0.80</span>);
extraParams.put(<span class="hljs-string">&quot;range_filter&quot;</span>, <span class="hljs-number">0.95</span>);

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .annsField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .searchParams(extraParams)
        .filter(<span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
    <span class="hljs-keyword">return</span>
}

queryVector := entity.FloatVector{<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>}

annParam := index.NewCustomAnnParam()
annParam.WithRadius(<span class="hljs-number">0.80</span>)
annParam.WithRangeFilter(<span class="hljs-number">0.95</span>)

filterExpr := <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>

results, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-number">10</span>,
    []entity.Vector{queryVector},
).WithANNSField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>).
    WithAnnParam(annParam).
    WithFilter(filterExpr).
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_expr</span> = <span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector]))
            .<span class="hljs-title function_ invoke__">radius</span>(<span class="hljs-number">0.80</span>)
            .<span class="hljs-title function_ invoke__">range_filter</span>(<span class="hljs-number">0.95</span>)
            .<span class="hljs-title function_ invoke__">filter</span>(filter_expr)
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
                   .<span class="hljs-built_in">WithFloatVectors</span>({{<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>}})
                   .<span class="hljs-built_in">WithRadius</span>(<span class="hljs-number">0.80</span>)
                   .<span class="hljs-built_in">WithRangeFilter</span>(<span class="hljs-number">0.95</span>)
                   .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;</span>)
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
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> queryVector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">const</span> filterExpr = <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>;

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: queryVector,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">radius</span>: <span class="hljs-number">0.80</span>,
    <span class="hljs-attr">range_filter</span>: <span class="hljs-number">0.95</span>,
  },
  <span class="hljs-attr">filter</span>: filterExpr,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [
    <span class="hljs-string">&quot;doc_id&quot;</span>,
    <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-string">&quot;category&quot;</span>,
    <span class="hljs-string">&quot;chunks[text]&quot;</span>,
    <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
  ],
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
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Radius = <span class="hljs-string">&quot;0.80&quot;</span>,
        RangeFilter = <span class="hljs-string">&quot;0.95&quot;</span>,
        Expression = filterExpr,
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;data&quot;: [
      [0.19, 0.24, 0.30, 0.37]
    ],
    &quot;annsField&quot;: &quot;chunks[emb]&quot;,
    &quot;filter&quot;: &quot;category == \&quot;search\&quot; &amp;&amp; element_filter(chunks, $[section] == \&quot;index\&quot; &amp;&amp; $[quality_score] &gt; 0.9)&quot;,
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [
      &quot;doc_id&quot;,
      &quot;title&quot;,
      &quot;category&quot;,
      &quot;chunks[text]&quot;,
      &quot;chunks[section]&quot;,
      &quot;chunks[quality_score]&quot;
    ],
    &quot;searchParams&quot;: {
      &quot;params&quot;: {
        &quot;radius&quot;: 0.80,
        &quot;range_filter&quot;: 0.95
      }
    }
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>최상위 술어는 후보 엔티티를 선택합니다. ` <code translate="no">element_filter</code> ` 술어는 벡터 범위 검색을 일치하는 Struct 요소로만 제한합니다. 더 많은 필터링 예제는 <a href="/docs/ko/filtered-search-with-structarray.md">StructArray를 사용한 필터링 검색을</a> 참조하십시오.</p>
<h2 id="Use-range-search-in-hybrid-search" class="common-anchor-header">하이브리드 검색에서 범위 검색 사용<button data-href="#Use-range-search-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 요소 수준 벡터 필드는 하이브리드 검색에서 범위 검색을 지원합니다. StructArray 요소 수준 벡터 필드를 대상으로 하는 <code translate="no">AnnSearchRequest</code> 에 ` <code translate="no">radius</code> ` 및 선택적으로 ` <code translate="no">range_filter</code> `를 추가하십시오.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, AnnSearchRequest, RRFRanker

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
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
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>});

<span class="hljs-type">AnnSearchReq</span> <span class="hljs-variable">titleReq</span> <span class="hljs-operator">=</span> AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;title_vector&quot;</span>)
        .vectors(Collections.singletonList(queryVector))
        .limit(<span class="hljs-number">10</span>)
        .build();

<span class="hljs-type">AnnSearchReq</span> <span class="hljs-variable">chunkReq</span> <span class="hljs-operator">=</span> AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .vectors(Collections.singletonList(queryVector))
        .params(<span class="hljs-string">&quot;{\&quot;radius\&quot;: 0.80, \&quot;range_filter\&quot;: 0.95}&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .filter(<span class="hljs-string">&quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.hybridSearch(HybridSearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .searchRequests(Arrays.asList(titleReq, chunkReq))
        .ranker(RRFRanker.builder().k(<span class="hljs-number">60</span>).build())
        .limit(<span class="hljs-number">5</span>)
        .outFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
    <span class="hljs-keyword">return</span>
}

queryVector := entity.FloatVector{<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>}

titleReq := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;title_vector&quot;</span>, <span class="hljs-number">10</span>, queryVector)

annParam := index.NewCustomAnnParam()
annParam.WithRadius(<span class="hljs-number">0.80</span>)
annParam.WithRangeFilter(<span class="hljs-number">0.95</span>)

chunkReq := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;chunks[emb]&quot;</span>, <span class="hljs-number">10</span>, queryVector)
chunkReq.WithAnnParam(annParam)
chunkReq.WithFilter(<span class="hljs-string">&quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;</span>)

results, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-number">5</span>,
    titleReq,
    chunkReq,
).WithReranker(milvusclient.NewRRFReranker()).
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">title_req</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;title_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector.<span class="hljs-title function_ invoke__">clone</span>()]))
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">chunk_req</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector]))
    .<span class="hljs-title function_ invoke__">radius</span>(<span class="hljs-number">0.80</span>)
    .<span class="hljs-title function_ invoke__">range_filter</span>(<span class="hljs-number">0.95</span>)
    .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;</span>)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">hybrid_search</span>(
        HybridSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
            .<span class="hljs-title function_ invoke__">sub_requests</span>(<span class="hljs-built_in">vec!</span>[title_req, chunk_req])
            .<span class="hljs-title function_ invoke__">rerank</span>(RRFRerank::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">k</span>(<span class="hljs-number">60</span>))
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
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
title_req-&gt;<span class="hljs-built_in">AddFloatVector</span>(query_vector);

<span class="hljs-keyword">auto</span> chunk_req = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;();
chunk_req-&gt;<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>).<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>);
chunk_req-&gt;<span class="hljs-built_in">SetRadius</span>(<span class="hljs-number">0.80</span>);
chunk_req-&gt;<span class="hljs-built_in">SetRangeFilter</span>(<span class="hljs-number">0.95</span>);
chunk_req-&gt;<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;</span>);
chunk_req-&gt;<span class="hljs-built_in">AddFloatVector</span>(query_vector);

milvus::HybridSearchRequest request;
request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
       .<span class="hljs-built_in">AddSubRequest</span>(title_req)
       .<span class="hljs-built_in">AddSubRequest</span>(chunk_req)
       .<span class="hljs-built_in">WithRerank</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::RRFRerank&gt;(<span class="hljs-number">60</span>));
request.<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>});

milvus::HybridSearchResponse response;
status = client-&gt;<span class="hljs-built_in">HybridSearch</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> queryVector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: [
    {
      <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;title_vector&quot;</span>,
      <span class="hljs-attr">data</span>: [queryVector],
      <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
    },
    {
      <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
      <span class="hljs-attr">data</span>: queryVector,
      <span class="hljs-attr">params</span>: { <span class="hljs-attr">radius</span>: <span class="hljs-number">0.80</span>, <span class="hljs-attr">range_filter</span>: <span class="hljs-number">0.95</span> },
      <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
      <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
    },
  ],
  <span class="hljs-attr">rerank</span>: { <span class="hljs-attr">strategy</span>: <span class="hljs-string">&quot;rrf&quot;</span>, <span class="hljs-attr">params</span>: { <span class="hljs-attr">k</span>: <span class="hljs-number">60</span> } },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">output_fields</span>: [
    <span class="hljs-string">&quot;doc_id&quot;</span>,
    <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-string">&quot;chunks[text]&quot;</span>,
    <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
  ],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-built_in">float</span>[] queryVector = [<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>];

AnnSearchReq titleReq = <span class="hljs-keyword">new</span>()
{
    VectorFieldName = <span class="hljs-string">&quot;title_vector&quot;</span>,
    Vectors = [queryVector],
    Limit = <span class="hljs-number">10</span>
};

AnnSearchReq chunkReq = <span class="hljs-keyword">new</span>()
{
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    Vectors = [queryVector],
    Radius = <span class="hljs-string">&quot;0.80&quot;</span>,
    RangeFilter = <span class="hljs-string">&quot;0.95&quot;</span>,
    Expression = <span class="hljs-string">&quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;</span>,
    Limit = <span class="hljs-number">10</span>
};

SearchResp results = <span class="hljs-keyword">await</span> client.HybridSearchAsync(<span class="hljs-keyword">new</span> HybridSearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    SearchRequests = [titleReq, chunkReq],
    Reranker = <span class="hljs-keyword">new</span> RrfReranker(),
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/hybrid_search&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;search&quot;: [
      {
        &quot;data&quot;: [[0.19, 0.24, 0.30, 0.37]],
        &quot;annsField&quot;: &quot;title_vector&quot;,
        &quot;limit&quot;: 10
      },
      {
        &quot;data&quot;: [[0.19, 0.24, 0.30, 0.37]],
        &quot;annsField&quot;: &quot;chunks[emb]&quot;,
        &quot;limit&quot;: 10,
        &quot;params&quot;: {
          &quot;radius&quot;: 0.80,
          &quot;range_filter&quot;: 0.95
        },
        &quot;filter&quot;: &quot;element_filter(chunks, $[section] == \&quot;index\&quot;)&quot;
      }
    ],
    &quot;rerank&quot;: { &quot;strategy&quot;: &quot;rrf&quot;, &quot;params&quot;: { &quot;k&quot;: 60 } },
    &quot;limit&quot;: 5,
    &quot;outputFields&quot;: [
      &quot;doc_id&quot;,
      &quot;title&quot;,
      &quot;chunks[text]&quot;,
      &quot;chunks[section]&quot;,
      &quot;chunks[quality_score]&quot;
    ]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 예제에서는 <code translate="no">chunks[emb]</code> 하위 요청에서만 범위 검색 매개변수가 사용됩니다. StructArray 요청은 여전히 요소 수준 의미론을 따릅니다. 즉, 범위 경계는 하이브리드 검색이 결과를 결합하고 재순위를 매기기 전에 Struct 요소 검색 결과에 적용됩니다.</p>
<h2 id="Interpret-range-results" class="common-anchor-header">범위 결과 해석<button data-href="#Interpret-range-results" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 표는 독립적인 요소 수준 범위 검색을 설명합니다. 위의 혼합 하이브리드 예제에서는 재순위 지정 전에 요소 일치 결과가 상위 엔티티로 통합되므로, 최종 결과는 엔티티 수준이며 요소 오프셋을 유지하지 않습니다.</p>
<table>
<thead>
<tr><th>결과 항목</th><th>의미</th></tr>
</thead>
<tbody>
<tr><td>기본 키(이 예시에서는<code translate="no">doc_id</code> )</td><td>일치하는 Struct 요소를 포함하는 엔티티의 기본 키.</td></tr>
<tr><td><code translate="no">distance</code> 또는 점수</td><td>쿼리 벡터와 일치하는 Struct 요소 벡터 간의 점수 또는 거리입니다.</td></tr>
<tr><td><code translate="no">offset</code></td><td>반환 시 StructArray 필드에서 일치하는 Struct 요소의 0을 기준으로 한 위치.</td></tr>
<tr><td>반복되는 기본 키</td><td>가능합니다. 동일한 엔티티 내의 두 개 이상의 Struct 요소가 지정된 범위에 포함될 수 있습니다.</td></tr>
<tr><td><code translate="no">limit</code></td><td>고유한 상위 엔티티가 아닌 요소 일치에 적용됩니다.</td></tr>
</tbody>
</table>
<h2 id="Limitations" class="common-anchor-header">제한 사항<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li><p>StructArray 벡터 하위 필드에 대한 범위 검색에는 <code translate="no">EmbeddingList</code> 쿼리나 <code translate="no">MAX_SIM*</code> 메트릭을 사용하지 마십시오. EmbeddingList 수준 검색은 범위 검색을 지원하지 않습니다.</p></li>
<li><p>범위 검색을 그룹화 검색과 결합하지 마십시오. 부모 엔티티당 하나의 결과가 필요한 경우, 범위 매개변수 없이 요소 수준 검색을 실행하고 지원되는 경우 그룹화를 사용하십시오.</p></li>
<li><p>StructArray 요소 수준 벡터 필드에 대해서는 하이브리드 범위 검색이 지원됩니다. EmbeddingList 수준 StructArray 요청의 경우 지원되지 않습니다.</p></li>
</ul>
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
<li><p><code translate="no">chunks[emb_list_vector]</code> 에 대해 범위 검색을 실행하는 경우. 이 메트릭은 EmbeddingList 검색용으로 설계되었습니다.</p></li>
<li><p>요소 수준 범위 검색을 위해 <code translate="no">COSINE</code> 와 같은 일반 메트릭 대신 <code translate="no">MAX_SIM_COSINE</code> 를 사용하는 경우.</p></li>
<li><p>일반 벡터 쿼리 대신 <code translate="no">EmbeddingList</code> 쿼리를 사용하는 경우.</p></li>
<li><p>범위 검색 결과가 부모 엔티티별로 고유할 것이라고 가정하는 경우. 범위 검색은 일치하는 Struct 요소 히트를 반환합니다.</p></li>
<li><p>필수 하위 필드 경로 구문인 <code translate="no">chunks[emb]</code> 대신 <code translate="no">chunks.emb</code> 을 사용하는 경우.</p></li>
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
<li><p>두 가지 기본 StructArray 벡터 검색 모드를 알아보려면 <a href="/docs/ko/basic-vector-search-with-structarray.md">‘StructArray를 사용한 기본 벡터 검색’을</a> 참조하십시오.</p></li>
<li><p>범위 검색에 스칼라 필터를 추가하려면 <a href="/docs/ko/filtered-search-with-structarray.md">'StructArray를 사용한 필터링 검색'을</a> 참조하십시오.</p></li>
<li><p>지원되는 경우 상위 엔티티당 최대 하나의 결과만 반환하려면 <a href="/docs/ko/grouping-search-with-structarray.md">‘StructArray를 사용한 그룹화 검색’을</a> 참조하십시오.</p></li>
<li><p>버전별 검색 제한 사항을 확인하려면 <a href="/docs/ko/structarray-limits.md">‘StructArray 제한 사항’을</a> 참조하십시오.</p></li>
</ol>
