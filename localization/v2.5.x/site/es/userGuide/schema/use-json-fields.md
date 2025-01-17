---
id: use-json-fields.md
title: Utilizar campos JSON
summary: >-
  JSON (JavaScript Object Notation) es un formato ligero de intercambio de datos
  que proporciona una forma flexible de almacenar y consultar estructuras de
  datos complejas. En Milvus, puede almacenar información estructurada adicional
  junto con datos vectoriales mediante campos JSON, lo que permite realizar
  búsquedas y consultas avanzadas que combinan la similitud vectorial con el
  filtrado estructurado.
---
<h1 id="JSON-Field​" class="common-anchor-header">Campo JSON<button data-href="#JSON-Field​" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://en.wikipedia.org/wiki/JSON">JSON</a> (JavaScript Object Notation) es un formato ligero de intercambio de datos que proporciona una forma flexible de almacenar y consultar estructuras de datos complejas. En Milvus, puede almacenar información estructurada adicional junto con datos vectoriales utilizando campos JSON, lo que permite realizar búsquedas y consultas avanzadas que combinan la similitud vectorial con el filtrado estructurado.</p>
<p>Los campos JSON son ideales para aplicaciones que requieren metadatos para optimizar los resultados de recuperación. Por ejemplo, en el comercio electrónico, los vectores de productos pueden mejorarse con atributos como categoría, precio y marca. En los sistemas de recomendación, los vectores de usuario pueden combinarse con preferencias e información demográfica. A continuación se muestra un ejemplo de un campo JSON típico.</p>
<pre><code translate="no" class="language-json">{​
  <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,​
  <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,​
  <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>​
}​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-JSON-field​" class="common-anchor-header">Añadir campo JSON<button data-href="#Add-JSON-field​" class="anchor-icon" translate="no">
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
    </button></h2><p>Para utilizar campos JSON en Milvus, defina el tipo de campo pertinente en el esquema de la colección, estableciendo el <code translate="no">datatype</code> al tipo JSON admitido, es decir, <code translate="no">JSON</code>.</p>
<p>He aquí cómo definir un esquema de colección que incluya un campo JSON.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
​
schema = client.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
    enable_dynamic_fields=<span class="hljs-literal">True</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON)​
schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .build());​
        ​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)​
        .dataType(DataType.JSON)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)​
        .dataType(DataType.Int64)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .dataType(DataType.FloatVector)​
        .dimension(<span class="hljs-number">3</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
<span class="hljs-keyword">const</span> schema = [​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
    <span class="hljs-attr">dim</span>: <span class="hljs-number">3</span>,​
  },​
];​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> jsonField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;metadata&quot;,​
    &quot;dataType&quot;: &quot;JSON&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> pkField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;pk&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;isPrimary&quot;: true​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;embedding&quot;,​
    &quot;dataType&quot;: &quot;FloatVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 3​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$jsonField</span>,​
        <span class="hljs-variable">$pkField</span>,​
        <span class="hljs-variable">$vectorField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>En este ejemplo, añadimos un campo JSON llamado <code translate="no">metadata</code> para almacenar metadatos adicionales relacionados con los datos vectoriales, como la categoría del producto, el precio y la información de la marca.</p>
<div class="alert note">
<p>El campo primario y el campo vectorial son obligatorios al crear una colección. El campo primario identifica de forma única a cada entidad, mientras que el campo vectorial es crucial para la búsqueda de similitudes. Para más detalles, consulte <a href="/docs/es/primary-field.md">Campo primario y AutoID</a>, <a href="/docs/es/dense-vector.md">Vector denso</a>, <a href="/docs/es/binary-vector.md">Vector binario</a> o <a href="/docs/es/sparse_vector.md">Vector disperso</a>.</p>
</div>
<h2 id="Create-collection​" class="common-anchor-header">Crear una colección<button data-href="#Create-collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>Al crear una colección, debe crear un índice para el campo vectorial para garantizar el rendimiento de la recuperación. En este ejemplo, utilizamos <code translate="no">AUTOINDEX</code> para simplificar la configuración del índice. Para más detalles, consulte <a href="https://milvus.io/docs/glossary.md#Auto-Index">AUTOINDEX</a>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">​
index_params = client.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;​
<span class="hljs-keyword">import</span> java.util.*;​
​
List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
indexes.add(IndexParam.builder()​
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .indexType(IndexParam.IndexType.AUTOINDEX)​
        .metricType(IndexParam.MetricType.COSINE)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = {​
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;embedding_index&#x27;</span>,​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;embedding&#x27;</span>,​
    <span class="hljs-attr">metricType</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">CONSINE</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,​
);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;embedding&quot;,​
            &quot;metricType&quot;: &quot;COSINE&quot;,​
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Utilice el esquema definido y los parámetros del índice para crear una colección.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexes)​
        .build();​
