---
id: add-fields-to-an-existing-collection.md
title: 修改Collection Schema
summary: 通过添加或删除标量字段、向量字段以及由函数生成的向量字段，来修改现有 Collection Schema，而无需重新创建该 Collection。
---
<h1 id="Alter-Collection-Schema" class="common-anchor-header">修改Collection Schema<button data-href="#Alter-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>当Collection从开发环境迁移到生产环境时，每个实体周围的字段通常会发生变化。 您可能会添加用于过滤和应用逻辑的标量字段（如<code translate="no">source_uri</code> 或<code translate="no">review_status</code> ），为应用程序生成的Embeddings添加新的向量字段，为对现有文本进行词汇搜索而添加由BM25生成的稀疏向量字段，或者移除不再使用的字段。“修改Schema”功能允许您就地进行受支持的字段更改，而无需重新创建Collection。</p>
<div class="alert note">
<p>本指南涵盖托管 Collection 中的字段级 Schema 更改，包括用户定义字段和由函数生成的向量字段。若要向外部 Collection 添加字段，请参阅<a href="/docs/zh/alter-external-collection-schema.md">“修改外部 Collection Schema”</a>。对于字段属性更改（例如，更改<code translate="no">VARCHAR</code> 字段的<code translate="no">max_length</code> 或<code translate="no">ARRAY</code> 字段的<code translate="no">max_capacity</code> ），请参阅<a href="/docs/zh/alter-collection-field.md">“修改 Collection 字段”</a>。 有关动态字段行为，请参阅<a href="/docs/zh/enable-dynamic-field.md">“Dynamic Field</a>”和<a href="/docs/zh/modify-collection.md">“修改Collection”</a>。</p>
</div>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>添加用户定义字段</strong></p>
<ul>
<li><p>添加的用户定义字段必须允许为空。在调用<code translate="no">add_collection_field()</code> 时，请设置<code translate="no">nullable=True</code> 。对于现有实体，除非您添加的是带有<code translate="no">default_value</code> 的标量字段，否则新增字段的类型默认为<code translate="no">NULL</code> 。</p></li>
<li><p>Milvus 2.6.x 及更高版本支持添加用户定义的标量字段。Milvus 2.6.18 及更高版本支持添加用户定义的向量字段。</p></li>
<li><p>Milvus 3.0.0 及更高版本支持添加 StructArray 字段。添加的 StructArray 字段必须为可空类型。</p></li>
<li><p>字段名称在Collection中的所有字段中必须是唯一的。</p></li>
</ul>
<p><strong>添加由函数生成的向量字段</strong></p>
<ul>
<li><p>每次Schema更新只能添加一个函数和一个生成的向量字段。</p></li>
<li><p>支持的函数决定了生成的向量字段类型：<code translate="no">BM25</code> 生成一个<code translate="no">SPARSE_FLOAT_VECTOR</code> 字段，而<code translate="no">MINHASH</code> 生成一个<code translate="no">BINARY_VECTOR</code> 字段。</p></li>
<li><p>生成的向量字段必须是新字段。它不能指向Collection Schema中已存在的字段。</p></li>
<li><p>生成的向量字段不能为可空。</p></li>
<li><p>该函数使用的输入字段必须已在Collection中存在。</p></li>
<li><p>将 BM25 或 MinHash 函数添加到现有 Collection 时，该函数的输入必须是<code translate="no">VARCHAR</code> 字段。此工作流不支持<code translate="no">TEXT</code> 输入，因为 Milvus 无法根据该输入类型为现有实体回填生成的输出。</p></li>
</ul>
<p><strong>删除用户定义字段</strong></p>
<ul>
<li><p>您无法删除 Collection 的主键字段、Partition Key 字段、聚簇键字段或最后一个向量字段。</p></li>
<li><p>您可以删除整个<code translate="no">ARRAY&lt;STRUCT&gt;</code> 字段，但无法删除<code translate="no">ARRAY&lt;STRUCT&gt;</code> 字段内的单个子字段。</p></li>
<li><p>您无法直接删除用作函数输入字段或作为函数输出字段生成的字段。要删除函数输出字段，请删除生成该字段的函数。</p></li>
</ul>
<p><strong>删除由函数生成的向量字段</strong></p>
<ul>
<li><p>在此模式更改工作流中，删除函数将同时移除该函数及其生成的输出字段。函数输入字段仍保留在 Collection 模式中。</p></li>
<li><p>如果删除函数的输出字段会导致Collection中不再包含任何向量字段，则删除该函数的操作将被拒绝。</p></li>
</ul>
<div class="alert note">
<p>对于超出支持的添加和删除操作范围的 Schema 变更，请重新创建或迁移该 Collection。</p>
</div>
<h2 id="Add-fields-to-an-existing-collection" class="common-anchor-header">向现有Collection添加字段<button data-href="#Add-fields-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>根据字段值的生成方式选择添加字段的路径：</p>
<ul>
<li><p>当需要用于过滤、查询输出或应用逻辑的新元数据时，<a href="#add-user-defined-scalar-fields--milvus-26x">请添加用户定义的标量字段</a>。</p></li>
<li><p>当需要一个其元素共享相同 Struct Schema 的数组字段时，<a href="#add-structarray-fields--milvus-300">请添加 StructArray 字段</a>。</p></li>
<li><p>当您的应用程序生成 Embeddings 并将向量值写入 Milvus 时，<a href="#add-user-defined-vector-fields--milvus-2618">请添加用户定义的向量字段</a>。</p></li>
<li><p>当 Milvus 需要根据现有字段生成向量值（例如来自文本的 BM25 稀疏向量或 MinHash 签名）时，<a href="#add-vector-fields-generated-by-functions--milvus-30x">请添加由函数生成的向量字段</a>。</p></li>
</ul>
<p>在所有情况下，新字段名称在 Collection 中必须不存在，且字段总数不能超过 Milvus 的字段数量限制。详情请参阅《<a href="/docs/zh/limitations.md#number-of-resources-in-a-collection">Milvus 限制</a>》。</p>
<h3 id="Add-user-defined-scalar-fields--Milvus-26x" class="common-anchor-header">添加用户定义的标量字段<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Add-user-defined-scalar-fields--Milvus-26x" class="anchor-icon" translate="no">
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
    </button></h3><p>使用 `<code translate="no">add_collection_field()</code> ` 将用户定义的标量字段添加到现有 Collection 中。</p>
