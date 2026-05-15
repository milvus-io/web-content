---
id: array-of-structs.md
title: 结构数组
summary: 使用 StructArray 字段，以向量和标量字段的共享模式存储有序的 Struct 元素。
---
<h1 id="StructArray" class="common-anchor-header">结构数组<button data-href="#StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>实体中的 "结构数组 "字段或 "结构数组 "字段存储了一组有序的结构元素。数组中的每个 Struct 都共享相同的预定义 Schema，由多个向量和标量字段组成。</p>
<p>下面是一个包含 StructArray 字段的 Collections 实体示例。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    &#x27;id&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
    &#x27;title&#x27;<span class="hljs-punctuation">:</span> &#x27;Walden&#x27;<span class="hljs-punctuation">,</span>
    &#x27;title_vector&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.3</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.4</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.5</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    &#x27;author&#x27;<span class="hljs-punctuation">:</span> &#x27;Henry David Thoreau&#x27;<span class="hljs-punctuation">,</span>
    &#x27;year_of_publication&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-number">1845</span><span class="hljs-punctuation">,</span>
<span class="highlighted-comment-line">    &#x27;chunks&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span></span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">{</span></span>
<span class="highlighted-comment-line">            &#x27;text&#x27;<span class="hljs-punctuation">:</span> &#x27;When I wrote the following pages<span class="hljs-punctuation">,</span> or rather the bulk of them...&#x27;<span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">            &#x27;text_vector&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.3</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.3</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.5</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">            &#x27;chapter&#x27;<span class="hljs-punctuation">:</span> &#x27;Economy&#x27;<span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">{</span></span>
<span class="highlighted-comment-line">            &#x27;text&#x27;<span class="hljs-punctuation">:</span> &#x27;I would fain say something<span class="hljs-punctuation">,</span> not so much concerning the Chinese and...&#x27;<span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">            &#x27;text_vector&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.7</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.4</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.7</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.8</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">            &#x27;chapter&#x27;<span class="hljs-punctuation">:</span> &#x27;Economy&#x27;</span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">}</span></span>
<span class="highlighted-comment-line">    <span class="hljs-punctuation">]</span></span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// hightlight-end</span></span>
<span class="highlighted-comment-line"><span class="hljs-punctuation">}</span></span>
<span class="highlighted-comment-line"></span><button class="copy-code-btn"></button></code></pre>
<p>在上面的示例中，<code translate="no">chunks</code> 字段是一个 StructArray 字段，每个 Struct 元素都包含自己的字段，即<code translate="no">text</code> 、<code translate="no">text_vector</code> 和<code translate="no">chapter</code> 。</p>
<h2 id="When-to-use" class="common-anchor-header">何时使用<button data-href="#When-to-use" class="anchor-icon" translate="no">
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
    </button></h2><p>从自动驾驶到多模态检索，现代人工智能应用越来越依赖于嵌套的异构数据。传统的平面数据模型很难表示复杂的关系，如<strong>"一个文档包含许多注释块</strong>"或<strong>"一个驾驶场景包含多个观察到的操作</strong>"。这正是 Milvus 中 StructArray 数据类型的优势所在。</p>
<p>要快速确定 StructArray 字段是否适合您的应用场景，请考虑以下因素：</p>
<ul>
<li><p>您的数据是分层结构的，例如一个文档包含许多注释块。</p></li>
<li><p>搜索结果应该是文档，而不是块，如上例。</p></li>
<li><p>搜索结果中包含大量重复实体，你很难使用分组、重复数据删除和 Rerankers 等技术检索到最终结果。</p></li>
</ul>
<p>如果上述问题的答案都是肯定的，那么就应该使用结构数组。</p>
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
<li><p><strong>数据类型</strong></p>
<p>创建 Collections 时，可以使用 Struct 类型作为 Array 字段中元素的数据类型。但是，您不能将 StructArray 添加到现有的 Collections 中，而且 Milvus 不支持使用 Struct 类型作为 Collections 字段的数据类型。</p>
<p>数组字段中的 Struct 共享相同的 Schema，这应该在创建数组字段时定义。</p>
<p>Struct 模式包含向量和标量字段，如下所示：</p>
<p><Grid columnSize="2" widthRatios="50,50"></p>
<pre><code translate="no">  &lt;div&gt;

      Applicable vector fields:

      - `FLOAT_VECTOR`

      - `FLOAT16_VECTOR`

      - `BFLOAT16_VECTOR`

      - `INT8_VECTOR`

      - `BINARY_VECTOR`

  &lt;/div&gt;

  &lt;div&gt;

      Applicable scalar fields:

      - `VARCHAR`

      - `INT8/16/32/64`

      - `FLOAT`

      - `DOUBLE`

      - `BOOL`

  &lt;/div&gt;
