---
id: struct-array-operators.md
title: StructArray Operators
summary: >-
  StructArray operators filter entities by evaluating predicates on scalar
  subfields inside a StructArray field. Use this page as a syntax reference for
  element_filter and the MATCH_* operator family.
---
<h1 id="StructArray-Operators" class="common-anchor-header">StructArray Operators<button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>StructArray operators filter entities by evaluating predicates on scalar subfields inside a StructArray field. Use this page as a syntax reference for <code translate="no">element_filter</code> and the <code translate="no">MATCH_*</code> operator family.</p>
<p>StructArray filtering has two operator families:</p>
<table>
<thead>
<tr><th>Operator family</th><th>Main purpose</th><th>Result behavior</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>Match Struct elements that satisfy a scalar predicate.</td><td>In element-level search, matched hits can include element offsets. In row-level query or filtered search, result shape depends on the API and output fields.</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>Select entities by how many Struct elements satisfy a scalar predicate.</td><td>Row-level filtering. These operators do not return element offsets by themselves.</td></tr>
</tbody>
</table>
<p>Use scalar subfields in StructArray operators. Vector subfields are used by vector search paths and are not scalar predicate inputs.</p>
<h2 id="When-to-use-which-operator" class="common-anchor-header">When to use which operator<button data-href="#When-to-use-which-operator" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Goal</th><th>Use</th></tr>
</thead>
<tbody>
<tr><td>Constrain element-level vector search to elements that match scalar conditions.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Match multiple scalar conditions within the same Struct element.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Return only entities where at least one Struct element satisfies a predicate.</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>Return only entities where all Struct elements satisfy a predicate.</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td>Return only entities where at least, at most, or exactly <code translate="no">N</code> Struct elements satisfy a predicate.</td><td><code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code>, or <code translate="no">MATCH_EXACT</code></td></tr>
</tbody>
</table>
<h2 id="Element-Filter" class="common-anchor-header">Element Filter<button data-href="#Element-Filter" class="anchor-icon" translate="no">
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
    </button></h2><p>Use <code translate="no">element_filter(structArrayField, predicate)</code> to match Struct elements in a StructArray field.</p>
<p>Inside the predicate, use <code translate="no">$[subfield]</code> to refer to a scalar subfield of the current Struct element.</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>When multiple conditions are used inside the predicate, all <code translate="no">$[subfield]</code> references apply to the same Struct element:</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; $[quality_score] &gt; <span class="hljs-number">0.9</span>)
<button class="copy-code-btn"></button></code></pre>
<p>When you combine an entity-level predicate with <code translate="no">element_filter</code>, place <code translate="no">element_filter</code> at the end of the expression:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Correct</span>
category == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>)

<span class="hljs-comment"># Incorrect</span>
element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>) &amp;&amp; category == <span class="hljs-string">&quot;index&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">element_filter</code> can appear only once in a filter expression. Do not nest <code translate="no">element_filter</code> or <code translate="no">MATCH_*</code> inside another <code translate="no">element_filter</code>.</p>
<h2 id="Match-Family-Operators" class="common-anchor-header">Match Family Operators<button data-href="#Match-Family-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Use <code translate="no">MATCH_*</code> operators when an entity should be selected based on how many Struct elements satisfy a predicate.</p>
<table>
<thead>
<tr><th>Operator</th><th>Meaning</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY(field, predicate)</code></td><td>At least one Struct element satisfies the predicate.</td></tr>
<tr><td><code translate="no">MATCH_ALL(field, predicate)</code></td><td>All Struct elements satisfy the predicate.</td></tr>
<tr><td><code translate="no">MATCH_LEAST(field, predicate, threshold=N)</code></td><td>At least <code translate="no">N</code> Struct elements satisfy the predicate.</td></tr>
<tr><td><code translate="no">MATCH_MOST(field, predicate, threshold=N)</code></td><td>At most <code translate="no">N</code> Struct elements satisfy the predicate.</td></tr>
<tr><td><code translate="no">MATCH_EXACT(field, predicate, threshold=N)</code></td><td>Exactly <code translate="no">N</code> Struct elements satisfy the predicate.</td></tr>
</tbody>
</table>
<p><code translate="no">MATCH_ANY</code> and <code translate="no">element_filter</code> can both express that at least one Struct element satisfies a predicate. Use <code translate="no">MATCH_ANY</code> when you only need row-level filtering. Use <code translate="no">element_filter</code> when you need element-level constraints, such as filtering which Struct elements participate in element-level vector search.</p>
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
    </button></h3><p><code translate="no">MATCH_ANY</code> evaluates to <code translate="no">true</code> if at least one element in the StructArray satisfies the predicate.</p>
