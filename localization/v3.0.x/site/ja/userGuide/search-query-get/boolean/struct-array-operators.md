---
id: struct-array-operators.md
title: StructArray 演算子
summary: >-
  StructArray 演算子は、StructArray
  フィールド内のスカラーサブフィールドに対して述語を評価することで、エンティティをフィルタリングします。このページは、element_filter および
  MATCH_* 演算子ファミリーの構文リファレンスとしてご利用ください。
---
<h1 id="StructArray-Operators" class="common-anchor-header">StructArray 演算子<button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>StructArray演算子は、StructArrayフィールド内のスカラーサブフィールドに対して述語を評価することで、エンティティをフィルタリングします。このページは、<code translate="no">element_filter</code> および<code translate="no">MATCH_*</code> 演算子ファミリーの構文リファレンスとしてご利用ください。</p>
<p>StructArrayのフィルタリングには、2つの演算子ファミリーがあります：</p>
<table>
<thead>
<tr><th>演算子ファミリー</th><th>主な目的</th><th>結果の挙動</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>スカラー述語を満たすStruct要素に一致させます。</td><td>要素レベルの検索では、一致したヒットに要素のオフセットが含まれる場合があります。行レベルのクエリまたはフィルタリング検索では、結果の形状はAPIおよび出力フィールドによって異なります。</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>スカラー述語を満たす Struct 要素の数に基づいてエンティティを選択します。</td><td>行レベルのフィルタリング。これらの演算子は、それ自体では要素オフセットを返しません。</td></tr>
</tbody>
</table>
<p>StructArray 演算子では、スカラーサブフィールドを使用します。ベクトルサブフィールドはベクトル検索パスで使用され、スカラー述語の入力にはなりません。</p>
<h2 id="When-to-use-which-operator" class="common-anchor-header">どの演算子をいつ使用するか<button data-href="#When-to-use-which-operator" class="anchor-icon" translate="no">
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
<tr><th>目的</th><th>使用方法</th></tr>
</thead>
<tbody>
<tr><td>要素レベルのベクトル検索を、スカラー条件に一致する要素に限定する。</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>同じ Struct 要素内で複数のスカラー条件に一致させる。</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>少なくとも1つのStruct要素が述語を満たすエンティティのみを返す。</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>すべての Struct 要素が述語を満たすエンティティのみを返す。</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td><code translate="no">N</code> 個の Struct 要素のうち、少なくとも、多くても、またはちょうどその数の要素が述語を満たすエンティティのみを返します。</td><td><code translate="no">MATCH_LEAST</code>、<code translate="no">MATCH_MOST</code> 、または<code translate="no">MATCH_EXACT</code></td></tr>
</tbody>
</table>
<h2 id="Element-Filter" class="common-anchor-header">要素フィルター<button data-href="#Element-Filter" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">element_filter(structArrayField, predicate)</code> を使用して、StructArray フィールド内の Struct 要素に一致させます。</p>
<p>述語内では、<code translate="no">$[subfield]</code> を使用して、現在の Struct 要素のスカラーサブフィールドを参照します。</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>述語内で複数の条件が使用される場合、すべての `<code translate="no">$[subfield]</code> ` 参照は同じ Struct 要素に適用されます。</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; $[quality_score] &gt; <span class="hljs-number">0.9</span>)
<button class="copy-code-btn"></button></code></pre>
<p>エンティティレベルの述語と `<code translate="no">element_filter</code>` を組み合わせる場合は、式の一番最後に `<code translate="no">element_filter</code> ` を配置してください：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Correct</span>
category == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>)

