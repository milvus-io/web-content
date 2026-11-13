---
id: scalar_index.md
related_key: scalar_index
summary: 标量索引可加快对非向量字段的过滤速度。本参考文档介绍了 Milvus 如何选择标量索引、您可以指定哪些索引类型，以及每种索引支持的数据类型。
title: 标量索引
---
<h1 id="Scalar-Index" class="common-anchor-header">标量索引<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>标量索引可加速对非向量字段（如类别、价格、时间戳和位置）的过滤。当过滤表达式缩小搜索范围时，标量索引可让 Milvus 无需扫描该字段即可定位匹配的实体。</p>
<p>如果您不确定应选择哪种索引，请使用<code translate="no">AUTOINDEX</code> 。仅当您需要特定行为时，才手动指定索引类型。</p>
<h2 id="Choosing-a-scalar-index" class="common-anchor-header">选择标量索引<button data-href="#Choosing-a-scalar-index" class="anchor-icon" translate="no">
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
    </button></h2><p>下表列出了在使用 `<code translate="no">AUTOINDEX</code>` 时 Milvus 默认选择的索引，以及您可以针对每种数据类型手动指定的索引类型。</p>
<table>
<thead>
<tr><th>数据类型</th><th>AUTOINDEX 默认值</th><th>手动索引类型</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>,<code translate="no">INT16</code>,<code translate="no">INT32</code>,<code translate="no">INT64</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code>,<code translate="no">STL_SORT</code>,<code translate="no">TRIE</code>,<code translate="no">NGRAM</code>,<code translate="no">FMINDEX</code></td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">JSON</code> 通过类型化的标量或数组强制转换</td><td><code translate="no">HYBRID</code></td><td>取决于<code translate="no">json_cast_type</code> ；参见<a href="#JSON-field-indexing">JSON 字段索引</a>。</td></tr>
<tr><td><code translate="no">JSON</code> 与<code translate="no">json_cast_type=&quot;JSON&quot;</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>、<code translate="no">BITMAP</code> 、<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code> 通过<code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>、<code translate="no">BITMAP</code> 、<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>,<code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>不支持</td><td>无</td></tr>
</tbody>
</table>
<p><code translate="no">HYBRID</code> 是一种内部策略，并非您可以直接指定的类型。请参阅<a href="#How-AUTOINDEX-selects">“AUTOINDEX 的选择方式”</a>。</p>
<p>适用以下限制：</p>
<ul>
<li><strong>主键：</strong> <code translate="no">BITMAP</code> 无法用于主键字段。</li>
<li><strong>数组：</strong>递归数组和包含可为空元素的数组不支持标量索引，包括<code translate="no">AUTOINDEX</code> 。普通数组支持布尔型、整数型、浮点型和 VARCHAR 类型的元素。</li>
<li><strong>结构体数组：</strong>需分别对标量子字段进行索引。其支持情况可能与普通数组不同；例如，布尔型结构体子字段不支持显式<code translate="no">STL_SORT</code> 。</li>
<li><strong>TEXT：</strong>用户创建的标量索引（包括<code translate="no">AUTOINDEX</code> ）不可用。文本分析和BM25搜索使用独立的机制。</li>
</ul>
<h2 id="Index-types" class="common-anchor-header">索引类型<button data-href="#Index-types" class="anchor-icon" translate="no">
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
<tr><th>索引类型</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>通用等值、成员关系和范围过滤器。</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>具有少量不同值的字段；紧凑的位级过滤。</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>已排序值的查找和范围过滤。</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>字符串相等性及前缀匹配。</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>通过缩小候选项范围对字符串进行 LIKE 和正则表达式匹配。</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>精确的前缀、后缀和中缀子字符串匹配。</td></tr>
<tr><td><code translate="no">RTREE</code></td><td>对 GEOMETRY 字段进行空间过滤。</td></tr>
</tbody>
</table>
<p>有关创建示例、索引参数和支持的查询，请参阅<a href="/docs/zh/bitmap.md">BITMAP</a>、<a href="/docs/zh/inverted.md">INVERTED</a>、<a href="/docs/zh/ngram.md">NGRAM</a>、<a href="/docs/zh/stl-sort.md">STL_SORT</a>、<a href="/docs/zh/trie.md">TRIE</a>、<a href="/docs/zh/fmindex.md">FMINDEX</a> 和<a href="/docs/zh/rtree.md">RTREE</a>。</p>
<h2 id="How-AUTOINDEX-selects" class="common-anchor-header">AUTOINDEX 的选择机制<button data-href="#How-AUTOINDEX-selects" class="anchor-icon" translate="no">
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
    </button></h2><p>对于<code translate="no">AUTOINDEX</code> ，Milvus会根据字段类型、服务器配置以及某些字段的唯一值数量（基数）来选择索引。默认选择方案在<a href="#Choosing-a-scalar-index">“选择标量索引</a>”中列出。</p>
