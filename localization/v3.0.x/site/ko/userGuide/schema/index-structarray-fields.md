---
id: index-structarray-fields.md
title: StructArray 필드 인덱싱
summary: >-
  벡터 검색을 실행하거나 스칼라 필터링 속도를 높이기 전에 StructArray의 하위 필드에 인덱스를 생성하십시오. StructArray
  필드의 경우, 인덱스 대상은 chunks[emb_list_vector], chunks[emb] 또는 chunks[section]과 같은 하위
  필드 경로입니다.
---
<h1 id="Index-StructArray-Fields" class="common-anchor-header">StructArray 필드 인덱싱<button data-href="#Index-StructArray-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>벡터 검색을 실행하거나 스칼라 필터링 속도를 높이기 전에 StructArray 하위 필드에 인덱스를 생성하십시오. StructArray 필드의 경우 인덱스 대상은 <code translate="no">chunks[emb_list_vector]</code>, <code translate="no">chunks[emb]</code> 또는 <code translate="no">chunks[section]</code> 와 같은 하위 필드 경로입니다.</p>
<p>이 페이지에서는 <a href="/docs/ko/create-structarray-field.md">‘StructArray 필드 생성’의</a> <code translate="no">tech_articles</code> 컬렉션을 사용합니다. <code translate="no">chunks</code> StructArray 필드에는 필터링용 스칼라 하위 필드와 검색용 벡터 하위 필드가 포함되어 있습니다.</p>
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
    </button></h2><p>컬렉션 스키마에 이미 <code translate="no">chunks</code> StructArray 필드가 포함되어 있는지 확인하십시오. 선택한 언어에 맞는 <a href="/docs/ko/create-structarray-field.md">‘StructArray 필드 생성’에서</a> 초기화된 클라이언트를 재사용하십시오(Go의 경우<code translate="no">cli</code> 및 <code translate="no">ctx</code>, 다른 SDK의 경우 <code translate="no">client</code> ). 데이터를 삽입하기 전에 인덱스를 생성할 수 있습니다.</p>
<table>
<thead>
<tr><th>서브필드 경로</th><th>유형</th><th>인덱스 용도</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">MAX_SIM*</code> 메트릭을 사용한 EmbeddingList 검색.</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>일반 벡터 메트릭을 사용한 요소 수준 검색.</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td><code translate="no">VARCHAR</code></td><td>범주형 필터링.</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td><code translate="no">FLOAT</code></td><td>숫자 필터링 및 범위형 술어.</td></tr>
<tr><td><code translate="no">chunks[has_code]</code></td><td><code translate="no">BOOL</code></td><td>부울 필터링.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>벡터 필드 또는 벡터 하위 필드는 하나의 인덱스만 허용합니다. EmbeddingList 검색과 요소 수준 검색이 모두 필요한 경우, 두 개의 별도 벡터 하위 필드를 생성하고 각각에 대해 별도로 인덱싱하십시오. 이 페이지에서는 EmbeddingList 검색을 위해 <code translate="no">chunks[emb_list_vector]</code> 에 인덱싱하고, 요소 수준 검색을 위해 <code translate="no">chunks[emb]</code> 에 인덱싱합니다.</p>
</div>
<h2 id="Choose-indexes" class="common-anchor-header">인덱스 선택<button data-href="#Choose-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>검색 모드를 사용하여 벡터 메트릭 계열을 선택하십시오.</p>
<table>
<thead>
<tr><th>검색 또는 필터링 목표</th><th>대상 경로</th><th>선택 사항</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList 검색</td><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">MAX_SIM*</code> 메트릭 패밀리.</td></tr>
<tr><td>요소 수준 벡터 검색</td><td><code translate="no">chunks[emb]</code></td><td><code translate="no">COSINE</code>, <code translate="no">IP</code> 또는 <code translate="no">L2</code> 과 같은 일반 벡터 메트릭 계열입니다.</td></tr>
<tr><td>문자열 또는 범주별로 필터링</td><td><code translate="no">chunks[section]</code></td><td>대상에서 지원하는 스칼라 인덱스입니다.</td></tr>
<tr><td>숫자 범위별로 필터링</td><td><code translate="no">chunks[quality_score]</code>, <code translate="no">chunks[page]</code></td><td>대상에서 지원하는 스칼라 인덱스.</td></tr>
<tr><td>부울 값으로 필터링</td><td><code translate="no">chunks[has_code]</code></td><td>대상에서 지원하는 스칼라 인덱스입니다.</td></tr>
</tbody>
</table>
<p>EmbeddingList 검색은 StructArray 벡터 하위 필드의 벡터들을 임베딩 목록으로 취급하여 엔티티 수준의 결과를 반환합니다. 요소 수준 검색은 각 Struct 요소를 독립적으로 검색하며, 일치하는 요소의 오프셋을 반환할 수 있습니다.</p>
<h2 id="Create-vector-indexes" class="common-anchor-header">벡터 인덱스 생성<button data-href="#Create-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 예제는 두 개의 벡터 인덱스를 생성합니다. 첫 번째 인덱스는 EmbeddingList 검색을 위해 <code translate="no">MAX_SIM*</code> 메트릭을 사용합니다. 두 번째 인덱스는 요소 수준 검색을 위해 일반 벡터 메트릭을 사용합니다.</p>
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
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

