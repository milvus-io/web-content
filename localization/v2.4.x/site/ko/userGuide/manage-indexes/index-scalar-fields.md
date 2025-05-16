---
id: index-scalar-fields.md
order: 2
summary: '이 가이드에서는 정수, 문자열 등과 같은 필드에 대한 스칼라 인덱스를 만들고 구성하는 방법을 안내합니다.'
title: 스칼라 필드 인덱스
---
<h1 id="Index-Scalar-Fields" class="common-anchor-header">스칼라 필드 인덱스<button data-href="#Index-Scalar-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus에서 스칼라 인덱스는 기존 데이터베이스 인덱스와 유사하게 특정 비벡터 필드 값을 기준으로 메타필터링 속도를 높이는 데 사용됩니다. 이 가이드에서는 정수, 문자열 등과 같은 필드에 대한 스칼라 인덱스를 만들고 구성하는 방법을 안내합니다.</p>
<h2 id="Types-of-scalar-indexing" class="common-anchor-header">스칼라 인덱싱의 유형<button data-href="#Types-of-scalar-indexing" class="anchor-icon" translate="no">
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
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Auto-indexing">자동 인덱싱</a></strong>: Milvus는 스칼라 필드의 데이터 유형에 따라 인덱스 유형을 자동으로 결정합니다. 특정 인덱스 유형을 제어할 필요가 없는 경우에 적합합니다.</p></li>
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Custom-indexing">사용자 지정 인덱싱</a></strong>: 반전 인덱스와 같은 정확한 인덱스 유형을 지정합니다. 이렇게 하면 인덱스 유형 선택을 더 세밀하게 제어할 수 있습니다.</p></li>
</ul>
<h2 id="Auto-indexing" class="common-anchor-header">자동 인덱싱<button data-href="#Auto-indexing" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>자동 인덱싱을 사용하려면 <strong>인덱스 유형</strong> 매개변수를 생략하세요. <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>에서 인덱스 유형 매개변수를 생략하면 Milvus가 스칼라 필드 유형에 따라 인덱스 유형을 유추할 수 있습니다.</p>
</div>
<div class="language-java">
<p>자동 인덱싱을 사용하려면, 에서 <strong>indexType</strong> 매개변수를 생략하세요. <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>에서 인덱스 유형 매개변수를 생략하여 Milvus가 스칼라 필드 유형을 기반으로 인덱스 유형을 유추할 수 있도록 합니다.</p>
</div>
<div class="language-javascript">
<p>자동 인덱싱을 사용하려면, 에서 <strong>index_type</strong> 파라미터를 생략하세요. <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>에서 인덱스 유형을 생략하면 Milvus가 스칼라 필드 유형에 따라 인덱스 유형을 유추할 수 있습니다.</p>
</div>
<p>스칼라 데이터 유형과 기본 인덱싱 알고리즘 간의 매핑에 대해서는 <a href="https://milvus.io/docs/scalar_index.md#Scalar-field-indexing-algorithms">스칼라 필드 인덱싱 알고리즘을</a> 참조하세요.</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Auto indexing</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

index_params = MilvusClient.prepare_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>

index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;&quot;</span>, <span class="hljs-comment"># Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
    index_name=<span class="hljs-string">&quot;default_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
  collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
  index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForScalarField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;scalar_1&quot;</span>) <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    .indexName(<span class="hljs-string">&quot;default_index&quot;</span>) <span class="hljs-comment">// Name of the index to be created</span>
    .indexType(<span class="hljs-string">&quot;&quot;</span>) <span class="hljs-comment">// Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForVectorField);

<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>) <span class="hljs-comment">// Specify the collection name</span>
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment">// Specify the collection name</span>
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;default_index&quot;</span>, <span class="hljs-comment">// Name of the index to be created</span>
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment">// Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
})
<button class="copy-code-btn"></button></code></pre>
<h2 id="Custom-indexing" class="common-anchor-header">사용자 정의 인덱싱<button data-href="#Custom-indexing" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>사용자 정의 인덱싱을 사용하려면 <strong>인덱스</strong> 유형 매개변수를 사용하여 특정 인덱스 유형을 지정합니다. <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>.</p>
</div>
<div class="language-java">
<p>사용자 지정 인덱싱을 사용하려면 <strong>인덱스</strong> 유형 매개변수를 사용하여 특정 인덱스 유형을 지정합니다. <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>.</p>
</div>
<div class="language-javascript">
<p>사용자 지정 인덱싱을 사용하려면, 에서 <strong>index_type</strong> 매개 변수를 사용하여 특정 인덱스 유형을 지정한다. <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>.</p>
</div>
<p>아래 예제는 스칼라 필드 <code translate="no">scalar_2</code> 에 대한 반전 인덱스를 생성합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">index_params = MilvusClient.prepare_index_params() <span class="hljs-comment">#  Prepare an IndexParams object</span>

