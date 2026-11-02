---
id: struct-array-operators.md
title: StructArray 演算子
summary: >-
  StructArray 演算子は、StructArray
  フィールド内のスカラーサブフィールドに対して述語を評価することで、エンティティをフィルタリングします。このページは、element_filter、MATCH_*
  演算子ファミリー、および StructArray パスに対する行レベルの述語に関する構文リファレンスとしてご利用ください。
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
    </button></h1><p>StructArray演算子は、StructArrayフィールド内のスカラーサブフィールドに対して述語を評価することで、エンティティをフィルタリングします。このページは、<code translate="no">element_filter</code> 、<code translate="no">MATCH_*</code> 演算子ファミリー、およびStructArrayパスに対する行レベルの述語に関する構文リファレンスとしてご利用ください。</p>
<p>StructArrayのフィルタリングには、2つの演算子ファミリーと、一連の行レベルのパス述語があります：</p>
<table>
<thead>
<tr><th>フィルタ形式</th><th>主な目的</th><th>結果の挙動</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>スカラー述語を満たすStruct要素に一致します。</td><td>要素レベルの検索では、一致したヒットに要素のオフセットが含まれる場合があります。行レベルのクエリまたはフィルタリング検索では、結果の形状はAPIおよび出力フィールドによって異なります。</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>スカラー述語を満たす Struct 要素の数に基づいてエンティティを選択します。</td><td>行レベルのフィルタリング。これらの演算子は、それ自体では要素オフセットを返しません。</td></tr>
<tr><td>行レベルのパス述語</td><td><code translate="no">$[...]</code> 述語を使用せずに、1つの要素の位置をテストしたり、Struct要素の数を数えたり、要素間のサブフィールド値をテストしたりします。</td><td>行レベルのフィルタリング。これらの述語は要素オフセットを返しません。</td></tr>
</tbody>
</table>
<p>StructArray 演算子では、スカラーサブフィールドを使用します。ベクトルサブフィールドはベクトル検索パスで使用され、スカラー述語の入力には使用されません。</p>
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
    </button></h2><p>フィルタリングの目的に応じて演算子を選択してください：</p>
<table>
<thead>
<tr><th>目的</th><th>使用すべき演算子</th></tr>
</thead>
<tbody>
<tr><td>要素レベルのベクトル検索を、スカラー条件に一致する要素に限定する。</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>同一のStruct要素内で複数のスカラー条件に一致させる。</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>少なくとも1つのStruct要素が述語を満たすエンティティのみを返す。</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>すべての Struct 要素が述語を満たすエンティティのみを返す。</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td><code translate="no">N</code> 個のStruct要素のうち、少なくとも、多くても、またはちょうどその数の要素が述語を満たすエンティティのみを返します。</td><td><code translate="no">MATCH_LEAST</code>、<code translate="no">MATCH_MOST</code> 、または<code translate="no">MATCH_EXACT</code></td></tr>
<tr><td>最初のチャンクなど、特定の位置にある Struct 要素をチェックします。</td><td>次のような位置指定パス<code translate="no">chunks[0][section]</code></td></tr>
<tr><td>エンティティ内の Struct 要素の数でフィルタリングします。</td><td><code translate="no">array_length(chunks)</code></td></tr>
<tr><td>同じ要素に対する条件を組み合わせることなく、Struct 要素がサブフィールドの値を持っているかどうかを確認します。</td><td><code translate="no">array_contains</code>、<code translate="no">array_contains_any</code> 、または<code translate="no">array_contains_all</code> を、次のようなサブフィールドパスで指定します。<code translate="no">chunks[section]</code></td></tr>
</tbody>
</table>
<h2 id="Example-data" class="common-anchor-header">データ例<button data-href="#Example-data" class="anchor-icon" translate="no">
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
    </button></h2><p>以下のエンティティの抜粋例は、<strong>エンティティ A</strong>および<strong>エンティティ B</strong> の<code translate="no">chunks</code> フィールドのみを示しています。これらは完全な挿入ペイロードではありません。</p>
