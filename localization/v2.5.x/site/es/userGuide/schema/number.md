---
id: number.md
title: Campo numérico
summary: >-
  Un campo numérico es un campo escalar que almacena valores numéricos. Estos
  valores pueden ser números enteros (números enteros) o decimales (números de
  coma flotante). Suelen utilizarse para representar cantidades, medidas o
  cualquier dato que deba procesarse matemáticamente.
---
<h1 id="Number-Field" class="common-anchor-header">Campo numérico<button data-href="#Number-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Un campo numérico es un campo escalar que almacena valores numéricos. Estos valores pueden ser números enteros<strong>(enteros</strong>) o decimales<strong>(números de coma flotante</strong>). Suelen utilizarse para representar cantidades, medidas o cualquier dato que deba procesarse matemáticamente.</p>
<p>La siguiente tabla describe los tipos de datos de los campos numéricos disponibles en Milvus.</p>
<table>
   <tr>
     <th><p>Tipo de campo</p></th>
     <th><p>Descripción</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">BOOL</code></p></td>
     <td><p>Tipo booleano para almacenar <code translate="no">true</code> o <code translate="no">false</code>, adecuado para describir estados binarios.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">INT8</code></p></td>
     <td><p>Entero de 8 bits, adecuado para almacenar datos enteros de rango pequeño.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">INT16</code></p></td>
     <td><p>Entero de 16 bits, para datos enteros de rango medio.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">INT32</code></p></td>
     <td><p>Entero de 32 bits, ideal para almacenar datos enteros generales como cantidades de productos o ID de usuario.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">INT64</code></p></td>
     <td><p>Entero de 64 bits, adecuado para almacenar datos de rango grande como marcas de tiempo o identificadores.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT</code></p></td>
     <td><p>Número de coma flotante de 32 bits, para datos que requieren una precisión general, como las valoraciones o la temperatura.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">DOUBLE</code></p></td>
     <td><p>Número de coma flotante de doble precisión de 64 bits, para datos de alta precisión como información financiera o cálculos científicos.</p></td>
   </tr>
</table>
<p>Para declarar un campo numérico, basta con definir <code translate="no">datatype</code> como uno de los tipos de datos numéricos disponibles. Por ejemplo, <code translate="no">DataType.INT64</code> para un campo entero o <code translate="no">DataType.FLOAT</code> para un campo de coma flotante.</p>
<div class="alert note">
<p>Milvus admite valores nulos y valores por defecto para los campos numéricos. Para habilitar estas características, establezca <code translate="no">nullable</code> en <code translate="no">True</code> y <code translate="no">default_value</code> en un valor numérico. Para más detalles, consulte <a href="/docs/es/nullable-and-default.md">Nullable &amp; Default</a>.</p>
</div>
<h2 id="Add-number-field" class="common-anchor-header">Añadir un campo numérico<button data-href="#Add-number-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Para almacenar datos numéricos, defina un campo numérico en el esquema de su colección. A continuación se muestra un ejemplo de esquema de colección con dos campos numéricos:</p>
<ul>
<li><p><code translate="no">age</code>: almacena datos enteros, permite valores nulos y tiene un valor por defecto de <code translate="no">18</code>.</p></li>
<li><p><code translate="no">price</code>: almacena datos flotantes, permite valores nulos, pero no tiene un valor por defecto.</p></li>
</ul>
<div class="alert note">
<p>Si establece <code translate="no">enable_dynamic_fields=True</code> al definir el esquema, Milvus le permite insertar campos escalares que no se definieron previamente. Sin embargo, esto puede aumentar la complejidad de las consultas y de la gestión, afectando potencialmente al rendimiento. Para más información, consulte <a href="/docs/es/enable-dynamic-field.md">Campo dinámico</a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Import necessary libraries</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Define server address</span>
SERVER_ADDR = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment"># Create a MilvusClient instance</span>
client = MilvusClient(uri=SERVER_ADDR)

