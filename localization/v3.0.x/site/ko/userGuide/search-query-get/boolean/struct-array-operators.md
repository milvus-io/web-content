---
id: struct-array-operators.md
title: StructArray 연산자Compatible with Milvus 3.0.x
summary: 엘리먼트 필터와 일치 패밀리 연산자를 사용하여 StructArray 필드 내의 스칼라 하위 필드를 필터링할 수 있습니다.
beta: Milvus 3.0.x
---
<h1 id="StructArray-Operators" class="common-anchor-header">StructArray 연산자<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>엔티티의 구조체 배열 또는 StructArray는 정렬된 구조체 요소 집합을 저장합니다. 배열의 각 Struct는 여러 벡터와 스칼라 필드로 구성된 동일한 사전 정의 스키마를 공유합니다. Struct의 스칼라 하위 필드가 인덱싱되면 <strong>일치 계열의</strong> <strong>요소 필터와</strong> <strong>연산자를</strong> 사용하여 스칼라 필터링을 수행할 수 있습니다.</p>
<p>엘리먼트 필터는 지정된 술어와 일치하는 값이 StructArray 필드에 하나 이상 포함된 엔티티를 선택합니다. 반대로 일치 패밀리 연산자는 지정된 술어와 일치하는 StructArray 필드에서 특정 숫자 또는 비율의 값을 포함하는 엔티티를 찾는 데 사용됩니다.</p>
<div class="alert note">
<p>이러한 연산자는 각 후보 엔티티에 대한 배열 요소를 반복해야 하므로 대규모 데이터 집합으로 작업하는 경우 <code translate="no">$[subField]</code> 에 대한 술어를 작성할 때 하위 필드가 인덱싱되어 있는지 확인하세요.</p>
</div>
<h2 id="Element-filter" class="common-anchor-header">요소 필터<button data-href="#Element-filter" class="anchor-icon" translate="no">
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
    </button></h2><p>엔티티에 StructArray 필드에 특정 술어와 일치하는 값이 포함되어 있는지 확인해야 하는 경우 요소 필터를 사용합니다.</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[text] LIKE <span class="hljs-string">&quot;Red%&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>위의 요소 필터 표현식에서 볼 수 있듯이 요소 필터는 <code translate="no">text</code> 하위 필드에 "Red"로 시작하는 청크를 하나 이상 포함하는 엔티티를 반환합니다. 첫 번째 매개변수는 StructArray 필드의 이름이고, 두 번째 매개변수는 Struct 하위 필드에 적용되는 술어입니다.</p>
<p><a href="/docs/ko/basic-operators.md">기본 연산자에</a> 표시된 대로 비교, 범위 및 산술 연산자를 사용하여 조건을 작성하고 논리 연산자를 사용하여 여러 조건을 연결할 수 있습니다.</p>
<p>그러나 엔티티 수준 술어와 요소 필터를 모두 결합하는 필터 표현식을 작성할 때는 다음 예와 같이 항상 요소 플ㄹ틀러를 마지막에 배치해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># correct</span>
<span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span> &amp;&amp; element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>)