<p><strong>エンティティ A</strong>:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.74</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.72</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.83</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.87</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>エンティティ B</strong>:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.95</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.97</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p><code translate="no">element_filter(structArrayField, predicate)</code> を使用して、StructArray フィールド内の Struct 要素と照合します。</p>
<p>述語内では、<code translate="no">$[subfield]</code> を使用して、現在の Struct 要素のスカラーサブフィールドを参照します。</p>
<pre><code translate="no" class="language-text">element_filter(chunks, $[section] == &quot;index&quot;)
<button class="copy-code-btn"></button></code></pre>
<p>エンティティ A とエンティティ B の両方が一致します。表示されている 7 つの要素すべてで、<code translate="no">section</code> が `<code translate="no">&quot;index&quot;</code>` に設定されています。</p>
<p>述語内で複数の条件が使用される場合、すべての `<code translate="no">$[subfield]</code> ` 参照は同じ Struct 要素に適用されます：</p>
<pre><code translate="no" class="language-text">element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)
<button class="copy-code-btn"></button></code></pre>
<p>エンティティ B のみが条件に一致します。その 3 つの要素すべてが、両方の条件を満たしています。</p>
<p>エンティティレベルの述語と<code translate="no">element_filter</code> を組み合わせる場合は、式の一番最後に<code translate="no">element_filter</code> を配置します：</p>
<pre><code translate="no" class="language-text"># Correct
category == &quot;index&quot; &amp;&amp; element_filter(chunks, $[quality_score] &gt; 0.9)

# Incorrect
element_filter(chunks, $[quality_score] &gt; 0.9) &amp;&amp; category == &quot;index&quot;
<button class="copy-code-btn"></button></code></pre>
<p>この<code translate="no">category</code> の例は、<code translate="no">category</code> を定義していないサンプルデータとは独立して、式の順序を示しています。</p>
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
    </button></h2><p><code translate="no">MATCH_*</code> 演算子は、述語を満たすStruct要素の数に基づいてエンティティを選択する必要がある場合に使用します。これらの演算子の意味は次のとおりです：</p>
<table>
<thead>
<tr><th>演算子</th><th>意味</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY(field, predicate)</code></td><td>少なくとも1つのStruct要素が述語を満たす。</td></tr>
<tr><td><code translate="no">MATCH_ALL(field, predicate)</code></td><td>すべての Struct 要素が述語を満たす。</td></tr>
<tr><td><code translate="no">MATCH_LEAST(field, predicate, threshold=N)</code></td><td>少なくとも<code translate="no">N</code> 個のStruct要素が述語を満たす。</td></tr>
<tr><td><code translate="no">MATCH_MOST(field, predicate, threshold=N)</code></td><td><code translate="no">N</code> 個以下のStruct要素が述語を満たす。</td></tr>
<tr><td><code translate="no">MATCH_EXACT(field, predicate, threshold=N)</code></td><td><code translate="no">N</code> 個のStruct要素が、その述語を満たしています。</td></tr>
</tbody>
</table>
<p><code translate="no">MATCH_ANY</code> また、<code translate="no">element_filter</code> はどちらも、少なくとも 1 つの Struct 要素が述語を満たしていることを表現できます。行レベルのフィルタリングのみが必要な場合は、<code translate="no">MATCH_ANY</code> を使用してください。要素レベルの制約（たとえば、要素レベルのベクトル検索に参加する Struct 要素のフィルタリングなど）が必要な場合は、<code translate="no">element_filter</code> を使用してください。</p>
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
    </button></h3><p><code translate="no">MATCH_ANY</code> は、StructArray内の少なくとも1つの要素が述語を満たす場合、<code translate="no">true</code> と評価されます。</p>