</code></pre>
<p></Grid></p>
<p>无论是在 Collections 层级还是在 Structs 组合中，向量字段的数量都不应大于或等于 10。</p></li>
<li><p><strong>可归零和默认值</strong></p>
<p>StructArray 字段不可为空，也不接受任何默认值。</p></li>
<li><p><strong>函数</strong></p>
<p>不能使用函数从 Struct 中的标量字段导出向量字段。</p></li>
<li><p><strong>索引类型和度量类型</strong></p>
<p>必须对 Collections 中的所有向量场进行索引。为了索引 StructArray 字段中的向量字段，Milvus 使用嵌入列表来组织每个 Struct 元素中的向量嵌入，并将整个嵌入列表作为一个整体进行索引。</p>
<p>你可以使用<code translate="no">AUTOINDEX</code> 或<code translate="no">HNSW</code> 作为索引类型，并使用下面列出的任何度量类型为 StructArray 字段中的嵌入列表建立索引。</p>
<p><table>
<tr>
<th><p>索引类型</p></th>
<th><p>度量类型</p></th>
<th><p>备注</p></th>
</tr>
<tr>
<td rowspan="3"><ul><li><p><code translate="no">AUTOINDEX</code></p></li><li><p><code translate="no">HNSW</code></p></li><li><p><code translate="no">IVF_FLAT</code></p></li><li><p><code translate="no">DISKANN</code></p></li></ul></td>
<td rowspan="3"><ul><li><p><code translate="no">MAX_SIM_COSINE</code></p></li><li><p><code translate="no">MAX_SIM_IP</code></p></li><li><p><code translate="no">MAX_SIM_L2</code></p></li></ul></td>
<td rowspan="3"><p>用于以下类型的嵌入列表：</p><ul><li><p><code translate="no">FLOAT_VECTOR</code></p></li><li><p><code translate="no">FLOAT16_VECTOR</code></p></li><li><p><code translate="no">BFLOAT16_VECTOR</code></p></li><li><p><code translate="no">INT8_VECTOR</code></p></li><li><p><code translate="no">BINARY_VECTOR</code></p></li></ul></td>
</tr>
</table></p>
<p>有关 Milvus 如何计算查询与嵌入列表之间相似度的详情，请参阅<a href="/docs/zh/metric.md#Maximum-similarity">最大相似度</a>。</p>
<p>StructArray 字段中的标量字段支持以下索引类型：</p>
<ul>
<li><p><code translate="no">INVERTED</code></p>
<p>这通常适用于类字符串或分类筛选器，如<code translate="no">structA[color]</code> 或<code translate="no">structA[str_val]</code> 。有关详细信息，请参阅<a href="/docs/zh/inverted.md">INVERTED</a>。</p></li>
<li><p><code translate="no">STL_SORT</code></p>
<p>这通常适用于数值的范围或顺序式加速，如<code translate="no">strctA[num_val]</code> 。详情请参阅<a href="/docs/zh/stl-sort.md">STL_SORT</a>。</p></li>
</ul></li>
<li><p><strong>向上插入数据</strong></p>
<p>结构体在合并模式下不支持倒插。但是，您仍然可以在覆盖模式下执行上插入操作，以更新 Structs 中的数据。有关合并模式下的 upsert 与覆盖模式下的<a href="/docs/zh/upsert-entities.md#Overview">upsert</a> 之间的区别，请参阅 "<a href="/docs/zh/upsert-entities.md#Overview">Upsert Entities</a>"。</p></li>
<li><p><strong>标量过滤</strong></p>
<p>您可以使用<strong>匹配系列中的</strong> <strong>元素过滤器</strong>和<strong>操作符</strong>对 StructArray 字段中的标量子字段进行标量过滤。有关详情，请参阅 "<a href="/docs/zh/array-of-structs.md#Scalar-filtering-in-a-StructArray-field">结构数组字段中的标量过滤</a>"。</p></li>
</ul>
<h2 id="Add-a-StructArray" class="common-anchor-header">添加结构数组<button data-href="#Add-a-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>要在 Milvus 中添加一个 StructArray 字段，需要在创建 Collections 时定义一个数组字段，并将其元素的数据类型设置为 Struct。具体过程如下</p>
<ol>
<li><p>将字段作为数组字段添加到 Collections Schema 时，将字段的数据类型设置为<code translate="no">DataType.ARRAY</code> 。</p></li>
<li><p>将字段的<code translate="no">element_type</code> 属性设置为<code translate="no">DataType.STRUCT</code> ，使字段成为 Struct 数组。</p></li>
<li><p>创建 Struct 模式并包含所需字段。然后，在字段的<code translate="no">struct_schema</code> 属性中引用 Struct 模式。</p></li>
<li><p>将字段的<code translate="no">max_capacity</code> 属性设置为适当的值，以指定每个实体在该字段中可包含的最大 Struct 数。</p></li>
<li><p><strong>(可选</strong>）可以为 Struct 元素中的任何字段设置<code translate="no">mmap.enabled</code> ，以平衡 Struct 中的冷热数据。</p></li>
</ol>
<p>下面是如何定义包含 StructArray 字段的 Collections 模式：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

schema = client.create_schema()

<span class="hljs-comment"># add the primary field to the collection</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># add some scalar fields to the collection</span>
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;author&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;year_of_publication&quot;</span>, datatype=DataType.INT64)

<span class="hljs-comment"># add a vector field to the collection</span>
schema.add_field(field_name=<span class="hljs-string">&quot;title_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line"><span class="hljs-comment"># Create a struct schema</span></span>
<span class="highlighted-comment-line">struct_schema = client.create_struct_field_schema()</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># add a scalar field to the struct</span></span>
<span class="highlighted-comment-line">struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)</span>
<span class="highlighted-comment-line">struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># add a vector field to the struct with mmap enabled</span></span>
<span class="highlighted-comment-line">struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># reference the struct schema in an Array field with its </span></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># element type set to `DataType.STRUCT`</span></span>
<span class="highlighted-comment-line">schema.add_field(<span class="hljs-string">&quot;chunks&quot;</span>, datatype=DataType.ARRAY, element_type=DataType.STRUCT, </span>
<span class="highlighted-comment-line">                    struct_schema=struct_schema, max_capacity=<span class="hljs-number">1000</span>)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">collectionSchema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;author&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;year_of_publication&quot;</span>)
        .dataType(DataType.Int64)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

