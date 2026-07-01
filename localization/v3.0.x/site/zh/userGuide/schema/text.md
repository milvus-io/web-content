---
id: text.md
title: 文本字段Compatible with Milvus 3.0.x
summary: TEXT 是 Milvus 中用于存储文档文本、段落及其他长文本内容的标量字段类型。
beta: Milvus 3.0.x
---
<h1 id="Text-Field" class="common-anchor-header">文本字段<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Text-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>在 AI 搜索应用中，向量搜索可帮助您查找语义相似的实体，但应用通常还需要每个匹配结果背后的原始源文本。大型语言模型（LLM）或 Agents 可以利用该文本作为上下文，用于阅读、引用、摘要，或将结果纳入提示词中。</p>
<p>Milvus 提供了<code translate="no">TEXT</code> 标量字段类型，用于将长源文本直接与实体关联存储。典型值包括段落、长文档、文章正文、工单和日志。与<code translate="no">VARCHAR</code> 不同，后者要求设置固定的<code translate="no">max_length</code> ，而<code translate="no">TEXT</code> 则无需在 Collection Schema 中设置最大字节长度。</p>
<p>要定义一个<code translate="no">TEXT</code> 字段，请将<code translate="no">datatype</code> 设置为<code translate="no">DataType.TEXT</code> 。</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;content&quot;</span>,
<span class="highlighted-wrapper-line">    datatype=DataType.TEXT,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>定义该字段后，每个实体都可以在该字段中包含字符串值。您可以像处理其他标量字段一样插入<code translate="no">TEXT</code> 值，并通过在<code translate="no">output_fields</code> 中列出该字段，从查询或搜索结果中返回这些值。</p>
<div class="alert note">
<p><code translate="no">TEXT</code> 字段支持空值。要启用此功能，请将<code translate="no">nullable</code> 设置为<code translate="no">True</code> 。有关详细信息，请参阅<a href="/docs/zh/nullable-and-default.md">“可为空字段”</a>。</p>
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
    </button></h2><ul>
