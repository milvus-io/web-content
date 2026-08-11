---
id: boolean.md
title: 过滤功能详解
summary: >-
  Milvus 提供了强大的过滤功能，可实现对数据的精准查询。通过过滤表达式，您可以针对特定的标量字段，并使用不同的条件来优化搜索结果。本指南将详细介绍如何在
  Milvus 中使用过滤表达式，并附有侧重于查询操作的示例。您还可以在搜索和删除请求中应用这些过滤条件。
---
<h1 id="Filtering-Explained" class="common-anchor-header">过滤功能详解<button data-href="#Filtering-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 提供了强大的过滤功能，可实现对数据的精准查询。通过过滤表达式，您可以针对特定的标量字段，并使用不同的条件来优化搜索结果。本指南将详细说明如何在 Milvus 中使用过滤表达式，并重点通过查询操作的示例进行说明。您还可以在搜索和删除请求中应用这些过滤条件。</p>
<h2 id="Basic-operators" class="common-anchor-header">基本操作符<button data-href="#Basic-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支持多种用于过滤数据的基本操作符：</p>
<ul>
<li><p><strong>比较操作符</strong>：<code translate="no">==</code> 、<code translate="no">!=</code> 、<code translate="no">&gt;</code> 、<code translate="no">&lt;</code> 、<code translate="no">&gt;=</code> 以及<code translate="no">&lt;=</code> ，可用于基于数值或文本字段进行过滤。</p></li>
<li><p><strong>范围和模式过滤器</strong>：<code translate="no">IN</code> 、<code translate="no">LIKE</code> 、<code translate="no">=~</code> 以及<code translate="no">!~</code> 可匹配值、通配符模式或正则表达式模式。有关字符串模式的详细信息，请参阅<a href="/docs/zh/pattern-matching.md">“模式匹配”</a>。</p></li>
<li><p><strong>算术操作符</strong>：<code translate="no">+</code> 、<code translate="no">-</code> 、<code translate="no">*</code> 、<code translate="no">/</code> 、<code translate="no">%</code> 和<code translate="no">**</code> 用于涉及数值字段的计算。</p></li>
<li><p><strong>位操作符</strong>：在 Milvus 3.0.0 及更高版本中，<code translate="no">&amp;</code> 、<code translate="no">|</code> 和<code translate="no">^</code> 用于过滤编码了多个标志（如权限或状态位）的整数字段。详情请参阅<a href="/docs/zh/basic-operators.md#Bitwise-operators">“基本操作符”</a>。</p></li>
<li><p><strong>逻辑操作符</strong>：<code translate="no">AND</code> 、<code translate="no">OR</code> 和<code translate="no">NOT</code> 可将多个条件组合成复杂表达式。</p></li>
<li><p><strong>IS NULL 和 IS NOT NULL 操作符</strong>：<code translate="no">IS NULL</code> 和<code translate="no">IS NOT NULL</code> 操作符用于根据字段是否包含空值（无数据）来筛选字段。有关详细信息，请参阅<a href="/docs/zh/basic-operators.md#IS-NULL-and-IS-NOT-NULL-operators">“基本操作符”</a>。</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">示例：按颜色筛选<button data-href="#Example-Filtering-by-Color" class="anchor-icon" translate="no">
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
    </button></h3><p>若要查找在标量字段<code translate="no">color</code> 中包含主色（红色、绿色或蓝色）的实体，请使用以下筛选表达式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-by-Permission-Bits" class="common-anchor-header">示例：按权限位进行筛选<button data-href="#Example-Filtering-by-Permission-Bits" class="anchor-icon" translate="no">
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
    </button></h3><p>若要查找其整数字段<code translate="no">permissions</code> 中已设置<code translate="no">SHARE</code> 位的实体，请使用位与操作符（<code translate="no">&amp;</code> ）：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;(permissions &amp; 4) == 4&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-by-Regex-Pattern" class="common-anchor-header">示例：按正则表达式模式筛选<button data-href="#Example-Filtering-by-Regex-Pattern" class="anchor-icon" translate="no">
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
    </button></h3><p>若要查找<code translate="no">message</code> 字段中包含<code translate="no">E1001</code> 等错误代码的实体，请使用正则表达式匹配操作符<code translate="no">=~</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>正则表达式过滤器使用子字符串匹配。若要求整个字段值与模式完全匹配，请添加<code translate="no">^</code> 和<code translate="no">$</code> 锚点。详情请参阅<a href="/docs/zh/pattern-matching.md">“模式匹配”</a>。</p>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">示例：过滤 JSON 字段<button data-href="#Example-Filtering-JSON-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 允许引用 JSON 字段中的键。例如，若有一个 JSON 字段<code translate="no">product</code> ，其中包含键<code translate="no">price</code> 和<code translate="no">model</code> ，且需要查找具有特定模型且价格低于 1,850 的产品，请使用以下过滤表达式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">示例：过滤数组字段<button data-href="#Example-Filtering-Array-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>如果有一个数组字段<code translate="no">history_temperatures</code> ，其中包含自 2000 年以来各观测站报告的平均气温记录，且您希望查找 2009 年（第 10 个记录年份）气温超过 23°C 的观测站，请使用以下表达式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>有关这些基本操作符的更多信息，请参阅《<a href="/docs/zh/basic-operators.md">基本操作符</a>》。</p>