<span class="hljs-comment"># Index for EmbeddingList search.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>,
    },
)

<span class="hljs-comment"># Index for element-level search.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>,
    },
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Map;

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
                        .indexType(IndexParam.IndexType.HNSW)
                        .metricType(IndexParam.MetricType.MAX_SIM_COSINE)
                        .indexName(<span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>)
                        .extraParams(Map.of(<span class="hljs-string">&quot;M&quot;</span>, <span class="hljs-number">16</span>, <span class="hljs-string">&quot;efConstruction&quot;</span>, <span class="hljs-number">200</span>))
                        .build(),
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
                        .indexType(IndexParam.IndexType.HNSW)
                        .metricType(IndexParam.MetricType.COSINE)
                        .indexName(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>)
                        .extraParams(Map.of(<span class="hljs-string">&quot;M&quot;</span>, <span class="hljs-number">16</span>, <span class="hljs-string">&quot;efConstruction&quot;</span>, <span class="hljs-number">200</span>))
                        .build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>, index.NewHNSWIndex(entity.MaxSimCosine, <span class="hljs-number">16</span>, <span class="hljs-number">200</span>)).WithIndexName(<span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[emb]&quot;</span>, index.NewHNSWIndex(entity.COSINE, <span class="hljs-number">16</span>, <span class="hljs-number">200</span>)).WithIndexName(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_params</span>(<span class="hljs-built_in">vec!</span>[
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Hnsw)
                .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::MaxSimCosine)
                .<span class="hljs-title function_ invoke__">extra_params</span>(std::collections::HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;M&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;16&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()), (<span class="hljs-string">&quot;efConstruction&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;200&quot;</span>.<span class="hljs-title function_ invoke__">into</span>())])),
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Hnsw)
                .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Cosine)
                .<span class="hljs-title function_ invoke__">extra_params</span>(std::collections::HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;M&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;16&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()), (<span class="hljs-string">&quot;efConstruction&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;200&quot;</span>.<span class="hljs-title function_ invoke__">into</span>())])),
        ])
        .<span class="hljs-title function_ invoke__">build</span>()?;
client.<span class="hljs-title function_ invoke__">create_index</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">emb_list_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>, <span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>,
    milvus::IndexType::HNSW, milvus::MetricType::MAX_SIM_COSINE)</span></span>;
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">emb_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[emb]&quot;</span>, <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
    milvus::IndexType::HNSW, milvus::MetricType::COSINE)</span></span>;

