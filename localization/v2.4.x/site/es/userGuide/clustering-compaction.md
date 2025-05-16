---
id: clustering-compaction.md
title: Compactación en clústeres
related_key: 'clustering, compaction'
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction.png" alt="Without clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Compactación sin agrupación</span> </span></p>
<p>Si Milvus puede distribuir entidades entre segmentos basándose en los valores de un campo específico, el alcance de la búsqueda puede restringirse dentro de un segmento, mejorando así el rendimiento de la búsqueda.</p>
<p>La<strong>compactación por agrupamiento</strong> es una función de Milvus que redistribuye las entidades entre los segmentos de una colección basándose en los valores de un campo escalar. Para activar esta función, primero debe seleccionar un campo escalar como <strong>clave de agrupación</strong>. Esto permite a Milvus redistribuir entidades en un segmento cuando sus valores de clave de agrupación caen dentro de un rango específico. Cuando usted activa una compactación de clustering, Milvus genera/actualiza un índice global llamado <strong>PartitionStats</strong>, que registra la relación de mapeo entre segmentos y valores de clave de clustering.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction-2.png" alt="With Clustering Compaction" class="doc-image" id="with-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Con la compactación de clustering</span> </span></p>
<p>Utilizando <strong>PartitionStats</strong> como referencia, Milvus puede eliminar datos irrelevantes al recibir una solicitud de búsqueda/consulta que contenga un valor de clave de agrupación y restringir el ámbito de búsqueda dentro de los segmentos que corresponden al valor, mejorando así el rendimiento de la búsqueda. Para obtener más información sobre la mejora del rendimiento, consulte Pruebas comparativas.</p>
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
    </button></h2><p>La función de compactación de agrupaciones de Milvus es altamente configurable. Puede elegir activarla manualmente o configurarla para que Milvus la active automáticamente a intervalos. Para activar la compactación en cluster, haga lo siguiente:</p>
<h3 id="Global-Configuration" class="common-anchor-header">Configuración global</h3><p>Debe modificar su archivo de configuración de Milvus como se muestra a continuación.</p>
<pre><code translate="no" class="language-yaml">dataCoord:
  compaction:
    clustering:
      <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span> 
      autoEnable: <span class="hljs-literal">false</span> 
      triggerInterval: 600 
      minInterval: 3600 
      maxInterval: 259200 
      newDataSizeThreshold: 512m 
      <span class="hljs-built_in">timeout</span>: 7200
     
queryNode:
  enableSegmentPrune: <span class="hljs-literal">true</span> 

datanode:
  clusteringCompaction:
    memoryBufferRatio: 0.1 
    workPoolSize: 8  
common:
  usePartitionKeyAsClusteringKey: <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">dataCoord.compaction.clustering</code></p>