<p>这与在Dynamic Field中存储任意键不同：在Schema更新生效后，新的标量字段将成为Collection模式的常规组成部分。您可以向其中插入或更新值，在支持的情况下为其创建索引，在查询和搜索过滤器中使用它，并在查询或搜索结果中返回该字段的值。</p>
<p>由于现有实体是在新字段创建之前插入的，因此每个新增的用户定义标量字段都必须允许为空：</p>
<ul>
<li><p>如果您添加的标量字段使用<code translate="no">nullable=True</code> 且未指定<code translate="no">default_value</code> ，现有实体在新字段中将返回<code translate="no">NULL</code> 。</p></li>
<li><p>如果您添加的标量字段同时包含<code translate="no">nullable=True</code> 和<code translate="no">default_value</code> ，现有实体将返回默认值，而非<code translate="no">NULL</code> 。</p></li>
</ul>
<p>标量过滤表达式无法匹配<code translate="no">NULL</code> 标量值。有关详细信息，请参阅<a href="/docs/zh/nullable-and-default.md">“可为空字段”</a>。</p>
<p><strong>示例：添加一个可为空的标量字段</strong></p>
<p>以下示例向名为<code translate="no">product_catalog</code> 的现有 Collection 中添加了一个可为空的<code translate="no">source</code> 字段。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;source&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>添加该字段后，Collection 中已存在的实体在访问<code translate="no">source</code> 时将返回<code translate="no">NULL</code> 。新实体可在插入或更新时将<code translate="no">source</code> 设置为相应值。</p>
<p><strong>示例：添加一个具有默认值的标量字段</strong></p>
<p>如果希望现有实体返回具体值而非 `<code translate="no">NULL</code>`，请在添加标量字段时指定 `<code translate="no">default_value</code> `。以下示例添加了一个 `<code translate="no">review_status</code> ` 字段，并使用 `<code translate="no">&quot;unreviewed&quot;</code> ` 作为默认值。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;review_status&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    default_value=<span class="hljs-string">&quot;unreviewed&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>添加字段后，Collection中已存在的实体在<code translate="no">review_status</code> 字段上将返回<code translate="no">&quot;unreviewed&quot;</code> 。新实体可以设置不同的值，或在未提供值时使用默认值。</p>
<h3 id="Add-StructArray-fields--Milvus-300" class="common-anchor-header">添加 StructArray 字段<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0</span><button data-href="#Add-StructArray-fields--Milvus-300" class="anchor-icon" translate="no">
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
    </button></h3><p>使用 `<code translate="no">add_collection_struct_field()</code> ` 添加一个可接受 Struct 元素数组的 StructArray 字段。要添加 StructArray 字段，请按以下步骤操作：</p>