<span class="hljs-comment"># Define the collection schema</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Add an INT64 field `age` that supports null values with default value 18</span>
schema.add_field(field_name=<span class="hljs-string">&quot;age&quot;</span>, datatype=DataType.INT64, nullable=<span class="hljs-literal">True</span>, default_value=<span class="hljs-number">18</span>)
<span class="hljs-comment"># Add a FLOAT field `price` that supports null values without default value</span>
schema.add_field(field_name=<span class="hljs-string">&quot;price&quot;</span>, datatype=DataType.FLOAT, nullable=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;age&quot;</span>)
        .dataType(DataType.Int64)
        .isNullable(<span class="hljs-literal">true</span>)
        .defaultValue(<span class="hljs-number">18</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;price&quot;</span>)
        .dataType(DataType.Float)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">3</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;age&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;price&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Float</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">3</span>,
  },
];

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> int64Field=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;age&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> floatField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;price&quot;,
    &quot;dataType&quot;: &quot;Float&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> pkField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;pk&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;embedding&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;dim&quot;: 3
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$int64Field</span>,
        <span class="hljs-variable">$floatField</span>,
        <span class="hljs-variable">$pkField</span>,
        <span class="hljs-variable">$vectorField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-index-params" class="common-anchor-header">Establecer parámetros de índice<button data-href="#Set-index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>La indexación ayuda a mejorar la búsqueda y el rendimiento de las consultas. En Milvus, la indexación es obligatoria para los campos vectoriales pero opcional para los campos escalares.</p>
<p>El siguiente ejemplo crea índices en el campo vectorial <code translate="no">embedding</code> y en el campo escalar <code translate="no">age</code>, ambos utilizando el tipo de índice <code translate="no">AUTOINDEX</code>. Con este tipo, Milvus selecciona automáticamente el índice más adecuado en función del tipo de datos. También puede personalizar el tipo de índice y los parámetros para cada campo. Para más detalles, consulte <a href="/docs/es/index-explained.md">Explicación del índice</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set index params</span>

index_params = client.prepare_index_params()

<span class="hljs-comment"># Index `age` with AUTOINDEX</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;age&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;age_index&quot;</span>
)

<span class="hljs-comment"># Index `embedding` with AUTOINDEX and specify similarity metric type</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># Use automatic indexing to simplify complex index settings</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>  <span class="hljs-comment"># Specify similarity metric type, options include L2, COSINE, or IP</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;age&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .build());
        
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;
<span class="hljs-keyword">const</span> indexParams = [
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;age&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;inverted_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;age&quot;,
            &quot;indexName&quot;: &quot;inverted_index&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        },
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-collection" class="common-anchor-header">Crear colección<button data-href="#Create-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez definidos el esquema y los índices, crea una colección que incluya campos numéricos.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create Collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_scalar_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_scalar_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">create_collection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_scalar_collection&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: indexParams
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_scalar_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data" class="common-anchor-header">Insertar datos<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez creada la colección, inserte las entidades que coincidan con el esquema.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample data</span>
data = [
    {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>]},
    {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>]}, <span class="hljs-comment"># `price` field is missing, which should be null</span>
    {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.1</span>]},  <span class="hljs-comment"># `age` should default to 18, `price` is null</span>
    {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">45</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.9</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">0.4</span>]},  <span class="hljs-comment"># `price` is null</span>
    {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">59.99</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.8</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.3</span>]},  <span class="hljs-comment"># `age` should default to 18</span>
    {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">60</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.9</span>]}  <span class="hljs-comment"># `price` is null</span>
]

client.insert(
    collection_name=<span class="hljs-string">&quot;my_scalar_collection&quot;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;age\&quot;: 25, \&quot;price\&quot;: 99.99, \&quot;pk\&quot;: 1, \&quot;embedding\&quot;: [0.1, 0.2, 0.3]}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;age\&quot;: 30, \&quot;pk\&quot;: 2, \&quot;embedding\&quot;: [0.4, 0.5, 0.6]}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;age\&quot;: null, \&quot;price\&quot;: null, \&quot;pk\&quot;: 3, \&quot;embedding\&quot;: [0.2, 0.3, 0.1]}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;age\&quot;: 45, \&quot;price\&quot;: null, \&quot;pk\&quot;: 4, \&quot;embedding\&quot;: [0.9, 0.1, 0.4]}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;age\&quot;: null, \&quot;price\&quot;: 59.99, \&quot;pk\&quot;: 5, \&quot;embedding\&quot;: [0.8, 0.5, 0.3]}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;age\&quot;: 60, \&quot;price\&quot;: null, \&quot;pk\&quot;: 6, \&quot;embedding\&quot;: [0.1, 0.6, 0.9]}&quot;</span>, JsonObject.class));

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_scalar_collection&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
  { <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">99.99</span>, <span class="hljs-attr">pk</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>] },
  { <span class="hljs-attr">age</span>: <span class="hljs-number">30</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">149.5</span>, <span class="hljs-attr">pk</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>] },
  { <span class="hljs-attr">age</span>: <span class="hljs-number">35</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">199.99</span>, <span class="hljs-attr">pk</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.9</span>] },
];

client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_scalar_collection&quot;</span>,
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
        {&quot;age&quot;: 25, &quot;price&quot;: 99.99, &quot;pk&quot;: 1, &quot;embedding&quot;: [0.1, 0.2, 0.3]},
        {&quot;age&quot;: 30, &quot;price&quot;: 149.50, &quot;pk&quot;: 2, &quot;embedding&quot;: [0.4, 0.5, 0.6]},
        {&quot;age&quot;: 35, &quot;price&quot;: 199.99, &quot;pk&quot;: 3, &quot;embedding&quot;: [0.7, 0.8, 0.9]}       
    ],
    &quot;collectionName&quot;: &quot;my_scalar_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-with-filter-expressions" class="common-anchor-header">Consulta con expresiones de filtro<button data-href="#Query-with-filter-expressions" class="anchor-icon" translate="no">
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
    </button></h2><p>Tras insertar las entidades, utiliza el método <code translate="no">query</code> para recuperar las entidades que coincidan con las expresiones de filtrado especificadas.</p>
<p>Para recuperar entidades donde el <code translate="no">age</code> es mayor que 30:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;age &gt; 30&#x27;</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_scalar_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;age&#x27;: 45, &#x27;price&#x27;: None, &#x27;pk&#x27;: 4}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;age&#x27;: 60, &#x27;price&#x27;: None, &#x27;pk&#x27;: 6}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;age &gt; 30&quot;</span>;

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_scalar_collection&quot;</span>)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>))
        .build());
