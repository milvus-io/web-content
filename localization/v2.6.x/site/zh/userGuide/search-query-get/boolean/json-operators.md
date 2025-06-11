---
id: json-operators.md
title: JSON 操作符
summary: >-
  Milvus 支持用于查询和过滤 JSON 字段的高级操作符，使其成为管理复杂结构化数据的完美工具。这些操作符可实现对 JSON 文档的高效查询，允许您根据
  JSON 字段中的特定元素、值或条件检索实体。本节将指导您在 Milvus 中使用特定于 JSON 的操作符，并提供实际示例来说明其功能。
---
<h1 id="JSON-Operators" class="common-anchor-header">JSON 操作符<button data-href="#JSON-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 支持用于查询和过滤 JSON 字段的高级操作符，使其成为管理复杂结构化数据的完美工具。这些操作符可实现对 JSON 文档的高效查询，允许您根据 JSON 字段中的特定元素、值或条件检索实体。本节将指导你在 Milvus 中使用特定于 JSON 的操作符，并提供实际示例来说明它们的功能。</p>
<div class="alert note">
<p>JSON 字段无法处理复杂的嵌套结构，而是将所有嵌套结构视为纯字符串。因此，在使用 JSON 字段时，建议避免过深的嵌套，并确保数据结构尽可能扁平，以获得最佳性能。</p>
</div>
<h2 id="Available-JSON-Operators" class="common-anchor-header">可用的 JSON 操作符<button data-href="#Available-JSON-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 提供了几个强大的 JSON 操作符，帮助过滤和查询 JSON 数据，这些操作符是</p>
<ul>
<li><p><code translate="no">JSON_CONTAINS(identifier, expr)</code>:过滤在字段中找到指定 JSON 表达式的实体。</p></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, expr)</code>:确保字段中包含指定 JSON 表达式的所有元素。</p></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, expr)</code>:筛选字段中至少存在一个 JSON 表达式成员的实体。</p></li>
</ul>
<p>让我们通过示例来了解这些操作符在实际场景中的应用。</p>
<h2 id="JSONCONTAINS" class="common-anchor-header">JSON_CONTAINS<button data-href="#JSONCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">json_contains</code> 操作符检查 JSON 字段中是否存在特定元素或子阵。当你想确保一个 JSON 数组或对象包含一个特定值时，它就非常有用了。</p>
<p><strong>示例</strong></p>
<p>假设您有一个产品 Collections，每个 Collections 都有一个<code translate="no">tags</code> 字段，其中包含一个由字符串组成的 JSON 数组，如<code translate="no">[&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]</code> 。您想过滤带有<code translate="no">&quot;sale&quot;</code> 标记的产品。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在此示例中，Milvus 将返回<code translate="no">tags</code> 字段包含<code translate="no">&quot;sale&quot;</code> 元素的所有产品。</p>
<h2 id="JSONCONTAINSALL" class="common-anchor-header">json_contains_all<button data-href="#JSONCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">json_contains_all</code> 操作符可确保目标字段中包含指定 JSON 表达式的所有元素。当需要匹配 JSON 数组中的多个值时，该操作符尤其有用。</p>
<p><strong>示例</strong></p>
<p>继续使用产品标记方案，如果要查找具有<code translate="no">&quot;electronics&quot;</code> 、<code translate="no">&quot;sale&quot;</code> 和<code translate="no">&quot;new&quot;</code> 标记的所有产品，可以使用<code translate="no">json_contains_all</code> 操作符。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>此查询将返回<code translate="no">tags</code> 数组包含所有三个指定元素的所有产品：<code translate="no">&quot;electronics&quot;</code>,<code translate="no">&quot;sale&quot;</code>, 和<code translate="no">&quot;new&quot;</code> 。</p>
<h2 id="JSONCONTAINSANY" class="common-anchor-header">json_contains_any<button data-href="#JSONCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">json_contains_any</code> 操作符可过滤字段中至少存在一个 JSON 表达式成员的实体。当您想根据多个可能值中的任意一个值来匹配实体时，该操作符非常有用。</p>
<p><strong>示例</strong></p>
<p>假设您想过滤至少有一个标签<code translate="no">&quot;electronics&quot;</code>,<code translate="no">&quot;sale&quot;</code>, 或<code translate="no">&quot;new&quot;</code> 的产品。您可以使用<code translate="no">json_contains_any</code> 操作符来实现这一目的。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在这种情况下，Milvus 将返回列表<code translate="no">[&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;]</code> 中至少有一个标签的所有产品。即使产品只有其中一个标签，也会包含在结果中。</p>
