---
id: json-indexing.md
title: JSON 索引
summary: >-
  JSON 字段为在 Milvus 中存储结构化元数据提供了一种灵活的方式。如果不进行索引，对 JSON 字段的查询需要扫描整个
  Collection，随着数据集规模的扩大，这种操作会变得非常缓慢。JSON 索引会在 JSON
  数据中的特定路径上创建索引，从而使针对这些路径的相等、范围及其他过滤查询能够快速运行。
---
<h1 id="JSON-Indexing" class="common-anchor-header">JSON 索引<button data-href="#JSON-Indexing" class="anchor-icon" translate="no">
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
    </button></h1><p>JSON 字段为在 Milvus 中存储结构化元数据提供了一种灵活的方式。如果不进行索引，对 JSON 字段的查询需要扫描整个 Collection，随着数据集的增长，这种操作会变得非常缓慢。JSON 索引会在 JSON 数据中的特定路径上创建索引，从而使针对该路径的相等、范围及其他过滤查询能够快速运行。</p>
<p>JSON 索引特别适用于：</p>
<ul>
<li><p>具有一致且已知键的结构化Schema</p></li>
<li><p>针对特定 JSON 路径的相等、<code translate="no">IN</code> 、范围及文本匹配查询</p></li>
<li><p>需要精确控制哪些键被索引的场景</p></li>
</ul>
<p>对于查询模式多样且结构复杂的 JSON 文档，建议考虑使用<a href="/docs/zh/json-shredding.md">JSON 分片</a>作为替代方案。</p>
<h2 id="Index-type-overview" class="common-anchor-header">索引类型概述<button data-href="#Index-type-overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 为 JSON 路径提供了四种索引类型，每种都适用于不同的查询模式。</p>
<p>在选择索引类型之前，请先确定 JSON 路径的<strong>转换类型</strong>。转换类型决定了 Milvus 如何解析该路径下的值，以及可用的索引类型。</p>
<h3 id="Understand-cast-types" class="common-anchor-header">了解转换类型<button data-href="#Understand-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">json_cast_type</code> 即用于解析和索引<code translate="no">json_path</code> 路径下值的数据类型。它与字段 Schema 类型不同：字段本身仍是<code translate="no">JSON</code> 字段，但每个被索引的路径会被视为特定的标量、数组或 JSON 对象类型。</p>
<p>请选择与该路径下存储的值相匹配的转换类型。要检查某个转换类型是否与特定索引类型兼容，请参阅《<a href="/docs/zh/json-indexing.md#compatibility-reference">兼容性参考》</a>。</p>
<table>
<thead>
<tr><th>转换类型</th><th>当路径值为……时使用</th><th>示例值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>布尔值</td><td><code translate="no">true</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>数值</td><td><code translate="no">99.99</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>字符串值</td><td><code translate="no">&quot;electronics&quot;</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>布尔值数组</td><td><code translate="no">[true, false]</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>数值数组</td><td><code translate="no">[1.2, 3.14]</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>字符串值的数组</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td>整个 JSON 对象或子对象。从 Milvus 3.0.0 开始，对整个 JSON 对象的索引功能已被废弃。</td><td><code translate="no">{&quot;supplier&quot;: {&quot;country&quot;: &quot;USA&quot;}}</code></td></tr>
</tbody>
</table>
<p>如果同一路径下的值类型不一致，则仅对与转换后类型匹配的值进行索引。例如，如果 `<code translate="no">metadata[&quot;price&quot;]</code> ` 同时包含 `<code translate="no">99.99</code> ` 和 `<code translate="no">&quot;99.99&quot;</code>`，则转换为 `<code translate="no">DOUBLE</code> ` 类型的索引将包含数值并跳过字符串值。若要在索引过程中转换字符串值，请使用 `<code translate="no">json_cast_function</code>`；<a href="/docs/zh/json-indexing.md#example-5-convert-data-type-at-index-time">参见示例 5：在索引时转换数据类型</a>。</p>
<h3 id="Choose-an-index-type" class="common-anchor-header">选择索引类型<button data-href="#Choose-an-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>选择转换类型后，请根据您的查询模式选择索引类型。</p>
<table>
<thead>
<tr><th>查询模式</th><th>推荐的索引类型</th><th>转换类型要求</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td>对标量值的混合等值和范围过滤条件</td><td><code translate="no">AUTOINDEX</code></td><td>请使用<code translate="no">BOOL</code> 、<code translate="no">DOUBLE</code> 或<code translate="no">VARCHAR</code> 。</td><td>让 Milvus 根据值的基数自动选择内部索引布局。</td></tr>
<tr><td>对 JSON 数组中值的过滤</td><td><code translate="no">INVERTED</code></td><td>请使用<code translate="no">ARRAY_BOOL</code> 、<code translate="no">ARRAY_DOUBLE</code> 或<code translate="no">ARRAY_VARCHAR</code> 。</td><td>所有数组转换类型均需使用此功能。</td></tr>
<tr><td>整个对象或子对象索引（已弃用）</td><td><code translate="no">INVERTED</code> 或<code translate="no">AUTOINDEX</code> （仅为兼容性而保留）</td><td>请使用<code translate="no">JSON</code> 。</td><td>出于兼容性考虑而支持。对于新工作负载，请创建路径特定索引或考虑使用<a href="/docs/zh/json-shredding.md">JSON 分片</a>。</td></tr>
<tr><td>针对数字或可排序字符串的范围过滤器</td><td><code translate="no">STL_SORT</code> 或<code translate="no">AUTOINDEX</code></td><td>使用<code translate="no">DOUBLE</code> 或<code translate="no">VARCHAR</code> 。</td><td>使用 `<code translate="no">STL_SORT</code> ` 强制采用排序布局；若希望自动选择，请使用 `<code translate="no">AUTOINDEX</code> `。</td></tr>
<tr><td>针对低Cardinal值的相等或<code translate="no">IN</code> 筛选条件</td><td><code translate="no">BITMAP</code> 或<code translate="no">AUTOINDEX</code></td><td>使用<code translate="no">BOOL</code> 或<code translate="no">VARCHAR</code> 。</td><td>使用<code translate="no">BITMAP</code> 强制采用位图布局。对于数值，请使用<code translate="no">AUTOINDEX</code> 或<code translate="no">STL_SORT</code> 。</td></tr>
</tbody>
</table>
<p>如有疑问，请先使用<code translate="no">AUTOINDEX</code> 处理标量路径。对于数组转换类型和文本匹配查询，请显式使用<code translate="no">INVERTED</code> 。使用<code translate="no">INVERTED</code> 或<code translate="no">AUTOINDEX</code> 进行整个对象的 JSON 索引仍受支持，但自 Milvus 3.0.0 起已弃用。</p>
<h3 id="AUTOINDEX" class="common-anchor-header">AUTOINDEX<button data-href="#AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">AUTOINDEX</code> 的行为取决于您指定的<code translate="no">json_cast_type</code> 。在 Milvus 3.0 中，对于 JSON 路径索引，<code translate="no">AUTOINDEX</code> 不再总是解析为<code translate="no">INVERTED</code> 。</p>
<table>
<thead>
<tr><th>类型转换</th><th><code translate="no">AUTOINDEX</code> 的行为</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>、<code translate="no">DOUBLE</code> 、<code translate="no">VARCHAR</code></td><td>根据值的基数在<code translate="no">BITMAP</code> 和<code translate="no">STL_SORT</code> 之间进行选择。</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code>,<code translate="no">ARRAY_DOUBLE</code>,<code translate="no">ARRAY_VARCHAR</code></td><td>不支持。请显式使用<code translate="no">INVERTED</code> 作为索引类型。</td></tr>
<tr><td><code translate="no">JSON</code></td><td>使用<code translate="no">INVERTED</code> 进行整个对象或子对象的索引。此模式自 Milvus 3.0.0 起已弃用。</td></tr>
</tbody>
</table>
<p>对于标量转换类型（<code translate="no">BOOL</code> 、<code translate="no">DOUBLE</code> 和<code translate="no">VARCHAR</code> ），当您希望 Milvus 选择内部索引布局时，建议从<code translate="no">AUTOINDEX</code> 开始。在构建索引期间，Milvus 会测量 JSON 路径下值的<strong>基数</strong>。基数指该路径下不同值的数量。</p>
<p>根据基数，Milvus 会从两种内部布局中选择一种：</p>
<ul>
<li><p><strong>低基数</strong>：值频繁重复，例如<code translate="no">metadata[&quot;in_stock&quot;]</code> 包含<code translate="no">true</code> 和<code translate="no">false</code> ，或者<code translate="no">metadata[&quot;status&quot;]</code> 包含一小组状态字符串。Milvus 会在内部构建一个<code translate="no">BITMAP</code> 索引，以实现快速的相等性比较和<code translate="no">IN</code> 过滤器。</p></li>
<li><p><strong>高基数</strong>：大多数值是唯一的，例如<code translate="no">metadata[&quot;price&quot;]</code> 、<code translate="no">metadata[&quot;created_at&quot;]</code> 或<code translate="no">metadata[&quot;product_id&quot;]</code> 。Milvus 会在内部构建<code translate="no">STL_SORT</code> 索引，以支持快速范围过滤器，例如<code translate="no">&gt;</code> 、<code translate="no">&lt;</code> 、<code translate="no">&gt;=</code> 和<code translate="no">&lt;=</code> 。</p></li>
</ul>
<p>默认的<code translate="no">BITMAP</code> 与<code translate="no">STL_SORT</code> 阈值为<strong>100 个不同值</strong>。您可以通过<code translate="no">bitmap_cardinality_limit</code> 调整此阈值；请参阅<a href="/docs/zh/json-indexing.md#how-do-i-tune-autoindexs-bitmap-vs-stl-sort-threshold">“如何调整 AUTOINDEX 的 BITMAP 与 STL_SORT 阈值？”</a>。</p>
<div class="alert note">
<p><strong>Milvus 3.0 中的行为变更</strong>。在早期版本中，对 JSON 路径的<code translate="no">AUTOINDEX</code> 操作始终会构建<code translate="no">INVERTED</code> 索引。从 Milvus 3.0 开始，对于标量转换类型，<code translate="no">AUTOINDEX</code> 会在<code translate="no">BITMAP</code> 和<code translate="no">STL_SORT</code> 之间进行选择。对于<code translate="no">JSON</code> ，<code translate="no">AUTOINDEX</code> 仍使用<code translate="no">INVERTED</code> ，尽管整个对象的 JSON 索引已被弃用。对于数组转换类型和文本匹配查询，请显式指定<code translate="no">INVERTED</code> 。</p>
</div>
<h3 id="INVERTED" class="common-anchor-header">INVERTED<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">INVERTED</code> 在需要文本匹配查询或数组索引时最为适用。它也仍然可用于已弃用的整个对象 JSON 索引。</p>
<p>在以下情况下，请显式指定<code translate="no">INVERTED</code> ：</p>
<ul>
<li><p>需要对 JSON 数组中的值进行索引时。</p></li>
<li><p>您维护着针对整个 JSON 对象或子对象的现有索引，并希望明确采用 `<code translate="no">INVERTED</code> ` 的行为。</p></li>
<li><p>您希望使用一种索引类型来处理相等、<code translate="no">IN</code> 、范围、文本匹配和数组查询。出于兼容性考虑，仍支持对整个 JSON 对象的索引，但代价是索引大小会更大。</p></li>
</ul>
<p>对于针对整个 JSON 对象（<code translate="no">json_cast_type=&quot;JSON&quot;</code> ）的现有索引，您可以继续使用<code translate="no">INVERTED</code> 或<code translate="no">AUTOINDEX</code> 。<code translate="no">AUTOINDEX</code> 对此转换类型使用<code translate="no">INVERTED</code> 。对于新工作负载，不再建议使用整个对象的 JSON 索引。</p>
<p>有关详细信息，请参阅<a href="/docs/zh/inverted.md">INVERTED</a>。</p>
<h3 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">STL_SORT</code> 将 JSON 路径中的值按排序顺序存储。该类型针对数值或可排序字符串值的范围过滤进行了优化。</p>
<p><code translate="no">STL_SORT</code> 仅支持<code translate="no">DOUBLE</code> 和<code translate="no">VARCHAR</code> 转换类型。在以下情况下使用：</p>
<ul>
<li><p>您的过滤器使用<code translate="no">&gt;</code> 、<code translate="no">&lt;</code> 、<code translate="no">&gt;=</code> 或<code translate="no">&lt;=</code> 对值进行比较。</p></li>
<li><p>索引值具有高基数，例如价格、时间戳、ID 或可排序代码。</p></li>
<li><p>您希望强制采用排序布局，而不是让<code translate="no">AUTOINDEX</code> 自动选择。</p></li>
</ul>
<p><code translate="no">STL_SORT</code> 不支持<code translate="no">BOOL</code> 、<code translate="no">ARRAY_*</code> 或<code translate="no">JSON</code> 转换类型。对于数组，请使用<code translate="no">INVERTED</code> 。现有的整个对象索引可以继续使用<code translate="no">INVERTED</code> 或<code translate="no">AUTOINDEX</code> ，但整个对象的 JSON 索引已被弃用。</p>
<p>有关详细信息，请参阅<a href="/docs/zh/stl-sort.md">STL_SORT</a>。</p>
<h3 id="BITMAP" class="common-anchor-header">BITMAP<button data-href="#BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BITMAP</code> 为 JSON 路径中的每个不同值创建一个紧凑的位图。它针对频繁重复的值进行了优化，适用于等值比较和<code translate="no">IN</code> 过滤器。</p>
<p><code translate="no">BITMAP</code> 仅支持<code translate="no">BOOL</code> 和<code translate="no">VARCHAR</code> 转换类型。在以下情况下使用：</p>
<ul>
<li><p>您的过滤器使用<code translate="no">==</code> 或<code translate="no">IN</code> 。</p></li>
<li><p>索引值的基数较低，例如布尔值、状态值或少量类别。</p></li>
<li><p>您希望强制使用位图布局，而不是让<code translate="no">AUTOINDEX</code> 自行选择。</p></li>
</ul>
<p><code translate="no">BITMAP</code> 不支持<code translate="no">DOUBLE</code> 、<code translate="no">ARRAY_*</code> 或<code translate="no">JSON</code> 转换类型。对于数值，请改用<code translate="no">AUTOINDEX</code> 、<code translate="no">STL_SORT</code> 或<code translate="no">INVERTED</code> 。</p>
<p>有关详细信息，请参阅<a href="/docs/zh/bitmap.md">BITMAP</a>。</p>
<h3 id="Compatibility-reference" class="common-anchor-header">兼容性参考<button data-href="#Compatibility-reference" class="anchor-icon" translate="no">
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
    </button></h3><p>请使用以下矩阵作为支持的<code translate="no">(cast type, index type)</code> 组合的快速参考。</p>
