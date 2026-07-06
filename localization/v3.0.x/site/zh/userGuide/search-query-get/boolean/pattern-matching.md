---
id: pattern-matching.md
title: 模式匹配
summary: >-
  Milvus 支持使用 LIKE 通配符模式和 RE2 正则表达式进行字符串模式匹配。可使用模式过滤器，在 VARCHAR 字段、JSON 字符串路径或
  ARRAY 元素中匹配前缀、后缀、子字符串、结构化代码、电子邮件域名、URL 路径及其他字符串模式。
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
    </button></h1><p>在基于代理的搜索应用中，向量搜索和 grep 风格的模式匹配通常相辅相成。向量搜索可检索语义相关的实体，而模式匹配则通过精确的字符串结构（如错误代码、日志前缀、电子邮件域名、URL 路径或标识符）来缩小搜索结果范围。</p>
<p>在 Milvus 中，您可以在标量过滤器中使用 `<code translate="no">LIKE</code> ` 进行简单的通配符匹配，或使用 `<code translate="no">=~</code> ` 或 `<code translate="no">!~</code> ` 进行<a href="https://github.com/google/re2/wiki/syntax">RE2</a>正则表达式匹配，来表达这些模式约束。您可以将这些过滤器与 `<code translate="no">query</code>`、`<code translate="no">search</code>` 或混合搜索相结合。</p>
<p>模式匹配表达式写在<code translate="no">filter</code> 参数中。例如，以下查询可匹配包含<code translate="no">E1001</code> 等错误代码的日志消息：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>本页面的示例重点介绍分配给 `<code translate="no">filter</code>` 的表达式。在支持标量过滤器的 Milvus 操作中（例如 `<code translate="no">query</code>`、`<code translate="no">search</code>` 和混合搜索），您可以使用相同的过滤表达式语法。</p>
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
<tr><th>目标</th><th><code translate="no">LIKE</code></th><th>正则表达式<code translate="no">=~</code> /<code translate="no">!~</code></th><th>注</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> 字段</td><td>是</td><td>是</td><td>字符串字段上进行模式匹配的典型目标。</td></tr>
<tr><td><code translate="no">JSON</code> 路径，使用<code translate="no">VARCHAR</code> 类型转换</td><td>是</td><td>是</td><td>JSON 路径值必须为字符串才能进行正向匹配。若要在 JSON 路径上创建索引以提高性能，请设置 `<code translate="no">json_cast_type=&quot;varchar&quot;</code>`。</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> 元素</td><td>是</td><td>是</td><td>按索引匹配特定元素，例如<code translate="no">tags[0]</code> 。模式匹配<strong>不会</strong>扫描所有元素；它仅适用于指定索引处的元素。</td></tr>
<tr><td>数字、布尔值、向量、<code translate="no">TEXT</code> 或其他非<code translate="no">VARCHAR</code> 目标</td><td>否</td><td>否</td><td>模式匹配仅适用于<code translate="no">VARCHAR</code> 值、解析为字符串的JSON路径，或带索引的<code translate="no">ARRAY&lt;VARCHAR&gt;</code> 元素。</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">选择 LIKE 或正则表达式<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>请选择能表达所需模式的最简单操作符。</p>
<p>如果您需要精确的字符串匹配，建议使用<code translate="no">==</code> 而非模式匹配。仅当过滤器需要匹配特定模式时，才使用<code translate="no">LIKE</code> 或regex。</p>
<table>
<thead>
<tr><th>要求</th><th>推荐操作符</th><th>示例</th><th>说明</th></tr>
</thead>
<tbody>
<tr><td>字符串完全相等</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>与字符串<code translate="no">active</code> 完全匹配。</td></tr>
<tr><td>简单前缀匹配</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>匹配以<code translate="no">Prod</code> 开头的字符串。</td></tr>
<tr><td>简单后缀匹配</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>匹配以<code translate="no">.json</code> 结尾的字符串。</td></tr>
<tr><td>简单包含匹配</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>匹配字符串中任意位置包含<code translate="no">vector database</code> 的值。</td></tr>
<tr><td>匹配结构化代码或固定长度模式</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>匹配那些区分大小写且包含<code translate="no">E</code> 后面跟四个数字的字符串，例如<code translate="no">E1001</code> 。</td></tr>
<tr><td>不区分大小写的模式匹配</td><td><code translate="no">=~</code> 使用<code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>匹配<code translate="no">error</code> 、<code translate="no">ERROR</code> 或其他大小写变体。</td></tr>
<tr><td>排除匹配正则表达式模式的值</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>排除以<code translate="no">DEBUG</code> 开头的字符串。</td></tr>
</tbody>
</table>
<p>使用<code translate="no">LIKE</code> 进行简单的通配符匹配。当模式需要字符类、重复、选择（如<code translate="no">error|failed</code> ）、锚点或不区分大小写的匹配时，请使用正则表达式。</p>
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
    </button></h2><p><code translate="no">LIKE</code> 操作符用于对字符串值进行简单的通配符匹配。它仅支持以下通配符：</p>
