---
id: enable-dynamic-field.md
title: Dynamic Field
summary: >-
  Milvus 允许您通过一项名为“Dynamic Field”的特殊功能，插入具有灵活且不断演变结构的实体。该字段以名为 $meta 的隐藏 JSON
  字段形式实现，它会自动存储数据中未在 Collection Schema 中显式定义的任何字段。
---
<h1 id="Dynamic-Field" class="common-anchor-header">Dynamic Field<button data-href="#Dynamic-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 通过一项<strong>名为“Dynamic Field”</strong>的特殊功能，允许您插入具有灵活且不断演变结构的实体。该字段以名为<code translate="no">$meta</code> 的隐藏 JSON 字段形式实现，会自动存储数据中<strong>未在</strong>Schema<strong>中显式定义的</strong>任何字段。</p>
<h2 id="How-it-works" class="common-anchor-header">工作原理<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>启用 Dynamic Field 后，Milvus 会为每个实体添加一个名为<code translate="no">$meta</code> 的隐藏字段。该字段为 JSON 类型，这意味着它可以存储任何与 JSON 兼容的数据结构，并支持使用 JSON 路径语法进行索引。</p>
<p>在插入数据时，任何未在Schema中声明的字段都会自动作为键值对存储在此Dynamic Field中。</p>
<p>您无需手动管理 `<code translate="no">$meta</code> `——Milvus 会透明地处理它。</p>
<p>例如，如果您的Schema仅定义了 `<code translate="no">id</code> ` 和 `<code translate="no">vector</code>`，而您插入以下实体：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.3</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Item A&quot;</span><span class="hljs-punctuation">,</span>    <span class="hljs-comment">// Not in schema</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;books&quot;</span>  <span class="hljs-comment">// Not in schema</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>启用 Dynamic Field 功能后，Milvus 会在内部将其存储为：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.3</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">&quot;$meta&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="highlighted-comment-line">    <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Item A&quot;</span><span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;books&quot;</span></span>
<span class="highlighted-comment-line">  <span class="hljs-punctuation">}</span></span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>这使您能够在不修改Schema的情况下演进数据结构。</p>
<p>常见用例包括：</p>
<ul>
<li><p>存储可选字段或不常检索的字段</p></li>
<li><p>捕获因实体而异的元数据</p></li>
<li><p>通过针对特定Dynamic Field键的索引支持灵活过滤</p></li>
</ul>
<h2 id="Supported-data-types" class="common-anchor-header">支持的数据类型<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Dynamic Field 支持 Milvus 提供的所有标量数据类型，包括简单值和复杂值。这些数据类型适用于 **存储在 `<code translate="no">$meta</code>` 中的键的值。</p>
<p><strong>支持的类型包括：</strong></p>
<ul>
<li><p>字符串 (<code translate="no">VARCHAR</code>)</p></li>
<li><p>整数 (<code translate="no">INT8</code>,<code translate="no">INT32</code>,<code translate="no">INT64</code>)</p></li>
<li><p>浮点数（<code translate="no">FLOAT</code> 、<code translate="no">DOUBLE</code> ）</p></li>
<li><p>布尔型 (<code translate="no">BOOL</code>)</p></li>
<li><p>标量数组（<code translate="no">ARRAY</code> ）</p></li>
<li><p>JSON 对象 (<code translate="no">JSON</code>)</p></li>
</ul>
<p><strong>示例：</strong></p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Acme&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">29.99</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;new&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;hot&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;specs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;weight&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;1.2kg&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;dimensions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;width&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;height&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span> <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>上述每个键和值都将存储在<code translate="no">$meta</code> 字段中。</p>
<h2 id="Enable-dynamic-field" class="common-anchor-header">启用 Dynamic Field<button data-href="#Enable-dynamic-field" class="anchor-icon" translate="no">
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
    </button></h2><p>要使用 Dynamic Field 功能，请在创建 Collection Schema 时设置<code translate="no">enable_dynamic_field=True</code> ：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Initialize client</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create schema with dynamic field enabled</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
<span class="highlighted-wrapper-line">    enable_dynamic_field=<span class="hljs-literal">True</span>,</span>
)

