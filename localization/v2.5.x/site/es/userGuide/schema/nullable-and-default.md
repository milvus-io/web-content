---
id: nullable-and-default.md
title: Anulable y por defecto
summary: >-
  Milvus le permite establecer el atributo nullable y los valores por defecto
  para los campos escalares, excepto el campo primario. Para los campos marcados
  como nullable=True, puede omitir el campo al insertar datos, o establecer
  directamente un valor nulo, y el sistema lo tratará como nulo sin provocar un
  error. Cuando un campo tiene un valor por defecto, el sistema aplicará
  automáticamente este valor si no se especifican datos para el campo durante la
  inserción.
---
<h1 id="Nullable--Default" class="common-anchor-header">Anulable y por defecto<button data-href="#Nullable--Default" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus le permite establecer el atributo <code translate="no">nullable</code> y valores por defecto para campos escalares, excepto el campo primario. Para los campos marcados como <code translate="no">nullable=True</code>, puede omitir el campo al insertar datos, o establecer directamente un valor nulo, y el sistema lo tratará como nulo sin provocar un error. Cuando un campo tiene un valor por defecto, el sistema aplicará automáticamente este valor si no se especifican datos para el campo durante la inserción.</p>
<p>Los atributos de valor por defecto y anulable agilizan la migración de datos de otros sistemas de bases de datos a Milvus al permitir el manejo de conjuntos de datos con valores nulos y preservar la configuración de valores por defecto. Al crear una colección, también puede habilitar los valores nulos o establecer valores por defecto para los campos en los que los valores pueden ser inciertos.</p>
<h2 id="Limits" class="common-anchor-header">Límites<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Sólo los campos escalares, excluido el campo primario, admiten valores por defecto y el atributo nullable.</p></li>
<li><p>Los campos JSON y Array no admiten valores por defecto.</p></li>
<li><p>Los valores por defecto o el atributo nullable sólo pueden configurarse durante la creación de la colección y no pueden modificarse posteriormente.</p></li>
<li><p>Los campos escalares con el atributo nullable activado no se pueden utilizar como <code translate="no">group_by_field</code> en la búsqueda de agrupación. Para obtener más información sobre la búsqueda de agrupación, consulte <a href="/docs/es/grouping-search.md">Búsqueda de agrupación</a>.</p></li>
<li><p>Los campos marcados como anulables no pueden utilizarse como claves de partición. Para más información sobre claves de partición, consulte <a href="/docs/es/use-partition-key.md">Utilizar clave de partición</a>.</p></li>
<li><p>Al crear un índice en un campo escalar con el atributo anulable activado, los valores nulos se excluirán del índice.</p></li>
<li><p><strong>Campos JSON y ARRAY</strong>: Cuando se utilizan los operadores <code translate="no">IS NULL</code> o <code translate="no">IS NOT NULL</code> para filtrar campos JSON o ARRAY, estos operadores funcionan a nivel de columna, lo que indica que sólo evalúan si todo el objeto JSON o array es nulo. Por ejemplo, si una clave dentro de un objeto JSON es nula, no será reconocida por el filtro <code translate="no">IS NULL</code>. Para obtener más información, consulte <a href="/docs/es/basic-operators.md">Operadores básicos</a>.</p></li>
</ul>
<h2 id="Nullable-attribute" class="common-anchor-header">Atributo nullable<button data-href="#Nullable-attribute" class="anchor-icon" translate="no">
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
    </button></h2><p>El atributo <code translate="no">nullable</code> permite almacenar valores nulos en una colección, lo que proporciona flexibilidad a la hora de manejar datos desconocidos.</p>
<h3 id="Set-the-nullable-attribute" class="common-anchor-header">Establezca el atributo nullable</h3><p>Al crear una colección, utilice <code translate="no">nullable=True</code> para definir los campos anulables (el valor predeterminado es <code translate="no">False</code>). El siguiente ejemplo crea una colección llamada <code translate="no">user_profiles_null</code> y establece el campo <code translate="no">age</code> como anulable:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>)

<span class="hljs-comment"># Define collection schema</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_schema=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;age&quot;</span>, datatype=DataType.INT64, nullable=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Nullable field</span>

<span class="hljs-comment"># Set index params</span>
index_params = client.prepare_index_params()
index_params.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

