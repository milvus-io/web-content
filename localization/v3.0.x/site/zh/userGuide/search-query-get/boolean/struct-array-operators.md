---
id: struct-array-operators.md
title: StructArray 操作符
summary: >-
  StructArray 操作符通过评估 StructArray 字段内部标量子字段上的谓词来过滤实体。本页面可作为
  element_filter、MATCH_* 运算符族以及 StructArray 路径上行级谓词的语法参考。
---
<h1 id="StructArray-Operators" class="common-anchor-header">StructArray 操作符<button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>StructArray 操作符通过评估 StructArray 字段内标量子字段上的谓词来过滤实体。本页面可作为<code translate="no">element_filter</code> 、<code translate="no">MATCH_*</code> 操作符族以及 StructArray 路径上的行级谓词的语法参考。</p>
<p>StructArray 过滤包含两个操作符家族和一组行级路径谓词：</p>
<table>
<thead>
<tr><th>过滤形式</th><th>主要用途</th><th>结果行为</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>匹配满足标量谓词的 Struct 元素。</td><td>在元素级搜索中，匹配结果可能包含元素偏移量。在行级查询或过滤搜索中，结果的结构取决于 API 和输出字段。</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>根据满足标量谓词的 Struct 元素数量来选择实体。</td><td>行级过滤。这些操作符本身不会返回元素偏移量。</td></tr>
<tr><td>行级路径谓词</td><td>在不使用<code translate="no">$[...]</code> 谓词的情况下，测试单个元素的位置、统计Struct元素的数量，或测试跨元素的子字段值。</td><td>行级过滤。这些谓词不会返回元素偏移量。</td></tr>
</tbody>
</table>
<p>在 StructArray 操作符中使用标量子字段。向量字段用于向量搜索路径，不能作为标量谓词的输入。</p>
<h2 id="When-to-use-which-operator" class="common-anchor-header">何时使用哪个操作符<button data-href="#When-to-use-which-operator" class="anchor-icon" translate="no">
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
<tr><th>目标</th><th>用法</th></tr>
</thead>
<tbody>
<tr><td>将元素级向量搜索限制为符合标量条件的元素。</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>匹配同一 Struct 元素内的多个标量条件。</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>仅返回至少有一个 Struct 元素满足谓词的实体。</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>仅返回所有 Struct 元素均满足某个谓词的实体。</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td>仅返回至少、至多或恰好有<code translate="no">N</code> 个 Struct 元素满足某个谓词的实体。</td><td><code translate="no">MATCH_LEAST</code>、<code translate="no">MATCH_MOST</code> 或<code translate="no">MATCH_EXACT</code></td></tr>
<tr><td>检查特定位置的 Struct 元素，例如第一个块。</td><td>位置路径，例如<code translate="no">chunks[0][section]</code></td></tr>
<tr><td>按实体中Struct元素的数量进行过滤。</td><td><code translate="no">array_length(chunks)</code></td></tr>
<tr><td>检查任何结构元素是否包含子字段值，而不将同一元素上的条件组合在一起。</td><td><code translate="no">array_contains</code>，<code translate="no">array_contains_any</code> ，或<code translate="no">array_contains_all</code> ，用于子字段路径，例如<code translate="no">chunks[section]</code></td></tr>
</tbody>
</table>
<h2 id="Element-Filter" class="common-anchor-header">元素过滤器<button data-href="#Element-Filter" class="anchor-icon" translate="no">
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
    </button></h2><p>使用<code translate="no">element_filter(structArrayField, predicate)</code> 匹配 StructArray 字段中的 Struct 元素。</p>
<p>在谓词内部，使用<code translate="no">$[subfield]</code> 来引用当前Struct元素的一个标量子字段。</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>当谓词内部使用多个条件时，所有<code translate="no">$[subfield]</code> 引用均适用于同一个 Struct 元素：</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; $[quality_score] &gt; <span class="hljs-number">0.9</span>)
<button class="copy-code-btn"></button></code></pre>
<p>当将实体级谓词与 `<code translate="no">element_filter</code>` 结合使用时，请将 `<code translate="no">element_filter</code> ` 置于表达式末尾：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Correct</span>
category == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>)

