---
id: basic-operators.md
title: 기본 연산자
summary: >-
  Milvus는 데이터를 효율적으로 필터링하고 쿼리할 수 있도록 다양한 기본 연산자를 제공합니다. 이러한 연산자를 활용하면 스칼라 필드, 수치
  연산, 논리 조건 등을 기반으로 검색 조건을 세밀하게 조정할 수 있습니다. 정확한 쿼리를 작성하고 검색 효율을 극대화하기 위해서는 이러한
  연산자의 사용법을 이해하는 것이 매우 중요합니다.
---
<h1 id="Basic-Operators" class="common-anchor-header">기본 연산자<button data-href="#Basic-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 데이터를 효율적으로 필터링하고 쿼리할 수 있도록 다양한 기본 연산자를 제공합니다. 이러한 연산자를 사용하면 스칼라 필드, 수치 계산, 논리 조건 등을 기반으로 검색 조건을 세밀하게 조정할 수 있습니다. 정확한 쿼리를 작성하고 검색 효율을 극대화하기 위해서는 이러한 연산자의 사용법을 이해하는 것이 매우 중요합니다.</p>
<h2 id="Comparison-operators" class="common-anchor-header">비교 연산자<button data-href="#Comparison-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>비교 연산자는 등가, 부등가 또는 크기 기준에 따라 데이터를 필터링하는 데 사용됩니다. 이 연산자들은 숫자형 및 텍스트형 필드에 적용할 수 있습니다.</p>
<h3 id="Supported-comparison-operators" class="common-anchor-header">지원되는 비교 연산자<button data-href="#Supported-comparison-operators" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><code translate="no">==</code> (같음)</p></li>
<li><p><code translate="no">!=</code> (불등호)</p></li>
<li><p><code translate="no">&gt;</code> (보다 큼)</p></li>
<li><p><code translate="no">&lt;</code> (보다 작음)</p></li>
<li><p><code translate="no">&gt;=</code> (보다 크거나 같음)</p></li>
<li><p><code translate="no">&lt;=</code> (작거나 같음)</p></li>
</ul>
<h3 id="Example-1-Filtering-with-equal-to-" class="common-anchor-header">예 1: '와 같음' 조건으로 필터링하기 (<code translate="no">==</code>)<button data-href="#Example-1-Filtering-with-equal-to-" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">status</code> 라는 필드가 있고, <code translate="no">status</code> 가 "active"인 모든 엔티티를 찾고자 한다고 가정해 보겠습니다. 등호 연산자 <code translate="no">==</code> 를 사용할 수 있습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtering-with-not-equal-to-" class="common-anchor-header">예제 2: '<code translate="no">!=</code>'에 대한 '아님' 조건으로 필터링하기<button data-href="#Example-2-Filtering-with-not-equal-to-" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">status</code> 가 "inactive"가 아닌 엔티티를 찾으려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status != &quot;inactive&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Filtering-with-greater-than-" class="common-anchor-header">예 3: '보다 큼' 조건으로 필터링하기 (<code translate="no">&gt;</code>)<button data-href="#Example-3-Filtering-with-greater-than-" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">age</code> 값이 30보다 큰 모든 엔티티를 찾으려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;age &gt; 30&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Filtering-with-less-than" class="common-anchor-header">예 4: '보다 작음' 조건으로 필터링하기<button data-href="#Example-4-Filtering-with-less-than" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">price</code> 값이 100보다 작은 엔티티를 찾으려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &lt; 100&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Filtering-with-greater-than-or-equal-to-" class="common-anchor-header">예 5:<code translate="no">&gt;=</code> 가 30보다 크거나 같은 값으로 필터링하기<button data-href="#Example-5-Filtering-with-greater-than-or-equal-to-" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">rating</code> 가 4 이상인 모든 엔티티를 찾으려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Filtering-with-less-than-or-equal-to" class="common-anchor-header">예 6: ‘보다 작거나 같음’을 이용한 필터링<button data-href="#Example-6-Filtering-with-less-than-or-equal-to" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">discount</code> 가 10% 이하인 엔티티를 찾으려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Range-operators" class="common-anchor-header">범위 연산자<button data-href="#Range-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>범위 연산자는 특정 값 집합을 기준으로 데이터를 필터링하는 데 도움이 됩니다. Milvus는 집합 소속 여부를 확인하기 위해 <code translate="no">IN</code> 를 지원합니다.</p>
<p><code translate="no">color</code> 가 "red", "green" 또는 "blue"인 모든 엔티티를 찾으려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이는 값 목록에 속하는지 여부를 확인할 때 유용합니다.</p>
<h2 id="Pattern-matching-operators" class="common-anchor-header">패턴 매칭 연산자<button data-href="#Pattern-matching-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>패턴 일치 연산자는 와일드카드 패턴이나 정규식을 기반으로 문자열 값을 필터링하는 데 도움이 됩니다.</p>
<ul>
<li><p><code translate="no">LIKE</code>: 문자열 값에 대한 간단한 와일드카드 패턴과 일치시키는 데 사용됩니다. 예를 들어, <code translate="no">name LIKE &quot;Prod%&quot;</code> 는 <code translate="no">Prod</code> 로 시작하는 값과 일치합니다.</p></li>
<li><p><code translate="no">=~</code>: 문자열 값을 RE2 정규 표현식과 일치시키는 데 사용됩니다. 예를 들어, ` <code translate="no">code =~ &quot;E[0-9]{4}&quot;</code> `는 ` <code translate="no">E1001</code>`와 같은 오류 코드를 포함하는 값과 일치합니다.</p></li>
<li><p><code translate="no">!~</code>: RE2 정규 표현식과 일치하는 문자열 값을 제외하는 데 사용됩니다. 이는 <code translate="no">NOT (field =~ &quot;pattern&quot;)</code> 와 동일합니다.</p></li>
</ul>
<p><code translate="no">name</code> 가 <code translate="no">Prod</code> 로 시작하는 엔티티를 찾으려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">code</code> 에 <code translate="no">E1001</code> 과 같은 오류 코드가 포함된 엔티티를 찾으려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">message</code> 가 <code translate="no">DEBUG</code> 로 시작하는 엔티티를 제외하려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">LIKE</code> 와 정규 표현식(regex) 중 선택 방법, 지원되는 필드 유형, 정규 표현식 구문, 이스케이프 규칙 및 성능에 대한 자세한 내용은 <a href="/docs/ko/pattern-matching.md">‘패턴 매칭’을</a> 참조하십시오. 또한 Milvus에서는 <code translate="no">VARCHAR</code> 필드나 JSON 문자열 경로에 <code translate="no">NGRAM</code> 인덱스를 생성하여 해당 패턴 매칭 필터의 성능을 향상시킬 수 있습니다. 자세한 내용은 <a href="/docs/ko/ngram.md">‘NGRAM’을</a> 참조하십시오.</p>
<h2 id="Arithmetic-operators" class="common-anchor-header">산술 연산자<button data-href="#Arithmetic-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>산술 연산자를 사용하면 숫자 필드를 포함한 계산을 기반으로 조건을 생성할 수 있습니다.</p>
<h3 id="Supported-arithmetic-operators" class="common-anchor-header">지원되는 산술 연산자<button data-href="#Supported-arithmetic-operators" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><code translate="no">+</code> (덧셈)</p></li>
<li><p><code translate="no">-</code> (뺄셈)</p></li>
<li><p><code translate="no">*</code> (곱셈)</p></li>
<li><p><code translate="no">/</code> (나눗셈)</p></li>
<li><p><code translate="no">%</code> (모듈로 연산)</p></li>
<li><p><code translate="no">**</code> (제곱)</p></li>
</ul>
<h3 id="Example-1-Using-modulus-" class="common-anchor-header">예제 1: 나머지 연산 사용 (<code translate="no">%</code>)<button data-href="#Example-1-Using-modulus-" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">id</code> 가 짝수(즉, 2로 나누어 떨어지는 수)인 원소를 구하려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-exponentiation-" class="common-anchor-header">예제 2: 지수 연산 활용 (<code translate="no">**</code>)<button data-href="#Example-2-Using-exponentiation-" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">price</code> 의 2제곱이 1000보다 큰 개체를 찾으려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price ** 2 &gt; 1000&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Bitwise-operators--Milvus-300+" class="common-anchor-header">비트 연산자<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#Bitwise-operators--Milvus-300+" class="anchor-icon" translate="no">
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
    </button></h2><p>비트 연산자는 정수 필드가 권한, 기능 플래그 또는 상태 비트와 같은 여러 플래그를 인코딩할 때 유용합니다. 필터 표현식에서 이러한 연산자를 사용하여 정수 값의 개별 비트를 확인, 결합 또는 비교할 수 있습니다.</p>
