---
id: set-collection-ttl.md
title: Establecer TTL de recogida
summary: >-
  Configure políticas TTL a nivel de colección o de entidad para que los datos
  obsoletos caduquen automáticamente en Milvus.
---
<h1 id="Set-Collection-TTL" class="common-anchor-header">Establecer TTL de recogida<button data-href="#Set-Collection-TTL" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus puede caducar entidades automáticamente mediante una política <strong>de tiempo de vida (TTL)</strong>. Las entidades caducadas dejan de aparecer inmediatamente en los resultados de consultas y búsquedas, y se eliminan físicamente del almacenamiento en el siguiente ciclo de compactación, normalmente en 24 horas.</p>
<p>Existen dos modos de TTL:</p>
<ul>
<li><p><strong>TTL a nivel de colección</strong> - una ventana de retención compartida por cada entidad, establecida a través de la propiedad <code translate="no">collection.ttl.seconds</code>.</p></li>
<li><p>TTL<strong>a nivel</strong> de entidad - cada entidad lleva su propio tiempo de expiración absoluto en un campo dedicado <code translate="no">TIMESTAMPTZ</code>, marcado como el campo TTL a través de la propiedad <code translate="no">ttl_field</code>.</p></li>
</ul>
<div class="alert note">
<p>Esta característica sólo se aplica a las colecciones gestionadas.</p>
</div>
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
<li><p>Los dos modos TTL son mutuamente excluyentes. Una colección no puede tener tanto <code translate="no">collection.ttl.seconds</code> como <code translate="no">ttl_field</code> configurados al mismo tiempo. Para cambiar, consulte <a href="/docs/es/set-collection-ttl.md#Migrate-between-the-two-modes">Migrar entre los dos modos</a>.</p></li>
<li><p>El TTL a nivel de colección aplica una ventana a toda la colección. Si una sola fila necesita un tiempo de vida diferente, utilice TTL a nivel de entidad.</p></li>
<li><p>El campo para TTL a nivel de entidad debe ser <code translate="no">TIMESTAMPTZ</code>. Se rechazan otros tipos.</p></li>
<li><p>Un campo TTL por colección. El esquema puede contener varios campos <code translate="no">TIMESTAMPTZ</code>, pero sólo uno puede nombrarse en <code translate="no">ttl_field</code>.</p></li>
<li><p>La eliminación de <code translate="no">ttl_field</code> no resucita las entidades caducadas. Para restaurar una entidad caducada, vuelva a insertarla con una fecha y hora de caducidad <code translate="no">NULL</code> o futura.</p></li>
</ul>
<h2 id="Overview" class="common-anchor-header">Resumen<button data-href="#Overview" class="anchor-icon" translate="no">
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
<p><summary>Ampliar</summary></p>
<h3 id="When-to-use-TTL" class="common-anchor-header">Cuándo utilizar TTL<button data-href="#When-to-use-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>TTL es la herramienta correcta cuando la retención es una <strong>política</strong> - usted sabe de antemano que ciertas entidades deben desaparecer eventualmente, y usted quiere que el cluster lo haga cumplir sin que usted escriba un cron job.</p>
<p>Escenarios típicos:</p>
<ul>
<li><p><strong>Conjuntos de datos temporales.</strong> Conserve sólo los últimos N días de registros, métricas, eventos o cachés de características de corta duración.</p></li>
<li><p><strong>Colecciones multiusuario.</strong> Diferentes inquilinos tienen diferentes ventanas de retención en la misma colección.</p></li>
<li><p><strong>Políticas de retención por registro.</strong> Vida útil por documento en canalizaciones IoT, almacenes de documentos o almacenes de características MLOps.</p></li>
<li><p><strong>Mezcla de datos fríos y calientes.</strong> Las entidades de corta duración coexisten con las de larga duración en la misma colección.</p></li>
<li><p><strong>Caducidad basada en el cumplimiento.</strong> Minimización de datos al estilo GDPR en la que cada registro tiene su propia fecha de caducidad.</p></li>
<li><p><strong>Expiración en el tiempo.</strong> Una entidad representa un registro que sólo es válido hasta un momento determinado (el final de una campaña o de una sesión).</p></li>
</ul>
<div class="alert note">
<p>Las entidades caducadas no aparecerán en ningún resultado de búsqueda o consulta. Sin embargo, pueden permanecer en el almacenamiento hasta la posterior compactación de datos, que debe realizarse en las próximas 24 horas.</p>
<p>Puede controlar cuándo se activa la compactación de datos estableciendo el elemento de configuración <code translate="no">dataCoord.compaction.expiry.tolerance</code> en su archivo de configuración de Milvus.</p>
<p>Este elemento de configuración tiene por defecto el valor <code translate="no">-1</code>, lo que indica que se aplica el intervalo de compactación de datos existente. Sin embargo, si cambia su valor a un número entero positivo, como <code translate="no">12</code>, la compactación de datos se activará el número de horas especificado después de que caduquen las entidades.</p>
</div>
<h3 id="TTL-modes" class="common-anchor-header">Modos TTL<button data-href="#TTL-modes" class="anchor-icon" translate="no">
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
    </button></h3><p>Los dos modos responden a cuestiones de retención diferentes:</p>
