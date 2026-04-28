---
id: enable-dynamic-field.md
title: Динамическое поле
summary: >-
  Milvus позволяет вставлять сущности с гибкой, развивающейся структурой
  благодаря специальной функции, называемой динамическим полем. Это поле
  реализовано в виде скрытого JSON-поля с именем $meta, которое автоматически
  сохраняет любые поля в ваших данных, не определенные явно в схеме коллекции.
---
<h1 id="Dynamic-Field" class="common-anchor-header">Динамическое поле<button data-href="#Dynamic-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus позволяет вставлять сущности с гибкой, развивающейся структурой с помощью специальной функции, называемой <strong>динамическим полем</strong>. Это поле реализовано в виде скрытого JSON-поля с именем <code translate="no">$meta</code>, которое автоматически сохраняет любые поля в ваших данных, которые <strong>не определены явно</strong> в схеме коллекции.</p>
<h2 id="How-it-works" class="common-anchor-header">Как это работает<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Когда динамическое поле включено, Milvus добавляет скрытое поле <code translate="no">$meta</code> к каждой сущности. Это поле имеет тип JSON, что означает, что оно может хранить любую JSON-совместимую структуру данных и может быть проиндексировано с помощью синтаксиса JSON path.</p>
<p>При вставке данных любое поле, не объявленное в схеме, автоматически сохраняется в виде пары ключ-значение в этом динамическом поле.</p>
<p>Вам не нужно управлять <code translate="no">$meta</code> вручную - Milvus делает это прозрачно.</p>
<p>Например, если в схеме вашей коллекции определены только <code translate="no">id</code> и <code translate="no">vector</code>, и вы вставляете следующую сущность:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.3</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Item A&quot;</span><span class="hljs-punctuation">,</span>    <span class="hljs-comment">// Not in schema</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;books&quot;</span>  <span class="hljs-comment">// Not in schema</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>При включенной функции динамического поля Milvus хранит его внутри как:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.3</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">&quot;$meta&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="highlighted-comment-line">    <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Item A&quot;</span><span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;books&quot;</span></span>
<span class="highlighted-comment-line">  <span class="hljs-punctuation">}</span></span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Это позволяет вам изменять структуру данных без изменения схемы.</p>
<p>К распространенным случаям использования относятся:</p>
<ul>
<li><p>Хранение необязательных или редко извлекаемых полей.</p></li>
<li><p>Захват метаданных, различающихся в зависимости от сущности.</p></li>
<li><p>Поддержка гибкой фильтрации с помощью индексов по определенным ключам динамических полей.</p></li>
</ul>
<h2 id="Supported-data-types" class="common-anchor-header">Поддерживаемые типы данных<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Динамическое поле поддерживает все скалярные типы данных, предоставляемые Milvus, включая как простые, так и сложные значения. Эти типы данных применяются к **значениям ключей, хранящихся в <code translate="no">$meta</code>.</p>
<p><strong>Поддерживаемые типы включают:</strong></p>
<ul>
<li><p>String (<code translate="no">VARCHAR</code>)</p></li>
<li><p>Целое число (<code translate="no">INT8</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>)</p></li>
<li><p>Плавающая точка (<code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>)</p></li>
<li><p>Boolean (<code translate="no">BOOL</code>)</p></li>
<li><p>Массив скалярных значений (<code translate="no">ARRAY</code>)</p></li>
<li><p>Объекты JSON (<code translate="no">JSON</code>)</p></li>
</ul>
<p><strong>Пример:</strong></p>
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
<p>Каждый из перечисленных выше ключей и значений будет храниться в поле <code translate="no">$meta</code>.</p>
<h2 id="Enable-dynamic-field" class="common-anchor-header">Включение динамического поля<button data-href="#Enable-dynamic-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы использовать функцию динамического поля, установите <code translate="no">enable_dynamic_field=True</code> при создании схемы коллекции:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
  \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-entities-to-the-collection" class="common-anchor-header">Вставка сущностей в коллекцию<button data-href="#Insert-entities-to-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Динамическое поле позволяет вставлять дополнительные поля, не определенные в схеме. Эти поля будут автоматически сохранены в <code translate="no">$meta</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
