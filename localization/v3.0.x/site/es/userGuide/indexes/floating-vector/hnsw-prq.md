---
id: hnsw-prq.md
title: HNSW_PRQ
summary: >-
  HNSW_PRQ combina los grafos «Hierarchical Navigable Small World» (HNSW) con la
  cuantificación residual de productos (PRQ), lo que ofrece un método avanzado
  de indexación vectorial que permite ajustar con precisión el equilibrio entre
  el tamaño del índice y la precisión. La PRQ va más allá de la cuantificación
  de productos (PQ) tradicional al introducir una etapa de cuantificación
  residual (RQ) para capturar información adicional, lo que se traduce en una
  mayor precisión o en índices más compactos en comparación con los métodos
  basados exclusivamente en la PQ. Sin embargo, los pasos adicionales pueden
  suponer una mayor carga computacional durante la creación del índice y la
  búsqueda.
---
<h1 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ<button data-href="#HNSWPRQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_PRQ</strong> aprovecha los grafos jerárquicos navegables de «mundo pequeño» (HNSW) junto con la cuantificación residual de productos (PRQ), ofreciendo un método avanzado de indexación vectorial que permite ajustar con precisión el equilibrio entre el tamaño del índice y la precisión. La PRQ va más allá de la cuantificación de productos (PQ) tradicional al introducir un paso de cuantificación residual (RQ) para capturar información adicional, lo que da como resultado una mayor precisión o índices más compactos en comparación con los métodos basados exclusivamente en la PQ. Sin embargo, los pasos adicionales pueden suponer una mayor carga computacional durante la creación del índice y la búsqueda.</p>
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
    </button></h2><p>HNSW_PRQ combina dos técnicas de indexación: <strong>HSNW</strong> para una navegación rápida basada en grafos y <strong>PRQ</strong> para una compresión vectorial eficiente.</p>
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
<h3 id="PRQ" class="common-anchor-header">PRQ<button data-href="#PRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>PRQ es un enfoque de compresión vectorial en varias etapas que combina dos técnicas complementarias: PQ y RQ. Al dividir primero un vector de alta dimensión en subvectores más pequeños (mediante PQ) y, a continuación, cuantificar cualquier diferencia restante (mediante RQ), PRQ logra una representación compacta y, al mismo tiempo, precisa de los datos originales.</p>
<p>La siguiente figura muestra cómo funciona.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw-prq.png" alt="Hnsw Prq" class="doc-image" id="hnsw-prq" /> 
   <span>HNSW PRQ</span>
  
 </span></p>