<table>
<thead>
<tr><th>类型转换</th><th>描述</th><th>示例值</th><th>AUTOINDEX</th><th>INVERTED</th><th>STL_SORT</th><th>BITMAP</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>布尔值（<code translate="no">true</code>/<code translate="no">false</code> ）。</td><td><code translate="no">true</code></td><td>是</td><td>是</td><td>否</td><td>是</td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>数值（整数或浮点数）。</td><td><code translate="no">99.99</code></td><td>是</td><td>是</td><td>是</td><td>否</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>字符串值。</td><td><code translate="no">&quot;electronics&quot;</code></td><td>是</td><td>是</td><td>是</td><td>是</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>布尔值数组。</td><td><code translate="no">[true, false]</code></td><td>否</td><td>是</td><td>否</td><td>否</td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>数字数组。</td><td><code translate="no">[1.2, 3.14]</code></td><td>否</td><td>是</td><td>否</td><td>否</td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>字符串数组。</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td><td>否</td><td>是</td><td>否</td><td>否</td></tr>
<tr><td><code translate="no">JSON</code></td><td>一个完整的 JSON 对象或子对象，具有自动类型推断和扁平化功能。自 Milvus 3.0.0 起已弃用。</td><td>任何嵌套对象</td><td>是（已弃用）</td><td>是（已弃用）</td><td>否</td><td>否</td></tr>
</tbody>
</table>
<p>对于标记为<code translate="no">No</code> 的单元格，Milvus会在索引创建时拒绝该请求。对于数组转换类型，请显式使用<code translate="no">INVERTED</code> （<code translate="no">AUTOINDEX</code> 不支持数组）。</p>
<h2 id="Create-a-JSON-index" class="common-anchor-header">创建 JSON 索引<button data-href="#Create-a-JSON-index" class="anchor-icon" translate="no">
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
    </button></h2><p>本节将逐步介绍如何对不同结构的 JSON 数据进行索引。所有示例均使用下面的示例结构，并假设您已经有一个包含名为<code translate="no">metadata</code> 的<code translate="no">JSON</code> 字段的 Collection。</p>
