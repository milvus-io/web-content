---
id: stl-sort.md
title: STL_SORT
summary: >-
  STL_SORT 인덱스는 데이터를 정렬된 순서로 구성하여 Milvus 내의 숫자 필드(INT8, INT16 등) 또는 TIMESTAMPTZ
  필드에 대한 쿼리 성능을 향상시키기 위해 특별히 고안된 인덱스 유형입니다.
---
<h1 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">STL_SORT</code> 인덱스는 데이터를 정렬된 순서로 구성하여 Milvus 내의 숫자 필드(INT8, INT16 등) 또는 <code translate="no">TIMESTAMPTZ</code> 필드에 대한 쿼리 성능을 향상시키기 위해 특별히 고안된 인덱스 유형입니다.</p>
<p><code translate="no">STL_SORT</code> 인덱스를 사용하여 쿼리를 자주 실행하는 경우 사용하세요:</p>
<ul>
<li><p><code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code> 연산자를 사용한 비교 필터링</p></li>
<li><p><code translate="no">IN</code> 및 <code translate="no">LIKE</code> 연산자를 사용한 범위 필터링</p></li>
</ul>
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
<li><p>숫자 필드(예: <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>). 자세한 내용은 <a href="/docs/ko/number.md">부울 및 숫자</a> 필드를 참조하세요.</p></li>
<li><p><code translate="no">TIMESTAMPTZ</code> 필드. 자세한 내용은 <a href="/docs/ko/timestamptz-field.md">타임스탬프 필드를</a> 참조하세요.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">작동 방식<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 <code translate="no">STL_SORT</code> 을 두 단계로 구현합니다:</p>
<ol>
<li><p><strong>인덱스 구축</strong></p>
<ul>
<li><p>수집하는 동안 Milvus는 색인된 필드에 대한 모든 값을 수집합니다.</p></li>
<li><p>값은 C++ STL의 <a href="https://en.cppreference.com/w/cpp/algorithm/sort.html">std::sort를</a> 사용하여 오름차순으로 정렬됩니다.</p></li>
<li><p>각 값은 해당 엔티티 ID와 쌍을 이루며, 정렬된 배열은 인덱스로 유지됩니다.</p></li>
</ul></li>
<li><p><strong>쿼리 가속화</strong></p>
<ul>
<li><p>쿼리 시 Milvus는 정렬된 배열에 대해 <strong>이진 검색</strong><a href="https://en.cppreference.com/w/cpp/algorithm/lower_bound.html">(std::lower_bound</a> 및 <a href="https://en.cppreference.com/w/cpp/algorithm/upper_bound.html">std::upper_bound</a>)을 사용합니다.</p></li>
<li><p>같음의 경우, Milvus는 일치하는 모든 값을 빠르게 찾습니다.</p></li>
<li><p>범위의 경우, Milvus는 시작 위치와 끝 위치를 찾아 그 사이의 모든 값을 반환합니다.</p></li>
<li><p>일치하는 엔티티 ID는 최종 결과 어셈블리를 위해 쿼리 실행기로 전달됩니다.</p></li>
</ul></li>
</ol>
<p>이렇게 하면 쿼리 복잡성이 <strong>O(n)</strong> (전체 스캔)에서 <strong>O(log n + m)</strong>로 감소하며, 여기서 <em>m은</em> 일치하는 항목의 수입니다.</p>
<h2 id="Create-an-STLSORT-index" class="common-anchor-header">STL_SORT 인덱스 생성<button data-href="#Create-an-STLSORT-index" class="anchor-icon" translate="no">
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
    </button></h2><p>숫자 또는 <code translate="no">TIMESTAMPTZ</code> 필드에 <code translate="no">STL_SORT</code> 인덱스를 만들 수 있습니다. 추가 매개변수는 필요하지 않습니다.</p>
<p>아래 예는 <code translate="no">TIMESTAMPTZ</code> 필드에 <code translate="no">STL_SORT</code> 인덱스를 생성하는 방법을 보여줍니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a TIMESTAMPTZ field named &quot;tsz&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add RTREE index on the &quot;tsz&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;tsz&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,   <span class="hljs-comment"># Index for TIMESTAMPTZ</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;tsz_index&quot;</span>,  <span class="hljs-comment"># Optional, name your index</span></span>
<span class="highlighted-comment-line">    params={}                <span class="hljs-comment"># No extra params needed</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;tsz_demo&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">사용 참고 사항<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>필드 유형:</strong> 숫자 및 <code translate="no">TIMESTAMPTZ</code> 필드에서 작동합니다. 데이터 유형에 대한 자세한 내용은 <a href="/docs/ko/number.md">부울 및 숫자</a> 및 <a href="/docs/ko/timestamptz-field.md">TIMESTAMPTZ 필드를</a> 참조하세요.</p></li>
<li><p><strong>매개변수:</strong> 인덱스 매개변수가 필요하지 않습니다.</p></li>
<li><p><strong>Mmap은 지원되지 않습니다:</strong> <code translate="no">STL_SORT</code> 에는 메모리 매핑 모드를 사용할 수 없습니다.</p></li>
</ul>
