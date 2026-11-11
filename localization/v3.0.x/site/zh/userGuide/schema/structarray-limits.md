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
<p>大多数 StructArray 限制源自以下三个方面之一：StructArray 模式 Schema、您为向量字段选择的搜索模式，以及您的 Collection 所运行的 Milvus 版本。</p>
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
    </button></h2><p>StructArray 的主要限制包括：</p>
<table>
<thead>
<tr><th>领域</th><th>限制</th></tr>
</thead>
<tbody>
<tr><td>Schema结构</td><td>Struct 只能用作数组字段的元素类型。不支持将 Struct 用作顶级 Collection 字段。</td></tr>
<tr><td>子字段Schema</td><td>同一 StructArray 字段中的所有 Struct 元素共享一个预定义的 Struct Schema。</td></tr>
<tr><td>嵌套子字段</td><td>从 Milvus 3.0.6 开始，Struct 可以包含单层嵌套的标量<code translate="no">ARRAY</code> 子字段。任何版本均不支持嵌套的<code translate="no">Struct</code> 、<code translate="no">ArrayOfStruct</code> 和 JSON 子字段。</td></tr>
<tr><td>容量</td><td><code translate="no">max_capacity</code> 是必填字段，用于限制一个实体在 StructArray 字段中可存储的 Struct 元素数量。</td></tr>
<tr><td>子字段更改</td><td>从 Milvus 3.0.6 开始，您可以向现有的 StructArray 字段添加一个允许为空的子字段，或从其中移除一个子字段。早期版本则需要先移除整个 StructArray 字段，然后重新添加。</td></tr>
<tr><td>子字段路径</td><td>请使用<code translate="no">structArray[subfield]</code> 路径（例如<code translate="no">chunks[emb]</code> ），用于索引、搜索目标、输出字段和过滤器。请勿使用<code translate="no">chunks.emb</code> 。</td></tr>
<tr><td>插入形状</td><td>将 StructArray 字段作为对象数组插入。请勿在插入有效载荷中使用路径语法。</td></tr>
<tr><td>向量索引</td><td>向量字段或向量子字段仅接受一个索引。请分别使用独立的向量子字段进行 EmbeddingList 搜索和元素级搜索。</td></tr>
<tr><td>函数</td><td>StructArray 字段内的字段或子字段不支持字段函数。</td></tr>
<tr><td>可为空字段</td><td>可为空的 StructArray 字段受版本限制。行级空值将应用于整个 StructArray 字段。从 Milvus 3.0.6 开始，子字段还可以允许单个 Struct 元素包含空值：对于标量或向量字段，使用 `<code translate="no">nullable=True</code> `；对于数组子字段，使用 `<code translate="no">element_nullable=True</code> `。Struct 元素本身不能为空。</td></tr>
<tr><td>动态添加字段</td><td>向现有 Collection 添加 StructArray 字段受版本限制，且所添加的字段必须为可空。</td></tr>
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
    </button></h2><p>StructArray Schema 具有以下限制：</p>
