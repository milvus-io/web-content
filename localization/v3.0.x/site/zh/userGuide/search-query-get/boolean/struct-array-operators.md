---
id: struct-array-operators.md
title: StructArray 操作符
summary: >-
  StructArray 操作符通过评估 StructArray 字段内部标量子字段上的谓词来过滤实体。请将本页作为 element_filter 以及
  MATCH_* 操作符家族的语法参考。
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
    </button></h1><p>StructArray 操作符通过评估 StructArray 字段内标量子字段上的谓词来过滤实体。请将本页作为 `<code translate="no">element_filter</code> ` 以及 `<code translate="no">MATCH_*</code> ` 操作符家族的语法参考。</p>
<p>StructArray 过滤包含两个操作符家族：</p>
<table>
<thead>
<tr><th>操作符家族</th><th>主要用途</th><th>结果行为</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>匹配满足标量谓词的 Struct 元素。</td><td>在元素级搜索中，匹配结果可能包含元素偏移量。在行级查询或过滤搜索中，结果的结构取决于 API 和输出字段。</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>根据满足标量谓词的 Struct 元素数量来选择实体。</td><td>行级过滤。这些操作符本身不会返回元素偏移量。</td></tr>
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
<tr><td>仅返回至少、至多或恰好<code translate="no">N</code> 个Struct元素满足谓词的实体。</td><td><code translate="no">MATCH_LEAST</code>、<code translate="no">MATCH_MOST</code> 或<code translate="no">MATCH_EXACT</code></td></tr>
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
    </button></h2><p>使用<code translate="no">element_filter(structArrayField, predicate)</code> 来匹配StructArray字段中的Struct元素。</p>
<p>在谓词内部，使用<code translate="no">$[subfield]</code> 来引用当前 Struct 元素的标量子字段。</p>
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
<tr><td><code translate="no">MATCH_LEAST(field, predicate, threshold=N)</code></td><td>至少有<code translate="no">N</code> 个Struct元素满足该谓词。</td></tr>
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
    </button></h3><p><code translate="no">MATCH_ANY</code> 如果 StructArray 中至少有一个元素满足谓词，则其计算结果为<code translate="no">true</code> 。</p>
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
    </button></h3><p><code translate="no">MATCH_MOST</code> 如果满足谓词的元素个数小于或等于<code translate="no">threshold</code> ，则计算结果为<code translate="no">true</code> 。</p>
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
<tr><td><code translate="no">BOOL</code></td><td>诸如<code translate="no">$[has_code] == true</code> 或<code translate="no">!($[has_code] == true)</code> 之类的标量谓词。请避免使用诸如<code translate="no">$[has_code]</code> 之类的裸布尔表达式。</td></tr>
<tr><td><code translate="no">INT8</code>、<code translate="no">INT16</code> 、<code translate="no">INT32</code> 、<code translate="no">INT64</code></td><td>比较运算、链式范围、<code translate="no">in</code> 、<code translate="no">not in</code> 、包含<code translate="no">+</code> 、<code translate="no">-</code> 、<code translate="no">*</code> 、<code translate="no">/</code> 或<code translate="no">%</code> 并随后跟有比较运算的算术表达式，以及逻辑组合。</td></tr>
<tr><td><code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code></td><td>比较、链式范围、<code translate="no">in</code> 、<code translate="no">not in</code> 、包含<code translate="no">+</code> 、<code translate="no">-</code> 、<code translate="no">*</code> 或<code translate="no">/</code> 的算术表达式后跟比较，以及逻辑组合。<code translate="no">%</code> 操作符不支持浮点子字段。</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>字符串比较、链式范围、<code translate="no">in</code> 、<code translate="no">not in</code> 、<code translate="no">like</code> 、<code translate="no">=~</code> 、<code translate="no">!~</code> 以及逻辑组合。</td></tr>
<tr><td>向量子场</td><td>不支持作为<code translate="no">$[...]</code> 标量谓词的输入。请改用EmbeddingList搜索或元素级向量搜索来处理向量子字段。</td></tr>
</tbody>
</table>
<p>诸如<code translate="no">&amp;&amp;</code> 、<code translate="no">\|\|</code> 和<code translate="no">!</code> 等逻辑操作符适用于谓词表达式。例如，请写<code translate="no">!($[has_code] == true)</code> 而不是<code translate="no">!$[has_code]</code> 。</p>
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
<li><p>JSON路径语法、对JSON路径的<code translate="no">exists</code> 操作，或JSON函数（如<code translate="no">json_contains</code> 、<code translate="no">json_contains_all</code> 或<code translate="no">json_contains_any</code> ）。</p></li>
<li><p>数组容器函数，例如<code translate="no">array_contains</code> 、<code translate="no">array_contains_all</code> 、<code translate="no">array_contains_any</code> 或<code translate="no">array_length</code> 。</p></li>
<li><p><code translate="no">$[subfield] is null</code> 或<code translate="no">$[subfield] is not null</code> 。</p></li>
<li><p>几何/GIS 函数。</p></li>
<li><p>timestamptz 表达式。</p></li>
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
<li><p>仅在<code translate="no">element_filter</code> 或<code translate="no">MATCH_*</code> 谓词内部使用<code translate="no">$[subfield]</code> 。</p></li>
<li><p>请勿将<code translate="no">$[subfield]</code> 用作 JSON 路径、数组容器或向量字段引用。</p></li>
<li><p>请勿将<code translate="no">element_filter</code> 或<code translate="no">MATCH_*</code> 嵌套在另一个StructArray操作符中。</p></li>
<li><p>请使用命名<code translate="no">threshold=N</code> 来表示<code translate="no">MATCH_LEAST</code> 、<code translate="no">MATCH_MOST</code> 和<code translate="no">MATCH_EXACT</code> 。</p></li>
<li><p><code translate="no">MATCH_ANY</code> 对空的 StructArray 调用时，返回<code translate="no">false</code> 。</p></li>
<li><p><code translate="no">MATCH_ALL</code> 对空的 StructArray 调用时，返回<code translate="no">true</code> 。</p></li>
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
