---
id: json-operators.md
title: JSON 操作符
summary: >-
  Milvus 支持用于查询和过滤 JSON 字段的高级操作符，非常适合管理复杂的结构化数据。这些操作符能够对 JSON 文档进行高效查询，使您能够根据
  JSON 字段中的特定元素、值或条件检索实体。 本节将指导您如何在 Milvus 中使用针对 JSON 的专用操作符，并通过实际示例说明其功能。
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
    </button></h1><p>Milvus 支持用于查询和过滤 JSON 字段的高级操作符，非常适合管理复杂的结构化数据。这些操作符能够高效地查询 JSON 文档，允许您根据 JSON 字段中的特定元素、值或条件检索实体。 本节将指导您如何在 Milvus 中使用 JSON 专用操作符，并通过实际示例说明其功能。</p>
<div class="alert note">
<p>JSON 字段无法处理复杂的嵌套结构，会将所有嵌套结构视为普通字符串。因此，在处理 JSON 字段时，建议避免过深的嵌套，并确保数据结构尽可能扁平，以获得最佳性能。</p>
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
    </button></h2><p>Milvus 提供了多种强大的 JSON 操作符，有助于过滤和查询 JSON 数据，这些操作符包括：</p>
<ul>
<li><p><a href="#JSONCONTAINS"><code translate="no">JSON_CONTAINS(identifier, expr)</code></a>: 筛选在字段中包含指定 JSON 表达式的实体。</p></li>
<li><p><a href="#JSONCONTAINSALL"><code translate="no">JSON_CONTAINS_ALL(identifier, expr)</code></a>: 确保指定 JSON 表达式中的所有元素均存在于该字段中。</p></li>
<li><p><a href="#JSONCONTAINSANY"><code translate="no">JSON_CONTAINS_ANY(identifier, expr)</code></a>: 筛选该字段中至少包含 JSON 表达式中一个成员的实体。</p></li>
</ul>
<p>让我们通过示例来探索这些操作符，了解它们在实际场景中的应用。</p>
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
    </button></h2><p><code translate="no">json_contains</code> 操作符用于检查JSON字段中是否存在特定的元素或子数组。当您需要确保JSON数组或对象包含特定值时，该操作符非常有用。</p>
<p><strong>示例</strong></p>
<p>假设您有一组产品，每件产品都有一个<code translate="no">tags</code> 字段，其中包含一个字符串的JSON数组，例如<code translate="no">[&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]</code> 。您希望筛选出带有标签<code translate="no">&quot;sale&quot;</code> 的产品。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter := <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
std::string filter = <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter=<span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在此示例中，Milvus 将返回所有<code translate="no">tags</code> 字段中包含元素<code translate="no">&quot;sale&quot;</code> 的产品。</p>
<h2 id="JSONCONTAINSALL" class="common-anchor-header">JSON_CONTAINS_ALL<button data-href="#JSONCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">json_contains_all</code> 操作符可确保目标字段中包含指定 JSON 表达式中的所有元素。当需要匹配 JSON 数组中的多个值时，该操作符尤为有用。</p>
<p><strong>示例</strong></p>
<p>继续以产品标签为例，若要查找同时包含标签<code translate="no">&quot;electronics&quot;</code> 、<code translate="no">&quot;sale&quot;</code> 和<code translate="no">&quot;new&quot;</code> 的所有产品，可以使用<code translate="no">json_contains_all</code> 操作符。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
filter := <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
std::string filter = <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
filter=<span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>此查询将返回<code translate="no">tags</code> 数组中同时包含所有三个指定元素（<code translate="no">&quot;electronics&quot;</code> 、<code translate="no">&quot;sale&quot;</code> 和<code translate="no">&quot;new&quot;</code> ）的所有产品。</p>
<h2 id="JSONCONTAINSANY" class="common-anchor-header">JSON_CONTAINS_ANY<button data-href="#JSONCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">json_contains_any</code> 操作符用于筛选字段中包含 JSON 表达式中至少一个成员的实体。当您希望根据多个可能值中的任意一个来匹配实体时，此功能非常有用。</p>
<p><strong>示例</strong></p>
<p>假设您希望筛选出至少包含<code translate="no">&quot;electronics&quot;</code> 、<code translate="no">&quot;sale&quot;</code> 或<code translate="no">&quot;new&quot;</code> 其中一个标签的产品。您可以使用<code translate="no">json_contains_any</code> 操作符来实现这一目标。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_any(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter := <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
std::string filter = <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_contains_any(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter=<span class="hljs-string">&#x27;json_contains_any(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在此情况下，Milvus 将返回所有至少包含列表<code translate="no">[&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;]</code> 中任意一个标签的产品。即使某产品仅包含其中一个标签，也会被纳入结果中。</p>
