---
id: hnsw.md
title: HNSW
summary: >-
  El índice HNSW es un algoritmo de indexación basado en grafos que puede
  mejorar el rendimiento en la búsqueda de vectores flotantes de alta dimensión.
  Ofrece una excelente precisión de búsqueda y baja latencia, aunque requiere
  una gran sobrecarga de memoria para mantener su estructura de grafo
  jerárquico.
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
    </button></h1><p>El índice <strong>HNSW</strong> es un algoritmo de indexación <strong>basado en grafos</strong> que puede mejorar el rendimiento en la búsqueda de vectores flotantes de alta dimensión. Ofrece una <strong>excelente</strong> precisión de búsqueda y <strong>baja</strong> latencia, aunque requiere una <strong>gran</strong> sobrecarga de memoria para mantener su estructura de grafo jerárquico.</p>
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
    </button></h2><p>El algoritmo Hierarchical Navigable Small World (HNSW) construye un gráfico de varias capas, como un mapa con distintos niveles de zoom. La <strong>capa inferior</strong> contiene todos los puntos de datos, mientras que las <strong>capas superiores</strong> consisten en un subconjunto de puntos de datos muestreados de la capa inferior.</p>
<p>En esta jerarquía, cada capa contiene nodos que representan puntos de datos, conectados por aristas que indican su proximidad. Las capas superiores proporcionan saltos de larga distancia para acercarse rápidamente al objetivo, mientras que las capas inferiores permiten una búsqueda fina para obtener los resultados más precisos.</p>
<p>El funcionamiento es el siguiente</p>
<ol>
<li><p><strong>Punto de entrada</strong>: La búsqueda comienza en un punto de entrada fijo en la capa superior, que es un nodo predeterminado del grafo.</p></li>
<li><p><strong>Búsqueda codiciosa</strong>: El algoritmo se desplaza ávidamente hacia el vecino más cercano en la capa actual hasta que no puede acercarse más al vector de consulta. Las capas superiores tienen un propósito de navegación, actuando como un filtro grueso para localizar posibles puntos de entrada para la búsqueda más fina en los niveles inferiores.</p></li>
<li><p><strong>Descenso de capas</strong>: Una vez alcanzado un <strong>mínimo local</strong> en la capa actual, el algoritmo salta a la capa inferior, utilizando una conexión preestablecida, y repite la búsqueda codiciosa.</p></li>
<li><p><strong>Refinamiento</strong><strong>final</strong>: Este proceso continúa hasta que se alcanza la capa inferior, donde un último paso de refinamiento identifica a los vecinos más cercanos.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" />
   </span> <span class="img-wrapper"> <span>HNSW</span> </span></p>
<p>El rendimiento de HNSW depende de varios parámetros clave que controlan tanto la estructura del grafo como el comportamiento de la búsqueda. Estos parámetros son:</p>
<ul>
<li><p><code translate="no">M</code>: El número máximo de aristas o conexiones que cada nodo puede tener en el grafo en cada nivel de la jerarquía. Un <code translate="no">M</code> más alto da como resultado un gráfico más denso y aumenta la recuperación y la precisión, ya que la búsqueda tiene más caminos que explorar, lo que también consume más memoria y ralentiza el tiempo de inserción debido a las conexiones adicionales. Como se muestra en la imagen anterior, <strong>M = 5</strong> indica que cada nodo del grafo HNSW está conectado directamente a un máximo de otros 5 nodos. Esto crea una estructura de grafos moderadamente densa en la que los nodos tienen múltiples caminos para llegar a otros nodos.</p></li>
<li><p><code translate="no">efConstruction</code>: El número de candidatos considerados durante la construcción del índice. Un <code translate="no">efConstruction</code> más alto suele dar como resultado un gráfico de mejor calidad, pero requiere más tiempo de construcción.</p></li>
<li><p><code translate="no">ef</code>: El número de vecinos evaluados durante una búsqueda. Aumentar <code translate="no">ef</code> mejora la probabilidad de encontrar los vecinos más cercanos, pero ralentiza el proceso de búsqueda.</p></li>
</ul>
<p>Para más información sobre cómo ajustar estos parámetros a sus necesidades, consulte <a href="/docs/es/hnsw.md#Index-params">Parámetros del índice</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Crear un índice<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Para construir un índice <code translate="no">HNSW</code> en un campo vectorial en Milvus, utilice el método <code translate="no">add_index()</code>, especificando los parámetros <code translate="no">index_type</code>, <code translate="no">metric_type</code>, y adicionales para el índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

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
<button class="copy-code-btn"></button></code></pre>
<p>En esta configuración:</p>
<ul>
<li><p><code translate="no">index_type</code>: El tipo de índice a construir. En este ejemplo, establezca el valor <code translate="no">HNSW</code>.</p></li>
<li><p><code translate="no">metric_type</code>: El método utilizado para calcular la distancia entre vectores. Los valores soportados incluyen <code translate="no">COSINE</code>, <code translate="no">L2</code>, y <code translate="no">IP</code>. Para más detalles, consulte <a href="/docs/es/metric.md">Tipos de métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opciones de configuración adicionales para construir el índice.</p>
<ul>
<li><p><code translate="no">M</code>: Número máximo de vecinos a los que se puede conectar cada nodo.</p></li>
<li><p><code translate="no">efConstruction</code>: Número de vecinos candidatos considerados para la conexión durante la construcción del índice.</p></li>
</ul>
<p>Para conocer más parámetros de construcción disponibles para el índice <code translate="no">HNSW</code>, consulte <a href="/docs/es/hnsw.md#Index-building-params">Parámetros de construcción</a> del <a href="/docs/es/hnsw.md#Index-building-params">índice</a>.</p></li>
</ul>
<p>Una vez configurados los parámetros del índice, puede crear el índice utilizando directamente el método <code translate="no">create_index()</code> o pasando los parámetros del índice en el método <code translate="no">create_collection</code>. Para más detalles, consulte <a href="/docs/es/create-collection.md">Crear colección</a>.</p>
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
    </button></h2><p>Una vez creado el índice e insertadas las entidades, puede realizar búsquedas de similitud en el índice.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>En esta configuración:</p>