<ul>
<li><p><strong>TTL a nivel de colección</strong> aplica una única duración de retención a cada entidad. Cada entidad caduca en <code translate="no">insert_ts + ttl_seconds</code>.</p></li>
<li><p><strong>TTL a nivel de entidad</strong> permite que cada entidad almacene su propia hora de caducidad absoluta en un campo <code translate="no">TIMESTAMPTZ</code>. Un <code translate="no">NULL</code> en ese campo significa que la entidad nunca expira.</p></li>
</ul>
<p>Una colección utiliza <strong>un</strong> modo a la vez: los dos son mutuamente excluyentes. Pasar de un modo a otro es una operación de varios pasos; consulte Migrar entre los dos modos.</p>
<p>Utilice esta tabla para elegir un modo:</p>
<table>
   <tr>
     <th><p><strong>Si su situación es...</strong></p></th>
     <th><p><strong>Utilice</strong></p></th>
   </tr>
   <tr>
     <td><p>Cada entidad de la colección debe seguir la misma ventana de retención</p></td>
     <td><p>TTL a nivel de colección</p></td>
   </tr>
   <tr>
     <td><p>La retención es "desde el momento de la inserción, mantener N segundos"</p></td>
     <td><p>TTL a nivel de colección</p></td>
   </tr>
   <tr>
     <td><p>Diferentes entidades necesitan diferentes tiempos de vida en la misma colección (por inquilino, caliente/frío, por documento)</p></td>
     <td><p>TTL de entidad</p></td>
   </tr>
   <tr>
     <td><p>La retención es un tiempo de reloj de pared absoluto (por ejemplo, 2027-01-01T00:00:00Z)</p></td>
     <td><p>TTL a nivel de entidad</p></td>
   </tr>
   <tr>
     <td><p>La retención se rige por una marca de tiempo comercial, no por la marca de tiempo de inserción.</p></td>
     <td><p>TTL a nivel de entidad</p></td>
   </tr>
   <tr>
     <td><p>Desea actualizar o ampliar el tiempo de vida de una entidad después de la inserción</p></td>
     <td><p>TTL a nivel de entidad</p></td>
   </tr>
   <tr>
     <td><p>Algunas entidades no deben caducar nunca, mientras que otras sí</p></td>
     <td><p>TTL a nivel de entidad (use NULL para las inmortales)</p></td>
   </tr>
</table>
<p></details></p>
<h2 id="Set-collection-level-TTL" class="common-anchor-header">TTL a nivel de colección<button data-href="#Set-collection-level-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilice TTL a nivel de colección cuando todas las entidades de la colección deban seguir la misma ventana de retención.</p>
<h3 id="Enable-on-a-new-collection" class="common-anchor-header">Habilitar en una nueva colección<button data-href="#Enable-on-a-new-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Pasar <code translate="no">collection.ttl.seconds</code> (entero, en segundos) a través del mapa <code translate="no">properties</code> en el momento de la creación.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params,
<span class="highlighted-comment-line">    properties={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>  <span class="hljs-comment"># 14 days</span></span>
<span class="highlighted-comment-line">    },</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder().build();
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;id&quot;</span>).dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>).autoID(<span class="hljs-literal">false</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>).dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">128</span>).build());

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE).build();