<li><code translate="no">TEXT</code> 字段不能作为主字段。主字段支持<code translate="no">INT64</code> 和<code translate="no">VARCHAR</code> 。</li>
<li>在 Milvus 3.0.0 中，<code translate="no">TEXT</code> 字段不支持<code translate="no">PHRASE_MATCH</code> 。</li>
<li>在 Milvus 3.0.0 中，<code translate="no">TEXT</code> 字段不支持 。</li>
<li>在 Milvus 3.0.0 中，外部 Collections 不支持<code translate="no">TEXT</code> 字段。</li>
<li>在 Milvus 3.0.0 中，<code translate="no">TEXT</code> 字段不支持标量索引。</li>
<li><code translate="no">TEXT</code> 不适用于常规元数据过滤。如果您需要根据短字符串元数据进行过滤，且字段值符合<code translate="no">VARCHAR</code> 的长度限制，请使用<code translate="no">VARCHAR</code> 。</li>
</ul>
<h2 id="Choose-TEXT-or-VARCHAR" class="common-anchor-header">请选择 TEXT 或 VARCHAR<button data-href="#Choose-TEXT-or-VARCHAR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TEXT</code> 和<code translate="no">VARCHAR</code> 均用于存储字符串值，但它们支持不同的应用需求。请使用<code translate="no">VARCHAR</code> 处理用于识别、分类或过滤实体的短且有长度的元数据。请使用<code translate="no">TEXT</code> 处理较长的源内容，以便为大型语言模型（LLM）或 Agents 提供足够的上下文，用于阅读、引用、摘要或构建提示词。</p>
<table>
<thead>
<tr><th>方面</th><th><code translate="no">VARCHAR</code></th><th><code translate="no">TEXT</code></th></tr>
</thead>
<tbody>
<tr><td>最适合</td><td>用于识别、分类或筛选实体的简短元数据，例如<code translate="no">title</code> 、<code translate="no">tag</code> 、<code translate="no">category</code> 或<code translate="no">external_id</code> 。</td><td>用于 LLM 或 Agents 工作流的较长源内容，例如<code translate="no">content</code> 、<code translate="no">passage</code> 、<code translate="no">article_body</code> 或<code translate="no">log_message</code> 。</td></tr>
<tr><td>长度设置</td><td>需要<code translate="no">max_length</code> ，该字段定义了该字段可存储的最大字节数。最大值为<code translate="no">65,535</code> 字节。如果值可能超过此限制，请使用<code translate="no">TEXT</code> 。</td><td>不要求<code translate="no">max_length</code> ，因此Schema无需为文本值设定固定的字节限制。</td></tr>
<tr><td>存储行为</td><td>将每个值存储在字段配置的<code translate="no">max_length</code> 内。</td><td>对于较大的文本值，将使用自动存储选择机制。有关详细信息，请参阅《<a href="#how-milvus-stores-large-text-values">Milvus 如何存储大型 TEXT 值</a>》。</td></tr>
<tr><td>主字段支持</td><td>可作为主字段使用。</td><td>不能用作主字段。</td></tr>
<tr><td>过滤</td><td>适用于需要出现在过滤表达式中的短字符串元数据，例如<code translate="no">category == &quot;news&quot;</code> 或<code translate="no">tag in [&quot;ai&quot;, &quot;database&quot;]</code> 。</td><td>不适用于常规元数据过滤。</td></tr>
</tbody>
</table>
<p>有关<code translate="no">VARCHAR</code> 字段的详细信息，请参阅<a href="/docs/zh/string.md">VarChar 字段</a>。</p>
<h2 id="How-Milvus-stores-large-TEXT-values" class="common-anchor-header">Milvus 如何存储大型 TEXT 值<button data-href="#How-Milvus-stores-large-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p><details></p>
<p><summary>展开以了解其工作原理</summary></p>
<p>当您插入一个实体时，您为<code translate="no">TEXT</code> 字段提供的字符串即为<code translate="no">TEXT</code> 值。Milvus 会将该值的大小与<a href="/docs/zh/configure_datanode.md#dataNodetextinlineThreshold">dataNode.text.inlineThreshold</a>（默认值为<code translate="no">65,536</code> 字节）进行比较，然后选择两种内部存储路径之一。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/text-large-storage-flow.png" alt="Large text storage" class="doc-image" id="large-text-storage" /> 
   <span>大文本存储</span>
  
 </span></p>
<ul>
<li><strong>内联存储</strong>：如果<code translate="no">TEXT</code> 值小于<code translate="no">dataNode.text.inlineThreshold</code> ，Milvus 会将原始文本值直接存储在<code translate="no">TEXT</code> 字段 data 中。</li>
<li><strong>LOB 存储</strong>：如果 `<code translate="no">TEXT</code> ` 的值大于或等于 `<code translate="no">dataNode.text.inlineThreshold</code>`，Milvus 将该值视为大对象，并将原始文本单独存储在对象存储（如 MinIO）中。`<code translate="no">TEXT</code> ` 字段数据中存储指向该单独存储文本的内部引用。当在查询或搜索结果中请求 `<code translate="no">TEXT</code> ` 字段时，Milvus 会使用该引用检索并返回原始文本。</li>
</ul>
<p>此存储选择属于内部机制。无论 Milvus 使用何种存储路径，您对<code translate="no">TEXT</code> 字段的插入、查询和搜索操作方式均保持一致。若需调整阈值或相关存储、压缩及垃圾回收行为，请参阅与<a href="/docs/zh/configure_datanode.md">dataNode 相关的配置</a>和<a href="/docs/zh/configure_datacoord.md">与 dataCoord 相关的配置</a>。</p>
<p>如果您的部署使用对象存储，较大的<code translate="no">TEXT</code> 值可能会以 Milvus 管理的对象形式出现在诸如<code translate="no">lobs/...</code> 之类的路径下。这些对象属于实现细节，不应手动移动、复制或删除。 在删除实体、删除分区或压缩数据后，只有当 Milvus 垃圾回收在安全窗口期结束后移除了未被引用的巨型对象数据，对象存储的使用量才会减少。</p>
<p></details></p>
<p><code translate="no">TEXT</code> 的常见用途是配合 BM25 进行全文搜索。在此模式下，<code translate="no">TEXT</code> 字段存储原始源内容，BM25 分析文本并生成稀疏向量，用于对基于关键词的匹配结果进行排序。搜索结果随后可返回匹配的<code translate="no">TEXT</code> 值，作为 LLM 或 Agents 工作流的上下文。 以下示例演示了如何将<code translate="no">TEXT</code> 字段用作BM25的输入字段。如需了解全文搜索的概念和查询选项，请参阅《<a href="/docs/zh/full-text-search.md">全文搜索</a>》。</p>
<h2 id="Step-1-Create-a-collection-with-a-TEXT-field" class="common-anchor-header">步骤 1：创建包含 TEXT 字段的 Collection<button data-href="#Step-1-Create-a-collection-with-a-TEXT-field" class="anchor-icon" translate="no">
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
    </button></h2><p>以下示例创建了一个Collection，其中包含用于源内容的<code translate="no">TEXT</code> 字段，以及用于存储BM25生成的稀疏向量向量字段。BM25函数将<code translate="no">content</code> 中的分词文本转换为稀疏向量向量，并将其存储在<code translate="no">sparse</code> 中。</p>