<span class="hljs-comment"># Create collection</span>
client.create_collection(collection_name=<span class="hljs-string">&quot;user_profiles_null&quot;</span>, schema=schema, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;age&quot;</span>)
        .dataType(DataType.Int64)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
Map&lt;String,Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.L2)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;user_profiles_null&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;user_profiles_null&quot;</span>,
  <span class="hljs-attr">schema</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">int64</span>,
    },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span> },

    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span> },
  ],

  <span class="hljs-attr">index_params</span>: [
    {
      <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_inde&quot;</span>,
      <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
      <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">L2</span>,
      <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
    },
  ],
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> pkField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;id&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;dim&quot;: 5
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> nullField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;age&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;nullable&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$pkField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$nullField</span>
    ]
}&quot;</span>

<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;vector&quot;,
            &quot;metricType&quot;: &quot;L2&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;user_profiles_null\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-entities" class="common-anchor-header">Insertar entidades</h3><p>Cuando insertes datos en un campo anulable, inserta null u omite directamente este campo:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">data = [
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">30</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-literal">None</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>]}
]

client.insert(collection_name=<span class="hljs-string">&quot;user_profiles_null&quot;</span>, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 1, \&quot;vector\&quot;: [0.1, 0.2, 0.3, 0.4, 0.5], \&quot;age\&quot;: 30}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 2, \&quot;vector\&quot;: [0.2, 0.3, 0.4, 0.5, 0.6], \&quot;age\&quot;: null}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 3, \&quot;vector\&quot;: [0.3, 0.4, 0.5, 0.6, 0.7]}&quot;</span>, JsonObject.class));

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;user_profiles_null&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
  { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-attr">age</span>: <span class="hljs-number">30</span> },
  { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>], <span class="hljs-attr">age</span>: <span class="hljs-literal">null</span> },
  { <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>] },
];

client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;user_profiles_null&quot;</span>,
  <span class="hljs-attr">data</span>: data,
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;id&quot;: 1, &quot;vector&quot;: [0.1, 0.2, 0.3, 0.4, 0.5], &quot;age&quot;: 30},
        {&quot;id&quot;: 2, &quot;vector&quot;: [0.2, 0.3, 0.4, 0.5, 0.6], &quot;age&quot;: null}, 
        {&quot;id&quot;: 3, &quot;vector&quot;: [0.3, 0.4, 0.5, 0.6, 0.7]} 
    ],
    &quot;collectionName&quot;: &quot;user_profiles_null&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-and-query-with-null-values" class="common-anchor-header">Búsqueda y consulta con valores nulos</h3><p>Al utilizar el método <code translate="no">search</code>, si un campo contiene valores <code translate="no">null</code>, el resultado de la búsqueda devolverá el campo como nulo:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;user_profiles_null&quot;</span>,
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.128</span>]],
    limit=<span class="hljs-number">2</span>,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">16</span>}},
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: 0.15838398039340973, &#x27;entity&#x27;: {&#x27;age&#x27;: 30, &#x27;id&#x27;: 1}}, {&#x27;id&#x27;: 2, &#x27;distance&#x27;: 0.28278401494026184, &#x27;entity&#x27;: {&#x27;age&#x27;: None, &#x27;id&#x27;: 2}}]&quot;] </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

Map&lt;String,Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">16</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;user_profiles_null&quot;</span>)
        .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>})))
        .topK(<span class="hljs-number">2</span>)
        .searchParams(params)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>))
        .build());

System.out.println(resp.getSearchResults());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// [[SearchResp.SearchResult(entity={id=1, age=30}, score=0.0, id=1), SearchResp.SearchResult(entity={id=2, age=null}, score=0.050000004, id=2)]]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;user_profiles_null&#x27;</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.5</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;age&#x27;</span>, <span class="hljs-string">&#x27;id&#x27;</span>],
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;25 &lt;= age &lt;= 35&#x27;</span>,
    <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">nprobe</span>: <span class="hljs-number">16</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;user_profiles_null&quot;,
    &quot;data&quot;: [
        [0.1, -0.2, 0.3, 0.4, 0.5]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 5,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;age&quot;]
}&#x27;</span>

