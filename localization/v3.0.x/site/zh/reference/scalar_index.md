---
id: scalar_index.md
related_key: scalar_index
summary: 比较标量索引类型，检查字段兼容性，并了解自动索引选择机制。
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
    </button></h1><p>标量索引可加速对非向量字段的<a href="/docs/zh/boolean.md">过滤操作</a>。请参考本概述来选择索引、检查字段兼容性，并了解自动选择机制。</p>
<p>建议为频繁使用或处理速度较慢的过滤器所涉及的字段建立索引。对于包含在索引创建请求中的每个字段，请从以下两个选项中选择其一：</p>
<ul>
<li><strong>指定索引类型：</strong>选择一种与字段数据类型及您的过滤器兼容的<strong>索引类型</strong>。</li>
<li><strong>使用<code translate="no">AUTOINDEX</code> ：</strong>将<code translate="no">index_type</code> 设置为<code translate="no">AUTOINDEX</code> ，让Milvus自动选择类型。请参阅<a href="#AUTOINDEX-behavior">AUTOINDEX的行为说明</a>。</li>
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
    </button></h2><p><a id="Supported-predicates"></a>
<a id="Comparisons-and-membership"></a>
<a id="String-patterns"></a></p>
<p>打开索引指南，了解其支持的过滤器、参数和创建步骤：</p>
<table>
<thead>
<tr><th>索引类型</th><th>适用于</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/zh/inverted.md">INVERTED</a></td><td>等值、成员关系和范围过滤器。</td></tr>
<tr><td><a href="/docs/zh/bitmap.md">BITMAP</a></td><td>具有少量不同值的字段，例如状态代码。</td></tr>
<tr><td><a href="/docs/zh/stl-sort.md">STL_SORT</a></td><td>值查找和范围过滤。</td></tr>
<tr><td><a href="/docs/zh/trie.md">TRIE</a></td><td>在<code translate="no">VARCHAR</code> 字段上进行精确字符串查找和前缀匹配。</td></tr>
<tr><td><a href="/docs/zh/ngram.md">NGRAM</a></td><td>LIKE 以及符合条件的正则表达式过滤器。</td></tr>
<tr><td><a href="/docs/zh/rtree.md">RTREE</a></td><td>针对<code translate="no">GEOMETRY</code> 字段的空间过滤器。</td></tr>
</tbody>
</table>
<p>在创建索引之前，请查看下面的字段兼容性表以及所选索引对过滤器的支持情况。</p>
<p><details id="Filter-execution">
<summary><strong>过滤器如何使用索引</strong></summary></p>
<p>索引仅用于处理符合条件的表达式；其他过滤器仍需扫描数据。字段之间的算术运算和比较操作不会继承字面量查找加速机制。有关逻辑组合和NULL测试，请参阅<a href="/docs/zh/basic-operators.md">“基本操作符”</a>。</p>
<p></details></p>
<p><a id="Choosing-a-scalar-index"></a></p>
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
    </button></h2><p><a id="Array-JSON-and-spatial-predicates"></a>
