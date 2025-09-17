---
id: json-field-overview.md
title: JSON 필드 개요
summary: >-
  제품 카탈로그, 콘텐츠 관리 시스템 또는 사용자 환경 설정 엔진과 같은 애플리케이션을 구축할 때는 벡터 임베딩과 함께 유연한 메타데이터를
  저장해야 하는 경우가 많습니다. 제품 속성은 카테고리에 따라 다양하고, 사용자 선호도는 시간이 지남에 따라 변화하며, 문서 속성은 복잡한
  중첩 구조를 가지고 있습니다. Milvus의 JSON 필드는 성능 저하 없이 유연한 구조화 데이터를 저장하고 쿼리할 수 있도록 지원하여
  이러한 문제를 해결합니다.
---
<h1 id="JSON-Field-Overview" class="common-anchor-header">JSON 필드 개요<button data-href="#JSON-Field-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>제품 카탈로그, 콘텐츠 관리 시스템 또는 사용자 환경 설정 엔진과 같은 애플리케이션을 구축할 때 벡터 임베딩과 함께 유연한 메타데이터를 저장해야 하는 경우가 많습니다. 제품 속성은 카테고리에 따라 다양하고, 사용자 선호도는 시간이 지남에 따라 변화하며, 문서 속성은 복잡한 중첩 구조를 가지고 있습니다. Milvus의 JSON 필드는 성능 저하 없이 유연한 구조화 데이터를 저장하고 쿼리할 수 있도록 지원하여 이러한 문제를 해결합니다.</p>
<h2 id="What-is-a-JSON-field" class="common-anchor-header">JSON 필드란 무엇인가요?<button data-href="#What-is-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>JSON 필드는 구조화된 키-값 데이터를 저장하는 Milvus의 스키마 정의 데이터 유형(<code translate="no">DataType.JSON</code>)입니다. 기존의 리지드 데이터베이스 열과 달리 JSON 필드는 중첩된 개체, 배열 및 혼합 데이터 유형을 수용하는 동시에 빠른 쿼리를 위한 여러 인덱싱 옵션을 제공합니다.</p>
<p>JSON 필드 구조 예시:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> 
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 예에서 <code translate="no">metadata</code> 는 플랫 값(예: <code translate="no">category</code>, <code translate="no">in_stock</code>), 배열(<code translate="no">tags</code>), 중첩된 개체(<code translate="no">supplier</code>)가 혼합되어 있는 단일 JSON 필드입니다.</p>
<div class="alert note">
<p><strong>이름 지정 규칙:</strong> JSON 키에는 문자, 숫자, 밑줄만 사용하세요. 특수 문자, 공백 또는 점은 쿼리에서 구문 분석 문제를 일으킬 수 있으므로 피하세요.</p>
</div>
<h2 id="JSON-field-vs-dynamic-field" class="common-anchor-header">JSON 필드와 동적 필드 비교<button data-href="#JSON-field-vs-dynamic-field" class="anchor-icon" translate="no">
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
    </button></h2><p>흔히 혼동하기 쉬운 점은 JSON 필드와 <a href="/docs/ko/enable-dynamic-field.md">동적 필</a>드의 차이점입니다. 둘 다 JSON과 관련이 있지만 서로 다른 용도로 사용됩니다.</p>
