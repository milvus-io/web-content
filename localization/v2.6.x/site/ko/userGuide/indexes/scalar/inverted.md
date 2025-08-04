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
    </button></h2><p>필요할 때 INVERTED 인덱스를 사용하세요:</p>
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
    </button></h2><p>Milvus는 <a href="https://github.com/quickwit-oss/tantivy">Tantivy를</a> 사용해 인버트 인덱싱을 구현합니다. 그 과정은 다음과 같습니다:</p>
<ol>
<li><p><strong>토큰화</strong>: Milvus는 데이터를 검색 가능한 용어로 분류합니다.</p></li>
<li><p><strong>용어 사전</strong>: 모든 고유 용어의 정렬된 목록을 생성합니다.</p></li>
<li><p><strong>반전 목록</strong>: 각 용어를 해당 용어가 포함된 문서에 매핑</p></li>
</ol>
<p>예를 들어 다음 두 문장이 있다고 가정해 보겠습니다:</p>
<ul>
<li><p><strong>"Milvus는 클라우드 네이티브 벡터 데이터베이스입니다."</strong></p></li>
<li><p><strong>"Milvus는 성능이 매우 우수합니다."</strong></p></li>
</ul>
<p>반전된 인덱스는 <strong>"Milvus"</strong> → <strong>[문서 0, 문서 1]</strong>, <strong>"클라우드 네이티브"</strong> → <strong>[문서 0]</strong>, <strong>"성능"</strong> → <strong>[문서 1]</strong>과 같은 용어를 매핑합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/inverted-index.png" alt="Inverted Index" class="doc-image" id="inverted-index" />
   </span> <span class="img-wrapper"> <span>반전 인덱스</span> </span></p>
<p>용어를 기준으로 필터링하면 Milvus는 사전에서 해당 용어를 찾아 일치하는 모든 문서를 즉시 검색합니다.</p>
<p>반전 인덱스는 모든 스칼라 필드 유형을 지원합니다: <strong>BOOL</strong>, <strong>INT8</strong>, <strong>INT16</strong>, <strong>INT32</strong>, <strong>INT64</strong>, <strong>FLOAT</strong>, <strong>DOUBLE</strong>, <strong>VARCHAR</strong>, <strong>JSON</strong>, <strong>ARRAY</strong>. 그러나 JSON 필드를 색인하기 위한 인덱스 매개변수는 일반 스칼라 필드와 약간 다릅니다.</p>
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
<p>지원되는 경로, 데이터 유형 및 제한 사항 등 JSON 필드 인덱싱에 대한 자세한 내용은 <a href="/docs/ko/use-json-fields.md">JSON 필드를</a> 참조하세요.</p>
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
<li><p><strong>데이터를 로드한 후 인덱스를 만듭니다</strong>: 이미 데이터가 포함된 컬렉션에 인덱스를 작성하여 성능을 개선하세요.</p></li>
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
<li><p>고급 JSON 인덱싱 시나리오는 <a href="/docs/ko/use-json-fields.md#Index-values-inside-the-JSON-field">JSON 필드 인덱싱을</a> 참조하세요.</p></li>
</ul>