<h2 id="Index-keys-in-the-dynamic-field--Milvus-2511+" class="common-anchor-header">Индексирование ключей в динамическом поле<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span><button data-href="#Index-keys-in-the-dynamic-field--Milvus-2511+" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus позволяет использовать <strong>индексацию по пути JSON</strong> для создания индексов по определенным ключам в динамическом поле. Это могут быть скалярные значения или вложенные значения в JSON-объекты.</p>
<div class="alert note">
<p>Индексирование ключей динамического поля <strong>необязательно</strong>. Вы все равно можете запрашивать или фильтровать по ключам динамического поля без индекса, но это может привести к снижению производительности из-за грубого поиска.</p>
</div>
<h3 id="JSON-path-indexing-syntax" class="common-anchor-header">Синтаксис индексирования пути JSON</h3><p>Чтобы создать индекс пути JSON, укажите:</p>
<ul>
<li><p><strong>JSON path</strong> (<code translate="no">json_path</code>): Путь к ключу или вложенному полю в объекте JSON, который вы хотите проиндексировать.</p>
<ul>
<li><p>Пример: <code translate="no">metadata[&quot;category&quot;]</code></p>
<p>Это определяет, где механизм индексирования должен искать внутри структуры JSON.</p></li>
</ul></li>
<li><p><strong>JSON cast type</strong> (<code translate="no">json_cast_type</code>): Тип данных, который Milvus должен использовать при интерпретации и индексировании значения по указанному пути.</p>
<ul>
<li><p>Этот тип должен совпадать с реальным типом данных индексируемого поля.</p></li>
<li><p>Полный список см. в разделе <a href="/docs/ru/use-json-fields.md#Supported-JSON-cast-types">Поддерживаемые типы данных JSON</a>.</p></li>
</ul></li>
</ul>
<h3 id="Use-JSON-path-to-index-dynamic-field-keys" class="common-anchor-header">Использование пути JSON для индексации ключей динамических полей</h3><p>Поскольку динамическое поле является полем JSON, вы можете индексировать любой ключ в нем, используя синтаксис JSON path. Это работает как для простых скалярных значений, так и для сложных вложенных структур.</p>
<p><strong>Примеры путей JSON:</strong></p>
<ul>
<li><p>Для простых ключей: <code translate="no">overview</code>, <code translate="no">words</code></p></li>
<li><p>Для вложенных ключей: <code translate="no">dynamic_json['varchar']</code>, <code translate="no">dynamic_json['nested']['value']</code></p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
<h3 id="Use-JSON-cast-functions-for-type-conversion--Milvus-2514+" class="common-anchor-header">Используйте функции приведения JSON для преобразования типов<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.14+</span></h3><p>Если ключ динамического поля содержит значения в неправильном формате (например, числа, хранящиеся в виде строк), вы можете использовать функцию приведения для их преобразования:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
<li><p>Если преобразование типа не удается (например, значение <code translate="no">&quot;not_a_number&quot;</code> не может быть преобразовано в число), значение пропускается и не индексируется.</p></li>
<li><p>Подробнее о параметрах функции cast см. в разделе <a href="/docs/ru/use-json-fields.md#Use-JSON-cast-functions-for-type-conversion">Поле JSON</a>.</p></li>
</ul>
</div>
<h3 id="Apply-indexes-to-the-collection" class="common-anchor-header">Применение индексов к коллекции</h3><p>После определения параметров индекса вы можете применить их к коллекции с помощью <code translate="no">create_index()</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
  \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Filter-by-dynamic-field-keys" class="common-anchor-header">Фильтр по динамическим ключам полей<button data-href="#Filter-by-dynamic-field-keys" class="anchor-icon" translate="no">
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
    </button></h2><p>После вставки сущностей с динамическими ключами полей вы можете отфильтровать их с помощью стандартных выражений фильтрации.</p>
<ul>
<li><p>Для не-JSON-ключей (например, строк, чисел, булевых значений) вы можете ссылаться на них по имени ключа напрямую.</p></li>
<li><p>Для ключей, хранящих объекты JSON, используйте синтаксис пути JSON для доступа к вложенным значениям.</p></li>
</ul>
<p>Исходя из<a href="/docs/ru/enable-dynamic-field.md#Insert-entities-to-the-collection">примера сущности</a> из предыдущего раздела, допустимые выражения фильтрации включают:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
<p><strong>Получение динамических ключей полей</strong>: Чтобы вернуть ключи динамических полей в результатах поиска или запроса, вы должны явно указать их в параметре <code translate="no">output_fields</code>, используя тот же синтаксис пути JSON, что и при фильтрации:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
<p>Динамические ключи полей не включаются в результаты по умолчанию и должны быть явно запрошены.</p>
</div>
<p>Полный список поддерживаемых операторов и выражений фильтрации см. в разделе <a href="/docs/ru/filtered-search.md">Фильтрованный поиск</a>.</p>
<h2 id="Put-it-all-together" class="common-anchor-header">Соберите все вместе<button data-href="#Put-it-all-together" class="anchor-icon" translate="no">
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
    </button></h2><p>К этому моменту вы узнали, как использовать динамическое поле для гибкого хранения и индексирования ключей, не определенных в схеме. После вставки ключа динамического поля вы можете использовать его так же, как и любое другое поле в выражениях фильтрации - специальный синтаксис не требуется.</p>
