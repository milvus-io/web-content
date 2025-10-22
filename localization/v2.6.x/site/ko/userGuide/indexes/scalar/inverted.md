---
id: inverted.md
title: INVERTED
summary: >-
  데이터에 대해 자주 필터 쿼리를 수행해야 하는 경우, 반전 인덱스를 사용하면 쿼리 성능을 크게 향상시킬 수 있습니다. Milvus는 모든
  문서를 스캔하는 대신 반전 인덱스를 사용해 필터 조건과 일치하는 정확한 레코드를 빠르게 찾습니다.
---
<h1 id="INVERTED" class="common-anchor-header">INVERTED<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h1><p>데이터에 대해 자주 필터 쿼리를 수행해야 하는 경우, <code translate="no">INVERTED</code> 인덱스를 사용하면 쿼리 성능을 크게 향상시킬 수 있습니다. Milvus는 모든 문서를 스캔하는 대신 반전 인덱스를 사용하여 필터 조건과 일치하는 정확한 레코드를 빠르게 찾습니다.</p>
<h2 id="When-to-use-INVERTED-indexes" class="common-anchor-header">반전 인덱스를 사용하는 경우<button data-href="#When-to-use-INVERTED-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>필요할 때 반전 인덱스를 사용하세요:</p>
<ul>
<li><p><strong>특정 값으로 필터링할</strong> 때: 필드가 특정 값과 같은 모든 레코드 찾기(예: <code translate="no">category == &quot;electronics&quot;</code>)</p></li>
<li><p><strong>텍스트 콘텐츠 필터링</strong>: <code translate="no">VARCHAR</code> 필드에서 효율적인 검색 수행</p></li>
<li><p><strong>JSON 필드 값 쿼리</strong>: JSON 구조 내의 특정 키에 대한 필터링</p></li>
</ul>
<p><strong>성능 이점</strong>: INVERTED 인덱스는 전체 컬렉션 스캔이 필요 없기 때문에 대규모 데이터 세트에서 쿼리 시간을 몇 초에서 밀리초로 단축할 수 있습니다.</p>
<h2 id="How-INVERTED-indexes-work" class="common-anchor-header">INVERTED 인덱스의 작동 방식<button data-href="#How-INVERTED-indexes-work" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus의 <strong>INVERTED 인덱스는</strong> 각각의 고유 필드 값(용어)을 해당 값이 있는 문서 ID 집합에 매핑합니다. 이 구조는 반복되거나 범주형 값이 있는 필드를 빠르게 조회할 수 있게 해줍니다.</p>
<p>다이어그램에서 볼 수 있듯이 이 프로세스는 두 단계로 진행됩니다:</p>
<ol>
<li><p><strong>포워드 매핑(ID → 용어):</strong> 각 문서 ID는 문서에 포함된 필드 값을 가리킵니다.</p></li>
<li><p><strong>역매핑(용어 → ID):</strong> Milvus는 고유한 용어를 수집하고 각 용어에서 해당 용어가 포함된 모든 ID로 역매핑을 구축합니다.</p></li>
</ol>
<p>예를 들어, <strong>'electronics'</strong> 값은 ID <strong>1과</strong> <strong>3에</strong> 매핑되고 <strong>'books'는</strong> ID <strong>2와</strong> <strong>5에</strong> 매핑됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/how-inverted-index-works.png" alt="How Inverted Index Works" class="doc-image" id="how-inverted-index-works" />
   </span> <span class="img-wrapper"> <span>반전 인덱스의 작동 방식</span> </span></p>