emb_list_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;M&quot;</span>, <span class="hljs-string">&quot;16&quot;</span>);
emb_list_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;efConstruction&quot;</span>, <span class="hljs-string">&quot;200&quot;</span>);
emb_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;M&quot;</span>, <span class="hljs-string">&quot;16&quot;</span>);
emb_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;efConstruction&quot;</span>, <span class="hljs-string">&quot;200&quot;</span>);

milvus::CreateIndexRequest vector_request;
vector_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>);
vector_request.<span class="hljs-built_in">WithIndexes</span>({emb_list_index, emb_index});

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(vector_request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;HNSW&quot;</span>,
  <span class="hljs-attr">params</span>: { <span class="hljs-attr">M</span>: <span class="hljs-number">16</span>, <span class="hljs-attr">efConstruction</span>: <span class="hljs-number">200</span> },
  <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;HNSW&quot;</span>,
  <span class="hljs-attr">params</span>: { <span class="hljs-attr">M</span>: <span class="hljs-number">16</span>, <span class="hljs-attr">efConstruction</span>: <span class="hljs-number">200</span> },
  <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    Indexes = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>, <span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>, IndexType.Hnsw, MetricType.MaxSimCosine) { ExtraParams = { [<span class="hljs-string">&quot;M&quot;</span>] = <span class="hljs-number">16</span>, [<span class="hljs-string">&quot;efConstruction&quot;</span>] = <span class="hljs-number">200</span> } },
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[emb]&quot;</span>, <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>, IndexType.Hnsw, MetricType.Cosine) { ExtraParams = { [<span class="hljs-string">&quot;M&quot;</span>] = <span class="hljs-number">16</span>, [<span class="hljs-string">&quot;efConstruction&quot;</span>] = <span class="hljs-number">200</span> } }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;chunks[emb_list_vector]&quot;,
            &quot;indexName&quot;: &quot;chunks_emb_list_max_sim&quot;,
            &quot;metricType&quot;: &quot;MAX_SIM_COSINE&quot;,
            &quot;params&quot;: { &quot;index_type&quot;: &quot;HNSW&quot;, &quot;M&quot;: &quot;16&quot;, &quot;efConstruction&quot;: &quot;200&quot; }
        },
        {
            &quot;fieldName&quot;: &quot;chunks[emb]&quot;,
            &quot;indexName&quot;: &quot;chunks_emb_cosine&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;params&quot;: { &quot;index_type&quot;: &quot;HNSW&quot;, &quot;M&quot;: &quot;16&quot;, &quot;efConstruction&quot;: &quot;200&quot; }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>경고
동일한 벡터 서브필드에 <code translate="no">MAX_SIM*</code> 인덱스와 일반 벡터 메트릭 인덱스를 함께 생성하지 마십시오. 두 검색 모드 모두 필요한 경우, 벡터를 두 개의 별도 벡터 서브필드에 저장하고 각 서브필드에 대해 하나의 인덱스를 생성하십시오.</p>
</div>
<h2 id="Create-scalar-indexes" class="common-anchor-header">스칼라 인덱스 생성<button data-href="#Create-scalar-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>필터에서 StructArray 스칼라 서브필드를 사용할 때는 해당 서브필드에 스칼라 인덱스를 생성하십시오. <code translate="no">structArray[subfield]</code> 경로 구문을 동일하게 사용하십시오.</p>
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
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[section]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_section_inverted&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[page]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_page_sort&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Arrays;

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[section]&quot;</span>).indexType(IndexParam.IndexType.INVERTED)
                        .indexName(<span class="hljs-string">&quot;chunks_section_inverted&quot;</span>).build(),
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[has_code]&quot;</span>).indexType(IndexParam.IndexType.INVERTED)
                        .indexName(<span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>).build(),
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>).indexType(IndexParam.IndexType.STL_SORT)
                        .indexName(<span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>).build(),
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[page]&quot;</span>).indexType(IndexParam.IndexType.STL_SORT)
                        .indexName(<span class="hljs-string">&quot;chunks_page_sort&quot;</span>).build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, index.NewInvertedIndex()).WithIndexName(<span class="hljs-string">&quot;chunks_section_inverted&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[has_code]&quot;</span>, index.NewInvertedIndex()).WithIndexName(<span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, index.NewSortedIndex()).WithIndexName(<span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, index.NewSortedIndex()).WithIndexName(<span class="hljs-string">&quot;chunks_page_sort&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_params</span>(<span class="hljs-built_in">vec!</span>[
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[section]&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_section_inverted&quot;</span>).<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Inverted),
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[has_code]&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>).<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Inverted),
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>).<span class="hljs-title function_ invoke__">index_type</span>(IndexType::StlSort),
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[page]&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_page_sort&quot;</span>).<span class="hljs-title function_ invoke__">index_type</span>(IndexType::StlSort),
        ])
        .<span class="hljs-title function_ invoke__">build</span>()?;
