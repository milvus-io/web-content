---
id: structarray-limits.md
title: StructArray 限制
summary: >-
  StructArray 的支持范围涵盖 Schema 定义、插入有效载荷、索引、搜索模式以及 StructArray 专用的过滤器。在生产环境中依赖
  StructArray 的行为之前，请将本页面作为限制参考。
---
<h1 id="StructArray-Limits" class="common-anchor-header">StructArray 限制<button data-href="#StructArray-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>StructArray 的支持范围涵盖 Schema 定义、插入有效载荷、索引、搜索模式以及 StructArray 专用的过滤器。在生产环境中依赖 StructArray 的行为之前，请将本页面作为限制参考。</p>
<p>大多数 StructArray 限制源自以下三个方面之一：StructArray 模式模型、您为向量字段选择的搜索模式，以及您的 Collection 所运行的 Milvus 版本。</p>
<h2 id="Limits-at-a-glance" class="common-anchor-header">限制一览<button data-href="#Limits-at-a-glance" class="anchor-icon" translate="no">
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
<tr><th>领域</th><th>限制</th></tr>
</thead>
<tbody>
<tr><td>Schema结构</td><td>Struct 只能用作 Array 字段的元素类型。不支持将 Struct 用作顶级 Collection 字段。</td></tr>
<tr><td>子字段Schema</td><td>同一 StructArray 字段中的所有 Struct 元素共享一个预定义的 Struct Schema。</td></tr>
<tr><td>容量</td><td><code translate="no">max_capacity</code> 是必填字段，用于限制一个实体在 StructArray 字段中可存储的 Struct 元素数量。</td></tr>
<tr><td>子字段更改</td><td>StructArray 字段创建后，无法向该现有 StructArray 字段添加子字段。</td></tr>
<tr><td>子字段路径</td><td>请使用<code translate="no">structArray[subfield]</code> 路径（例如<code translate="no">chunks[emb]</code> ）作为索引、搜索目标、输出字段和过滤器。请勿使用<code translate="no">chunks.emb</code> 。</td></tr>
<tr><td>插入结构</td><td>将 StructArray 字段作为对象数组插入。请勿在插入有效载荷中使用路径语法。</td></tr>
<tr><td>向量索引</td><td>向量字段或向量子字段仅接受一个索引。请分别使用独立的向量子字段进行 EmbeddingList 搜索和元素级搜索。</td></tr>
<tr><td>函数</td><td>StructArray 字段内的字段或子字段不支持字段函数。</td></tr>
<tr><td>可为空字段</td><td>可为空的 StructArray 字段受版本限制。当受支持时，空值适用于整个 StructArray 字段，而非独立作用于单个 Struct 元素。</td></tr>
<tr><td>动态添加字段</td><td>向现有 Collection 添加 StructArray 字段受版本限制，且要求所添加的字段为可空字段。</td></tr>
</tbody>
</table>
<h2 id="Schema-limits" class="common-anchor-header">Schema限制<button data-href="#Schema-limits" class="anchor-icon" translate="no">
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
<tr><th>限制</th><th>详细信息</th></tr>
</thead>
<tbody>
<tr><td>Struct 不是顶级字段类型。</td><td>将 StructArray 字段创建为<code translate="no">datatype=DataType.ARRAY</code> ，其<code translate="no">element_type=DataType.STRUCT</code> 和<code translate="no">struct_schema</code> 。</td></tr>
<tr><td>所有元素共享一个Schema。</td><td>StructArray 字段中的每个 Struct 元素都遵循相同的子字段列表和子字段数据类型。</td></tr>
<tr><td><code translate="no">max_capacity</code> 是必需的。</td><td>一个实体中的 Struct 元素数量不得超过为 StructArray 字段配置的<code translate="no">max_capacity</code> 。</td></tr>
<tr><td>现有的子字段是固定的。</td><td>您无法将新子字段追加到现有的 StructArray 字段中。要更改子字段 Schema，请删除 StructArray 字段，然后使用更新的 Schema 重新添加该字段。</td></tr>
<tr><td>不支持嵌套的 StructArray。</td><td>StructArray 字段不能包含嵌套的<code translate="no">Array</code> 、<code translate="no">ArrayOfVector</code> 、<code translate="no">Struct</code> 或<code translate="no">ArrayOfStruct</code> 子字段。</td></tr>
<tr><td>StructArray内部不支持函数。</td><td>请勿为 StructArray 字段或其子字段定义字段函数。</td></tr>
</tbody>
</table>
<p>有关 Schema 创建示例，请参阅<a href="/docs/zh/create-structarray-field.md">“创建 StructArray 字段”</a>。</p>
<h2 id="Supported-subfield-data-types" class="common-anchor-header">支持的子字段数据类型<button data-href="#Supported-subfield-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 子字段映射到物理数组风格的存储。下表列出了受支持和不受支持的物理类型。</p>
<table>
<thead>
<tr><th>Struct 子字段的物理类型</th><th>支持</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>支持</td><td>将子字段定义为<code translate="no">DataType.BOOL</code> 。</td></tr>
<tr><td><code translate="no">Array</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.INT8</code> 、<code translate="no">DataType.INT16</code> 、<code translate="no">DataType.INT32</code> 或<code translate="no">DataType.INT64</code> 。</td></tr>
<tr><td><code translate="no">Array</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.FLOAT</code> 或<code translate="no">DataType.DOUBLE</code> 。</td></tr>
<tr><td><code translate="no">Array</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.VARCHAR</code> ，并设置<code translate="no">max_length</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.FLOAT_VECTOR</code> ，并设置<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.FLOAT16_VECTOR</code> ，并设置<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.BFLOAT16_VECTOR</code> ，并设置<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.INT8_VECTOR</code> ，并设置<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.BINARY_VECTOR</code> ，并设置<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>不支持</td><td>StructArray 字段不支持稀疏向量子场。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支持</td><td>请使用 `<code translate="no">VARCHAR</code>`，而非 `<code translate="no">String</code>`。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支持</td><td>StructArray 字段不支持 JSON 子字段。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支持</td><td>StructArray 字段不支持几何子字段和 GIS 函数。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支持</td><td>StructArray 字段不支持文本子字段。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支持</td><td>StructArray 字段不支持 Timestamptz 子字段和特定时间的表达式。</td></tr>
<tr><td>嵌套的<code translate="no">Array</code> 、<code translate="no">ArrayOfVector</code> 、<code translate="no">Struct</code> 或<code translate="no">ArrayOfStruct</code></td><td>不支持</td><td>StructArray 字段不支持嵌套的 array、向量-array、Struct 或 Array-of-Struct 子字段。</td></tr>
</tbody>
</table>
<h2 id="Nullable-and-dynamic-schema-limits" class="common-anchor-header">可为空和动态Schema限制<button data-href="#Nullable-and-dynamic-schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>可为空的 StructArray 行为和动态 StructArray 字段添加受版本限制。</p>
<table>
<thead>
<tr><th>功能</th><th>限制</th></tr>
</thead>
<tbody>
<tr><td>可空 StructArray 字段</td><td>仅在包含可空 StructArray 和可空向量数组支持的版本中受支持。</td></tr>
<tr><td>Python 中的空值</td><td>请使用 `<code translate="no">None</code> ` 在 Python 中插入空的 StructArray 值。请勿使用 `<code translate="no">Null</code> ` 或 `<code translate="no">null</code>`。</td></tr>
<tr><td>空值作用域</td><td>空值适用于整个 StructArray 字段。例如，<code translate="no">chunks=None</code> 仅在<code translate="no">chunks</code> 可为空时才有效。</td></tr>
<tr><td>部分为空的 StructArray 值</td><td>当 StructArray 字段包含一个有效的数组值时，请勿在同一值中将可为空的子字段数组与有效的子字段数组混合使用。</td></tr>
<tr><td>动态添加 StructArray 字段</td><td>仅在支持动态 StructArray 字段的版本中，才支持向现有 Collection 中添加 StructArray 字段。</td></tr>
<tr><td>动态添加的空值要求</td><td>添加到现有 Collection 中的 StructArray 字段必须为可空，因为现有实体对于该新字段尚无值。</td></tr>
<tr><td>动态添加后的现有实体</td><td>现有实体对其新增的 StructArray 字段及其所有子字段均返回 `<code translate="no">null</code> `。</td></tr>
</tbody>
</table>
<p>在 Milvus v3.0.x 中，支持可空的 StructArray 字段、可空的向量数组以及动态添加 StructArray 字段。</p>
<p>有关可为空 StructArray 字段的插入示例，请参阅《<a href="/docs/zh/insert-data-into-structarray-fields.md">将数据插入 StructArray 字段》</a>。</p>
<h2 id="Insert-limits" class="common-anchor-header">插入限制<button data-href="#Insert-limits" class="anchor-icon" translate="no">
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
<tr><th>限制</th><th>详细信息</th></tr>
</thead>
<tbody>
<tr><td>有效载荷形状</td><td>将 StructArray 字段作为 Struct 对象的数组插入，例如<code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code> 。</td></tr>
<tr><td>子字段名称</td><td>在每个 Struct 对象内部，请使用子字段名称（例如<code translate="no">text</code> 和<code translate="no">emb</code> ），而不是路径（例如<code translate="no">chunks[text]</code> ）。</td></tr>
<tr><td>Schema对齐</td><td>每个 Struct 元素必须与 Struct Schema 相匹配。</td></tr>
<tr><td>容量</td><td>一个实体中的 Struct 元素数量不得超过<code translate="no">max_capacity</code> 。</td></tr>
<tr><td>向量维度</td><td>向量值必须与为其向量子字段配置的<code translate="no">dim</code> 相匹配。</td></tr>
<tr><td>搜索模式重复</td><td>如果您同时需要 EmbeddingList 搜索和元素级搜索，请将向量写入两个独立的向量子字段。</td></tr>
</tbody>
</table>
<h2 id="Index-and-metric-limits" class="common-anchor-header">索引和度量限制<button data-href="#Index-and-metric-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 向量子字段可针对 EmbeddingList 搜索或元素级搜索进行索引。同一个向量子字段不能同时使用这两种度量家族，因为每个向量字段或向量子字段仅接受一种索引。</p>
<table>
<thead>
<tr><th>搜索模式</th><th>度量族</th><th>结果级别</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList 搜索</td><td><code translate="no">MAX_SIM</code>、<code translate="no">MAX_SIM_COSINE</code> 、<code translate="no">MAX_SIM_IP</code> 、<code translate="no">MAX_SIM_L2</code> 或二进制<code translate="no">MAX_SIM_*</code> 度量</td><td>实体级结果。</td></tr>
<tr><td>元素级搜索</td><td>常规向量指标，例如<code translate="no">L2</code> 、<code translate="no">IP</code> 、<code translate="no">COSINE</code> 、<code translate="no">HAMMING</code> 或<code translate="no">JACCARD</code></td><td>可包含匹配元素偏移量的元素级结果。</td></tr>
</tbody>
</table>
<p>当需要同时使用这两种模式时，请使用独立的向量字段。例如，使用<code translate="no">chunks[emb_list_vector]</code> 进行 EmbeddingList 搜索，使用<code translate="no">chunks[emb]</code> 进行元素级搜索。</p>
<p>在规划 Collection 架构时，StructArray 向量字段应计入向量字段的总数。请确保向量字段和向量子字段的总数在目标版本和服务层级的限制范围内。</p>
<p>有关受支持的索引类型和指标类型的矩阵，请参阅《<a href="/docs/zh/index-structarray-fields.md">索引 StructArray 字段</a>》。</p>
<h2 id="Search-limits" class="common-anchor-header">搜索限制<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
<tr><th>搜索行为</th><th>支持与限制</th></tr>
</thead>
<tbody>
<tr><td>基本 EmbeddingList 搜索</td><td>支持对使用<code translate="no">MAX_SIM*</code> 度量进行索引的StructArray向量进行搜索。返回实体级别的结果。</td></tr>
<tr><td>基本元素级搜索</td><td>支持基于常规向量度量进行索引的 StructArray 向量子字段。可返回匹配元素的偏移量。</td></tr>
<tr><td>范围搜索</td><td>根据目标版本的搜索模式以及索引/度量支持情况而定。关于元素级 StructArray 请求中混合搜索范围的行为，请查阅目标版本文档。</td></tr>
<tr><td>分组搜索</td><td>元素级分组搜索可返回偏移量。针对元素级 StructArray 请求的混合搜索分组行为受版本限制。</td></tr>
<tr><td>混合搜索</td><td>混合搜索请求仅在目标版本支持该搜索组合时，才可包含 StructArray 向量子场请求。每个请求仍遵循已建立索引的向量子场所属的度量家族。</td></tr>
<tr><td>偏移量输出</td><td>元素级搜索结果支持偏移量。EmbeddingList 搜索返回实体级结果，且不使用元素偏移量作为主要结果单位。</td></tr>
</tbody>
</table>
<h2 id="Filter-and-operator-limits" class="common-anchor-header">过滤器和操作符限制<button data-href="#Filter-and-operator-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray标量过滤由StructArray操作符处理，例如<code translate="no">element_filter</code> 和<code translate="no">MATCH_*</code> 系列。详细的谓词支持矩阵详见<a href="/docs/zh/struct-array-operators.md">StructArray操作符</a>文档。</p>
<p>总体而言：</p>
<ul>
<li><p>仅在 StructArray 操作符内部使用 `<code translate="no">$[subfield]</code> `。</p></li>
<li><p>请在标量谓词中使用标量子字段。</p></li>
<li><p>请勿将向量字段用作<code translate="no">$[...]</code> 标量谓词的输入。</p></li>
<li><p>StructArray 元素级谓词不支持 JSON 路径语法、JSON 函数、数组容器函数、文本匹配函数、几何/GIS 函数以及 Timestamptz 表达式。</p></li>
<li><p>建议使用显式的布尔比较（如<code translate="no">$[has_code] == true</code> ），而非裸布尔表达式。</p></li>
</ul>
<h2 id="Related-pages" class="common-anchor-header">相关页面<button data-href="#Related-pages" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>要创建 StructArray 字段，请参阅《<a href="/docs/zh/create-structarray-field.md">创建 StructArray 字段》</a>。</p></li>
<li><p>要插入数据，请参阅《<a href="/docs/zh/insert-data-into-structarray-fields.md">将数据插入 StructArray 字段</a>》。</p></li>
<li><p>要创建向量和标量索引，请参阅《<a href="/docs/zh/index-structarray-fields.md">索引 StructArray 字段</a>》。</p></li>
<li><p>要复习 StructArray 过滤器语法，请参阅《<a href="/docs/zh/struct-array-operators.md">StructArray 操作符</a>》。</p></li>
</ol>