<h3 id="Sample-JSON-structure" class="common-anchor-header">示例 JSON 结构<button data-href="#Sample-JSON-structure" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Basic-setup" class="common-anchor-header">基本设置<button data-href="#Basic-setup" class="anchor-icon" translate="no">
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
    </button></h3><p>下面的示例假设您已将一个名为<code translate="no">client</code> 的<code translate="no">MilvusClient</code> 连接到您的 Milvus 部署，并且有一个 Collection，其中已包含一个名为<code translate="no">metadata</code> 的<code translate="no">JSON</code> 字段。如果您需要从头开始设置这些内容，请展开下面的代码块。</p>
<p><details></p>
<p><summary>连接并创建示例Collection</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Define a schema with a JSON field</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;pk&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)
schema.add_field(<span class="hljs-string">&quot;metadata&quot;</span>, DataType.JSON, nullable=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Minimal vector index so the collection can be loaded</span>
vec_index = client.prepare_index_params()
vec_index.add_index(field_name=<span class="hljs-string">&quot;vec&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    schema=schema,
    index_params=vec_index,
)

<span class="hljs-comment"># Insert one row that matches the sample JSON structure above</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[{
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }],
)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>准备一个 index-params 对象，用于收集以下示例中添加的索引定义：</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<p>以下每个示例都展示了一个<code translate="no">index_params.add_index(...)</code> 调用。请选择与您的数据相匹配的示例，并在同一个<code translate="no">index_params</code> 对象上调用它们。最后，通过单个<code translate="no">client.create_index(...)</code> 调用应用所有内容。有关详细信息，请参阅<a href="/docs/zh/json-indexing.md#apply-the-index">“应用索引”</a>。</p>
<h3 id="Example-1-Index-a-top-level-key-with-AUTOINDEX" class="common-anchor-header">示例 1：使用 AUTOINDEX 对顶级键进行索引<button data-href="#Example-1-Index-a-top-level-key-with-AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p>为<code translate="no">category</code> 字段建立索引，以便按产品类别快速过滤。使用<code translate="no">AUTOINDEX</code> 时，Milvus会根据数据中存在的不同类别数量，自动选择<code translate="no">BITMAP</code> 或<code translate="no">STL_SORT</code> 。</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Index-a-nested-key" class="common-anchor-header">示例 2：为嵌套键建立索引<button data-href="#Example-2-Index-a-nested-key" class="anchor-icon" translate="no">
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
    </button></h3><p>为供应商联系人查询，对深度嵌套的<code translate="no">email</code> 字段建立索引。<code translate="no">json_path</code> 参数支持任意深度的括号表示法。</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;email_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Range-queries-with-STLSORT" class="common-anchor-header">示例 3：使用 STL_SORT 进行范围查询<button data-href="#Example-3-Range-queries-with-STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p>当您确定针对某条路径的查询主要涉及范围比较（<code translate="no">&gt;</code> 、<code translate="no">&lt;</code> 、<code translate="no">&gt;=</code> 、<code translate="no">&lt;=</code> ）时，请直接选择<code translate="no">STL_SORT</code> 。这将绕过基数测量，并立即构建已排序的布局。</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;price_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>建立索引后，诸如<code translate="no">metadata[&quot;price&quot;] &gt; 50 AND metadata[&quot;price&quot;] &lt; 100</code> 之类的范围查询将使用二进制搜索，而非全表扫描。</p>
