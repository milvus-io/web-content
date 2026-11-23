---
id: bitmap.md
title: BITMAP
summary: '카드널리티가 낮은 스칼라 필터링에는 BITMAP을 사용하십시오. 지원되는 필터, 필드 제한 조건 및 인덱스 생성을 확인하십시오.'
---
<h1 id="BITMAP" class="common-anchor-header">BITMAP<button data-href="#BITMAP" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">BITMAP</code> 는 상태 코드나 범주와 같이 고유 값이 적은 필드에 대한 스칼라 필터링 속도를 높여줍니다. 카디널리티란 필드 내 고유 값의 수를 의미합니다. 이 페이지에서는 지원되는 필터, 필드 제한 조건 및 인덱스 생성에 대해 설명합니다.</p>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><!-- Preserve the published #Limits link and the filter link used by related pages. These anchors are not headings. -->
<a id="Limits"></a>
<a id="Queries-accelerated-by-BITMAP"></a>
<h3 id="Index-targets-and-filters" class="common-anchor-header">인덱스 대상 및 필터<button data-href="#Index-targets-and-filters" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BITMAP</code> 인덱스를 명시적으로 생성하려면 아래 표에서 기본 키가 아닌 대상을 선택하십시오. 각 행은 지원되는 대상과 해당 인덱스가 평가에 도움을 줄 수 있는 필터를 쌍으로 나열합니다:</p>
<table>
<thead>
<tr><th>인덱스 대상</th><th>인덱스를 사용할 수 있는 필터</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code> 필드</td><td>등가 조건(<code translate="no">==</code>, <code translate="no">!=</code>) 및 소속 조건(<code translate="no">in</code>, <code translate="no">not in</code>).</td></tr>
<tr><td>정수 필드 (<code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>)</td><td>동등성, 소속, 범위 (<code translate="no">&lt;</code>, <code translate="no">&lt;=</code>, <code translate="no">&gt;</code>, <code translate="no">&gt;=</code>).</td></tr>
<tr><td><code translate="no">VARCHAR</code> 필드</td><td>동등성, 멤버십, 범위 및 <a href="/docs/ko/pattern-matching.md">LIKE 또는 정규식 패턴</a>. 패턴 평가 시 여러 개의 서로 다른 인덱싱된 문자열을 참조할 수 있습니다.</td></tr>
<tr><td><code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code> 또는 <code translate="no">VARCHAR</code> 요소가 포함된 일반적인 <code translate="no">ARRAY</code> 필드</td><td><code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, <code translate="no">ARRAY_CONTAINS_ALL</code>. <a href="/docs/ko/array_data_type.md#Array-index-support">배열 인덱스 지원</a> 항목을 참조하십시오.</td></tr>
<tr><td><code translate="no">BOOL</code> 로 형변환된 JSON 경로 또는 <code translate="no">VARCHAR</code></td><td>위의 해당 부울 또는 문자열 값에 대한 필터로 변환되며, <a href="/docs/ko/json-indexing.md#Index-requirements">JSON 인덱스 요구</a> 사항을 따릅니다.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p><code translate="no">AUTOINDEX</code> 를 포함한 스칼라 인덱스는 재귀적 ARRAY 필드나 null이 허용되는 요소를 가진 배열을 지원하지 않습니다. 일반 배열 필터에 대한 내용은 <a href="/docs/ko/array_data_type.md#Array-index-support">‘배열 인덱스 지원’을</a>, 하위 필드 규칙에 대한 내용은 <a href="/docs/ko/index-structarray-fields.md#Create-scalar-indexes">‘StructArray 필드 인덱스’를</a> 참조하십시오.</p>
</blockquote>
</div>
<p>ARRAY 대상의 경우, ` <code translate="no">BITMAP</code> `는 전체 배열의 동일성, 위치별 요소 액세스 또는 배열 길이가 아닌 요소 포함 여부에 대한 필터를 처리합니다. <a href="/docs/ko/array_data_type.md#Array-index-support">‘배열 인덱스 지원’을</a> 참조하십시오.</p>
<p>이러한 명시적인 대상 이외의 자동 선택에 대해서는 <a href="/docs/ko/scalar_index.md#AUTOINDEX-behavior">'AUTOINDEX 동작'을</a> 참조하십시오.</p>
<div class="alert note">
<blockquote>
<p>이는 인덱스 기능일 뿐, 유효한 필터 표현식에 대한 제한 사항은 아닙니다. 공유 조회 제약 조건에 대해서는 <a href="/docs/ko/scalar_index.md#Filter-execution">‘스칼라 인덱스’를</a> 참조하십시오. <code translate="no">AND</code>, <code translate="no">OR</code>, <code translate="no">NOT</code> 및 NULL 테스트(<code translate="no">IS NULL</code>, <code translate="no">IS NOT NULL</code>)에 대해서는 <a href="/docs/ko/basic-operators.md">‘기본 연산자’를</a> 참조하십시오.</p>
</blockquote>
</div>
<h3 id="Memory-considerations" class="common-anchor-header">메모리 고려 사항<button data-href="#Memory-considerations" class="anchor-icon" translate="no">
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
    </button></h3><p>메모리 및 쿼리 비용은 고유 값의 수와 그 분포에 따라 달라집니다. 고정된 카디널리티를 보편적인 성능 기준점으로 간주하기보다는, 대표적인 필터를 사용하여 인덱스를 비교하십시오.</p>