<ol>
<li><p>创建一个 Struct Schema，其中包含所需的支持数据类型的子字段。有关适用的数据类型，请参阅<a href="/docs/zh/structarray-limits.md#Supported-subfield-data-types">StructArray 限制</a>。</p></li>
<li><p>引用上述创建的 Struct Schema，并在 `<code translate="no">add_collection_struct_field()</code>` 中设置该字段的最大容量。</p></li>
<li><p>在请求中设置 `<code translate="no">nullable=True</code> `。</p></li>
</ol>
<p><strong>示例：添加一个可为空的 StructArray 字段</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a Struct schema.</span>
struct_schema = client.create_struct_field_schema()

<span class="hljs-comment"># Add scalar fields to the Struct.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)

<span class="hljs-comment"># Add vector fields to the Struct with mmap enabled.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line">client.add_collection_struct_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;books&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">    struct_schema=struct_schema,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">1024</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>添加 StructArray 字段后，Collection 中已存在的实体在其所有子字段上返回<code translate="no">NULL</code> 状态，表示<code translate="no">chunks</code> 。插入新实体时，请确保所有子字段要么为<code translate="no">NULL</code> ，要么具有有效值。如果插入的实体中部分子字段设置为<code translate="no">NULL</code> 而其他子字段设置为有效值，将会导致错误。</p>
<h3 id="Add-user-defined-vector-fields--Milvus-2618+" class="common-anchor-header">添加用户定义的向量字段<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.18+</span><button data-href="#Add-user-defined-vector-fields--Milvus-2618+" class="anchor-icon" translate="no">
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
    </button></h3><p>当您的应用程序生成 Embeddings 并将向量值写入 Milvus 时，请使用<code translate="no">add_collection_field()</code> 添加用户定义的向量字段。</p>