<pre><code translate="no" class="language-text">MATCH_ANY(chunks, $[section] == &quot;index&quot;)
<button class="copy-code-btn"></button></code></pre>
<p>エンティティ A とエンティティ B は、それぞれ少なくとも 1 つの要素で<code translate="no">section</code> が<code translate="no">&quot;index&quot;</code> に設定されているため、両方とも一致します。</p>
<p>StructArray が空の場合、<code translate="no">MATCH_ANY</code> は<code translate="no">false</code> を返します。</p>
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
    </button></h3><p><code translate="no">MATCH_ALL</code> StructArray内のすべての要素が述語を満たす場合、<code translate="no">true</code> と評価されます。</p>
<pre><code translate="no" class="language-text">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>表示されているすべての要素の<code translate="no">has_code</code> が<code translate="no">true</code> に設定されているため、エンティティ A とエンティティ B の両方が一致します。</p>
<p>StructArray が空の場合、<code translate="no">MATCH_ALL</code> は<code translate="no">true</code> を返します。</p>
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
<pre><code translate="no" class="language-text">MATCH_LEAST(chunks, $[quality_score] &gt; 0.9, threshold=2)
<button class="copy-code-btn"></button></code></pre>
<p>エンティティ B のみが条件に一致します。エンティティ A には条件を満たす要素が 0 個しかなく、エンティティ B には 3 個あります。</p>
<p><code translate="no">MATCH_LEAST</code> の場合、<code translate="no">threshold</code> は正の整数でなければなりません。</p>
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
    </button></h3><p><code translate="no">MATCH_MOST</code> は、述語を満たす要素の数が<code translate="no">threshold</code> 以下である場合に、<code translate="no">true</code> と評価されます。</p>
<pre><code translate="no" class="language-text">MATCH_MOST(chunks, $[has_code] == true, threshold=1)
<button class="copy-code-btn"></button></code></pre>
<p>どちらのエンティティも一致しません。エンティティ A には 4 つの条件を満たす要素があり、エンティティ B には 3 つあります。</p>
<p><code translate="no">MATCH_MOST</code> の場合、<code translate="no">threshold</code> は 0 または正の整数です。</p>
<h3 id="MATCHEXACT" class="common-anchor-header">xml-ph-0000@deepl.internal の場合、xml-ph-0001@deepl.internal は 0 または正の整数になります。MATCH_EXACT<button data-href="#MATCHEXACT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> は、述語を満たす要素の数が<code translate="no">threshold</code> と完全に等しい場合に、<code translate="no">true</code> と評価されます。</p>
<pre><code translate="no" class="language-text">MATCH_EXACT(chunks, $[section] == &quot;filter&quot;, threshold=1)
<button class="copy-code-btn"></button></code></pre>
<p>どちらのエンティティも、<code translate="no">section</code> が<code translate="no">&quot;filter&quot;</code> に設定されている要素を持たないため、一致するものはありません。</p>
<p><code translate="no">MATCH_EXACT</code> の場合、<code translate="no">threshold</code> は 0 または正の整数になります。</p>
<h2 id="Row-level-predicates-on-StructArray-paths" class="common-anchor-header">StructArray パスに対する行レベルの述語<button data-href="#Row-level-predicates-on-StructArray-paths" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">element_filter</code> および<code translate="no">MATCH_*</code> のほか、通常のフィルタ式では、StructArray フィールドまたはそのスカラーサブフィールドの 1 つを直接参照することができます。これらの述語はエンティティレベルで評価され、要素のオフセットは返されません。</p>
<h3 id="Subfield-access" class="common-anchor-header">サブフィールドへのアクセス<button data-href="#Subfield-access" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Access-a-Struct-element-by-position" class="common-anchor-header">位置による Struct 要素へのアクセス</h4><p><code translate="no">structArrayField[index][subfield]</code> を使用して、Struct 要素のスカラーサブフィールドの 1 つを、0 を起点とする位置で参照します。まず位置を指定し、その後にサブフィールド名を記述します。逆順のパス<code translate="no">chunks[quality_score][0] &gt; 0.8</code> は無効です。</p>
<p>たとえば、最初の要素の品質スコアをテストするには：</p>
<pre><code translate="no" class="language-text">chunks[0][quality_score] &gt; 0.8
<button class="copy-code-btn"></button></code></pre>
<p>この式に一致するのはエンティティ B のみです。</p>
<pre><code translate="no" class="language-text"># The first chunk belongs to the &quot;index&quot; section.
chunks[0][section] == &quot;index&quot;