<p>고밀도 비트맵의 경우, 대략적인 추정치(바이트 단위)는 <code translate="no">(D + 1) * N / 8</code> 입니다. 여기서 <code translate="no">N</code> 는 엔티티 수이고, <code translate="no">D</code> 는 고유 값의 수입니다. 여기에는 고유 값당 하나의 비트맵과 유효성 확인을 위한 비트맵 하나가 포함됩니다. 값 저장 및 기타 오버헤드가 이 추정치에 추가되며, 선택적 오프셋 캐시는 64비트 시스템에서 약 <code translate="no">8 * N</code> 바이트를 더 차지합니다. 압축된 비트맵 표현 방식은 메모리 사용량이 상당히 다를 수 있습니다.</p>
<p>이러한 대략적인 추정치는 메모리 매핑이 비활성화된 상태에서 로드된 인덱스의 메모리 사용량을 다룹니다. 세그먼트별로 계산한 다음, 로드된 세그먼트와 복제본 전체에 걸쳐 합산하십시오.</p>
<div class="alert note">
<blockquote>
<p>로드된 필드 데이터, 벡터 인덱스, 컬렉션 및 인덱스 오버헤드, 임시 할당을 위해 추가 메모리를 확보하십시오. 대표적인 데이터와 쿼리를 사용하여 유효성을 검증하십시오. 배열, JSON, 구형 인덱스 형식 및 메모리 매핑의 경우 별도의 측정이 필요합니다.</p>
</blockquote>
</div>
<h3 id="How-BITMAP-works" class="common-anchor-header">BITMAP의 작동 원리<button data-href="#How-BITMAP-works" class="anchor-icon" translate="no">
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
    </button></h3><p><details>
<summary><strong>비트맵 필터링 예제 보기</strong></summary></p>
<p>비트맵 인덱스는 각 고유한 필드 값을 비트맵과 연결합니다. 각 비트는 엔티티에 해당하며, <strong>1은</strong> 엔티티가 해당 값을 갖는 것을, <strong>0은</strong> 그렇지 않은 것을 의미합니다.</p>
<p>예를 들어, <strong>‘Tech’</strong> 카테고리에 속한 공개 문서를 찾으려면 <strong>‘Category = Tech’</strong> 및 <strong>‘Public = true’에</strong> 해당하는 비트맵을 결합하면 됩니다:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitmap.png" alt="Bitmap" class="doc-image" id="bitmap" /> 
   <span>비트맵</span>
  
 </span></p>