index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_2&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
  collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
  index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForScalarField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;scalar_1&quot;</span>) <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    .indexName(<span class="hljs-string">&quot;inverted_index&quot;</span>) <span class="hljs-comment">// Name of the index to be created</span>
    .indexType(<span class="hljs-string">&quot;INVERTED&quot;</span>) <span class="hljs-comment">// Type of index to be created</span>
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForVectorField);

<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>) <span class="hljs-comment">// Specify the collection name</span>
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment">// Specify the collection name</span>
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;inverted_index&quot;</span>, <span class="hljs-comment">// Name of the index to be created</span>
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span> <span class="hljs-comment">// Type of index to be created</span>
})
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p><strong>메서드 및 매개변수</strong></p>
<ul>
<li><p><strong>prepare_index_params()</strong></p>
<p><strong>IndexParams</strong> 객체를 준비합니다.</p></li>
<li><p><strong>add_index()</strong></p>
<p><strong>IndexParams</strong> 객체에 인덱스 구성을 추가합니다.</p>
<ul>
<li><p><strong>field_name</strong><em>(문자열</em>)</p>
<p>인덱싱할 스칼라 필드의 이름입니다.</p></li>
<li><p><strong>index_type</strong><em>(문자열</em>):</p>
<p>생성할 스칼라 인덱스의 유형입니다. 암시적 인덱싱의 경우 이 매개변수를 비워 두거나 생략하세요.</p>
<p>사용자 지정 인덱싱의 경우 유효한 값은 다음과 같습니다:</p>
<ul>
<li><p><strong>INVERTED</strong>: (권장) 반전 인덱스는 토큰화된 모든 단어가 알파벳순으로 정렬된 용어 사전으로 구성됩니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/scalar_index.md">스칼라 인덱스를</a> 참조하세요.</p></li>
<li><p><strong>STL_SORT</strong>: 표준 템플릿 라이브러리 정렬 알고리즘을 사용하여 스칼라 필드를 정렬합니다. 숫자 필드(예: INT8, INT16, INT32, INT64, FLOAT, DOUBLE)만 지원합니다.</p></li>
<li><p><strong>트라이</strong>: 빠른 접두사 검색 및 검색을 위한 트리 데이터 구조입니다. VARCHAR 필드를 지원합니다.</p></li>
</ul></li>
<li><p><strong>index_name</strong><em>(문자열</em>)</p>
<p>생성할 스칼라 인덱스의 이름입니다. 각 스칼라 필드는 하나의 인덱스를 지원합니다.</p></li>
</ul></li>
<li><p><strong>create_index()</strong></p>
<p>지정된 컬렉션에 인덱스를 생성합니다.</p>
<ul>
<li><p><strong>collection_name</strong><em>(문자열</em>)</p>
<p>인덱스가 생성될 컬렉션의 이름입니다.</p></li>
<li><p><strong>index_params</strong></p>
<p>인덱스 구성을 포함하는 <strong>IndexParams</strong> 객체입니다.</p></li>
</ul></li>
</ul>
</div>
<div class="language-java">
<p><strong>메서드 및 매개변수</strong></p>
<ul>
<li><strong>IndexParam</strong>IndexParam 객체를 준비합니다.<ul>
<li><strong>fieldName</strong><em>(문자열</em>) 인덱싱할 스칼라 필드의 이름입니다.</li>
<li><strong>indexName</strong><em>(문자열</em>) 생성할 스칼라 인덱스의 이름입니다. 각 스칼라 필드는 하나의 인덱스를 지원합니다.</li>
<li><strong>indexType</strong><em>(문자열</em>) 생성할 스칼라 인덱스의 유형입니다. 암시적 인덱싱의 경우 이 매개변수를 비워 두거나 생략합니다. 사용자 정의 인덱싱의 경우 유효한 값은 다음과 같습니다:<ul>
<li><strong>INVERTED</strong>: (권장) 반전 인덱스는 토큰화된 모든 단어가 알파벳순으로 정렬된 용어 사전으로 구성됩니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/scalar_index.md">스칼라 인덱스를</a> 참조하세요.</li>
<li><strong>STL_SORT</strong>: 표준 템플릿 라이브러리 정렬 알고리즘을 사용하여 스칼라 필드를 정렬합니다. 부울 및 숫자 필드(예: INT8, INT16, INT32, INT64, FLOAT, DOUBLE)를 지원합니다.</li>
<li><strong>트라이</strong>: 빠른 접두사 검색과 검색을 위한 트리 데이터 구조입니다. VARCHAR 필드를 지원합니다.</li>
</ul></li>
</ul></li>
<li><strong>CreateIndexReq</strong>지정된 컬렉션에 인덱스를 만듭니다.<ul>
<li><strong>collectionName</strong><em>(문자열</em>) 인덱스가 생성되는 컬렉션의 이름입니다.</li>
<li><strong>indexParams</strong><em>(목록<IndexParam></em>) 인덱스 구성을 포함하는 IndexParam 객체 목록입니다.</li>
</ul></li>
</ul>
</div>
<div class="language-javascript">
<p><strong>메서드 및 매개변수</strong></p>
<ul>
<li><p><strong>createIndex</strong></p>
<p>지정된 컬렉션에 인덱스를 생성합니다.</p>
<ul>
<li><strong>collection_name</strong><em>(문자열</em>) 인덱스가 생성되는 컬렉션의 이름입니다.</li>
<li><strong>field_name</strong><em>(문자열</em>) 인덱싱할 스칼라 필드의 이름입니다.</li>
<li><strong>index_name</strong><em>(문자열</em>) 생성할 스칼라 인덱스의 이름입니다. 각 스칼라 필드는 하나의 인덱스를 지원합니다.</li>
<li><strong>index_type</strong><em>(문자열</em>) 생성할 스칼라 인덱스의 유형입니다. 암시적 인덱싱의 경우 이 매개변수를 비워 두거나 생략합니다. 사용자 지정 인덱싱의 경우 유효한 값은 다음과 같습니다:<ul>
<li><strong>INVERTED</strong>: (권장) 반전 인덱스는 토큰화된 모든 단어가 알파벳순으로 정렬된 용어 사전으로 구성됩니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/scalar_index.md">스칼라 인덱스를</a> 참조하세요.</li>
<li><strong>STL_SORT</strong>: 표준 템플릿 라이브러리 정렬 알고리즘을 사용하여 스칼라 필드를 정렬합니다. 부울 및 숫자 필드(예: INT8, INT16, INT32, INT64, FLOAT, DOUBLE)를 지원합니다.</li>
<li><strong>트라이</strong>: 빠른 접두사 검색과 검색을 위한 트리 데이터 구조입니다. VARCHAR 필드를 지원합니다.</li>
</ul></li>
</ul></li>
</ul>
</div>
<h2 id="Verifying-the-result" class="common-anchor-header">결과 확인하기<button data-href="#Verifying-the-result" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>메서드를 사용하여 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md"><code translate="no">list_indexes()</code></a> 메서드를 사용하여 스칼라 인덱스 생성을 확인합니다:</p>
</div>
<div class="language-java">
<p><code translate="no">listIndexes()</code> 메서드를 사용하여 스칼라 인덱스 생성을 확인합니다:</p>
</div>
<div class="language-javascript">
<p><code translate="no">listIndexes()</code> 메서드를 사용하여 스칼라 인덱스 생성을 확인합니다:</p>
</div>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">client.list_indexes(
    collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>  <span class="hljs-comment"># Specify the collection name</span>
)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [&#x27;default_index&#x27;,&#x27;inverted_index&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.ListIndexesReq;

<span class="hljs-type">ListIndexesReq</span> <span class="hljs-variable">listIndexesReq</span> <span class="hljs-operator">=</span> ListIndexesReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>)  <span class="hljs-comment">// Specify the collection name</span>
    .build();

List&lt;String&gt; indexNames = client.listIndexes(listIndexesReq);

System.out.println(indexNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;default_index&quot;,</span>
<span class="hljs-comment">//     &quot;inverted_index&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listIndexes</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;test_scalar_index&#x27;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">indexes</span>)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;default_index&quot;,</span>
<span class="hljs-comment">//     &quot;inverted_index&quot;</span>
<span class="hljs-comment">// ]   </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">제한<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li>현재 스칼라 인덱싱은 INT8, INT16, INT32, INT64, FLOAT, DOUBLE, BOOL, VARCHAR 및 ARRAY 데이터 타입을 지원하지만 JSON 데이터 타입은 지원하지 않습니다.</li>
</ul>