Map&lt;String, String&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;mmap_enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>);
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;chunks&quot;</span>)
        .dataType(DataType.Array)
        .elementType(DataType.Struct)
        .maxCapacity(<span class="hljs-number">1000</span>)
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
                .dataType(DataType.VarChar)
                .maxLength(<span class="hljs-number">65535</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;chapter&quot;</span>)
                .dataType(DataType.VarChar)
                .maxLength(<span class="hljs-number">512</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;text_vector&quot;</span>)
                .dataType(DataType.FloatVector)
                .dimension(VECTOR_DIM)
                .typeParams(params)
                .build())
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);

<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">INT64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;author&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;year_of_publication&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">INT64</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title_vector&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FLOAT_VECTOR</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>,
  },
<span class="highlighted-comment-line">  {</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">ARRAY</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">STRUCT</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">fields</span>: [</span>
<span class="highlighted-comment-line">      {</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">max_length</span>: <span class="hljs-number">65535</span>,</span>
<span class="highlighted-comment-line">      },</span>
<span class="highlighted-comment-line">      {</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chapter&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,</span>
<span class="highlighted-comment-line">      },</span>
<span class="highlighted-comment-line">      {</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_vector&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FLOAT_VECTOR</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">mmap_enabled</span>: <span class="hljs-literal">true</span>,</span>
<span class="highlighted-comment-line">      },</span>
<span class="highlighted-comment-line">    ],</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">1000</span>,</span>
<span class="highlighted-comment-line">  },</span>
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
SCHEMA=<span class="hljs-string">&#x27;{
  &quot;autoID&quot;: true,
  &quot;fields&quot;: [
    {
      &quot;fieldName&quot;: &quot;id&quot;,
      &quot;dataType&quot;: &quot;Int64&quot;,
      &quot;isPrimary&quot;: true
    },
    {
      &quot;fieldName&quot;: &quot;title&quot;,
      &quot;dataType&quot;: &quot;VarChar&quot;,
      &quot;elementTypeParams&quot;: { &quot;max_length&quot;: &quot;512&quot; }
    },
    {
      &quot;fieldName&quot;: &quot;author&quot;,
      &quot;dataType&quot;: &quot;VarChar&quot;,
      &quot;elementTypeParams&quot;: { &quot;max_length&quot;: &quot;512&quot; }
    },
    {
      &quot;fieldName&quot;: &quot;year_of_publication&quot;,
      &quot;dataType&quot;: &quot;Int64&quot;
    },
    {
      &quot;fieldName&quot;: &quot;title_vector&quot;,
      &quot;dataType&quot;: &quot;FloatVector&quot;,
      &quot;elementTypeParams&quot;: { &quot;dim&quot;: &quot;5&quot; }
    }
  ],
  &quot;structArrayFields&quot;: [
    {
      &quot;name&quot;: &quot;chunks&quot;,
      &quot;description&quot;: &quot;Array of document chunks with text and vectors&quot;,
      &quot;elementTypeParams&quot;:{
         &quot;max_capacity&quot;: 1000
      },
      &quot;fields&quot;: [
        {
          &quot;fieldName&quot;: &quot;text&quot;,
          &quot;dataType&quot;: &quot;VarChar&quot;,
          &quot;elementTypeParams&quot;: { &quot;max_length&quot;: &quot;65535&quot; }
        },
        {
          &quot;fieldName&quot;: &quot;chapter&quot;,
          &quot;dataType&quot;: &quot;VarChar&quot;,
          &quot;elementTypeParams&quot;: { &quot;max_length&quot;: &quot;512&quot; }
        },
        {
          &quot;fieldName&quot;: &quot;text_vector&quot;,
          &quot;dataType&quot;: &quot;FloatVector&quot;,
          &quot;elementTypeParams&quot;: {
            &quot;dim&quot;: &quot;5&quot;,
            &quot;mmap_enabled&quot;: &quot;true&quot;
          }
        }
      ]
    }
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>上面代码示例中高亮显示的几行说明了如何在 Collections 模式中包含 StructArray。</p>
<h2 id="Set-index-params" class="common-anchor-header">设置索引参数<button data-href="#Set-index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>所有向量字段都必须设置索引，包括 Collections 中的向量字段和元素 Struct 中定义的向量字段。</p>
<p>适用的索引参数因索引类型而异。有关适用索引参数的详细信息，请参阅<a href="/docs/zh/index-explained.md">Index Explained</a>和所选索引类型的文档。</p>
<h3 id="Index-an-embedding-list" class="common-anchor-header">索引嵌入列表<button data-href="#Index-an-embedding-list" class="anchor-icon" translate="no">
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
    </button></h3><p>要为嵌入式列表建立索引，需要将其索引类型设置为<code translate="no">AUTOINDEX</code> 或上述任何一种适用的索引类型，并使用 Milvus 列出的度量类型来衡量嵌入式列表之间的相似性。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Create an index for the vector field in the collection</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;title_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
)

<span class="highlighted-comment-line"><span class="hljs-comment"># Create an index for the vector field in the element Struct</span></span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;title_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.L2)
        .build());
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.MAX_SIM_COSINE)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;books&quot;</span>,
  <span class="hljs-attr">fields</span>: schema,
});