<table>
<thead>
<tr><th>限制</th><th>详细信息</th></tr>
</thead>
<tbody>
<tr><td>Struct 不能作为顶级字段类型。</td><td>创建一个 StructArray 字段，其定义为 `<code translate="no">datatype=DataType.ARRAY</code> `，并包含 `<code translate="no">element_type=DataType.STRUCT</code> ` 以及 `<code translate="no">struct_schema</code>`。</td></tr>
<tr><td>所有元素共享一个Schema。</td><td>StructArray 字段中的每个 Struct 元素都遵循相同的子字段列表和子字段数据类型。</td></tr>
<tr><td><code translate="no">max_capacity</code> 是必需的。</td><td>一个实体中的 Struct 元素数量不得超过为 StructArray 字段配置的<code translate="no">max_capacity</code> 。</td></tr>
<tr><td>标量<code translate="no">ARRAY</code> 子字段具有每个子字段的<code translate="no">max_capacity</code> 。</td><td>标量<code translate="no">ARRAY</code> 子字段为其内部数组声明<code translate="no">max_capacity</code> ，如果某个Struct元素的内部数组超过该子字段声明的容量，Milvus将拒绝该Struct元素。各子字段的值无需一致。该值必须大于0，且不得超过<code translate="no">proxy.maxArrayCapacity</code> （默认值为4096）。</td></tr>
<tr><td>在 Milvus 3.0.6 及更高版本中，子字段可以演化。</td><td>可通过其路径（例如<code translate="no">chunks[lang]</code> ）添加可为空的子字段，或删除子字段。您无法删除 StructArray 字段的最后一个子字段、Collection 的最后一个向量字段，或函数所使用的子字段。在早期版本中，请先删除该 StructArray 字段，然后使用更新的 Schema 将其重新添加。</td></tr>
<tr><td>不支持嵌套 Struct。</td><td>Struct 不能包含嵌套的<code translate="no">Struct</code> 、<code translate="no">ArrayOfStruct</code> 或 JSON 子字段。从 Milvus 3.0.6 开始，Struct 可以包含具有一层嵌套的标量<code translate="no">ARRAY</code> 子字段。<code translate="no">ARRAY</code> 子字段不能包含向量。</td></tr>
<tr><td>StructArray 内部不支持函数。</td><td>请勿为 StructArray 字段或其子字段定义字段函数。</td></tr>
<tr><td>StructArray 字段的字段属性受到限制。</td><td>从 Milvus 3.0.6 开始，对 StructArray 字段或子字段路径执行的<code translate="no">alter_collection_field()</code> 操作仅接受<code translate="no">mmap.enabled</code> 、<code translate="no">field.description</code> 和<code translate="no">warmup</code> 。其他属性（如<code translate="no">max_capacity</code> 和<code translate="no">max_length</code> ）将被拒绝。</td></tr>
<tr><td>子字段不支持文本分析。</td><td>在 Struct 子字段上设置<code translate="no">enable_match</code> 或<code translate="no">enable_analyzer</code> 将被拒绝。文本索引仅针对顶级字段构建。</td></tr>
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
    </button></h2><p>StructArray 子字段映射到物理数组风格的存储。下表列出了受支持和不受支持的物理类型：</p>
