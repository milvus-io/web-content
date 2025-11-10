---
id: json-field-overview.md
title: JSON 字段概述
summary: >-
  在构建产品目录、内容管理系统或用户偏好引擎等应用程序时，您往往需要在存储向量 Embeddings
  的同时存储灵活的元数据。产品属性因类别而异，用户偏好随时间演变，文档属性具有复杂的嵌套结构。Milvus 中的 JSON
  字段可以在不影响性能的情况下存储和查询灵活的结构化数据，从而解决了这一难题。
---
<h1 id="JSON-Field-Overview" class="common-anchor-header">JSON 字段概述<button data-href="#JSON-Field-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>在构建产品目录、内容管理系统或用户偏好引擎等应用程序时，您往往需要在存储向量 Embeddings 的同时存储灵活的元数据。产品属性因类别而异，用户偏好随时间演变，文档属性具有复杂的嵌套结构。Milvus 中的 JSON 字段解决了这一难题，允许您在不牺牲性能的情况下存储和查询灵活的结构化数据。</p>
<h2 id="What-is-a-JSON-field" class="common-anchor-header">什么是 JSON 字段？<button data-href="#What-is-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>JSON 字段是 Milvus 中的一种 Schema 定义数据类型 (<code translate="no">DataType.JSON</code>)，用于存储结构化的键值数据。与传统的刚性数据库列不同，JSON 字段可容纳嵌套对象、数组和混合数据类型，同时提供多种索引选项，以实现快速查询。</p>
<p>JSON 字段结构示例：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
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
<p>在这个示例中，<code translate="no">metadata</code> 是一个单一的 JSON 字段，包含平面值（如<code translate="no">category</code>,<code translate="no">in_stock</code> ）、数组 (<code translate="no">tags</code>) 和嵌套对象 (<code translate="no">supplier</code>) 的混合数据。</p>
<div class="alert note">
<p><strong>命名约定：</strong>在 JSON 键中只能使用字母、数字和下划线。避免使用特殊字符、空格或点，因为它们可能会在查询中导致解析问题。</p>
</div>
<h2 id="JSON-field-vs-dynamic-field" class="common-anchor-header">JSON 字段与动态字段<button data-href="#JSON-field-vs-dynamic-field" class="anchor-icon" translate="no">
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
    </button></h2><p>一个常见的混淆点是 JSON 字段与<a href="/docs/zh/enable-dynamic-field.md">动态</a>字段的区别。虽然两者都与 JSON 有关，但目的不同。</p>
<p>下表总结了 JSON 字段和动态字段的主要区别：</p>
<table>
   <tr>
     <th><p>特征</p></th>
     <th><p>JSON 字段</p></th>
     <th><p>动态字段</p></th>
   </tr>
   <tr>
     <td><p>Schema 定义</p></td>
     <td><p>标量字段，必须在 Collections Schema 中以<code translate="no">DataType.JSON</code> 类型明确声明。</p></td>
     <td><p>一个隐藏的 JSON 字段（名为<code translate="no">$meta</code> ），可自动存储未声明的字段。</p></td>
   </tr>
   <tr>
     <td><p>使用情况</p></td>
     <td><p>存储模式已知且一致的结构化数据。</p></td>
     <td><p>存储不适合固定模式的灵活、不断变化或半结构化数据。</p></td>
   </tr>
   <tr>
     <td><p>控制</p></td>
     <td><p>由您控制字段名称和结构。</p></td>
     <td><p>系统管理未定义的字段。</p></td>
   </tr>
   <tr>
     <td><p>查询</p></td>
     <td><p>使用字段名或 JSON 字段内的目标键进行查询：<code translate="no">metadata["key"]</code> 。</p></td>
     <td><p>直接使用 Dynamic Field 关键字查询：<code translate="no">"dynamic_key"</code> 或通过<code translate="no">$meta</code> ：<code translate="no">$meta["dynamic_key"]</code></p></td>
   </tr>
</table>
<h2 id="Basic-operations" class="common-anchor-header">基本操作符<button data-href="#Basic-operations" class="anchor-icon" translate="no">
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
    </button></h2><p>使用 JSON 字段的基本工作流程包括在 Schema 中定义字段、插入数据，然后使用特定的过滤表达式查询数据。</p>
<h3 id="Define-a-JSON-field" class="common-anchor-header">定义 JSON 字段<button data-href="#Define-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h3><p>要使用 JSON 字段，请在创建 Collection 时在模式 Schema 中明确定义该字段。下面的示例演示了如何创建一个带有<code translate="no">metadata</code> 类型字段<code translate="no">DataType.JSON</code> 的 Collections：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address </span>