client.createCollection(requestCreate);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">create_collection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_json_collection&quot;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-attr">index_params</span>: indexParams​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_json_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data​" class="common-anchor-header">Insertar datos<button data-href="#Insert-data​" class="anchor-icon" translate="no">
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
    </button></h2><p>Después de crear la colección, puedes insertar datos que incluyan campos JSON.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Data to be inserted​</span>
data = [​
  {​
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},​
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,​
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]​
  },​
  {​
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;home_appliances&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">249.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandB&quot;</span>},​
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,​
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>]​
  },​
  {​
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;furniture&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">399.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandC&quot;</span>},​
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,​
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>]​
  }​
]​
​
<span class="hljs-comment"># Insert data into the collection​</span>
client.insert(​
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,​
    data=data​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;​
​
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;metadata\&quot;: {\&quot;category\&quot;: \&quot;electronics\&quot;, \&quot;price\&quot;: 99.99, \&quot;brand\&quot;: \&quot;BrandA\&quot;}, \&quot;pk\&quot;: 1, \&quot;embedding\&quot;: [0.1, 0.2, 0.3]}&quot;</span>, JsonObject.class));​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;metadata\&quot;: {\&quot;category\&quot;: \&quot;home_appliances\&quot;, \&quot;price\&quot;: 249.99, \&quot;brand\&quot;: \&quot;BrandB\&quot;}, \&quot;pk\&quot;: 2, \&quot;embedding\&quot;: [0.4, 0.5, 0.6]}&quot;</span>, JsonObject.class));​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;metadata\&quot;: {\&quot;category\&quot;: \&quot;furniture\&quot;, \&quot;price\&quot;: 399.99, \&quot;brand\&quot;: \&quot;BrandC\&quot;}, \&quot;pk\&quot;: 3, \&quot;embedding\&quot;: [0.7, 0.8, 0.9]}&quot;</span>, JsonObject.class));​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)​
        .data(rows)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [​
  {​
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},​
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,​
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]​
  },​
  {​
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;home_appliances&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">249.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandB&quot;</span>},​
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,​
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>]​
  },​
  {​
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;furniture&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">399.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandC&quot;</span>},​
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,​
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>]​
  }​
]​
​
client.<span class="hljs-title function_">insert</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_json_collection&quot;</span>,​
    <span class="hljs-attr">data</span>: data​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [​
        {​
            &quot;metadata&quot;: {&quot;category&quot;: &quot;electronics&quot;, &quot;price&quot;: 99.99, &quot;brand&quot;: &quot;BrandA&quot;},​
            &quot;pk&quot;: 1,​
            &quot;embedding&quot;: [0.12, 0.34, 0.56]​
        },​
        {​
            &quot;metadata&quot;: {&quot;category&quot;: &quot;home_appliances&quot;, &quot;price&quot;: 249.99, &quot;brand&quot;: &quot;BrandB&quot;},​
            &quot;pk&quot;: 2,​
            &quot;embedding&quot;: [0.56, 0.78, 0.90]​
        },​
        {​
            &quot;metadata&quot;: {&quot;category&quot;: &quot;furniture&quot;, &quot;price&quot;: 399.99, &quot;brand&quot;: &quot;BrandC&quot;},​
            &quot;pk&quot;: 3,​
            &quot;embedding&quot;: [0.91, 0.18, 0.23]​
        }       ​
    ],​
    &quot;collectionName&quot;: &quot;my_json_collection&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>En este ejemplo.</p>