<span class="hljs-keyword">const</span> indexParams = [
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;title_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;L2&quot;</span>,
  },
<span class="highlighted-comment-line">  {</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,</span>
<span class="highlighted-comment-line">  },</span>
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
INDEX_PARAMS=<span class="hljs-string">&#x27;[
  {
    &quot;fieldName&quot;: &quot;title_vector&quot;,
    &quot;indexName&quot;: &quot;title_vector_index&quot;,
    &quot;indexType&quot;: &quot;AUTOINDEX&quot;,
    &quot;metricType&quot;: &quot;L2&quot;
  },
  {
    &quot;fieldName&quot;: &quot;chunks[text_vector]&quot;,
    &quot;indexName&quot;: &quot;chunks_text_vector_index&quot;,
    &quot;indexType&quot;: &quot;AUTOINDEX&quot;,
    &quot;metricType&quot;: &quot;MAX_SIM_COSINE&quot;
  }
]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Index-a-scalar-struct-sub-field" class="common-anchor-header">为标量结构子字段建立索引<button data-href="#Index-a-scalar-struct-sub-field" class="anchor-icon" translate="no">
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
    </button></h3><p>在标量结构子字段上创建索引时，Milvus 实际上是在<strong>元素级别</strong>而不是行级别建立索引，以加速标量过滤。</p>
<p>下面的代码片段在名为<code translate="no">chunks[text]</code> 的标量 struct 子字段上创建了一个索引。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[text]&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;chunks[text]&quot;</span>)
        .indexType(IndexParam.IndexType.INVERTED)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[text]&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">INDEX_PARAMS += <span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;chunks[text]&quot;,
    &quot;indexName&quot;: &quot;chunks_text_vector_index&quot;,
    &quot;indexType&quot;: &quot;INVERTED&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-collection" class="common-anchor-header">创建 Collections<button data-href="#Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Schema 和索引准备就绪后，就可以创建一个包含 StructArray 字段的 Collection。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(collectionSchema)
        .indexParams(indexParams)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">fields</span>: schema,
  <span class="hljs-attr">indexes</span>: indexParams,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/create&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;description\&quot;: \&quot;A collection for storing book information with struct array chunks\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$SCHEMA</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$INDEX_PARAMS</span>
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data" class="common-anchor-header">插入数据<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>创建 Collections 后，您可以按如下方式插入包含 Structs 数组的数据。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample data</span>
data = {
    <span class="hljs-string">&#x27;title&#x27;</span>: <span class="hljs-string">&#x27;Walden&#x27;</span>,
    <span class="hljs-string">&#x27;title_vector&#x27;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
    <span class="hljs-string">&#x27;author&#x27;</span>: <span class="hljs-string">&#x27;Henry David Thoreau&#x27;</span>,
    <span class="hljs-string">&#x27;year_of_publication&#x27;</span>: <span class="hljs-number">1845</span>,
    <span class="hljs-string">&#x27;chunks&#x27;</span>: [
        {
            <span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;When I wrote the following pages, or rather the bulk of them...&#x27;</span>,
            <span class="hljs-string">&#x27;text_vector&#x27;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.5</span>],
            <span class="hljs-string">&#x27;chapter&#x27;</span>: <span class="hljs-string">&#x27;Economy&#x27;</span>,
        },
        {
            <span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;I would fain say something, not so much concerning the Chinese and...&#x27;</span>,
            <span class="hljs-string">&#x27;text_vector&#x27;</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>],
            <span class="hljs-string">&#x27;chapter&#x27;</span>: <span class="hljs-string">&#x27;Economy&#x27;</span>
        }
    ]
}

<span class="hljs-comment"># insert data</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[data]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonArray;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;Walden&quot;</span>);
row.add(<span class="hljs-string">&quot;title_vector&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>)));
row.addProperty(<span class="hljs-string">&quot;author&quot;</span>, <span class="hljs-string">&quot;Henry David Thoreau&quot;</span>);
row.addProperty(<span class="hljs-string">&quot;year_of_publication&quot;</span>, <span class="hljs-number">1845</span>);

<span class="hljs-type">JsonArray</span> <span class="hljs-variable">structArr</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonArray</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">struct1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
struct1.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;When I wrote the following pages, or rather the bulk of them...&quot;</span>);
struct1.add(<span class="hljs-string">&quot;text_vector&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.3f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.5f</span>)));
struct1.addProperty(<span class="hljs-string">&quot;chapter&quot;</span>, <span class="hljs-string">&quot;Economy&quot;</span>);
structArr.add(struct1);
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">struct2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
struct2.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;I would fain say something, not so much concerning the Chinese and...&quot;</span>);
struct2.add(<span class="hljs-string">&quot;text_vector&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.7f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.7f</span>, <span class="hljs-number">0.8f</span>)));
struct2.addProperty(<span class="hljs-string">&quot;chapter&quot;</span>, <span class="hljs-string">&quot;Economy&quot;</span>);
structArr.add(struct2);

row.add(<span class="hljs-string">&quot;chunks&quot;</span>, structArr);

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(row))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">  {
    <span class="hljs-attr">id</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Walden&quot;</span>,
    <span class="hljs-attr">title_vector</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
    <span class="hljs-attr">author</span>: <span class="hljs-string">&quot;Henry David Thoreau&quot;</span>,
    <span class="hljs-string">&quot;year-of-publication&quot;</span>: <span class="hljs-number">1845</span>,
    <span class="hljs-attr">chunks</span>: [
      {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;When I wrote the following pages, or rather the bulk of them...&quot;</span>,
        <span class="hljs-attr">text_vector</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.5</span>],
        <span class="hljs-attr">chapter</span>: <span class="hljs-string">&quot;Economy&quot;</span>,
      },
      {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;I would fain say something, not so much concerning the Chinese and...&quot;</span>,
        <span class="hljs-attr">text_vector</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>],
        <span class="hljs-attr">chapter</span>: <span class="hljs-string">&quot;Economy&quot;</span>,
      },
    ],
  },
];