<span class="hljs-comment">#{&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:30,&quot;distance&quot;:0.16000001,&quot;id&quot;:1},{&quot;age&quot;:null,&quot;distance&quot;:0.28999996,&quot;id&quot;:2},{&quot;age&quot;:null,&quot;distance&quot;:0.52000004,&quot;id&quot;:3}]}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cuando se utiliza el método <code translate="no">query</code> para el filtrado escalar, los resultados de filtrado para valores nulos son todos falsos, indicando que no serán seleccionados.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Reviewing previously inserted data:</span>
<span class="hljs-comment"># {&quot;id&quot;: 1, &quot;vector&quot;: [0.1, 0.2, ..., 0.128], &quot;age&quot;: 30}</span>
<span class="hljs-comment"># {&quot;id&quot;: 2, &quot;vector&quot;: [0.2, 0.3, ..., 0.129], &quot;age&quot;: None}</span>
<span class="hljs-comment"># {&quot;id&quot;: 3, &quot;vector&quot;: [0.3, 0.4, ..., 0.130], &quot;age&quot;: None}  # Omitted age  column is treated as None</span>

results = client.query(
    collection_name=<span class="hljs-string">&quot;user_profiles_null&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;age &gt;= 0&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]
)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {&quot;id&quot;: 1, &quot;age&quot;: 30}</span>
<span class="hljs-comment"># ]</span>
<span class="hljs-comment"># Note: Entities with `age` as `null` (id 2 and 3) will not appear in the result.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;user_profiles_null&quot;</span>)
        .filter(<span class="hljs-string">&quot;age &gt;= 0&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>))
        .build());

System.out.println(resp.getQueryResults());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// [QueryResp.QueryResult(entity={id=1, age=30})]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>(
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;user_profiles_null&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;age &gt;= 0&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;user_profiles_null&quot;,
    &quot;filter&quot;: &quot;age &gt;= 0&quot;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;age&quot;]
}&#x27;</span>

<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:30,&quot;id&quot;:1}]}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para devolver entidades con valores <code translate="no">null</code>, realice la consulta sin ninguna condición de filtrado escalar como se indica a continuación:</p>
<div class="alert note">
<p>El método <code translate="no">query</code>, cuando se utiliza sin ninguna condición de filtrado, recupera todas las entidades de la colección, incluidas las que tienen valores nulos. Para restringir el número de entidades devueltas, debe especificarse el parámetro <code translate="no">limit</code>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">null_results = client.query(
    collection_name=<span class="hljs-string">&quot;user_profiles_null&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;&quot;</span>,     <span class="hljs-comment"># Query without any filtering condition</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>],
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># [{&quot;id&quot;: 2, &quot;age&quot;: None}, {&quot;id&quot;: 3, &quot;age&quot;: None}]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">QueryResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;user_profiles_null&quot;</span>)
        .filter(<span class="hljs-string">&quot;&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>))
        .limit(<span class="hljs-number">10</span>)
        .build());

System.out.println(resp.getQueryResults());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>(
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;user_profiles_null&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;user_profiles_null&quot;,
    &quot;expr&quot;: &quot;&quot;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;age&quot;],
    &quot;limit&quot;: 10
}&#x27;</span>

<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:30,&quot;id&quot;:1},{&quot;age&quot;:null,&quot;id&quot;:2},{&quot;age&quot;:null,&quot;id&quot;:3}]}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Default-values" class="common-anchor-header">Valores por defecto<button data-href="#Default-values" class="anchor-icon" translate="no">
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
    </button></h2><p>Los valores por defecto son valores preestablecidos asignados a campos escalares. Si no proporciona un valor para un campo con un valor predeterminado durante la inserción, el sistema utiliza automáticamente el valor predeterminado.</p>
<h3 id="Set-default-values" class="common-anchor-header">Establecer valores por defecto</h3><p>Al crear una colección, utilice el parámetro <code translate="no">default_value</code> para definir el valor por defecto de un campo. El siguiente ejemplo muestra cómo establecer el valor por defecto de <code translate="no">age</code> en <code translate="no">18</code> y de <code translate="no">status</code> en <code translate="no">&quot;active&quot;</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_schema=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;age&quot;</span>, datatype=DataType.INT64, default_value=<span class="hljs-number">18</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;status&quot;</span>, datatype=DataType.VARCHAR, default_value=<span class="hljs-string">&quot;active&quot;</span>, max_length=<span class="hljs-number">10</span>)

