---
id: inverted.md
title: INVERTED
summary: >-
  Milvus의 반전 인덱스는 스칼라 필드와 구조화된 JSON 필드 모두에서 필터 쿼리를 가속화하도록 설계되었습니다. 용어가 포함된 문서나
  레코드에 용어를 매핑함으로써 무차별 대입 검색에 비해 쿼리 성능을 크게 향상시키는 반전 인덱스입니다.
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
    </button></h1><p>Milvus의 <code translate="no">INVERTED</code> 인덱스는 스칼라 필드와 구조화된 JSON 필드 모두에서 필터 쿼리를 가속화하도록 설계되었습니다. 용어가 포함된 문서나 레코드에 용어를 매핑함으로써, 반전된 인덱스는 무차별 대입 검색에 비해 쿼리 성능을 크게 향상시킵니다.</p>
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
    </button></h2><p><a href="https://github.com/quickwit-oss/tantivy">Tantivy를</a> 기반으로 하는 Milvus는 특히 텍스트 데이터의 필터 쿼리를 가속화하기 위해 반전 인덱싱을 구현합니다. 작동 원리는 다음과 같습니다:</p>
<ol>
<li><p><strong>데이터를 토큰화합니다</strong>: Milvus는 원시 데이터(이 예에서는 두 문장)를 가져옵니다:</p>
<ul>
<li><p><strong>"Milvus는 클라우드 네이티브 벡터 데이터베이스입니다."</strong></p></li>
<li><p><strong>"Milvus는 성능이 매우 뛰어납니다."</strong></p></li>
</ul>
<p>를 고유한 단어(예: <em>Milvus</em>, <em>is</em>, <em>클라우드 네이티브</em>, <em>벡터</em>, <em>데이터베이스</em>, <em>매우</em>, <em>좋은</em>, <em>at</em>, <em>성능</em>)로 변환합니다.</p></li>
<li><p><strong>용어 사전을 구축합니다</strong>: 이러한 고유 단어는 <strong>용어 사전</strong>이라는 정렬된 목록에 저장됩니다. 이 사전을 통해 Milvus는 단어의 존재 여부를 빠르게 확인하고 색인에서 해당 단어의 위치를 찾을 수 있습니다.</p></li>
<li><p><strong>반전 목록 만들기</strong>: 용어 사전의 각 단어에 대해 Milvus는 해당 단어가 포함된 문서를 보여주는 <strong>반전 목록을</strong> 유지합니다. 예를 들어, <strong>"Milvus</strong> "는 두 문장에 모두 나타나므로 반전 목록은 두 문서 ID를 가리킵니다.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/inverted.png" alt="Inverted" class="doc-image" id="inverted" />
   </span> <span class="img-wrapper"> <span>반전</span> </span></p>
<p>사전이 정렬되어 있기 때문에 용어 기반 필터링을 효율적으로 처리할 수 있습니다. Milvus는 모든 문서를 스캔하는 대신 사전에서 해당 용어를 찾아 반전된 목록을 검색하므로 대규모 데이터 세트의 검색 및 필터링 속도가 크게 빨라집니다.</p>
<h2 id="Index-a-regular-scalar-field" class="common-anchor-header">일반 스칼라 필드 색인<button data-href="#Index-a-regular-scalar-field" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>BOOL</strong>, <strong>INT8</strong>, <strong>INT16</strong>, <strong>INT32</strong>, <strong>INT64</strong>, <strong>FLOAT</strong>, <strong>DOUBLE</strong>, <strong>VARCHAR</strong>, <strong>ARRAY와</strong> 같은 스칼라 필드의 경우, 반전 인덱스를 만드는 것은 간단합니다. <code translate="no">index_type</code> 매개변수를 <code translate="no">&quot;INVERTED&quot;</code> 로 설정한 <code translate="no">create_index()</code> 메서드를 사용합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_field_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-a-JSON-field" class="common-anchor-header">JSON 필드 색인하기<button data-href="#Index-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 인덱싱 기능을 JSON 필드까지 확장하여 단일 열에 저장된 중첩 또는 구조화된 데이터를 효율적으로 필터링할 수 있습니다. 스칼라 필드와 달리 JSON 필드를 색인할 때는 두 개의 추가 매개변수를 제공해야 합니다:</p>
<ul>
<li><p><code translate="no">json_path</code><strong>:</strong> 인덱싱할 중첩된 키를 지정합니다.</p></li>
<li><p><code translate="no">json_cast_type</code><strong>:</strong> 추출된 JSON 값을 캐스팅할 데이터 유형(예: <code translate="no">&quot;varchar&quot;</code>, <code translate="no">&quot;double&quot;</code>, 또는 <code translate="no">&quot;bool&quot;</code>)을 정의합니다.</p></li>
</ul>
<p>예를 들어, 다음과 같은 구조를 가진 <code translate="no">metadata</code> 이라는 JSON 필드를 생각해 보겠습니다:</p>
<pre><code translate="no" class="language-plaintext">{
  &quot;metadata&quot;: {
    &quot;product_info&quot;: {
      &quot;category&quot;: &quot;electronics&quot;,
      &quot;brand&quot;: &quot;BrandA&quot;
    },
    &quot;price&quot;: 99.99,
    &quot;in_stock&quot;: true,
    &quot;tags&quot;: [&quot;summer_sale&quot;, &quot;clearance&quot;]
  }
}
<button class="copy-code-btn"></button></code></pre>
<p>특정 JSON 경로에 반전된 인덱스를 만들려면 다음과 같은 방법을 사용할 수 있습니다:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