<table>
<thead>
<tr><th>Elemento de configuración</th><th>Descripción</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enable</code></td><td>Especifica si se habilita la compactación en clúster.<br>Configure esta opción en <code translate="no">true</code> si necesita habilitar esta función para cada colección que tenga una clave de agrupación.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">autoEnable</code></td><td>Especifica si se activa la compactación automática.<br>Si se establece en <code translate="no">true</code>, Milvus compactará las colecciones que tengan una clave de agrupación en los intervalos especificados.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">triggerInterval</code></td><td>Especifica el intervalo en milisegundos en el que Milvus inicia la compactación de agrupaciones.<br>Este parámetro sólo es válido cuando <code translate="no">autoEnable</code> se establece en <code translate="no">true</code>.</td><td>-</td></tr>
<tr><td><code translate="no">minInterval</code></td><td>Especifica el intervalo mínimo en segundos.<br>Este parámetro sólo es válido cuando <code translate="no">autoEnable</code> está configurado como <code translate="no">true</code>.<br>Establecerlo en un número entero mayor que triggerInterval ayuda a evitar compactaciones repetidas en un período corto.</td><td>-</td></tr>
<tr><td><code translate="no">maxInterval</code></td><td>Especifica el intervalo máximo en segundos.<br>Este parámetro sólo es válido cuando <code translate="no">autoEnable</code> está configurado como <code translate="no">true</code>.<br>Una vez que Milvus detecta que una colección no ha sido compactada en clúster durante un periodo superior a este valor, fuerza una compactación en clúster.</td><td>-</td></tr>
<tr><td><code translate="no">newDataSizeThreshold</code></td><td>Especifica el umbral superior para activar una compactación en clúster.<br>Este parámetro sólo es válido cuando <code translate="no">autoEnable</code> está configurado como <code translate="no">true</code>.<br>Una vez que Milvus detecta que el volumen de datos de una colección supera este valor, inicia un proceso de compactación en clúster.</td><td>-</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Especifica la duración del tiempo de espera para una compactación en clúster.<br>Una compactación en clúster falla si su tiempo de ejecución supera este valor.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">queryNode</code></p>
<table>
<thead>
<tr><th>Configuración Elemento</th><th>Descripción</th><th>Valor predeterminado</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enableSegmentPrune</code></td><td>Especifica si Milvus poda los datos consultando PartitionStats al recibir peticiones de búsqueda/consulta.<br>Si se establece en <code translate="no">true</code>, Milvus puede eliminar los datos irrelevantes de los segmentos durante una solicitud de búsqueda/consulta.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">dataNode.clusteringCompaction</code></p>
<table>
<thead>
<tr><th>Configuración Elemento</th><th>Descripción</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">memoryBufferRatio</code></td><td>Especifica la proporción de memoria intermedia para las tareas de compactación en clúster. <br>Milvus vacía los datos cuando el tamaño de los datos excede el tamaño del búfer asignado calculado utilizando este ratio.</td><td>-</td></tr>
<tr><td><code translate="no">workPoolSize</code></td><td>Especifica el tamaño del grupo de trabajadores para una tarea de compactación en clúster.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">common</code></p>
<table>
<thead>
<tr><th>Configuración Elemento</th><th>Descripción</th><th>Valor predeterminado</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">usePartitionKeyAsClusteringKey</code></td><td>Especifica si se utiliza la clave de partición en las colecciones como clave de agrupación.<br>El valor <code translate="no">true</code> indica que la clave de partición se utiliza como clave de agrupación.<br>Siempre puede anular esta configuración en una colección configurando explícitamente una clave de agrupación.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
</ul>
<p>Para aplicar los cambios anteriores a su cluster Milvus, por favor siga los pasos en <a href="/docs/es/v2.4.x/configure-helm.md">Configurar Milvus con Helm</a> y <a href="/docs/es/v2.4.x/configure_operator.md">Configurar Milvus con Milvus Operators</a>.</p>
<h3 id="Collection-Configuration" class="common-anchor-header">Configuración de la colección</h3><p>Para la compactación en cluster en una colección específica, debe seleccionar un campo escalar de la colección como clave de cluster.</p>
<pre><code translate="no" class="language-python">default_fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;key&quot;</span>, dtype=DataType.INT64, is_clustering_key=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;var&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, is_primary=<span class="hljs-literal">False</span>),
    FieldSchema(name=<span class="hljs-string">&quot;embeddings&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=dim)
]

default_schema = CollectionSchema(
    fields=default_fields, 
    description=<span class="hljs-string">&quot;test clustering-key collection&quot;</span>
)

