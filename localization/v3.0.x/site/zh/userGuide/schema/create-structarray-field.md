---
id: create-structarray-field.md
title: 创建 StructArray 字段
summary: >-
  当某个实体需要包含一个有序的结构化元素列表时，应创建一个 StructArray 字段。StructArray 字段是一种数组字段，其元素类型为
  Struct。每个 Struct 元素遵循相同的 Schema，可以包含标量子字段、向量字段，或两者兼有。
---
<h1 id="Create-a-StructArray-Field" class="common-anchor-header">创建 StructArray 字段<button data-href="#Create-a-StructArray-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>当某个实体需要包含一个有序的结构化元素列表时，请创建一个 StructArray 字段。StructArray 字段是一种数组字段，其元素类型为 Struct。每个 Struct 元素遵循相同的 Schema，可以包含标量子字段、向量字段，或两者兼有。</p>
<p>本页面将介绍如何定义 Schema、将其添加为 StructArray 字段、选择用于后续搜索和过滤的子字段，以及在插入或索引数据之前了解适用的 Schema 规则。</p>
<h2 id="Before-you-begin" class="common-anchor-header">开始之前<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>本页面使用名为<code translate="no">tech_articles</code> 的Collection。每个实体代表一篇技术文章，而<code translate="no">chunks</code> 字段将以Struct元素的形式存储块级数据。</p>
<table>
<thead>
<tr><th>字段</th><th>类型</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">doc_id</code></td><td><code translate="no">INT64</code></td><td>文章的主键。</td></tr>
<tr><td><code translate="no">title</code></td><td><code translate="no">VARCHAR</code></td><td>文章标题。</td></tr>
<tr><td><code translate="no">category</code></td><td><code translate="no">VARCHAR</code></td><td>文章级别的分类。</td></tr>
<tr><td><code translate="no">title_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>文章级向量字段，将在后面的混合搜索示例中使用。</td></tr>
<tr><td><code translate="no">chunks</code></td><td><code translate="no">ARRAY</code></td><td>用于存储片段级文本、元数据和 Embeddings 的 StructArray 字段。</td></tr>
</tbody>
</table>
<p><code translate="no">chunks</code> StructArray 字段包含以下子字段。</p>
<table>
<thead>
<tr><th>子字段</th><th>类型</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">text</code></td><td><code translate="no">VARCHAR</code></td><td>块文本。</td></tr>
<tr><td><code translate="no">section</code></td><td><code translate="no">VARCHAR</code></td><td>章节名称，例如<code translate="no">index</code> 、<code translate="no">search</code> 或<code translate="no">filter</code> 。</td></tr>
<tr><td><code translate="no">page</code></td><td><code translate="no">INT64</code></td><td>片段的页码或逻辑位置。</td></tr>
<tr><td><code translate="no">quality_score</code></td><td><code translate="no">FLOAT</code></td><td>在标量过滤和范围示例中使用的片段级评分。</td></tr>
<tr><td><code translate="no">has_code</code></td><td><code translate="no">BOOL</code></td><td>该片段是否包含代码。</td></tr>
<tr><td><code translate="no">emb_list_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>用于使用<code translate="no">MAX_SIM*</code> 度量进行 EmbeddingList 搜索的向量字段。</td></tr>
<tr><td><code translate="no">emb</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>用于常规向量指标下元素级搜索的向量子字段。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>向量字段或向量子字段仅接受一个索引。如果您同时需要 EmbeddingList 搜索和元素级搜索，请定义两个独立的向量子字段。在此示例中，<code translate="no">chunks[emb_list_vector]</code> 用于 EmbeddingList 搜索，<code translate="no">chunks[emb]</code> 用于元素级搜索。</p>
</div>
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
    </button></h2><p>StructArray 字段为每个 Struct 子字段存储一个数组值。定义 Struct Schema 时，请从支持的标量和向量类型家族中选择子字段类型。</p>