<p>对于 BM25 全文搜索，输入的<code translate="no">TEXT</code> 字段必须设置为<code translate="no">enable_analyzer=True</code> 。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;text_bm25_collection&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;content&quot;</span>,</span>
<span class="highlighted-comment-line">    datatype=DataType.TEXT,</span>
<span class="highlighted-comment-line">    enable_analyzer=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)

<span class="highlighted-comment-line">bm25_function = Function(</span>
<span class="highlighted-comment-line">    name=<span class="hljs-string">&quot;content_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">    input_field_names=[<span class="hljs-string">&quot;content&quot;</span>],</span>
<span class="highlighted-comment-line">    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>],</span>
<span class="highlighted-comment-line">    function_type=FunctionType.BM25,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line">schema.add_function(bm25_function)</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Create-a-sparse-vector-index" class="common-anchor-header">步骤 2：创建稀疏向量索引<button data-href="#Step-2-Create-a-sparse-vector-index" class="anchor-icon" translate="no">
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
    </button></h2><p>在由 BM25 函数生成的稀疏向量字段上创建索引。度量类型必须设置为<code translate="no">BM25</code> 。</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">)</span>

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Insert-TEXT-data" class="common-anchor-header">步骤 3：插入 TEXT 数据<button data-href="#Step-3-Insert-TEXT-data" class="anchor-icon" translate="no">
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
    </button></h2><p>将文本直接插入到<code translate="no">TEXT</code> 字段中。请勿为<code translate="no">sparse</code> 字段提供值。Milvus会通过将BM25函数应用于<code translate="no">content</code> ，在内部生成稀疏向量。</p>
<pre><code translate="no" class="language-python">data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.&quot;</span>,
    },
]

client.insert(collection_name=COLLECTION_NAME, data=data)
client.load_collection(collection_name=COLLECTION_NAME)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Perform-BM25-full-text-search" class="common-anchor-header">步骤 4：执行 BM25 全文检索<button data-href="#Step-4-Perform-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>使用原始查询文本作为搜索数据，并对稀疏向量字段进行搜索。Milvus会将查询文本转换为稀疏向量，使用BM25对匹配结果进行排序，并将请求的<code translate="no">TEXT</code> 字段结果返回至<code translate="no">output_fields</code> 字段中。</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=COLLECTION_NAME,
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&quot;how does Milvus store source text for retrieval&quot;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    limit=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;content&quot;</span>],</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-5-Read-the-returned-TEXT-values" class="common-anchor-header">步骤 5：读取返回的 TEXT 值<button data-href="#Step-5-Read-the-returned-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p>每个搜索命中结果都包含 BM25 得分和原始的<code translate="no">TEXT</code> 值。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;id: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, score: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>有关 BM25 函数、稀疏向量索引以及全文搜索查询语法的更多信息，请参阅《<a href="/docs/zh/full-text-search.md">全文搜索</a>》。</p>