<table>
<thead>
<tr><th>Struct子字段的物理类型</th><th>支持</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array&lt;Bool&gt;</code></td><td>支持</td><td>将子字段定义为<code translate="no">DataType.BOOL</code> 。</td></tr>
<tr><td><code translate="no">Array&lt;Int8/Int16/Int32/Int64&gt;</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.INT8</code> 、<code translate="no">DataType.INT16</code> 、<code translate="no">DataType.INT32</code> 或<code translate="no">DataType.INT64</code> 。</td></tr>
<tr><td><code translate="no">Array&lt;Float/Double&gt;</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.FLOAT</code> 或<code translate="no">DataType.DOUBLE</code> 。</td></tr>
<tr><td><code translate="no">Array&lt;VarChar&gt;</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.VARCHAR</code> ，并设置<code translate="no">max_length</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;FloatVector&gt;</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.FLOAT_VECTOR</code> ，并设置<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Float16Vector&gt;</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.FLOAT16_VECTOR</code> ，并设置<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BFloat16Vector&gt;</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.BFLOAT16_VECTOR</code> ，并设置<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Int8Vector&gt;</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.INT8_VECTOR</code> ，并设置<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BinaryVector&gt;</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.BINARY_VECTOR</code> ，并设置<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;SparseFloatVector&gt;</code></td><td>不支持</td><td>StructArray 字段不支持稀疏向量子场。</td></tr>
<tr><td><code translate="no">Array&lt;String&gt;</code></td><td>不支持</td><td>请使用 `<code translate="no">VARCHAR</code>`，而非 `<code translate="no">String</code>`。</td></tr>
<tr><td><code translate="no">Array&lt;JSON&gt;</code></td><td>不支持</td><td>StructArray 字段不支持 JSON 子字段。</td></tr>
<tr><td><code translate="no">Array&lt;Geometry&gt;</code></td><td>不支持</td><td>StructArray 字段不支持几何子字段和 GIS 函数。</td></tr>
<tr><td><code translate="no">Array&lt;Text&gt;</code></td><td>不支持</td><td>StructArray 字段不支持文本子字段。</td></tr>
<tr><td><code translate="no">Array&lt;Timestamptz&gt;</code></td><td>不支持</td><td>StructArray 字段不支持 Timestamptz 子字段和特定时间的表达式。</td></tr>
<tr><td><code translate="no">Array&lt;Array&gt;</code></td><td>在 Milvus 3.0.6 及更高版本中受支持</td><td>将子字段定义为<code translate="no">DataType.ARRAY</code> ，其中包含标量<code translate="no">element_type</code> ，并为内部数组设置<code translate="no">max_capacity</code> 。这样，每个Struct元素便包含一个内部数组。将该子字段的<code translate="no">nullable=True</code> 设置为允许空内部数组，并将<code translate="no">element_nullable=True</code> 设置为允许内部包含空值。</td></tr>
<tr><td><code translate="no">Array</code> <code translate="no">Array</code> 、 、 、向量、 ，或<code translate="no">Array</code> <code translate="no">Array</code> <code translate="no">Struct</code> <code translate="no">ArrayOfStruct</code></td><td>不支持</td><td>结构体内的数组嵌套仅限一层，内部数组不能包含向量，且不支持嵌套的结构体或数组-结构体子字段。</td></tr>
</tbody>
</table>
<h2 id="Nullable-and-dynamic-schema-limits" class="common-anchor-header">可为空和动态Schema的限制<button data-href="#Nullable-and-dynamic-schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>下表描述了可空 StructArray 的行为以及动态 StructArray 字段的添加，但须遵守下方的可用性声明：</p>
<table>
<thead>
<tr><th>功能</th><th>限制</th></tr>
</thead>
<tbody>
<tr><td>可空 StructArray 字段</td><td>在遵守以下可用性声明的前提下，请在 StructArray 父对象上设置 `<code translate="no">nullable=True</code> `；请勿单独将 Struct 子字段配置为可空。</td></tr>
<tr><td>Python 中的 NULL 值</td><td>在 Python 中，请使用 `<code translate="no">None</code> ` 插入空的 StructArray 值。请勿使用 `<code translate="no">Null</code> ` 或 `<code translate="no">null</code>`。</td></tr>
<tr><td>空值作用域</td><td>NULL 适用于整个 StructArray 字段。例如，<code translate="no">chunks=None</code> 仅在<code translate="no">chunks</code> 可为空时才有效。</td></tr>
<tr><td>部分为空的 StructArray 值</td><td>当 StructArray 字段包含有效的数组值时，请勿在同一值中将空子字段数组与有效的子字段数组混合使用。</td></tr>
<tr><td>元素级空值</td><td>在 Milvus 3.0.6 及更高版本中支持。标量、向量或<code translate="no">ARRAY</code> 子字段可允许其单个 Struct 元素为空值：标量或向量子字段上设置<code translate="no">nullable=True</code> ，<code translate="no">ARRAY</code> 子字段上设置<code translate="no">element_nullable=True</code> 。行级<code translate="no">nullable</code> 设置仍来自 StructArray 父对象；在子字段上设置<code translate="no">nullable=True</code> 仅启用元素级空值，而非行级空值。</td></tr>
<tr><td>Struct 元素为空</td><td>Struct元素本身不能为空，例如<code translate="no">[null, {...}]</code> 。请将该元素的子字段值设置为空。</td></tr>
<tr><td>省略的子字段</td><td>从 Milvus 3.0.6 开始，您可以从 Struct 元素中省略一个允许为空的子字段，Milvus 会为其存储 null 值。不允许为空的子字段必须出现在每个 Struct 元素中。在早期版本中，每个 Struct 元素都必须提供所有子字段。</td></tr>
<tr><td>动态添加 StructArray 字段</td><td>受下文可用性声明的约束。</td></tr>
<tr><td>动态添加的空值要求</td><td>添加到现有 Collection 中的 StructArray 字段必须为可空，因为现有实体对于该新字段尚无值。</td></tr>
<tr><td>动态添加后的现有实体</td><td>现有实体对于已添加的 StructArray 字段将返回 `<code translate="no">null</code> `。</td></tr>
<tr><td>动态添加子字段</td><td>Milvus 3.0.6及更高版本支持此功能。新增子字段必须使用<code translate="no">nullable=True</code> 创建；新增的<code translate="no">ARRAY</code> 子字段还会将内层数组中的空值标记为<code translate="no">element_nullable=True</code> 。现有实体在其每个Struct元素中的新子字段上返回null，而StructArray字段为null的实体仍保持null状态。</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0 及后续版本在独立部署和分布式部署中均支持可为空的 StructArray 字段、可为空的向量数组以及动态添加 StructArray 字段。较早版本的 Milvus 不支持这些功能。</p>
<p>Milvus 3.0.6 及后续版本还支持元素级空值、标量型 `<code translate="no">ARRAY</code> ` 子字段，以及对现有 `StructArray` 字段添加或删除子字段。这些功能需要 Storage V2 支持，且在外部 Collection 中不可用。</p>
<p>在 Zilliz Cloud 中，这些功能可在运行 Milvus 3.0.0 或更高版本的按需集群上使用。服务集群不支持这些功能。</p>
<p>有关可为空的 StructArray 字段的插入示例，请参阅《<a href="/docs/zh/insert-data-into-structarray-fields.md">向 StructArray 字段插入数据</a>》。</p>
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
    </button></h2><p>StructArray 插入有效负载受以下限制：</p>
