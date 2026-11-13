---
id: fmindex.md
title: FMINDEX
summary: >-
  FMINDEX 인덱스는 VARCHAR 필드에 대한 정확한 바이트 단위 부분 문자열 인덱스입니다. 이 인덱스는 앵커가 지정된 LIKE
  쿼리(접두사, 중위, 접미사 일치)에 대해 후보 재검증 없이 결과를 반환하므로, 긴 텍스트에 대한 부분 문자열 검색에 이상적입니다.
---
<h1 id="FMINDEX" class="common-anchor-header">FMINDEX<button data-href="#FMINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus의 <code translate="no">FMINDEX</code> 인덱스는 <code translate="no">VARCHAR</code> 필드에 대한 정확한 바이트 단위 부분 문자열 인덱스입니다. 이 인덱스는 접두사, 중위, 접미사 일치를 사용하는 앵커된 <code translate="no">LIKE</code> 쿼리에 응답하며, 후보 재검증 없이 정확한 일치 결과를 반환합니다.</p>
<p>다음과 같이 부분 문자열 필터를 자주 실행하는 경우 <code translate="no">FMINDEX</code> 인덱스를 사용하십시오.</p>
<ul>
<li><p><code translate="no">title LIKE &quot;vector%&quot;</code> (접두사)</p></li>
<li><p><code translate="no">title LIKE &quot;%database&quot;</code> (접미사)</p></li>
<li><p><code translate="no">title LIKE &quot;%vector database%&quot;</code> (중간 문자열 / 부분 문자열)</p></li>
</ul>
<p>후보 집합을 좁힌 후 재검증하는 ` <code translate="no">NGRAM</code>`과 달리, ` <code translate="no">FMINDEX</code> `은 인덱스에서 직접 앵커가 지정된 접두사, 접미사 및 중위 패턴을 해결할 수 있습니다.</p>
<h2 id="Supported-data-types" class="common-anchor-header">지원되는 데이터 유형<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
<li><code translate="no">VARCHAR</code> 필드. 자세한 내용은 <a href="/docs/ko/string.md">String Field를</a> 참조하십시오.</li>
</ul>
<p><code translate="no">FMINDEX</code> 는 <code translate="no">VARCHAR</code> 필드에서만 지원됩니다. <code translate="no">JSON</code> 필드나 <code translate="no">VARCHAR</code> 로 형변환된 <code translate="no">JSON</code> 경로는 지원하지 않습니다.</p>
<h2 id="How-it-works" class="common-anchor-header">작동 원리<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">FMINDEX</code> 는 전체 텍스트 FM 인덱스로, 연결된 필드 값의 Burrows-Wheeler 변환(BWT)을 기반으로 구축된 압축 구조이며, 샘플링된 접미사 배열과 순위 쿼리를 위한 웨이블릿 트리를 포함합니다. 이 레이아웃은 <em>역방향 검색을</em> 지원합니다. 패턴이 주어지면 Milvus는 해당 패턴의 마지막 문자로부터 첫 번째 문자까지 역순으로 탐색하여, 텍스트에 해당 패턴이 포함된 엔티티의 정확한 범위를 찾습니다.</p>
<p>쿼리 시, Milvus는 인덱스를 사용하여 다음을 수행합니다.</p>
<ol>
<li><p><code translate="no">LIKE</code> 패턴에서 추출된 앵커된 리터럴에 대한<strong>일치 항목을 찾습니다</strong>.</p></li>
<li><p>원본 값을 재확인하지 않고 접두사, 접미사 및 중첩 리터럴에 대한<strong>정확한 엔티티 ID를 반환합니다</strong>.</p></li>
</ol>
<p>비인접 리터럴이 여러 개 포함된 패턴(일반적인 <code translate="no">LIKE</code>)이나 복잡한 정규식의 경우, ` <code translate="no">FMINDEX</code> `가 후보를 생성하면 Milvus는 이를 원본 값과 대조하여 검증합니다.</p>
<h2 id="Create-an-FMINDEX-index" class="common-anchor-header">FMINDEX 인덱스 생성<button data-href="#Create-an-FMINDEX-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">VARCHAR</code> 필드에 <code translate="no">FMINDEX</code> 인덱스를 생성할 수 있습니다. 두 빌드 매개변수 모두 선택 사항이며, 설정하지 않으면 서버 기본값이 적용됩니다.</p>
<table>
<thead>
<tr><th>매개변수</th><th>설명</th><th>허용되는 값</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fm_sa_sample_rate</code></td><td>접미사 배열 샘플링 빈도. 인덱스 크기와 위치 조회 지연 시간 간의 균형을 조정하며, 카운트 전용 쿼리에는 영향을 미치지 않습니다.</td><td>4에서 256 사이의 정수</td><td>8</td></tr>
<tr><td><code translate="no">fm_block_bytes</code></td><td>랭크 디렉터리의 블록 단위(바이트). 블록 크기가 클수록 상주 디렉터리의 크기가 줄어듭니다.</td><td>8, 16, 32, 64 또는 128</td><td>64</td></tr>
</tbody>
</table>
<p>아래 예제는 ` <code translate="no">VARCHAR</code> ` 필드에 ` <code translate="no">FMINDEX</code> ` 인덱스를 생성하는 방법을 보여줍니다:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assume you have defined a VARCHAR field named &quot;text&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add FMINDEX index on the &quot;text&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;text&quot;</span>,           <span class="hljs-comment"># Target VARCHAR field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;FMINDEX&quot;</span>,        <span class="hljs-comment"># Index type is FMINDEX</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;fmindex_index&quot;</span>,  <span class="hljs-comment"># Custom name for the index</span></span>
<span class="highlighted-comment-line">    fm_sa_sample_rate=<span class="hljs-number">8</span>,         <span class="hljs-comment"># Optional: suffix-array sampling rate (4-256, default 8)</span></span>
<span class="highlighted-comment-line">    fm_block_bytes=<span class="hljs-number">64</span>            <span class="hljs-comment"># Optional: block granularity in bytes (8/16/32/64/128, default 64)</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;log_catalog&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