coll1 = Collection(name=<span class="hljs-string">&quot;clustering_test&quot;</span>, schema=default_schema)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Puede utilizar los campos escalares de los siguientes tipos de datos como clave de agrupación: <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code>, <code translate="no">Double</code> y <code translate="no">VarChar</code>.</p>
</div>
<h2 id="Trigger-Clustering-Compaction" class="common-anchor-header">Activar la compactación en clúster<button data-href="#Trigger-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>Si ha activado la compactación automática de clustering, Milvus activa automáticamente la compactación en el intervalo especificado. Alternativamente, puede activar manualmente la compactación como se indica a continuación:</p>
<pre><code translate="no" class="language-python">coll1.compact(is_clustering=<span class="hljs-literal">True</span>)
coll1.get_compaction_state(is_clustering=<span class="hljs-literal">True</span>)
coll1.wait_for_compaction_completed(is_clustering=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Benchmark-Test" class="common-anchor-header">Prueba comparativa</h3><p>El volumen de datos y los patrones de consulta combinados determinan la mejora del rendimiento que puede aportar la compactación en clúster. Una prueba comparativa interna demuestra que la compactación en clústeres mejora hasta 25 veces las consultas por segundo (QPS).</p>
<p>La prueba de referencia se realiza en una colección que contiene entidades de un conjunto de datos LAION de 20 millones y 768 dimensiones, con el campo clave designado como clave de agrupación. Una vez activada la compactación por clustering en la colección, se envían búsquedas concurrentes hasta que el uso de la CPU alcanza un nivel alto de agua.</p>
<table>
  <thead>
    <tr>
      <th rowspan="2">Filtro de búsqueda</th>
      <th rowspan="2">Ratio de poda</th>
      <th colspan="5">Latencia (ms)</th>
      <th rowspan="2">QPS (reqs/s)</th>
    </tr>
    <tr>
      <th>Avg</th>
      <th>Mín</th>
      <th>Max</th>
      <th>Mediana</th>
      <th>TP99</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ninguno</td>
      <td>0%</td>
      <td>1685</td>
      <td>672</td>
      <td>2294</td>
      <td>1710</td>
      <td>2291</td>
      <td>17.75</td>
    </tr>
    <tr>
      <td>clave &gt; 200 y clave &lt; 800</td>
      <td>40.2%</td>
      <td>1045</td>
      <td>47</td>
      <td>1828</td>
      <td>1085</td>
      <td>1617</td>
      <td>28.38</td>
    </tr>
    <tr>
      <td>clave &gt; 200 y clave &lt; 600</td>
      <td>59.8%</td>
      <td>829</td>
      <td>45</td>
      <td>1483</td>
      <td>882</td>
      <td>1303</td>
      <td>35.78</td>
    </tr>
    <tr>
      <td>clave &gt; 200 y clave &lt; 400</td>
      <td>79.5%</td>
      <td>550</td>
      <td>100</td>
      <td>985</td>
      <td>584</td>
      <td>898</td>
      <td>54.00</td>
    </tr>
    <tr>
      <td>clave == 1000</td>
      <td>99%</td>
      <td>68</td>
      <td>24</td>
      <td>1273</td>
      <td>70</td>
      <td>246</td>
      <td>431.41</td>
    </tr>
  </tbody>
</table>
<p>A medida que se reduce el ámbito de búsqueda en los filtros de búsqueda, aumenta el porcentaje de exclusión. Esto significa que se omiten más entidades durante el proceso de búsqueda. Si se comparan las estadísticas de la primera y la última fila, se observa que las búsquedas sin compactación por agrupación requieren escanear toda la colección. Por otro lado, las búsquedas con compactación de agrupación mediante una clave específica pueden lograr una mejora de hasta 25 veces.</p>
<h2 id="Best-practices" class="common-anchor-header">Buenas prácticas<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p>Habilítela para colecciones con grandes volúmenes de datos. El rendimiento de la búsqueda mejora con mayores volúmenes de datos en una colección. Es una buena opción activar esta función para colecciones con más de 1 millón de entidades.</p></li>
<li><p>Elija una clave de agrupación adecuada: puede utilizar campos escalares empleados habitualmente como condiciones de filtrado como clave de agrupación. Para una colección que contiene datos de varios inquilinos, puede utilizar el campo que distingue a un inquilino de otro como clave de agrupación.</p></li>
<li><p>Utilice la clave de partición como clave de agrupación. Puede establecer <code translate="no">common.usePartitionKeyAsClusteringKey</code> en true si desea habilitar esta función para todas las colecciones de su instancia de Milvus o si todavía tiene problemas de rendimiento en una colección grande con una clave de partición. Al hacerlo, tendrá una clave de agrupación y una clave de partición cuando elija un campo escalar en una colección como clave de partición.</p>
<p>Tenga en cuenta que esta configuración no le impide elegir otro campo escalar como clave de agrupación. La clave de agrupación designada explícitamente siempre tiene prioridad.</p></li>
</ul>
