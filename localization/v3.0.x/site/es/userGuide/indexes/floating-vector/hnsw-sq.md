---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  HNSW_SQ combina los grafos «Hierarchical Navigable Small World» (HNSW) con la
  cuantificación escalar (SQ), creando un método avanzado de indexación
  vectorial que ofrece un equilibrio controlable entre tamaño y precisión. En
  comparación con el HNSW estándar, este tipo de índice mantiene una alta
  velocidad de procesamiento de consultas, aunque supone un ligero aumento en el
  tiempo de construcción del índice.
---
<h1 id="HNSWSQ" class="common-anchor-header">HNSW_SQ<button data-href="#HNSWSQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_SQ</strong> combina los grafos jerárquicos navegables de «mundo pequeño» (HNSW) con la cuantificación escalar (SQ), creando un método avanzado de indexación vectorial que ofrece un equilibrio controlable entre tamaño y precisión. En comparación con <a href="/docs/es/hnsw.md">el HNSW</a> estándar, este tipo de índice mantiene una alta velocidad de procesamiento de consultas, aunque supone un ligero aumento en el tiempo de construcción del índice.</p>
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
    </button></h2><p>HNSW_SQ combina dos técnicas de indexación: <strong>HNSW</strong> para una navegación rápida basada en grafos y <strong>SQ</strong> para una compresión vectorial eficiente.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW construye un grafo de múltiples capas en el que cada nodo se corresponde con un vector del conjunto de datos. En este grafo, los nodos se conectan en función de su similitud, lo que permite un recorrido rápido por el espacio de datos. La estructura jerárquica permite al algoritmo de búsqueda reducir el número de vecinos candidatos, lo que acelera significativamente el proceso de búsqueda en espacios de alta dimensión.</p>
<p>Para obtener más información, consulta <a href="/docs/es/hnsw.md">HNSW</a>.</p>
<h3 id="SQ" class="common-anchor-header">SQ<button data-href="#SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>SQ es un método para comprimir vectores representándolos con menos bits. Por ejemplo:</p>
<ul>
<li><p><strong>SQ8</strong> utiliza 8 bits, asignando los valores a 256 niveles. Para obtener más información, consulta <a href="/docs/es/ivf-sq8.md#SQ8">IVF_SQ8</a>.</p></li>
<li><p><strong>SQ6</strong> utiliza 6 bits para representar cada valor de coma flotante, lo que da como resultado 64 niveles discretos.</p></li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" /> 
   <span>Hnsw Sq</span>
  
 </span></p>
<p>Esta reducción de la precisión disminuye drásticamente el consumo de memoria y acelera el cálculo, al tiempo que conserva la estructura esencial de los datos.</p>
<h3 id="SQ4U" class="common-anchor-header">SQ4U<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.8+</span><button data-href="#SQ4U" class="anchor-icon" translate="no">
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
    </button></h3><p>Para escenarios que exigen una velocidad de consulta extrema y un uso mínimo de memoria, Milvus presenta <code translate="no">SQ4U</code>, una cuantificación escalar uniforme de 4 bits. Se trata de una forma agresiva de cuantificación escalar que comprime el valor en coma flotante de cada dimensión en un entero sin signo <strong>de 4 bits</strong>.</p>