<span class="hljs-comment"># Incorrect</span>
element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>) &amp;&amp; category == <span class="hljs-string">&quot;index&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">element_filter</code> は、フィルタ式内で1回のみ出現できます。<code translate="no">element_filter</code> や<code translate="no">MATCH_*</code> を、別の<code translate="no">element_filter</code> の内部にネストしないでください。</p>
<h2 id="Match-Family-Operators" class="common-anchor-header">マッチファミリー演算子<button data-href="#Match-Family-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">MATCH_*</code> 演算子は、述語を満たすStruct要素の数に基づいてエンティティを選択する必要がある場合に使用します。</p>
<table>
<thead>
<tr><th>演算子</th><th>意味</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY(field, predicate)</code></td><td>少なくとも 1 つの Struct 要素が述語を満たしています。</td></tr>
<tr><td><code translate="no">MATCH_ALL(field, predicate)</code></td><td>すべての Struct 要素が述語を満たす。</td></tr>
<tr><td><code translate="no">MATCH_LEAST(field, predicate, threshold=N)</code></td><td>少なくとも<code translate="no">N</code> 個のStruct要素が述語を満たす。</td></tr>
<tr><td><code translate="no">MATCH_MOST(field, predicate, threshold=N)</code></td><td><code translate="no">N</code> 個以下のStruct要素が述語を満たす。</td></tr>
<tr><td><code translate="no">MATCH_EXACT(field, predicate, threshold=N)</code></td><td><code translate="no">N</code> 個のStruct要素が、その述語を満たしています。</td></tr>
</tbody>
</table>
<p><code translate="no">MATCH_ANY</code> また、<code translate="no">element_filter</code> はどちらも、少なくとも 1 つの Struct 要素が述語を満たすことを表現できます。行レベルのフィルタリングのみが必要な場合は、<code translate="no">MATCH_ANY</code> を使用してください。要素レベルの制約（たとえば、要素レベルのベクトル検索に参加する Struct 要素のフィルタリングなど）が必要な場合は、<code translate="no">element_filter</code> を使用してください。</p>
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
    </button></h3><p><code translate="no">MATCH_ANY</code> StructArray内の少なくとも1つの要素が述語を満たす場合、<code translate="no">true</code> として評価されます。</p>