client.<span class="hljs-title function_ invoke__">create_index</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">section_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks_section_inverted&quot;</span>,
    milvus::IndexType::INVERTED)</span></span>;
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">has_code_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[has_code]&quot;</span>, <span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>,
    milvus::IndexType::INVERTED)</span></span>;
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">quality_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>,
    milvus::IndexType::STL_SORT)</span></span>;
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">page_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks_page_sort&quot;</span>,
    milvus::IndexType::STL_SORT)</span></span>;

milvus::CreateIndexRequest scalar_request;
scalar_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>);
scalar_request.<span class="hljs-built_in">WithIndexes</span>({section_index, has_code_index, quality_index, page_index});

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(scalar_request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[section]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_section_inverted&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;STL_SORT&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[page]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_page_sort&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;STL_SORT&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    Indexes = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks_section_inverted&quot;</span>, IndexType.Inverted),
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[has_code]&quot;</span>, <span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>, IndexType.Inverted),
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>, IndexType.StlSort),
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks_page_sort&quot;</span>, IndexType.StlSort)
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;indexParams&quot;: [
        { &quot;fieldName&quot;: &quot;chunks[section]&quot;, &quot;indexName&quot;: &quot;chunks_section_inverted&quot;, &quot;params&quot;: { &quot;index_type&quot;: &quot;INVERTED&quot; } },
        { &quot;fieldName&quot;: &quot;chunks[has_code]&quot;, &quot;indexName&quot;: &quot;chunks_has_code_inverted&quot;, &quot;params&quot;: { &quot;index_type&quot;: &quot;INVERTED&quot; } },
        { &quot;fieldName&quot;: &quot;chunks[quality_score]&quot;, &quot;indexName&quot;: &quot;chunks_quality_score_sort&quot;, &quot;params&quot;: { &quot;index_type&quot;: &quot;STL_SORT&quot; } },
        { &quot;fieldName&quot;: &quot;chunks[page]&quot;, &quot;indexName&quot;: &quot;chunks_page_sort&quot;, &quot;params&quot;: { &quot;index_type&quot;: &quot;STL_SORT&quot; } }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>스칼라 인덱스는 선택 사항이지만, <code translate="no">element_filter(chunks, $[quality_score] &gt; 0.9)</code> 또는 <code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code> 와 같이 필터에 StructArray 스칼라 하위 필드가 자주 등장하는 경우 유용합니다.</p>
<h2 id="Applicable-metric-types" class="common-anchor-header">적용 가능한 메트릭 유형<button data-href="#Applicable-metric-types" class="anchor-icon" translate="no">
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
    </button></h2><p>EmbeddingList 검색의 경우, 벡터별 비교에 해당하는 <code translate="no">MAX_SIM*</code> 메트릭을 선택하십시오: 밀집 벡터의 경우 <code translate="no">MAX_SIM_COSINE</code> ( <code translate="no">MAX_SIM</code> 라고도 함), <code translate="no">MAX_SIM_IP</code> 또는 <code translate="no">MAX_SIM_L2</code>, 이진 벡터의 경우 <code translate="no">MAX_SIM_HAMMING</code> 또는 <code translate="no">MAX_SIM_JACCARD</code>. 이러한 메트릭은 임베딩 목록을 비교하여 엔티티 수준의 결과를 반환합니다. 요소 수준 검색의 경우, 아래에 나열된 해당 일반 메트릭을 사용하십시오.</p>
<h2 id="Index-metric-compatibility" class="common-anchor-header">인덱스 메트릭 호환성<button data-href="#Index-metric-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 표를 참조하여 StructArray 벡터 하위 필드에 사용할 인덱스 유형과 메트릭 유형을 선택하십시오. 대상부터 시작하여 검색 모드에 따라 메트릭 계열을 선택하십시오.</p>
<p>다음 호환성 표에서 Milvus 인덱스 유형과 메트릭 유형을 선택하십시오.</p>
<h3 id="EmbeddingList-search" class="common-anchor-header">EmbeddingList 검색<button data-href="#EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h3><p>EmbeddingList 검색은 <code translate="no">MAX_SIM*</code> 메트릭을 사용합니다. 이 검색은 StructArray 벡터 하위 필드의 벡터를 임베딩 목록으로 처리하며 엔티티 수준의 결과를 반환합니다.</p>
<table>
<thead>
<tr><th>벡터 하위 필드 데이터 유형</th><th>인덱스 유형</th><th>메트릭 유형</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">FLOAT_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code>, <code translate="no">BFLOAT16_VECTOR</code></td><td><code translate="no">IVF_FLAT</code>, <code translate="no">IVF_FLAT_CC</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code>, <code translate="no">DISKANN</code></td><td><code translate="no">MAX_SIM</code>, <code translate="no">MAX_SIM_COSINE</code>, <code translate="no">MAX_SIM_IP</code>, <code translate="no">MAX_SIM_L2</code></td></tr>
<tr><td><code translate="no">INT8_VECTOR</code></td><td><code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code></td><td><code translate="no">MAX_SIM</code>, <code translate="no">MAX_SIM_COSINE</code>, <code translate="no">MAX_SIM_IP</code>, <code translate="no">MAX_SIM_L2</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HNSW</code></td><td><code translate="no">MAX_SIM_HAMMING</code>, <code translate="no">MAX_SIM_JACCARD</code></td></tr>
</tbody>
</table>
<h3 id="Element-level-search" class="common-anchor-header">요소 수준 검색<button data-href="#Element-level-search" class="anchor-icon" translate="no">
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
    </button></h3><p>요소 수준 검색은 일반적인 벡터 메트릭을 사용합니다. 각 Struct 요소를 독립적으로 검색하며, 일치하는 요소의 오프셋을 반환할 수 있습니다.</p>
<table>
<thead>
<tr><th>벡터 서브필드 데이터 유형</th><th>인덱스 유형</th><th>메트릭 유형</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">FLOAT_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code>, <code translate="no">BFLOAT16_VECTOR</code></td><td><code translate="no">FLAT</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_FLAT_CC</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">IVF_SQ_CC</code>, <code translate="no">IVF_PQ</code>, <code translate="no">SCANN</code>, <code translate="no">IVF_RABITQ</code>, <code translate="no">IVF_RABITQ_FASTSCAN</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code>, <code translate="no">DISKANN</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td></tr>
<tr><td><code translate="no">INT8_VECTOR</code></td><td><code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HNSW</code></td><td><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">BIN_FLAT</code></td><td><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code>, <code translate="no">SUBSTRUCTURE</code>, <code translate="no">SUPERSTRUCTURE</code>, <code translate="no">MHJACCARD</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">BIN_IVF_FLAT</code></td><td><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></td></tr>
</tbody>
</table>
<p>버전별 지원 사항 및 기타 제한 사항에 대해서는 <a href="/docs/ko/structarray-limits.md">StructArray 제한 사항을</a> 참조하십시오.</p>
<h2 id="Verify-indexes" class="common-anchor-header">인덱스 확인<button data-href="#Verify-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>인덱스를 생성한 후, 컬렉션 또는 목록 인덱스를 확인하여 예상된 하위 필드 경로가 인덱싱되었는지 확인하십시오.</p>
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
<pre><code translate="no" class="language-python">indexes = client.list_indexes(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
)

<span class="hljs-built_in">print</span>(indexes)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.ListIndexesReq;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;String&gt; indexes = client.listIndexes(ListIndexesReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .build());
System.out.println(indexes);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

indexes, err := cli.ListIndexes(ctx, milvusclient.NewListIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Println(indexes)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = client.<span class="hljs-title function_ invoke__">list_indexes</span>(ListIndexesRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>).<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, resp.<span class="hljs-title function_ invoke__">index_names</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

milvus::ListIndexesResponse list_resp;
status = client-&gt;<span class="hljs-built_in">ListIndexes</span>(milvus::<span class="hljs-built_in">ListIndexesRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>),
                            list_resp);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; name : list_resp.<span class="hljs-built_in">IndexNames</span>()) {
    std::cout &lt;&lt; name &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexes = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listIndexes</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(indexes);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;

<span class="hljs-keyword">var</span> indexes = <span class="hljs-keyword">await</span> client.ListIndexesAsync(<span class="hljs-keyword">new</span> ListIndexesReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>
});
Console.WriteLine(<span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, indexes.IndexNames));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/list&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>위에서 벡터 인덱스와 스칼라 인덱스를 모두 생성한 후, 목록 응답에는 순서에 관계없이 다음 이름들이 포함되어야 합니다. 형식은 SDK에 따라 다릅니다:</p>
<pre><code translate="no" class="language-plaintext">chunks_emb_list_max_sim
chunks_emb_cosine
chunks_section_inverted
chunks_has_code_inverted
chunks_quality_score_sort
chunks_page_sort
<button class="copy-code-btn"></button></code></pre>
<p>위에서 생성한 ` <code translate="no">chunks_emb_cosine</code> ` 인덱스를 조회하여 대상 필드와 구성을 확인하십시오. 응답 구조와 출력 형식은 SDK에 따라 다릅니다.</p>
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
<pre><code translate="no" class="language-python">index = client.describe_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
)