<span class="hljs-comment"># Add explicitly defined fields</span>
schema.add_field(field_name=<span class="hljs-string">&quot;my_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;my_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

<span class="hljs-comment"># Create the collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">true</span>)
        .build();
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(Boolean.TRUE)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">CreateCollectionReq</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-comment">// Initialize client</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;localhost:19530&#x27;</span> });

<span class="hljs-comment">// Create collection</span>
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
  <span class="hljs-attr">schema</span>:  [
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;my_id&#x27;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;my_vector&#x27;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">type_params</span>: {
          <span class="hljs-attr">dim</span>: <span class="hljs-string">&#x27;5&#x27;</span>,
      }
   ],
   <span class="hljs-attr">enable_dynamic_field</span>: <span class="hljs-literal">true</span>
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">true</span>)
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;my_id&quot;</span>).pk
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;my_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">5</span>),
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> myIdField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;my_id&quot;,
  &quot;dataType&quot;: &quot;Int64&quot;,
  &quot;isPrimary&quot;: true,
  &quot;autoID&quot;: false
}&#x27;</span>

<span class="hljs-built_in">export</span> myVectorField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;my_vector&quot;,
  &quot;dataType&quot;: &quot;FloatVector&quot;,
  &quot;elementTypeParams&quot;: {
    &quot;dim&quot;: 5
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
  \&quot;autoID\&quot;: false,
  \&quot;enableDynamicField\&quot;: true,
  \&quot;fields\&quot;: [
    <span class="hljs-variable">$myIdField</span>,
    <span class="hljs-variable">$myVectorField</span>
  ]
}&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
  \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-entities-to-the-collection" class="common-anchor-header">向Collection插入实体<button data-href="#Insert-entities-to-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Dynamic Field允许您插入Schema中未定义的额外字段。这些字段将自动存储在 `<code translate="no">$meta</code>` 中。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">entities = [
    {
        <span class="hljs-string">&quot;my_id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-comment"># Explicitly defined primary field</span>
        <span class="hljs-string">&quot;my_vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-comment"># Explicitly defined vector field</span>
        <span class="hljs-string">&quot;overview&quot;</span>: <span class="hljs-string">&quot;Great product&quot;</span>,       <span class="hljs-comment"># Scalar key not defined in schema</span>
        <span class="hljs-string">&quot;words&quot;</span>: <span class="hljs-number">150</span>,                      <span class="hljs-comment"># Scalar key not defined in schema</span>
        <span class="hljs-string">&quot;dynamic_json&quot;</span>: {                  <span class="hljs-comment"># JSON key not defined in schema</span>
            <span class="hljs-string">&quot;varchar&quot;</span>: <span class="hljs-string">&quot;some text&quot;</span>,
            <span class="hljs-string">&quot;nested&quot;</span>: {
                <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-number">42.5</span>
            },
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>        <span class="hljs-comment"># Number stored as string</span>
        }
    }
]

