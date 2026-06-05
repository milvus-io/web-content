---
id: pattern-matching.md
title: 模式匹配
summary: >-
  Milvus 支持使用 LIKE 通配符模式和 RE2 正则表达式进行字符串模式匹配。使用模式过滤器可匹配 VARCHAR 字段、JSON 字符串路径或
  ARRAY 元素中的前缀、后缀、子串、结构化代码、电子邮件域、URL 路径和其他字符串模式。
---
<h1 id="Pattern-Matching" class="common-anchor-header">模式匹配<button data-href="#Pattern-Matching" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Agents 搜索应用中，向量搜索和 grep 样式的模式匹配通常是相辅相成的。向量搜索检索语义相关的实体，而模式匹配则通过精确的字符串结构（如错误代码、日志前缀、电子邮件域、URL 路径或标识符）来缩小搜索结果的范围。</p>
<p>在 Milvus 中，你可以在标量过滤器中表达这些模式约束，<code translate="no">LIKE</code> 用于简单的通配符匹配，<code translate="no">=~</code> 或<code translate="no">!~</code> 用于<a href="https://github.com/google/re2/wiki/syntax">RE2</a>正则表达式。您可以将这些过滤器与<code translate="no">query</code> 、<code translate="no">search</code> 或混合搜索结合起来。</p>
<p>模式匹配表达式写在<code translate="no">filter</code> 参数中。例如，以下查询可匹配包含错误代码（如<code translate="no">E1001</code> ）的日志信息：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>本页的示例侧重于分配给<code translate="no">filter</code> 的表达式。您可以在接受标量过滤器的 Milvus 操作符中使用相同的过滤器表达式语法，如<code translate="no">query</code>,<code translate="no">search</code>, 和混合搜索。</p>
<h2 id="Supported-field-types" class="common-anchor-header">支持的字段类型<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p>模式匹配适用于字符串值。</p>
<table>
<thead>
<tr><th>目标</th><th><code translate="no">LIKE</code></th><th>Regex<code translate="no">=~</code> /<code translate="no">!~</code></th><th>注释</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> 字段</td><td>是</td><td>是</td><td>对字符串字段进行模式匹配的典型目标。</td></tr>
<tr><td><code translate="no">JSON</code> 路径，带<code translate="no">VARCHAR</code> 类型</td><td>是</td><td>是</td><td>对于正向匹配，JSON 路径值必须是字符串。如果在 JSON 路径上创建加速索引，请设置<code translate="no">json_cast_type=&quot;varchar&quot;</code> 。</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> 元素</td><td>元素</td><td>元素</td><td>通过索引匹配特定元素，如<code translate="no">tags[0]</code> 。模式匹配<strong>不会</strong>扫描所有元素；它只适用于指定索引处的元素。</td></tr>
<tr><td>数字、布尔、向量、<code translate="no">TEXT</code> 或其他非<code translate="no">VARCHAR</code> 目标</td><td>无</td><td>无</td><td>模式匹配仅适用于<code translate="no">VARCHAR</code> 值、解析为字符串的 JSON 路径或索引<code translate="no">ARRAY&lt;VARCHAR&gt;</code> 元素。</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">选择 LIKE 或 regex<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>选择能表达所需模式的最简单操作符。</p>
<p>如果需要精确的字符串匹配，建议使用<code translate="no">==</code> 而不是模式匹配。只有当过滤器需要匹配模式时，才使用<code translate="no">LIKE</code> 或 regex。</p>
<table>
<thead>
<tr><th>要求</th><th>推荐操作符</th><th>示例</th><th>说明</th></tr>
</thead>
<tbody>
<tr><td>字符串完全匹配</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>字符串<code translate="no">active</code> 的精确匹配。</td></tr>
<tr><td>简单前缀匹配</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>匹配以<code translate="no">Prod</code> 开头的字符串。</td></tr>
<tr><td>简单后缀匹配</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>匹配以<code translate="no">.json</code> 结尾的字符串。</td></tr>
<tr><td>简单包含匹配</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>匹配字符串中包含<code translate="no">vector database</code> 的值。</td></tr>
<tr><td>匹配结构化代码或固定长度模式</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>匹配大小写敏感的包含<code translate="no">E</code> 后跟四位数字的字符串，如<code translate="no">E1001</code> 。</td></tr>
<tr><td>不区分大小写的模式匹配</td><td><code translate="no">=~</code> 与<code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>匹配<code translate="no">error</code> 、<code translate="no">ERROR</code> 或其他大小写变体。</td></tr>
<tr><td>排除与 regex 模式匹配的值</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>排除以<code translate="no">DEBUG</code> 开头的字符串。</td></tr>
</tbody>
</table>
<p>使用<code translate="no">LIKE</code> 进行简单的通配符匹配。当模式需要字符类、重复、交替（如<code translate="no">error|failed</code> ）、锚点或大小写不敏感匹配时，使用 regex。</p>
<h2 id="Use-LIKE" class="common-anchor-header">使用 LIKE<button data-href="#Use-LIKE" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">LIKE</code> 操作符用于对字符串值进行简单的通配符匹配。它只支持以下通配符：</p>
<table>
<thead>
<tr><th>通配符</th><th>说明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>匹配 0 个或多个字符。</td></tr>
<tr><td><code translate="no">_</code></td><td>完全匹配一个字符。</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">常见 LIKE 模式<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>使用<code translate="no">%</code> 和<code translate="no">_</code> 的位置来控制固定文本在匹配字符串中出现的位置。</p>
<table>
<thead>
<tr><th>要求</th><th>模式</th><th>过滤示例</th></tr>
</thead>
<tbody>
<tr><td>以前缀开始</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>以后缀结束</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>包含子串</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>匹配固定位置上的一个字符</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">LIKE 匹配行为<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>对于前缀、后缀、包含和固定位置的单字符匹配，请使用<code translate="no">LIKE</code> 。<code translate="no">LIKE</code> 不支持字符类（如<code translate="no">[0-9]</code> ）、交替（如<code translate="no">error|failed</code> ）、重复次数（如<code translate="no">{4}</code> ）、锚（如<code translate="no">^</code> 或<code translate="no">$</code> ）或不区分大小写标志（如<code translate="no">(?i)</code> ）。对这些模式使用 regex。</p>
<p>在全字符串完全相等的情况下使用<code translate="no">==</code> 。只有当过滤器需要通配符匹配时，才使用<code translate="no">LIKE</code> 。</p>
<h2 id="Use-regex" class="common-anchor-header">使用 regex<button data-href="#Use-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>当模式需要正则表达式特征（如字符类、重复、交替、锚或大小写不敏感匹配）时，使用 regex 过滤器。Milvus 对字符串值应用<a href="https://github.com/google/re2/wiki/syntax">RE2</a>正则表达式。</p>
<p><code translate="no">=~</code> 或<code translate="no">!~</code> 的右侧必须是字符串文字。</p>
<table>
<thead>
<tr><th>操作符</th><th>意义</th><th>示例</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>匹配符合正则表达式的值。</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>排除满足 regex 模式的值。</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Common-regex-patterns" class="common-anchor-header">常见的 regex 模式<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>以下示例在 Milvus 过滤表达式中使用了常见的 RE2 语法。有关完整的 regex 语法，请参阅<a href="https://github.com/google/re2/wiki/syntax">RE2 语法</a>参考。</p>
<table>
<thead>
<tr><th>要求</th><th>模式</th><th>过滤器示例</th></tr>
</thead>
<tbody>
<tr><td>包含字面文本</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>以前缀开始</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>以后缀结束</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>匹配数字序列</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>匹配固定位数</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>匹配电子邮件域名</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>不区分大小写匹配</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>匹配整个字符串</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>要匹配多个单词中的一个，请使用<code translate="no">|</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>当按字面意思匹配 regex 元关键字时，请在 regex 模式中将其转义。例如，要匹配字面点 (<code translate="no">\.</code> 在 regex 中)，请在 Python 过滤字符串中写入<code translate="no">\\.</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>注意：Milvus regex 过滤器遵循 RE2 语法。如果 regex 模式使用了 RE2 不支持的语法或其他无效语法，Milvus 将拒绝该过滤表达式。有关 regex 元字符、标志和匹配行为的详细信息，请参阅<a href="https://github.com/google/re2/wiki/syntax">RE2 语法</a>参考。</p>
<h3 id="Matching-behavior" class="common-anchor-header">匹配行为<button data-href="#Matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>子串匹配</strong></p>
<p>Milvus regex 匹配使用子串语义。模式无需匹配整个字段值。例如，以下过滤器匹配<code translate="no">E1001</code> 和<code translate="no">failed with E1001 after retry</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>要匹配整个字段值，请使用<code translate="no">^</code> 和<code translate="no">$</code> 锚点：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>可归零的 VARCHAR 字段</strong></p>
<p>Regex 过滤器不匹配空值。这适用于<code translate="no">=~</code> 和<code translate="no">!~</code> 。如果要排除 regex 模式但保留空值，请明确添加<code translate="no">OR field IS NULL</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>JSON 路径</strong></p>
<p>对于 JSON 路径，当路径丢失、为空或解析为非字符串值时，regex 过滤器的行为会有所不同：</p>
<table>
<thead>
<tr><th>过滤器</th><th>是否包含缺失值/空值/非字符串值？</th><th>注释</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>不包括</td><td>只匹配满足 regex 模式的字符串值。</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>是</td><td>返回路径缺失、空、非字符串或与 regex 模式不匹配的字符串的实体。</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">使用索引加速模式匹配<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支持字符串字段上的多种索引类型，可与<code translate="no">LIKE</code> 和<code translate="no">VARCHAR</code> 字段或 JSON 字符串路径上的 regex 过滤器一起使用，如<code translate="no">NGRAM</code>,<code translate="no">STL_SORT</code>,<code translate="no">INVERTED</code> 和<code translate="no">BITMAP</code> 。模式匹配可以在没有索引的情况下工作，但索引可以提高大型数据集的性能。</p>
<p>索引的有效性取决于模式表达式、Milvus 是否能提取固定的字面子串以及目标字段的 Cardinal 和分布情况。前缀式模式（如<code translate="no">name LIKE &quot;Prod%&quot;</code> ）与后缀式模式（如<code translate="no">description LIKE &quot;%vector%&quot;</code> 或<code translate="no">filename LIKE &quot;%.json&quot;</code> ）可能会从不同的索引策略中受益。</p>
<p>请将下表作为起点，然后以自己的工作负载为基准：</p>
<table>
<thead>
<tr><th>模式或数据特征</th><th>需要考虑的索引</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td>包含固定字面子串，如<code translate="no">message =~ &quot;error.*timeout&quot;</code> 或<code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>有助于 Milvus 从模式中提取有意义的字面子串。有关详细信息，请参阅<a href="/docs/zh/ngram.md">NGRAM</a>。</td></tr>
<tr><td>前缀、精确或类似相等的字符串过滤器，特别是在具有中低等 Cardinal 的字段上</td><td><code translate="no">STL_SORT</code>,<code translate="no">INVERTED</code>, 或<code translate="no">BITMAP</code></td><td>在字段有重复值或过滤器接近精确匹配时可能更有效。详情请参阅<a href="/docs/zh/stl-sort.md">STL_SORT</a>、<a href="/docs/zh/inverted.md">INVERTED</a> 和<a href="/docs/zh/bitmap.md">BITMAP</a>。</td></tr>
<tr><td>无固定字面的 Regex 模式，或以字符类、短标记或通配符为主的模式</td><td>在依赖索引加速之前进行基准测试</td><td>这些模式可提供有限的索引选择性，并可退回到更广泛的扫描。</td></tr>
</tbody>
</table>