index_params = client.prepare_index_params()
index_params.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

client.create_collection(collection_name=<span class="hljs-string">&quot;user_profiles_default&quot;</span>, schema=schema, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-keyword">import</span> java.util.*;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;age&quot;</span>)
        .dataType(DataType.Int64)
        .defaultValue(<span class="hljs-number">18L</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;status&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">10</span>)
        .defaultValue(<span class="hljs-string">&quot;active&quot;</span>)
        .build());

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
Map&lt;String,Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.L2)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;user_profiles_default&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;user_profiles_default&quot;</span>,
  <span class="hljs-attr">schema</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">int64</span>,
    },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">default_value</span>: <span class="hljs-number">18</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;status&#x27;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">30</span>, <span class="hljs-attr">default_value</span>: <span class="hljs-string">&#x27;active&#x27;</span>},
  ],

  <span class="hljs-attr">index_params</span>: [
    {
      <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_inde&quot;</span>,
      <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
      <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">L2</span>,
      <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
    },
  ],
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> pkField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;id&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;dim&quot;: 5
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> defaultValueField1=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;age&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;defaultValue&quot;: 18
}&#x27;</span>

<span class="hljs-built_in">export</span> defaultValueField2=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;status&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;defaultValue&quot;: &quot;active&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 10
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$pkField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$defaultValueField1</span>,
        <span class="hljs-variable">$defaultValueField2</span>
    ]
}&quot;</span>

<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;vector&quot;,
            &quot;metricType&quot;: &quot;L2&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;user_profiles_default\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-entities" class="common-anchor-header">Insertar entidades</h3><p>Al insertar datos, si omite campos con un valor por defecto o establece su valor en null, el sistema utiliza el valor por defecto:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">data = [
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, ..., <span class="hljs-number">0.128</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-string">&quot;status&quot;</span>: <span class="hljs-string">&quot;premium&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, ..., <span class="hljs-number">0.129</span>]},  <span class="hljs-comment"># `age` and `status` use default values</span>
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, ..., <span class="hljs-number">0.130</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;status&quot;</span>: <span class="hljs-literal">None</span>},  <span class="hljs-comment"># `status` uses default value</span>
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, ..., <span class="hljs-number">0.131</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;status&quot;</span>: <span class="hljs-string">&quot;inactive&quot;</span>}  <span class="hljs-comment"># `age` uses default value</span>
]

client.insert(collection_name=<span class="hljs-string">&quot;user_profiles_default&quot;</span>, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 1, \&quot;vector\&quot;: [0.1, 0.2, 0.3, 0.4, 0.5], \&quot;age\&quot;: 30, \&quot;status\&quot;: \&quot;premium\&quot;}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 2, \&quot;vector\&quot;: [0.2, 0.3, 0.4, 0.5, 0.6]}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 3, \&quot;vector\&quot;: [0.3, 0.4, 0.5, 0.6, 0.7], \&quot;age\&quot;: 25, \&quot;status\&quot;: null}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 4, \&quot;vector\&quot;: [0.4, 0.5, 0.6, 0.7, 0.8], \&quot;age\&quot;: null, \&quot;status\&quot;: \&quot;inactive\&quot;}&quot;</span>, JsonObject.class));

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;user_profiles_default&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-string">&quot;status&quot;</span>: <span class="hljs-string">&quot;premium&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>]}, 
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;status&quot;</span>: <span class="hljs-literal">null</span>}, 
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-literal">null</span>, <span class="hljs-string">&quot;status&quot;</span>: <span class="hljs-string">&quot;inactive&quot;</span>}  
];

