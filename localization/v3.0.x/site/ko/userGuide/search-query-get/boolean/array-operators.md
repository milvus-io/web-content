---
id: array-operators.md
title: ARRAY 연산자
summary: Milvus는 ARRAY 필드를 필터링하고 ARRAY 필드 값을 부분적으로 업데이트하기 위한 ARRAY 연산자를 제공합니다.
---
<h1 id="ARRAY-Operators" class="common-anchor-header">ARRAY 연산자<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 ARRAY 필드를 필터링하고 ARRAY 필드 값을 부분적으로 업데이트하기 위한 ARRAY 연산자를 제공합니다.</p>
<div class="alert note">
<p>배열 내의 모든 요소는 동일한 유형이어야 하며, 배열 내의 중첩된 구조는 일반 문자열로 처리됩니다. 따라서 ARRAY 필드를 다룰 때는 지나치게 깊은 중첩을 피하고, 최적의 성능을 위해 데이터 구조를 가능한 한 평평하게 유지하는 것이 좋습니다.</p>
</div>
<p>Milvus의 ARRAY 연산자는 다음 두 가지 사용 시나리오를 다룹니다:</p>
<ul>
<li><p>쿼리 및 검색을 위한 필터 표현식.</p></li>
<li><p><code translate="no">upsert</code> 요청에서의 부분 업데이트.</p></li>
</ul>
<h2 id="Available-ARRAY-operators" class="common-anchor-header">사용 가능한 ARRAY 연산자<button data-href="#Available-ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 표는 Milvus에서 사용할 수 있는 ARRAY 연산자를 나열합니다.</p>
<table>
<thead>
<tr><th>연산자</th><th>사용처</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><a href="#ARRAYCONTAINS">ARRAY_CONTAINS(식별자, 식)</a></td><td>필터 표현식</td><td>ARRAY 필드에 특정 요소가 존재하는지 확인합니다.</td></tr>
<tr><td><a href="#ARRAYCONTAINSALL">ARRAY_CONTAINS_ALL(식별자, 식)</a></td><td>필터 표현식</td><td>지정된 목록의 모든 요소가 ARRAY 필드에 존재하는지 확인합니다.</td></tr>
<tr><td><a href="#ARRAYCONTAINSANY">ARRAY_CONTAINS_ANY(식별자, 식)</a></td><td>필터 표현식</td><td>지정된 목록의 요소 중 하나라도 ARRAY 필드에 존재하는지 확인합니다.</td></tr>
<tr><td><a href="#ARRAYLENGTH">ARRAY_LENGTH(식별자)</a></td><td>필터 표현식</td><td>ARRAY 필드의 요소 수를 반환하며, 필터링을 위해 비교 연산자와 결합할 수 있습니다.</td></tr>
<tr><td><a href="#ARRAYAPPEND">ARRAY_APPEND</a></td><td><code translate="no">upsert</code> with <code translate="no">field_ops</code></td><td>기존 ARRAY 필드에 페이로드 요소를 추가합니다. Milvus v2.6.17 이상에서 사용할 수 있습니다.</td></tr>
<tr><td><a href="#ARRAYREMOVE">ARRAY_REMOVE</a></td><td><code translate="no">upsert</code> with <code translate="no">field_ops</code></td><td>요청 페이로드의 값과 일치하는 모든 요소를 기존 ARRAY 필드에서 제거합니다. Milvus v2.6.17 이상에서 사용할 수 있습니다.</td></tr>
</tbody>
</table>
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS</code> 연산자는 배열 필드에 특정 요소가 존재하는지 확인합니다. 배열에 주어진 요소가 포함된 엔티티를 찾고자 할 때 유용합니다.</p>
<p><strong>예시</strong></p>
<p><code translate="no">history_temperatures</code> 라는 배열 필드가 있으며, 이 필드에는 각 연도의 최저 기온 기록이 포함되어 있다고 가정해 보겠습니다. 배열에 <code translate="no">23</code> 값이 포함된 모든 엔티티를 찾으려면 다음 필터 표현식을 사용할 수 있습니다.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// ARRAY_CONTAINS filter</span>
<span class="hljs-keyword">var</span> filter = <span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이렇게 하면 <code translate="no">history_temperatures</code> 배열에 <code translate="no">23</code> 값이 포함된 모든 엔티티가 반환됩니다.</p>
<h2 id="ARRAYCONTAINSALL" class="common-anchor-header">ARRAY_CONTAINS_ALL<button data-href="#ARRAYCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS_ALL</code> 연산자는 지정된 목록의 모든 요소가 배열 필드에 포함되어 있는지 확인합니다. 이 연산자는 배열에 여러 값을 포함하는 엔티티를 일치시키려는 경우에 유용합니다.</p>
<p><strong>예시</strong></p>
<p><code translate="no">history_temperatures</code> 배열에 <code translate="no">23</code> 과 <code translate="no">24</code> 이 모두 포함된 모든 엔티티를 찾으려면 다음을 사용할 수 있습니다:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// ARRAY_CONTAINS_ALL filter</span>
<span class="hljs-keyword">var</span> filter = <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이렇게 하면 ` <code translate="no">history_temperatures</code> ` 배열에 지정된 두 값이 모두 포함된 모든 엔티티가 반환됩니다.</p>
<h2 id="ARRAYCONTAINSANY" class="common-anchor-header">ARRAY_CONTAINS_ANY<button data-href="#ARRAYCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS_ANY</code> 연산자는 지정된 목록의 요소 중 하나라도 배열 필드에 포함되어 있는지 확인합니다. 이 연산자는 배열에 지정된 값 중 적어도 하나가 포함된 엔티티를 일치시키고자 할 때 유용합니다.</p>
<p><strong>예시</strong></p>
<p><code translate="no">history_temperatures</code> 배열에 <code translate="no">23</code> 또는 <code translate="no">24</code> 중 하나가 포함된 모든 엔티티를 찾으려면 다음을 사용할 수 있습니다.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// ARRAY_CONTAINS_ANY filter</span>
<span class="hljs-keyword">var</span> filter = <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이렇게 하면 ` <code translate="no">history_temperatures</code> ` 배열에 ` <code translate="no">23</code> ` 또는 ` <code translate="no">24</code>` 중 하나 이상이 포함된 모든 엔티티가 반환됩니다.</p>
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
    </button></h2><p><code translate="no">ARRAY_LENGTH</code> 는 배열 필드의 길이(요소 수)를 반환합니다. 이 함수는 배열 필드 식별자라는 정확히 하나의 매개변수만 받아들입니다.</p>