client.insert(collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;my_id&quot;</span>, <span class="hljs-number">1</span>);
row.add(<span class="hljs-string">&quot;my_vector&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>)));
row.addProperty(<span class="hljs-string">&quot;overview&quot;</span>, <span class="hljs-string">&quot;Great product&quot;</span>);
row.addProperty(<span class="hljs-string">&quot;words&quot;</span>, <span class="hljs-number">150</span>);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">dynamic</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
dynamic.addProperty(<span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">&quot;some text&quot;</span>);
dynamic.addProperty(<span class="hljs-string">&quot;string_price&quot;</span>, <span class="hljs-string">&quot;99.99&quot;</span>);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">nested</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
nested.addProperty(<span class="hljs-string">&quot;value&quot;</span>, <span class="hljs-number">42.5</span>);

dynamic.add(<span class="hljs-string">&quot;nested&quot;</span>, nested);
row.add(<span class="hljs-string">&quot;dynamic_json&quot;</span>, dynamic);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(row))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">
<span class="hljs-keyword">const</span> entities = [
  {
    <span class="hljs-attr">my_id</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">my_vector</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
    <span class="hljs-attr">overview</span>: <span class="hljs-string">&#x27;Great product&#x27;</span>,
    <span class="hljs-attr">words</span>: <span class="hljs-number">150</span>,
    <span class="hljs-attr">dynamic_json</span>: {
      <span class="hljs-attr">varchar</span>: <span class="hljs-string">&#x27;some text&#x27;</span>,
      <span class="hljs-attr">nested</span>: {
        <span class="hljs-attr">value</span>: <span class="hljs-number">42.5</span>,
      },
      <span class="hljs-attr">string_price</span>: <span class="hljs-string">&#x27;99.99&#x27;</span>,
    },
  },
];
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">data</span>: entities,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;my_id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;my_vector&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>},
    }).WithColumns(
    column.NewColumnVarChar(<span class="hljs-string">&quot;overview&quot;</span>, []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Great product&quot;</span>}),
    column.NewColumnInt32(<span class="hljs-string">&quot;words&quot;</span>, []<span class="hljs-type">int32</span>{<span class="hljs-number">150</span>}),
    column.NewColumnJSONBytes(<span class="hljs-string">&quot;dynamic_json&quot;</span>, [][]<span class="hljs-type">byte</span>{
        []<span class="hljs-type">byte</span>(<span class="hljs-string">`{
            varchar: &#x27;some text&#x27;,
            nested: {
                value: 42.5,
            },
            string_price: &#x27;99.99&#x27;,
        }`</span>),
    }),
))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&#x27;{
  &quot;data&quot;: [
    {
      &quot;my_id&quot;: 1,
      &quot;my_vector&quot;: [0.1, 0.2, 0.3, 0.4, 0.5],
      &quot;overview&quot;: &quot;Great product&quot;,
      &quot;words&quot;: 150,
      &quot;dynamic_json&quot;: {
        &quot;varchar&quot;: &quot;some text&quot;,
        &quot;nested&quot;: {
          &quot;value&quot;: 42.5
        },
        &quot;string_price&quot;: &quot;99.99&quot;
      }
    }
  ],
  &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-keys-in-the-dynamic-field--Milvus-2511+" class="common-anchor-header">对 Dynamic Field 中的键进行索引<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span><button data-href="#Index-keys-in-the-dynamic-field--Milvus-2511+" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 允许您使用<strong>JSON 路径索引</strong>，对 Dynamic Field 内的特定键创建索引。这些键可以是标量值，也可以是 JSON 对象中的嵌套值。</p>
<div class="alert note">
<p>对Dynamic Field字段键进行索引是<strong>可选的</strong>。即使没有索引，您仍然可以按Dynamic Field字段键进行查询或过滤，但这可能会因需要进行穷举搜索而导致性能下降。</p>
</div>
<h3 id="JSON-path-indexing-syntax" class="common-anchor-header">JSON 路径索引语法<button data-href="#JSON-path-indexing-syntax" class="anchor-icon" translate="no">
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
    </button></h3><p>要创建 JSON 路径索引，请指定：</p>
<ul>
<li><p><strong>JSON 路径</strong>（<code translate="no">json_path</code> ）：您希望建立索引的 JSON 对象中键或嵌套字段的路径。</p>
<ul>
<li><p>示例：<code translate="no">metadata[&quot;category&quot;]</code></p>
<p>这定义了索引引擎应在 JSON 结构中的何处查找。</p></li>
</ul></li>
<li><p><strong>JSON 转换类型</strong>（<code translate="no">json_cast_type</code> ）：Milvus 在解析和索引指定路径处的值时应使用的数据类型。</p>
<ul>
<li><p>该类型必须与被索引字段的实际数据类型相匹配。</p></li>
<li><p>完整列表请参阅<a href="/docs/zh/use-json-fields.md#Supported-JSON-cast-types">“支持的 JSON 转换类型</a>”。</p></li>
</ul></li>
</ul>
<h3 id="Use-JSON-path-to-index-dynamic-field-keys" class="common-anchor-header">使用 JSON 路径对 Dynamic Field 键进行索引<button data-href="#Use-JSON-path-to-index-dynamic-field-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>由于 Dynamic Field 是 JSON 字段，因此您可以使用 JSON 路径语法对其中的任何键进行索引。这既适用于简单的标量值，也适用于复杂的嵌套结构。</p>
<p><strong>JSON 路径示例：</strong></p>
<ul>
<li><p>对于简单键：<code translate="no">overview</code> ，<code translate="no">words</code></p></li>
<li><p>对于嵌套键：<code translate="no">dynamic_json['varchar']</code> ，<code translate="no">dynamic_json['nested']['value']</code></p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