<p>La «U» de SQ4U significa «uniforme». A diferencia de la cuantización escalar no uniforme, que suele calcular los valores mínimo y máximo de forma independiente para cada dimensión (cuantización por dimensión), SQ4U aplica una estrategia <strong>de cuantización uniforme global</strong>:</p>
<ol>
<li><p><strong>Estadísticas globales</strong>: el sistema calcula un <strong>único</strong> valor mínimo <code translate="no">vmin</code> y un <strong>único</strong> rango de valores <code translate="no">vdiff</code> que se aplica a <strong>todas las dimensiones</strong> del vector (o a todo el segmento vectorial).</p></li>
<li><p><strong>Asignación uniforme</strong>: El rango de valores global se divide en 16 intervalos iguales. Cada valor de coma flotante del vector, independientemente de la dimensión a la que pertenezca, se asigna a un entero de 4 bits (0–15) utilizando estos parámetros compartidos.</p></li>
</ol>
<p><strong>Ventajas de rendimiento:</strong></p>
<ul>
<li><p><strong>Relación de compresión de 8:1:</strong> Reduce el tamaño en un factor de 8 en comparación con <code translate="no">FP32</code> y en un factor de 2 en comparación con <code translate="no">SQ8</code>, lo que reduce significativamente la presión sobre el ancho de banda de la memoria —a menudo el cuello de botella en la búsqueda vectorial—.</p></li>
<li><p><strong>Optimización SIMD:</strong> La estructura compacta permite a las CPU modernas (AVX2/AVX-512) procesar más dimensiones por ciclo. Es fundamental destacar que el uso de parámetros globales elimina la necesidad de cargar valores variables de escala y desplazamiento durante el cálculo de la distancia, lo que mantiene la canalización de instrucciones totalmente saturada.</p></li>
<li><p><strong>Eficiencia de la caché:</strong> unos vectores de menor tamaño permiten que quepan más datos en la caché de la CPU, lo que reduce la latencia provocada por el acceso a la memoria.</p></li>
</ul>
<div class="alert note">
<p>Debido al uso compartido de parámetros globales, SQ4U ofrece un rendimiento óptimo con datos normalizados o conjuntos de datos con distribuciones de valores consistentes en todas las dimensiones.</p>
</div>
<h3 id="HNSW-+-SQ" class="common-anchor-header">HNSW + SQ<button data-href="#HNSW-+-SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW_SQ combina las ventajas de HNSW y SQ para permitir una búsqueda aproximada eficiente del vecino más cercano. Así es como funciona el proceso:</p>
<ol>
<li><p><strong>Compresión de datos:</strong> SQ comprime los vectores utilizando el algoritmo « <code translate="no">sq_type</code> » (por ejemplo, SQ6 o SQ8), lo que reduce el uso de memoria. Esta compresión puede disminuir la precisión, pero permite al sistema gestionar conjuntos de datos más grandes.</p></li>
<li><p><strong>Construcción del grafo:</strong> Los vectores comprimidos se utilizan para construir un grafo HNSW. Al estar los datos comprimidos, el grafo resultante es más pequeño y la búsqueda es más rápida.</p></li>
<li><p><strong>Recuperación de candidatos:</strong> Cuando se proporciona un vector de consulta, el algoritmo utiliza los datos comprimidos para identificar rápidamente un conjunto de vecinos candidatos a partir del grafo HNSW.</p></li>
<li><p><strong>(Opcional) Refinamiento de resultados:</strong> Los resultados iniciales de los candidatos pueden refinarse para obtener una mayor precisión, basándose en los siguientes parámetros:</p>
<ul>
<li><p><code translate="no">refine</code>: Controla si se activa este paso de refinamiento. Cuando se establece en « <code translate="no">true</code> », el sistema vuelve a calcular las distancias utilizando representaciones de mayor precisión o sin comprimir.</p></li>
<li><p><code translate="no">refine_type</code>: Especifica el nivel de precisión de los datos utilizados durante el refinamiento (p. ej., SQ6, SQ8, BF16). Una opción de mayor precisión, como « <code translate="no">FP32</code> », puede ofrecer resultados más precisos, pero requiere más memoria. Esta precisión debe superar la del conjunto de datos comprimidos original establecido en « <code translate="no">sq_type</code> ».</p></li>
<li><p><code translate="no">refine_k</code>: Actúa como factor de ampliación. Por ejemplo, si el «top <em>k»</em> es 100 y « <code translate="no">refine_k</code> » es 2, el sistema vuelve a clasificar los 200 mejores candidatos y devuelve los 100 mejores, lo que mejora la precisión general.</p></li>
</ul></li>
</ol>
<p>Para obtener una lista completa de parámetros y valores válidos, consulta <a href="/docs/es/hnsw-sq.md#Index-params">«Parámetros</a> del <a href="/docs/es/hnsw-sq.md#Index-params">índice</a>».</p>
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
    </button></h2><p>Para crear un índice « <code translate="no">HNSW_SQ</code> » en un campo vectorial en Milvus, utiliza el método « <code translate="no">add_index()</code> », especificando « <code translate="no">index_type</code> », « <code translate="no">metric_type</code> » y los parámetros adicionales para el índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_SQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;sq_type&quot;</span>: <span class="hljs-string">&quot;SQ6&quot;</span>, <span class="hljs-comment"># Scalar quantizer type</span>
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>En esta configuración:</p>
<ul>
<li><p><code translate="no">index_type</code>: El tipo de índice que se va a crear. En este ejemplo, establece el valor en « <code translate="no">HNSW_SQ</code> ».</p></li>
<li><p><code translate="no">metric_type</code>: El método utilizado para calcular la distancia entre vectores. Los valores admitidos incluyen <code translate="no">COSINE</code>, <code translate="no">L2</code> y <code translate="no">IP</code>. Para obtener más detalles, consulte <a href="/docs/es/metric.md">Tipos</a> de <a href="/docs/es/metric.md">métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opciones de configuración adicionales para la creación del índice. Para obtener más información, consulte <a href="/docs/es/hnsw-sq.md#Index-building-params">«Parámetros de creación</a> de <a href="/docs/es/hnsw-sq.md#Index-building-params">índices</a>».</p></li>
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
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Parameter controlling query time/accuracy trade-off</span>
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">1</span> <span class="hljs-comment"># The magnification factor</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>En esta configuración:</p>
<ul>
<li><code translate="no">params</code>: Opciones de configuración adicionales para la búsqueda en el índice. Para obtener más información, consulta <a href="/docs/es/hnsw-sq.md#Index-specific-search-params">«Parámetros de búsqueda específicos del índice</a>».</li>
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
    </button></h2><p>Esta sección ofrece una descripción general de los parámetros utilizados para crear un índice y realizar búsquedas en él.</p>
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
    </button></h3><p>La siguiente tabla enumera los parámetros que se pueden configurar en <code translate="no">params</code> al <a href="/docs/es/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">crear un índice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Número máximo de conexiones (o aristas) que puede tener cada nodo en el grafo, incluyendo tanto las aristas salientes como las entrantes.</p><p>Este parámetro afecta directamente tanto a la construcción del índice como a la búsqueda.</p></td>
     <td><p><strong>Tipo</strong>: Entero</p><p><strong>Rango</strong>: [2, 2048]</p><p><strong>Valor por defecto</strong>: <code translate="no">30</code> (hasta 30 aristas salientes y 30 entrantes por nodo)</p></td>
     <td><p>Un valor de « <code translate="no">M</code> » mayor suele proporcionar una <strong>mayor precisión</strong>, pero <strong>aumenta la carga de memoria</strong> y <strong>ralentiza tanto la creación del índice como la búsqueda</strong>.</p><p>Considera la posibilidad de aumentar el « <code translate="no">M</code> » para conjuntos de datos de alta dimensionalidad o cuando sea crucial obtener una alta recuperación.</p><p>Considere reducir el <code translate="no">M</code> cuando el uso de memoria y la velocidad de búsqueda sean las principales preocupaciones.</p><p>En la mayoría de los casos, recomendamos establecer un valor dentro de este rango: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Número de vecinos candidatos que se tienen en cuenta para la conexión durante la construcción del índice.</p><p>Para cada nuevo elemento se evalúa un conjunto más amplio de candidatos, pero el número máximo de conexiones que se establecen realmente sigue estando limitado por <code translate="no">M</code>.</p></td>
     <td><p><strong>Tipo</strong>: Entero</p><p><strong>Rango</strong>: [1, <em>int_max</em>]</p><p><strong>Valor por defecto</strong>: <code translate="no">360</code></p></td>
     <td><p>Un valor más alto de « <code translate="no">efConstruction</code> » suele dar lugar a un <strong>índice más preciso</strong>, ya que se exploran más conexiones potenciales. Sin embargo, esto también conlleva <strong>un mayor tiempo de indexación y un mayor uso de memoria</strong> durante la construcción.</p><p>Considera la posibilidad de aumentar el valor de ` <code translate="no">efConstruction</code> ` para mejorar la precisión, especialmente en situaciones en las que el tiempo de indexación no sea un factor crítico.</p><p>Considera la posibilidad de reducir el valor de ` <code translate="no">efConstruction</code> ` para acelerar la construcción del índice cuando las limitaciones de recursos sean un problema.</p><p>En la mayoría de los casos, recomendamos establecer un valor dentro de este rango: [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>Especifica el método de cuantificación escalar para comprimir vectores. Cada opción ofrece un equilibrio diferente entre compresión y precisión:</p><ul><li><p><code translate="no">SQ4U</code>: Codifica los vectores mediante cuantificación uniforme de 4 bits. Este modo ofrece la mayor velocidad y compresión.</p></li><li><p><code translate="no">SQ6</code>: Codifica los vectores utilizando enteros de 6 bits.</p></li><li><p><code translate="no">SQ8</code>: Codifica los vectores utilizando enteros de 8 bits.</p></li><li><p><code translate="no">BF16</code>: Utiliza el formato Bfloat16.</p></li><li><p><code translate="no">FP16</code>: Utiliza el formato estándar de coma flotante de 16 bits.</p></li></ul></td>
     <td><p><strong>Tipo</strong>: Cadena</p><p><strong>Rango</strong>: [ <code translate="no">SQ4U</code>, <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code> ]</p><p><strong>Valor por defecto</strong>: <code translate="no">SQ8</code></p></td>
     <td><p>La elección de <code translate="no">sq_type</code> depende de las necesidades específicas de la aplicación. Se elige <code translate="no">SQ4U</code> para obtener la máxima velocidad y eficiencia de memoria. <code translate="no">SQ6</code> o <code translate="no">SQ8</code> pueden ser adecuados para un rendimiento equilibrado. Por otro lado, si la precisión es primordial, podrían preferirse <code translate="no">BF16</code> o <code translate="no">FP16</code>.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Un indicador booleano que controla si se aplica un paso de refinamiento durante la búsqueda. El refinamiento implica volver a clasificar los resultados iniciales calculando las distancias exactas entre el vector de consulta y los candidatos.</p></td>
     <td><p><strong>Tipo</strong>: Booleano</p><p><strong>Rango</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p><p><strong>Valor por defecto</strong>: <code translate="no">false</code></p></td>
     <td><p>Establezca el valor en <code translate="no">true</code> si es esencial una alta precisión y puede tolerar tiempos de búsqueda ligeramente más lentos. Utilice <code translate="no">false</code> si la velocidad es una prioridad y es aceptable un pequeño compromiso en cuanto a la precisión.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Determina la precisión de los datos utilizados para el refinamiento.</p><p>Esta precisión debe ser superior a la de los vectores comprimidos (tal y como se establece en <code translate="no">sq_type</code>), lo que afecta tanto a la precisión de los vectores reordenados como a su consumo de memoria.</p></td>
     <td><p><strong>Tipo</strong>: Cadena</p><p><strong>Rango</strong>: [ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p><p><strong>Valor por defecto</strong>: Ninguno</p></td>
     <td><p>Utiliza <code translate="no">FP32</code> para obtener la máxima precisión a costa de un mayor consumo de memoria, o <code translate="no">SQ6</code>/<code translate="no">SQ8</code> para una mejor compresión. <code translate="no">BF16</code> y <code translate="no">FP16</code> ofrecen una alternativa equilibrada.</p></td>
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
    </button></h3><p>La siguiente tabla enumera los parámetros que se pueden configurar en <code translate="no">search_params.params</code> al <a href="/docs/es/hnsw-sq.md#Search-on-index">realizar búsquedas en el índice</a>. La configuración del servidor puede anular los valores predeterminados de los parámetros que se omitan.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Controla la amplitud de la búsqueda durante la recuperación del vecino más cercano. Determina cuántos nodos se visitan y se evalúan como posibles vecinos más cercanos. </p><p>Este parámetro afecta únicamente al proceso de búsqueda y se aplica exclusivamente a la capa inferior del grafo.</p></td>
     <td><p><strong>Tipo</strong>: Entero</p><p><strong>Rango</strong>: [1, <em>int_max</em>]</p><p><strong>Valor por defecto</strong>: <code translate="no">max(limit, 16)</code> para la búsqueda kNN ordinaria; <code translate="no">512</code> para la búsqueda por rango.</p><p>Para la búsqueda kNN ordinaria, un valor explícito de ` <code translate="no">ef</code> ` debe ser mayor o igual que ` <code translate="no">limit</code> ` (el número de vecinos más cercanos que se van a devolver).</p></td>
     <td><p>Un valor mayor de <code translate="no">ef</code> suele traducirse en <strong>una mayor precisión de búsqueda</strong>, ya que se tienen en cuenta más vecinos potenciales. Sin embargo, esto también <strong>aumenta el tiempo de búsqueda</strong>.</p><p>Considera aumentar el valor de « <code translate="no">ef</code> » cuando sea fundamental lograr un alto nivel de recuperación y la velocidad de búsqueda no sea una prioridad.</p><p>Considere la posibilidad de reducir el « <code translate="no">ef</code> » para dar prioridad a búsquedas más rápidas, especialmente en situaciones en las que sea aceptable una ligera reducción de la precisión.</p><p>En la mayoría de los casos, recomendamos establecer un valor dentro de este rango: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>El factor de ampliación que controla cuántos candidatos adicionales se examinan durante la fase de refinamiento, en relación con los K primeros resultados solicitados.</p></td>
     <td><p><strong>Tipo</strong>: Float</p><p><strong>Intervalo</strong>: [1, <em>float_max</em>)</p><p><strong>Valor por defecto</strong>: 1</p></td>
     <td><p>Unos valores más altos de « <code translate="no">refine_k</code> » pueden mejorar la recuperación y la precisión, pero también aumentarán el tiempo de búsqueda y el consumo de recursos. Un valor de 1 significa que el proceso de refinamiento solo tiene en cuenta los primeros K resultados iniciales.</p></td>
   </tr>
</table>