Map&lt;String, Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;fm_sa_sample_rate&quot;</span>, <span class="hljs-string">&quot;8&quot;</span>);
params.put(<span class="hljs-string">&quot;fm_block_bytes&quot;</span>, <span class="hljs-string">&quot;64&quot;</span>);

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;log_catalog&quot;</span>)
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;text&quot;</span>).indexType(IndexParam.IndexType.FMINDEX)
                        .indexName(<span class="hljs-string">&quot;fmindex_index&quot;</span>)
                        .extraParams(params)
                        .build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
})

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())
}

idx := index.NewFMIndex().WithSaSampleRate(<span class="hljs-number">8</span>).WithBlockBytes(<span class="hljs-number">64</span>)

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;log_catalog&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, idx).WithIndexName(<span class="hljs-string">&quot;fmindex_index&quot;</span>))

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to create index: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">fmindex_index</span><span class="hljs-params">(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;fmindex_index&quot;</span>, milvus::IndexType::FMINDEX)</span></span>;
fmindex_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;fm_sa_sample_rate&quot;</span>, <span class="hljs-string">&quot;8&quot;</span>);
fmindex_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;fm_block_bytes&quot;</span>, <span class="hljs-string">&quot;64&quot;</span>);

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(milvus::<span class="hljs-built_in">CreateIndexRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;log_catalog&quot;</span>)
        .<span class="hljs-built_in">AddIndex</span>(fmindex_index));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;log_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;FMINDEX&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;fmindex_index&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">fm_sa_sample_rate</span>: <span class="hljs-number">8</span>, <span class="hljs-attr">fm_block_bytes</span>: <span class="hljs-number">64</span> },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;log_catalog&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;text&quot;,
            &quot;indexName&quot;: &quot;fmindex_index&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;FMINDEX&quot;,
                &quot;fm_sa_sample_rate&quot;: 8,
                &quot;fm_block_bytes&quot;: 64
            }
        }
    ]
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Queries-accelerated-by-FMINDEX" class="common-anchor-header">FMINDEX로 가속화된 쿼리<button data-href="#Queries-accelerated-by-FMINDEX" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">FMINDEX</code> <code translate="no">VARCHAR</code> 필드에 대해 다음 필터 패턴의 처리 속도를 높여줍니다. 앵커가 지정된 접두사, 접미사 및 중첩 리터럴은 인덱스에서 정확히 일치하는 결과를 반환하며, 일반적인 및 정규식 패턴은 Milvus가 원본 값과 대조하여 검증하는 후보를 생성합니다. <code translate="no">LIKE</code> </p>
<ul>
<li><p><strong>접두사 일치</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;vector%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>접미사 일치</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>중간/부분 문자열 일치</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%vector database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>일반 LIKE (후보)</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;a%b_c&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>정규식(후보)</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>필터 표현식 구문에 대한 자세한 내용은 <a href="/docs/ko/pattern-matching.md">패턴 일치를</a> 참조하십시오.</p>
<h2 id="Drop-an-index" class="common-anchor-header">인덱스 삭제<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">drop_index()</code> 메서드를 사용하여 컬렉션에서 기존 인덱스를 제거할 수 있습니다.</p>
<div class="alert note">
<ul>
<li><p><strong>v2.6.3</strong> 이하 버전에서는 스칼라 인덱스를 삭제하기 전에 컬렉션을 해제해야 합니다.</p></li>
<li><p><strong>v2.6.4부터는</strong> 스칼라 인덱스가 더 이상 필요하지 않으면 컬렉션을 먼저 해제할 필요 없이 직접 삭제할 수 있습니다.</p></li>
</ul>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;log_catalog&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;fmindex_index&quot;</span>       <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DropIndexReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