<span class="hljs-comment"># Index a simple string key</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;overview&quot;</span>,  <span class="hljs-comment"># Key name in the dynamic field</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;overview_index&quot;</span>,  <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>,   <span class="hljs-comment"># Data type that Milvus uses when indexing the values</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;overview&quot;</span>        <span class="hljs-comment"># JSON path to the key</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Index a simple numeric key</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;words&quot;</span>,  <span class="hljs-comment"># Key name in the dynamic field</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;words_index&quot;</span>,  <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>,  <span class="hljs-comment"># Data type that Milvus uses when indexing the values</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;words&quot;</span> <span class="hljs-comment"># JSON path to the key</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Index a nested key within a JSON object</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dynamic_json&quot;</span>, <span class="hljs-comment"># JSON key name in the dynamic field</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;json_varchar_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-comment"># Data type that Milvus uses when indexing the values</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;dynamic_json[&#x27;varchar&#x27;]&quot;</span> <span class="hljs-comment"># JSON path to the nested key</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Index a deeply nested key</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dynamic_json&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;json_nested_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;dynamic_json[&#x27;nested&#x27;][&#x27;value&#x27;]&quot;</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

Map&lt;String,Object&gt; extraParams1 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams1.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;overview&quot;</span>);
extraParams1.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;overview&quot;</span>)
        .indexName(<span class="hljs-string">&quot;overview_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams1)
        .build());

Map&lt;String,Object&gt; extraParams2 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams2.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;words&quot;</span>);
extraParams2.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;double&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;words&quot;</span>)
        .indexName(<span class="hljs-string">&quot;words_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams2)
        .build());

Map&lt;String,Object&gt; extraParams3 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams3.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;dynamic_json[&#x27;varchar&#x27;]&quot;</span>);
extraParams3.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;dynamic_json&quot;</span>)
        .indexName(<span class="hljs-string">&quot;json_varchar_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams3)
        .build());

Map&lt;String,Object&gt; extraParams4 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams4.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;dynamic_json[&#x27;nested&#x27;][&#x27;value&#x27;]&quot;</span>);
extraParams4.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;double&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;dynamic_json&quot;</span>)
        .indexName(<span class="hljs-string">&quot;json_nested_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams4)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = [
    {
      <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
      <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;overview&#x27;</span>,
      <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;overview_index&#x27;</span>,
      <span class="hljs-attr">index_type</span>: <span class="hljs-string">&#x27;AUTOINDEX&#x27;</span>,
      <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;NONE&#x27;</span>,
      <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;overview&#x27;</span>,
        <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&#x27;varchar&#x27;</span>,
      },
    },
    {
      <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
      <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;words&#x27;</span>,
      <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;words_index&#x27;</span>,
      <span class="hljs-attr">index_type</span>: <span class="hljs-string">&#x27;AUTOINDEX&#x27;</span>,
      <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;NONE&#x27;</span>,
      <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;words&#x27;</span>,
        <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&#x27;double&#x27;</span>,
      },
    },
    {
      <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
      <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;dynamic_json&#x27;</span>,
      <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;json_varchar_index&#x27;</span>,
      <span class="hljs-attr">index_type</span>: <span class="hljs-string">&#x27;AUTOINDEX&#x27;</span>,
      <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;NONE&#x27;</span>,
      <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&#x27;varchar&#x27;</span>,
        <span class="hljs-attr">json_path</span>: <span class="hljs-string">&quot;dynamic_json[&#x27;varchar&#x27;]&quot;</span>,
      },
    },
    {
      <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
      <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;dynamic_json&#x27;</span>,
      <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;json_nested_index&#x27;</span>,
      <span class="hljs-attr">index_type</span>: <span class="hljs-string">&#x27;AUTOINDEX&#x27;</span>,
      <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;NONE&#x27;</span>,
      <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&#x27;double&#x27;</span>,
        <span class="hljs-attr">json_path</span>: <span class="hljs-string">&quot;dynamic_json[&#x27;nested&#x27;][&#x27;value&#x27;]&quot;</span>,
      },
    },
  ];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
)

jsonIndex1 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">&quot;overview&quot;</span>)
    .WithIndexName(<span class="hljs-string">&quot;overview_index&quot;</span>)