<span class="hljs-comment"># Example 1: Index the &#x27;category&#x27; key inside &#x27;product_info&#x27; as a string.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,         <span class="hljs-comment"># Specify the inverted index type</span>
    index_name=<span class="hljs-string">&quot;json_index_1&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;category&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>   <span class="hljs-comment"># Cast the value as a string</span>
    }
)

<span class="hljs-comment"># Example 2: Index the &#x27;price&#x27; key as a numeric type (double).</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_index_2&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;price&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>           <span class="hljs-comment"># Cast the value as a double</span>
    }
)

<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>매개변수</p></th>
     <th><p>설명</p></th>
     <th><p>예제 값</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>스키마에 있는 JSON 필드의 이름입니다.</p></td>
     <td><p><code translate="no">"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>생성할 인덱스 유형(현재 JSON 경로 인덱싱에는 <code translate="no">INVERTED</code> 만 지원됨).</p></td>
     <td><p><code translate="no">"INVERTED"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_name</code></p></td>
     <td><p>(선택 사항) 사용자 정의 인덱스 이름. 동일한 JSON 필드에 여러 인덱스를 생성하는 경우 다른 이름을 지정합니다.</p></td>
     <td><p><code translate="no">"json_index_1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_path</code></p></td>
     <td><p>인덱싱할 JSON 경로를 지정합니다. 중첩된 키, 배열 위치 또는 둘 다(예: <code translate="no">metadata["product_info"]["category"]</code> 또는 <code translate="no">metadata["tags"][0]</code>)를 대상으로 할 수 있습니다. 경로가 누락되거나 특정 행에 대한 배열 요소가 존재하지 않으면 해당 행은 인덱싱 중에 건너뛰고 오류가 발생되지 않습니다.</p></td>
     <td><p><code translate="no">"metadata[\"product_info\"][\"category\"]"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_cast_type</code></p></td>
     <td><p>인덱스를 생성할 때 Milvus가 추출된 JSON 값을 캐스팅할 데이터 유형입니다. 유효한 값</p>
<ul>
<li><p><code translate="no">"bool"</code> 또는 <code translate="no">"BOOL"</code></p></li>
<li><p><code translate="no">"double"</code> 또는 <code translate="no">"DOUBLE"</code></p></li>
<li><p><code translate="no">"varchar"</code> 또는 <code translate="no">"VARCHAR"</code></p>
<p><strong>참고</strong>: 정수 값의 경우, Milvus는 내부적으로 인덱스에 더블을 사용합니다. 2^53 이상의 큰 정수는 정밀도가 떨어집니다. 유형 불일치로 인해 형 변환이 실패하면 오류가 발생하지 않으며 해당 행의 값은 색인되지 않습니다.</p></li>
</ul></td>
     <td><p><code translate="no">"varchar"</code></p></td>
   </tr>
</table>
<h2 id="Considerations-on-JSON-indexing" class="common-anchor-header">JSON 인덱싱에 대한 고려 사항<button data-href="#Considerations-on-JSON-indexing" class="anchor-icon" translate="no">
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
<li><p><strong>필터링 로직</strong>:</p>
<ul>
<li><p><strong>이중 유형 인덱스(</strong><code translate="no">json_cast_type=&quot;double&quot;</code><strong>)를 생성하는</strong> 경우 숫자 유형 필터 조건만 인덱스를 사용할 수 있습니다. 필터가 이중 인덱스를 숫자가 아닌 조건과 비교하는 경우, Milvus는 무차별 대입 검색으로 돌아갑니다.</p></li>
<li><p><strong>바차르 타입 인덱스(</strong><code translate="no">json_cast_type=&quot;varchar&quot;</code><strong>)를 생성하는</strong> 경우 문자열 타입 필터 조건만 인덱스를 사용할 수 있습니다. 그렇지 않으면 Milvus는 무차별 대입 검색으로 돌아갑니다.</p></li>
<li><p><strong>부울</strong> 인덱싱은 바차르 타입과 유사하게 작동합니다.</p></li>
</ul></li>
<li><p><strong>용어 표현식</strong>:</p>
<ul>
<li><code translate="no">json[&quot;field&quot;] in [value1, value2, …]</code> 을 사용할 수 있습니다. 그러나 인덱스는 해당 경로 아래에 저장된 스칼라 값에 대해서만 작동합니다. <code translate="no">json[&quot;field&quot;]</code> 이 배열인 경우 쿼리는 무차별 대입으로 돌아갑니다(배열형 인덱싱은 아직 지원되지 않음).</li>
</ul></li>
<li><p><strong>숫자 정밀도</strong>:</p>
<ul>
<li>내부적으로 Milvus는 모든 숫자 필드를 이중으로 색인합니다. 숫자 값이 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2532^{53}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">53을</span></span></span></span></span></span></span></span></span></span></span></span> 초과하면 정밀도가 떨어지며, 범위를 벗어난 값에 대한 쿼리는 정확히 일치하지 않을 수 있습니다.</li>
</ul></li>
<li><p><strong>데이터 무결성</strong>:</p>
<ul>
<li>Milvus는 사용자가 지정한 형 변환을 넘어서는 JSON 키를 구문 분석하거나 변환하지 않습니다. 소스 데이터가 일관성이 없는 경우(예: 일부 행은 <code translate="no">&quot;k&quot;</code> 키에 대해 문자열을 저장하고 다른 행은 숫자를 저장하는 경우) 일부 행은 인덱싱되지 않습니다.</li>
</ul></li>
</ul>