System.out.println(resp.getQueryResults());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={price=null, pk=4, age=45}),</span>
<span class="hljs-comment">//   QueryResp.QueryResult(entity={price=null, pk=6, age=60})</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_scalar_collection&#x27;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;30 &lt;= age &lt;= 40&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;age&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_scalar_collection&quot;,
    &quot;filter&quot;: &quot;30 &lt;= age &lt;= 40&quot;,
    &quot;outputFields&quot;: [&quot;age&quot;,&quot;price&quot;]
}&#x27;</span>

<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:30,&quot;pk&quot;:2,&quot;price&quot;:149.5},{&quot;age&quot;:35,&quot;pk&quot;:3,&quot;price&quot;:199.99}]}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para recuperar entidades en las que <code translate="no">price</code> es nulo:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price is null&#x27;</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_scalar_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;age&#x27;: 30, &#x27;price&#x27;: None, &#x27;pk&#x27;: 2}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;age&#x27;: 18, &#x27;price&#x27;: None, &#x27;pk&#x27;: 3}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;age&#x27;: 45, &#x27;price&#x27;: None, &#x27;pk&#x27;: 4}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;age&#x27;: 60, &#x27;price&#x27;: None, &#x27;pk&#x27;: 6}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;price is null&quot;</span>;

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_scalar_collection&quot;</span>)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>))
        .build());
System.out.println(resp.getQueryResults());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={price=null, pk=2, age=30}), </span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={price=null, pk=3, age=18}), </span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={price=null, pk=4, age=45}), </span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={price=null, pk=6, age=60})</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;price is null&#x27;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>:<span class="hljs-string">&quot;my_scalar_collection&quot;</span>,
    <span class="hljs-attr">filter</span>:filter,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);

<span class="hljs-comment">// Example output:</span>
<span class="hljs-comment">// data: [</span>
<span class="hljs-comment">//     &quot;{&#x27;age&#x27;: 18, &#x27;price&#x27;: None, &#x27;pk&#x27;: 3}&quot;,</span>
<span class="hljs-comment">//     &quot;{&#x27;age&#x27;: 18, &#x27;price&#x27;: 59.99, &#x27;pk&#x27;: 5}&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;my_scalar_collection&quot;,
  &quot;filter&quot;: &quot;price is null&quot;,
  &quot;outputFields&quot;: [&quot;age&quot;, &quot;price&quot;, &quot;pk&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para recuperar entidades en las que <code translate="no">age</code> tiene el valor <code translate="no">18</code>, utilice la siguiente expresión. Como el valor por defecto de <code translate="no">age</code> es <code translate="no">18</code>, el resultado esperado debería incluir entidades con <code translate="no">age</code> explícitamente establecido a <code translate="no">18</code> o con <code translate="no">age</code> establecido a null.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;age == 18&#x27;</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_scalar_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;age&#x27;: 18, &#x27;price&#x27;: None, &#x27;pk&#x27;: 3}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;age&#x27;: 18, &#x27;price&#x27;: 59.99, &#x27;pk&#x27;: 5}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;age == 18&quot;</span>;

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_scalar_collection&quot;</span>)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>))
        .build());