jsonIndex2 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">&quot;words&quot;</span>)
    .WithIndexName(<span class="hljs-string">&quot;words_index&quot;</span>)
jsonIndex3 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">`dynamic_json[&#x27;varchar&#x27;]`</span>)
    .WithIndexName(<span class="hljs-string">&quot;json_varchar_index&quot;</span>)
jsonIndex4 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">`dynamic_json[&#x27;nested&#x27;][&#x27;value&#x27;]`</span>)
    .WithIndexName(<span class="hljs-string">&quot;json_nested_index&quot;</span>)

indexOpt1 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;overview&quot;</span>, jsonIndex1)
indexOpt2 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;words&quot;</span>, jsonIndex2)
indexOpt3 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;dynamic_json&quot;</span>, jsonIndex3)
indexOpt4 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;dynamic_json&quot;</span>, jsonIndex4)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> overviewIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;dynamic_json&quot;,
  &quot;indexName&quot;: &quot;overview_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_cast_type&quot;: &quot;varchar&quot;,
    &quot;json_path&quot;: &quot;dynamic_json[\&quot;overview\&quot;]&quot;
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> wordsIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;dynamic_json&quot;,
  &quot;indexName&quot;: &quot;words_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_cast_type&quot;: &quot;double&quot;,
    &quot;json_path&quot;: &quot;dynamic_json[\&quot;words\&quot;]&quot;
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> varcharIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;dynamic_json&quot;,
  &quot;indexName&quot;: &quot;json_varchar_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_cast_type&quot;: &quot;varchar&quot;,
    &quot;json_path&quot;: &quot;dynamic_json[\&quot;varchar\&quot;]&quot;
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> nestedIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;dynamic_json&quot;,
  &quot;indexName&quot;: &quot;json_nested_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_cast_type&quot;: &quot;double&quot;,
          &quot;json_path&quot;: &quot;dynamic_json[\&quot;nested\&quot;][\&quot;value\&quot;]&quot;
    }
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Use-JSON-cast-functions-for-type-conversion--Milvus-2514+" class="common-anchor-header">使用 JSON 类型转换函数进行类型转换<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.14+</span><button data-href="#Use-JSON-cast-functions-for-type-conversion--Milvus-2514+" class="anchor-icon" translate="no">
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
    </button></h3><p>如果Dynamic Field键包含格式不正确的值（例如，以字符串形式存储的数字），可以使用转换函数进行转换：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Convert a string to double before indexing</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dynamic_json&quot;</span>, <span class="hljs-comment"># JSON key name</span>
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_string_price_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;dynamic_json[&#x27;string_price&#x27;]&quot;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-comment"># Must be the output type of the cast function</span>
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span> <span class="hljs-comment"># Case insensitive; convert string to double</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String,Object&gt; extraParams5 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams5.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;dynamic_json[&#x27;string_price&#x27;]&quot;</span>);
extraParams5.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;double&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;dynamic_json&quot;</span>)
        .indexName(<span class="hljs-string">&quot;json_string_price_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams5)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;dynamic_json&#x27;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;json_string_price_index&#x27;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&#x27;AUTOINDEX&#x27;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;NONE&#x27;</span>,
    <span class="hljs-attr">params</span>: {
      <span class="hljs-attr">json_path</span>: <span class="hljs-string">&quot;dynamic_json[&#x27;string_price&#x27;]&quot;</span>,
      <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&#x27;double&#x27;</span>,
      <span class="hljs-attr">json_cast_function</span>: <span class="hljs-string">&#x27;STRING_TO_DOUBLE&#x27;</span>,
    },
  });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">jsonIndex5 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">`dynamic_json[&#x27;string_price&#x27;]`</span>)
    .WithIndexName(<span class="hljs-string">&quot;json_string_price_index&quot;</span>)