client.dropIndex(DropIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;log_catalog&quot;</span>)
        .indexName(<span class="hljs-string">&quot;fmindex_index&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
})

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())
}

err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption(<span class="hljs-string">&quot;log_catalog&quot;</span>, <span class="hljs-string">&quot;fmindex_index&quot;</span>))

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop index: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">DropIndex</span>(milvus::<span class="hljs-built_in">DropIndexRequest</span>()
        .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;log_catalog&quot;</span>)
        .<span class="hljs-built_in">WithIndexName</span>(<span class="hljs-string">&quot;fmindex_index&quot;</span>));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;log_catalog&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;fmindex_index&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;log_catalog&quot;,
    &quot;indexName&quot;: &quot;fmindex_index&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">사용 시 주의사항<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>필드 유형:</strong> ` <code translate="no">VARCHAR</code> ` 필드에서만 작동합니다. 데이터 유형에 대한 자세한 내용은 <a href="/docs/ko/string.md">문자열 필드를</a> 참조하십시오.</p></li>
<li><p><strong>버전 호환성:</strong> ` <code translate="no">FMINDEX</code> `를 사용하려면 스칼라 인덱스 엔진 버전 5 이상이 필요합니다.</p></li>
<li><p><strong>SDK 지원 현황:</strong> Rust v2 SDK에는 아직 <code translate="no">FMINDEX</code> 인덱스 유형이 포함되어 있지 않습니다.</p></li>
<li><p><strong>정확한 일치:</strong> 앵커가 지정된 접두사, 접미사 및 중첩 <code translate="no">LIKE</code> 리터럴은 후보 재확인 없이 정확한 일치 결과를 반환합니다.</p></li>
<li><p><strong>후보:</strong> 일반 <code translate="no">LIKE</code> 및 정규식 패턴은 Milvus가 원본 값과 대조하여 검증하는 후보를 생성할 수 있습니다. 패턴이 유용한 필터링 기능을 거의 제공하지 않거나 해결하는 데 비용이 너무 많이 드는 경우, Milvus는 대신 필드를 스캔할 수 있습니다.</p></li>
<li><p><strong>불변성:</strong> <code translate="no">fm_sa_sample_rate</code> 및 <code translate="no">fm_block_bytes</code> 는 그 자리에서 변경할 수 없습니다. 이를 조정하려면 인덱스를 다시 구축해야 합니다.</p></li>
</ul>
<h2 id="Best-practices" class="common-anchor-header">모범 사례<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p>긴 <code translate="no">VARCHAR</code> 필드에 대한 정확한 부분 문자열 검색에는 <code translate="no">FMINDEX</code> 를 사용하십시오. 특히 <code translate="no">NGRAM</code> 후보 재검증이 비용이 많이 드는 경우에 더욱 그렇습니다.</p></li>
<li><p>대부분의 워크로드에서는 <code translate="no">fm_block_bytes</code> 값을 기본값인 64로 유지하십시오. 메모리가 부족한 경우 이 값을 높여 상주 디렉터리의 크기를 줄이십시오.</p></li>
<li><p><code translate="no">fm_sa_sample_rate</code> 값을 낮추면 인덱스 크기가 커지는 대신 locate 지연 시간이 개선됩니다. 쿼리가 대부분 개수 조회만인 경우에는 이 값을 높여 인덱스 크기를 줄이십시오.</p></li>
</ul>