<p>每个添加的用户定义向量字段都必须为可空。对于现有实体，新向量字段的值默认为<code translate="no">NULL</code> ，直到您通过upsert或回填工作流写入向量值为止。新实体可在插入时包含该向量字段。向量搜索会跳过向量值为<code translate="no">NULL</code> 的实体。有关详细信息，请参阅《<a href="/docs/zh/nullable-and-default.md">可空字段》</a>。</p>
<p><strong>示例：添加可为空的向量字段</strong></p>
<p>以下示例向现有 Collection 中添加了一个名为<code translate="no">embedding_v2</code> 的可空稠密向量字段。请将<code translate="no">dim</code> 设置为应用程序生成的 Embeddings 的维度。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.FLOAT_VECTOR,</span>
<span class="highlighted-comment-line">    dim=<span class="hljs-number">768</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>添加字段后，请在搜索该新向量字段之前为其创建索引：</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>现有实体的 `<code translate="no">embedding_v2</code> ` 值为 `<code translate="no">NULL</code> `，当您按此字段搜索时，这些实体将被跳过。若要使现有实体可通过 `<code translate="no">embedding_v2</code>` 进行搜索，请通过 upsert 或回填工作流写入非空向量值。新实体可在插入时包含 `<code translate="no">embedding_v2</code> `。</p>
<h3 id="Add-vector-fields-generated-by-functions--Milvus-30x" class="common-anchor-header">添加由函数生成的向量字段<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Add-vector-fields-generated-by-functions--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>当需要 Milvus 根据现有 Collection 中已存储的数据生成新的向量字段时，请使用此工作流。该操作将添加两个相关的 Schema 元素：</p>
<ul>
<li><p>一个读取一个或多个现有输入字段的函数。</p></li>
<li><p>一个新的向量输出字段，用于存储该函数生成的值。</p></li>
</ul>
<p>例如，BM25 函数读取现有的<code translate="no">VARCHAR</code> 字段，并生成用于词法搜索的<code translate="no">SPARSE_FLOAT_VECTOR</code> 字段；MinHash 函数则生成用于近似重复检测的<code translate="no">BINARY_VECTOR</code> 字段。此工作流不会添加或替换函数的输入字段。</p>
<div class="alert note">
<p>此功能需要 Storage V3。有关启用说明和兼容性注意事项，请参阅<a href="/docs/zh/storage-v3.md">Storage V3</a>。</p>
</div>
<p>将函数及其生成的向量字段添加到现有 Collection 中，还需进行 Schema 版本压缩和存储版本压缩。如果任一设置被禁用，Milvus 将拒绝该请求。这些额外先决条件仅在修改现有 Collection 时适用；在初始 Schema 中定义函数时，不会使用此现有数据回填工作流。</p>
<p>支持的函数决定了生成的向量字段类型：</p>
<table>
<thead>
<tr><th>函数</th><th>生成的向量字段类型</th><th>典型输入字段</th><th>典型用例</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BM25</code></td><td><code translate="no">SPARSE_FLOAT_VECTOR</code></td><td>启用了分析器的<code translate="no">VARCHAR</code> 场</td><td>词法搜索与关键词相关性</td></tr>
<tr><td><code translate="no">MINHASH</code></td><td><code translate="no">BINARY_VECTOR</code></td><td>一个<code translate="no">VARCHAR</code> 字段</td><td>近似重复检测</td></tr>
</tbody>
</table>
<p>有关各函数工作原理的详细信息，请参阅<a href="/docs/zh/bm25-function.md">BM25 函数</a>和<a href="/docs/zh/minhash-function.md">MinHash 函数</a>。</p>
<p>生成的向量字段在Collection中不得已存在，且不能为可空字段。函数的输入字段必须已存在。</p>
<p><strong>示例：添加一个用于词汇搜索的由 BM25 生成的稀疏向量字段</strong></p>
<p>以下示例向现有 Collection 中添加了一个名为<code translate="no">text_bm25</code> 的 BM25 函数，以及一个名为<code translate="no">text_sparse</code> 的生成的稀疏向量字段。该 Collection 必须已包含一个名为<code translate="no">text</code> 的<code translate="no">VARCHAR</code> 字段，且已启用分析器。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sparse_field = client.create_field_schema(
    name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    data_type=DataType.SPARSE_FLOAT_VECTOR,
    desc=<span class="hljs-string">&quot;BM25-generated sparse vector field&quot;</span>,
)

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse&quot;</span>],
    function_type=FunctionType.BM25,
)

<span class="highlighted-comment-line">client.add_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_schema=sparse_field,</span>
<span class="highlighted-comment-line">    func=bm25_function,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>添加 BM25 函数和生成的字段后，请在将该稀疏向量字段用于 BM25 搜索之前，为其创建索引：</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,
    },
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>从概念上讲，此操作会添加以下字段和函数定义：</p>
<pre><code translate="no" class="language-plaintext">New generated output field:
  name: &quot;text_sparse&quot;
  data_type: SPARSE_FLOAT_VECTOR
  nullable: false

New function:
  name: &quot;text_bm25&quot;
  type: BM25
  input_field_names: [&quot;text&quot;]
  output_field_names: [&quot;text_sparse&quot;]