indexOpt5 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;dynamic_json&quot;</span>, jsonIndex5)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> stringPriceIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;dynamic_json&quot;,
  &quot;indexName&quot;: &quot;json_string_price_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_path&quot;: &quot;dynamic_json[\&quot;string_price\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;double&quot;,
    &quot;json_cast_function&quot;: &quot;STRING_TO_DOUBLE&quot;
  }
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>如果类型转换失败（例如，值<code translate="no">&quot;not_a_number&quot;</code> 无法转换为数字），则该值将被跳过且不会被索引。</p></li>
<li><p>有关类型转换函数参数的详细信息，请参阅<a href="/docs/zh/use-json-fields.md#Use-JSON-cast-functions-for-type-conversion">JSON 字段</a>。</p></li>
</ul>
</div>
<h3 id="Apply-indexes-to-the-collection" class="common-anchor-header">将索引应用于Collection<button data-href="#Apply-indexes-to-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>定义索引参数后，您可以使用 `<code translate="no">create_index()</code>` 将其应用于 Collection：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">  <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>(indexParams);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexTask1, err := client.CreateIndex(ctx, indexOpt1)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask2, err := client.CreateIndex(ctx, indexOpt2)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask3, err := client.CreateIndex(ctx, indexOpt3)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask4, err := client.CreateIndex(ctx, indexOpt4)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask5, err := client.CreateIndex(ctx, indexOpt5)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&quot;[
  <span class="hljs-variable">$varcharIndex</span>,
  <span class="hljs-variable">$nestedIndex</span>,
  <span class="hljs-variable">$overviewIndex</span>,
  <span class="hljs-variable">$wordsIndex</span>,
  <span class="hljs-variable">$stringPriceIndex</span>
]&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
  \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Filter-by-dynamic-field-keys" class="common-anchor-header">按Dynamic Field键过滤<button data-href="#Filter-by-dynamic-field-keys" class="anchor-icon" translate="no">
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
    </button></h2><p>插入具有Dynamic Field字段键的实体后，您可以使用标准过滤表达式对其进行过滤。</p>
<ul>
<li><p>对于非 JSON 键（例如字符串、数字、布尔值），您可以直接通过键名进行引用。</p></li>
<li><p>对于存储 JSON 对象的键，请使用 JSON 路径语法访问嵌套值。</p></li>
</ul>
<p>基于上一节中的<a href="/docs/zh/enable-dynamic-field.md#Insert-entities-to-the-collection">示例实体</a>，有效的筛选表达式包括：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;overview == &quot;Great product&quot;&#x27;</span>                <span class="hljs-comment"># Non-JSON key</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;words &gt;= 100&#x27;</span>                               <span class="hljs-comment"># Non-JSON key</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;dynamic_json[&quot;nested&quot;][&quot;value&quot;] &lt; 50&#x27;</span>       <span class="hljs-comment"># JSON object key</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;overview == &quot;Great product&quot;&#x27;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;words &gt;= 100&#x27;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;dynamic_json[&quot;nested&quot;][&quot;value&quot;] &lt; 50&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">filter = <span class="hljs-string">&#x27;overview == &quot;Great product&quot;&#x27;</span>                <span class="hljs-comment">// Non-JSON key</span>
filter = <span class="hljs-string">&#x27;words &gt;= 100&#x27;</span>                               <span class="hljs-comment">// Non-JSON key</span>
filter = <span class="hljs-string">&#x27;dynamic_json[&quot;nested&quot;][&quot;value&quot;] &lt; 50&#x27;</span>       <span class="hljs-comment">// JSON object key</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&#x27;overview == &quot;Great product&quot;&#x27;</span>
filter := <span class="hljs-string">&#x27;words &gt;= 100&#x27;</span>
filter := <span class="hljs-string">&#x27;dynamic_json[&quot;nested&quot;][&quot;value&quot;] &lt; 50&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> filterOverview=<span class="hljs-string">&#x27;overview == &quot;Great product&quot;&#x27;</span>
<span class="hljs-built_in">export</span> filterWords=<span class="hljs-string">&#x27;words &gt;= 100&#x27;</span>
<span class="hljs-built_in">export</span> filterNestedValue=<span class="hljs-string">&#x27;dynamic_json[&quot;nested&quot;][&quot;value&quot;] &lt; 50&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>获取 Dynamic Field 键</strong>：若要在搜索或查询结果中返回 Dynamic Field 键，必须在 `<code translate="no">output_fields</code> ` 参数中使用与过滤相同的 JSON 路径语法显式指定它们：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Include dynamic field keys in search results</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                         <span class="hljs-comment"># Filter expression defined earlier</span>
    limit=<span class="hljs-number">10</span>,