<span class="hljs-comment"># Incorrect</span>
element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>) &amp;&amp; category == <span class="hljs-string">&quot;index&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">element_filter</code> 在过滤表达式中只能出现一次。请勿将<code translate="no">element_filter</code> 或<code translate="no">MATCH_*</code> 嵌套在另一个<code translate="no">element_filter</code> 中。</p>
<h2 id="Match-Family-Operators" class="common-anchor-header">匹配族操作符<button data-href="#Match-Family-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>当需要根据满足谓词的 Struct 元素数量来选择实体时，请使用<code translate="no">MATCH_*</code> 操作符。</p>
<table>
<thead>
<tr><th>操作符</th><th>含义</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY(field, predicate)</code></td><td>至少有一个 Struct 元素满足谓词。</td></tr>
<tr><td><code translate="no">MATCH_ALL(field, predicate)</code></td><td>所有 Struct 元素都满足该谓词。</td></tr>
<tr><td><code translate="no">MATCH_LEAST(field, predicate, threshold=N)</code></td><td>至少有<code translate="no">N</code> 个 Struct 元素满足该谓词。</td></tr>
<tr><td><code translate="no">MATCH_MOST(field, predicate, threshold=N)</code></td><td>至多有<code translate="no">N</code> 个Struct元素满足该谓词。</td></tr>
<tr><td><code translate="no">MATCH_EXACT(field, predicate, threshold=N)</code></td><td>恰有<code translate="no">N</code> 个Struct元素满足该谓词。</td></tr>
</tbody>
</table>
<p><code translate="no">MATCH_ANY</code> <code translate="no">element_filter</code> 均可表示至少有一个 Struct 元素满足该谓词。当仅需行级过滤时，请使用 。当需要元素级约束时（例如过滤哪些 Struct 元素参与元素级向量搜索），请使用 。<code translate="no">MATCH_ANY</code> <code translate="no">element_filter</code> </p>
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
    </button></h3><p><code translate="no">MATCH_ANY</code> 如果 StructArray 中至少有一个元素满足谓词，则其求值结果为<code translate="no">true</code> 。</p>
