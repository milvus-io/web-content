---
id: schema.md
title: Schema 解释
summary: >-
  Schema 定义了 Collections 的数据结构。在创建 Collections 之前，你需要设计好它的 Schema。本页将帮助你理解
  Collections Schema，并自行设计一个示例 Schema。
---
<h1 id="Schema-Explained​" class="common-anchor-header">模式解释<button data-href="#Schema-Explained​" class="anchor-icon" translate="no">
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
    </button></h1><p>Schema 定义了 Collections 的数据结构。在创建一个 Collection 之前，你需要设计出它的 Schema。本页将帮助你理解 Collections 模式，并自行设计一个示例模式。</p>
<h2 id="Overview​" class="common-anchor-header">概述<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中，Collection Schema 是关系数据库中的一个表，它定义了 Milvus 如何组织 Collection 中的数据。</p>
<p>设计良好的 Schema 至关重要，因为它抽象了数据模型，并决定能否通过搜索实现业务目标。此外，由于插入 Collections 的每一行数据都必须遵循 Schema，因此有助于保持数据的一致性和长期质量。从技术角度看，定义明确的 Schema 会带来组织良好的列数据存储和更简洁的索引结构，从而提升搜索性能。</p>
<p>一个 Collection Schema 有一个主键、最多四个向量字段和几个标量字段。下图说明了如何将文章映射到模式字段列表。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/schema-explained.png" alt="Schema design" class="doc-image" id="schema-design" />
   </span> <span class="img-wrapper"> <span>Schema 设计</span> </span></p>
<p>搜索系统的数据模型设计包括分析业务需求，并将信息抽象为模式表达的数据模型。例如，搜索一段文本必须通过 "Embedding "将字面字符串转换为向量并启用向量搜索，从而实现 "索引"。除了这一基本要求外，可能还需要存储出版时间戳和作者等其他属性。有了这些元数据，就可以通过过滤来完善语义搜索，只返回特定日期之后或特定作者发表的文本。您还可以检索这些标量与主文本，以便在应用程序中呈现搜索结果。每个标量都应分配一个唯一标识符，以整数或字符串的形式组织这些文本片段。这些元素对于实现复杂的搜索逻辑至关重要。</p>
<p>请参考<a href="/docs/zh/v2.5.x/schema-hands-on.md">Schema Design Hands-On</a>，了解如何制作一个精心设计的模式。</p>
<h2 id="Create-Schema​" class="common-anchor-header">创建 Schema<button data-href="#Create-Schema​" class="anchor-icon" translate="no">
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
    </button></h2><p>以下代码片段演示了如何创建模式。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
schema = MilvusClient.create_schema()​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> schema = []​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export schema='{​
    &quot;fields&quot;: []​
}'​

</code></pre>
<h2 id="Add-Primary-Field​" class="common-anchor-header">添加主字段<button data-href="#Add-Primary-Field​" class="anchor-icon" translate="no">
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
    </button></h2><p>Collections 中的主字段唯一标识一个实体。它只接受<strong>Int64</strong>或<strong>VarChar</strong>值。以下代码片段演示了如何添加主字段。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,​
    datatype=DataType.INT64,​
<span class="highlighted-comment-line">    is_primary=<span class="hljs-literal">True</span>,​</span>
<span class="highlighted-comment-line">    auto_id=<span class="hljs-literal">False</span>,​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq; ​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)​
        .dataType(DataType.Int64)​
<span class="highlighted-comment-line">        .isPrimaryKey(<span class="hljs-literal">true</span>)​</span>
<span class="highlighted-comment-line">        .autoID(<span class="hljs-literal">false</span>)​</span>
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
<span class="highlighted-comment-line">    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>​</span>
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export primaryField='{​
    &quot;fieldName&quot;: &quot;my_id&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;isPrimary&quot;: true​
}'​
​
export schema='{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField​
    ]​
}'​