<p>对于大多数字段，<code translate="no">AUTOINDEX</code> 会采用内部的“<code translate="no">HYBRID</code> ”策略，根据基数选择索引：</p>
<ul>
<li><strong><code translate="no">BITMAP</code></strong> 当构建包含少于 100 个不同值时。</li>
<li><strong><code translate="no">STL_SORT</code></strong> 当构建包含 100 个或更多不同值时。</li>
</ul>
<p>数组索引采用独立的兼容性策略：当集群支持时，其高基数分支使用<code translate="no">STL_SORT</code> ；否则使用<code translate="no">INVERTED</code> 。请参阅<a href="#Version-compatibility">“版本兼容性”</a>。</p>
<p><code translate="no">HYBRID</code> 仅限内部使用——您无法直接指定它。内部选择还可以使用该字段无法作为显式选项的索引，例如浮点数的位图索引。</p>
<blockquote>
<p>这些选择均为默认设置。管理员可通过<code translate="no">scalarAutoIndex.params.build</code> 进行修改。<code translate="no">scalarAutoIndex.enable</code> 的默认值为<code translate="no">false</code> ，该设置在省略索引类型时仍允许显式指定<code translate="no">AUTOINDEX</code> 及选择；将其设置为<code translate="no">true</code> 时，也会对原本有效的手动请求应用自动选择。</p>
</blockquote>
<h2 id="JSON-field-indexing" class="common-anchor-header">JSON 字段索引<button data-href="#JSON-field-indexing" class="anchor-icon" translate="no">
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
    </button></h2><p>要对 JSON 值进行索引，请指定 `<code translate="no">json_cast_type</code> ` 以指示要索引的值类型。此参数在自动和手动索引中均为必填项。使用 `<code translate="no">json_path</code> ` 来标识路径；如果省略，Milvus 将使用请求中提供的字段名称。</p>
<table>
<thead>
<tr><th>json_cast_type</th><th>AUTOINDEX 默认值</th><th>手动索引类型</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code>,<code translate="no">STL_SORT</code>,<code translate="no">NGRAM</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
</tbody>
</table>
<p><code translate="no">JSON</code> 转换会选择完整的 JSON 索引，而非类型化标量路径索引，并将<code translate="no">AUTOINDEX</code> 的默认值从<code translate="no">HYBRID</code> 更改为<code translate="no">INVERTED</code> 。</p>
<p>可选的<code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> 会将<code translate="no">DOUBLE</code> 转换中的字符串值进行转换。它不能与其他转换类型一起使用。<code translate="no">TRIE</code> 和<code translate="no">FMINDEX</code> 均不支持JSON字段。</p>
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
    </button></h2><p>下表列出了每个索引可协助评估的谓词。<strong>索引支持并不保证Milvus会在每个查询中都使用该索引。</strong>当索引不适用于特定表达式或模式时，Milvus可能会扫描字段数据。</p>
<h3 id="Comparisons-and-membership" class="common-anchor-header">比较与成员关系<button data-href="#Comparisons-and-membership" class="anchor-icon" translate="no">
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
    </button></h3><p>相等性和成员关系包括<code translate="no">==</code> 、<code translate="no">!=</code> 、<code translate="no">in</code> 以及<code translate="no">not in</code> 。范围比较包括<code translate="no">&lt;</code> 、<code translate="no">&lt;=</code> 、<code translate="no">&gt;</code> 、<code translate="no">&gt;=</code> 以及诸如<code translate="no">10 &lt;= price &lt; 50</code> 之类的表达式。</p>