<h3 id="Example-4-Equality-queries-with-BITMAP" class="common-anchor-header">示例 4：使用 BITMAP 的相等性查询<button data-href="#Example-4-Equality-queries-with-BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p>对于低基数键（如状态码、布尔值或枚举类字符串），请直接选择<code translate="no">BITMAP</code> 。相等查询和<code translate="no">IN</code> 查询将转换为位图操作。</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;in_stock_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;in_stock&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;BOOL&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">BITMAP</code> 对于仅包含少量不同字符串值的<code translate="no">status</code> 列等字段，这也是非常理想的选择。</p>
<h3 id="Example-5-Convert-data-type-at-index-time" class="common-anchor-header">示例 5：在构建索引时转换数据类型<button data-href="#Example-5-Convert-data-type-at-index-time" class="anchor-icon" translate="no">
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
    </button></h3><p>当数值数据被误存储为字符串时，请在构建索引期间使用 `<code translate="no">STRING_TO_DOUBLE</code> ` 将该值转换为数字。</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>如果某行转换失败（例如，非数字字符串，如<code translate="no">&quot;invalid&quot;</code> ），则在索引过程中会跳过该行。</p>
<h3 id="Example-6-Index-entire-JSON-objects" class="common-anchor-header">示例 6：索引整个 JSON 对象<button data-href="#Example-6-Index-entire-JSON-objects" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert warning">
<p>从 Milvus 3.0.0 开始，整个 JSON 对象的索引（<code translate="no">json_cast_type=&quot;JSON&quot;</code> ），也称为 JSON 平面索引，已被弃用。出于兼容性考虑，现有索引和新索引创建请求仍受支持，但不再建议在新工作负载中使用此模式。请针对已知的查询路径创建 JSON 路径索引。 对于具有广泛查询模式的复杂或不断演变的 JSON 文档，请考虑使用<a href="/docs/zh/json-shredding.md">JSON 分片</a>。JSON 分片不会加速数组内部的值；对于此类查询，请使用带有数组转换类型的 JSON 路径索引。</p>
</div>
<p>对于兼容的现有工作负载，设置<code translate="no">json_cast_type=&quot;JSON&quot;</code> 将对给定路径下的完整结构进行索引。Milvus会将嵌套对象扁平化为路径，并自动推断每个值的类型。该路径下的所有键均可被搜索。</p>
<p><code translate="no">AUTOINDEX</code> 会透明地使用<code translate="no">INVERTED</code> 作为<code translate="no">JSON</code> 的转换类型，因为扁平化和类型推断属于倒排索引的功能。</p>
<p>对整个<code translate="no">metadata</code> 对象进行索引：</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_full_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>或者对子对象进行索引，例如所有<code translate="no">supplier</code> 信息：</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;supplier_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>对整个对象建立索引会增加索引大小。对于包含深度嵌套文档且查询模式多样的新工作负载，请使用路径特定索引或考虑使用<a href="/docs/zh/json-shredding.md">JSON 拆分</a>。</p>
<h3 id="Apply-the-index" class="common-anchor-header">应用索引<button data-href="#Apply-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>添加所有索引参数后，将其应用到Collection中：</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>索引构建以异步方式运行。请使用<code translate="no">client.describe_index(...)</code> 检查特定索引的构建状态。构建完成后，<code translate="no">state</code> 字段将显示<code translate="no">Finished</code> ；而<code translate="no">total_rows</code> 、<code translate="no">indexed_rows</code> 和<code translate="no">pending_index_rows</code> 字段则会显示构建过程中的进度。</p>
<pre><code translate="no" class="language-python">client.describe_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>响应示例：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;json_path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;json_cast_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;VARCHAR&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AUTOINDEX&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category_index&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;total_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;indexed_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;pending_index_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;state&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Finished&quot;</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>一旦<code translate="no">state</code> 报告<code translate="no">Finished</code> ，针对该索引路径的查询将自动使用新索引。</p>
<p>对于<code translate="no">AUTOINDEX</code> 条目，此响应中的<code translate="no">index_type</code> 字段将显示为<code translate="no">AUTOINDEX</code> 。Milvus 目前不会公开构建时选择的底层布局（<code translate="no">BITMAP</code> 或<code translate="no">STL_SORT</code> ）。请将此选择视为内部优化：针对该路径的相等性、<code translate="no">IN</code> 以及范围查询，无论选择哪种布局均可正常运行。</p>
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
    </button></h2><h3 id="How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="common-anchor-header">如何在 AUTOINDEX 和显式索引类型之间进行选择？<button data-href="#How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>建议从<code translate="no">AUTOINDEX</code> 开始。它会根据数据的基数自动选择合适的布局，并能覆盖 JSON 路径上绝大多数的等值查询、<code translate="no">IN</code> 以及范围查询。在以下情况下请选择显式类型：</p>