<ul>
<li><p>Cada entrada de datos incluye un campo primario (<code translate="no">pk</code>), <code translate="no">metadata</code> como campo JSON para almacenar información como categoría de producto, precio y marca.</p></li>
<li><p><code translate="no">embedding</code> es un campo vectorial tridimensional utilizado para la búsqueda de similitud vectorial.</p></li>
</ul>
<h2 id="Search-and-query​" class="common-anchor-header">Búsqueda y consulta<button data-href="#Search-and-query​" class="anchor-icon" translate="no">
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
    </button></h2><p>Los campos JSON permiten el filtrado escalar durante las búsquedas, mejorando las capacidades de búsqueda vectorial de Milvus. Puede realizar consultas basadas en propiedades JSON junto con la similitud vectorial.</p>
<h3 id="Filter-queries​" class="common-anchor-header">Filtrar consultas</h3><p>Puede filtrar datos basándose en propiedades JSON, como la coincidencia de valores específicos o la comprobación de si un número se encuentra dentro de un rango determinado.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot; and metadata[&quot;price&quot;] &lt; 150&#x27;</span>​
​
res = client.query(​
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,​
    output_fields=[<span class="hljs-string">&quot;metadata&quot;</span>]​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 1}&quot;] ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;​
​
String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;metadata[\&quot;category\&quot;] == \&quot;electronics\&quot; and metadata[\&quot;price\&quot;] &lt; 150&quot;</span>;​
QueryResp resp = client.query(QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)​
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)​
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;metadata&quot;</span>))​
        .build());​
​
System.out.println(resp.getQueryResults());​
​
// Output​
//​
// [QueryResp.QueryResult(entity={metadata={<span class="hljs-string">&quot;category&quot;</span>:<span class="hljs-string">&quot;electronics&quot;</span>,<span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">99.99</span>,<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;BrandA&quot;</span>}, pk=<span class="hljs-number">1</span>})]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.query({​
    collection_name: <span class="hljs-string">&#x27;my_scalar_collection&#x27;</span>,​
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot; and metadata[&quot;price&quot;] &lt; 150&#x27;</span>,​
    output_fields: [<span class="hljs-string">&#x27;metadata&#x27;</span>]​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_json_collection&quot;,​
    &quot;filter&quot;: &quot;metadata[\&quot;category\&quot;] == \&quot;electronics\&quot; and metadata[\&quot;price\&quot;] &lt; 150&quot;,​
    &quot;outputFields&quot;: [&quot;metadata&quot;]​
}&#x27;</span>​
{<span class="hljs-string">&quot;code&quot;</span>:0,<span class="hljs-string">&quot;cost&quot;</span>:0,<span class="hljs-string">&quot;data&quot;</span>:[{<span class="hljs-string">&quot;metadata&quot;</span>:<span class="hljs-string">&quot;{\&quot;category\&quot;: \&quot;electronics\&quot;, \&quot;price\&quot;: 99.99, \&quot;brand\&quot;: \&quot;BrandA\&quot;}&quot;</span>,<span class="hljs-string">&quot;pk&quot;</span>:1}]}​

<button class="copy-code-btn"></button></code></pre>
<p>En la consulta anterior, Milvus filtra las entidades en las que el campo <code translate="no">metadata</code> tiene una categoría de <code translate="no">&quot;electronics&quot;</code> y un precio inferior a 150, devolviendo las entidades que coinciden con estos criterios.</p>
<h3 id="Vector-search-with-JSON-filtering​" class="common-anchor-header">Búsqueda vectorial con filtrado JSON</h3><p>Al combinar la similitud vectorial con el filtrado JSON, puede asegurarse de que los datos recuperados no solo coincidan semánticamente, sino que también cumplan condiciones empresariales específicas, haciendo que los resultados de la búsqueda sean más precisos y se ajusten a las necesidades del usuario.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;brand&quot;] == &quot;BrandA&quot;&#x27;</span>​
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,​
    data=[[<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>]],​
    limit=<span class="hljs-number">5</span>,​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},​
    output_fields=[<span class="hljs-string">&quot;metadata&quot;</span>],​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: -0.2479381263256073, &#x27;entity&#x27;: {&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}}}]&quot;] ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;​
​
String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;metadata[\&quot;brand\&quot;] == \&quot;BrandA\&quot;&quot;</span>;​
SearchResp resp = client.search(SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)​
        .annsField(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .data(Collections.singletonList(new FloatVec(new <span class="hljs-built_in">float</span>[]{<span class="hljs-number">0.3</span>f, -<span class="hljs-number">0.6</span>f, <span class="hljs-number">0.1</span>f})))​
        .topK(<span class="hljs-number">5</span>)​
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;metadata&quot;</span>))​
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)​
        .build());​
