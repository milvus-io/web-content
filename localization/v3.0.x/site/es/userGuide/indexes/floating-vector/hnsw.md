---
id: hnsw.md
title: HNSW
summary: >-
  El índice HNSW es un algoritmo de indexación basado en grafos que puede
  mejorar el rendimiento en la búsqueda de vectores flotantes de alta dimensión.
  Ofrece una excelente precisión de búsqueda y una baja latencia, aunque
  requiere un elevado consumo de memoria para mantener su estructura jerárquica
  de grafos.
---
<h1 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h1><p>El índice <strong>HNSW</strong> es un algoritmo de indexación <strong>basado en grafos</strong> que puede mejorar el rendimiento en la búsqueda de vectores flotantes de alta dimensión. Ofrece <strong>una excelente</strong> precisión de búsqueda y <strong>una baja</strong> latencia, aunque requiere <strong>un elevado</strong> consumo de memoria para mantener su estructura jerárquica de grafos.</p>
<h2 id="Overview" class="common-anchor-header">Descripción general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>El algoritmo Hierarchical Navigable Small World (HNSW) construye un grafo de múltiples capas, similar a un mapa con diferentes niveles de zoom. La <strong>capa inferior</strong> contiene todos los puntos de datos, mientras que las <strong>capas superiores</strong> consisten en un subconjunto de puntos de datos muestreados de la capa inferior.</p>
<p>En esta jerarquía, cada capa contiene nodos que representan puntos de datos, conectados por aristas que indican su proximidad. Las capas superiores permiten saltos de larga distancia para acercarse rápidamente al objetivo, mientras que las capas inferiores permiten una búsqueda más detallada para obtener los resultados más precisos.</p>
<p>Así es como funciona:</p>
<ol>
<li><p><strong>Punto de entrada</strong>: La búsqueda comienza en un punto de entrada fijo en la capa superior, que es un nodo predeterminado del grafo.</p></li>
<li><p><strong>Búsqueda «greedy</strong>»: El algoritmo se desplaza de forma «greedy» hacia el vecino más cercano en la capa actual hasta que no puede acercarse más al vector de consulta. Las capas superiores tienen una función de navegación, actuando como un filtro grueso para localizar posibles puntos de entrada para la búsqueda más detallada en los niveles inferiores.</p></li>
<li><p><strong>Descenso por capas</strong>: una vez alcanzado un <strong>mínimo local</strong> en la capa actual, el algoritmo salta a la capa inferior, utilizando una conexión preestablecida, y repite la búsqueda «greedy».</p></li>
<li><p><strong>Refinamiento</strong><strong>final</strong>: Este proceso continúa hasta alcanzar la capa inferior, donde un paso de refinamiento final identifica a los vecinos más cercanos.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" /> 
   <span>HNSW</span>
  
 </span></p>
<p>El rendimiento de HNSW depende de varios parámetros clave que controlan tanto la estructura del grafo como el comportamiento de la búsqueda. Entre ellos se incluyen:</p>
<ul>
<li><p><code translate="no">M</code>: El número máximo de aristas o conexiones que cada nodo puede tener en el grafo en cada nivel de la jerarquía. Un valor más alto de « <code translate="no">M</code> » da lugar a un grafo más denso y aumenta la recuperación y la precisión, ya que la búsqueda dispone de más rutas que explorar, lo que también consume más memoria y ralentiza el tiempo de inserción debido a las conexiones adicionales. Como se muestra en la imagen anterior, <strong>M = 5</strong> indica que cada nodo del grafo HNSW está conectado directamente a un máximo de otros 5 nodos. Esto crea una estructura de grafo moderadamente densa en la que los nodos disponen de múltiples rutas para llegar a otros nodos.</p></li>
<li><p><code translate="no">efConstruction</code>: El número de candidatos considerados durante la construcción del índice. Un valor más alto de « <code translate="no">efConstruction</code> » suele dar lugar a un grafo de mejor calidad, pero requiere más tiempo para su construcción.</p></li>
<li><p><code translate="no">ef</code>: El número de vecinos evaluados durante una búsqueda. Aumentar el valor de « <code translate="no">ef</code> » mejora la probabilidad de encontrar los vecinos más cercanos, pero ralentiza el proceso de búsqueda.</p></li>
</ul>
<p>Para obtener más información sobre cómo ajustar estos parámetros según tus necesidades, consulta <a href="/docs/es/hnsw.md#Index-params">«Parámetros</a> del <a href="/docs/es/hnsw.md#Index-params">índice</a>».</p>
<h2 id="Build-index" class="common-anchor-header">Crear índice<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>En este ejemplo se utiliza un cliente conectado denominado « <code translate="no">client</code> » y una colección existente denominada « <code translate="no">your_collection_name</code> ». La colección contiene un campo vectorial de cinco dimensiones denominado « <code translate="no">your_vector_field_name</code> ».</p>
<p>Defina los parámetros del índice con <code translate="no">add_index()</code> y, a continuación, cree el índice con <code translate="no">create_index()</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
    } <span class="hljs-comment"># Index building params</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>En esta configuración:</p>
