---
id: basic-operators.md
title: 基本操作符
summary: >-
  Milvus
  提供了一套功能丰富的基础操作符，可帮助您高效地过滤和查询数据。借助这些操作符，您可以基于标量字段、数值计算、逻辑条件等来优化搜索条件。掌握这些操作符的使用方法，对于构建精准的查询并最大限度地提高搜索效率至关重要。
---
<h1 id="Basic-Operators" class="common-anchor-header">基本操作符<button data-href="#Basic-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 提供了一套丰富的基础操作符，可帮助您高效地过滤和查询数据。这些操作符允许您基于标量字段、数值计算、逻辑条件等来优化搜索条件。掌握这些操作符的使用方法，对于构建精确的查询并最大限度地提高搜索效率至关重要。</p>
<h2 id="Comparison-operators" class="common-anchor-header">比较操作符<button data-href="#Comparison-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>比较操作符用于根据相等、不等或大小对数据进行筛选。它们适用于数值字段和文本字段。</p>
<h3 id="Supported-comparison-operators" class="common-anchor-header">支持的比较操作符<button data-href="#Supported-comparison-operators" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><code translate="no">==</code> (等于)</p></li>
<li><p><code translate="no">!=</code> (不等于)</p></li>
<li><p><code translate="no">&gt;</code> (大于)</p></li>
<li><p><code translate="no">&lt;</code> (小于)</p></li>
<li><p><code translate="no">&gt;=</code> (大于或等于)</p></li>
<li><p><code translate="no">&lt;=</code> (小于或等于)</p></li>
</ul>
<h3 id="Example-1-Filtering-with-equal-to-" class="common-anchor-header">示例 1：使用“等于”进行筛选（<code translate="no">==</code> ）<button data-href="#Example-1-Filtering-with-equal-to-" class="anchor-icon" translate="no">
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
    </button></h3><p>假设您有一个名为<code translate="no">status</code> 的字段，并希望查找所有<code translate="no">status</code> 状态为“active”的实体。您可以使用等号操作符<code translate="no">==</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtering-with-not-equal-to-" class="common-anchor-header">示例 2：使用“不等于”进行筛选（<code translate="no">!=</code> ）<button data-href="#Example-2-Filtering-with-not-equal-to-" class="anchor-icon" translate="no">
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
    </button></h3><p>要查找<code translate="no">status</code> 值不为“inactive”的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status != &quot;inactive&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Filtering-with-greater-than-" class="common-anchor-header">示例 3：使用“大于”条件进行筛选（<code translate="no">&gt;</code> ）<button data-href="#Example-3-Filtering-with-greater-than-" class="anchor-icon" translate="no">
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
    </button></h3><p>若要查找所有<code translate="no">age</code> 值大于 30 的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;age &gt; 30&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Filtering-with-less-than" class="common-anchor-header">示例 4：使用“小于”进行筛选<button data-href="#Example-4-Filtering-with-less-than" class="anchor-icon" translate="no">
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
    </button></h3><p>要查找<code translate="no">price</code> 小于 100 的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &lt; 100&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Filtering-with-greater-than-or-equal-to-" class="common-anchor-header">示例 5：使用“大于等于”（<code translate="no">&gt;=</code> ）进行筛选<button data-href="#Example-5-Filtering-with-greater-than-or-equal-to-" class="anchor-icon" translate="no">
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
    </button></h3><p>若要查找所有<code translate="no">rating</code> 大于或等于4的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Filtering-with-less-than-or-equal-to" class="common-anchor-header">示例 6：使用“小于或等于”进行筛选<button data-href="#Example-6-Filtering-with-less-than-or-equal-to" class="anchor-icon" translate="no">
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
    </button></h3><p>要查找<code translate="no">discount</code> 小于或等于 10% 的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Range-operators" class="common-anchor-header">范围操作符<button data-href="#Range-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>范围运算符可帮助根据特定值集过滤数据。Milvus 支持使用<code translate="no">IN</code> 进行集合成员资格检查。</p>