<table>
<thead>
<tr><th>限制</th><th>详细信息</th></tr>
</thead>
<tbody>
<tr><td>有效载荷形状</td><td>将 StructArray 字段作为 Struct 对象的数组进行插入，例如<code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code> 。</td></tr>
<tr><td>子字段名称</td><td>在每个 Struct 对象内部，请使用子字段名称（例如<code translate="no">text</code> 和<code translate="no">emb</code> ），而不是路径（例如<code translate="no">chunks[text]</code> ）。</td></tr>
<tr><td>Schema对齐</td><td>每个 Struct 元素必须符合 Struct Schema。从 Milvus 3.0.6 开始，Struct 元素中的可为空子字段可以省略，或将其设置为<code translate="no">null</code> 。</td></tr>
<tr><td>容量</td><td>一个实体中的 Struct 元素数量不得超过<code translate="no">max_capacity</code> 。</td></tr>
<tr><td>向量维度</td><td>向量值必须与为其向量子字段配置的<code translate="no">dim</code> 相匹配。</td></tr>
<tr><td>搜索模式的重复</td><td>如果您同时需要 EmbeddingList 搜索和元素级搜索，请将向量写入两个独立的向量子字段中。</td></tr>
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
    </button></h2><p>StructArray 向量子字段可针对 EmbeddingList 搜索或元素级搜索进行索引。同一个向量子字段不能同时使用这两种度量族，因为每个向量字段或向量子字段仅接受一种索引。这些搜索模式使用以下度量族：</p>
<table>
<thead>
<tr><th>搜索模式</th><th>度量族</th><th>结果级别</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList 搜索</td><td><code translate="no">MAX_SIM</code>、<code translate="no">MAX_SIM_COSINE</code> 、<code translate="no">MAX_SIM_IP</code> 、<code translate="no">MAX_SIM_L2</code> 或二进制<code translate="no">MAX_SIM_*</code> 度量</td><td>实体级结果。</td></tr>
<tr><td>元素级搜索</td><td>常规向量指标，例如<code translate="no">L2</code> 、<code translate="no">IP</code> 、<code translate="no">COSINE</code> 、<code translate="no">HAMMING</code> 或<code translate="no">JACCARD</code></td><td>可包含匹配元素偏移量的元素级结果。</td></tr>
</tbody>
</table>
<p>当需要同时使用这两种模式时，请使用单独的向量字段。例如，使用<code translate="no">chunks[emb_list_vector]</code> 进行 EmbeddingList 搜索，使用<code translate="no">chunks[emb]</code> 进行元素级搜索。</p>
<p>StructArray 向量子字段计入 Collection 级限制<code translate="no">proxy.maxVectorFieldNum</code> 的向量字段数量，该限制默认值为 10。如果某个 StructArray 字段的向量子字段是 Collection 中唯一的向量字段，则该字段有效；当删除此类字段会导致 Collection 中没有向量字段时，系统将拒绝删除该字段。 请确保向量字段和向量子字段的总数在目标版本和服务层级的限制范围内。</p>
<p>从 Milvus 3.0.6 开始，元素可为空的向量子字段仅支持使用常规向量指标进行元素级搜索。<code translate="no">MAX_SIM*</code> 指标、EmbeddingList 索引以及 EmbeddingList 搜索在元素可为空的向量子字段上将被拒绝，且<code translate="no">AUTOINDEX</code> 不会为其选择<code translate="no">MAX_SIM*</code> 指标。 空向量不参与搜索。标量索引不支持在允许元素为空的子字段或标量<code translate="no">ARRAY</code> 子字段上使用。</p>
<p>有关受支持的索引类型和度量类型的矩阵，请参阅《<a href="/docs/zh/index-structarray-fields.md">StructArray 字段的索引》</a>。</p>
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
    </button></h2><p>StructArray 的搜索行为存在以下限制：</p>
<table>
<thead>
<tr><th>搜索行为</th><th>支持与限制</th></tr>
</thead>
<tbody>
<tr><td>基本 EmbeddingList 搜索</td><td>支持基于<code translate="no">MAX_SIM*</code> 度量进行索引的StructArray向量。返回实体级别的结果。</td></tr>
<tr><td>基本元素级搜索</td><td>支持在采用常规向量度量作为索引的 StructArray 向量子字段上进行搜索。可返回匹配元素的偏移量。</td></tr>
<tr><td>范围搜索</td><td>根据搜索模式以及目标版本对索引/度量的支持情况而定。关于元素级 StructArray 请求中混合搜索范围的行为，请查阅您的目标版本。</td></tr>
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
    </button></h2><p>StructArray 的标量过滤由 StructArray 操作符处理，例如 `<code translate="no">element_filter</code> ` 和 `<code translate="no">MATCH_*</code> ` 系列。详细的谓词支持矩阵请参见<a href="/docs/zh/struct-array-operators.md">StructArray 操作符部分</a>。</p>