​
System.out.println(resp.getSearchResults());​
​
// Output​
//​
// [[SearchResp.SearchResult(entity={metadata={<span class="hljs-string">&quot;category&quot;</span>:<span class="hljs-string">&quot;electronics&quot;</span>,<span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">99.99</span>,<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;BrandA&quot;</span>}}, score=-<span class="hljs-number">0.2364331</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">1</span>)]]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.search({​
    collection_name: <span class="hljs-string">&#x27;my_json_collection&#x27;</span>,​
    data: [<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>],​
    limit: <span class="hljs-number">5</span>,​
    output_fields: [<span class="hljs-string">&#x27;metadata&#x27;</span>],​
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot; and metadata[&quot;price&quot;] &lt; 150&#x27;</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_json_collection&quot;,​
    &quot;data&quot;: [​
        [0.3, -0.6, 0.1]​
    ],​
    &quot;annsField&quot;: &quot;embedding&quot;,​
    &quot;limit&quot;: 5,​
    &quot;searchParams&quot;:{​
        &quot;params&quot;:{&quot;nprobe&quot;:10}​
    },​
    &quot;outputFields&quot;: [&quot;metadata&quot;],​
    &quot;filter&quot;: &quot;metadata[\&quot;brand\&quot;] == \&quot;BrandA\&quot;&quot;​
}&#x27;</span>​
​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;distance&quot;:-0.24793813,&quot;id&quot;:1,&quot;metadata&quot;:&quot;{\&quot;category\&quot;: \&quot;electronics\&quot;, \&quot;price\&quot;: 99.99, \&quot;brand\&quot;: \&quot;BrandA\&quot;}&quot;}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>En este ejemplo, Milvus devuelve las 5 entidades más similares al vector de consulta, con el campo <code translate="no">metadata</code> que contiene una marca de <code translate="no">&quot;BrandA&quot;</code>.</p>
<p>Además, Milvus soporta operadores avanzados de filtrado JSON como <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_CONTAINS_ALL</code>, y <code translate="no">JSON_CONTAINS_ANY</code>, que pueden mejorar aún más las capacidades de consulta. Para más detalles, consulte <a href="/docs/es/boolean.md">Filtrado de metadatos</a>.</p>
<h2 id="Limits​" class="common-anchor-header">Límites<button data-href="#Limits​" class="anchor-icon" translate="no">
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
<li><p><strong>Limitaciones de indexación</strong>: Debido a la complejidad de las estructuras de datos, no es posible indexar campos JSON.</p></li>
<li><p><strong>Coincidencia de tipos de datos</strong>: si el valor clave de un campo JSON es un número entero o flotante, sólo puede compararse con otra clave entera o flotante o con los campos <code translate="no">INT32/64</code> o <code translate="no">FLOAT32/64</code>. Si el valor clave es una cadena (<code translate="no">VARCHAR</code>), sólo puede compararse con otra clave de cadena.</p></li>
<li><p><strong>Restricciones de denominación</strong>: Al nombrar claves JSON, se recomienda utilizar sólo letras, caracteres numéricos y guiones bajos, ya que otros caracteres pueden causar problemas durante el filtrado o la búsqueda.</p></li>
<li><p><strong>Tratamiento de valores de cadena</strong>: Para valores de cadena (<code translate="no">VARCHAR</code>), Milvus almacena cadenas de campo JSON tal cual sin conversión semántica. Por ejemplo: <code translate="no">'a&quot;b'</code>, <code translate="no">&quot;a'b&quot;</code>, <code translate="no">'a\\'b'</code>, y <code translate="no">&quot;a\\&quot;b&quot;</code> se almacenan tal y como se han introducido; sin embargo, <code translate="no">'a'b'</code> y <code translate="no">&quot;a&quot;b&quot;</code> se consideran inválidos.</p></li>
<li><p><strong>Gestión de diccionarios anidados</strong>: Los diccionarios anidados dentro de valores de campo JSON se tratan como cadenas.</p></li>
<li><p>Límite<strong>de tamaño de los campos JSON</strong>: Los campos JSON están limitados a 65.536 bytes.</p></li>
</ul>