<h2 id="Filter-expression-templates" class="common-anchor-header">筛选表达式模板<button data-href="#Filter-expression-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>使用中日韩（CJK）字符进行筛选时，由于其字符集更大且编码存在差异，处理过程可能会更为复杂。这可能会导致性能下降，尤其是在使用<code translate="no">IN</code> 操作符时。</p>
<p>Milvus 引入了过滤表达式模板机制，以优化处理 CJK 字符时的性能。通过将动态值与过滤表达式分离，查询引擎能够更高效地处理参数插入。</p>
<h3 id="Example" class="common-anchor-header">示例<button data-href="#Example" class="anchor-icon" translate="no">
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
    </button></h3><p>要查找居住在“北京”或“上海”且年龄在25岁以上的人员，请使用以下模板表达式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>为提高性能，请使用以下带参数的变体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>此方法可减少解析开销并提高查询速度。有关更多信息，请参阅<a href="/docs/zh/filtering-templating.md">“过滤模板”</a>。</p>
<h2 id="Data-type-specific-operators" class="common-anchor-header">特定于数据类型的操作符<button data-href="#Data-type-specific-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 为特定数据类型（如 JSON、ARRAY 和 VARCHAR 字段）提供了高级过滤操作符。</p>
<h3 id="JSON-field-specific-operators" class="common-anchor-header">JSON 字段专用操作符<button data-href="#JSON-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 提供了用于查询 JSON 字段的高级操作符，支持在复杂的 JSON 结构中进行精确过滤：</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>: 检查该字段中是否存在某个 JSON 表达式。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>: 确保 JSON 表达式中的所有元素均存在。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>: 筛选 JSON 表达式中至少包含一个元素的实体。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>有关 JSON 操作符的更多详细信息，请参阅<a href="/docs/zh/json-operators.md">JSON 操作符</a>。</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">ARRAY 字段专用操作符<button data-href="#ARRAY-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 为数组字段提供了高级筛选操作符，例如 `<code translate="no">ARRAY_CONTAINS</code>`、`<code translate="no">ARRAY_CONTAINS_ALL</code>`、`<code translate="no">ARRAY_CONTAINS_ANY</code>` 和 `<code translate="no">ARRAY_LENGTH</code>`，这些操作符允许对数组数据进行精细控制：</p>
<p><code translate="no">ARRAY_CONTAINS</code>: 筛选包含特定元素的实体。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>: 筛选列表中所有元素均存在的实体。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>: 筛选包含列表中任意一个元素的实体。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>: 根据数组的长度进行筛选。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>有关数组操作符的更多详细信息，请参阅<a href="/docs/zh/array-operators.md">“ARRAY 操作符”</a>。</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">VARCHAR 字段专用操作符<button data-href="#VARCHAR-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 提供了用于对 VARCHAR 字段进行精确文本搜索的专用操作符：</p>
<h4 id="Pattern-matching-operators" class="common-anchor-header">模式匹配操作符</h4><p><code translate="no">LIKE</code> 、<code translate="no">=~</code> 和<code translate="no">!~</code> 操作符可匹配<code translate="no">VARCHAR</code> 字段、JSON 字符串路径以及特定的<code translate="no">ARRAY&lt;VARCHAR&gt;</code> 元素中的字符串模式。使用<code translate="no">LIKE</code> 进行简单的通配符模式匹配。使用<code translate="no">=~</code> 和<code translate="no">!~</code> 进行 RE2 正则表达式匹配。</p>
<p>详情请参阅“<a href="/docs/zh/pattern-matching.md">模式匹配</a>”。</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> 操作符</h4><p><code translate="no">TEXT_MATCH</code> 操作符允许根据特定查询词进行精确的文档检索。它特别适用于将标量过滤器与向量相似度搜索相结合的过滤搜索。与语义搜索不同，Text Match侧重于词汇的精确匹配。</p>
<p>Milvus 使用 Tantivy 来支持倒排索引和基于术语的文本搜索。该过程包括：</p>
<ol>
<li><p><strong>分析器</strong>：将输入文本分词并进行处理。</p></li>
<li><p><strong>索引</strong>：创建将唯一分词映射到文档的倒排索引。</p></li>
</ol>
<p>更多详情，请参阅<a href="/docs/zh/keyword-match.md">“文本匹配</a>”。</p>
<h4 id="PHRASEMATCH-operator--Milvus-26x" class="common-anchor-header"><code translate="no">PHRASE_MATCH</code> 操作符<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span></h4><p><strong>PHRASE_MATCH</strong>操作符支持基于精确短语匹配来检索文档，同时考虑查询词的顺序和相邻性。</p>
<p>有关更多详细信息，请参阅<a href="/docs/zh/phrase-match.md">“短语匹配</a>”。</p>
