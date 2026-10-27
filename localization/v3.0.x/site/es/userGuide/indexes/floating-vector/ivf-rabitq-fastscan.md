---
id: ivf-rabitq-fastscan.md
title: IVF_RABITQ_FASTSCANCompatible with Milvus 3.0.x
summary: >-
  IVF_RABITQ_FASTSCAN combina la técnica IVF, la cuantificación binaria RaBitQ y
  el escaneo por lotes SIMD para ofrecer una búsqueda vectorial de alto
  rendimiento y eficiente en cuanto al uso de la memoria.
beta: Milvus 3.0.x
---
<h1 id="IVFRABITQFASTSCAN" class="common-anchor-header">IVF_RABITQ_FASTSCAN<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#IVFRABITQFASTSCAN" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">IVF_RABITQ_FASTSCAN</code> combina la partición IVF, la cuantificación binaria RaBitQ y el procesamiento por lotes FastScan. Almacena códigos RaBitQ de un bit para los vectores de la base de datos y procesa los códigos en bloques de 32 vectores de la base de datos compatibles con SIMD. Esto lo convierte en una buena opción para cargas de trabajo de alto rendimiento con limitaciones de memoria que puedan aceptar resultados aproximados.</p>
<p>Elige <code translate="no">IVF_RABITQ_FASTSCAN</code> en lugar de <a href="/docs/es/ivf-rabitq.md">IVF_RABITQ</a> cuando las búsquedas analicen muchos candidatos y el rendimiento sea el objetivo principal. El coste de configuración por consulta de FastScan se amortiza a lo largo de los bloques de código empaquetados, por lo que suele ser más beneficioso para grandes conjuntos de datos o listas IVF largas. Para colecciones pequeñas o búsquedas que examinan pocos candidatos, utiliza en su lugar <code translate="no">IVF_RABITQ</code>. También admite cuantificación de consultas configurable, más tipos de refinamiento e iteradores.</p>
<h2 id="How-it-works" class="common-anchor-header">Cómo funciona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">IVF_RABITQ_FASTSCAN</code> utiliza las siguientes etapas:</p>
<ol>
<li><strong>Partición IVF</strong>: IVF agrupa los vectores en clústeres de « <code translate="no">nlist</code> » y busca los clústeres más cercanos mediante <code translate="no">nprobe</code>.</li>
<li><strong>Codificación RaBitQ</strong>: cada residual de vector se codifica como un código RaBitQ de un bit por dimensión.</li>
<li><strong>FastScan</strong>: el índice agrupa los códigos para un procesamiento por lotes SIMD optimizado para la caché. Evalúa 32 vectores de la base de datos en cada lote.</li>
<li><strong>Refinamiento opcional</strong>: cuando está habilitado, un refinador FP32 vuelve a puntuar los candidatos antes de que Milvus devuelva los resultados finales.</li>
</ol>
<p>El índice Faiss subyacente es <code translate="no">IndexIVFRaBitQFastScan</code>. Knowhere lo envuelve con una transformación de rotación aleatoria y, opcionalmente, añade un refinador FP32.</p>
<p>FastScan realiza tareas de configuración por consulta, como la creación y cuantificación de tablas de consulta relacionadas con la búsqueda, antes de escanear los bloques de código empaquetados. Compara el rendimiento tanto de <code translate="no">IVF_RABITQ</code> como de <code translate="no">IVF_RABITQ_FASTSCAN</code> con tus datos y parámetros de búsqueda.</p>
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
    </button></h2><p>Para crear un índice de <code translate="no">IVF_RABITQ_FASTSCAN</code> en un campo vectorial en Milvus, utiliza el método <code translate="no">add_index()</code>, especificando <code translate="no">index_type</code>, <code translate="no">metric_type</code> y los parámetros adicionales para el índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_RABITQ_FASTSCAN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