<p>특정 값(예: <code translate="no">category == &quot;electronics&quot;</code>)을 필터링하면 Milvus는 색인에서 해당 용어를 조회하여 일치하는 ID를 직접 검색합니다. 이렇게 하면 전체 데이터 세트를 스캔하지 않아도 되며, 특히 범주형 또는 반복되는 값에 대해 빠른 필터링이 가능합니다.</p>
<p>INVERTED 인덱스는 <strong>BOOL</strong>, <strong>INT8</strong>, <strong>INT16</strong>, <strong>INT32</strong>, <strong>INT64</strong>, <strong>FLOAT</strong>, <strong>DOUBLE</strong>, <strong>VARCHAR</strong>, <strong>JSON</strong>, <strong>ARRAY와</strong> 같은 모든 스칼라 필드 유형을 지원합니다. 그러나 JSON 필드를 색인하기 위한 인덱스 매개변수는 일반 스칼라 필드와 약간 다릅니다.</p>
<h2 id="Create-indexes-on-non-JSON-fields" class="common-anchor-header">JSON이 아닌 필드에 인덱스 생성<button data-href="#Create-indexes-on-non-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>JSON이 아닌 필드에 인덱스를 생성하려면 다음 단계를 따르세요:</p>
<ol>
<li><p>인덱스 매개변수를 준비합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Create an empty index parameter object</span>
index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">INVERTED</code> 인덱스를 추가합니다:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,           <span class="hljs-comment"># Name of the field to index</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,          <span class="hljs-comment"># Specify INVERTED index type</span></span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>     <span class="hljs-comment"># Give your index a name</span>
)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>인덱스를 만듭니다:</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Replace with your collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Create-indexes-on-JSON-fields--Milvus-2511+" class="common-anchor-header">JSON 필드에 인덱스 만들기<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span><button data-href="#Create-indexes-on-JSON-fields--Milvus-2511+" class="anchor-icon" translate="no">
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
    </button></h2><p>JSON 필드 내의 특정 경로에 반전된 인덱스를 만들 수도 있습니다. 이를 위해서는 JSON 경로와 데이터 유형을 지정하기 위한 추가 매개변수가 필요합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Build index params</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,                    <span class="hljs-comment"># JSON field name</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>,    <span class="hljs-comment"># Path to the JSON key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>              <span class="hljs-comment"># Data type to cast to during indexing</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Create index</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Replace with your collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>지원되는 경로, 데이터 유형 및 제한 사항 등 JSON 필드 인덱싱에 대한 자세한 내용은 <a href="/docs/ko/json-indexing.md">JSON 인덱싱을</a> 참조하세요.</p>
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
    </button></h2><p>컬렉션에서 기존 인덱스를 제거하려면 <code translate="no">drop_index()</code> 메서드를 사용합니다.</p>
<div class="alert note">
<ul>
<li><p><strong>v2.6.3</strong> 이전 버전에서는 스칼라 인덱스를 삭제하기 전에 컬렉션을 해제해야 합니다.</p></li>
<li><p><strong>v2.6.4</strong> 이상에서는 더 이상 필요하지 않은 경우 컬렉션을 먼저 릴리스할 필요 없이 바로 스칼라 인덱스를 삭제할 수 있습니다.</p></li>
</ul>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
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
<li><p><strong>데이터를 로드한 후 인덱스를 만듭니다</strong>: 이미 데이터가 들어 있는 컬렉션에 인덱스를 만들어 성능을 개선하세요.</p></li>
<li><p><strong>설명이 포함된 인덱스 이름을 사용하세요</strong>: 필드와 목적을 명확하게 나타내는 이름을 선택하세요.</p></li>
<li><p><strong>인덱스 성능 모니터링</strong>: 인덱스 생성 전후의 쿼리 성능 확인</p></li>
<li><p><strong>쿼리 패턴을 고려하세요</strong>: 자주 필터링하는 필드에 인덱스 만들기</p></li>
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
    </button></h2><ul>
<li><p><a href="/docs/ko/index-explained.md">다른 인덱스 유형에</a> 대해 알아보기</p></li>
<li><p>고급 JSON 인덱싱 시나리오는 <a href="/docs/ko/json-indexing.md">JSON</a> 인덱싱을 참조하세요.</p></li>
</ul>