<button class="copy-code-btn"></button></code></pre>
<p>请求成功后，<code translate="no">describe_collection()</code> 会在Collection Schema中同时返回新的<code translate="no">text_sparse</code> 向量字段和<code translate="no">text_bm25</code> 函数。Milvus会在新实体写入时生成该函数的输出。 对于现有实体，Milvus 会通过后台压缩异步填充生成的向量字段。Schema可见性确认了Schema更新成功，但并不表示所有现有实体的回填都已完成。有关完整的 BM25 搜索工作流，请参阅<a href="/docs/zh/full-text-search.md">全文搜索</a>。</p>
<p>Milvus 还支持由 MinHash 生成的二进制向量字段，用于近似重复项检测。MinHash 函数使用<code translate="no">FunctionType.MINHASH</code> ，并将结果写入新的<code translate="no">BINARY_VECTOR</code> 输出字段。有关配置详情，请参阅《<a href="/docs/zh/minhash-function.md">MinHash 函数</a>》。</p>
<h2 id="Drop-fields-from-an-existing-collection" class="common-anchor-header">从现有 Collection 中删除字段<button data-href="#Drop-fields-from-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以通过两种方式从现有 Collection 中移除字段。当用户定义的标量或向量字段不再属于 Collection 模型时，可直接将其删除。对于由函数生成的向量字段，可通过删除生成该字段的函数来移除。</p>
<h3 id="Drop-user-defined-fields--Milvus-30x" class="common-anchor-header">删除用户定义的字段<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-user-defined-fields--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>使用 `<code translate="no">drop_collection_field()</code> ` 删除不再属于 Collection 模型的用户定义标量、向量或 StructArray 字段。</p>
<p>删除字段会首先更改 Collection Schema 和字段可见性：</p>
<ul>
<li><p><code translate="no">drop_collection_field()</code> 执行成功后，Collection Schema 将得到更新：`<code translate="no">describe_collection()</code> ` 不再返回已删除的字段，且查询或搜索将无法在 `<code translate="no">output_fields</code> ` 中返回该字段，也无法在表达式中使用该字段。</p></li>
<li><p>基于已删除字段构建的索引将作为Schema更新的一部分被清理。</p></li>
</ul>
<p>存储清理与Schema清理是分开处理的。有关详细信息，请参阅<a href="#when-is-storage-space-reclaimed-after-dropping-a-field">“删除字段后何时回收存储空间？</a>”。</p>
<p><strong>示例：删除用户定义的标量字段</strong></p>
<p>以下示例假设<code translate="no">experiment_tag</code> 是<code translate="no">product_catalog</code> 中的一个用户定义标量字段，并将该字段从 Collection 中删除。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;experiment_tag&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>删除字段后，您可以调用<code translate="no">describe_collection()</code> 来验证该字段是否已不再属于Schema。</p>
<p><strong>示例：删除 StructArray 字段</strong></p>
<p>以下示例假设<code translate="no">chunks</code> 是<code translate="no">my_collection</code> 中的一个 StructArray 字段，并将它从 Collection 中删除。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>示例：删除用户定义的向量字段</strong></p>
<p>您可以使用相同的<code translate="no">drop_collection_field()</code> 方法删除向量字段，但删除后 Collection 中仍必须至少包含一个向量字段。这对于那些暂时包含多种向量表示形式、随后将其中一种作为标准表示形式的 Collection 非常有用。</p>
<p>以下示例假设 `<code translate="no">image_vector</code> ` 是 `<code translate="no">hybrid_catalog</code>` 中的用户定义向量场，且该 Collection 仍保留另一个向量场，例如 `<code translate="no">text_vector</code>`。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;hybrid_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>如果<code translate="no">image_vector</code> 是 Collection 中的最后一个向量场，则删除操作将被拒绝。</p>
<h3 id="Drop-vector-fields-generated-by-functions--Milvus-30x" class="common-anchor-header">删除由函数生成的向量场<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-vector-fields-generated-by-functions--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>当您不再需要由函数生成的向量字段（例如由 BM25 生成的稀疏向量字段）时，请使用此操作。</p>
<p>要删除生成的向量字段，请对生成该字段的函数调用<code translate="no">drop_collection_function()</code> 。在此工作流中，Milvus 会将该函数从 Collection Schema 中移除，并同时删除其生成的向量输出字段。</p>
<p>请勿对函数输入字段或函数输出字段调用<code translate="no">drop_collection_field()</code> 。如果目标字段是函数输出字段，请改用<code translate="no">drop_collection_function()</code> 。删除函数后，函数输入字段将被保留。</p>
<p><strong>示例：删除 BM25 函数及其生成的字段</strong></p>
<p>以下示例假设<code translate="no">text_bm25</code> 是<code translate="no">product_catalog</code> 中的一个 BM25 函数，并生成一个名为<code translate="no">text_sparse</code> 的稀疏向量输出字段。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_function(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    function_name=<span class="hljs-string">&quot;text_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>操作成功后，<code translate="no">describe_collection()</code> 将不再返回已删除的函数及其生成的输出字段。函数输入字段仍保留在 Schema 中。</p>
<p>如果移除函数输出字段会导致Collection中没有任何向量字段，则该操作将被拒绝。</p>
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
    </button></h2><h3 id="Which-add-field-method-should-I-use" class="common-anchor-header">我应该使用哪种 add-field 方法？<button data-href="#Which-add-field-method-should-I-use" class="anchor-icon" translate="no">
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
    </button></h3><p>当您的应用程序为过滤、查询输出或应用程序逻辑提供标量值时，请使用<code translate="no">add_collection_field()</code> 来添加用户定义的标量字段。</p>
<p>当您需要一个其元素共享相同 Struct Schema 的数组字段时，请使用 `<code translate="no">add_collection_struct_field()</code> ` 来添加 StructArray 字段。</p>
<p>当您的应用程序生成 Embeddings 并将向量值写入 Milvus 时，请使用 `<code translate="no">add_collection_field()</code> ` 添加用户定义的向量字段。</p>
<p>当 Milvus 需要从现有字段生成向量值时，请使用 generated-vector-field 工作流。本指南展示了使用<code translate="no">add_function_field()</code> 进行词法搜索的 BM25 路径。Milvus 还支持由 MinHash 生成的二进制向量字段，用于近似重复检测。</p>
<h3 id="Why-must-added-user-defined-fields-be-nullable" class="common-anchor-header">为什么添加的用户定义字段必须允许为空？<button data-href="#Why-must-added-user-defined-fields-be-nullable" class="anchor-icon" translate="no">
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
    </button></h3><p>现有实体是在新字段创建之前插入的，因此它们不包含该字段的值。设置<code translate="no">nullable=True</code> 可让Milvus将缺失值表示为<code translate="no">NULL</code> ，直到您的应用程序写入值，或者对于标量字段，直到应用默认值为止。</p>
<p>此规则适用于使用<code translate="no">add_collection_field()</code> 添加的用户定义标量字段和用户定义向量字段，以及使用<code translate="no">add_collection_struct_field()</code> 添加的StructArray字段。它不适用于由函数生成的向量字段，因为这些字段不能为空。</p>
<h3 id="What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="common-anchor-header">添加用户定义字段后，现有实体会发生什么变化？<button data-href="#What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="anchor-icon" translate="no">
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
    </button></h3><p>对于用户定义的标量字段，除非您设置了<code translate="no">default_value</code> ，否则现有实体将返回<code translate="no">NULL</code> 。如果您设置了<code translate="no">default_value</code> ，现有实体将返回该默认值。</p>
<p>对于用户定义的向量字段，现有实体的该新向量字段值为<code translate="no">NULL</code> 。针对新增字段进行的向量搜索会跳过向量值为<code translate="no">NULL</code> 的实体。若要使现有实体可通过新向量字段进行搜索，请通过upsert或回填工作流写入非NULL的向量值。新建实体可在插入时包含该新向量字段。</p>
<p>对于 StructArray 字段，现有实体在其所有子字段中针对新 StructArray 字段返回<code translate="no">NULL</code> 。新实体必须为所有子字段提供<code translate="no">NULL</code> ，或者为所有子字段提供有效值。</p>
<h3 id="Can-I-add-BM25-lexical-search-to-an-existing-collection" class="common-anchor-header">我可以将 BM25 词汇搜索功能添加到现有 Collection 中吗？<button data-href="#Can-I-add-BM25-lexical-search-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>可以。如果Collection中已有启用分析器的<code translate="no">VARCHAR</code> 字段，您可以添加一个由BM25生成的稀疏向量字段用于词汇搜索。在此工作流中，Milvus会添加新的<code translate="no">SPARSE_FLOAT_VECTOR</code> 输出字段以及为其生成值的BM25函数。 在此模式变更工作流中，您无法将现有的<code translate="no">TEXT</code> 字段用作BM25的输入。若要使用<code translate="no">TEXT</code> 作为输入，请在创建Collection时定义该字段及BM25函数。</p>
<p>添加由 BM25 生成的稀疏向量字段后，请先使用<code translate="no">metric_type=&quot;BM25&quot;</code> 创建<code translate="no">SPARSE_INVERTED_INDEX</code> 索引，然后才能将该字段用于 BM25 搜索。</p>
<h3 id="Can-I-drop-a-vector-field-generated-by-a-function-directly" class="common-anchor-header">我可以直接删除由函数生成的向量字段吗？<button data-href="#Can-I-drop-a-vector-field-generated-by-a-function-directly" class="anchor-icon" translate="no">
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
    </button></h3><p>不可以。由函数生成的向量字段是该函数Schema的一部分。请改用<code translate="no">drop_collection_function()</code> 。在此模式变更工作流中，Milvus会同时移除该函数及其生成的向量输出字段，同时保留输入字段。</p>
<h3 id="Do-I-need-to-wait-after-altering-a-collection-schema" class="common-anchor-header">修改Schema后需要等待吗？<button data-href="#Do-I-need-to-wait-after-altering-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>通常无需手动等待。如果后续操作依赖于更新后的 Schema，您可以先调用 `<code translate="no">describe_collection()</code> ` 以确认 Milvus 当前返回的 Schema。</p>
<p>在分布式部署中，Milvus 组件刷新 Collection 元数据时可能会存在短暂的传播窗口。如果 Schema 变更后立即执行的操作因 Schema 相关错误而失败，请刷新 Schema 并重试该操作。</p>
<h3 id="When-is-storage-space-reclaimed-after-dropping-a-field" class="common-anchor-header">删除字段后，存储空间何时会被回收？<button data-href="#When-is-storage-space-reclaimed-after-dropping-a-field" class="anchor-icon" translate="no">
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
    </button></h3><p>删除字段会将其从当前Schema和常规查询/搜索可见范围内移除，但该字段的历史数据不会立即从对象存储中物理删除。</p>
<p>存储空间可在后续的压缩过程中被回收。压缩是一个后台进程，它将现有数据文件重组为新的、更紧凑的文件。字段被删除后，新压缩的文件将遵循当前 Schema 并省略已删除的字段。Milvus 不保证在删除字段后能立即或在固定时间内减少存储空间。</p>
<h3 id="What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="common-anchor-header">如果添加一个与Dynamic Field键同名的标量字段会发生什么？<button data-href="#What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>如果启用了 Dynamic Field，您可以添加一个与现有 Dynamic Field 键同名的标量字段。在常规查询输出中，新标量字段会掩盖 Dynamic Field 键，但原始动态数据仍保存在<code translate="no">$meta</code> 中。</p>
<p>例如，如果现有实体存储了一个名为<code translate="no">source</code> 的动态键，而您随后添加了一个名为<code translate="no">source</code> 的标量字段，则<code translate="no">source</code> 的常规查询结果将引用该标量字段。若要访问原始动态值，请使用<code translate="no">$meta</code> 路径语法，例如<code translate="no">$meta[&quot;source&quot;]</code> 。</p>
