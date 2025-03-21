---
id: basic-operators.md
summary: >-
  Milvus
  提供丰富的基本操作符，帮助您高效地过滤和查询数据。这些操作符允许您根据标量字段、数字计算、逻辑条件等来完善搜索条件。了解如何使用这些操作符对于建立精确查询和最大限度地提高搜索效率至关重要。
title: 基本操作符
---
<h1 id="Basic-Operators​" class="common-anchor-header">基本操作符<button data-href="#Basic-Operators​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 提供丰富的基本操作符，帮助您高效地过滤和查询数据。这些操作符允许您根据标量字段、数字计算、逻辑条件等来完善搜索条件。了解如何使用这些操作符对于建立精确查询和最大限度地提高搜索效率至关重要。</p>
<h2 id="Comparison-operators​" class="common-anchor-header">比较操作符<button data-href="#Comparison-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>比较操作符用于根据相等、不等或大小过滤数据。它们适用于数字、文本和日期字段。</p>
<h3 id="Supported-Comparison-Operators​" class="common-anchor-header">支持的比较操作符。</h3><ul>
<li><p><code translate="no">==</code> 等于</p></li>
<li><p><code translate="no">!=</code> (不等于</p></li>
<li><p><code translate="no">&gt;</code> 大于</p></li>
<li><p><code translate="no">&lt;</code> 小于</p></li>
<li><p><code translate="no">&gt;=</code> (大于或等于</p></li>
<li><p><code translate="no">&lt;=</code> (小于或等于</p></li>
</ul>
<h3 id="Example-1-Filtering-with-Greater-Than-or-Equal-To-​" class="common-anchor-header">例 1：使用大于等于 (<code translate="no">&gt;=</code>) 过滤</h3><p>如果要查找<code translate="no">rating</code> 大于或等于 4 的所有实体。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtering-with-Less-Than-or-Equal-To-​" class="common-anchor-header">例 2：使用小于或等于 (<code translate="no">&lt;=</code>) 过滤</h3><p>要查找<code translate="no">discount</code> 小于或等于 10% 的实体。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Range-operators​" class="common-anchor-header">范围操作符<button data-href="#Range-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>范围操作符有助于根据特定的值集或范围过滤数据。</p>
<h3 id="Supported-Range-Operators​" class="common-anchor-header">支持的范围操作符。</h3><ul>
<li><p><code translate="no">IN</code>:用于匹配特定集合或范围内的值。</p></li>
<li><p><code translate="no">LIKE</code>:用于匹配模式（主要用于文本字段）。</p></li>
</ul>
<h3 id="Example-1-Using-IN-to-Match-Multiple-Values​" class="common-anchor-header">例 1：使用<code translate="no">IN</code> 匹配多个值</h3><p>如果要查找<code translate="no">color</code> 为 &quot;红色&quot;、&quot;绿色 &quot;或 &quot;蓝色 &quot;的所有实体。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>当您要检查值列表中的成员资格时，这很有用。</p>
<h3 id="Example-2-Using-LIKE-for-Pattern-Matching​" class="common-anchor-header">例 2：使用<code translate="no">LIKE</code> 进行模式匹配</h3><p><code translate="no">LIKE</code> 操作符用于字符串字段中的模式匹配。它可以匹配文本中不同位置的子串：<strong>前缀</strong>、<strong>后缀</strong>或<strong>后缀</strong>。<code translate="no">LIKE</code> 操作符使用<code translate="no">%</code> 符号作为通配符，可以匹配任意数量的字符（包括 0）。</p>
<h4 id="Prefix-Match-Starts-With​" class="common-anchor-header">前缀匹配（从开始</h4><p>要执行<strong>前缀</strong>匹配，即字符串以给定的模式开始，可以将模式放在开头，然后使用<code translate="no">%</code> 匹配其后的任何字符。例如，要查找<code translate="no">name</code> 以 &quot;Prod &quot;开头的所有产品。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>这将匹配名称以 &quot;Prod &quot;开头的任何产品，如 &quot;Product A&quot;、&quot;Product B &quot;等。</p>
<h4 id="Suffix-Match-Ends-With​" class="common-anchor-header">后缀匹配（以 "结束 "结尾</h4><p>在<strong>后缀</strong>匹配中，如果字符串以给定的模式结尾，则将<code translate="no">%</code> 符号放在模式的开头。例如，查找<code translate="no">name</code> 以 &quot;XYZ &quot;结尾的所有产品。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%XYZ&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>这将匹配名称以 &quot;XYZ &quot;结尾的任何产品，如 &quot;ProductXYZ&quot;、&quot;SampleXYZ &quot;等。</p>
<h4 id="Infix-Match-Contains​" class="common-anchor-header">后缀匹配（包含</h4><p>要执行<strong>词缀</strong>匹配，即模式可以出现在字符串的任何位置，可以在模式的开头和结尾处都加上<code translate="no">%</code> 符号。例如，要查找<code translate="no">name</code> 中包含 &quot;Pro &quot;一词的所有产品。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%Pro%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>这将匹配名称包含子串 &quot;Pro &quot;的任何产品，如 &quot;Product&quot;、&quot;ProLine &quot;或 &quot;SuperPro&quot;。</p>
<h2 id="Arithmetic-Operators​" class="common-anchor-header">算术操作符<button data-href="#Arithmetic-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>算术操作符允许您根据涉及数字字段的计算创建条件。</p>
<h3 id="Supported-Arithmetic-Operators​" class="common-anchor-header">支持的算术操作符。</h3><ul>
<li><p><code translate="no">+</code> 加法</p></li>
<li><p><code translate="no">-</code> 减法</p></li>
<li><p><code translate="no">*</code> 乘法</p></li>
<li><p><code translate="no">/</code> 除法</p></li>
<li><p><code translate="no">%</code> 模乘</p></li>
<li><p><code translate="no">**</code> 幂</p></li>
</ul>
<h3 id="Example-1-Using-Addition-+​" class="common-anchor-header">例 1：使用加法 (<code translate="no">+</code>)</h3><p>查找<code translate="no">total</code> 价格是<code translate="no">base_price</code> 和<code translate="no">tax</code> 之和的实体。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total == base_price + tax&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-Subtraction--​" class="common-anchor-header">例 2：使用减法 (<code translate="no">-</code>)</h3><p>查找<code translate="no">quantity</code> 大于 50 且<code translate="no">quantity_sold</code> 小于 30 的实体。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;quantity - quantity_sold &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-Multiplication-​" class="common-anchor-header">例 3：使用乘法 (<code translate="no">*</code>)</h3><p>查找<code translate="no">price</code> 大于 100 和<code translate="no">quantity</code> 大于 10 的实体相乘。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price * quantity &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Using-Division-​" class="common-anchor-header">例 4：使用除法 (<code translate="no">/</code>)</h3><p>查找<code translate="no">total_price</code> 除以<code translate="no">quantity</code> 小于 50 的乘积。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total_price / quantity &lt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Using-Modulus-​" class="common-anchor-header">例 5：使用模数 (<code translate="no">%</code>)</h3><p>查找<code translate="no">id</code> 是偶数（即能被 2 整除）的实体。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Using-Exponentiation-​" class="common-anchor-header">例 6：使用幂 (<code translate="no">**</code>)</h3><p>查找<code translate="no">price</code> 升为 2 的幂大于 1000 的实体。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price ** 2 &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Logical-Operators​" class="common-anchor-header">逻辑操作符<button data-href="#Logical-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>逻辑操作符用于将多个条件组合成更复杂的过滤表达式。这些运算符包括<code translate="no">AND</code>,<code translate="no">OR</code>, 和<code translate="no">NOT</code> 。</p>
<h3 id="Supported-Logical-Operators​" class="common-anchor-header">支持的逻辑操作符。</h3><ul>
<li><p><code translate="no">AND</code>:组合必须全部为真的多个条件。</p></li>
<li><p><code translate="no">OR</code>:组合至少一个必须为真的条件。</p></li>
<li><p><code translate="no">NOT</code>:否定一个条件。</p></li>
</ul>
<h3 id="Example-1-Using-AND-to-Combine-Conditions​" class="common-anchor-header">例 1：使用<code translate="no">AND</code> 合并条件</h3><p>查找<code translate="no">price</code> 大于 100 且<code translate="no">stock</code> 大于 50 的所有产品。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-OR-to-Combine-Conditions​" class="common-anchor-header">例 2：使用<code translate="no">OR</code> 合并条件</h3><p>查找<code translate="no">color</code> 为 &quot;红色 &quot;或 &quot;蓝色 &quot;的所有产品。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-NOT-to-Exclude-a-Condition​" class="common-anchor-header">例 3：使用<code translate="no">NOT</code> 排除条件</h3><p>查找<code translate="no">color</code> 不是 &quot;绿色 &quot;的所有产品。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="IS-NULL-and-IS-NOT-NULL-Operators" class="common-anchor-header">IS NULL 和 IS NOT NULL 操作符<button data-href="#IS-NULL-and-IS-NOT-NULL-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">IS NULL</code> 和<code translate="no">IS NOT NULL</code> 操作符用于根据字段是否包含空值（无数据）过滤字段。</p>
<ul>
<li><code translate="no">IS NULL</code>:识别特定字段包含空值（即值不存在或未定义）的实体。</li>
<li><code translate="no">IS NOT NULL</code>:识别特定字段包含除空值以外的任何值的实体，即字段具有有效的定义值。</li>
</ul>
<div class="alert note">
<p>操作符不区分大小写，因此可以使用<code translate="no">IS NULL</code> 或<code translate="no">is null</code> ，以及<code translate="no">IS NOT NULL</code> 或<code translate="no">is not null</code> 。</p>
</div>
<h3 id="Regular-Scalar-Fields-with-Null-Values" class="common-anchor-header">具有空值的正则标量字段</h3><p>Milvus 允许过滤带空值的常规标量字段，如字符串或数字。</p>
<div class="alert note">
<p>对于 VARCHAR 字段，空字符串<code translate="no">&quot;&quot;</code> 不会被视为空值。</p>
</div>
<p>检索<code translate="no">description</code> 字段为空值的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>检索<code translate="no">description</code> 字段不是空值的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NOT NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>检索<code translate="no">description</code> 字段不是空值且<code translate="no">price</code> 字段大于 10 的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NOT NULL AND price &gt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="JSON-Fields-with-Null-Values" class="common-anchor-header">具有空值的 JSON 字段</h3><p>Milvus 允许过滤包含空值的 JSON 字段。在以下情况下，JSON 字段会被视为空值：</p>
<ul>
<li>整个 JSON 对象被明确设置为 None（空），例如<code translate="no">{&quot;metadata&quot;: None}</code> 。</li>
<li>实体中完全没有 JSON 字段。</li>
</ul>
<div class="alert note">
<p>如果 JSON 对象中的某些元素（如单个键）为空，则字段仍被视为非空。例如，尽管<code translate="no">category</code> 关键字为空，但<code translate="no">{&quot;metadata&quot;: {&quot;category&quot;: None, &quot;price&quot;: 99.99}}</code> 不会被视为空字段。</p>
</div>
<p>为进一步说明 Milvus 如何处理带有空值的 JSON 字段，请考虑以下带有 JSON 字段<code translate="no">metadata</code> 的示例数据：</p>
<pre><code translate="no" class="language-python">data = [
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
  },
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-comment"># Entire JSON object is null</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>]
  },
  {  <span class="hljs-comment"># JSON field `metadata` is completely missing</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>]
  },
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>}, <span class="hljs-comment"># Individual key value is null</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">4</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.21</span>]
  }
]
<button class="copy-code-btn"></button></code></pre>
<p><strong>示例 1：检索<code translate="no">metadata</code> 为空的实体</strong></p>
<p>查找<code translate="no">metadata</code> 字段丢失或明确设置为 "无 "的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata IS NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: None, &#x27;pk&#x27;: 2}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: None, &#x27;pk&#x27;: 3}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>例 2：检索<code translate="no">metadata</code> 不为空的实体</strong></p>
<p>查找<code translate="no">metadata</code> 字段不是空值的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata IS NOT NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: None, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 4}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="ARRAY-Fields-with-Null-Values" class="common-anchor-header">具有空值的 ARRAY 字段</h3><p>Milvus 允许过滤包含空值的 ARRAY 字段。ARRAY 字段在以下情况下被视为空值：</p>
<ul>
<li>整个 ARRAY 字段明确设置为 None（空），例如<code translate="no">&quot;tags&quot;: None</code> 。</li>
<li>实体中完全没有 ARRAY 字段。</li>
</ul>
<div class="alert note">
<p>ARRAY 字段不能包含部分空值，因为 ARRAY 字段中的所有元素必须具有相同的数据类型。有关详细信息，请参阅<a href="/docs/zh/array_data_type.md">数组字段</a>。</p>
</div>
<p>为进一步说明 Milvus 如何处理带有空值的 ARRAY 字段，请考虑以下带有 ARRAY 字段<code translate="no">tags</code> 的示例数据：</p>
<pre><code translate="no" class="language-python">data = [
  {
      <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;pop&quot;</span>, <span class="hljs-string">&quot;rock&quot;</span>, <span class="hljs-string">&quot;classic&quot;</span>],
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
  },
  {
      <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-literal">None</span>,  <span class="hljs-comment"># Entire ARRAY is null</span>
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.78</span>, <span class="hljs-number">0.91</span>, <span class="hljs-number">0.23</span>]
  },
  {  <span class="hljs-comment"># The tags field is completely missing</span>
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">9</span>, <span class="hljs-number">5</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.18</span>, <span class="hljs-number">0.11</span>, <span class="hljs-number">0.23</span>]
  }
]
<button class="copy-code-btn"></button></code></pre>
<p><strong>示例 1：检索<code translate="no">tags</code> 为空的实体</strong></p>
<p>检索<code translate="no">tags</code> 字段丢失或明确设置为 "无 "的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags IS NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;tags&#x27;: None, &#x27;ratings&#x27;: [4, 5], &#x27;embedding&#x27;: [0.78, 0.91, 0.23], &#x27;pk&#x27;: 2}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;tags&#x27;: None, &#x27;ratings&#x27;: [9, 5], &#x27;embedding&#x27;: [0.18, 0.11, 0.23], &#x27;pk&#x27;: 3}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>例 2：检索<code translate="no">tags</code> 不为空的实体</strong></p>
<p>检索<code translate="no">tags</code> 字段不为空的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags IS NOT NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: None, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 4}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="common-anchor-header">在 JSON 和 ARRAY 字段中使用基本操作符的提示<button data-href="#Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>虽然 Milvus 的基本操作符用途广泛，可以应用于标量字段，但它们也可以有效地用于 JSON 和 ARRAY 字段中的键和索引。</p>
<p>例如，如果<code translate="no">product</code> 字段包含多个键，如<code translate="no">price</code> 、<code translate="no">model</code> 和<code translate="no">tags</code> ，则始终直接引用键。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>要查找记录温度的数组中第一个温度超过特定值的记录，请使用。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion​" class="common-anchor-header">结论<button data-href="#Conclusion​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 提供了一系列基本操作符，让您可以灵活地过滤和查询数据。通过结合比较、范围、算术和逻辑操作符，您可以创建功能强大的过滤表达式，从而缩小搜索结果的范围，并高效检索所需的数据。</p>
