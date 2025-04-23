---
id: array-operators.md
title: 배열 연산자
summary: Milvus는 배열 필드를 쿼리할 수 있는 강력한 연산자를 제공하여 배열의 내용을 기반으로 엔티티를 필터링하고 검색할 수 있습니다.
---
<h1 id="ARRAY-Operators" class="common-anchor-header">배열 연산자<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>밀버스는 배열 필드를 쿼리할 수 있는 강력한 연산자를 제공하여 배열의 내용을 기반으로 엔티티를 필터링하고 검색할 수 있습니다.</p>
<div class="alert note">
<p>배열 내의 모든 요소는 동일한 유형이어야 하며 배열 내의 중첩 구조는 일반 문자열로 취급됩니다. 따라서 배열 필드로 작업할 때는 최적의 성능을 위해 지나치게 깊은 중첩을 피하고 데이터 구조가 가능한 한 평평한지 확인하는 것이 좋습니다.</p>
</div>
<h2 id="Available-ARRAY-Operators" class="common-anchor-header">사용 가능한 ARRAY 연산자<button data-href="#Available-ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>ARRAY 연산자를 사용하면 Milvus에서 배열 필드를 세밀하게 쿼리할 수 있습니다. 이러한 연산자는 다음과 같습니다:</p>
<ul>
<li><p><code translate="no">ARRAY_CONTAINS(identifier, expr)</code>배열 필드에 특정 요소가 존재하는지 확인합니다.</p></li>
<li><p><code translate="no">ARRAY_CONTAINS_ALL(identifier, expr)</code>는 지정된 목록의 모든 요소가 배열 필드에 있는지 확인합니다.</p></li>
<li><p><code translate="no">ARRAY_CONTAINS_ANY(identifier, expr)</code>지정된 목록의 요소가 배열 필드에 있는지 확인합니다.</p></li>
<li><p><code translate="no">ARRAY_LENGTH(identifier, expr)</code>배열 필드에 있는 요소의 수를 기준으로 엔티티를 필터링할 수 있습니다.</p></li>
</ul>
<h2 id="ARRAYCONTAINS" class="common-anchor-header">ARRAY_CONTAINS<button data-href="#ARRAYCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS</code> 연산자는 배열 필드에 특정 요소가 있는지 확인합니다. 지정된 요소가 배열에 있는 엔티티를 찾고자 할 때 유용합니다.</p>
<p><strong>예제</strong></p>
<p>연도별로 기록된 최저 기온을 포함하는 배열 필드 <code translate="no">history_temperatures</code> 가 있다고 가정해 보겠습니다. 배열에 <code translate="no">23</code> 값이 포함된 모든 엔터티를 찾으려면 다음 필터 표현식을 사용할 수 있습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>그러면 <code translate="no">history_temperatures</code> 배열에 <code translate="no">23</code> 값이 포함된 모든 엔티티가 반환됩니다.</p>
<h2 id="ARRAYCONTAINSALL" class="common-anchor-header">array_contains_all<button data-href="#ARRAYCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS_ALL</code> 연산자는 지정된 목록의 모든 요소가 배열 필드에 있는지 확인합니다. 이 연산자는 배열에 여러 값을 포함하는 엔티티를 일치시키려는 경우에 유용합니다.</p>
<p><strong>예제</strong></p>
<p><code translate="no">history_temperatures</code> 배열에 <code translate="no">23</code> 과 <code translate="no">24</code> 이 모두 포함된 모든 엔티티를 찾으려면 다음을 사용할 수 있습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>그러면 <code translate="no">history_temperatures</code> 배열에 지정된 값이 모두 포함된 모든 엔티티가 반환됩니다.</p>
<h2 id="ARRAYCONTAINSANY" class="common-anchor-header">array_contains_any<button data-href="#ARRAYCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS_ANY</code> 연산자는 지정된 목록의 요소가 배열 필드에 있는지 확인합니다. 이 연산자는 배열에 지정된 값 중 하나 이상이 포함된 엔티티를 일치시키려는 경우에 유용합니다.</p>
<p><strong>예제</strong></p>
<p><code translate="no">history_temperatures</code> 배열에 <code translate="no">23</code> 또는 <code translate="no">24</code> 이 포함된 모든 엔티티를 찾으려면 다음을 사용할 수 있습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>그러면 <code translate="no">history_temperatures</code> 배열에 <code translate="no">23</code> 또는 <code translate="no">24</code> 값 중 하나 이상이 포함된 모든 엔티티가 반환됩니다.</p>
<h2 id="ARRAYLENGTH" class="common-anchor-header">ARRAY_LENGTH<button data-href="#ARRAYLENGTH" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_LENGTH</code> 연산자를 사용하면 배열 필드에 있는 요소 수를 기준으로 엔티티를 필터링할 수 있습니다. 이 연산자는 특정 길이의 배열을 가진 엔티티를 찾아야 할 때 유용합니다.</p>
<p><strong>예제</strong></p>
<p><code translate="no">history_temperatures</code> 배열의 요소가 10개 미만인 모든 엔티티를 찾고자 하는 경우 다음을 사용할 수 있습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>그러면 <code translate="no">history_temperatures</code> 배열의 요소가 10개 미만인 모든 엔티티가 반환됩니다.</p>