client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;user_profiles_default&quot;</span>,
  <span class="hljs-attr">data</span>: data,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;id&quot;: 1, &quot;vector&quot;: [0.1, 0.2, 0.3, 0.4, 0.5], &quot;age&quot;: 30, &quot;status&quot;: &quot;premium&quot;},
        {&quot;id&quot;: 2, &quot;vector&quot;: [0.2, 0.3, 0.4, 0.5, 0.6]},
        {&quot;id&quot;: 3, &quot;vector&quot;: [0.3, 0.4, 0.5, 0.6, 0.7], &quot;age&quot;: 25, &quot;status&quot;: null}, 
        {&quot;id&quot;: 4, &quot;vector&quot;: [0.4, 0.5, 0.6, 0.7, 0.8], &quot;age&quot;: null, &quot;status&quot;: &quot;inactive&quot;}      
    ],
    &quot;collectionName&quot;: &quot;user_profiles_default&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Para obtener más información sobre cómo surten efecto los valores nulos y por defecto, consulte <a href="/docs/es/nullable-and-default.md#share-FciZdpB0zoXmGwxMxgecYuP6nHc">Reglas aplicables</a>.</p>
</div>
<h3 id="Search-and-query-with-default-values" class="common-anchor-header">Búsqueda y consulta con valores por defecto</h3><p>Las entidades que contienen valores por defecto se tratan igual que cualquier otra entidad durante las búsquedas vectoriales y el filtrado escalar. Puede incluir valores por defecto como parte de sus operaciones <code translate="no">search</code> y <code translate="no">query</code>.</p>
<p>Por ejemplo, en una operación <code translate="no">search</code>, las entidades con <code translate="no">age</code> establecido en el valor por defecto de <code translate="no">18</code> se incluirán en los resultados:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;user_profiles_default&quot;</span>,
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.128</span>]],
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">16</span>}},
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;age == 18&quot;</span>,  <span class="hljs-comment"># 18 is the default value of the `age` field</span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 2, &#x27;distance&#x27;: 0.28278401494026184, &#x27;entity&#x27;: {&#x27;id&#x27;: 2, &#x27;age&#x27;: 18, &#x27;status&#x27;: &#x27;active&#x27;}}, {&#x27;id&#x27;: 4, &#x27;distance&#x27;: 0.8315839767456055, &#x27;entity&#x27;: {&#x27;id&#x27;: 4, &#x27;age&#x27;: 18, &#x27;status&#x27;: &#x27;inactive&#x27;}}]&quot;] </span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

Map&lt;String,Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">16</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;user_profiles_default&quot;</span>)
        .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>})))
        .searchParams(params)
        .filter(<span class="hljs-string">&quot;age == 18&quot;</span>)
        .topK(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>))
        .build());

System.out.println(resp.getSearchResults());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// [[SearchResp.SearchResult(entity={id=2, age=18, status=active}, score=0.050000004, id=2), SearchResp.SearchResult(entity={id=4, age=18, status=inactive}, score=0.45000002, id=4)]]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;user_profiles_default&#x27;</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.5</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;age&#x27;</span>, <span class="hljs-string">&#x27;id&#x27;</span>, <span class="hljs-string">&#x27;status&#x27;</span>],
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;age == 18&#x27;</span>,
    <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">nprobe</span>: <span class="hljs-number">16</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;user_profiles_default&quot;,
    &quot;data&quot;: [
        [0.1, 0.2, 0.3, 0.4, 0.5]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 5,
    &quot;filter&quot;: &quot;age == 18&quot;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;age&quot;, &quot;status&quot;]
}&#x27;</span>

<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:18,&quot;distance&quot;:0.050000004,&quot;id&quot;:2,&quot;status&quot;:&quot;active&quot;},{&quot;age&quot;:18,&quot;distance&quot;:0.45000002,&quot;id&quot;:4,&quot;status&quot;:&quot;inactive&quot;}]}</span>
<button class="copy-code-btn"></button></code></pre>
<p>En una operación <code translate="no">query</code>, puede hacer coincidir o filtrar por valores predeterminados directamente:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query all entities where `age` equals the default value (18)</span>
default_age_results = client.query(
    collection_name=<span class="hljs-string">&quot;user_profiles_default&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;age == 18&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)

<span class="hljs-comment"># Query all entities where `status` equals the default value (&quot;active&quot;)</span>
default_status_results = client.query(
    collection_name=<span class="hljs-string">&quot;user_profiles_default&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">ageResp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;user_profiles_default&quot;</span>)
        .filter(<span class="hljs-string">&quot;age == 18&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>))
        .build());

System.out.println(ageResp.getQueryResults());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// [QueryResp.QueryResult(entity={id=2, age=18, status=active}), QueryResp.QueryResult(entity={id=4, age=18, status=inactive})]</span>

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">statusResp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;user_profiles_default&quot;</span>)
        .filter(<span class="hljs-string">&quot;status == \&quot;active\&quot;&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>))
        .build());