<pre><code translate="no" class="language-python">MATCH_ANY(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>StructArrayが空の場合、<code translate="no">MATCH_ANY</code> は<code translate="no">false</code> を返します。</p>
<h3 id="MATCHALL" class="common-anchor-header">MATCH_ALLは、StructArray のすべての要素が述語を満たす場合に、xml-ph-0000@deepl.internal を返します。<button data-href="#MATCHALL" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_ALL</code> StructArray のすべての要素が述語を満たす場合、<code translate="no">true</code> と評価されます。</p>
<pre><code translate="no" class="language-python">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>空の StructArray の場合、<code translate="no">MATCH_ALL</code> は<code translate="no">true</code> を返します。</p>
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
    </button></h3><p><code translate="no">MATCH_LEAST</code> は、述語を満たす要素の数が<code translate="no">threshold</code> 以上である場合に、<code translate="no">true</code> と評価されます。</p>
<pre><code translate="no" class="language-python">MATCH_LEAST(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>, threshold=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">MATCH_LEAST</code> の場合、<code translate="no">threshold</code> は正の整数でなければなりません。</p>
<h3 id="MATCHMOST" class="common-anchor-header">MATCH_MOSTは、述語を満たす要素の数が xml-ph-0001@deepl.internal 以下の場合に、xml-ph-0000@deepl.internal と評価されます。<button data-href="#MATCHMOST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_MOST</code> は、述語を満たす要素の数が<code translate="no">threshold</code> 以下である場合に、<code translate="no">true</code> と評価されます。</p>
<pre><code translate="no" class="language-python">MATCH_MOST(chunks, $[has_code] == true, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">MATCH_MOST</code> の場合、<code translate="no">threshold</code> は 0 または正の整数です。</p>
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> は、述語を満たす要素の数が<code translate="no">threshold</code> と正確に等しい場合、<code translate="no">true</code> と評価されます。</p>
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[section] == <span class="hljs-string">&quot;filter&quot;</span>, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">MATCH_EXACT</code> に対して、<code translate="no">threshold</code> は 0 または正の整数です。</p>
<h2 id="Supported-predicates" class="common-anchor-header">サポートされている述語<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">$[...]</code> という構文は、現在の Struct 要素のスカラー値を表します。述語のサポートは、スカラーのサブフィールドの型によって異なります。</p>
<table>
<thead>
<tr><th>サブフィールドの型</th><th>要素レベルの述語のサポート</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">$[has_code] == true</code> や<code translate="no">!($[has_code] == true)</code> などのスカラー述語。<code translate="no">$[has_code]</code> のような、修飾子なしのブール式は避けてください。</td></tr>
<tr><td><code translate="no">INT8</code>、<code translate="no">INT16</code> 、<code translate="no">INT32</code> 、<code translate="no">INT64</code></td><td>比較、連鎖範囲、<code translate="no">in</code> 、<code translate="no">not in</code> 、<code translate="no">+</code> 、<code translate="no">-</code> 、<code translate="no">*</code> 、<code translate="no">/</code> 、または<code translate="no">%</code> に比較演算子が続く算術式、および論理演算の組み合わせ。</td></tr>
<tr><td><code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code></td><td>比較、連鎖範囲、<code translate="no">in</code> 、<code translate="no">not in</code> 、<code translate="no">+</code> 、<code translate="no">-</code> 、<code translate="no">*</code> 、または<code translate="no">/</code> を含む算術式に比較演算子が続くもの、および論理演算の組み合わせ。<code translate="no">%</code> 演算子は、浮動小数点サブフィールドではサポートされていません。</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>文字列比較、連鎖範囲、<code translate="no">in</code> 、<code translate="no">not in</code> 、<code translate="no">like</code> 、<code translate="no">=~</code> 、<code translate="no">!~</code> 、および論理演算の組み合わせ。</td></tr>
<tr><td>ベクトルサブフィールド</td><td><code translate="no">$[...]</code> のスカラー述語の入力としてはサポートされていません。代わりに、EmbeddingList検索または要素レベルのベクトル検索を通じてベクトルサブフィールドを使用してください。</td></tr>
</tbody>
</table>
<p><code translate="no">&amp;&amp;</code> 、<code translate="no">\|\|</code> 、<code translate="no">!</code> などの論理演算子は、述語式に適用されます。たとえば、<code translate="no">!$[has_code]</code> の代わりに<code translate="no">!($[has_code] == true)</code> と記述します。</p>
<h2 id="Unsupported-predicates" class="common-anchor-header">サポートされていない述語<button data-href="#Unsupported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>要素レベルの<code translate="no">$[...]</code> 述語では、以下はサポートされていません：</p>
<ul>
<li><p><code translate="no">text_match(field, &quot;...&quot;)</code> や<code translate="no">phrase_match(field, &quot;...&quot;)</code> などのテキスト一致関数。</p></li>
<li><p>JSONパス構文、JSONパスに対する<code translate="no">exists</code> 、または<code translate="no">json_contains</code> 、<code translate="no">json_contains_all</code> 、<code translate="no">json_contains_any</code> などのJSON関数。</p></li>
<li><p><code translate="no">array_contains</code> 、<code translate="no">array_contains_all</code> 、<code translate="no">array_contains_any</code> 、<code translate="no">array_length</code> などの配列コンテナ関数。</p></li>
<li><p><code translate="no">$[subfield] is null</code> または<code translate="no">$[subfield] is not null</code> 。</p></li>
<li><p>ジオメトリ/GIS 関数。</p></li>
<li><p>timestamptz 式。</p></li>
<li><p><code translate="no">random_sample(...)</code>.</p></li>
<li><p>フィールドレベルのベクトル述語。</p></li>
<li><p>特定の関数のシグネチャおよび実行パスが StructArray 要素レベルの述語を明示的にサポートしていない限り、汎用フィルタ関数の呼び出し。</p></li>
</ul>
<h2 id="Syntax-rules" class="common-anchor-header">構文規則<button data-href="#Syntax-rules" class="anchor-icon" translate="no">
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
<li><p><code translate="no">MATCH_*</code> 演算子の名前は大文字と小文字を区別しません。</p></li>
<li><p><code translate="no">$[subfield]</code> は、<code translate="no">element_filter</code> または<code translate="no">MATCH_*</code> 述語内でのみ使用してください。</p></li>
<li><p><code translate="no">$[subfield]</code> を JSON パス、配列コンテナ、またはベクトルフィールドの参照として使用しないでください。</p></li>
<li><p><code translate="no">element_filter</code> や<code translate="no">MATCH_*</code> を、別の StructArray 演算子の内部にネストしないでください。</p></li>
<li><p><code translate="no">MATCH_LEAST</code> 、<code translate="no">MATCH_MOST</code> 、および<code translate="no">MATCH_EXACT</code> には、名前付き<code translate="no">threshold=N</code> を使用してください。</p></li>
<li><p><code translate="no">MATCH_ANY</code> 空の StructArray に対して呼び出すと、<code translate="no">false</code> を返します。</p></li>
<li><p><code translate="no">MATCH_ALL</code> 空の StructArray に対して呼び出すと、<code translate="no">true</code> を返します。</p></li>
</ul>
<h2 id="See-also" class="common-anchor-header">関連項目<button data-href="#See-also" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/ja/filtered-search-with-structarray.md">StructArray を使用したフィルタ検索</a></p></li>
<li><p><a href="/docs/ja/basic-vector-search-with-structarray.md">StructArray を使用した基本的なベクトル検索</a></p></li>
<li><p><a href="/docs/ja/index-structarray-fields.md">StructArray フィールドのインデックス</a></p></li>
<li><p><a href="/docs/ja/structarray-limits.md">StructArrayの制限事項</a></p></li>
</ul>