<span class="highlighted-wrapper-line">    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span></span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>, <span class="hljs-comment"># Number of clusters for the index</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Enable refinement for higher recall</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;FP32&quot;</span> <span class="hljs-comment"># Refinement data format</span></span>
<span class="highlighted-comment-line">    } <span class="hljs-comment"># Index building params</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p>En esta configuración:</p>
<ul>
<li><p><code translate="no">index_type</code>: El tipo de índice que se va a crear. En este ejemplo, establezca el valor en « <code translate="no">IVF_RABITQ_FASTSCAN</code> ».</p></li>
<li><p><code translate="no">metric_type</code>: El método utilizado para calcular la distancia entre vectores. Los valores admitidos incluyen <code translate="no">COSINE</code>, <code translate="no">L2</code> y <code translate="no">IP</code>. Para obtener más detalles, consulte <a href="/docs/es/metric.md">Tipos</a> de <a href="/docs/es/metric.md">métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opciones de configuración adicionales para la creación del índice. Para obtener más información, consulte <a href="/docs/es/ivf-rabitq-fastscan.md#Index-building-params">«Parámetros de creación</a> de <a href="/docs/es/ivf-rabitq-fastscan.md#Index-building-params">índices</a>».</p></li>
</ul>
<p>Una vez configurados los parámetros del índice, puede crear el índice utilizando directamente el método <code translate="no">create_index()</code> o pasando los parámetros del índice en el método <code translate="no">create_collection</code>. Para obtener más información, consulte <a href="/docs/es/create-collection.md">Crear colección</a>.</p>
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
<p>Establezca ` <code translate="no">nprobe</code> ` para controlar el número de clústeres IVF que se van a buscar. Si el índice se ha creado con refinamiento, utilice ` <code translate="no">refine_k</code> ` para controlar el conjunto de candidatos que se pasa al refinador FP32.</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your Milvus server address</span>