<ul>
<li><p><code translate="no">params</code>: Opciones de configuración adicionales para la búsqueda en el índice.</p>
<ul>
<li><code translate="no">ef</code>: Número de vecinos a considerar durante una búsqueda.</li>
</ul>
<p>Para conocer más parámetros de búsqueda disponibles para el índice <code translate="no">HNSW</code>, consulte <a href="/docs/es/hnsw.md#Index-specific-search-params">Parámetros de búsqueda específicos del índice</a>.</p></li>
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
    </button></h2><p>En esta sección se ofrece una descripción general de los parámetros utilizados para crear un índice y realizar búsquedas en él.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parámetros de creación de índices</h3><p>La siguiente tabla enumera los parámetros que pueden configurarse en <code translate="no">params</code> al <a href="/docs/es/hnsw.md#Build-index">crear un índice</a>.</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Número máximo de conexiones （o aristas) que puede tener cada nodo en el grafo, incluyendo tanto las aristas salientes como las entrantes. Este parámetro afecta directamente tanto a la construcción del índice como a la búsqueda.</p></td>
     <td><p><strong>Tipo</strong>: Entero <strong>Rango</strong>: [2, 2048]</p><p><strong>Valor por defecto</strong>: <code translate="no">30</code> (hasta 30 aristas salientes y 30 entrantes por nodo)</p></td>
     <td><p>Un valor mayor de <code translate="no">M</code> suele dar lugar a <strong>una mayor precisión</strong>, pero <strong>aumenta la sobrecarga de memoria</strong> y <strong>ralentiza tanto la construcción del índice como la búsqueda</strong>. Considere la posibilidad de aumentar <code translate="no">M</code> para conjuntos de datos con alta dimensionalidad o cuando sea crucial una alta recuperación.</p><p>Considere la posibilidad de reducir <code translate="no">M</code> cuando el uso de memoria y la velocidad de búsqueda sean las principales preocupaciones.</p><p>En la mayoría de los casos, se recomienda establecer un valor dentro de este intervalo: [5, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Número de vecinos candidatos considerados para la conexión durante la construcción del índice. Para cada nuevo elemento se evalúa un conjunto mayor de candidatos, pero el número máximo de conexiones realmente establecidas sigue estando limitado por <code translate="no">M</code>.</p></td>
     <td><p><strong>Tipo</strong>: Entero <strong>Rango</strong>: [1, <em>int_max</em>]</p><p><strong>Valor por defecto</strong>: <code translate="no">360</code></p></td>
     <td><p>Un <code translate="no">efConstruction</code> más alto suele dar como resultado un <strong>índice más preciso</strong>, ya que se exploran más conexiones potenciales. Sin embargo, esto también conlleva <strong>un mayor tiempo de indexación y un mayor uso de memoria</strong> durante la construcción. Considere aumentar <code translate="no">efConstruction</code> para mejorar la precisión, especialmente en escenarios donde el tiempo de indexación es menos crítico.</p><p>Considere la posibilidad de reducir <code translate="no">efConstruction</code> para acelerar la construcción del índice cuando las limitaciones de recursos sean un problema.</p><p>En la mayoría de los casos, se recomienda establecer un valor dentro de este intervalo: [50, 500].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parámetros de búsqueda específicos del índice</h3><p>La siguiente tabla enumera los parámetros que pueden configurarse en <code translate="no">search_params.params</code> al <a href="/docs/es/hnsw.md#Search-on-index">buscar en el índice</a>.</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Controla la amplitud de la búsqueda durante la recuperación del vecino más próximo. Determina cuántos nodos son visitados y evaluados como vecinos más cercanos potenciales.  Este parámetro sólo afecta al proceso de búsqueda y se aplica exclusivamente a la capa inferior del gráfico.</p></td>
     <td><p><strong>Tipo</strong>: Integer <strong>Rango</strong>: [1, <em>int_max</em>]</p><p><strong>Valor por defecto</strong>: <em>limit</em> (TopK vecinos más cercanos a devolver)</p></td>
     <td><p>Un valor mayor de <code translate="no">ef</code> suele <strong>aumentar la precisión de la búsqueda</strong>, ya que se tienen en cuenta más vecinos potenciales. Sin embargo, esto también <strong>aumenta el tiempo de búsqueda</strong>. Considere la posibilidad de aumentar <code translate="no">ef</code> cuando sea fundamental lograr una alta recuperación y la velocidad de búsqueda sea menos importante.</p><p>Considere la posibilidad de reducir <code translate="no">ef</code> para dar prioridad a las búsquedas más rápidas, especialmente en situaciones en las que sea aceptable una ligera reducción de la precisión.</p><p>En la mayoría de los casos, se recomienda establecer un valor dentro de este rango: [K, 10K].</p></td>
   </tr>
</table>
