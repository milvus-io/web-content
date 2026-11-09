---
id: json-operators.md
title: JSON 연산자
summary: >-
  Milvus는 JSON 필드를 쿼리하고 필터링하기 위한 고급 연산자를 지원하므로, 복잡하고 구조화된 데이터를 관리하는 데 안성맞춤입니다.
  이러한 연산자를 사용하면 JSON 문서를 매우 효율적으로 쿼리할 수 있어, JSON 필드 내의 특정 요소, 값 또는 조건을 기반으로 엔티티를
  검색할 수 있습니다. 이 섹션에서는 Milvus에서 JSON 전용 연산자를 사용하는 방법을 안내하고, 그 기능을 설명하기 위한 실제 예제를
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
    </button></h1><p>Milvus는 JSON 필드를 쿼리하고 필터링하기 위한 고급 연산자를 지원하므로, 복잡하고 구조화된 데이터를 관리하는 데 이상적입니다. 이러한 연산자를 사용하면 JSON 문서를 매우 효율적으로 쿼리할 수 있어, JSON 필드 내의 특정 요소, 값 또는 조건을 기반으로 엔티티를 검색할 수 있습니다. 이 섹션에서는 Milvus에서 JSON 전용 연산자를 사용하는 방법을 안내하고, 그 기능을 설명하기 위한 실제 예제를 제공합니다.</p>
<div class="alert note">
<p>JSON 필드는 복잡하고 중첩된 구조를 처리할 수 없으며, 모든 중첩 구조를 일반 문자열로 취급합니다. 따라서 JSON 필드를 다룰 때는 지나치게 깊은 중첩을 피하고, 최적의 성능을 위해 데이터 구조를 가능한 한 평평하게 유지하는 것이 좋습니다.</p>
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
    </button></h2><p>Milvus는 JSON 데이터를 필터링하고 쿼리하는 데 도움이 되는 몇 가지 강력한 JSON 연산자를 제공하며, 이러한 연산자는 다음과 같습니다.</p>
<ul>
<li><p><a href="#JSONCONTAINS"><code translate="no">JSON_CONTAINS(identifier, expr)</code></a>: 필드 내에서 지정된 JSON 표현식이 발견되는 엔티티를 필터링합니다.</p></li>
<li><p><a href="#JSONCONTAINSALL"><code translate="no">JSON_CONTAINS_ALL(identifier, expr)</code></a>: 지정된 JSON 표현식의 모든 요소가 필드에 포함되어 있는지 확인합니다.</p></li>
<li><p><a href="#JSONCONTAINSANY"><code translate="no">JSON_CONTAINS_ANY(identifier, expr)</code></a>: 필드 내에 JSON 표현식의 구성 요소 중 적어도 하나가 존재하는 엔티티를 필터링합니다.</p></li>
</ul>
<p>실제 상황에서 이러한 연산자가 어떻게 적용되는지 예제를 통해 살펴보겠습니다.</p>
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
    </button></h2><p><code translate="no">json_contains</code> 연산자는 특정 요소나 하위 배열이 JSON 필드 내에 존재하는지 확인합니다. JSON 배열이나 객체에 특정 값이 포함되어 있는지 확인하고자 할 때 유용합니다.</p>
<p><strong>예시</strong></p>
<p>각각 <code translate="no">[&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]</code> 와 같은 문자열로 구성된 JSON 배열을 포함하는 <code translate="no">tags</code> 필드를 가진 제품 컬렉션이 있다고 가정해 봅시다. <code translate="no">&quot;sale&quot;</code> 태그가 있는 제품을 필터링하고자 합니다.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter := <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
std::string filter = <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter=<span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 예제에서 Milvus는 <code translate="no">tags</code> 필드에 <code translate="no">&quot;sale&quot;</code> 요소가 포함된 모든 상품을 반환합니다.</p>
<h2 id="JSONCONTAINSALL" class="common-anchor-header">JSON_CONTAINS_ALL<button data-href="#JSONCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">json_contains_all</code> 연산자는 지정된 JSON 표현식의 모든 요소가 대상 필드에 존재하는지 확인합니다. 이는 JSON 배열 내의 여러 값을 일치시켜야 할 때 특히 유용합니다.</p>
<p><strong>예시</strong></p>
<p>앞서 언급한 상품 태그 시나리오를 이어가면, <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, <code translate="no">&quot;new&quot;</code> 태그를 모두 가진 모든 상품을 찾으려면 <code translate="no">json_contains_all</code> 연산자를 사용할 수 있습니다.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
filter := <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
std::string filter = <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
filter=<span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 쿼리는 <code translate="no">tags</code> 배열에 <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, <code translate="no">&quot;new&quot;</code> 라는 세 가지 지정된 요소가 모두 포함된 모든 상품을 반환합니다.</p>
<h2 id="JSONCONTAINSANY" class="common-anchor-header">JSON_CONTAINS_ANY<button data-href="#JSONCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">json_contains_any</code> 연산자는 JSON 표현식의 구성원 중 적어도 하나가 해당 필드 내에 존재하는 엔티티를 필터링합니다. 이는 여러 가능한 값 중 하나에 기반하여 엔티티를 일치시키고자 할 때 유용합니다.</p>
<p><strong>예시</strong></p>
<p><code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code> 또는 <code translate="no">&quot;new&quot;</code> 태그 중 적어도 하나를 가진 제품을 필터링한다고 가정해 봅시다. 이를 위해 <code translate="no">json_contains_any</code> 연산자를 사용할 수 있습니다.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_any(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter := <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
std::string filter = <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_contains_any(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter=<span class="hljs-string">&#x27;json_contains_any(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 경우 Milvus는 <code translate="no">[&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;]</code> 목록에 포함된 태그 중 하나 이상을 가진 모든 상품을 반환합니다. 상품에 이 태그 중 하나만 포함되어 있더라도 결과에 포함됩니다.</p>