<ol>
<li><p><strong>Cuantización de productos (PQ)</strong></p>
<p>En esta fase, el vector original se divide en subvectores más pequeños, y cada subvector se asigna a su centroide más cercano en un libro de códigos aprendido. Esta asignación reduce significativamente el tamaño de los datos, pero introduce cierto error de redondeo, ya que cada subvector se aproxima mediante un único centroide. Para más detalles, consulta <a href="/docs/es/ivf-pq.md#PQ">IVF_PQ</a>.</p></li>
<li><p><strong>Cuantización residual (RQ)</strong></p>
<p>Tras la etapa de PQ, la RQ cuantifica el residuo —la diferencia entre el vector original y su aproximación basada en la PQ— utilizando libros de códigos adicionales. Dado que este residuo suele ser mucho más pequeño, puede codificarse con mayor precisión sin que ello suponga un gran aumento del espacio de almacenamiento.</p>
<p>El parámetro « <code translate="no">nrq</code> » determina cuántas veces se cuantifica iterativamente este residuo, lo que permite ajustar con precisión el equilibrio entre la eficiencia de la compresión y la precisión.</p></li>
<li><p><strong>Representación final de la compresión</strong></p>
<p>Una vez que RQ termina de cuantificar el residuo, los códigos enteros tanto de PQ como de RQ se combinan en un único índice comprimido. Al capturar detalles refinados que PQ por sí solo podría pasar por alto, RQ mejora la precisión sin provocar un aumento significativo del espacio de almacenamiento. Esta sinergia entre PQ y RQ es lo que define a PRQ.</p></li>
</ol>
<h3 id="HNSW-+-PRQ" class="common-anchor-header">HNSW + PRQ<button data-href="#HNSW-+-PRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>Al combinar HNSW con PRQ, <strong>HNSW_PRQ</strong> conserva la búsqueda rápida basada en grafos de HNSW al tiempo que aprovecha la compresión en varias etapas de PRQ. El flujo de trabajo es el siguiente:</p>
<ol>
<li><p><strong>Compresión de datos:</strong> cada vector se transforma primero mediante PQ en una representación aproximada y, a continuación, los residuos se cuantifican mediante RQ para un mayor refinamiento. El resultado es un conjunto de códigos compactos que representan cada vector.</p></li>
<li><p><strong>Construcción del grafo:</strong> Los vectores comprimidos (incluidos tanto los códigos PQ como los RQ) constituyen la base para construir el grafo de HNSW. Dado que los datos se almacenan de forma compacta, el grafo requiere menos memoria y la navegación por él se acelera.</p></li>
<li><p><strong>Recuperación de candidatos:</strong> Durante la búsqueda, HNSW utiliza las representaciones comprimidas para recorrer el grafo y recuperar un conjunto de candidatos. Esto reduce drásticamente el número de vectores que deben tenerse en cuenta.</p></li>
<li><p><strong>(Opcional) Refinamiento de resultados:</strong> Los resultados iniciales de los candidatos pueden refinarse para obtener una mayor precisión, basándose en los siguientes parámetros:</p>
<ul>
<li><p><code translate="no">refine</code>: Controla si se activa este paso de refinamiento. Cuando se establece en « <code translate="no">true</code> », el sistema vuelve a calcular las distancias utilizando representaciones de mayor precisión o sin comprimir.</p></li>
<li><p><code translate="no">refine_type</code>: Especifica el nivel de precisión de los datos utilizados durante el refinamiento (p. ej., SQ6, SQ8, BF16). Una opción de mayor precisión, como « <code translate="no">FP32</code> », puede ofrecer resultados más precisos, pero requiere más memoria. Esta precisión debe superar la del conjunto de datos comprimido original en un valor de « <code translate="no">sq_type</code> ».</p></li>
<li><p><code translate="no">refine_k</code>: Actúa como factor de ampliación. Por ejemplo, si el «top <em>k»</em> es 100 y « <code translate="no">refine_k</code> » es 2, el sistema vuelve a clasificar los 200 mejores candidatos y devuelve los 100 mejores, mejorando así la precisión general.</p></li>
</ul></li>
</ol>
<p>Para obtener una lista completa de parámetros y valores válidos, consulta <a href="/docs/es/hnsw-prq.md#Index-params">«Parámetros</a> del <a href="/docs/es/hnsw-prq.md#Index-params">índice</a>».</p>
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
    </button></h2><p>Para crear un índice « <code translate="no">HNSW_PRQ</code> » en un campo vectorial en Milvus, utilice el método « <code translate="no">add_index()</code> », especificando « <code translate="no">index_type</code> », « <code translate="no">metric_type</code> » y los parámetros adicionales para el índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PRQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;nrq&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>En esta configuración:</p>
<ul>
<li><p><code translate="no">index_type</code>: El tipo de índice que se va a crear. En este ejemplo, establece el valor en « <code translate="no">HNSW_PQ</code> ».</p></li>
<li><p><code translate="no">metric_type</code>: El método utilizado para calcular la distancia entre vectores. Los valores admitidos incluyen <code translate="no">COSINE</code>, <code translate="no">L2</code> y <code translate="no">IP</code>. Para obtener más detalles, consulte <a href="/docs/es/metric.md">Tipos</a> de <a href="/docs/es/metric.md">métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opciones de configuración adicionales para la creación del índice. Para obtener más información, consulte <a href="/docs/es/hnsw-prq.md#Index-building-params">«Parámetros de creación</a> de <a href="/docs/es/hnsw-prq.md#Index-building-params">índices</a>».</p></li>
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
<li><code translate="no">params</code>: Opciones de configuración adicionales para la búsqueda en el índice. Para obtener más información, consulta <a href="/docs/es/hnsw-prq.md#Index-specific-search-params">«Parámetros de búsqueda específicos del índice</a>».</li>
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
    </button></h3><p>La siguiente tabla enumera los parámetros que se pueden configurar en <code translate="no">params</code> al <a href="/docs/es/hnsw-prq.md#Build-index">crear un índice</a>.</p>
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
     <td><p>Número máximo de conexiones (o aristas) que puede tener cada nodo en el grafo, incluyendo tanto las aristas salientes como las entrantes.