<a id="JSON-field-indexing"></a></p>
<p>查找字段的数据类型，以查看其支持的显式索引。在数组行中，<code translate="no">ARRAY&lt;T&gt;</code> 表示<code translate="no">ARRAY</code> ，其中<code translate="no">element_type=T</code> ：</p>
<table>
<thead>
<tr><th>字段类型</th><th>显式索引类型</th><th>条件</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code></td><td>标量布尔字段不支持<code translate="no">STL_SORT</code> 。</td></tr>
<tr><td><code translate="no">INT8</code>,<code translate="no">INT16</code>,<code translate="no">INT32</code>,<code translate="no">INT64</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code>,<code translate="no">STL_SORT</code></td><td><code translate="no">BITMAP</code> 在主键字段上不可用。</td></tr>
<tr><td><code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td><td>无法显式指定<code translate="no">BITMAP</code> 。</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code>,<code translate="no">STL_SORT</code>,<code translate="no">TRIE</code>,<code translate="no">NGRAM</code></td><td><code translate="no">BITMAP</code> 在主键字段上不可用。请参阅<a href="#String-pattern-indexes">“按过滤器选择索引</a>”。</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td>参见<a href="/docs/zh/timestamptz-field.md">TIMESTAMPTZ 字段</a>。</td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td>参见<a href="/docs/zh/rtree.md">RTREE</a>。</td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code></td><td>参见<a href="/docs/zh/array_data_type.md#Array-index-support">“数组索引支持</a>”。</td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code>,<code translate="no">ARRAY&lt;INT16&gt;</code>,<code translate="no">ARRAY&lt;INT32&gt;</code>,<code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code></td><td>参见<a href="/docs/zh/array_data_type.md#Array-index-support">“数组索引支持</a>”。</td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>,<code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">INVERTED</code></td><td>参见<a href="/docs/zh/array_data_type.md#Array-index-support">“数组索引支持</a>”。</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code></td><td>参见<a href="/docs/zh/array_data_type.md#Array-index-support">“数组索引支持</a>”。</td></tr>
<tr><td><code translate="no">JSON</code></td><td>取决于索引路径和转换类型。</td><td>请检查<a href="/docs/zh/json-indexing.md#Understand-cast-types">JSON 路径的兼容性和要求</a>。</td></tr>
<tr><td>StructArray 的非向量量子字段</td><td>取决于子字段的数据类型。</td><td>需分别索引子字段；<code translate="no">BOOL</code> 的子字段不能使用显式的<code translate="no">STL_SORT</code> 。参见<a href="/docs/zh/index-structarray-fields.md#Create-scalar-indexes">子字段规则</a>。</td></tr>
<tr><td><code translate="no">TEXT</code></td><td>无</td><td>用户创建的标量索引（包括<code translate="no">AUTOINDEX</code> ）不可用。</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>标量索引（包括<code translate="no">AUTOINDEX</code> ）不支持递归的ARRAY字段或包含可为空元素的数组。有关子字段规则，请参阅“普通数组过滤器的<a href="/docs/zh/array_data_type.md#Array-index-support">数组索引支持</a>”和<a href="/docs/zh/index-structarray-fields.md#Create-scalar-indexes">“StructArray字段的索引”</a>。</p>
</blockquote>
</div>
<p><details id="String-pattern-indexes">
<summary><strong>为 VARCHAR 过滤器选择索引</strong></summary></p>
<p>对于<code translate="no">VARCHAR</code> 字段，请根据您的过滤条件比较兼容的索引：</p>
<table>
<thead>
<tr><th>筛选需求</th><th>索引指南与条件</th></tr>
</thead>
<tbody>
<tr><td>精确字符串查找和前缀</td><td><a href="/docs/zh/trie.md#Queries-accelerated-by-TRIE">TRIE</a>、<a href="/docs/zh/stl-sort.md#Queries-accelerated-by-STLSORT">STL_SORT</a> 或<a href="/docs/zh/inverted.md#Queries-accelerated-by-INVERTED">INVERTED</a>。</td></tr>
<tr><td>少量不同的字符串值</td><td><a href="/docs/zh/bitmap.md#Queries-accelerated-by-BITMAP">BITMAP</a>；模式会针对索引值进行评估。</td></tr>
<tr><td>LIKE 或带有合适固定字面量的正则表达式</td><td>在<code translate="no">VARCHAR</code> 字段或JSON字符串路径上<a href="/docs/zh/ngram.md#Queries-accelerated-by-NGRAM">使用NGRAM</a>，受语素长度和重新检查条件的限制。</td></tr>
<tr><td>不包含可用固定字面量的正则表达式</td><td>该查询可能需要扫描数据或评估大量索引值；请检查所选索引的条件。</td></tr>
</tbody>
</table>
<p><code translate="no">VARCHAR</code> 上的范围查询采用字符串排序，即使字符串中包含数字也是如此。索引的使用取决于查询规划、可提取的字面量、基数以及数据分布。有关规划规则，请参阅<a href="/docs/zh/pattern-matching.md#Accelerate-pattern-matching-with-indexes">“模式匹配”</a>。对于 JSON 字符串路径，请查阅<a href="/docs/zh/json-indexing.md">“JSON 索引</a>”中的路径和类型转换要求。</p>
<p></details></p>
<p><a id="How-AUTOINDEX-selects"></a></p>
<h2 id="AUTOINDEX-behavior" class="common-anchor-header">AUTOINDEX 的行为<button data-href="#AUTOINDEX-behavior" class="anchor-icon" translate="no">
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
    </button></h2><p>在每个选定字段的索引定义中，将<code translate="no">index_type</code> 设置为<code translate="no">AUTOINDEX</code> 。Milvus会根据数据类型，并在适用时结合每次索引构建中各字段的唯一值数量，选择相应类型：</p>
