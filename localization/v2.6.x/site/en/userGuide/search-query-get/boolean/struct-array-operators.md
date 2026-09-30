---
id: struct-array-operators.md
title: StructArray Operators
summary: >-
  Use element filters and match-family operators to filter scalar sub-fields
  inside StructArray fields.
beta: Milvus 3.0.x
---
<h1 id="StructArray-Operators" class="common-anchor-header">StructArray Operators<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>The Array of Structs, or StructArray, in an entity stores an ordered set of Struct elements. Each Struct in the Array shares the same predefined schema, which comprises multiple vectors and scalar fields. When a scalar sub-field in a Struct is indexed, you can use <strong>element filters</strong> and <strong>operators in the match family</strong> to perform scalar filtering on it.</p>
<p>An element filter selects entities that contain at least one value in a StructArray field matching the specified predicate. In contrast, the match family operators are used to find entities that contain specific numbers or proportions of values in a StructArray field matching the specified predicate.</p>
<div class="alert note">
<p>When building predicates against <code translate="no">$[subField]</code>, ensure the sub-field is indexed if you are working with large-scale datasets, as these operators require iterating through the array elements for each candidate entity.</p>
</div>
<h2 id="Element-filter" class="common-anchor-header">Element filter<button data-href="#Element-filter" class="anchor-icon" translate="no">
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
    </button></h2><p>Use element filters when you need to check whether an entity contains the values that match a specific predicate in its StructArray field.</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[text] LIKE <span class="hljs-string">&quot;Red%&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>As shown in the above element filter expression, the element filter returns entities that contain at least one chunk that starts with “Red” in the <code translate="no">text</code> sub-field. The first parameter is the name of the StructArray field, while the second parameter is the predicate that applies to the Struct sub-field.</p>
<p>You can use comparison, range, and arithmetic operators to build the condition, and logical operators to concatenate multiple conditions, as shown in <a href="/docs/v2.6.x/basic-operators.md">Basic Operators</a>.</p>
<p>However, when you build a filter expression that combines both an entity-level predicate and an element filter, you should always place the element fltler at the end, as shown in the following example.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># correct</span>
<span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span> &amp;&amp; element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>)

<span class="hljs-comment"># incorrect, resulting errors</span>
element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>) &amp;&amp; <span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Match-family-operators" class="common-anchor-header">Match family operators<button data-href="#Match-family-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>The match family operators work over a StructArray field, too. Instead of simply checking whether an element exists, you can determine how many elements (or what proportion) must satisfy an element predicate.</p>
<ul>
<li><p><a href="/docs/v2.6.x/struct-array-operators.md#MATCHANY"><code translate="no">MATCH_ANY(identifier, predicate)</code></a>: returns entities that contain at least one chunk that starts with “Red” in the <code translate="no">text</code> sub-field; semantically, this is equivalent to <code translate="no">element_filter</code>.</p></li>
<li><p><a href="/docs/v2.6.x/struct-array-operators.md#MATCHALL"><code translate="no">MATCH_ALL(identifier, predicate)</code></a>: returns entities whose text sub-fields in all chunks start with "Red".</p></li>
<li><p><a href="/docs/v2.6.x/struct-array-operators.md#MATCHLEAST"><code translate="no">MATCH_LEAST(identifier, predicate, k)</code></a>: returns entities that contain at least <code translate="no">k</code> chunks that start with “Red” in the <code translate="no">text</code> sub-field.</p></li>
<li><p><a href="/docs/v2.6.x/struct-array-operators.md#MATCHMOST"><code translate="no">MATCH_MOST(identifier, predicate, k)</code></a>: returns entities that contain at most <code translate="no">k</code> chunks that start with “Red” in the <code translate="no">text</code> sub-field.</p></li>
<li><p><a href="/docs/v2.6.x/struct-array-operators.md#MATCHEXACT"><code translate="no">MATCH_EXACT(identifier, predicate, k)</code></a>: returns entities that contain exactly <code translate="no">k</code> chunks that start with “Red” in the <code translate="no">text</code> sub-field.</p></li>
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
    </button></h3><p>This operator evaluates to true if <strong>at least one</strong> element in the array satisfies the predicate, which indicates that the structural equivalent of a logical <code translate="no">OR</code> across all array elements.</p>
<p>MATCH_ANY operators and element filters are semantically the same, and you can use them interchangeably. When you need to express the logic <code translate="no">count(matches) &gt;= 1</code>, you should use them.</p>
<p><strong>EXAMPLE:</strong></p>
<p>The following example returns entities where any part of the document starts with "Red".</p>
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
    </button></h3><p>This operator evaluates to true only if <strong>every single</strong> element in the array satisfies the predicate.</p>
<p>When you need to express the logic <code translate="no">count(matches) == total elements</code>, use this operator.</p>
<p><strong>EXAMPLE:</strong></p>
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
    </button></h3><p>This operator is a quantitative filter that returns true if the number of elements satisfying the predicate is <strong>greater than or equal to</strong> a specified constant <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>k</mi></mrow><annotation encoding="application/x-tex">k</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.03148em;">k</span></span></span></span>.</p>
<p>When you need to express the logic <code translate="no">count(matches) &gt;= k</code>, use this operator.</p>
<p><strong>EXAMPLE:</strong></p>
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
    </button></h3><p>This operator is a quantitative filter that returns true if the number of elements satisfying the predicate is <strong>less than or equal to</strong> a specified constant <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>k</mi></mrow><annotation encoding="application/x-tex">k</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.03148em;">k</span></span></span></span>.</p>
<p>This is particularly useful for filtering out entities that over-target a specific keyword (noise reduction).</p>
<p><strong>EXAMPLE:</strong></p>
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
    </button></h3><p>This operator is the most restrictive quantitative operator in the family. It returns true if and only if the number of elements satisfying the predicate is <strong>exactly</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>k</mi></mrow><annotation encoding="application/x-tex">k</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.03148em;">k</span></span></span></span>.</p>
<p><strong>EXAMPLE:</strong></p>
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>, <span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