System.out.println(statusResp.getQueryResults());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// [QueryResp.QueryResult(entity={id=2, age=18, status=active}), QueryResp.QueryResult(entity={id=3, age=25, status=active})]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Query all entities where `age` equals the default value (18)</span>
<span class="hljs-keyword">const</span> default_age_results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>(
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;user_profiles_default&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;age == 18&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
);
<span class="hljs-comment">// Query all entities where `status` equals the default value (&quot;active&quot;)</span>
<span class="hljs-keyword">const</span> default_status_results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>(
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;user_profiles_default&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;user_profiles_default&quot;,
    &quot;filter&quot;: &quot;age == 18&quot;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;age&quot;, &quot;status&quot;]
}&#x27;</span>

<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:18,&quot;id&quot;:2,&quot;status&quot;:&quot;active&quot;},{&quot;age&quot;:18,&quot;id&quot;:4,&quot;status&quot;:&quot;inactive&quot;}]}</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;user_profiles_default&quot;,
    &quot;filter&quot;: &quot;status == \&quot;active\&quot;&quot;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;age&quot;, &quot;status&quot;]
}&#x27;</span>

<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:18,&quot;id&quot;:2,&quot;status&quot;:&quot;active&quot;},{&quot;age&quot;:25,&quot;id&quot;:3,&quot;status&quot;:&quot;active&quot;}]}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Applicable-rules" class="common-anchor-header">Reglas aplicables<button data-href="#Applicable-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>La siguiente tabla resume el comportamiento de las columnas anulables y los valores por defecto bajo diferentes combinaciones de configuración. Estas reglas determinan cómo Milvus maneja los datos cuando se intentan insertar valores nulos o si no se proporcionan valores de campo.</p>
<table>
   <tr>
     <th><p>Anulable</p></th>
     <th><p>Valor por defecto</p></th>
     <th><p>Tipo de valor por defecto</p></th>
     <th><p>Entrada del usuario</p></th>
     <th><p>Resultado</p></th>
     <th><p>Ejemplo</p></th>
   </tr>
   <tr>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>No nulo</p></td>
     <td><p>Ninguno/nulo</p></td>
     <td><p>Utiliza el valor por defecto</p></td>
     <td><p>Campo: <code translate="no">age</code> Valor por defecto: <code translate="no">18</code></p><p>Entrada del usuario: null</p><p>Resultado: se almacena como <code translate="no">18</code></p></td>
   </tr>
   <tr>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>-</p></td>
     <td><p>Ninguno/nulo</p></td>
     <td><p>Almacenado como null</p></td>
     <td><p>Campo: <code translate="no">middle_name</code> Valor por defecto: -</p><p>Entrada del usuario: null</p><p>Resultado: almacenado como null</p></td>
   </tr>
   <tr>
     <td><p>❌</p></td>
     <td><p>✅</p></td>
     <td><p>No nulo</p></td>
     <td><p>Ninguno/nulo</p></td>
     <td><p>Utiliza el valor por defecto</p></td>
     <td><p>Campo: <code translate="no">status</code> Valor por defecto: <code translate="no">"active"</code></p><p>Entrada del usuario: null</p><p>Resultado: almacenado como <code translate="no">"active"</code></p></td>
   </tr>
   <tr>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>-</p></td>
     <td><p>Ninguno/nulo</p></td>
     <td><p>Lanza un error</p></td>
     <td><p>Campo: <code translate="no">email</code> Valor por defecto: -</p><p>Valor introducido por el usuario: null</p><p>Resultado: Operación rechazada Operación rechazada, el sistema lanza un error</p></td>
   </tr>
   <tr>
     <td><p>❌</p></td>
     <td><p>✅</p></td>
     <td><p>Nulo</p></td>
     <td><p>Ninguno/nulo</p></td>
     <td><p>Lanza un error</p></td>
     <td><p>Campo: <code translate="no">username</code> Valor por defecto: null</p><p>Valor introducido por el usuario: null</p><p>Resultado: Operación rechazada Operación rechazada, el sistema lanza un error</p></td>
   </tr>
</table>