<table>
<thead>
<tr><th>字段类型</th><th>默认选择</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>,<code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>,<code translate="no">INT16</code>,<code translate="no">INT32</code>,<code translate="no">INT64</code>,<code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code>,<code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> 当唯一值少于 100 个时；否则为<code translate="no">STL_SORT</code> 。</td></tr>
<tr><td><code translate="no">ARRAY</code> 其中<code translate="no">element_type</code> 设置为<code translate="no">INT8</code> 、<code translate="no">INT16</code> 、<code translate="no">INT32</code> 、<code translate="no">INT64</code> 、<code translate="no">FLOAT</code> 、<code translate="no">DOUBLE</code> ，或<code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> 当元素数量少于100个时；否则请访问<code translate="no">INVERTED</code> 。</td></tr>
<tr><td><code translate="no">JSON</code> 路径默认转换为<code translate="no">BOOL</code> 、<code translate="no">DOUBLE</code> 或<code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code> 在 3.0 版本中默认如此。<a href="/docs/zh/json-indexing.md#Index-requirements">启用 JSON 选项将采用</a>上述标量位图/排序策略。</td></tr>
<tr><td><code translate="no">JSON</code> 路径被转换为<code translate="no">ARRAY_BOOL</code> 、<code translate="no">ARRAY_DOUBLE</code> 或<code translate="no">ARRAY_VARCHAR</code></td><td>请显式使用<code translate="no">INVERTED</code> ；默认的 3.0.6 映射会拒绝对此类转换进行自动选择。</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>不支持。</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>对于受支持的标量字段，省略 `<code translate="no">index_type</code> ` 的索引定义也会请求自动选择。未包含在请求中的字段不会被索引。</p>
</blockquote>
</div>
<p><a id="Version-compatibility"></a></p>
<p><details>
<summary><strong>选择详细信息</strong></summary></p>
<ul>
<li><strong>内部布局：</strong> <code translate="no">AUTOINDEX</code> 可以选择无法作为显式选项的布局，例如<code translate="no">FLOAT</code> 和<code translate="no">DOUBLE</code> 的位图索引。基于基数的策略在内部称为<code translate="no">HYBRID</code> ；您无法直接指定它。所选索引决定了哪些过滤器可以使用它。</li>
<li><strong>基数阈值：</strong> <a id="Cardinality-threshold"></a>将<code translate="no">bitmap_cardinality_limit</code> （范围：1–1000）设置为覆盖默认阈值。低于该阈值的值使用位图；等于或高于该阈值的值，则应用该数据类型的高基数布局。显式指定的<code translate="no">INVERTED</code> 、<code translate="no">STL_SORT</code> 和<code translate="no">BITMAP</code> 构建将绕过基于基数的选定，并忽略此阈值。</li>
<li><strong>管理员覆盖设置：</strong>通过<code translate="no">scalarAutoIndex.params.build</code> 更改类型映射。<code translate="no">scalarAutoIndex.enable=false</code> （默认）仍允许显式使用<code translate="no">AUTOINDEX</code> ；<code translate="no">true</code> 也会对有效的手动请求应用自动选择。</li>
</ul>
<p></details></p>
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
    </button></h2><p><a id="Performance-considerations"></a>
<a id="Estimating-memory-requirements"></a></p>
<p>为您的下一个任务选择指南：</p>
<ul>
<li><strong>创建索引：</strong>请参阅<a href="#Index-types">索引指南</a>，了解相关参数和创建示例。</li>
<li><strong>规划资源：</strong>请参阅<a href="/docs/zh/stl-sort.md#Memory-considerations">STL_SORT</a>、<a href="/docs/zh/bitmap.md#Memory-considerations">BITMAP</a>、<a href="/docs/zh/inverted.md#Memory-considerations">INVERTED</a> 或<a href="/docs/zh/ngram.md#Memory-considerations">NGRAM</a> 的内存指南。使用代表性数据和过滤器比较内存使用量、构建时间和查询延迟。</li>
<li><strong>配置文本搜索：</strong> <a href="/docs/zh/keyword-match.md">文本匹配</a>（Text Match）和<a href="/docs/zh/full-text-search.md">全文搜索（Full Text Search</a>）涵盖文本分析、BM25、<code translate="no">TEXT_MATCH</code> 以及<code translate="no">PHRASE_MATCH</code> 。标量<code translate="no">INVERTED</code> 索引不支持这些机制。</li>
</ul>
<p><details id="Drop-index-compatibility">
<summary><strong>在旧版 Milvus 发布版本中删除标量索引</strong></summary></p>
<p>在 Milvus v2.6.3 或更早版本中，删除标量索引前需先释放 Collection。从 v2.6.4 起，无需释放 Collection 即可删除标量索引。</p>
<p></details></p>