<p>若要查找所有<code translate="no">color</code> 为“red”、“green”或“blue”的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>当需要检查实体是否属于一组特定值时，此功能非常有用。</p>
<h2 id="Pattern-matching-operators" class="common-anchor-header">模式匹配操作符<button data-href="#Pattern-matching-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>模式匹配操作符可帮助根据通配符模式或正则表达式过滤字符串值。</p>
<ul>
<li><p><code translate="no">LIKE</code>: 用于根据字符串值匹配简单的通配符模式。例如，<code translate="no">name LIKE &quot;Prod%&quot;</code> 可匹配以<code translate="no">Prod</code> 开头的值。</p></li>
<li><p><code translate="no">=~</code>: 用于使用 RE2 正则表达式匹配字符串值。例如，<code translate="no">code =~ &quot;E[0-9]{4}&quot;</code> 会匹配包含错误代码的值，如<code translate="no">E1001</code> 。</p></li>
<li><p><code translate="no">!~</code>: 用于排除匹配 RE2 正则表达式的字符串值。这等同于<code translate="no">NOT (field =~ &quot;pattern&quot;)</code> 。</p></li>
</ul>
<p>要查找 `<code translate="no">name</code> ` 以 `<code translate="no">Prod</code>` 开头的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>要查找其<code translate="no">code</code> 中包含<code translate="no">E1001</code> 等错误代码的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>要排除<code translate="no">message</code> 以<code translate="no">DEBUG</code> 开头的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>有关在<code translate="no">LIKE</code> 和正则表达式之间进行选择、支持的字段类型、正则表达式语法、转义规则以及性能的更多详细信息，请参阅《<a href="/docs/zh/pattern-matching.md">模式匹配》</a>。Milvus还允许您在<code translate="no">VARCHAR</code> 字段或JSON字符串路径上构建<code translate="no">NGRAM</code> 索引，以加速符合条件的模式匹配过滤器。有关详细信息，请参阅<a href="/docs/zh/ngram.md">《NGRAM》</a>。</p>
<h2 id="Arithmetic-operators" class="common-anchor-header">算术操作符<button data-href="#Arithmetic-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>算术操作符允许您基于涉及数值字段的计算来创建条件。</p>
<h3 id="Supported-arithmetic-operators" class="common-anchor-header">支持的算术操作符<button data-href="#Supported-arithmetic-operators" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><code translate="no">+</code> (加法)</p></li>
<li><p><code translate="no">-</code> (减法)</p></li>
<li><p><code translate="no">*</code> (乘法)</p></li>
<li><p><code translate="no">/</code> (除法)</p></li>
<li><p><code translate="no">%</code> (取模)</p></li>
<li><p><code translate="no">**</code> (幂运算)</p></li>
</ul>
<h3 id="Example-1-Using-modulus-" class="common-anchor-header">例 1：使用取模运算（<code translate="no">%</code> ）<button data-href="#Example-1-Using-modulus-" class="anchor-icon" translate="no">
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
    </button></h3><p>求满足<code translate="no">id</code> 为偶数（即能被2整除）的元素：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-exponentiation-" class="common-anchor-header">示例 2：使用幂运算（<code translate="no">**</code> ）<button data-href="#Example-2-Using-exponentiation-" class="anchor-icon" translate="no">
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
    </button></h3><p>查找满足<code translate="no">price</code> 的2次幂大于1000的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price ** 2 &gt; 1000&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Bitwise-operators--Milvus-300+" class="common-anchor-header">位操作符<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#Bitwise-operators--Milvus-300+" class="anchor-icon" translate="no">
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
    </button></h2><p>当整数字段编码了多个标志（例如权限、功能标志或状态位）时，位操作符非常有用。您可以在筛选表达式中使用这些操作符来检查、组合或比较整数值中的单个位。</p>
<p>对于标量字段，位操作符适用于整数字段类型，例如<code translate="no">INT8</code> 、<code translate="no">INT16</code> 、<code translate="no">INT32</code> 和<code translate="no">INT64</code> 。</p>
<h3 id="Supported-bitwise-operators" class="common-anchor-header">支持的位操作符<button data-href="#Supported-bitwise-operators" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>操作符</th><th>名称</th><th>典型用法</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">&amp;</code></td><td>位与</td><td>检查特定位是否被置位。</td></tr>
<tr><td><code translate="no">|</code></td><td>位或</td><td>在比较前对位进行组合。</td></tr>
<tr><td><code translate="no">^</code></td><td>位异或</td><td>比较两个值之间的位差异。</td></tr>
</tbody>
</table>
<h3 id="Example-Filtering-by-permission-bits" class="common-anchor-header">示例：按权限位进行过滤<button data-href="#Example-Filtering-by-permission-bits" class="anchor-icon" translate="no">
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
    </button></h3><p>假设有一个名为<code translate="no">permissions</code> 的整数字段，该整数的每个位代表一个权限标志：</p>
