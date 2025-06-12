---
id: clustering-compaction.md
title: Compactación en clústeres
summary: >-
  La compactación en clústeres está diseñada para mejorar el rendimiento de la
  búsqueda y reducir los costes en grandes colecciones. Esta guía le ayudará a
  comprender la compactación por clústeres y cómo esta función puede mejorar el
  rendimiento de la búsqueda.
---
<h1 id="Clustering-Compaction" class="common-anchor-header">Compactación en clústeres<button data-href="#Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>La compactación en clústeres está diseñada para mejorar el rendimiento de la búsqueda y reducir los costes en grandes colecciones. Esta guía le ayudará a comprender la compactación en clústeres y cómo esta función puede mejorar el rendimiento de la búsqueda.</p>
<h2 id="Overview" class="common-anchor-header">Visión general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus almacena las entidades entrantes en segmentos dentro de una colección y sella un segmento cuando está lleno. Si esto ocurre, se crea un nuevo segmento para acomodar entidades adicionales. Como resultado, las entidades se distribuyen arbitrariamente entre los segmentos. Esta distribución requiere que Milvus busque en múltiples segmentos para encontrar los vecinos más cercanos a un vector de consulta dado.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/without-clustering-compaction.png" alt="Without Clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Sin compactación por agrupamiento</span> </span></p>
<p>Si Milvus puede distribuir entidades entre segmentos basándose en los valores de un campo específico, el alcance de la búsqueda puede restringirse dentro de un segmento, mejorando así el rendimiento de la búsqueda.</p>
<p><strong>La compactación por agrupamiento</strong> es una función de Milvus que redistribuye entidades entre los segmentos de una colección basándose en los valores de un campo escalar. Para activar esta función, primero debe seleccionar un campo escalar como <strong>clave de agrupación</strong>. Esto permite a Milvus redistribuir entidades en un segmento cuando sus valores de clave de agrupación caen dentro de un rango específico. Cuando usted activa una compactación de clustering, Milvus genera/actualiza un índice global llamado <strong>PartitionStats</strong>, que registra la relación de mapeo entre segmentos y valores de clave de clustering.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/clustering-compaction.png" alt="Clustering Compaction" class="doc-image" id="clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Compactación de clustering</span> </span></p>
<p>Utilizando <strong>PartitionStats</strong> como referencia, Milvus puede eliminar datos irrelevantes al recibir una solicitud de búsqueda/consulta que contenga un valor de clave de agrupación y restringir el ámbito de búsqueda dentro de los segmentos que corresponden al valor, mejorando así el rendimiento de la búsqueda. Para obtener más información sobre la mejora del rendimiento, consulte <a href="/docs/es/clustering-compaction.md#Benchmark-Test">Pruebas comparativas</a>.</p>
<h2 id="Use-Clustering-Compaction" class="common-anchor-header">Utilizar la compactación de clústeres<button data-href="#Use-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>La función de compactación de agrupaciones en Milvus es altamente configurable. Puede elegir activarla manualmente o configurarla para que Milvus la active automáticamente a intervalos. Para activar la compactación en cluster, haga lo siguiente:</p>
<h3 id="Global-Configuration" class="common-anchor-header">Configuración global</h3><p>Debe modificar su archivo de configuración de Milvus como se muestra a continuación.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">clustering:</span>
      <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> 
      <span class="hljs-attr">autoEnable:</span> <span class="hljs-literal">false</span> 
      <span class="hljs-attr">triggerInterval:</span> <span class="hljs-number">600</span> 
      <span class="hljs-attr">minInterval:</span> <span class="hljs-number">3600</span> 
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-number">259200</span> 
      <span class="hljs-attr">newDataSizeThreshold:</span> <span class="hljs-string">512m</span> 
      <span class="hljs-attr">timeout:</span> <span class="hljs-number">7200</span>
     
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">enableSegmentPrune:</span> <span class="hljs-literal">true</span> 