<table>
<thead>
<tr><th>通配符</th><th>描述</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>匹配零个或多个字符。</td></tr>
<tr><td><code translate="no">_</code></td><td>匹配恰好一个字符。</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">常见的 LIKE 模式<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>使用<code translate="no">%</code> 和<code translate="no">_</code> 的位置来控制固定文本在匹配字符串中的出现位置。</p>
<table>
<thead>
<tr><th>要求</th><th>模式</th><th>过滤示例</th></tr>
</thead>
<tbody>
<tr><td>以前缀开头</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>以后缀结尾</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>包含子字符串</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
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
    </button></h3><p>使用<code translate="no">LIKE</code> 进行前缀、后缀、包含以及固定位置单字符匹配。<code translate="no">LIKE</code> 不支持字符类（如<code translate="no">[0-9]</code> ）、选择关系（如<code translate="no">error|failed</code> ）、重复计数（如<code translate="no">{4}</code> ）、锚点（如<code translate="no">^</code> 或<code translate="no">$</code> ）以及不区分大小写的标志（如<code translate="no">(?i)</code> ）。对于此类模式，请使用正则表达式。</p>
<p>使用<code translate="no">==</code> 进行精确的全字符串相等比较。仅当过滤器需要通配符匹配时，才使用<code translate="no">LIKE</code> 。</p>
<h3 id="Escaping-wildcards-in-a-LIKE-pattern" class="common-anchor-header">在 LIKE 模式中转义通配符<button data-href="#Escaping-wildcards-in-a-LIKE-pattern" class="anchor-icon" translate="no">
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
    </button></h3><p>在<code translate="no">LIKE</code> 模式中，<code translate="no">%</code> 匹配零个或多个字符，而<code translate="no">_</code> 匹配恰好一个字符。若要精确匹配<code translate="no">%</code> 、<code translate="no">_</code> 或<code translate="no">\</code> 这些字符串，请使用反斜杠 (<code translate="no">\</code>) 对字符进行转义：</p>
<ul>
<li><code translate="no">name LIKE r&quot;\%&quot;</code> 匹配字面值<code translate="no">%</code> 。</li>
<li><code translate="no">name LIKE r&quot;\_%&quot;</code> 匹配以字面量<code translate="no">_</code> 开头的值。</li>
<li><code translate="no">name LIKE r&quot;\\%&quot;</code> 匹配以字面量反斜杠开头的值。</li>
</ul>
<p>原始字符串字面量（写法为<code translate="no">r&quot;...&quot;</code> 或<code translate="no">r'...'</code> ）会在 Milvus 过滤器表达式中原样保留反斜杠。建议在<code translate="no">LIKE</code> 以及包含反斜杠的正则表达式模式中使用它们。如果不使用原始字符串，普通字符串字面量在评估模式之前仍会处理转义序列，因此可能需要添加更多反斜杠。</p>
<h2 id="Use-regex--Milvus-30x" class="common-anchor-header">使用正则表达式<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Use-regex--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h2><p>当模式需要正则表达式功能（如字符类、重复、选择、锚点或不区分大小写的匹配）时，请使用正则表达式过滤器。Milvus 会对字符串值应用<a href="https://github.com/google/re2/wiki/syntax">RE2</a>正则表达式。</p>
<p><code translate="no">=~</code> 或<code translate="no">!~</code> 的右侧必须为字符串字面量。</p>
<table>
<thead>
<tr><th>操作符</th><th>含义</th><th>示例</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>匹配满足正则表达式模式的值。</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>排除满足正则表达式模式的值。</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Use-raw-string-literals" class="common-anchor-header">使用原始字符串字面量<button data-href="#Use-raw-string-literals" class="anchor-icon" translate="no">
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
    </button></h3><p>对于包含反斜杠的正则表达式模式，建议使用原始字符串字面量。在原始字符串中（写法为<code translate="no">r&quot;...&quot;</code> 或<code translate="no">r'...'</code> ），反斜杠会原样传递给正则表达式引擎。这避免了普通字符串字面量所需的额外转义操作。</p>