<p><strong>예시</strong></p>
<p><code translate="no">history_temperatures</code> 배열의 요소 수가 10개 미만인 모든 엔티티를 찾으려면:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// ARRAY_LENGTH filter</span>
<span class="hljs-keyword">var</span> filter = <span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이렇게 하면 <code translate="no">history_temperatures</code> 배열의 요소 수가 10개 미만인 모든 엔티티가 반환됩니다.</p>
<h2 id="ARRAYAPPEND" class="common-anchor-header">ARRAY_APPEND<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYAPPEND" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_APPEND</code> 연산자는 ` <code translate="no">upsert</code> ` 요청 중에 기존 ARRAY 필드에 페이로드 요소를 추가합니다. 이는 필터 표현식이 아닙니다. 현재 배열 값을 먼저 조회하지 않고 배열에 값을 추가하려는 경우 이 연산자를 사용하십시오.</p>
<p>다음 예제는 기본 키가 <code translate="no">1</code> 인 엔티티의 <code translate="no">tags</code> ARRAY 필드에 <code translate="no">&quot;premium&quot;</code> 를 추가합니다:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>]}],
    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_append()},
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.JsonArray;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-number">1</span>);
<span class="hljs-type">JsonArray</span> <span class="hljs-variable">tags</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonArray</span>();
tags.add(<span class="hljs-string">&quot;premium&quot;</span>);
row.add(<span class="hljs-string">&quot;tags&quot;</span>, tags);

List&lt;UpsertReq.FieldPartialUpdateOp&gt; fieldOps = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
fieldOps.add(UpsertReq.FieldPartialUpdateOp.builder()
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)
        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_APPEND)
        .build());

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
        .data(Collections.singletonList(row))
        .fieldOps(fieldOps)
        .build();