<span class="hljs-attr">datanode:</span>
  <span class="hljs-attr">clusteringCompaction:</span>
    <span class="hljs-attr">memoryBufferRatio:</span> <span class="hljs-number">0.1</span> 
    <span class="hljs-attr">workPoolSize:</span> <span class="hljs-number">8</span>  
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">usePartitionKeyAsClusteringKey:</span> <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Configurar Elemento</p></th>
     <th><p>Descripción</p></th>
     <th><p>Valor por defecto</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">dataCoord.compaction.clustering</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">enable</code></p></td>
     <td><p>Especifica si se habilita la compactación en clúster. Establezca este valor en <code translate="no">true</code> si necesita habilitar esta función para cada colección que tenga una clave de agrupación.</p></td>
     <td><p>falso</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">autoEnable</code></p></td>
     <td><p>Especifica si se activa la compactación automática. Establecer esto a <code translate="no">true</code> indica que Milvus compacta las colecciones que tienen una clave de agrupación en los intervalos especificados.</p></td>
     <td><p>falso</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">triggerInterval</code></p></td>
     <td><p>Especifica el intervalo en milisegundos en el que Milvus inicia la compactación de agrupaciones. Esto sólo se aplica cuando se establece <code translate="no">autoEnable</code> en <code translate="no">true</code>.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">minInterval</code></p></td>
     <td><p>Especifica el intervalo mínimo en milisegundos. Esto se aplica sólo cuando se establece <code translate="no">autoEnable</code> a <code translate="no">true</code>.</p><p>Establecerlo en un número entero mayor que <code translate="no">triggerInterval</code> ayuda a evitar compactaciones repetidas en un período corto.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">maxInterval</code></p></td>
     <td><p>Especifica el intervalo máximo en milisegundos. Esto sólo se aplica cuando se establece <code translate="no">autoEnable</code> a <code translate="no">true</code>.</p><p>Una vez que Milvus detecta que una colección no ha sido compactada en clúster durante un periodo superior a este valor, fuerza una compactación en clúster.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">newDataSizeThreshold</code></p></td>
     <td><p>Especifica el umbral superior para activar una compactación en clúster. Esto sólo se aplica cuando se establece <code translate="no">autoEnable</code> en <code translate="no">true</code>.</p><p>Una vez que Milvus detecta que el volumen de datos de una colección supera este valor, inicia un proceso de compactación en clúster.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">timeout</code></p></td>
     <td><p>Especifica la duración del tiempo de espera para una compactación en clúster. Una compactación en clúster falla si su tiempo de ejecución supera este valor.</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">queryNode</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">enableSegmentPrune</code></p></td>
     <td><p>Especifica si Milvus poda los datos consultando PartitionStats al recibir solicitudes de búsqueda/consulta. Establézcalo en <code translate="no">true</code> para que Milvus pueda podar datos al recibir peticiones de búsqueda/consulta consultando PartitionStats.</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">dataNode.clusteringCompaction</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryBufferRatio</code></p></td>
     <td><p>Especifica la proporción de memoria intermedia para las tareas de compactación de agrupaciones.  Milvus vacía los datos cuando el tamaño de los datos excede el tamaño del búfer asignado calculado utilizando este ratio.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">workPoolSize</code></p></td>
     <td><p>Especifica el tamaño de la reserva de trabajadores para una tarea de compactación en clúster.</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">common</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">usePartitionKeyAsClusteringKey</code></p></td>
     <td><p>Especifica si se debe utilizar la clave de partición en las colecciones como clave de agrupación. Si se establece en true, Milvus tratará las claves de partición de las colecciones como clave de agrupación. </p><p>Siempre puede anular esta configuración en una colección configurando explícitamente una clave de agrupación.</p></td>
     <td></td>
   </tr>