<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>, <span class="hljs-string">&quot;1209600&quot;</span>); <span class="hljs-comment">// 14 days</span></span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.createCollection(CreateCollectionReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .collectionSchema(schema)</span>
<span class="highlighted-comment-line">        .indexParams(Collections.singletonList(indexParam))</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">fields</span>: [
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span> },
  ],
  <span class="hljs-attr">index_params</span>: [
    { <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span> },
  ],
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>, <span class="hljs-comment">// 14 days</span></span>
<span class="highlighted-comment-line">  },</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
    WithProperty(common.CollectionTTLConfigKey, <span class="hljs-number">1209600</span>)) <span class="hljs-comment">//  TTL in seconds</span>
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;ttlSeconds&quot;: 1209600
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-on-an-existing-collection" class="common-anchor-header">Activar en una colección existente<button data-href="#Enable-on-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Llamar a <code translate="no">alter_collection_properties</code> con <code translate="no">collection.ttl.seconds</code> en el mapa <code translate="no">properties</code> para aplicar TTL a una colección que ya está en uso.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; was created earlier without TTL</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> client.has_collection(<span class="hljs-string">&quot;my_collection&quot;</span>):
    client.create_collection(
        collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
        schema=schema,
        index_params=index_params,
    )

<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>},</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier without TTL.</span>

<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>, <span class="hljs-string">&quot;1209600&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier without TTL.</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: { <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span> },</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithProperty(common.CollectionTTLConfigKey, <span class="hljs-number">60</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;properties\&quot;: {
        \&quot;collection.ttl.seconds\&quot;: 1209600
    }
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-the-TTL-setting" class="common-anchor-header">Eliminar la configuración TTL<button data-href="#Drop-the-TTL-setting" class="anchor-icon" translate="no">
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
    </button></h3><p>Si decides mantener los datos en una colección indefinidamente, puedes simplemente eliminar la configuración TTL de esa colección.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: [<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropCollectionProperties(ctx, milvusclient.NewDropCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>, common.CollectionTTLConfigKey))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/drop_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;propertyKeys\&quot;: [
        \&quot;collection.ttl.seconds\&quot;
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-entity-level-TTL--Milvus-30x" class="common-anchor-header">Establecer TTL a nivel de entidad<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Set-entity-level-TTL--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h2><p>El TTL a nivel de entidad permite que cada entidad tenga su propio tiempo de expiración absoluto. El tiempo se almacena en una columna dedicada <code translate="no">TIMESTAMPTZ</code> que usted declara en el esquema, y usted marca esa columna como el campo TTL a través de la propiedad de colección <code translate="no">ttl_field</code>.</p>
<h3 id="Enable-on-a-new-collection" class="common-anchor-header">Habilitar en una nueva colección<button data-href="#Enable-on-a-new-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Habilitar TTL a nivel de entidad en tiempo de creación requiere dos adiciones en la misma llamada <code translate="no">create_collection</code>: un campo <code translate="no">TIMESTAMPTZ</code> en el esquema, y la propiedad <code translate="no">ttl_field</code> apuntando a ese campo.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
<span class="highlighted-wrapper-line">schema.add_field(<span class="hljs-string">&quot;expire_at&quot;</span>, DataType.TIMESTAMPTZ, nullable=<span class="hljs-literal">True</span>)</span>
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

index_params = client.prepare_index_params()
index_params.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
                       metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params,
<span class="highlighted-wrapper-line">    properties={<span class="hljs-string">&quot;ttl_field&quot;</span>: <span class="hljs-string">&quot;expire_at&quot;</span>},</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder().build();
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;id&quot;</span>).dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>).autoID(<span class="hljs-literal">false</span>).build());
<span class="highlighted-wrapper-line">schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;expire_at&quot;</span>).dataType(DataType.Timestamptz)</span>
        .isNullable(<span class="hljs-literal">true</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>).dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">128</span>).build());

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE).build();