<span class="hljs-comment"># incorrect, resulting errors</span>
element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>) &amp;&amp; <span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Match-family-operators" class="common-anchor-header">일치 패밀리 연산자<button data-href="#Match-family-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>일치 패밀리 연산자는 StructArray 필드에서도 작동합니다. 단순히 요소의 존재 여부를 확인하는 대신 요소 술어를 만족해야 하는 요소의 수(또는 비율)를 결정할 수 있습니다.</p>
<ul>
<li><p><a href="/docs/ko/struct-array-operators.md#MATCHANY"><code translate="no">MATCH_ANY(identifier, predicate)</code></a>는 <code translate="no">text</code> 하위 필드에 "Red"로 시작하는 청크가 하나 이상 포함된 엔티티를 반환합니다(의미상 이는 <code translate="no">element_filter</code>.</p></li>
<li><p><a href="/docs/ko/struct-array-operators.md#MATCHALL"><code translate="no">MATCH_ALL(identifier, predicate)</code></a>모든 청크의 텍스트 하위 필드가 "Red"로 시작하는 엔터티를 반환합니다.</p></li>
<li><p><a href="/docs/ko/struct-array-operators.md#MATCHLEAST"><code translate="no">MATCH_LEAST(identifier, predicate, k)</code></a><code translate="no">text</code> 하위 필드에 "Red"로 시작하는 청크가 <code translate="no">k</code> 개 이상 포함된 엔터티를 반환합니다.</p></li>
<li><p><a href="/docs/ko/struct-array-operators.md#MATCHMOST"><code translate="no">MATCH_MOST(identifier, predicate, k)</code></a><code translate="no">text</code> 하위 필드에 "Red"로 시작하는 청크가 최대 <code translate="no">k</code> 개 포함된 엔터티를 반환합니다.</p></li>
<li><p><a href="/docs/ko/struct-array-operators.md#MATCHEXACT"><code translate="no">MATCH_EXACT(identifier, predicate, k)</code></a><code translate="no">text</code> 하위 필드에 "Red"로 시작하는 <code translate="no">k</code> 청크가 정확히 포함된 엔터티를 반환합니다.</p></li>
</ul>
<h3 id="MATCHANY" class="common-anchor-header">MATCH_ANY<button data-href="#MATCHANY" class="anchor-icon" translate="no">
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
    </button></h3><p>이 연산자는 배열에 있는 <strong>하나 이상의</strong> 요소가 술어를 만족하는 경우 참으로 평가되며, 이는 모든 배열 요소에서 논리적 <code translate="no">OR</code> 에 해당하는 구조가 있음을 나타냅니다.</p>
<p>MATCH_ANY 연산자와 요소 필터는 의미적으로 동일하므로 서로 바꿔서 사용할 수 있습니다. <code translate="no">count(matches) &gt;= 1</code> 논리를 표현해야 할 때는 이 두 가지를 사용해야 합니다.</p>
<p><strong>예시:</strong></p>
<p>다음 예는 문서의 일부가 "Red"로 시작하는 엔티티를 반환합니다.</p>
<pre><code translate="no" class="language-python">MATCH_ANY(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="MATCHALL" class="common-anchor-header">MATCH_ALL<button data-href="#MATCHALL" class="anchor-icon" translate="no">
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
    </button></h3><p>이 연산자는 배열의 <strong>모든</strong> 요소가 술어를 만족하는 경우에만 참으로 평가됩니다.</p>
<p><code translate="no">count(matches) == total elements</code> 로직을 표현해야 하는 경우 이 연산자를 사용합니다.</p>
<p><strong>예제:</strong></p>
<pre><code translate="no" class="language-python">MATCH_ALL(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="MATCHLEAST" class="common-anchor-header">MATCH_LEAST<button data-href="#MATCHLEAST" class="anchor-icon" translate="no">
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
    </button></h3><p>이 연산자는 술어를 만족하는 요소의 수가 지정된 상수 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">kk</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> k보다 <strong>크거나 같으면</strong> 참을 반환하는 정량적 필터입니다.</p>
<p><code translate="no">count(matches) &gt;= k</code> 로직을 표현해야 하는 경우 이 연산자를 사용합니다.</p>
<p><strong>예제:</strong></p>
<pre><code translate="no" class="language-python">MATCH_LEAST(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>, <span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="MATCHMOST" class="common-anchor-header">MATCH_MOST<button data-href="#MATCHMOST" class="anchor-icon" translate="no">
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
    </button></h3><p>이 연산자는 술어를 만족하는 요소의 수가 지정된 상수 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">kk</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> k보다 작거나 <strong>같으면</strong> 참을 반환하는 정량적 필터입니다.</p>
<p>이 연산자는 특정 키워드를 과도하게 타겟팅하는 개체를 필터링하는 데 특히 유용합니다(노이즈 감소).</p>
<p><strong>예시:</strong></p>
<pre><code translate="no" class="language-python">MATCH_MOST(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>, <span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="MATCHEXACT" class="common-anchor-header">MATCH_EXACT<button data-href="#MATCHEXACT" class="anchor-icon" translate="no">
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
    </button></h3><p>이 연산자는 제품군에서 가장 제한적인 정량 연산자입니다. 술어를 만족하는 요소의 수가 <strong>정확히</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">kk</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> k인 경우에만 참을 반환합니다.</p>
<p><strong>예제:</strong></p>
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>, <span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
