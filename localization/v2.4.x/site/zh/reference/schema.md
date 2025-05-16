---
id: schema.md
summary: 了解如何在 Milvus 中定义 Schema。
title: 管理模式
---
<h1 id="Manage-Schema" class="common-anchor-header">管理模式<button data-href="#Manage-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍 Milvus 中的模式。Schema 用于定义 Collections 的属性和其中的字段。</p>
<h2 id="Field-schema" class="common-anchor-header">字段模式<button data-href="#Field-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>字段模式是字段的逻辑定义。在定义<a href="#Collection-schema">集合模式</a>和<a href="/docs/zh/v2.4.x/manage-collections.md">管理集合</a>之前，首先需要定义它。</p>
<p>Milvus 只支持在一个 Collection 中使用一个主键字段。</p>
<h3 id="Field-schema-properties" class="common-anchor-header">字段模式属性</h3><table class="properties">
    <thead>
    <tr>
        <th>属性</th>
        <th>说明</th>
        <th>说明</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">name</code></td>
        <td>要创建的 Collection 中字段的名称</td>
        <td>数据类型：<br/>必填</td>
    </tr>
    <tr>
        <td><code translate="no">dtype</code></td>
        <td>字段的数据类型</td>
        <td>必须填写</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>字段描述</td>
        <td>数据类型： 字符串：<br/>可选</td>
    </tr>
    <tr>
        <td><code translate="no">is_primary</code></td>
        <td>是否将字段设为主键字段</td>
        <td>数据类型：布尔 (  或  )：布尔型 (<code translate="no">true</code> 或<code translate="no">false</code>)。<br/>主键字段必须设置</td>
    </tr>
        <tr>
            <td><code translate="no">auto_id</code> (主键字段必须）</td>
            <td>启用或禁用自动 ID（主键）分配的开关。</td>
            <td><code translate="no">True</code> 或<code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">max_length</code> (对 VARCHAR 字段必填）</td>
            <td>允许插入字符串的最大字节长度。请注意，多字节字符（如 Unicode 字符）可能占用一个以上的字节，因此请确保插入字符串的字节长度不超过指定的限制。</td>
            <td>[1, 65,535]</td>
        </tr>
    <tr>
        <td><code translate="no">dim</code></td>
        <td>向量的维数</td>
            <td>数据类型：整数&isin;[1, 32768]。<br/>密集向量场必须使用。<a href="https://milvus.io/docs/sparse_vector.md">稀疏向量场</a>省略。</td>
    </tr>
    <tr>
        <td><code translate="no">is_partition_key</code></td>
        <td>该字段是否为 Partition Key 字段。</td>
        <td>数据类型：布尔类型 (<code translate="no">true</code> 或<code translate="no">false</code>)。</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-field-schema" class="common-anchor-header">创建字段 Schema</h3><p>为了降低数据插入时的复杂性，Milvus 允许你在创建字段模式时为每个标量字段指定一个默认值，主键字段除外。这表明，如果在插入数据时某个字段为空，则您为该字段指定的默认值将适用。</p>
<p>创建常规字段模式 Schema：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># The following creates a field and use it as the partition key</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>创建带有默认字段值的字段模式 Schema：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema

fields = [
  FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
  <span class="hljs-comment"># configure default value `25` for field `age`</span>
  FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, default_value=<span class="hljs-number">25</span>, description=<span class="hljs-string">&quot;age&quot;</span>),
  embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)
]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Supported-data-types" class="common-anchor-header">支持的数据类型</h3><p><code translate="no">DataType</code> 定义字段包含的数据类型。不同的字段支持不同的数据类型。</p>
<ul>
<li><p>主键字段支持</p>
<ul>
<li>INT64: numpy.int64</li>
<li>varchar: varchar</li>
</ul></li>
<li><p>标量字段支持</p>
<ul>
<li>BOOL: 布尔型 (<code translate="no">true</code> 或<code translate="no">false</code>)</li>
<li>INT8: numpy.int8</li>
<li>INT16: numpy.int16</li>
<li>INT32: numpy.int32</li>
<li>INT64: numpy.int64</li>
<li>FLOAT：numpy.float32</li>
<li>DOUBLE: numpy.double</li>
<li>varchar: varchar</li>
<li>JSON:<a href="/docs/zh/v2.4.x/use-json-fields.md">JSON</a></li>
<li>Array: 数组<a href="/docs/zh/v2.4.x/array_data_type.md">数组</a></li>
</ul>
<p>JSON 作为一种复合数据类型可用。JSON 字段由键值对组成。每个键都是字符串，值可以是数字、字符串、布尔值、数组或列表。有关详情，请参阅<a href="/docs/zh/v2.4.x/use-json-fields.md">JSON：一种新的数据类型</a>。</p></li>
<li><p>向量字段支持：</p>
<ul>
<li>BINARY_VECTOR：将二进制数据存储为 0 和 1 的序列，用于图像处理和信息检索中的紧凑特征表示。</li>
<li>FLOAT_VECTOR：存储 32 位浮点数，常用于科学计算和机器学习中的实数表示。</li>
<li>FLOAT16_VECTOR：存储 16 位半精度浮点数，用于深度学习和 GPU 计算，以提高内存和带宽效率。</li>
<li>BFLOAT16_VECTOR：存储精度降低但指数范围与 Float32 相同的 16 位浮点数，在深度学习中很受欢迎，可在不明显影响精度的情况下降低内存和计算要求。</li>
<li>SPARSE_FLOAT_VECTOR：存储非零元素及其相应索引的列表，用于表示稀疏向量。更多信息，请参阅<a href="/docs/zh/v2.4.x/sparse_vector.md">稀疏向量</a>。</li>
</ul>
<p>Milvus 支持在一个 Collections 中使用多个向量场。更多信息，请参阅<a href="/docs/zh/v2.4.x/multi-vector-search.md">混合搜索</a>。</p></li>
</ul>
<h2 id="Collection-schema" class="common-anchor-header">Collections 模式<button data-href="#Collection-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Collections schema 是一个 Collection 的逻辑定义。通常，在定义集合模式和<a href="/docs/zh/v2.4.x/manage-collections.md">管理集合</a>之前，需要先定义<a href="#Field-schema">字段</a>模式。</p>
<h3 id="Collection-schema-properties" class="common-anchor-header">集合模式属性</h3><table class="properties">
    <thead>
    <tr>
        <th>属性</th>
        <th>说明</th>
        <th>说明</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">field</code></td>
        <td>要创建的 Collection 中的字段</td>
        <td>必填</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>Collection 的描述</td>
        <td>数据类型：<br/>可选</td>
    </tr>
    <tr>
        <td><code translate="no">partition_key_field</code></td>
        <td>用作 Partition Key 的字段名称。</td>
        <td>数据类型： 字符串：<br/>可选</td>
    </tr>
    <tr>
        <td><code translate="no">enable_dynamic_field</code></td>
        <td>是否启用动态 Schema</td>
        <td>数据类型：布尔型 (<code translate="no">true</code> 或<code translate="no">false</code>)。<br/>可选，默认为<code translate="no">False</code> 。<br/>有关动态模式的详细信息，请参阅动态<a herf="enable-dynamic-field.md">模式</a>和管理 Collections 的用户指南。</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-collection-schema" class="common-anchor-header">创建 Collections 模式</h3><div class="alert note">
  在定义 Collections 模式之前先定义字段模式。</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, CollectionSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># Enable partition key on a field if you need to implement multi-tenancy based on the partition-key field</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Set enable_dynamic_field to True if you need to use dynamic fields. </span>
