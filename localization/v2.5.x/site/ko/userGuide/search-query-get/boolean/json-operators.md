---
id: json-operators.md
title: JSON 연산자
summary: >-
  Milvus는 JSON 필드 쿼리 및 필터링을 위한 고급 연산자를 지원하므로 복잡한 구조화된 데이터를 관리하는 데 적합합니다. 이러한
  연산자를 사용하면 JSON 문서를 매우 효과적으로 쿼리할 수 있으므로 JSON 필드 내의 특정 요소, 값 또는 조건에 따라 엔티티를 검색할
  수 있습니다. 이 섹션에서는 Milvus에서 JSON 전용 연산자를 사용하는 방법을 안내하고, 그 기능을 설명하기 위한 실제 예제를
  제공합니다.
---
<h1 id="JSON-Operators" class="common-anchor-header">JSON 연산자<button data-href="#JSON-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 JSON 필드 쿼리 및 필터링을 위한 고급 연산자를 지원하므로 복잡하고 구조화된 데이터를 관리하는 데 적합합니다. 이러한 연산자를 사용하면 JSON 문서를 매우 효과적으로 쿼리할 수 있으므로 JSON 필드 내의 특정 요소, 값 또는 조건에 따라 엔티티를 검색할 수 있습니다. 이 섹션에서는 Milvus에서 JSON 전용 연산자를 사용하는 방법을 안내하고, 그 기능을 설명하기 위한 실제 예제를 제공합니다.</p>
<div class="alert note">
<p>JSON 필드는 복잡한 중첩 구조를 처리할 수 없으며 모든 중첩 구조를 일반 문자열로 취급합니다. 따라서 JSON 필드로 작업할 때는 지나치게 깊은 중첩을 피하고 최적의 성능을 위해 데이터 구조가 가능한 한 평평한지 확인하는 것이 좋습니다.</p>
</div>
<h2 id="Available-JSON-Operators" class="common-anchor-header">사용 가능한 JSON 연산자<button data-href="#Available-JSON-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 JSON 데이터를 필터링하고 쿼리하는 데 도움이 되는 몇 가지 강력한 JSON 연산자를 제공하며, 이러한 연산자는 다음과 같습니다:</p>
<ul>
<li><p><code translate="no">JSON_CONTAINS(identifier, expr)</code>: 필드 내에서 지정된 JSON 표현식이 있는 엔티티를 필터링합니다.</p></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, expr)</code>: 지정된 JSON 표현식의 모든 요소가 필드에 있는지 확인합니다.</p></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, expr)</code>: 필드 내에 JSON 표현식의 멤버가 하나 이상 존재하는 엔티티를 필터링합니다.</p></li>
</ul>
<p>이러한 연산자를 예제를 통해 살펴보고 실제 시나리오에서 어떻게 적용될 수 있는지 알아보겠습니다.</p>
<h2 id="JSONCONTAINS" class="common-anchor-header">JSON_CONTAINS<button data-href="#JSONCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">json_contains</code> 연산자는 JSON 필드 내에 특정 요소 또는 하위 배열이 존재하는지 확인합니다. JSON 배열이나 객체에 특정 값이 포함되어 있는지 확인하고자 할 때 유용합니다.</p>
<p><strong>예제</strong></p>
<p>각각 <code translate="no">[&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]</code> 과 같은 문자열의 JSON 배열을 포함하는 <code translate="no">tags</code> 필드가 있는 제품 컬렉션이 있다고 가정해 보겠습니다. <code translate="no">&quot;sale&quot;</code> 태그가 있는 제품을 필터링하려고 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 예제에서 Milvus는 <code translate="no">tags</code> 필드에 <code translate="no">&quot;sale&quot;</code> 요소가 포함된 모든 제품을 반환합니다.</p>
<h2 id="JSONCONTAINSALL" class="common-anchor-header">JSON_contains_all<button data-href="#JSONCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">json_contains_all</code> 연산자는 지정된 JSON 표현식의 모든 요소가 대상 필드에 있는지 확인합니다. 이 연산자는 JSON 배열 내에서 여러 값을 일치시켜야 할 때 특히 유용합니다.</p>
<p><strong>예제</strong></p>
<p>제품 태그 시나리오를 계속 진행하면서 <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, <code translate="no">&quot;new&quot;</code> 태그가 있는 모든 제품을 찾고자 하는 경우 <code translate="no">json_contains_all</code> 연산자를 사용하면 됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 쿼리는 <code translate="no">tags</code> 배열에 지정된 세 가지 요소가 모두 포함된 모든 제품을 반환합니다: <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, <code translate="no">&quot;new&quot;</code> 을 모두 반환합니다.</p>
<h2 id="JSONCONTAINSANY" class="common-anchor-header">json_contains_any<button data-href="#JSONCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">json_contains_any</code> 연산자는 필드 내에 JSON 표현식의 멤버가 하나 이상 존재하는 엔티티를 필터링합니다. 이 연산자는 여러 가능한 값 중 하나를 기준으로 엔티티를 일치시키려는 경우에 유용합니다.</p>
<p><strong>예제</strong></p>
<p><code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, <code translate="no">&quot;new&quot;</code> 태그 중 하나 이상이 있는 제품을 필터링하고 싶다고 가정해 보겠습니다. <code translate="no">json_contains_any</code> 연산자를 사용하여 이를 수행할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 경우 Milvus는 목록에 <code translate="no">[&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;]</code> 태그 중 하나 이상의 태그가 있는 모든 제품을 반환합니다. 제품에 이러한 태그 중 하나만 있는 경우에도 결과에 포함됩니다.</p>