<p>Чтобы завершить рабочий процесс в реальном приложении, вам также потребуется:</p>
<ul>
<li><p><strong>Создать индекс для векторного поля</strong> (обязательно для каждой коллекции).</p>
<p>См. раздел <a href="/docs/ru/create-collection.md#Optional-Set-Index-Parameters">"Установка параметров индекса</a></p></li>
<li><p><strong>Загрузить коллекцию</strong></p>
<p>См. раздел <a href="/docs/ru/load-and-release.md">Загрузка и освобождение</a></p></li>
<li><p><strong>Выполнить поиск или запрос с использованием фильтров пути JSON</strong></p>
<p>См. раздел <a href="/docs/ru/filtered-search.md">Фильтрованный поиск</a> и <a href="/docs/ru/json-operators.md">операторы JSON</a></p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="When-should-I-define-a-field-explicitly-in-the-schema-instead-of-using-a-dynamic-field-key" class="common-anchor-header">Когда я должен определять поле явно в схеме, а не использовать динамический ключ поля?</h3><p>Вы должны определить поле явно в схеме, а не использовать динамический ключ поля, когда:</p>
<ul>
<li><p><strong>Поле часто включается в output_fields</strong>: Только явно определенные поля гарантированно будут эффективно извлекаться через <code translate="no">output_fields</code>. Динамические ключи полей не оптимизированы для высокочастотного поиска и могут иметь избыточную производительность.</p></li>
<li><p><strong>К полю часто обращаются или фильтруют его</strong>: Хотя индексирование по динамическому ключу поля может обеспечить такую же производительность фильтрации, как и для полей фиксированной схемы, явно определенные поля предлагают более четкую структуру и более удобны в обслуживании.</p></li>
<li><p><strong>Вам нужен полный контроль над поведением поля</strong>: Явно определенные поля поддерживают ограничения на уровне схемы, проверки и более четкую типизацию, что может быть полезно для управления целостностью и непротиворечивостью данных.</p></li>
<li><p><strong>Вы хотите избежать несоответствий в индексировании</strong>: Данные в ключах динамических полей более склонны к несоответствию типа или структуры. Использование фиксированной схемы помогает обеспечить качество данных, особенно если вы планируете использовать индексирование или приведение.</p></li>
</ul>
<h3 id="Can-I-create-multiple-indexes-on-the-same-dynamic-field-key-with-different-data-types" class="common-anchor-header">Можно ли создать несколько индексов для одного и того же ключа динамического поля с разными типами данных?</h3><p>Нет, вы можете создать <strong>только один индекс для каждого пути JSON</strong>. Даже если ключ динамического поля содержит значения смешанного типа (например, несколько строк и несколько чисел), при индексировании этого пути необходимо выбрать один <code translate="no">json_cast_type</code>. Несколько индексов для одного и того же ключа с разными типами в настоящее время не поддерживаются.</p>
<h3 id="When-indexing-a-dynamic-field-key-what-if-the-data-casting-fails" class="common-anchor-header">Что делать, если при индексировании ключа динамического поля приведение данных не удается?</h3><p>Если вы создали индекс по ключу динамического поля, а приведение данных не удалось - например, значение, предназначенное для приведения к <code translate="no">double</code>, является нечисловой строкой, такой как <code translate="no">&quot;abc&quot;</code>, - эти конкретные значения будут <strong>молча пропущены при создании индекса</strong>. Они не появятся в индексе и, следовательно, <strong>не будут возвращены в результатах поиска и запросов, основанных на фильтрах</strong>, которые полагаются на индекс.</p>
<p>Это имеет несколько важных последствий:</p>
<ul>
<li><p><strong>Отсутствие возврата к полному сканированию</strong>: Если большинство сущностей успешно проиндексировано, запросы фильтрации будут полностью полагаться на индекс. Сущности с ошибками в индексировании будут исключены из набора результатов - даже если они логически соответствуют условию фильтра.</p></li>
<li><p><strong>Риск точности поиска</strong>: В больших массивах данных, где качество данных непостоянно (особенно в динамических ключах полей), такое поведение может привести к неожиданным пропущенным результатам. Очень важно обеспечить последовательное и корректное форматирование данных перед индексированием.</p></li>
<li><p><strong>Осторожно используйте функции приведения</strong>: Если вы используете <code translate="no">json_cast_function</code> для преобразования строк в числа во время индексирования, убедитесь, что строковые значения надежно преобразуются. Несоответствие между <code translate="no">json_cast_type</code> и реальным преобразованным типом приведет к ошибкам или пропуску записей.</p></li>
</ul>
<h3 id="What-happens-if-my-query-uses-a-different-data-type-than-the-indexed-cast-type" class="common-anchor-header">Что произойдет, если в моем запросе используется тип данных, отличный от индексируемого приведенного типа?</h3><p>Если ваш запрос сравнивает ключ динамического поля с <strong>типом данных, отличным от</strong> того, который использовался в индексе (например, запрос со строковым сравнением, когда индекс был приведен к <code translate="no">double</code>), система <strong>не</strong> будет <strong>использовать индекс</strong> и может вернуться к полному сканированию <em>, только если это возможно</em>. Для достижения наилучшей производительности и точности убедитесь, что тип запроса соответствует типу <code translate="no">json_cast_type</code>, использованному при создании индекса.</p>