<p>아래 표에는 JSON 필드와 동적 필드의 주요 차이점이 요약되어 있습니다:</p>
<table>
   <tr>
     <th><p>기능</p></th>
     <th><p>JSON 필드</p></th>
     <th><p>동적 필드</p></th>
   </tr>
   <tr>
     <td><p>스키마 정의</p></td>
     <td><p>컬렉션 스키마에서 <code translate="no">DataType.JSON</code> 유형으로 명시적으로 선언해야 하는 스칼라 필드입니다.</p></td>
     <td><p>선언되지 않은 필드를 자동으로 저장하는 숨겨진 JSON 필드(이름: <code translate="no">#meta</code>)입니다.</p></td>
   </tr>
   <tr>
     <td><p>사용 사례</p></td>
     <td><p>스키마가 알려져 있고 일관성이 있는 구조화된 데이터를 저장합니다.</p></td>
     <td><p>고정된 스키마에 맞지 않는 유연하고 진화하는 데이터 또는 반정형 데이터를 저장합니다.</p></td>
   </tr>
   <tr>
     <td><p>제어</p></td>
     <td><p>필드 이름과 구조를 제어합니다.</p></td>
     <td><p>정의되지 않은 필드에 대해 시스템에서 관리합니다.</p></td>
   </tr>
   <tr>
     <td><p>쿼리</p></td>
     <td><p>JSON 필드 내에서 필드 이름 또는 대상 키를 사용하여 쿼리: <code translate="no">metadata["key"]</code>.</p></td>
     <td><p>동적 필드 키를 사용하여 직접 쿼리: <code translate="no">"dynamic_key"</code> 또는 <code translate="no">#meta</code> 을 통해 쿼리합니다: <code translate="no">#meta["dynamic_key"]</code></p></td>
   </tr>
</table>
<h2 id="Basic-operations" class="common-anchor-header">기본 작업<button data-href="#Basic-operations" class="anchor-icon" translate="no">
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
    </button></h2><p>JSON 필드를 사용하기 위한 기본적인 워크플로에는 스키마에서 필드를 정의하고, 데이터를 삽입한 다음, 특정 필터 표현식을 사용하여 데이터를 쿼리하는 것이 포함됩니다.</p>
<h3 id="Define-a-JSON-field" class="common-anchor-header">JSON 필드 정의하기<button data-href="#Define-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h3><p>JSON 필드를 사용하려면 컬렉션을 만들 때 컬렉션 스키마에 명시적으로 정의합니다. 다음 예는 <code translate="no">DataType.JSON</code> 유형의 <code translate="no">metadata</code> 필드가 있는 컬렉션을 만드는 방법을 보여줍니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address </span>

<span class="hljs-comment"># Create schema</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>)

schema.add_field(field_name=<span class="hljs-string">&quot;product_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Primary field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>) <span class="hljs-comment"># Vector field</span>
<span class="hljs-comment"># Define a JSON field that allows null values</span>
<span class="highlighted-wrapper-line">schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON, nullable=<span class="hljs-literal">True</span>)</span>

client.create_collection(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>이 예제에서 컬렉션 스키마에 정의된 JSON 필드는 <code translate="no">nullable=True</code> 으로 null 값을 허용합니다. 자세한 내용은 <a href="/docs/ko/nullable-and-default.md">Null 가능 및 기본값을</a> 참조하세요.</p>
</div>
<h3 id="Insert-data" class="common-anchor-header">데이터 삽입<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>컬렉션이 만들어지면 지정된 JSON 필드에 구조화된 JSON 개체를 포함하는 엔티티를 삽입합니다. 데이터의 형식은 사전 목록으로 지정해야 합니다.</p>
<pre><code translate="no" class="language-python">entities = [
    {
        <span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;metadata&quot;</span>: { <span class="hljs-comment"># JSON field</span></span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;supplier&quot;</span>: {</span>
<span class="highlighted-comment-line">                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,</span>
<span class="highlighted-comment-line">                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,</span>
<span class="highlighted-comment-line">                <span class="hljs-string">&quot;contact&quot;</span>: {</span>
<span class="highlighted-comment-line">                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,</span>
<span class="highlighted-comment-line">                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span></span>
<span class="highlighted-comment-line">                }</span>
<span class="highlighted-comment-line">            }</span>
<span class="highlighted-comment-line">        }</span>
    }
]