<table>
<thead>
<tr><th>索引类型</th><th>字段数据类型</th><th>索引支持的谓词</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td><code translate="no">BOOL</code></td><td>相等与隶属关系</td></tr>
<tr><td><code translate="no">INVERTED</code></td><td>整数、<code translate="no">FLOAT</code> 、<code translate="no">DOUBLE</code> 、<code translate="no">VARCHAR</code></td><td>相等、隶属关系和范围</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td><code translate="no">BOOL</code></td><td>相等性和成员关系</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>整数，<code translate="no">VARCHAR</code></td><td>相等性、成员关系和范围</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>整数，<code translate="no">FLOAT</code> ，<code translate="no">DOUBLE</code> ，<code translate="no">TIMESTAMPTZ</code> ，<code translate="no">VARCHAR</code></td><td>相等性、成员关系和范围</td></tr>
<tr><td><code translate="no">TRIE</code></td><td><code translate="no">VARCHAR</code></td><td>相等性、成员关系和范围；范围求值可能遍历多个索引字符串</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td><code translate="no">VARCHAR</code></td><td>仅限字符串模式；不支持直接相等性、成员关系或范围查找</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">VARCHAR</code></td><td>仅限字符串模式；不支持直接的相等性、成员关系或范围查询</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td>空间谓词，如下所列</td></tr>
<tr><td><code translate="no">AUTOINDEX</code></td><td>支持的标量类型</td><td>取决于所选索引。内部<code translate="no">HYBRID</code> 选择操作会利用其位图索引、排序索引或反转索引的功能。</td></tr>
</tbody>
</table>
<p>VARCHAR 范围比较的是字符串值，而非将其解释为数字。该表仅描述了与字面值的比较；这并不意味着算术表达式或两个字段之间的比较也能获得相同的索引加速效果。</p>
<h3 id="String-patterns" class="common-anchor-header">字符串模式<button data-href="#String-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>此表适用于 VARCHAR 字段。对于 JSON 字符串路径，请使用 JSON 索引表支持的索引和<code translate="no">VARCHAR</code> 转换；将适用相应的字符串行为。</p>
<ul>
<li><strong>是：</strong>索引返回完全匹配的结果。</li>
<li><strong>检查索引值：</strong>Milvus 会将模式与索引中存储的字符串进行比对，这可能需要遍历许多不同的字符串。</li>
<li><strong>候选项：</strong>索引会缩小可能的匹配范围，然后 Milvus 检查原始值。</li>
<li><strong>扫描：</strong>索引无法满足谓词条件；Milvus 将使用另一个符合条件的路径或扫描该字段。</li>
</ul>
<table>
<thead>
<tr><th>索引类型</th><th>前缀<code translate="no">like &quot;abc%&quot;</code></th><th>后缀<code translate="no">like &quot;%abc&quot;</code></th><th>子字符串<code translate="no">like &quot;%abc%&quot;</code></th><th>通用 LIKE<code translate="no">like &quot;a%b_c&quot;</code></th><th>正则表达式<code translate="no">=~ &quot;a.*b&quot;</code></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>是</td><td>扫描</td><td>扫描</td><td>是</td><td>扫描</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>检查索引值</td><td>检查索引值</td><td>检查索引值</td><td>检查索引值</td><td>检查索引值</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>是</td><td>检查索引值</td><td>检查索引值</td><td>检查索引值</td><td>检查索引值</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>是</td><td>检查索引值</td><td>检查索引值</td><td>检查索引值</td><td>检查索引值</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>候选人</td><td>候选词</td><td>候选项；在配置的语法片段长度范围内与字面量完全匹配</td><td>候选词</td><td>候选词</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>是</td><td>是</td><td>是</td><td>候选人</td><td>候选项</td></tr>
</tbody>
</table>
<p>这些条目描述了查询规划后的操作符。Milvus 可以将字面量 LIKE 模式简化为等值比较，并将简单的锚定正则表达式简化为等值比较、前缀或后缀匹配；例如，<code translate="no">name =~ &quot;^abc$&quot;</code> 将变为等值比较，并遵循等值比较表。</p>
<p><code translate="no">INVERTED</code> 将简单的后缀和子字符串形式视为全表扫描，尽管更复杂的 LIKE 模式可以使用索引。<code translate="no">NGRAM</code> 要求字面量文本长度至少为<code translate="no">min_gram</code> 个字符；一般的 LIKE 要求每个非空字面量片段都满足该最小长度，而正则表达式的加速取决于能否提取出合适的字面量。 否则，Milvus 将扫描数据。当模式提供的有用过滤条件很少，或者通过索引解析成本过高时，<code translate="no">FMINDEX</code> 也会选择扫描。</p>
<p>这些是字符串值谓词。基于令牌的函数（如<code translate="no">TEXT_MATCH</code> 和<code translate="no">PHRASE_MATCH</code> ）使用通过字段属性配置的文本匹配索引；选择标量<code translate="no">INVERTED</code> 索引不会启用这些函数。</p>
<h3 id="Array-JSON-and-spatial-predicates" class="common-anchor-header">数组、JSON 和空间谓词<button data-href="#Array-JSON-and-spatial-predicates" class="anchor-icon" translate="no">
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
<tr><th>索引类型</th><th>数据类型或类型转换</th><th>可使用该索引的谓词</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code>、<code translate="no">BITMAP</code> 、<code translate="no">STL_SORT</code> ，或符合条件的<code translate="no">AUTOINDEX</code> 选择项</td><td>包含受支持元素类型的普通数组</td><td><code translate="no">ARRAY_CONTAINS</code>、<code translate="no">ARRAY_CONTAINS_ANY</code> 、<code translate="no">ARRAY_CONTAINS_ALL</code></td><td>匹配元素时不考虑其位置。但仍受索引/类型限制的约束。</td></tr>
<tr><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td><td>由布尔值、整数或 VARCHAR 值组成的普通数组</td><td>全数组<code translate="no">==</code> 和<code translate="no">!=</code></td><td>可使用索引候选项，随后对原始数组进行检查。浮点数组将回退到扫描；位图索引不支持此候选项路径。</td></tr>
<tr><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code> 、<code translate="no">STL_SORT</code> 或符合条件的<code translate="no">AUTOINDEX</code> 选择项</td><td>转换为<code translate="no">BOOL</code> 、<code translate="no">DOUBLE</code> 或<code translate="no">VARCHAR</code></td><td>与转换类型相适应的比较和成员关系</td><td>索引路径和转换结果必须与查询匹配。字符串模式遵循前表的规定。</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>转换为<code translate="no">VARCHAR</code></td><td>LIKE 和正则表达式模式</td><td>采用与 VARCHAR NGRAM 索引相同的模式适用性规则。</td></tr>
<tr><td><code translate="no">INVERTED</code>、<code translate="no">STL_SORT</code> ，或符合条件的<code translate="no">AUTOINDEX</code> 选择</td><td>转换为<code translate="no">ARRAY_BOOL</code> 、<code translate="no">ARRAY_DOUBLE</code> 或<code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">JSON_CONTAINS</code>、<code translate="no">JSON_CONTAINS_ANY</code> 、<code translate="no">JSON_CONTAINS_ALL</code></td><td>需要元素类型兼容。混合类型或嵌套数组操作数可能会回退为扫描。</td></tr>
<tr><td><code translate="no">INVERTED</code> 带转换<code translate="no">JSON</code></td><td>完整的 JSON 索引</td><td>对受支持的标量路径进行比较和成员关系检查；支持字符串模式；对受支持的数组路径进行 JSON 包含检查</td><td>字符串路径遵循“反转”行为。数组包含操作要求元素类型兼容。</td></tr>
<tr><td>JSON 路径索引和完整 JSON 索引</td><td>索引 JSON 路径</td><td><code translate="no">exists</code></td><td>用于检测路径是否存在，这与检测其值或整个字段是否为 null 不同。</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td><code translate="no">ST_EQUALS</code>,<code translate="no">ST_INTERSECTS</code>,<code translate="no">ST_CONTAINS</code>,<code translate="no">ST_WITHIN</code>,<code translate="no">ST_TOUCHES</code>,<code translate="no">ST_OVERLAPS</code>,<code translate="no">ST_CROSSES</code>,<code translate="no">ST_DWITHIN</code></td><td>使用边界框查找候选项，然后检查精确的空间关系。<code translate="no">ST_ISVALID</code> 不使用 RTREE。</td></tr>
</tbody>
</table>
<p>支持数组包含并不意味着对特定位置元素（如<code translate="no">values[0]</code> ）或数组长度的索引查找。整个数组的相等性还必须检查顺序和长度，而仅凭元素成员身份无法确定这些信息。</p>
<p><code translate="no">IS NULL</code> 以及<code translate="no">IS NOT NULL</code> 会使用有效性信息，且不要求特定的标量索引类型。您可以将谓词与<code translate="no">and</code> 、<code translate="no">or</code> 和<code translate="no">not</code> 结合使用；每个部分均可使用其自身的合格执行路径。</p>
<h2 id="Version-compatibility" class="common-anchor-header">版本兼容性<button data-href="#Version-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>大多数标量索引——包括针对普通标量字段的<code translate="no">BITMAP</code> 、<code translate="no">INVERTED</code> 、<code translate="no">STL_SORT</code> 、<code translate="no">TRIE</code> 以及<code translate="no">NGRAM</code> ——均无版本要求。以下要求仅适用于较新的组合：数组字段索引、JSON-path 索引以及<code translate="no">FMINDEX</code> 。</p>
<p>这些要求使用标量索引引擎的版本号，这是一个与 Milvus 软件发布版本号不同的内部功能计数器。</p>
<table>
<thead>
<tr><th>功能</th><th>要求</th></tr>
</thead>
<tbody>
<tr><td>显式<code translate="no">FMINDEX</code></td><td>标量索引引擎版本 5 或更高</td></tr>
<tr><td>显式在普通数组上使用<code translate="no">STL_SORT</code> </td><td>标量索引引擎版本 3 或更高，且已启用数组排序支持</td></tr>
<tr><td><code translate="no">HYBRID</code> 为普通数组选择<code translate="no">STL_SORT</code> </td><td>标量索引引擎版本 5 或更高，且已启用数组排序支持</td></tr>
<tr><td><code translate="no">BITMAP</code>，对 JSON 标量路径使用 `<code translate="no">STL_SORT</code>` 或 `<code translate="no">HYBRID</code> `</td><td>标量索引引擎版本 4 或更高</td></tr>
<tr><td><code translate="no">STL_SORT</code> 或在类型化 JSON 数组路径上使用<code translate="no">HYBRID</code> </td><td>标量索引引擎 3 版或更高版本，且已启用数组排序支持</td></tr>
</tbody>
</table>
<p>如果未满足数组或 JSON 兼容性要求，受影响的自动请求可回退到<code translate="no">INVERTED</code> ，而针对不受支持组合的显式请求将失败。对于普通数组的<code translate="no">HYBRID</code> ，高基数分支将继续使用<code translate="no">INVERTED</code> ，直到可使用排序索引为止。</p>
<h2 id="Performance-considerations" class="common-anchor-header">性能注意事项<button data-href="#Performance-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>索引性能取决于数据分布以及应用程序使用的过滤条件。Cardinal、字符串长度、数组长度以及匹配实体的数量都会影响内存使用和查询延迟。请使用具有代表性的数据和过滤表达式来比较索引，并同时测量内存使用情况、构建时间和查询延迟。</p>
<h3 id="Estimating-memory-requirements" class="common-anchor-header">估算内存需求<button data-href="#Estimating-memory-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>以下公式可大致估算在禁用内存映射的情况下，标量索引加载后所需的内存量。<code translate="no">STL_SORT</code> 中的公式假设为不包含空值的普通标量字段。</p>
<ul>
<li><code translate="no">N</code>: 实体数量。</li>
<li><code translate="no">D</code>: 不同值的数量。</li>
<li><code translate="no">l</code>: 不同字符串的平均长度（以<strong>字节</strong>为单位）。</li>
<li><code translate="no">S</code>: 存储压缩前已构建索引的大小（单位：<strong>字节</strong>）。</li>
</ul>
<table>
<thead>
<tr><th>索引类型</th><th>内存大致估算值（单位：字节）</th><th>直观理解</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">STL_SORT</code> 关于<code translate="no">INT8</code> 、<code translate="no">INT16</code> 、<code translate="no">INT32</code> ，或<code translate="no">FLOAT</code></td><td><code translate="no">12 * N</code></td><td>每个实体约 12 字节。</td></tr>
<tr><td><code translate="no">STL_SORT</code> 在<code translate="no">INT64</code> 、<code translate="no">DOUBLE</code> 或<code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">20 * N</code></td><td>对于较大数值，每个实体约20字节。</td></tr>
<tr><td><code translate="no">STL_SORT</code> 在<code translate="no">VARCHAR</code></td><td><code translate="no">8 * N + (l + 16) * D</code></td><td>重复的字符串共享存储空间，因此不同的字符串越少，通常意味着内存消耗越少。</td></tr>
<tr><td><code translate="no">BITMAP</code>，使用密集位图</td><td><code translate="no">(D + 1) * N / 8</code></td><td>每个不同的值大约需要一个字节，外加一个位图来跟踪有效的实体。</td></tr>
<tr><td><code translate="no">INVERTED</code> 或者<code translate="no">NGRAM</code></td><td><code translate="no">S</code></td><td>起始大小应约为已构建索引的大小。</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">2 * S</code></td><td>预留大约两倍于已构建索引大小的空间。</td></tr>
</tbody>
</table>
<p>将结果除以<code translate="no">1024 * 1024</code> ，将字节转换<strong>为MiB</strong>。例如，一个包含一百万个非空<code translate="no">INT64</code> 值的<code translate="no">STL_SORT</code> 索引，其主数据结构大约<strong>需要19 MiB</strong>。对于每个字符串都是唯一的VARCHAR字段，估算可简化为<code translate="no">(l + 24) * N</code> ；一百万个唯一字符串，平均每个32字节，大约需要<strong>53 MiB</strong>。</p>
<p>BITMAP 公式描述了密集位图存储；在 64 位系统上启用可选的偏移量缓存会增加约<code translate="no">8 * N</code> 字节。对于<code translate="no">INVERTED</code> 、<code translate="no">NGRAM</code> 和<code translate="no">FMINDEX</code> ，请基于代表性数据构建索引以获得<code translate="no">S</code> ——原始数据大小不能替代已构建索引的大小。 对于<code translate="no">AUTOINDEX</code> ，请使用实际选定的索引公式，按分段进行估算，然后将所有已加载分段和副本的估算值相加。</p>
<p>这些是近似的规划数值，并非内存限制。它们未包含构建、加载和查询过程中使用的临时内存，并且对于字符串和位图索引而言，其对唯一值和数据分布的敏感度高于数值索引<code translate="no">STL_SORT</code> 。不保证固定的准确率百分比。 内存映射、旧版索引格式、数组和 JSON 字段需要单独测量。在确定部署规模之前，请使用具有代表性的数据和查询检查实际内存使用情况，并为峰值使用预留余量。</p>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>有关索引创建和配置的示例，请参阅<a href="/docs/zh/bitmap.md">BITMAP</a>、<a href="/docs/zh/inverted.md">INVERTED</a>、<a href="/docs/zh/ngram.md">NGRAM</a>、<a href="/docs/zh/stl-sort.md">STL_SORT</a>、<a href="/docs/zh/trie.md">TRIE</a>、<a href="/docs/zh/fmindex.md">FMINDEX</a> 和<a href="/docs/zh/rtree.md">RTREE</a>。</li>
<li>有关字段定义和Schema，请参阅<a href="/docs/zh/schema.md">《Schema详解》</a>。</li>
</ul>