<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;books&quot;</span>,
  <span class="hljs-attr">data</span>: data,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/insert&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
      {
        &quot;title&quot;: &quot;Walden&quot;,
        &quot;title_vector&quot;: [0.1, 0.2, 0.3, 0.4, 0.5],
        &quot;author&quot;: &quot;Henry David Thoreau&quot;,
        &quot;year_of_publication&quot;: 1845,
        &quot;chunks&quot;: [
          {
            &quot;text&quot;: &quot;When I wrote the following pages, or rather the bulk of them...&quot;,
            &quot;text_vector&quot;: [0.3, 0.2, 0.3, 0.2, 0.5],
            &quot;chapter&quot;: &quot;Economy&quot;
          },
          {
            &quot;text&quot;: &quot;I would fain say something, not so much concerning the Chinese and...&quot;,
            &quot;text_vector&quot;: [0.7, 0.4, 0.2, 0.7, 0.8],
            &quot;chapter&quot;: &quot;Economy&quot;
          }
        ]
      }
    ]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>需要更多数据？</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>, <span class="hljs-type">Dict</span>, <span class="hljs-type">Any</span>

<span class="hljs-comment"># Real classic books (title, author, year)</span>
BOOKS = [
    (<span class="hljs-string">&quot;Pride and Prejudice&quot;</span>, <span class="hljs-string">&quot;Jane Austen&quot;</span>, <span class="hljs-number">1813</span>),
    (<span class="hljs-string">&quot;Moby Dick&quot;</span>, <span class="hljs-string">&quot;Herman Melville&quot;</span>, <span class="hljs-number">1851</span>),
    (<span class="hljs-string">&quot;Frankenstein&quot;</span>, <span class="hljs-string">&quot;Mary Shelley&quot;</span>, <span class="hljs-number">1818</span>),
    (<span class="hljs-string">&quot;The Picture of Dorian Gray&quot;</span>, <span class="hljs-string">&quot;Oscar Wilde&quot;</span>, <span class="hljs-number">1890</span>),
    (<span class="hljs-string">&quot;Dracula&quot;</span>, <span class="hljs-string">&quot;Bram Stoker&quot;</span>, <span class="hljs-number">1897</span>),
    (<span class="hljs-string">&quot;The Adventures of Sherlock Holmes&quot;</span>, <span class="hljs-string">&quot;Arthur Conan Doyle&quot;</span>, <span class="hljs-number">1892</span>),
    (<span class="hljs-string">&quot;Alice&#x27;s Adventures in Wonderland&quot;</span>, <span class="hljs-string">&quot;Lewis Carroll&quot;</span>, <span class="hljs-number">1865</span>),
    (<span class="hljs-string">&quot;The Time Machine&quot;</span>, <span class="hljs-string">&quot;H.G. Wells&quot;</span>, <span class="hljs-number">1895</span>),
    (<span class="hljs-string">&quot;The Scarlet Letter&quot;</span>, <span class="hljs-string">&quot;Nathaniel Hawthorne&quot;</span>, <span class="hljs-number">1850</span>),
    (<span class="hljs-string">&quot;Leaves of Grass&quot;</span>, <span class="hljs-string">&quot;Walt Whitman&quot;</span>, <span class="hljs-number">1855</span>),
    (<span class="hljs-string">&quot;The Brothers Karamazov&quot;</span>, <span class="hljs-string">&quot;Fyodor Dostoevsky&quot;</span>, <span class="hljs-number">1880</span>),
    (<span class="hljs-string">&quot;Crime and Punishment&quot;</span>, <span class="hljs-string">&quot;Fyodor Dostoevsky&quot;</span>, <span class="hljs-number">1866</span>),
    (<span class="hljs-string">&quot;Anna Karenina&quot;</span>, <span class="hljs-string">&quot;Leo Tolstoy&quot;</span>, <span class="hljs-number">1877</span>),
    (<span class="hljs-string">&quot;War and Peace&quot;</span>, <span class="hljs-string">&quot;Leo Tolstoy&quot;</span>, <span class="hljs-number">1869</span>),
    (<span class="hljs-string">&quot;Great Expectations&quot;</span>, <span class="hljs-string">&quot;Charles Dickens&quot;</span>, <span class="hljs-number">1861</span>),
    (<span class="hljs-string">&quot;Oliver Twist&quot;</span>, <span class="hljs-string">&quot;Charles Dickens&quot;</span>, <span class="hljs-number">1837</span>),
    (<span class="hljs-string">&quot;Wuthering Heights&quot;</span>, <span class="hljs-string">&quot;Emily Brontë&quot;</span>, <span class="hljs-number">1847</span>),
    (<span class="hljs-string">&quot;Jane Eyre&quot;</span>, <span class="hljs-string">&quot;Charlotte Brontë&quot;</span>, <span class="hljs-number">1847</span>),
    (<span class="hljs-string">&quot;The Call of the Wild&quot;</span>, <span class="hljs-string">&quot;Jack London&quot;</span>, <span class="hljs-number">1903</span>),
    (<span class="hljs-string">&quot;The Jungle Book&quot;</span>, <span class="hljs-string">&quot;Rudyard Kipling&quot;</span>, <span class="hljs-number">1894</span>),
]

<span class="hljs-comment"># Common chapter names for classics</span>
CHAPTERS = [
    <span class="hljs-string">&quot;Introduction&quot;</span>, <span class="hljs-string">&quot;Prologue&quot;</span>, <span class="hljs-string">&quot;Chapter I&quot;</span>, <span class="hljs-string">&quot;Chapter II&quot;</span>, <span class="hljs-string">&quot;Chapter III&quot;</span>,
    <span class="hljs-string">&quot;Chapter IV&quot;</span>, <span class="hljs-string">&quot;Chapter V&quot;</span>, <span class="hljs-string">&quot;Chapter VI&quot;</span>, <span class="hljs-string">&quot;Chapter VII&quot;</span>, <span class="hljs-string">&quot;Chapter VIII&quot;</span>,
    <span class="hljs-string">&quot;Chapter IX&quot;</span>, <span class="hljs-string">&quot;Chapter X&quot;</span>, <span class="hljs-string">&quot;Epilogue&quot;</span>, <span class="hljs-string">&quot;Conclusion&quot;</span>, <span class="hljs-string">&quot;Afterword&quot;</span>,
    <span class="hljs-string">&quot;Economy&quot;</span>, <span class="hljs-string">&quot;Where I Lived&quot;</span>, <span class="hljs-string">&quot;Reading&quot;</span>, <span class="hljs-string">&quot;Sounds&quot;</span>, <span class="hljs-string">&quot;Solitude&quot;</span>,
    <span class="hljs-string">&quot;Visitors&quot;</span>, <span class="hljs-string">&quot;The Bean-Field&quot;</span>, <span class="hljs-string">&quot;The Village&quot;</span>, <span class="hljs-string">&quot;The Ponds&quot;</span>, <span class="hljs-string">&quot;Baker Farm&quot;</span>
]

<span class="hljs-comment"># Placeholder text snippets (mimicking 19th-century prose)</span>
TEXT_SNIPPETS = [
    <span class="hljs-string">&quot;When I wrote the following pages, or rather the bulk of them...&quot;</span>,
    <span class="hljs-string">&quot;I would fain say something, not so much concerning the Chinese and...&quot;</span>,
    <span class="hljs-string">&quot;It is a truth universally acknowledged, that a single man in possession...&quot;</span>,
    <span class="hljs-string">&quot;Call me Ishmael. Some years ago—never mind how long precisely...&quot;</span>,
    <span class="hljs-string">&quot;It was the best of times, it was the worst of times...&quot;</span>,
    <span class="hljs-string">&quot;All happy families are alike; each unhappy family is unhappy in its own way.&quot;</span>,
    <span class="hljs-string">&quot;Whether I shall turn out to be the hero of my own life, or whether that station...&quot;</span>,
    <span class="hljs-string">&quot;You will rejoice to hear that no disaster has accompanied the commencement...&quot;</span>,
    <span class="hljs-string">&quot;The world is too much with us; late and soon, getting and spending...&quot;</span>,
    <span class="hljs-string">&quot;He was an old man who fished alone in a skiff in the Gulf Stream...&quot;</span>
]

<span class="hljs-keyword">def</span> <span class="hljs-title function_">random_vector</span>() -&gt; <span class="hljs-type">List</span>[<span class="hljs-built_in">float</span>]:
    <span class="hljs-keyword">return</span> [<span class="hljs-built_in">round</span>(random.random(), <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>)]

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_chunk</span>() -&gt; <span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]:
    <span class="hljs-keyword">return</span> {
        <span class="hljs-string">&quot;text&quot;</span>: random.choice(TEXT_SNIPPETS),
        <span class="hljs-string">&quot;text_vector&quot;</span>: random_vector(),
        <span class="hljs-string">&quot;chapter&quot;</span>: random.choice(CHAPTERS)
    }

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_record</span>(<span class="hljs-params">record_id: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]:
    title, author, year = random.choice(BOOKS)
    num_chunks = random.randint(<span class="hljs-number">1</span>, <span class="hljs-number">5</span>)  <span class="hljs-comment"># 1 to 5 chunks per book</span>
    chunks = [generate_chunk() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_chunks)]
    <span class="hljs-keyword">return</span> {
        <span class="hljs-string">&quot;title&quot;</span>: title,
        <span class="hljs-string">&quot;title_vector&quot;</span>: random_vector(),
        <span class="hljs-string">&quot;author&quot;</span>: author,
        <span class="hljs-string">&quot;year_of_publication&quot;</span>: year,
        <span class="hljs-string">&quot;chunks&quot;</span>: chunks
    }