<table>
<thead>
<tr><th>权限标志</th><th>位值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">READ</code></td><td><code translate="no">1</code></td></tr>
<tr><td><code translate="no">WRITE</code></td><td><code translate="no">2</code></td></tr>
<tr><td><code translate="no">SHARE</code></td><td><code translate="no">4</code></td></tr>
<tr><td><code translate="no">ADMIN</code></td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
<p>例如，<code translate="no">permissions = 5</code> 表示<code translate="no">READ</code> 和<code translate="no">SHARE</code> 位被设置，因为<code translate="no">5 = 1 + 4</code> 。</p>
<p>要查找<code translate="no">SHARE</code> 位被设置的实体，请使用位与运算 (<code translate="no">&amp;</code>)：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;(permissions &amp; 4) == 4&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">|</code>要查找设置<code translate="no">WRITE</code> 位后会生成<code translate="no">READ + WRITE + SHARE</code> 权限集的实体，请使用位运算“与”（ ）：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;(permissions | 2) == 7&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>要查找其权限位与 `<code translate="no">READ + WRITE + SHARE</code> ` 仅在 `<code translate="no">WRITE</code> ` 位上不同的实体，请使用位异或 (<code translate="no">^</code>)：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;(permissions ^ 7) == 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>在比较结果之前，请务必将位运算用圆括号括起来，例如<code translate="no">(permissions &amp; 4) == 4</code> 。Milvus 3.0.0 在过滤表达式中支持<code translate="no">&amp;</code> 、<code translate="no">|</code> 和<code translate="no">^</code> 。不支持位非运算（<code translate="no">~</code> ）和移位运算符（<code translate="no">&lt;&lt;</code> 和<code translate="no">&gt;&gt;</code> ）。</p>
</div>
<h2 id="Logical-operators" class="common-anchor-header">逻辑运算符<button data-href="#Logical-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>逻辑操作符用于将多个条件组合成更复杂的筛选表达式。这些操作符包括<code translate="no">AND</code> 、<code translate="no">OR</code> 和<code translate="no">NOT</code> 。</p>
<h3 id="Supported-logical-operators" class="common-anchor-header">支持的逻辑操作符<button data-href="#Supported-logical-operators" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><code translate="no">AND</code>：将多个条件组合在一起，这些条件必须全部为真。</p></li>
<li><p><code translate="no">OR</code>: 将多个条件组合，其中至少有一个必须为真。</p></li>
<li><p><code translate="no">NOT</code>: 对条件进行取反。</p></li>
</ul>
<h3 id="Example-1-Using-AND-to-combine-conditions" class="common-anchor-header">示例 1：使用<code translate="no">AND</code> 组合条件<button data-href="#Example-1-Using-AND-to-combine-conditions" class="anchor-icon" translate="no">
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
    </button></h3><p>要查找所有“<code translate="no">price</code> ”大于 100 且“<code translate="no">stock</code> ”大于 50 的产品：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-OR-to-combine-conditions" class="common-anchor-header">示例 2：使用“<code translate="no">OR</code> ”组合条件<button data-href="#Example-2-Using-OR-to-combine-conditions" class="anchor-icon" translate="no">
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
    </button></h3><p>要查找所有<code translate="no">color</code> 为“red”或“blue”的商品：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-NOT-to-exclude-a-condition" class="common-anchor-header">示例 3：使用<code translate="no">NOT</code> 排除条件<button data-href="#Example-3-Using-NOT-to-exclude-a-condition" class="anchor-icon" translate="no">
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
    </button></h3><p>查找所有<code translate="no">color</code> 不是“green”的产品：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="IS-NULL-and-IS-NOT-NULL-operators" class="common-anchor-header">IS NULL 和 IS NOT NULL 操作符<button data-href="#IS-NULL-and-IS-NOT-NULL-operators" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">IS NULL</code> 和<code translate="no">IS NOT NULL</code> 操作符用于根据字段是否包含空值（无数据）来筛选字段。</p>