# The second chunk has a high quality score.
chunks[1][quality_score] &gt; 0.9

# The first chunk is on page 1, 2, or 3.
chunks[0][page] in [1, 2, 3]

# Chained range on a positional path.
0.8 &lt; chunks[0][quality_score] &lt; 0.95
<button class="copy-code-btn"></button></code></pre>
<p>エンティティ A とエンティティ B について、最初のセクション述語は両方のエンティティに一致し、2 番目のスコア述語はエンティティ B にのみ一致し、厳密なスコア範囲はどちらにも一致しません。<code translate="no">page</code> 述語は一般的な例であり、このサンプルデータでは<code translate="no">page</code> は定義されていません。</p>
<p>位置パスは、スカラーサブフィールドに対する比較、<code translate="no">in</code> 、<code translate="no">not in</code> 、および連鎖範囲述語をサポートしています。エンティティの StructArray フィールドにその位置に要素がない場合、そのエンティティは一致しません。</p>
<h3 id="ARRAY-operators" class="common-anchor-header">ARRAY演算子<button data-href="#ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Count-Struct-elements" class="common-anchor-header">Struct要素の個数を数える</h4><p><code translate="no">array_length(structArrayField)</code> を使用すると、エンティティ内の Struct 要素の数でフィルタリングできます。<code translate="no">array_length(chunks[section])</code> のようなサブフィールドパスに対する<code translate="no">array_length</code> は、すべてのサブフィールドが Struct 要素ごとに 1 つの値を保持するため、同じカウントを返します。</p>
<pre><code translate="no" class="language-text"># Articles with at least three chunks.
array_length(chunks) &gt;= 3

# Articles with exactly one chunk.
array_length(chunks) == 1
<button class="copy-code-btn"></button></code></pre>
<p>親フィールドのカウント述語は、<code translate="no">&gt;= 3</code> の場合、両方のエンティティに一致しますが、<code translate="no">== 1</code> の場合、どちらにも一致しません。サブフィールドパス上の値をカウントすることもできます：</p>
<pre><code translate="no" class="language-text">ARRAY_LENGTH(chunks[quality_score]) == 3
<button class="copy-code-btn"></button></code></pre>
<p>エンティティBのみが一致します。これは、その<code translate="no">quality_score</code> サブフィールドに3つの値があるからです。</p>
<h4 id="Test-subfield-values-across-elements" class="common-anchor-header">要素間でサブフィールドの値をテストする</h4><p>たとえば、品質スコアが<code translate="no">0.74</code> に等しいものが存在するかどうかをテストする場合：</p>
<pre><code translate="no" class="language-text">ARRAY_CONTAINS(chunks[quality_score], 0.74)
<button class="copy-code-btn"></button></code></pre>
<p>エンティティAのみが一致します。</p>
<p>スカラーサブフィールドパスで `<code translate="no">array_contains</code>`、`<code translate="no">array_contains_any</code>`、または `<code translate="no">array_contains_all</code> ` を使用すると、そのエンティティ内のすべての Struct 要素にわたって、そのサブフィールドの値をテストできます。各サブフィールドパスは個別に評価されるため、異なるサブフィールドに対する条件は、異なる Struct 要素によって満たされる可能性があります。</p>
<pre><code translate="no" class="language-text"># At least one chunk belongs to the &quot;index&quot; section.
array_contains(chunks[section], &quot;index&quot;)