<p>总体而言：</p>
<ul>
<li><p>仅在 StructArray 操作符内部使用 `<code translate="no">$[subfield]</code> `。</p></li>
<li><p>行级过滤表达式也可以直接引用 StructArray 路径：<code translate="no">chunks[0][section]</code> 用于单个元素位置，<code translate="no">array_length(chunks)</code> 用于元素计数，<code translate="no">array_contains(chunks[section], ...)</code> 用于跨元素的子字段值，<code translate="no">chunks is null</code> 用于可为空的 StructArray 字段。</p></li>
<li><p>请使用标量子字段作为标量谓词的输入。</p></li>
<li><p>请勿将向量字段用作<code translate="no">$[...]</code> 标量谓词的输入。</p></li>
</ul>
<ul>
<li>StructArray 元素级谓词不支持 JSON 路径语法、JSON 函数、文本匹配函数、几何/GIS 函数以及 Timestamptz 表达式。从 Milvus 3.0.6 开始，在<code translate="no">$[subfield]</code> 上，<code translate="no">array_contains</code> 、<code translate="no">array_contains_any</code> 、<code translate="no">array_contains_all</code> 和<code translate="no">array_length</code> 适用于标量<code translate="no">ARRAY</code> 子字段，而<code translate="no">$[subfield] is null</code> /<code translate="no">is not null</code> 适用于所有子字段类型。</li>
</ul>
<ul>
<li>从 Milvus 3.0.6 开始，Struct 元素中的子字段值为 null 时，该元素的谓词结果为未知而非 false。<code translate="no">element_filter</code> 仅保留谓词为 true 的元素，而<code translate="no">MATCH_*</code> 将未知元素计为未匹配。详情请参阅<a href="/docs/zh/struct-array-operators.md">StructArray 运算符</a>。</li>
</ul>
<ul>
<li>建议使用显式的布尔比较（如 `<code translate="no">$[has_code] == true</code> `），而非直接使用布尔表达式。</li>
</ul>
<p><a id="Import-limits"></a></p>
<h2 id="Import-and-storage-limits" class="common-anchor-header">导入和存储限制<button data-href="#Import-and-storage-limits" class="anchor-icon" translate="no">
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
<tr><td>源文件格式</td><td>JSON、JSONL、CSV 和 Parquet 文件可以包含 StructArray 字段。NumPy 文件为每个顶级字段仅包含一个文件，且无法提供 StructArray 数据；对于包含 StructArray 字段的 Collection，请使用 JSON、CSV 或 Parquet 文件。有关文件形状的信息，请参阅<a href="/docs/zh/prepare-source-data.md#StructArray-fields-in-source-files">“准备源数据”</a>。</td></tr>
<tr><td>存储格式</td><td><code translate="no">ARRAY</code> 允许元素为空的子字段以及标量<code translate="no">ARRAY</code> 子字段需要使用Storage V2。对于使用这些子字段的Collection，Storage V1无法正常处理：创建Collection和插入数据时看似成功，但在刷新时数据会失败，这属于不受支持的状态。 当<code translate="no">common.storage.enableGrowingSourceFlush</code> 设置为<code translate="no">true</code> 时，Storage V3会拒绝使用元素可为空子字段或标量 子字段的请求。</td></tr>
<tr><td>External Collections</td><td>外部 Collection 不支持元素可为空的子字段和标量<code translate="no">ARRAY</code> 子字段。</td></tr>
<tr><td>备份和快照导入</td><td>对于包含元素可为空子字段或标量<code translate="no">ARRAY</code> 子字段的 Collection，将拒绝二进制日志导入（例如备份还原）和快照源导入。</td></tr>
<tr><td>降级</td><td>包含元素可为空子字段或标量<code translate="no">ARRAY</code> 子字段的Collections无法在Milvus 3.0.6之前的版本上运行。在旧版本上重放写入前日志会导致系统崩溃。重新升级至Milvus 3.0.6或更高版本可恢复数据。</td></tr>
</tbody>
</table>
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
<li><p>要创建向量和标量索引，请参阅《为<a href="/docs/zh/index-structarray-fields.md">StructArray 字段建立索引</a>》。</p></li>
<li><p>要查看 StructArray 过滤器语法，请参阅《<a href="/docs/zh/struct-array-operators.md">StructArray 操作符</a>》。</p></li>
</ol>