<pre><code translate="no" class="language-python">MATCH_ANY(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>对于空的 StructArray，<code translate="no">MATCH_ANY</code> 返回<code translate="no">false</code> 。</p>
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
    </button></h3><p><code translate="no">MATCH_ALL</code> 如果 StructArray 中的每个元素都满足该谓词，则计算结果为<code translate="no">true</code> 。</p>
<pre><code translate="no" class="language-python">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>对于空的 StructArray，<code translate="no">MATCH_ALL</code> 返回<code translate="no">true</code> 。</p>
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
    </button></h3><p><code translate="no">MATCH_LEAST</code> 如果满足谓词的元素个数大于或等于<code translate="no">threshold</code> ，则<code translate="no">true</code> 的计算结果为 。</p>
<pre><code translate="no" class="language-python">MATCH_LEAST(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>, threshold=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<p>对于<code translate="no">MATCH_LEAST</code> ，<code translate="no">threshold</code> 必须是一个正整数。</p>
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
    </button></h3><p><code translate="no">MATCH_MOST</code> 如果满足谓词的元素个数小于或等于<code translate="no">threshold</code> ，则其计算结果为<code translate="no">true</code> 。</p>
<pre><code translate="no" class="language-python">MATCH_MOST(chunks, $[has_code] == true, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>对于<code translate="no">MATCH_MOST</code> ，<code translate="no">threshold</code> 可以是零或一个正整数。</p>
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> 如果满足谓词的元素个数恰好等于<code translate="no">threshold</code> ，则<code translate="no">true</code> 的计算结果为 。</p>
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[section] == <span class="hljs-string">&quot;filter&quot;</span>, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>对于<code translate="no">MATCH_EXACT</code> ，<code translate="no">threshold</code> 可以是零或一个正整数。</p>
<h2 id="Row-level-predicates-on-StructArray-paths" class="common-anchor-header">StructArray 路径上的行级谓词<button data-href="#Row-level-predicates-on-StructArray-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>除了<code translate="no">element_filter</code> 和<code translate="no">MATCH_*</code> 之外，常规过滤表达式还可以直接引用StructArray字段或其标量子字段之一。这些谓词在实体级别进行求值，且不返回元素偏移量。</p>
<h3 id="Access-a-Struct-element-by-position" class="common-anchor-header">按位置访问 Struct 元素<button data-href="#Access-a-Struct-element-by-position" class="anchor-icon" translate="no">
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
    </button></h3><p>使用 `<code translate="no">structArrayField[index][subfield]</code> ` 引用 Struct 元素中某个标量子字段，其位置以零为基准。先写位置，再写子字段名称。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The first chunk belongs to the &quot;index&quot; section.</span>
chunks[<span class="hljs-number">0</span>][section] == <span class="hljs-string">&quot;index&quot;</span>

<span class="hljs-comment"># The second chunk has a high quality score.</span>
chunks[<span class="hljs-number">1</span>][quality_score] &gt; <span class="hljs-number">0.9</span>

<span class="hljs-comment"># The first chunk is on page 1, 2, or 3.</span>
chunks[<span class="hljs-number">0</span>][page] <span class="hljs-keyword">in</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]

<span class="hljs-comment"># Chained range on a positional path.</span>
<span class="hljs-number">0.8</span> &lt; chunks[<span class="hljs-number">0</span>][quality_score] &lt; <span class="hljs-number">0.95</span>
<button class="copy-code-btn"></button></code></pre>
<p>位置路径支持对标量子字段进行比较、<code translate="no">in</code> 、<code translate="no">not in</code> 以及链式范围谓词。当实体的 StructArray 字段在该位置没有元素时，该实体不匹配。</p>
<h3 id="Count-Struct-elements" class="common-anchor-header">统计 Struct 元素数量<button data-href="#Count-Struct-elements" class="anchor-icon" translate="no">
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
    </button></h3><p>使用<code translate="no">array_length(structArrayField)</code> 根据实体中 Struct 元素的数量进行过滤。对子字段路径（例如<code translate="no">array_length(chunks[section])</code> ）使用<code translate="no">array_length</code> 会返回相同的计数，因为每个子字段在每个 Struct 元素中都包含一个值。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Articles with at least three chunks.</span>
array_length(chunks) &gt;= <span class="hljs-number">3</span>

<span class="hljs-comment"># Articles with exactly one chunk.</span>
array_length(chunks) == <span class="hljs-number">1</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Test-subfield-values-across-elements" class="common-anchor-header">跨元素测试子字段值<button data-href="#Test-subfield-values-across-elements" class="anchor-icon" translate="no">
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
    </button></h3><p>在标量子字段路径上使用<code translate="no">array_contains</code> 、<code translate="no">array_contains_any</code> 或<code translate="no">array_contains_all</code> ，可测试该子字段在实体中所有 Struct 元素上的值。每个子字段路径均单独进行评估，因此不同子字段的条件可由不同的 Struct 元素满足。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># At least one chunk belongs to the &quot;index&quot; section.</span>
array_contains(chunks[section], <span class="hljs-string">&quot;index&quot;</span>)

<span class="hljs-comment"># At least one chunk belongs to the &quot;index&quot; or the &quot;search&quot; section.</span>
array_contains_any(chunks[section], [<span class="hljs-string">&quot;index&quot;</span>, <span class="hljs-string">&quot;search&quot;</span>])

<span class="hljs-comment"># The chunks cover both the &quot;index&quot; and the &quot;search&quot; sections,</span>
<span class="hljs-comment"># not necessarily in the same chunk.</span>
array_contains_all(chunks[section], [<span class="hljs-string">&quot;index&quot;</span>, <span class="hljs-string">&quot;search&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">array_contains(chunks[section], &quot;index&quot;)</code> 与<code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code> 选择相同的实体。当同一 Struct 元素必须满足多个条件时，请使用<code translate="no">MATCH_*</code> 或<code translate="no">element_filter</code> ，因为<code translate="no">$[...]</code> 谓词是按元素逐个评估的。</p>
<h3 id="Test-whether-a-nullable-StructArray-field-is-null" class="common-anchor-header">测试可为空的 StructArray 字段是否为空<button data-href="#Test-whether-a-nullable-StructArray-field-is-null" class="anchor-icon" translate="no">
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
    </button></h3><p>对可为空的 StructArray 字段使用<code translate="no">IS NULL</code> 或<code translate="no">IS NOT NULL</code> 来测试整个字段值。Null 适用于整个 StructArray 字段，因此这些谓词仅接受字段名，而不接受子字段路径。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Entities that have no chunks value.</span>
chunks <span class="hljs-keyword">is</span> null

<span class="hljs-comment"># Entities that have a chunks value.</span>
chunks <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> null
<button class="copy-code-btn"></button></code></pre>
<h2 id="Supported-predicates" class="common-anchor-header">支持的谓词<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">$[...]</code> 语法表示当前 Struct 元素的标量值。谓词的支持情况取决于标量子字段的类型。</p>
<table>
<thead>
<tr><th>子字段类型</th><th>元素级谓词支持</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>标量谓词，例如<code translate="no">$[has_code] == true</code> 或<code translate="no">!($[has_code] == true)</code> 。请避免使用裸布尔表达式，例如<code translate="no">$[has_code]</code> 。</td></tr>
<tr><td><code translate="no">INT8</code>、<code translate="no">INT16</code> 、<code translate="no">INT32</code> 、<code translate="no">INT64</code></td><td>比较运算、链式范围、<code translate="no">in</code> 、<code translate="no">not in</code> ，以及包含<code translate="no">+</code> 、<code translate="no">-</code> 、<code translate="no">*</code> 、<code translate="no">/</code> 或<code translate="no">%</code> 后接比较运算的算术表达式，还有逻辑组合。</td></tr>
<tr><td><code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code></td><td>比较、链式范围、<code translate="no">in</code> 、<code translate="no">not in</code> 、包含<code translate="no">+</code> 、<code translate="no">-</code> 、<code translate="no">*</code> 或<code translate="no">/</code> 的算术表达式后跟比较，以及逻辑组合。<code translate="no">%</code> 操作符不支持浮点子字段。</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>字符串比较、链式范围、<code translate="no">in</code> 、<code translate="no">not in</code> 、<code translate="no">like</code> 、<code translate="no">=~</code> 、<code translate="no">!~</code> 以及逻辑组合。</td></tr>
<tr><td>向量子场</td><td>不支持作为<code translate="no">$[...]</code> 标量谓词的输入。请改用EmbeddingList搜索或元素级向量搜索来处理向量子字段。</td></tr>
</tbody>
</table>
<p>诸如<code translate="no">&amp;&amp;</code> 、<code translate="no">\|\|</code> 和<code translate="no">!</code> 等逻辑运算符适用于谓词表达式。例如，请写<code translate="no">!($[has_code] == true)</code> 而不是<code translate="no">!$[has_code]</code> 。</p>
<h2 id="Unsupported-predicates" class="common-anchor-header">不支持的谓词<button data-href="#Unsupported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>元素级<code translate="no">$[...]</code> 谓词不支持：</p>
<ul>
<li><p>文本匹配函数，例如<code translate="no">text_match(field, &quot;...&quot;)</code> 或<code translate="no">phrase_match(field, &quot;...&quot;)</code> 。</p></li>
<li><p>JSON路径语法、对JSON路径的<code translate="no">exists</code> 操作，或诸如<code translate="no">json_contains</code> 、<code translate="no">json_contains_all</code> 或<code translate="no">json_contains_any</code> 等JSON函数。</p></li>
<li><p>数组容器函数，例如<code translate="no">array_contains</code> 、<code translate="no">array_contains_all</code> 、<code translate="no">array_contains_any</code> 或<code translate="no">array_length</code> （详见<code translate="no">$[subfield]</code> ）。请改在行级谓词中，对子字段路径（如<code translate="no">chunks[section]</code> ）使用这些函数。</p></li>
<li><p><code translate="no">$[subfield] is null</code> 或<code translate="no">$[subfield] is not null</code> 。</p></li>
<li><p>几何/GIS 函数。</p></li>
<li><p>带时区的时间戳表达式。</p></li>
<li><p><code translate="no">random_sample(...)</code>.</p></li>
<li><p>字段级向量谓词。</p></li>
<li><p>通用过滤函数调用，除非特定函数的签名和执行路径明确支持 StructArray 元素级谓词。</p></li>
</ul>
<h2 id="Syntax-rules" class="common-anchor-header">语法规则<button data-href="#Syntax-rules" class="anchor-icon" translate="no">
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
<li><p><code translate="no">MATCH_*</code> 操作符名称不区分大小写。</p></li>
<li><p>仅在<code translate="no">element_filter</code> 或<code translate="no">MATCH_*</code> 谓词内部使用<code translate="no">$[subfield]</code> 。例如，<code translate="no">array_length($[section])</code> 将被拒绝。</p></li>
<li><p>请勿将 `<code translate="no">$[subfield]</code> ` 用作 JSON 路径、数组容器或向量字段引用。</p></li>
<li><p>请勿将<code translate="no">element_filter</code> 或<code translate="no">MATCH_*</code> 嵌套在另一个 StructArray 操作符中。</p></li>
<li><p>对于<code translate="no">MATCH_LEAST</code> 、<code translate="no">MATCH_MOST</code> 和<code translate="no">MATCH_EXACT</code> ，请使用命名的<code translate="no">threshold=N</code> 。</p></li>
<li><p>在位置路径中，应将元素位置写在子字段名称之前：<code translate="no">chunks[0][section]</code> ，而非<code translate="no">chunks[section][0]</code> 。</p></li>
<li><p>仅在整个 StructArray 字段上使用<code translate="no">IS NULL</code> 和<code translate="no">IS NOT NULL</code> ，例如<code translate="no">chunks is null</code> 。请勿在子字段路径（如<code translate="no">chunks[section]</code> ）或<code translate="no">$[subfield]</code> 上使用它们。</p></li>
<li><p><code translate="no">MATCH_ANY</code> 对空的 StructArray 调用时，返回<code translate="no">false</code> 。</p></li>
<li><p><code translate="no">MATCH_ALL</code> 对空的 StructArray 调用将返回<code translate="no">true</code> 。</p></li>
</ul>
<h2 id="See-also" class="common-anchor-header">另请参阅<button data-href="#See-also" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/zh/filtered-search-with-structarray.md">使用 StructArray 进行过滤搜索</a></p></li>
<li><p><a href="/docs/zh/basic-vector-search-with-structarray.md">使用 StructArray 进行基本向量搜索</a></p></li>
<li><p><a href="/docs/zh/index-structarray-fields.md">索引 StructArray 字段</a></p></li>
<li><p><a href="/docs/zh/structarray-limits.md">StructArray 的限制</a></p></li>
</ul>