</code></pre>
<p>添加字段时，可以通过将<code translate="no">is_primary</code> 属性设置为<code translate="no">True</code> 来明确说明该字段是主字段。主字段默认接受<strong>Int64</strong>值。在这种情况下，主字段值应为整数，类似于<code translate="no">12345</code> 。如果您选择在主字段中使用<strong>VarChar</strong>值，则其值应为字符串，类似于<code translate="no">my_entity_1234</code> 。</p>
<p>您也可以将<code translate="no">autoId</code> 属性设置为<code translate="no">True</code> ，使 Milvus 在插入数据时自动分配主字段值。</p>
<p>详情请参阅 "<a href="/docs/zh/v2.5.x/primary-field.md">主字段和自动 ID</a>"。</p>
<h2 id="Add-Vector-Fields​" class="common-anchor-header">添加向量字段<button data-href="#Add-Vector-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>向量字段接受各种稀疏和密集向量嵌入。在 Milvus 中，您可以向一个 Collections 添加四个向量字段。以下代码片段演示了如何添加向量字段。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_vector&quot;</span>,​
    datatype=DataType.FLOAT_VECTOR,​
<span class="highlighted-wrapper-line">    dim=<span class="hljs-number">5</span>​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)​
        .dataType(DataType.FloatVector)​
<span class="highlighted-wrapper-line">        .dimension(<span class="hljs-number">5</span>)​</span>
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
<span class="highlighted-wrapper-line">    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>​</span>
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export vectorField='{​
    &quot;fieldName&quot;: &quot;my_vector&quot;,​
    &quot;dataType&quot;: &quot;FloatVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 5​
    }​
}'​
​
export schema=&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField,​
        $vectorField​
    ]​
}&quot;​

</code></pre>
<p>上述代码片段中的<code translate="no">dim</code> 参数表示向量场中要保存的向量嵌入的维数。<code translate="no">FLOAT_VECTOR</code> 值表示向量字段持有 32 位浮点数列表，通常用于表示反比例。除此之外，Milvus 还支持以下类型的向量嵌入。</p>
<ul>
<li><p><code translate="no">FLOAT16_VECTOR</code></p>
<p>这种类型的向量字段持有 16 位半精度浮点数列表，通常适用于内存或带宽受限的深度学习或基于 GPU 的计算场景。</p></li>
<li><p><code translate="no">BFLOAT16_VECTOR</code></p>
<p>这种类型的向量字段保存 16 位浮点数列表，精度有所降低，但指数范围与 Float32 相同。这种类型的数据常用于深度学习场景，因为它可以在不明显影响精度的情况下减少内存使用量。</p></li>
<li><p><code translate="no">BINARY_VECTOR</code></p>
<p>这种类型的向量场保存着一个 0 和 1 的列表。它们是图像处理和信息检索场景中表示数据的紧凑特征。</p></li>
<li><p><code translate="no">SPARSE_FLOAT_VECTOR</code></p>
<p>这种类型的向量场可保存非零数字及其序列号列表，用于表示稀疏向量嵌入。</p></li>
</ul>
<h2 id="Add-Scalar-Fields​" class="common-anchor-header">添加标量字段<button data-href="#Add-Scalar-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>在常见情况下，可以使用标量字段来存储 Milvus 中存储的向量嵌入的元数据，并通过元数据过滤进行 ANN 搜索，以提高搜索结果的正确性。Milvus 支持多种标量字段类型，包括<strong>VarChar</strong>、<strong>Boolean</strong>、<strong>Int</strong>、Float、<strong>Double</strong>、<strong>Array</strong> 和 JSON。</p>
<h3 id="Add-String-Fields​" class="common-anchor-header">添加字符串字段</h3><p>在 Milvus 中，可以使用 VarChar 字段存储字符串。有关 VarChar 字段的更多信息，请参阅<a href="/docs/zh/v2.5.x/string.md">字符串字段</a>。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>,​
    datatype=DataType.VARCHAR,​
<span class="highlighted-wrapper-line">    max_length=<span class="hljs-number">512</span>​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)​
        .dataType(DataType.VarChar)​