<span class="hljs-comment"># Create schema</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>)

schema.add_field(field_name=<span class="hljs-string">&quot;product_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Primary field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>) <span class="hljs-comment"># Vector field</span>
<span class="hljs-comment"># Define a JSON field that allows null values</span>
<span class="highlighted-wrapper-line">schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON, nullable=<span class="hljs-literal">True</span>)</span>

client.create_collection(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>在本例中，集合模式 Schema 中定义的 JSON 字段允许使用<code translate="no">nullable=True</code> 的空值。有关详情，请参阅 "<a href="/docs/zh/nullable-and-default.md">可为空值和默认值</a>"。</p>
</div>
<h3 id="Insert-data" class="common-anchor-header">插入数据<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>创建 Collections 后，在指定的 JSON 字段中插入包含结构化 JSON 对象的实体。数据格式应为字典列表。</p>
<pre><code translate="no" class="language-python">entities = [
    {
        <span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;metadata&quot;</span>: { <span class="hljs-comment"># JSON field</span></span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;supplier&quot;</span>: {</span>
<span class="highlighted-comment-line">                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,</span>
<span class="highlighted-comment-line">                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,</span>
<span class="highlighted-comment-line">                <span class="hljs-string">&quot;contact&quot;</span>: {</span>
<span class="highlighted-comment-line">                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,</span>
<span class="highlighted-comment-line">                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span></span>
<span class="highlighted-comment-line">                }</span>
<span class="highlighted-comment-line">            }</span>
<span class="highlighted-comment-line">        }</span>
    }
]