<table>
<thead>
<tr><th>Struct 子字段的物理类型</th><th>支持</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.BOOL</code> 。</td></tr>
<tr><td><code translate="no">Array</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.INT8</code> 、<code translate="no">DataType.INT16</code> 、<code translate="no">DataType.INT32</code> 或<code translate="no">DataType.INT64</code> 。</td></tr>
<tr><td><code translate="no">Array</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.FLOAT</code> 或<code translate="no">DataType.DOUBLE</code> 。</td></tr>
<tr><td><code translate="no">Array</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.VARCHAR</code> ，并设置<code translate="no">max_length</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.FLOAT_VECTOR</code> ，并设置<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.FLOAT16_VECTOR</code> ，并设置<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.BFLOAT16_VECTOR</code> ，并设置<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.INT8_VECTOR</code> ，并设置<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支持</td><td>将子字段定义为<code translate="no">DataType.BINARY_VECTOR</code> ，并将<code translate="no">dim</code> 设置为。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>不支持</td><td>StructArray 字段不支持稀疏向量子场。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支持</td><td>请使用 `<code translate="no">VARCHAR</code>`，而非 `<code translate="no">String</code>`。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支持</td><td>StructArray 字段不支持 JSON 子字段。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支持</td><td>StructArray 字段不支持几何子字段和 GIS 函数。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支持</td><td>StructArray 字段不支持文本子字段。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支持</td><td>StructArray 字段不支持 Timestamptz 子字段和特定时间的表达式。</td></tr>
<tr><td>嵌套的<code translate="no">Array</code> 、<code translate="no">ArrayOfVector</code> 、<code translate="no">Struct</code> 或<code translate="no">ArrayOfStruct</code></td><td>不支持</td><td>StructArray 字段不能包含嵌套数组、嵌套向量数组、嵌套 Struct 字段或嵌套 Array-of-Struct 字段。</td></tr>
</tbody>
</table>
<p>有关特定版本的支持、可为空行为和其他限制，请参阅<a href="/docs/zh/structarray-limits.md">StructArray 限制</a>。</p>
<h2 id="Create-a-collection-with-a-StructArray-field" class="common-anchor-header">创建包含 StructArray 字段的 Collection<button data-href="#Create-a-collection-with-a-StructArray-field" class="anchor-icon" translate="no">
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
    </button></h2><p>要创建 StructArray 字段，首先需定义每个元素所使用的 Struct Schema。然后添加一个 Array 字段，并将该字段的元素类型设置为 Struct。</p>
<ol>
<li><p>创建Collection Schema。</p></li>
<li><p>添加Collection级字段，例如主键和文章级字段。</p></li>
<li><p>为存储在 StructArray 字段中的元素创建 Struct Schema。</p></li>
<li><p>向 Struct Schema 添加标量和向量字段。</p></li>
<li><p>添加一个使用<code translate="no">element_type=DataType.STRUCT</code> 的Array字段。</p></li>
<li><p>将<code translate="no">struct_schema</code> 设置为Struct Schema。</p></li>
<li><p>设置<code translate="no">max_capacity</code> 以限制每个实体可以在该字段中存储的Struct元素数量。</p></li>
</ol>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">False</span>,
)

<span class="hljs-comment"># Collection-level fields.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Struct schema used by each element in the StructArray field.</span>
chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)