<span class="highlighted-comment-line">    output_fields=[</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;overview&quot;</span>,                        <span class="hljs-comment"># Simple dynamic field key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&#x27;dynamic_json[&quot;varchar&quot;]&#x27;</span>          <span class="hljs-comment"># Nested JSON key</span></span>
<span class="highlighted-comment-line">    ]</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;YOUR_CLUSTER_ENDPOINT&quot;</span>)
        .token(<span class="hljs-string">&quot;YOUR_CLUSTER_TOKEN&quot;</span>)
        .build());

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">5</span>)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;overview&quot;</span>, <span class="hljs-string">&quot;dynamic_json[&#x27;varchar&#x27;]&quot;</span>))
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;YOUR_CLUSTER_ENDPOINT&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;YOUR_CLUSTER_TOKEN&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">filters</span>: filter,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;overview&quot;</span>, <span class="hljs-string">&quot;dynamic_json[&#x27;varchar&#x27;]&quot;</span>]
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;YOUR_CLUSTER_ENDPOINT&quot;</span>
token := <span class="hljs-string">&quot;YOUR_CLUSTER_TOKEN&quot;</span>

client, err := client.New(ctx, &amp;client.ClientConfig{
    Address: milvusAddr,
    APIKey:  token,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;my_vector&quot;</span>).
    WithFilter(filter).
    WithOutputFields(<span class="hljs-string">&quot;overview&quot;</span>, <span class="hljs-string">&quot;dynamic_json[&#x27;varchar&#x27;]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;YOUR_CLUSTER_ENDPOINT&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;YOUR_CLUSTER_TOKEN&quot;</span>
<span class="hljs-built_in">export</span> FILTER=<span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
  \&quot;data\&quot;: [
    [0.1, 0.2, 0.3, 0.4, 0.5]
  ],
  \&quot;annsField\&quot;: \&quot;my_vector\&quot;,
  \&quot;filter\&quot;: \&quot;<span class="hljs-variable">${FILTER}</span>\&quot;,
  \&quot;limit\&quot;: 5,
  \&quot;outputFields\&quot;: [\&quot;overview\&quot;, \&quot;dynamic_json.varchar\&quot;]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>默认情况下，Dynamic Field字段键不会包含在结果中，必须显式请求。</p>
</div>
<p>有关支持的操作符和过滤表达式的完整列表，请参阅<a href="/docs/zh/filtered-search.md">“过滤搜索</a>”。</p>
<h2 id="Put-it-all-together" class="common-anchor-header">综合应用<button data-href="#Put-it-all-together" class="anchor-icon" translate="no">
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
    </button></h2><p>至此，您已学会如何使用Dynamic Field来灵活存储和索引Schema中未定义的键。一旦插入Dynamic Field键，您就可以像使用其他字段一样在过滤表达式中使用它——无需特殊语法。</p>
<p>要在实际应用中完成该工作流，你还需要：</p>
<ul>
<li><p><strong>在向量字段上创建索引</strong>（每个Collection都必须创建）</p>
<p>请参阅《<a href="/docs/zh/create-collection.md#Optional-Set-Index-Parameters">设置索引参数</a>》</p></li>
<li><p><strong>加载Collection</strong></p>
<p>请参阅《<a href="/docs/zh/load-and-release.md">加载与释放</a>》</p></li>
<li><p><strong>使用 JSON 路径过滤器进行搜索或查询</strong></p>
<p>请参阅<a href="/docs/zh/filtered-search.md">“过滤搜索</a>和<a href="/docs/zh/json-operators.md">JSON 操作符</a>”</p></li>
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
    </button></h2><h3 id="When-should-I-define-a-field-explicitly-in-the-schema-instead-of-using-a-dynamic-field-key" class="common-anchor-header">在什么情况下应在Schema中显式定义字段，而不是使用Dynamic Field键？<button data-href="#When-should-I-define-a-field-explicitly-in-the-schema-instead-of-using-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>在以下情况下，您应在Schema中显式定义字段，而不是使用Dynamic Field键：</p>
<ul>
<li><p><strong>该字段经常被包含在 `output_fields` 中</strong>：只有显式定义的字段才能保证通过 `<code translate="no">output_fields</code>` 高效检索。Dynamic Field 字段键未针对高频检索进行优化，可能会导致性能开销。</p></li>
<li><p><strong>该字段被频繁访问或用于过滤</strong>：虽然对Dynamic Field键进行索引可提供与固定Schema字段相似的过滤性能，但显式定义的字段能提供更清晰的结构和更好的可维护性。</p></li>
<li><p><strong>您需要完全控制字段行为</strong>：显式字段支持Schema级约束、验证和更清晰的类型定义，这有助于管理数据完整性和一致性。</p></li>
<li><p><strong>您希望避免索引不一致</strong>：Dynamic Field字段键中的数据更容易出现类型或结构不一致的情况。使用固定Schema有助于确保数据质量，尤其是在您计划使用索引或类型转换时。</p></li>
</ul>
<p>如果您决定将现有 Collection 中的 Dynamic Field 键转换为显式标量字段，请参阅<a href="/docs/zh/add-fields-to-an-existing-collection.md">“修改 Collection Schema”</a>。现有 Collection 级别的 Dynamic Field 设置通过 Collection 属性进行管理；有关详细信息，请参阅<a href="/docs/zh/modify-collection.md">“修改 Collection”</a>。</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-dynamic-field-key-with-different-data-types" class="common-anchor-header">我可以在同一个 Dynamic Field 键上创建多个数据类型不同的索引吗？<button data-href="#Can-I-create-multiple-indexes-on-the-same-dynamic-field-key-with-different-data-types" class="anchor-icon" translate="no">
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
    </button></h3><p>不可以<strong>，每个 JSON 路径只能</strong>创建<strong>一个索引</strong>。即使 Dynamic Field 字段键包含混合类型的值（例如，部分为字符串，部分为数字），在为该路径建立索引时，您也必须选择单一的<code translate="no">json_cast_type</code> 。目前不支持在同一键上创建多个不同类型的数据索引。</p>
<h3 id="When-indexing-a-dynamic-field-key-what-if-the-data-casting-fails" class="common-anchor-header">为Dynamic Field字段键建立索引时，如果数据类型转换失败会怎样？<button data-href="#When-indexing-a-dynamic-field-key-what-if-the-data-casting-fails" class="anchor-icon" translate="no">
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
    </button></h3><p>如果您已在Dynamic Field字段键上创建了索引，但数据类型转换失败——例如，本应转换为<code translate="no">double</code> 的值却是非数字字符串（如<code translate="no">&quot;abc&quot;</code>）——<strong>则在索引创建过程中</strong>，这些特定值将被<strong>静默跳过</strong>。 这些值不会出现在索引中，因此<strong>也不会出现在基于过滤器的搜索结果或</strong>依赖该索引的<strong>查询结果中</strong>。</p>
<p>这有几个重要影响：</p>
<ul>
<li><p><strong>不会回退到全表扫描</strong>：如果大多数实体已成功建立索引，则过滤查询将完全依赖于该索引。发生类型转换失败的实体将被排除在结果集之外——即使它们在逻辑上符合过滤条件。</p></li>
<li><p><strong>搜索准确性风险</strong>：在数据质量不一致的大型数据集中（尤其是Dynamic Field字段键的情况下），这种行为可能会导致意外的搜索结果缺失。在建立索引之前，确保数据格式的一致性和有效性至关重要。</p></li>
<li><p><strong>谨慎使用强制转换函数</strong>：若在索引过程中使用<code translate="no">json_cast_function</code> 将字符串转换为数字，请确保字符串值能够可靠地转换。<code translate="no">json_cast_type</code> 与实际转换类型不匹配将导致错误或条目被跳过。</p></li>
</ul>
<h3 id="What-happens-if-my-query-uses-a-different-data-type-than-the-indexed-cast-type" class="common-anchor-header">如果我的查询使用的数据类型与索引中的转换类型不同，会发生什么情况？<button data-href="#What-happens-if-my-query-uses-a-different-data-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>如果您的查询使用与索引中<strong>不同的数据类型</strong>来比较Dynamic Field键（例如，当索引被转换为<code translate="no">double</code> 时，却使用字符串比较进行查询），系统将<strong>不会使用该索引</strong>，并且<em>仅在可能的情况下</em>才会回退到全表扫描。 为获得最佳性能和准确性，请确保您的查询类型与创建索引时使用的<code translate="no">json_cast_type</code> 相匹配。</p>