<span class="highlighted-wrapper-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-wrapper-line">properties.put(<span class="hljs-string">&quot;ttl_field&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>);</span>

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(Collections.singletonList(indexParam))
        .properties(properties)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">fields</span>: [
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span> },
<span class="highlighted-wrapper-line">    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Timestamptz</span>, <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span> },</span>
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span> },
  ],
  <span class="hljs-attr">index_params</span>: [
    { <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span> },
  ],
<span class="highlighted-wrapper-line">  <span class="hljs-attr">properties</span>: { <span class="hljs-attr">ttl_field</span>: <span class="hljs-string">&quot;expire_at&quot;</span> },</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una vez que la colección existe, inserta entidades con cadenas de fecha y hora <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; was created earlier with `ttl_field`: &quot;expire_at&quot;</span>
<span class="highlighted-comment-line">rows = [</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Never expires</span></span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-literal">None</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)]},</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Expires at 2026-12-31 UTC midnight</span></span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)]},</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Shanghai local time — normalized to UTC internally</span></span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2027-01-01T00:00:00+08:00&quot;</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)]},</span>
<span class="highlighted-comment-line">]</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.insert(<span class="hljs-string">&quot;my_collection&quot;</span>, rows)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonNull;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier with `ttl_field`: &quot;expire_at&quot;.</span>
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();

List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());

<span class="highlighted-comment-line">List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Never expires</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">r1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">r1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);</span>
<span class="highlighted-comment-line">r1.add(<span class="hljs-string">&quot;expire_at&quot;</span>, JsonNull.INSTANCE);</span>
<span class="highlighted-comment-line">r1.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">rows.add(r1);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Expires at 2026-12-31 UTC midnight</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">r2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">r2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);</span>
<span class="highlighted-comment-line">r2.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line">r2.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">rows.add(r2);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Shanghai local time — normalized to UTC internally</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">r3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">r3.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">3</span>);</span>
<span class="highlighted-comment-line">r3.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2027-01-01T00:00:00+08:00&quot;</span>);</span>
<span class="highlighted-comment-line">r3.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">rows.add(r3);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.insert(InsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(rows)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> vector = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">128</span> }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier with `ttl_field`: &quot;expire_at&quot;.</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">data</span>: [</span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// Never expires</span></span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">expire_at</span>: <span class="hljs-literal">null</span>, vector },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// Expires at 2026-12-31 UTC midnight</span></span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>, vector },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// Shanghai local time — normalized to UTC internally</span></span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2027-01-01T00:00:00+08:00&quot;</span>, vector },</span>
<span class="highlighted-comment-line">  ],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>En cada consulta y búsqueda vectorial, el servidor auto-inyecta el filtro TTL - usted nunca escribe uno, y las entidades caducadas nunca aparecen en los resultados:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.load_collection(<span class="hljs-string">&quot;my_collection&quot;</span>)

<span class="highlighted-comment-line"><span class="hljs-comment"># Expired rows are filtered out automatically</span></span>
<span class="highlighted-comment-line">results = client.query(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id &gt;= 0&quot;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>],</span>
<span class="highlighted-comment-line">    limit=<span class="hljs-number">10</span>,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"><span class="hljs-built_in">print</span>(results)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

client.loadCollection(LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build());

<span class="highlighted-comment-line"><span class="hljs-comment">// Expired rows are filtered out automatically</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">QueryResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .filter(<span class="hljs-string">&quot;id &gt;= 0&quot;</span>)</span>
<span class="highlighted-comment-line">        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>))</span>
<span class="highlighted-comment-line">        .limit(<span class="hljs-number">10L</span>)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line">System.out.println(results.getQueryResults());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span> });

<span class="highlighted-comment-line"><span class="hljs-comment">// Expired rows are filtered out automatically</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;id &gt;= 0&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>],</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,</span>
<span class="highlighted-comment-line">});</span>
<span class="highlighted-comment-line"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(results.<span class="hljs-property">data</span>);</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>El mismo autofiltro se aplica a <code translate="no">client.search()</code>.</p>
<p>Para extender el tiempo de vida de una entidad antes de que la compactación la elimine físicamente, upsert con una fecha de caducidad posterior - o <code translate="no">None</code> - para devolver la entidad al conjunto consultable.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.upsert(<span class="hljs-string">&quot;my_collection&quot;</span>, [</span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)],</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2028-01-01T00:00:00Z&quot;</span>},</span>
<span class="highlighted-comment-line">])</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());