<span class="hljs-built_in">print</span>(index)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DescribeIndexReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.response.DescribeIndexResp;

<span class="hljs-type">DescribeIndexResp</span> <span class="hljs-variable">index</span> <span class="hljs-operator">=</span> client.describeIndex(DescribeIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .indexName(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>)
        .build());
System.out.println(index);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

indexDesc, err := cli.DescribeIndex(ctx, milvusclient.NewDescribeIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Println(indexDesc.IndexType())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = client.<span class="hljs-title function_ invoke__">describe_index</span>(DescribeIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>).<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;
<span class="hljs-keyword">for</span> <span class="hljs-variable">description</span> <span class="hljs-keyword">in</span> resp.<span class="hljs-title function_ invoke__">indexes</span>() {
    <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, description);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

milvus::DescribeIndexResponse desc_resp;
status = client-&gt;<span class="hljs-built_in">DescribeIndex</span>(milvus::<span class="hljs-built_in">DescribeIndexRequest</span>()
                                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                   .<span class="hljs-built_in">WithIndexName</span>(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>),
                               desc_resp);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; desc : desc_resp.<span class="hljs-built_in">Descs</span>()) {
    std::cout &lt;&lt; desc.<span class="hljs-built_in">FieldName</span>() &lt;&lt; <span class="hljs-string">&quot;: &quot;</span> &lt;&lt; desc.<span class="hljs-built_in">IndexName</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(index);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;

<span class="hljs-keyword">var</span> index = <span class="hljs-keyword">await</span> client.DescribeIndexAsync(<span class="hljs-keyword">new</span> DescribeIndexReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    IndexName = <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>
});
<span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">var</span> description <span class="hljs-keyword">in</span> index.Indexes)
{
    Console.WriteLine(<span class="hljs-string">$&quot;<span class="hljs-subst">{description.FieldName}</span>: <span class="hljs-subst">{description.IndexName}</span>&quot;</span>);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;indexName&quot;: &quot;chunks_emb_cosine&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>목록 응답에는 인덱스 이름이 포함되어 있으며, describe 응답은 <code translate="no">chunks[emb]</code> 및 인덱스 구성을 식별합니다. 사용하기 전에 응답이나 상태를 확인하여 오류가 없는지 점검하십시오.</p>
<h2 id="Index-rules" class="common-anchor-header">인덱스 규칙<button data-href="#Index-rules" class="anchor-icon" translate="no">
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
<tr><th>규칙</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td>서브필드 인덱스에는 경로 구문을 사용하십시오.</td><td><code translate="no">emb</code> 이나 <code translate="no">chunks.emb</code> 이 아닌 <code translate="no">chunks[emb]</code> 을 인덱싱하십시오.</td></tr>
<tr><td>하나의 벡터 하위 필드에는 하나의 인덱스만 사용할 수 있습니다.</td><td>서로 다른 메트릭 계열이 필요한 경우 별도의 벡터 서브필드를 사용하십시오.</td></tr>
<tr><td>EmbeddingList 검색에는 <code translate="no">MAX_SIM*</code> 메트릭을 사용하십시오.</td><td>EmbeddingList 쿼리 데이터에는 <code translate="no">MAX_SIM*</code> 메트릭으로 구축된 인덱스가 필요합니다.</td></tr>
<tr><td>요소 수준 검색에는 일반 벡터 메트릭을 사용하십시오.</td><td>요소 수준 검색은 일반 벡터 쿼리 데이터와 <code translate="no">COSINE</code>, <code translate="no">IP</code> 또는 <code translate="no">L2</code> 와 같은 메트릭을 사용합니다.</td></tr>
<tr><td>필터에 나타나는 스칼라 하위 필드를 인덱싱하십시오.</td><td>대상에서 지원하는 스칼라 인덱스 유형을 사용하십시오.</td></tr>
<tr><td>벡터 필드 제한 사항을 염두에 두십시오.</td><td>벡터 필드와 벡터 하위 필드의 총 개수에는 제한이 있습니다. 벡터 하위 필드를 많이 추가하기 전에 StructArray 제한 사항을 참조하십시오.</td></tr>
</tbody>
</table>
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
<li><p><code translate="no">chunks[emb]</code> 대신 <code translate="no">chunks.emb</code> 에 인덱스를 생성하는 경우.</p></li>
<li><p><code translate="no">MAX_SIM*</code> 인덱스만 생성한 후, 동일한 서브필드에서 요소 수준 검색을 실행하려고 시도하는 경우.</p></li>
<li><p>일반 벡터 인덱스만 생성한 후, 동일한 서브필드에서 EmbeddingList 검색을 실행하려는 경우.</p></li>
<li><p><code translate="no">MAX_SIM*</code> 와 일반 벡터 메트릭 모두에 하나의 벡터 하위 필드를 재사용하는 경우.</p></li>
<li><p>자주 사용되는 StructArray 필터에 대한 스칼라 인덱스를 생략하는 경우.</p></li>
<li><p>Struct 스키마에 존재하지 않는 StructArray 하위 필드를 인덱싱하는 경우.</p></li>
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
<li><p>엔티티 수준 EmbeddingList 검색 또는 요소 수준 벡터 검색을 실행하려면 <a href="/docs/ko/basic-vector-search-with-structarray.md">‘StructArray를 사용한 기본 벡터 검색’을</a> 참조하십시오.</p></li>
<li><p>검색 중에 StructArray 스칼라 하위 필드를 필터링하려면 <a href="/docs/ko/filtered-search-with-structarray.md">‘StructArray를 사용한 필터링 검색’을</a> 참조하십시오.</p></li>
<li><p>인덱스 및 메트릭 제한 사항을 확인하려면 <a href="/docs/ko/structarray-limits.md">‘StructArray 제한 사항’을</a> 참조하십시오.</p></li>
</ol>