client.insert(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Filtering-operations" class="common-anchor-header">필터링 작업<button data-href="#Filtering-operations" class="anchor-icon" translate="no">
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
    </button></h3><p>JSON 필드에서 필터링 작업을 수행하려면 먼저 다음 사항을 확인하세요:</p>
<ul>
<li><p>각 벡터 필드에 인덱스를 만들었습니다.</p></li>
<li><p>컬렉션이 메모리에 로드되었습니다.</p></li>
</ul>
<p><details></p>
<p><summary>코드 보기</summary></p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

client.create_index(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, index_params=index_params)

client.load_collection(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>이러한 요구 사항이 충족되면 아래 표현식을 사용하여 JSON 필드 내의 값을 기준으로 컬렉션을 필터링할 수 있습니다. 이러한 필터 표현식은 특정 JSON 경로 구문과 전용 연산자를 활용합니다.</p>
<h4 id="Filtering-with-JSON-path-syntax" class="common-anchor-header">JSON 경로 구문을 사용한 필터링</h4><p>특정 키를 쿼리하려면 대괄호 표기법을 사용하여 JSON 키에 액세스합니다: <code translate="no">json_field_name[&quot;key&quot;]</code>. 중첩된 키의 경우, 서로 연결합니다: <code translate="no">json_field_name[&quot;key1&quot;][&quot;key2&quot;]</code>.</p>
<p><code translate="no">category</code> 가 <code translate="no">&quot;electronics&quot;</code> 인 엔티티를 필터링하려면 다음과 같이 하세요:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>

client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>중첩된 키가 <code translate="no">supplier[&quot;country&quot;]</code> 인 엔티티를 필터링하려면 <code translate="no">&quot;USA&quot;</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;country&quot;] == &quot;USA&quot;&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Filtering-with-JSON-specific-operators" class="common-anchor-header">JSON 전용 연산자로 필터링하기</h4><p>Milvus는 특정 JSON 필드 키의 배열 값을 쿼리하기 위한 특수 연산자도 제공합니다. 예를 들어</p>
<ul>
<li><p><code translate="no">json_contains(identifier, expr)</code>: JSON 배열 내에 특정 요소 또는 하위 배열이 존재하는지 확인합니다.</p></li>
<li><p><code translate="no">json_contains_all(identifier, expr)</code>: 지정된 JSON 표현식의 모든 요소가 필드에 있는지 확인합니다.</p></li>
<li><p><code translate="no">json_contains_any(identifier, expr)</code>: 필드 내에 JSON 표현식의 멤버가 하나 이상 존재하는 엔티티를 필터링합니다.</p></li>
</ul>
<p><code translate="no">tags</code> 키 아래에 <code translate="no">&quot;summer_sale&quot;</code> 값이 있는 제품을 찾으려면 다음과 같이 입력합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(metadata[&quot;tags&quot;], &quot;summer_sale&quot;)&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">tags</code> 키 아래에 <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;new&quot;</code>, <code translate="no">&quot;clearance&quot;</code> 값 중 하나 이상이 있는 제품을 찾으려면 다음을 수행합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_any(metadata[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>JSON 관련 연산자에 대한 자세한 내용은 <a href="/docs/ko/json-operators.md">JSON 연산자를</a> 참조하세요.</p>
<h2 id="Next-Accelerate-JSON-queries" class="common-anchor-header">다음: JSON 쿼리 가속화하기<button data-href="#Next-Accelerate-JSON-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>기본적으로 가속 기능이 없는 JSON 필드에 대한 쿼리는 모든 행에 대한 전체 스캔을 수행하므로 대규모 데이터 세트에서는 속도가 느려질 수 있습니다. JSON 쿼리 속도를 높이기 위해 Milvus는 고급 인덱싱 및 저장소 최적화 기능을 제공합니다.</p>
<p>아래 표에는 이 기능들의 차이점과 최상의 사용 시나리오가 요약되어 있습니다:</p>
<table>
   <tr>
     <th><p>기술</p></th>
     <th><p>최상의 용도</p></th>
     <th><p>배열 가속화</p></th>
     <th><p>참고</p></th>
   </tr>
   <tr>
     <td><p>JSON 인덱싱</p></td>
     <td><p>자주 액세스하는 작은 키 집합, 특정 배열 키의 배열</p></td>
     <td><p>예(인덱싱된 배열 키에)</p></td>
     <td><p>키를 미리 선택해야 함, 스키마가 진화하는 경우 유지 관리 필요</p></td>
   </tr>
   <tr>
     <td><p>JSON 파쇄</p></td>
     <td><p>많은 키에 걸쳐 일반적인 속도 향상, 다양한 쿼리에 유연하게 적용 가능</p></td>
     <td><p>아니요(배열 내부의 값을 가속하지 않음)</p></td>
     <td><p>추가 스토리지 구성, 배열에는 여전히 키별 인덱스 필요</p></td>
   </tr>
   <tr>
     <td><p>NGRAM 인덱스</p></td>
     <td><p>와일드카드 검색, 텍스트 필드에서 하위 문자열 매칭</p></td>
     <td><p>N/A</p></td>
     <td><p>숫자/범위 필터에는 사용 불가</p></td>
   </tr>
</table>
<p><strong>팁:</strong> 이러한 접근 방식을 결합할 수 있습니다. 예를 들어, 광범위한 쿼리 가속을 위해 JSON 파쇄를 사용하고, 빈도가 높은 배열 키에는 JSON 인덱싱을 사용하고, 유연한 텍스트 검색을 위해 NGRAM 인덱싱을 사용할 수 있습니다.</p>
<p>구현에 대한 자세한 내용은 다음을 참조하세요:</p>
<ul>
<li><p><a href="/docs/ko/json-indexing.md">JSON 인덱싱</a></p></li>
<li><p><a href="/docs/ko/json-shredding.md">JSON 파쇄</a></p></li>
<li><p><a href="/docs/ko/ngram.md">NGRAM</a></p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Are-there-any-limitations-on-the-size-of-a-JSON-field" class="common-anchor-header">JSON 필드의 크기에 제한이 있나요?<button data-href="#Are-there-any-limitations-on-the-size-of-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h3><p>네. 각 JSON 필드는 65,536바이트로 제한됩니다.</p>
<h3 id="Does-a-JSON-field-support-setting-a-default-value" class="common-anchor-header">JSON 필드에서 기본값 설정을 지원하나요?<button data-href="#Does-a-JSON-field-support-setting-a-default-value" class="anchor-icon" translate="no">
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
    </button></h3><p>아니요, JSON 필드는 기본값을 지원하지 않습니다. 그러나 필드를 정의할 때 <code translate="no">nullable=True</code> 을 설정하여 빈 항목을 허용할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/nullable-and-default.md">Null 가능 및 기본값을</a> 참조하세요.</p>
<h3 id="Are-there-any-naming-conventions-for-JSON-field-keys" class="common-anchor-header">JSON 필드 키에 대한 명명 규칙이 있나요?<button data-href="#Are-there-any-naming-conventions-for-JSON-field-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>예, 쿼리 및 인덱싱과의 호환성을 보장하기 위한 것입니다:</p>
<ul>
<li><p>JSON 키에는 문자, 숫자, 밑줄만 사용하세요.</p></li>
<li><p>특수 문자, 공백 또는 점(<code translate="no">.</code>, <code translate="no">/</code>, 등)은 사용하지 마세요.</p></li>
<li><p>호환되지 않는 키는 필터 표현식에서 구문 분석 문제를 일으킬 수 있습니다.</p></li>
</ul>
<h3 id="How-does-Milvus-handle-string-values-in-JSON-fields" class="common-anchor-header">Milvus는 JSON 필드에서 문자열 값을 어떻게 처리하나요?<button data-href="#How-does-Milvus-handle-string-values-in-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus는 의미 변환 없이 JSON 입력에 표시된 그대로 문자열 값을 저장합니다. 부적절하게 따옴표로 묶인 문자열은 구문 분석 중에 오류가 발생할 수 있습니다.</p>
<p><strong>유효한 문자열의 예</strong></p>
<pre><code translate="no" class="language-plaintext">&quot;a\&quot;b&quot;, &quot;a&#x27;b&quot;, &quot;a\\b&quot;
<button class="copy-code-btn"></button></code></pre>
<p><strong>유효하지 않은 문자열의 예</strong></p>
<pre><code translate="no" class="language-plaintext">&#x27;a&quot;b&#x27;, &#x27;a\&#x27;b&#x27;
<button class="copy-code-btn"></button></code></pre>