Este parámetro afecta directamente tanto a la construcción del índice como a la búsqueda.</p></td>
     <td><p><strong>Tipo</strong>: Entero
 <strong>Rango</strong>: [2, 2048]</p>
<p><strong>Valor por defecto</strong>: <code translate="no">30</code> (hasta 30 aristas salientes y 30 entrantes por nodo)</p></td>
     <td><p>Un valor de « <code translate="no">M</code> » más alto suele proporcionar <strong>mayor precisión</strong>, pero <strong>aumenta la carga de memoria</strong> y <strong>ralentiza tanto la creación del índice como la búsqueda</strong>.
 Considera aumentar « <code translate="no">M</code> » para conjuntos de datos de alta dimensionalidad o cuando sea crucial obtener una alta recuperación.</p>
<p>Considera reducir el valor de « <code translate="no">M</code> » cuando el consumo de memoria y la velocidad de búsqueda sean las principales preocupaciones.</p>
<p>En la mayoría de los casos, recomendamos establecer un valor dentro de este rango: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Número de vecinos candidatos que se tienen en cuenta para la conexión durante la construcción del índice.
Para cada nuevo elemento se evalúa un conjunto más amplio de candidatos, pero el número máximo de conexiones que se establecen realmente sigue estando limitado por <code translate="no">M</code>.</p></td>
     <td><p><strong>Tipo</strong>: Entero
 <strong>Rango</strong>: [1, <em>int_max</em>]</p>
<p><strong>Valor por defecto</strong>: <code translate="no">360</code></p></td>
     <td><p>Un valor más alto de « <code translate="no">efConstruction</code> » suele dar lugar a un <strong>índice más preciso</strong>, ya que se exploran más conexiones potenciales. Sin embargo, esto también conlleva <strong>un tiempo de indexación más largo y un mayor uso de memoria</strong> durante la construcción.