<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);</span>
<span class="highlighted-comment-line">row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2028-01-01T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.upsert(UpsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(Collections.singletonList(row))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> vector = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">128</span> }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>());

<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">data</span>: [</span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, vector, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2028-01-01T00:00:00Z&quot;</span> },</span>
<span class="highlighted-comment-line">  ],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-on-an-existing-collection" class="common-anchor-header">Habilitar en una colección existente<button data-href="#Enable-on-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Si la colección ya existe y no tiene <code translate="no">collection.ttl.seconds</code> establecido, añada una columna <code translate="no">TIMESTAMPTZ</code> con <code translate="no">add_collection_field</code>, luego márquela como campo TTL con <code translate="no">alter_collection_properties</code>. Si lo desea, puede añadir filas históricas para rellenar sus fechas de caducidad. Las filas que no rellene se mantendrán en <code translate="no">NULL</code> y nunca caducarán.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line"><span class="hljs-comment"># Step 1 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;expire_at&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.TIMESTAMPTZ,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 2 — mark the new column as the TTL field</span></span>
<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;ttl_field&quot;</span>: <span class="hljs-string">&quot;expire_at&quot;</span>},</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 3 (optional) — backfill expiration timestamps for historical rows</span></span>
<span class="highlighted-comment-line">client.upsert(<span class="hljs-string">&quot;my_collection&quot;</span>, [</span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)],</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>},</span>
<span class="highlighted-comment-line">])</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="highlighted-comment-line"><span class="hljs-comment">// Step 1 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.addCollectionField(AddCollectionFieldReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .fieldName(<span class="hljs-string">&quot;expire_at&quot;</span>)</span>
<span class="highlighted-comment-line">        .dataType(DataType.Timestamptz)</span>
<span class="highlighted-comment-line">        .isNullable(<span class="hljs-literal">true</span>)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 2 — mark the new column as the TTL field</span></span>
<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;ttl_field&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>);</span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 3 (optional) — backfill expiration timestamps for historical rows</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();</span>
<span class="highlighted-comment-line"><span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();</span>
<span class="highlighted-comment-line">List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);</span>
<span class="highlighted-comment-line">row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.upsert(UpsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(Collections.singletonList(row))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> vector = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">128</span> }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>());

<span class="highlighted-comment-line"><span class="hljs-comment">// Step 1 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">field</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Timestamptz</span>, <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span> },</span>
<span class="highlighted-comment-line">});</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 2 — mark the new column as the TTL field</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: { <span class="hljs-attr">ttl_field</span>: <span class="hljs-string">&quot;expire_at&quot;</span> },</span>
<span class="highlighted-comment-line">});</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 3 (optional) — backfill expiration timestamps for historical rows</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">data</span>: [</span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, vector, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span> },</span>
<span class="highlighted-comment-line">  ],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-the-TTL-setting" class="common-anchor-header">Eliminar la configuración TTL<button data-href="#Drop-the-TTL-setting" class="anchor-icon" translate="no">
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
    </button></h3><p>Llame a <code translate="no">drop_collection_properties</code> con <code translate="no">ttl_field</code> en <code translate="no">property_keys</code> para detener la caducidad por entidad. La columna <code translate="no">TIMESTAMPTZ</code> en sí permanece en el esquema - todavía se puede consultar como un campo normal.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;ttl_field&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;ttl_field&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: [<span class="hljs-string">&quot;ttl_field&quot;</span>],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Al eliminar <code translate="no">ttl_field</code> se desactiva el filtro automático para futuras consultas, pero las entidades que ya habían caducado no vuelven a aparecer automáticamente. Para hacer visible una entidad caducada anteriormente, vuelva a insertarla con una marca de tiempo de caducidad <code translate="no">None</code> o futura: es la única forma de restaurar el acceso a las filas caducadas dentro de la misma sesión de carga.</p>