<span class="hljs-comment"># Generate 1000 records</span>
data = [generate_record(i) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>)]

<span class="hljs-comment"># Insert the generated data</span>
client.insert(collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, data=data)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h2 id="Vector-search-in-a-StructArray-field" class="common-anchor-header">在 StructArray 字段中进行向量搜索<button data-href="#Vector-search-in-a-StructArray-field" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以在 Collections 的向量字段和 StructArray 中执行向量搜索。</p>
<p>具体来说，你应该将 StructArray 字段的名称和 Struct 元素中目标向量字段的名称串联起来，作为搜索请求中<code translate="no">anns_field</code> 参数的值，并使用<code translate="no">EmbeddingList</code> 来整齐地组织查询向量。</p>
<div class="alert note">
<p>Milvus 提供的<code translate="no">EmbeddingList</code> 可以帮助你更整齐地组织针对 StructArray 中的 Embeddings 列表进行搜索的查询向量。每个<code translate="no">EmbeddingList</code> 至少包含一个向量嵌入，并期望返回一定数量的 topK 实体。</p>
<p>不过，<code translate="no">EmbeddingList</code> 只能用于没有范围搜索或分组搜索参数的<code translate="no">search()</code> 请求，更不用说<code translate="no">search_iterator()</code> 请求了。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