<ul>
<li><p><code translate="no">index_type</code>: El tipo de índice que se va a crear. En este ejemplo, establezca el valor en <code translate="no">HNSW</code>.</p></li>
<li><p><code translate="no">metric_type</code>: El método utilizado para calcular la distancia entre vectores. Los valores admitidos incluyen <code translate="no">COSINE</code>, <code translate="no">L2</code> y <code translate="no">IP</code>. Para obtener más detalles, consulte <a href="/docs/es/metric.md">Tipos</a> de <a href="/docs/es/metric.md">métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opciones de configuración adicionales para la creación del índice.</p>
<ul>
<li><p><code translate="no">M</code>: Número máximo de vecinos a los que puede conectarse cada nodo.</p></li>
<li><p><code translate="no">efConstruction</code>: Número de vecinos candidatos que se tienen en cuenta para la conexión durante la construcción del índice.</p></li>
</ul>
<p>En el ejemplo se establecen <code translate="no">M=64</code> y <code translate="no">efConstruction=100</code> como ajustes de configuración. Para conocer los valores predeterminados y los rangos aceptados, consulte <a href="/docs/es/hnsw.md#Index-building-params">Parámetros de creación de índices</a>.</p></li>
</ul>
<p>Para crear una colección y su índice a la vez, pase los parámetros del índice a <code translate="no">create_collection()</code>. Para obtener más detalles, consulte <a href="/docs/es/create-collection.md">Crear una colección</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Búsqueda en el índice<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Tras crear el índice e insertar entidades, cargue la colección y realice una búsqueda en su campo vectorial. Para búsquedas kNN normales, establezca <code translate="no">ef</code> en al menos <code translate="no">limit</code>.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