<p>例如：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ r&quot;\d{4}-\d{2}-\d{2}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>这将匹配包含类似日期的字符串，例如<code translate="no">2026-07-01</code> 。</p>
<p>如果不使用原始字符串，普通字符串字面量会在评估正则表达式模式之前处理转义序列，因此诸如<code translate="no">\d</code> 、<code translate="no">\s</code> 或包含转义字符的字面量可能需要添加额外的反斜杠。</p>
<h3 id="Common-regex-patterns" class="common-anchor-header">常见的正则表达式模式<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>以下示例在 Milvus 过滤器表达式中使用了常见的 RE2 语法。有关完整的正则表达式语法，请参阅<a href="https://github.com/google/re2/wiki/syntax">RE2 语法</a>参考。</p>
<table>
<thead>
<tr><th>要求</th><th>模式</th><th>过滤示例</th></tr>
</thead>
<tbody>
<tr><td>包含字面文本</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>以前缀开头</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>以后缀结尾</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>匹配数字序列</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>匹配固定数量的数字</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>匹配电子邮件域名</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>不区分大小写</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>匹配整个字符串</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>若要匹配多个单词中的任意一个，请使用<code translate="no">|</code> 进行选择：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>当需要匹配正则表达式元字符的字面值时，请在正则表达式模式中对其进行转义。例如，要匹配字面上的点（正则表达式中的 `<code translate="no">\.</code> `），请在 Python 过滤器字符串中写为 `<code translate="no">\\.</code> `：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>注意：Milvus 正则表达式过滤器遵循 RE2 语法。如果正则表达式模式使用了 RE2 不支持的语法，或者存在其他无效情况，Milvus 将拒绝该过滤器表达式。有关正则表达式元字符、标志和匹配行为的详细信息，请参阅<a href="https://github.com/google/re2/wiki/syntax">RE2 语法</a>参考。</p>
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
    </button></h3><p><strong>子字符串匹配</strong></p>
<p>Milvus 的正则表达式匹配采用子字符串语义。模式无需与整个字段值完全匹配。例如，以下过滤器既匹配<code translate="no">E1001</code> ，也匹配<code translate="no">failed with E1001 after retry</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>若要匹配整个字段值，请使用<code translate="no">^</code> 和<code translate="no">$</code> 锚点：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>可为空的 VARCHAR 字段</strong></p>
<p>正则表达式过滤器不会匹配空值。这适用于<code translate="no">=~</code> 和<code translate="no">!~</code> 两种情况。若要排除某个正则表达式模式但保留空值，请显式添加<code translate="no">OR field IS NULL</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>JSON 路径</strong></p>
<p>对于 JSON 路径，当路径缺失、为空或解析为非字符串值时，正则表达式过滤器的行为会有所不同：</p>
<table>
<thead>
<tr><th>过滤器</th><th>是否包含缺失/null/非字符串值？</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>否</td><td>仅匹配满足正则表达式模式的字符串值。</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>是</td><td>返回路径缺失、为空、非字符串，或字符串不匹配正则表达式模式的实体。</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">利用索引加速模式匹配<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支持多种字符串字段索引类型，可与<code translate="no">LIKE</code> 以及针对<code translate="no">VARCHAR</code> 字段或 JSON 字符串路径的正则表达式过滤器配合使用，例如<code translate="no">NGRAM</code> 、<code translate="no">STL_SORT</code> 、<code translate="no">INVERTED</code> 和<code translate="no">BITMAP</code> 。模式匹配可在无索引的情况下进行，但使用索引可提升大型数据集的性能。</p>
<p>索引的有效性取决于模式表达式、Milvus 能否提取固定的字面量子字符串，以及目标字段的基数和分布情况。前缀式模式（如<code translate="no">name LIKE &quot;Prod%&quot;</code> ）可能受益于与中缀或后缀模式（如<code translate="no">description LIKE &quot;%vector%&quot;</code> 或<code translate="no">filename LIKE &quot;%.json&quot;</code> ）不同的索引策略。</p>
<p>请将下表作为参考起点，然后根据您自己的工作负载进行基准测试：</p>
<table>
<thead>
<tr><th>模式或数据特征</th><th>应考虑的索引</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td>包含固定的字面量子字符串，例如<code translate="no">message =~ &quot;error.*timeout&quot;</code> 或<code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>当 Milvus 能从模式中提取有意义的字面量子字符串时，此项会有所帮助。详情请参阅<a href="/docs/zh/ngram.md">NGRAM</a>。</td></tr>
<tr><td>前缀、精确或等值类型的字符串过滤器，特别适用于基数较低至中等的字段</td><td><code translate="no">STL_SORT</code>、<code translate="no">INVERTED</code> 或<code translate="no">BITMAP</code></td><td>当字段包含重复值或过滤器接近精确匹配时，此方法可能更有效。详情请参阅<a href="/docs/zh/stl-sort.md">STL_SORT</a>、<a href="/docs/zh/inverted.md">INVERTED</a> 和<a href="/docs/zh/bitmap.md">BITMAP</a>。</td></tr>
<tr><td>不包含固定字符的正则表达式模式，或以字符类、短令牌或通配符为主的模式</td><td>在依赖索引加速之前请先进行基准测试</td><td>这些模式可能提供的索引选择性有限，并可能退化为更广泛的扫描。</td></tr>
</tbody>
</table>