schema = CollectionSchema(fields=[id_field, age_field, embedding_field], auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;desc of a collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>使用指定的 Schema 创建 Collections：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">Collection</span>,connections
conn = connections.<span class="hljs-title function_">connect</span>(host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, port=<span class="hljs-number">19530</span>)
collection_name1 = <span class="hljs-string">&quot;tutorial_1&quot;</span>
collection1 = <span class="hljs-title class_">Collection</span>(name=collection_name1, schema=schema, using=<span class="hljs-string">&#x27;default&#x27;</span>, shards_num=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>可以使用<code translate="no">shards_num</code> 定义分区编号。</li>
<li>可以通过在<code translate="no">using</code> 中指定别名来定义要在其上创建集合的 Milvus 服务器。</li>
<li>如果需要实施<a href="/docs/zh/v2.4.x/multi_tenancy.md">基于分区</a>密钥<a href="/docs/zh/v2.4.x/multi_tenancy.md">的多租户</a>，可以通过在字段上设置<code translate="no">is_partition_key</code> 至<code translate="no">True</code> 来启用<a href="/docs/zh/v2.4.x/multi_tenancy.md">分区密钥</a>功能。</li>
<li>如果需要<a href="/docs/zh/v2.4.x/enable-dynamic-field.md">启用动态字段</a>，可以通过在 Collections Schema 中将<code translate="no">enable_dynamic_field</code> 设置为<code translate="no">True</code> 来启用<a href="/docs/zh/v2.4.x/enable-dynamic-field.md">动态</a> Schema。</li>
</ul>
</div>
<p><br/>
您还可以使用<code translate="no">Collection.construct_from_dataframe</code> ，自动从 DataFrame 生成 Collections Schema 并创建一个 Collection。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
df = pd.DataFrame({
    <span class="hljs-string">&quot;id&quot;</span>: [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;age&quot;</span>: [random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">40</span>) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;embedding&quot;</span>: [[random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;position&quot;</span>: <span class="hljs-string">&quot;test_pos&quot;</span>
})

collection, ins_res = Collection.construct_from_dataframe(
    <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    df,
    primary_field=<span class="hljs-string">&#x27;id&#x27;</span>,
    auto_id=<span class="hljs-literal">False</span>
    )
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><ul>
<li>了解在<a href="/docs/zh/v2.4.x/manage-collections.md">管理 Collections</a> 时如何准备 Schema。</li>
<li>了解有关<a href="/docs/zh/v2.4.x/enable-dynamic-field.md">动态 Schema</a> 的更多信息。</li>
<li>进一步了解<a href="/docs/zh/v2.4.x/multi_tenancy.md">多租户</a>中的 Partition Key。</li>
</ul>