client.load_collection(collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>)

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>En esta configuración:</p>
<ul>
<li><p><code translate="no">params</code>: Opciones de configuración adicionales para la búsqueda en el índice.</p>
<ul>
<li><code translate="no">ef</code>: Número de vecinos a tener en cuenta durante una búsqueda.</li>
</ul>
<p>Para obtener más información sobre los parámetros de búsqueda disponibles para el índice « <code translate="no">HNSW</code> », consulta <a href="/docs/es/hnsw.md#Index-specific-search-params">«Parámetros de búsqueda específicos del índice</a>».</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Parámetros del índice<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Las tablas siguientes enumeran los parámetros para la creación de índices y la búsqueda. La configuración del servidor puede anular los valores predeterminados de los parámetros que se omitan.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parámetros de creación de índices<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>La siguiente tabla enumera los parámetros que se pueden configurar en <code translate="no">params</code> al <a href="/docs/es/hnsw.md#Build-index">crear un índice</a>.</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Número máximo de conexiones (o aristas) que puede tener cada nodo en el grafo, incluyendo tanto las aristas salientes como las entrantes. Este parámetro afecta directamente tanto a la construcción del índice como a la búsqueda.</p></td>
     <td><p><strong>Tipo</strong>: Entero. <strong>Rango</strong>: [2, 2048]</p><p><strong>Valor por defecto</strong>: <code translate="no">30</code> (hasta 30 aristas salientes y 30 entrantes por nodo)</p></td>
     <td><p>Un valor mayor de « <code translate="no">M</code> » suele proporcionar <strong>una mayor precisión</strong>, pero <strong>aumenta la carga de memoria</strong> y <strong>ralentiza tanto la creación del índice como la búsqueda</strong>. Considera la posibilidad de aumentar « <code translate="no">M</code> » para conjuntos de datos de alta dimensionalidad o cuando sea fundamental obtener una alta recuperación.</p><p>Considere reducir <code translate="no">M</code> cuando el uso de memoria y la velocidad de búsqueda sean las principales preocupaciones.</p><p>En la mayoría de los casos, recomendamos establecer un valor dentro de este rango: [5, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Número de vecinos candidatos que se tienen en cuenta para la conexión durante la construcción del índice. Se evalúa un conjunto más amplio de candidatos para cada nuevo elemento, pero el número máximo de conexiones que se establecen realmente sigue estando limitado por <code translate="no">M</code>.</p></td>
     <td><p><strong>Tipo</strong>: Entero. <strong>Rango</strong>: [1, <em>int_max</em>]</p><p><strong>Valor por defecto</strong>: <code translate="no">360</code></p></td>
     <td><p>Un valor más alto de « <code translate="no">efConstruction</code> » suele dar lugar a un <strong>índice más preciso</strong>, ya que se exploran más conexiones potenciales. Sin embargo, esto también conlleva <strong>un tiempo de indexación más largo y un mayor uso de memoria</strong> durante la construcción. Considera la posibilidad de aumentar « <code translate="no">efConstruction</code> » para mejorar la precisión, especialmente en situaciones en las que el tiempo de indexación no sea tan crítico.</p><p>Considere la posibilidad de reducir el valor de « <code translate="no">efConstruction</code> » para acelerar la construcción del índice cuando las limitaciones de recursos sean un problema.</p><p>En la mayoría de los casos, recomendamos establecer un valor dentro de este rango: [50, 500].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parámetros de búsqueda específicos del índice<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>La siguiente tabla enumera los parámetros que se pueden configurar en <code translate="no">search_params.params</code> al <a href="/docs/es/hnsw.md#Search-on-index">realizar búsquedas en el índice</a>.</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Controla el alcance de la búsqueda durante la recuperación del vecino más cercano. Determina cuántos nodos se visitan y se evalúan como posibles vecinos más cercanos. Este parámetro afecta únicamente al proceso de búsqueda y se aplica exclusivamente a la capa inferior del grafo.</p></td>
     <td><p><strong>Tipo</strong>: Entero. <strong>Rango</strong>: [1, <em>int_max</em>]</p><p><strong>Valor por defecto</strong>: <code translate="no">max(limit, 16)</code> para la búsqueda kNN ordinaria; <code translate="no">512</code> para la búsqueda por rango.</p><p>Para la búsqueda kNN ordinaria, un valor explícito de ` <code translate="no">ef</code> ` debe ser mayor o igual que ` <code translate="no">limit</code> ` (el número de vecinos más cercanos que se van a devolver).</p></td>
     <td><p>Un valor mayor de <code translate="no">ef</code> suele traducirse en <strong>una mayor precisión de búsqueda</strong>, ya que se tienen en cuenta más vecinos potenciales. Sin embargo, esto también <strong>aumenta el tiempo de búsqueda</strong>. Considera la posibilidad de aumentar <code translate="no">ef</code> cuando sea fundamental lograr un alto nivel de recuperación y la velocidad de búsqueda no sea una prioridad.</p><p>Considere la posibilidad de reducir el « <code translate="no">ef</code> » para dar prioridad a búsquedas más rápidas, especialmente en situaciones en las que sea aceptable una ligera reducción de la precisión.</p><p>En la mayoría de los casos, recomendamos establecer un valor dentro de este rango: [K, 10K].</p></td>
   </tr>
</table>