<p>그림에서 볼 수 있듯이, <strong>‘카테고리</strong> ’와 <strong>‘공개</strong> ’에 대한 비트맵 인덱스는 다음과 같습니다:</p>
<ul>
<li><p><strong>Tech</strong>: [1, 0, 1, 0, 0], 이는 1번째와 3번째 문서만이 <strong>Tech</strong> 카테고리에 속함을 나타냅니다.</p></li>
<li><p><strong>Public</strong>: [1, 0, 0, 1, 0]로, 1번째와 4번째 문서만 <strong>Public에게</strong> 공개되어 있음을 나타냅니다.</p></li>
</ul>
<p>두 조건 모두에 해당하는 문서를 찾기 위해, 이 두 비트맵에 대해 비트별 AND 연산을 수행합니다:</p>
<ul>
<li><strong>기술</strong> AND <strong>공개</strong>: [1, 0, 0, 0, 0]</li>
</ul>
<p>첫 번째 문서(<strong>ID 1</strong>)만이 두 기준을 모두 충족합니다.</p>
<p></details></p>
<h2 id="Create-a-bitmap-index" class="common-anchor-header">비트맵 인덱스 생성<button data-href="#Create-a-bitmap-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 비트맵 인덱스를 생성하려면 ` <code translate="no">create_index()</code> ` 메서드를 사용하고, ` <code translate="no">index_type</code> ` 매개변수를 ` <code translate="no">&quot;BITMAP&quot;</code>`로 설정하십시오.</p>
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
)

index_params = client.prepare_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexParams(Collections.singletonList(IndexParam.builder()
                .fieldName(<span class="hljs-string">&quot;category&quot;</span>)
                .indexType(IndexParam.IndexType.BITMAP)
                .indexName(<span class="hljs-string">&quot;category_bitmap_index&quot;</span>)
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

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, index.NewBitmapIndex()).WithIndexName(<span class="hljs-string">&quot;category_bitmap_index&quot;</span>))

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to create index: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

client
    .<span class="hljs-title function_ invoke__">create_index</span>(
        CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_param</span>(
                IndexParam::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;category&quot;</span>)
                    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Bitmap)
                    .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;category_bitmap_index&quot;</span>),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(milvus::<span class="hljs-built_in">CreateIndexRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-built_in">AddIndex</span>(milvus::<span class="hljs-built_in">IndexDesc</span>(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;category_bitmap_index&quot;</span>, milvus::IndexType::BITMAP)));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;category&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;BITMAP&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;category_bitmap_index&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Prepare index building params</span>
<span class="hljs-keyword">var</span> indexParam = <span class="hljs-keyword">new</span> IndexParam(
    fieldName: <span class="hljs-string">&quot;category&quot;</span>,
    indexType: IndexType.Bitmap,
    indexName: <span class="hljs-string">&quot;category_bitmap_index&quot;</span>);

<span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Indexes = [indexParam]
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
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;category&quot;,
            &quot;indexName&quot;: &quot;category_bitmap_index&quot;,
            &quot;indexType&quot;: &quot;BITMAP&quot;
        }
    ]
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>이렇게 하면 ` <code translate="no">my_collection.category</code>`에 인덱스가 생성됩니다. 쿼리에서 이 필드를 사용하거나 ` <code translate="no">filter</code>`을 검색해 보세요. <a href="/docs/ko/boolean.md">자세한 내용은 ‘필터링 설명’을</a> 참조하십시오.</p>
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
<blockquote>
<p>스칼라 인덱스를 삭제할 때의 릴리스 요구 사항에 대해서는 <a href="/docs/ko/scalar_index.md#Drop-index-compatibility">‘스칼라 인덱스’를</a> 참조하십시오.</p>
</blockquote>
</div>
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
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DropIndexReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

client.dropIndex(DropIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexName(<span class="hljs-string">&quot;category_bitmap_index&quot;</span>)
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

err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;category_bitmap_index&quot;</span>))

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop index: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

client
    .<span class="hljs-title function_ invoke__">drop_index</span>(
        DropIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;category_bitmap_index&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">DropIndex</span>(milvus::<span class="hljs-built_in">DropIndexRequest</span>()
        .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-built_in">WithIndexName</span>(<span class="hljs-string">&quot;category_bitmap_index&quot;</span>));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;category_bitmap_index&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;

<span class="hljs-keyword">await</span> client.DropIndexAsync(<span class="hljs-keyword">new</span> DropIndexReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// Name of the collection</span>
    IndexName = <span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment">// Name of the index to drop</span>
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
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexName&quot;: &quot;category_bitmap_index&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