<pre><code translate="no" class="language-python">MATCH_ANY(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>For an empty StructArray, <code translate="no">MATCH_ANY</code> returns <code translate="no">false</code>.</p>
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
    </button></h3><p><code translate="no">MATCH_ALL</code> evaluates to <code translate="no">true</code> if every element in the StructArray satisfies the predicate.</p>
<pre><code translate="no" class="language-python">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>For an empty StructArray, <code translate="no">MATCH_ALL</code> returns <code translate="no">true</code>.</p>
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
    </button></h3><p><code translate="no">MATCH_LEAST</code> evaluates to <code translate="no">true</code> if the number of elements satisfying the predicate is greater than or equal to <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-python">MATCH_LEAST(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>, threshold=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<p>For <code translate="no">MATCH_LEAST</code>, <code translate="no">threshold</code> must be a positive integer.</p>
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
    </button></h3><p><code translate="no">MATCH_MOST</code> evaluates to <code translate="no">true</code> if the number of elements satisfying the predicate is less than or equal to <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-python">MATCH_MOST(chunks, $[has_code] == true, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>For <code translate="no">MATCH_MOST</code>, <code translate="no">threshold</code> can be zero or a positive integer.</p>
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> evaluates to <code translate="no">true</code> if the number of elements satisfying the predicate is exactly equal to <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[section] == <span class="hljs-string">&quot;filter&quot;</span>, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>For <code translate="no">MATCH_EXACT</code>, <code translate="no">threshold</code> can be zero or a positive integer.</p>
<h2 id="Supported-predicates" class="common-anchor-header">Supported predicates<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>The <code translate="no">$[...]</code> syntax represents the scalar value of the current Struct element. Predicate support depends on the scalar subfield type.</p>
<table>
<thead>
<tr><th>Subfield type</th><th>Element-level predicate support</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Scalar predicates such as <code translate="no">$[has_code] == true</code> or <code translate="no">!($[has_code] == true)</code>. Avoid bare boolean expressions such as <code translate="no">$[has_code]</code>.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td>Comparison, chained range, <code translate="no">in</code>, <code translate="no">not in</code>, arithmetic expressions with <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code>, or <code translate="no">%</code> followed by comparison, and logical combinations.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td>Comparison, chained range, <code translate="no">in</code>, <code translate="no">not in</code>, arithmetic expressions with <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, or <code translate="no">/</code> followed by comparison, and logical combinations. The <code translate="no">%</code> operator is not supported for floating-point subfields.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>String comparison, chained range, <code translate="no">in</code>, <code translate="no">not in</code>, <code translate="no">like</code>, <code translate="no">=~</code>, <code translate="no">!~</code>, and logical combinations.</td></tr>
<tr><td>Vector subfields</td><td>Not supported as <code translate="no">$[...]</code> scalar predicate inputs. Use vector subfields through EmbeddingList search or element-level vector search instead.</td></tr>
</tbody>
</table>
<p>Logical operators such as <code translate="no">&amp;&amp;</code>, <code translate="no">\|\|</code>, and <code translate="no">!</code> apply to predicate expressions. For example, write <code translate="no">!($[has_code] == true)</code> instead of <code translate="no">!$[has_code]</code>.</p>
<h2 id="Unsupported-predicates" class="common-anchor-header">Unsupported predicates<button data-href="#Unsupported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>Element-level <code translate="no">$[...]</code> predicates do not support:</p>
<ul>
<li><p>Text match functions, such as <code translate="no">text_match(field, &quot;...&quot;)</code> or <code translate="no">phrase_match(field, &quot;...&quot;)</code>.</p></li>
<li><p>JSON path syntax, <code translate="no">exists</code> on JSON paths, or JSON functions such as <code translate="no">json_contains</code>, <code translate="no">json_contains_all</code>, or <code translate="no">json_contains_any</code>.</p></li>
<li><p>Array container functions such as <code translate="no">array_contains</code>, <code translate="no">array_contains_all</code>, <code translate="no">array_contains_any</code>, or <code translate="no">array_length</code>.</p></li>
<li><p><code translate="no">$[subfield] is null</code> or <code translate="no">$[subfield] is not null</code>.</p></li>
<li><p>Geometry / GIS functions.</p></li>
<li><p>Timestamptz expressions.</p></li>
<li><p><code translate="no">random_sample(...)</code>.</p></li>
<li><p>Field-level vector predicates.</p></li>
<li><p>Generic filter function calls unless the specific function signature and execution path explicitly support StructArray element-level predicates.</p></li>
</ul>
<h2 id="Syntax-rules" class="common-anchor-header">Syntax rules<button data-href="#Syntax-rules" class="anchor-icon" translate="no">
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
<li><p><code translate="no">MATCH_*</code> operator names are case-insensitive.</p></li>
<li><p>Use <code translate="no">$[subfield]</code> only inside <code translate="no">element_filter</code> or <code translate="no">MATCH_*</code> predicates.</p></li>
<li><p>Do not use <code translate="no">$[subfield]</code> as a JSON path, array container, or vector field reference.</p></li>
<li><p>Do not nest <code translate="no">element_filter</code> or <code translate="no">MATCH_*</code> inside another StructArray operator.</p></li>
<li><p>Use named <code translate="no">threshold=N</code> for <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code>, and <code translate="no">MATCH_EXACT</code>.</p></li>
<li><p><code translate="no">MATCH_ANY</code> on an empty StructArray returns <code translate="no">false</code>.</p></li>
<li><p><code translate="no">MATCH_ALL</code> on an empty StructArray returns <code translate="no">true</code>.</p></li>
</ul>
<h2 id="See-also" class="common-anchor-header">See also<button data-href="#See-also" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/filtered-search-with-structarray.md">Filtered Search with StructArray</a></p></li>
<li><p><a href="/docs/basic-vector-search-with-structarray.md">Basic Vector Search with StructArray</a></p></li>
<li><p><a href="/docs/index-structarray-fields.md">Index StructArray Fields</a></p></li>
<li><p><a href="/docs/structarray-limits.md">StructArray Limits</a></p></li>
</ul>