System.out.println(resp.getQueryResults());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={price=null, pk=3, age=18}), </span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={price=59.99, pk=5, age=18})</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;age == 18&#x27;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>:<span class="hljs-string">&quot;my_scalar_collection&quot;</span>,
    <span class="hljs-attr">filter</span>:filter,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);

<span class="hljs-comment">// Example output:</span>
<span class="hljs-comment">// data: [</span>
<span class="hljs-comment">//     &quot;{&#x27;age&#x27;: 18, &#x27;price&#x27;: None, &#x27;pk&#x27;: 3}&quot;,</span>
<span class="hljs-comment">//     &quot;{&#x27;age&#x27;: 18, &#x27;price&#x27;: 59.99, &#x27;pk&#x27;: 5}&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;my_scalar_collection&quot;,
  &quot;filter&quot;: &quot;age == 18&quot;,
  &quot;outputFields&quot;: [&quot;age&quot;, &quot;price&quot;, &quot;pk&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Vector-search-with-filter-expressions" class="common-anchor-header">Búsqueda vectorial con expresiones de filtro<button data-href="#Vector-search-with-filter-expressions" class="anchor-icon" translate="no">
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
    </button></h2><p>Además del filtrado básico de campos numéricos, puede combinar búsquedas de similitud de vectores con filtros de campos numéricos. Por ejemplo, el siguiente código muestra cómo añadir un filtro de campo numérico a una búsqueda vectorial:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;25 &lt;= age &lt;= 35&quot;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;my_scalar_collection&quot;</span>,
    data=[[<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>]],
    limit=<span class="hljs-number">5</span>,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>,<span class="hljs-string">&quot;price&quot;</span>],
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;[{&#x27;id&#x27;: 2, &#x27;distance&#x27;: -0.2016308456659317, &#x27;entity&#x27;: {&#x27;age&#x27;: 30, &#x27;price&#x27;: None}}, {&#x27;id&#x27;: 1, &#x27;distance&#x27;: -0.23643313348293304, &#x27;entity&#x27;: {&#x27;age&#x27;: 25, &#x27;price&#x27;: 99.98999786376953}}]&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;25 &lt;= age &lt;= 35&quot;</span>;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_scalar_collection&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embedding&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3f</span>, -<span class="hljs-number">0.6f</span>, <span class="hljs-number">0.1f</span>})))
        .topK(<span class="hljs-number">5</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>))
        .filter(filter)
        .build());

System.out.println(resp.getSearchResults());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   [</span>
<span class="hljs-comment">//     SearchResp.SearchResult(entity={price=null, age=30}, score=-0.20163085, id=2),</span>
<span class="hljs-comment">//     SearchResp.SearchResult(entity={price=99.99, age=25}, score=-0.23643313, id=1)</span>
<span class="hljs-comment">//   ]</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_scalar_collection&#x27;</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;age&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>],
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;25 &lt;= age &lt;= 35&#x27;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_scalar_collection&quot;,
    &quot;data&quot;: [
        [0.3, -0.6, 0.1]
    ],
    &quot;annsField&quot;: &quot;embedding&quot;,
    &quot;limit&quot;: 5,
    &quot;outputFields&quot;: [&quot;age&quot;, &quot;price&quot;]
}&#x27;</span>

<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:35,&quot;distance&quot;:-0.19054288,&quot;id&quot;:3,&quot;price&quot;:199.99},{&quot;age&quot;:30,&quot;distance&quot;:-0.20163085,&quot;id&quot;:2,&quot;price&quot;:149.5},{&quot;age&quot;:25,&quot;distance&quot;:-0.2364331,&quot;id&quot;:1,&quot;price&quot;:99.99}]}</span>
<button class="copy-code-btn"></button></code></pre>
<p>En este ejemplo, primero definimos un vector de consulta y añadimos una condición de filtro <code translate="no">25 &lt;= age &lt;= 35</code> durante la búsqueda. Esto garantiza que los resultados de la búsqueda no sólo sean similares al vector de consulta, sino que también cumplan el rango de edad especificado. Para obtener más información, consulte <a href="/docs/es/filtering">Filtrado</a>.</p>