</table>
<p>Para aplicar los cambios anteriores a su cluster Milvus, por favor siga los pasos en <a href="/docs/es/configure-helm.md#Configure-Milvus-via-configuration-file">Configurar Milvus con Helm</a> y <a href="/docs/es/configure_operator.md">Configurar Milvus con Milvus Operators</a>.</p>
<h3 id="Collection-Configuration" class="common-anchor-header">Configuración de la colección</h3><p>Para la compactación de clústeres en una colección específica, debe seleccionar un campo escalar de la colección como clave de clúster.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN
)

schema = MilvusClient.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;key&quot;</span>, DataType.INT64, is_clustering_key=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;var&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;clustering_test&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;key&quot;</span>)
        .dataType(DataType.Int64)
        .isClusteringKey(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;var&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;clustering_test&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span> = <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">TOKEN</span> = <span class="hljs-string">&#x27;root:Milvus&#x27;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-variable constant_">TOKEN</span>,
});
<span class="hljs-keyword">const</span> schema = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;id&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;key&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
      <span class="hljs-attr">is_clustering_key</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;var&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
      <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">false</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
      <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>,
    },
  ];
  
  <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;clustering_test&#x27;</span>,
    <span class="hljs-attr">schema</span>: schema,
  });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Puede utilizar los campos escalares de los siguientes tipos de datos como clave de agrupación: <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code>, <code translate="no">Double</code> y <code translate="no">VarChar</code>.</p>
</div>
<h3 id="Trigger-Clustering-Compaction" class="common-anchor-header">Activar la compactación en clúster</h3><p>Si ha activado la compactación automática de clustering, Milvus activa automáticamente la compactación en el intervalo especificado. Alternativamente, puede activar manualmente la compactación como se indica a continuación:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># trigger a manual compaction</span>
job_id = client.compact(
    collection_name=<span class="hljs-string">&quot;clustering_test&quot;</span>, 
    is_clustering=<span class="hljs-literal">True</span>
)