client.insert(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Filtering-operations" class="common-anchor-header">过滤操作符<button data-href="#Filtering-operations" class="anchor-icon" translate="no">
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
    </button></h3><p>在对 JSON 字段执行过滤操作前，请确保</p>
<ul>
<li><p>您已在每个向量字段上创建了索引。</p></li>
<li><p>Collections 已加载到内存中。</p></li>
</ul>
<p><details></p>
<p><summary>显示代码</summary></p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

client.create_index(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, index_params=index_params)

client.load_collection(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>满足这些要求后，您就可以使用下面的表达式，根据 JSON 字段内的值对 Collections 进行过滤。这些过滤表达式利用了特定的 JSON 路径语法和专用操作符。</p>
<h4 id="Filtering-with-JSON-path-syntax" class="common-anchor-header">使用 JSON 路径语法进行筛选</h4><p>要查询特定键，请使用括号符号访问 JSON 键：<code translate="no">json_field_name[&quot;key&quot;]</code> 。对于嵌套键，可将它们串联起来：<code translate="no">json_field_name[&quot;key1&quot;][&quot;key2&quot;]</code> 。</p>
<p>要过滤<code translate="no">category</code> 是<code translate="no">&quot;electronics&quot;</code> 的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>

client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>过滤嵌套键<code translate="no">supplier[&quot;country&quot;]</code> 为<code translate="no">&quot;USA&quot;</code> 的实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;country&quot;] == &quot;USA&quot;&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Filtering-with-JSON-specific-operators" class="common-anchor-header">使用特定于 JSON 的操作符进行过滤</h4><p>Milvus 还提供特殊操作符，用于查询特定 JSON 字段键上的数组值。例如</p>
<ul>
<li><p><code translate="no">json_contains(identifier, expr)</code>:检查 JSON 数组中是否存在特定元素或子数组</p></li>
<li><p><code translate="no">json_contains_all(identifier, expr)</code>:确保指定 JSON 表达式的所有元素都存在于字段中</p></li>
<li><p><code translate="no">json_contains_any(identifier, expr)</code>:过滤字段中至少存在一个 JSON 表达式成员的实体</p></li>
</ul>
<p>查找<code translate="no">tags</code> 关键字下具有<code translate="no">&quot;summer_sale&quot;</code> 值的产品：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(metadata[&quot;tags&quot;], &quot;summer_sale&quot;)&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>查找在<code translate="no">tags</code> 关键字下至少有一个<code translate="no">&quot;electronics&quot;</code> 、<code translate="no">&quot;new&quot;</code> 或<code translate="no">&quot;clearance&quot;</code> 值的产品：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_any(metadata[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>有关 JSON 特定操作符的更多信息，请参阅<a href="/docs/zh/json-operators.md">JSON 操作符</a>。</p>
<h2 id="Next-Accelerate-JSON-queries" class="common-anchor-header">下一步：加速 JSON 查询<button data-href="#Next-Accelerate-JSON-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>默认情况下，在没有加速的情况下，对 JSON 字段的查询将对所有行执行全扫描，这在大型数据集上可能会比较慢。为了加快 JSON 查询，Milvus 提供了高级索引和存储优化功能。</p>
<p>下表总结了它们的区别和最佳使用场景：</p>
<table>
   <tr>
     <th><p>技术</p></th>
     <th><p>最适合</p></th>
     <th><p>阵列 加速</p></th>
     <th><p>注释</p></th>
   </tr>
   <tr>
     <td><p>JSON 索引</p></td>
     <td><p>一小部分频繁访问的键，特定数组键上的数组</p></td>
     <td><p>是（在索引数组键上）</p></td>
     <td><p>必须预先选择键，如果 Schema 发生变化则需要维护</p></td>
   </tr>
   <tr>
     <td><p>JSON 粉碎</p></td>
     <td><p>普遍加快多个键的速度，灵活适用于各种查询</p></td>
     <td><p>否（不加速数组内的值）</p></td>
     <td><p>额外的存储配置，数组仍需要按键索引</p></td>
   </tr>
   <tr>
     <td><p>NGRAM 索引</p></td>
     <td><p>通配符搜索、文本字段中的子串匹配</p></td>
     <td><p>不适用</p></td>
     <td><p>不适用于数字/范围筛选器</p></td>
   </tr>
</table>
<p><strong>提示：</strong>您可以将这些方法结合起来--例如，使用 JSON 切碎来加速广泛查询，使用 JSON 索引来处理高频数组键，使用 NGRAM 索引来进行灵活的文本搜索。</p>
<p>有关实施细节，请参阅</p>
<ul>
<li><p><a href="/docs/zh/json-indexing.md">JSON 索引</a></p></li>
<li><p><a href="/docs/zh/json-shredding.md">JSON 切碎</a></p></li>
<li><p><a href="/docs/zh/ngram.md">NGRAM</a></p></li>
</ul>
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
    </button></h2><h3 id="Are-there-any-limitations-on-the-size-of-a-JSON-field" class="common-anchor-header">JSON 字段的大小有限制吗？<button data-href="#Are-there-any-limitations-on-the-size-of-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h3><p>有。每个 JSON 字段的大小限制为 65,536 字节。</p>
<h3 id="Does-a-JSON-field-support-setting-a-default-value" class="common-anchor-header">JSON 字段是否支持设置默认值？<button data-href="#Does-a-JSON-field-support-setting-a-default-value" class="anchor-icon" translate="no">
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
    </button></h3><p>不支持，JSON 字段不支持默认值。不过，您可以在定义字段时设置<code translate="no">nullable=True</code> ，以允许空条目。</p>
<p>详情请参阅 "<a href="/docs/zh/nullable-and-default.md">可空和默认</a>"。</p>
<h3 id="Are-there-any-naming-conventions-for-JSON-field-keys" class="common-anchor-header">JSON 字段键有任何命名约定吗？<button data-href="#Are-there-any-naming-conventions-for-JSON-field-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>有，以确保与查询和索引的兼容性：</p>
<ul>
<li><p>在 JSON 键中只使用字母、数字和下划线。</p></li>
<li><p>避免使用特殊字符、空格或点（<code translate="no">.</code>,<code translate="no">/</code> 等）。</p></li>
<li><p>不兼容的键可能会导致过滤表达式出现解析问题。</p></li>
</ul>
<h3 id="How-does-Milvus-handle-string-values-in-JSON-fields" class="common-anchor-header">Milvus 如何处理 JSON 字段中的字符串值？<button data-href="#How-does-Milvus-handle-string-values-in-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 完全按照 JSON 输入中的字符串值进行存储，不进行语义转换。引号不当的字符串可能会在解析过程中导致错误。</p>
<p><strong>有效字符串示例</strong></p>
<pre><code translate="no" class="language-plaintext">&quot;a\&quot;b&quot;, &quot;a&#x27;b&quot;, &quot;a\\b&quot;
<button class="copy-code-btn"></button></code></pre>
<p><strong>无效字符串示例</strong></p>
<pre><code translate="no" class="language-plaintext">&#x27;a&quot;b&#x27;, &#x27;a\&#x27;b&#x27;
<button class="copy-code-btn"></button></code></pre>