# At least one chunk belongs to the &quot;index&quot; or the &quot;search&quot; section.
array_contains_any(chunks[section], [&quot;index&quot;, &quot;search&quot;])

# The chunks cover both the &quot;index&quot; and the &quot;search&quot; sections,
# not necessarily in the same chunk.
array_contains_all(chunks[section], [&quot;index&quot;, &quot;search&quot;])
<button class="copy-code-btn"></button></code></pre>
<p>サンプルデータの場合、<code translate="no">array_contains</code> および<code translate="no">array_contains_any</code> の式は両方のエンティティに一致します。<code translate="no">array_contains_all</code> の式は、どちらのエンティティにも<code translate="no">&quot;search&quot;</code> セクションがないため、どちらにも一致しません。これらの例は、異なるサブフィールド上の異なる要素によって条件が満たされるケースを示したものではありません。</p>
<p><code translate="no">array_contains(chunks[section], &quot;index&quot;)</code> は、<code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code> と同じエンティティを選択します。同じ Struct 要素に対して複数の条件が満たされる必要がある場合は、<code translate="no">MATCH_*</code> または<code translate="no">element_filter</code> を使用してください。これは、<code translate="no">$[...]</code> 述語が要素ごとに評価されるためです。</p>
<h3 id="Test-whether-a-nullable-StructArray-field-is-null" class="common-anchor-header">Null許容のStructArrayフィールドがNullかどうかをテストする<button data-href="#Test-whether-a-nullable-StructArray-field-is-null" class="anchor-icon" translate="no">
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
    </button></h3><p>Null 許容の StructArray フィールドの値全体をテストするには、<code translate="no">IS NULL</code> または<code translate="no">IS NOT NULL</code> を使用します。NULL は StructArray フィールド全体に適用されるため、これらの述語はフィールド名のみを受け付け、サブフィールドのパスは受け付けません。</p>
<pre><code translate="no" class="language-text"># Entities that have no chunks value.
chunks is null

# Entities that have a chunks value.
chunks is not null
<button class="copy-code-btn"></button></code></pre>
<p>適用性については、<a href="/docs/ja/structarray-limits.md#Nullable-and-dynamic-schema-limits">「Null可能および動的スキーマの制限</a>」を参照してください。エンティティ A とエンティティ B は、どちらも NULL ではない StructArray 値を持っています。</p>
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
    </button></h2><p><code translate="no">$[...]</code> 構文は、現在のStruct要素のスカラー値を表します。述語のサポート状況は、スカラーサブフィールドの型によって異なります：</p>
<table>
<thead>
<tr><th>サブフィールドの型</th><th>要素レベルの述語のサポート</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">$[has_code] == true</code> や<code translate="no">!($[has_code] == true)</code> などのスカラー述語。<code translate="no">$[has_code]</code> のような、ブール式のみの記述は避けてください。</td></tr>
<tr><td><code translate="no">INT8</code>、<code translate="no">INT16</code> 、<code translate="no">INT32</code> 、<code translate="no">INT64</code></td><td>比較、連鎖範囲、<code translate="no">in</code> 、<code translate="no">not in</code> 、<code translate="no">+</code> 、<code translate="no">-</code> 、<code translate="no">*</code> 、<code translate="no">/</code> 、または<code translate="no">%</code> に比較演算子が続く算術式、および論理演算の組み合わせ。</td></tr>
<tr><td><code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code></td><td>比較、連鎖範囲、<code translate="no">in</code> 、<code translate="no">not in</code> 、<code translate="no">+</code> 、<code translate="no">-</code> 、<code translate="no">*</code> 、または<code translate="no">/</code> を含む算術式に比較演算子が続くもの、および論理演算の組み合わせ。<code translate="no">%</code> 演算子は、浮動小数点サブフィールドではサポートされていません。</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>文字列比較、連鎖範囲、<code translate="no">in</code> 、<code translate="no">not in</code> 、<code translate="no">like</code> 、<code translate="no">=~</code> 、<code translate="no">!~</code> 、および論理演算の組み合わせ。</td></tr>
<tr><td>ベクトルサブフィールド</td><td><code translate="no">$[...]</code> のスカラー述語の入力としてはサポートされていません。代わりに、EmbeddingList検索または要素レベルのベクトル検索を通じてベクトルサブフィールドを使用してください。</td></tr>
</tbody>
</table>
<p><code translate="no">&amp;&amp;</code> 、<code translate="no">||</code> 、<code translate="no">!</code> などの論理演算子は、述語式に適用されます。たとえば、<code translate="no">!$[has_code]</code> の代わりに<code translate="no">!($[has_code] == true)</code> と記述します。</p>
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
<li><p>配列コンテナ関数（<code translate="no">array_contains</code> 、<code translate="no">array_contains_all</code> 、<code translate="no">array_contains_any</code> 、<code translate="no">array_length</code> など）については、<code translate="no">$[subfield]</code> を参照してください。代わりに、行レベルの述語内で、<code translate="no">chunks[section]</code> のようなサブフィールドパスに対してこれらの関数を使用してください。</p></li>
<li><p><code translate="no">$[subfield] is null</code> または<code translate="no">$[subfield] is not null</code> 。</p></li>
<li><p>ジオメトリ／GIS 関数。</p></li>
<li><p>timestamptz 式。</p></li>
<li><p><code translate="no">random_sample(...)</code>。</p></li>
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
    </button></h2><p>以下の構文規則に従ってください：</p>