<ul>
<li><p>您已知查询模式（例如，始终进行范围查询时使用<code translate="no">STL_SORT</code> ，而针对低基数值的等值查询始终使用<code translate="no">BITMAP</code> ），且希望跳过基数测量。</p></li>
<li><p>您需要文本匹配或子字符串查询。请使用<code translate="no">INVERTED</code> 。</p></li>
<li><p>您正在为数组转换类型建立索引。请显式使用 `<code translate="no">INVERTED</code> `。</p></li>
<li><p>您正在维护现有的全对象 JSON 索引。出于兼容性考虑，<code translate="no">INVERTED</code> 和<code translate="no">AUTOINDEX</code> 仍受支持，但全对象 JSON 索引自 Milvus 3.0.0 起已弃用。</p></li>
</ul>
<h3 id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">如果查询的过滤表达式使用的类型与索引的转换类型不同，会发生什么情况？<button data-href="#What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>如果您的过滤表达式使用的类型与索引的<code translate="no">json_cast_type</code> 不同，Milvus 将不会使用该索引，并在数据允许的情况下可能回退到较慢的暴力扫描。 为获得最佳性能，请始终确保过滤表达式与索引的转换类型保持一致。例如，如果创建了一个数值索引，其转换类型为 `<code translate="no">json_cast_type=&quot;DOUBLE&quot;</code>`，则只有数值类型的过滤条件才能利用该索引。</p>
<h3 id="What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="common-anchor-header">如果 JSON 键在不同实体中的数据类型不一致，会怎样？<button data-href="#What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="anchor-icon" translate="no">
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
    </button></h3><p>类型不一致可能会导致<strong>部分索引</strong>。例如，如果<code translate="no">metadata[&quot;price&quot;]</code> 同时以数字（<code translate="no">99.99</code> ）和字符串（<code translate="no">&quot;99.99&quot;</code> ）形式存储，而您使用<code translate="no">json_cast_type=&quot;DOUBLE&quot;</code> 创建索引，则只有数值会被索引。字符串形式的条目将被跳过，且不会出现在过滤结果中。 请在建立索引时使用 `<code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> ` 将字符串转换为数字，或者修正源数据，确保所有条目都采用同一数据类型。</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-key" class="common-anchor-header">我可以在同一个 JSON 键上创建多个索引吗？<button data-href="#Can-I-create-multiple-indexes-on-the-same-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>不可以。Milvus 允许每个<code translate="no">(field, json_path)</code> 对最多创建一个索引，无论转换类型或索引类型如何。 您无法在同一路径上同时创建<code translate="no">INVERTED</code> 和<code translate="no">BITMAP</code> 索引，也不能在同一路径上创建两个具有不同转换类型的索引。不过，您可以为整个JSON对象创建一个索引，并为该对象内的嵌套键创建另一个索引，因为它们属于不同的路径。</p>
<h3 id="How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="common-anchor-header">如何调整 AUTOINDEX 的 BITMAP 与 STL_SORT 阈值？<button data-href="#How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="anchor-icon" translate="no">
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
    </button></h3><p>默认情况下，当索引值的<strong>唯一值不超过 100 个时</strong>，<code translate="no">AUTOINDEX</code> 会选择<code translate="no">BITMAP</code> ；否则选择<code translate="no">STL_SORT</code> 。您可以通过在索引参数中添加<code translate="no">&quot;bitmap_cardinality_limit&quot;</code> 来覆盖此阈值（范围：1-1000）：</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># use BITMAP up to 200 distinct values</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>大多数用户无需调整此设置。若您希望对Cardinal度适中的字段使用位图索引，请提高该阈值；若希望更早地将<code translate="no">AUTOINDEX</code> 转换为<code translate="no">STL_SORT</code> ，请降低该阈值。当您显式指定<code translate="no">INVERTED</code> 、<code translate="no">STL_SORT</code> 或<code translate="no">BITMAP</code> 时，此设置将被忽略。</p>