search_params = {
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">128</span>, <span class="hljs-comment"># Number of clusters to search</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Refinement magnification factor</span></span>
<span class="highlighted-comment-line">    }</span>
}

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># TopK results to return</span>
<span class="highlighted-wrapper-line">    search_params=search_params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>En esta configuración:</p>
<ul>
<li><code translate="no">params</code>: Opciones de configuración adicionales para la búsqueda en el índice. Para más detalles, consulte <a href="/docs/es/ivf-rabitq-fastscan.md#Index-specific-search-params">«Parámetros de búsqueda específicos del índice</a>».</li>
</ul>
<div class="alert note">
<p>A diferencia de « <code translate="no">IVF_RABITQ</code> », « <code translate="no">IVF_RABITQ_FASTSCAN</code> » no acepta el parámetro de búsqueda « <code translate="no">rbq_bits_query</code> ». FastScan siempre utiliza internamente una cuantificación de consultas de 8 bits, por lo que debe omitirse « <code translate="no">rbq_bits_query</code> » o establecerse en « <code translate="no">0</code> »; se rechazan los valores superiores.</p>
</div>
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
    </button></h2><p>Esta sección ofrece una visión general de los parámetros utilizados para crear un índice y realizar búsquedas en él.</p>
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
    </button></h3><p>La siguiente tabla enumera los parámetros que se pueden configurar en <code translate="no">params</code> al <a href="/docs/es/ivf-rabitq-fastscan.md#Build-index">crear un índice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>El número de clústeres que se crearán mediante el algoritmo k-means durante la creación del índice. Cada clúster, representado por un centroide, almacena una lista de vectores. Al aumentar este parámetro se reduce el número de vectores en cada clúster, lo que da lugar a particiones más pequeñas y específicas.</p></td>
     <td><p><strong>Tipo</strong>: Entero<br><strong>Rango</strong>: [1, 65536]<br><strong>Valor por defecto</strong>: <code translate="no">128</code></p></td>
     <td><p>Los valores más altos de « <code translate="no">nlist</code> » mejoran la recuperación al crear clústeres más refinados, pero aumentan el tiempo de creación del índice. Optimiza en función del tamaño del conjunto de datos y de los recursos disponibles. En la mayoría de los casos, te recomendamos que establezcas un valor dentro de este rango: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Habilita el proceso de refinamiento y almacena los datos refinados. <code translate="no">IVF_RABITQ_FASTSCAN</code> solo admite el refinamiento en FP32.</p></td>
     <td><p><strong>Tipo</strong>: Booleano<br><strong>Intervalo</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]<br><strong>Valor por defecto</strong>: <code translate="no">false</code></p></td>
     <td><p>Establecer en <code translate="no">true</code> si se necesita una tasa de recuperación de 0,9 o superior. Habilitar el refinamiento mejora la precisión, pero aumenta los requisitos de almacenamiento y el tiempo de creación del índice.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Define la representación de datos utilizada para el refinamiento cuando <code translate="no">refine</code> está habilitado. Solo es obligatorio cuando <code translate="no">refine</code> es <code translate="no">true</code>.</p></td>
     <td><p><strong>Tipo</strong>: Cadena<br><strong>Rango</strong>: [<code translate="no">FP32</code>, <code translate="no">FLAT</code>]<br><strong>Valor por defecto</strong>: Ninguno</p></td>
     <td><p><code translate="no">IVF_RABITQ_FASTSCAN</code> Solo admite el refinamiento FP32, y <code translate="no">FLAT</code> es idéntico a <code translate="no">FP32</code>. La coincidencia de valores no distingue entre mayúsculas y minúsculas.</p></td>
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
    </button></h3><p>La siguiente tabla enumera los parámetros que se pueden configurar en <code translate="no">search_params.params</code> al <a href="/docs/es/ivf-rabitq-fastscan.md#Search-on-index">realizar búsquedas en el índice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>El número de clústeres en los que buscar candidatos. Un valor más alto permite buscar en más clústeres, lo que mejora la recuperación al ampliar el alcance de la búsqueda, pero a costa de una mayor latencia de la consulta.</p></td>
     <td><p><strong>Tipo</strong>: Entero<br><strong>Rango</strong>: [1, <em>nlist</em>]<br><strong>Valor por defecto</strong>: <code translate="no">8</code></p></td>
     <td><p>Aumentar este valor mejora la recuperación, pero puede ralentizar la búsqueda. Establece <code translate="no">nprobe</code> de forma proporcional a <code translate="no">nlist</code> para equilibrar velocidad y precisión. En la mayoría de los casos, te recomendamos que establezcas un valor dentro de este rango: [1, <em>nlist</em>].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>El proceso de refinamiento utiliza una cuantificación de mayor calidad para seleccionar el número necesario de vecinos más cercanos de un conjunto de candidatos <code translate="no">refine_k</code> veces mayor, elegido mediante IVF_RABITQ_FASTSCAN. No tiene ningún efecto si el refinamiento está desactivado.</p></td>
     <td><p><strong>Tipo</strong>: Float<br><strong>Intervalo</strong>: [1, <em>float_max</em>)<br><strong>Valor por defecto</strong>: <code translate="no">1</code></p></td>
     <td><p>Los valores « <code translate="no">refine_k</code> » más altos reducen el QPS, pero aumentan la tasa de recuperación. Empieza con <code translate="no">1</code> y prueba los valores <code translate="no">2</code>, <code translate="no">3</code>, <code translate="no">4</code> y <code translate="no">5</code> para encontrar el equilibrio óptimo entre el QPS y la recuperación para tu conjunto de datos.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rbq_bits_query</code></p></td>
     <td><p>Establece si se aplica una cuantificación escalar adicional a un vector de consulta. <strong>No es compatible con <code translate="no">IVF_RABITQ_FASTSCAN</code></strong>: el índice siempre utiliza internamente una cuantificación de consulta de 8 bits. Omita este parámetro o establézcalo en <code translate="no">0</code>; se rechazan los valores superiores a <code translate="no">0</code>.</p></td>
     <td><p><strong>Tipo</strong>: Entero<br><strong>Rango</strong>: [0, 0]<br><strong>Valor por defecto</strong>: <code translate="no">0</code></p></td>
     <td><p>Déjalo sin configurar. Para la cuantificación de consultas configurable, utiliza <a href="/docs/es/ivf-rabitq.md">IVF_RABITQ</a> en su lugar.</p></td>
   </tr>
</table>
<h2 id="Limitations" class="common-anchor-header">Limitaciones<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li>FastScan utiliza una codificación fija de la base de datos RaBitQ de 1 bit y una cuantificación de consultas de 8 bits. Se debe omitir « <code translate="no">rbq_bits_query</code> » o establecerlo en « <code translate="no">0</code> ».</li>
<li>Solo se admite el refinamiento FP32 (equivalente a <code translate="no">FLAT</code>).</li>
<li>No se admiten iteradores.</li>
<li>Se trata de un índice de CPU. No se ejecuta en la GPU.</li>
<li>El rendimiento real depende de la compatibilidad de la CPU con SIMD, la dimensión del vector, <code translate="no">nlist</code>, <code translate="no">nprobe</code> y la distribución de los datos. Realiza pruebas de rendimiento con tu carga de trabajo antes de implementarlo en producción.</li>
</ul>
<p>Para la variante RaBitQ que no es FastScan y sus opciones de refinamiento adicionales, consulta <a href="/docs/es/ivf-rabitq.md">IVF_RABITQ</a>.</p>