<ul>
<li><p><code translate="no">MATCH_*</code> 演算子の名前は大文字小文字を区別しません。</p></li>
<li><p><code translate="no">$[subfield]</code> は、<code translate="no">element_filter</code> または<code translate="no">MATCH_*</code> 述語内でのみ使用してください。たとえば、<code translate="no">array_length($[section])</code> は拒否されます。</p></li>
<li><p><code translate="no">$[subfield]</code> をJSONパス、配列コンテナ、またはベクトルフィールドの参照として使用しないでください。</p></li>
<li><p><code translate="no">element_filter</code> や<code translate="no">MATCH_*</code> を、別の StructArray 演算子の内部にネストしないでください。</p></li>
<li><p><code translate="no">MATCH_LEAST</code> 、<code translate="no">MATCH_MOST</code> 、および<code translate="no">MATCH_EXACT</code> には、名前付き<code translate="no">threshold=N</code> を使用してください。</p></li>
<li><p>位置指定パスでは、サブフィールド名の前に要素の位置を記述してください。つまり、`<code translate="no">chunks[0][section]</code>` と記述し、`<code translate="no">chunks[section][0]</code>` とは記述しないでください。</p></li>
<li><p><code translate="no">IS NULL</code> および<code translate="no">IS NOT NULL</code> は、<code translate="no">chunks is null</code> のように StructArray フィールド全体に対してのみ使用してください。<code translate="no">chunks[section]</code> のようなサブフィールドパスや、<code translate="no">$[subfield]</code> に対しては使用しないでください。</p></li>
<li><p><code translate="no">MATCH_ANY</code> 空の StructArray に対して適用すると、<code translate="no">false</code> が返されます。</p></li>
<li><p><code translate="no">MATCH_ALL</code> 空の StructArray に対して呼び出すと、<code translate="no">true</code> が返されます。</p></li>
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
    </button></h2><p>関連するガイダンスについては、以下を参照してください：</p>
<ul>
<li><p><a href="/docs/ja/filtered-search-with-structarray.md">StructArray を使用したフィルタ検索</a></p></li>
<li><p><a href="/docs/ja/basic-vector-search-with-structarray.md">StructArray を使用した基本的なベクトル検索</a></p></li>
<li><p><a href="/docs/ja/index-structarray-fields.md">StructArrayフィールドのインデックス</a></p></li>
<li><p><a href="/docs/ja/structarray-limits.md">StructArrayの制限事項</a></p></li>
</ul>