<span class="highlighted-wrapper-line">        .maxLength(<span class="hljs-number">512</span>)​</span>
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
<span class="highlighted-wrapper-line">    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>​</span>
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export varCharField='{​
    &quot;fieldName&quot;: &quot;my_varchar&quot;,​
    &quot;dataType&quot;: &quot;VarChar&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 256​
    }​
}'​
​
export schema=&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField,​
        $vectorField,​
        $varCharField​
    ]​
}&quot;​

</code></pre>
<h3 id="Add-Number-Fields​" class="common-anchor-header">添加数字字段</h3><p>Milvus 支持的数字类型有<code translate="no">Int8</code>,<code translate="no">Int16</code>,<code translate="no">Int32</code>,<code translate="no">Int64</code>,<code translate="no">Float</code> 和<code translate="no">Double</code> 。有关数字字段的更多信息，请参阅<a href="/docs/zh/v2.5.x/number.md">数字</a>字段。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_int64&quot;</span>,​
    datatype=DataType.INT64,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_int64&quot;</span>)​
        .dataType(DataType.Int64)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_int64&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export int64Field='{​
    &quot;fieldName&quot;: &quot;my_int64&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;​
}'​
​
export schema=&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField,​
        $vectorField,​
        $varCharField,​
        $int64Field​
    ]​
}&quot;​

</code></pre>
<h3 id="Add-Boolean-Fields​" class="common-anchor-header">添加布尔字段</h3><p>Milvus 支持布尔字段。以下代码片段演示了如何添加布尔字段。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_bool&quot;</span>,​
    datatype=DataType.BOOL,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_bool&quot;</span>)​
        .dataType(DataType.Bool)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_bool&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Boolean</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export boolField='{​
    &quot;fieldName&quot;: &quot;my_bool&quot;,​
    &quot;dataType&quot;: &quot;Boolean&quot;​
}'​
​
export schema=&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField,​
        $vectorField,​
        $varCharField,​
        $int64Field,​
        $boolField​
    ]​
}&quot;​

</code></pre>
<h3 id="Add-JSON-fields​" class="common-anchor-header">添加 JSON 字段</h3><p>JSON 字段通常存储半结构化的 JSON 数据。有关 JSON 字段的更多信息，请参阅<a href="/docs/zh/v2.5.x/use-json-fields.md">JSON 字段</a>。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_json&quot;</span>,​
    datatype=DataType.JSON,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_json&quot;</span>)​
        .dataType(DataType.JSON)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_json&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export jsonField='{​
    &quot;fieldName&quot;: &quot;my_json&quot;,​
    &quot;dataType&quot;: &quot;JSON&quot;​
}'​
​
export schema=&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField,​
        $vectorField,​
        $varCharField,​
        $int64Field,​
        $boolField,​
        $jsonField​
    ]​
}&quot;​

</code></pre>
<h3 id="Add-Array-Fields​" class="common-anchor-header">添加数组字段</h3><p>数组字段存储元素列表。数组字段中所有元素的数据类型应相同。有关数组字段的更多信息，请参阅<a href="/docs/zh/v2.5.x/array_data_type.md">数组</a>字段。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_array&quot;</span>,​
    datatype=DataType.ARRAY,​
    element_type=DataType.VARCHAR,​
    max_capacity=<span class="hljs-number">5</span>,​
    max_length=<span class="hljs-number">512</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_array&quot;</span>)​
        .dataType(DataType.Array)​
        .elementType(DataType.VarChar)​
        .maxCapacity(<span class="hljs-number">5</span>)​
        .maxLength(<span class="hljs-number">512</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_array&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,​
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">5</span>,​
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export arrayField='{​
    &quot;fieldName&quot;: &quot;my_array&quot;,​
    &quot;dataType&quot;: &quot;Array&quot;,​
    &quot;elementDataType&quot;: &quot;VarChar&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 512​
    }​
}'​
​
export schema=&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField,​
        $vectorField,​
        $varCharField,​
        $int64Field,​
        $boolField,​
        $jsonField,​
        $arrayField​
    ]​
}&quot;​

</code></pre>
<p></p>