<span class="hljs-comment"># get the compaction state</span>
client.get_compaction_state(
    job_id=job_id,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.CompactReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.GetCompactionStateReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.CompactResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.GetCompactionStateResp;

<span class="hljs-type">CompactResp</span> <span class="hljs-variable">compactResp</span> <span class="hljs-operator">=</span> client.compact(CompactReq.builder()
        .collectionName(<span class="hljs-string">&quot;clustering_test&quot;</span>)
        .isClustering(<span class="hljs-literal">true</span>)
        .build());

<span class="hljs-type">GetCompactionStateResp</span> <span class="hljs-variable">stateResp</span> <span class="hljs-operator">=</span> client.getCompactionState(GetCompactionStateReq.builder()
        .compactionID(compactResp.getCompactionID())
        .build());

System.out.println(stateResp.getState());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// trigger a manual compaction</span>
<span class="hljs-keyword">const</span> {compactionID} = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">compact</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;clustering_test&quot;</span>, 
    <span class="hljs-attr">is_clustering</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-comment">// get the compaction state</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getCompactionState</span>({
    <span class="hljs-attr">compactionID</span>: compactionID,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Benchmark-Test" class="common-anchor-header">Prueba comparativa<button data-href="#Benchmark-Test" class="anchor-icon" translate="no">
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
    </button></h2><p>El volumen de datos y los patrones de consulta combinados determinan la mejora del rendimiento que puede aportar la compactación en clústeres. Una prueba comparativa interna demuestra que la compactación en clústeres multiplica por 25 las consultas por segundo (QPS).</p>
<p>La prueba de referencia se realiza en una colección que contiene entidades de un conjunto de datos LAION de 20 millones y 768 dimensiones, con el campo <code translate="no">key</code> designado como clave de agrupación. Una vez activada la compactación por clustering en la colección, se envían búsquedas concurrentes hasta que el uso de la CPU alcanza un nivel alto de agua.</p>
<table>
   <tr>
     <th rowspan="2"><p>Filtro de búsqueda</p></th>
     <th rowspan="2"><p>Ratio de poda</p></th>
     <th colspan="5"><p>Latencia</p></th>
     <th rowspan="2"><p>Peticiones/s</p></th>
   </tr>
   <tr>
     <td><p>Avg</p></td>
     <td><p>Mín</p></td>
     <td><p>Máx</p></td>
     <td><p>Mediana</p></td>
     <td><p>TP99</p></td>
   </tr>
   <tr>
     <td><p>N/A</p></td>
     <td><p>0%</p></td>
     <td><p>1685</p></td>
     <td><p>672</p></td>
     <td><p>2294</p></td>
     <td><p>1710</p></td>
     <td><p>2291</p></td>
     <td><p>17.75</p></td>
   </tr>
   <tr>
     <td><p>clave&gt;200 y clave &lt; 800</p></td>
     <td><p>40.2%</p></td>
     <td><p>1045</p></td>
     <td><p>47</p></td>
     <td><p>1828</p></td>
     <td><p>1085</p></td>
     <td><p>1617</p></td>
     <td><p>28.38</p></td>
   </tr>
   <tr>
     <td><p>clave&gt;200 y clave &lt; 600</p></td>
     <td><p>59.8%</p></td>
     <td><p>829</p></td>
     <td><p>45</p></td>
     <td><p>1483</p></td>
     <td><p>882</p></td>
     <td><p>1303</p></td>
     <td><p>35.78</p></td>
   </tr>
   <tr>
     <td><p>clave&gt;200 y clave &lt; 400</p></td>
     <td><p>79.5%</p></td>
     <td><p>550</p></td>
     <td><p>100</p></td>
     <td><p>985</p></td>
     <td><p>584</p></td>
     <td><p>898</p></td>
     <td><p>54.00</p></td>
   </tr>
   <tr>
     <td><p>clave==1000</p></td>
     <td><p>99%</p></td>
     <td><p>68</p></td>
     <td><p>24</p></td>
     <td><p>1273</p></td>
     <td><p>70</p></td>
     <td><p>246</p></td>
     <td><p>431.41</p></td>
   </tr>
</table>
<p>A medida que se reduce el ámbito de búsqueda en los filtros de búsqueda, aumenta el porcentaje de exclusión. Esto significa que se omiten más entidades durante el proceso de búsqueda. Si se comparan las estadísticas de la primera y la última fila, se observa que las búsquedas sin compactación por agrupación requieren escanear toda la colección. Por otro lado, las búsquedas con compactación de agrupación utilizando una clave específica pueden lograr una mejora de hasta 25 veces.</p>
<h2 id="Best-Practices" class="common-anchor-header">Buenas prácticas<button data-href="#Best-Practices" class="anchor-icon" translate="no">
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
    </button></h2><p>A continuación le ofrecemos algunos consejos para que utilice la compactación en clústeres de forma eficiente:</p>
<ul>
<li><p>Habilítela para colecciones con grandes volúmenes de datos.</p>
<p>El rendimiento de la búsqueda mejora con volúmenes de datos mayores en una colección. Es una buena opción activar esta función para colecciones con más de 1 millón de entidades.</p></li>
<li><p>Elija una clave de agrupación adecuada.</p>
<p>Puede utilizar campos escalares empleados habitualmente como condiciones de filtrado como clave de agrupación. Para una colección que contiene datos de varios inquilinos, puede utilizar el campo que distingue a un inquilino de otro como clave de agrupación.</p></li>
<li><p>Utilice la clave de partición como clave de agrupación.</p>
<p>Puede configurar <code translate="no">common.usePartitionKeyAsClusteringKey</code> en <code translate="no">true</code> si desea habilitar esta función para todas las colecciones en su instancia de Milvus o si todavía tiene problemas de rendimiento en una colección grande con una clave de partición. Al hacerlo, tendrá una clave de agrupación y una clave de partición cuando elija un campo escalar en una colección como clave de partición.</p>
<p>Tenga en cuenta que esta configuración no le impide elegir otro campo escalar como clave de agrupación. La clave de agrupación designada explícitamente siempre tiene prioridad.</p></li>
</ul>