<ul>
<li><p><code translate="no">IS NULL</code>: 识别特定字段包含空值的实体，即该字段无值或未定义。</p></li>
<li><p><code translate="no">IS NOT NULL</code>: 识别特定字段包含 null 以外其他值的实体，即该字段具有有效且已定义的值。</p></li>
</ul>
<div class="alert note">
<p>这些操作符不区分大小写，因此您可以使用<code translate="no">IS NULL</code> 或<code translate="no">is null</code> ，以及<code translate="no">IS NOT NULL</code> 或<code translate="no">is not null</code> 。</p>
</div>
<h3 id="Regular-scalar-fields-with-null-values" class="common-anchor-header">包含 null 值的常规标量字段<button data-href="#Regular-scalar-fields-with-null-values" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 允许对包含 null 值的常规标量字段（如字符串或数字）进行过滤。</p>
<div class="alert note">
<p>对于<code translate="no">VARCHAR</code> 字段，空字符串<code translate="no">&quot;&quot;</code> 不会被视为空值。</p>
</div>
<p>要检索<code translate="no">description</code> 字段为空的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>要检索<code translate="no">description</code> 字段不为空的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NOT NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>要检索<code translate="no">description</code> 字段不为空且<code translate="no">price</code> 字段值大于10的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NOT NULL AND price &gt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="JSON-fields-with-null-values" class="common-anchor-header">包含空值的 JSON 字段<button data-href="#JSON-fields-with-null-values" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 允许对包含 null 值的 JSON 字段进行过滤。JSON 字段在以下情况下被视为 null：</p>
<ul>
<li><p>整个 JSON 对象被显式设置为 None（空），例如<code translate="no">{&quot;metadata&quot;: None}</code> 。</p></li>
<li><p>该 JSON 字段在实体中完全缺失。</p></li>
</ul>
<div class="alert note">
<p>如果 JSON 对象中的某些元素为 null（例如单个键），则该字段仍被视为非 null。例如，<code translate="no">\{&quot;metadata&quot;: \{&quot;category&quot;: None, &quot;price&quot;: 99.99}}</code> 不会被视为 null，即使<code translate="no">category</code> 键为 null。</p>
</div>
<p>为进一步说明 Milvus 如何处理具有 null 值的 JSON 字段，请参考以下包含 JSON 字段<code translate="no">metadata</code> 的示例数据：</p>
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
<p><strong>示例 1：检索元数据为 null 的实体</strong></p>
<p>要查找<code translate="no">metadata</code> 字段缺失或被显式设置为 None 的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata IS NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: None, &#x27;pk&#x27;: 2}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: None, &#x27;pk&#x27;: 3}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>示例 2：检索元数据不为 null 的实体</strong></p>
<p>要查找 `<code translate="no">metadata</code> ` 字段不为 `null` 的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata IS NOT NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: None, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 4}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="ARRAY-fields-with-null-values" class="common-anchor-header">包含 null 值的 ARRAY 字段<button data-href="#ARRAY-fields-with-null-values" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 允许对包含空值的 ARRAY 字段进行过滤。ARRAY 字段在以下情况下会被视为空值：</p>
<ul>
<li><p>整个 ARRAY 字段被显式设置为 None（空），例如<code translate="no">&quot;tags&quot;: None</code> 。</p></li>
<li><p>实体中完全缺少该 ARRAY 字段。</p></li>
</ul>
<div class="alert note">
<p>数组字段不能包含部分空值，因为数组字段中的所有元素必须具有相同的数据类型。有关详细信息，请参阅<a href="/docs/zh/array_data_type.md">“数组字段”</a>。</p>
</div>
<p>为进一步说明 Milvus 如何处理包含空值的 ARRAY 字段，请考虑以下包含 ARRAY 字段<code translate="no">tags</code> 的示例数据：</p>
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
<p><strong>示例 1：检索 `tags` 为空的实体</strong></p>
<p>要检索<code translate="no">tags</code> 字段缺失或显式设置为<code translate="no">None</code> 的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags IS NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;tags&#x27;: None, &#x27;ratings&#x27;: [4, 5], &#x27;embedding&#x27;: [0.78, 0.91, 0.23], &#x27;pk&#x27;: 2}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;tags&#x27;: None, &#x27;ratings&#x27;: [9, 5], &#x27;embedding&#x27;: [0.18, 0.11, 0.23], &#x27;pk&#x27;: 3}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>示例 2：检索 `tags` 字段不为空的实体</strong></p>
<p>要检索 `<code translate="no">tags</code> ` 字段不为空的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags IS NOT NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: None, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 4}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tips-on-using-basic-operators-with-JSON-and-ARRAY-fields" class="common-anchor-header">关于在 JSON 和 ARRAY 字段中使用基本操作符的提示<button data-href="#Tips-on-using-basic-operators-with-JSON-and-ARRAY-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>虽然 Milvus 中的基本操作符用途广泛且可应用于标量字段，但它们也可与 JSON 和 ARRAY 字段中的键和索引有效配合使用。</p>
<p>例如，如果有一个<code translate="no">product</code> 字段包含多个键，如<code translate="no">price</code> 、<code translate="no">model</code> 和<code translate="no">tags</code> ，请始终直接引用该键：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>若要查找记录中温度数组的首个温度值超过特定阈值的记录，请使用：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion" class="common-anchor-header">结论<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 提供了一系列基本操作符，让您能够灵活地对数据进行筛选和查询。通过组合比较操作符、范围操作符、算术操作符和逻辑操作符，您可以创建强大的筛选表达式，从而缩小搜索范围并高效地检索所需数据。</p>
<h2 id="FAQ" class="common-anchor-header">常见问题<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>过滤条件中的匹配值列表长度是否有上限（例如：filter=’color in ["red", "green", “blue”]’）？如果列表过长该怎么办？</strong></p>
<p>Zilliz Cloud 并未对筛选条件中的匹配值列表长度设置限制。但是，过长的列表会显著影响查询性能。
如果您的筛选条件包含冗长的匹配值列表或包含多个元素的复杂表达式，建议使用<a href="/docs/zh/filtering-templating.md">“筛选模板”功能</a>来提升查询性能。</p>