<h2 id="Migrate-between-the-two-modes" class="common-anchor-header">Migrar entre los dos modos<button data-href="#Migrate-between-the-two-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Los dos modos TTL son mutuamente excluyentes, por lo que cambiar entre ellos es una operación de varios pasos.</p>
<h3 id="Switch-from-collection-level-to-entity-level-TTL" class="common-anchor-header">Cambiar de TTL a nivel de colección a TTL a nivel de entidad<button data-href="#Switch-from-collection-level-to-entity-level-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>Si su colección se creó con <code translate="no">collection.ttl.seconds</code> y desea cambiar a la caducidad por entidad, siga estos cuatro pasos. Si omite el paso 1, el paso 3 fallará con <code translate="no">collection TTL is already set, cannot be set ttl field</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; already exists with `collection.ttl.seconds` set.</span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 1 — disable collection-level TTL (mandatory; the two modes are mutually exclusive)</span></span>
<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 2 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;expire_at&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.TIMESTAMPTZ,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 3 — set the ttl_field property on the column you just added</span></span>
<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;ttl_field&quot;</span>: <span class="hljs-string">&quot;expire_at&quot;</span>},</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 4 (optional) — backfill expiration timestamps for historical entities</span></span>
<span class="highlighted-comment-line">client.upsert(<span class="hljs-string">&quot;my_collection&quot;</span>, [</span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)],</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>},</span>
<span class="highlighted-comment-line">])</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; already exists with `collection.ttl.seconds` set.</span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 1 — disable collection-level TTL (mandatory; the two modes are mutually exclusive)</span></span>
<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 2 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.addCollectionField(AddCollectionFieldReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .fieldName(<span class="hljs-string">&quot;expire_at&quot;</span>)</span>
<span class="highlighted-comment-line">        .dataType(DataType.Timestamptz)</span>
<span class="highlighted-comment-line">        .isNullable(<span class="hljs-literal">true</span>)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 3 — set the ttl_field property on the column you just added</span></span>
<span class="highlighted-comment-line">Map&lt;String, String&gt; ttlField = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">ttlField.put(<span class="hljs-string">&quot;ttl_field&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>);</span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(ttlField)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 4 (optional) — backfill expiration timestamps for historical entities</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();</span>
<span class="highlighted-comment-line"><span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();</span>
<span class="highlighted-comment-line">List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);</span>
<span class="highlighted-comment-line">row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.upsert(UpsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(Collections.singletonList(row))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Las entidades históricas para las que no rellene <code translate="no">expire_at</code> tendrán <code translate="no">NULL</code> en esa columna, lo que significa que nunca caducan. Rellena sólo las filas que deben tener un tiempo de vida finito.</p>
<h3 id="Switch-from-entity-level-to-collection-level-TTL" class="common-anchor-header">Cambiar de TTL a nivel de entidad a TTL a nivel de colección<button data-href="#Switch-from-entity-level-to-collection-level-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>Para moverse en la otra dirección, elimine <code translate="no">ttl_field</code> y establezca <code translate="no">collection.ttl.seconds</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; already exists with `ttl_field` set.</span>
<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;ttl_field&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>},  <span class="hljs-comment"># 14 days</span></span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; already exists with `ttl_field` set.</span>
<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;ttl_field&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>, <span class="hljs-string">&quot;1209600&quot;</span>); <span class="hljs-comment">// 14 days</span></span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="FAQs" class="common-anchor-header">Preguntas frecuentes<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="When-does-data-expire-due-to-TTL-settings" class="common-anchor-header">¿Cuándo expiran los datos debido a la configuración TTL?<button data-href="#When-does-data-expire-due-to-TTL-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>Actualmente, los datos caducan en función del momento en que se insertaron o actualizaron. Los datos caducados no se mostrarán en los resultados de búsqueda. Para más detalles, consulte <a href="/docs/es/set-collection-ttl.md#Dyq9dQUmwoAk9WxwEuEcSDkPnoc">Ejemplos</a>.</p>
<h3 id="When-will-the-expired-data-be-physically-deleted" class="common-anchor-header">¿Cuándo se eliminarán físicamente los datos caducados?<button data-href="#When-will-the-expired-data-be-physically-deleted" class="anchor-icon" translate="no">
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
    </button></h3><p>Una vez que los datos caduquen, no se incluirán en ningún resultado de búsqueda. Sin embargo, sólo se eliminarán físicamente tras la compactación posterior del sistema, de acuerdo con las políticas de compactación de su clúster.</p>