<p>스칼라 필드의 경우, 비트 연산자는 <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code> 와 같은 정수 필드 유형에 적용됩니다.</p>
<h3 id="Supported-bitwise-operators" class="common-anchor-header">지원되는 비트 단위 연산자<button data-href="#Supported-bitwise-operators" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>연산자</th><th>이름</th><th>일반적인 용도</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">&amp;</code></td><td>비트별 AND</td><td>특정 비트가 설정되어 있는지 확인합니다.</td></tr>
<tr><td><code translate="no">|</code></td><td>비트별 OR</td><td>비트를 결합한 후 비교합니다.</td></tr>
<tr><td><code translate="no">^</code></td><td>비트별 XOR</td><td>두 값 간의 비트 차이를 비교합니다.</td></tr>
</tbody>
</table>
<h3 id="Example-Filtering-by-permission-bits" class="common-anchor-header">예: 권한 비트를 이용한 필터링<button data-href="#Example-Filtering-by-permission-bits" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">permissions</code> 라는 정수 필드가 있다고 가정하고, 이 정수의 각 비트가 권한 플래그를 나타낸다고 합시다:</p>
<table>
<thead>
<tr><th>권한 플래그</th><th>비트 값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">READ</code></td><td><code translate="no">1</code></td></tr>
<tr><td><code translate="no">WRITE</code></td><td><code translate="no">2</code></td></tr>
<tr><td><code translate="no">SHARE</code></td><td><code translate="no">4</code></td></tr>
<tr><td><code translate="no">ADMIN</code></td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
<p>예를 들어, ` <code translate="no">permissions = 5</code> `는 ` <code translate="no">READ</code> ` 및 ` <code translate="no">SHARE</code> ` 비트가 설정되어 있음을 의미합니다. 이는 ` <code translate="no">5 = 1 + 4</code>`이기 때문입니다.</p>
<p><code translate="no">SHARE</code> 비트가 설정된 엔티티를 찾으려면 비트별 AND 연산(<code translate="no">&amp;</code>)을 사용합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;(permissions &amp; 4) == 4&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">WRITE</code> 비트를 설정했을 때 <code translate="no">READ + WRITE + SHARE</code> 권한 세트가 생성되는 엔티티를 찾으려면 비트별 OR 연산(<code translate="no">|</code>)을 사용합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;(permissions | 2) == 7&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">READ + WRITE + SHARE</code> 와 <code translate="no">WRITE</code> 비트만 다른 엔티티를 찾으려면 비트별 XOR 연산(<code translate="no">^</code>)을 사용하십시오:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;(permissions ^ 7) == 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">(permissions &amp; 4) == 4</code> 와 같이 결과를 비교하기 전에는 항상 비트 연산을 괄호로 묶어야 합니다. Milvus 3.0.0은 필터 표현식에서 <code translate="no">&amp;</code>, <code translate="no">|</code> 및 <code translate="no">^</code> 을 지원합니다. 비트별 NOT(<code translate="no">~</code>) 및 시프트 연산자(<code translate="no">&lt;&lt;</code> 및 <code translate="no">&gt;&gt;</code>)는 지원되지 않습니다.</p>
</div>
<h2 id="Logical-operators" class="common-anchor-header">논리 연산자<button data-href="#Logical-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>논리 연산자는 여러 조건을 결합하여 더 복잡한 필터 표현식을 만드는 데 사용됩니다. 여기에는 <code translate="no">AND</code>, <code translate="no">OR</code> 및 <code translate="no">NOT</code> 가 포함됩니다.</p>
<h3 id="Supported-logical-operators" class="common-anchor-header">지원되는 논리 연산자<button data-href="#Supported-logical-operators" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><code translate="no">AND</code>: 여러 조건이 모두 참이어야 하는 경우를 결합합니다.</p></li>
<li><p><code translate="no">OR</code>: 조건 중 적어도 하나가 참이어야 하는 경우를 결합합니다.</p></li>
<li><p><code translate="no">NOT</code>: 조건을 부정합니다.</p></li>
</ul>
<h3 id="Example-1-Using-AND-to-combine-conditions" class="common-anchor-header">예 1: ` <code translate="no">AND</code> `을 사용하여 조건 결합하기<button data-href="#Example-1-Using-AND-to-combine-conditions" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">price</code> 가 100보다 크고 <code translate="no">stock</code> 가 50보다 큰 모든 제품을 찾으려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-OR-to-combine-conditions" class="common-anchor-header">예 2: ‘ <code translate="no">OR</code> ’를 사용하여 조건 결합하기<button data-href="#Example-2-Using-OR-to-combine-conditions" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">color</code> 가 “red”이거나 “blue”인 모든 상품을 찾으려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-NOT-to-exclude-a-condition" class="common-anchor-header">예 3: <code translate="no">NOT</code> 를 사용하여 조건 제외하기<button data-href="#Example-3-Using-NOT-to-exclude-a-condition" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">color</code> 가 “green”이 아닌 모든 상품을 찾으려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="IS-NULL-and-IS-NOT-NULL-operators" class="common-anchor-header">IS NULL 및 IS NOT NULL 연산자<button data-href="#IS-NULL-and-IS-NOT-NULL-operators" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">IS NULL</code> 및 <code translate="no">IS NOT NULL</code> 연산자는 필드에 null 값(데이터 부재)이 포함되어 있는지 여부에 따라 필터를 적용하는 데 사용됩니다.</p>
<ul>
<li><p><code translate="no">IS NULL</code>: 특정 필드에 null 값이 포함된 엔티티, 즉 값이 없거나 정의되지 않은 엔티티를 식별합니다.</p></li>
<li><p><code translate="no">IS NOT NULL</code>: 특정 필드에 null 이외의 값이 포함된 엔티티를 식별합니다. 즉, 해당 필드에 유효하고 정의된 값이 있음을 의미합니다.</p></li>
</ul>
<div class="alert note">
<p>연산자는 대소문자를 구분하지 않으므로, <code translate="no">IS NULL</code> 또는 <code translate="no">is null</code>, <code translate="no">IS NOT NULL</code> 또는 <code translate="no">is not null</code> 을 사용할 수 있습니다.</p>
</div>
<h3 id="Regular-scalar-fields-with-null-values" class="common-anchor-header">null 값을 포함하는 일반 스칼라 필드<button data-href="#Regular-scalar-fields-with-null-values" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus는 null 값을 가질 수 있는 문자열이나 숫자와 같은 일반 스칼라 필드에 대한 필터링을 지원합니다.</p>
<div class="alert note">
<p>빈 문자열 <code translate="no">&quot;&quot;</code> 은 <code translate="no">VARCHAR</code> 필드에서 null 값으로 간주되지 않습니다.</p>
</div>
<p><code translate="no">description</code> 필드가 null인 엔티티를 검색하려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">description</code> 필드가 null이 아닌 엔티티를 검색하려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NOT NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">description</code> 필드가 null이 아니고 <code translate="no">price</code> 필드의 값이 10보다 큰 엔티티를 검색하려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NOT NULL AND price &gt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="JSON-fields-with-null-values" class="common-anchor-header">null 값을 가진 JSON 필드<button data-href="#JSON-fields-with-null-values" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus에서는 null 값을 포함하는 JSON 필드를 기준으로 필터링할 수 있습니다. JSON 필드는 다음과 같은 경우 null로 간주됩니다:</p>
<ul>
<li><p>전체 JSON 객체가 명시적으로 None(null)으로 설정된 경우(예: <code translate="no">{&quot;metadata&quot;: None}</code>).</p></li>
<li><p>엔티티에서 JSON 필드 자체가 완전히 누락된 경우.</p></li>
</ul>
<div class="alert note">
<p>JSON 객체 내의 일부 요소(예: 개별 키)가 null인 경우, 해당 필드는 여전히 null이 아닌 것으로 간주됩니다. 예를 들어, <code translate="no">\{&quot;metadata&quot;: \{&quot;category&quot;: None, &quot;price&quot;: 99.99}}</code> 는 <code translate="no">category</code> 키가 null임에도 불구하고 null로 처리되지 않습니다.</p>
</div>
<p>Milvus가 null 값을 가진 JSON 필드를 어떻게 처리하는지 더 자세히 설명하기 위해, <code translate="no">metadata</code> 라는 JSON 필드가 포함된 다음 샘플 데이터를 살펴보겠습니다:</p>
<pre><code translate="no" class="language-python">data = [
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
  },
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-comment"># Entire JSON object is null</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>]
  },
  {  <span class="hljs-comment"># JSON field `metadata` is completely missing</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>]
  },
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>}, <span class="hljs-comment"># Individual key value is null</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">4</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.21</span>]
  }
]
<button class="copy-code-btn"></button></code></pre>
<p><strong>예제 1: 메타데이터가 null인 엔티티 검색</strong></p>
<p><code translate="no">metadata</code> 필드가 없거나 명시적으로 None으로 설정된 엔티티를 찾으려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata IS NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: None, &#x27;pk&#x27;: 2}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: None, &#x27;pk&#x27;: 3}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>예 2: 메타데이터가 null이 아닌 엔티티 가져오기</strong></p>
<p><code translate="no">metadata</code> 필드가 null이 아닌 엔티티를 찾으려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata IS NOT NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: None, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 4}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="ARRAY-fields-with-null-values" class="common-anchor-header">null 값을 가진 ARRAY 필드<button data-href="#ARRAY-fields-with-null-values" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus에서는 null 값을 포함하는 ARRAY 필드를 기준으로 필터링할 수 있습니다. ARRAY 필드는 다음과 같은 경우 null로 간주됩니다:</p>
<ul>
<li><p>ARRAY 필드 전체가 명시적으로 None(null)으로 설정된 경우(예: <code translate="no">&quot;tags&quot;: None</code>).</p></li>
<li><p>엔티티에서 ARRAY 필드가 완전히 누락된 경우.</p></li>
</ul>
<div class="alert note">
<p>ARRAY 필드의 모든 요소는 동일한 데이터 유형을 가져야 하므로, ARRAY 필드에는 부분적인 null 값이 포함될 수 없습니다. 자세한 내용은 <a href="/docs/ko/array_data_type.md">'Array Field'를</a> 참조하십시오.</p>
</div>
<p>Milvus가 null 값이 포함된 ARRAY 필드를 어떻게 처리하는지 더 자세히 설명하기 위해, ARRAY 필드 <code translate="no">tags</code> 가 포함된 다음 샘플 데이터를 살펴보겠습니다:</p>
<pre><code translate="no" class="language-python">data = [
  {
      <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;pop&quot;</span>, <span class="hljs-string">&quot;rock&quot;</span>, <span class="hljs-string">&quot;classic&quot;</span>],
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
  },
  {
      <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-literal">None</span>,  <span class="hljs-comment"># Entire ARRAY is null</span>
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.78</span>, <span class="hljs-number">0.91</span>, <span class="hljs-number">0.23</span>]
  },
  {  <span class="hljs-comment"># The tags field is completely missing</span>
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">9</span>, <span class="hljs-number">5</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.18</span>, <span class="hljs-number">0.11</span>, <span class="hljs-number">0.23</span>]
  }
]
<button class="copy-code-btn"></button></code></pre>
<p><strong>예제 1: tags가 null인 엔티티 검색</strong></p>
<p><code translate="no">tags</code> 필드가 없거나 명시적으로 <code translate="no">None</code> 로 설정된 엔티티를 검색하려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags IS NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;tags&#x27;: None, &#x27;ratings&#x27;: [4, 5], &#x27;embedding&#x27;: [0.78, 0.91, 0.23], &#x27;pk&#x27;: 2}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;tags&#x27;: None, &#x27;ratings&#x27;: [9, 5], &#x27;embedding&#x27;: [0.18, 0.11, 0.23], &#x27;pk&#x27;: 3}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>예 2: tags가 null이 아닌 엔티티 조회</strong></p>
<p><code translate="no">tags</code> 필드가 null이 아닌 엔티티를 검색하려면:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags IS NOT NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: None, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 4}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tips-on-using-basic-operators-with-JSON-and-ARRAY-fields" class="common-anchor-header">JSON 및 ARRAY 필드에서 기본 연산자 사용 팁<button data-href="#Tips-on-using-basic-operators-with-JSON-and-ARRAY-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus의 기본 연산자는 다용도로 사용 가능하며 스칼라 필드에 적용할 수 있을 뿐만 아니라, JSON 및 ARRAY 필드의 키와 인덱스와 함께 효과적으로 사용할 수도 있습니다.</p>
<p>예를 들어, <code translate="no">product</code> 필드에 <code translate="no">price</code>, <code translate="no">model</code>, <code translate="no">tags</code> 와 같은 여러 키가 포함되어 있는 경우, 항상 키를 직접 참조해야 합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>기록된 온도 배열에서 첫 번째 온도가 특정 값을 초과하는 레코드를 찾으려면 다음을 사용하십시오:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion" class="common-anchor-header">결론<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 데이터 필터링 및 쿼리 시 유연성을 제공하는 다양한 기본 연산자를 제공합니다. 비교, 범위, 산술 및 논리 연산자를 조합하여 강력한 필터 표현식을 생성하면 검색 결과를 좁혀 필요한 데이터를 효율적으로 가져올 수 있습니다.</p>
<h2 id="FAQ" class="common-anchor-header">자주 묻는 질문<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>필터 조건에서 일치 값 목록의 길이에 제한이 있습니까(예: filter=’color in ["red", "green", “blue”]')? 목록이 너무 길면 어떻게 해야 합니까?</strong></p>
<p>Zilliz Cloud는 필터 조건의 일치 값 목록에 길이 제한을 두지 않습니다. 그러나 목록이 지나치게 길면 쿼리 성능에 상당한 영향을 미칠 수 있습니다.
필터 조건에 긴 일치 값 목록이나 요소가 많은 복잡한 표현식이 포함된 경우, 쿼리 성능을 향상시키기 위해 <a href="/docs/ko/filtering-templating.md">필터 템플릿을</a> 사용하는 것을 권장합니다.</p>