<span class="hljs-comment"># each query embedding list triggers a single search</span>
embeddingList1 = EmbeddingList()
embeddingList1.add([<span class="hljs-number">0.2</span>, <span class="hljs-number">0.9</span>, <span class="hljs-number">0.4</span>, -<span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>])

embeddingList2 = EmbeddingList()
embeddingList2.add([-<span class="hljs-number">0.2</span>, -<span class="hljs-number">0.2</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.9</span>])
embeddingList2.add([-<span class="hljs-number">0.4</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>])

<span class="hljs-comment"># a search with a single embedding list</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[ embeddingList1 ],
    anns_field=<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>},
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;chunks[text]&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddingList;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;

<span class="hljs-type">EmbeddingList</span> <span class="hljs-variable">embeddingList1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddingList</span>();
embeddingList1.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.2f</span>, <span class="hljs-number">0.9f</span>, <span class="hljs-number">0.4f</span>, -<span class="hljs-number">0.3f</span>, <span class="hljs-number">0.2f</span>}));

<span class="hljs-type">EmbeddingList</span> <span class="hljs-variable">embeddingList2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddingList</span>();
embeddingList2.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.2f</span>, -<span class="hljs-number">0.2f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>, <span class="hljs-number">0.9f</span>}));
embeddingList2.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.4f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.8f</span>, <span class="hljs-number">0.2f</span>}));

Map&lt;String, Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .annsField(<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>)
        .data(Collections.singletonList(embeddingList1))
        .searchParams(params)
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;chunks[text]&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> embeddingList1 = [[<span class="hljs-number">0.2</span>, <span class="hljs-number">0.9</span>, <span class="hljs-number">0.4</span>, -<span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>]];
<span class="hljs-keyword">const</span> embeddingList2 = [
  [-<span class="hljs-number">0.2</span>, -<span class="hljs-number">0.2</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.9</span>],
  [-<span class="hljs-number">0.4</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>],
];
<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;books&quot;</span>,
  <span class="hljs-attr">data</span>: embeddingList1,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,
  <span class="hljs-attr">search_params</span>: { <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span> },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;chunks[text]&quot;</span>],
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
embeddingList1=<span class="hljs-string">&#x27;[[0.2,0.9,0.4,-0.3,0.2]]&#x27;</span>
embeddingList2=<span class="hljs-string">&#x27;[[-0.2,-0.2,0.5,0.6,0.9],[-0.4,0.3,0.5,0.8,0.2]]&#x27;</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;data\&quot;: [<span class="hljs-variable">$embeddingList1</span>],
    \&quot;annsField\&quot;: \&quot;chunks[text_vector]\&quot;,
    \&quot;searchParams\&quot;: {\&quot;metric_type\&quot;: \&quot;MAX_SIM_COSINE\&quot;},
    \&quot;limit\&quot;: 3,
    \&quot;outputFields\&quot;: [\&quot;chunks[text]\&quot;]
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>上述搜索请求使用<code translate="no">chunks[text_vector]</code> 来引用 Struct 元素中的<code translate="no">text_vector</code> 字段。您可以使用此语法设置<code translate="no">anns_field</code> 和<code translate="no">output_fields</code> 参数。</p>
<p>输出将是三个最相似实体的列表。</p>
<p><details></p>
<p><summary>输出</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># [</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &#x27;id&#x27;: 461417939772144945,</span>
<span class="hljs-comment">#             &#x27;distance&#x27;: 0.9675756096839905,</span>
<span class="hljs-comment">#             &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#                 &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;All happy families are alike; each unhappy family is unhappy in its own way.&#x27;}</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &#x27;id&#x27;: 461417939772144965,</span>
<span class="hljs-comment">#             &#x27;distance&#x27;: 0.9555778503417969,</span>
<span class="hljs-comment">#             &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#                 &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;When I wrote the following pages, or rather the bulk of them...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;It was the best of times, it was the worst of times...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &#x27;id&#x27;: 461417939772144962,</span>
<span class="hljs-comment">#             &#x27;distance&#x27;: 0.9469035863876343,</span>
<span class="hljs-comment">#             &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#                 &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>您还可以在<code translate="no">data</code> 参数中包含多个嵌入列表，以检索每个嵌入列表的搜索结果。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># a search with multiple embedding lists</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[ embeddingList1, embeddingList2 ],
    anns_field=<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>},
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;chunks[text]&quot;</span>]
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .annsField(<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>)
        .data(Arrays.asList(embeddingList1, embeddingList2))
        .searchParams(params)
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;chunks[text]&quot;</span>))
        .build());
        
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; searchResults.size(); i++) {
    System.out.println(<span class="hljs-string">&quot;Results of No.&quot;</span> + i + <span class="hljs-string">&quot; embedding list&quot;</span>);
    List&lt;SearchResp.SearchResult&gt; results = searchResults.get(i);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> results2 = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;books&quot;</span>,
  <span class="hljs-attr">data</span>: [embeddingList1, embeddingList2],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,
  <span class="hljs-attr">search_params</span>: { <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span> },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;chunks[text]&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;data\&quot;: [<span class="hljs-variable">$embeddingList1</span>, <span class="hljs-variable">$embeddingList2</span>],
    \&quot;annsField\&quot;: \&quot;chunks[text_vector]\&quot;,
    \&quot;searchParams\&quot;: {\&quot;metric_type\&quot;: \&quot;MAX_SIM_COSINE\&quot;},
    \&quot;limit\&quot;: 3,
    \&quot;outputFields\&quot;: [\&quot;chunks[text]\&quot;]
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>输出将是每个嵌入列表中三个最相似实体的列表。</p>
<p><details></p>
<p><summary>输出</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># [</span>
<span class="hljs-comment">#   [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144945,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 0.9675756096839905,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;All happy families are alike; each unhappy family is unhappy in its own way.&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144965,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 0.9555778503417969,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;When I wrote the following pages, or rather the bulk of them...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It was the best of times, it was the worst of times...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144962,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 0.9469035863876343,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment">#   ],</span>
<span class="hljs-comment">#   [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144663,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 1.9761409759521484,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It was the best of times, it was the worst of times...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It is a truth universally acknowledged, that a single man in possession...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Whether I shall turn out to be the hero of my own life, or whether that station...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144692,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 1.974656581878662,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It is a truth universally acknowledged, that a single man in possession...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144662,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 1.9406685829162598,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It is a truth universally acknowledged, that a single man in possession...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment">#   ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>在上述代码示例中，<code translate="no">embeddingList1</code> 是一个向量的嵌入列表，而<code translate="no">embeddingList2</code> 包含两个向量。每个矢量都会触发一个单独的搜索请求，并期望得到前 K 个相似实体的列表。</p>
<h2 id="Scalar-filtering-in-a-StructArray-field" class="common-anchor-header">在 StructArray 字段中进行标量过滤<button data-href="#Scalar-filtering-in-a-StructArray-field" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以使用<strong>匹配系列中的</strong> <strong>元素过滤器</strong>和<strong>操作符</strong>，对结构数组（StructArray）中的标量子字段进行标量过滤。有关上述两种操作符类型的详细信息和示例，请参阅<a href="/docs/zh/struct-array-operators.md">结构数组操作符</a>。</p>
<h3 id="Element-filters" class="common-anchor-header">元素过滤器<button data-href="#Element-filters" class="anchor-icon" translate="no">
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
    </button></h3><p>这是一种实体级过滤器，用于检查实体的 StructArray 字段中是否至少有一个元素满足谓词。例如，下面的元素过滤器返回在<code translate="no">text</code> 子字段中至少包含一个以 "Red "开头的块的实体。</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[text] LIKE <span class="hljs-string">&quot;Red%&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>您可以在谓词中使用几乎所有的比较、范围和算术操作符，谓词按每个元素进行评估，逻辑操作符可用于组合同一元素上的多个条件。有关详细信息，请参阅<a href="/docs/zh/basic-operators.md">基本操作符</a>。</p>
<p>如果过滤搜索或查询请求中存在多个标量过滤表达式，请将元素过滤表达式放在所有实体级过滤表达式之后，如下图所示。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># correct</span>
<span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span> &amp;&amp; element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>)