<span class="hljs-comment"># Vector subfield for EmbeddingList search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Vector subfield for element-level search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Add the StructArray field.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    schema=schema,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Understand-StructArray-field-paths" class="common-anchor-header">了解 StructArray 字段路径<button data-href="#Understand-StructArray-field-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>创建 StructArray 字段后，请使用<code translate="no">structArray[subfield]</code> 路径语法引用其子字段。在创建索引、搜索向量字段、输出子字段或构建标量过滤器时，请使用此语法。</p>
<table>
<thead>
<tr><th>路径</th><th>含义</th><th>常见用法</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[text]</code></td><td><code translate="no">text</code> 子字段位于每个 Struct 元素内部。</td><td>输出字段或标量过滤。</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td>每个数据块的段标签。</td><td>标量过滤。</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td>块级质量评分。</td><td>标量过滤或标量索引。</td></tr>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td>用作嵌入列表的向量字段。</td><td>使用<code translate="no">MAX_SIM*</code> 进行EmbeddingList搜索。</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td>每个 Struct 元素独立使用的向量字段。</td><td>元素级向量搜索。</td></tr>
</tbody>
</table>
<h2 id="Make-a-StructArray-field-nullable" class="common-anchor-header">使 StructArray 字段可为空<button data-href="#Make-a-StructArray-field-nullable" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x 支持可空的 StructArray 字段。可空的 StructArray 字段允许实体为整个 StructArray 字段存储 `<code translate="no">null</code> `。</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>警告
可空的 StructArray 字段仅在 Milvus v3.0.x 中可用。对于可空的 StructArray 字段，实体可以提供有效的 StructArray 值，也可以将整个字段设置为 `<code translate="no">null</code>`。插入有效的 StructArray 值时，所有子字段应为空或具有有效值。 若插入的实体中部分子字段设为 null 而其他子字段设为有效值，将导致错误。详情请参阅<a href="/docs/zh/structarray-limits.md">StructArray 限制</a>。</p>
</div>
<h2 id="Add-a-StructArray-field-to-an-existing-collection" class="common-anchor-header">向现有 Collection 添加 StructArray 字段<button data-href="#Add-a-StructArray-field-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x 支持向现有 Collection 添加 StructArray 字段。所添加的 StructArray 字段必须为可为空的，因为 Collection 中已存在的实体不具备该新字段的值。</p>
<p>要向现有 Collection 添加 StructArray 字段，请先定义 Struct Schema。然后调用 `<code translate="no">add_collection_struct_field()</code> ` 并设置 `<code translate="no">nullable=True</code>`。</p>
<pre><code translate="no" class="language-python">chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>添加 StructArray 字段后，现有实体会返回该新字段及其所有子字段的 `<code translate="no">null</code> ` 值。</p>
<p>StructArray字段创建后，无法向该现有StructArray字段添加新的子字段。如果后续需要额外的元素属性，请调用<code translate="no">drop_collection_field()</code> 删除该StructArray字段，然后使用更新的Struct Schema添加一个新的StructArray字段。</p>
<pre><code translate="no" class="language-python">client.drop_collection_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=updated_chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Schema-rules" class="common-anchor-header">Schema规则<button data-href="#Schema-rules" class="anchor-icon" translate="no">
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
<tr><th>规则</th><th>说明</th></tr>
</thead>
<tbody>
<tr><td>将 Struct 用作 Array 元素类型。</td><td>使用<code translate="no">element_type=STRUCT</code> 将 StructArray 字段创建为数组字段。请勿将 Struct 作为顶级 Collection 字段创建。</td></tr>
<tr><td>所有元素共享一个Schema。</td><td>同一 StructArray 字段中的每个 Struct 元素均遵循为该字段定义的 Struct Schema。</td></tr>
<tr><td><code translate="no">max_capacity</code> 是必需的。</td><td>它限制了每个实体可以在 StructArray 字段中存储的 Struct 元素的数量。</td></tr>
<tr><td>只允许使用受支持的子字段类型。</td><td>请使用 StructArray 支持的标量和向量字段类型。请勿定义 JSON、Geometry、Text、Timestamptz、SparseFloatVector 或嵌套的 Struct / Array 子字段。</td></tr>
<tr><td>向量字段需要建立索引，以便进行搜索。</td><td>在运行向量搜索之前，请在诸如<code translate="no">chunks[emb_list_vector]</code> 或<code translate="no">chunks[emb]</code> 之类的路径上创建索引。</td></tr>
<tr><td>一个向量量子字段对应一个索引。</td><td>如果您同时需要 EmbeddingList 搜索和元素级搜索，请创建两个独立的向量子字段。</td></tr>
<tr><td>现有的 StructArray 子字段是固定的。</td><td>创建 StructArray 字段后，请勿期望向该 StructArray 字段添加更多子字段。</td></tr>
<tr><td>Struct 内部不支持函数。</td><td>请勿在 StructArray 字段内的字段或子字段中定义函数。</td></tr>
<tr><td>标量子字段应符合过滤需求。</td><td>仅当您需要在稍后对<code translate="no">section</code> 、<code translate="no">quality_score</code> 或<code translate="no">has_code</code> 等字段进行过滤、分组或输出时，才应添加这些字段。</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">常见错误<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>将<code translate="no">DataType.STRUCT</code> 作为顶级Collection字段创建，而不是将其用作Array字段的元素类型。</p></li>
<li><p>忘记在 StructArray 字段上设置<code translate="no">max_capacity</code> 。</p></li>
<li><p>定义了不受支持的子字段类型，例如 JSON、Geometry、Text、Timestamptz、SparseFloatVector、嵌套 Array、嵌套 Struct 或 Array-of-Struct。</p></li>
<li><p>将<code translate="no">String</code> 用作子字段类型。请使用<code translate="no">VARCHAR</code> 并设置<code translate="no">max_length</code> 。</p></li>
<li><p>将同一个向量子字段同时用于 EmbeddingList 搜索和元素级搜索。</p></li>
<li><p>仅添加向量子字段，而忽略用于过滤所需的标量子字段，例如<code translate="no">section</code> 、<code translate="no">quality_score</code> 或<code translate="no">has_code</code> 。</p></li>
<li><p>将向量字段视为<code translate="no">$[...]</code> 的标量谓词输入。使用向量字段进行向量搜索，使用标量子字段进行标量谓词搜索。</p></li>
<li><p>假设在 StructArray 字段创建后，可以向该字段添加新的子字段。</p></li>
<li><p>使用<code translate="no">chunks.emb</code> 或<code translate="no">chunks.emb_list_vector</code> 代替必需的路径语法<code translate="no">chunks[emb]</code> 或<code translate="no">chunks[emb_list_vector]</code> 。</p></li>
<li><p>将可为空的 StructArray 行为视为在每个目标版本中均可用。</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">后续步骤<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><p>要将嵌套数据插入 StructArray 字段，请参阅<a href="/docs/zh/insert-data-into-structarray-fields.md">《将数据插入 StructArray 字段</a>》。</p></li>
<li><p>要创建向量和标量索引，请参阅《<a href="/docs/zh/index-structarray-fields.md">索引 StructArray 字段</a>》。</p></li>
<li><p>要搜索 StructArray 向量子字段，请参阅《使用 StructArray 进行基本向量搜索》。</p></li>
<li><p>要了解受支持的数据类型、可为空行为以及特定版本的限制，请参阅《<a href="/docs/zh/structarray-limits.md">StructArray 限制》</a>。</p></li>
</ol>