Considera aumentar « <code translate="no">efConstruction</code> » para mejorar la precisión, especialmente en situaciones en las que el tiempo de indexación no sea tan crítico.</p>
<p>Considera la posibilidad de reducir el valor de ` <code translate="no">efConstruction</code> ` para acelerar la construcción del índice cuando las limitaciones de recursos sean un problema.</p>
<p>En la mayoría de los casos, recomendamos establecer un valor dentro de este rango: [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>El número de subvectores (utilizados para la cuantificación) en los que se divide cada vector de alta dimensión durante el proceso de cuantificación.</p></td>
     <td><p><strong>Tipo</strong>: Entero
 <strong>Rango</strong>: [1, 65536]</p>
<p><strong>Valor por defecto</strong>: Ninguno</p></td>
     <td><p>Un valor más alto de « <code translate="no">m</code> » puede mejorar la precisión, pero también aumenta la complejidad computacional y el uso de memoria.
« <code translate="no">m</code> » debe ser un divisor de la dimensión del vector (<em>D</em>) para garantizar una descomposición adecuada. Un valor que se suele recomendar es <em>m = D/2</em>.</p>
<p>En la mayoría de los casos, recomendamos establecer un valor dentro de este rango: [D/8, D].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>El número de bits utilizados para representar el índice del centroide de cada subvector en la forma comprimida. Determina directamente el tamaño de cada libro de códigos.
 Cada libro de códigos contendrá<sup>2n bits de índices</sup> de centroides. Por ejemplo, si se establece « <code translate="no">nbits</code> » en 8, cada subvector estará representado por un índice de centroide de 8 bits. Esto permite<sup>2⁸</sup> (256) centroides posibles en el libro de códigos para ese subvector.</p></td>
     <td><p><strong>Tipo</strong>: Entero
 <strong>Rango</strong>: [1, 24]</p>
<p><strong>Valor por defecto</strong>: <code translate="no">8</code></p></td>
     <td><p>Un valor más alto de « <code translate="no">nbits</code> » permite crear libros de códigos más grandes, lo que puede dar lugar a representaciones más precisas de los vectores originales. Sin embargo, también implica utilizar más bits para almacenar cada índice, lo que se traduce en una menor compresión.
En la mayoría de los casos, recomendamos establecer un valor dentro de este rango: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nrq</code></p></td>
     <td><p>Controla el número de subcuantificadores residuales que se utilizan en la etapa RQ. Un mayor número de subcuantificadores puede lograr una mayor compresión, pero también puede introducir una mayor pérdida de información.</p></td>
     <td><p><strong>Tipo</strong>: Entero
 <strong>Rango</strong>: [1, 16]</p>
<p><strong>Valor por defecto</strong>: <code translate="no">2</code></p></td>
     <td><p>Un valor más alto de « <code translate="no">nrq</code> » permite pasos adicionales de subcuantización residual, lo que puede conducir a una reconstrucción más precisa de los vectores originales. Sin embargo, también implica almacenar y calcular más subcuantizadores, lo que da lugar a un mayor tamaño del índice y a una mayor sobrecarga computacional.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Un indicador booleano que controla si se aplica un paso de refinamiento durante la búsqueda. El refinamiento implica reordenar los resultados iniciales calculando las distancias exactas entre el vector de consulta y los candidatos.</p></td>
     <td><p><strong>Tipo</strong>: Booleano
 <strong>Rango</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p>
<p><strong>Valor por defecto</strong>: <code translate="no">false</code></p></td>
     <td><p>Establezca el valor en <code translate="no">true</code> si es esencial una alta precisión y puede tolerar tiempos de búsqueda ligeramente más lentos. Utilice <code translate="no">false</code> si la velocidad es una prioridad y es aceptable un ligero compromiso en la precisión.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Determina la precisión de los datos utilizados durante el proceso de refinamiento.
Esta precisión debe ser superior a la de los vectores comprimidos (tal y como se establece mediante los parámetros <code translate="no">m</code> y <code translate="no">nbits</code> ).</p></td>
     <td><p><strong>Tipo</strong>: Cadena
 <strong>Rango</strong>: [ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p>
<p><strong>Valor por defecto</strong>: Ninguno</p></td>
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
    </button></h3><p>La siguiente tabla enumera los parámetros que se pueden configurar en <code translate="no">search_params.params</code> al <a href="/docs/es/hnsw-prq.md#Search-on-index">realizar búsquedas en el índice</a>.</p>
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
     <td><p>Controla el alcance de la búsqueda durante la recuperación del vecino más cercano. Determina cuántos nodos se visitan y se evalúan como posibles vecinos más cercanos. 
 Este parámetro afecta únicamente al proceso de búsqueda y se aplica exclusivamente a la capa inferior del grafo.</p></td>
     <td><p><strong>Tipo</strong>: Entero
 <strong>Rango</strong>: [1, <em>int_max</em>]</p>
<p><strong>Valor por defecto</strong>: <em>límite</em> (TopK vecinos más cercanos a devolver)</p></td>
     <td><p>Un valor mayor de « <code translate="no">ef</code> » suele traducirse en <strong>una mayor precisión de búsqueda</strong>, ya que se tienen en cuenta más vecinos potenciales. Sin embargo, esto también <strong>aumenta el tiempo de búsqueda</strong>.
 Considera la posibilidad de aumentar « <code translate="no">ef</code> » cuando sea fundamental lograr un alto nivel de recuperación y la velocidad de búsqueda no sea una prioridad.</p>
<p>Considera la posibilidad de reducir <code translate="no">ef</code> para dar prioridad a búsquedas más rápidas, especialmente en situaciones en las que sea aceptable una ligera reducción de la precisión.</p>
<p>En la mayoría de los casos, recomendamos establecer un valor dentro de este rango: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>El factor de ampliación que controla cuántos candidatos adicionales se examinan durante la fase de refinamiento (reclasificación), en relación con los K primeros resultados solicitados.</p></td>
     <td><p><strong>Tipo</strong>: Float
 <strong>Rango</strong>: [1, <em>float_max</em>)</p>
<p><strong>Valor por defecto</strong>: 1</p></td>
     <td><p>Unos valores más altos de « <code translate="no">refine_k</code> » pueden mejorar la recuperación y la precisión, pero también aumentarán el tiempo de búsqueda y el consumo de recursos. Un valor de 1 significa que el proceso de refinamiento solo tiene en cuenta los primeros K resultados iniciales.</p></td>
   </tr>
</table>