client.upsert(upsertReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;users&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;pk&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>}).
    WithColumns(column.NewColumnVarCharArray(<span class="hljs-string">&quot;tags&quot;</span>, [][]<span class="hljs-type">string</span>{{<span class="hljs-string">&quot;premium&quot;</span>}})).
    WithArrayAppend(<span class="hljs-string">&quot;tags&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">upsert</span>(
        UpsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">insert</span>(
                InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
                    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;users&quot;</span>)
                    .<span class="hljs-title function_ invoke__">row</span>(json!({<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>]}))
                    .<span class="hljs-title function_ invoke__">build</span>()?,
            )
            .<span class="hljs-title function_ invoke__">add_field_op</span>(
                FieldPartialUpdateOp::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;tags&quot;</span>)
                    .<span class="hljs-title function_ invoke__">op_type</span>(FieldPartialUpdateOpType::ArrayAppend),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> upsertRequest = milvus::<span class="hljs-built_in">UpsertRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;users&quot;</span>)
                         .<span class="hljs-built_in">AddRowData</span>({{<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-number">1</span>}, {<span class="hljs-string">&quot;tags&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({<span class="hljs-string">&quot;premium&quot;</span>})}})
                         .<span class="hljs-built_in">AddFieldOp</span>(milvus::<span class="hljs-built_in">FieldPartialUpdateOp</span>(<span class="hljs-string">&quot;tags&quot;</span>, milvus::FieldPartialUpdateOp::OpType::ARRAY_APPEND));

milvus::UpsertResponse upsertResponse;
client-&gt;<span class="hljs-built_in">Upsert</span>(upsertRequest, upsertResponse);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;users&quot;</span>,
    <span class="hljs-attr">data</span>: [{ <span class="hljs-attr">pk</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">tags</span>: [<span class="hljs-string">&quot;premium&quot;</span>] }],
    <span class="hljs-attr">field_ops</span>: [{ <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-attr">op</span>: <span class="hljs-string">&quot;ARRAY_APPEND&quot;</span> }]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.UpsertAsync(<span class="hljs-keyword">new</span> UpsertReq
{
    CollectionName = <span class="hljs-string">&quot;users&quot;</span>,
    RowsData = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
        {
            [<span class="hljs-string">&quot;pk&quot;</span>] = <span class="hljs-number">1L</span>,
            [<span class="hljs-string">&quot;tags&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;premium&quot;</span> }
        }
    },
    FieldOps = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> FieldPartialUpdateOp(<span class="hljs-string">&quot;tags&quot;</span>, FieldPartialUpdateOpType.ArrayAppend)
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/upsert&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
      &quot;collectionName&quot;: &quot;users&quot;,
      &quot;data&quot;: [{&quot;pk&quot;: 1, &quot;tags&quot;: [&quot;premium&quot;]}],
      &quot;fieldOps&quot;: [{&quot;fieldName&quot;: &quot;tags&quot;, &quot;op&quot;: &quot;array_append&quot;}]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">field_ops</code> 을 통해 필드에 <code translate="no">ARRAY_APPEND</code> 를 연결하면 해당 필드에 대해 부분 업데이트(partial-update) 세미언틱이 활성화됩니다. 전체 워크플로, 지원되는 요소 유형 및 제한 사항에 대해서는 <a href="/docs/ko/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode--Milvus-2617">병합 모드에서 ARRAY 필드 업서트(Upsert)</a>를 참조하십시오.</p>
<h2 id="ARRAYREMOVE" class="common-anchor-header">ARRAY_REMOVE<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYREMOVE" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_REMOVE</code> 연산자는 <code translate="no">upsert</code> 요청 시, 요청 페이로드의 값과 일치하는 기존 ARRAY 필드의 모든 요소를 제거합니다. 이는 필터 표현식이 아닙니다. 현재 배열 값을 먼저 조회하지 않고도 배열에서 일치하는 값을 제거하려는 경우에 사용하십시오.</p>
<p>다음 예제는 기본 키가 <code translate="no">1</code> 인 엔티티의 <code translate="no">tags</code> ARRAY 필드에서 <code translate="no">&quot;trial&quot;</code> 를 제거합니다:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;trial&quot;</span>]}],
    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_remove()},
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.JsonArray;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-number">1</span>);
<span class="hljs-type">JsonArray</span> <span class="hljs-variable">tags</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonArray</span>();
tags.add(<span class="hljs-string">&quot;trial&quot;</span>);
row.add(<span class="hljs-string">&quot;tags&quot;</span>, tags);

List&lt;UpsertReq.FieldPartialUpdateOp&gt; fieldOps = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
fieldOps.add(UpsertReq.FieldPartialUpdateOp.builder()
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)
        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_REMOVE)
        .build());

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
        .data(Collections.singletonList(row))
        .fieldOps(fieldOps)
        .build();

client.upsert(upsertReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;users&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;pk&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>}).
    WithColumns(column.NewColumnVarCharArray(<span class="hljs-string">&quot;tags&quot;</span>, [][]<span class="hljs-type">string</span>{{<span class="hljs-string">&quot;trial&quot;</span>}})).
    WithArrayRemove(<span class="hljs-string">&quot;tags&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">upsert</span>(
        UpsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">insert</span>(
                InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
                    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;users&quot;</span>)
                    .<span class="hljs-title function_ invoke__">row</span>(json!({<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;trial&quot;</span>]}))
                    .<span class="hljs-title function_ invoke__">build</span>()?,
            )
            .<span class="hljs-title function_ invoke__">add_field_op</span>(
                FieldPartialUpdateOp::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;tags&quot;</span>)
                    .<span class="hljs-title function_ invoke__">op_type</span>(FieldPartialUpdateOpType::ArrayRemove),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> upsertRequest = milvus::<span class="hljs-built_in">UpsertRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;users&quot;</span>)
                         .<span class="hljs-built_in">AddRowData</span>({{<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-number">1</span>}, {<span class="hljs-string">&quot;tags&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({<span class="hljs-string">&quot;trial&quot;</span>})}})
                         .<span class="hljs-built_in">AddFieldOp</span>(milvus::<span class="hljs-built_in">FieldPartialUpdateOp</span>(<span class="hljs-string">&quot;tags&quot;</span>, milvus::FieldPartialUpdateOp::OpType::ARRAY_REMOVE));

milvus::UpsertResponse upsertResponse;
client-&gt;<span class="hljs-built_in">Upsert</span>(upsertRequest, upsertResponse);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;users&quot;</span>,
    <span class="hljs-attr">data</span>: [{ <span class="hljs-attr">pk</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">tags</span>: [<span class="hljs-string">&quot;trial&quot;</span>] }],
    <span class="hljs-attr">field_ops</span>: [{ <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-attr">op</span>: <span class="hljs-string">&quot;ARRAY_REMOVE&quot;</span> }]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.UpsertAsync(<span class="hljs-keyword">new</span> UpsertReq
{
    CollectionName = <span class="hljs-string">&quot;users&quot;</span>,
    RowsData = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
        {
            [<span class="hljs-string">&quot;pk&quot;</span>] = <span class="hljs-number">1L</span>,
            [<span class="hljs-string">&quot;tags&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;trial&quot;</span> }
        }
    },
    FieldOps = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> FieldPartialUpdateOp(<span class="hljs-string">&quot;tags&quot;</span>, FieldPartialUpdateOpType.ArrayRemove)
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/upsert&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
      &quot;collectionName&quot;: &quot;users&quot;,
      &quot;data&quot;: [{&quot;pk&quot;: 1, &quot;tags&quot;: [&quot;trial&quot;]}],
      &quot;fieldOps&quot;: [{&quot;fieldName&quot;: &quot;tags&quot;, &quot;op&quot;: &quot;array_remove&quot;}]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">field_ops</code> 을 통해 필드에 <code translate="no">ARRAY_REMOVE</code> 를 연결하면 해당 필드에 대해 부분 업데이트(partial-update) 세미언틱이 활성화됩니다. 전체 워크플로, 지원되는 요소 유형 및 제한 사항에 대해서는 <a href="/docs/ko/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode--Milvus-2617">병합 모드에서 ARRAY 필드 업서트(Upsert)</a>를 참조하십시오.</p>