<span class="hljs-comment"># incorrect, resulting errors</span>
element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>) &amp;&amp; <span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Match-family-operators" class="common-anchor-header">匹配族操作符<button data-href="#Match-family-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>匹配族操作符也可以在 StructArray 字段上操作。你可以确定有多少元素（或多大比例）必须满足元素谓词，而不是简单地检查元素是否存在。</p>
<ul>
<li><p><code translate="no">MATCH_ANY(chunks, $[text] LIKE &quot;Red%&quot;)</code></p>
<p>这将返回在<code translate="no">text</code> 子字段中至少包含一个以 "Red "开头的块的实体；从语义上讲，这等同于<code translate="no">element_filter</code> 。</p></li>
<li><p><code translate="no">MATCH_ALL(chunks, $[text] LIKE &quot;Red%&quot;)</code></p>
<p>返回所有块中文本子字段均以 "Red "开头的实体。</p></li>
<li><p><code translate="no">MATCH_LEAST(chunks, $[text] LIKE &quot;Red%&quot;, k)</code></p>
<p>返回至少包含<code translate="no">k</code> 块的实体，这些块在<code translate="no">text</code> 子字段中以 "Red "开头。</p></li>
<li><p><code translate="no">MATCH_MOST(chunks, $[text] LIKE &quot;Red%&quot;, k)</code></p>
<p>返回在<code translate="no">text</code> 子字段中最多包含以 "红色 "开头的<code translate="no">k</code> 块的实体。</p></li>
<li><p><code translate="no">MATCH_EXACT(chunks, $[text] LIKE &quot;Red%&quot;, k)</code></p>
<p>返回在<code translate="no">text</code> 子字段中恰好包含以 "红色 "开头的<code translate="no">k</code> 块的实体。</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">下一步工作<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><p>本地 StructArray 数据类型的开发是 Milvus 处理复杂数据结构能力的一大进步。为了更好地了解其使用案例并最大限度地利用这一新功能，我们建议您阅读《<a href="/docs/zh/best-practices-for-array-of-structs.md">使用结构数组的 Schema 设计</a>》。</p>
